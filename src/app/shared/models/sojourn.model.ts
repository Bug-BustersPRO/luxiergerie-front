
export enum SojournStatus {
  RESERVED = 'RESERVED',
  VALIDATED = 'VALIDATED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  CANCELED = 'CANCELED'
}

export class Sojourn {
  public id?: string;
  public entryDate: Date | null;
  public exitDate: Date | null;
  public status: SojournStatus;
  public sojournIdentifier?: string;
  public password?: string;
  public clientId: string;
  public roomId: string;
  public roomRole: { name: string }[] | null;

  constructor(
    id: string,
    entryDate: Date | null,
    exitDate: Date | null,
    status: SojournStatus,
    sojournIdentifier: string,
    password: string,
    clientId: string,
    roomId: string,
    roomRole: { name: string }[] | null) {
    this.id = id;
    this.entryDate = entryDate;
    this.exitDate = exitDate;
    this.status = status;
    this.sojournIdentifier = sojournIdentifier;
    this.password = password;
    this.clientId = clientId;
    this.roomId = roomId;
    this.roomRole = roomRole;
  }

}