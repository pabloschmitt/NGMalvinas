
import {BehaviorSubject, Observable, throwError, timer, interval } from "rxjs";

export interface INgmDataSource<T> {
    loadData( pageIndex:number, pageSize:number) : void;
    countData() : void;
    count$ : Observable<any>;
}