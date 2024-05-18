import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { RankingsComponent } from './pages/rankings/rankings.component';

const routes: Routes = [
  { path: '', component: RankingsComponent },
  { path: 'wrestler', component: ProfileComponent },
  { path: 'wrestler/:id', component: ProfileComponent },
  { path: 'rankings', component: RankingsComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
