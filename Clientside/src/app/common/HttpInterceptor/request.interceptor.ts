import { HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const url: string = req.url;

  if (!url.includes("/login")) {
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
  }

  // For requests that include '/login', pass the original request without modifying it
  return next(req);
};
