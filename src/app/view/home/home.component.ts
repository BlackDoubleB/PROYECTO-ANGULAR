import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {

  }
   goToLogin() {
    this.router.navigateByUrl('/login');
  }
  openPdf(url: string) {
    window.open(url, '_blank');
  }
}
