import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-starship-details',
  templateUrl: './starship-details.page.html',
  styleUrls: ['./starship-details.page.scss'],
})
export class StarshipDetailsPage implements OnInit {

  starship: any;
  isFavorite3 = false;
  starshipId = null;
 
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService,
    private emailComposer: EmailComposer, private favoriteService: FavoriteService) { }
 
  ngOnInit() {
    this.starshipId = this.activatedRoute.snapshot.paramMap.get('id');
    this.api.getStarship(this.starshipId).subscribe(res => {
      this.starship = res;
    });

    this.favoriteService.isFavorite3(this.starshipId).then(isFav => {
      this.isFavorite3 = isFav;
    });
  }

  favoriteStarship() {
    this.favoriteService.favoriteStarship(this.starshipId).then(() => {
      this.isFavorite3 = true;
    });
  }

  unfavoriteStarship() {
    this.favoriteService.unfavoriteStarship(this.starshipId).then(() => {
      this.isFavorite3 = false;
    });
  }
  
  shareStarship() {
    let email = {
      to: "",
      subject: `I like this starship!: ${this.starship.name}`,
      body: `What do you think? <br><br>`,
      isHtml: true
    };

    this.emailComposer.open(email);
  }

}