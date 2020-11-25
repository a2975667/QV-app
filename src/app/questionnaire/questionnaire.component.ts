import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GlobalService } from '../services/global.service';
import { User } from '../schema/user';
import { Questionnaire } from '../schema/questionnaire'
import { Question } from '../schema/question';
import { Router } from '@angular/router';
@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  questionnaire: Questionnaire;
  currentQuestion = 0;
  numQuestion = 1;
  questionTitle: string;
  questionDes: string;
  numFile = 1;
  currentFile = 1;
  constructor(
    private gService: GlobalService,
    private route: Router,
    private cookieService: CookieService
  ) { }

  get showProgressBar() {
    console.log(this.questionnaire)
    return !this.questionnaire ? null : this.questionnaire.setting.progressBar;
  }

  ngOnInit() {
    const pathIndex = Number(this.cookieService.get('user_current_path_index'));
    const pathArray: Array<object> = JSON.parse(this.cookieService.get('user_path'));
    const type: string = pathArray[pathIndex]['type'];
    if (type === 'normal') {
      this.route.navigate(['likert']);
    } else if (type === 'qv') {
      this.gService.questionSet.subscribe((data: Questionnaire) => {
        this.questionnaire = data;
        this.currentQuestion = data.currentQuestion;
        this.numQuestion = data.question_list.length;
        const questionContent = data.question_list[this.currentQuestion];
        this.questionDes = questionContent.description;
        this.questionTitle = questionContent.question;
        const refetchPathArray: Array<string> = JSON.parse(this.cookieService.get('user_path'));
        this.numFile = refetchPathArray.length;
        const refetchPathIndex = Number(this.cookieService.get('user_current_path_index'));
        this.currentFile = refetchPathIndex + 1;
      });
      this.gService.getQuestionnaire();
    } else if (type === 'donation') {
      this.route.navigate(['donation']);
    } else if (type === 'complete') {
      this.route.navigate(['complete']);
    }
  }
}
