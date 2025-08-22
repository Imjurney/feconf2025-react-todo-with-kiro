# 햐

2025 FEConf showCase를 위해 제작되었습니다.
100% KIRO의 Spec모드를 이용하여 진행했으며, React와 TypeScript를 사용하여 구축된 간단하고 효율적인 할 일 목록 관리 애플리케이션입니다.

## 🚀 주요 기능

- ✅ **할 일 추가**: 새로운 할 일을 쉽게 추가할 수 있습니다
- 🔄 **완료 상태 토글**: 체크박스를 클릭하여 할 일의 완료 상태를 변경할 수 있습니다
- 🗑️ **할 일 삭제**: 불필요한 할 일을 삭제할 수 있습니다
- 📊 **실시간 통계**: 전체, 완료, 남은 할 일 개수를 실시간으로 확인할 수 있습니다
- 🔒 **5개 제한**: 최대 5개의 할 일만 관리하여 집중력을 높입니다
- 📱 **반응형 디자인**: 모바일과 데스크톱에서 모두 최적화된 UI
- ♿ **접근성**: 키보드 네비게이션과 스크린 리더 지원

## 🛠️ 기술 스택

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS, CSS3
- **Testing**: Vitest, React Testing Library
- **Code Quality**: ESLint, TypeScript

## 📦 설치 및 실행

### 필수 요구사항

- Node.js 18+
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone <repository-url>
cd react-todo-list

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하세요.

### 빌드

```bash
npm run build
```

### 테스트 실행

```bash
# 모든 테스트 실행
npm test

# 테스트 감시 모드
npm run test:watch

# 테스트 커버리지
npm run test:coverage
```

## 🏗️ 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── TodoItem.tsx    # 개별 할 일 항목 컴포넌트
│   ├── TodoList.tsx    # 할 일 목록 컴포넌트
│   ├── TodoForm.tsx    # 할 일 추가 폼 컴포넌트
│   ├── index.ts        # 컴포넌트 내보내기
│   └── __tests__/      # 컴포넌트 테스트
├── types/              # TypeScript 타입 정의
│   └── todo.ts         # Todo 관련 타입
├── constants/          # 애플리케이션 상수
│   └── index.ts        # 전역 상수 정의
├── utils/              # 유틸리티 함수
│   └── validation.ts   # 입력 검증 함수
├── __tests__/          # 통합 테스트
└── App.tsx             # 메인 애플리케이션 컴포넌트
```

## 🧪 테스트

이 프로젝트는 포괄적인 테스트 커버리지를 제공합니다:

- **단위 테스트**: 각 컴포넌트와 유틸리티 함수
- **통합 테스트**: 전체 애플리케이션 플로우
- **엣지 케이스 테스트**: 5개 제한, 입력 검증 등

### 테스트 실행 결과

```bash
Test Files  6 passed (6)
Tests      51 passed (51)
```

## 📋 사용법

1. **할 일 추가**: 입력 필드에 할 일을 입력하고 "추가" 버튼을 클릭하거나 Enter 키를 누르세요
2. **완료 처리**: 할 일 옆의 체크박스를 클릭하여 완료 상태를 토글하세요
3. **삭제**: "삭제" 버튼을 클릭하여 할 일을 제거하세요
4. **통계 확인**: 하단에서 전체, 완료, 남은 할 일 개수를 확인하세요

## 🎨 UI/UX 특징

- **부드러운 애니메이션**: 모든 상호작용에 자연스러운 전환 효과
- **호버 효과**: 버튼과 할 일 항목에 시각적 피드백 제공
- **반응형 디자인**: 모바일부터 데스크톱까지 최적화
- **접근성**: ARIA 라벨과 키보드 네비게이션 지원
- **다크 모드 준비**: CSS 미디어 쿼리로 다크 모드 기본 지원

## 🔧 개발 도구

- **Hot Module Replacement (HMR)**: 개발 중 빠른 리로드
- **TypeScript**: 타입 안전성과 개발자 경험 향상
- **ESLint**: 코드 품질 유지
- **Vitest**: 빠르고 현대적인 테스트 러너

## 📝 라이선스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해 주세요.
