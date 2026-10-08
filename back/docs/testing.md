# 테스트

## 1. 원칙

- 새 기능과 버그 수정에는 테스트를 함께 작성한다. 버그 수정은 재현 테스트 먼저.
- 테스트는 서로 독립적이어야 한다 (실행 순서·공유 상태 의존 금지).
- 커밋 전 `./gradlew test` 통과.

## 2. 테스트 종류

| 대상 | 도구 | 비고 |
|---|---|---|
| Entity / 도메인 로직 | 순수 JUnit 5 | Spring 컨텍스트 없이, 가장 빠름 |
| Service | JUnit 5 + Mockito (`@ExtendWith(MockitoExtension.class)`) | Repository를 mock |
| Controller | `@WebMvcTest(XxxController.class)` + `MockMvc` | Service는 `@MockitoBean` |
| Repository | `@DataJpaTest` | 커스텀 쿼리(`@Query`, fetch join)만 테스트 |
| 통합 | `@SpringBootTest` | 핵심 시나리오 위주로 최소한 |

> Spring Boot 4: `@MockBean`은 제거되었다 → `@MockitoBean`(Spring Framework) 사용.
> 테스트 슬라이스 어노테이션은 `spring-boot-starter-*-test` 모듈별 패키지에 있으므로 import 경로를 확인한다.

## 3. 테스트 DB 전략

- 현재 테스트 의존성에 H2/Testcontainers가 없다.
- 권장: 실제 DB와 동일한 **Testcontainers(MariaDB)** 도입. 차선책으로 H2(MariaDB 모드).
  - 어느 쪽이든 의존성 추가는 사용자 확인 후 진행.
- 테스트 설정은 `src/test/resources/application-test.yml` + `@ActiveProfiles("test")`.

## 4. 작성 규칙

- 위치: 대상 클래스와 같은 패키지, 이름은 `{대상}Test` (`MemberServiceTest`).
- 메서드 이름은 영문 `메서드_상황_결과` 또는 자유롭게 짓고, **`@DisplayName`에 한글로 의도**를 적는다.
- given / when / then 주석으로 구분.
- 검증은 AssertJ(`assertThat`), 예외는 `assertThatThrownBy`.

```java
@ExtendWith(MockitoExtension.class)
class MemberServiceTest {

	@Mock
	private MemberRepository memberRepository;

	@InjectMocks
	private MemberService memberService;

	@Test
	@DisplayName("존재하지 않는 회원을 조회하면 MEMBER_NOT_FOUND 예외가 발생한다")
	void getMember_notFound_throwsException() {
		// given
		given(memberRepository.findById(1L)).willReturn(Optional.empty());

		// when & then
		assertThatThrownBy(() -> memberService.getMember(1L))
			.isInstanceOf(BusinessException.class)
			.extracting("errorCode")
			.isEqualTo(ErrorCode.MEMBER_NOT_FOUND);
	}
}
```

## 5. 실행

```bash
./gradlew test                                          # 전체
./gradlew test --tests "*MemberServiceTest"             # 클래스
./gradlew test --tests "*MemberServiceTest.getMember*"  # 메서드 패턴
```

결과 리포트: `build/reports/tests/test/index.html`
