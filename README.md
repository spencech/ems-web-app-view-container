# EMS Web Application Components: View Container

**Note that this module has peer dependencies on ems-web-app-utils and underscore.js**

	npm i underscore ems-web-app-utils ems-web-app-view-container

The View Container Angular.io module is authored for use within web applications developed by [Educational Media Solutions](https://educationalmediasolutions.com).

Find the [web application template source code on GitHub](https://github.com/spencech/ems-web-app-template) to review implementation in context.

Find a [working example of this component here](https://ems-web-app.educationalmediasolutions.com).

This package includes a component and service that can be used to render nested view containers that transition between view screens (e.g., a tab container).

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

## Usage: Module Import

	import { NgModule } from '@angular/core';
	import { BrowserModule } from '@angular/platform-browser';
	import { AppComponent } from './app.component';
	import { ViewContainerModule, ViewContainerService } from "ems-web-app-view-container";

	@NgModule({
	  declarations: [
	    AppComponent 
	  ],
	  imports: [
	    BrowserModule,
	    ViewContainerModule
	  ],
	  providers: [ ViewContainerService ],
	  bootstrap: [ AppComponent ]
	})

## Usage: Template Implementation

	<view-container id="container-1">
		<view id="child-1"><ng-template>Child 1, Container 1</ng-template></view>
		<view id="child-2"><ng-template>Child 2, Container 1</ng-template></view>
	</view-container>
	<view-container id="container-2">
		<view id="child-1"><ng-template>Child 1, Container 2</ng-template></view>
		<view id="child-2"><ng-template>Child 2, Container 2</ng-template></view>
	</view-container>
	<view-container>
		<view id="child-5"><ng-template>Child 5</ng-template></view>
		<view id="child-6"><ng-template>Child 6</ng-template></view>
	</view-container>
	<view-container>
		<view id="child-7"><ng-template>Child 7</ng-template></view>
		<view id="child-8"><ng-template>Child 8</ng-template></view>
	</view-container>

Every view child must have an id assigned and have its contents wrapped in an  `<ng-template>` tag; ideally these ids should be unique across containers. If this is not possible, you can assign an id for the container to namespace the nested views. The container ids are autogenerated when not supplied but it's probably best to define your own if you anticipate targeting them.

`<view/>` elements may contain static html or other nested components that you've defined in your application. Only the active view is initialized and rendered in the DOM. Hidden views are destroyed on view change.


## Usage: Component Implementation

	import { Component } from '@angular/core';
	import { ViewContainerService } from "ems-web-app-view-container";

	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.less']
	})
	export class AppComponent {

	  constructor(private viewContainer: ViewContainerService) {
	  }

	  showView(viewId: string | null, containerId?:string) {
	  	//a null viewId will hide the current view and render only a blank screen
	    this.viewContainer.setCurrentView(viewId, containerId);
	  }
	 
	}


## Code scaffolding

Run `ng generate component component-name --project view-container` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project view-container`.
> Note: Don't forget to add `--project view-container` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build view-container` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build view-container`, go to the dist folder `cd dist/view-container` and run `npm publish`.

## Running unit tests

Run `ng test view-container` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
