import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ChangedPasswordLoginComponent } from './changed-password-login/changed-password-login.component';
import { FooterComponent } from './footer/footer.component';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  
];

@NgModule({
  declarations: [ForgotPasswordComponent, HeaderComponent, IndexComponent, RegisterComponent, ChangedPasswordLoginComponent, FooterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes), 
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule, MatInputModule,
  ],
  exports:[
    HeaderComponent,
    RegisterComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
