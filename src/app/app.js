import { environment } from '../environment.js';
import Pizza from '../models/pizza.js';

export default class App {
  constructor() {
    this.contentPage = "";
    this.pizzas = [];

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
      .then(dataReceived => {
        if (dataReceived.pizzas && Array.isArray(dataReceived.pizzas)) {
          dataReceived.pizzas.length = 3;
          const nbOfPizzasReceived = dataReceived.pizzas.length;
          this.slidesTag.style.width = (nbOfPizzasReceived*window.innerWidth) + 'px';
          dataReceived.pizzas.forEach(
            (pizzaFromServer, index) => {
              this.pizzas.push(new Pizza(pizzaFromServer, (index === 0)));
            }
          );
          this.pizzas.forEach(this.createPizzaTag.bind(this));
          this.updateDetails();
        }
      });
  }

  createPizzaTag(pizzaInstance) {
    const pizzaTag = document.createElement('div');

    pizzaTag.className = pizzaInstance.className;
    pizzaTag.style.width = pizzaInstance.width;
    pizzaTag.innerHTML = pizzaInstance.html;

    this.slidesTag.appendChild(pizzaTag);
    this.configureNavigation(pizzaTag, pizzaInstance);
  }

  configureNavigation(pizzaTag, pizzaInstance) {
    const isFirstPizza = pizzaInstance.id === this.pizzas[0].id;
    const isLastPizza = pizzaInstance.id === this.pizzas[this.pizzas.length-1].id;
    const btPrevTag = pizzaTag.querySelector('.prev');
    const btNextTag = pizzaTag.querySelector('.next');

    if (!isFirstPizza) {
      btPrevTag.addEventListener('click', () => {
        const slidesTagLeft = parseInt(this.slidesTag.style.left) || 0;
        const offsetLeft = slidesTagLeft + window.innerWidth;
        this.slidesTag.style.left = offsetLeft + 'px';
      });
    }
    else {
      btPrevTag.style.display = 'none';
    }

    if (!isLastPizza) {
      btNextTag.addEventListener('click', () => {
        const slidesTagLeft = parseInt(this.slidesTag.style.left) || 0;
        const offsetLeft = slidesTagLeft - window.innerWidth;
        this.slidesTag.style.left = offsetLeft + 'px';
      });
    }
    else {
      btNextTag.style.display = 'none';
    }
  }

  updateDetails() {
    const displayedPizza = this.pizzas.find(p => p.state.displayed);
    this.detailsTag.querySelector('h2').innerText = displayedPizza.name;
    const infos = this.detailsTag.querySelectorAll('span');
    infos[0].innerText = displayedPizza.category;
    infos[1].innerText = displayedPizza.ingredients.join(', ');
    infos[2].innerText = displayedPizza.price.toFixed(2);
  }
}
