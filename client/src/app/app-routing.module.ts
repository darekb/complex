import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OtherPageComponent } from './other-page/other-page.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'otherPage', component: OtherPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
