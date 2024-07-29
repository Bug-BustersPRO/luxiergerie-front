import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Client } from 'src/app/shared/models/client.model';
import { Room } from 'src/app/shared/models/room.model';
import { ClientService } from 'src/app/shared/services/client.service';
import { RoomService } from 'src/app/shared/services/room.service';
import { ClientFormComponent } from './client-form/client-form.component';

@Component({
  selector: 'app-admin-client',
  standalone: true,
  imports: [ModalComponent, CommonModule, ClientFormComponent],
  templateUrl: './admin-client.component.html',
  styleUrl: './admin-client.component.scss'
})
export class AdminClientComponent implements OnInit {
  @ViewChild(ClientFormComponent) clientForm!: ClientFormComponent;
  public isModalOpen: boolean = false;
  public isUpdateModalOpen: boolean = false;
  public clients: Client[] = [];
  public selectedClient!: Client;
  public rooms: Room[] = [];

  constructor(
    private clientService: ClientService,
    private cdRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private roomService: RoomService) {
    this.roomService.getRooms();
    this.clientService.getAll();
    effect(() => {
      this.clients = this.clientService.getAllClientsSig();
      this.rooms = this.roomService.getAllRoomsSig();
      console.log(this.rooms);

    });
  }

  ngOnInit(): void {
  }

  openClientModal() {
    this.isModalOpen = true;
  }

  closeUpdateModal() {
    this.isUpdateModalOpen = false;
    this.clientForm.clearForm();
  }

  closeCreateModal() {
    this.isModalOpen = false;
    this.clientForm.clearForm();
  }

  openEditModal(client: Client) {
    this.isUpdateModalOpen = true;
    this.selectedClient = client;
    this.cdRef.detectChanges();
  }

  deleteClient(client: Client) {
    this.clientService.deleteClient(client).subscribe({
      next: () => {
        this.clientService.getAll();
        this.toastr.success("Client supprimé avec succès");
      },
      error: (error) => {
        console.log(error, "There was an error while deleting client");
        this.toastr.error("Une erreur s'est produite lors de la suppression du client");
      }
    });
  }

  getRoomByClientId(clientId: string): Room {
    return this.rooms.find(room => room.client?.id === clientId)!;
  }

}