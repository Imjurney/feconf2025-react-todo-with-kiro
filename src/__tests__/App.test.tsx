import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App 컴포넌트', () => {
  it('애플리케이션 제목이 렌더링되어야 함', () => {
    render(<App />);
    expect(screen.getByText('할 일 목록')).toBeInTheDocument();
    expect(
      screen.getByText('효율적으로 할 일을 관리해보세요 ✨')
    ).toBeInTheDocument();
  });

  it('TodoForm과 TodoList 컴포넌트가 렌더링되어야 함', () => {
    render(<App />);

    // TodoForm 요소들 확인
    expect(
      screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '할 일 추가' })
    ).toBeInTheDocument();

    // 빈 목록 메시지 확인
    expect(screen.getByText('아직 할 일이 없습니다')).toBeInTheDocument();
  });

  it('할 일을 추가할 수 있어야 함', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨');
    const addButton = screen.getByRole('button', { name: '할 일 추가' });

    // 할 일 추가
    fireEvent.change(input, { target: { value: '테스트 할 일' } });
    fireEvent.click(addButton);

    // 추가된 할 일 확인
    expect(screen.getByText('테스트 할 일')).toBeInTheDocument();
    expect(screen.getByText('전체')).toBeInTheDocument(); // 통계 카드 확인
  });

  it('할 일을 완료 상태로 토글할 수 있어야 함', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨');
    const addButton = screen.getByRole('button', { name: '할 일 추가' });

    // 할 일 추가
    fireEvent.change(input, { target: { value: '테스트 할 일' } });
    fireEvent.click(addButton);

    // 체크박스 클릭하여 완료 상태로 변경
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    // 완료 상태 확인
    expect(checkbox).toBeChecked();
    expect(screen.getByText('🎉')).toBeInTheDocument(); // 완료 배지 이모지
  });

  it('할 일을 삭제할 수 있어야 함', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨');
    const addButton = screen.getByRole('button', { name: '할 일 추가' });

    // 할 일 추가
    fireEvent.change(input, { target: { value: '테스트 할 일' } });
    fireEvent.click(addButton);

    // 삭제 버튼 클릭 (호버 시 나타남)
    const todoItem = screen.getByText('테스트 할 일').closest('.todo-item');
    fireEvent.mouseEnter(todoItem!);

    const deleteButton = screen.getByLabelText('테스트 할 일 삭제');
    fireEvent.click(deleteButton);

    // 할 일이 삭제되었는지 확인
    expect(screen.queryByText('테스트 할 일')).not.toBeInTheDocument();
    expect(screen.getByText('아직 할 일이 없습니다')).toBeInTheDocument();
  });

  it('통계 정보가 올바르게 표시되어야 함', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨');
    const addButton = screen.getByRole('button', { name: '할 일 추가' });

    // 여러 할 일 추가
    fireEvent.change(input, { target: { value: '할 일 1' } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: '할 일 2' } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: '할 일 3' } });
    fireEvent.click(addButton);

    // 첫 번째 할 일 완료
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    // 통계 확인 (카드 형태로 변경됨)
    expect(screen.getByText('전체')).toBeInTheDocument();
    expect(screen.getAllByText('완료')).toHaveLength(2); // 배지와 통계 카드에 각각 하나씩
    expect(screen.getByText('남은 할 일')).toBeInTheDocument();
  });

  it('푸터 메시지가 표시되어야 함', () => {
    render(<App />);
    expect(
      screen.getByText('최대 5개의 할 일을 관리할 수 있습니다')
    ).toBeInTheDocument();
  });

  // 통합 테스트: 전체 애플리케이션 플로우
  describe('통합 테스트 - 전체 애플리케이션 플로우', () => {
    it('할 일 추가 → 완료 → 삭제 전체 플로우가 정상 작동해야 함', async () => {
      render(<App />);

      const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨');
      const addButton = screen.getByRole('button', { name: '할 일 추가' });

      // 1. 할 일 추가
      fireEvent.change(input, { target: { value: '첫 번째 할 일' } });
      fireEvent.click(addButton);

      fireEvent.change(input, { target: { value: '두 번째 할 일' } });
      fireEvent.click(addButton);

      // 추가된 할 일들 확인
      expect(screen.getByText('첫 번째 할 일')).toBeInTheDocument();
      expect(screen.getByText('두 번째 할 일')).toBeInTheDocument();

      // 2. 첫 번째 할 일 완료 처리
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]);

      // 완료 상태 확인
      expect(checkboxes[0]).toBeChecked();

      // 완료된 할 일에 취소선 적용 확인
      const firstTodoText = screen.getByText('첫 번째 할 일');
      expect(firstTodoText).toHaveClass('line-through');

      // 3. 완료된 할 일을 다시 미완료로 변경
      fireEvent.click(checkboxes[0]);
      expect(checkboxes[0]).not.toBeChecked();
      expect(firstTodoText).not.toHaveClass('line-through');

      // 4. 할 일 삭제 (호버 후 삭제 버튼 클릭)
      const firstTodoItem = firstTodoText.closest('.todo-item');
      fireEvent.mouseEnter(firstTodoItem!);

      const deleteButton = screen.getByLabelText('첫 번째 할 일 삭제');
      fireEvent.click(deleteButton);

      // 삭제 확인
      expect(screen.queryByText('첫 번째 할 일')).not.toBeInTheDocument();
      expect(screen.getByText('두 번째 할 일')).toBeInTheDocument();

      // 5. 마지막 할 일도 삭제
      const secondTodoItem = screen
        .getByText('두 번째 할 일')
        .closest('.todo-item');
      fireEvent.mouseEnter(secondTodoItem!);

      const remainingDeleteButton = screen.getByLabelText('두 번째 할 일 삭제');
      fireEvent.click(remainingDeleteButton);

      // 빈 목록 상태 확인
      expect(screen.queryByText('두 번째 할 일')).not.toBeInTheDocument();
      expect(screen.getByText('아직 할 일이 없습니다')).toBeInTheDocument();
    });

    it('Enter 키를 사용한 할 일 추가 플로우가 정상 작동해야 함', () => {
      render(<App />);

      const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨');

      // Enter 키로 할 일 추가
      fireEvent.change(input, { target: { value: 'Enter로 추가한 할 일' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      expect(screen.getByText('Enter로 추가한 할 일')).toBeInTheDocument();
      expect(input).toHaveValue('');
    });

    it('여러 할 일의 완료 상태를 개별적으로 관리할 수 있어야 함', () => {
      render(<App />);

      const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨');
      const addButton = screen.getByRole('button', { name: '할 일 추가' });

      // 3개의 할 일 추가
      ['할 일 1', '할 일 2', '할 일 3'].forEach((todo) => {
        fireEvent.change(input, { target: { value: todo } });
        fireEvent.click(addButton);
      });

      const checkboxes = screen.getAllByRole('checkbox');

      // 첫 번째와 세 번째 할 일만 완료 처리
      fireEvent.click(checkboxes[0]);
      fireEvent.click(checkboxes[2]);

      // 완료 상태 확인
      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).toBeChecked();

      // 취소선 적용 확인
      expect(screen.getByText('할 일 1')).toHaveClass('line-through');
      expect(screen.getByText('할 일 2')).not.toHaveClass('line-through');
      expect(screen.getByText('할 일 3')).toHaveClass('line-through');
    });
  });

  // 5개 제한 시나리오 및 엣지 케이스 테스트
  describe('5개 제한 시나리오 및 엣지 케이스', () => {
    it('정확히 5개의 할 일을 추가할 수 있어야 함', () => {
      render(<App />);

      const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨');
      const addButton = screen.getByRole('button', { name: '할 일 추가' });

      // 5개의 할 일 추가
      for (let i = 1; i <= 5; i++) {
        fireEvent.change(input, { target: { value: `할 일 ${i}` } });
        fireEvent.click(addButton);
      }

      // 5개 모두 추가되었는지 확인
      for (let i = 1; i <= 5; i++) {
        expect(screen.getByText(`할 일 ${i}`)).toBeInTheDocument();
      }
    });

    it('5개 제한에 도달하면 입력 필드와 버튼이 비활성화되어야 함', () => {
      render(<App />);

      const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨');
      const addButton = screen.getByRole('button', { name: '할 일 추가' });

      // 5개의 할 일 추가
      for (let i = 1; i <= 5; i++) {
        fireEvent.change(input, { target: { value: `할 일 ${i}` } });
        fireEvent.click(addButton);
      }

      // 입력 필드와 버튼 비활성화 확인
      expect(input).toBeDisabled();
      expect(addButton).toBeDisabled();

      // 제한 메시지 표시 확인
      expect(
        screen.getByText('최대 5개의 할 일만 추가할 수 있습니다')
      ).toBeInTheDocument();
    });

    it('5개 제한 상태에서 할 일을 삭제하면 다시 추가할 수 있어야 함', () => {
      render(<App />);

      const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨');
      const addButton = screen.getByRole('button', { name: '할 일 추가' });

      // 5개의 할 일 추가
      for (let i = 1; i <= 5; i++) {
        fireEvent.change(input, { target: { value: `할 일 ${i}` } });
        fireEvent.click(addButton);
      }

      // 입력 필드 비활성화 확인
      expect(input).toBeDisabled();
      expect(addButton).toBeDisabled();

      // 하나 삭제 (호버 후 삭제)
      const firstTodoItem = screen.getByText('할 일 1').closest('.todo-item');
      fireEvent.mouseEnter(firstTodoItem!);

      const deleteButton = screen.getByLabelText('할 일 1 삭제');
      fireEvent.click(deleteButton);

      // 입력 필드 활성화 확인
      expect(input).not.toBeDisabled();
      expect(addButton).not.toBeDisabled();

      // 새로운 할 일 추가 가능 확인
      fireEvent.change(input, { target: { value: '새로운 할 일' } });
      fireEvent.click(addButton);

      expect(screen.getByText('새로운 할 일')).toBeInTheDocument();
    });

    it('빈 문자열 입력 시 에러 메시지가 표시되어야 함', async () => {
      render(<App />);

      const addButton = screen.getByRole('button', { name: '할 일 추가' });

      // 빈 문자열로 추가 시도
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(screen.getByText('할 일을 입력해주세요')).toBeInTheDocument();
      });

      // 할 일이 추가되지 않았는지 확인
      expect(screen.getByText('아직 할 일이 없습니다')).toBeInTheDocument();
    });

    it('공백만 있는 문자열 입력 시 에러 메시지가 표시되어야 함', async () => {
      render(<App />);

      const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨');
      const addButton = screen.getByRole('button', { name: '할 일 추가' });

      // 공백만 있는 문자열로 추가 시도
      fireEvent.change(input, { target: { value: '   ' } });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(screen.getByText('할 일을 입력해주세요')).toBeInTheDocument();
      });

      // 할 일이 추가되지 않았는지 확인
      expect(screen.getByText('아직 할 일이 없습니다')).toBeInTheDocument();
    });

    it('앞뒤 공백이 있는 텍스트는 트림되어 추가되어야 함', () => {
      render(<App />);

      const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨');
      const addButton = screen.getByRole('button', { name: '할 일 추가' });

      // 앞뒤 공백이 있는 텍스트 입력
      fireEvent.change(input, { target: { value: '  공백 테스트  ' } });
      fireEvent.click(addButton);

      // 트림된 텍스트로 추가되었는지 확인
      expect(screen.getByText('공백 테스트')).toBeInTheDocument();
      expect(screen.queryByText('  공백 테스트  ')).not.toBeInTheDocument();
    });

    it('입력 중 에러 메시지가 사라져야 함', async () => {
      render(<App />);

      const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨');
      const addButton = screen.getByRole('button', { name: '할 일 추가' });

      // 먼저 에러 메시지 표시
      fireEvent.click(addButton);
      await waitFor(() => {
        expect(screen.getByText('할 일을 입력해주세요')).toBeInTheDocument();
      });

      // 입력 시 에러 메시지 사라짐
      fireEvent.change(input, { target: { value: '새로운 할 일' } });
      expect(
        screen.queryByText('할 일을 입력해주세요')
      ).not.toBeInTheDocument();
    });

    it('통계 정보가 실시간으로 업데이트되어야 함', () => {
      render(<App />);

      const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨');
      const addButton = screen.getByRole('button', { name: '할 일 추가' });

      // 초기 상태: 통계 정보 없음
      expect(screen.queryByText('전체')).not.toBeInTheDocument();

      // 할 일 추가
      fireEvent.change(input, { target: { value: '할 일 1' } });
      fireEvent.click(addButton);

      // 통계 정보 표시 확인 (카드 형태)
      expect(screen.getByText('전체')).toBeInTheDocument();
      expect(screen.getByText('완료')).toBeInTheDocument();
      expect(screen.getByText('남은 할 일')).toBeInTheDocument();

      // 완료 처리
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);

      // 통계 업데이트 확인 (완료 배지 표시)
      expect(screen.getByText('🎉')).toBeInTheDocument();

      // 삭제 (호버 후 삭제)
      const todoItem = screen.getByText('할 일 1').closest('.todo-item');
      fireEvent.mouseEnter(todoItem!);

      const deleteButton = screen.getByLabelText('할 일 1 삭제');
      fireEvent.click(deleteButton);

      // 통계 정보 사라짐 확인
      expect(screen.queryByText('전체')).not.toBeInTheDocument();
    });
  });
});
