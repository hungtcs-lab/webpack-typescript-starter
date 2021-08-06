
export class Application {

  constructor(container: HTMLElement) {
    const element = document.createElement('main');
    element.innerHTML = `
      <h2>Webpack Typescript Starter!</h2>
    `;
    container.innerHTML = '';
    container.appendChild(element);
  }

  public hello(): void {
    console.log(
      `%chello %cworld %c!`,
      'color: red; background: lightblue; padding: 0.5rem; font-size: 14px; font-weight: bold;',
      'color: lightblue; background: red; padding: 0.5rem; font-size: 14px; font-weight: bold;',
      'color: white; background: darkgreen; padding: 0.5rem; font-size: 14px; font-weight: bold;',
    );
  }

}
