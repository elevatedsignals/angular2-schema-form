/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, ContentChildren, QueryList, ElementRef } from '@angular/core';
import { merge } from 'rxjs';
import { ActionRegistry } from '../../model/actionregistry';
import { TemplateSchemaService } from '../template-schema.service';
import { ButtonComponent } from '../button/button.component';
import { FieldParent } from './field-parent';
import { FieldType } from './field';
import { ItemComponent } from './item/item.component';
export class FieldComponent extends FieldParent {
    /**
     * @param {?} elementRef
     * @param {?} templateSchemaService
     * @param {?} actionRegistry
     */
    constructor(elementRef, templateSchemaService, actionRegistry) {
        super();
        this.elementRef = elementRef;
        this.templateSchemaService = templateSchemaService;
        this.actionRegistry = actionRegistry;
        this.type = FieldType.String;
        this.schema = {};
    }
    /**
     * @return {?}
     */
    getSchema() {
        const { properties, items, required } = this.getFieldsSchema(this.childFields.filter(field => field !== this));
        /** @type {?} */
        const oneOf = this.getOneOf();
        /** @type {?} */
        const schema = (/** @type {?} */ ({
            type: this.type
        }));
        if (this.title !== undefined) {
            schema.title = this.title;
        }
        if (properties !== undefined) {
            schema.properties = properties;
        }
        if (items !== undefined) {
            schema.items = items;
        }
        // requried child fields
        if (required !== undefined) {
            schema.required = required;
        }
        if (oneOf !== undefined) {
            schema.oneOf = oneOf;
        }
        if (this.description !== undefined) {
            schema.description = this.description;
        }
        if (this.placeholder !== undefined) {
            schema.placeholder = this.placeholder;
        }
        if (this.format !== undefined) {
            schema.format = this.format;
        }
        if (this.widget !== undefined) {
            schema.widget = this.widget;
        }
        if (this.readOnly !== undefined) {
            schema.readOnly = this.readOnly;
        }
        /** @type {?} */
        const buttons = this.getButtons();
        if (buttons.length > 0) {
            schema.buttons = buttons;
        }
        // @Input schema takes precedence
        return Object.assign(schema, this.schema);
    }
    /**
     * @return {?}
     */
    getValidators() {
        // registering validator here is not possible since prop full path is needed
        /** @type {?} */
        const childValidators = this.getFieldsValidators(this.childFields.filter(field => field !== this));
        /** @type {?} */
        const validators = childValidators.map(({ path, validator }) => {
            return {
                path: this.path + path,
                validator
            };
        });
        if (!this.validator) {
            return validators;
        }
        validators.push({ path: this.path, validator: this.validator });
        return validators;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const keys = Object.keys(changes);
        if (keys.length > 0) {
            for (const key of keys) {
                if (!changes[key].isFirstChange()) {
                    // on any input change, force schema change generation
                    this.templateSchemaService.changed();
                    break;
                }
            }
        }
    }
    /**
     * @return {?}
     */
    getOneOf() {
        if (this.childItems.length === 0) {
            return;
        }
        /** @type {?} */
        const items = this.childItems.map(({ value, description }) => {
            if (!Array.isArray(value)) {
                return { enum: [value], description };
            }
            return { enum: value, description };
        });
        if (items.length === 0) {
            return;
        }
        return items;
    }
    /**
     * @return {?}
     */
    setTitleFromContent() {
        /** @type {?} */
        const textContent = this.getTextContent(this.elementRef);
        //  title as @Input takes priority over content text
        if (textContent && !this.title) {
            this.title = textContent;
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // cache it
        this.setTitleFromContent();
        merge(this.childFields.changes, this.childItems.changes, this.childButtons.changes)
            .subscribe(() => this.templateSchemaService.changed());
    }
}
FieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'sf-field',
                template: "<ng-content ></ng-content>\n"
            }] }
];
/** @nocollapse */
FieldComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: TemplateSchemaService },
    { type: ActionRegistry }
];
FieldComponent.propDecorators = {
    childFields: [{ type: ContentChildren, args: [FieldComponent,] }],
    childItems: [{ type: ContentChildren, args: [ItemComponent,] }],
    childButtons: [{ type: ContentChildren, args: [ButtonComponent,] }],
    name: [{ type: Input }],
    type: [{ type: Input }],
    format: [{ type: Input }],
    required: [{ type: Input }],
    readOnly: [{ type: Input }],
    title: [{ type: Input }],
    description: [{ type: Input }],
    placeholder: [{ type: Input }],
    widget: [{ type: Input }],
    validator: [{ type: Input }],
    schema: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    FieldComponent.prototype.childFields;
    /** @type {?} */
    FieldComponent.prototype.childItems;
    /** @type {?} */
    FieldComponent.prototype.childButtons;
    /** @type {?} */
    FieldComponent.prototype.name;
    /** @type {?} */
    FieldComponent.prototype.type;
    /** @type {?} */
    FieldComponent.prototype.format;
    /** @type {?} */
    FieldComponent.prototype.required;
    /** @type {?} */
    FieldComponent.prototype.readOnly;
    /** @type {?} */
    FieldComponent.prototype.title;
    /** @type {?} */
    FieldComponent.prototype.description;
    /** @type {?} */
    FieldComponent.prototype.placeholder;
    /** @type {?} */
    FieldComponent.prototype.widget;
    /** @type {?} */
    FieldComponent.prototype.validator;
    /** @type {?} */
    FieldComponent.prototype.schema;
    /** @type {?} */
    FieldComponent.prototype.elementRef;
    /** @type {?} */
    FieldComponent.prototype.templateSchemaService;
    /** @type {?} */
    FieldComponent.prototype.actionRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3RlbXBsYXRlLXNjaGVtYS9maWVsZC9maWVsZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUlMLGVBQWUsRUFFZixTQUFTLEVBQ1QsVUFBVSxFQUtYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSTVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBUyxNQUFNLFNBQVMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFPdEQsTUFBTSxPQUFPLGNBQWUsU0FBUSxXQUFXOzs7Ozs7SUE2QzdDLFlBQ1UsVUFBc0IsRUFDdEIscUJBQTRDLEVBQzFDLGNBQThCO1FBRXhDLEtBQUssRUFBRSxDQUFDO1FBSkEsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzFDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQWhDMUMsU0FBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUEyQnhCLFdBQU0sR0FBUSxFQUFHLENBQUM7SUFRbEIsQ0FBQzs7OztJQUVELFNBQVM7Y0FFRCxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FDMUQsSUFBSSxDQUFDLFdBQVcsQ0FB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Q0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FDMUI7YUFDQSxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQzs7O1lBdk1GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsd0NBQXFDO2FBQ3RDOzs7O1lBekJDLFVBQVU7WUFjSCxxQkFBcUI7WUFKckIsY0FBYzs7OzBCQW1CcEIsZUFBZSxTQUFDLGNBQWM7eUJBRzlCLGVBQWUsU0FBQyxhQUFhOzJCQUc3QixlQUFlLFNBQUMsZUFBZTttQkFHL0IsS0FBSzttQkFHTCxLQUFLO3FCQUdMLEtBQUs7dUJBR0wsS0FBSzt1QkFHTCxLQUFLO29CQUdMLEtBQUs7MEJBR0wsS0FBSzswQkFHTCxLQUFLO3FCQUdMLEtBQUs7d0JBR0wsS0FBSztxQkFHTCxLQUFLOzs7O0lBdkNOLHFDQUN1Qzs7SUFFdkMsb0NBQ3FDOztJQUVyQyxzQ0FDeUM7O0lBRXpDLDhCQUNhOztJQUViLDhCQUN3Qjs7SUFFeEIsZ0NBQ2U7O0lBRWYsa0NBQ2tCOztJQUVsQixrQ0FDa0I7O0lBRWxCLCtCQUNjOztJQUVkLHFDQUNvQjs7SUFFcEIscUNBQ29COztJQUVwQixnQ0FDd0I7O0lBRXhCLG1DQUNxQjs7SUFFckIsZ0NBQ2tCOztJQUdoQixvQ0FBOEI7O0lBQzlCLCtDQUFvRDs7SUFDcEQsd0NBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBPbkluaXQsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgVmlld0NoaWxkLFxuICBRdWVyeUxpc3QsXG4gIEVsZW1lbnRSZWYsXG4gIGZvcndhcmRSZWYsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZSxcbiAgT25DaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi4vLi4vbW9kZWwvYWN0aW9uJztcbmltcG9ydCB7IEFjdGlvblJlZ2lzdHJ5IH0gZnJvbSAnLi4vLi4vbW9kZWwvYWN0aW9ucmVnaXN0cnknO1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnLi4vLi4vbW9kZWwvdmFsaWRhdG9yJztcblxuaW1wb3J0IHsgVGVtcGxhdGVTY2hlbWFFbGVtZW50IH0gZnJvbSAnLi4vdGVtcGxhdGUtc2NoZW1hLWVsZW1lbnQnO1xuaW1wb3J0IHsgVGVtcGxhdGVTY2hlbWFTZXJ2aWNlIH0gZnJvbSAnLi4vdGVtcGxhdGUtc2NoZW1hLnNlcnZpY2UnO1xuaW1wb3J0IHsgQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi4vYnV0dG9uL2J1dHRvbi5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBGaWVsZFBhcmVudCB9IGZyb20gJy4vZmllbGQtcGFyZW50JztcbmltcG9ydCB7IEZpZWxkVHlwZSwgRmllbGQgfSBmcm9tICcuL2ZpZWxkJztcbmltcG9ydCB7IEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2l0ZW0vaXRlbS5jb21wb25lbnQnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpZWxkLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBGaWVsZENvbXBvbmVudCBleHRlbmRzIEZpZWxkUGFyZW50IGltcGxlbWVudHNcbkZpZWxkLCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQge1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRmllbGRDb21wb25lbnQpXG4gIGNoaWxkRmllbGRzOiBRdWVyeUxpc3Q8RmllbGRDb21wb25lbnQ+O1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oSXRlbUNvbXBvbmVudClcbiAgY2hpbGRJdGVtczogUXVlcnlMaXN0PEl0ZW1Db21wb25lbnQ+O1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQnV0dG9uQ29tcG9uZW50KVxuICBjaGlsZEJ1dHRvbnM6IFF1ZXJ5TGlzdDxCdXR0b25Db21wb25lbnQ+O1xuXG4gIEBJbnB1dCgpXG4gIG5hbWU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICB0eXBlID0gRmllbGRUeXBlLlN0cmluZztcblxuICBASW5wdXQoKVxuICBmb3JtYXQ6IHN0cmluZztcblxuICBASW5wdXQoKVxuICByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICByZWFkT25seTogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICB0aXRsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICBASW5wdXQoKVxuICB3aWRnZXQ6IHN0cmluZyB8IG9iamVjdDtcblxuICBASW5wdXQoKVxuICB2YWxpZGF0b3I6IFZhbGlkYXRvcjtcblxuICBASW5wdXQoKVxuICBzY2hlbWE6IGFueSA9IHsgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSB0ZW1wbGF0ZVNjaGVtYVNlcnZpY2U6IFRlbXBsYXRlU2NoZW1hU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYWN0aW9uUmVnaXN0cnk6IEFjdGlvblJlZ2lzdHJ5XG4gICkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBnZXRTY2hlbWEoKTogYW55IHtcblxuICAgIGNvbnN0IHsgcHJvcGVydGllcywgaXRlbXMsIHJlcXVpcmVkIH0gPSB0aGlzLmdldEZpZWxkc1NjaGVtYShcbiAgICAgIHRoaXMuY2hpbGRGaWVsZHMuZmlsdGVyKGZpZWxkID0+IGZpZWxkICE9PSB0aGlzKVxuICAgICk7XG5cbiAgICBjb25zdCBvbmVPZiA9IHRoaXMuZ2V0T25lT2YoKTtcblxuICAgIGNvbnN0IHNjaGVtYSA9IDxhbnk+e1xuICAgICAgdHlwZTogdGhpcy50eXBlXG4gICAgfTtcblxuICAgIGlmICh0aGlzLnRpdGxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjaGVtYS50aXRsZSA9IHRoaXMudGl0bGU7XG4gICAgfVxuXG4gICAgaWYgKHByb3BlcnRpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xuICAgIH1cblxuICAgIGlmIChpdGVtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2hlbWEuaXRlbXMgPSBpdGVtcztcbiAgICB9XG5cbiAgICAvLyByZXF1cmllZCBjaGlsZCBmaWVsZHNcbiAgICBpZiAocmVxdWlyZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLnJlcXVpcmVkID0gcmVxdWlyZWQ7XG4gICAgfVxuXG4gICAgaWYgKG9uZU9mICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjaGVtYS5vbmVPZiA9IG9uZU9mO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjaGVtYS5kZXNjcmlwdGlvbiA9IHRoaXMuZGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGxhY2Vob2xkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLnBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mb3JtYXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLmZvcm1hdCA9IHRoaXMuZm9ybWF0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLndpZGdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2hlbWEud2lkZ2V0ID0gdGhpcy53aWRnZXQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVhZE9ubHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLnJlYWRPbmx5ID0gdGhpcy5yZWFkT25seTtcbiAgICB9XG5cbiAgICBjb25zdCBidXR0b25zID0gdGhpcy5nZXRCdXR0b25zKCk7XG4gICAgaWYgKGJ1dHRvbnMubGVuZ3RoID4gMCkge1xuICAgICAgc2NoZW1hLmJ1dHRvbnMgPSBidXR0b25zO1xuICAgIH1cblxuICAgIC8vIEBJbnB1dCBzY2hlbWEgdGFrZXMgcHJlY2VkZW5jZVxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHNjaGVtYSwgdGhpcy5zY2hlbWEpO1xuXG4gIH1cblxuICBnZXRWYWxpZGF0b3JzKCk6IHsgcGF0aDogc3RyaW5nLCB2YWxpZGF0b3I6IFZhbGlkYXRvciB9W10ge1xuXG4gICAgLy8gcmVnaXN0ZXJpbmcgdmFsaWRhdG9yIGhlcmUgaXMgbm90IHBvc3NpYmxlIHNpbmNlIHByb3AgZnVsbCBwYXRoIGlzIG5lZWRlZFxuICAgIGNvbnN0IGNoaWxkVmFsaWRhdG9ycyA9IHRoaXMuZ2V0RmllbGRzVmFsaWRhdG9ycyhcbiAgICAgIHRoaXMuY2hpbGRGaWVsZHMuZmlsdGVyKGZpZWxkID0+IGZpZWxkICE9PSB0aGlzKVxuICAgICk7XG4gICAgY29uc3QgdmFsaWRhdG9ycyA9IGNoaWxkVmFsaWRhdG9ycy5tYXAoKHsgcGF0aCwgdmFsaWRhdG9yIH0pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGg6IHRoaXMucGF0aCArIHBhdGgsXG4gICAgICAgIHZhbGlkYXRvclxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGlmICghdGhpcy52YWxpZGF0b3IpIHtcbiAgICAgIHJldHVybiB2YWxpZGF0b3JzO1xuICAgIH1cblxuICAgIHZhbGlkYXRvcnMucHVzaCh7IHBhdGg6IHRoaXMucGF0aCwgdmFsaWRhdG9yOiB0aGlzLnZhbGlkYXRvciB9KTtcbiAgICByZXR1cm4gdmFsaWRhdG9ycztcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcblxuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjaGFuZ2VzKTtcbiAgICBpZiAoa2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgIGlmICghY2hhbmdlc1trZXldLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgICAgIC8vIG9uIGFueSBpbnB1dCBjaGFuZ2UsIGZvcmNlIHNjaGVtYSBjaGFuZ2UgZ2VuZXJhdGlvblxuICAgICAgICAgIHRoaXMudGVtcGxhdGVTY2hlbWFTZXJ2aWNlLmNoYW5nZWQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICB9XG5cblxuICBwcml2YXRlIGdldE9uZU9mKCkge1xuXG4gICAgaWYgKHRoaXMuY2hpbGRJdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuY2hpbGRJdGVtcy5tYXAoKHsgdmFsdWUsIGRlc2NyaXB0aW9uIH0pID0+IHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHsgZW51bTogW3ZhbHVlXSwgZGVzY3JpcHRpb24gfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgZW51bTogdmFsdWUsIGRlc2NyaXB0aW9uIH07XG4gICAgfSk7XG5cbiAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW1zO1xuICB9XG5cblxuICBwcml2YXRlIHNldFRpdGxlRnJvbUNvbnRlbnQoKSB7XG4gICAgY29uc3QgdGV4dENvbnRlbnQgPSB0aGlzLmdldFRleHRDb250ZW50KHRoaXMuZWxlbWVudFJlZik7XG5cbiAgICAvLyAgdGl0bGUgYXMgQElucHV0IHRha2VzIHByaW9yaXR5IG92ZXIgY29udGVudCB0ZXh0XG4gICAgaWYgKHRleHRDb250ZW50ICYmICF0aGlzLnRpdGxlKSB7XG4gICAgICB0aGlzLnRpdGxlID0gdGV4dENvbnRlbnQ7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuXG4gICAgLy8gY2FjaGUgaXRcbiAgICB0aGlzLnNldFRpdGxlRnJvbUNvbnRlbnQoKTtcblxuICAgIG1lcmdlKFxuICAgICAgdGhpcy5jaGlsZEZpZWxkcy5jaGFuZ2VzLFxuICAgICAgdGhpcy5jaGlsZEl0ZW1zLmNoYW5nZXMsXG4gICAgICB0aGlzLmNoaWxkQnV0dG9ucy5jaGFuZ2VzXG4gICAgKVxuICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy50ZW1wbGF0ZVNjaGVtYVNlcnZpY2UuY2hhbmdlZCgpKTtcbiAgfVxuXG59XG4iXX0=