/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @abstract
 * @template T
 */
var /**
 * @abstract
 * @template T
 */
Widget = /** @class */ (function () {
    function Widget() {
        this.id = '';
        this.name = '';
        this.schema = {};
    }
    return Widget;
}());
/**
 * @abstract
 * @template T
 */
export { Widget };
if (false) {
    /** @type {?} */
    Widget.prototype.formProperty;
    /** @type {?} */
    Widget.prototype.control;
    /** @type {?} */
    Widget.prototype.errorMessages;
    /** @type {?} */
    Widget.prototype.id;
    /** @type {?} */
    Widget.prototype.name;
    /** @type {?} */
    Widget.prototype.schema;
}
var ControlWidget = /** @class */ (function (_super) {
    tslib_1.__extends(ControlWidget, _super);
    function ControlWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    ControlWidget.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var control = this.control;
        this.formProperty.valueChanges.subscribe(function (newValue) {
            if (control.value !== newValue) {
                control.setValue(newValue, { emitEvent: false });
            }
        });
        this.formProperty.errorsChanges.subscribe(function (errors) {
            control.setErrors(errors, { emitEvent: true });
            /** @type {?} */
            var messages = (errors || [])
                .filter(function (e) {
                return e.path && e.path.slice(1) === _this.formProperty.path;
            })
                .map(function (e) { return e.message; });
            _this.errorMessages = messages.filter(function (m, i) { return messages.indexOf(m) === i; });
        });
        control.valueChanges.subscribe(function (newValue) {
            _this.formProperty.setValue(newValue, false);
        });
    };
    return ControlWidget;
}(Widget));
export { ControlWidget };
var ArrayLayoutWidget = /** @class */ (function (_super) {
    tslib_1.__extends(ArrayLayoutWidget, _super);
    function ArrayLayoutWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    ArrayLayoutWidget.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var control = this.control;
        this.formProperty.errorsChanges.subscribe(function (errors) {
            control.setErrors(errors, { emitEvent: true });
        });
    };
    return ArrayLayoutWidget;
}(Widget));
export { ArrayLayoutWidget };
var ObjectLayoutWidget = /** @class */ (function (_super) {
    tslib_1.__extends(ObjectLayoutWidget, _super);
    function ObjectLayoutWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    ObjectLayoutWidget.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var control = this.control;
        this.formProperty.errorsChanges.subscribe(function (errors) {
            control.setErrors(errors, { emitEvent: true });
        });
    };
    return ObjectLayoutWidget;
}(Widget));
export { ObjectLayoutWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3dpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFPQTs7Ozs7SUFBQTtRQUtFLE9BQUUsR0FBVyxFQUFFLENBQUM7UUFDaEIsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixXQUFNLEdBQVEsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFBRCxhQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7Ozs7Ozs7O0lBUEMsOEJBQWdCOztJQUNoQix5QkFBcUI7O0lBQ3JCLCtCQUF3Qjs7SUFFeEIsb0JBQWdCOztJQUNoQixzQkFBa0I7O0lBQ2xCLHdCQUFpQjs7QUFHbkI7SUFBbUMseUNBQW9CO0lBQXZEOztJQXVCQSxDQUFDOzs7O0lBckJDLHVDQUFlOzs7SUFBZjtRQUFBLGlCQW1CQzs7WUFsQk8sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPO1FBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFDLFFBQVE7WUFDaEQsSUFBSSxPQUFPLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDOUIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQzthQUNoRDtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUMvQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDOztnQkFDekMsUUFBUSxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztpQkFDNUIsTUFBTSxDQUFDLFVBQUEsQ0FBQztnQkFDUCxPQUFPLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDOUQsQ0FBQyxDQUFDO2lCQUNELEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxPQUFPLEVBQVQsQ0FBUyxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO1FBQzVFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxRQUFRO1lBQ3RDLEtBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFSCxvQkFBQztBQUFELENBQUMsQUF2QkQsQ0FBbUMsTUFBTSxHQXVCeEM7O0FBRUQ7SUFBdUMsNkNBQXFCO0lBQTVEOztJQVFBLENBQUM7Ozs7SUFOQywyQ0FBZTs7O0lBQWY7O1lBQ1EsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPO1FBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQU07WUFDL0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFSRCxDQUF1QyxNQUFNLEdBUTVDOztBQUVEO0lBQXdDLDhDQUFzQjtJQUE5RDs7SUFRQSxDQUFDOzs7O0lBTkMsNENBQWU7OztJQUFmOztZQUNRLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTztRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQy9DLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBUkQsQ0FBd0MsTUFBTSxHQVE3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWZ0ZXJWaWV3SW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Db250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7QXJyYXlQcm9wZXJ0eX0gZnJvbSAnLi9tb2RlbC9hcnJheXByb3BlcnR5JztcbmltcG9ydCB7Rm9ybVByb3BlcnR5fSBmcm9tICcuL21vZGVsL2Zvcm1wcm9wZXJ0eSc7XG5pbXBvcnQge09iamVjdFByb3BlcnR5fSBmcm9tICcuL21vZGVsL29iamVjdHByb3BlcnR5JztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFdpZGdldDxUIGV4dGVuZHMgRm9ybVByb3BlcnR5PiB7XG4gIGZvcm1Qcm9wZXJ0eTogVDtcbiAgY29udHJvbDogRm9ybUNvbnRyb2w7XG4gIGVycm9yTWVzc2FnZXM6IHN0cmluZ1tdO1xuXG4gIGlkOiBzdHJpbmcgPSAnJztcbiAgbmFtZTogc3RyaW5nID0gJyc7XG4gIHNjaGVtYTogYW55ID0ge307XG59XG5cbmV4cG9ydCBjbGFzcyBDb250cm9sV2lkZ2V0IGV4dGVuZHMgV2lkZ2V0PEZvcm1Qcm9wZXJ0eT4gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuY29udHJvbDtcbiAgICB0aGlzLmZvcm1Qcm9wZXJ0eS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xuICAgICAgaWYgKGNvbnRyb2wudmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgIGNvbnRyb2wuc2V0VmFsdWUobmV3VmFsdWUsIHtlbWl0RXZlbnQ6IGZhbHNlfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5mb3JtUHJvcGVydHkuZXJyb3JzQ2hhbmdlcy5zdWJzY3JpYmUoKGVycm9ycykgPT4ge1xuICAgICAgY29udHJvbC5zZXRFcnJvcnMoZXJyb3JzLCB7IGVtaXRFdmVudDogdHJ1ZSB9KTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VzID0gKGVycm9ycyB8fCBbXSlcbiAgICAgICAgLmZpbHRlcihlID0+IHtcbiAgICAgICAgICByZXR1cm4gZS5wYXRoICYmIGUucGF0aC5zbGljZSgxKSA9PT0gdGhpcy5mb3JtUHJvcGVydHkucGF0aDtcbiAgICAgICAgfSlcbiAgICAgICAgLm1hcChlID0+IGUubWVzc2FnZSk7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBtZXNzYWdlcy5maWx0ZXIoKG0sIGkpID0+IG1lc3NhZ2VzLmluZGV4T2YobSkgPT09IGkpO1xuICAgIH0pO1xuICAgIGNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcbiAgICAgIHRoaXMuZm9ybVByb3BlcnR5LnNldFZhbHVlKG5ld1ZhbHVlLCBmYWxzZSk7XG4gICAgfSk7XG4gIH1cblxufVxuXG5leHBvcnQgY2xhc3MgQXJyYXlMYXlvdXRXaWRnZXQgZXh0ZW5kcyBXaWRnZXQ8QXJyYXlQcm9wZXJ0eT4gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuY29udHJvbDtcbiAgICB0aGlzLmZvcm1Qcm9wZXJ0eS5lcnJvcnNDaGFuZ2VzLnN1YnNjcmliZSgoZXJyb3JzKSA9PiB7XG4gICAgICBjb250cm9sLnNldEVycm9ycyhlcnJvcnMsIHtlbWl0RXZlbnQ6IHRydWV9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgT2JqZWN0TGF5b3V0V2lkZ2V0IGV4dGVuZHMgV2lkZ2V0PE9iamVjdFByb3BlcnR5PiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5jb250cm9sO1xuICAgIHRoaXMuZm9ybVByb3BlcnR5LmVycm9yc0NoYW5nZXMuc3Vic2NyaWJlKChlcnJvcnMpID0+IHtcbiAgICAgIGNvbnRyb2wuc2V0RXJyb3JzKGVycm9ycywge2VtaXRFdmVudDogdHJ1ZX0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=