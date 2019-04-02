/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, ChangeDetectorRef, EventEmitter, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { TerminatorService } from './terminator.service';
import { WidgetFactory } from './widgetfactory';
var WidgetChooserComponent = /** @class */ (function () {
    function WidgetChooserComponent(widgetFactory, cdr, terminator) {
        if (widgetFactory === void 0) { widgetFactory = null; }
        this.widgetFactory = widgetFactory;
        this.cdr = cdr;
        this.terminator = terminator;
        this.widgetInstanciated = new EventEmitter();
    }
    /**
     * @return {?}
     */
    WidgetChooserComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subs = this.terminator.onDestroy.subscribe(function (destroy) {
            if (destroy) {
                _this.ref.destroy();
            }
        });
    };
    /**
     * @return {?}
     */
    WidgetChooserComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.ref = this.widgetFactory.createWidget(this.container, this.widgetInfo.id);
        this.widgetInstanciated.emit(this.ref.instance);
        this.widgetInstance = this.ref.instance;
        this.cdr.detectChanges();
    };
    /**
     * @return {?}
     */
    WidgetChooserComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subs.unsubscribe();
    };
    WidgetChooserComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sf-widget-chooser',
                    template: "<div #target></div>"
                }] }
    ];
    /** @nocollapse */
    WidgetChooserComponent.ctorParameters = function () { return [
        { type: WidgetFactory },
        { type: ChangeDetectorRef },
        { type: TerminatorService }
    ]; };
    WidgetChooserComponent.propDecorators = {
        widgetInfo: [{ type: Input }],
        widgetInstanciated: [{ type: Output }],
        container: [{ type: ViewChild, args: ['target', { read: ViewContainerRef },] }]
    };
    return WidgetChooserComponent;
}());
export { WidgetChooserComponent };
if (false) {
    /** @type {?} */
    WidgetChooserComponent.prototype.widgetInfo;
    /** @type {?} */
    WidgetChooserComponent.prototype.widgetInstanciated;
    /** @type {?} */
    WidgetChooserComponent.prototype.container;
    /** @type {?} */
    WidgetChooserComponent.prototype.widgetInstance;
    /** @type {?} */
    WidgetChooserComponent.prototype.ref;
    /** @type {?} */
    WidgetChooserComponent.prototype.subs;
    /** @type {?} */
    WidgetChooserComponent.prototype.widgetFactory;
    /** @type {?} */
    WidgetChooserComponent.prototype.cdr;
    /** @type {?} */
    WidgetChooserComponent.prototype.terminator;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0Y2hvb3Nlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJsaWIvd2lkZ2V0Y2hvb3Nlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsRUFHakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBSWhEO0lBZ0JFLGdDQUNVLGFBQW1DLEVBQ25DLEdBQXNCLEVBQ3RCLFVBQTZCO1FBRjdCLDhCQUFBLEVBQUEsb0JBQW1DO1FBQW5DLGtCQUFhLEdBQWIsYUFBYSxDQUFzQjtRQUNuQyxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQVg3Qix1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO0lBWW5ELENBQUM7Ozs7SUFFTCx5Q0FBUTs7O0lBQVI7UUFBQSxpQkFNQztRQUxDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQUEsT0FBTztZQUNyRCxJQUFJLE9BQU8sRUFBRTtnQkFDWCxLQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3BCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsNENBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7O0lBRUQsNENBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQixDQUFDOztnQkF2Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSxxQkFBcUI7aUJBQ2hDOzs7O2dCQVBRLGFBQWE7Z0JBWHBCLGlCQUFpQjtnQkFVVixpQkFBaUI7Ozs2QkFXdkIsS0FBSztxQ0FFTCxNQUFNOzRCQUVOLFNBQVMsU0FBQyxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUM7O0lBOEIvQyw2QkFBQztDQUFBLEFBeENELElBd0NDO1NBcENZLHNCQUFzQjs7O0lBRWpDLDRDQUF5Qjs7SUFFekIsb0RBQXVEOztJQUV2RCwyQ0FBMkU7O0lBRTNFLGdEQUE0Qjs7SUFDNUIscUNBQStCOztJQUMvQixzQ0FBMkI7O0lBR3pCLCtDQUEyQzs7SUFDM0MscUNBQThCOztJQUM5Qiw0Q0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbXBvbmVudFJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGVybWluYXRvclNlcnZpY2UgfSBmcm9tICcuL3Rlcm1pbmF0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBXaWRnZXRGYWN0b3J5IH0gZnJvbSAnLi93aWRnZXRmYWN0b3J5JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLXdpZGdldC1jaG9vc2VyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICN0YXJnZXQ+PC9kaXY+YCxcbn0pXG5leHBvcnQgY2xhc3MgV2lkZ2V0Q2hvb3NlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIHdpZGdldEluZm86IGFueTtcblxuICBAT3V0cHV0KCkgd2lkZ2V0SW5zdGFuY2lhdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQFZpZXdDaGlsZCgndGFyZ2V0Jywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgcHJpdmF0ZSB3aWRnZXRJbnN0YW5jZTogYW55O1xuICBwcml2YXRlIHJlZjogQ29tcG9uZW50UmVmPGFueT47XG4gIHByaXZhdGUgc3ViczogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgd2lkZ2V0RmFjdG9yeTogV2lkZ2V0RmFjdG9yeSA9IG51bGwsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgdGVybWluYXRvcjogVGVybWluYXRvclNlcnZpY2UsXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJzID0gdGhpcy50ZXJtaW5hdG9yLm9uRGVzdHJveS5zdWJzY3JpYmUoZGVzdHJveSA9PiB7XG4gICAgICBpZiAoZGVzdHJveSkge1xuICAgICAgICB0aGlzLnJlZi5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLnJlZiA9IHRoaXMud2lkZ2V0RmFjdG9yeS5jcmVhdGVXaWRnZXQodGhpcy5jb250YWluZXIsIHRoaXMud2lkZ2V0SW5mby5pZCk7XG4gICAgdGhpcy53aWRnZXRJbnN0YW5jaWF0ZWQuZW1pdCh0aGlzLnJlZi5pbnN0YW5jZSk7XG4gICAgdGhpcy53aWRnZXRJbnN0YW5jZSA9IHRoaXMucmVmLmluc3RhbmNlO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vicy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=