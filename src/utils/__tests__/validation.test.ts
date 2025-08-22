import { describe, it, expect } from 'vitest';
import { isValidTodoText, generateId } from '../validation';

describe('validation utils', () => {
  describe('isValidTodoText', () => {
    it('빈 문자열은 유효하지 않아야 합니다', () => {
      expect(isValidTodoText('')).toBe(false);
    });

    it('공백만 있는 문자열은 유효하지 않아야 합니다', () => {
      expect(isValidTodoText('   ')).toBe(false);
    });

    it('유효한 텍스트는 true를 반환해야 합니다', () => {
      expect(isValidTodoText('할 일 추가')).toBe(true);
    });

    it('앞뒤 공백이 있는 유효한 텍스트는 true를 반환해야 합니다', () => {
      expect(isValidTodoText('  할 일 추가  ')).toBe(true);
    });
  });

  describe('generateId', () => {
    it('고유한 ID를 생성해야 합니다', () => {
      const id1 = generateId();
      const id2 = generateId();

      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^todo-\d+-[a-z0-9]+$/);
      expect(id2).toMatch(/^todo-\d+-[a-z0-9]+$/);
    });
  });
});
