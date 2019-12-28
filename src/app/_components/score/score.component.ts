import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  @Input() score: Object;

  constructor() { 
  }

  ngOnInit() {
    console.log("PRINT FROM SCORE COMP", this.score);
  }

}
