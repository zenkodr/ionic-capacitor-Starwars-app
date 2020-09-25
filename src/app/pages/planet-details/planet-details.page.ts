import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { FavoriteService } from 'src/app/services/favorite.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.page.html',
  styleUrls: ['./planet-details.page.scss'],
})
export class PlanetDetailsPage implements OnInit {
  subject: string='Check out all your favorite Characters from Starwars!'
  text: string='Check out all your favorite Characters from Starwars!'
  imgurl:string='https://starwarsblog.starwars.com/wp-content/uploads/2018/10/mustafar-tall.jpg'
  link: string='https://www.timeout.com/hong-kong/film/the-50-best-star-wars-charactershttps://www.starwars.com/search?q=planets&o=https%3A%2F%2Fwww.starwars.com%2Fsearch'
  planet: any;
  isFavorite2 = false;
  planetId = null;

  ShareGeneric(parameter){
    const url = this.link
    const text = parameter+'\n'
    this.socialSharing.share(this.subject, null, url,this.link)
  }
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService,
    private emailComposer: EmailComposer, private favoriteService: FavoriteService, private socialSharing: SocialSharing) { }
     
  ngOnInit() {
    this.planetId = this.activatedRoute.snapshot.paramMap.get('id');
    this.api.getPlanet(this.planetId).subscribe(res => {
      this.planet = res;
    });

    this.favoriteService.isFavorite2(this.planetId).then(isFav => {
      this.isFavorite2 = isFav;
    });
  }

  favoritePlanet() {
    this.favoriteService.favoritePlanet(this.planetId).then(() => {
      this.isFavorite2 = true;
    });
  }

  unfavoritePlanet() {
    this.favoriteService.unfavoritePlanet(this.planetId).then(() => {
      this.isFavorite2 = false;
    });
  }

  SendEmail(){
    this.socialSharing.shareViaEmail(this.link, this.subject, ['email@address.com'])
  }

  ShareFacebook(){
    this.socialSharing.shareViaFacebookWithPasteMessageHint(this.link, null /* url */, 'Copy Paste!')
  }

  SendTwitter(){
    this.socialSharing.shareViaTwitter(this.link)
  }

  SendInstagram(){
    this.socialSharing.shareViaInstagram(this.imgurl,null)
  }

}