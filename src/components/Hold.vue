<template>
    <div style="font-size:0.16rem;">
        <div class="hold">
            <div class="top">
                USDT(模拟盘)
                <span style="font-size:0.14rem;color:#1da454;font-weight:400">+0.97</span>
            </div>
            <div>
                <div class="top-item">
                    <span style="font-size:0.12rem;color:#a3a3a3;">剩余保证金　</span>
                    <span>8029.61</span>
                </div>
                <div class="top-item">
                    <span style="font-size:0.12rem;color:#a3a3a3;">账户余额　</span>
                    <span>8029.61</span>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="menu-label">
                <div class="menu-item menu-active">持仓</div>
                <div class="menu-item">挂单</div>
                <div class="menu-item">历史</div>
            </div>
        </div>
        <div class="content-label">
            <div class="item2">NEO<span style="font-size:0.14rem;color:#a3a3a3;">/USDT</span></div>
            <div class="item2">
                <div class="sta-label">
                    涨
                </div>
                <span>×1手</span>
            </div>
            <div class="item2" style="color:#f23b4e">-11.00</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    }
}
</script>

<style scoped>
.hold{
    padding:0.1rem 0.1rem 0.35rem;
    background: #fff;
}
.top{
    font-size:0.18rem;
    font-weight:600;
    background:#fff;
    padding-bottom:0.1rem;
}
.top-item{
    float: left;
    width:50%;
    display: flex;
    justify-content:flex-start;
    align-items: center;
}
.content{
    margin-top:0.1rem;
}
.menu-label{
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    background: #6d80fe;
    color:#fff;
}
.content-label{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding:0 0.1rem;
    border-bottom:0.01rem solid #ededed;
}
.menu-item{
    padding:0.05rem 0;
}
.menu-active{
    border-bottom:0.03rem solid #ffcc00;
}
.item2{
    padding:0.1rem 0;
}
.sta-label{
    width:0.25rem;
    height:0.25rem;
    text-align: center;
    font-size:0.14rem;
    line-height: 0.25rem;
    border-radius:50%;
    color:#fff;
    background: #1da454;
    display: inline-block;
}
</style>
