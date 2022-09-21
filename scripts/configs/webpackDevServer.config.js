const path = require('path');

const paths = require('./paths');
const { fixPublicUrl, toSpecifiedHost } = require('../utils');

/**
 * Reference: https://webpack.kr/configuration/dev-server/#root
 * ❌ 👀 ✨
 */
module.exports = function ({ proxy } = {}) {
  const open = process.env.OPEN_BROWSER !== 'false';
  const host = process.env.HOST || '0.0.0.0';
  const port = parseInt(process.env.PORT, 10) || 3000;

  return {
    allowedHosts: 'auto', // 👀 defaults - ?
    bonjour: false, // ❌ defaults - ?
    historyApiFallback: true, // ✨ SPA는 CSR을 위해 HTML5 History API를 사용하기 때문에 개발 서버는 없는 경로를 요청받아도 index.html을 응답하게 처리해줘야한다. 이 옵션을 활성화하면 없는 url 요청이 들어와도 원래처럼 404를 응답하지 않고 index.html을 응답한다.
    hot: true, // ✨ Hot-Module-Replacement 적용 O
    liveReload: false, // ✨ Live-Reload 적용 X
    open, // ✨ 서버 구동시 브라우저를 실행
    host: toSpecifiedHost(host),
    port, // ✨ 서버 port
    server: 'http', // ✨ default
    compress: true, // ✨ defaults - serve 하는 항목 gzip 여부
    static: {
      // ✨ 정적 파일 제공 옵션
      directory: path.resolve(paths.root, 'public'),
      publicPath: fixPublicUrl(process.env.PUBLIC_URL),
      watch: true, // 지정된 directory 감시. 변경시 페이지 reload.
    },
    webSocketServer: 'ws', // 👀 defaults
    client: {
      logging: 'verbose', // ✨ defaults - 브라우저에서 로그 수준 ('log' | 'info' | 'warn' | 'error' | 'none' | 'verbose')
      overlay: {
        // ✨ 컴파일 오류가 있는 경우 브라우저 화면에 오버레이 표시
        errors: true,
        warnings: false,
      },
      progress: false, // ✨ defaults - 브라우저에서 컴파일 진행률을 백분율로 출력
      reconnect: true, // ✨ defaults - 클라이언트 재연결 시도 횟수 (true === 무제한)
    },
    ...(proxy && { proxy }), // ✨ 개발API 서버에 API 요청을 보낼 때 유용한 Proxy-Middleware 적용 여부
  };
};
