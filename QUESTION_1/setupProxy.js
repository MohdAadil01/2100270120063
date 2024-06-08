const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/",
    createProxyMiddleware({
      target: "http://20.244.56.144", // Your backend server address
      changeOrigin: true,
    })
  );
};
