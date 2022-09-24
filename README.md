# ⚡ React App Template ⚡

<a href="https://ko.reactjs.org/" target="_blank">React</a>를 빠르게 시작할 수 있는 `Starter-kit` 입니다. React 개발을 위한 최소한의 설정이 되어있습니다.

---

## Tech Stack ☑️

<img src="https://img.shields.io/badge/React-v18-brightgreen?style=flat-square&logo=react&logoColor=61DAFB"/>

<img src="https://img.shields.io/badge/Webpack-v5-brightgreen?style=flat-square&logo=Webpack&logoColor=61DAFB"/>

<img src="https://img.shields.io/badge/WebpackDevServer-v4-brightgreen?style=flat-square&logo=Webpack&logoColor=61DAFB"/>

<img src="https://img.shields.io/badge/Babel-v7-brightgreen?style=flat-square&logo=babel&logoColor=yellow"/>

<img src="https://img.shields.io/badge/Eslint-v8-brightgreen?style=flat-square&logo=eslint&logoColor=blueviolet"/>

## How to start ☑️

### git CLI:

```sh
git clone https://github.com/zmzhoi/tiny-react-app-template.git example
cd my-project
rm .git
git init
git commit -m 'Initial commit'
npm install
npm start
```

### gh CLI:

```sh
// will be filled out.
```

### github:

페이지 상단에 있는 <button style="border: none; padding: 5px 16px; border-radius: 6px; color: white; background-color: #238636;">Use this template</button> 버튼을 클릭하면 자신의 github에 git history 없이 프로젝트를 생성할 수 있습니다.

## Scripts

### `start`

**app을 시작합니다.**

(`WebpackDevServer` 을 구동시켜 [localhost:3000](localhost:3000) 으로 app을 serving 합니다.)

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

**소스 코드 린트 검사를 진행합니다.(문제가 있을 경우 에러를 던집니다.)**

```sh
npm run lint
```

### `format`

**소스 코드에 포맷팅에 문제가 없는지 검사합니다.(문제가 있을 경우 에러를 던집니다.)**

```sh
npm run format
```

### `format:fix`

**소스 코드 포맷팅을 진행합니다.(포맷팅에 문제가 있는 부분을 강제로 변경합니다.)**

```sh
npm run format:fix
```

## Polyfill ☑️

폴리필을 삽입하시려면 먼저 `core-js`를 설치하고:

```sh
npm i core-js@3
```

`src/index.ts` 파일 최상단에서 `import` 하시면 됩니다:

```javascript
import 'core-js'; // on the top
```

**자세한 커스텀을 원하시면 .browserslistrc 파일을 수정해주세요. 기본값은 defaults 입니다.**

> `browserslist`에 대한 자세한 내용은
> <a href="https://github.com/browserslist/browserslist#readme" target="_blank">여기</a>를 참조해주세요.
