# 설계 문서

## 개요

React Todo List 애플리케이션은 사용자가 할 일을 효율적으로 관리할 수 있는 간단하고 직관적인 웹 애플리케이션입니다. TypeScript를 사용하여 타입 안전성을 보장하고, TailwindCSS를 통해 현대적이고 반응형 UI를 제공합니다.

### 전체 구조

```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── TodoItem.tsx    # 개별 할 일 항목 컴포넌트
│   ├── TodoList.tsx    # 할 일 목록 컴포넌트
│   └── TodoForm.tsx    # 할 일 추가 폼 컴포넌트
├── types/              # TypeScript 타입 정의
│   └── todo.ts         # Todo 관련 타입
├── constants/          # 애플리케이션 상수
│   └── index.ts        # 전역 상수 정의
├── utils/              # 유틸리티 함수
│   └── validation.ts   # 입력 검증 함수
├── hooks/              # 커스텀 React 훅
│   └── useTodos.ts     # Todo 상태 관리 훅
└── App.tsx             # 메인 애플리케이션 컴포넌트
```

### 컴포넌트 계층 구조

```
App
├── TodoForm
└── TodoList
    └── TodoItem (여러 개)
```

## 컴포넌트 및 인터페이스

### 1. 타입 정의 (types/todo.ts)

```typescript
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export type TodoAction =
  | { type: 'ADD_TODO'; payload: { text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } };
```

### 2. 상수 정의 (constants/index.ts)

```typescript
export const MAX_TODOS = 5;
export const EMPTY_LIST_MESSAGE = '할 일이 없습니다';
export const MAX_TODOS_MESSAGE = '최대 5개의 할 일만 추가할 수 있습니다';
export const EMPTY_INPUT_MESSAGE = '할 일을 입력해주세요';
```

### 3. 커스텀 훅 (hooks/useTodos.ts)

- Todo 목록 상태 관리
- CRUD 작업 함수 제공
- 로컬 상태 관리 (useState 사용)

### 4. 컴포넌트 설계

#### App.tsx

- 메인 애플리케이션 컨테이너
- 전체 레이아웃 및 스타일링
- TodoForm과 TodoList 컴포넌트 렌더링

#### TodoForm.tsx

- 새로운 할 일 추가 폼
- 입력 검증 및 오류 메시지 표시
- 최대 할 일 개수 제한 처리

#### TodoList.tsx

- 할 일 목록 컨테이너
- 빈 목록 상태 처리
- TodoItem 컴포넌트들 렌더링

#### TodoItem.tsx

- 개별 할 일 항목
- 완료 상태 토글 기능
- 삭제 기능
- 완료된 항목 스타일링 (취소선)

## 데이터 모델

### Todo 인터페이스

```typescript
interface Todo {
  id: string; // 고유 식별자 (UUID 또는 timestamp 기반)
  text: string; // 할 일 내용
  completed: boolean; // 완료 상태
  createdAt: Date; // 생성 시간
}
```

### 상태 관리

- React의 useState를 사용한 로컬 상태 관리
- Todo 배열을 메인 상태로 관리
- 상태 업데이트는 불변성을 유지하며 수행

## 오류 처리

### 입력 검증

- 빈 문자열 입력 방지
- 공백만 있는 입력 방지
- 최대 할 일 개수 제한 (5개)

### 사용자 피드백

- 오류 메시지를 사용자에게 명확히 표시
- 성공적인 작업에 대한 즉각적인 UI 업데이트
- 접근성을 고려한 오류 메시지 제공

### 오류 상태 관리

```typescript
interface ErrorState {
  message: string;
  type: 'validation' | 'limit' | null;
}
```

## 테스트 전략

### 단위 테스트

- 각 컴포넌트의 렌더링 테스트
- 사용자 상호작용 테스트 (클릭, 입력)
- 커스텀 훅 테스트
- 유틸리티 함수 테스트

### 통합 테스트

- 컴포넌트 간 상호작용 테스트
- 전체 워크플로우 테스트 (추가 → 완료 → 삭제)

### 테스트 도구

- Vitest: 테스트 러너
- React Testing Library: 컴포넌트 테스트
- Jest DOM: DOM 매처

### 테스트 케이스

1. **할 일 추가 테스트**

   - 정상적인 할 일 추가
   - 빈 입력 검증
   - 최대 개수 제한 검증

2. **할 일 완료 테스트**

   - 완료 상태 토글
   - 완료된 항목 스타일링

3. **할 일 삭제 테스트**

   - 개별 항목 삭제
   - 목록 업데이트 확인

4. **UI 상태 테스트**
   - 빈 목록 메시지 표시
   - 오류 메시지 표시
   - 반응형 디자인

## 스타일링 및 UI

### TailwindCSS 활용

- 유틸리티 클래스 기반 스타일링
- 반응형 디자인 구현
- 일관된 디자인 시스템

### 디자인 원칙

- 미니멀하고 깔끔한 인터페이스
- 직관적인 사용자 경험
- 접근성 고려 (키보드 네비게이션, ARIA 라벨)

### 색상 및 테마

- 기본 색상: 중성적인 회색 톤
- 강조 색상: 파란색 (추가 버튼, 체크박스)
- 위험 색상: 빨간색 (삭제 버튼)
- 성공 색상: 초록색 (완료된 항목)
