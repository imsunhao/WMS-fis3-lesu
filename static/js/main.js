require('jquery');
require('vue');

Vue.component('SH-test', {
    template: '<div>Hi new World!</div>'
});

var app = new Vue({
    el: "#app"
});