import { Component, OnInit, Input } from '@angular/core';
import { Charactor } from '../model/charactor.model';

@Component({
  selector: 'app-charactor',
  templateUrl: './charactor.component.html',
  styleUrls: ['./charactor.component.sass']
})
export class CharactorComponent implements OnInit {

  @Input() charactor: Charactor;

  constructor() { }

  ngOnInit() {
  }

}
