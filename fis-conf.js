// 设置项目属性
fis.set('project.name', 'WMS');
fis.set('project.static', '/static');


fis.match(/static\/(css)\/.*\.*$/, {
    useHash: true
});

//文章封面和作者头像等动态图片地址不加hash
fis.match(/static\/images\/.*\.(jpeg|jpg|png)$/, {
    useHash: false
});


//组件化资源


fis.match("components/**", {
    release: '${project.static}/lib/$0'
});


fis.match('**.es', {
    parser: fis.plugin('babel-5.x'),
    rExt: 'js'
});

fis.match("components/**/(**).js", {
    release: '${project.static}/lib/$1'
});

//doc目录不发布
fis.match("doc/**", {
    release: false
});

//test目录不发布
fis.match("test/**", {
    release: false
});

//part目录不发布
fis.match("static/css/part/**", {
    release: false
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

//生产环境下CSS、JS压缩合并
fis.media('prod')
    .match(/static\/(css|js)\/.*\.*$/, {
        useHash: false
    })
    .match('**.js', {
        parser: fis.plugin('jdists', {
            remove: "debug,test"
        }),
        optimizer: fis.plugin('uglify-js')
    })
    .match('components/*.js', {
        packTo: '${project.static}/pkg/common.js'
    })
    .match('**.css', {
        optimizer: fis.plugin('clean-css')
    });
