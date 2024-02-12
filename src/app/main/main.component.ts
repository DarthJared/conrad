import {ChangeDetectorRef, Component} from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { InteractService } from "../interact.service";
import { InteractionBubbleComponent } from "../interaction-bubble/interaction-bubble.component";
import { VisualizerComponent } from "../visualizer/visualizer.component";

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule, CommonModule, InteractionBubbleComponent, VisualizerComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  commandText: string = 'hello';
  interactions: Array<{isConrad: boolean, text: string}> = [];
  synth = window.speechSynthesis;
  voice: any = null;
  listening: boolean;
  speaking: boolean;

  devMode: boolean;

  constructor(private interactService: InteractService, private changeDetector: ChangeDetectorRef) {
    this.listening = false;
    this.speaking = false;
    this.devMode = false;
  }

  speakConrad = (callback: Function, speech: string) => {
    const utterance = new SpeechSynthesisUtterance(speech);
    utterance.onstart = (event) => {
      this.speaking = true;
      this.changeDetector.detectChanges();
    };
    utterance.onend = (event) => {
      this.speaking = false;
      this.changeDetector.detectChanges();
      callback();
    };
    utterance.voice = this.voice;
    utterance.pitch = 1;
    utterance.rate = 1.3;
    this.synth.speak(utterance);
  }


  submitCommand() {
    if (!this.commandText) {
      this.listenToCommand();
      return;
    }

    const voices = this.synth.getVoices();
    if (!this.voice) {
      this.voice = voices.filter((voice) => voice.voiceURI === 'Google UK English Male')[0];
    }

    this.interactions.push({isConrad: false, text: this.commandText});
    this.interactService.interactWithConrad(this.commandText).then((response) => {
      this.interactions.push({isConrad: true, text: response});
      this.changeDetector.detectChanges();
      this.speakConrad(this.listenToCommand, response);
    });
    this.commandText = '';
  }

  listenToCommand = () => {
    const {webkitSpeechRecognition} = (window as any)
    const recognition: any = new webkitSpeechRecognition();
    recognition.onstart = () => {
      this.listening = true;

      this.changeDetector.detectChanges();
    }
    recognition.onresult = (event: any) => {
      this.commandText = event.results[0][0].transcript;
      this.submitCommand();
    }
    recognition.onend = () => {
      this.listening = false;

      this.changeDetector.detectChanges();
    }
    recognition.start();
  }
}
