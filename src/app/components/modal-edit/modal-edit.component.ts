import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import { Reserva } from 'src/app/model/reserva.model';
import { HorarioReservaApiService } from 'src/app/services/api/horarioReserva.api';
import { ReservaApiService } from 'src/app/services/api/reserva.api';
import { ToastService } from 'src/app/services/utils/toast.service';
import { firstValueFrom } from 'rxjs';
import { HorarioReserva } from 'src/app/model/horarioReserva.model';
import { alertAsync } from 'src/app/services/utils/alert';
import { RegistrarReservaRequest } from 'src/app/config/interfaces/request/resgistrarReserva.interface';
import { UserState } from 'src/app/services/state/user.state';
import { ActualizarReservaRequest } from 'src/app/config/interfaces/request/actualizarReserva.interface';
import { ReservaState } from 'src/app/services/state/reserva.state';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css'],
})
export class ModalEditComponent implements OnInit {
  public reserva: Reserva;
  public horarios: Array<HorarioReserva> = [];
  public hoy = dayjs().add(1, 'day').format('YYYY-MM-DD');
  public descripcion = new FormControl<string>('');
  public fecha = new FormControl<Date | null>(null, Validators.required);
  public horario = new FormControl<number | null>(null, Validators.required);
  public cantidadPersonas = new FormControl<number | null>(
    null,
    Validators.required
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Reserva,
    private _userState: UserState,
    private _reservaApi: ReservaApiService,
    private _horarioReservaApi: HorarioReservaApiService,
    private _toast: ToastService,
    private _reservaState: ReservaState,
    public dialogRef: MatDialogRef<ModalEditComponent>
  ) {
    this.reserva = this.data;
    this.fecha.setValue(dayjs(this.reserva.horarioReserva.fecha).toDate());
    this.cantidadPersonas.setValue(Number(this.reserva.cantidadPersonas));
    this.descripcion.setValue(this.reserva.comentariosAdicionales);
  }

  async ngOnInit() {
    if (!this.validarSiPuedeEditar()) {
      this.dialogRef.close();
      return;
    }

    await this.cargarHorariosPorFecha(
      dayjs(this.reserva.horarioReserva.fecha).toDate()
    );

    this.horario.setValue(this.reserva.horarioReserva.idHorarioReserva);
  }

  validarSiPuedeEditar() {
    const fechaReserva = new Date(
      this.reserva.horarioReserva.fecha +
        ' ' +
        this.reserva.horarioReserva.horario
    );
    const fechaActual = new Date();

    if (fechaReserva < fechaActual) {
      this._toast.showAlert(
        'No se puede editar una reserva con fecha anterior a la actual',
        'Validación',
        'warning'
      );
      return false;
    }

    if (this.reserva.estadoReserva.nombreEstado != 'Pendiente') {
      this._toast.showAlert(
        'No se puede editar una reserva que no esté pendiente',
        'Validación',
        'warning'
      );
      return false;
    }

    return true;
  }

  async obtenerHorariosPorFecha(evt: MatDatepickerInputEvent<Date>) {
    if (!evt.value) {
      return;
    }

    await this.cargarHorariosPorFecha(evt.value);
  }

  async cargarHorariosPorFecha(fec: Date) {
    const fecha = dayjs(fec).format('YYYY-MM-DD');

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

  async selectionDateChanged(evt: MatDatepickerInputEvent<Date>) {
    await this.obtenerHorariosPorFecha(evt);
    this.horario.reset();
  }

  async confirmarModificacion() {
    const result = await alertAsync({
      title: 'Confirmación',
      text: 'Por favor confirme la modificación de la reserva.',
      icon: 'question',
    });

    return result;
  }

  async procesarEdicion() {
    if (!this.validarFormulario()) {
      this._toast.showAlert(
        'Debe llenar todos los campos.',
        'Validación',
        'warning'
      );
      return;
    }

    if (!(await this.confirmarModificacion())) {
      return;
    }

    const reserva: ActualizarReservaRequest = {
      idHorarioReserva: this.horario.value?.toString() ?? '',
      idReserva: this.reserva.idReserva.toString() ?? '',
      numeroPersonas: this.cantidadPersonas.value?.toString() ?? '',
      comentarios: this.descripcion.value ?? '',
    };

    const response = await firstValueFrom(
      this._reservaApi.putRegistrarReserva(reserva)
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

    this._toast.showAlert(
      'Reserva modificada correctamente',
      'Éxito',
      'success'
    );

    this.dialogRef.close();
    this._reservaState.sendListaReserva();

    /* this.idReserva = Number(response.body.message);

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
    } */
  }
}
