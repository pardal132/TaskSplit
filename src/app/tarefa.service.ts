import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Tarefa } from './tarefa';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class TarefaService {
  cache: Tarefa[];
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
    this.messageService.add('tarefaService: '+message);
  }
  
  getTarefas(): Observable<Tarefa[]>{
    const url = this.api+'/tarefas';
    if(this.cached){
      return of(this.cache);
    }else{
      return this.http.get<Tarefa[]>(this.api+'/tarefas')
        .pipe(
          tap(T => {this.cached = true; this.cache = T}),
          catchError(this.handleError('tarefaService',[]))
        );
    }
  }

  getTarefa(id: string): Observable<Tarefa>{
    const url = this.api+'/busca';
    if(this.cached){
      return of([this.cache.find((el,i,ar) => {
        return el.idTarefa = id;
      })]);
    }else{
      var busca = {id:id};
      return this.http.post<Tarefa>(url, busca, httpOptions).pipe(
        tap(_ => this.log(`pegou tarefa id=${id}`)),
        catchError(this.handleError<Tarefa>(`getTarefa id=${id}`))
      );
    }
  }

  updateTarefa(tarefa: Tarefa): Observable<any> {
    var nova = {};
    [{ a: 'idTarefa', b: 'id' },
     { a: 'description', b: 'description' },
     { a: 'taskName', b: 'name' },
     { a: 'doBefore', b: 'doBefore' },
     { a: 'comment', b: 'comment' },
     { a: 'status', b: 'status' },
     { a: 'idPessoa', b: 'people' },
     { a: 'points', b: 'points' }
    ].forEach(t => {
      if (t.a in tarefa) {
        nova[t.b] = tarefa[t.a];
      }
    });
    return this.http.put(this.api+'/tarefas',nova, httpOptions).pipe(
      tap(_ => this.log(`update tarefa`)),
      catchError(this.handleError<any>('updateTarefa'))
    );
  }

  newTarefa(tarefa: Tarefa): Observable<Tarefa> {
    var nova = {};
    [{ a: 'personName', b: 'people' },
     { a: 'description', b: 'description' },
     { a: 'taskName', b: 'name' },
     { a: 'doBefore', b: 'doBefore' },
     { a: 'comment', b: 'comment' },
     { a: 'status', b: 'status' },
     { a: 'idPessoa', b: 'people' },
     { a: 'points', b: 'points' }
    ].forEach(t => {
      if (t.a in tarefa) {
        nova[t.b] = tarefa[t.a];
      }
    });
    return this.http.post<Tarefa>(this.api+'/tarefas', nova, httpOptions).pipe(
      tap(_ => this.log(`nova tarefa`)),
      catchError(this.handleError<Tarefa>('newTarefa'))      
    );
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
