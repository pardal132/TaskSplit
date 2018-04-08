import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../tarefa';
import { TarefaService } from '../tarefa.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
  tarefas: Tarefa[] = [];
  
  constructor(private tarefaService: TarefaService) { }
  
  ngOnInit() {
    this.getTarefas();
  }
  
  getTarefas(): void {
    this.tarefaService.getTarefas()
        .subscribe(tarefas => this.tarefas = tarefas.slice(1, 5));
  }
}
