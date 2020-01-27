import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GamerService } from '../gamer.service';
import { Gamer } from '../gamer.model';

@Component({
  selector: 'app-search-gamer',
  templateUrl: './search-gamer.component.html',
  styleUrls: ['./search-gamer.component.css']
})
export class SearchGamerComponent implements OnInit {

  gamers: Gamer[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router, private gamerService: GamerService) { }

  ngOnInit() {
    this.gamerService.gamersChanged
      .subscribe(
        (gamers: Gamer[]) => {
          this.gamers = gamers;
        }
      );
  }

  onSubmit(form: NgForm){
    const value = form.value;
    this.gamerService.searchGamers(value.username, value.name);
  }

  onCancel(){
    this.router.navigate(['/gamer']);
  }

}
