import { Injectable, TemplateRef } from '@angular/core';
import { Observable, Subject, BehaviorSubject, throwError, of } from 'rxjs';
import { IView } from "./view-container.interfaces";

@Injectable({
  providedIn: 'root'
})
export class ViewContainerService {

  public static DELIMITER: string = "---"; //used to separate container id from view id in lookup; should be something that wouldn't appear in a supplied id

  private viewSource: BehaviorSubject<IView|null> = new BehaviorSubject<IView|null>(null);
  public view: Observable<IView|null> = this.viewSource.asObservable();
  public manifest: Record<string, IView> = {};

  public registerView(containerId: string, viewId: string, template: TemplateRef<any>) {
    this.manifest[`${containerId}${ViewContainerService.DELIMITER}${viewId}`] = { viewId, containerId, template };
  }

  public setCurrentView(viewId: string | null, containerId?: string) {
    const qualifiedId = this.getQualifiedId(viewId, containerId);
    let view = this.manifest[qualifiedId ?? ""];
    if(!view && containerId) view = { containerId, viewId, template: null }; //clears the view
    this.viewSource.next(view ?? null);
  }

  private getQualifiedId(viewId: string | null, containerId?: string): string | null {
    if(containerId) return `${containerId}${ViewContainerService.DELIMITER}${viewId}`;
    
    const regex = new RegExp(`^.*?${ViewContainerService.DELIMITER}(.*?)$`,"gim");
    for(let prop in this.manifest) {
      const parsedViewId = prop.replace(regex, "$1");
      if(parsedViewId === viewId) return prop;
    }

    return null;
  }


}
