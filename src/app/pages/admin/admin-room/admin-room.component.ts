import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Client } from 'src/app/shared/models/client.model';
import { Room } from 'src/app/shared/models/room.model';
import { Sojourn } from 'src/app/shared/models/sojourn.model';
import { ClientService } from 'src/app/shared/services/client.service';
import { RoomService } from 'src/app/shared/services/room.service';
import { SojournService } from 'src/app/shared/services/sojourn.service';
import { AddSojournComponent } from './add-sojourn/add-sojourn.component';

@Component({
  selector: 'app-admin-room',
  standalone: true,
  imports: [CommonModule, ModalComponent, AddSojournComponent],
  templateUrl: './admin-room.component.html',
  styleUrl: './admin-room.component.scss',
})
export class AdminRoomComponent implements OnInit {

  public sojourns: Sojourn[] = [];
  public selectedSojourn!: Sojourn;
  public clients: Client[] = [];
  public rooms: Room[] = [];
  public isModalOpen: boolean = false;

  constructor(private sojournService: SojournService, private clientService: ClientService, private roomService: RoomService) {
    this.sojournService.getSojourns();
    this.clientService.getAll();
    this.roomService.getRooms();
    effect(() => {
      this.sojourns = this.sojournService.getAllSojournsSig();
      this.clients = this.clientService.getAllClientsSig();
      this.rooms = this.roomService.getOccupiedRoomsSig();
    });
  }

  ngOnInit(): void {
  }

  addSojourn() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}