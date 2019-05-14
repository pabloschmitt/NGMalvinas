import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { INgmService } from '../interfaces/i-ngm-service';

@Injectable({
  providedIn: 'root'
})
export class ExampleService implements INgmService<any> {

    constructor(private httpClient: HttpClient) { 
      console.warn("NO DEBE ISNATNCIARSE ESTO");

    }
  
    baseUrl:string = "https://jsonplaceholder.typicode.com/posts";

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      })
     };

    get( pageIndex: number, pageSize: number ) 
    {
        return this.httpClient.get<any>(this.baseUrl + '/',this.httpOptions).pipe(
            map((result: any) => {
                return result;
                })
        );
    }


    count( ) 
    {
        return this.httpClient.get<number>(this.baseUrl + '/',this.httpOptions).pipe(
            map((result: any) => {
                return (result as []).length;
                })
        );
    }    

}



