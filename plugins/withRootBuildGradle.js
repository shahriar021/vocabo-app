const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = function withRootBuildGradle(config) {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const buildGradlePath = path.join(
        config.modRequest.platformProjectRoot,
        'build.gradle'
      );
      let contents = fs.readFileSync(buildGradlePath, 'utf-8');
      const patch = `\nallprojects {\n  ext.expoProvidesDefaultConfig = true\n}\n`;
      if (!contents.includes('expoProvidesDefaultConfig')) {
        contents += patch;
        fs.writeFileSync(buildGradlePath, contents);
      }
      return config;
    },
  ]);
};