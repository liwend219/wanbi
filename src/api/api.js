// import fetch from '../libs/fetch';
// import Root from '../lib/root';
// import qs from 'qs'
// import axios from 'axios'
// const http = Root.http
// export function sendMsg(val) {
//     let datas = null;
//     axios({
//         method:"POST",
//         url:http+'/ApiUser/LoginCode',
//         data:qs.stringify({
//             "Account":'18856225236'
//         }),
//     }).then(data =>{
//         datas = data
//     }).catch(err =>{
//         console.log(err)
//     })
//     return datas
// }

import fetch from '../libs/fetch';
import Root from '../libs/root';
export const url = Root.http

export const LoginCode = url + '/ApiUser/LoginCode'
export const Login = url + '/ApiUser/Login'
export const TradeSaleSelect = url + '/ApiBus/TradeSaleSelect'
export const sellList = url + '/ApiBus/TradeBuySelect'
export const tradeList = url + '/ApiBus/TradeSelfSelect'
export const RevokeUrl = url + '/ApiBus/TradeToCancel'
export const OrderList = url + '/ApiBus/OrderList'
export const purUsdt = url + '/ApiBus/OrderCreate'
export const Orderdetail = url + '/ApiBus/OrderDetail'
export const orderPay = url + '/ApiBus/OrderBuyerPay'
export const AppealUrl = url + '/ApiBus/OrderServer'
export const qrReceivUrl = url + '/ApiBus/OrderSaleSure'
export const wjsendMsgUrl = url + '/ApiUser/ForgetTraderPwdCode'
export const TraderPwdUrl = url + '/ApiUser/ForgetTraderPwd'
export const addAddressUrl = url + '/ApiUser/AddressCreate'
export const AddressMsgUrl = url + '/ApiUser/AddressCreateCode'
export const RealNameUrl = url + '/ApiUser/RealName'
export const GetUserMoneyUrl = url + '/ApiUser/GetUserMoney'
export const ShopTransfer = url + '/ApiUser/ShopTransfer'
export const ChangeTraderPwdUrl = url + '/ApiUser/ChangeTraderPwd'
export const GetPutCaseUrl = url + '/ApiUser/GetPutCase'
export const PutCaseCreateUrl = url + '/ApiUser/PutCaseCreate'
export const GetAddress = url + '/ApiUser/GetAddress'
export const GetBill = url + '/ApiUser/GetBill'
export const GetUser = url + '/ApiUser/GetUser'
export const setPwdUrl = url + '/ApiUser/SetTraderPwd'
export const gethangqing = url + '/HuoBi/GetMarketList'
export const getRateUrl = url + '/ApiUser/GetPrice'
//发送验证码
export function sendMsg(query) {
    return fetch({
      url: LoginCode,
      method: 'POST',
      params: query
    })
}

/**
 * 登陆
 */

export function login(query) {
  return fetch({
    url: Login,
    method: 'POST',
    params: query
  })
}
/**
 * 获取买入列表
 */
export function getSale(query) {
  return fetch({
    url: TradeSaleSelect,
    method: 'POST',
    params: query
  })
}
export function getSell(query) {
  return fetch({
    url: sellList,
    method: 'POST',
    params: query
  })
}
//交易单列表
export function getJy(query) {
  return fetch({
    url: tradeList,
    method: 'POST',
    params: query
  })
}
//撤销交易单
export function RevokeList(query) {
  return fetch({
    url: RevokeUrl,
    method: 'POST',
    params: query
  })
}
//订单列表
export function OrderLists(query) {
  return fetch({
    url: OrderList,
    method: 'POST',
    params: query
  })
}
//买入USDT
export function purUsdts(query) {
  return fetch({
    url: purUsdt,
    method: 'POST',
    params: query
  })
}
//订单详情--买
export function orderDetail(query) {
  return fetch({
    url: Orderdetail,
    method: 'POST',
    params: query
  })
}
//订单详情--卖
export function sellDetail(query) {
  return fetch({
    url: Orderdetail,
    method: 'POST',
    params: query
  })
}
// 确认支付
export function orderPays(query) {
  return fetch({
    url: orderPay,
    method: 'POST',
    params: query
  })
}
//卖出
export function orderSells(query) {
  return fetch({
    url: purUsdt,
    method: 'POST',
    params: query
  })
}
//申诉
export function Appeal(query) {
  return fetch({
    url: AppealUrl,
    method: 'POST',
    params: query
  })
}
//确认收款
export function qrReceiv(query) {
  return fetch({
    url: qrReceivUrl,
    method: 'POST',
    params: query
  })
}
//忘记密码 - 发送验证码
export function wjsendMsg(query) {
  return fetch({
    url: wjsendMsgUrl,
    method: 'POST',
    params: query
  })
}
//忘记密码-重置密码
export function TraderPwd(query) {
  return fetch({
    url: TraderPwdUrl,
    method: 'POST',
    params: query
  })
}
//添加提现地址
export function addAddress(query) {
  return fetch({
    url: addAddressUrl,
    method: 'POST',
    params: query
  })
}
//添加体现地址 发送验证码
export function AddressMsg(query) {
  return fetch({
    url: AddressMsgUrl,
    method: 'POST',
    params: query
  })
}
//身份认证
export function RealName(query) {
  return fetch({
    url: RealNameUrl,
    method: 'POST',
    params: query
  })
}
//查询划转列表
export function GetUserMoney(query) {
  return fetch({
    url: GetUserMoneyUrl,
    method: 'POST',
    params: query
  })
}
//划转
export function ShopTransfers(query) {
  return fetch({
    url: ShopTransfer,
    method: 'POST',
    params: query
  })
}
//修改交易密码
export function ChangeTraderPwd(query) {
  return fetch({
    url: ChangeTraderPwdUrl,
    method: 'POST',
    params: query
  })
}
//提现记录
export function GetPutCase(query) {
  return fetch({
    url: GetPutCaseUrl,
    method: 'POST',
    params: query
  })
}
//提现操作
export function PutCaseCreate(query) {
  return fetch({
    url: PutCaseCreateUrl,
    method: 'POST',
    params: query
  })
}
//提现地址查询
export function GetAddresss(query) {
  return fetch({
    url: GetAddress,
    method: 'POST',
    params: query
  })
}
//获取记录

export function GetBills(query) {
  return fetch({
    url: GetBill,
    method: 'POST',
    params: query
  })
}
//获取用户信息
export function GetUsers(query) {
  return fetch({
    url: GetUser,
    method: 'POST',
    params: query
  })
}
//设置交易密码
export function setPwd(query) {
  return fetch({
    url: setPwdUrl,
    method: 'POST',
    params: query
  })
}
//获取行情
export function gethq(query) {
  return fetch({
    url: gethangqing,
    method: 'POST',
    params: query
  })
}
//获取汇率
export function getRate(query) {
  return fetch({
    url: getRateUrl,
    method: 'POST',
    params: query
  })
}