import { Component } from "@angular/core";
import { BehaviorSubject, Observable, map, take, tap } from "rxjs";
import { SectionFacade } from "src/app/core/services/facades/section-facade";
import { Section } from "src/app/core/shared/models/section";

@Component({
    selector: "app-section-page",
    templateUrl: "./section-page.html",
    styleUrls: ["./section-page.scss"]
    })
export class SectionPage {

//    private sections: BehaviorSubject<any> = new BehaviorSubject([]);
//     readonly sections$: Observable<any> = this.sections.asObservable();
    public sections: Section[] = [];

    constructor(private sectionFacade: SectionFacade) {
        this.showSections();
    }

    showSections() {
        this.sectionFacade.getSections().pipe(take(1),
        map((response) => response))
        .subscribe((sections: Section) => { // Adjusted the parameter type to Section
            this.sections = [sections]; // Wrap the section in an array
        });
        
        //this.sectionFacade.getSections().subscribe();
       
    }
}