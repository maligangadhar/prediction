import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ExitComponent } from "./exit.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{ path: "exit", component: ExitComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  declarations: [ExitComponent]
})
export class ExitModule {}
