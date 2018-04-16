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
            if(a.doBefore != null){
              if(b.doBefore != null){
                if(a.doBefore < b.doBefore){
                  return -1; // a,b
                }else{
                  return 1; // b,a
                }
              }else{
                return -1; // a,b
              }
            }else if(b.doBefore != null){
              return 1; // b,a
            } // END doBefore
            if(a.createdAt < b.createdAt){
              return 1; // b,a
            } // END createdAt
            return 0;
          });
          this.loading.stop();
        });
  }
}
