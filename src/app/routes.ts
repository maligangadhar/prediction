import {predictionComponent} from "./prediction/prediction.component";
import {Routes} from "@angular/router";

export const routes: Routes = [
    { path: "", redirectTo: "/predict", pathMatch: "full" },
    {
      path: "predict",
      component: predictionComponent,
      data: { expectedFeature: "Model Prediction" }
    }
]