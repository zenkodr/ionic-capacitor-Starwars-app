import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { FavoriteService } from 'src/app/services/favorite.service';
// IMPORT SOCIAL SHARING.
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.page.html',
  styleUrls: ['./person-details.page.scss'],
})
export class PersonDetailsPage implements OnInit {
  
  text: string='Check out your favorite characters from Starwars!'
  imgurl:string= 'https://www.instagram.com/p/B9UdTKighTe/'
  link: string='https://www.starwars.com/databank'
  person: any;
  isFavorite1 = false;
  personId = null;

  ShareGeneric(parameter){
    const url = this.link
    const text = parameter+'\n'
    this.socialSharing.share(text, null, url,this.link)
  }
    
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService,
    private emailComposer: EmailComposer, private favoriteService: FavoriteService, private socialSharing: SocialSharing) { }

    
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
    this.favoriteService.unfavoritePerson(this.personId).then(() => {
      this.isFavorite1 = false;
    });
  }  
  
  ShareFacebook(){
    this.socialSharing.shareViaFacebookWithPasteMessageHint(this.link, null, 'Copy Paste!')
  }

  SendEmail(){
    this.socialSharing.shareViaEmail(this.link, null, ['email@address.com'])
  }

  SendTwitter(){
    this.socialSharing.shareViaTwitter(this.link, null)
  }

  SendInstagram(){
    this.socialSharing.shareViaInstagram(null,this.link)
  }
   
}