import {RouteRecordRaw} from 'vue-router';

/**
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      isLink：        是否超链接菜单，开启外链条件，`1、isLink:true 2、链接地址不为空`
 *      isHide：        是否隐藏此路由
 *      isKeepAlive：   是否缓存组件状态
 *      isAffix：       是否固定在 tagsView 栏上
 *      isIframe：      是否内嵌窗口，，开启条件，`1、isIframe:true 2、链接地址不为空`
 *      roles：         当前路由权限标识，取角色管理。控制路由显示、隐藏。超级管理员：admin 普通角色：common
 *      icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加 `fa xxx`
 * }
 */

/**
 * 定义静态路由
 * @description 前端控制直接改 dynamicRoutes 中的路由，后端控制不需要修改，请求接口路由数据时，会覆盖 dynamicRoutes 第一个顶级 children 的内容（全屏，不包含 layout 中的路由出口）
 * @returns 返回路由菜单数据
 */
export const staticRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('/@/layout/index.vue'),
        redirect: '/home',
        meta: {
            title: '首页',
        },
        children: [
            {
                path: '/home',
                name: '/home',
                component: () => import('/@/views/site/index.vue'),
                meta: {
                    title: 'Home',
                    link: '',
                    target: 'comp',
                    isHide: false,
                    isKeepAlive: true,
                    isAffix: true,
                    icon: 'iconfont icon-qianbao',
                },
            },
            {
                path: '/explore',
                name: '/explore',
                component: () => import('/@/views/site/index.vue'),
                meta: {
                    title: 'Explore',
                    link: '',
                    target: 'comp',
                    isHide: false,
                    isKeepAlive: true,
                    isAffix: true,
                    icon: 'iconfont icon-qianbao',
                },
                children: [
                    {
                        path: '/explore1',
                        name: '/explore1',
                        component: () => import('/@/views/site/index.vue'),
                        meta: {
                            title: 'Explore1',
                            link: '',
                            target: 'comp',
                            isHide: false,
                            isKeepAlive: true,
                            isAffix: true,
                            icon: 'iconfont icon-qianbao',
                        }
                    },
                    {
                        path: '/explore2',
                        name: '/explore2',
                        component: () => import('/@/views/site/index.vue'),
                        meta: {
                            title: 'Explore2',
                            link: '',
                            target: 'comp',
                            isHide: false,
                            isKeepAlive: true,
                            isAffix: true,
                            icon: 'iconfont icon-qianbao',
                        }
                    }
                ]
            },
        ]
    },

    {
        path: '/404',
        name: 'notFound',
        component: () => import('/@/views/error/404.vue'),
        meta: {
            title: '页面不存在',
        },
    },

];