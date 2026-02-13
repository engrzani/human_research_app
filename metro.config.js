const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fix for node: protocol modules on Windows
config.resolver = {
  ...config.resolver,
  resolveRequest: (context, moduleName, platform) => {
    // Skip node: protocol modules that cause ENOENT errors on Windows
    if (moduleName.startsWith('node:')) {
      return {
        type: 'empty',
      };
    }
    return context.resolveRequest(context, moduleName, platform);
  },
};

module.exports = config;
