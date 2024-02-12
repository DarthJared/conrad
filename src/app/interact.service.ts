import { Injectable } from '@angular/core';
import {delay} from "rxjs";
import {StateService} from "./state.service";

@Injectable({
  providedIn: 'root'
})
export class InteractService {
  private location: {
    lat: number,
    long: number
  } = {
    lat: 0,
    long: 0
  };

  keywordData: Array<{ keywords: string[], generateResponse: (command: string, keyword: string) => Promise<string> }> = [
    {
      keywords: ['address me as', 'call me', 'my name is', 'this is', 'I am'],
      generateResponse: async (command: string, keyword: string) => {
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
      keywords: ['time', 'what time is it', 'what is the time', 'current time'],
      generateResponse: async (command: string) => {
        const date = new Date();
        const hour = date.getHours() % 12;
        const minute = date.getMinutes();
        const period = date.getHours() > 12 ? 'PM' : 'AM';
        return `The current time is ${hour}:${minute} ${period}`;
      }
    },
    {
      keywords: ['date', 'what is the date', 'current date'],
      generateResponse: async (command: string) => {
        const date = new Date();
        return `Today is ${date.toDateString()}`;
      }
    },
    {
      keywords: ['weather', 'what is the weather', 'current weather'],
      generateResponse: async (command: string) => {
       return await this.getWeather();
      }
    },
    {
      keywords: ['compliment', 'encouragement', 'boost'],
      generateResponse: async (command: string) => {
        const responses = [
          `You are doing a great job! Don't let the pile of work get you down.`,
          'You are doing great. Its okay to take a break!',
          'You are more than good enough! Its okay to take care of yourself too.'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      }
    },
    {
        keywords: ['hello', 'hi', 'hey', 'howdy', 'greetings', 'good day', 'good morning', 'good afternoon', 'good evening'],
        generateResponse: async (command: string) => {
          const responses = [
            `Hello ${this.stateService.addressAs}. How can I help you today?`,
            `Good day ${this.stateService.addressAs}. How may I be of service?`,
            `Yes ${this.stateService.addressAs}. What can I do for you?`
          ];

          return responses[Math.floor(Math.random() * responses.length)];
        }
      }
    ]

 constructor(private stateService: StateService) {
  }

  public async interactWithConrad(command: string): Promise<string> {
    await this.getLocation();
    await new Promise(f => setTimeout(f, 1000));
    for (const keywordEntry of this.keywordData) {
      for (const keyword of keywordEntry.keywords) {
        if (command.toLowerCase().includes(keyword)) {
          return await keywordEntry.generateResponse(command, keyword);
        }
      }
    }
    return 'I am sorry, I do not understand that command.';
  }

  public async getLocation(): Promise<void> {
    await navigator.geolocation.getCurrentPosition((position) => {
      this.location = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      };
    });
  }

  public async getWeather(): Promise<string> {
    // 5edf3bb2527ea7f2f64dd50f83fc9c50
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.location.lat}&lon=${this.location.long}&units=imperial&appid=5edf3bb2527ea7f2f64dd50f83fc9c50`)
    const resJson = await response.json();
    return `It is currently ${Math.round(resJson.main.temp)} degrees with ${resJson.weather[0].description}.  It feels like ${Math.round(resJson.main.feels_like)} degrees. The forecasted high is ${Math.round(resJson.main.temp_max)} degrees and the low is ${Math.round(resJson.main.temp_min)} degrees.`;
  }
}
