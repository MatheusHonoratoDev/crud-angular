import { TestBed } from '@angular/core/testing';

import { LoadingSpinnerInterceptorInterceptor } from './loading-spinner-interceptor.interceptor';

describe('LoadingSpinnerInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoadingSpinnerInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LoadingSpinnerInterceptorInterceptor = TestBed.inject(LoadingSpinnerInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
