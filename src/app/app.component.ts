import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'concentrate-card-angular';
  score = {unmatchedFlips: 0, matchedFlips: 0};

  receiveScore($event) {
    this.score = $event;
    
    // console.log(this.score.unmatchedFlips);
  }
}
