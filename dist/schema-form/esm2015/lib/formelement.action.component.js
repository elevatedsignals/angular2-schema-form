/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ViewContainerRef } from "@angular/core";
import { WidgetFactory } from "./widgetfactory";
import { TerminatorService } from "./terminator.service";
export class FormElementComponentAction {
    /**
     * @param {?=} widgetFactory
     * @param {?=} terminator
     */
    constructor(widgetFactory = null, terminator) {
        this.widgetFactory = widgetFactory;
        this.terminator = terminator;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subs = this.terminator.onDestroy.subscribe(destroy => {
            if (destroy) {
                this.ref.destroy();
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.ref = this.widgetFactory.createWidget(this.container, this.button.widget || 'button');
        this.ref.instance.button = this.button;
        this.ref.instance.formProperty = this.formProperty;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
FormElementComponentAction.decorators = [
    { type: Component, args: [{
                selector: 'sf-form-element-action',
                template: '<ng-template #target></ng-template>'
            }] }
];
/** @nocollapse */
FormElementComponentAction.ctorParameters = () => [
    { type: WidgetFactory },
    { type: TerminatorService }
];
FormElementComponentAction.propDecorators = {
    button: [{ type: Input }],
    formProperty: [{ type: Input }],
    container: [{ type: ViewChild, args: ['target', { read: ViewContainerRef },] }]
};
if (false) {
    /** @type {?} */
    FormElementComponentAction.prototype.button;
    /** @type {?} */
    FormElementComponentAction.prototype.formProperty;
    /** @type {?} */
    FormElementComponentAction.prototype.container;
    /** @type {?} */
    FormElementComponentAction.prototype.ref;
    /** @type {?} */
    FormElementComponentAction.prototype.subs;
    /** @type {?} */
    FormElementComponentAction.prototype.widgetFactory;
    /** @type {?} */
    FormElementComponentAction.prototype.terminator;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWVsZW1lbnQuYWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9mb3JtZWxlbWVudC5hY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFFTCxTQUFTLEVBQ1QsZ0JBQWdCLEVBR2pCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQU12RCxNQUFNLE9BQU8sMEJBQTBCOzs7OztJQWFyQyxZQUFvQixnQkFBK0IsSUFBSSxFQUNuQyxVQUE2QjtRQUQ3QixrQkFBYSxHQUFiLGFBQWEsQ0FBc0I7UUFDbkMsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7SUFDakQsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN4RCxJQUFJLE9BQU8sRUFBRTtnQkFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3BCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUNyRCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7O1lBckNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxRQUFRLEVBQUUscUNBQXFDO2FBQ2hEOzs7O1lBTk8sYUFBYTtZQUNiLGlCQUFpQjs7O3FCQVF0QixLQUFLOzJCQUdMLEtBQUs7d0JBR0wsU0FBUyxTQUFDLFFBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBQzs7OztJQU43Qyw0Q0FDWTs7SUFFWixrREFDa0I7O0lBRWxCLCtDQUEyRTs7SUFFM0UseUNBQStCOztJQUMvQiwwQ0FBMkI7O0lBRWYsbURBQTJDOztJQUMzQyxnREFBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbXBvbmVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveVxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtXaWRnZXRGYWN0b3J5fSBmcm9tIFwiLi93aWRnZXRmYWN0b3J5XCI7XG5pbXBvcnQge1Rlcm1pbmF0b3JTZXJ2aWNlfSBmcm9tIFwiLi90ZXJtaW5hdG9yLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtZm9ybS1lbGVtZW50LWFjdGlvbicsXG4gIHRlbXBsYXRlOiAnPG5nLXRlbXBsYXRlICN0YXJnZXQ+PC9uZy10ZW1wbGF0ZT4nXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1FbGVtZW50Q29tcG9uZW50QWN0aW9uIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KClcbiAgYnV0dG9uOiBhbnk7XG5cbiAgQElucHV0KClcbiAgZm9ybVByb3BlcnR5OiBhbnk7XG5cbiAgQFZpZXdDaGlsZCgndGFyZ2V0Jywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgcHJpdmF0ZSByZWY6IENvbXBvbmVudFJlZjxhbnk+O1xuICBwcml2YXRlIHN1YnM6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdpZGdldEZhY3Rvcnk6IFdpZGdldEZhY3RvcnkgPSBudWxsLFxuICAgICAgICAgICAgICBwcml2YXRlIHRlcm1pbmF0b3I6IFRlcm1pbmF0b3JTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnMgPSB0aGlzLnRlcm1pbmF0b3Iub25EZXN0cm95LnN1YnNjcmliZShkZXN0cm95ID0+IHtcbiAgICAgIGlmIChkZXN0cm95KSB7XG4gICAgICAgIHRoaXMucmVmLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMucmVmID0gdGhpcy53aWRnZXRGYWN0b3J5LmNyZWF0ZVdpZGdldCh0aGlzLmNvbnRhaW5lciwgdGhpcy5idXR0b24ud2lkZ2V0IHx8ICdidXR0b24nKTtcbiAgICB0aGlzLnJlZi5pbnN0YW5jZS5idXR0b24gPSB0aGlzLmJ1dHRvbjtcbiAgICB0aGlzLnJlZi5pbnN0YW5jZS5mb3JtUHJvcGVydHkgPSB0aGlzLmZvcm1Qcm9wZXJ0eTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vicy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=