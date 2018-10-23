import { Component, OnInit, Input } from '@angular/core';
import { UserConsoleService } from '../services/user-console.service';

@Component({
  selector: 'app-user-console',
  templateUrl: './user-console.component.html',
  styleUrls: ['./user-console.component.sass']
})
export class UserConsoleComponent {

  lines: string[];

  constructor(private userConsoleService: UserConsoleService) {
    this.lines = userConsoleService.lines;
  }
}
