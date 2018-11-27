import { Component, Output, Input, EventEmitter } from '@angular/core';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent {

  @Input() isGameOver: boolean;
  @Output() restartEvent = new EventEmitter();

  constructor(private confirmationDialogService: ConfirmationDialogService) { }

  restart(): void {
    if (this.isGameOver) {
      this.restartEvent.emit(null);
    } else {
      this.confirmationDialogService
        .confirm('Restart', 'Do you want to abandon and start again?')
        .then((isConfirmed) => this.handleButtonClick(isConfirmed));
    }
  }

  private handleButtonClick(isConfirmed: boolean): void {
    if (isConfirmed) {
      this.restartEvent.emit(null);
    }
  }
}
