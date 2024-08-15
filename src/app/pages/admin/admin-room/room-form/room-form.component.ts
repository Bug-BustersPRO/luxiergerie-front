import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { Role } from 'src/app/shared/models/role.model';
import { Room } from 'src/app/shared/models/room.model';
import { RoleService } from 'src/app/shared/services/role.service';
import { RoomService } from 'src/app/shared/services/room.service';

@Component({
  selector: 'app-room-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.scss'
})
export class RoomFormComponent implements OnChanges {
  public room: Room = new Room("", null, null, new Role('', '', null, null), null, null, null);
  public roles!: Role[];
  @Output() closeModal = new EventEmitter<void>();
  @Input() isCreateRoom: boolean = true;
  @Input() roomToUpdate!: Room;

  constructor(
    private roomService: RoomService,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef,
    private roleService: RoleService
  ) {
    this.roomService.getRooms();
    this.roleService.getRoles();
    effect(() => {
      this.roles = this.roleService
        .getAllRolesSig()
        .filter(
          (role: Role) =>
            role.name !== 'ROLE_ADMIN' && role.name !== 'ROLE_EMPLOYEE'
        );
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['roomToUpdate'] && changes['roomToUpdate'].currentValue) {
      this.room = { ...this.roomToUpdate };
      this.cdRef.detectChanges();
    }
  }

  getRoleName(role: string) {
    switch (role) {
      case 'ROLE_GOLD':
        return 'Chambre Gold';
      case 'ROLE_DIAMOND':
        return 'Chambre Diamant';
      default:
        return;
    }
  }

  onSubmit() {
    if (this.isCreateRoom) {
      if (!this.room.roomNumber || !this.room.floor || !this.room.role) {
        this.toastr.error("Veuillez remplir tous les champs obligatoires");
        return;
      }
      if (this.roomService.getAllRoomsSig().find(
        (room: Room) =>
          room.roomNumber === this.room.roomNumber && room.floor === this.room.floor
      )) {
        this.toastr.error("Cette chambre existe déjà");
        return;
      }
      this.roomService.createSpecificRoom(this.room).subscribe({
        next: () => {
          this.roomService.getRooms();
          this.toastr.success("Chambre créée avec succès");
          this.closeModal.emit();
        },
        error: (err) => {
          console.error(err);
          this.toastr.error("Erreur lors de la création de la chambre");
        }
      });
    } else {
      if (!this.room.roomNumber || !this.room.floor || !this.room.role) {
        this.toastr.error("Veuillez remplir tous les champs obligatoires");
        return;
      }
      this.roomService.updateRoom(this.room).subscribe({
        next: () => {
          this.roomService.getRooms();
          this.toastr.success("Chambre modifiée avec succès");
          this.closeModal.emit();
        },
        error: (err) => {
          this.toastr.error("Erreur lors de la modification de la chambre");
        }
      });
    }
  }

  clearForm() {
    this.room = new Room("", null, null, new Role('', '', null, null), null, null, null);
    this.cdRef.detectChanges();
  }

}