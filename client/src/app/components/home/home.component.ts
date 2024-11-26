import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service'; // Importa NotificationService

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notificationMessage: string | null = null;
  isMenuVisible: boolean = false; //Nuevo

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notification$.subscribe(message => {
      this.notificationMessage = message;
    });
  }

  toggleMenu(): void { //Nuevo
    this.isMenuVisible = !this.isMenuVisible;
  }
}
