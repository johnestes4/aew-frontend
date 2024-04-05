import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WresprofileComponent } from './pages/wresprofile/wresprofile.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent},
  { path: 'wrestler', component: WresprofileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
