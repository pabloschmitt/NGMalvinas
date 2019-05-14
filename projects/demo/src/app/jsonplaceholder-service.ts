import { Injectable } from '@angular/core';
import { PostDto } from './models';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, take } from 'rxjs/operators';

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

  get_posts( skipItems?: number, firstItems?: number ) : Observable<ServiceResponseExt> {

    if ( !!skipItems ) { console.log("    get_posts.skipItems = " + skipItems); }
    if ( !!firstItems ) { console.log("    get_posts.firstItems = " + firstItems); }

    return this.httpClient.get<any>(this.baseUrl + '/',this.httpOptions).pipe(
      map((result: any) => {
          return <ServiceResponseExt>{ data: result, flag: 1 };
      })
   );

  }

  /*
  get_posts( skipItems?: number, firstItems?: number ) : Observable<PostDto[]> {

    if ( !!skipItems ) { console.log("    get_posts.skipItems = " + skipItems); }
    if ( !!firstItems ) { console.log("    get_posts.firstItems = " + firstItems); }

    return this.httpClient.get<PostDto[]>(this.baseUrl + '/',this.httpOptions).pipe(
      map((result: any) => {
          return result;
      })
   );

  }
  */

}


