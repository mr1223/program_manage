

//跨域地址配置
const domin = '你的地址';
//图片地址配置
const dominImg = '你的地址/Uploads';
/*
//打包配置
const domin = '';
const dominImg = '/Uploads';*/

//后台接口
const api = '';//  /wechat   
const api_login = api + '/Admin/Use/login';//登陆  
const api_loginout = api + '/Admin/Use/loginout';//退出
const api_getUser = api + '/Admin/Public/getUser';//退出
const api_getPhone = api + '/Admin/Index/getPhone';//获取-电话
const api_addPhone = api + '/Admin/Index/addPhone';//添加-电话
const api_getCarouselList = api + '/Admin/Index/getCarouselList';//获取-全部轮播图
const api_addCarousel = api + '/Admin/Index/addCarousel';//添加-轮播图
const api_getCarousel = api + '/Admin/Index/getCarousel';//获取-轮播图
const api_showhideCarousel = api + '/Admin/Index/showhideCarousel';//显示隐藏-轮播图
const api_removeCarousel = api + '/Admin/Index/removeCarousel';//删除-轮播图

const api_AssortIndex = api + '/Admin/Assort/index';//获取-全部类型
const api_addAssort = api + '/Admin/Assort/add';//添加-类型
const api_getAssort = api + '/Admin/Assort/getAssort';//获取-类型
const api_changeAssort = api + '/Admin/Assort/change';//状态改变-轮播图



const api_getType = api + '/Admin/Type/getType';//获取-产品类型
const api_addType = api + '/Admin/Type/addType';//添加-产品类型
const api_getTypeList = api + '/Admin/Type/getTypeList';//添加-产品类型列表
const api_showHideType = api + '/Admin/Type/showHideType';//显示隐藏-产品类型
const api_removeType = api + '/Admin/Type/removeType';//删除-产品类型
const api_getProduct = api + '/Admin/Product/getProduct';//获取-产品
const api_addProduct = api + '/Admin/Product/addProduct';//添加-产品
const api_getProductList = api + '/Admin/Product/getProductList';//获取-产品列表
const api_showHideProduct = api + '/Admin/Product/showHideProduct';//显示/隐藏-产品列表
const api_removeProduct = api + '/Admin/Product/removeProduct';//删除-产品列表
const api_addCompany = api + '/Admin/Message/addCompany';//添加-公司信息
const api_getCompany = api + '/Admin/Message/getCompany';//获取-公司信息
const api_addCulture = api + '/Admin/Message/addCulture';//添加-企业文化
const api_getCulture = api + '/Admin/Message/getCulture';//获取-企业文化
const api_addHonor = api + '/Admin/Message/addHonor';//添加-荣誉资质
const api_getHonor = api + '/Admin/Message/getHonor';//获取-荣誉资质
const api_addContact = api + '/Admin/Message/addContact';//添加-联系我们
const api_getContact = api + '/Admin/Message/getContact';//获取-联系我们
const api_getLeavingList = api + '/Admin/Message/getLeavingList';//获取-留言列表
const api_getLeaving = api + '/Admin/Message/getLeaving';//获取-留言
const api_removeLeaving = api + '/Admin/Message/removeLeaving';//删除-留言
const api_addNews = api + '/Admin/New/addNews';//添加-新闻
const api_getNews = api + '/Admin/New/getNews';//获取-新闻
const api_getNewsList = api + '/Admin/New/getNewsList';//获取-新闻列表
const api_showHideNew = api + '/Admin/New/showHideNew';//显示/隐藏-新闻
const api_removeNew = api + '/Admin/New/removeNew';//显示/隐藏-新闻
const api_account = api + '/Admin/Account/index';//列表-用户  
const api_getAccount = api + '/Admin/Account/getAccount';//获取-用户
const api_changeAccount = api + '/Admin/Account/changeAccount';//更改-用户
const api_seatchAccount = api + '/Admin/Account/seatchAccount';//搜索-用户
const api_stick = api + '/Admin/Stick/index';//列表-帖子
const api_getStick = api + '/Admin/Stick/getStick';//获取-帖子
const api_changeStick = api + '/Admin/Stick/changeStick';//更改-帖子
const api_addStick = api + '/Admin/Stick/add';//增加-帖子
const api_getComment = api + '/Admin/Comment/get';//获取-评论
const api_changeComment = api + '/Admin/Comment/change';//更改-评论



