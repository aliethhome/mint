<template>
    <div class="layout-headeruser">
        <el-dropdown :show-timeout="70" :hide-timeout="50" @command="onHandleCommandClick">
			<span class="layout-headeruser-link">
                <i class="iconfont icon-yonghu"></i>
			</span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="/home">My Wallet</el-dropdown-item>
                    <el-dropdown-item command="/personal">Profile</el-dropdown-item>
                    <el-dropdown-item command="/personal">
                        <span style="width:80px;">Dark</span>
                        <el-switch
                        v-model="store.appStore.layout.isDark"
                        inline-prompt
                        active-text="Y"
                        inactive-text="N"
                        @change="doChangeDark"
                    /></el-dropdown-item>
                    <el-dropdown-item divided command="logOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <div class="layout-headeruser-link" @click="doOpenAccount">
            <i class="iconfont icon-qianbao el-icon--right"></i>
        </div>
    </div>
    <el-drawer v-model="accountShow" direction="rtl">
        <template #header>
            <h1><i class="iconfont icon-qianbao mr10" style="font-weight: 700;font-size:20px;"></i>My Wallet</h1>
        </template>
        <template #default>
            <h3>Connect with one of our available wallet providers or create a new one.</h3>
            <div class="wallet-list" @click="doConnectAccount">
                <div class="wallet-item">
                    <h3>MetaMask<div style="font-size:11px;color:var(--el-color-info)">{{account}}</div></h3>
                    <el-button type="primary" round v-if="!account">Popular</el-button>
                    <div v-else style="font-size:18px;color:var(--el-color-primary)">{{balance}} ETH</div>
                </div>

                <div class="wallet-item">
                    <h3>CoinBase Wallet</h3>
                    <el-button type="warning" round>Scan</el-button>
                </div>

                <div class="wallet-item">
                    <h3>WalletConnect</h3>
                    <el-button type="warning" round>Scan</el-button>
                </div>

                <div class="wallet-item">
                    <h3>Phanpom</h3>
                    <el-button type="info" round>Solana</el-button>
                </div>
                <div class="wallet-item" style="border-bottom: none">
                    <h3>Glow</h3>
                    <el-button type="info" round>Solana</el-button>
                </div>
            </div>


        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button type="primary" >Logout</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script lang="ts" setup name="LayoutHeaderUser">
import {ref, getCurrentInstance, computed, reactive, toRefs, onMounted, defineComponent} from 'vue';
import {useRouter} from 'vue-router';
import {ElMessageBox, ElMessage} from 'element-plus';


const {proxy} = <any>getCurrentInstance();
const router = useRouter();
const store = proxy.$store;
// 布局配置 icon 点击时
const state = reactive({
    accountShow: false,
    account:'',
    balance:0
})
const {accountShow,account,balance} = toRefs(state);
// 下拉菜单点击时
const onHandleCommandClick = (path: string) => {

};

const doOpenAccount = () => {
    state.accountShow = !state.accountShow;
}

const doChangeDark = (e) =>{
    if(e){
        toggleClass(document.getElementById('htmlId'), 'dark');
    }else{
        toggleClass(document.getElementById('htmlId'), '');
    }

}

const toggleClass = (element, className) => {
    if (!element || !className) {
        return
    }
    let classString = element.className
    const nameIndex = classString.indexOf(className)
    if (nameIndex === -1) {
        classString += '' + className
    } else {
        classString =
            classString.substr(0, nameIndex) +
            classString.substr(nameIndex + className.length)
    }
    element.className = classString
}

// 切换站点
const doConnectAccount = async () => {
    if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        const balance = await window.ethereum.request({method: 'eth_getBalance',params:[accounts[0], "latest"]});
        state.account = accounts[0];
        state.balance = parseInt(balance,16);
        console.log('balance===', parseInt(balance,16));
    } else {
        proxy.$message.error('Please intall MetaMask');
    }

};

// 页面加载时
onMounted(() => {

});
</script>

<style scoped lang="scss">
.layout-headeruser {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: var(--el-text-color-regular);
    font-size: 20px;

    .layout-headeruser-link {
        margin-left: 20px;

        .iconfont {
            font-size: 25px !important;
            font-weight: 700;
        }
    }

}

.layout-navbars-breadcrumb-user {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &-link {
        height: 100%;
        display: flex;
        align-items: center;
        white-space: nowrap;

        &-photo {
            width: 25px;
            height: 25px;
            border-radius: 100%;
        }
    }

    &-icon {
        padding: 0 10px;
        cursor: pointer;
        color: var(--next-bg-topBarColor);
        height: 50px;
        line-height: 50px;
        display: flex;
        align-items: center;

        &:hover {
            background: var(--next-color-user-hover);

            i {
                display: inline-block;
                animation: logoAnimation 0.3s ease-in-out;
            }
        }
    }

    ::v-deep(.el-dropdown) {
        color: var(--next-bg-topBarColor);
    }

    ::v-deep(.el-badge) {
        height: 40px;
        line-height: 40px;
        display: flex;
        align-items: center;
    }

    ::v-deep(.el-badge__content.is-fixed) {
        top: 12px;
    }
}

.wallet-list {
    border: 1px solid var(--el-border-color);
    margin-top: 20px;
    border-radius: 5px;

    .wallet-item {

        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        border-bottom: 1px solid var(--el-border-color);

    }
    .wallet-item:hover{
        background:var(--el-bg-color-overlay);
    }
}
</style>
