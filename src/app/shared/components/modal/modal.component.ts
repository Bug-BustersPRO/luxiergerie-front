import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ModalComponent{

  //to use modal in an other component, set this variable and function
  // public isModalOpen: boolean = false; openModal() {this.isModalOpen = true;}
  // call the function where you need to open the modal
  // exemple of use of the component
  //   <app-modal
  //   title="Réserver ma séance"
  //   [showModal]="isModalOpen"
  //   (closeModalEvent)="isModalOpen = false">
  //   <section>
  //     <div>test data</div>
  //     <div>test data</div>
  //     <div>test data</div>
  //   </section>
  // </app-modal>


  @Input() public title: string = '';
  @Output() public closeModalEvent = new EventEmitter<void>();
  @Input() public toggleModal!: Observable<void>;
  @Input() public showModal: boolean = false;


  closeModal() {
    this.showModal = false;
    this.closeModalEvent.emit();
  }
}
