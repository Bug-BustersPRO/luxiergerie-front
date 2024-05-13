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

   getSectionById(id: number): Observable<Section> {
      return this.coreService.getSectionById(id);
   }

   getCategoriesBySection(id: number): Observable<any> {
      return this.coreService.getCategoriesBySection(id);
   }

   createSection(section: Section): Observable<any> {
      return this.coreService.createSection(section);
   }

   updateSection(section: Section): Observable<any> {
      return this.coreService.updateSection(section);
   }

   deleteSection(id: number): Observable<any> {
      return this.coreService.deleteSection(id);
   }
}
