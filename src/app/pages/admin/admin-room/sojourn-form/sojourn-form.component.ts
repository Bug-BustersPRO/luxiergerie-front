import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { Client } from 'src/app/shared/models/client.model';
import { Room } from 'src/app/shared/models/room.model';
import { Sojourn, SojournStatus } from 'src/app/shared/models/sojourn.model';
import { ClientService } from 'src/app/shared/services/client.service';
import { RoomService } from 'src/app/shared/services/room.service';
import { SojournService } from 'src/app/shared/services/sojourn.service';

@Component({
  selector: 'app-sojourn-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './sojourn-form.component.html',
  styleUrl: './sojourn-form.component.scss',
})
export class SojournFormComponent implements OnChanges {
  public sojourn: Sojourn = new Sojourn("", new Date(), new Date(), SojournStatus.IN_PROGRESS, "", "", "", "", [{ name: '' }]);
  public clients: Client[] = [];
  public availableRooms: Room[] = [];
  @Output() closeModal = new EventEmitter<void>();
  @Input() isCreateSojourn: boolean = true;
  @Input() sojournToUpdate!: Sojourn;

  constructor(
    private sojournService: SojournService,
    private roomService: RoomService,
    private clientService: ClientService,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef) {
    this.refreshData();
    effect(() => {
      this.availableRooms = this.roomService.getAllAvailableRoomsSig();
      this.clients = this.clientService.getClientsWithNoRoom$();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sojournToUpdate'] && changes['sojournToUpdate'].currentValue) {
      this.sojourn = { ...this.sojournToUpdate };
      this.cdRef.detectChanges();
    }
  }

  refreshData() {
    this.roomService.getAvailableRooms();
    this.clientService.getAll();
    this.roomService.getRooms();
  }

  onSubmit() {
    console.log(this.sojourn);
    if (this.isCreateSojourn) {
      this.sojournService.createSojourn(this.sojourn).subscribe({
        next: (response) => {
          console.log("Sojourn created successfully", response);
          this.refreshData();
          this.toastr.success("Séjour créé avec succès");
        },
        error: (error) => {
          console.log(error, "There was an error while creating sojourn");
          this.toastr.error("Il y a eu une erreur lors de la création du séjour");
        }
      });
      this.sojourn = new Sojourn("", new Date(), new Date(), SojournStatus.IN_PROGRESS, "", "", "", "", [{ name: '' }]);
    } else {
      this.sojournService.updateSojourn(this.sojourn).subscribe({
        next: (response) => {
          console.log("Sojourn updated successfully", response);
          this.refreshData();
          this.toastr.success("Séjour mis à jour avec succès");
        },
        error: (error) => {
          console.log(error, "There was an error while updating sojourn");
          this.toastr.error("Il y a eu une erreur lors de la mise à jour du séjour");
        }
      });
    }

    this.closeModal.emit();
  }

  clearForm() {
    console.log('hey');
    this.sojourn = new Sojourn("", new Date(), new Date(), SojournStatus.RESERVED, "", "", "", "", [{ name: '' }]);
    this.cdRef.detectChanges();
  }

}