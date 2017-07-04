import { TestBed } from '@angular/core/testing';
import { TodoWidgetComponent } from './todo.component';
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

    it('should call the onTitleEdit method', (() => {
        const fixture = TestBed.createComponent(TodoWidgetComponent);

        fixture.whenStable().then(() => {
            spyOn(fixture.componentInstance, 'onTitleEdit');
            fixture.nativeElement.querySelector('.title').click();
            expect(fixture.componentInstance.onTitleEdit).toHaveBeenCalled();
        });
    }));

  it('should call the onDescEdit method', (() => {
    const fixture = TestBed.createComponent(TodoWidgetComponent);

    fixture.whenStable().then(() => {
      spyOn(fixture.componentInstance, 'onDescEdit');
      fixture.nativeElement.querySelector('.desc').click();
      expect(fixture.componentInstance.onDescEdit).toHaveBeenCalled();
    });
  }));
});
