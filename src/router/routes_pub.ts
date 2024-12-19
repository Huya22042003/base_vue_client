import {SCREEN} from './screen';

const getView = (path: any) => {
  return () => import(`@/views/${path}.vue`);
};

export const routes_pub = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    meta: {
      title: "계원예술대학교",
    },
    children: [
      {
        path: '',
        name: 'home',
        meta: {title: 'TemplateUi'},
        component: () => import('@/views/publish/HomePublish.vue'),
      },
      {
        path: '/search',
        name: 'search',
        meta: {title: 'TemplateUi'},
        component: () => import('@/views/publish/SearchBlogPublish.vue'),
      },
      {
        path: '/menu-detail',
        name: 'menu-detail',
        meta: {title: 'TemplateUi'},
        component: () => import('@/views/article/MenuDetail.vue'),
      },
      {
        path: '/article-detail',
        name: 'article-detail',
        meta: {title: 'TemplateUi'},
        component: () => import('@/views/article/ArticleDetail.vue'),
      },
      {
        path: '/profile-user',
        name: 'profile-user',
        meta: {title: 'TemplateUi'},
        component: () => import('@/views/profileUser/ProfileUser.vue'),
      },
      {
        path: '/bill',
        name: 'bill',
        meta: {title: 'TemplateUi'},
        component: () => import('@/views/billMng/BillClient.vue'),
      },
      {
        path: '/portfolio',
        name: 'portfolio',
        component: () => import('@/views/portfolio/Portfolio.vue'),
      }
    ],
  },
];
