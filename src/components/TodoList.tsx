import React from 'react';
import type { Todo } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

/**
 * 할 일 목록을 렌더링하는 컴포넌트
 * 빈 목록일 때는 안내 메시지를 표시합니다.
 */
export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleTodo,
  onDeleteTodo,
}) => {
  // 빈 목록인 경우 안내 메시지 표시
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
          <span className="text-3xl">📝</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          아직 할 일이 없습니다
        </h3>
        <p className="text-gray-500 text-base max-w-sm mx-auto">
          위의 입력 필드에 새로운 할 일을 추가해보세요! ✨
        </p>
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
            <span>💡</span>
            <span>팁: Enter 키로도 추가할 수 있어요</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo, index) => (
        <div
          key={todo.id}
          className="animate-in slide-in-from-left duration-300"
          style={{ animationDelay: `${index * 100}ms` }}>
          <TodoItem
            todo={todo}
            onToggle={onToggleTodo}
            onDelete={onDeleteTodo}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
