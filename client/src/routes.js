import React from 'react';
import DefaultLayout from './containers/DefaultLayout';
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Company = React.lazy(() => import('./views/Company'));
const User = React.lazy(() => import('./views/User'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const ManageUser = React.lazy(() => import('./views/User/ManageUser'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  // { path: '/', name: 'DefaultLayout', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/404', name: 'Page 404', component: Page404 },
  { path: '/company', name: 'Company', component: Company },
  { path: '/user', name: 'User', component: User, exact:true },
  { path: '/user/manage', name: 'Manage User', component: ManageUser, exact:true },

];

export default routes;
