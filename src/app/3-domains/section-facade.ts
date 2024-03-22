import { Injectable } from "@angular/core";
import { SectionHttpService } from "../2-services/section-http-service/section-http-service";
import { BehaviorSubject, Observable, map, take, tap } from "rxjs";
import { Section } from "../2-services/models/section";

@Injectable()
export class SectionFacade {

    constructor(private sectionHttpService: SectionHttpService) {}

    private section: BehaviorSubject<Section> = new BehaviorSubject(new Section("", "", ""));
    readonly section$: Observable<Section> = this.section.asObservable();

  getSections(): Observable<any> {
    return this.sectionHttpService.getSections()
    .pipe(
    take(1),
    tap(x => console.log(x)),
    );
  }

  getSection(id: number) {
    return fetch(`http://localhost:8090/api/sections/${id}`);
  }
}