import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() { }

  private isQuizSubmitted = new BehaviorSubject<boolean>(false);

  public isQuizSubmitted$ = this.isQuizSubmitted.asObservable();

  public setIsQuizSubmitted(value: boolean) {
    this.isQuizSubmitted.next(value);
  }

  getQuestions(): Observable<any> {
    return of([
      {
        "id": "question-id-1",
        "name": "Which of the following is considered as framework?",
        "options": [
          {
            "id": "question-id-1-1",
            "name": "React",
            "isSelected": false
          },
          {
            "id": "question-id-1-2",
            "name": "Angular",
            "isSelected": false
          },
          {
            "id": "question-id-1-3",
            "name": "Vue Js",
            "isSelected": false
          },
          {
            "id": "question-id-1-4",
            "name": "Vanilla JS",
            "isSelected": false
          },
          {
            "id": "question-id-1-5",
            "name": "Django",
            "isSelected": false
          }
        ]
      },
      {
        "id": "question-id-2",
        "name": "Which one of those is maintained by Google?",
        "options": [
          {
            "id": "question-id-2-1",
            "name": "React",
            "isSelected": false
          },
          {
            "id": "question-id-2-2",
            "name": "Angular",
            "isSelected": false
          },
          {
            "id": "question-id-2-3",
            "name": "NextJs",
            "isSelected": false
          }
        ]
      },
      {
        "id": "question-id-3",
        "name": "Which of these is a state management library?",
        "options": [
          {
            "id": "question-id-3-1",
            "name": "Redux",
            "isSelected": false
          },
          {
            "id": "question-id-3-2",
            "name": "MobX",
            "isSelected": false
          },
          {
            "id": "question-id-3-3",
            "name": "Vuex",
            "isSelected": false
          },
          {
            "id": "question-id-3-4",
            "name": "NgRx",
            "isSelected": false
          }
        ]
      },
      {
        "id": "question-id-4",
        "name": "Which of these is a CSS framework?",
        "options": [
          {
            "id": "question-id-4-1",
            "name": "Bootstrap",
            "isSelected": false
          },
          {
            "id": "question-id-4-2",
            "name": "Tailwind",
            "isSelected": false
          },
          {
            "id": "question-id-4-3",
            "name": "CSS Modules",
            "isSelected": false
          },
          {
            "id": "question-id-4-4",
            "name": "Foundation",
            "isSelected": false
          }
        ]
      },
      {
        "id": "question-id-5",
        "name": "Which of these is a testing framework?",
        "options": [
          {
            "id": "question-id-5-1",
            "name": "Jest",
            "isSelected": false
          },
          {
            "id": "question-id-5-2",
            "name": "CoffeeScript",
            "isSelected": false
          },
          {
            "id": "question-id-5-3",
            "name": "Jasmine",
            "isSelected": false
          },
          {
            "id": "question-id-5-4",
            "name": "Karma",
            "isSelected": false
          },
          {
            "id": "question-id-5-5",
            "name": "Mocha",
            "isSelected": false
          }
        ]
      },
    ]);
  }

  getAnswers(): Observable<any> {
    return of({
      "question-id-1": {
        "question-id-1-2": true,
        "question-id-1-3": true,
        "question-id-1-5": true,
      },
      "question-id-2": {
        "question-id-2-2": true
      },
      "question-id-3": {
        "question-id-3-1": true,
        "question-id-3-2": true,
        "question-id-3-3": true,
        "question-id-3-4": false,
      },
      "question-id-4": {
        "question-id-4-1": true,
        "question-id-4-2": true,
        "question-id-4-4": true,
      },
      "question-id-5": {
        "question-id-5-1": true,
        "question-id-5-3": true,
        "question-id-5-4": true,
        "question-id-5-5": true,
      }
    })
  }
}