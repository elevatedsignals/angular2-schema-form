/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
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
/**
 * @param {?} schemaValidatorFactory
 * @param {?} validatorRegistry
 * @param {?} propertyBindingRegistry
 * @return {?}
 */
export function useFactory(schemaValidatorFactory, validatorRegistry, propertyBindingRegistry) {
    return new FormPropertyFactory(schemaValidatorFactory, validatorRegistry, propertyBindingRegistry);
}
var FormComponent = /** @class */ (function () {
    function FormComponent(formPropertyFactory, actionRegistry, validatorRegistry, bindingRegistry, cdr, terminator) {
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
    /**
     * @param {?} obj
     * @return {?}
     */
    FormComponent.prototype.writeValue = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        if (this.rootProperty) {
            this.rootProperty.reset(obj, false);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    FormComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
        if (this.rootProperty) {
            this.rootProperty.valueChanges.subscribe(this.onValueChanges.bind(this));
        }
    };
    // TODO implement
    // TODO implement
    /**
     * @param {?} fn
     * @return {?}
     */
    FormComponent.prototype.registerOnTouched = 
    // TODO implement
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
    };
    // TODO implement
    // setDisabledState(isDisabled: boolean)?: void
    // TODO implement
    // setDisabledState(isDisabled: boolean)?: void
    /**
     * @param {?} changes
     * @return {?}
     */
    FormComponent.prototype.ngOnChanges = 
    // TODO implement
    // setDisabledState(isDisabled: boolean)?: void
    /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
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
            this.rootProperty.errorsChanges.subscribe(function (value) {
                _this.onErrorChange.emit({ value: value });
                _this.isValid.emit(!(value && value.length));
            });
        }
        if (this.schema && (changes.model || changes.schema)) {
            this.rootProperty.reset(this.model, false);
            this.cdr.detectChanges();
        }
    };
    /**
     * @return {?}
     */
    FormComponent.prototype.setValidators = /**
     * @return {?}
     */
    function () {
        this.validatorRegistry.clear();
        if (this.validators) {
            for (var validatorId in this.validators) {
                if (this.validators.hasOwnProperty(validatorId)) {
                    this.validatorRegistry.register(validatorId, this.validators[validatorId]);
                }
            }
        }
    };
    /**
     * @return {?}
     */
    FormComponent.prototype.setActions = /**
     * @return {?}
     */
    function () {
        this.actionRegistry.clear();
        if (this.actions) {
            for (var actionId in this.actions) {
                if (this.actions.hasOwnProperty(actionId)) {
                    this.actionRegistry.register(actionId, this.actions[actionId]);
                }
            }
        }
    };
    /**
     * @return {?}
     */
    FormComponent.prototype.setBindings = /**
     * @return {?}
     */
    function () {
        this.bindingRegistry.clear();
        if (this.bindings) {
            for (var bindingPath in this.bindings) {
                if (this.bindings.hasOwnProperty(bindingPath)) {
                    this.bindingRegistry.register(bindingPath, this.bindings[bindingPath]);
                }
            }
        }
    };
    /**
     * @return {?}
     */
    FormComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.rootProperty.reset(null, true);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FormComponent.prototype.setModel = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.model) {
            Object.assign(this.model, value);
        }
        else {
            this.model = value;
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FormComponent.prototype.onValueChanges = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
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
    };
    FormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sf-form',
                    template: "\n    <form>\n      <sf-form-element\n        *ngIf=\"rootProperty\" [formProperty]=\"rootProperty\"></sf-form-element>\n    </form>",
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
                            deps: [SchemaValidatorFactory, ValidatorRegistry, PropertyBindingRegistry]
                        },
                        TerminatorService,
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: FormComponent,
                            multi: true
                        }
                    ]
                }] }
    ];
    /** @nocollapse */
    FormComponent.ctorParameters = function () { return [
        { type: FormPropertyFactory },
        { type: ActionRegistry },
        { type: ValidatorRegistry },
        { type: BindingRegistry },
        { type: ChangeDetectorRef },
        { type: TerminatorService }
    ]; };
    FormComponent.propDecorators = {
        schema: [{ type: Input }],
        model: [{ type: Input }],
        actions: [{ type: Input }],
        validators: [{ type: Input }],
        bindings: [{ type: Input }],
        onChange: [{ type: Output }],
        modelChange: [{ type: Output }],
        isValid: [{ type: Output }],
        onErrorChange: [{ type: Output }],
        onErrorsChange: [{ type: Output }]
    };
    return FormComponent;
}());
export { FormComponent };
if (false) {
    /** @type {?} */
    FormComponent.prototype.schema;
    /** @type {?} */
    FormComponent.prototype.model;
    /** @type {?} */
    FormComponent.prototype.actions;
    /** @type {?} */
    FormComponent.prototype.validators;
    /** @type {?} */
    FormComponent.prototype.bindings;
    /** @type {?} */
    FormComponent.prototype.onChange;
    /** @type {?} */
    FormComponent.prototype.modelChange;
    /** @type {?} */
    FormComponent.prototype.isValid;
    /** @type {?} */
    FormComponent.prototype.onErrorChange;
    /** @type {?} */
    FormComponent.prototype.onErrorsChange;
    /** @type {?} */
    FormComponent.prototype.rootProperty;
    /** @type {?} */
    FormComponent.prototype.onChangeCallback;
    /** @type {?} */
    FormComponent.prototype.formPropertyFactory;
    /** @type {?} */
    FormComponent.prototype.actionRegistry;
    /** @type {?} */
    FormComponent.prototype.validatorRegistry;
    /** @type {?} */
    FormComponent.prototype.bindingRegistry;
    /** @type {?} */
    FormComponent.prototype.cdr;
    /** @type {?} */
    FormComponent.prototype.terminator;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJsaWIvZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd6RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFdEQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDaEUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDOUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFHNUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRXhELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQzs7Ozs7OztBQUVwRSxNQUFNLFVBQVUsVUFBVSxDQUFDLHNCQUFzQixFQUFFLGlCQUFpQixFQUFFLHVCQUF1QjtJQUMzRixPQUFPLElBQUksbUJBQW1CLENBQUMsc0JBQXNCLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztBQUNyRyxDQUFDO0FBRUQ7SUFxREUsdUJBQ1UsbUJBQXdDLEVBQ3hDLGNBQThCLEVBQzlCLGlCQUFvQyxFQUNwQyxlQUFnQyxFQUNoQyxHQUFzQixFQUN0QixVQUE2QjtRQUw3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cEQsaUNBQXdEOztJQUV4RCxvQ0FBZ0Q7O0lBRWhELGdDQUFnRDs7SUFFaEQsc0NBQStEOztJQUUvRCx1Q0FBNEQ7O0lBRTVELHFDQUFrQzs7SUFFbEMseUNBQThCOztJQUc1Qiw0Q0FBZ0Q7O0lBQ2hELHVDQUFzQzs7SUFDdEMsMENBQTRDOztJQUM1Qyx3Q0FBd0M7O0lBQ3hDLDRCQUE4Qjs7SUFDOUIsbUNBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgT25DaGFuZ2VzLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7QWN0aW9ufSBmcm9tICcuL21vZGVsL2FjdGlvbic7XG5pbXBvcnQge0FjdGlvblJlZ2lzdHJ5fSBmcm9tICcuL21vZGVsL2FjdGlvbnJlZ2lzdHJ5JztcbmltcG9ydCB7Rm9ybVByb3BlcnR5fSBmcm9tICcuL21vZGVsL2Zvcm1wcm9wZXJ0eSc7XG5pbXBvcnQge0Zvcm1Qcm9wZXJ0eUZhY3Rvcnl9IGZyb20gJy4vbW9kZWwvZm9ybXByb3BlcnR5ZmFjdG9yeSc7XG5pbXBvcnQge1NjaGVtYVByZXByb2Nlc3Nvcn0gZnJvbSAnLi9tb2RlbC9zY2hlbWFwcmVwcm9jZXNzb3InO1xuaW1wb3J0IHtWYWxpZGF0b3JSZWdpc3RyeX0gZnJvbSAnLi9tb2RlbC92YWxpZGF0b3JyZWdpc3RyeSc7XG5pbXBvcnQge1ZhbGlkYXRvcn0gZnJvbSAnLi9tb2RlbC92YWxpZGF0b3InO1xuaW1wb3J0IHtCaW5kaW5nfSBmcm9tICcuL21vZGVsL2JpbmRpbmcnO1xuaW1wb3J0IHtCaW5kaW5nUmVnaXN0cnl9IGZyb20gJy4vbW9kZWwvYmluZGluZ3JlZ2lzdHJ5JztcblxuaW1wb3J0IHtTY2hlbWFWYWxpZGF0b3JGYWN0b3J5fSBmcm9tICcuL3NjaGVtYXZhbGlkYXRvcmZhY3RvcnknO1xuaW1wb3J0IHtXaWRnZXRGYWN0b3J5fSBmcm9tICcuL3dpZGdldGZhY3RvcnknO1xuaW1wb3J0IHtUZXJtaW5hdG9yU2VydmljZX0gZnJvbSAnLi90ZXJtaW5hdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHtQcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeX0gZnJvbSAnLi9wcm9wZXJ0eS1iaW5kaW5nLXJlZ2lzdHJ5JztcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZhY3Rvcnkoc2NoZW1hVmFsaWRhdG9yRmFjdG9yeSwgdmFsaWRhdG9yUmVnaXN0cnksIHByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5KSB7XG4gIHJldHVybiBuZXcgRm9ybVByb3BlcnR5RmFjdG9yeShzY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCB2YWxpZGF0b3JSZWdpc3RyeSwgcHJvcGVydHlCaW5kaW5nUmVnaXN0cnkpO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1mb3JtJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8Zm9ybT5cbiAgICAgIDxzZi1mb3JtLWVsZW1lbnRcbiAgICAgICAgKm5nSWY9XCJyb290UHJvcGVydHlcIiBbZm9ybVByb3BlcnR5XT1cInJvb3RQcm9wZXJ0eVwiPjwvc2YtZm9ybS1lbGVtZW50PlxuICAgIDwvZm9ybT5gLFxuICBwcm92aWRlcnM6IFtcbiAgICBBY3Rpb25SZWdpc3RyeSxcbiAgICBWYWxpZGF0b3JSZWdpc3RyeSxcbiAgICBQcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeSxcbiAgICBCaW5kaW5nUmVnaXN0cnksXG4gICAgU2NoZW1hUHJlcHJvY2Vzc29yLFxuICAgIFdpZGdldEZhY3RvcnksXG4gICAge1xuICAgICAgcHJvdmlkZTogRm9ybVByb3BlcnR5RmFjdG9yeSxcbiAgICAgIHVzZUZhY3Rvcnk6IHVzZUZhY3RvcnksXG4gICAgICBkZXBzOiBbU2NoZW1hVmFsaWRhdG9yRmFjdG9yeSwgVmFsaWRhdG9yUmVnaXN0cnksIFByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5XVxuICAgIH0sXG4gICAgVGVybWluYXRvclNlcnZpY2UsXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogRm9ybUNvbXBvbmVudCxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBASW5wdXQoKSBzY2hlbWE6IGFueSA9IG51bGw7XG5cbiAgQElucHV0KCkgbW9kZWw6IGFueTtcblxuICBASW5wdXQoKSBhY3Rpb25zOiB7IFthY3Rpb25JZDogc3RyaW5nXTogQWN0aW9uIH0gPSB7fTtcblxuICBASW5wdXQoKSB2YWxpZGF0b3JzOiB7IFtwYXRoOiBzdHJpbmddOiBWYWxpZGF0b3IgfSA9IHt9O1xuXG4gIEBJbnB1dCgpIGJpbmRpbmdzOiB7IFtwYXRoOiBzdHJpbmddOiBCaW5kaW5nIH0gPSB7fTtcblxuICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHsgdmFsdWU6IGFueSB9PigpO1xuXG4gIEBPdXRwdXQoKSBtb2RlbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBpc1ZhbGlkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIEBPdXRwdXQoKSBvbkVycm9yQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7IHZhbHVlOiBhbnlbXSB9PigpO1xuXG4gIEBPdXRwdXQoKSBvbkVycm9yc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8e3ZhbHVlOiBhbnl9PigpO1xuXG4gIHJvb3RQcm9wZXJ0eTogRm9ybVByb3BlcnR5ID0gbnVsbDtcblxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZvcm1Qcm9wZXJ0eUZhY3Rvcnk6IEZvcm1Qcm9wZXJ0eUZhY3RvcnksXG4gICAgcHJpdmF0ZSBhY3Rpb25SZWdpc3RyeTogQWN0aW9uUmVnaXN0cnksXG4gICAgcHJpdmF0ZSB2YWxpZGF0b3JSZWdpc3RyeTogVmFsaWRhdG9yUmVnaXN0cnksXG4gICAgcHJpdmF0ZSBiaW5kaW5nUmVnaXN0cnk6IEJpbmRpbmdSZWdpc3RyeSxcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSB0ZXJtaW5hdG9yOiBUZXJtaW5hdG9yU2VydmljZVxuICApIHsgfVxuXG4gIHdyaXRlVmFsdWUob2JqOiBhbnkpIHtcbiAgICBpZiAodGhpcy5yb290UHJvcGVydHkpIHtcbiAgICAgIHRoaXMucm9vdFByb3BlcnR5LnJlc2V0KG9iaiwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICAgIGlmICh0aGlzLnJvb3RQcm9wZXJ0eSkge1xuICAgICAgdGhpcy5yb290UHJvcGVydHkudmFsdWVDaGFuZ2VzLnN1YnNjcmliZShcbiAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlcy5iaW5kKHRoaXMpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE8gaW1wbGVtZW50XG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgfVxuXG4gIC8vIFRPRE8gaW1wbGVtZW50XG4gIC8vIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik/OiB2b2lkXG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMuc2V0VmFsaWRhdG9ycygpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLmFjdGlvbnMpIHtcbiAgICAgIHRoaXMuc2V0QWN0aW9ucygpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLmJpbmRpbmdzKSB7XG4gICAgICB0aGlzLnNldEJpbmRpbmdzKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2NoZW1hICYmICF0aGlzLnNjaGVtYS50eXBlKSB7XG4gICAgICB0aGlzLnNjaGVtYS50eXBlID0gJ29iamVjdCc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2NoZW1hICYmIGNoYW5nZXMuc2NoZW1hKSB7XG4gICAgICBpZiAoIWNoYW5nZXMuc2NoZW1hLmZpcnN0Q2hhbmdlKSB7XG4gICAgICAgIHRoaXMudGVybWluYXRvci5kZXN0cm95KCk7XG4gICAgICB9XG5cbiAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5wcmVwcm9jZXNzKHRoaXMuc2NoZW1hKTtcbiAgICAgIHRoaXMucm9vdFByb3BlcnR5ID0gdGhpcy5mb3JtUHJvcGVydHlGYWN0b3J5LmNyZWF0ZVByb3BlcnR5KHRoaXMuc2NoZW1hKTtcbiAgICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICAgIC8vIHRoaXMucm9vdFByb3BlcnR5LnJlc2V0KHRoaXMubW9kZWwsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yb290UHJvcGVydHkudmFsdWVDaGFuZ2VzLnN1YnNjcmliZShcbiAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlcy5iaW5kKHRoaXMpXG4gICAgICApO1xuXG4gICAgICB0aGlzLnJvb3RQcm9wZXJ0eS5lcnJvcnNDaGFuZ2VzLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgIHRoaXMub25FcnJvckNoYW5nZS5lbWl0KHt2YWx1ZTogdmFsdWV9KTtcbiAgICAgICAgdGhpcy5pc1ZhbGlkLmVtaXQoISh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGgpKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2NoZW1hICYmIChjaGFuZ2VzLm1vZGVsIHx8IGNoYW5nZXMuc2NoZW1hICkpIHtcbiAgICAgIHRoaXMucm9vdFByb3BlcnR5LnJlc2V0KHRoaXMubW9kZWwsIGZhbHNlKTtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgc2V0VmFsaWRhdG9ycygpIHtcbiAgICB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LmNsZWFyKCk7XG4gICAgaWYgKHRoaXMudmFsaWRhdG9ycykge1xuICAgICAgZm9yIChjb25zdCB2YWxpZGF0b3JJZCBpbiB0aGlzLnZhbGlkYXRvcnMpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdG9ycy5oYXNPd25Qcm9wZXJ0eSh2YWxpZGF0b3JJZCkpIHtcbiAgICAgICAgICB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LnJlZ2lzdGVyKHZhbGlkYXRvcklkLCB0aGlzLnZhbGlkYXRvcnNbdmFsaWRhdG9ySWRdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0QWN0aW9ucygpIHtcbiAgICB0aGlzLmFjdGlvblJlZ2lzdHJ5LmNsZWFyKCk7XG4gICAgaWYgKHRoaXMuYWN0aW9ucykge1xuICAgICAgZm9yIChjb25zdCBhY3Rpb25JZCBpbiB0aGlzLmFjdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aW9ucy5oYXNPd25Qcm9wZXJ0eShhY3Rpb25JZCkpIHtcbiAgICAgICAgICB0aGlzLmFjdGlvblJlZ2lzdHJ5LnJlZ2lzdGVyKGFjdGlvbklkLCB0aGlzLmFjdGlvbnNbYWN0aW9uSWRdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0QmluZGluZ3MoKSB7XG4gICAgdGhpcy5iaW5kaW5nUmVnaXN0cnkuY2xlYXIoKTtcbiAgICBpZiAodGhpcy5iaW5kaW5ncykge1xuICAgICAgZm9yIChjb25zdCBiaW5kaW5nUGF0aCBpbiB0aGlzLmJpbmRpbmdzKSB7XG4gICAgICAgIGlmICh0aGlzLmJpbmRpbmdzLmhhc093blByb3BlcnR5KGJpbmRpbmdQYXRoKSkge1xuICAgICAgICAgIHRoaXMuYmluZGluZ1JlZ2lzdHJ5LnJlZ2lzdGVyKGJpbmRpbmdQYXRoLCB0aGlzLmJpbmRpbmdzW2JpbmRpbmdQYXRoXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgdGhpcy5yb290UHJvcGVydHkucmVzZXQobnVsbCwgdHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIHNldE1vZGVsKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm1vZGVsLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kZWwgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uVmFsdWVDaGFuZ2VzKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMub25DaGFuZ2VDYWxsYmFjaykge1xuICAgICAgdGhpcy5zZXRNb2RlbCh2YWx1ZSk7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICAgIH1cblxuICAgIC8vIHR3byB3YXkgYmluZGluZyBpcyB1c2VkXG4gICAgaWYgKHRoaXMubW9kZWxDaGFuZ2Uub2JzZXJ2ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICghdGhpcy5vbkNoYW5nZUNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuc2V0TW9kZWwodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe3ZhbHVlOiB2YWx1ZX0pO1xuICB9XG59XG4iXX0=