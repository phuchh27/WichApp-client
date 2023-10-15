import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubNavComponent } from './sub-nav/sub-nav.component';
import { RouterModule } from '@angular/router';
import { ScrollableComponent } from './scrollable/scrollable.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [SubNavComponent, ScrollableComponent, NotFoundComponent],
  imports: [CommonModule,RouterModule],
  exports: [SubNavComponent,ScrollableComponent],
})
export class SharedModule {}
