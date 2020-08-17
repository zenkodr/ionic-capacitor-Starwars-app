import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.page.html',
  styleUrls: ['./planet-details.page.scss'],
})
export class PlanetDetailsPage implements OnInit {

  planet: any;
 
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private emailComposer: EmailComposer) { }
 
  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.api.getPlanet(id).subscribe(res => {
      this.planet = res;
      console.log(res);
    });
  }

  sharePlanet() {
    let email = {
      to: "",
      subject: `I love this planet: ${this.planet.name}`,
      body: `Do you like it?<br><br>"${this.planet.opening_crawl}"`,
      isHtml: true
    };

    this.emailComposer.open(email);
  }

}