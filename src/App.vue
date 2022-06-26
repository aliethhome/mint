<template>
    <el-config-provider>
        <router-view></router-view>
    </el-config-provider>
</template>

<script lang="ts" setup name="app">
import { ref, onBeforeMount, watch } from 'vue';

// 设置初始化，防止刷新时恢复默认
onBeforeMount(() => {

});

</script>
