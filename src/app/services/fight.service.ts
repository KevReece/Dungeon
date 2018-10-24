import { Injectable } from '@angular/core';
import { Character } from '../model/celloccupiers/character.model';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { UserConsoleService } from './user-console.service';
import { FactoryService } from './factory.service';

@Injectable({
  providedIn: 'root'
})
export class FightService {

  constructor(private userConsoleService: UserConsoleService, private factoryService: FactoryService) {  }

  attack(attacker: Character, defender: Enemy): void {
    const attackLuck = this.factoryService.createRandomNumber(-3, 4);
    if (attacker.attack + attackLuck > defender.defence) {
      defender.health -= 1;
      this.userConsoleService.writeAttackSucceeded(1);
    } else {
      this.userConsoleService.writeAttackFailed();
    }
  }
}
