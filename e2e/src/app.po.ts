import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getCharactorComponent() {
    return element(by.id('CharactorComponent'));
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
}
