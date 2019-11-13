import { TestBed, getTestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { HttpParams } from "@angular/common/http";

import { ApiService } from "./api.service";

describe("base api services", () => {
  let injector;
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    injector = getTestBed();
    service = injector.get(ApiService);
    httpMock = injector.get(HttpTestingController);
  });

  it("get call should return Observable", () => {
    const returnvalue = service.get("guided-repair", { unitYear: "2011" });
  });
});
