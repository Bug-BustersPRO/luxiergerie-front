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
  public sojourn: Sojourn = new Sojourn("", null, null, SojournStatus.IN_PROGRESS, "", "", "", "", null);
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

  getCurrentDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  getMinExitDate(): string {
    if (this.sojourn.entryDate) {
      const entryDate = new Date(this.sojourn.entryDate);
      entryDate.setDate(entryDate.getDate() + 1);
      return entryDate.toISOString().split('T')[0];
    }
    return this.getCurrentDate();
  }

  onSubmit() {
    if (this.isCreateSojourn) {
      if (!this.sojourn.clientId || !this.sojourn.roomRole || !this.sojourn.entryDate || !this.sojourn.exitDate) {
        this.toastr.error("Veuillez remplir tous les champs obligatoires");
        return;
      }
      this.sojournService.createSojourn(this.sojourn).subscribe({
        next: () => {
          this.refreshData();
          this.toastr.success("Séjour créé avec succès");
        },
        error: (error) => {
          if (error.status === 406) {
            this.toastr.error("La date d'entrée doit être antérieure à la date de sortie");
          } else {
            console.log(error, "There was an error while creating sojourn");
            this.toastr.error("Il y a eu une erreur lors de la création du séjour");
          }
        }
      });
    } else {
      this.sojournService.updateSojourn(this.sojourn).subscribe({
        next: () => {
          this.refreshData();
          this.toastr.success("Séjour mis à jour avec succès");
        },
        error: (error) => {
          console.log(error, "There was an error while updating sojourn");
          this.toastr.error("Il y a eu une erreur lors de la mise à jour du séjour");
        }
      });
    }
    this.clearForm();
    this.closeModal.emit();
  }

  clearForm() {
    this.sojourn = new Sojourn("", null, null, SojournStatus.IN_PROGRESS, "", "", "", "", null);
    this.cdRef.detectChanges();
  }

}