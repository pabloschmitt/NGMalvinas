
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {catchError, finalize} from "rxjs/operators";
import {BehaviorSubject, Observable, throwError, timer, interval } from "rxjs";
import {Sort} from '@angular/material';
import { INgmDataSource } from '../interfaces/i-ngm-data-source';
import { INgmService } from '../interfaces/i-ngm-service';

/**
 * DOCUMENTAR
 */
export class NgmDataSource<T_DS> implements INgmDataSource<T_DS> {

    private dataSubject = new BehaviorSubject<T_DS[]>([]);
    private countSubject = new BehaviorSubject<number>(0);
    public count$ = this.countSubject.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(private svc: INgmService<any>) { }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.dataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.countSubject.complete();
        this.loadingSubject.complete();
    }

    loadData( pageIndex:number, pageSize:number) {
        this.loadingSubject.next(true);
        this.svc.get(pageIndex,pageSize).pipe( 
            catchError( e => [] ),
            finalize(() => {
                this.loadingSubject.next(false);
            })).subscribe(res => {
                console.log( "NgmDataSource -> SVC-> SKIP " + (pageSize * pageIndex) + " AND GET " +(pageSize * pageIndex)+pageSize );
                this.dataSubject.next(
                    (res as []).slice( (pageSize * pageIndex), (pageSize * pageIndex)+pageSize )
                    );
            });
    }

    countData( )  {
        console.log( "NgmDataSource -> SVC-> COUNT");
        this.svc.count().pipe( 
            catchError( e => [] ),
            finalize(() => {
            })).subscribe((res: number) => {
                this.countSubject.next( res );
            });
    }


}