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

  constructor(
    private route: ActivatedRoute,
    private tarefaService: TarefaService,
    private pessoaService: PessoaService,
    private loadingService: LoadingService,
    private location: Location
  ) { }

  ngOnInit() {
    this.loadingService.start();
    this.pessoaService.getPessoas()
        .subscribe(pessoas => this.pessoas = pessoas);
    this.getTarefa();
  }

  getTarefa(): void{
    const id = this.route.snapshot.paramMap.get('id');
    this.tarefaService.getTarefa(id)
        .subscribe(t =>{
          this.tarefa = t[0];
          this.loadingService.stop();
        });
  }

  goBack(): void{
    this.location.back();
  }

  adcPessoa(): void{
    this.tarefa.people.push({id:'',status:'',comment:''});
  }
  
  save(): void{
    this.tarefa.people = this.tarefa.people.filter(e=>e.id != undefined);
    this.tarefaService.updateTarefa(this.tarefa)
        .subscribe(res => {
          if(res.status == 200) this.goBack();
        });
  }
}
