import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LoadingService } from '../loading.service';
import { TarefaService } from '../tarefa.service';
import { Tarefa } from '../tarefa';

@Component({
  selector: 'app-tarefa-detail',
  templateUrl: './tarefa-detail.component.html'
})
export class TarefaDetailComponent implements OnInit {
  @Input() tarefa: Tarefa;
  
  constructor(
    private route: ActivatedRoute,
    private tarefaService: TarefaService,
    private location: Location,
    private loadingService: LoadingService
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
  

}
