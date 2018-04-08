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

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  private api = 'http://tasksplit.azurewebsites.net/api';
  private log(message: string): void{
    this.messageService.add('pessoaService: '+message);
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

  getPessoas(): Observable<Pessoa[]>{
    const url = this.api+'/pessoas';
    return this.http.post<Pessoa[]>(url, {'orderBy':'points'}, httpOptions).pipe(
      tap(_ => this.log(`pegou pessoa`)),
      catchError(this.handleError(`getPessoas`,[]))
    );
  }
  
  getPessoa(name: string): Observable<Pessoa>{
    const url = this.api+'/pessoas';
    var busca = {name:name};
    return this.http.post<Pessoa>(url, busca, httpOptions).pipe(
      tap(_ => this.log(`pegou pessoa`)),
      catchError(this.handleError<Pessoa>(`getPessoas`))
    );
  }
}
