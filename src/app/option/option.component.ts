import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GlobalService } from '../services/global.service';
import { User } from '../schema/user';
import { Questionnaire } from '../schema/questionnaire'
import { Question } from '../schema/question';
import { Option } from '../schema/option';
@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
  @Input() showProgressBar = true;
  isKnapsack = false;
  votes: number[];
  currentOptions: Option[];
  totalCredits: number;
  currentQuestionIndex: number;
  constructor(
    private gService: GlobalService, 
  ) { }

  ngOnInit() {
    this.gService.questionSet.subscribe((data: Questionnaire)=>{
      this.currentQuestionIndex = data.currentQuestion;
      const currentQuestion = data.question_list[this.currentQuestionIndex];
      this.currentOptions = currentQuestion.options;
      this.isKnapsack = data.setting.style === 'knapsack';
      this.votes = new Array(this.currentOptions.length).fill(0);
      this.totalCredits = currentQuestion.totalCredits;
      this.gService.votes.subscribe(votes => {
        this.votes = votes[this.currentQuestionIndex];
      });
    });
  }

  calVote(vote: number) {
    return this.isKnapsack ? Math.abs(vote) : vote * vote;
  }

  calCurrentTotalCredits() {
    let totalCredit = 0;

    this.votes.forEach(vote => {
      const addedVote = this.isKnapsack ? Math.abs(vote) : vote * vote;
      totalCredit = totalCredit + addedVote;
    });
    return totalCredit;
  }

  isDisabled(index: number, isMinus: boolean) {
    let currentDirection = isMinus ? this.votes[index] <= 0 : this.votes[index] >= 0;
    let currentCredits = this.calCurrentTotalCredits();
    let difference =  this.isKnapsack ? 
      Math.abs(this.votes[index]) + 1 - Math.abs(this.votes[index]) :
      Math.pow((Math.abs(this.votes[index])+1), 2) - Math.pow(this.votes[index], 2);
    let isNextPossibleTotalCreditsOK = currentCredits + difference > this.totalCredits;
    return currentDirection && isNextPossibleTotalCreditsOK;
  }

  modifyVotesByID(o_index, value){
    let originalVote = this.gService.votesContent[
      this.currentQuestionIndex
    ][
      o_index
    ];
    this.gService.modifyVotesByID(this.currentQuestionIndex+1, o_index+1, originalVote+value);
  }
}
