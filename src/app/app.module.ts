import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- import required for collapsible rows
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UserListComponent } from './user-list/user-list.component';

// Import collapsible library
import { CollapsibleModule } from 'angular2-collapsible';

// Import Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 


@NgModule({
  declarations: [
    AppComponent,
    UserCardComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,  // <-- include required BrowserAnimationsModule
    CollapsibleModule, FontAwesomeModule // <-- include angular2-collapsible module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
