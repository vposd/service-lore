import { HttpErrorResponse } from '@angular/common/http';

import { RequestProgress } from './request-progress.class';

describe('[Core] RequestProgress', () => {
  it('should get and set state', () => {
    const requestProgress = new RequestProgress();
    requestProgress.state = { progress: true };
    expect(requestProgress.state.progress).toBe(true);
  });

  describe('.success', () => {
    it('should be true when request state is success', () => {
      const requestProgress = new RequestProgress();
      requestProgress.state = { done: true };
      expect(requestProgress.success).toBe(true);

      requestProgress.state = { done: true, error: '' };
      expect(requestProgress.success).toBe(true);
    });

    it('should be true when request state is error or empty id truthy', () => {
      const requestProgress = new RequestProgress();
      requestProgress.state = { done: true, error: 'Error' };
      expect(requestProgress.success).toBe(false);

      requestProgress.state = { done: true, error: 'Error', empty: true };
      expect(requestProgress.success).toBe(false);

      requestProgress.state = { done: true, error: '', empty: true };
      expect(requestProgress.success).toBe(false);
    });
  });

  describe('.error', () => {
    it('should set error', () => {
      const requestProgress = new RequestProgress();
      expect(requestProgress.state.error).toBeUndefined();

      requestProgress.error({
        status: 400,
        statusText: 'Error'
      } as HttpErrorResponse);
      expect(requestProgress.state.error).toBe('Ошибка выполнения операции');
    });

    it('should set default error if error is emoty', () => {
      const requestProgress = new RequestProgress();
      expect(requestProgress.state.error).toBeUndefined();

      requestProgress.error(null);
      expect(requestProgress.state.error).toBe('Ошибка сервера');
    });
  });
});
