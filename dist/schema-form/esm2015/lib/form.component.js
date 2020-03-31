var FormComponent_1;
import { __decorate, __metadata } from "tslib";
import { ChangeDetectorRef, Component, OnChanges, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActionRegistry } from './model/actionregistry';
import { FormPropertyFactory } from './model/formpropertyfactory';
import { SchemaPreprocessor } from './model/schemapreprocessor';
import { ValidatorRegistry } from './model/validatorregistry';
import { BindingRegistry } from './model/bindingregistry';
import { SchemaValidatorFactory } from './schemavalidatorfactory';
import { WidgetFactory } from './widgetfactory';
import { TerminatorService } from './terminator.service';
import { PropertyBindingRegistry } from './property-binding-registry';
import { ExpressionCompilerFactory } from './expression-compiler-factory';
export function useFactory(schemaValidatorFactory, validatorRegistry, propertyBindingRegistry, expressionCompilerFactory) {
    return new FormPropertyFactory(schemaValidatorFactory, validatorRegistry, propertyBindingRegistry, expressionCompilerFactory);
}
let FormComponent = FormComponent_1 = class FormComponent {
    constructor(formPropertyFactory, actionRegistry, validatorRegistry, bindingRegistry, cdr, terminator) {
        this.formPropertyFactory = formPropertyFactory;
        this.actionRegistry = actionRegistry;
        this.validatorRegistry = validatorRegistry;
        this.bindingRegistry = bindingRegistry;
        this.cdr = cdr;
        this.terminator = terminator;
        this.schema = null;
        this.actions = {};
        this.validators = {};
        this.bindings = {};
        this.onChange = new EventEmitter();
        this.modelChange = new EventEmitter();
        this.isValid = new EventEmitter();
        this.onErrorChange = new EventEmitter();
        this.onErrorsChange = new EventEmitter();
        this.rootProperty = null;
    }
    writeValue(obj) {
        if (this.rootProperty) {
            this.rootProperty.reset(obj, false);
        }
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
        if (this.rootProperty) {
            this.rootProperty.valueChanges.subscribe(this.onValueChanges.bind(this));
        }
    }
    // TODO implement
    registerOnTouched(fn) {
    }
    // TODO implement
    // setDisabledState(isDisabled: boolean)?: void
    ngOnChanges(changes) {
        if (changes.validators) {
            this.setValidators();
        }
        if (changes.actions) {
            this.setActions();
        }
        if (changes.bindings) {
            this.setBindings();
        }
        if (this.schema && !this.schema.type) {
            this.schema.type = 'object';
        }
        if (this.schema && changes.schema) {
            if (!changes.schema.firstChange) {
                this.terminator.destroy();
            }
            SchemaPreprocessor.preprocess(this.schema);
            this.rootProperty = this.formPropertyFactory.createProperty(this.schema);
            if (this.model) {
                // this.rootProperty.reset(this.model, false);
            }
            this.rootProperty.valueChanges.subscribe(this.onValueChanges.bind(this));
            this.rootProperty.errorsChanges.subscribe(value => {
                this.onErrorChange.emit({ value: value });
                this.isValid.emit(!(value && value.length));
            });
        }
        if (this.schema && (changes.model || changes.schema)) {
            this.rootProperty.reset(this.model, false);
            this.cdr.detectChanges();
        }
    }
    setValidators() {
        this.validatorRegistry.clear();
        if (this.validators) {
            for (const validatorId in this.validators) {
                if (this.validators.hasOwnProperty(validatorId)) {
                    this.validatorRegistry.register(validatorId, this.validators[validatorId]);
                }
            }
        }
    }
    setActions() {
        this.actionRegistry.clear();
        if (this.actions) {
            for (const actionId in this.actions) {
                if (this.actions.hasOwnProperty(actionId)) {
                    this.actionRegistry.register(actionId, this.actions[actionId]);
                }
            }
        }
    }
    setBindings() {
        this.bindingRegistry.clear();
        if (this.bindings) {
            for (const bindingPath in this.bindings) {
                if (this.bindings.hasOwnProperty(bindingPath)) {
                    this.bindingRegistry.register(bindingPath, this.bindings[bindingPath]);
                }
            }
        }
    }
    reset() {
        this.rootProperty.reset(null, true);
    }
    setModel(value) {
        if (this.model) {
            Object.assign(this.model, value);
        }
        else {
            this.model = value;
        }
    }
    onValueChanges(value) {
        if (this.onChangeCallback) {
            this.setModel(value);
            this.onChangeCallback(value);
        }
        // two way binding is used
        if (this.modelChange.observers.length > 0) {
            if (!this.onChangeCallback) {
                this.setModel(value);
            }
        }
        this.onChange.emit({ value: value });
    }
};
FormComponent.ctorParameters = () => [
    { type: FormPropertyFactory },
    { type: ActionRegistry },
    { type: ValidatorRegistry },
    { type: BindingRegistry },
    { type: ChangeDetectorRef },
    { type: TerminatorService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], FormComponent.prototype, "schema", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FormComponent.prototype, "model", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FormComponent.prototype, "actions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FormComponent.prototype, "validators", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FormComponent.prototype, "bindings", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], FormComponent.prototype, "onChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], FormComponent.prototype, "modelChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], FormComponent.prototype, "isValid", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], FormComponent.prototype, "onErrorChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], FormComponent.prototype, "onErrorsChange", void 0);
