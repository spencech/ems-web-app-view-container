import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewContainerComponent } from './view-container.component';
import { ViewComponent } from './view.component';



@NgModule({
  declarations: [
    ViewContainerComponent,
    ViewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ViewContainerComponent,
    ViewComponent
  ]
})
export class ViewContainerModule { }
