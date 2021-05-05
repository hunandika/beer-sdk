import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import obfuscator from 'rollup-plugin-obfuscator';

const external = Object.keys(pkg.dependencies);

export default [
  {
    input: 'src/index.js',
    external: external,
    plugins: [
      commonjs({ ignoreDynamicRequires: true }),
      resolve({ extensions: ['.js'], exclude: 'node_modules/**' }),
      json(),
      alias({
        entries: [
          { find: '@config', replacement: 'src/config/index.js' },
          { find: '@logger', replacement: 'src/logger/logger.js' },
          { find: '@cache', replacement: 'src/cache/cacheManager.js' },
          { find: '@pJson', replacement: 'package.json' },
        ],
      }),
      obfuscator({
        fileOptions: {
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
          stringArrayEncoding: [],
          stringArrayIndexShift: true,
          stringArrayWrappersCount: 1,
          stringArrayWrappersChainedCalls: true,
          stringArrayWrappersParametersMaxCount: 2,
          stringArrayWrappersType: 'variable',
          stringArrayThreshold: 0.75,
          unicodeEscapeSequence: false,
        },
        include: ['**/*.js'],
        exclude: ['node_modules/**'],
        obfuscator: require('javascript-obfuscator'),
      }),
    ],
    output: {
      format: 'cjs',
      dir: 'dist',
    },
  },
];
