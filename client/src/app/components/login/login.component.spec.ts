import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
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

    it('should contain login screen text', (() => {
        const fixture = TestBed.createComponent(LoginComponent);

        fixture.whenStable().then(() => {
          expect(fixture.nativeElement).toBeDefined();
        });
    }));

    it('should call the login method', (() => {
        const fixture = TestBed.createComponent(LoginComponent);

        fixture.whenStable().then(() => {
            spyOn(fixture.componentInstance, 'login');
            fixture.componentInstance.usernameRef.nativeElement.value = 'ali';
            fixture.componentInstance.passwordRef.nativeElement.value = 'password';
            fixture.nativeElement.querySelector('.button').click();
            expect(fixture.componentInstance.login).toHaveBeenCalled();
        });
    }));
});
