import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormArray, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DataTransferService } from '../../services/data-transfer.service';
import { take } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-question',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MatCheckboxModule, MatIconModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
  standalone: true,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => QuestionComponent),
    multi: true,
  },]
})
export class QuestionComponent implements AfterContentInit, ControlValueAccessor, OnInit {
  @Input() questionIndex = 0;

  @Input() showAnswers = false;

  private answers: any = {};

  public questionFormGroup: FormGroup;

  public get optionsFormArray(): FormArray {
    return this.questionFormGroup.get('options') as FormArray;
  }

  constructor(private dataTransferService: DataTransferService) {
    this.questionFormGroup = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      options: new FormArray([])
    });
  }

  ngOnInit(): void {
    if (this.showAnswers) {
      this.dataTransferService.getAnswers().pipe(take(1)).subscribe((answers) => {
        this.answers = answers;
      });
    }
  }

  ngAfterContentInit(): void {
    const questionFromLocalStorage = localStorage.getItem('quiz-answers');
    if (questionFromLocalStorage) {
      const savedQuestionWithAnswers = JSON.parse(questionFromLocalStorage);
      const currentQuestion = savedQuestionWithAnswers[this.questionIndex];
      if (currentQuestion) {
        const selectedOptionsHash: any = currentQuestion.options.reduce((acc: any, option: any) => {
          acc[option.id] = option.isSelected;
          return acc;
        }, {});

        this.optionsFormArray.controls.forEach((option: any) => {
          const isSelected = option.get('isSelected')?.value;
          if (!isSelected) {
            option.get('isSelected')?.setValue(selectedOptionsHash[option.value.id] ?? false);
          }
        });
      }
    }

    if (this.showAnswers) {
      this.optionsFormArray.controls.forEach((option: any) => {
        if (option.get('isSelected')?.value) {
          option.get('isCorrect')?.setValue(this.answers[this.questionFormGroup?.get('id')?.value][option.value.id] ?? false);
        }
      });
    }

    // Disable all controls
    this.dataTransferService.isQuizSubmitted$.subscribe((isQuizSubmitted) => {
      if (isQuizSubmitted) {
        this.optionsFormArray.controls.forEach((option: any) => {
          option.get('isSelected')?.disable();
        });
      }
    });
  }

  writeValue(question: any): void {
    this.questionFormGroup.patchValue(question);
    question.options.forEach((option: any) => {
      this.addOption(option);
    });
  }

  private onChange: (value: any) => void = () => { };

  private onTouched: (value: any) => void = () => { };

  registerOnChange(fn: any): void {
    this.onChange && (this.onChange = fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private addOption(option: any) {
    const optionFormGroup = new FormGroup({
      id: new FormControl(option.id ?? ''),
      name: new FormControl(option.name ?? ''),
      isSelected: new FormControl(option.isSelected ?? false),
      isCorrect: new FormControl()
    });
    this.optionsFormArray.push(optionFormGroup);
  }

  public onOptionChange() {
    this.onChange(this.questionFormGroup.getRawValue());
  }
} 
