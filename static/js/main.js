/*<prod>*/
console.log('线上版本');
/*</prod>*/
$(function () {
    var hock = "../../hock";
    var app = new Vue({
        el: '#app',
        prop:{
            defaultActive:{},
            data:{}
        },
        data: function () {
            return {
                headActiveIndex: 0,
                slideMenu: {},
                f_SlideMenuText: '',
                fullscreenLoading: false
            };
        },
        methods: {
            handleSelect: function (key, keyPath) {
                console.log(key, keyPath);
            },
            handleNodeClick: function (data) {
                console.log(data);
            },
            filterNode: function (value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            }
        },
        watch: {
            f_SlideMenuText: function (val) {
                this.$refs.slideTree.filter(val);
            }
        }
    });
//--------------初始化界面-------------
    (function (app) {
        //维护 Loading 层
        var complie = 0;    //统计页面是否全部完成
        var end=2;
        app.$data.fullscreenLoading = true; //显示加载
        function Loading() {
            complie++;
            if(complie==end){
                app.$data.fullscreenLoading = false; //结束加载
            }
        }

        //维护 权限验证

        //加载header-Nav
        $.ajax(hock + '/main/slideMenu.json', {
            type: "GET",
            data: {},
            error: function () {},
            success: function (json) {
                app.$data.headActiveIndex = json.data;
            },
            complete: function () {
                Loading();
            }
        });

        //加载slider-Menu
        $.ajax(hock + '/main/slideMenu.json', {
            type: "GET",
            data: {},
            error: function () {
            },
            success: function (json) {
                app.$data.slideMenu = json.data;
            },
            complete: function () {
                Loading();
            }
        });

    })(app);
});
