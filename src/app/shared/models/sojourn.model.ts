
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
  public sojournIdentifier: string;
  public password: string;
  public clientId: string;
  public roomId: string;

  constructor(id: string, entryDate: Date, exitDate: Date, status: SojournStatus, sojournIdentifier: string, password: string, clientId: string, roomId: string) {
    this.id = id;
    this.entryDate = entryDate;
    this.exitDate = exitDate;
    this.status = status;
    this.sojournIdentifier = sojournIdentifier;
    this.password = password;
    this.clientId = clientId;
    this.roomId = roomId;
  }

}