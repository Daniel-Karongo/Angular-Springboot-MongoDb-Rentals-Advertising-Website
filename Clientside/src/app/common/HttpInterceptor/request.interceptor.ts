import { HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  // Get the token from localStorage or a service
  const token = localStorage.getItem('authToken');  // Replace this with your token fetching logic

  // Clone the request and add the Authorization header if the token exists
  const authReq = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });

  // Pass the cloned request to the next handler
  return next(authReq);
};