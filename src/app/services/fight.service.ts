import { Injectable } from '@angular/core';
import { Character } from '../model/celloccupiers/character.model';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { UserConsoleService } from './user-console.service';
import { FactoryService } from './factory.service';
import { Fighter } from '../model/celloccupiers/fighter.model';

@Injectable({
  providedIn: 'root'
})
export class FightService {

  constructor(private userConsoleService: UserConsoleService, private factoryService: FactoryService) {  }

  attack(attacker: Fighter, defender: Fighter): void {
    const attackLuck = this.factoryService.createRandomInteger(-3, 4);
    if (attacker.attack + attackLuck > defender.defence) {
      this.dealDamage(attacker, defender);
    } else {
      this.userConsoleService.writeAttackFailed();
    }
  }

  private dealDamage(attacker: Fighter, defender: Fighter) {
    const minDamage = Math.ceil(attacker.damage * 0.5);
    const maxDamage = Math.ceil(attacker.damage * 1.5);
    const damage = this.factoryService.createRandomInteger(minDamage, maxDamage);
    defender.takeDamage(damage);
    this.userConsoleService.writeAttackSucceeded(damage);
    if (!defender.isAlive()) {
      attacker.killedOpponent(defender);
    }
  }
}
