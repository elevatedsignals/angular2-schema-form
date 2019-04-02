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
import { Component, } from '@angular/core';
import { ControlWidget } from '../../widget';
var IntegerWidget = /** @class */ (function (_super) {
    __extends(IntegerWidget, _super);
    function IntegerWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IntegerWidget = __decorate([
        Component({
            selector: 'sf-integer-widget',
            template: "<div class=\"widget form-group\">\n\t<label [attr.for]=\"id\" class=\"horizontal control-label\">\n\t\t{{ schema.title }}\n\t</label>\n\t<div class=\"widget form-group\">\n    <span *ngIf=\"schema.description\" class=\"formHelp\">{{schema.description}}</span>\n\t<input [attr.readonly]=\"schema.readOnly?true:null\" [name]=\"name\"\n\tclass=\"text-widget integer-widget form-control\" [formControl]=\"control\"\n\t[attr.type]=\"'number'\" [attr.min]=\"schema.minimum\" [attr.max]=\"schema.maximum\"\n\t[attr.placeholder]=\"schema.placeholder\"\n\t[attr.maxLength]=\"schema.maxLength || null\"\n  [attr.minLength]=\"schema.minLength || null\">\n</div>"
        })
    ], IntegerWidget);
    return IntegerWidget;
}(ControlWidget));
export { IntegerWidget };
