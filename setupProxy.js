// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (root) {
//     root.use(
//         '/api/v1',
//         createProxyMiddleware({
//             target:'https://studymotion-backend.onrender.com',
//             changeOrigin:true,
//             secure: false,
//             headers:{
//                 'Access-Control-Allow-Origin': 'http://localhost:3000'
//             }
//         })
//     )
// }