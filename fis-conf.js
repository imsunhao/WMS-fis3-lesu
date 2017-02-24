// 设置项目属性
fis.set('project.static', '/static');

fis.match(/static\/(css)\/.*\.*$/, {
    useHash: true
});

//doc目录,test目录不发布
fis.match("{doc,test}/**", {
    release: false
});

//sass part目录不发布
fis.match("static/css/part/**", {
    release: false
});

//调整 main.html
fis.match('static/(main.html)', {
    release: "/$1",
    useCache: false
});

//调整 login.html
fis.match("static/page/login/(*.html)", {
    release: '/$1',
    useCache: false
});


//sass的编译
fis.match('**/*.scss', {
    rExt: '.css', // from .scss to .css
    parser: fis.plugin('node-sass', {
        //fis-parser-node-sass option
    })
});

fis.match('::packager', {
    spriter: fis.plugin('csssprites', {
        layout: 'matrix',
        margin: '15'
    })
});

//删除 生产实际代码

fis.media('debug')
    .match('components/prod/*.js', {
        release:false
    })
    .match('static/**(.{html,js})', {
        parser: fis.plugin('jdists', {
            remove: "prod"
        })
    });

//模拟生产环境下CSS、JS压缩合并
fis.media('test')
    .match(/static\/(css|js)\/.*\.*$/, {
        useHash: false
    })
    .match('**.html', {
        parser: fis.plugin('jdists', {
            remove: "todoList,debug"
        })
    })
    .match('static/**(.{html,js})', {
        parser: fis.plugin('jdists', {
            remove: "todoList,debug"
        }),
        optimizer: fis.plugin('uglify-js')
    })
    .match(/(components\/.*\/*css|static\/css\/main.scss)/, {
        packTo: '${project.static}/lib/common.css',
        optimizer: fis.plugin('clean-css')
    })
    .match("components/*/fonts/(**)", {
        release: "${project.static}/lib/fonts/$1"
    })
    .match('components/prod/*.js', {
        packTo: '${project.static}/lib/common.js'
    })
    .match('components/debug/*.js', {
        release:false
    })
    .match('**.css', {
        optimizer: fis.plugin('clean-css')
    });

//生产环境下
fis.media('prod')
    .match('hock/**', {
        release: false
    });