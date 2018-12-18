import {Component, OnInit} from '@angular/core';
import {TextToSpeech} from '@ionic-native/text-to-speech/ngx';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  faCoffee = faCoffee;
  fas = fas;
  far = far;
  fab = fab;
  ifstart: any = false;
  status: any = 'bet';
  goal: any = 0;
  answer: any = 0;
  win: any = 0;
  wintext: any = false;
  losetext: any = false;
  money: any = 100;
  constructor(private tts: TextToSpeech) {}
  ngOnInit(): void {
  }
    speak() {
        this.tts.speak('Click the Roll button to get your number.And click start to compare your number to computer\'s.\n' +
            '  And your score will be recorded in the right bottom.')
            .then(() => console.log('Success'));
    }
    start() {
      this.ifstart = !this.ifstart;
      this.ifstart === true ? this.status = 'stop' : this.status = 'bet';
      if (this.ifstart === false) {
        this.wintext = false;
        this.losetext = false;
      }
      if (this.answer > this.goal && this.ifstart === true) {
          this.win += 1;
          this.money += 10;
          this.wintext = true;
          this.losetext = false;
          this.tts.speak('Congratulation,you win')
              .then(() => console.log('Success'));
      } else if (this.ifstart === true) {
        this.losetext = true;
        this.wintext = false;
        this.money -= 10;
          this.tts.speak('sorry,you lose,try again')
              .then(() => console.log('Success'));
      }
    }
    reset() {
        this.goal = Math.ceil(Math.random() * 100) ;
        this.answer = Math.ceil(Math.random() * 100);
    }
    giveup() {
      this.answer = 0;
      this.goal = 0;
    }
}


