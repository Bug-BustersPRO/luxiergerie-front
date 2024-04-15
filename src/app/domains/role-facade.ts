import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Role } from "../shared/models/role.model";
import { UserService } from "../shared/services/user.service";

@Injectable()
export class RoleFacade {
  constructor(private userService: UserService) { }

  private roles: Role[] = [];

  // Création des méthodes liées aux roles depuis le CALL API du UserService

  getAllRoles(): Observable<Role[]> {
    return this.userService.getRoles().pipe(
      map((roles) => {
        this.roles = roles;
        return roles;
      })
    );
  }

  getRoleById(id: number): Observable<Role> {
    return this.userService.getRoleById(id);
  }

  addNewRole(role: Role): Observable<any> {
    return this.userService.addNewRole(role);
  }

  updateRole(role: Role): Observable<any> {
    return this.userService.updateRole(role);
  }

  deleteRole(id: number): Observable<any> {
    return this.userService.deleteRole(id);
  }
}