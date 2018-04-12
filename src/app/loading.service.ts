import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
  loading: boolean;
  
  constructor() { }

  set(value: boolean){
    this.loading = value;
  }
  start(){
    this.set(true);
  }
  stop(){
    this.set(false);
  }
}
