import { Application } from './app/application';

new Application().hello();

if(module.hot) {
  module.hot.accept('./app/application.ts', () => {
    new Application().hello();
  });
}
