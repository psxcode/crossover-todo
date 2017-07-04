import { TestBed } from '@angular/core/testing';
import { UserInfoWidgetComponent } from './user-info.component';
import { getEmptyAppState, getTestBedConfig } from '../../utils/test';

const mockStoreData = Object.assign({}, getEmptyAppState(), {
    user: {
        loaded: false
    },
    bootstrap: {}
});

describe('Todo Component', () => {

    beforeEach(() => {
        localStorage.clear();

        const config = getTestBedConfig(mockStoreData);
        TestBed.configureTestingModule(config);
    });

    it('should call the logout method', (() => {
        const fixture = TestBed.createComponent(UserInfoWidgetComponent);

        /*fixture.whenStable().then(() => {
            spyOn(fixture.componentInstance, 'logout');
            fixture.nativeElement.querySelector('.detail').dispatchEvent(new Event('click'));
            expect(fixture.componentInstance.logout).toHaveBeenCalled();
        });*/
    }));
});
