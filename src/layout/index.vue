<template>
    <el-container class="layout-container flex-center">
        <Header/>
        <el-container class="layout-main-height-50">
            <el-aside width="200px" v-if="false">Aside</el-aside>
            <el-main class="layout-main">
                <el-scrollbar
                    class="layout-scrollbar"
                    ref="layoutScrollbarRef"
                    :always="true"
                >
                    <LayoutParentView />
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>


<script lang="ts" setup name="Layout">
import {computed, onBeforeMount, onUnmounted, getCurrentInstance, provide, reactive} from 'vue';
import LayoutParentView from './routerView/parent.vue';
import Header from './components/Header.vue';

const { proxy } = <any>getCurrentInstance();
const store = proxy.$store;
const state = reactive({
    layout:store.appStore.layout,
})
provide('layout',state.layout);
// ================================== 计算属性 =====================================

// ================================== 方法定义 =====================================
/** 页面尺寸变化 */
const onLayoutResize = () => {
    const clientWidth = document.body.clientWidth;

    if (clientWidth < 700 || proxy.$tools.isMobile()) {
        proxy.$store.appStore.layout.isMobile = true;
    } else {
        proxy.$store.appStore.layout.isMobile = false;
    }
};

// ================================== 系统方法 =====================================
// 页面加载前
onBeforeMount(() => {
    onLayoutResize();
    window.addEventListener('resize', onLayoutResize);
});

// 页面卸载时
onUnmounted(() => {
    window.removeEventListener('resize', onLayoutResize);
});

</script>
