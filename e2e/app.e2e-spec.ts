import { MembershipfeesmanagerPage } from './app.po';

describe('membershipfeesmanager App', () => {
  let page: MembershipfeesmanagerPage;

  beforeEach(() => {
    page = new MembershipfeesmanagerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
