export default class App {
  constructor() {
    this.contentPage = "";
  }
  
  async goTo(view) {
    await fetch('/src/views/header.html')
      .then(res => res.text())
      .then(data => {
        this.contentPage += data;
      });

    await fetch(`/src/views/${view}.html`)
      .then(res => res.text())
      .then(data => {
        this.contentPage += data;
      });
    
    await fetch('/src/views/footer.html')
      .then(res => res.text())
      .then(data => {
        this.contentPage += data;
      });

    document.body.innerHTML += this.contentPage;
    this.contentPage = "";
  }
}
