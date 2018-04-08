import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TaskSplit';
  navLinks = [
    //{path: '/home', label: 'Home'},
    {path: '/tarefas', label: 'Tarefas'},
    {path: '/ranking', label: 'Ranking'}
  ];
}
