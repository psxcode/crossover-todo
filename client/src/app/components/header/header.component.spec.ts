import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { getEmptyAppState, getTestBedConfig } from '../../utils/test';

const mockStoreData = Object.assign({}, getEmptyAppState(), {
    user: {
        loaded: false
    },
    bootstrap: {}
});

describe('Login Component', () => {

    beforeEach(() => {
        localStorage.clear();

        const config = getTestBedConfig(mockStoreData);
        TestBed.configureTestingModule(config);
    });

    it('should contain component', (() => {
        const fixture = TestBed.createComponent(HeaderComponent);

        fixture.whenStable().then(() => {
          expect(fixture.nativeElement).toBeDefined();
        });
    }));

    it('should contain logo', (() => {
        const fixture = TestBed.createComponent(HeaderComponent);

        fixture.whenStable().then(() => {
          expect(fixture.nativeElement.querySelector('logo')).toBeDefined();
        });
    }));
});
