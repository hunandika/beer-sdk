import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import obfuscatorPlugin from 'rollup-plugin-javascript-obfuscator';
import pkg from './package.json';

const external = Object.keys(pkg.dependencies);

export default [
  {
    input: 'src/index.js',
    external,
    plugins: [
      commonjs({ ignoreDynamicRequires: true }),
      resolve({ extensions: ['.js'], exclude: 'node_modules/**' }),
      json(),
      alias({
        entries: [
          { find: '@config', replacement: 'src/config/index.js' },
          { find: '@logger', replacement: 'src/logger/logger.js' },
          { find: '@cache', replacement: 'src/cache/cacheManager.js' },
          { find: '@mongPlug', replacement: 'src/mongoose_plugin/index.js' },
          { find: '@pJson', replacement: 'package.json' },
        ],
      }),
      obfuscatorPlugin({
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        debugProtection: false,
        debugProtectionInterval: false,
        disableConsoleOutput: false,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: false,
        renameGlobals: false,
        rotateStringArray: true,
        selfDefending: false,
        shuffleStringArray: true,
        simplify: true,
        splitStrings: false,
        stringArray: true,
        stringArrayEncoding: true,
        stringArrayIndexShift: true,
        stringArrayWrappersCount: 1,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 2,
        stringArrayWrappersType: 'variable',
        stringArrayThreshold: 0.75,
        unicodeEscapeSequence: false,
        include: ['**/*.js'],
        exclude: ['node_modules/**'],
      }),
    ],
    output: {
      format: 'cjs',
      dir: 'dist',
    },
  },
];
