import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.page.html',
  styleUrls: ['./starships.page.scss'],
})
export class StarshipsPage implements OnInit {

  starships: Observable<any>;

  constructor(private router: Router, private api: ApiService) { }
 
  ngOnInit() {
    this.starships = this.api.getStarships().pipe(
      tap(r => console.log(r))
    );
  }

  openDetails(starship) {
    let split = starship.url.split('/');
    let starshipId = split[split.length-2];
    this.router.navigateByUrl(`/tabs/starships/${starshipId}`);
  }
}
