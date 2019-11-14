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
   * upload file :: Deprecated not used any more
   * @param fileToUpload
   */
  uploadPredictFile(fileToUpload: File): Observable<any> {
    const endpoint = environment.checkCSVUrl;
    const formData: FormData = new FormData();
    formData.append("csvfile", fileToUpload, fileToUpload.name);
    return this.apiservice.uploadFile(endpoint, formData);
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
   * get prediction result details :: Need to delete
   */
  //   getPredictionResultDetails(): Observable<any> {
  //     const endpoint = environment.predictResultListUrl;
  //     return this.apiservice.getPrediction2(endpoint);
  //   }
}
