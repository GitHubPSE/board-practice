# board-practice

NestJS를 처음 익히기 위해 만든 게시판 연습 프로젝트입니다. 게시글 CRUD와 회원가입 API를 직접 구현하면서 모듈, 의존성 주입, DTO 검증, TypeORM 사용법을 연습합니다.

## 기술 스택

- NestJS 12, TypeScript
- PostgreSQL, TypeORM
- class-validator, class-transformer (요청 값 검증)
- bcryptjs (비밀번호 해시)
- Jest (테스트), oxlint, Prettier

## 구현한 기능

### 게시글 (`/posts`)

- `GET /posts`: 전체 글 목록을 조회합니다.
- `GET /posts/:id`: 글 하나를 조회합니다. 없으면 404를 돌려줍니다.
- `POST /posts`: 글을 작성합니다. `title`, `content`는 빈 값을 허용하지 않습니다.
- `PATCH /posts/:id`: 글을 수정합니다. 보낸 필드만 바꾸고, 보내지 않은 필드는 그대로 둡니다.
- `DELETE /posts/:id`: 글을 삭제합니다.

### 회원 (`/users`)

- `POST /users/signup`: 회원가입을 처리합니다.
  - 이메일 형식이 아니거나 비밀번호가 8자 미만이면 400을 돌려줍니다.
  - 이미 가입된 이메일이면 409를 돌려줍니다.
  - 비밀번호는 bcrypt로 해시해서 저장합니다. 응답에는 비밀번호를 넣지 않고 `id`, `email`, `createdAt`만 돌려줍니다.

## 프로젝트 구조

```
src/
├─ main.ts            # 앱 시작, 전역 ValidationPipe 등록
├─ app.module.ts      # 환경 변수(ConfigModule)와 DB 연결(TypeORM) 설정
├─ post/              # 게시글 모듈
│  ├─ post.controller.ts
│  ├─ post.service.ts
│  ├─ post.entity.ts  # posts 테이블
│  └─ dto/            # 작성·수정 요청 DTO
└─ user/              # 회원 모듈
   ├─ user.controller.ts
   ├─ user.service.ts
   ├─ user.entity.ts  # users 테이블 (email unique)
   └─ dto/            # 가입 요청·응답 DTO
test.http             # API 수동 테스트용 요청 모음
```

## 실행 방법

### 1. 준비

- Node.js
- 실행 중인 PostgreSQL과 사용할 데이터베이스

### 2. 환경 변수 설정

`.env.example`을 복사해 `.env`를 만들고 값을 채웁니다. `.env`는 Git에 올리지 않습니다.

```bash
cp .env.example .env
```

- `DB_HOST`, `DB_PORT`: PostgreSQL 주소와 포트입니다.
- `DB_USERNAME`, `DB_PASSWORD`: DB 계정입니다.
- `DB_DATABASE`: 사용할 데이터베이스 이름입니다.
- `PORT`: 서버 포트입니다. 키 자체가 없으면 3000을 씁니다.

### 3. 설치와 실행

```bash
npm install
npm run start:dev
```

TypeORM의 `synchronize: true` 설정 때문에 서버가 시작될 때 엔티티에 맞춰 테이블이 자동으로 만들어지거나 바뀝니다. 연습용 설정이므로 실제 서비스 DB에서는 쓰지 않습니다.

## 테스트

- API 확인: `test.http`의 요청을 IntelliJ나 VS Code(REST Client 확장)에서 실행합니다. 정상 응답과 400·404·409 같은 실패 응답을 함께 확인할 수 있습니다.
- 자동 테스트: `npm test` (단위), `npm run test:e2e` (e2e)
