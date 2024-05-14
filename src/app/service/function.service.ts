import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Function} from "../core/models/function";

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor(private http: HttpClient) {
  }

  private functionUrl = '/api/function';

  public getFunction(paramA: number, paramB: number, paramC: number) {
    return this.http.get<Function>(environment.API_URL + this.functionUrl, {
      params: new HttpParams()
        .set('aDouble', paramA.valueOf())
        .set('bDouble', paramB.valueOf())
        .set('cDouble', paramC.valueOf()),
    });
  }

  public changeFunction(functions: Function) {
    console.log(functions);
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Function>(environment.API_URL + this.functionUrl, JSON.stringify(functions), {headers:myHeaders});
  }
}
