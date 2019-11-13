import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HelpComponent } from "./help.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{ path: "help", component: HelpComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  declarations: [HelpComponent]
})
export class HelpModule {}
