<template>
    <div>
        <x-header :left-options="{showBack: false}">结果详情<a slot="right"  @click="finish" style="color:#64AAFD">完成</a></x-header>
        <div style="padding:0.1rem;">
            <div class="content" style="">
                <div class="item">
                    <img src="../../../images/cg@3x.png" style="width:0.79rem" alt="">
                </div>
                <div class="item" style="font-size:0.2rem;color:#64AAFD;">
                    交易完成
                </div>
                <div class="item" style="font-size:0.14rem;color:#999999;">
                    恭喜您成功卖出{{num}}USDT
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { XButton,XHeader,Confirm ,ConfirmPlugin,Toast } from 'vux'
// Vue.use(ConfirmPlugin)
export default {
    data(){
        return {
            showModel:false,
            title:'123',
            showHelp:true,
            showBtn:true,
            showToast:false,
            num:'',
        }
    },
    mounted(){
        this.num = this.$route.query.num
    },
    components: {
        XButton,
        XHeader,
        Confirm ,
        Toast ,
    },
    methods:{
        onCancel(){

        },
        Appeal(){
            this.showToast = !this.showToast
        },
        onConfirm(){
            this.$router.push('/transaction/orderfinish')
        },
        onHide(){

        },
        onShow(){

        },
        sure(){
            this.showModel = true
        },
        finish(){
            this.$router.push('/transaction/purchase')
        }
    }
}
</script>

<style scoped>
.content{
    background:#fff;
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: center;
    align-items:center;
    flex-wrap: wrap;
    padding:0.5rem;
    font-size:0.16rem;
}
.item{
    width: 100%;
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: center;
    align-items:center;
    padding:0.05rem 0;
}
</style>

