/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';
var CheckboxWidget = /** @class */ (function (_super) {
    tslib_1.__extends(CheckboxWidget, _super);
    function CheckboxWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.checked = {};
        return _this;
    }
    /**
     * @return {?}
     */
    CheckboxWidget.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var control = this.control;
        this.formProperty.valueChanges.subscribe(function (newValue) {
            if (control.value !== newValue) {
                control.setValue(newValue, { emitEvent: false });
                if (newValue && Array.isArray(newValue)) {
                    newValue.map(function (v) { return _this.checked[v] = true; });
                }
            }
        });
        this.formProperty.errorsChanges.subscribe(function (errors) {
            control.setErrors(errors, { emitEvent: true });
        });
        control.valueChanges.subscribe(function (newValue) {
            _this.formProperty.setValue(newValue, false);
        });
    };
    /**
     * @param {?} el
     * @return {?}
     */
    CheckboxWidget.prototype.onCheck = /**
     * @param {?} el
     * @return {?}
     */
    function (el) {
        if (el.checked) {
            this.checked[el.value] = true;
        }
        else {
            delete this.checked[el.value];
        }
        this.formProperty.setValue(Object.keys(this.checked), false);
    };
    CheckboxWidget.decorators = [
        { type: Component, args: [{
                    selector: 'sf-checkbox-widget',
                    template: "<div class=\"widget form-group\">\n    <label [attr.for]=\"id\" class=\"horizontal control-label\">\n        {{ schema.title }}\n    </label>\n\t<div *ngIf=\"schema.type!='array'\" class=\"checkbox\">\n\t\t<label class=\"horizontal control-label\">\n\t\t\t<input [formControl]=\"control\" [attr.name]=\"name\" [indeterminate]=\"control.value !== false && control.value !== true ? true :null\" type=\"checkbox\" [disabled]=\"schema.readOnly\">\n\t\t\t<input *ngIf=\"schema.readOnly\" [attr.name]=\"name\" type=\"hidden\" [formControl]=\"control\">\n\t\t\t{{schema.description}}\n\t\t</label>\n\t</div>\n\t<ng-container *ngIf=\"schema.type==='array'\">\n\t\t<div *ngFor=\"let option of schema.items.oneOf\" class=\"checkbox\">\n\t\t\t<label class=\"horizontal control-label\">\n\t\t\t\t<input [attr.name]=\"name\"\n\t\t\t\t\tvalue=\"{{option.enum[0]}}\" type=\"checkbox\" \n\t\t\t\t\t[attr.disabled]=\"schema.readOnly\"\n\t\t\t\t\t(change)=\"onCheck($event.target)\"\n\t\t\t\t\t[attr.checked]=\"checked[option.enum[0]] ? true : null\">\n\t\t\t\t{{option.description}}\n\t\t\t</label>\n\t\t</div>\n\t</ng-container>\n</div>"
                }] }
    ];
    return CheckboxWidget;
}(ControlWidget));
export { CheckboxWidget };
if (false) {
    /** @type {?} */
    CheckboxWidget.prototype.checked;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gud2lkZ2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2RlZmF1bHR3aWRnZXRzL2NoZWNrYm94L2NoZWNrYm94LndpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFN0M7SUEyQm9DLDBDQUFhO0lBM0JqRDtRQUFBLHFFQXlEQztRQTVCQSxhQUFPLEdBQVEsRUFBRSxDQUFDOztJQTRCbkIsQ0FBQzs7OztJQTFCQSx3Q0FBZTs7O0lBQWY7UUFBQSxpQkFnQkM7O1lBZk0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPO1FBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFDLFFBQVE7WUFDakQsSUFBSSxPQUFPLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDL0IsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDakQsSUFBSSxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDeEMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUF0QixDQUFzQixDQUFDLENBQUM7aUJBQzFDO2FBQ0Q7UUFDRixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQU07WUFDaEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsUUFBUTtZQUN2QyxLQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDOzs7OztJQUVELGdDQUFPOzs7O0lBQVAsVUFBUSxFQUFFO1FBQ1QsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQzlCO2FBQU07WUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7Z0JBeERELFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUUsa21DQXVCTDtpQkFDTjs7SUErQkQscUJBQUM7Q0FBQSxBQXpERCxDQTJCb0MsYUFBYSxHQThCaEQ7U0E5QlksY0FBYzs7O0lBRTFCLGlDQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb250cm9sV2lkZ2V0IH0gZnJvbSAnLi4vLi4vd2lkZ2V0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtY2hlY2tib3gtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwid2lkZ2V0IGZvcm0tZ3JvdXBcIj5cbiAgICA8bGFiZWwgW2F0dHIuZm9yXT1cImlkXCIgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cbiAgICAgICAge3sgc2NoZW1hLnRpdGxlIH19XG4gICAgPC9sYWJlbD5cblx0PGRpdiAqbmdJZj1cInNjaGVtYS50eXBlIT0nYXJyYXknXCIgY2xhc3M9XCJjaGVja2JveFwiPlxuXHRcdDxsYWJlbCBjbGFzcz1cImhvcml6b250YWwgY29udHJvbC1sYWJlbFwiPlxuXHRcdFx0PGlucHV0IFtmb3JtQ29udHJvbF09XCJjb250cm9sXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW2luZGV0ZXJtaW5hdGVdPVwiY29udHJvbC52YWx1ZSAhPT0gZmFsc2UgJiYgY29udHJvbC52YWx1ZSAhPT0gdHJ1ZSA/IHRydWUgOm51bGxcIiB0eXBlPVwiY2hlY2tib3hcIiBbZGlzYWJsZWRdPVwic2NoZW1hLnJlYWRPbmx5XCI+XG5cdFx0XHQ8aW5wdXQgKm5nSWY9XCJzY2hlbWEucmVhZE9ubHlcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiB0eXBlPVwiaGlkZGVuXCIgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIj5cblx0XHRcdHt7c2NoZW1hLmRlc2NyaXB0aW9ufX1cblx0XHQ8L2xhYmVsPlxuXHQ8L2Rpdj5cblx0PG5nLWNvbnRhaW5lciAqbmdJZj1cInNjaGVtYS50eXBlPT09J2FycmF5J1wiPlxuXHRcdDxkaXYgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBzY2hlbWEuaXRlbXMub25lT2ZcIiBjbGFzcz1cImNoZWNrYm94XCI+XG5cdFx0XHQ8bGFiZWwgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cblx0XHRcdFx0PGlucHV0IFthdHRyLm5hbWVdPVwibmFtZVwiXG5cdFx0XHRcdFx0dmFsdWU9XCJ7e29wdGlvbi5lbnVtWzBdfX1cIiB0eXBlPVwiY2hlY2tib3hcIiBcblx0XHRcdFx0XHRbYXR0ci5kaXNhYmxlZF09XCJzY2hlbWEucmVhZE9ubHlcIlxuXHRcdFx0XHRcdChjaGFuZ2UpPVwib25DaGVjaygkZXZlbnQudGFyZ2V0KVwiXG5cdFx0XHRcdFx0W2F0dHIuY2hlY2tlZF09XCJjaGVja2VkW29wdGlvbi5lbnVtWzBdXSA/IHRydWUgOiBudWxsXCI+XG5cdFx0XHRcdHt7b3B0aW9uLmRlc2NyaXB0aW9ufX1cblx0XHRcdDwvbGFiZWw+XG5cdFx0PC9kaXY+XG5cdDwvbmctY29udGFpbmVyPlxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveFdpZGdldCBleHRlbmRzIENvbnRyb2xXaWRnZXQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuXHRjaGVja2VkOiBhbnkgPSB7fTtcblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0Y29uc3QgY29udHJvbCA9IHRoaXMuY29udHJvbDtcblx0XHR0aGlzLmZvcm1Qcm9wZXJ0eS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xuXHRcdFx0aWYgKGNvbnRyb2wudmFsdWUgIT09IG5ld1ZhbHVlKSB7XG5cdFx0XHRcdGNvbnRyb2wuc2V0VmFsdWUobmV3VmFsdWUsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcblx0XHRcdFx0aWYgKG5ld1ZhbHVlICYmIEFycmF5LmlzQXJyYXkobmV3VmFsdWUpKSB7XG5cdFx0XHRcdFx0bmV3VmFsdWUubWFwKHYgPT4gdGhpcy5jaGVja2VkW3ZdID0gdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLmZvcm1Qcm9wZXJ0eS5lcnJvcnNDaGFuZ2VzLnN1YnNjcmliZSgoZXJyb3JzKSA9PiB7XG5cdFx0XHRjb250cm9sLnNldEVycm9ycyhlcnJvcnMsIHsgZW1pdEV2ZW50OiB0cnVlIH0pO1xuXHRcdH0pO1xuXHRcdGNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcblx0XHRcdHRoaXMuZm9ybVByb3BlcnR5LnNldFZhbHVlKG5ld1ZhbHVlLCBmYWxzZSk7XG5cdFx0fSk7XG5cdH1cblxuXHRvbkNoZWNrKGVsKSB7XG5cdFx0aWYgKGVsLmNoZWNrZWQpIHtcblx0XHRcdHRoaXMuY2hlY2tlZFtlbC52YWx1ZV0gPSB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWxldGUgdGhpcy5jaGVja2VkW2VsLnZhbHVlXTtcblx0XHR9XG5cdFx0dGhpcy5mb3JtUHJvcGVydHkuc2V0VmFsdWUoT2JqZWN0LmtleXModGhpcy5jaGVja2VkKSwgZmFsc2UpO1xuXHR9XG59XG4iXX0=