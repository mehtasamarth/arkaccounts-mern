import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Company = React.lazy(() => import('./views/Company'));
const User = React.lazy(() => import('./views/User'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const ManageUser = React.lazy(() => import('./views/User/ManageUser'));
const Products = React.lazy(() => import('./views/Products'));
const Accounts = React.lazy(() => import('./views/Accounts'));
const Transactions = React.lazy(() => import('./views/Transactions'));
const ManageAccounts = React.lazy(() => import('./views/Accounts/ManageAccounts'));
const ManageProduct = React.lazy(() => import('./views/Products/ManageProducts'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  // { path: '/', name: 'DefaultLayout', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/404', name: 'Page 404', component: Page404 },
  { path: '/company', name: 'Company', component: Company },
  { path: '/user', name: 'User', component: User, exact:true },
  { path: '/user/manage', name: 'Manage User', component: ManageUser, exact:true },
  { path: '/products', name: 'Products', component: Products, exact:true },
  { path: '/accounts', name: 'Accounts', component: Accounts, exact:true },
  { path: '/transactions', name: 'Transactions', component: Transactions, exact:true },
  { path: '/products/manage', name: 'Manage Product', component: ManageProduct, exact:true },
  { path: '/accounts/manage', name: 'Manage Account', component: ManageAccounts, exact:true },

];

export default routes;
