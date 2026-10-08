# MongKids

방문 유아체육 전문 브랜드 **몽키즈**의 웹 서비스입니다. 프론트엔드와 백엔드를 이 저장소 하나에서 관리합니다.

| 폴더 | 내용 | 스택 |
|---|---|---|
| [`back/`](back/) | REST API 서버 | Java 17, Spring Boot 4, Gradle, MariaDB |
| [`front/`](front/) | 웹 프론트엔드 | React 19, Vite 8 |
| [`docs/`](docs/) | 공유 문서 | 요구사항, 진행 사항, Git 규칙, 디자인 시안 |

## 실행

### 백엔드

```bash
cd back
./gradlew bootRun    # Windows: gradlew.bat bootRun
```

> DB 설정이 아직 없어 현재는 기동에 실패합니다. [진행 사항](docs/progress.md)을 참고하세요.

### 프론트엔드

```bash
cd front
npm install
npm run dev
```

## 문서

- [요구사항](docs/requirements.md)
- [진행 사항](docs/progress.md)
- [Git 워크플로](docs/git-workflow.md)
- 개발 규칙: [백엔드](back/CLAUDE.md), [프론트엔드](front/CLAUDE.md)
