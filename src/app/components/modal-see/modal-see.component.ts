import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import { Reserva } from 'src/app/model/reserva.model';
import { ReservaState } from 'src/app/services/state/reserva.state';
import { UserState } from 'src/app/services/state/user.state';
import { ToastService } from 'src/app/services/utils/toast.service';

@Component({
  selector: 'app-modal-see',
  templateUrl: './modal-see.component.html',
  styleUrls: ['./modal-see.component.css'],
})
export class ModalSeeComponent {
  public reserva: Reserva;
  public descripcion = new FormControl<string>('');
  public fecha = new FormControl<string | null>(null, Validators.required);
  public horario = new FormControl<string | null>(null, Validators.required);
  public cantidadPersonas = new FormControl<number | null>(
    null,
    Validators.required
  );

  constructor(@Inject(MAT_DIALOG_DATA) private data: Reserva) {
    this.reserva = this.data;
    this.fecha.setValue(
      dayjs(this.reserva.horarioReserva.fecha).format('DD/MM/YYYY')
    );
    this.horario.setValue(this.reserva.horarioReserva.horario);
    this.cantidadPersonas.setValue(Number(this.reserva.cantidadPersonas));
    this.descripcion.setValue(this.reserva.comentariosAdicionales);
  }
}
