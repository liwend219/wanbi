<template>
    <!-- <div class="quotation"> -->
        <div>
        <x-header  :left-options="{backText: ''}"> <span style="color:#000;font-weight:700">EOS</span> <span style="color:#a3a3a3">/USDT</span> <a slot="right" style="color:rgb(100, 170, 253)">持仓</a></x-header>
        <div class="top">
            <div class="top-item">
                <div class="top-item-1">
                    <span style="font-size:0.22rem;font-weight:700;color:#1da454">¥4.82&nbsp;</span>
                    <img src="../../images/Help_sm@3x.png" style="width:0.15rem" alt="">
                </div>
                <div class="top-item-1" style="font-size:0.12rem;color:#1da454">
                    <span>-0.00768　</span>
                    <span>-2.82%</span>
                </div>
            </div>
            <div class="top-item">
                <div class="top-item-2" style="font-size:0.12rem;">
                    <span style="text-align:left">最高(24h)&nbsp;　</span>
                    <span>49700.33</span>
                </div>
                <div class="top-item-2" style="font-size:0.12rem;">
                    <span style="text-align:left">最低(24h)&nbsp;　</span>
                    <span>49700.33</span>
                </div>
                <div class="top-item-2" style="font-size:0.12rem;">
                    <span style="text-align:left">可用保证金&nbsp;　</span>
                    <span>700.33亿</span>
                </div>
            </div>
        </div>
        <!-- <div>
            <button @click="test">test</button>
        </div> -->
        <div class="formData">
            <div class="box">
                <iframe id="iframe" style="width:100vw;height:75vw" class="ifr" src="https://widget.aicoin.net.cn/chart/?symbol=HUOBIPROBTCUSDT&default_theme=dark&disable_theme_change=true&hide_logo=true&hide_market_name=true&lang=zh&utm_source=127.0.0.1&utm_medium=127.0.0.1%3A8081%2F&utm_campaign=widget%2Fchart" frameborder="0"></iframe>
            </div>
        </div>
        <!-- <iframe id="iframe" style="height:75vw;width:100vw" src="https://widget.aicoin.net.cn/chart/?symbol=HUOBIPROBTCUSDT&default_theme=dark&disable_theme_change=true&hide_logo=true&hide_market_name=true&lang=zh&utm_source=127.0.0.1&utm_medium=127.0.0.1%3A8081%2F&utm_campaign=widget%2Fchart" frameborder="0"></iframe> -->
    </div>
</template>

<script>
import { XHeader } from 'vux'
export default {
    data(){
        return{

        }
    },
    mounted(){
        // new AICoin.chart({
        //         "symbol": "HUOBIPROBTCUSDT",
        //         "default_theme": "dark",
        //         "disable_theme_change": true,
        //         "hide_logo": true,
        //         "hide_market_name": true,
        //         "container": "kline_container",
        //         "lang": "zh"
        //     })
        let ifr = document.getElementById('iframe')
        ifr.onload = function(){
            let wd = ifr.contentWindow.document.documentElement.scrollWidth;
            let ht = ifr.contentWindow.document.documentElement.scrollHeight;
            let x = document.getElementsByClassName('formData')[0].clientWidth / wd;
            ifm.style.width = wd +'px';
            ifm.style.height = ht +'px';
            ifm.style.transform = `scale(${x})`;
            ifm.style.transformOrigin='0 0';
            
            document.getElementsByClassName('box')[0].style.height = ht*x + 'px'
        
        }
    },
    methods:{
        test(){
            new AICoin.chart({
                "symbol": "HUOBIPROBTCUSDT",
                "default_theme": "dark",
                "disable_theme_change": true,
                "hide_logo": true,
                "hide_market_name": true,
                "container": "kline_container",
                "lang": "zh"
            })
        }
    },
    components: {
    XHeader
  }
}
</script>

<style scoped>
.formData{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}
.box{
    width:100%;
    overflow: hidden;
}
.quotation{
    font-size:0.16rem;
}
.top{
    height:0.58rem;
    padding:0.1rem;
    background: #fff;
    margin-top:0.1rem;
}
.top-item{
    width:50%;
    /* display: inline-block; */
    float: left;
    
}
.top-item-1{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.top-item-2{
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
iframe{
    height:100px;
}
</style>
