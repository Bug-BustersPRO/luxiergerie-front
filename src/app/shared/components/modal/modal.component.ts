import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ModalComponent{

  @Input() public title: string = '';
  @Output() public closeModalEvent = new EventEmitter<void>();
  @Input() public toggleModal!: Observable<void>;
  @Input() public showModal: boolean = false;


  closeModal() {
    this.showModal = false;
    this.closeModalEvent.emit();
  }
}
