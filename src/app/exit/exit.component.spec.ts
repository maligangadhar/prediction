import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ApiService } from "../apis/api.service";
import { ExitComponent } from "./exit.component";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

describe("ExitComponent", () => {
    let comp: ExitComponent;
    let fixture: ComponentFixture<ExitComponent>;

    beforeEach(() => {
        const apiServiceStub = {
            get: () => ({
                subscribe: () => ({})
            })
        };
        TestBed.configureTestingModule({
            declarations: [ ExitComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: ApiService, useValue: apiServiceStub }
            ]
        });
        fixture = TestBed.createComponent(ExitComponent);
        comp = fixture.componentInstance;
    });

    it("can load instance", () => {
        expect(comp).toBeTruthy();
    });

    describe("ngOnInit", () => {
        it("makes expected calls", () => {
            spyOn(comp, "redirectToHome");
            comp.ngOnInit();
            expect(comp.redirectToHome).toHaveBeenCalled();
        });
    });

    xdescribe("redirectToHome", () => {
        it("makes expected calls", () => {
            const apiServiceStub: ApiService = fixture.debugElement.injector.get(ApiService);
            spyOn(apiServiceStub, "get").and.returnValue(Observable.of("url"));
            comp.redirectToHome();
            expect(apiServiceStub.get).toHaveBeenCalled();
        });
    });

});
