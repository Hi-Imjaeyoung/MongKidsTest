# 데이터베이스

## 1. 현재 상태

- 드라이버: `org.mariadb.jdbc:mariadb-java-client` (runtimeOnly)
- `application.properties`에 DataSource 설정이 **없다** → 앱 기동과 `contextLoads` 테스트가 실패한다.

## 2. 설정 가이드 (권장)

`application.properties`를 `application.yml` 기반 profile 구성으로 옮기는 것을 권장한다.

`application.yml` (공통, 커밋 O)
```yaml
spring:
  application:
    name: mongkids
  profiles:
    default: local
  jpa:
    open-in-view: false
    properties:
      hibernate:
        default_batch_fetch_size: 100
        jdbc.time_zone: Asia/Seoul
```

`application-local.yml` (로컬, **gitignore에 추가**)
```yaml
spring:
  datasource:
    url: jdbc:mariadb://localhost:3306/mongkids
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        format_sql: true
logging:
  level:
    org.hibernate.SQL: debug
```

`application-prod.yml` (커밋 O, 값은 환경변수)
```yaml
spring:
  datasource:
    url: ${DB_URL}
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: validate
```

### `ddl-auto` 정책

| 환경 | 값 |
|---|---|
| local | `update` (또는 `create`) |
| test | `create-drop` |
| dev / prod | `validate` 또는 `none` — 스키마 변경은 마이그레이션 스크립트로 |

> 운영 스키마 관리가 필요해지면 Flyway 도입을 검토한다 (의존성 추가는 사용자 확인 후).

## 3. 네이밍

- 테이블·컬럼: **snake_case** (Spring Boot 기본 `CamelCaseToUnderscoresNamingStrategy`가 자동 변환).
- 테이블명은 단수 (`member`, `class_schedule`).
- FK 컬럼: `{참조테이블}_id` (`member_id`).
- 문자셋: `utf8mb4` / `utf8mb4_unicode_ci`.

## 4. JPA 규칙

- 연관관계는 모두 `FetchType.LAZY`. (`@ManyToOne`, `@OneToOne`은 기본값이 EAGER이므로 반드시 명시)
- **N+1 방지**: 목록 조회 시 fetch join(`@Query ... join fetch`) 또는 `@EntityGraph` 사용. `default_batch_fetch_size`로 보조.
- `open-in-view: false` → 지연 로딩은 Service(트랜잭션) 안에서 끝내고 DTO로 변환해서 반환.
- 단순 조회는 Spring Data 메서드 이름 쿼리, 복잡해지면 `@Query`(JPQL).
- 벌크 수정 `@Modifying` 쿼리 후에는 영속성 컨텍스트 정합성 주의 (`clearAutomatically = true`).
- 삭제 정책(soft delete 여부)은 도메인별로 결정하고 Entity에 명시한다.

## 5. BaseTimeEntity (Auditing)

```java
@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseTimeEntity {

	@CreatedDate
	@Column(nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@LastModifiedDate
	@Column(nullable = false)
	private LocalDateTime updatedAt;
}
```

```java
@Configuration
@EnableJpaAuditing
public class JpaConfig {
}
```

> `@EnableJpaAuditing`을 메인 클래스에 붙이면 `@WebMvcTest`가 깨지므로 별도 `JpaConfig`에 둔다.

## 6. JdbcClient 사용 기준

`spring-boot-starter-jdbc`가 포함되어 있지만 기본은 JPA다. 다음 경우에만 `JdbcClient`(Spring 6.1+)를 사용한다.

- 수천 건 이상 대량 insert/update (배치)
- JPQL로 표현이 어려운 복잡한 통계·리포트 쿼리

규칙:
- 해당 도메인의 `repository` 패키지에 `XxxJdbcRepository`로 분리.
- SQL 파라미터는 반드시 named parameter 바인딩 (문자열 결합 금지 — SQL Injection 방지).
- JPA와 같은 트랜잭션 안에서 사용 시 flush 시점 주의.
