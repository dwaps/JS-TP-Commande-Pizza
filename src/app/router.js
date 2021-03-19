export default class Router {
  static run(app) {
    if (location.hash) {
      switch (location.hash.substr('1')) {
        case 'home':
          app.goTo('home');
          break;
        case 'admin':
          app.goTo('admin');
          break;
        case 'order-pizza':
          app.goTo('order-pizza');
          break;
      }
    }
    else {
      app.goTo('home');
    }
  }
}
