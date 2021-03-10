const mix = require('laravel-mix');
var path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .vue()
    .sass('resources/sass/app.scss', 'public/css')
    .webpackConfig({
        resolve: {
            // I do know that when used to import components into ExampleComponent, this alias does work
            alias: {
                '@component-library':  path.resolve(
                    __dirname,
                    'node_modules/@jordangunther/vue-storybook-component-library/src'
                )
            }
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    // I probably need to reference nodes_modules/@jordangunther instead of just node modules, not sure
                    exclude: /node_modules/,
                    // I believe this isn't working because of the lack of css-loader and style-loader but when I try to use the below syntax the options don't work as they only need to be applied to sass-loader
                    // loaders: ['style-loader, css-loader', 'sass-loader'],
                    loader: 'sass-loader',
                    options: {
                        data: `
                        @import "~@component-library/styles/abstracts/_functions.scss";
                        @import "~@component-library/styles/abstracts/_mixins.scss";
                        @import "~@component-library/styles/abstracts/_variables.scss";
                  `
                    }
                }
            ]
        }
    });
