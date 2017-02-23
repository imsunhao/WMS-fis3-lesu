var Vue = require('vue');

$(function () {
    console.log(Vue);
    Vue.component('sh-test', {
        template: '<div>Hi new World!</div>'
    });
    var app = new Vue({
        el: "#app"
    });
});