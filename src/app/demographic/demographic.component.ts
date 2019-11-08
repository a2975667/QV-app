import { Component, OnInit } from '@angular/core';
import { DemographicService } from '../services/demographic.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-demographic',
  templateUrl: './demographic.component.html',
  styleUrls: ['./demographic.component.scss']
})
export class DemographicComponent implements OnInit {
  demoForm: Object;
  constructor(
    private demoFormService: DemographicService
  ) { 
  }

  ngOnInit() {
    this.demoFormService.demoForm.subscribe(data => {
      this.demoForm = data;
    })
    this.demoFormService.requestForm();
    
  }
  submit(data){
    this.demoFormService.submit(data);
  }
 
}
