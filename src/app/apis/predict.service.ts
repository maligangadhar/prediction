import { Injectable } from "@angular/core";
import { ApiService } from "../apis/api.service";
import { environment } from "../../environments/environment.prod";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PredictService {
  constructor(private apiservice: ApiService) {}

  /**
   * get prediction details
   */
  getPredictionDetails() {
    const url = environment.predictResultListUrl;
    return this.apiservice.get(url);
  }

  /**
   * upload file
   * @param fileToUpload
   */
  uploadPredictFile(fileToUpload: File): Observable<any> {
    const endpoint = environment.checkCSVUrl;
    const formData: FormData = new FormData();
    formData.append("csvfile", fileToUpload, fileToUpload.name);
    return this.apiservice.uploadFile(endpoint, formData);
    //return this.apiservice.get(environment.predictListUrl);
  }

  /**
   * predict result button
   * @param fileToUpload
   */
  uploadPredicResultFile(fileToUpload: File): Observable<any> {
    const endpoint = environment.predictionUrl;
    const formData: FormData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);
    return this.apiservice.getPrediction(endpoint, formData);
  }

  /**
   * get prediction result details
   */
  getPredictionResultDetails(): Observable<any> {
    const endpoint = environment.predictResultListUrl;
    return this.apiservice.getPrediction2(endpoint);
  }
}
