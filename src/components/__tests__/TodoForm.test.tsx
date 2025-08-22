import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoForm from '../TodoForm';
import { MAX_TODOS_MESSAGE, EMPTY_INPUT_MESSAGE } from '../../constants';

describe('TodoForm', () => {
  const mockOnAddTodo = vi.fn();

  beforeEach(() => {
    mockOnAddTodo.mockClear();
  });

  it('정상적으로 렌더링된다', () => {
    render(
      <TodoForm
        onAddTodo={mockOnAddTodo}
        todoCount={0}
      />
    );

    expect(
      screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '할 일 추가' })
    ).toBeInTheDocument();
  });

  it('텍스트 입력이 정상적으로 작동한다', () => {
    render(
      <TodoForm
        onAddTodo={mockOnAddTodo}
        todoCount={0}
      />
    );

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨');
    fireEvent.change(input, { target: { value: '새로운 할 일' } });

    expect(input).toHaveValue('새로운 할 일');
  });

  it('버튼 클릭으로 할 일을 추가할 수 있다', () => {
    render(
      <TodoForm
        onAddTodo={mockOnAddTodo}
        todoCount={0}
      />
    );

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨');
    const button = screen.getByRole('button', { name: '할 일 추가' });

    fireEvent.change(input, { target: { value: '새로운 할 일' } });
    fireEvent.click(button);

    expect(mockOnAddTodo).toHaveBeenCalledWith('새로운 할 일');
    expect(input).toHaveValue('');
  });

  it('Enter 키로 할 일을 추가할 수 있다', () => {
    render(
      <TodoForm
        onAddTodo={mockOnAddTodo}
        todoCount={0}
      />
    );

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨');

    fireEvent.change(input, { target: { value: '새로운 할 일' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockOnAddTodo).toHaveBeenCalledWith('새로운 할 일');
    expect(input).toHaveValue('');
  });

  it('빈 텍스트 입력 시 에러 메시지를 표시한다', async () => {
    render(
      <TodoForm
        onAddTodo={mockOnAddTodo}
        todoCount={0}
      />
    );

    const button = screen.getByRole('button', { name: '할 일 추가' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(EMPTY_INPUT_MESSAGE)).toBeInTheDocument();
    });
    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  it('공백만 있는 텍스트 입력 시 에러 메시지를 표시한다', async () => {
    render(
      <TodoForm
        onAddTodo={mockOnAddTodo}
        todoCount={0}
      />
    );

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨');
    const button = screen.getByRole('button', { name: '할 일 추가' });

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(EMPTY_INPUT_MESSAGE)).toBeInTheDocument();
    });
    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  it('최대 할 일 개수에 도달하면 입력이 비활성화된다', () => {
    render(
      <TodoForm
        onAddTodo={mockOnAddTodo}
        todoCount={5}
      />
    );

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨');
    const button = screen.getByRole('button', { name: '할 일 추가' });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
    expect(screen.getByText(MAX_TODOS_MESSAGE)).toBeInTheDocument();
  });

  it('최대 할 일 개수에 도달한 상태에서 추가 시도 시 에러 메시지를 표시한다', async () => {
    render(
      <TodoForm
        onAddTodo={mockOnAddTodo}
        todoCount={5}
      />
    );

    const button = screen.getByRole('button', { name: '할 일 추가' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(MAX_TODOS_MESSAGE)).toBeInTheDocument();
    });
    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  it('입력 시 에러 메시지가 초기화된다', async () => {
    render(
      <TodoForm
        onAddTodo={mockOnAddTodo}
        todoCount={0}
      />
    );

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨');
    const button = screen.getByRole('button', { name: '할 일 추가' });

    // 먼저 에러 메시지 표시
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText(EMPTY_INPUT_MESSAGE)).toBeInTheDocument();
    });

    // 입력 시 에러 메시지 사라짐
    fireEvent.change(input, { target: { value: '새로운 할 일' } });
    expect(screen.queryByText(EMPTY_INPUT_MESSAGE)).not.toBeInTheDocument();
  });

  it('앞뒤 공백이 제거된 텍스트로 할 일을 추가한다', () => {
    render(
      <TodoForm
        onAddTodo={mockOnAddTodo}
        todoCount={0}
      />
    );

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요 ✨');
    const button = screen.getByRole('button', { name: '할 일 추가' });

    fireEvent.change(input, { target: { value: '  새로운 할 일  ' } });
    fireEvent.click(button);

    expect(mockOnAddTodo).toHaveBeenCalledWith('새로운 할 일');
  });
});
