/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var TemplateSchemaDirective = /** @class */ (function (_super) {
    tslib_1.__extends(TemplateSchemaDirective, _super);
    function TemplateSchemaDirective(actionRegistry, validatorRegistry, formComponent, terminatorService, templateSchemaService) {
        var _this = _super.call(this) || this;
        _this.actionRegistry = actionRegistry;
        _this.validatorRegistry = validatorRegistry;
        _this.formComponent = formComponent;
        _this.terminatorService = terminatorService;
        _this.templateSchemaService = templateSchemaService;
        return _this;
    }
    /**
     * @param {?} fields
     * @return {?}
     */
    TemplateSchemaDirective.prototype.setFormDocumentSchema = /**
     * @param {?} fields
     * @return {?}
     */
    function (fields) {
        var _this = this;
        this.actionRegistry.clear();
        this.validatorRegistry.clear();
        /** @type {?} */
        var schema = this.getFieldsSchema(fields);
        /** @type {?} */
        var validators = this.getFieldsValidators(fields);
        validators.forEach(function (_a) {
            var path = _a.path, validator = _a.validator;
            _this.validatorRegistry.register(path, validator);
        });
        /** @type {?} */
        var previousSchema = this.formComponent.schema;
        this.formComponent.schema = {
            type: FieldType.Object,
            properties: schema.properties
        };
        if (schema.required && schema.required.length > 0) {
            this.formComponent.schema.requred = schema.required;
        }
        /** @type {?} */
        var buttons = this.getButtons();
        if (buttons.length > 0) {
            this.formComponent.schema.buttons = buttons;
        }
        this.formComponent.ngOnChanges({
            schema: new SimpleChange(previousSchema, this.formComponent.schema, Boolean(previousSchema))
        });
    };
    /**
     * @return {?}
     */
    TemplateSchemaDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.childFields.length > 0) {
            this.setFormDocumentSchema(this.childFields.toArray());
        }
        merge(this.childFields.changes, this.templateSchemaService.changes)
            .subscribe(function () {
            _this.terminatorService.destroy();
            _this.setFormDocumentSchema(_this.childFields.toArray());
        });
    };
    TemplateSchemaDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'sf-form[templateSchema]',
                    providers: [
                        TemplateSchemaService
                    ]
                },] }
    ];
    /** @nocollapse */
    TemplateSchemaDirective.ctorParameters = function () { return [
        { type: ActionRegistry },
        { type: ValidatorRegistry },
        { type: FormComponent },
        { type: TerminatorService },
        { type: TemplateSchemaService }
    ]; };
    TemplateSchemaDirective.propDecorators = {
        childFields: [{ type: ContentChildren, args: [FieldComponent,] }],
        childButtons: [{ type: ContentChildren, args: [ButtonComponent,] }]
    };
    return TemplateSchemaDirective;
}(FieldParent));
export { TemplateSchemaDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtc2NoZW1hLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi90ZW1wbGF0ZS1zY2hlbWEvdGVtcGxhdGUtc2NoZW1hLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFHVCxZQUFZLEVBRWIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUU3QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTFELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHbkQ7SUFNNkMsbURBQVc7SUFRdEQsaUNBQ1ksY0FBOEIsRUFDOUIsaUJBQW9DLEVBQ3RDLGFBQTRCLEVBQzVCLGlCQUFvQyxFQUNwQyxxQkFBNEM7UUFMdEQsWUFPRSxpQkFBTyxTQUNSO1FBUFcsb0JBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHVCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDdEMsbUJBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsdUJBQWlCLEdBQWpCLGlCQUFp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dmUsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgUXVlcnlMaXN0LFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBIb3N0QmluZGluZyxcbiAgU2ltcGxlQ2hhbmdlLFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRm9ybUNvbXBvbmVudCB9IGZyb20gJy4uL2Zvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IEFjdGlvblJlZ2lzdHJ5IH0gZnJvbSAnLi4vbW9kZWwvYWN0aW9ucmVnaXN0cnknO1xuaW1wb3J0IHsgVmFsaWRhdG9yUmVnaXN0cnkgfSBmcm9tICcuLi9tb2RlbC92YWxpZGF0b3JyZWdpc3RyeSc7XG5pbXBvcnQgeyBUZXJtaW5hdG9yU2VydmljZSB9IGZyb20gJy4uL3Rlcm1pbmF0b3Iuc2VydmljZSc7XG5cbmltcG9ydCB7IFRlbXBsYXRlU2NoZW1hU2VydmljZSB9IGZyb20gJy4vdGVtcGxhdGUtc2NoZW1hLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmllbGRDb21wb25lbnQgfSBmcm9tICcuL2ZpZWxkL2ZpZWxkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWVsZFR5cGUsIEZpZWxkIH0gZnJvbSAnLi9maWVsZC9maWVsZCc7XG5pbXBvcnQgeyBCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2J1dHRvbi9idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IEZpZWxkUGFyZW50IH0gZnJvbSAnLi9maWVsZC9maWVsZC1wYXJlbnQnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3NmLWZvcm1bdGVtcGxhdGVTY2hlbWFdJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAgVGVtcGxhdGVTY2hlbWFTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVTY2hlbWFEaXJlY3RpdmUgZXh0ZW5kcyBGaWVsZFBhcmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRmllbGRDb21wb25lbnQpXG4gIGNoaWxkRmllbGRzOiBRdWVyeUxpc3Q8RmllbGRDb21wb25lbnQ+O1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQnV0dG9uQ29tcG9uZW50KVxuICBjaGlsZEJ1dHRvbnM6IFF1ZXJ5TGlzdDxCdXR0b25Db21wb25lbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhY3Rpb25SZWdpc3RyeTogQWN0aW9uUmVnaXN0cnksXG4gICAgcHJvdGVjdGVkIHZhbGlkYXRvclJlZ2lzdHJ5OiBWYWxpZGF0b3JSZWdpc3RyeSxcbiAgICBwcml2YXRlIGZvcm1Db21wb25lbnQ6IEZvcm1Db21wb25lbnQsXG4gICAgcHJpdmF0ZSB0ZXJtaW5hdG9yU2VydmljZTogVGVybWluYXRvclNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0ZW1wbGF0ZVNjaGVtYVNlcnZpY2U6IFRlbXBsYXRlU2NoZW1hU2VydmljZVxuICApIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgc2V0Rm9ybURvY3VtZW50U2NoZW1hKGZpZWxkczogRmllbGRDb21wb25lbnRbXSkge1xuICAgICAgdGhpcy5hY3Rpb25SZWdpc3RyeS5jbGVhcigpO1xuICAgICAgdGhpcy52YWxpZGF0b3JSZWdpc3RyeS5jbGVhcigpO1xuXG4gICAgICBjb25zdCBzY2hlbWEgPSB0aGlzLmdldEZpZWxkc1NjaGVtYShmaWVsZHMpO1xuXG4gICAgICBjb25zdCB2YWxpZGF0b3JzID0gdGhpcy5nZXRGaWVsZHNWYWxpZGF0b3JzKGZpZWxkcyk7XG4gICAgICB2YWxpZGF0b3JzLmZvckVhY2goKHsgcGF0aCwgdmFsaWRhdG9yIH0pID0+IHtcbiAgICAgICAgdGhpcy52YWxpZGF0b3JSZWdpc3RyeS5yZWdpc3RlcihwYXRoLCB2YWxpZGF0b3IpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHByZXZpb3VzU2NoZW1hID0gdGhpcy5mb3JtQ29tcG9uZW50LnNjaGVtYTtcbiAgICAgIHRoaXMuZm9ybUNvbXBvbmVudC5zY2hlbWEgPSB7XG4gICAgICAgIHR5cGU6IEZpZWxkVHlwZS5PYmplY3QsXG4gICAgICAgIHByb3BlcnRpZXM6IHNjaGVtYS5wcm9wZXJ0aWVzXG4gICAgICB9O1xuXG4gICAgICBpZiAoc2NoZW1hLnJlcXVpcmVkICYmIHNjaGVtYS5yZXF1aXJlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZm9ybUNvbXBvbmVudC5zY2hlbWEucmVxdXJlZCA9IHNjaGVtYS5yZXF1aXJlZDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYnV0dG9ucyA9IHRoaXMuZ2V0QnV0dG9ucygpO1xuICAgICAgaWYgKGJ1dHRvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmZvcm1Db21wb25lbnQuc2NoZW1hLmJ1dHRvbnMgPSBidXR0b25zO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZvcm1Db21wb25lbnQubmdPbkNoYW5nZXMoe1xuICAgICAgICBzY2hlbWE6IG5ldyBTaW1wbGVDaGFuZ2UoXG4gICAgICAgICAgcHJldmlvdXNTY2hlbWEsXG4gICAgICAgICAgdGhpcy5mb3JtQ29tcG9uZW50LnNjaGVtYSxcbiAgICAgICAgICBCb29sZWFuKHByZXZpb3VzU2NoZW1hKVxuICAgICAgICApXG4gICAgICB9KTtcblxuICB9XG5cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG5cbiAgICBpZiAodGhpcy5jaGlsZEZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnNldEZvcm1Eb2N1bWVudFNjaGVtYSh0aGlzLmNoaWxkRmllbGRzLnRvQXJyYXkoKSk7XG4gICAgfVxuXG4gICAgbWVyZ2UoXG4gICAgICB0aGlzLmNoaWxkRmllbGRzLmNoYW5nZXMsXG4gICAgICB0aGlzLnRlbXBsYXRlU2NoZW1hU2VydmljZS5jaGFuZ2VzXG4gICAgKVxuICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnRlcm1pbmF0b3JTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuc2V0Rm9ybURvY3VtZW50U2NoZW1hKHRoaXMuY2hpbGRGaWVsZHMudG9BcnJheSgpKTtcbiAgICB9KTtcblxuICB9XG5cbn1cbiJdfQ==