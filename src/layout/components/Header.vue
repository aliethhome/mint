<template>
    <el-header class="layout-header">
        <!-- 头部logo -->
        <div class="layout-header-wrap">
            <div class="layout-header-logo" >
                <img class="layout-header-logo__img"  src="/logo.png"  />
                <div class="layout-header-logo__title">OpenMint1</div>
            </div>
            <!-- 头部导航 -->
            <div class="layout-header-nav">
                <Menu/>
            </div>
            <!-- 头部用户 -->
            <div class="layout-header-user">
                <HeaderUser/>
            </div>
        </div>
    </el-header>
</template>

<script lang="ts" setup name="LayoutHeader">
import HeaderUser from './HeaderUser.vue';
import Menu from './Menu.vue';
</script>

<style lang="scss" scoped>
.layout-header-wrap{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 65px;
    padding:0 30px;
    box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
}
.layout-header-logo{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    &__img{
        width:50px;
        height:50px;
    }
    &__title{
        margin-left:10px;
        font-size:20px;
        font-width: 700;
    }
}

.layout-header-nav{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex:1;
}
.layout-header-user{
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.layout-header-bar{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex:1;


}
</style>