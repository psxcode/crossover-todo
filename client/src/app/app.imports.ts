import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { rootReducer } from './reducers';
import { BootstrapEffects, ScreenEffects } from './effects';

export const APP_IMPORTS = [
  ReactiveFormsModule,
  EffectsModule.run(BootstrapEffects),
  EffectsModule.run(ScreenEffects),
  RouterStoreModule.connectRouter(),
  StoreModule.provideStore(rootReducer)
];
