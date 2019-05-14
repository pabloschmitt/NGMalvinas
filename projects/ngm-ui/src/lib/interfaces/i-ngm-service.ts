import { Observable } from 'rxjs';

export interface INgmService<T> {

    get( pageIndex: number, pageSize: number ) : Observable<T>;
  
    count( ) : Observable<0>
  }
  