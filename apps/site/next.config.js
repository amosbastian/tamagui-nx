// eslint-disable-next-line @typescript-eslint/no-var-requires
/** @type {import('next').NextConfig} */
const withNx = require('@nrwl/next/plugins/with-nx');
const withPlugins = require('next-compose-plugins');
const { withTamagui } = require('@tamagui/next-plugin');
// const { withExpo } = require('@expo/next-adapter')

process.env.IGNORE_TS_CONFIG_PATHS = 'true';
process.env.TAMAGUI_TARGET = 'web';

const disableExtraction = process.env.NODE_ENV === 'development';
if (disableExtraction) {
  console.log('Disabling static extraction in development mode for better HMR');
}

const transform = withPlugins([
  withNx,
  withTamagui({
    config: './tamagui.config.ts',
    components: ['@tamagui/core', 'tamagui'],
    importsWhitelist: ['constants.js', 'colors.js'],
    logTimings: true,
    disableExtraction,
    shouldExtract: (path) => {
      if (path.includes('packages/app')) {
        return true;
      }
    },
    excludeReactNativeWebExports: [
      'Switch',
      'ProgressBar',
      'Picker',
      'Animated',
      'AnimatedFlatList',
      'VirtualizedList',
      'VirtualizedSectionList',
      'FlatList',
      'CheckBox',
    ],
  }),
]);

module.exports = function (name, { defaultConfig }) {
  defaultConfig.webpack5 = true;
  // defaultConfig.experimental.reactRoot = 'concurrent'
  defaultConfig.typescript.ignoreBuildErrors = true;
  return transform(name, {
    ...defaultConfig,
    webpack5: true,
    experimental: {
      plugins: true,
      scrollRestoration: true,
      legacyBrowsers: false,
      browsersListForSwc: true,
    },
    nx: {
      // Set this to true if you would like to to use SVGR
      // See: https://github.com/gregberge/svgr
      svgr: false,
    },
  });
};
