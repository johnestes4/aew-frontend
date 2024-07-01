import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { RankingsComponent } from './pages/rankings/rankings.component';
import { RouterLinkDirective } from './directives/routerlink.directive';
import { TonyComponent } from './pages/tony/tony.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    AdminComponent,
    RankingsComponent,
    RouterLinkDirective,
    TonyComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
