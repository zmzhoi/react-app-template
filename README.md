# Tiny React App Template (⚡Starter kit⚡)

[React](https://ko.reactjs.org/)를 빠르게 시작할 수 있는 `Starter-kit` 입니다.

---

## Tech Stack ☑️

<img src="https://img.shields.io/badge/React-v18-brightgreen?style=flat&logo=react&logoColor=61DAFB"/>

<img src="https://img.shields.io/badge/Webpack-v5-brightgreen?style=flat&logo=Webpack&logoColor=61DAFB"/>

<img src="https://img.shields.io/badge/WebpackDevServer-v4-brightgreen?style=flat&logo=Webpack&logoColor=61DAFB"/>

<img src="https://img.shields.io/badge/Babel-v7-brightgreen?style=flat&logo=babel&logoColor=yellow"/>

<img src="https://img.shields.io/badge/Eslint-v8-brightgreen?style=flat&logo=eslint&logoColor=blueviolet"/>

## How to start ☑️

```sh
git clone https://github.com/zmzhoi my-project
cd my-project
npm install
npm start
```

## Scripts

### `start`

**app을 시작합니다.**

(`WebpackDevServer` 을 구동시켜 [localhost:3000](localhost:3000) 으로 app을 serve 합니다.)

```sh
npm start
```

### `build`

**app을 빌드합니다.**

(빌드 결과물은 build 디렉토리에 생성됩니다.)

```sh
npm run build
```

### `lint`

**소스 코드 린트 검사를 진행합니다.**

```sh
npm run lint
```

### `format`

**소스 코드에 포맷팅에 문제가 없는지 검사합니다.**

```sh
npm run format
```

### `format:fix`

**소스 코드 포맷팅을 진행합니다.**

```sh
npm run format:fix
```

## Polyfill ☑️

폴리필을 사용하시려면 먼저 `core-js`를 설치하고:

```sh
npm i core-js@3
```

`src/index.ts` 파일 최상단에서 `import` 하시면 됩니다:

```javascript
import 'core-js'; // on the top
```

**자세한 설정 커스텀을 원하시면 .browserslistrc 파일을 수정해주세요. 기본값은 defaults 입니다.**

> `browserslist`에 대한 자세한 내용은 [여기](https://github.com/browserslist/browserslist#readme)를 참조해주세요.
