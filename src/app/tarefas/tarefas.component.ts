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
          this.tarefas = tarefas.filter(t=>{
            if(t.people.length == 0)
              return true;
            if(t.people.map(e=>e.status == 1)
                .reduce((a,b)=>a&&b) == true)
              return false;
            return true;
          }).sort((a,b)=>{
            if('doBefore' in a && 'doBefore' in b
               && a.doBefore < b.doBefore){
              return -1;
            }
            if(a.createdAt < b.createdAt){
              return 1;
            }
            return 0;
          });
          this.loading.stop();
        });
  }
}
