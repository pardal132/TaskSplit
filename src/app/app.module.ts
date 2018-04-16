import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
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
import { RankingComponent } from './ranking/ranking.component';
import { AngularModulesModule } from './/angular-modules.module';
import { HttpClientModule } from '@angular/common/http';
import { PessoaService } from './pessoa.service';
import { LoadingService } from './loading.service';
import { LoadingComponent } from './loading/loading.component';

import { FormatStatusPipe, IsLatePipe } from './pipes';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    TarefasComponent,
    TarefaDetailComponent,
    TarefaNewComponent,
    TarefaEditComponent,
    MessagesComponent,
    RankingComponent,
    LoadingComponent,
    FormatStatusPipe,
    IsLatePipe
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
    LoadingService,
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
