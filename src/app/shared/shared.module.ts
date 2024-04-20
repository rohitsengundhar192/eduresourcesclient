
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { DeleteConfirmDialogComponent } from './dialogs/delete-confirm-dialog/delete-confirm-dialog.component';

import { LoginComponent } from './dialogs/login/login.component';
import { NoInternetComponent } from './dialogs/no-internet/no-internet.component';
import { UnsavedChangesGuard } from './guards/unsaved-changes/unsaved-changes.guard';
import { MaterialModule } from './material.module';
import { EllipsisPipe } from './pipes/ellipsis/ellipsis.pipe';
import { NoSanitizePipe } from './pipes/no-sanitize/no-sanitize.pipe';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { SpinnerComponent } from './services/custom-spinner/spinner.component';
import { TimePipe } from './pipes/time.pipe';
import { UserProfileCardComponent } from './dialogs/user-profile-card/user-profile-card.component';




const BASE_MODULES = [
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
];

const Guards = [UnsavedChangesGuard];

const Pipes = [
  EllipsisPipe,
  NoSanitizePipe,
  TimeFormatPipe,
  TimePipe
];

const Directives:any[] = [];

@NgModule({
  declarations: [
    Pipes,
    Directives,
    LoginComponent,
    SpinnerComponent,
    NoInternetComponent,
    DeleteConfirmDialogComponent,
    UserProfileCardComponent
  ],
  imports: [CommonModule, RouterModule, BASE_MODULES],
  providers: [Guards],
  exports: [Pipes, Directives, BASE_MODULES],
})
export class SharedModule {}
