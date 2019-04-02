var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewChild, ViewContainerRef } from "@angular/core";
import { WidgetFactory } from "./widgetfactory";
import { TerminatorService } from "./terminator.service";
var FormElementComponentAction = /** @class */ (function () {
    function FormElementComponentAction(widgetFactory, terminator) {
        if (widgetFactory === void 0) { widgetFactory = null; }
        this.widgetFactory = widgetFactory;
        this.terminator = terminator;
    }
    FormElementComponentAction.prototype.ngOnInit = function () {
        var _this = this;
        this.terminator.onDestroy.subscribe(function (destroy) {
            if (destroy) {
                _this.ref.destroy();
            }
        });
    };
    FormElementComponentAction.prototype.ngOnChanges = function () {
        this.ref = this.widgetFactory.createWidget(this.container, this.button.widget || 'button');
        this.ref.instance.button = this.button;
        this.ref.instance.formProperty = this.formProperty;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormElementComponentAction.prototype, "button", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormElementComponentAction.prototype, "formProperty", void 0);
    __decorate([
        ViewChild('target', { read: ViewContainerRef }),
        __metadata("design:type", typeof (_a = typeof ViewContainerRef !== "undefined" && ViewContainerRef) === "function" && _a || Object)
    ], FormElementComponentAction.prototype, "container", void 0);
    FormElementComponentAction = __decorate([
        Component({
            selector: 'sf-form-element-action',
            template: '<ng-template #target></ng-template>'
        }),
        __metadata("design:paramtypes", [WidgetFactory,
            TerminatorService])
    ], FormElementComponentAction);
    return FormElementComponentAction;
    var _a;
}());
export { FormElementComponentAction };
