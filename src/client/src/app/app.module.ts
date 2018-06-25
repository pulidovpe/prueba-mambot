import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UsersService } from './services/users.service';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
