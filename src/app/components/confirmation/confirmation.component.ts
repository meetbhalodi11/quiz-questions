import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule]
})

export class ConfirmationComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmationComponent>) { }

  public closeDialog(result: boolean) {
    this.dialogRef.close(result);
  }
}
