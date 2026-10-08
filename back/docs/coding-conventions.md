# 코딩 컨벤션

## 1. 일반

- 들여쓰기는 **탭** (Initializr 생성 코드 기준), 파일 끝 개행.
- 와일드카드 import(`*`) 금지.
- `Optional`은 반환 타입에만 사용 (필드·파라미터 금지).
- 매직 넘버/문자열은 상수나 enum으로.
- 주석은 "왜"를 설명할 때만. 코드로 표현 가능한 "무엇"은 주석 대신 이름으로.

## 2. 네이밍

| 대상 | 규칙 | 예시 |
|---|---|---|
| 클래스 | PascalCase, 레이어 접미사 | `MemberController`, `MemberService`, `MemberRepository` |
| Entity | 단수 명사, 접미사 없음 | `Member`, `Order` |
| 요청 DTO | `{도메인}{행위}Request` | `MemberCreateRequest`, `MemberUpdateRequest` |
| 응답 DTO | `{도메인}{용도}Response` | `MemberResponse`, `MemberDetailResponse` |
| 메서드 | camelCase, 동사로 시작 | `createMember`, `findById`, `cancel` |
| 상수 | UPPER_SNAKE_CASE | `MAX_PAGE_SIZE` |
| 패키지 | 소문자, 단어 하나 | `member`, `order` |

Service 메서드 접두사: 조회 `get`(없으면 예외) / `find`(없을 수 있음), 생성 `create`, 수정 `update`, 삭제 `delete`.

## 3. Lombok

| 허용 | 금지 |
|---|---|
| `@Getter`, `@RequiredArgsConstructor`, `@Builder`, `@NoArgsConstructor(access = PROTECTED)`, `@Slf4j` | `@Setter`, `@Data`, `@AllArgsConstructor`(단독), Entity에 `@ToString`·`@EqualsAndHashCode` |

- DTO는 `record`를 쓰므로 Lombok이 필요 없다.

## 4. Entity

```java
@Entity
@Table(name = "member")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 50)
	private String name;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 20)
	private MemberRole role;

	@Builder
	private Member(String name, MemberRole role) {
		this.name = name;
		this.role = role;
	}

	public void changeName(String name) {
		this.name = name;
	}
}
```

- PK는 `Long id` + `IDENTITY`.
- enum은 반드시 `EnumType.STRING`.
- 연관관계는 `fetch = FetchType.LAZY` 명시. 양방향은 꼭 필요할 때만, 연관관계 편의 메서드 작성.
- 컬렉션 필드는 `new ArrayList<>()`로 초기화.

## 5. DTO

```java
public record MemberCreateRequest(
	@NotBlank @Size(max = 50) String name,
	@NotNull MemberRole role
) {
	public Member toEntity() {
		return Member.builder().name(name).role(role).build();
	}
}

public record MemberResponse(Long id, String name, MemberRole role) {
	public static MemberResponse from(Member member) {
		return new MemberResponse(member.getId(), member.getName(), member.getRole());
	}
}
```

- 요청 DTO → Entity: `toEntity()`, Entity → 응답 DTO: `static from()`.
- 검증 어노테이션은 요청 DTO에 둔다.

## 6. Service

```java
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

	private final MemberRepository memberRepository;

	public MemberResponse getMember(Long id) {
		Member member = memberRepository.findById(id)
			.orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND));
		return MemberResponse.from(member);
	}

	@Transactional
	public Long createMember(MemberCreateRequest request) {
		return memberRepository.save(request.toEntity()).getId();
	}
}
```

- 클래스 레벨 `@Transactional(readOnly = true)`, 쓰기 메서드만 `@Transactional`.
- 수정은 dirty checking 사용 (조회 → Entity 메서드 호출, `save()` 재호출 불필요).
- 인터페이스/구현체 분리(`MemberServiceImpl`)는 구현이 여러 개일 때만.

## 7. Controller

```java
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
public class MemberController {

	private final MemberService memberService;

	@GetMapping("/{memberId}")
	public ApiResponse<MemberResponse> getMember(@PathVariable Long memberId) {
		return ApiResponse.success(memberService.getMember(memberId));
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ApiResponse<Long> createMember(@RequestBody @Valid MemberCreateRequest request) {
		return ApiResponse.success(memberService.createMember(request));
	}
}
```

- Controller에 try-catch 금지. 예외는 `GlobalExceptionHandler`에 맡긴다.

## 8. 예외

```java
@Getter
@RequiredArgsConstructor
public enum ErrorCode {
	// common
	INVALID_INPUT(HttpStatus.BAD_REQUEST, "C001", "잘못된 입력입니다."),
	INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "C999", "서버 오류가 발생했습니다."),
	// member
	MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "M001", "회원을 찾을 수 없습니다.");

	private final HttpStatus status;
	private final String code;
	private final String message;
}
```

- 코드 접두사: 공통 `C`, 도메인별 첫 글자(겹치면 두 글자).
- `RuntimeException`, `IllegalArgumentException`을 직접 던지지 말고 `BusinessException(ErrorCode)` 사용.

## 9. 로깅

- `@Slf4j` 사용, `System.out.println` 금지.
- 파라미터는 `{}` 플레이스홀더 (`log.info("member created id={}", id)`).
- 개인정보(이름·연락처 등 아동 관련 정보 포함)와 비밀값은 로그에 남기지 않는다.
- 레벨: 예상된 비즈니스 예외 `warn`, 예상치 못한 예외 `error`(스택트레이스 포함).
