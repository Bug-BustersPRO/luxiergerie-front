import { Component } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { RegisterEmployeeComponent } from 'src/app/shared/components/register-employee/register-employee.component';

@Component({
  selector: 'app-admin-employee',
  templateUrl: './admin-employee.component.html',
  styleUrl: './admin-employee.component.scss',
  standalone: true,
  imports: [ModalComponent, RegisterEmployeeComponent]
})
export class AdminEmployeeComponent {

  public isModalOpen: boolean = false;
  
  openModal()  {
    this.isModalOpen = true;
  }

}