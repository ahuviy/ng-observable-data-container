NG Observable Data Container
=============

An RxJS-based observable data container, intended for use in Angular services.

[![npm version](https://img.shields.io/npm/v/ng-observable-data-container.svg?style=flat-square)](https://www.npmjs.com/package/ng-observable-data-container)

```js
npm install ng-observable-data-container
```

## Motivation

The current dominant approach for app state-management in React is the flux design-pattern. This approach is invading the Angular world as well, and several public implementations for this pattern already exist ([NgRx](https://github.com/ngrx/ngrx.github.io), [NGXS](https://ngxs.gitbook.io/ngxs)).

An arguably simpler solution is not to use a full-blown state-management system, which comes with its own boilerplate. Instead, we can leverage Angular's existing building-blocks: Services and RxJS; to create [Observable Data Services](https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/).

We can greatly improve Angular performance if we couple Observable Data Services with Component OnPush Change-Detection and the 'async' pipe.

For example:


## License

MIT