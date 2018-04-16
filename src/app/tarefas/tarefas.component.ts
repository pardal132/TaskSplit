import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../tarefa';
import { TarefaService } from '../tarefa.service';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {
  tarefas: Tarefa[];

  constructor(
    private tarefaService: TarefaService,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    this.loading.start()
    this.getTarefas();
  }

  getTarefas(): void{
    this.tarefaService.getTarefas()
        .subscribe(tarefas => {
          this.tarefas = tarefas;
          this.loading.stop();
        });
  }
}
