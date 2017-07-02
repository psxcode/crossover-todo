import {Component, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
    selector: 'hrz-header',
    templateUrl: './header.template.html',
    styleUrls: ['./header.style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit, OnDestroy {

    destroyed$ = new Subject();

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }
}
