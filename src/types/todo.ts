/**
 * Todo 아이템의 기본 인터페이스
 */
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

/**
 * Todo 상태 관리를 위한 액션 타입
 */
export type TodoAction =
  | { type: 'ADD_TODO'; payload: { text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } };
