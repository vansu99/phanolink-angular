import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeTitleFormPipe } from '@shared/pipes/change-title-form.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ChangeTitleFormPipe],
  imports: [CommonModule, RouterModule],
  exports: [ChangeTitleFormPipe],
})
export class SharedModule {}
