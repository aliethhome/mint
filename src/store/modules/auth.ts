import {defineStore} from "pinia";
import {resetRouter} from "/@/router";
import {RouteRecordRaw} from 'vue-router'
import {ElMessage} from "element-plus";
import useTagsView from './tagsView'

// 账号授权
export interface AuthState {
	token: string,
	type:string,	// 授权类型
	profile: object,
	site: SiteState,
	cateList: object[],
	perms: string[],
	routes: RouteRecordRaw[],
	routesFlat: RouteRecordRaw[],
	routesKeepAlive: string[],
}

export interface SiteState {
	id: number;
	title: string;
	logo:string|null;
	[propName:string]:any
}

const useAuthStore = defineStore({
	id: "auth",
	state: (): AuthState => ({
		token: '',
		type:'client',
		profile: {nickname: '', avatar: '', login_time: 0, login_ip: '',role_type:'member'},
		site: {id:0,title:'选择站点',logo:'~//@/assets/logo.png'},
		cateList: [],
		perms: [],
		routes: [],
		routesFlat: [],
		routesKeepAlive: [],
	}),
	persist: {
		enabled: true,
		strategies:[{
			storage:localStorage,
			paths:['token','profile','type','site','cateList']
		}]
	},

	actions: {
		// 账号登录
		login(passport: any) {
			const {username, password, imgcode,type} = passport
			this.type = type;
			const passportApi:any = this.getPassportApi();
			return new Promise((resolve, reject) => {
				passportApi.login({
						username: username.trim(),
						password: password,
						imgcode: imgcode
					}
				).then(res => {
					this.token = res.data['token'];
					this.profile = res.data['profile'];
					this.site = res.data['site'];
					if(this.site.id>0){
						this.initCateList();
					}
					resolve(this.token)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 账号退出
		logout() {
			const passportApi:any = this.getPassportApi();
			return new Promise(((resolve, reject) => {
				passportApi.logout().then(() => {
					localStorage.clear();
					resetRouter();
					window.location.href = '/login';
					resolve(true)
				}).catch(error => {
					ElMessage.error('退出异常');
					reject(error);
				})
			}))
		},

		// 重置token
		resetToken() {
			return new Promise(resolve => {
				localStorage.clear();
				this.$reset();
				resolve(null)
			})
		},

		// 生成授权路由，及操作权限
		generateRoutes() {
			const passportApi:any = this.getPassportApi();
			return new Promise((resolve, reject) => {
				passportApi.permission().then((res: any) => {
					const {menus, buttons} = res.data;
					dynamicRoutes[0].children = dynamicRoutes[0].children?.concat(filterAsyncRoutes(menus));
					// 菜单路由
					this.routes = dynamicRoutes[0].children ||[];
					// 扁平路由（用于添加route.add）
					this.generateRoutesFlat(this.routes);
					this.perms = buttons;
					resolve(true);
				}).catch(error => {
					reject(error)
				})

			})
		},

		// 路由扁平化
		generateRoutesFlat(routes: RouteRecordRaw[]) {
			for (let i = 0; i < routes.length; i++) {
				if (routes[i].meta.isKeepAlive) {
					this.routesKeepAlive.push(routes[i].name);
				}
				if (routes[i].children && routes[i].children?.length > 0) {
					routes = routes.slice(0, i + 1).concat(routes[i].children, routes.slice(i + 1));
				}
			}
			this.routesFlat = routes;
		},

		// 登录site
		loginSite(site:object){
			const tagsViewStore = useTagsView();
			tagsViewStore.delAllViews();
			clientPassportApi.loginSite(site.id).then(res=>{
				this.site = site;
				this.initCateList();
			})
		},

		// 退出site
		logoutSite(){
			const tagsViewStore = useTagsView();
			tagsViewStore.delAllViews();
			this.site = {id:0,title:'选择站点',logo:'~//@/assets/logo.png'};
			this.cateList = [];
			clientPassportApi.loginSite(0);
		},

		// 是否登录站点
		isLoginSite(){
			return this.site && this.site.id>0;
		},

		// 设置授权站点的栏目列表
		initCateList() {
			return new Promise((resolve, reject) => {
				siteCateApi.options().then((res: any) => {
					// 如果未加载到数据，则直接返回
					if (!res!.data) {
						return;
					}
					this.cateList = res.data
					resolve(true);
				}).catch((err: any) => {
					reject(false);
				})
			});
		},
		getPassportApi(){
			switch(this.type){
				case 'client':
					return clientPassportApi;
				case 'sys':
					return sysPassportApi;
			}
			return null;
		}
	}
})

const viewModules = import.meta.glob('../../views/**/*.{vue,tsx}')
/**
 * 过滤动态路由组件
 * @param asyncRoutes
 * @returns {any}
 */
function filterAsyncRoutes(asyncRoutes: any) {
	return asyncRoutes.filter((route: any) => {
		// 处理 component 属性
		if (typeof route.component == 'string') {
			if (route.component == '') {
				route.component = () => import('/@/layout/index.vue');
			} else if (route.component.toLowerCase() == 'layout') {
				route.component = () => import('/@/layout/routerView/parent.vue');
			} else if (route.component.toLowerCase() == 'link') {
				route.component = () => import('/@/layout/routerView/link.vue');
			} else if (route.component.toLowerCase() == 'iframe') {
				route.component = () => import('/@/layout/routerView/iframes.vue');
			} else {
				route.component = viewModules[`../../views${route.component}.vue`] || viewModules[`../../views${route.component}.tsx`]
			}
		}
		// 判断是否是动态路由（xx/:id/:name），用于 tagsView 等中使用
		// 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
		if (route.path.indexOf('/:') > -1) {
			route.meta['isDynamic'] = true;
			route.meta['isDynamicPath'] = route.path;
		}

		// 递归过滤子路由
		if (route.children != null && route.children && route.children.length>0) {
			//请勿将第一个孩子节点设置为隐藏节点
			route.redirect = route.redirect ?? route.children[0].path;
			route.children = filterAsyncRoutes(route.children)
		} else {
			delete route['children']
		}
		return true
	})
}



const layouModules: any = import.meta.glob('../../layout/routerView/*.{vue,tsx}');
const viewsModules: any = import.meta.glob('../../views/**/*.{vue,tsx}');

/**
 * 获取目录下的 .vue、.tsx 全部文件
 * @method import.meta.glob
 * @link 参考：https://cn.vitejs.dev/guide/features.html#json

const dynamicViewsModules: Record<string, Function> = Object.assign({}, { ...layouModules }, { ...viewsModules });

export function backEndRouterConverter(routes: any, parentPath: string = "/") {
	if (!routes) return;
	return routes.map((item: any) => {
		if (!item.meta.roles || item.meta.roles.length === 0){
			delete item.meta.roles
		}

		if(item.component == ''){
			item.component = () => import('/@/layout/index.vue');
		}else if(item.component.toLowerCase() == 'layout'){
			item.component = () => import('/@/layout/routerView/parent.vue');
		}else if(item.component.toLowerCase() == 'link'){
			item.component = () => import('/@/layout/routerView/link.vue');
		}else if(item.component.toLowerCase() == 'iframe'){
			item.component = () => import('/@/layout/routerView/iframes.vue');
		}else{
			item.component = dynamicImport(dynamicViewsModules, item.component as string);
		}
		let path = item.path
		// 如果不是以 / 开头，则路径需要拼接父路径
		if (!path.startsWith("/")) {
			path = parentPath + "/" + path;
		}
		item.path = path
		if (!item.children || item.children.length === 0){
			delete item.children
		}else{
			item.redirect = item.children[0].path;
			backEndRouterConverter(item.children,item.path);
		}
		return item;
	});
}

/**
 * 后端路由 component 转换函数
 * @param dynamicViewsModules 获取目录下的 .vue、.tsx 全部文件
 * @param component 当前要处理项 component
 * @returns 返回处理成函数后的 component

export function dynamicImport(dynamicViewsModules: Record<string, Function>, component: string) {
	const keys = Object.keys(dynamicViewsModules);
	const matchKeys = keys.filter((key) => {
		const k = key.replace(/..\/..\/views|../, '');
		return k.startsWith(`${component}`) || k.startsWith(`/${component}`);
	});
	if (matchKeys?.length === 1) {
		const matchKey = matchKeys[0];
		return dynamicViewsModules[matchKey];
	}
	if (matchKeys?.length > 1) {
		return false;
	}
}

/**
 * 一维数组处理成多级嵌套数组（只保留二级：也就是二级以上全部处理成只有二级，keep-alive 支持二级缓存）
 * @description isKeepAlive 处理 `name` 值，进行缓存。顶级关闭，全部不缓存
 * @link 参考：https://v3.cn.vuejs.org/api/built-in-components.html#keep-alive
 * @param arr 处理后的一维路由菜单数组
 * @returns 返回将一维数组重新处理成 `定义动态路由（dynamicRoutes）` 的格式

export function formatTwoStageRoutes(arr: any) {
	if (arr.length <= 0) return false;
	const newArr: any = [];
	const cacheList: Array<string> = [];
	arr.forEach((v: any) => {
		if (v.path === '/') {
			newArr.push({ component: v.component, name: v.name, path: v.path, redirect: v.redirect, meta: v.meta, children: [] });
		} else {
			// 判断是否是动态路由（xx/:id/:name），用于 tagsView 等中使用
			// 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
			if (v.path.indexOf('/:') > -1) {
				v.meta['isDynamic'] = true;
				v.meta['isDynamicPath'] = v.path;
			}
			newArr[0].children.push({ ...v });
		}
	});
	return newArr;
}
**/
export default useAuthStore;