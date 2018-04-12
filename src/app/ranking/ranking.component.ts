import { Component, OnInit } from '@angular/core';

import { Pessoa } from '../pessoa';
import { PessoaService } from '../pessoa.service';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  pessoas: Pessoa[];
  constructor(
    private pessoaService: PessoaService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.start();
    this.getPessoas();
  }

  getPessoas(): void{
    this.pessoaService.getPessoas()
        .subscribe(pessoas => {
          this.pessoas = pessoas;
          this.loadingService.stop();
        });
  }
}
