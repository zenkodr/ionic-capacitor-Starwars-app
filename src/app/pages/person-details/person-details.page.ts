// referred to https://github.com/herbae/starwarsapp, for some of the code on this page, but later altered it. Also referred to tutorials from https://ionicacademy.com/ionic-crash-course/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ApiService } from 'src/app/services/api.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.page.html',
  styleUrls: ['./person-details.page.scss'],
})
export class PersonDetailsPage implements OnInit {

  person: any;
  isFavorite1 = false;
  personId = null;
 
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService,
    private emailComposer: EmailComposer, private favoriteService: FavoriteService) { }
 
  ngOnInit() {
    this.personId = this.activatedRoute.snapshot.paramMap.get('id');
    this.api.getPerson(this.personId).subscribe(res => {
      this.person = res;
    });

    this.favoriteService.isFavorite1(this.personId).then(isFav => {
      this.isFavorite1 = isFav;
    });
  }

  favoritePerson() {
    this.favoriteService.favoritePerson(this.personId).then(() => {
      this.isFavorite1 = true;
    });
  }

  unfavoritePerson() {
    this.favoriteService.unfavoriteFilm(this.personId).then(() => {
      this.isFavorite1 = false;
    });
  }
  
  sharePerson() {
    let email = {
      to: "",
      subject: `Hey, look at this!: ${this.person.name}`,
      body: `This person is so cool, don't you think?<br><br>"${this.person.opening_crawl}"`,
      isHtml: true
    };

    this.emailComposer.open(email);
  }

}
