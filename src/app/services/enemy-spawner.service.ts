import { Injectable } from '@angular/core';
import { MapGrid } from '../model/map-grid.model';
import { FactoryService } from './factory.service';
import { UserConsoleService } from './user-console.service';
import { Enemy } from '../model/celloccupiers/enemy.model';

@Injectable({
  providedIn: 'root'
})
export class EnemySpawnerService {

  currentLevel = 1;
  spawnLevelEnemies = ['Goblin', 'Goblin', 'Orc', 'Troll'];
  currentSpawnLevel = 0;
  turnsPerSpawn = 20;
  currentTurnsSinceSpawn = 0;
  spawnsPerSpawnLevel = 3;
  currentSpawnCountForSpawnLevel = 0;
  mapGrid: MapGrid;

  constructor(
      private factoryService: FactoryService,
      private userConsoleService: UserConsoleService) {
  }

  initialize(mapGrid: MapGrid, currentLevel: number) {
    this.mapGrid = mapGrid;
    this.currentLevel = currentLevel;
    this.currentSpawnLevel = currentLevel - 1;
  }

  spawnEasy(): Enemy {
    return this.createEnemyAtLevel(this.currentLevel);
  }

  spawnHard(): Enemy {
    return this.createEnemyAtLevel(this.currentLevel + 1);
  }

  stepSpawnCycle(): Enemy {
    this.currentTurnsSinceSpawn += 1;
    if (this.currentTurnsSinceSpawn < this.turnsPerSpawn) {
      return null;
    }
    this.incrementCounters();
    const spawnedEnemy = this.createEnemyAtLevel(this.currentSpawnLevel);
    const cellToSpawnIn = this.mapGrid.randomUnoccupiedCell();
    if (!cellToSpawnIn) {
      return null;
    }
    cellToSpawnIn.setOccupier(spawnedEnemy);
    this.userConsoleService.writeEnemySpawned(spawnedEnemy);
    return spawnedEnemy;
  }

  private createEnemyAtLevel(enemyLevel: number): Enemy {
    const enemyName = enemyLevel < this.spawnLevelEnemies.length
      ? this.spawnLevelEnemies[enemyLevel]
      : this.spawnLevelEnemies[this.spawnLevelEnemies.length - 1];
    return this.factoryService.createEnemy(enemyName);
  }

  private incrementCounters() {
    this.currentTurnsSinceSpawn = 0;
    this.currentSpawnCountForSpawnLevel += 1;
    if (this.currentSpawnCountForSpawnLevel >= this.spawnsPerSpawnLevel) {
      this.currentSpawnLevel += 1;
      this.currentSpawnCountForSpawnLevel = 0;
    }
  }
}
