import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.prod";

@Injectable({ providedIn: "root" })
export class ApiService {
  apiBaseUrl: string = environment.BASE_API_URL;
  apiBaseUrl2: string = environment.BASE_API_URL2;
  constructor(private http: HttpClient) {}

  get<T>(url: string, params?: any): Observable<T> {
    let first = true;
    if (params) {
      Object.keys(params).forEach(function(key: any) {
        if (first) {
          url += "?" + key + "=";
          first = false;
        } else {
          url += "&" + key + "=";
        }
        url += encodeURIComponent(params[key]);
      });
    }
    return this.http.get<T>(this.apiBaseUrl + url);
  }

  private _post<T>(url: string, data: any, options?: any) {
    const headers = new HttpHeaders();
    const option: any = {};
    headers.set("Content-Type", "application/json");
    option.headers = headers;
    option.observe = "body";

    return this.http.post<T>(url, data, option);
  }

  put<T>(url: string, data: any, options?: any) {
    const headers = new HttpHeaders();
    const option: any = {};
    headers.set("Content-Type", "application/json");
    option.headers = headers;
    option.observe = "body";

    return this.http.put<T>(this.apiBaseUrl + url, data, option);
  }

  post<T>(url: string, data: any, options?: any) {
    return this._post<T>(this.apiBaseUrl + url, data, options);
  }

  delete<T>(url: string, options?: any) {
    const headers = new HttpHeaders();
    const option: any = {};
    option.headers = headers;
    return this.http.delete<T>(this.apiBaseUrl + url, option);
  }

  downloadFile(uri: string) {
    window.open(this.apiBaseUrl + uri);
  }

  postRecommendations<T>(url: string, data: any, options?: any) {
    return this._post(url, data, options);
  }

  /**
   * upload input csv file
   * @param url
   * @param data
   * @param options
   */
  uploadFile<T>(url: string, data: any, options?: any) {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    // headers.append("Content-Type", "text/csv");
    headers.append("Accept", "application/json");
    const option: any = {};
    option.headers = headers;
    option.observe = "body";
    return this.http.post<T>(this.apiBaseUrl + url, data, option);
  }

  /**
   * get prediction post call
   * @param url
   * @param data
   * @param options
   */
  getPrediction<T>(url: string, data: any, options?: any) {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    headers.append("Accept", "application/json");
    const option: any = {};
    option.headers = headers;
    option.observe = "body";
    return this.http.post<T>(this.apiBaseUrl2 + url, data, option);
  }

  // getPrediction2<T>(url: string) {
  //   return this.http.get<T>(this.apiBaseUrl3 + url);
  // }
}
