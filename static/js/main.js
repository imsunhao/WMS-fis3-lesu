var Vue = require('vue');
var Router = require('director').Router;

Vue.component('sh-test', {
    template: '<div>Hi new World!</div>'
});

window.app = new Vue({
    el: '#app',
    data: {
        'currentView' : 'home', //默认首页
        'type'  : '',
        'cate'  : '',
        'article_id' : ''
    }
});

var router = new Router();

function listHandler(view,type,cate){
    require.async('page/trend/trend.js', function(pageComponent){
        var components = app.$options.components;
        if (!components['trend']) {
            components['trend'] = pageComponent;
        }
        //参数
        app.$data.type = type;
        app.$data.cate = cate;
        app.currentView = view;
    });
}

//首页
router.on('/home', function (cate){
    app.currentView = 'home';
});

//热门文章
router.on('/hot/:cate', function (cate){
    listHandler('trend','hot',cate);
});

//分类推荐
router.on('/notes/:cate', function (cate){
    listHandler('trend','notes',cate);
});

//我的订阅
router.on('/subscribe/:cate', function (cate){
    listHandler('trend','subscribe',cate);
});

//文章详细
router.on('/p/:id', function (id){
    require.async('page/article/article.js', function(pageComponent){
        var components = app.$options.components;
        if (!components['article']) {
            components['article'] = pageComponent;
        }
        app.$data.article_id = id;
        app.currentView = 'article';
    });
});

/*错误页*/
router.on('/error/notfound', function () {
    require.async('page/error/notfound.js', function(pageComponent){
        var components = app.$options.components;
        if (!components['not-found']) {
            components['not-found'] = pageComponent;
        }
        app.currentView = 'not-found';
    });
});

//页面未找到
router.configure({
    notfound: function () {
        router.setRoute('/error/notfound');
    }
});

//默认首页
router.init('/hot/now');
