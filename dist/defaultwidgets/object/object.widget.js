var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { ObjectLayoutWidget } from '../../widget';
var ObjectWidget = /** @class */ (function (_super) {
    __extends(ObjectWidget, _super);
    function ObjectWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObjectWidget = __decorate([
        Component({
            selector: 'sf-form-object',
            template: "<fieldset *ngFor=\"let fieldset of formProperty.schema.fieldsets\">\n\t<legend *ngIf=\"fieldset.title\">{{fieldset.title}}</legend>\n\t<div *ngIf=\"fieldset.description\">{{fieldset.description}}</div>\n\t<div *ngFor=\"let fieldId of fieldset.fields\">\n\t\t<sf-form-element [formProperty]=\"formProperty.getProperty(fieldId)\"></sf-form-element>\n\t</div>\n</fieldset>"
        })
    ], ObjectWidget);
    return ObjectWidget;
}(ObjectLayoutWidget));
export { ObjectWidget };
