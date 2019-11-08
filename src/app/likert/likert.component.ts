import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-likert',
  templateUrl: './likert.component.html',
  styleUrls: ['./likert.component.scss']
})
export class LikertComponent implements OnInit {

  constructor() { }


  ngOnInit() {}
  title = "SurveyJS Angular 7 Popup";
  json = {
    pages: [
      {
        elements: [
          {
            type: "radiogroup",
            name: "radiogroup1",
            hasOther: true,
            choices: ["One", "Two", "Three"]
          }
        ]
      },
      {
        elements: [
          {
            type: "checkbox",
            name: "checkbox1",
            choices: ["One", "Two", "Three"]
          }
        ]
      }
    ]
  };
  onSurveySaved(survey) {
    this.json = survey;
  }
}
