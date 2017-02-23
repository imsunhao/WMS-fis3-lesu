var Vue = require('vue');

Vue.component('sh-test', {
    template: '<div>Hi new World!</div>'
});
var app = new Vue({
    el: "#app"
});