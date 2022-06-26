import axios from 'axios';
import {ElMessage, ElMessageBox} from 'element-plus';
import {Session} from '/@/utils/storage';
import useStore from '/@/store'

// 配置新建一个 axios 实例
const service = axios.create({
	baseURL: import.meta.env.VITE_API_URL as any,
	timeout: 50000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// 添加请求拦截器
service.interceptors.request.use(
	(config) => {
		const {authStore} = useStore();
		// 在发送请求之前做些什么 token
		if (authStore.token) {
			(<any>config.headers).common['Authorization'] = `Bearer ${authStore.token}`;
			(<any>config.headers).common['Auth-Site'] = `${authStore.site.id}`;
		}
		return config;
	},
	(error) => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	(response) => {
		const res = response.data;
		if(response.status == 200) {
			return response.data
		}else{
			switch (response.status) {
				case 400:
					ElMessageBox.alert(res.msg||'未知错误', '提示', {});
					return Promise.reject(res);
				case 40101:
				case 401:
					Session.clear();
					window.location.href = '/'; // 去登录页
					ElMessageBox.alert(res.msg||'请重新登录', '提示', {}).then(() => {}).catch(() => {});
					return Promise.reject(service.interceptors.response);
				case 403:
					ElMessageBox.alert('权限不足', '提示', {}).then(() => {}).catch(() => {});
					return Promise.reject(service.interceptors.response);
			}
		}
	},
	(error) => {
		// 对响应错误做点什么
		console.log('error',error);
		if (error.message.indexOf('timeout') != -1) {
			ElMessage.error('网络超时');
		} else if (error.message == 'Network Error') {
			ElMessage.error('网络连接错误');
		} else {
			if (error.response.data) ElMessage.error(error.response.data.msg || error.response.statusText);
			else ElMessage.error('接口路径找不到');
		}
		return Promise.reject(error);
	}
);

// 导出 axios 实例
export default service;
