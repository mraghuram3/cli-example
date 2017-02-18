import { SimilityPage } from './app.po';

describe('simility App', () => {
  let page: SimilityPage;

  beforeEach(() => {
    page = new SimilityPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
