import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, EventEmitter, OnInit, Output } from '@angular/core';
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
  selector: 'app-add-sojourn',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './add-sojourn.component.html',
  styleUrl: './add-sojourn.component.scss',
})
export class AddSojournComponent implements OnInit {
  public sojourn: Sojourn = new Sojourn("", new Date(), new Date(), SojournStatus.RESERVED, "", "", "", "", [{ name: '' }]);
  public clients: Client[] = [];
  public availableRooms: Room[] = [];
  @Output() closeModal = new EventEmitter<void>();

  constructor(
    private sojournService: SojournService,
    private roomService: RoomService,
    private clientService: ClientService,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef) {
    this.roomService.getAvailableRooms();
    this.clientService.getAll();
    effect(() => {
      this.availableRooms = this.roomService.getAllAvailableRoomsSig();
      console.log('Available', this.availableRooms);
      this.clients = this.clientService.getClientsWithNoRoom$();
      console.log('Clients', this.clients);
    });

  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.sojourn);
    this.sojournService.createSojourn(this.sojourn).subscribe({
      next: (response) => {
        console.log("Sojourn created successfully", response);
        this.roomService.getRooms();
        this.toastr.success("Sojourn created successfully");
      },
      error: (error) => {
        console.log(error, "There was an error while creating sojourn");
        this.toastr.error("There was an error while creating sojourn");
      }
    });
    this.closeModal.emit();
  }

  clearForm() {
    console.log('hey');
    this.sojourn = new Sojourn("", new Date(), new Date(), SojournStatus.RESERVED, "", "", "", "", [{ name: '' }]);
    this.cdRef.detectChanges();
  }

}