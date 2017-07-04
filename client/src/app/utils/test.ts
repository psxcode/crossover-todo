import { APP_BASE_HREF } from '@angular/common';
import { IdlePreloadModule } from '@angularclass/idle-preload';
import { TestModuleMetadata } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, XHRBackend } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { MockBackend } from '@angular/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { APP_DECLARATIONS } from '../app.declarations';
import { routes } from '../app.routing';
import { APP_PROVIDERS } from '../app.providers';
import { IAppState } from '../state';
import { rootReducer } from '../reducers';
import { map } from 'rxjs/operator/map';


/**
 * Internal class for emulating the Redux store behaviour
 * @param {any} _initialState
 */
class MockStore<T> extends BehaviorSubject<T> {
    constructor(private _initialState: T) {
        super(_initialState);
    }

    dispatch = (): void => {};

    select = <T, R>(pathOrMapFn: any): Observable<R> => {
        return map.call(this, pathOrMapFn);
    }
}

/**
 * Function that returns the configuration object for TestBed
 * @param {IAppState} mockStoreData
 * @returns {TestModuleMetadata}
 */
export function getTestBedConfig(mockStoreData: IAppState): TestModuleMetadata {
    return {
        imports: [
            RouterModule.forRoot(routes, {useHash: false, preloadingStrategy: PreloadAllModules}),
            StoreModule.provideStore(rootReducer),
            IdlePreloadModule.forRoot(),
            HttpModule
        ],
        providers: [
            ...APP_PROVIDERS,
            MockBackend,
            BaseRequestOptions,
            {
                provide: Http,
                deps: [MockBackend, BaseRequestOptions],
                useFactory:
                    (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
            },
            {
                provide: Store,
                useValue: new MockStore(mockStoreData)
            },
            {provide: APP_BASE_HREF, useValue: '/'}

        ],
        declarations: [APP_DECLARATIONS]
    };
}

/**
 * Generates empty object of type {AppState}
 * @returns {IAppState}
 */
export function getEmptyAppState(): IAppState {
    return {} as IAppState;
}
