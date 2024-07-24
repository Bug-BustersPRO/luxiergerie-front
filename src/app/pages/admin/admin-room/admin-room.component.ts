import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/models/client.model';
import { Room } from 'src/app/shared/models/room.model';
import { Sojourn } from 'src/app/shared/models/sojourn.model';
import { ClientService } from 'src/app/shared/services/client.service';
import { RoomService } from 'src/app/shared/services/room.service';
import { SojournService } from 'src/app/shared/services/sojourn.service';

@Component({
  selector: 'app-admin-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-room.component.html',
  styleUrl: './admin-room.component.scss'
})
export class AdminRoomComponent implements OnInit {

  public sojourns: Sojourn[] = [];
  public selectedSojourn!: Sojourn;
  public clients: Client[] = [];
  public rooms: Room[] = [];
  public clientById!: Client;
  public roomById!: Room;

  constructor(private sojournService: SojournService, private clientService: ClientService, private roomService: RoomService) {
    this.sojournService.getSojourns();
    this.clientService.getAll();
    this.roomService.getRooms();
    effect(() => {
      this.sojourns = this.sojournService.getAllSojournsSig();
      console.log(this.sojourns);
      this.clients = this.clientService.getAllClientsSig();
      this.rooms = this.roomService.getAllRoomsSig();
    });
  }

  ngOnInit(): void {
  }


}