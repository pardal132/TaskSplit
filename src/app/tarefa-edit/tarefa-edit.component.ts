import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TarefaService } from '../tarefa.service';
import { PessoaService } from '../pessoa.service';
import { LoadingService } from '../loading.service';
import { Tarefa } from '../tarefa';

@Component({
  selector: 'app-tarefa-edit',
  templateUrl: './tarefa-edit.component.html',
  styleUrls: ['./tarefa-edit.component.css']
})
export class TarefaEditComponent implements OnInit {
  @Input() tarefa: Tarefa;

  constructor(
    private route: ActivatedRoute,
    private tarefaService: TarefaService,
    private pessoaService: PessoaService,
    private loadingService: LoadingService,
    private location: Location
  ) { }

  ngOnInit() {
    this.loadingService.start();
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

  save(): void{
    if('personName' in this.tarefa && this.tarefa['personName'] != null){
      this.pessoaService.getPessoa(this.tarefa['personName'])
          .subscribe(p=>{
            var nova = this.tarefa;
            nova['idPessoa'] = [p[0]['id']];
            this.tarefaService.updateTarefa(nova)
                .subscribe(()=> this.goBack());
          });
    }else{
      this.tarefaService.updateTarefa(this.tarefa)
          .subscribe(()=> this.goBack());
    }
  }
}
