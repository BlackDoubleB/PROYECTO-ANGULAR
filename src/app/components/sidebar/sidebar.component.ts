import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { MediaApiService } from 'src/app/services/api/media.api';
import { AuthService } from 'src/app/services/handler/auth.service';
import { UserState } from 'src/app/services/state/user.state';
import { firstValueFrom } from 'rxjs';
import { ToastService } from 'src/app/services/utils/toast.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() isOpen: boolean = false;
  public user: User = new User();
  public nombres = '';

  constructor(
    private router: Router,
    private _userState: UserState,
    private _authService: AuthService,
    private _mediaApi: MediaApiService,
    private _toast: ToastService
  ) {
    //this.user = this._userState.getUser();
  }

  ngOnInit(): void {
    this.user = this._userState.getUser();
    this.nombres = this.user.nombres;
  }

  goToMyReservation() {
    this.router.navigateByUrl('/layout/my-reservation');
  }

  goToCreateReservation() {
    this.router.navigateByUrl('/layout/create-reservation');
  }

  async goToLogOut() {
    await this._authService.logout();
    this._authService.removeToken();
    this.router.navigateByUrl('/login');
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  async openPdf() {
    const response = await firstValueFrom(
      this._mediaApi.getArchivoPorNombre('carta.pdf')
    );

    if (!response || !response.body) {
      this._toast.showAlert(
        'No hay ninguna carta disponible',
        'Error',
        'error'
      );
      return;
    }

    var blob = new Blob([response.body], { type: 'application/pdf' });
    var blobURL = URL.createObjectURL(blob);
    window.open(blobURL, '_blank');

    //window.open(url, '_blank');
  }
}
