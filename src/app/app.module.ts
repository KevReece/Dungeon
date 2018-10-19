import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserConsoleComponent } from './user-console/user-console.component';
import { CharactorComponent } from './charactor/charactor.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { MapBuilderService } from './map-builder.service';

@NgModule({
  declarations: [
    AppComponent,
    UserConsoleComponent,
    CharactorComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MapBuilderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
