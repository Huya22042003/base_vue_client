import {SCREEN} from './screen';

const getView = (path: any) => {
  return () => import(`@/views/${path}.vue`);
};

export const routes = [
    
  {
    path: SCREEN.notFound.path,
    name: SCREEN.notFound.name,
    meta: {title: 'Not Found'},
    component: getView('NotFound'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: SCREEN.notFound.path,
    component: getView('NotFound'),
  },
  {
    /** 접근권한 없음 */
    path: SCREEN.unauthorized.path,
    name: SCREEN.unauthorized.name,
    component: () => import("@/views/UnauthorizedPage.vue"),
    meta: {
      title: "계원예술대학교",
      auth: false,
    },
  },
];
