var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionRegistry, FormPropertyFactory, SchemaPreprocessor, ValidatorRegistry } from './model';
import { SchemaValidatorFactory } from './schemavalidatorfactory';
import { WidgetFactory } from './widgetfactory';
import { TerminatorService } from './terminator.service';
export function useFactory(schemaValidatorFactory, validatorRegistry) {
    return new FormPropertyFactory(schemaValidatorFactory, validatorRegistry);
}
;
var FormComponent = /** @class */ (function () {
    function FormComponent(formPropertyFactory, actionRegistry, validatorRegistry, cdr, terminator) {
        this.formPropertyFactory = formPropertyFactory;
        this.actionRegistry = actionRegistry;
        this.validatorRegistry = validatorRegistry;
        this.cdr = cdr;
        this.terminator = terminator;
        this.schema = null;
        this.actions = {};
        this.validators = {};
        this.onChange = new EventEmitter();
        this.modelChanged = new EventEmitter();
        this.isValid = new EventEmitter();
        this.onErrorChange = new EventEmitter();
        this.onErrorsChange = new EventEmitter();
        this.rootProperty = null;
    }
    FormComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.validators) {
            this.setValidators();
        }
        if (changes.actions) {
            this.setActions();
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
            this.rootProperty.valueChanges.subscribe(function (value) {
                if (_this.modelChanged.observers.length > 0) {
                    if (_this.model) {
                        Object.assign(_this.model, value);
                    }
                    else {
                        _this.model = value;
                    }
                    _this.modelChanged.emit(value);
                }
                _this.onChange.emit({ value: value });
            });
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
    FormComponent.prototype.setValidators = function () {
        this.validatorRegistry.clear();
        if (this.validators) {
            for (var validatorId in this.validators) {
                if (this.validators.hasOwnProperty(validatorId)) {
                    this.validatorRegistry.register(validatorId, this.validators[validatorId]);
                }
            }
        }
    };
    FormComponent.prototype.setActions = function () {
        this.actionRegistry.clear();
        if (this.actions) {
            for (var actionId in this.actions) {
                if (this.actions.hasOwnProperty(actionId)) {
                    this.actionRegistry.register(actionId, this.actions[actionId]);
                }
            }
        }
    };
    FormComponent.prototype.reset = function () {
        this.rootProperty.reset(null, true);
    };
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
        Output(),
        __metadata("design:type", Object)
    ], FormComponent.prototype, "onChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], FormComponent.prototype, "modelChanged", void 0);
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
    FormComponent = __decorate([
        Component({
            selector: 'sf-form',
            template: "\n\t\t<form>\n\t\t\t<sf-form-element\n\t\t\t\t*ngIf=\"rootProperty\" [formProperty]=\"rootProperty\"></sf-form-element>\n\t\t</form>",
            providers: [
                ActionRegistry,
                ValidatorRegistry,
                SchemaPreprocessor,
                WidgetFactory,
                {
                    provide: FormPropertyFactory,
                    useFactory: useFactory,
                    deps: [SchemaValidatorFactory, ValidatorRegistry]
                },
                TerminatorService,
            ]
        }),
        __metadata("design:paramtypes", [FormPropertyFactory,
            ActionRegistry,
            ValidatorRegistry, typeof (_a = typeof ChangeDetectorRef !== "undefined" && ChangeDetectorRef) === "function" && _a || Object, TerminatorService])
    ], FormComponent);
    return FormComponent;
    var _a;
}());
export { FormComponent };
