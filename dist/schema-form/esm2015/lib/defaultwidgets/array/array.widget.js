import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ArrayLayoutWidget } from '../../widget';
let ArrayWidget = class ArrayWidget extends ArrayLayoutWidget {
    addItem() {
        this.formProperty.addItem();
        this.updateButtonDisabledState();
    }
    removeItem(item) {
        this.formProperty.removeItem(item);
        this.updateButtonDisabledState();
    }
    trackByIndex(index, item) {
        return index;
    }
    updateButtonDisabledState() {
        this.buttonDisabledAdd = this.isAddButtonDisabled();
        this.buttonDisabledRemove = this.isRemoveButtonDisabled();
    }
    isAddButtonDisabled() {
        if (this.schema.hasOwnProperty('maxItems') && Array.isArray(this.formProperty.properties)) {
            if (this.formProperty.properties.length >= this.schema.maxItems) {
                return true;
            }
        }
        return false;
    }
    isRemoveButtonDisabled() {
        if (this.schema.hasOwnProperty('minItems') && Array.isArray(this.formProperty.properties)) {
            if (this.formProperty.properties.length <= this.schema.minItems) {
                return true;
            }
        }
        return false;
    }
};
ArrayWidget = __decorate([
    Component({
        selector: 'sf-array-widget',
        template: `<div class="widget form-group">
	<label [attr.for]="id" class="horizontal control-label">
		{{ schema.title }}
	</label>
	<span *ngIf="schema.description" class="formHelp">{{schema.description}}</span>
	<div *ngFor="let itemProperty of formProperty.properties">
		<sf-form-element [formProperty]="itemProperty"></sf-form-element>
		<button (click)="removeItem(itemProperty)" class="btn btn-default array-remove-button"
			[disabled]="isRemoveButtonDisabled()" 
			*ngIf="!(schema.hasOwnProperty('minItems') && schema.hasOwnProperty('maxItems') && schema.minItems === schema.maxItems)"
			>
			<span class="glyphicon glyphicon-minus" aria-hidden="true"></span> Remove
		</button>
	</div>
	<button (click)="addItem()" class="btn btn-default array-add-button"
		[disabled]="isAddButtonDisabled()"
		*ngIf="!(schema.hasOwnProperty('minItems') && schema.hasOwnProperty('maxItems') && schema.minItems === schema.maxItems)"
	>
		<span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add
	</button>
</div>`
    })
], ArrayWidget);
export { ArrayWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkud2lkZ2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2RlZmF1bHR3aWRnZXRzL2FycmF5L2FycmF5LndpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUEyQmpELElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVksU0FBUSxpQkFBaUI7SUFJaEQsT0FBTztRQUNSLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUE7SUFDL0IsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFrQjtRQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQTtJQUMvQixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQWEsRUFBRSxJQUFTO1FBQ25DLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVGLHlCQUF5QjtRQUN4QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUE7UUFDbkQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFBO0lBQzFELENBQUM7SUFDRCxtQkFBbUI7UUFDbEIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDMUYsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQ2hFLE9BQU8sSUFBSSxDQUFBO2FBQ1g7U0FDRDtRQUNELE9BQU8sS0FBSyxDQUFBO0lBQ2IsQ0FBQztJQUVELHNCQUFzQjtRQUNyQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUMxRixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtnQkFDaEUsT0FBTyxJQUFJLENBQUE7YUFDWDtTQUNEO1FBQ0QsT0FBTyxLQUFLLENBQUE7SUFDYixDQUFDO0NBQ0QsQ0FBQTtBQXZDWSxXQUFXO0lBeEJ2QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FvQkw7S0FDTixDQUFDO0dBQ1csV0FBVyxDQXVDdkI7U0F2Q1ksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBcnJheUxheW91dFdpZGdldCB9IGZyb20gJy4uLy4uL3dpZGdldCc7XG5pbXBvcnQgeyBGb3JtUHJvcGVydHkgfSBmcm9tICcuLi8uLi9tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWFycmF5LXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIndpZGdldCBmb3JtLWdyb3VwXCI+XG5cdDxsYWJlbCBbYXR0ci5mb3JdPVwiaWRcIiBjbGFzcz1cImhvcml6b250YWwgY29udHJvbC1sYWJlbFwiPlxuXHRcdHt7IHNjaGVtYS50aXRsZSB9fVxuXHQ8L2xhYmVsPlxuXHQ8c3BhbiAqbmdJZj1cInNjaGVtYS5kZXNjcmlwdGlvblwiIGNsYXNzPVwiZm9ybUhlbHBcIj57e3NjaGVtYS5kZXNjcmlwdGlvbn19PC9zcGFuPlxuXHQ8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtUHJvcGVydHkgb2YgZm9ybVByb3BlcnR5LnByb3BlcnRpZXNcIj5cblx0XHQ8c2YtZm9ybS1lbGVtZW50IFtmb3JtUHJvcGVydHldPVwiaXRlbVByb3BlcnR5XCI+PC9zZi1mb3JtLWVsZW1lbnQ+XG5cdFx0PGJ1dHRvbiAoY2xpY2spPVwicmVtb3ZlSXRlbShpdGVtUHJvcGVydHkpXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYXJyYXktcmVtb3ZlLWJ1dHRvblwiXG5cdFx0XHRbZGlzYWJsZWRdPVwiaXNSZW1vdmVCdXR0b25EaXNhYmxlZCgpXCIgXG5cdFx0XHQqbmdJZj1cIiEoc2NoZW1hLmhhc093blByb3BlcnR5KCdtaW5JdGVtcycpICYmIHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnbWF4SXRlbXMnKSAmJiBzY2hlbWEubWluSXRlbXMgPT09IHNjaGVtYS5tYXhJdGVtcylcIlxuXHRcdFx0PlxuXHRcdFx0PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLW1pbnVzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPiBSZW1vdmVcblx0XHQ8L2J1dHRvbj5cblx0PC9kaXY+XG5cdDxidXR0b24gKGNsaWNrKT1cImFkZEl0ZW0oKVwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGFycmF5LWFkZC1idXR0b25cIlxuXHRcdFtkaXNhYmxlZF09XCJpc0FkZEJ1dHRvbkRpc2FibGVkKClcIlxuXHRcdCpuZ0lmPVwiIShzY2hlbWEuaGFzT3duUHJvcGVydHkoJ21pbkl0ZW1zJykgJiYgc2NoZW1hLmhhc093blByb3BlcnR5KCdtYXhJdGVtcycpICYmIHNjaGVtYS5taW5JdGVtcyA9PT0gc2NoZW1hLm1heEl0ZW1zKVwiXG5cdD5cblx0XHQ8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcGx1c1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4gQWRkXG5cdDwvYnV0dG9uPlxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBBcnJheVdpZGdldCBleHRlbmRzIEFycmF5TGF5b3V0V2lkZ2V0IHtcbiAgYnV0dG9uRGlzYWJsZWRBZGQ6Ym9vbGVhblxuICBidXR0b25EaXNhYmxlZFJlbW92ZTpib29sZWFuXG5cbiAgYWRkSXRlbSgpIHtcblx0dGhpcy5mb3JtUHJvcGVydHkuYWRkSXRlbSgpO1xuXHR0aGlzLnVwZGF0ZUJ1dHRvbkRpc2FibGVkU3RhdGUoKVxuICB9XG5cbiAgcmVtb3ZlSXRlbShpdGVtOiBGb3JtUHJvcGVydHkpIHtcblx0dGhpcy5mb3JtUHJvcGVydHkucmVtb3ZlSXRlbShpdGVtKTtcblx0dGhpcy51cGRhdGVCdXR0b25EaXNhYmxlZFN0YXRlKClcbiAgfVxuXG4gIHRyYWNrQnlJbmRleChpbmRleDogbnVtYmVyLCBpdGVtOiBhbnkpIHtcbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cblxuXHR1cGRhdGVCdXR0b25EaXNhYmxlZFN0YXRlKCkge1xuXHRcdHRoaXMuYnV0dG9uRGlzYWJsZWRBZGQgPSB0aGlzLmlzQWRkQnV0dG9uRGlzYWJsZWQoKVxuXHRcdHRoaXMuYnV0dG9uRGlzYWJsZWRSZW1vdmUgPSB0aGlzLmlzUmVtb3ZlQnV0dG9uRGlzYWJsZWQoKVxuXHR9XG5cdGlzQWRkQnV0dG9uRGlzYWJsZWQoKSB7XG5cdFx0aWYgKHRoaXMuc2NoZW1hLmhhc093blByb3BlcnR5KCdtYXhJdGVtcycpICYmIEFycmF5LmlzQXJyYXkodGhpcy5mb3JtUHJvcGVydHkucHJvcGVydGllcykpIHtcblx0XHRcdGlmICh0aGlzLmZvcm1Qcm9wZXJ0eS5wcm9wZXJ0aWVzLmxlbmd0aCA+PSB0aGlzLnNjaGVtYS5tYXhJdGVtcykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2Vcblx0fVxuXG5cdGlzUmVtb3ZlQnV0dG9uRGlzYWJsZWQoKSB7XG5cdFx0aWYgKHRoaXMuc2NoZW1hLmhhc093blByb3BlcnR5KCdtaW5JdGVtcycpICYmIEFycmF5LmlzQXJyYXkodGhpcy5mb3JtUHJvcGVydHkucHJvcGVydGllcykpIHtcblx0XHRcdGlmICh0aGlzLmZvcm1Qcm9wZXJ0eS5wcm9wZXJ0aWVzLmxlbmd0aCA8PSB0aGlzLnNjaGVtYS5taW5JdGVtcykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2Vcblx0fVxufVxuIl19