import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubNavComponent } from './sub-nav/sub-nav.component';
import { RouterModule } from '@angular/router';
import { ScrollableComponent } from './scrollable/scrollable.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [SubNavComponent, ScrollableComponent, NotFoundComponent, ConfirmDialogComponent],
  imports: [CommonModule,RouterModule,MatDialogModule],
  exports: [SubNavComponent,ScrollableComponent],
})
export class SharedModule {}
