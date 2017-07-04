import { TestBed } from '@angular/core/testing';
import { getEmptyAppState, getTestBedConfig } from '../../utils/test';

const mockStoreData = getEmptyAppState();

describe('Dashboard Component', () => {

    beforeEach(() => {
        const config = getTestBedConfig(mockStoreData);
        TestBed.configureTestingModule(config);
    });
});
