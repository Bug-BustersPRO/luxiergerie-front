 import { Injectable } from "@angular/core";
 import { CoreService } from "../shared/services/core.service";
 import { Observable, map } from "rxjs";
 import { Section } from "../shared/models/section.model";

 @Injectable()
 export class SectionFacade {
    private sections: Section[] = [];

   constructor(private coreService: CoreService) { }

   // Création des méthodes liées aux sections depuis le CALL API du CoreService

   getAllSections(): Observable<Section[]> {
      return this.coreService.getSections().pipe(
        map((sections) => {
          this.sections = sections;
          return sections;
        })
      );
   }
}