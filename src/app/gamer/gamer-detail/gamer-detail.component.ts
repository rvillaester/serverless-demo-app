import { Component, OnInit } from '@angular/core';
import { GamerService } from '../gamer.service';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { Gamer } from '../gamer.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-gamer-detail',
  templateUrl: './gamer-detail.component.html',
  styleUrls: ['./gamer-detail.component.css']
})
export class GamerDetailComponent implements OnInit {

  gamer: Gamer;
  id: string;

  constructor(private route: ActivatedRoute, private router: Router, private gamerService: GamerService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: Data) => {
        this.gamer = data['gamer'];
        this.gamer.base64EncodedAvatar = 'http://www.prairieskychamber.ca/wp-content/uploads/2016/10/person-placeholder-image-3.jpg';
      }
    );

    this.gamerService.getAvatar(this.id);
    this.gamerService.gamerImageChanged
      .subscribe(
        (data: string) => {
          this.gamer.base64EncodedAvatar = this.sanitizeImage(this.encode(data));
        }
      )
  }

  onCancel(){
    this.router.navigate(['']);
  }

  onImageChange(event: any){
    var file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(event){
    var binaryString = event.target.result;
    var base64EncodedString = btoa(binaryString)
    this.gamer.base64EncodedAvatar = this.sanitizeImage(base64EncodedString);
    this.gamerService.uploadAvatar(this.id, base64EncodedString);
  }

  encode(data): string{
    var str = data.reduce(function(a,b){ return a+String.fromCharCode(b) },'');
    return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
  }

  sanitizeImage(base64EncodedString){
    return this.sanitizer.bypassSecurityTrustUrl("data:Image/*;base64," + base64EncodedString);
  }

}
