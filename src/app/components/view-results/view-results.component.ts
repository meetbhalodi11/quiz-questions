import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { take } from 'rxjs';
import { DataTransferService } from '../../services/data-transfer.service';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionComponent } from '../question/question.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrl: './view-results.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, QuestionComponent, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ViewResultsComponent implements OnInit {

  public questionFormGroup: FormGroup;

  public get questionsFormArray(): FormArray {
    return this.questionFormGroup.get('questions') as FormArray;
  }

  constructor(private matDialogRef: MatDialogRef<ViewResultsComponent>, private dataTransferService: DataTransferService) {
    this.questionFormGroup = new FormGroup({
      questions: new FormArray([])
    });
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

  public closeDialog(value: boolean) {
    this.matDialogRef.close(value);
  }
}
