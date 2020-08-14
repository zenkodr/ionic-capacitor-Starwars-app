//referred to https://github.com/herbae/starwarsapp, for some of the code on this page, but later altered it
// also referred to tutorials from https://ionicacademy.com/ionic-crash-course/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.page.html',
  styleUrls: ['./person-details.page.scss'],
})
export class PersonDetailsPage implements OnInit {

  person: any;
 
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
      to: 'lazoski@gmail.com',
      subject: `I love this one: ${this.person.name}`,
      body: `Can you remember the opening?<br><br>"${this.person.opening_crawl}"`,
      isHtml: true
    };

    this.emailComposer.open(email);
  }

}
