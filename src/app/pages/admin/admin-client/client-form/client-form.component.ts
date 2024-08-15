import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { Client } from 'src/app/shared/models/client.model';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ButtonComponent, FormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent implements OnChanges {

  public client: Client = new Client("", "", "", "", "", 0, null);
  @Output() closeModal = new EventEmitter<void>();
  @Input() isCreateClient: boolean = true;
  @Input() clientToUpdate!: Client;

  constructor(
    private clientService: ClientService,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef
  ) {
    this.clientService.getAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientToUpdate'] && changes['clientToUpdate'].currentValue) {
      this.client = { ...this.clientToUpdate };
      this.cdRef.detectChanges();
    }
  }

  onSubmit() {
    if (this.isCreateClient) {
      if (!this.client.firstName || !this.client.lastName || !this.client.email || !this.client.phoneNumber) {
        this.toastr.error("Veuillez remplir tous les champs obligatoires");
        return;
      }
      this.clientService.createClient(this.client).subscribe({
        next: () => {
          this.clientService.getAll();
          this.toastr.success("Client créé avec succès");
          this.closeModal.emit();
        },
        error: (err) => {
          this.toastr.error("Erreur lors de la création du client");
        }
      });
    } else {
      if (!this.client.firstName || !this.client.lastName || !this.client.email || !this.client.phoneNumber) {
        this.toastr.error("Veuillez remplir tous les champs obligatoires");
        return;
      }
      this.clientService.updateClient(this.client).subscribe({
        next: () => {
          this.clientService.getAll();
          this.toastr.success("Client modifié avec succès");
          this.closeModal.emit();
        },
        error: () => {
          this.toastr.error("Erreur lors de la modification du client");
        }
      });
    }
  }

  clearForm() {
    this.client = new Client("", "", "", "", "", 0, null);
    this.cdRef.detectChanges();
  }

}