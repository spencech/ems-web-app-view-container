import { Component, HostBinding, Input, Output, EventEmitter, OnInit, AfterViewInit, OnDestroy, TemplateRef } from '@angular/core';
import { ViewContainerService } from "./view-container.service";
import { IView } from "./view-container.interfaces";
import { sleep, delay } from "ems-web-app-utils";
import { Subscription } from 'rxjs';

@Component({
  selector: 'view-container',
  template: `<ng-container *ngIf="currentView"><ng-container *ngTemplateOutlet="currentView.template"></ng-container></ng-container><ng-content></ng-content>`,
  styleUrls: ['./view-container.component.less']
})
export class ViewContainerComponent implements OnInit, AfterViewInit, OnDestroy {

  private static counter: number = 1;

  @HostBinding("attr.id") generatedId: string = "";
  @HostBinding("class") currentViewClass: string = "";
  @HostBinding("class.transitioning") transitioning: boolean = true;
  
  @Input("id") id?: string;
  @Input("transition-speed") speed: number = 250;

  @Output("ready") onReady: EventEmitter<any> = new EventEmitter();
  @Output("begin") onBegin: EventEmitter<any> = new EventEmitter();
  @Output("execute") onExecute: EventEmitter<any> = new EventEmitter();
  @Output("complete") onComplete: EventEmitter<any> = new EventEmitter();

  public requestedView:IView | null = null;
  public currentView:IView | null = null;

  protected callback?: () => void;
  protected subscription!: Subscription;

  constructor(private service: ViewContainerService) {}

  ngOnInit(): void {
    if(!this.id) {
      //auto-create ids if none supplied
      this.id = `generated-vcid-${ViewContainerComponent.counter}`;
      ViewContainerComponent.counter ++;
    }
    this.generatedId = this.id;
  }

  ngAfterViewInit() {
    delay(() => this.initialize());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public setCurrentView(view:IView | null, callback?: () => void) {
    this.requestedView = view;
    this.callback = callback;
    this.beginViewTransition();
  }

  protected async beginViewTransition() {
    this.transitioning = true; //begin fadeout
    this.onBegin.emit();
    await sleep(this.speed);
    this.executeViewTransition();
  }

  protected async executeViewTransition() {
    this.currentView = null; //completely destroy current view/logic/listeners
    await sleep(0);
    this.currentView = this.requestedView;
    await sleep(0); //allow a tick to paint the transparent state of the view
    this.onExecute.emit();
    if(this.callback) this.callback();
    this.transitioning = false; //begin fade in
    await sleep(this.speed);
    this.completeViewTransition();
  }

  protected completeViewTransition() {
    this.onComplete.emit();
  }

  protected initialize() {
    this.subscription = this.service.view.subscribe(view => {
      if(view?.containerId !== this.id) return;
      this.setCurrentView(view);
    });

    this.onReady.emit(); //component is subscribed and ready to respond to view requests
  }
}
