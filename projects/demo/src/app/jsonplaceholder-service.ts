import { Injectable } from '@angular/core';
import { PostDto } from './models';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { ServiceResponseExt } from '@ngm/ui';
import { ServiceRequestExt } from '../../../ngm-ui/src/lib/interfaces/Service-RequestExt';

@Injectable({
  providedIn: 'root'
})
export class JsonplaceholderService {

  baseUrl:string = "https://jsonplaceholder.typicode.com/posts";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
   };

  constructor(private httpClient : HttpClient) { }

  get_posts( req: ServiceRequestExt ) : Observable<ServiceResponseExt> {
    return this.httpClient.get<any>(this.baseUrl + '/',this.httpOptions).pipe(
      map((result: any) => {
          return <ServiceResponseExt>{ 
            data: result, metaCount: 100 
          };
      })
   );

  }

}


