import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeasureComponent } from './BL/Measure/Measure.component';
import { NavbarComponent } from './Ui/Navbar/Navbar.component';
import { NotfoundComponent } from './Ui/Notfound/Notfound.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MeasureComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule , FormsModule ,
    ToastrModule.forRoot(
      {
        timeOut: 2000,
        preventDuplicates: true,
        
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
