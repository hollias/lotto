const path = require('path');
const webpack = require('webpack');

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development',  //실서비스 : production
    devtool: 'eval',   //빠르게
    resolve: {
        extensions: ['.js', '.jsx'] //확장자를 자동으로 찾아줌
    },
    
    entry: {
        app: ['./client']
    },  //입력

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', { //프리셋은 브라우저 호환성을 제공
                        targets: {
                            browsers: ['> 5% in KR','last 2 Chrome versions'], //browserslist(github)
                        },
                        debug: true,
                    }],
                    '@babel/preset-react',
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel'
                ]
            }
        }]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    }   //출력
};