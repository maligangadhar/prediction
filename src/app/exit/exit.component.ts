import { Component, OnInit } from "@angular/core";
import { ApiService } from "../apis/api.service";

@Component({
  selector: "app-exit",
  templateUrl: "./exit.component.html",
  styleUrls: ["./exit.component.css"]
})
export class ExitComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.redirectToHome();
  }

  redirectToHome() {
    this.apiService.get("/Services/appExit").subscribe((response: any) => {
      window.location.href = response.redirectUrl;
    });
  }
}
