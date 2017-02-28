import { NgrxCourseFrontendPage } from './app.po';

describe('ngrx-course-frontend App', () => {
  let page: NgrxCourseFrontendPage;

  beforeEach(() => {
    page = new NgrxCourseFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
