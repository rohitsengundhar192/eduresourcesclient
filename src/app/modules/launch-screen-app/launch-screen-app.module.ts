import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaunchScreenAppRoutingModule } from './launch-screen-app-routing.module';
import { LaunchScreenAppComponent } from './launch-screen-app/launch-screen-app.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreatorViewComponent } from './Components/creator-view/creator-view.component';
import { LoginComponentComponent } from './Components/login-component/login-component.component';
import { TableViewComponent } from './Components/table-view/table-view.component';


@NgModule({
  declarations: [
    LaunchScreenAppComponent,
    CreatorViewComponent,
    LoginComponentComponent,
    TableViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LaunchScreenAppRoutingModule
  ]
})
export class LaunchScreenAppModule { }
