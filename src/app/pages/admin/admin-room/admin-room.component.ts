import { Component, effect } from '@angular/core';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-admin-room',
  standalone: true,
  imports: [],
  templateUrl: './admin-room.component.html',
  styleUrl: './admin-room.component.scss'
})
export class AdminRoomComponent {

  constructor(private clientService: ClientService) {
    effect(() => {

    });
  }


}
