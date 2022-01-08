import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginateService {

  constructor() { }

  paginate<T>(items: Array<T>, count: number): Array<Array<T>> {
    count = Math.max(count, 1);
    let paginatedItems = [];
    let itemPage = [];
    for (let i = 0; i < items.length; i++) {
      if (i !== 0 && i % count === 0) {
        paginatedItems.push(itemPage);
        itemPage = [];
      }
      itemPage.push(items[i]);
    }
  
    if (itemPage.length > 0) {
      paginatedItems.push(itemPage);
    }
  
    if (paginatedItems.length === 0) {
      paginatedItems.push([]);
    }
  
    return paginatedItems;
  }

}
