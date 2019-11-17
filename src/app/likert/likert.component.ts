import { Component, OnInit, Input} from '@angular/core';
import { LikertService } from '../services/likert.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-likert',
  templateUrl: './likert.component.html',
  styleUrls: ['./likert.component.scss']
})
export class LikertComponent implements OnInit {
  json: object;
  constructor(
    private liService: LikertService,
    private route: Router,
    private cookieService: CookieService,
  ) { }


  ngOnInit() {
    this.liService.requestForm();
    this.liService.likertForm.subscribe(data => {
      this.json = data;
    })
  }
  submit(data){
    this.liService.submit(data).subscribe(
      result => {
        console.log('kkk')
        if(!this.cookieService.check('user_id')){
          this.route.navigate(['donation']);
        }
        let pathIndex = Number(this.cookieService.get('user_current_path_index'));
        let pathArray: Array<object> = JSON.parse(this.cookieService.get('user_path'));
        let type: string = pathArray[pathIndex]['type'];       
        if(type == 'normal'){
          this.route.navigate(['likert']);
          this.liService.requestForm();
        } else if(type == 'qv'){
          this.route.navigate(['qv'])
        } else {
          this.route.navigate(['welcome'])
        }
      }
    );
  }
}
