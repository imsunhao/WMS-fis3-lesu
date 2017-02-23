var app=new Vue({
    el:'#app',
    data:function(){
        return {
            headActiveIndex: 0,
            slideMenu: {}
        };
    },
    methods: {
        handleSelect:function(key, keyPath) {
            console.log(key, keyPath);
        },
        handleNodeClick:function(data) {
            console.log(data);
        }
    }
});
$(function () {
//--------------初始化界面-------------
    (function (app) {
        //加载header-Nav
        $.ajax('../../hock/slideMenu.json',{
            type:"GET",
            data:{},
            error:function () {},
            success:function (json) {
                app.$data.headActiveIndex=json.data;
            },
            complete:function () {}
        });

        //加载slider-Menu
        $.ajax('../../hock/slideMenu.json',{
            type:"GET",
            data:{},
            error:function () {},
            success:function (json) {
                app.$data.slideMenu=json.data;
            },
            complete:function () {}
        });

    })(app);
});