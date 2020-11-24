// nodejs的脚本配置文件
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    // 多入口对应多页面
    main: './src/main.js'
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    /**
     * name对应entry中的名称
     * hash是随机生成的哈希值
     * chunkhash是针对每个入口文件的hash,只要文件没有改动hash就不变
     * contenthash 根据文件内容生成hash
     */
    filename: '[name].[chunkHash].js',
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
