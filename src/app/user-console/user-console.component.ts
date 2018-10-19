import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-console',
  templateUrl: './user-console.component.html',
  styleUrls: ['./user-console.component.sass']
})
export class UserConsoleComponent implements OnInit {

  lines: string[] = []

  constructor() { 
    this.lines.push("constructor called")
  }

  ngOnInit() {
    this.lines.push("ngOnInit called")
  }
}
