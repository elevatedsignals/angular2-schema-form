/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';
var SelectWidget = /** @class */ (function (_super) {
    tslib_1.__extends(SelectWidget, _super);
    function SelectWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectWidget.decorators = [
        { type: Component, args: [{
                    selector: 'sf-select-widget',
                    template: "<div class=\"widget form-group\">\n\t<label [attr.for]=\"id\" class=\"horizontal control-label\">\n\t\t{{ schema.title }}\n\t</label>\n\n\t<span *ngIf=\"schema.description\" class=\"formHelp\">\n\t\t{{schema.description}}\n\t</span>\n\n\t<select *ngIf=\"schema.type!='array'\" [formControl]=\"control\" [attr.name]=\"name\" [disabled]=\"schema.readOnly\" class=\"form-control\">\n\t\t<option *ngFor=\"let option of schema.oneOf\" [ngValue]=\"option.enum[0]\" >{{option.description}}</option>\n\t</select>\n\n\t<select *ngIf=\"schema.type==='array'\" multiple [formControl]=\"control\" [attr.name]=\"name\" [disabled]=\"schema.readOnly\" class=\"form-control\">\n\t\t<option *ngFor=\"let option of schema.items.oneOf\" [ngValue]=\"option.enum[0]\" >{{option.description}}</option>\n\t</select>\n\n\t<input *ngIf=\"schema.readOnly\" [attr.name]=\"name\" type=\"hidden\" [formControl]=\"control\">\n</div>"
                }] }
    ];
    return SelectWidget;
}(ControlWidget));
export { SelectWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LndpZGdldC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9kZWZhdWx0d2lkZ2V0cy9zZWxlY3Qvc2VsZWN0LndpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUU3QztJQXNCa0Msd0NBQWE7SUF0Qi9DOztJQXNCaUQsQ0FBQzs7Z0JBdEJqRCxTQUFTLFNBQUM7b0JBQ1YsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFLHc0QkFrQko7aUJBQ047O0lBQ2dELG1CQUFDO0NBQUEsQUF0QmxELENBc0JrQyxhQUFhLEdBQUc7U0FBckMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb250cm9sV2lkZ2V0IH0gZnJvbSAnLi4vLi4vd2lkZ2V0JztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnc2Ytc2VsZWN0LXdpZGdldCcsXG5cdHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIndpZGdldCBmb3JtLWdyb3VwXCI+XG5cdDxsYWJlbCBbYXR0ci5mb3JdPVwiaWRcIiBjbGFzcz1cImhvcml6b250YWwgY29udHJvbC1sYWJlbFwiPlxuXHRcdHt7IHNjaGVtYS50aXRsZSB9fVxuXHQ8L2xhYmVsPlxuXG5cdDxzcGFuICpuZ0lmPVwic2NoZW1hLmRlc2NyaXB0aW9uXCIgY2xhc3M9XCJmb3JtSGVscFwiPlxuXHRcdHt7c2NoZW1hLmRlc2NyaXB0aW9ufX1cblx0PC9zcGFuPlxuXG5cdDxzZWxlY3QgKm5nSWY9XCJzY2hlbWEudHlwZSE9J2FycmF5J1wiIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW2Rpc2FibGVkXT1cInNjaGVtYS5yZWFkT25seVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG5cdFx0PG9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHNjaGVtYS5vbmVPZlwiIFtuZ1ZhbHVlXT1cIm9wdGlvbi5lbnVtWzBdXCIgPnt7b3B0aW9uLmRlc2NyaXB0aW9ufX08L29wdGlvbj5cblx0PC9zZWxlY3Q+XG5cblx0PHNlbGVjdCAqbmdJZj1cInNjaGVtYS50eXBlPT09J2FycmF5J1wiIG11bHRpcGxlIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW2Rpc2FibGVkXT1cInNjaGVtYS5yZWFkT25seVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG5cdFx0PG9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHNjaGVtYS5pdGVtcy5vbmVPZlwiIFtuZ1ZhbHVlXT1cIm9wdGlvbi5lbnVtWzBdXCIgPnt7b3B0aW9uLmRlc2NyaXB0aW9ufX08L29wdGlvbj5cblx0PC9zZWxlY3Q+XG5cblx0PGlucHV0ICpuZ0lmPVwic2NoZW1hLnJlYWRPbmx5XCIgW2F0dHIubmFtZV09XCJuYW1lXCIgdHlwZT1cImhpZGRlblwiIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCI+XG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdFdpZGdldCBleHRlbmRzIENvbnRyb2xXaWRnZXQge31cbiJdfQ==