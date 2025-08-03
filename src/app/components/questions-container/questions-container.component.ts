import { Component, OnInit } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DataTransferService } from '../../services/data-transfer.service';
import { Observable, take } from 'rxjs';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ViewResultsComponent } from '../view-results/view-results.component';

@Component({
  selector: 'app-questions-container',
  imports: [QuestionComponent, MatIconModule, MatButtonModule, MatToolbarModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './questions-container.component.html',
  styleUrl: './questions-container.component.scss',
  standalone: true,
})

export class QuestionsContainerComponent implements OnInit {
  public questionFormGroup: FormGroup;

  public currentQuestionIndex = 0;

  public isQuizSubmitted: Observable<boolean>;

  public get questionsFormArray(): FormArray {
    return this.questionFormGroup.get('questions') as FormArray;
  }

  constructor(private dataTransferService: DataTransferService, private matDialog: MatDialog,) {
    this.questionFormGroup = new FormGroup({
      questions: new FormArray([])
    });

    const quizSubmitted = localStorage.getItem('quiz-submitted');
    if (quizSubmitted) {
      this.dataTransferService.setIsQuizSubmitted(true);
    }

    this.isQuizSubmitted = this.dataTransferService.isQuizSubmitted$;
  }

  ngOnInit(): void {
    this.dataTransferService.getQuestions().pipe(take(1)).subscribe((questions) => {
      questions.forEach((question: any) => {
        this.addQuestion(question);
      });
    });
  }


  private addQuestion(question: any) {
    this.questionsFormArray.push(new FormControl(question));
  }

  public nextQuestion() {
    if (this.currentQuestionIndex <= this.questionsFormArray.length - 1) {
      this.saveAnswersToLocalStorage();
      if (this.currentQuestionIndex === this.questionsFormArray.length - 1) {
        this.submitQuiz();
      } else {
        this.currentQuestionIndex++;
      }
    }
  }

  public previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.saveAnswersToLocalStorage();
      this.currentQuestionIndex--;
    }
  }

  private saveAnswersToLocalStorage() {
    const currentQuestionGroup = this.questionsFormArray.at(this.currentQuestionIndex);
    if (!currentQuestionGroup?.pristine) {
      const currentQuestionValue = currentQuestionGroup.getRawValue();
      const outDatedQuestionValue = structuredClone(JSON.parse(localStorage.getItem('quiz-answers') ?? '[]'));
      localStorage.removeItem('quiz-answers');
      outDatedQuestionValue[this.currentQuestionIndex] = currentQuestionValue;
      localStorage.setItem('quiz-answers', JSON.stringify(outDatedQuestionValue));
    }
  }

  public viewResults() {
    const dialogRef = this.matDialog.open(ViewResultsComponent, {
      disableClose: false,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  public submitQuiz() {
    this.saveAnswersToLocalStorage();
    const dialogRef = this.matDialog.open(ConfirmationComponent, {
      disableClose: false,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        localStorage.setItem('quiz-submitted', 'true');
        this.dataTransferService.setIsQuizSubmitted(true);
      }
    });
  }

  public resetQuiz() {
    localStorage.removeItem('quiz-submitted');
    localStorage.removeItem('quiz-answers');
    this.dataTransferService.setIsQuizSubmitted(false);
    this.questionsFormArray.clear();
    this.currentQuestionIndex = 0;
    this.ngOnInit();
  }
}
