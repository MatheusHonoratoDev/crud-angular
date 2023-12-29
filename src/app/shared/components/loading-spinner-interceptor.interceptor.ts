// loading-spinner.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerComponent } from './spinner/spinner.component';


@Injectable()
export class LoadingSpinnerInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerComponent ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.show();

    return next.handle(req).pipe(
      finalize(() => {
        this.spinnerService.hide();
      })
    );
  }
}
