const cmmnRoute = [
  {
    path: "/publishing",
    component: () => import('@/layouts/DefaultLayout.vue'),
    meta: {
      title: "계원예술대학교",
    },
    children: [
      /** UI 가이드 */
      {
        path: "",
        component: () => import("@/views/guide/AdminGuideIndex.vue"),
      },
      /** 메인화면 */
      {
        path: "/main",
        component: () => import("@/views/main/AdminDashBoardIndex.vue"),
      },
      /** 서브페이지 */
      /** 교육과정개발 관리  교과목 도출 */
      {
        path: "/sbjSelect",
        component: () => import("@/views/EduCurriDev/SbjSelect.vue"),
      },
      /** 교수사이트 대시보드 */
      {
        path: "/staffDashBoard",
        component: () => import("@/views/StaffDashBoardIndex.vue"),
      },
    ],
  },
];

export default cmmnRoute;
