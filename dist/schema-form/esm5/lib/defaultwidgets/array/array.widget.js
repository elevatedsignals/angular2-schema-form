import { __decorate, __extends } from "tslib";
import { Component } from '@angular/core';
import { ArrayLayoutWidget } from '../../widget';
var ArrayWidget = /** @class */ (function (_super) {
    __extends(ArrayWidget, _super);
    function ArrayWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArrayWidget.prototype.addItem = function () {
        this.formProperty.addItem();
        this.updateButtonDisabledState();
    };
    ArrayWidget.prototype.removeItem = function (item) {
        this.formProperty.removeItem(item);
        this.updateButtonDisabledState();
    };
    ArrayWidget.prototype.trackByIndex = function (index, item) {
        return index;
    };
    ArrayWidget.prototype.updateButtonDisabledState = function () {
        this.buttonDisabledAdd = this.isAddButtonDisabled();
        this.buttonDisabledRemove = this.isRemoveButtonDisabled();
    };
    ArrayWidget.prototype.isAddButtonDisabled = function () {
        if (this.schema.hasOwnProperty('maxItems') && Array.isArray(this.formProperty.properties)) {
            if (this.formProperty.properties.length >= this.schema.maxItems) {
                return true;
            }
        }
        return false;
    };
    ArrayWidget.prototype.isRemoveButtonDisabled = function () {
        if (this.schema.hasOwnProperty('minItems') && Array.isArray(this.formProperty.properties)) {
            if (this.formProperty.properties.length <= this.schema.minItems) {
                return true;
            }
        }
        return false;
    };
    ArrayWidget = __decorate([
        Component({
            selector: 'sf-array-widget',
            template: "<div class=\"widget form-group\">\n\t<label [attr.for]=\"id\" class=\"horizontal control-label\">\n\t\t{{ schema.title }}\n\t</label>\n\t<span *ngIf=\"schema.description\" class=\"formHelp\">{{schema.description}}</span>\n\t<div *ngFor=\"let itemProperty of formProperty.properties\">\n\t\t<sf-form-element [formProperty]=\"itemProperty\"></sf-form-element>\n\t\t<button (click)=\"removeItem(itemProperty)\" class=\"btn btn-default array-remove-button\"\n\t\t\t[disabled]=\"isRemoveButtonDisabled()\" \n\t\t\t*ngIf=\"!(schema.hasOwnProperty('minItems') && schema.hasOwnProperty('maxItems') && schema.minItems === schema.maxItems)\"\n\t\t\t>\n\t\t\t<span class=\"glyphicon glyphicon-minus\" aria-hidden=\"true\"></span> Remove\n\t\t</button>\n\t</div>\n\t<button (click)=\"addItem()\" class=\"btn btn-default array-add-button\"\n\t\t[disabled]=\"isAddButtonDisabled()\"\n\t\t*ngIf=\"!(schema.hasOwnProperty('minItems') && schema.hasOwnProperty('maxItems') && schema.minItems === schema.maxItems)\"\n\t>\n\t\t<span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span> Add\n\t</button>\n</div>"
        })
    ], ArrayWidget);
    return ArrayWidget;
}(ArrayLayoutWidget));
export { ArrayWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkud2lkZ2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2RlZmF1bHR3aWRnZXRzL2FycmF5L2FycmF5LndpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUEyQmpEO0lBQWlDLCtCQUFpQjtJQUFsRDs7SUF1Q0EsQ0FBQztJQW5DQyw2QkFBTyxHQUFQO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQTtJQUMvQixDQUFDO0lBRUQsZ0NBQVUsR0FBVixVQUFXLElBQWtCO1FBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFBO0lBQy9CLENBQUM7SUFFRCxrQ0FBWSxHQUFaLFVBQWEsS0FBYSxFQUFFLElBQVM7UUFDbkMsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUYsK0NBQXlCLEdBQXpCO1FBQ0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO1FBQ25ELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQTtJQUMxRCxDQUFDO0lBQ0QseUNBQW1CLEdBQW5CO1FBQ0MsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDMUYsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQ2hFLE9BQU8sSUFBSSxDQUFBO2FBQ1g7U0FDRDtRQUNELE9BQU8sS0FBSyxDQUFBO0lBQ2IsQ0FBQztJQUVELDRDQUFzQixHQUF0QjtRQUNDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzFGLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUNoRSxPQUFPLElBQUksQ0FBQTthQUNYO1NBQ0Q7UUFDRCxPQUFPLEtBQUssQ0FBQTtJQUNiLENBQUM7SUF0Q1csV0FBVztRQXhCdkIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixRQUFRLEVBQUUsK2tDQW9CTDtTQUNOLENBQUM7T0FDVyxXQUFXLENBdUN2QjtJQUFELGtCQUFDO0NBQUEsQUF2Q0QsQ0FBaUMsaUJBQWlCLEdBdUNqRDtTQXZDWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFycmF5TGF5b3V0V2lkZ2V0IH0gZnJvbSAnLi4vLi4vd2lkZ2V0JztcbmltcG9ydCB7IEZvcm1Qcm9wZXJ0eSB9IGZyb20gJy4uLy4uL21vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtYXJyYXktd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwid2lkZ2V0IGZvcm0tZ3JvdXBcIj5cblx0PGxhYmVsIFthdHRyLmZvcl09XCJpZFwiIGNsYXNzPVwiaG9yaXpvbnRhbCBjb250cm9sLWxhYmVsXCI+XG5cdFx0e3sgc2NoZW1hLnRpdGxlIH19XG5cdDwvbGFiZWw+XG5cdDxzcGFuICpuZ0lmPVwic2NoZW1hLmRlc2NyaXB0aW9uXCIgY2xhc3M9XCJmb3JtSGVscFwiPnt7c2NoZW1hLmRlc2NyaXB0aW9ufX08L3NwYW4+XG5cdDxkaXYgKm5nRm9yPVwibGV0IGl0ZW1Qcm9wZXJ0eSBvZiBmb3JtUHJvcGVydHkucHJvcGVydGllc1wiPlxuXHRcdDxzZi1mb3JtLWVsZW1lbnQgW2Zvcm1Qcm9wZXJ0eV09XCJpdGVtUHJvcGVydHlcIj48L3NmLWZvcm0tZWxlbWVudD5cblx0XHQ8YnV0dG9uIChjbGljayk9XCJyZW1vdmVJdGVtKGl0ZW1Qcm9wZXJ0eSlcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBhcnJheS1yZW1vdmUtYnV0dG9uXCJcblx0XHRcdFtkaXNhYmxlZF09XCJpc1JlbW92ZUJ1dHRvbkRpc2FibGVkKClcIiBcblx0XHRcdCpuZ0lmPVwiIShzY2hlbWEuaGFzT3duUHJvcGVydHkoJ21pbkl0ZW1zJykgJiYgc2NoZW1hLmhhc093blByb3BlcnR5KCdtYXhJdGVtcycpICYmIHNjaGVtYS5taW5JdGVtcyA9PT0gc2NoZW1hLm1heEl0ZW1zKVwiXG5cdFx0XHQ+XG5cdFx0XHQ8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tbWludXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+IFJlbW92ZVxuXHRcdDwvYnV0dG9uPlxuXHQ8L2Rpdj5cblx0PGJ1dHRvbiAoY2xpY2spPVwiYWRkSXRlbSgpXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYXJyYXktYWRkLWJ1dHRvblwiXG5cdFx0W2Rpc2FibGVkXT1cImlzQWRkQnV0dG9uRGlzYWJsZWQoKVwiXG5cdFx0Km5nSWY9XCIhKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnbWluSXRlbXMnKSAmJiBzY2hlbWEuaGFzT3duUHJvcGVydHkoJ21heEl0ZW1zJykgJiYgc2NoZW1hLm1pbkl0ZW1zID09PSBzY2hlbWEubWF4SXRlbXMpXCJcblx0PlxuXHRcdDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPiBBZGRcblx0PC9idXR0b24+XG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIEFycmF5V2lkZ2V0IGV4dGVuZHMgQXJyYXlMYXlvdXRXaWRnZXQge1xuICBidXR0b25EaXNhYmxlZEFkZDpib29sZWFuXG4gIGJ1dHRvbkRpc2FibGVkUmVtb3ZlOmJvb2xlYW5cblxuICBhZGRJdGVtKCkge1xuXHR0aGlzLmZvcm1Qcm9wZXJ0eS5hZGRJdGVtKCk7XG5cdHRoaXMudXBkYXRlQnV0dG9uRGlzYWJsZWRTdGF0ZSgpXG4gIH1cblxuICByZW1vdmVJdGVtKGl0ZW06IEZvcm1Qcm9wZXJ0eSkge1xuXHR0aGlzLmZvcm1Qcm9wZXJ0eS5yZW1vdmVJdGVtKGl0ZW0pO1xuXHR0aGlzLnVwZGF0ZUJ1dHRvbkRpc2FibGVkU3RhdGUoKVxuICB9XG5cbiAgdHJhY2tCeUluZGV4KGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkge1xuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG5cdHVwZGF0ZUJ1dHRvbkRpc2FibGVkU3RhdGUoKSB7XG5cdFx0dGhpcy5idXR0b25EaXNhYmxlZEFkZCA9IHRoaXMuaXNBZGRCdXR0b25EaXNhYmxlZCgpXG5cdFx0dGhpcy5idXR0b25EaXNhYmxlZFJlbW92ZSA9IHRoaXMuaXNSZW1vdmVCdXR0b25EaXNhYmxlZCgpXG5cdH1cblx0aXNBZGRCdXR0b25EaXNhYmxlZCgpIHtcblx0XHRpZiAodGhpcy5zY2hlbWEuaGFzT3duUHJvcGVydHkoJ21heEl0ZW1zJykgJiYgQXJyYXkuaXNBcnJheSh0aGlzLmZvcm1Qcm9wZXJ0eS5wcm9wZXJ0aWVzKSkge1xuXHRcdFx0aWYgKHRoaXMuZm9ybVByb3BlcnR5LnByb3BlcnRpZXMubGVuZ3RoID49IHRoaXMuc2NoZW1hLm1heEl0ZW1zKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZVxuXHR9XG5cblx0aXNSZW1vdmVCdXR0b25EaXNhYmxlZCgpIHtcblx0XHRpZiAodGhpcy5zY2hlbWEuaGFzT3duUHJvcGVydHkoJ21pbkl0ZW1zJykgJiYgQXJyYXkuaXNBcnJheSh0aGlzLmZvcm1Qcm9wZXJ0eS5wcm9wZXJ0aWVzKSkge1xuXHRcdFx0aWYgKHRoaXMuZm9ybVByb3BlcnR5LnByb3BlcnRpZXMubGVuZ3RoIDw9IHRoaXMuc2NoZW1hLm1pbkl0ZW1zKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZVxuXHR9XG59XG4iXX0=