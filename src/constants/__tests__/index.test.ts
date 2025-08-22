import { describe, it, expect } from 'vitest';
import {
  MAX_TODOS,
  EMPTY_LIST_MESSAGE,
  MAX_TODOS_MESSAGE,
  EMPTY_INPUT_MESSAGE,
} from '../index';

describe('constants', () => {
  it('MAX_TODOS는 5여야 합니다', () => {
    expect(MAX_TODOS).toBe(5);
  });

  it('메시지 상수들이 올바르게 정의되어야 합니다', () => {
    expect(EMPTY_LIST_MESSAGE).toBe('할 일이 없습니다');
    expect(MAX_TODOS_MESSAGE).toBe('최대 5개의 할 일만 추가할 수 있습니다');
    expect(EMPTY_INPUT_MESSAGE).toBe('할 일을 입력해주세요');
  });
});
