# CLAUDE.md

이 파일은 MongKids 저장소 전체에 공통으로 적용되는 규칙을 담는다.
영역별 규칙은 각 영역의 `CLAUDE.md`를 따른다. Claude Code는 하위 폴더에서 작업할 때 해당 폴더의 `CLAUDE.md`를 함께 읽는다.

## 프로젝트 개요

- 방문 유아체육 전문 브랜드 **몽키즈**의 웹 서비스
- 프론트엔드와 백엔드를 하나의 저장소에서 관리하는 모노레포

## 저장소 구조

```
MongKids/
├─ CLAUDE.md          저장소 공통 규칙 (이 파일)
├─ docs/              프론트·백 공유 문서
│  ├─ requirements.md   요구사항 (단일 출처)
│  ├─ progress.md       진행 사항
│  ├─ git-workflow.md   브랜치·커밋·PR 규칙
│  └─ design/           디자인 시안
├─ back/              백엔드: Spring Boot REST API  → back/CLAUDE.md
└─ front/             프론트엔드: Vite + React      → front/CLAUDE.md
```

## 문서 지도

| 문서 | 범위 | 내용 |
|---|---|---|
| [docs/requirements.md](docs/requirements.md) | 공유 | 화면·기능 요구사항과 ID |
| [docs/progress.md](docs/progress.md) | 공유 | 영역별 현재 상태, 진행 로그, 다음 할 일 |
| [docs/git-workflow.md](docs/git-workflow.md) | 공유 | 브랜치, 커밋 scope, PR 체크리스트 |
| [docs/design/](docs/design/) | 공유 | 디자인 시안 이미지 |
| [back/CLAUDE.md](back/CLAUDE.md), `back/docs/` | 백엔드 | 아키텍처, 코딩 컨벤션, API, DB, 테스트 |
| [front/CLAUDE.md](front/CLAUDE.md), `front/docs/` | 프론트엔드 | 폴더 구조, 컴포넌트·스타일 규칙 |

- 요구사항은 영역별로 따로 두지 않는다. 항상 `docs/requirements.md`를 갱신하고 영역 문서에서는 ID로 참조한다.
- 영역별 구현 규칙은 공유 문서에 쓰지 않는다. 각 영역의 `docs/`에 둔다.

## 자주 쓰는 명령

```bash
# 백엔드 (back/ 에서)
./gradlew build            # Windows: gradlew.bat build
./gradlew bootRun

# 프론트엔드 (front/ 에서)
npm install
npm run dev
npm run lint && npm run build
```

## Git → [docs/git-workflow.md](docs/git-workflow.md)

- 커밋: Conventional Commits + 영역 scope (`feat(front):`, `fix(back):`, 공통 변경은 scope 생략)
- 프론트와 백 변경은 가능하면 커밋을 나눈다.

## Claude 작업 원칙 (공통)

- 요청 범위 밖의 코드는 수정하지 않는다. 필요해 보이면 먼저 제안한다.
- 새 의존성 추가, 폴더·패키지 구조 변경, 설정 파일 변경은 사용자 확인 후 진행한다.
- 코드를 바꾼 뒤에는 해당 영역의 빌드·검증 명령을 실행하고 결과를 그대로 보고한다.
- 기존 코드의 스타일(들여쓰기, 네이밍, 주석 밀도)을 따른다.
- 요구사항·진행 상황이 바뀌면 `docs/requirements.md`, `docs/progress.md`를 함께 갱신한다.
- 비밀값(DB 접속 정보, API 키 등)은 절대 커밋하지 않는다.
