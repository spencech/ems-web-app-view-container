import { Component, Input, ViewChild, TemplateRef, AfterViewInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { ViewContainerService } from "./view-container.service";

@Component({
  selector: 'view',
  template: `<ng-template #template><ng-content></ng-content></ng-template>`
})
export class ViewComponent implements AfterViewInit  {
	@Input("id") id!: string;
	@ViewChild("template") template!: TemplateRef<any>;
	constructor(private service: ViewContainerService, private element: ElementRef) {}

	ngAfterViewInit() {
		if(!this.id) throw new Error("All <view/> elements must have an id attribute.");

		const parentId = this.element.nativeElement.parentNode.getAttribute("id");
		this.service.registerView(parentId, this.id, this.template);
	}
}
