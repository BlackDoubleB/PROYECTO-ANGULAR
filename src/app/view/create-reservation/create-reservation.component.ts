import { Component, Inject, OnInit } from '@angular/core';
import { DialogBodyComponent } from 'src/app/components/dialog-body/dialog-body.component';
import { MatDialog } from '@angular/material/dialog';
//import { FormControl, FormGroup, Validators } from '@angular/forms';
//import { __values } from 'tslib';
import { SessionStorageService } from 'src/app/services/others/session-storage.service';
import { ScheduleService } from 'src/app/services/api/schedule.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { Consumidor } from 'src/app/model/consumidor.model';
import { UserState } from 'src/app/services/state/user.state';
import { firstValueFrom } from 'rxjs';
import { ConsumidorApiService } from 'src/app/services/api/consumidor.api';
import * as dayjs from 'dayjs';
import { ToastService } from 'src/app/services/utils/toast.service';
import { HorarioReserva } from 'src/app/model/horarioReserva.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HorarioReservaApiService } from 'src/app/services/api/horarioReserva.api';
import { alertAsync } from 'src/app/services/utils/alert';
import { RegistrarReservaRequest } from 'src/app/config/interfaces/request/resgistrarReserva.interface';
import { ReservaApiService } from 'src/app/services/api/reserva.api';
import { ModalTicketComponent } from 'src/app/components/modal-ticket/modal-ticket.component';

interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css'],
})
export class CreateReservationComponent implements OnInit {
  public consumidor: Consumidor | null = null;
  public horarios: Array<HorarioReserva> = [];
  public hoy = dayjs().add(1, 'day').format('YYYY-MM-DD');
  public title = 'angular-dialog';
  public descripcion = new FormControl<string>('');
  public fecha = new FormControl<Date | null>(null, Validators.required);
  public horario = new FormControl<number | null>(null, Validators.required);
  public cantidadPersonas = new FormControl<number | null>(
    null,
    Validators.required
  );
  public idReserva: number | null = null;

  constructor(
    private matDialog: MatDialog,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private _userState: UserState,
    private _consumidorApi: ConsumidorApiService,
    private _horarioReservaApi: HorarioReservaApiService,
    private _reservaApi: ReservaApiService,
    private _toast: ToastService
  ) {
    this._locale = 'pe';
    this._adapter.setLocale(this._locale);
  }

  async ngOnInit() {
    await this.obtenerConsumidor();
  }

  async obtenerConsumidor() {
    const idConsumidor = this._userState.getUser().idConsumidor;
    const response = await firstValueFrom(
      this._consumidorApi.getConsumidorById(idConsumidor)
    );

    if (response.status === 401 || response.status === 403) {
      this._toast.showAlert(
        'No tiene permisos para realizar esta acción',
        'Error',
        'error'
      );
      return;
    }

    if (!response.body?.success) {
      return;
    }

    this.consumidor = response.body.value;
  }

  async obtenerHorariosPorFecha(evt: MatDatepickerInputEvent<Date>) {
    if (!evt.value) {
      return;
    }

    const fecha = dayjs(evt.value).format('YYYY-MM-DD');

    const response = await firstValueFrom(
      this._horarioReservaApi.getHorariosReservaPorFecha(fecha)
    );

    if (response.status === 401 || response.status === 403) {
      this._toast.showAlert(
        'No tiene permisos para realizar esta acción',
        'Error',
        'error'
      );
      return;
    }

    if (!response.body?.success) {
      return;
    }

    this.horarios = response.body.values;
  }

  validarFormulario() {
    return (
      this.fecha.valid && this.horario.valid && this.cantidadPersonas.valid
    );
  }

  async confirmarRegistro() {
    const result = await alertAsync({
      title: 'Confirmación',
      text: 'Por favor confirme el registro de la reserva.',
      icon: 'question',
    });

    return result;
  }

  async registrarReserva() {
    if (!this.validarFormulario()) {
      this._toast.showAlert(
        'Debe llenar todos los campos.',
        'Validación',
        'warning'
      );
      return;
    }

    if (!(await this.confirmarRegistro())) {
      return;
    }

    const reserva: RegistrarReservaRequest = {
      idHorarioReserva: this.horario.value?.toString() ?? '',
      idConsumidor: this.consumidor?.idConsumidor.toString() ?? '',
      numeroPersonas: this.cantidadPersonas.value?.toString() ?? '',
      comentarios: this.descripcion.value ?? '',
    };

    const response = await firstValueFrom(
      this._reservaApi.postRegistrarReserva(reserva)
    );

    if (response.status === 401 || response.status === 403) {
      this._toast.showAlert(
        'No tiene permisos para realizar esta acción',
        'Error',
        'error'
      );
      return;
    }

    if (!response.body?.success) {
      this._toast.showAlert(
        response.body?.message ?? 'No se pudo registrar la reserva',
        'Error',
        'error'
      );

      return;
    }

    this.idReserva = Number(response.body.message);

    //this._toast.showAlert('Reserva registrada correctamente', 'Éxito', 'success');

    this.clearForm();

    const result = await alertAsync({
      title: 'Éxito',
      text: '¡Reserva registrada correctamente!',
      icon: 'success',
      confirmButtonText: 'Ver ticket',
    });

    if (result) {
      this.mostrarModalTicket();
    }
  }

  mostrarModalTicket() {
    this.matDialog.open(ModalTicketComponent, {
      data: {
        idReserva: this.idReserva,
      },
      width: '450px',
    });
  }

  openDialog() {
    this.matDialog.open(ModalTicketComponent, {
      data: {
        idReserva: this.idReserva,
      },
      width: '450px',
    });
  }

  clearForm() {
    this.fecha.reset();
    this.horario.reset();
    this.cantidadPersonas.reset();
    this.descripcion.reset();
  }

  async selectionDateChanged(evt: MatDatepickerInputEvent<Date>) {
    await this.obtenerHorariosPorFecha(evt);
    this.horario.reset();
  }
}
