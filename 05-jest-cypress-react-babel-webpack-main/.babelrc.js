// allows us to gave treeshaking for the prod bundle and also allow jest to use commonJS in a node env
const isTest = String(process.env.NODE_ENV) === 'test'
const isProd = String(process.env.NODE_ENV) === 'production'

module.exports = {
  presets: [
    ['@babel/preset-env', {modules: isTest ? 'commonjs' : false}],
    '@babel/preset-react',
    [
      '@emotion/babel-preset-css-prop',
      {
        hoist: isProd,
        sourceMap: !isProd,
        autoLabel: isProd ? 'never' : 'always',
        labelFormat: '[filename]--[local]',
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
}