const imageUpload = api + '/Admin/Public/uploadImg';//图片上传
//前台页面
const router = '';
const login = router + '/login';//登陆页面
const phone = router + '/phone';//手机管理
const carousel = router + '/carousel';//轮播图列表
const addCarousel = router + '/addCarousel';//轮播图-添加addIndexType
const indexType = router + '/indexType';//首页类型列表
const addIndexType = router + '/addIndexType';//首页类型-添加
const product = router + '/product';//产品-添加
const company = router + '/company';//公司信息
const addCompany = router + '/addCompany';//公司信息-添加
const culture = router + '/culture';//企业文化
const addCulture = router + '/addCulture';//企业文化-添加
const honor = router + '/honor';//荣誉资质
const addHonor = router + '/addHonor';//荣誉资质-添加
const contact = router + '/contact';//联系我们
const addContact = router + '/addContact';//联系我们-添加
const news = router + '/news';//新闻列表
const industry = router + '/industry';//行业动态
const type = router + '/type';//行业动态
const leaving = router + '/leaving';//留言管理
const infoLeaving = router + '/infoLeaving';//查看留言
const account = router + '/account';//用户-列表
const addAccount = router + '/addAccount';//用户-信息
const stick = router + '/stick';//帖子-列表
const addStick = router + '/addStick';//帖子-信息
const comments = router + '/comments';//评论-列表
const commentDetail = router + '/commentDetail';//评论-详情



const addNews = router + '/addNews';//新闻列表-添加





export default {
	domin,
	dominImg,
	api,
	api_login,
	api_loginout,
	api_getUser,
	api_getPhone,
	api_addPhone,
	api_getCarouselList,
	api_addCarousel,
	api_getCarousel,
	api_showhideCarousel,
	api_removeCarousel,
	api_AssortIndex,
	api_addAssort,
	api_getAssort,
	api_changeAssort,
	api_getType,
	api_addType,
	api_getTypeList,
	api_showHideType,
	api_removeType,
	api_getProduct,
	api_addProduct,
	api_getProductList,
	api_showHideProduct,
	api_removeProduct,
	api_addCompany,
	api_getCompany,
	api_addCulture,
	api_getCulture,
	api_addHonor,
	api_getHonor,
	api_addContact,
	api_getContact,
	api_getLeavingList,
	api_getLeaving,
	api_removeLeaving,
	api_addNews,
	api_getNews,
	api_getNewsList,
	api_showHideNew,
	api_removeNew,
	api_account,
	api_getAccount,
	api_changeAccount,
	api_seatchAccount,
	api_stick,
	api_getStick,
	api_changeStick,
	api_addStick,
	api_getComment,
	api_changeComment,
	imageUpload,
	login,
	phone,
	carousel,
	addCarousel,
	indexType,
	addIndexType,
	product,
	company,
	addCompany,
	culture,
	addCulture,
	honor,
	addHonor,
	contact,
	addContact,
	news,
	industry,
	type,
	leaving,
	infoLeaving,
	addNews,
	account,
	addAccount,
	stick,
	addStick,
	comments,
	commentDetail,
}
export {
	domin,
	dominImg,
	api,
	api_login,
	api_loginout,
	api_getUser,
	api_getPhone,
	api_addPhone,
	api_getCarouselList,
	api_addCarousel,
	api_getCarousel,
	api_showhideCarousel,
	api_removeCarousel,
	api_AssortIndex,
	api_addAssort,
	api_getAssort,
	api_changeAssort,
	api_getType,
	api_addType,
	api_getTypeList,
	api_showHideType,
	api_removeType,
	api_getProduct,
	api_addProduct,
	api_getProductList,
	api_showHideProduct,
	api_removeProduct,
	api_addCompany,
	api_getCompany,
	api_addCulture,
	api_getCulture,
	api_addHonor,
	api_getHonor,
	api_addContact,
	api_getContact,
	api_getLeavingList,
	api_getLeaving,
	api_removeLeaving,
	api_addNews,
	api_getNews,
	api_getNewsList,
	api_showHideNew,
	api_removeNew,
	api_account,
	api_getAccount,
	api_changeAccount,
	api_seatchAccount,
	api_stick,
	api_getStick,
	api_changeStick,
	api_addStick,
	api_getComment,
	api_changeComment,
	imageUpload,
	login,
	phone,
	carousel,
	addCarousel,
	indexType,
	addIndexType,
	product,
	company,
	addCompany,
	culture,
	addCulture,
	honor,
	addHonor,
	contact,
	addContact,
	news,
	industry,
	type,
	leaving,
	infoLeaving,
	addNews,
	account,
	addAccount,
	stick,
	addStick,
	comments,
	commentDetail,
}
