
export class Application {

  constructor(container: HTMLElement) {
    const element = document.createElement('main');
    element.innerHTML = `
      <h2>Webpack Typescript Starter!</h2>
    `;
    container.innerHTML = '';
    container.appendChild(element);
  }

  public async hello() {
    const { hello } = await import('./hello');
    hello();
  }

}
