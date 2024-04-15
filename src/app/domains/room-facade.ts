import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Room } from "../shared/models/room.model";
import { UserService } from "../shared/services/user.service";

@Injectable()

export class RoomFacade {

  constructor(private userService: UserService) { }

  private room: Room[] = [];

  // Création des méthodes liées aux rooms depuis le CALL API du userService

  getAllRooms(): Observable<Room[]> {
    return this.userService.getRooms().pipe(
      map((room) => {
        this.room = room;
        return room;
      })
    );
  }

  getAvailableRooms(): Observable<Room[]> {
    return this.userService.getAvailableRooms().pipe(
      map((room) => {
        this.room = room;
        return room;
      })
    );
  }

  createRooms(room: Room, maxRooms: number): Observable<any> {
    return this.userService.createRooms(room, maxRooms);
  }

  createSpecificRoom(room: Room): Observable<any> {
    return this.userService.createSpecificRoom(room);
  }

  updateRoom(room: Room): Observable<any> {
    return this.userService.updateRoom(room);
  }

  deleteRoom(id: number): Observable<any> {
    return this.userService.deleteRoom(id);
  }

  deleteAllRooms(): Observable<any> {
    return this.userService.deleteAllRooms();
  }
}