import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { TarefaService } from '../tarefa.service';
import { PessoaService } from '../pessoa.service';
import { LoadingService } from '../loading.service';
import { TarefaJSON } from '../tarefa';
import { Pessoa } from '../pessoa';

@Component({
  selector: 'app-tarefa-new',
  templateUrl: './tarefa-new.component.html'
})
export class TarefaNewComponent implements OnInit {
  tarefa: TarefaJSON;
  pessoas: Pessoa[];
  status = [
    {value:-1,name:'incompleta'},
    {value:0,name:'aguardando resposta'},
    {value:1,name:'completa'}
  ];
  
  constructor(
    private tarefaService: TarefaService,
    private pessoaService: PessoaService,
    private loading: LoadingService,
    private location: Location
  ) { }

  ngOnInit() {
    this.tarefa = {} as TarefaJSON;
    this.tarefa.people = [];
    this.pessoaService.getPessoas()
        .subscribe(pessoas => {
          this.pessoas = pessoas.sort((a,b)=>a.name.localeCompare(b.name));
        });
  }

  adcPessoa(): void{
    this.tarefa.people.push({id:'',status:-1,comment:''});
  }
  
  save(): void{
    this.tarefa.people = this.tarefa.people.filter(e=> e.id != undefined);
    this.loading.start();
    this.tarefaService.newTarefa(this.tarefa)
        .subscribe(res=> {
          this.loading.stop();
          if(res.status == 201) this.goBack();
        });
  }

  goBack(): void{
    this.location.back();
  }
}
