import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TarefasComponent } from './tarefas/tarefas.component';
import { HomeComponent } from './home/home.component';
import { RankingComponent } from './ranking/ranking.component';
import { TarefaDetailComponent } from './tarefa-detail/tarefa-detail.component';
import { TarefaNewComponent } from './tarefa-new/tarefa-new.component';
import { TarefaEditComponent } from './tarefa-edit/tarefa-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/tarefas', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'tarefas', component: TarefasComponent },
  { path: 'tarefa/:id', component: TarefaDetailComponent},
  { path: 'nova', component: TarefaNewComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'edit/:id', component: TarefaEditComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
