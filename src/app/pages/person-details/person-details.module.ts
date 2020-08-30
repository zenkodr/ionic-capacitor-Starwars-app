//referred to https://github.com/herbae/starwarsapp, for some of the code on this page, but later altered it. Also referred to tutorials from https://ionicacademy.com/ionic-crash-course/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonDetailsPageRoutingModule } from './person-details-routing.module';

import { PersonDetailsPage } from './person-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonDetailsPageRoutingModule
  ],
  declarations: [PersonDetailsPage]
})
export class PersonDetailsPageModule {}

