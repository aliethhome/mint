import { createRouter, createWebHashHistory,createWebHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import {staticRoutes} from "/@/router/route"
import { NextLoading } from '/@/utils/loading';

/**
 * 创建一个可以被 Vue 应用程序使用的路由实例
 * @method createRouter(options: RouterOptions): Router
 * @link 参考：https://next.router.vuejs.org/zh/api/#createrouter
 */
const initRoutes  = staticRoutes;
const router = createRouter({
	history: createWebHistory(),
	routes: initRoutes as RouteRecordRaw[],
	// 刷新时，滚动条位置还原
	scrollBehavior: () => ({ left: 0, top: 0 })
})

/**
 * 定义404界面
 * @link 参考：https://next.router.vuejs.org/zh/guide/essentials/history-mode.html#netlify
 */
const pathMatch = {
	path: '/:path(.*)*',
	redirect: '/404',
	meta:{}
};

// 免登录白名单
const whiteList = ['/login','/index','/home'];
NProgress.configure({ showSpinner: false });
// 路由加载前
router.beforeEach(async (to, from, next) => {
	if (to.meta.title) NProgress.start();
	// 未登录状态
	console.log('未登录状态',to.path);
	if (whiteList.indexOf(to.path) !== -1) {
		// 在免登录白名单，直接进入
		console.log('进入白名单');
		next()
	} else {
		console.log('首页');
		next('/');
		NProgress.done()
	}
});

// 路由加载后
router.afterEach(() => {
	NProgress.done();
	NextLoading.done();
});

// 导出路由
export default router;
