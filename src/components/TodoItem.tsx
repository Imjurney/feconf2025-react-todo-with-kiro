import React from 'react';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * 개별 할 일 항목을 렌더링하는 컴포넌트
 * 체크박스, 텍스트, 삭제 버튼을 포함합니다.
 */
export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
}) => {
  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <div
      className={`todo-item group flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 fade-in ${
        todo.completed
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm'
          : 'bg-white border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 hover:-translate-y-0.5'
      }`}>
      {/* 완료 상태 체크박스 */}
      <div className="relative">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="todo-checkbox w-6 h-6 text-blue-600 bg-white border-2 border-gray-300 rounded-lg focus:ring-blue-500 focus:ring-2 cursor-pointer transition-all duration-200 hover:scale-110"
          aria-label={`${todo.text} 완료 상태 토글`}
        />
        {todo.completed && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-green-600 text-sm font-bold">✓</span>
          </div>
        )}
      </div>

      {/* 할 일 텍스트 - 완료된 경우 취소선 적용 */}
      <span
        className={`flex-1 font-medium select-none transition-all duration-300 ${
          todo.completed
            ? 'line-through text-gray-500 completed-todo'
            : 'text-gray-800 group-hover:text-gray-900'
        }`}>
        {todo.text}
      </span>

      {/* 완료 상태 표시 */}
      {todo.completed && (
        <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
          <span>🎉</span>
          <span>완료</span>
        </div>
      )}

      {/* 삭제 버튼 */}
      <button
        onClick={handleDelete}
        className="btn-danger px-3 py-2 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95"
        aria-label={`${todo.text} 삭제`}>
        <span className="flex items-center gap-1">
          <span>🗑️</span>
          <span className="hidden sm:inline">삭제</span>
        </span>
      </button>
    </div>
  );
};

export default TodoItem;
