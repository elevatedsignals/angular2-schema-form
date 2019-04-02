var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActionRegistry, FormProperty } from './model';
var FormElementComponent = /** @class */ (function () {
    function FormElementComponent(actionRegistry) {
        this.actionRegistry = actionRegistry;
        this.control = new FormControl('', function () { return null; });
        this.widget = null;
        this.buttons = [];
    }
    FormElementComponent_1 = FormElementComponent;
    FormElementComponent.prototype.ngOnInit = function () {
        this.parseButtons();
    };
    FormElementComponent.prototype.parseButtons = function () {
        if (this.formProperty.schema.buttons !== undefined) {
            this.buttons = this.formProperty.schema.buttons;
            for (var _i = 0, _a = this.buttons; _i < _a.length; _i++) {
                var button = _a[_i];
                this.createButtonCallback(button);
            }
        }
    };
    FormElementComponent.prototype.createButtonCallback = function (button) {
        var _this = this;
        button.action = function (e) {
            var action;
            if (button.id && (action = _this.actionRegistry.get(button.id))) {
                if (action) {
                    action(_this.formProperty, button.parameters);
                }
            }
            e.preventDefault();
        };
    };
    FormElementComponent.prototype.onWidgetInstanciated = function (widget) {
        this.widget = widget;
        var id = 'field' + (FormElementComponent_1.counter++);
        this.widget.formProperty = this.formProperty;
        this.widget.schema = this.formProperty.schema;
        this.widget.name = id;
        this.widget.id = id;
        this.widget.control = this.control;
    };
    FormElementComponent.counter = 0;
    __decorate([
        Input(),
        __metadata("design:type", FormProperty)
    ], FormElementComponent.prototype, "formProperty", void 0);
    FormElementComponent = FormElementComponent_1 = __decorate([
        Component({
            selector: 'sf-form-element',
            template: "<div *ngIf=\"formProperty.visible\"\n    [class.has-error]=\"!control.valid\"\n\t  [class.has-success]=\"control.valid\">\n\t<sf-widget-chooser\n\t(widgetInstanciated)=\"onWidgetInstanciated($event)\"\n\t[widgetInfo]=\"formProperty.schema.widget\">\n\t</sf-widget-chooser>\n\t<sf-form-element-action *ngFor=\"let button of buttons\" [button]=\"button\" [formProperty]=\"formProperty\"></sf-form-element-action>\n</div>"
        }),
        __metadata("design:paramtypes", [ActionRegistry])
    ], FormElementComponent);
    return FormElementComponent;
    var FormElementComponent_1;
}());
export { FormElementComponent };
