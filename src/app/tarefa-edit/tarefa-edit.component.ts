import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TarefaService } from '../tarefa.service';
import { PessoaService } from '../pessoa.service';
import { LoadingService } from '../loading.service';
import { TarefaJSON } from '../tarefa';
import { Pessoa } from '../pessoa';

@Component({
  selector: 'app-tarefa-edit',
  templateUrl: './tarefa-edit.component.html'
})
export class TarefaEditComponent implements OnInit {
  @Input() tarefa: TarefaJSON;
  pessoas: Pessoa[];
  status = [
    {value:-1,name:'incompleta'},
    {value:0,name:'aguardando resposta'},
    {value:1,name:'completa'}
  ];

  constructor(
    private route: ActivatedRoute,
    private tarefaService: TarefaService,
    private pessoaService: PessoaService,
    private loading: LoadingService,
    private location: Location
  ) { }

  ngOnInit() {
    this.loading.start();
    this.pessoaService.getPessoas()
        .subscribe(pessoas => this.pessoas = pessoas);
    this.getTarefa();
  }

  getTarefa(): void{
    const id = this.route.snapshot.paramMap.get('id');
    this.tarefaService.getTarefa(id)
        .subscribe(t =>{
          this.tarefa = t[0];
          this.loading.stop();
        });
  }

  goBack(): void{
    this.location.back();
  }

  adcPessoa(): void{
    this.tarefa.people.push({id:'',status:-1,comment:''});
  }
  
  save(): void{
    this.tarefa.people = this.tarefa.people.filter(e=>e.id != undefined);
    this.loading.start();
    this.tarefaService.updateTarefa(this.tarefa)
        .subscribe(res => {
          this.loading.stop();
          if(res.status == 200) this.goBack();
        });
  }
}
