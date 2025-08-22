import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoItem from '../TodoItem';
import type { Todo } from '../../types/todo';

// 테스트용 Mock 데이터
const mockTodo: Todo = {
  id: '1',
  text: '테스트 할 일',
  completed: false,
  createdAt: new Date('2024-01-01'),
};

const mockCompletedTodo: Todo = {
  id: '2',
  text: '완료된 할 일',
  completed: true,
  createdAt: new Date('2024-01-01'),
};

describe('TodoItem 컴포넌트', () => {
  it('할 일 텍스트가 올바르게 렌더링된다', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('테스트 할 일')).toBeInTheDocument();
  });

  it('체크박스가 올바른 상태로 렌더링된다', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('완료된 할 일의 체크박스가 체크된 상태로 렌더링된다', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TodoItem
        todo={mockCompletedTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('완료된 할 일의 텍스트에 취소선이 적용된다', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TodoItem
        todo={mockCompletedTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const todoText = screen.getByText('완료된 할 일');
    expect(todoText).toHaveClass('line-through');
  });

  it('체크박스 클릭 시 onToggle 함수가 호출된다', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith('1');
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it('삭제 버튼 클릭 시 onDelete 함수가 호출된다', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByLabelText('테스트 할 일 삭제');
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith('1');
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('삭제 버튼이 올바르게 렌더링된다', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByLabelText('테스트 할 일 삭제');
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveAttribute('aria-label', '테스트 할 일 삭제');
  });

  it('체크박스에 접근성 라벨이 올바르게 설정된다', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute(
      'aria-label',
      '테스트 할 일 완료 상태 토글'
    );
  });
});
