import { Component } from '@angular/core';
import * as moment from "moment";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  footerText: String;
  lastRefreshed: String;
  user: any = {};
  features: Array<any> = [];
  selectedFeatures: string[] = [];
  title = 'Penske-FP-POC';
   ngOnInit(): void {
    const currentYear = moment().year();
    this.footerText = `&copy; ${currentYear} Penske. All Rights Reserved.`;
    this.lastRefreshed = moment().format("hh:mm MM/DD/YYYY");
  }
}
