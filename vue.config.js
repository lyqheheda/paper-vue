// Author: Lin Yunqi
// This code is used to solve cross-domain problem
module.exports = {
//   publicPath: '/',
  devServer: {
    proxy: 'http://10.130.16.1:9000/'
    // proxy:'http://10.129.158.217:9000/'
}
}