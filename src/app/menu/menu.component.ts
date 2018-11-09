import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent {

  @Input() isGameOver: boolean;
  @Output() restartEvent = new EventEmitter();

  restart(): void {
    this.restartEvent.emit(null);
  }
}
