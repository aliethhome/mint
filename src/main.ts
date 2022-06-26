import { createApp,Directive } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/display.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './theme/index.scss';
import './assets/iconfont/iconfont.css';
import VueGridLayout from 'vue-grid-layout';
import setupRouter from '/@/router/setup';
import setupStore from '/@/store/setup';
import tools from './utils/tools';

const app = createApp(App);
setupStore(app);
setupRouter(app);
tools.elSvg(app);

app.use(ElementPlus, {size:'default'})
    .use(VueGridLayout)
    .mount('#app');

app.config.globalProperties.$tools = tools;