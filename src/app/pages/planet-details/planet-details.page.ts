import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.page.html',
  styleUrls: ['./planet-details.page.scss'],
})
export class PlanetDetailsPage implements OnInit {

  planet: any;
  isFavorite1 = false;
  planetId = null;
 
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService,
    private emailComposer: EmailComposer, private favoriteService: FavoriteService) { }
 
  ngOnInit() {
    this.planetId = this.activatedRoute.snapshot.paramMap.get('id');
    this.api.getPlanet(this.planetId).subscribe(res => {
      this.planet = res;
    });

    this.favoriteService.isFavorite1(this.planetId).then(isFav => {
      this.isFavorite1 = isFav;
    });
  }

  favoritePlanet() {
    this.favoriteService.favoritePlanet(this.planetId).then(() => {
      this.isFavorite1 = true;
    });
  }

  unfavoritePlanet() {
    this.favoriteService.unfavoriteFilm(this.planetId).then(() => {
      this.isFavorite1 = false;
    });
  }
  
  sharePlanet() {
    let email = {
      to: "",
      subject: `I love this planet: ${this.planet.title}`,
      body: `Do you like it? <br><br>"${this.planet.opening_crawl}"`,
      isHtml: true
    };

    this.emailComposer.open(email);
  }

}