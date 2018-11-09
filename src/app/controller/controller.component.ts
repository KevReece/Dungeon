import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Direction } from '../model/direction.model';
import { ActionOption } from '../model/action-option';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.sass']
})
export class ControllerComponent {

  @Input() actionOptions: ActionOption[] = [ActionOption.None, ActionOption.None, ActionOption.None, ActionOption.None];
  @Output() actionEvent = new EventEmitter<Direction>();

  direction = Direction;
  actionOption = ActionOption;

  clickHandler(direction: Direction) {
    this.actionEvent.emit(direction);
  }
}
