
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

const isMicro = window.__POWERED_BY_QIANKUN__ || false
// eslint-disable-next-line no-undef
const publicPath = __webpack_public_path__ || ''

export {
  isMicro,
  publicPath
}
