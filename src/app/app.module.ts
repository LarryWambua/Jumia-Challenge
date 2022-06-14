import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- import required for collapsible rows
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserCardComponent } from './user-card/user-card.component';
import { UserListComponent } from './user-list/user-list.component';

// Import collapsible library
import { CollapsibleModule } from 'angular2-collapsible';

// Import Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 

//Service to make http call
import { UserDataService } from './services/user-data.service';

//Service to export as CSV
import { ExportService } from './services/export.service';

//Import Scroll Library
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    AppComponent,
    UserCardComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,  // <-- include required BrowserAnimationsModule
    CollapsibleModule, // <-- include angular2-collapsible module
    FontAwesomeModule, // <-- include font awesome module
    InfiniteScrollModule// <-- include scroll module
  ],
  providers: [ UserDataService, ExportService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
