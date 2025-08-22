import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoList from '../TodoList';
import type { Todo } from '../../types/todo';

describe('TodoList', () => {
  const mockOnToggleTodo = vi.fn();
  const mockOnDeleteTodo = vi.fn();

  const mockTodos: Todo[] = [
    {
      id: '1',
      text: '첫 번째 할 일',
      completed: false,
      createdAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      text: '두 번째 할 일',
      completed: true,
      createdAt: new Date('2024-01-02'),
    },
    {
      id: '3',
      text: '세 번째 할 일',
      completed: false,
      createdAt: new Date('2024-01-03'),
    },
  ];

  beforeEach(() => {
    mockOnToggleTodo.mockClear();
    mockOnDeleteTodo.mockClear();
  });

  it('빈 목록일 때 안내 메시지를 표시한다', () => {
    render(
      <TodoList
        todos={[]}
        onToggleTodo={mockOnToggleTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );

    expect(screen.getByText('아직 할 일이 없습니다')).toBeInTheDocument();
    expect(screen.getByText('📝')).toBeInTheDocument();
  });

  it('할 일 목록을 정상적으로 렌더링한다', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={mockOnToggleTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );

    expect(screen.getByText('첫 번째 할 일')).toBeInTheDocument();
    expect(screen.getByText('두 번째 할 일')).toBeInTheDocument();
    expect(screen.getByText('세 번째 할 일')).toBeInTheDocument();
  });

  it('각 할 일 항목에 체크박스와 삭제 버튼이 있다', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={mockOnToggleTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );

    // 체크박스 확인
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);

    // 삭제 버튼 확인
    const deleteButtons = screen.getAllByText('삭제');
    expect(deleteButtons).toHaveLength(3);
  });

  it('완료된 할 일은 체크박스가 선택되어 있다', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={mockOnToggleTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');

    // 첫 번째 할 일 (미완료)
    expect(checkboxes[0]).not.toBeChecked();

    // 두 번째 할 일 (완료)
    expect(checkboxes[1]).toBeChecked();

    // 세 번째 할 일 (미완료)
    expect(checkboxes[2]).not.toBeChecked();
  });

  it('체크박스 클릭 시 onToggleTodo가 호출된다', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={mockOnToggleTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    expect(mockOnToggleTodo).toHaveBeenCalledWith('1');
  });

  it('삭제 버튼 클릭 시 onDeleteTodo가 호출된다', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={mockOnToggleTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );

    const deleteButtons = screen.getAllByText('삭제');
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDeleteTodo).toHaveBeenCalledWith('1');
  });

  it('할 일이 하나만 있을 때도 정상적으로 렌더링한다', () => {
    const singleTodo: Todo[] = [
      {
        id: '1',
        text: '유일한 할 일',
        completed: false,
        createdAt: new Date('2024-01-01'),
      },
    ];

    render(
      <TodoList
        todos={singleTodo}
        onToggleTodo={mockOnToggleTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );

    expect(screen.getByText('유일한 할 일')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('삭제')).toBeInTheDocument();
  });

  it('할 일 목록이 올바른 순서로 렌더링된다', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={mockOnToggleTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );

    const todoTexts = screen.getAllByText(/할 일/);
    expect(todoTexts[0]).toHaveTextContent('첫 번째 할 일');
    expect(todoTexts[1]).toHaveTextContent('두 번째 할 일');
    expect(todoTexts[2]).toHaveTextContent('세 번째 할 일');
  });
});
