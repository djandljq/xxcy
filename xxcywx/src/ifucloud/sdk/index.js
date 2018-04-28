import ams from './libs/ams';
import crm from './libs/crm';
import brm from './libs/brm';
import ath from './libs/ath';
import pmc from './libs/pmc';
import omc from './libs/omc';
import wechat from './libs/wechat';

export const athRolesList = ath.rolesList; // 获取角色
export const businessLogin = brm.userLogin; // 商户登录
export const businessLogout = brm.userLogout; // 商户退出
export const businessUserInfo = brm.userInfo; // 商户人员信息
export const businessUserList = brm.userList; // 商户人员列表
export const businessUserAdd = brm.createUser; // 增加商户人员
export const businessUserUpdate = brm.updateUser; // 更新人员信息
export const productList = pmc.productList; // 获取产品列表
export const productCreate = pmc.productCreate; // 获取产品列表
export const productInfo = pmc.productInfo; // 获取产品列表
export const productUpdate = pmc.productUpdate; // 获取产品列表
export const orderList = omc.orderList; // 获取产品列表
export const orderCreate = omc.orderCreate; // 获取产品列表
export const orderUpdate = omc.orderUpdate; // 获取产品列表
export const orderInfo = omc.orderInfo; // 获取产品列表
export const orderInfoBySn = omc.orderInfoBySn; // 获取产品列表
export const articleList = ams.articleList; // 获取产品列表
export const articleCreate = ams.articleCreate; // 获取产品列表
export const articleUpdate = ams.articleUpdate; // 获取产品列表
export const articleInfo = ams.articleInfo; // 获取产品列表
export const bulletinList = ams.bulletinList; // 获取产品列表
export const bulletinCreate = ams.bulletinCreate; // 获取产品列表
export const bulletinUpdate = ams.bulletinUpdate; // 获取产品列表
export const bulletinInfo = ams.bulletinInfo; // 获取产品列表
export const commentList = ams.commentList; // 获取产品列表
export const commentCreate = ams.commentCreate; // 获取产品列表
export const commentUpdate = ams.commentUpdate; // 获取产品列表
export const commentInfo = ams.commentInfo; // 获取产品列表
export const customerUserList = crm.userList; // 获取产品列表
export const customerUserInfo = crm.userInfo; // 获取产品列表
export const customerUserInfoById = crm.userInfoById; // 获取产品列表
export const customerCreateUser = crm.createUser; // 获取产品列表
export const customerUpdateUser = crm.updateUser; // 获取产品列表
export const wxUserLogin = wechat.userLogin; // 获取产品列表
export const wxJsSdkConfig = wechat.jsSdkConfig; // 获取产品列表
export const wxCreateOrder = wechat.createOrder; // 获取产品列表
export const wxJsSdkPay = wechat.jsSdkPay; // 获取产品列表
