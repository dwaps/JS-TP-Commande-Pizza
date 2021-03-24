export default class Pizza {
  constructor(id, name, category, ingredients, price) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.ingredients = ingredients;
    this.price = price;
    this.className = 'pizza';
    this.width = window.innerWidth + 'px';
    this.html = `
      <h1>${this.name}</h1>
      <div class="controls">
        <div class="prev"></div>
        <div class="next"></div>
      </div>
    `;
    this.state = { displayed: false };
  }
}
