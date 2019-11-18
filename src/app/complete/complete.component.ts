import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {
  title: string;
  text: string;
  code: string;
  url: string;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get('title');
    this.code = this.route.snapshot.paramMap.get('userId');
    this.text = this.route.snapshot.paramMap.get('text');
    this.url = this.route.snapshot.paramMap.get('url');
  }

}
