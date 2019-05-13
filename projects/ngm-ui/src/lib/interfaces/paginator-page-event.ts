import { PageEvent } from '@angular/material';

/**
 * PaginatorPageEvent extends the PageEvent and add several data
 * for use in pivot-table pagination event 
 * @param isLoadMoreData: boolean flag indicate when more data is need from source/service/datasource
 * @param metaCount: number of total items , not the actual data lenght, total of query / filter etc..
 * @param skipCount: number of items to skip at get items
 * @param firtsCount: number of items to retrieve
 * @param data?: optional custom user data to pass in the event
 */
export interface PaginatorPageEvent extends PageEvent {
    /** flag indicating if a load paged data is needed
     * this flag is set ti true when no more data on the client es avariable.
     */
    isLoadMoreData: boolean;
    /** The current total number of items in datasource */
    metaCount?: number;
    /** The current skip items value.
     * is the total items already paged
     */
    skipCount?: number;
    /** Items to load, 4 pages is optimal */
    firtsCount?: number;
    /** Optional data for any customization */
    data?: any;
  }
  