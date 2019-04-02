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
import { ControlWidget } from '../../widget';
var SelectWidget = /** @class */ (function (_super) {
    __extends(SelectWidget, _super);
    function SelectWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectWidget = __decorate([
        Component({
            selector: 'sf-select-widget',
            template: "<div class=\"widget form-group\">\n\t<label [attr.for]=\"id\" class=\"horizontal control-label\">\n\t\t{{ schema.title }}\n\t</label>\n\n\t<span *ngIf=\"schema.description\" class=\"formHelp\">\n\t\t{{schema.description}}\n\t</span>\n\n\t<select *ngIf=\"schema.type!='array'\" [formControl]=\"control\" [attr.name]=\"name\" [attr.disabled]=\"schema.readOnly\" class=\"form-control\">\n\t\t<option *ngFor=\"let option of schema.oneOf\" [ngValue]=\"option.enum[0]\" >{{option.description}}</option>\n\t</select>\n\n\t<select *ngIf=\"schema.type==='array'\" multiple [formControl]=\"control\" [attr.name]=\"name\" [attr.disabled]=\"schema.readOnly\" class=\"form-control\">\n\t\t<option *ngFor=\"let option of schema.items.oneOf\" [ngValue]=\"option.enum[0]\" >{{option.description}}</option>\n\t</select>\n\n\t<input *ngIf=\"schema.readOnly\" [attr.name]=\"name\" type=\"hidden\" [formControl]=\"control\">\n</div>"
        })
    ], SelectWidget);
    return SelectWidget;
}(ControlWidget));
export { SelectWidget };
