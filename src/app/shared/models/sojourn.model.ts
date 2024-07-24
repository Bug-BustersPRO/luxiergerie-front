
export enum SojournStatus {
  RESERVED = 'RESERVED',
  VALIDATED = 'VALIDATED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  CANCELED = 'CANCELED'
}

export class Sojourn {
  public id: string;
  public entryDate: Date;
  public exitDate: Date;
  public status: SojournStatus;
  public clientId: string;
  public roomId: string;

  constructor(id: string, entryDate: Date, exitDate: Date, status: SojournStatus, clientId: string, roomId: string) {
    this.id = id;
    this.entryDate = entryDate;
    this.exitDate = exitDate;
    this.status = status;
    this.clientId = clientId;
    this.roomId = roomId;
  }

}