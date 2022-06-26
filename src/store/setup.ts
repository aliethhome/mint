import type { App } from 'vue'
import {createPinia} from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import useStore from './index';

const pinia = createPinia();
pinia.use(piniaPersist);
const setupStore = (app: App<Element>) => {
	// 持久化store
	app.use(pinia);
	const store = useStore();
	app.config.globalProperties.$store = store;
}


export default setupStore;