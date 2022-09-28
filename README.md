# ⚡️ React App Template ⚡️
> ❗️ Still in progress
## Get Started

```sh
npx @zmzhoi/create-react-app example
cd example
npm start
```

> github 페이지에서 template을 생성하시려면 [여기](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template)를 참고해 주세요.

## Tech Stack

<img src="https://img.shields.io/badge/React-v18-brightgreen?style=flat-square&logo=react&logoColor=61DAFB"/>

<img src="https://img.shields.io/badge/Webpack-v5-brightgreen?style=flat-square&logo=Webpack&logoColor=61DAFB"/>

<img src="https://img.shields.io/badge/WebpackDevServer-v4-brightgreen?style=flat-square&logo=Webpack&logoColor=61DAFB"/>

<img src="https://img.shields.io/badge/Babel-v7-brightgreen?style=flat-square&logo=babel&logoColor=yellow"/>

<img src="https://img.shields.io/badge/Eslint-v8-brightgreen?style=flat-square&logo=eslint&logoColor=blueviolet"/>

## Scripts

**`start`**

app을 시작합니다.

(`WebpackDevServer` 을 구동시켜 [localhost:3000](localhost:3000) 으로 app을 serving 합니다.)

```
npm start
```

**`build`**

app을 빌드합니다.

(빌드 결과물은 build 디렉토리에 생성됩니다.)

```
npm run build
```

**`test`**

테스트를 진행합니다.

```
npm test
```

**`lint`**

소스 코드 린트 검사 및 타입 검사를 진행합니다.

(문제가 있을 경우 에러를 던집니다.)

```
npm run lint
```

**`format`**

소스 코드에 포맷팅에 문제가 없는지 검사합니다.

(문제가 있을 경우 에러를 던집니다.)

```
npm run format
```

**`format:fix`**

소스 코드 포맷팅을 진행합니다.

(포맷팅에 문제가 있는 부분을 강제로 변경합니다.)

```
npm run format:fix
```

## Polyfill

폴리필을 삽입하시려면 먼저 `core-js`를 설치하고:

```sh
npm i core-js@3
```

`src/index.tsx` 파일 최상단에서 `import` 하시면 됩니다:

```javascript
import 'core-js'; // on the top
```

**자세한 커스텀을 원하시면 .browserslistrc 파일을 수정해주세요. 기본값은 defaults 입니다.**

> `browserslist`에 대한 자세한 내용은
> <a href="https://github.com/browserslist/browserslist#readme" target="_blank">여기</a>를 참조해주세요.
