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
    const attackLuck = this.factoryService.createRandomInteger(-3, 4);
    if (attacker.attack + attackLuck > defender.defence) {
      const minDamage = Math.ceil(attacker.damage * 0.5);
      const maxDamage = Math.ceil(attacker.damage * 1.5);
      const damage = this.factoryService.createRandomInteger(minDamage, maxDamage);
      defender.health -= damage;
      this.userConsoleService.writeAttackSucceeded(damage);
    } else {
      this.userConsoleService.writeAttackFailed();
    }
  }
}
