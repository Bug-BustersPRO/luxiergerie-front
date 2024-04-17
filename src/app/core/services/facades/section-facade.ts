import { Injectable } from "@angular/core";
import { SectionHttpService } from "../http-service/section-http-service";
import { Section } from "../../shared/models/section";
import { BehaviorSubject, Observable, map, take, tap } from "rxjs";

@Injectable()
export class SectionFacade {

    constructor(private sectionHttpService: SectionHttpService) {}

      private section: BehaviorSubject<Section> = new BehaviorSubject(new Section("", "", ""));
      readonly section$: Observable<Section> = this.section.asObservable();

    getSections(): Observable<Section> {
      return this.sectionHttpService.getSections()
      .pipe(
      take(1),
      tap(x => console.log(x)),
      map((response) => response),
      );
    }

    getSection(id: number) {
      return fetch(`http://localhost:8090/api/sections/${id}`);
    }
}