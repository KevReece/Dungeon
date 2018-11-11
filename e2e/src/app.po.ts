import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getPage() {
    return element(by.id('Page'));
  }

  getCharacterComponent() {
    return element(by.id('CharacterComponent'));
  }

  getUserConsoleComponent() {
    return element(by.id('UserConsoleComponent'));
  }

  getMapComponent() {
    return element(by.id('MapComponent'));
  }

  getControllerComponent() {
    return element(by.id('ControllerComponent'));
  }

  getEnemiesComponent() {
    return element(by.id('EnemiesComponent'));
  }

  getMenuComponent() {
    return element(by.id('MenuComponent'));
  }
}
