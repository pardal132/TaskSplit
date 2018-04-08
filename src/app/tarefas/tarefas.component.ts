import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../tarefa';
import { TarefaService } from '../tarefa.service';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {
  tarefas: Tarefa[];
  constructor(private tarefaService: TarefaService) { }

  ngOnInit() {
    this.getTarefas();
  }

  getTarefas(): void{
    this.tarefaService.getTarefas()
        .subscribe(tarefas => this.tarefas = tarefas);
  }
}
