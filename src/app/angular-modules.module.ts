import { NgModule } from '@angular/core';

import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    MatButtonModule, MatCheckboxModule, MatTabsModule, MatToolbarModule,
    MatCardModule, MatFormFieldModule, MatSnackBarModule, MatChipsModule,
    MatDividerModule, MatIconModule, MatInputModule,
  ],
  exports: [
    MatButtonModule, MatCheckboxModule, MatTabsModule, MatToolbarModule,
    MatCardModule, MatFormFieldModule, MatSnackBarModule, MatChipsModule,
    MatDividerModule, MatIconModule, MatInputModule,
  ]
})
export class AngularModulesModule { }
