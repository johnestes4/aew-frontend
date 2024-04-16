import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WresprofileComponent } from './pages/wresprofile/wresprofile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { RankingsComponent } from './pages/rankings/rankings.component';

const routes: Routes = [
  { path: '', component: RankingsComponent},
  { path: 'wrestler', component: WresprofileComponent},
  { path: 'rankings', component: RankingsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
