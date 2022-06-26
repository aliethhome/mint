<template>
	<div class="nav-menu">
		<template v-for="menu in menus" v-bind:key="menu">
			<template v-if="!menu.meta.isHide">
				<el-menu-item v-if="!hasChildren(menu)" :index="menu.path">
					<a v-if="menu.meta&&menu.meta.type=='link'" :href="menu.path" target="_blank" @click.stop='()=>{}'></a>
                    <i :class="menu.meta.icon"/>
					<template #title>
						<span>{{menu.meta.title}}</span>
					</template>
				</el-menu-item>
				<el-sub-menu v-else :index="menu.path">
					<template #title>
						<i :class="menu.meta.icon"/>
						<span>{{menu.meta.title}}</span>
					</template>
					<NavMenu :menus="menu.children"></NavMenu>
				</el-sub-menu>
			</template>
		</template>
	</div>
</template>

<script lang="ts" setup name="NavMenu">
import {computed} from 'vue'

// ================================== 数据定义 =====================================
const props = defineProps({
	menus: {
		type: Array,
	},
});

// ================================== 方法定义 =====================================
/** 计算方法：是否有孩子节点 */
const hasChildren = computed(()=>{
	return (item:any) => item.children && !item.children.every(item => item.meta.hidden);
})

// ================================== 初始化块 =====================================
// ================================== 外部调用 =====================================
</script>
<style lang="scss" scoped>


</style>