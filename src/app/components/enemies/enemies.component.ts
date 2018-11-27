import { Component, Input } from '@angular/core';
import { Enemy } from '../../model/celloccupiers/enemy.model';

@Component({
  selector: 'app-enemies',
  templateUrl: './enemies.component.html',
  styleUrls: ['./enemies.component.sass']
})
export class EnemiesComponent {
  @Input() enemies: Enemy[];
}
