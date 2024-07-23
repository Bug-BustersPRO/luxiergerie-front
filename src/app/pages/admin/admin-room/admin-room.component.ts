import { Component, effect } from '@angular/core';
import { Client } from 'src/app/shared/models/client.model';
import { Room } from 'src/app/shared/models/room.model';
import { Sojourn } from 'src/app/shared/models/sojourn.model';
import { ClientService } from 'src/app/shared/services/client.service';
import { RoomService } from 'src/app/shared/services/room.service';
import { SojournService } from 'src/app/shared/services/sojourn.service';

@Component({
  selector: 'app-admin-room',
  standalone: true,
  imports: [],
  templateUrl: './admin-room.component.html',
  styleUrl: './admin-room.component.scss'
})
export class AdminRoomComponent {

  public sojourns: Sojourn[] = [];
  public selectedSojourn!: Sojourn;
  public clients: Client[] = [];
  public rooms: Room[] = [];

  constructor(private sojournService: SojournService, private clientService: ClientService, private roomService: RoomService) {
    this.sojournService.getSojourns();
    this.clientService.getAll();
    this.roomService.getRooms();
    effect(() => {
      this.sojourns = this.sojournService.getAllSojournsSig();
      console.log(this.sojourns);
      this.clients = this.clientService.getAllClientsSig();
      console.log(this.clients);
      this.rooms = this.roomService.getAllRoomsSig();
      console.log(this.rooms);

    });
  }




}
