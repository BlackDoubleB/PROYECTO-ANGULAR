import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { MyReservationComponent } from './view/my-reservation/my-reservation.component';
import { CreateReservationComponent } from './view/create-reservation/create-reservation.component';
import { CreateAccountComponent } from './view/create-account/create-account.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './view/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogBodyComponent } from './components/dialog-body/dialog-body.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalTicketComponent } from './components/modal-ticket/modal-ticket.component';
import { ModalEditComponent } from './components/modal-edit/modal-edit.component';
import { ModalSeeComponent } from './components/modal-see/modal-see.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastService } from './services/utils/toast.service';
import { AuthInterceptor } from './services/interceptor/auth.interceptor';
import { UserState } from './services/state/user.state';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MyReservationComponent,
    CreateReservationComponent,
    CreateAccountComponent,
    SidebarComponent,
    HeaderComponent,
    LayoutComponent,
    DialogBodyComponent,
    ModalTicketComponent,
    ModalEditComponent,
    ModalSeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    ToastrModule.forRoot(),
    //FormsModule, MatFormFieldModule, MatInputModule
  ],
  providers: [
    ToastrService,
    ToastService,
    UserState,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
