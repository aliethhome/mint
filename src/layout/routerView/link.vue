<template>
	<div class="layout-view-bg-white flex layout-view-link" :style="{ height: `calc(100vh - ${setLinkHeight}` }">
		<a :href="currentRouteMeta.link" target="_blank" rel="opener" class="flex-margin">
			{{ $t(currentRouteMeta.title) }}：{{ currentRouteMeta.link }}
		</a>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed, watch } from 'vue';
import { useRoute, RouteMeta } from 'vue-router';
import useStore from '/@/store/index';

// 定义接口来定义对象的类型
interface LinkViewState {
	currentRouteMeta: {
		link: string;
		title: string;
	};
}
interface LinkViewRouteMeta extends RouteMeta {
	link: string;
	title: string;
}

export default defineComponent({
	name: 'layoutLinkView',
	setup() {
		const route = useRoute();
		const store = useStore();
		const state = reactive<LinkViewState>({
			currentRouteMeta: {
				link: '',
				title: '',
			},
		});
		// 设置 link 的高度
		const setLinkHeight = computed(() => {
			let { isTagsview } = store.settingStore.themeConfig;
			if (isTagsview) return `114px`;
			else return `80px`;
		});
		// 监听路由的变化，设置内容
		watch(
			() => route.path,
			() => {
				state.currentRouteMeta = <LinkViewRouteMeta>route.meta;
			},
			{
				immediate: true,
			}
		);
		return {
			setLinkHeight,
			...toRefs(state),
		};
	},
});
</script>
