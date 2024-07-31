import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { Room } from 'src/app/shared/models/room.model';
import { ClientService } from 'src/app/shared/services/client.service';
import { RoomService } from 'src/app/shared/services/room.service';
import { SojournService } from 'src/app/shared/services/sojourn.service';
import { RoomFormComponent } from './room-form/room-form.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { RoleService } from 'src/app/shared/services/role.service';

@Component({
  selector: 'app-admin-room',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, RoomFormComponent, ModalComponent],
  templateUrl: './admin-room.component.html',
  styleUrl: './admin-room.component.scss'
})
export class AdminRoomComponent {
  @ViewChild(RoomFormComponent) roomForm!: RoomFormComponent;
  public isModalOpen: boolean = false;
  public rooms: Room[] = [];
  public selectedRoom!: Room;
  public isUpdateModalOpen: boolean = false;

  constructor(
    private sojournService: SojournService,
    private clientService: ClientService,
    private roomService: RoomService,
    private cdRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private roleService: RoleService
  ) {
    this.refreshData();
    effect(() => {
      this.rooms = this.roomService.getAllRoomsSig();
    });
  }

  getRoleName(roleName: string) {
    if (!roleName) return;
    switch (roleName) {
      case 'ROLE_GOLD':
        return 'Chambre Gold';
      case 'ROLE_DIAMOND':
        return 'Chambre Diamant';
      default:
        return 'Chambre Standard';
    }
  }

  refreshData() {
    this.roleService.getRoles();
    this.sojournService.getSojourns();
    this.clientService.getAll();
    this.roomService.getRooms();
  }

  openRoomModal() {
    this.isModalOpen = true;
  }

  openEditModal(room: Room) {
    this.selectedRoom = room;
    this.isUpdateModalOpen = true;
    this.cdRef.detectChanges();
  }

  closeCreateModal() {
    this.isModalOpen = false;
    this.roomForm.clearForm();
  }

  closeUpdateModal() {
    this.isUpdateModalOpen = false;
    this.roomForm.clearForm();
  }

  deleteRoom(roomId: string) {
    this.roomService.deleteRoom(roomId).subscribe({
      next: () => {
        this.toastr.success("Chambre supprimée avec succès");
        this.refreshData();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("Erreur lors de la suppression de la chambre");
      }
    });
  }

}