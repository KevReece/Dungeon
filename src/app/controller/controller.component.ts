import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Direction } from '../model/direction.model';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.sass']
})
export class ControllerComponent implements OnInit {

  constructor() { }

  @Output() actionEvent = new EventEmitter<Direction>();

  ngOnInit() {
  }

  upClickHandler() {
    this.actionEvent.emit(Direction.Up);
  }

  rightClickHandler() {
    this.actionEvent.emit(Direction.Right);
  }

  downClickHandler() {
    this.actionEvent.emit(Direction.Down);
  }

  leftClickHandler() {
    this.actionEvent.emit(Direction.Left);
  }
}
