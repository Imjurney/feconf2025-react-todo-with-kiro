import { useState } from 'react';
import type { Todo } from './types/todo';
import { TodoForm, TodoList } from './components';
import { generateId } from './utils/validation';
import './App.css';

/**
 * 메인 Todo 애플리케이션 컴포넌트
 * 전체 상태 관리 및 하위 컴포넌트들을 통합합니다.
 */
function App() {
  // 할 일 목록 상태 관리
  const [todos, setTodos] = useState<Todo[]>([]);

  /**
   * 새로운 할 일을 추가하는 핸들러
   * @param text 추가할 할 일 텍스트
   */
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: generateId(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  /**
   * 할 일의 완료 상태를 토글하는 핸들러
   * @param id 토글할 할 일의 ID
   */
  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /**
   * 할 일을 삭제하는 핸들러
   * @param id 삭제할 할 일의 ID
   */
  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-4 sm:py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* 헤더 */}
        <header className="text-center mb-8 sm:mb-12 fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <span className="text-2xl">✓</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            할 일 목록
          </h1>
          <p className="text-gray-600 text-lg">
            효율적으로 할 일을 관리해보세요 ✨
          </p>
        </header>

        {/* 메인 컨텐츠 */}
        <main className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8 fade-in">
          {/* 할 일 추가 폼 */}
          <TodoForm
            onAddTodo={addTodo}
            todoCount={todos.length}
          />

          {/* 할 일 목록 */}
          <TodoList
            todos={todos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
          />

          {/* 통계 정보 */}
          {todos.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gradient-to-r from-blue-200 to-purple-200 fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {todos.length}
                  </div>
                  <div className="text-sm text-blue-700 font-medium">전체</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {todos.filter((todo) => todo.completed).length}
                  </div>
                  <div className="text-sm text-green-700 font-medium">완료</div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {todos.filter((todo) => !todo.completed).length}
                  </div>
                  <div className="text-sm text-orange-700 font-medium">
                    남은 할 일
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* 푸터 */}
        <footer className="text-center mt-8 sm:mt-12 fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm border border-white/30">
            <span className="text-sm">🎯</span>
            <p className="text-gray-600 text-sm font-medium">
              최대 5개의 할 일을 관리할 수 있습니다
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
