import { Injectable } from '@angular/core';
import { Character } from '../model/celloccupiers/character.model';
import { UserConsoleService } from './user-console.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterLevelUpgradeService {

  constructor(private userConsoleService: UserConsoleService) { }

  initialize(character: Character): void {
    this.setStats(character);
    character.health = character.maxHealth;
  }

  check(character: Character): void {
    const currentLevel = character.level;
    if (currentLevel !== this.levelFor(character.experience)) {
      this.setStats(character);
      character.health += this.maxHealthFor(character.level) - this.maxHealthFor(currentLevel);
      this.userConsoleService.writeLevelUpgraded(character.level);
    }
  }

  private setStats(character: Character) {
    character.level = this.levelFor(character.experience);
    character.attack = this.attackFor(character.level);
    character.defence = this.defenceFor(character.level);
    character.damage = this.damageFor(character.level);
    character.maxHealth = this.maxHealthFor(character.level);
  }

  private levelFor(experience: number): number {
    return Math.floor(Math.pow((experience / 7), 0.7)) + 1;
  }

  private attackFor(level: number): number {
    return Math.floor(level * 1.4);
  }

  private defenceFor(level: number): number {
    return Math.floor(level * 1.2);
  }

  private damageFor(level: number): number {
    return Math.ceil(level * 0.4);
  }

  private maxHealthFor(level: number): number {
    return Math.ceil(level * 1.4) + 8;
  }
}
