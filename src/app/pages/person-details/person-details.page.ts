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
  isFavorite = false;
  personId = null;
 
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private emailComposer: EmailComposer) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.api.getPerson(id).subscribe(res => {
      this.person = res;
      console.log(res);
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
