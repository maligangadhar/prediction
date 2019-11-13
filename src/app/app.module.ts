import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injectable } from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpClientModule
} from "@angular/common/http";

import { LocationStrategy, HashLocationStrategy } from "@angular/common";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { predictionComponent } from "./prediction/prediction.component";
import { HelpModule } from "./help/help.module";
import { ExitModule } from "./exit/exit.module";
import { DialogModule } from "primeng/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FieldsetModule } from "primeng/fieldset";
import { AccordionModule } from "primeng/accordion";
import { PapaParseModule } from "ngx-papaparse";
import { TableModule } from "primeng/table";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { PanelModule } from "primeng/panel";
import { FileUploadModule } from "primeng/fileupload";
import { TabViewModule } from "primeng/tabview";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { UserInterceptor } from "./user-interceptor";

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          location.reload(true);
          const error = err.message || err.statusText;
          return throwError(error);
        }
        const error = err.message || err.statusText;
        return throwError(error);
      })
    );
  }
  private getCookie(name: string) {
    const ca: Array<string> = document.cookie.split(";");
    const caLen: number = ca.length;
    const cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, "");
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return "";
  }
}
@NgModule({
  declarations: [AppComponent, NavComponent, predictionComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HelpModule,
    ExitModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    FieldsetModule,
    AccordionModule,
    PapaParseModule,
    TableModule,
    AngularFontAwesomeModule,
    MessagesModule,
    MessageModule,
    PanelModule,
    FileUploadModule,
    TabViewModule,
    DropdownModule,
    FormsModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: UserInterceptor,
    //   multi: true
    // },
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
