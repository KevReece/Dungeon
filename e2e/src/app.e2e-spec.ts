import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should load app', () => {
    expect(page.getParagraphText()).toEqual('Welcome to the Dungeon!');
  });

  it('should load character component', () => {
    expect(page.getCharacterComponent().isPresent()).toBeTruthy();
  });

  it('should load map component', () => {
    expect(page.getMapComponent().isPresent()).toBeTruthy();
  });

  it('should load user console component', () => {
    expect(page.getUserConsoleComponent().isPresent()).toBeTruthy();
  });

  it('should load controller component', () => {
    expect(page.getControllerComponent().isPresent()).toBeTruthy();
  });

  it('should load enemies component', () => {
    expect(page.getEnemiesComponent().isPresent()).toBeTruthy();
  });
});
