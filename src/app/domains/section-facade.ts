// import { Injectable } from "@angular/core";
// import { SectionService } from "../services/section-service/section-service";
// import { BehaviorSubject, Observable, map, take, tap } from "rxjs";
// import { Section } from "../services/models/section";

// @Injectable()
// export class SectionFacade {

//   constructor(private sectionService: SectionService) { }

//   getSections(): Observable<any[]> {
//     return new Observable((observer) => {
//       this.sectionService.getSections().subscribe((sections) => {
//         console.log('sections',sections);
//         observer.next(sections);
//       });
//     });
//   }

//   // getSections(): Observable<any[]> {
//   //   return this.sectionService.getSections().pipe(
//   //     map((sections) => {
//   //       return sections.map((section: any) => {
//   //         console.log('section',section);
//   //         return new Section(section.id, section.name, section.image, section.categories);
//   //       });
//   //     })
//   //   );
//   // }

//   getSection(id: number) {
//     return fetch(`http://localhost:8090/api/sections/${id}`);
//   }
// }