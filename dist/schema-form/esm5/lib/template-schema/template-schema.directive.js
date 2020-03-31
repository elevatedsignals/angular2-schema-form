import { __decorate, __extends, __metadata } from "tslib";
import { Directive, ContentChildren, QueryList, SimpleChange, } from '@angular/core';
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
    __extends(TemplateSchemaDirective, _super);
    function TemplateSchemaDirective(actionRegistry, validatorRegistry, formComponent, terminatorService, templateSchemaService) {
        var _this = _super.call(this) || this;
        _this.actionRegistry = actionRegistry;
        _this.validatorRegistry = validatorRegistry;
        _this.formComponent = formComponent;
        _this.terminatorService = terminatorService;
        _this.templateSchemaService = templateSchemaService;
        return _this;
    }
    TemplateSchemaDirective.prototype.setFormDocumentSchema = function (fields) {
        var _this = this;
        this.actionRegistry.clear();
        this.validatorRegistry.clear();
        var schema = this.getFieldsSchema(fields);
        var validators = this.getFieldsValidators(fields);
        validators.forEach(function (_a) {
            var path = _a.path, validator = _a.validator;
            _this.validatorRegistry.register(path, validator);
        });
        var previousSchema = this.formComponent.schema;
        this.formComponent.schema = {
            type: FieldType.Object,
            properties: schema.properties
        };
        if (schema.required && schema.required.length > 0) {
            this.formComponent.schema.requred = schema.required;
        }
        var buttons = this.getButtons();
        if (buttons.length > 0) {
            this.formComponent.schema.buttons = buttons;
        }
        this.formComponent.ngOnChanges({
            schema: new SimpleChange(previousSchema, this.formComponent.schema, Boolean(previousSchema))
        });
    };
    TemplateSchemaDirective.prototype.ngAfterContentInit = function () {
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
    TemplateSchemaDirective.ctorParameters = function () { return [
        { type: ActionRegistry },
        { type: ValidatorRegistry },
        { type: FormComponent },
        { type: TerminatorService },
        { type: TemplateSchemaService }
    ]; };
    __decorate([
        ContentChildren(FieldComponent),
        __metadata("design:type", QueryList)
    ], TemplateSchemaDirective.prototype, "childFields", void 0);
    __decorate([
        ContentChildren(ButtonComponent),
        __metadata("design:type", QueryList)
    ], TemplateSchemaDirective.prototype, "childButtons", void 0);
    TemplateSchemaDirective = __decorate([
        Directive({
            selector: 'sf-form[templateSchema]',
            providers: [
                TemplateSchemaService
            ]
        }),
        __metadata("design:paramtypes", [ActionRegistry,
            ValidatorRegistry,
            FormComponent,
            TerminatorService,
            TemplateSchemaService])
    ], TemplateSchemaDirective);
    return TemplateSchemaDirective;
}(FieldParent));
export { TemplateSchemaDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtc2NoZW1hLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi90ZW1wbGF0ZS1zY2hlbWEvdGVtcGxhdGUtc2NoZW1hLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUVULFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTdCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFMUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQVNuRDtJQUE2QywyQ0FBVztJQVF0RCxpQ0FDWSxjQUE4QixFQUM5QixpQkFBb0MsRUFDdEMsYUFBNEIsRUFDNUIsaUJBQW9DLEVBQ3BDLHFCQUE0QztRQUx0RCxZQU9FLGlCQUFPLFNBQ1I7UUFQVyxvQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUN0QyxtQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1Qix1QkFBaUIsR0FBakIsaUJBQWlCLENB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QVcsR0F3RXZEO1NBeEVZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgQ29udGVudENoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIFNpbXBsZUNoYW5nZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi4vZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWN0aW9uUmVnaXN0cnkgfSBmcm9tICcuLi9tb2RlbC9hY3Rpb25yZWdpc3RyeSc7XG5pbXBvcnQgeyBWYWxpZGF0b3JSZWdpc3RyeSB9IGZyb20gJy4uL21vZGVsL3ZhbGlkYXRvcnJlZ2lzdHJ5JztcbmltcG9ydCB7IFRlcm1pbmF0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vdGVybWluYXRvci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgVGVtcGxhdGVTY2hlbWFTZXJ2aWNlIH0gZnJvbSAnLi90ZW1wbGF0ZS1zY2hlbWEuc2VydmljZSc7XG5pbXBvcnQgeyBGaWVsZENvbXBvbmVudCB9IGZyb20gJy4vZmllbGQvZmllbGQuY29tcG9uZW50JztcbmltcG9ydCB7IEZpZWxkVHlwZSB9IGZyb20gJy4vZmllbGQvZmllbGQnO1xuaW1wb3J0IHsgQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9idXR0b24vYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWVsZFBhcmVudCB9IGZyb20gJy4vZmllbGQvZmllbGQtcGFyZW50JztcblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdzZi1mb3JtW3RlbXBsYXRlU2NoZW1hXScsXG4gIHByb3ZpZGVyczogW1xuICAgIFRlbXBsYXRlU2NoZW1hU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlU2NoZW1hRGlyZWN0aXZlIGV4dGVuZHMgRmllbGRQYXJlbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcblxuICBAQ29udGVudENoaWxkcmVuKEZpZWxkQ29tcG9uZW50KVxuICBjaGlsZEZpZWxkczogUXVlcnlMaXN0PEZpZWxkQ29tcG9uZW50PjtcblxuICBAQ29udGVudENoaWxkcmVuKEJ1dHRvbkNvbXBvbmVudClcbiAgY2hpbGRCdXR0b25zOiBRdWVyeUxpc3Q8QnV0dG9uQ29tcG9uZW50PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYWN0aW9uUmVnaXN0cnk6IEFjdGlvblJlZ2lzdHJ5LFxuICAgIHByb3RlY3RlZCB2YWxpZGF0b3JSZWdpc3RyeTogVmFsaWRhdG9yUmVnaXN0cnksXG4gICAgcHJpdmF0ZSBmb3JtQ29tcG9uZW50OiBGb3JtQ29tcG9uZW50LFxuICAgIHByaXZhdGUgdGVybWluYXRvclNlcnZpY2U6IFRlcm1pbmF0b3JTZXJ2aWNlLFxuICAgIHByaXZhdGUgdGVtcGxhdGVTY2hlbWFTZXJ2aWNlOiBUZW1wbGF0ZVNjaGVtYVNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHNldEZvcm1Eb2N1bWVudFNjaGVtYShmaWVsZHM6IEZpZWxkQ29tcG9uZW50W10pIHtcbiAgICAgIHRoaXMuYWN0aW9uUmVnaXN0cnkuY2xlYXIoKTtcbiAgICAgIHRoaXMudmFsaWRhdG9yUmVnaXN0cnkuY2xlYXIoKTtcblxuICAgICAgY29uc3Qgc2NoZW1hID0gdGhpcy5nZXRGaWVsZHNTY2hlbWEoZmllbGRzKTtcblxuICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IHRoaXMuZ2V0RmllbGRzVmFsaWRhdG9ycyhmaWVsZHMpO1xuICAgICAgdmFsaWRhdG9ycy5mb3JFYWNoKCh7IHBhdGgsIHZhbGlkYXRvciB9KSA9PiB7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yUmVnaXN0cnkucmVnaXN0ZXIocGF0aCwgdmFsaWRhdG9yKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBwcmV2aW91c1NjaGVtYSA9IHRoaXMuZm9ybUNvbXBvbmVudC5zY2hlbWE7XG4gICAgICB0aGlzLmZvcm1Db21wb25lbnQuc2NoZW1hID0ge1xuICAgICAgICB0eXBlOiBGaWVsZFR5cGUuT2JqZWN0LFxuICAgICAgICBwcm9wZXJ0aWVzOiBzY2hlbWEucHJvcGVydGllc1xuICAgICAgfTtcblxuICAgICAgaWYgKHNjaGVtYS5yZXF1aXJlZCAmJiBzY2hlbWEucmVxdWlyZWQubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmZvcm1Db21wb25lbnQuc2NoZW1hLnJlcXVyZWQgPSBzY2hlbWEucmVxdWlyZWQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJ1dHRvbnMgPSB0aGlzLmdldEJ1dHRvbnMoKTtcbiAgICAgIGlmIChidXR0b25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5mb3JtQ29tcG9uZW50LnNjaGVtYS5idXR0b25zID0gYnV0dG9ucztcbiAgICAgIH1cblxuICAgICAgdGhpcy5mb3JtQ29tcG9uZW50Lm5nT25DaGFuZ2VzKHtcbiAgICAgICAgc2NoZW1hOiBuZXcgU2ltcGxlQ2hhbmdlKFxuICAgICAgICAgIHByZXZpb3VzU2NoZW1hLFxuICAgICAgICAgIHRoaXMuZm9ybUNvbXBvbmVudC5zY2hlbWEsXG4gICAgICAgICAgQm9vbGVhbihwcmV2aW91c1NjaGVtYSlcbiAgICAgICAgKVxuICAgICAgfSk7XG5cbiAgfVxuXG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuXG4gICAgaWYgKHRoaXMuY2hpbGRGaWVsZHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zZXRGb3JtRG9jdW1lbnRTY2hlbWEodGhpcy5jaGlsZEZpZWxkcy50b0FycmF5KCkpO1xuICAgIH1cblxuICAgIG1lcmdlKFxuICAgICAgdGhpcy5jaGlsZEZpZWxkcy5jaGFuZ2VzLFxuICAgICAgdGhpcy50ZW1wbGF0ZVNjaGVtYVNlcnZpY2UuY2hhbmdlc1xuICAgIClcbiAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy50ZXJtaW5hdG9yU2VydmljZS5kZXN0cm95KCk7XG4gICAgICB0aGlzLnNldEZvcm1Eb2N1bWVudFNjaGVtYSh0aGlzLmNoaWxkRmllbGRzLnRvQXJyYXkoKSk7XG4gICAgfSk7XG5cbiAgfVxuXG59XG4iXX0=