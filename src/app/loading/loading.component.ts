import { Component, OnInit } from '@angular/core';

import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit {
  
  constructor(
    public loadingService: LoadingService
  ) { }

  ngOnInit(){
  }
}
