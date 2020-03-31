import { __decorate, __extends } from "tslib";
import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';
var TextAreaWidget = /** @class */ (function (_super) {
    __extends(TextAreaWidget, _super);
    function TextAreaWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextAreaWidget = __decorate([
        Component({
            selector: 'sf-textarea-widget',
            template: "<div class=\"widget form-group\">\n\t<label [attr.for]=\"id\" class=\"horizontal control-label\">\n\t\t{{ schema.title }}\n\t</label>\n    <span *ngIf=\"schema.description\" class=\"formHelp\">{{schema.description}}</span>\n\t<textarea [readonly]=\"schema.readOnly\" [name]=\"name\"\n\t\t[attr.id]=\"id\"\n\t\tclass=\"text-widget textarea-widget form-control\"\n\t\t[attr.placeholder]=\"schema.placeholder\"\n\t\t[attr.maxLength]=\"schema.maxLength || null\"\n    [attr.minLength]=\"schema.minLength || null\"\n\t\t[formControl]=\"control\"></textarea>\n</div>"
        })
    ], TextAreaWidget);
    return TextAreaWidget;
}(ControlWidget));
export { TextAreaWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEud2lkZ2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2RlZmF1bHR3aWRnZXRzL3RleHRhcmVhL3RleHRhcmVhLndpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBa0I3QztJQUFvQyxrQ0FBYTtJQUFqRDs7SUFBbUQsQ0FBQztJQUF2QyxjQUFjO1FBaEIxQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFFBQVEsRUFBRSxrakJBWUw7U0FDTixDQUFDO09BQ1csY0FBYyxDQUF5QjtJQUFELHFCQUFDO0NBQUEsQUFBcEQsQ0FBb0MsYUFBYSxHQUFHO1NBQXZDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29udHJvbFdpZGdldCB9IGZyb20gJy4uLy4uL3dpZGdldCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLXRleHRhcmVhLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIndpZGdldCBmb3JtLWdyb3VwXCI+XG5cdDxsYWJlbCBbYXR0ci5mb3JdPVwiaWRcIiBjbGFzcz1cImhvcml6b250YWwgY29udHJvbC1sYWJlbFwiPlxuXHRcdHt7IHNjaGVtYS50aXRsZSB9fVxuXHQ8L2xhYmVsPlxuICAgIDxzcGFuICpuZ0lmPVwic2NoZW1hLmRlc2NyaXB0aW9uXCIgY2xhc3M9XCJmb3JtSGVscFwiPnt7c2NoZW1hLmRlc2NyaXB0aW9ufX08L3NwYW4+XG5cdDx0ZXh0YXJlYSBbcmVhZG9ubHldPVwic2NoZW1hLnJlYWRPbmx5XCIgW25hbWVdPVwibmFtZVwiXG5cdFx0W2F0dHIuaWRdPVwiaWRcIlxuXHRcdGNsYXNzPVwidGV4dC13aWRnZXQgdGV4dGFyZWEtd2lkZ2V0IGZvcm0tY29udHJvbFwiXG5cdFx0W2F0dHIucGxhY2Vob2xkZXJdPVwic2NoZW1hLnBsYWNlaG9sZGVyXCJcblx0XHRbYXR0ci5tYXhMZW5ndGhdPVwic2NoZW1hLm1heExlbmd0aCB8fCBudWxsXCJcbiAgICBbYXR0ci5taW5MZW5ndGhdPVwic2NoZW1hLm1pbkxlbmd0aCB8fCBudWxsXCJcblx0XHRbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiPjwvdGV4dGFyZWE+XG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIFRleHRBcmVhV2lkZ2V0IGV4dGVuZHMgQ29udHJvbFdpZGdldCB7fVxuIl19