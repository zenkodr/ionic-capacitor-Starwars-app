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

  person: any;
  isFavorite1 = false;
  personId = null;
   
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
  
  sharePerson() {
    let email = {
      to: "",
      subject: `This person is cool!: ${this.person.name}`,
      body: `What do you think?<br>  

      <ion-col col-12 col-sm>
      Gender:</ion-col><br>

      <ion-col col-12 col-sm>
      ${this.person.gender}
      </ion-col><br>

      <ion-col col-12 col-sm>
      Eye Color:
      </ion-col>

      <ion-col col-12 col-sm>
      ${this.person.eye_color}
      </ion-col><br>

      <ion-col col-12 col-sm>
      Hair Color:
      </ion-col><br>

      <ion-col col-12 col-sm>
      ${this.person.hair_color}
      </ion-col><br>      

      <ion-col col-12 col-sm>
      Skin Color:
      </ion-col><br>

      <ion-col col-12 col-sm>
      ${this.person.skin_color}
      </ion-col><br>

      <ion-col col-12 col-sm>
      <div>Height:</div>
      </ion-col>

      <ion-col col-12 col-sm>
      <div>${this.person.height}</div>
      </ion-col><br>

      <ion-col col-12 col-sm>
      Date of Birth:
      </ion-col><br>

      <ion-col col-12 col-sm>
      ${this.person.birth_year}
      </ion-col><br>

      <ion-col col-12 col-sm>
      Mass:
      </ion-col>

      <ion-col col-12 col-sm>
      ${this.person.mass}</ion-col>'`,
      isHtml: true
    };
  
    this.emailComposer.open(email);
  }
  
  }