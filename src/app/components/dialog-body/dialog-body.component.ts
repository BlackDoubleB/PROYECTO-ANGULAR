import { Component } from '@angular/core';
import { ModalTicketComponent } from '../modal-ticket/modal-ticket.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent {

  title = 'angular-dialog';
  constructor(private matDialog: MatDialog){

  }
  openTicket(){
    this.matDialog.open(ModalTicketComponent,{
      width: '450px'
    })
  }
}
