export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-home',
    },
    {
      name: 'Accounts',
      url: '/accounts',
      icon: 'fa fa-address-book-o',
    },
    {
      name: 'Transactions',
      url: '/transactions',
      icon: 'fa fa-rupee',
    },
    {
      name: 'Expenses',
      url: '/expenses',
      icon: 'icon-speedometer',
    },
    {
      name: 'Products',
      url: '/products',
      icon: 'fa fa-shopping-bag',
    },
    {
      name: 'Reports',
      url: '/reports',
      icon: 'fa fa-shopping-bag',
    },
    {
      title: true,
      name: 'Admin',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''          // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Company',
      url: '/company',
      icon: 'cui-settings',
    },
    {
      name: 'User',
      url: '/user',
      icon: 'icon-people',
    },
    {
      name: 'Subscription',
      url: '/company/description',
      icon: 'cui-credit-card',
    }
  ],
};
