import useAppStore from './modules/app'
//import useAuthStore from './modules/auth'

const useStore = () => ({
	appStore:useAppStore(),
	//authStore:useAuthStore(),
})

export default useStore