import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Client } from 'src/app/shared/models/client.model';
import { Room } from 'src/app/shared/models/room.model';
import { Sojourn, SojournStatus } from 'src/app/shared/models/sojourn.model';
import { ClientService } from 'src/app/shared/services/client.service';
import { RoomService } from 'src/app/shared/services/room.service';
import { SojournService } from 'src/app/shared/services/sojourn.service';
import { SojournFormComponent } from './sojourn-form/sojourn-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-room',
  standalone: true,
  imports: [CommonModule, ModalComponent, SojournFormComponent],
  templateUrl: './admin-room.component.html',
  styleUrl: './admin-room.component.scss',
})
export class AdminRoomComponent implements OnInit {
  @ViewChild(SojournFormComponent) sojournForm!: SojournFormComponent;
  public sojourns: Sojourn[] = [];
  public selectedSojourn!: Sojourn;
  public clients: Client[] = [];
  public rooms: Room[] = [];
  public isModalOpen: boolean = false;
  public isUpdateModalOpen: boolean = false;

  constructor(
    private sojournService: SojournService,
    private clientService: ClientService,
    private roomService: RoomService,
    private cdRef: ChangeDetectorRef,
    private toastr: ToastrService) {
    this.refreshData();
    effect(() => {
      this.sojourns = this.sojournService.getAllSojournsSig();
      this.clients = this.clientService.getAllClientsSig();
      this.rooms = this.roomService.getOccupiedRoomsSig();
    });
  }

  ngOnInit(): void {
  }

  refreshData() {
    this.sojournService.getSojourns();
    this.clientService.getAll();
    this.roomService.getRooms();
  }

  openSojournModal() {
    this.isModalOpen = true;
  }

  closeCreateModal() {
    this.isModalOpen = false;
    this.sojournForm.clearForm();
  }

  closeUpdateModal() {
    this.isUpdateModalOpen = false;
    this.sojournForm.clearForm();
  }

  openEditModal(sojourn: Sojourn) {
    this.selectedSojourn = sojourn;
    this.isUpdateModalOpen = true;
    this.cdRef.detectChanges();
  }

  deleteSojourn(sojourn: Sojourn) {
    this.sojournService.deleteSojourn(sojourn.id!).subscribe({
      next: () => {
        this.refreshData();
        this.roomService.getAvailableRooms();
        this.toastr.success("Séjour supprimé avec succès");
      },
      error: (error) => {
        console.log(error, "There was an error while deleting sojourn");
        this.toastr.error("Il y a eu une erreur lors de la suppression du séjour");
      }
    });
  }

}