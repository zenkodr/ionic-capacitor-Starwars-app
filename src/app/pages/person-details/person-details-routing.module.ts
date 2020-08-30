//referred to https://github.com/herbae/starwarsapp, for some of the code on this page, but later altered it
// also referred to tutorials from https://ionicacademy.com/ionic-crash-course/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonDetailsPage } from './person-details.page';

const routes: Routes = [
  {
    path: '',
    component: PersonDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonDetailsPageRoutingModule {}
