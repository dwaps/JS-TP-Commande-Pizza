export default class Router {
  static run() {
    switch (location.hash.substr('1')) {
      case 'home':
        console.log('Afficher la vue home.html');
        break;
      case 'admin':
        console.log('Afficher la vue admin.html');
        break;
      case 'order-pizza':
        console.log('Afficher la vue order-pizza.html');
        break;
      default:
        console.log('Afficher une page d\'erreur');
    }
  }
}
