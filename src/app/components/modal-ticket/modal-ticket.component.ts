import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { Reserva } from 'src/app/model/reserva.model';
import { ReservaApiService } from 'src/app/services/api/reserva.api';
import { ToastService } from 'src/app/services/utils/toast.service';

@Component({
  selector: 'app-modal-ticket',
  templateUrl: './modal-ticket.component.html',
  styleUrls: ['./modal-ticket.component.css'],
})
export class ModalTicketComponent implements OnInit {
  public reserva: Reserva | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _reservaApi: ReservaApiService,
    private _toast: ToastService
  ) {}

  async ngOnInit() {
    await this.ObtenerReserva();
  }

  async ObtenerReserva() {
    const response = await firstValueFrom(
      this._reservaApi.getReservaPorId(this.data.idReserva)
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

    this.reserva = response.body?.value;
  }
}
