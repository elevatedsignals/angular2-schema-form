/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';
export class TextAreaWidget extends ControlWidget {
}
TextAreaWidget.decorators = [
    { type: Component, args: [{
                selector: 'sf-textarea-widget',
                template: `<div class="widget form-group">
	<label [attr.for]="id" class="horizontal control-label">
		{{ schema.title }}
	</label>
    <span *ngIf="schema.description" class="formHelp">{{schema.description}}</span>
	<textarea [readonly]="schema.readOnly" [name]="name"
		class="text-widget textarea-widget form-control"
		[attr.placeholder]="schema.placeholder"
		[attr.maxLength]="schema.maxLength || null"
    [attr.minLength]="schema.minLength || null"
		[formControl]="control"></textarea>
</div>`
            }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEud2lkZ2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2RlZmF1bHR3aWRnZXRzL3RleHRhcmVhL3RleHRhcmVhLndpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBaUI3QyxNQUFNLE9BQU8sY0FBZSxTQUFRLGFBQWE7OztZQWZoRCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7OztPQVdMO2FBQ04iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29udHJvbFdpZGdldCB9IGZyb20gJy4uLy4uL3dpZGdldCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLXRleHRhcmVhLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIndpZGdldCBmb3JtLWdyb3VwXCI+XG5cdDxsYWJlbCBbYXR0ci5mb3JdPVwiaWRcIiBjbGFzcz1cImhvcml6b250YWwgY29udHJvbC1sYWJlbFwiPlxuXHRcdHt7IHNjaGVtYS50aXRsZSB9fVxuXHQ8L2xhYmVsPlxuICAgIDxzcGFuICpuZ0lmPVwic2NoZW1hLmRlc2NyaXB0aW9uXCIgY2xhc3M9XCJmb3JtSGVscFwiPnt7c2NoZW1hLmRlc2NyaXB0aW9ufX08L3NwYW4+XG5cdDx0ZXh0YXJlYSBbcmVhZG9ubHldPVwic2NoZW1hLnJlYWRPbmx5XCIgW25hbWVdPVwibmFtZVwiXG5cdFx0Y2xhc3M9XCJ0ZXh0LXdpZGdldCB0ZXh0YXJlYS13aWRnZXQgZm9ybS1jb250cm9sXCJcblx0XHRbYXR0ci5wbGFjZWhvbGRlcl09XCJzY2hlbWEucGxhY2Vob2xkZXJcIlxuXHRcdFthdHRyLm1heExlbmd0aF09XCJzY2hlbWEubWF4TGVuZ3RoIHx8IG51bGxcIlxuICAgIFthdHRyLm1pbkxlbmd0aF09XCJzY2hlbWEubWluTGVuZ3RoIHx8IG51bGxcIlxuXHRcdFtmb3JtQ29udHJvbF09XCJjb250cm9sXCI+PC90ZXh0YXJlYT5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgVGV4dEFyZWFXaWRnZXQgZXh0ZW5kcyBDb250cm9sV2lkZ2V0IHt9XG4iXX0=