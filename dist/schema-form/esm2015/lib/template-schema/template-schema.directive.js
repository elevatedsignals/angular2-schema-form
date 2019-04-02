/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Directive, ContentChildren, QueryList, SimpleChange } from '@angular/core';
import { merge } from 'rxjs';
import { FormComponent } from '../form.component';
import { ActionRegistry } from '../model/actionregistry';
import { ValidatorRegistry } from '../model/validatorregistry';
import { TerminatorService } from '../terminator.service';
import { TemplateSchemaService } from './template-schema.service';
import { FieldComponent } from './field/field.component';
import { FieldType } from './field/field';
import { ButtonComponent } from './button/button.component';
import { FieldParent } from './field/field-parent';
export class TemplateSchemaDirective extends FieldParent {
    /**
     * @param {?} actionRegistry
     * @param {?} validatorRegistry
     * @param {?} formComponent
     * @param {?} terminatorService
     * @param {?} templateSchemaService
     */
    constructor(actionRegistry, validatorRegistry, formComponent, terminatorService, templateSchemaService) {
        super();
        this.actionRegistry = actionRegistry;
        this.validatorRegistry = validatorRegistry;
        this.formComponent = formComponent;
        this.terminatorService = terminatorService;
        this.templateSchemaService = templateSchemaService;
    }
    /**
     * @param {?} fields
     * @return {?}
     */
    setFormDocumentSchema(fields) {
        this.actionRegistry.clear();
        this.validatorRegistry.clear();
        /** @type {?} */
        const schema = this.getFieldsSchema(fields);
        /** @type {?} */
        const validators = this.getFieldsValidators(fields);
        validators.forEach(({ path, validator }) => {
            this.validatorRegistry.register(path, validator);
        });
        /** @type {?} */
        const previousSchema = this.formComponent.schema;
        this.formComponent.schema = {
            type: FieldType.Object,
            properties: schema.properties
        };
        if (schema.required && schema.required.length > 0) {
            this.formComponent.schema.requred = schema.required;
        }
        /** @type {?} */
        const buttons = this.getButtons();
        if (buttons.length > 0) {
            this.formComponent.schema.buttons = buttons;
        }
        this.formComponent.ngOnChanges({
            schema: new SimpleChange(previousSchema, this.formComponent.schema, Boolean(previousSchema))
        });
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (this.childFields.length > 0) {
            this.setFormDocumentSchema(this.childFields.toArray());
        }
        merge(this.childFields.changes, this.templateSchemaService.changes)
            .subscribe(() => {
            this.terminatorService.destroy();
            this.setFormDocumentSchema(this.childFields.toArray());
        });
    }
}
TemplateSchemaDirective.decorators = [
    { type: Directive, args: [{
                selector: 'sf-form[templateSchema]',
                providers: [
                    TemplateSchemaService
                ]
            },] }
];
/** @nocollapse */
TemplateSchemaDirective.ctorParameters = () => [
    { type: ActionRegistry },
    { type: ValidatorRegistry },
    { type: FormComponent },
    { type: TerminatorService },
    { type: TemplateSchemaService }
];
TemplateSchemaDirective.propDecorators = {
    childFields: [{ type: ContentChildren, args: [FieldComponent,] }],
    childButtons: [{ type: ContentChildren, args: [ButtonComponent,] }]
};
if (false) {
    /** @type {?} */
    TemplateSchemaDirective.prototype.childFields;
    /** @type {?} */
    TemplateSchemaDirective.prototype.childButtons;
    /** @type {?} */
    TemplateSchemaDirective.prototype.actionRegistry;
    /** @type {?} */
    TemplateSchemaDirective.prototype.validatorRegistry;
    /** @type {?} */
    TemplateSchemaDirective.prototype.formComponent;
    /** @type {?} */
    TemplateSchemaDirective.prototype.terminatorService;
    /** @type {?} */
    TemplateSchemaDirective.prototype.templateSchemaService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtc2NoZW1hLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi90ZW1wbGF0ZS1zY2hlbWEvdGVtcGxhdGUtc2NoZW1hLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUdULFlBQVksRUFFYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTdCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFMUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxTQUFTLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQVNuRCxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsV0FBVzs7Ozs7Ozs7SUFRdEQsWUFDWSxjQUE4QixFQUM5QixpQkFBb0MsRUFDdEMsYUFBNEIsRUFDNUIsaUJBQW9DLEVBQ3BDLHFCQUE0QztRQUVwRCxLQUFLLEVBQUUsQ0FBQztRQU5FLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3RDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtJQUd0RCxDQUFDOzs7OztJQUVELHFCQUFxQixDQUFDLE1BQXdCO1FBQzFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDOztjQUV6QixNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7O2NBRXJDLFVBQVUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDO1FBQ25ELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQyxDQUFDOztjQUVHLGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU07UUFDaEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUc7WUFDMUIsSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNO1lBQ3RCLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVTtTQUM5QixDQUFDO1FBRUYsSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNqRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztTQUNyRDs7Y0FFSyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUNqQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDN0M7UUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztZQUM3QixNQUFNLEVBQUUsSUFBSSxZQUFZLENBQ3RCLGNBQWMsRUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFDekIsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUN4QjtTQUNGLENBQUMsQ0FBQztJQUVQLENBQUM7Ozs7SUFHRCxrQkFBa0I7UUFFaEIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUN4RDtRQUVELEtBQUssQ0FDSCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFDeEIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FDbkM7YUFDRCxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDekQsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDOzs7WUE1RUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLFNBQVMsRUFBRTtvQkFDVCxxQkFBcUI7aUJBQ3RCO2FBQ0Y7Ozs7WUFoQlEsY0FBYztZQUNkLGlCQUFpQjtZQUZqQixhQUFhO1lBR2IsaUJBQWlCO1lBRWpCLHFCQUFxQjs7OzBCQWUzQixlQUFlLFNBQUMsY0FBYzsyQkFHOUIsZUFBZSxTQUFDLGVBQWU7Ozs7SUFIaEMsOENBQ3VDOztJQUV2QywrQ0FDeUM7O0lBR3ZDLGlEQUF3Qzs7SUFDeEMsb0RBQThDOztJQUM5QyxnREFBb0M7O0lBQ3BDLG9EQUE0Qzs7SUFDNUMsd0RBQW9EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgSG9zdEJpbmRpbmcsXG4gIFNpbXBsZUNoYW5nZSxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEZvcm1Db21wb25lbnQgfSBmcm9tICcuLi9mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBY3Rpb25SZWdpc3RyeSB9IGZyb20gJy4uL21vZGVsL2FjdGlvbnJlZ2lzdHJ5JztcbmltcG9ydCB7IFZhbGlkYXRvclJlZ2lzdHJ5IH0gZnJvbSAnLi4vbW9kZWwvdmFsaWRhdG9ycmVnaXN0cnknO1xuaW1wb3J0IHsgVGVybWluYXRvclNlcnZpY2UgfSBmcm9tICcuLi90ZXJtaW5hdG9yLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBUZW1wbGF0ZVNjaGVtYVNlcnZpY2UgfSBmcm9tICcuL3RlbXBsYXRlLXNjaGVtYS5zZXJ2aWNlJztcbmltcG9ydCB7IEZpZWxkQ29tcG9uZW50IH0gZnJvbSAnLi9maWVsZC9maWVsZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmllbGRUeXBlLCBGaWVsZCB9IGZyb20gJy4vZmllbGQvZmllbGQnO1xuaW1wb3J0IHsgQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9idXR0b24vYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWVsZFBhcmVudCB9IGZyb20gJy4vZmllbGQvZmllbGQtcGFyZW50JztcblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdzZi1mb3JtW3RlbXBsYXRlU2NoZW1hXScsXG4gIHByb3ZpZGVyczogW1xuICAgIFRlbXBsYXRlU2NoZW1hU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlU2NoZW1hRGlyZWN0aXZlIGV4dGVuZHMgRmllbGRQYXJlbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcblxuICBAQ29udGVudENoaWxkcmVuKEZpZWxkQ29tcG9uZW50KVxuICBjaGlsZEZpZWxkczogUXVlcnlMaXN0PEZpZWxkQ29tcG9uZW50PjtcblxuICBAQ29udGVudENoaWxkcmVuKEJ1dHRvbkNvbXBvbmVudClcbiAgY2hpbGRCdXR0b25zOiBRdWVyeUxpc3Q8QnV0dG9uQ29tcG9uZW50PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYWN0aW9uUmVnaXN0cnk6IEFjdGlvblJlZ2lzdHJ5LFxuICAgIHByb3RlY3RlZCB2YWxpZGF0b3JSZWdpc3RyeTogVmFsaWRhdG9yUmVnaXN0cnksXG4gICAgcHJpdmF0ZSBmb3JtQ29tcG9uZW50OiBGb3JtQ29tcG9uZW50LFxuICAgIHByaXZhdGUgdGVybWluYXRvclNlcnZpY2U6IFRlcm1pbmF0b3JTZXJ2aWNlLFxuICAgIHByaXZhdGUgdGVtcGxhdGVTY2hlbWFTZXJ2aWNlOiBUZW1wbGF0ZVNjaGVtYVNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHNldEZvcm1Eb2N1bWVudFNjaGVtYShmaWVsZHM6IEZpZWxkQ29tcG9uZW50W10pIHtcbiAgICAgIHRoaXMuYWN0aW9uUmVnaXN0cnkuY2xlYXIoKTtcbiAgICAgIHRoaXMudmFsaWRhdG9yUmVnaXN0cnkuY2xlYXIoKTtcblxuICAgICAgY29uc3Qgc2NoZW1hID0gdGhpcy5nZXRGaWVsZHNTY2hlbWEoZmllbGRzKTtcblxuICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IHRoaXMuZ2V0RmllbGRzVmFsaWRhdG9ycyhmaWVsZHMpO1xuICAgICAgdmFsaWRhdG9ycy5mb3JFYWNoKCh7IHBhdGgsIHZhbGlkYXRvciB9KSA9PiB7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yUmVnaXN0cnkucmVnaXN0ZXIocGF0aCwgdmFsaWRhdG9yKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBwcmV2aW91c1NjaGVtYSA9IHRoaXMuZm9ybUNvbXBvbmVudC5zY2hlbWE7XG4gICAgICB0aGlzLmZvcm1Db21wb25lbnQuc2NoZW1hID0ge1xuICAgICAgICB0eXBlOiBGaWVsZFR5cGUuT2JqZWN0LFxuICAgICAgICBwcm9wZXJ0aWVzOiBzY2hlbWEucHJvcGVydGllc1xuICAgICAgfTtcblxuICAgICAgaWYgKHNjaGVtYS5yZXF1aXJlZCAmJiBzY2hlbWEucmVxdWlyZWQubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmZvcm1Db21wb25lbnQuc2NoZW1hLnJlcXVyZWQgPSBzY2hlbWEucmVxdWlyZWQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJ1dHRvbnMgPSB0aGlzLmdldEJ1dHRvbnMoKTtcbiAgICAgIGlmIChidXR0b25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5mb3JtQ29tcG9uZW50LnNjaGVtYS5idXR0b25zID0gYnV0dG9ucztcbiAgICAgIH1cblxuICAgICAgdGhpcy5mb3JtQ29tcG9uZW50Lm5nT25DaGFuZ2VzKHtcbiAgICAgICAgc2NoZW1hOiBuZXcgU2ltcGxlQ2hhbmdlKFxuICAgICAgICAgIHByZXZpb3VzU2NoZW1hLFxuICAgICAgICAgIHRoaXMuZm9ybUNvbXBvbmVudC5zY2hlbWEsXG4gICAgICAgICAgQm9vbGVhbihwcmV2aW91c1NjaGVtYSlcbiAgICAgICAgKVxuICAgICAgfSk7XG5cbiAgfVxuXG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuXG4gICAgaWYgKHRoaXMuY2hpbGRGaWVsZHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zZXRGb3JtRG9jdW1lbnRTY2hlbWEodGhpcy5jaGlsZEZpZWxkcy50b0FycmF5KCkpO1xuICAgIH1cblxuICAgIG1lcmdlKFxuICAgICAgdGhpcy5jaGlsZEZpZWxkcy5jaGFuZ2VzLFxuICAgICAgdGhpcy50ZW1wbGF0ZVNjaGVtYVNlcnZpY2UuY2hhbmdlc1xuICAgIClcbiAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy50ZXJtaW5hdG9yU2VydmljZS5kZXN0cm95KCk7XG4gICAgICB0aGlzLnNldEZvcm1Eb2N1bWVudFNjaGVtYSh0aGlzLmNoaWxkRmllbGRzLnRvQXJyYXkoKSk7XG4gICAgfSk7XG5cbiAgfVxuXG59XG4iXX0=