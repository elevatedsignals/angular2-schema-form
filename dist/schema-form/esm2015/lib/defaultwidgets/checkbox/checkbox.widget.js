/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';
export class CheckboxWidget extends ControlWidget {
    constructor() {
        super(...arguments);
        this.checked = {};
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const control = this.control;
        this.formProperty.valueChanges.subscribe((newValue) => {
            if (control.value !== newValue) {
                control.setValue(newValue, { emitEvent: false });
                if (newValue && Array.isArray(newValue)) {
                    newValue.map(v => this.checked[v] = true);
                }
            }
        });
        this.formProperty.errorsChanges.subscribe((errors) => {
            control.setErrors(errors, { emitEvent: true });
        });
        control.valueChanges.subscribe((newValue) => {
            this.formProperty.setValue(newValue, false);
        });
    }
    /**
     * @param {?} el
     * @return {?}
     */
    onCheck(el) {
        if (el.checked) {
            this.checked[el.value] = true;
        }
        else {
            delete this.checked[el.value];
        }
        this.formProperty.setValue(Object.keys(this.checked), false);
    }
}
CheckboxWidget.decorators = [
    { type: Component, args: [{
                selector: 'sf-checkbox-widget',
                template: `<div class="widget form-group">
    <label [attr.for]="id" class="horizontal control-label">
        {{ schema.title }}
    </label>
	<div *ngIf="schema.type!='array'" class="checkbox">
		<label class="horizontal control-label">
			<input [formControl]="control" [attr.name]="name" [indeterminate]="control.value !== false && control.value !== true ? true :null" type="checkbox" [disabled]="schema.readOnly">
			<input *ngIf="schema.readOnly" [attr.name]="name" type="hidden" [formControl]="control">
			{{schema.description}}
		</label>
	</div>
	<ng-container *ngIf="schema.type==='array'">
		<div *ngFor="let option of schema.items.oneOf" class="checkbox">
			<label class="horizontal control-label">
				<input [attr.name]="name"
					value="{{option.enum[0]}}" type="checkbox" 
					[attr.disabled]="schema.readOnly"
					(change)="onCheck($event.target)"
					[attr.checked]="checked[option.enum[0]] ? true : null">
				{{option.description}}
			</label>
		</div>
	</ng-container>
</div>`
            }] }
];
if (false) {
    /** @type {?} */
    CheckboxWidget.prototype.checked;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gud2lkZ2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2RlZmF1bHR3aWRnZXRzL2NoZWNrYm94L2NoZWNrYm94LndpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQTZCN0MsTUFBTSxPQUFPLGNBQWUsU0FBUSxhQUFhO0lBM0JqRDs7UUE2QkMsWUFBTyxHQUFRLEVBQUUsQ0FBQztJQTRCbkIsQ0FBQzs7OztJQTFCQSxlQUFlOztjQUNSLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTztRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNyRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUMvQixPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLFFBQVEsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUN4QyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztpQkFDMUM7YUFDRDtRQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDcEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsRUFBRTtRQUNULElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRTtZQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztTQUM5QjthQUFNO1lBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5QjtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUM7OztZQXhERCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXVCTDthQUNOOzs7O0lBR0EsaUNBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbnRyb2xXaWRnZXQgfSBmcm9tICcuLi8uLi93aWRnZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1jaGVja2JveC13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3aWRnZXQgZm9ybS1ncm91cFwiPlxuICAgIDxsYWJlbCBbYXR0ci5mb3JdPVwiaWRcIiBjbGFzcz1cImhvcml6b250YWwgY29udHJvbC1sYWJlbFwiPlxuICAgICAgICB7eyBzY2hlbWEudGl0bGUgfX1cbiAgICA8L2xhYmVsPlxuXHQ8ZGl2ICpuZ0lmPVwic2NoZW1hLnR5cGUhPSdhcnJheSdcIiBjbGFzcz1cImNoZWNrYm94XCI+XG5cdFx0PGxhYmVsIGNsYXNzPVwiaG9yaXpvbnRhbCBjb250cm9sLWxhYmVsXCI+XG5cdFx0XHQ8aW5wdXQgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiBbaW5kZXRlcm1pbmF0ZV09XCJjb250cm9sLnZhbHVlICE9PSBmYWxzZSAmJiBjb250cm9sLnZhbHVlICE9PSB0cnVlID8gdHJ1ZSA6bnVsbFwiIHR5cGU9XCJjaGVja2JveFwiIFtkaXNhYmxlZF09XCJzY2hlbWEucmVhZE9ubHlcIj5cblx0XHRcdDxpbnB1dCAqbmdJZj1cInNjaGVtYS5yZWFkT25seVwiIFthdHRyLm5hbWVdPVwibmFtZVwiIHR5cGU9XCJoaWRkZW5cIiBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiPlxuXHRcdFx0e3tzY2hlbWEuZGVzY3JpcHRpb259fVxuXHRcdDwvbGFiZWw+XG5cdDwvZGl2PlxuXHQ8bmctY29udGFpbmVyICpuZ0lmPVwic2NoZW1hLnR5cGU9PT0nYXJyYXknXCI+XG5cdFx0PGRpdiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHNjaGVtYS5pdGVtcy5vbmVPZlwiIGNsYXNzPVwiY2hlY2tib3hcIj5cblx0XHRcdDxsYWJlbCBjbGFzcz1cImhvcml6b250YWwgY29udHJvbC1sYWJlbFwiPlxuXHRcdFx0XHQ8aW5wdXQgW2F0dHIubmFtZV09XCJuYW1lXCJcblx0XHRcdFx0XHR2YWx1ZT1cInt7b3B0aW9uLmVudW1bMF19fVwiIHR5cGU9XCJjaGVja2JveFwiIFxuXHRcdFx0XHRcdFthdHRyLmRpc2FibGVkXT1cInNjaGVtYS5yZWFkT25seVwiXG5cdFx0XHRcdFx0KGNoYW5nZSk9XCJvbkNoZWNrKCRldmVudC50YXJnZXQpXCJcblx0XHRcdFx0XHRbYXR0ci5jaGVja2VkXT1cImNoZWNrZWRbb3B0aW9uLmVudW1bMF1dID8gdHJ1ZSA6IG51bGxcIj5cblx0XHRcdFx0e3tvcHRpb24uZGVzY3JpcHRpb259fVxuXHRcdFx0PC9sYWJlbD5cblx0XHQ8L2Rpdj5cblx0PC9uZy1jb250YWluZXI+XG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrYm94V2lkZ2V0IGV4dGVuZHMgQ29udHJvbFdpZGdldCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG5cdGNoZWNrZWQ6IGFueSA9IHt9O1xuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHRjb25zdCBjb250cm9sID0gdGhpcy5jb250cm9sO1xuXHRcdHRoaXMuZm9ybVByb3BlcnR5LnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XG5cdFx0XHRpZiAoY29udHJvbC52YWx1ZSAhPT0gbmV3VmFsdWUpIHtcblx0XHRcdFx0Y29udHJvbC5zZXRWYWx1ZShuZXdWYWx1ZSwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuXHRcdFx0XHRpZiAobmV3VmFsdWUgJiYgQXJyYXkuaXNBcnJheShuZXdWYWx1ZSkpIHtcblx0XHRcdFx0XHRuZXdWYWx1ZS5tYXAodiA9PiB0aGlzLmNoZWNrZWRbdl0gPSB0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuZm9ybVByb3BlcnR5LmVycm9yc0NoYW5nZXMuc3Vic2NyaWJlKChlcnJvcnMpID0+IHtcblx0XHRcdGNvbnRyb2wuc2V0RXJyb3JzKGVycm9ycywgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XG5cdFx0fSk7XG5cdFx0Y29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xuXHRcdFx0dGhpcy5mb3JtUHJvcGVydHkuc2V0VmFsdWUobmV3VmFsdWUsIGZhbHNlKTtcblx0XHR9KTtcblx0fVxuXG5cdG9uQ2hlY2soZWwpIHtcblx0XHRpZiAoZWwuY2hlY2tlZCkge1xuXHRcdFx0dGhpcy5jaGVja2VkW2VsLnZhbHVlXSA9IHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlbGV0ZSB0aGlzLmNoZWNrZWRbZWwudmFsdWVdO1xuXHRcdH1cblx0XHR0aGlzLmZvcm1Qcm9wZXJ0eS5zZXRWYWx1ZShPYmplY3Qua2V5cyh0aGlzLmNoZWNrZWQpLCBmYWxzZSk7XG5cdH1cbn1cbiJdfQ==