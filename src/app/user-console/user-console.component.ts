import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-console',
  templateUrl: './user-console.component.html',
  styleUrls: ['./user-console.component.sass']
})
export class UserConsoleComponent implements OnInit {

  @Input() lines: string[];

  constructor() {
  }

  ngOnInit() {
  }
}
