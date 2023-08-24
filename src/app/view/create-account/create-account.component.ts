import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrearCuentaRequest } from 'src/app/config/interfaces/request/crearCuenta.interface';
import { UsuarioApiService } from 'src/app/services/api/usuario.api';
import { ToastService } from 'src/app/services/utils/toast.service';
import { firstValueFrom } from 'rxjs';
import { alertAsync } from 'src/app/services/utils/alert';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent {
  public nombreCompletos = new FormControl<string>('', Validators.required);
  public dni = new FormControl<string>('', Validators.required);
  public telefono = new FormControl<string>('', Validators.required);
  public correo = new FormControl<string>('', Validators.required);
  public usuario = new FormControl<string>('', Validators.required);
  public contrasena = new FormControl<string>('', Validators.required);
  public contrasenaRepetir = new FormControl<string>('', Validators.required);
  public rol = new FormControl<string>('2', Validators.required);

  constructor(
    private router: Router,
    private _toast: ToastService,
    private _usuarioApi: UsuarioApiService
  ) {}

  regresar() {
    this.router.navigateByUrl('/login');
  }

  validarCampos() {
    if (
      this.nombreCompletos.invalid ||
      this.dni.invalid ||
      this.telefono.invalid ||
      this.correo.invalid ||
      this.usuario.invalid ||
      this.contrasena.invalid ||
      this.contrasenaRepetir.invalid ||
      this.rol.invalid
    ) {
      return false;
    }

    return true;
  }

  async registrar() {
    if (!this.validarCampos()) {
      this._toast.showAlert(
        'Debe completar todos los campos',
        'Error',
        'error'
      );
      return;
    }

    if (this.contrasena.value != this.contrasenaRepetir.value) {
      this._toast.showAlert(
        'Las contraseñas no coinciden',
        'Validación',
        'warning'
      );

      return;
    }

    let request: CrearCuentaRequest = {
      nombreCompletos: this.nombreCompletos.value ?? '',
      dni: this.dni.value ?? '',
      telefono: this.telefono.value ?? '',
      correo: this.correo.value ?? '',
      rol: this.rol.value ?? '',
      usuario: this.usuario.value ?? '',
      contrasena: this.contrasena.value ?? '',
    };

    const response = await firstValueFrom(
      this._usuarioApi.postCrearUsuario(request)
    );

    if (!response || !response.body?.success) {
      this._toast.showAlert(
        response.body?.message ?? 'No se pudo registrar la cuenta',
        'Error',
        'error'
      );

      return;
    }

    const result = await alertAsync({
      title: 'Éxito',
      text: '¡Cuenta registrada correctamente!',
      icon: 'success',
    });

    this.router.navigateByUrl('/login');

    // this._crearCuentaApi.crearCuenta(request).subscribe(
    //   (response) => {
    //     if (response.status == 200) {
    //       this._toastService.showAlert(
    //         'Cuenta creada correctamente',
    //         'Éxito',
    //         'success'
    //       );
    //       this.router.navigateByUrl('/login');
    //     }
    //   },
    //   (error) => {
    //     if (error.status == 409) {
    //       this._toastService.showAlert(
    //         'El usuario ya existe',
    //         'Error',
    //         'error'
    //       );
    //     }
    //   }
    // );
  }
}
