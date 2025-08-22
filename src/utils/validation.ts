/**
 * 입력 검증 관련 유틸리티 함수들
 */

/**
 * 텍스트 입력이 유효한지 검증
 * @param text 검증할 텍스트
 * @returns 유효하면 true, 그렇지 않으면 false
 */
export const isValidTodoText = (text: string): boolean => {
  return text.trim().length > 0;
};

/**
 * 고유한 ID 생성
 * @returns 타임스탬프 기반 고유 ID
 */
export const generateId = (): string => {
  return `todo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
