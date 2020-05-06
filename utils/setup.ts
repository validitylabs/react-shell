const chalk = require('chalk');
const { convertFile } = require('convert-svg-to-png');
const path = require('path');
const sh = require('shelljs');
const favicons = require('favicons');
const fs = require('fs');

const LOGO_PATH = path.join(__dirname, '../src/logo.png');

interface IItem {
    name: string;
    contents: string;
}

/**
 * Build large logo in PNG format for later icon generation
 */
const buildLogo = async () => {
    console.log(chalk.green('building PNG logo from SVG source...'));

    try {
        await convertFile(path.join(__dirname, '../src/logo.svg'), {
            outputFilePath: LOGO_PATH,
            width: 600,
            height: 600,
        });
    } catch (error) {
        console.error(error);
    }
};

/**
 * Build icons and manifest files
 */
const buildFavIcons = async () => {
    console.log(chalk.green('building icons...'));
    sh.mkdir('-p', path.join(__dirname, '../src/assets/favicons'));

    const configuration = {
        path: '/assets/favicons/', // Path for overriding default icons path. `string`
        appName: process.env.APP_NAME, // Your application's name. `string`
        appShortName: process.env.APP_NAME, // Your application's short_name. `string`. Optional. If not set, appName will be used
        appDescription: process.env.APP_DESCRIPTION, // Your application's description. `string`
        developerName: process.env.AUTHOR, // Your (or your developer's) name. `string`
        developerURL: process.env.AUTHOR_URL, // Your (or your developer's) URL. `string`
        dir: 'auto', // Primary text direction for name, short_name, and description
        lang: 'en-US', // Primary language for name and short_name
        background: '#fff', // Background colour for flattened icons. `string`
        theme_color: '#fff', // Theme color user for example in Android's task switcher. `string`
        appleStatusBarStyle: 'black-translucent', // Style for Apple status bar: "black-translucent", "default", "black". `string`
        display: 'standalone', // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
        orientation: 'any', // Default orientation: "any", "natural", "portrait" or "landscape". `string`
        scope: '/', // set of URLs that the browser considers within your app
        start_url: '/', // Start URL when launching the application from a device. `string`
        version: process.env.APP_VERSION, // Your application's version string. `string`
        logging: false, // Print logs to console? `boolean`
        pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
        loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
        icons: {
            // Platform Options:
            // - offset - offset in percentage
            // - background:
            //   * false - use default
            //   * true - force use default, e.g. set background for Android icons
            //   * color - set background for the specified icons
            //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
            //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
            //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
            //
            android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            coast: false, // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            favicons: true, // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            firefox: true, // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            yandex: false, // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        },
    };

    await favicons(LOGO_PATH, configuration, async (error: any, response: any) => {
        if (error) {
            console.error(error);
            return;
        }

        console.log(chalk.yellow('writing icons...'));
        response.images.forEach((image: IItem) => {
            fs.writeFileSync(path.join(__dirname, `../src/assets/favicons/${image.name}`), image.contents);
        });

        console.log(chalk.yellow('writing manifest files...'));
        response.files.forEach((file: IItem) => {
            if (file.name === 'manifest.json') {
                // add missing mandatory prop
                const content = JSON.parse(file.contents);
                content.manifest_version = 2;

                fs.writeFileSync(path.join(__dirname, `../src/${file.name}`), JSON.stringify(content));
                fs.writeFileSync(path.join(__dirname, `../src/manifest.webmanifest`), JSON.stringify(content));
            } else {
                fs.writeFileSync(path.join(__dirname, `../src/${file.name}`), file.contents);
            }
        });
        // console.log(response.html);
    });
};

(async () => {
    await buildLogo();
    await buildFavIcons();

    console.log(chalk.green('setup complete!'));
})();
