# HwpLens Web

HwpLens를 소개하고 공식 GitHub 릴리즈로 연결하는 정적 제품 랜딩 페이지입니다. 페이지는
마우스 휠·터치·키보드로 자연스럽게 읽히는 챕터형 스크롤 경험을 제공하며, GitHub API가
응답하지 않아도 검증된 v1.0.3 다운로드 fallback을 유지합니다.

## 로컬 실행

Node.js 18 이상이 있으면 다음 명령으로 미리볼 수 있습니다.

```powershell
npm start
```

브라우저에서 <http://127.0.0.1:4173>을 엽니다.

정적 계약·자산·JavaScript 문법 검사는 다음으로 실행합니다.

```powershell
npm test
```

## 릴리즈 링크 동작

초기 HTML에는 GitHub의 v1.0.3 설치 파일 링크가 들어 있습니다. 브라우저가 로드된 뒤
`https://api.github.com/repos/cybereun/hwplens/releases/latest`를 짧게 조회해 최신 릴리즈의
유효한 `.exe` 자산을 찾습니다. 조회 실패, rate limit, 네트워크 차단, 잘못된 응답이 발생하면
검증된 v1.0.3 링크를 그대로 유지합니다. 새 릴리즈에 설치 파일이 없으면 파일명을 추측하지
않고 해당 GitHub 릴리즈 페이지로만 연결합니다.

## 자산 출처

`assets/`의 앱 로고·아이콘은 `cybereun/hwplens` 저장소의 공식 제품 자산을 로컬 복사한
것입니다. 원본 저장소와 릴리즈는 [GitHub](https://github.com/cybereun/hwplens)에서 확인할
수 있습니다.

## 배포

`index.html`, `styles.css`, `app.js`, `assets/`, `server.cjs`를 포함한 프로젝트 파일을
정적 호스팅에 업로드하면 됩니다. 저장소의 `vercel.json`은 Vercel Framework Preset을
`Other`로 고정하고 빌드 단계를 건너뛰어, 브라우저용 `app.js`가 서버 진입점으로 실행되지
않도록 합니다. Node 서버는 로컬 확인용이며 배포에 필수는 아닙니다.
