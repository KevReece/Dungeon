import { Component, OnInit } from '@angular/core';
import { UserConsoleService } from '../services/user-console.service';

@Component({
  selector: 'app-user-console',
  templateUrl: './user-console.component.html',
  styleUrls: ['./user-console.component.sass']
})
export class UserConsoleComponent implements OnInit {
  lines: string[];

  constructor(private userConsoleService: UserConsoleService) { }

  ngOnInit(): void {
    this.lines = this.userConsoleService.lines;
  }
}
