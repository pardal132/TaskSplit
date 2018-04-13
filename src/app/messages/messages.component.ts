import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
    public messageService: MessageService){}

  ngOnInit() {
  }

  openSnackBarTemp(message: string) {
    this.snackBar.open(message,'fechar',{duration:1000});
  }
  openSnackBar(message: string) {
    this.snackBar.open(message,'fechar');
  }
}
