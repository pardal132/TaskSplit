import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TarefaService } from './tarefa.service';
import { TarefasComponent } from './tarefas/tarefas.component';
import { TarefaDetailComponent } from './tarefa-detail/tarefa-detail.component';
import { TarefaNewComponent } from './tarefa-new/tarefa-new.component';
import { TarefaEditComponent } from './tarefa-edit/tarefa-edit.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { RankingComponent } from './ranking/ranking.component';
import { AngularModulesModule } from './/angular-modules.module';
import { HttpClientModule } from '@angular/common/http';
import { PessoaService } from './pessoa.service';
import { LoadingService } from './loading.service';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    TarefasComponent,
    TarefaDetailComponent,
    TarefaNewComponent,
    TarefaEditComponent,
    MessagesComponent,
    HomeComponent,
    RankingComponent,
    LoadingComponent
  ],
  imports: [
    NoopAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularModulesModule,
    HttpClientModule
  ],
  providers: [
    TarefaService,
    MessageService,
    PessoaService,
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
