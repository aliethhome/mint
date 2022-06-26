<template>
    <div class="project-container">
        <div>
            <el-radio-group v-model="type" size="large">
                <el-radio-button label="top">Top</el-radio-button>
                <el-radio-button label="trending">Trending</el-radio-button>
                <el-radio-button label="free">Free</el-radio-button>
                <el-radio-button label="latest">Latest</el-radio-button>
            </el-radio-group>

            <el-radio-group class="ml20" v-model="times" size="large">
                <el-radio-button label="3">3m</el-radio-button>
                <el-radio-button label="5">5m</el-radio-button>
                <el-radio-button label="10">10m</el-radio-button>
                <el-radio-button label="30">30m</el-radio-button>
            </el-radio-group>
        </div>

        <div class="project-wrap" v-if="tableData.data.length > 0">
            <div class="project-header"><span class="mr5 project-title">1.FIRE THE BOSS</span> • <span class="project-desc ml5">30 mints last hr • 4% minted</span></div>
            <el-row :gutter="10" class="project-content">
                <el-col :xs="6" :sm="6" :md="4" :lg="3" :xl="3" class="mb15" v-for="(v, k) in tableData.data" :key="k"
                        @click="onTableItemClick(v)">
                    <div class="project-item">
                        <div class="project-item-box">
                            <div class="item-img">
                                <img :src="v.img"/>
                            </div>
                            <div class="item-txt ">
                                <div class="item-txt-title">{{ v.title }}</div>
                                <div class="item-txt-owner hidden-sm-and-down">{{ v.owner }}</div>
                                <div class="item-txt-price ">
                                    <span class="item-txt-price__bold ">{{ v.price }} </span>
                                    <span class="hidden-sm-and-down ml5"> • {{ v.time }}m</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="project-wrap" v-if="tableData.data.length > 0">
            <div class="project-header"><span class="mr5 project-title">1.FIRE THE BOSS</span> • <span class="project-desc ml5">30 mints last hr • 4% minted</span></div>
            <el-row :gutter="10" class="project-content">
                <el-col :xs="6" :sm="6" :md="4" :lg="3" :xl="3" class="mb15" v-for="(v, k) in tableData.data" :key="k"
                        @click="onTableItemClick(v)">
                    <div class="project-item">
                        <div class="project-item-box">
                            <div class="item-img">
                                <img :src="v.img"/>
                            </div>
                            <div class="item-txt ">
                                <div class="item-txt-title">{{ v.title }}</div>
                                <div class="item-txt-owner hidden-sm-and-down">{{ v.owner }}</div>
                                <div class="item-txt-price ">
                                    <span class="item-txt-price__bold ">{{ v.price }} </span>
                                    <span class="hidden-sm-and-down ml5"> • {{ v.time }}m</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="project-wrap" v-if="tableData.data.length > 0">
            <div class="project-header"><span class="mr5 project-title">1.FIRE THE BOSS</span> • <span class="project-desc ml5">30 mints last hr • 4% minted</span></div>
            <el-row :gutter="10" class="project-content">
                <el-col :xs="6" :sm="6" :md="4" :lg="3" :xl="3" class="mb15" v-for="(v, k) in tableData.data" :key="k"
                        @click="onTableItemClick(v)">
                    <div class="project-item">
                        <div class="project-item-box">
                            <div class="item-img">
                                <img :src="v.img"/>
                            </div>
                            <div class="item-txt ">
                                <div class="item-txt-title">{{ v.title }}</div>
                                <div class="item-txt-owner hidden-sm-and-down">{{ v.owner }}</div>
                                <div class="item-txt-price ">
                                    <span class="item-txt-price__bold ">{{ v.price }} </span>
                                    <span class="hidden-sm-and-down ml5"> • {{ v.time }}m</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {toRefs, reactive, defineComponent, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {filterList} from './index_mock';
import useSdk from 'api';
import * as Web3 from 'web3'
import { OpenSeaSDK, Network } from 'opensea-js'

const state = reactive({
    type: 'top',
    times:'3',
    tableData: {
        data: filterList,
        total: 99,
        loading: false,
        param: {
            pageNum: 1,
            pageSize: 10,
        },
    },
})



const {type, tableData,times} = toRefs(state);

const  apiTest = async ()=>{
    // This example provider won't let you make transactions, only read-only calls:
    const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')

    const openseaSDK = new OpenSeaSDK(provider, {
        networkName: Network.Main,
        apiKey: '12342'
    })

    const asset = await openseaSDK.api.getAsset({
        tokenAddress, // string
        tokenId, // string | number | null
    })
    console.log('asset====',asset);
}

onMounted(()=>{



    //console.log('useSdk==',useSdk);
   // const openseaSdk = useSdk('@opensea/v2.0#a4yydp4ol4rcungw');

   // openseaSdk['retrieve-listings']()
   //     .then(res => console.log('============',res))
   //     .catch(err => console.error('####',err));
})
</script>

<style scoped lang="scss">
.project-container{
    padding:10px 30px;
}
.project-header{
    margin:20px 0 10px;
    font-weight: bolder;
    .project-title{
        font-weight: bolder;
        font-size:20px;
    }
    .project-desc{
        font-size:16px;
    }
}

.project-content{
    display: flex;
    flex-wrap: nowrap;
    align-content: center;
    box-sizing: border-box;
    width:100%;
    .project-item {
        .project-item-box {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 2px;
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease;
            box-sizing: border-box;

            &:hover {
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.03);

                .item-txt-title {
                    color: var(--el-color-primary) !important;
                    transition: all 0.3s ease;
                }

                .item-img {
                    img {
                        transition: all 0.3s ease;
                        transform: translateZ(0) scale(1.05);
                    }
                }
            }

            .item-img {
                position: relative;
                width: 100%;
                padding-bottom: 100%;
                height: 0;

                img {
                    transition: all 0.3s ease;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                }
            }

            .item-txt {
                flex: 1;
                padding: 5px 0;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                font-size: 12px;
                line-height: 18px;
                color: var(--el-text-color-regular);
                background: var(--el-bg-color);

                .item-txt-title {
                    text-overflow: ellipsis;
                    overflow: hidden;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    display: -webkit-box;
                    color: #666666;
                    transition: all 0.3s ease;

                    &:hover {
                        color: var(--el-color-primary);
                        text-decoration: underline;
                        transition: all 0.3s ease;
                    }
                }

                .item-txt-price {
                    font-weight: bold;
                }

            }
        }
    }
}
</style>
