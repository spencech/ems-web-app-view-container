import { TemplateRef } from '@angular/core';
export interface IView {
	containerId: string, 
	viewId: string | null,
	template: TemplateRef<any> | null
}