export default class Router {
  static run(app) {
    const routes = ['', 'home', 'order-pizza', 'admin'];
    const route = location.hash ? location.hash.substr('1') : 'home';
    const routeExists = routes.includes(route);

    if (routeExists) app.goTo(route);
    else {
      location.hash = 'home';
      app.goTo('home');
    }
    
    // if (location.hash) {
    //   switch (location.hash.substr('1')) {
    //     case 'home':
    //       app.goTo('home');
    //       break;
    //     case 'admin':
    //       app.goTo('admin');
    //       break;
    //     case 'order-pizza':
    //       app.goTo('order-pizza');
    //       break;
    //   }
    // }
    // else {
    //   app.goTo('home');
    // }
  }
}
