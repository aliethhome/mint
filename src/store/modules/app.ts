import { defineStore } from "pinia";
import {staticRoutes} from '/@/router/route';
/**
 * 应用级数据
 */
export interface AppState {
    layout: AppLayout,
    config:{},
    menuList:[]
}

export interface AppLayout {
        name:string,
        isMobile:boolean,
        isFullScreen:boolean,
        isDark:boolean,
        breadcrumb:{
            isShow:boolean,
            isShowIcon:boolean,
            isCollapse:boolean,

        },
        parentView:{
            animation:string,
        },
        menu:{
            isShow:boolean,
            isShowIcon:boolean,
            isCollapse:boolean,
        }
}

const useAppStore = defineStore({
    id: "app",
    state: (): AppState => ({
        layout: {
            name:'columns',
            isMobile:false,
            isFullScreen:false,
            isDark:false,
            breadcrumb:{
                isShow:true,
                isCollapse:false,
                isShowIcon:false,
            },
            parentView:{
                animation:"slide-right",
            },
            menu:{
                isShow:true,
                isShowIcon:true,
                isCollapse:true,
            }
        },
        config:{},
        menuList:staticRoutes[0]['children'],
    }),
    getters:{

    },
    actions: {
        // 加载数据字典

    }
})

export default useAppStore;