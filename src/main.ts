import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

//// Enabling production mode does make the freezing going away,
//// but ignores the underlying issue...
// enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
