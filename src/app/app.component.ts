import { Component } from '@angular/core';
import { QuestionsContainerComponent } from './components/questions-container/questions-container.component';

@Component({
  selector: 'app-root',
  imports: [QuestionsContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent {
  title = 'quiz';
}
