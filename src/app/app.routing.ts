import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { MainGuardGuard } from './shared/main-guard.guard';
import { UploadComponent } from './Upload/upload.component';
import { LoginComponent } from './login/login.component';
import { HowtoComponent } from './howto/howto.component';
import { AdminmenuComponent } from './adminmenu/adminmenu.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { 
      path: 'howto/:username/:password', 
      canActivate: [MainGuardGuard],
      component: HowtoComponent
    },
    { 
      path: 'upload/:username/:password', 
      canActivate: [MainGuardGuard],
      component: UploadComponent
    },
    { 
      path: 'adminmenu/:username/:password', 
      canActivate: [MainGuardGuard],
      component: AdminmenuComponent
    },
    { path: '', redirectTo:'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
  ]
; 
// sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }