/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { ArrayLayoutWidget } from '../../widget';
export class ArrayWidget extends ArrayLayoutWidget {
    /**
     * @return {?}
     */
    addItem() {
        this.formProperty.addItem();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    removeItem(item) {
        this.formProperty.removeItem(item);
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackByIndex(index, item) {
        return index;
    }
}
ArrayWidget.decorators = [
    { type: Component, args: [{
                selector: 'sf-array-widget',
                template: `<div class="widget form-group">
	<label [attr.for]="id" class="horizontal control-label">
		{{ schema.title }}
	</label>
	<span *ngIf="schema.description" class="formHelp">{{schema.description}}</span>
	<div *ngFor="let itemProperty of formProperty.properties">
		<sf-form-element [formProperty]="itemProperty"></sf-form-element>
		<button (click)="removeItem(itemProperty)" class="btn btn-default array-remove-button">
			<span class="glyphicon glyphicon-minus" aria-hidden="true"></span> Remove
		</button>
	</div>
	<button (click)="addItem()" class="btn btn-default array-add-button">
		<span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add
	</button>
</div>`
            }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkud2lkZ2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2RlZmF1bHR3aWRnZXRzL2FycmF5L2FycmF5LndpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFxQmpELE1BQU0sT0FBTyxXQUFZLFNBQVEsaUJBQWlCOzs7O0lBRWhELE9BQU87UUFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLElBQWtCO1FBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7OztJQUVELFlBQVksQ0FBQyxLQUFhLEVBQUUsSUFBUztRQUNuQyxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7OztZQTlCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztPQWNMO2FBQ04iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQXJyYXlMYXlvdXRXaWRnZXQgfSBmcm9tICcuLi8uLi93aWRnZXQnO1xuaW1wb3J0IHsgRm9ybVByb3BlcnR5IH0gZnJvbSAnLi4vLi4vbW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1hcnJheS13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3aWRnZXQgZm9ybS1ncm91cFwiPlxuXHQ8bGFiZWwgW2F0dHIuZm9yXT1cImlkXCIgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cblx0XHR7eyBzY2hlbWEudGl0bGUgfX1cblx0PC9sYWJlbD5cblx0PHNwYW4gKm5nSWY9XCJzY2hlbWEuZGVzY3JpcHRpb25cIiBjbGFzcz1cImZvcm1IZWxwXCI+e3tzY2hlbWEuZGVzY3JpcHRpb259fTwvc3Bhbj5cblx0PGRpdiAqbmdGb3I9XCJsZXQgaXRlbVByb3BlcnR5IG9mIGZvcm1Qcm9wZXJ0eS5wcm9wZXJ0aWVzXCI+XG5cdFx0PHNmLWZvcm0tZWxlbWVudCBbZm9ybVByb3BlcnR5XT1cIml0ZW1Qcm9wZXJ0eVwiPjwvc2YtZm9ybS1lbGVtZW50PlxuXHRcdDxidXR0b24gKGNsaWNrKT1cInJlbW92ZUl0ZW0oaXRlbVByb3BlcnR5KVwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGFycmF5LXJlbW92ZS1idXR0b25cIj5cblx0XHRcdDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1taW51c1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4gUmVtb3ZlXG5cdFx0PC9idXR0b24+XG5cdDwvZGl2PlxuXHQ8YnV0dG9uIChjbGljayk9XCJhZGRJdGVtKClcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBhcnJheS1hZGQtYnV0dG9uXCI+XG5cdFx0PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+IEFkZFxuXHQ8L2J1dHRvbj5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgQXJyYXlXaWRnZXQgZXh0ZW5kcyBBcnJheUxheW91dFdpZGdldCB7XG5cbiAgYWRkSXRlbSgpIHtcbiAgICB0aGlzLmZvcm1Qcm9wZXJ0eS5hZGRJdGVtKCk7XG4gIH1cblxuICByZW1vdmVJdGVtKGl0ZW06IEZvcm1Qcm9wZXJ0eSkge1xuICAgIHRoaXMuZm9ybVByb3BlcnR5LnJlbW92ZUl0ZW0oaXRlbSk7XG4gIH1cblxuICB0cmFja0J5SW5kZXgoaW5kZXg6IG51bWJlciwgaXRlbTogYW55KSB7XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG59XG4iXX0=