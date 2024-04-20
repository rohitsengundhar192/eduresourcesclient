import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatorViewComponent } from './Components/creator-view/creator-view.component';
import { LoginComponentComponent } from './Components/login-component/login-component.component';

import { LaunchScreenAppComponent } from './launch-screen-app/launch-screen-app.component';
import { TableViewComponent } from './Components/table-view/table-view.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-component',
    pathMatch: 'full',
  },

  {
    path: 'login-component',
    component: LoginComponentComponent,
  },
  {
    path: 'creator-view',
    component: CreatorViewComponent,
  },
  {
    path: 'table-view',
    component: TableViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaunchScreenAppRoutingModule { }
