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
  subject: string='Check out all your favorite Characters from Starwars!'
  text: string='Check out all your favorite Characters from Starwars!'
  imgurl:string='https://starwarsblog.starwars.com/wp-content/uploads/sites/6/2014/03/Blog_Poster.jpg'
  link: string='https://www.starwars.com/search?q=characters'
  person: any;
  isFavorite1 = false;
  personId = null;

  ShareGeneric(parameter){
    const url = this.link
    const text = parameter+'\n'
    //this.socialSharing.share(text, null, url)
    this.socialSharing.share(this.subject, null, url,this.link)
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

  SendEmail(){
    //this.socialSharing.shareViaEmail(this.link, null /* url */, ['email@address.com'])
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