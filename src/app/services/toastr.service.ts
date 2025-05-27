// src/app/services/toastr.service.ts
import { Injectable } from '@angular/core';

declare let toastr: any;

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor() {
    toastr.options = {
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-top-right',
      timeOut: 5000, 
      extendedTimeOut: 1000, 
      preventDuplicates: true,
      // Other options: https://github.com/CodeSeven/toastr#options
    };
  }

  success(message: string, title?: string): void {
    toastr.success(message, title);
  }

  error(message: string, title?: string): void {
    toastr.error(message, title);
  }

  warning(message: string, title?: string): void {
    toastr.warning(message, title);
  }

  info(message: string, title?: string): void {
    toastr.info(message, title);
  }

  clear(): void {
    toastr.clear();
  }
}