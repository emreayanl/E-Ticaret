import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// AŞAĞIDAKİ İKİ SATIR ÇOK ÖNEMLİ
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { ProfileComponent } from './profile/profile';

const routes: Routes = [
  { path: '', component: ProfileComponent }
];

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // BUNLARI KESİNLİKLE EKLEMELİSİNİZ:
    FormsModule,
    ReactiveFormsModule 
  ]
})
export class ProfileModule { }