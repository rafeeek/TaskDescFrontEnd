import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeasureComponent } from './BL/Measure/Measure.component';
import { NotfoundComponent } from './Ui/Notfound/Notfound.component';

const routes: Routes = [
  {path: '' , redirectTo :'measure' , pathMatch :'full'},
  {path: 'measure' , component:MeasureComponent},
  {path : '**' , component :NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
