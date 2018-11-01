NG Observable Data Container
=============

An RxJS-based observable data container, intended for use in Angular services.

[![npm version](https://img.shields.io/npm/v/ng-observable-data-container.svg?style=flat-square)](https://www.npmjs.com/package/ng-observable-data-container)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/ahuviy/ng-observable-data-container/blob/master/LICENSE)

```js
npm install ng-observable-data-container
```

## Motivation

The current dominant approach for app state-management in React is the flux design-pattern. This approach is invading the Angular world as well, and several public implementations for this pattern already exist ([NgRx](https://github.com/ngrx/ngrx.github.io), [NGXS](https://ngxs.gitbook.io/ngxs)).

An arguably simpler solution is not to use a full-blown state-management system, which comes with its own boilerplate. Instead, we can leverage Angular's existing building-blocks: Services and RxJS; to create [Observable Data Services](https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/).

We can greatly improve Angular performance if we couple Observable Data Services with Component OnPush Change-Detection and the 'async' pipe.

## Usage

```typescript
import { DataContainer, WritableDataContainer, ReadonlyDataContainer } from 'ng-observable-data-container';

interface ItemsState {
    items: { id: string; description: string; image: string; }[];
    isFetchingItems: boolean;
}

@Injectable()
export class ItemsService {
    private dataContainer: WritableDataContainer<ItemsState> = DataContainer<ItemsState>({
        items: null,
        isFetchingItems: false,
    });
    data: ReadonlyDataContainer<ItemsState> = this.dataContainer.toPublic();

    private getItems(cfg?: { showBI?: boolean; nextPage?: boolean; resetScroll?: boolean; }): Promise<void> {
        if (!cfg) cfg = {};
        const { showBI, nextPage, resetScroll } = cfg;
        this.store.publish(s => {
            if (showBI) s.isFetchingItems = true;
            if (nextPage) {
                s.isFetchingNextPage = true;
                s.currentFilters.pageOptions.currentPage += 1;
            } else {
                s.currentFilters.pageOptions.currentPage = 1;
            }
        });
        return new Promise((resolve, reject) => {
            const req = this.dataService.api('getActionItems', {
                disableBI: true,
                queryParams: {
                    category: this.store.v.currentFilters.category,
                    freeText: this.store.v.currentFilters.freeText,
                    ...this.categoryOptionParams,
                    ...this.store.v.currentFilters.filters,
                    ...this.pageOptionsParams,
                }
            }).pipe(
                finalize(() => {
                    if (showBI) this.store.publish(s => s.isFetchingItems = false);
                    if (nextPage) this.store.publish(s => s.isFetchingNextPage = false);
                    if (resetScroll) this.resetScroll$.next();
                    this.activeRequests = this.activeRequests.filter(r => r !== req);
                }),
            ).subscribe((res: GetActionItemsRes) => {
                const newItems = nextPage
                    ? uniqBy(this.store.v.items.concat(res.items), 'actionItemId')
                    : res.items;
                this.store.publish(s => {
                    s.currentFilters.pageOptions.hasNextPage = res.moreRecords;
                    s.items = newItems;
                });
                resolve();
            }, reject);
            this.activeRequests.push(req);
        });
    }
}
```
