import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubNavComponent } from './sub-nav/sub-nav.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [SubNavComponent],
  imports: [CommonModule,RouterModule],
  exports: [SubNavComponent],
})
export class SharedModule {}
