import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {
  constructor(private toastr: ToastrService) {}

  showAlert(message: string, title: string, tipo: string) {
    if (tipo == 'success') {
      this.toastr.success(message, title, {
        timeOut: 5000,
        positionClass: 'toast-top-right',
        closeButton: true,
        progressBar: true,
      });
    } else if (tipo == 'warning') {
      this.toastr.warning(message, title, {
        timeOut: 5000,
        positionClass: 'toast-top-right',
        closeButton: true,
        progressBar: true,
      });
    } else if (tipo == 'error') {
      this.toastr.error(message, title, {
        timeOut: 5000,
        positionClass: 'toast-top-right',
        closeButton: true,
        progressBar: true,
      });
    } else if (tipo == 'info') {
      this.toastr.info(message, title, {
        timeOut: 5000,
        positionClass: 'toast-top-right',
        closeButton: true,
        progressBar: true,
      });
    }
  }
}
