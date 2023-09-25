import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubNavComponent } from './sub-nav/sub-nav.component';
import { RouterModule } from '@angular/router';
import { ScrollableComponent } from './scrollable/scrollable.component';


@NgModule({
  declarations: [SubNavComponent, ScrollableComponent],
  imports: [CommonModule,RouterModule],
  exports: [SubNavComponent,ScrollableComponent],
})
export class SharedModule {}
