module.exports = {
    plugins: {
        // VueCli已经配置，生成浏览器css样式前缀
        // autoprefixer: {
        //     browsers: ['Android >= 4.0', 'iOS >= 8'],
        // },
        'postcss-pxtorem': {


            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },

            propList: ['*'],
        },
    },
};