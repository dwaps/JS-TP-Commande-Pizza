import { environment } from '../environment.js';

export default class App {
  constructor() {
    this.contentPage = "";

    this.slidesTag = null;
    this.detailsTag = null;
    this.cartTag = null;
  }
  
  async goTo(view) {
    await fetch('/src/views/header.html')
      .then(res => res.text())
      .then(data => this.contentPage += data);

    await fetch(`/src/views/${view}.html`)
      .then(res => res.text())
      .then(data => {
        this.contentPage += data;
      });
    
    await fetch('/src/views/footer.html')
      .then(res => res.text())
      .then(data => this.contentPage += data);

    document.body.innerHTML = this.contentPage;
    if (view === 'order-pizza') this.loadData();
    this.contentPage = "";
  }

  async loadData() {
    this.slidesTag = document.querySelector('.slides');
    this.detailsTag = document.querySelector('.details');
    this.cartTag = document.querySelector('.cart');

    await fetch(environment.urlApi)
      .then(res => res.json())
      .then(data => {
        const pizzas = data.pizzas;
        if (pizzas) {
          pizzas.forEach(this.createPizzaTag.bind(this));
        }
      });
  }

  createPizzaTag(pizza) {
    const pizzaTag = document.createElement('div');

    pizzaTag.className = 'pizza';
    pizzaTag.innerHTML = `
      <h1>${pizza.name}</h1>
      <div class="controls">
        <div class="prev"></div>
        <div class="next"></div>
      </div>
    `;

    this.slidesTag.appendChild(pizzaTag);
  }
}
