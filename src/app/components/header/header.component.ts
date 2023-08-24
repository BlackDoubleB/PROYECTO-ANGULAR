import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public isOpen: boolean= false;
  @Output() toggleSidebarEvent = new EventEmitter<boolean>();
  toggleSidebar(){
    this.isOpen = !this.isOpen;
    this.toggleSidebarEvent.emit(this.isOpen)
  }
}
