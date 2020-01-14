import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gamer } from '../gamer.model';
import { NgForm, NgModel } from '@angular/forms';
import { GamerService } from '../gamer.service';

@Component({
  selector: 'app-add-gamer',
  templateUrl: './add-gamer.component.html',
  styleUrls: ['./add-gamer.component.css']
})
export class AddGamerComponent implements OnInit {

  private model: Gamer = null;

  constructor(private route: ActivatedRoute,
    private router: Router, private gamerService: GamerService) { }

  ngOnInit() {
    this.model = new Gamer('', '', '', '', '', '');
  }

  onSubmit(form: NgForm){
    const value = form.value;
    this.model = new Gamer('', value.username, value.name, value.email, value.gender, '');
    this.gamerService.addGamer(this.model);
    this.router.navigate(['']);
  }

  onCancel(){
    this.router.navigate(['']);
  }
}
