import { Injectable } from '@angular/core';
import {delay} from "rxjs";
import {StateService} from "./state.service";

@Injectable({
  providedIn: 'root'
})
export class InteractService {
  keywordData: Array<{ keywords: string[], generateResponse: (command: string, keyword: string) => string }> = [
    {
      keywords: ['address me as', 'call me', 'my name is', 'this is', 'I am'],
      generateResponse: (command: string, keyword: string) => {
        const name = command.split(keyword)[1].trim();
        this.stateService.setAddressAs(name);

        const responses = [
          `Very well. I will address you as ${name}.`,
          `Understood. I will call you ${name}.`,
          `Of course. I will address you as ${name}.`
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      }
    },
    {
        keywords: ['hello', 'hi', 'hey', 'howdy', 'greetings', 'good day', 'good morning', 'good afternoon', 'good evening'],
        generateResponse: (command: string) => {
          const responses = [
            `Hello ${this.stateService.addressAs}. How can I help you today?`,
            `Good day ${this.stateService.addressAs}. How may I be of service?`,
            `Yes ${this.stateService.addressAs}. What can I do for you?`
          ];

          return responses[Math.floor(Math.random() * responses.length)];
        }
      }
    ]

  constructor(private stateService: StateService) { }

  public async interactWithConrad(command: string): Promise<string> {
    await new Promise(f => setTimeout(f, 1000));
    for (const keywordEntry of this.keywordData) {
      for (const keyword of keywordEntry.keywords) {
        if (command.toLowerCase().includes(keyword)) {
          return keywordEntry.generateResponse(command, keyword);
        }
      }
    }
    return 'I am sorry, I do not understand that command.';
  }
}
