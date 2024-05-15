import { Routes, RouterModule } from "@angular/router";
import { AdminHomeComponent } from "./admin-home.component";
import { NgModule } from "@angular/core";
import { AdminAccomodationsComponent } from "../admin-accomodations/admin-accomodations.component";
import { AdminPurchasesComponent } from "../admin-purchases/admin-purchases.component";

const routes: Routes = [
    { path: '', component: AdminHomeComponent, children: [
        { path: '', component: AdminHomeComponent },
        { path: 'purchases', component: AdminPurchasesComponent},
        { path: 'accomodations', component:AdminAccomodationsComponent }
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminHomeRoutingModule {}
