# Git 워크플로

## 1. 브랜치

| 브랜치 | 용도 |
|---|---|
| `main` | 배포 가능한 상태 유지. 직접 커밋 지양 |
| `feature/{설명}` | 기능 개발 (`feature/member-signup`) |
| `fix/{설명}` | 버그 수정 |
| `refactor/{설명}` | 동작 변경 없는 구조 개선 |
| `docs/{설명}` | 문서 |
| `chore/{설명}` | 빌드·설정·의존성 |

- 브랜치명은 소문자 kebab-case. 이슈 번호가 있으면 포함 (`feature/12-member-signup`).

## 2. 커밋 메시지 (Conventional Commits)

```
<type>: <요약 (50자 이내, 명령형)>

<본문: 무엇을, 왜 (선택)>
```

| type | 의미 |
|---|---|
| `feat` | 새 기능 |
| `fix` | 버그 수정 |
| `refactor` | 리팩터링 |
| `test` | 테스트 추가/수정 |
| `docs` | 문서 |
| `chore` | 빌드, 설정, 의존성 |
| `style` | 포맷팅 (로직 변경 없음) |

예시:
```
feat: 회원 가입 API 추가
fix: 회원 목록 조회 시 N+1 문제 해결
chore: MariaDB 로컬 profile 설정 추가
```

- 한 커밋에는 하나의 논리적 변경만.
- 요약은 한글 또는 영어 중 하나로 통일 (기존 커밋은 영어 `chore: initialize spring project`).

## 3. Pull Request

- `main` 대상 PR로 병합. 병합 방식은 Squash merge 권장.
- PR 설명: 변경 내용, 변경 이유, 테스트 방법, 관련 이슈.
- 병합 전 체크리스트
  - [ ] `./gradlew build` 통과
  - [ ] 새 기능/수정에 테스트 포함
  - [ ] 비밀값·개인정보 미포함
  - [ ] 아키텍처/컨벤션 변경 시 `CLAUDE.md`, `docs/` 갱신

## 4. 커밋하면 안 되는 것

- `application-local.yml`, `.env` 등 비밀값 파일 (`.gitignore`에 추가 필요)
- `build/`, `.gradle/`, IDE 설정 (이미 `.gitignore`에 포함)
