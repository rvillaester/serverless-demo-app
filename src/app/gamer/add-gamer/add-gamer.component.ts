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
  private form: NgForm = null;

  constructor(private route: ActivatedRoute,
    private router: Router, private gamerService: GamerService) { }

  ngOnInit() {
    this.model = new Gamer('', '', '', '', '', '');
    this.gamerService.gamerAdded
      .subscribe(
        (data: any) => {
          this.form.reset();
          alert("Gamer is successfully added");
        },
        (error: any) => {
          alert('Oppps something went wrong')
        }
      )
  }

  onSubmit(form: NgForm){
    this.form = form;
    const value = form.value;
    this.model = new Gamer('', value.username, value.name, value.email, value.gender, '');
    this.gamerService.addGamer(this.model);
  }

  onCancel(){
    this.router.navigate(['gamer']);
  }
}
