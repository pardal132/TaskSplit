import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { TarefaService } from '../tarefa.service';
import { PessoaService } from '../pessoa.service';
import { Tarefa } from '../tarefa';

@Component({
  selector: 'app-tarefa-new',
  templateUrl: './tarefa-new.component.html',
  styleUrls: ['./tarefa-new.component.css']
})
export class TarefaNewComponent implements OnInit {
  tarefa: Tarefa;
  
  constructor(
    private tarefaService: TarefaService,
    private pessoaService: PessoaService,
    private location: Location
  ) { }

  ngOnInit() {
    this.tarefa = {
      id: null,
      idTarefa: null,
      idPessoa: null,
      createdAt: null,
      taskName: null,
      points: null,
      description: null,
      status: null,
      comment: null,
      personName: null,
      doBefore: null
    }
  }

  save(): void{
    if('taskName' in this.tarefa && this.tarefa['taskName'] != null){
      this.tarefa['name'] = this.tarefa['taskName'];
    }
    if('personName' in this.tarefa && this.tarefa['personName'] != null){
      this.pessoaService.getPessoa(this.tarefa['personName'])
          .subscribe(p=>{
            var nova = this.tarefa;
            nova['idPessoa'] = [p[0]['id']];
            this.tarefaService.newTarefa(this.tarefa)
                .subscribe(()=>this.goBack());
          });
    }else{
      this.tarefaService.newTarefa(this.tarefa)
          .subscribe(()=> this.goBack());
    }
  }

  goBack(): void{
    this.location.back();
  }
}
