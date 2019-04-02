/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';
export class SelectWidget extends ControlWidget {
}
SelectWidget.decorators = [
    { type: Component, args: [{
                selector: 'sf-select-widget',
                template: `<div class="widget form-group">
	<label [attr.for]="id" class="horizontal control-label">
		{{ schema.title }}
	</label>

	<span *ngIf="schema.description" class="formHelp">
		{{schema.description}}
	</span>

	<select *ngIf="schema.type!='array'" [formControl]="control" [attr.name]="name" [disabled]="schema.readOnly" class="form-control">
		<option *ngFor="let option of schema.oneOf" [ngValue]="option.enum[0]" >{{option.description}}</option>
	</select>

	<select *ngIf="schema.type==='array'" multiple [formControl]="control" [attr.name]="name" [disabled]="schema.readOnly" class="form-control">
		<option *ngFor="let option of schema.items.oneOf" [ngValue]="option.enum[0]" >{{option.description}}</option>
	</select>

	<input *ngIf="schema.readOnly" [attr.name]="name" type="hidden" [formControl]="control">
</div>`
            }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LndpZGdldC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9kZWZhdWx0d2lkZ2V0cy9zZWxlY3Qvc2VsZWN0LndpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBd0I3QyxNQUFNLE9BQU8sWUFBYSxTQUFRLGFBQWE7OztZQXRCOUMsU0FBUyxTQUFDO2dCQUNWLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0JKO2FBQ04iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29udHJvbFdpZGdldCB9IGZyb20gJy4uLy4uL3dpZGdldCc7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ3NmLXNlbGVjdC13aWRnZXQnLFxuXHR0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3aWRnZXQgZm9ybS1ncm91cFwiPlxuXHQ8bGFiZWwgW2F0dHIuZm9yXT1cImlkXCIgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cblx0XHR7eyBzY2hlbWEudGl0bGUgfX1cblx0PC9sYWJlbD5cblxuXHQ8c3BhbiAqbmdJZj1cInNjaGVtYS5kZXNjcmlwdGlvblwiIGNsYXNzPVwiZm9ybUhlbHBcIj5cblx0XHR7e3NjaGVtYS5kZXNjcmlwdGlvbn19XG5cdDwvc3Bhbj5cblxuXHQ8c2VsZWN0ICpuZ0lmPVwic2NoZW1hLnR5cGUhPSdhcnJheSdcIiBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiIFthdHRyLm5hbWVdPVwibmFtZVwiIFtkaXNhYmxlZF09XCJzY2hlbWEucmVhZE9ubHlcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuXHRcdDxvcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBzY2hlbWEub25lT2ZcIiBbbmdWYWx1ZV09XCJvcHRpb24uZW51bVswXVwiID57e29wdGlvbi5kZXNjcmlwdGlvbn19PC9vcHRpb24+XG5cdDwvc2VsZWN0PlxuXG5cdDxzZWxlY3QgKm5nSWY9XCJzY2hlbWEudHlwZT09PSdhcnJheSdcIiBtdWx0aXBsZSBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiIFthdHRyLm5hbWVdPVwibmFtZVwiIFtkaXNhYmxlZF09XCJzY2hlbWEucmVhZE9ubHlcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuXHRcdDxvcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBzY2hlbWEuaXRlbXMub25lT2ZcIiBbbmdWYWx1ZV09XCJvcHRpb24uZW51bVswXVwiID57e29wdGlvbi5kZXNjcmlwdGlvbn19PC9vcHRpb24+XG5cdDwvc2VsZWN0PlxuXG5cdDxpbnB1dCAqbmdJZj1cInNjaGVtYS5yZWFkT25seVwiIFthdHRyLm5hbWVdPVwibmFtZVwiIHR5cGU9XCJoaWRkZW5cIiBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiPlxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RXaWRnZXQgZXh0ZW5kcyBDb250cm9sV2lkZ2V0IHt9XG4iXX0=