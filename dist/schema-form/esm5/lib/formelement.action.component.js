/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ViewContainerRef } from "@angular/core";
import { WidgetFactory } from "./widgetfactory";
import { TerminatorService } from "./terminator.service";
var FormElementComponentAction = /** @class */ (function () {
    function FormElementComponentAction(widgetFactory, terminator) {
        if (widgetFactory === void 0) { widgetFactory = null; }
        this.widgetFactory = widgetFactory;
        this.terminator = terminator;
    }
    /**
     * @return {?}
     */
    FormElementComponentAction.prototype.ngOnInit = /**
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
    FormElementComponentAction.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.ref = this.widgetFactory.createWidget(this.container, this.button.widget || 'button');
        this.ref.instance.button = this.button;
        this.ref.instance.formProperty = this.formProperty;
    };
    /**
     * @return {?}
     */
    FormElementComponentAction.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subs.unsubscribe();
    };
    FormElementComponentAction.decorators = [
        { type: Component, args: [{
                    selector: 'sf-form-element-action',
                    template: '<ng-template #target></ng-template>'
                }] }
    ];
    /** @nocollapse */
    FormElementComponentAction.ctorParameters = function () { return [
        { type: WidgetFactory },
        { type: TerminatorService }
    ]; };
    FormElementComponentAction.propDecorators = {
        button: [{ type: Input }],
        formProperty: [{ type: Input }],
        container: [{ type: ViewChild, args: ['target', { read: ViewContainerRef },] }]
    };
    return FormElementComponentAction;
}());
export { FormElementComponentAction };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWVsZW1lbnQuYWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9mb3JtZWxlbWVudC5hY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFFTCxTQUFTLEVBQ1QsZ0JBQWdCLEVBR2pCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUV2RDtJQWlCRSxvQ0FBb0IsYUFBbUMsRUFDbkMsVUFBNkI7UUFEN0IsOEJBQUEsRUFBQSxvQkFBbUM7UUFBbkMsa0JBQWEsR0FBYixhQUFhLENBQXNCO1FBQ25DLGVBQVUsR0FBVixVQUFVLENBQW1CO0lBQ2pELENBQUM7Ozs7SUFFRCw2Q0FBUTs7O0lBQVI7UUFBQSxpQkFNQztRQUxDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQUEsT0FBTztZQUNyRCxJQUFJLE9BQU8sRUFBRTtnQkFDWCxLQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3BCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsZ0RBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDO1FBQzNGLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ3JELENBQUM7Ozs7SUFFRCxnREFBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFCLENBQUM7O2dCQXJDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsUUFBUSxFQUFFLHFDQUFxQztpQkFDaEQ7Ozs7Z0JBTk8sYUFBYTtnQkFDYixpQkFBaUI7Ozt5QkFRdEIsS0FBSzsrQkFHTCxLQUFLOzRCQUdMLFNBQVMsU0FBQyxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUM7O0lBMEIvQyxpQ0FBQztDQUFBLEFBdENELElBc0NDO1NBbENZLDBCQUEwQjs7O0lBRXJDLDRDQUNZOztJQUVaLGtEQUNrQjs7SUFFbEIsK0NBQTJFOztJQUUzRSx5Q0FBK0I7O0lBQy9CLDBDQUEyQjs7SUFFZixtREFBMkM7O0lBQzNDLGdEQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50UmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95XG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1dpZGdldEZhY3Rvcnl9IGZyb20gXCIuL3dpZGdldGZhY3RvcnlcIjtcbmltcG9ydCB7VGVybWluYXRvclNlcnZpY2V9IGZyb20gXCIuL3Rlcm1pbmF0b3Iuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1mb3JtLWVsZW1lbnQtYWN0aW9uJyxcbiAgdGVtcGxhdGU6ICc8bmctdGVtcGxhdGUgI3RhcmdldD48L25nLXRlbXBsYXRlPidcbn0pXG5leHBvcnQgY2xhc3MgRm9ybUVsZW1lbnRDb21wb25lbnRBY3Rpb24gaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBASW5wdXQoKVxuICBidXR0b246IGFueTtcblxuICBASW5wdXQoKVxuICBmb3JtUHJvcGVydHk6IGFueTtcblxuICBAVmlld0NoaWxkKCd0YXJnZXQnLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZn0pIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICBwcml2YXRlIHJlZjogQ29tcG9uZW50UmVmPGFueT47XG4gIHByaXZhdGUgc3ViczogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgd2lkZ2V0RmFjdG9yeTogV2lkZ2V0RmFjdG9yeSA9IG51bGwsXG4gICAgICAgICAgICAgIHByaXZhdGUgdGVybWluYXRvcjogVGVybWluYXRvclNlcnZpY2UpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3VicyA9IHRoaXMudGVybWluYXRvci5vbkRlc3Ryb3kuc3Vic2NyaWJlKGRlc3Ryb3kgPT4ge1xuICAgICAgaWYgKGRlc3Ryb3kpIHtcbiAgICAgICAgdGhpcy5yZWYuZGVzdHJveSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5yZWYgPSB0aGlzLndpZGdldEZhY3RvcnkuY3JlYXRlV2lkZ2V0KHRoaXMuY29udGFpbmVyLCB0aGlzLmJ1dHRvbi53aWRnZXQgfHwgJ2J1dHRvbicpO1xuICAgIHRoaXMucmVmLmluc3RhbmNlLmJ1dHRvbiA9IHRoaXMuYnV0dG9uO1xuICAgIHRoaXMucmVmLmluc3RhbmNlLmZvcm1Qcm9wZXJ0eSA9IHRoaXMuZm9ybVByb3BlcnR5O1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==