FormComponent = FormComponent_1 = __decorate([
    Component({
        selector: 'sf-form',
        template: `
    <form *ngIf="rootProperty" [attr.name]="rootProperty.rootName" [attr.id]="rootProperty.rootName">
      <sf-form-element [formProperty]="rootProperty"></sf-form-element>
    </form>`,
        providers: [
            ActionRegistry,
            ValidatorRegistry,
            PropertyBindingRegistry,
            BindingRegistry,
            SchemaPreprocessor,
            WidgetFactory,
            {
                provide: FormPropertyFactory,
                useFactory: useFactory,
                deps: [SchemaValidatorFactory, ValidatorRegistry, PropertyBindingRegistry, ExpressionCompilerFactory]
            },
            TerminatorService,
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: FormComponent_1,
                multi: true
            }
        ]
    }),
    __metadata("design:paramtypes", [FormPropertyFactory,
        ActionRegistry,
        ValidatorRegistry,
        BindingRegistry,
        ChangeDetectorRef,
        TerminatorService])
], FormComponent);
export { FormComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJsaWIvZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sYUFBYSxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd6RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFdEQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDaEUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDOUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFHNUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRXhELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUUxRSxNQUFNLFVBQVUsVUFBVSxDQUFDLHNCQUFzQixFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLHlCQUF5QjtJQUN0SCxPQUFPLElBQUksbUJBQW1CLENBQUMsc0JBQXNCLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUseUJBQXlCLENBQUMsQ0FBQztBQUNoSSxDQUFDO0FBNEJELElB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QzFCLEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRjtLQUNGLENBQUM7cUNBNEIrQixtQkFBbUI7UUFDeEIsY0FBYztRQUNYLGlCQUFpQjtRQUNuQixlQUFlO1FBQzNCLGlCQUFpQjtRQUNWLGlCQUFpQjtHQWhDNUIsYUFBYSxDQWtLekI7U0FsS1ksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIE9uQ2hhbmdlcyxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge0FjdGlvbn0gZnJvbSAnLi9tb2RlbC9hY3Rpb24nO1xuaW1wb3J0IHtBY3Rpb25SZWdpc3RyeX0gZnJvbSAnLi9tb2RlbC9hY3Rpb25yZWdpc3RyeSc7XG5pbXBvcnQge0Zvcm1Qcm9wZXJ0eX0gZnJvbSAnLi9tb2RlbC9mb3JtcHJvcGVydHknO1xuaW1wb3J0IHtGb3JtUHJvcGVydHlGYWN0b3J5fSBmcm9tICcuL21vZGVsL2Zvcm1wcm9wZXJ0eWZhY3RvcnknO1xuaW1wb3J0IHtTY2hlbWFQcmVwcm9jZXNzb3J9IGZyb20gJy4vbW9kZWwvc2NoZW1hcHJlcHJvY2Vzc29yJztcbmltcG9ydCB7VmFsaWRhdG9yUmVnaXN0cnl9IGZyb20gJy4vbW9kZWwvdmFsaWRhdG9ycmVnaXN0cnknO1xuaW1wb3J0IHtWYWxpZGF0b3J9IGZyb20gJy4vbW9kZWwvdmFsaWRhdG9yJztcbmltcG9ydCB7QmluZGluZ30gZnJvbSAnLi9tb2RlbC9iaW5kaW5nJztcbmltcG9ydCB7QmluZGluZ1JlZ2lzdHJ5fSBmcm9tICcuL21vZGVsL2JpbmRpbmdyZWdpc3RyeSc7XG5cbmltcG9ydCB7U2NoZW1hVmFsaWRhdG9yRmFjdG9yeX0gZnJvbSAnLi9zY2hlbWF2YWxpZGF0b3JmYWN0b3J5JztcbmltcG9ydCB7V2lkZ2V0RmFjdG9yeX0gZnJvbSAnLi93aWRnZXRmYWN0b3J5JztcbmltcG9ydCB7VGVybWluYXRvclNlcnZpY2V9IGZyb20gJy4vdGVybWluYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7UHJvcGVydHlCaW5kaW5nUmVnaXN0cnl9IGZyb20gJy4vcHJvcGVydHktYmluZGluZy1yZWdpc3RyeSc7XG5pbXBvcnQgeyBFeHByZXNzaW9uQ29tcGlsZXJGYWN0b3J5IH0gZnJvbSAnLi9leHByZXNzaW9uLWNvbXBpbGVyLWZhY3RvcnknO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlRmFjdG9yeShzY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCB2YWxpZGF0b3JSZWdpc3RyeSwgcHJvcGVydHlCaW5kaW5nUmVnaXN0cnksIGV4cHJlc3Npb25Db21waWxlckZhY3RvcnkpIHtcbiAgcmV0dXJuIG5ldyBGb3JtUHJvcGVydHlGYWN0b3J5KHNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHZhbGlkYXRvclJlZ2lzdHJ5LCBwcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeSwgZXhwcmVzc2lvbkNvbXBpbGVyRmFjdG9yeSk7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWZvcm0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxmb3JtICpuZ0lmPVwicm9vdFByb3BlcnR5XCIgW2F0dHIubmFtZV09XCJyb290UHJvcGVydHkucm9vdE5hbWVcIiBbYXR0ci5pZF09XCJyb290UHJvcGVydHkucm9vdE5hbWVcIj5cbiAgICAgIDxzZi1mb3JtLWVsZW1lbnQgW2Zvcm1Qcm9wZXJ0eV09XCJyb290UHJvcGVydHlcIj48L3NmLWZvcm0tZWxlbWVudD5cbiAgICA8L2Zvcm0+YCxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQWN0aW9uUmVnaXN0cnksXG4gICAgVmFsaWRhdG9yUmVnaXN0cnksXG4gICAgUHJvcGVydHlCaW5kaW5nUmVnaXN0cnksXG4gICAgQmluZGluZ1JlZ2lzdHJ5LFxuICAgIFNjaGVtYVByZXByb2Nlc3NvcixcbiAgICBXaWRnZXRGYWN0b3J5LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEZvcm1Qcm9wZXJ0eUZhY3RvcnksXG4gICAgICB1c2VGYWN0b3J5OiB1c2VGYWN0b3J5LFxuICAgICAgZGVwczogW1NjaGVtYVZhbGlkYXRvckZhY3RvcnksIFZhbGlkYXRvclJlZ2lzdHJ5LCBQcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeSwgRXhwcmVzc2lvbkNvbXBpbGVyRmFjdG9yeV1cbiAgICB9LFxuICAgIFRlcm1pbmF0b3JTZXJ2aWNlLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IEZvcm1Db21wb25lbnQsXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgQElucHV0KCkgc2NoZW1hOiBhbnkgPSBudWxsO1xuXG4gIEBJbnB1dCgpIG1vZGVsOiBhbnk7XG5cbiAgQElucHV0KCkgYWN0aW9uczogeyBbYWN0aW9uSWQ6IHN0cmluZ106IEFjdGlvbiB9ID0ge307XG5cbiAgQElucHV0KCkgdmFsaWRhdG9yczogeyBbcGF0aDogc3RyaW5nXTogVmFsaWRhdG9yIH0gPSB7fTtcblxuICBASW5wdXQoKSBiaW5kaW5nczogeyBbcGF0aDogc3RyaW5nXTogQmluZGluZyB9ID0ge307XG5cbiAgQE91dHB1dCgpIG9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7IHZhbHVlOiBhbnkgfT4oKTtcblxuICBAT3V0cHV0KCkgbW9kZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgaXNWYWxpZCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBAT3V0cHV0KCkgb25FcnJvckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8eyB2YWx1ZTogYW55W10gfT4oKTtcblxuICBAT3V0cHV0KCkgb25FcnJvcnNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHt2YWx1ZTogYW55fT4oKTtcblxuICByb290UHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSA9IG51bGw7XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmb3JtUHJvcGVydHlGYWN0b3J5OiBGb3JtUHJvcGVydHlGYWN0b3J5LFxuICAgIHByaXZhdGUgYWN0aW9uUmVnaXN0cnk6IEFjdGlvblJlZ2lzdHJ5LFxuICAgIHByaXZhdGUgdmFsaWRhdG9yUmVnaXN0cnk6IFZhbGlkYXRvclJlZ2lzdHJ5LFxuICAgIHByaXZhdGUgYmluZGluZ1JlZ2lzdHJ5OiBCaW5kaW5nUmVnaXN0cnksXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgdGVybWluYXRvcjogVGVybWluYXRvclNlcnZpY2VcbiAgKSB7IH1cblxuICB3cml0ZVZhbHVlKG9iajogYW55KSB7XG4gICAgaWYgKHRoaXMucm9vdFByb3BlcnR5KSB7XG4gICAgICB0aGlzLnJvb3RQcm9wZXJ0eS5yZXNldChvYmosIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgICBpZiAodGhpcy5yb290UHJvcGVydHkpIHtcbiAgICAgIHRoaXMucm9vdFByb3BlcnR5LnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoXG4gICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZXMuYmluZCh0aGlzKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvLyBUT0RPIGltcGxlbWVudFxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gIH1cblxuICAvLyBUT0RPIGltcGxlbWVudFxuICAvLyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pPzogdm9pZFxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnNldFZhbGlkYXRvcnMoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5hY3Rpb25zKSB7XG4gICAgICB0aGlzLnNldEFjdGlvbnMoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5iaW5kaW5ncykge1xuICAgICAgdGhpcy5zZXRCaW5kaW5ncygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNjaGVtYSAmJiAhdGhpcy5zY2hlbWEudHlwZSkge1xuICAgICAgdGhpcy5zY2hlbWEudHlwZSA9ICdvYmplY3QnO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNjaGVtYSAmJiBjaGFuZ2VzLnNjaGVtYSkge1xuICAgICAgaWYgKCFjaGFuZ2VzLnNjaGVtYS5maXJzdENoYW5nZSkge1xuICAgICAgICB0aGlzLnRlcm1pbmF0b3IuZGVzdHJveSgpO1xuICAgICAgfVxuXG4gICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucHJlcHJvY2Vzcyh0aGlzLnNjaGVtYSk7XG4gICAgICB0aGlzLnJvb3RQcm9wZXJ0eSA9IHRoaXMuZm9ybVByb3BlcnR5RmFjdG9yeS5jcmVhdGVQcm9wZXJ0eSh0aGlzLnNjaGVtYSk7XG4gICAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgICAvLyB0aGlzLnJvb3RQcm9wZXJ0eS5yZXNldCh0aGlzLm1vZGVsLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucm9vdFByb3BlcnR5LnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoXG4gICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZXMuYmluZCh0aGlzKVxuICAgICAgKTtcblxuICAgICAgdGhpcy5yb290UHJvcGVydHkuZXJyb3JzQ2hhbmdlcy5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICB0aGlzLm9uRXJyb3JDaGFuZ2UuZW1pdCh7dmFsdWU6IHZhbHVlfSk7XG4gICAgICAgIHRoaXMuaXNWYWxpZC5lbWl0KCEodmFsdWUgJiYgdmFsdWUubGVuZ3RoKSk7XG4gICAgICB9KTtcblxuICAgIH1cblxuICAgIGlmICh0aGlzLnNjaGVtYSAmJiAoY2hhbmdlcy5tb2RlbCB8fCBjaGFuZ2VzLnNjaGVtYSApKSB7XG4gICAgICB0aGlzLnJvb3RQcm9wZXJ0eS5yZXNldCh0aGlzLm1vZGVsLCBmYWxzZSk7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIHNldFZhbGlkYXRvcnMoKSB7XG4gICAgdGhpcy52YWxpZGF0b3JSZWdpc3RyeS5jbGVhcigpO1xuICAgIGlmICh0aGlzLnZhbGlkYXRvcnMpIHtcbiAgICAgIGZvciAoY29uc3QgdmFsaWRhdG9ySWQgaW4gdGhpcy52YWxpZGF0b3JzKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRvcnMuaGFzT3duUHJvcGVydHkodmFsaWRhdG9ySWQpKSB7XG4gICAgICAgICAgdGhpcy52YWxpZGF0b3JSZWdpc3RyeS5yZWdpc3Rlcih2YWxpZGF0b3JJZCwgdGhpcy52YWxpZGF0b3JzW3ZhbGlkYXRvcklkXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldEFjdGlvbnMoKSB7XG4gICAgdGhpcy5hY3Rpb25SZWdpc3RyeS5jbGVhcigpO1xuICAgIGlmICh0aGlzLmFjdGlvbnMpIHtcbiAgICAgIGZvciAoY29uc3QgYWN0aW9uSWQgaW4gdGhpcy5hY3Rpb25zKSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGlvbnMuaGFzT3duUHJvcGVydHkoYWN0aW9uSWQpKSB7XG4gICAgICAgICAgdGhpcy5hY3Rpb25SZWdpc3RyeS5yZWdpc3RlcihhY3Rpb25JZCwgdGhpcy5hY3Rpb25zW2FjdGlvbklkXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldEJpbmRpbmdzKCkge1xuICAgIHRoaXMuYmluZGluZ1JlZ2lzdHJ5LmNsZWFyKCk7XG4gICAgaWYgKHRoaXMuYmluZGluZ3MpIHtcbiAgICAgIGZvciAoY29uc3QgYmluZGluZ1BhdGggaW4gdGhpcy5iaW5kaW5ncykge1xuICAgICAgICBpZiAodGhpcy5iaW5kaW5ncy5oYXNPd25Qcm9wZXJ0eShiaW5kaW5nUGF0aCkpIHtcbiAgICAgICAgICB0aGlzLmJpbmRpbmdSZWdpc3RyeS5yZWdpc3RlcihiaW5kaW5nUGF0aCwgdGhpcy5iaW5kaW5nc1tiaW5kaW5nUGF0aF0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlc2V0KCkge1xuICAgIHRoaXMucm9vdFByb3BlcnR5LnJlc2V0KG51bGwsIHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRNb2RlbCh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5tb2RlbCwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGVsID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvblZhbHVlQ2hhbmdlcyh2YWx1ZSkge1xuICAgIGlmICh0aGlzLm9uQ2hhbmdlQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMuc2V0TW9kZWwodmFsdWUpO1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvLyB0d28gd2F5IGJpbmRpbmcgaXMgdXNlZFxuICAgIGlmICh0aGlzLm1vZGVsQ2hhbmdlLm9ic2VydmVycy5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAoIXRoaXMub25DaGFuZ2VDYWxsYmFjaykge1xuICAgICAgICB0aGlzLnNldE1vZGVsKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KHt2YWx1ZTogdmFsdWV9KTtcbiAgfVxufVxuIl19