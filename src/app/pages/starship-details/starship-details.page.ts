import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { FavoriteService } from 'src/app/services/favorite.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-starship-details',
  templateUrl: './starship-details.page.html',
  styleUrls: ['./starship-details.page.scss'],
})
export class StarshipDetailsPage implements OnInit {
    subject: string='Check out all your favorite Characters from Starwars!'
    text: string='Check out all your favorite Characters from Starwars!'
    imgurl:string='https://www.starwars.com/news/fleet-forces-the-significance-of-rebel-starships-in-the-original-trilogy'
    link: string='https://www.starwars.com/search?q=starshi&o=https%3A%2F%2Fwww.starwars.com%2Fsearch'
    starship: any;
    isFavorite3 = false;
    starshipId = null;
  
    ShareGeneric(parameter){
      const url = this.link
      const text = parameter+'\n'
      this.socialSharing.share(this.subject, null, url,this.link)
    }
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService,
    private emailComposer: EmailComposer, private favoriteService: FavoriteService, private socialSharing: SocialSharing) { }
     
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
    this.socialSharing.shareViaInstagram(this.imgurl, null)
  }

}