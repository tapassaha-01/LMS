import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthonticationService } from './authontication.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private authService2: AuthonticationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newReq = request.clone({
      setHeaders: {
        Authorization: `${this.authService2.getToken}`,
      }
    });
    // console.log("intercepted", newReq);
    return next.handle(newReq).pipe(tap(event => {
      // console.log('Intercepted! response', event);
      if (event instanceof HttpResponse) {
        let response = <HttpResponse<any>>event;
        let token = response.headers.get('Authorization');
        if (token && token.length > 0) {
          this.authService2.setToken = token;
        }
      }
    }, error => {
      if (error.status === 401) {
        this.authService2.logout();
        window.location.reload();
      }
    }));
  }

}
