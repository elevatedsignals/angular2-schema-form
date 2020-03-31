import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';
let StringWidget = class StringWidget extends ControlWidget {
    getInputType() {
        if (!this.schema.widget.id || this.schema.widget.id === 'string') {
            return 'text';
        }
        else {
            return this.schema.widget.id;
        }
    }
};
StringWidget = __decorate([
    Component({
        selector: 'sf-string-widget',
        template: `<input *ngIf="this.schema.widget.id ==='hidden'; else notHiddenFieldBlock"
  [attr.name]="name" type="hidden" [formControl]="control">
<ng-template #notHiddenFieldBlock>
<div class="widget form-group">
    <label [attr.for]="id" class="horizontal control-label">
    	{{ schema.title }}
    </label>
    <span *ngIf="schema.description" class="formHelp">{{schema.description}}</span>
    <input [name]="name" [attr.readonly]="(schema.widget.id!=='color') && schema.readOnly?true:null"
    class="text-widget.id textline-widget form-control"
    [attr.type]="!this.schema.widget.id || this.schema.widget.id === 'string' ? 'text' : this.schema.widget.id"
    [attr.id]="id"  [formControl]="control" [attr.placeholder]="schema.placeholder"
    [attr.maxLength]="schema.maxLength || null"
    [attr.minLength]="schema.minLength || null"
    [attr.required]="schema.isRequired || null"
    [attr.disabled]="(schema.widget.id=='color' && schema.readOnly)?true:null">
    <input *ngIf="(schema.widget.id==='color' && schema.readOnly)" [attr.name]="name" type="hidden" [formControl]="control">
</div>
</ng-template>`
    })
], StringWidget);
export { StringWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLndpZGdldC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9kZWZhdWx0d2lkZ2V0cy9zdHJpbmcvc3RyaW5nLndpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBd0I3QyxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFhLFNBQVEsYUFBYTtJQUUzQyxZQUFZO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssUUFBUSxFQUFFO1lBQzlELE9BQU8sTUFBTSxDQUFDO1NBQ2pCO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztTQUNoQztJQUNMLENBQUM7Q0FDSixDQUFBO0FBVFksWUFBWTtJQXRCeEIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQWtCRztLQUNkLENBQUM7R0FDVyxZQUFZLENBU3hCO1NBVFksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb250cm9sV2lkZ2V0IH0gZnJvbSAnLi4vLi4vd2lkZ2V0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2Ytc3RyaW5nLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgPGlucHV0ICpuZ0lmPVwidGhpcy5zY2hlbWEud2lkZ2V0LmlkID09PSdoaWRkZW4nOyBlbHNlIG5vdEhpZGRlbkZpZWxkQmxvY2tcIlxuICBbYXR0ci5uYW1lXT1cIm5hbWVcIiB0eXBlPVwiaGlkZGVuXCIgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIj5cbjxuZy10ZW1wbGF0ZSAjbm90SGlkZGVuRmllbGRCbG9jaz5cbjxkaXYgY2xhc3M9XCJ3aWRnZXQgZm9ybS1ncm91cFwiPlxuICAgIDxsYWJlbCBbYXR0ci5mb3JdPVwiaWRcIiBjbGFzcz1cImhvcml6b250YWwgY29udHJvbC1sYWJlbFwiPlxuICAgIFx0e3sgc2NoZW1hLnRpdGxlIH19XG4gICAgPC9sYWJlbD5cbiAgICA8c3BhbiAqbmdJZj1cInNjaGVtYS5kZXNjcmlwdGlvblwiIGNsYXNzPVwiZm9ybUhlbHBcIj57e3NjaGVtYS5kZXNjcmlwdGlvbn19PC9zcGFuPlxuICAgIDxpbnB1dCBbbmFtZV09XCJuYW1lXCIgW2F0dHIucmVhZG9ubHldPVwiKHNjaGVtYS53aWRnZXQuaWQhPT0nY29sb3InKSAmJiBzY2hlbWEucmVhZE9ubHk/dHJ1ZTpudWxsXCJcbiAgICBjbGFzcz1cInRleHQtd2lkZ2V0LmlkIHRleHRsaW5lLXdpZGdldCBmb3JtLWNvbnRyb2xcIlxuICAgIFthdHRyLnR5cGVdPVwiIXRoaXMuc2NoZW1hLndpZGdldC5pZCB8fCB0aGlzLnNjaGVtYS53aWRnZXQuaWQgPT09ICdzdHJpbmcnID8gJ3RleHQnIDogdGhpcy5zY2hlbWEud2lkZ2V0LmlkXCJcbiAgICBbYXR0ci5pZF09XCJpZFwiICBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiIFthdHRyLnBsYWNlaG9sZGVyXT1cInNjaGVtYS5wbGFjZWhvbGRlclwiXG4gICAgW2F0dHIubWF4TGVuZ3RoXT1cInNjaGVtYS5tYXhMZW5ndGggfHwgbnVsbFwiXG4gICAgW2F0dHIubWluTGVuZ3RoXT1cInNjaGVtYS5taW5MZW5ndGggfHwgbnVsbFwiXG4gICAgW2F0dHIucmVxdWlyZWRdPVwic2NoZW1hLmlzUmVxdWlyZWQgfHwgbnVsbFwiXG4gICAgW2F0dHIuZGlzYWJsZWRdPVwiKHNjaGVtYS53aWRnZXQuaWQ9PSdjb2xvcicgJiYgc2NoZW1hLnJlYWRPbmx5KT90cnVlOm51bGxcIj5cbiAgICA8aW5wdXQgKm5nSWY9XCIoc2NoZW1hLndpZGdldC5pZD09PSdjb2xvcicgJiYgc2NoZW1hLnJlYWRPbmx5KVwiIFthdHRyLm5hbWVdPVwibmFtZVwiIHR5cGU9XCJoaWRkZW5cIiBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiPlxuPC9kaXY+XG48L25nLXRlbXBsYXRlPmBcbn0pXG5leHBvcnQgY2xhc3MgU3RyaW5nV2lkZ2V0IGV4dGVuZHMgQ29udHJvbFdpZGdldCB7XG5cbiAgICBnZXRJbnB1dFR5cGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5zY2hlbWEud2lkZ2V0LmlkIHx8IHRoaXMuc2NoZW1hLndpZGdldC5pZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiAndGV4dCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zY2hlbWEud2lkZ2V0LmlkO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19