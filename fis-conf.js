fis.hook('commonjs', {});

fis.match(/static\/(css)\/.*\.*$/, {
    useHash: true
});

//文章封面和作者头像等动态图片地址不加hash
fis.match(/static\/images\/.*\.(jpeg|jpg|png)$/, {
    useHash: false
});


//组件化资源
fis.match("static/js/(**).js", {
    isMod: true,
    moduleId: '$1',
    useMap: true
});

fis.match("components/(**)/css/(**).css", {
    release: '/static/lib/$1/css/$2'
});

fis.match("components/(**)/fonts/(**).*", {
    release: '/static/lib/$1/fonts/$2'
});

fis.match("components/**/(**).js", {
    isMod: true,
    moduleId: '$1',
    useMap: true,
    release: '/static/lib/$1'
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
    postpackager: fis.plugin('loader', {
        resourceType: 'mod',
        useInlineMap: true // 资源映射表内嵌
    }),
    packager: fis.plugin('map'),
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
        packTo: '/static/pkg/common.js'
    })
    .match('**.css', {
        optimizer: fis.plugin('clean-css')
    });
