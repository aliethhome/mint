<template>
    <div class="layout-menu">
        <el-menu
            router
            :default-active="$route.path"
            :collapse="layout.isMobile"
            :ellipsis="layout.isMobile"
            :unique-opened="true"
            mode="horizontal"
            :collapse-transition="false"
        >
            <template v-for="(menu,index) in store.appStore.menuList">
                <!-- 无子菜单 -->
                <el-menu-item v-if="!hasChildren(menu)" :index="menu.path" :key="menu.path">
                    <i :class="menu.meta.icon" v-if="collapse"/>
                    <span v-if="menu.meta.target!='link'">{{ menu.meta.title }}</span>
                    <a :href="menu.meta.link" target="_blank" rel="opener" class="w100" v-else>{{ menu.meta.title }}</a>
                </el-menu-item>
                <!-- 有子菜单 -->
                <el-sub-menu v-else :index="menu.path" :popper-offset="12" popper-class="popper-dark">
                    <template #title>
                        <i :class="menu.meta.icon" v-if="collapse"/>
                        <span>{{ menu.meta.title }}</span>
                    </template>
                    <NavMenu :menus="menu.children"></NavMenu>
                </el-sub-menu>
            </template>
        </el-menu>
    </div>
</template>

<script lang="ts" setup name="LayoutSide">
import {computed, getCurrentInstance, inject, onMounted, reactive, toRefs} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import NavMenu from './NavMenu.vue';
import {AppLayout} from '/@/store/modules/app';

const {proxy} = <any>getCurrentInstance();
const store = proxy.$store;
const route = useRoute();
const router = useRouter();
const state = reactive({
    collapse: false,
    menuList: [],
})
const {menuList, collapse} = toRefs(state);
// 布局
const layout = inject<AppLayout>('layout');


// ================================== 计算方法 =====================================
/** 是否有孩子节点 */
const hasChildren = computed(() => {
    return (item: any) => item.children && !item.children.every(item => item.meta.hidden);
})

// ================================== 方法定义 =====================================
const initMenuList = () => {
    state.menuList = store.appStore.menuList;
}

// 页面加载时
onMounted(() => {
    initMenuList();
});

</script>

<style scoped lang="scss">
.layout-menu{
    :deep(.el-menu) {
        &.el-menu--horizontal{
            border-bottom:none;
        }

        .el-sub-menu, el-menu-item {
            font-weight: 700;

        }
        .el-sub-menu .el-sub-menu__title, .el-menu-item {
            i,
            span {
                font-weight: 700;
                font-size: 18px;
            }
        }
    }
}

.layout-sidebar {
    width: 200px;
    transition: width 0.5s;
    height: 100%;
    background: var(--next-color-dark);
    padding-top: 0;

    &.is-collapse {
        width: 80px;
        padding-top: 5px;
    }

    .sidebar-scrollbar {
        width: 100%;
        display: flex;
        overflow-x: hidden;
        overflow-y: auto;

        .sidebar-menu {
            position: relative;
            box-sizing: border-box;
            padding: 0 0;

            overflow-x: hidden;

            :deep(.el-menu) {
                width: 200px;
                background: var(--next-color-dark);
                border-right: none;
                background: var(--next-color-dark);

                .el-sub-menu, el-menu-item {
                    height: auto;
                    line-height: 12px;
                    padding: 0 !important;
                    margin: 0 0 5px 0;
                    border-radius: 4px;

                }

                .el-menu-item {
                    height: 50px;
                    line-height: 50px;
                }

                .el-menu-item.is-active,
                .el-sub-menu.is-active .el-sub-menu__title {
                    i,
                    span {
                        color: var(--el-color-primary);
                    }

                    background-color: var(--next-color-dark-1);
                    border-right: 4px solid var(--el-color-primary);
                }

                .el-sub-menu.is-active .el-sub-menu__title {
                    background-color: var(--next-color-dark-9);
                    border-right: none;
                }

                .el-sub-menu .el-sub-menu__title, .el-menu-item {
                    height: 50px;
                    line-height: 18px;
                    color: var(--next-color-dark-text);
                }

                .el-sub-menu .el-sub-menu__title:hover, .el-menu-item:hover {
                    background: var(--next-color-dark-1);
                }

                .el-sub-menu .el-sub-menu__title i, .el-menu-item i {
                    margin-right: 5px;
                }

                .el-sub-menu > .el-sub-menu__title span, .el-menu-item span, .el-menu-item a {
                    font-size: 13px;
                    line-height: 22px;
                    text-align: center;
                    text-decoration: none;
                    color: var(--next-color-dark-text);
                }

                &.el-menu--collapse {
                    width: 80px;
                    padding: 0 8px;

                    .el-sub-menu, .el-menu-item {
                        height: auto;
                        line-height: 1;
                        padding: 0 !important;
                        margin: 0 0 5px 0;
                        border-radius: 4px;
                        transition: all .2s;
                    }

                    .el-sub-menu.is-active, .el-menu-item.is-active {

                    }

                    .el-menu-item.is-active,
                    .el-sub-menu.is-active .el-sub-menu__title {
                        i,
                        span {
                            color: var(--el-color-white) !important;
                        }

                        background: var(--el-color-primary) !important;
                        border-right: none !important;
                    }

                    .el-sub-menu .el-sub-menu__title, .el-menu-item {
                        flex-direction: column;
                        justify-content: center;
                        height: 55px !important;
                        padding: 0 !important;
                        color: var(--next-color-dark-text);
                        border-radius: 3px;
                    }

                    .el-sub-menu .el-sub-menu__title:hover, .el-menu-item:hover {
                        background: var(--next-color-dark-1);
                    }

                    .el-sub-menu .el-sub-menu__title i, .el-menu-item i {
                        margin-right: 0;
                    }

                    .el-sub-menu > .el-sub-menu__title span, .el-menu-item span, .el-menu-item a {
                        font-size: 12px !important;
                        line-height: 22px;
                        text-align: center;
                        text-decoration: none;
                        color: var(--next-color-dark-text);
                    }

                    .el-sub-menu > .el-sub-menu__title > .el-sub-menu__icon-arrow, .el-menu-item > .el-sub-menu__icon-arrow {
                        display: none;
                    }

                    .el-sub-menu > .el-sub-menu__title > span, .el-menu-item span {
                        height: 22px;
                        width: 60px;
                        visibility: visible;
                    }

                    .el-sub-menu a, .el-menu-item a {
                        height: 22px;
                        width: 60px;
                        visibility: visible;
                    }
                }
            }
        }
    }

}

:deep(.el-menu--vertical.popper-dark .el-menu) {
    background: #1a1a1a;
}

:deep(.el-menu--vertical .el-menu) {
    background: #1a1a1a;
}


</style>
