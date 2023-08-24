import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ModalEditComponent } from 'src/app/components/modal-edit/modal-edit.component';
import { ModalSeeComponent } from 'src/app/components/modal-see/modal-see.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { UserState } from 'src/app/services/state/user.state';
import { ReservaApiService } from 'src/app/services/api/reserva.api';
import { Subject, firstValueFrom, takeUntil } from 'rxjs';
import { ToastService } from 'src/app/services/utils/toast.service';
import { Reserva } from 'src/app/model/reserva.model';
import * as dayjs from 'dayjs';
import { ReservaState } from 'src/app/services/state/reserva.state';

/* export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
]; */

@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.css'],
})
export class MyReservationComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  public fecha = new FormControl<Date | null>(null);
  public displayedColumns: string[] = [
    'ticket',
    'nombreCompletos',
    'correo',
    'fecha',
    'horario',
    'cantidadPersonas',
    'estadoReserva',
    'accion',
  ];
  public listaReservas: Array<Reserva> = [];
  public dataSource: MatTableDataSource<Reserva>;

  private unsubscribe$ = new Subject<void>();

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    private matDialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private _userState: UserState,
    private _reservaApi: ReservaApiService,
    private _toast: ToastService,
    private _reservaState: ReservaState
  ) {
    this.dataSource = new MatTableDataSource(this.listaReservas);
  }

  async ngOnInit() {
    await this.obtenerListaReservas();
    this.observerInit();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observerInit() {
    this._reservaState.sendListaReservaObservable
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(async () => {
        await this.obtenerListaReservas();
      });
  }

  async obtenerListaReservasPorConsumidorYFecha() {
    const idConsumidor = this._userState.getUser().idConsumidor;
    const fecha = dayjs(this.fecha.value).format('YYYY-MM-DD');

    const response = await firstValueFrom(
      this._reservaApi.getReservasPorConsumidorYFecha(idConsumidor, fecha)
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

    this.listaReservas = response.body?.values;
    this.dataSource.data = this.listaReservas;
  }

  async obtenerListaReservasPorConsumidor() {
    const idConsumidor = this._userState.getUser().idConsumidor;

    const response = await firstValueFrom(
      this._reservaApi.getReservasPorConsumidor(idConsumidor)
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

    this.listaReservas = response.body?.values;
    this.dataSource.data = this.listaReservas;
  }

  async obtenerListaReservas() {
    if (this.fecha.value && this.fecha.valid) {
      await this.obtenerListaReservasPorConsumidorYFecha();
      return;
    }

    await this.obtenerListaReservasPorConsumidor();
  }

  openModalEdit(data: Reserva) {
    this.matDialog.open(ModalEditComponent, {
      data,
      width: '450px',
    });
  }

  openModalSee(data: Reserva) {
    this.matDialog.open(ModalSeeComponent, {
      data,
      width: '450px',
    });
  }

  selectionDateChanged() {
    this.obtenerListaReservas();
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
