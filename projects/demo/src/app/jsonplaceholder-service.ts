import { Injectable } from '@angular/core';
import { PostDto } from './models';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { ServiceResponseExt } from '@ngm/ui';
import { ServiceRequestExt } from '../../../ngm-ui/src/lib/interfaces/Service-RequestExt';
import { INgmService } from '../../../ngm-ui/src/lib/interfaces/i-ngm-service';

@Injectable({
  providedIn: 'root'
})
export class JsonplaceholderService implements INgmService<PostDto> {

  baseUrl:string = "https://jsonplaceholder.typicode.com/posts";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
   };

  constructor(private httpClient : HttpClient) { }

  get( pageIndex: number, pageSize: number ) 
  {
      console.log("in svc : pageIndex = " + pageIndex + " , pageSize = " + pageSize);
      
      return this.httpClient.get<PostDto>(this.baseUrl + '/',this.httpOptions).pipe(
          map((result: PostDto) => {
              return result;
              })
      );
  }


  count( ) 
  {
      return this.httpClient.get<number>(this.baseUrl + '/',this.httpOptions).pipe(
          map((result: any) => {
              console.log("count in svc = " + (result as []).length);
              return (result as []).length;
              })
      );
  }   

  
}


