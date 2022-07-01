import './style.scss';
import { Application } from './app/application';

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}

async function main() {
  const app = new Application(document.body);
  await app.hello();
}

main().catch(err => console.error(err));
