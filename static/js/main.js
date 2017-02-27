/*<prod>*/
console.log('线上版本');
/*</prod>*/
$(function () {
    var hock = "../../hock";
    var app = new Vue({
        el: '#app',
        prop: {},
        data: function () {
            return {
                nav:[],                         //Nav-DB
                headActiveIndex: 0,             //nav-header
                slideMenu: {},                  //Nav-slide
                f_SlideMenuText: '',            //Nav-slide-search

                fullscreenLoading: false,       //全局加载控制

                user: {                         //User信息
                    username: "",
                    userAuthID: ""
                }
            };
        },
        methods: {
            //TODO 完善 控制方法
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

    //维护 权限验证
    (function (app) {
        //维护 Loading 层
        var complie = 0;    //统计页面是否全部完成
        var end = 1;
        app.$data.fullscreenLoading = true; //显示加载
        function Loading() {
            complie++;
            if (complie == end) {
                app.$data.fullscreenLoading = false; //结束加载
            }
        }

        $.ajax(hock + '/Auth/userInfo.json', {
            type: "GET",
            data: {},
            error: function () {
            },
            success: function (json) {
                if (json.auth != 200) {
                    //身份验证失败信息窗
                    app.$data.fullscreenLoading = false; //停止加载
                    app.$alert(json.authMessage, '提示', {
                        confirmButtonText: '确定',
                        callback: function () {
                            window.location.href = '/index.html';
                        }
                    });
                }
                else {
                    //--------------初始化界面-------------
                    (function (app) {
                        //维护 Loading 层
                        complie = 0;    //刷新统计页面是否全部完成
                        end = 1;
                        app.$data.fullscreenLoading = true; //显示加载

                        //填充用户信息
                        (function () {
                            app.$data.user.username = json.user.username;
                            app.$data.user.userAuthID = json.user.userAuthID;
                        })();


                        //加载nav
                        $.ajax(hock + '/main/Nav-DB.json', {
                            type: "GET",
                            data: {},
                            error: function () {
                            },
                            success: function (json) {
                                app.$data.nav = json.data;
                                //TODO 解析NAV

                                //加载header-Nav

                                //加载slider-Menu

                            },
                            complete: function () {
                                Loading();
                            }
                        });

                        /*<debug>*/
                        //初始化程序结束，输出提示
                        console.log('界面加载完成');
                        console.log('用户：');
                        console.log(app.$data.user);
                        /*</debug>*/
                    })(app);
                }
            },
            complete: function () {
                Loading();
            }
        });
    })(app);
});
