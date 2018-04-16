import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { TarefaService } from '../tarefa.service';
import { PessoaService } from '../pessoa.service';
import { TarefaJSON } from '../tarefa';
import { Pessoa } from '../pessoa';

@Component({
  selector: 'app-tarefa-new',
  templateUrl: './tarefa-new.component.html'
})
export class TarefaNewComponent implements OnInit {
  tarefa: TarefaJSON;
  pessoas: Pessoa[];
  
  constructor(
    private tarefaService: TarefaService,
    private pessoaService: PessoaService,
    private location: Location
  ) { }

  ngOnInit() {
    this.tarefa = {} as TarefaJSON;
    this.tarefa.people = [];
    this.pessoaService.getPessoas()
        .subscribe(pessoas => {
          this.pessoas = pessoas;
        });
  }

  adcPessoa(): void{
    this.tarefa.people.push({id:'',status:'',comment:''});
  }
  
  save(): void{
    this.tarefa.people = this.tarefa.people.filter(e=> e.id != undefined);
    this.tarefaService.newTarefa(this.tarefa)
        .subscribe(res=> {
          if(res.status == 200) this.goBack();
        });
  }

  goBack(): void{
    this.location.back();
  }
}
