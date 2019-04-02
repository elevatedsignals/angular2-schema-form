/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActionRegistry } from './model/actionregistry';
import { FormProperty } from './model/formproperty';
import { BindingRegistry } from './model/bindingregistry';
var FormElementComponent = /** @class */ (function () {
    function FormElementComponent(actionRegistry, bindingRegistry, renderer, elementRef) {
        this.actionRegistry = actionRegistry;
        this.bindingRegistry = bindingRegistry;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.control = new FormControl('', function () { return null; });
        this.widget = null;
        this.buttons = [];
        this.unlisten = [];
    }
    /**
     * @return {?}
     */
    FormElementComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.parseButtons();
        this.setupBindings();
    };
    /**
     * @return {?}
     */
    FormElementComponent.prototype.setupBindings = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var bindings = this.bindingRegistry.get(this.formProperty.path);
        if ((bindings || []).length) {
            bindings.forEach(function (binding) {
                for (var eventId in binding) {
                    _this.createBinding(eventId, binding[eventId]);
                }
            });
        }
    };
    /**
     * @param {?} eventId
     * @param {?} listener
     * @return {?}
     */
    FormElementComponent.prototype.createBinding = /**
     * @param {?} eventId
     * @param {?} listener
     * @return {?}
     */
    function (eventId, listener) {
        var _this = this;
        this.unlisten.push(this.renderer.listen(this.elementRef.nativeElement, eventId, function (event) {
            if (listener instanceof Function) {
                listener(event, _this.formProperty);
            }
            else {
                console.warn('Calling non function handler for eventId ' + eventId + ' for path ' + _this.formProperty.path);
            }
        }));
    };
    /**
     * @return {?}
     */
    FormElementComponent.prototype.parseButtons = /**
     * @return {?}
     */
    function () {
        var e_1, _a;
        if (this.formProperty.schema.buttons !== undefined) {
            this.buttons = this.formProperty.schema.buttons;
            try {
                for (var _b = tslib_1.__values(this.buttons), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var button = _c.value;
                    this.createButtonCallback(button);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    /**
     * @param {?} button
     * @return {?}
     */
    FormElementComponent.prototype.createButtonCallback = /**
     * @param {?} button
     * @return {?}
     */
    function (button) {
        var _this = this;
        button.action = function (e) {
            /** @type {?} */
            var action;
            if (button.id && (action = _this.actionRegistry.get(button.id))) {
                if (action) {
                    action(_this.formProperty, button.parameters);
                }
            }
            e.preventDefault();
        };
    };
    /**
     * @param {?} widget
     * @return {?}
     */
    FormElementComponent.prototype.onWidgetInstanciated = /**
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        this.widget = widget;
        /** @type {?} */
        var id = 'field' + (FormElementComponent.counter++);
        this.widget.formProperty = this.formProperty;
        this.widget.schema = this.formProperty.schema;
        this.widget.name = id;
        this.widget.id = id;
        this.widget.control = this.control;
    };
    /**
     * @return {?}
     */
    FormElementComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.unlisten) {
            this.unlisten.forEach(function (item) {
                item();
            });
        }
    };
    FormElementComponent.counter = 0;
    FormElementComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sf-form-element',
                    template: "\n    <div *ngIf=\"formProperty.visible\"\n         [class.has-error]=\"!control.valid\"\n         [class.has-success]=\"control.valid\">\n      <sf-widget-chooser\n        (widgetInstanciated)=\"onWidgetInstanciated($event)\"\n        [widgetInfo]=\"formProperty.schema.widget\">\n      </sf-widget-chooser>\n      <sf-form-element-action *ngFor=\"let button of buttons\" [button]=\"button\" [formProperty]=\"formProperty\"></sf-form-element-action>\n    </div>"
                }] }
    ];
    /** @nocollapse */
    FormElementComponent.ctorParameters = function () { return [
        { type: ActionRegistry },
        { type: BindingRegistry },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    FormElementComponent.propDecorators = {
        formProperty: [{ type: Input }]
    };
    return FormElementComponent;
}());
export { FormElementComponent };
if (false) {
    /** @type {?} */
    FormElementComponent.counter;
    /** @type {?} */
    FormElementComponent.prototype.formProperty;
    /** @type {?} */
    FormElementComponent.prototype.control;
    /** @type {?} */
    FormElementComponent.prototype.widget;
    /** @type {?} */
    FormElementComponent.prototype.buttons;
    /** @type {?} */
    FormElementComponent.prototype.unlisten;
    /** @type {?} */
    FormElementComponent.prototype.actionRegistry;
    /** @type {?} */
    FormElementComponent.prototype.bindingRegistry;
    /** @type {?} */
    FormElementComponent.prototype.renderer;
    /** @type {?} */
    FormElementComponent.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWVsZW1lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2Zvcm1lbGVtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsVUFBVSxFQUNyQixLQUFLLEVBQ0csU0FBUyxFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0wsV0FBVyxFQUNaLE1BQU0sZ0JBQWdCLENBQUM7QUFJeEIsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFHeEQ7SUEwQkUsOEJBQW9CLGNBQThCLEVBQzlCLGVBQWdDLEVBQ2hDLFFBQW1CLEVBQ25CLFVBQXNCO1FBSHRCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBWDFDLFlBQU8sR0FBZ0IsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDLENBQUM7UUFFdkQsV0FBTSxHQUFnQixJQUFJLENBQUM7UUFFM0IsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUViLGFBQVEsR0FBRyxFQUFFLENBQUM7SUFNZCxDQUFDOzs7O0lBRUQsdUNBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7O0lBRU8sNENBQWE7OztJQUFyQjtRQUFBLGlCQVNDOztZQVJPLFFBQVEsR0FBYyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcs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QUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtnQkFDekIsSUFBSSxFQUFFLENBQUM7WUFDVCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQXBGYyw0QkFBTyxHQUFHLENBQUMsQ0FBQzs7Z0JBZjVCLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsZ2RBU0Q7aUJBQ1Y7Ozs7Z0JBakJPLGNBQWM7Z0JBRWQsZUFBZTtnQkFYYixTQUFTO2dCQUZOLFVBQVU7OzsrQkFpQ3BCLEtBQUs7O0lBb0ZSLDJCQUFDO0NBQUEsQUFyR0QsSUFxR0M7U0F4Rlksb0JBQW9COzs7SUFFL0IsNkJBQTJCOztJQUUzQiw0Q0FBb0M7O0lBQ3BDLHVDQUF1RDs7SUFFdkQsc0NBQTJCOztJQUUzQix1Q0FBYTs7SUFFYix3Q0FBYzs7SUFFRiw4Q0FBc0M7O0lBQ3RDLCtDQUF3Qzs7SUFDeEMsd0NBQTJCOztJQUMzQiwwQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIEVsZW1lbnRSZWYsXG4gIElucHV0LCBPbkRlc3Ryb3ksXG4gIE9uSW5pdCwgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBGb3JtQ29udHJvbFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7V2lkZ2V0fSBmcm9tICcuL3dpZGdldCc7XG5cbmltcG9ydCB7QWN0aW9uUmVnaXN0cnl9IGZyb20gJy4vbW9kZWwvYWN0aW9ucmVnaXN0cnknO1xuaW1wb3J0IHtGb3JtUHJvcGVydHl9IGZyb20gJy4vbW9kZWwvZm9ybXByb3BlcnR5JztcbmltcG9ydCB7QmluZGluZ1JlZ2lzdHJ5fSBmcm9tICcuL21vZGVsL2JpbmRpbmdyZWdpc3RyeSc7XG5pbXBvcnQge0JpbmRpbmd9IGZyb20gJy4vbW9kZWwvYmluZGluZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWZvcm0tZWxlbWVudCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAqbmdJZj1cImZvcm1Qcm9wZXJ0eS52aXNpYmxlXCJcbiAgICAgICAgIFtjbGFzcy5oYXMtZXJyb3JdPVwiIWNvbnRyb2wudmFsaWRcIlxuICAgICAgICAgW2NsYXNzLmhhcy1zdWNjZXNzXT1cImNvbnRyb2wudmFsaWRcIj5cbiAgICAgIDxzZi13aWRnZXQtY2hvb3NlclxuICAgICAgICAod2lkZ2V0SW5zdGFuY2lhdGVkKT1cIm9uV2lkZ2V0SW5zdGFuY2lhdGVkKCRldmVudClcIlxuICAgICAgICBbd2lkZ2V0SW5mb109XCJmb3JtUHJvcGVydHkuc2NoZW1hLndpZGdldFwiPlxuICAgICAgPC9zZi13aWRnZXQtY2hvb3Nlcj5cbiAgICAgIDxzZi1mb3JtLWVsZW1lbnQtYWN0aW9uICpuZ0Zvcj1cImxldCBidXR0b24gb2YgYnV0dG9uc1wiIFtidXR0b25dPVwiYnV0dG9uXCIgW2Zvcm1Qcm9wZXJ0eV09XCJmb3JtUHJvcGVydHlcIj48L3NmLWZvcm0tZWxlbWVudC1hY3Rpb24+XG4gICAgPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtRWxlbWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBwcml2YXRlIHN0YXRpYyBjb3VudGVyID0gMDtcblxuICBASW5wdXQoKSBmb3JtUHJvcGVydHk6IEZvcm1Qcm9wZXJ0eTtcbiAgY29udHJvbDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycsICgpID0+IG51bGwpO1xuXG4gIHdpZGdldDogV2lkZ2V0PGFueT4gPSBudWxsO1xuXG4gIGJ1dHRvbnMgPSBbXTtcblxuICB1bmxpc3RlbiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYWN0aW9uUmVnaXN0cnk6IEFjdGlvblJlZ2lzdHJ5LFxuICAgICAgICAgICAgICBwcml2YXRlIGJpbmRpbmdSZWdpc3RyeTogQmluZGluZ1JlZ2lzdHJ5LFxuICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5wYXJzZUJ1dHRvbnMoKTtcbiAgICB0aGlzLnNldHVwQmluZGluZ3MoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBCaW5kaW5ncygpIHtcbiAgICBjb25zdCBiaW5kaW5nczogQmluZGluZ1tdID0gdGhpcy5iaW5kaW5nUmVnaXN0cnkuZ2V0KHRoaXMuZm9ybVByb3BlcnR5LnBhdGgpO1xuICAgIGlmICgoYmluZGluZ3MgfHwgW10pLmxlbmd0aCkge1xuICAgICAgYmluZGluZ3MuZm9yRWFjaCgoYmluZGluZykgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGV2ZW50SWQgaW4gYmluZGluZykge1xuICAgICAgICAgIHRoaXMuY3JlYXRlQmluZGluZyhldmVudElkLCBiaW5kaW5nW2V2ZW50SWRdKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVCaW5kaW5nKGV2ZW50SWQsIGxpc3RlbmVyKSB7XG4gICAgdGhpcy51bmxpc3Rlbi5wdXNoKHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgZXZlbnRJZCxcbiAgICAgIChldmVudCkgPT4ge1xuICAgICAgICBpZiAobGlzdGVuZXIgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgIGxpc3RlbmVyKGV2ZW50LCB0aGlzLmZvcm1Qcm9wZXJ0eSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdDYWxsaW5nIG5vbiBmdW5jdGlvbiBoYW5kbGVyIGZvciBldmVudElkICcgKyBldmVudElkICsgJyBmb3IgcGF0aCAnICsgdGhpcy5mb3JtUHJvcGVydHkucGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VCdXR0b25zKCkge1xuICAgIGlmICh0aGlzLmZvcm1Qcm9wZXJ0eS5zY2hlbWEuYnV0dG9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmJ1dHRvbnMgPSB0aGlzLmZvcm1Qcm9wZXJ0eS5zY2hlbWEuYnV0dG9ucztcblxuICAgICAgZm9yIChsZXQgYnV0dG9uIG9mIHRoaXMuYnV0dG9ucykge1xuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbkNhbGxiYWNrKGJ1dHRvbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVCdXR0b25DYWxsYmFjayhidXR0b24pIHtcbiAgICBidXR0b24uYWN0aW9uID0gKGUpID0+IHtcbiAgICAgIGxldCBhY3Rpb247XG4gICAgICBpZiAoYnV0dG9uLmlkICYmIChhY3Rpb24gPSB0aGlzLmFjdGlvblJlZ2lzdHJ5LmdldChidXR0b24uaWQpKSkge1xuICAgICAgICBpZiAoYWN0aW9uKSB7XG4gICAgICAgICAgYWN0aW9uKHRoaXMuZm9ybVByb3BlcnR5LCBidXR0b24ucGFyYW1ldGVycyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9O1xuICB9XG5cbiAgb25XaWRnZXRJbnN0YW5jaWF0ZWQod2lkZ2V0OiBXaWRnZXQ8YW55Pikge1xuICAgIHRoaXMud2lkZ2V0ID0gd2lkZ2V0O1xuICAgIGxldCBpZCA9ICdmaWVsZCcgKyAoRm9ybUVsZW1lbnRDb21wb25lbnQuY291bnRlcisrKTtcblxuICAgIHRoaXMud2lkZ2V0LmZvcm1Qcm9wZXJ0eSA9IHRoaXMuZm9ybVByb3BlcnR5O1xuICAgIHRoaXMud2lkZ2V0LnNjaGVtYSA9IHRoaXMuZm9ybVByb3BlcnR5LnNjaGVtYTtcbiAgICB0aGlzLndpZGdldC5uYW1lID0gaWQ7XG4gICAgdGhpcy53aWRnZXQuaWQgPSBpZDtcbiAgICB0aGlzLndpZGdldC5jb250cm9sID0gdGhpcy5jb250cm9sO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudW5saXN0ZW4pIHtcbiAgICAgIHRoaXMudW5saXN0ZW4uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxufVxuIl19