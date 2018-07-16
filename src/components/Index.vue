<template>
    <div>
        <div class="header">
            <button-tab v-model="demo01" style="width:40%;margin:0 auto;padding-top:0.08rem;">
                <button-tab-item @click.native="toTransaction">交易</button-tab-item>
                <button-tab-item @click.native="toWallet">钱包</button-tab-item>
            </button-tab>
        </div>
        <router-view>

        </router-view>
        
    </div>
</template>

<script>
//引入组件
import { XInput,XButton,ButtonTab, ButtonTabItem, } from 'vux'
export default {
    data (){
        return {
            datas:'',
            demo01:0,
        }
    },
    created(){
        if(this.$route.query.idx){
            this.demo01 = parseInt(this.$route.query.idx)
        }
    },
    //初始化
    mounted(){
        
    },
    methods:{
        toTransaction(){
            this.$router.push('/transaction/purchase')
        },
        toWallet(){
            this.$router.push('/wallet/wellet_01')
        },
        
    },
    //注册组件
    components: {
        XInput,
        XButton,
        ButtonTab,
        ButtonTabItem,
    }
}
</script>

<style scoped>

.header{
    height:0.5rem;
    background: #fff;
    margin-bottom:0.1rem;
}

.vux-tab-ink-bar{
    background-color:red !important;
}

/* @button-tab-default-background-color{
    color:#DCD9D9;
} */

</style>
