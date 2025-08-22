import React, { useState } from 'react';
import {
  MAX_TODOS,
  MAX_TODOS_MESSAGE,
  EMPTY_INPUT_MESSAGE,
} from '../constants';
import { isValidTodoText } from '../utils/validation';

interface TodoFormProps {
  onAddTodo: (text: string) => void;
  todoCount: number;
}

/**
 * 새로운 할 일을 추가하는 폼 컴포넌트
 * Enter 키, 버튼 클릭으로 추가 가능하며 입력 검증을 수행합니다.
 */
export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo, todoCount }) => {
  const [inputText, setInputText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 최대 할 일 개수에 도달했는지 확인
  const isMaxTodosReached = todoCount >= MAX_TODOS;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo();
  };

  // const handleKeyDown = (e: React.KeyboardEvent) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     addTodo();
  //   }
  // };

  const addTodo = () => {
    // 최대 개수 확인
    if (isMaxTodosReached) {
      setErrorMessage(MAX_TODOS_MESSAGE);
      return;
    }

    // 입력 검증
    if (!isValidTodoText(inputText)) {
      setErrorMessage(EMPTY_INPUT_MESSAGE);
      return;
    }

    // 할 일 추가
    onAddTodo(inputText.trim());
    setInputText('');
    setErrorMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    // 입력 시 에러 메시지 초기화
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  return (
    <div className="mb-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 mb-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            // onKeyDown={handleKeyDown}
            placeholder="새로운 할 일을 입력하세요 ✨"
            disabled={isMaxTodosReached}
            className={`todo-input w-full px-4 py-3 pl-12 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 ${
              isMaxTodosReached
                ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200'
                : 'bg-white text-gray-800 border-gray-200 focus:border-blue-500 shadow-sm hover:shadow-md'
            } ${
              errorMessage
                ? 'border-red-400 error-shake focus:ring-red-500/20'
                : ''
            }`}
            aria-label="새로운 할 일 입력"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <span className="text-gray-400 text-lg">📝</span>
          </div>
        </div>
        <button
          type="submit"
          disabled={isMaxTodosReached}
          className={`btn-primary px-8 py-3 rounded-xl font-semibold focus:outline-none focus:ring-4 transition-all duration-200 ${
            isMaxTodosReached
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 active:scale-95 shadow-lg hover:shadow-xl focus:ring-blue-500/30'
          }`}
          aria-label="할 일 추가">
          <span className="flex items-center gap-2">
            <span>추가</span>
            <span className="text-lg">+</span>
          </span>
        </button>
      </form>

      {/* 에러 메시지 표시 */}
      {errorMessage && (
        <div
          className="flex items-center gap-2 text-red-600 text-sm mt-2 p-3 bg-red-50 border border-red-200 rounded-lg slide-in"
          role="alert"
          aria-live="polite">
          <span className="text-red-500">⚠️</span>
          {errorMessage}
        </div>
      )}

      {/* 최대 개수 도달 시 안내 메시지 */}
      {isMaxTodosReached && (
        <div
          className="flex items-center gap-2 text-orange-600 text-sm mt-2 p-3 bg-orange-50 border border-orange-200 rounded-lg slide-in"
          role="alert"
          aria-live="polite">
          <span className="text-orange-500">🎯</span>
          {MAX_TODOS_MESSAGE}
        </div>
      )}
    </div>
  );
};

export default TodoForm;
