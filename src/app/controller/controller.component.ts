import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Direction } from '../model/direction.model';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.sass']
})
export class ControllerComponent implements OnInit {

  constructor() { }

  @Output() actionEvent = new EventEmitter();

  ngOnInit() {
  }

  upClickHandler = function() {
    this.actionEvent.emit(Direction.Up);
  }

  rightClickHandler = function() {
    this.actionEvent.emit(Direction.Right);
  }

  downClickHandler = function() {
    this.actionEvent.emit(Direction.Down);
  }

  leftClickHandler = function() {
    this.actionEvent.emit(Direction.Left);
  }
}
