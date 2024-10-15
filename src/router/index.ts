import {createRouter, createWebHistory} from 'vue-router'
import {routes} from '@/router/routes'
import routesPub from '@/router/routesPub'
import commonService from "@/service/common/CommonService";
import {SCREEN} from "@/router/screen";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes, ...routesPub],
  scrollBehavior(to, from, savedPosition) {
    return {top: 0, behavior: 'smooth',}
  }
})

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({...context, next: nextMiddleware});
  };
}

router.beforeEach((to, from, next) => {
  const metaTitle = to.meta.title as string;
  document.title = metaTitle || "영산대학교";


  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];
    const context = {from, next, router, to};
    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({...context, next: nextMiddleware});
  }

  const arrScreenName = [SCREEN.login.name, SCREEN.home.name, SCREEN.notFound.name, SCREEN.internalError.name, SCREEN.unauthorized.name];

  if (to.name && !arrScreenName.includes(to.name)) {
    saveNavigationHistory(to, from);
  }
  return next();
});

function saveNavigationHistory(to, from) {
  commonService
    .history(to.name)
    .then((response: any) => {
    })
    .catch((e: any) => {
      console.error(e);
    })
    .finally(() => {
    });
}

export default router

