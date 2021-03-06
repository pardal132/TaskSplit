import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Pessoa } from './pessoa';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class PessoaService {
  cache: Pessoa[];
  cached: boolean;
  
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {
    this.cache = [];
    this.cached = false;
  }

  private api = 'http://tasksplit.azurewebsites.net/api';
  private log(message: string): void{
    this.messageService.add('pessoaService: '+message);
  }

  getPessoas(): Observable<Pessoa[]>{
    const url = this.api+'/pessoas';
    if(this.cached){
      return of(this.cache);
    }else{
      return this.http.post<Pessoa[]>(url, {'orderBy':'points'}, httpOptions).pipe(
        tap(P => {this.cached = true; this.cache = P}),
        catchError(this.handleError(`getPessoas`,[]))
      );
    }
  }
  
  getPessoa(name: string): Observable<Pessoa>{
    const url = this.api+'/pessoas';
    if(this.cached){
      return of(this.cache.find((el,i,ar) => {
        return el.name == name;
      }));
    }else{
      var busca = {name:name};
      return this.http.post<Pessoa>(url, busca, httpOptions).pipe(
        tap(_ => this.log(`pegou pessoa`)),
        catchError(this.handleError<Pessoa>(`getPessoas`))
      );
    }
  }
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
