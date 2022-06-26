<template>
	<div class="h100">
		<router-view v-slot="{ Component }">
            <component :is="Component"  class="w100" :style="{ minHeight }" />
		</router-view>
	</div>
</template>

<script lang="ts">
import {computed, defineComponent, toRefs, reactive, getCurrentInstance, onBeforeMount, onUnmounted, nextTick, watch, onMounted} from 'vue';
import { useRoute } from 'vue-router';

// 定义接口来定义对象的类型
interface ParentViewState {
	refreshRouterViewKey: null | string;
	keepAliveNameList: string[];
}

export default defineComponent({
	name: 'layoutParentView',
	props: {
		minHeight: {
			type: String,
			default: '',
		},
	},
	setup() {
		const { proxy } = <any>getCurrentInstance();
		const route = useRoute();
		onMounted(()=>{

		})

		return {

		};
	},
});
</script>
