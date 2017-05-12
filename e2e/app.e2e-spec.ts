import { HobbyHorsePage } from './app.po';

describe('hobby-horse App', () => {
  let page: HobbyHorsePage;

  beforeEach(() => {
    page = new HobbyHorsePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
