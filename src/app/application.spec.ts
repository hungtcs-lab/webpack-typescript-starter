import { Application } from './application';

describe('Application', () => {

  it('should creatable', () => {
    const app = new Application(document.body);
    expect(app).toBeDefined();
  });

});
