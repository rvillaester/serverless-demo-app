import { Component, OnInit, Input } from '@angular/core';
import { Gamer } from '../gamer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GamerService } from '../gamer.service';

@Component({
  selector: 'app-gamer-list',
  templateUrl: './gamer-list.component.html',
  styleUrls: ['./gamer-list.component.css']
})
export class GamerListComponent implements OnInit {

  @Input('gamers') gamers: Gamer[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private gamerService: GamerService) { }

  ngOnInit() {
    this.gamerService.gamersChanged
      .subscribe(
        (gamers: Gamer[]) => {
          this.gamers = gamers;
        }
      );
  }

  onDelete(index: number, gamer: Gamer){
    console.log(gamer);
    console.log('gamer');
    this.gamerService.deleteGamer(index, gamer);
  }

  onViewDetails(gamer: Gamer){
    this.router.navigate([gamer.id], {relativeTo: this.route});
  }

}
