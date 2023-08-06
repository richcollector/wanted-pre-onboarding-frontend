## Info

- 지원자 성명<br/>
  김태완

- 프로젝트 실행방법<br/>
  npm install / npm start

- 배포된 To-Do List<br/>
  [여기를 클랙해 주시면 해당 페이지로 접속됩니다.](http://to-do-list.shop)

## Project

> 원티드 프리온보딩 개인과제로 자신의 일정을 관리 할 수 있는 리스트를 만들 수 있습니다.<br/>
> 기본적인 로그인 / 회원가입과 리스트를 만들 수 있는 CRUD 등 기본적인 내용으로 구성 후<br/>
> access_token으로 로그인 여부를 확인하여, To-Do 페이지 진입을 허가 여부를 판단하였습니다.

## Task Analysis

개발 완료 후, 사용 가능한 라이브러리 목록이라는 부분을 재 검토 후 중간에 수정하였습니다.<br/>
()<br/>
li태그를 사용하라는 부분도, 따로 li 태그 스타일링 한 것을 없앤 후 li 태그를 그대로 사용하였습니다.<br/>
자세한 내용은 [Issues(클릭)](https://github.com/richcollector/wanted-pre-onboarding-frontend/issues) 참조.

## Git Flow

```
main : 최종적으로 문제가 없는 기능을 포함
feature : issue에 부여한 기능을 개발하고, 완료 후 main 브랜치로 Merge
```

## Convention

- Commit

```
  Feat: 기능추가
  Docs: 문서추가 및 수정
  Add: 내용추가
  Style: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
  Refactor: 리팩토링
  Related to: 해당 커밋에 관련된 이슈번호 (아직 해결되지 않은 경우)
  Resolves: 이슈를 해결했을 때 사용
```

- Code

```
  camelCase
  snake_case(access_token)
```

## Annotate

```
/*
    회원가입 스타일 세팅
*/

// To-Do를 추가하는
```

- 상단에 해당 파일의 주제 작성.
- Api 등 주요설명은 한 줄로 간단하게 작성.

## API

```
회원가입: /auth/signup
로그인: /auth/signin
To-Do 추가: /todos (POST)
To-Do 리스트 : /todos (GET)
To-Do 수정: /todos/:id (PUT)
To-Do 삭제: /todos/:id (DELETE)
```

자세한 내용은 [Issues(클릭)](https://github.com/richcollector/wanted-pre-onboarding-frontend/issues) 참조.
