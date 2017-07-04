import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { getEmptyAppState, getTestBedConfig } from '../../utils/test';
import { IAppState } from '../../state';

const mockStoreData: IAppState = getEmptyAppState();

describe('App Component', () => {
    beforeEach(() => {
        const config = getTestBedConfig(mockStoreData);
        TestBed.configureTestingModule(config);
    });

    // it('should have been initialized', (() => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     fixture.detectChanges();
    //     expect(fixture.nativeElement).toBeDefined();
    // }));
});
