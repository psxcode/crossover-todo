import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { rootReducer } from './reducers';
import { UserEffects, ScreenEffects } from './effects';

export const APP_IMPORTS = [
  EffectsModule.run(UserEffects),
  EffectsModule.run(ScreenEffects),
  RouterStoreModule.connectRouter(),
  StoreModule.provideStore(rootReducer)
];
