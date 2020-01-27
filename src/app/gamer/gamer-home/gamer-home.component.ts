import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gamer-home',
  templateUrl: './gamer-home.component.html',
  styleUrls: ['./gamer-home.component.css']
})
export class GamerHomeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onAdd(){
    console.log('add');
    this.router.navigate(['addGamer'], {relativeTo: this.route});
  }

  onSearch(){
    this.router.navigate(['searchGamer'], {relativeTo: this.route});
  }

}
