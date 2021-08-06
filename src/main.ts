import './style.scss';
import { Application } from './app/application';

function main() {
  const app = new Application(document.body)
  app.hello();
}

main();

if(import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
