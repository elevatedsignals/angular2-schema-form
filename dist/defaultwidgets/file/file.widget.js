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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';
var FileWidget = /** @class */ (function (_super) {
    __extends(FileWidget, _super);
    function FileWidget() {
        var _this = _super.call(this) || this;
        _this.reader = new FileReader();
        _this.filedata = {};
        return _this;
    }
    FileWidget.prototype.ngAfterViewInit = function () {
        var _this = this;
        // OVERRIDE ControlWidget ngAfterViewInit() as ReactiveForms do not handle
        // file inputs
        var control = this.control;
        this.formProperty.errorsChanges.subscribe(function (errors) {
            control.setErrors(errors, { emitEvent: true });
        });
        this.reader.onloadend = function () {
            _this.filedata.data = btoa(_this.reader.result);
            _this.formProperty.setValue(_this.filedata, false);
        };
    };
    FileWidget.prototype.onFileChange = function ($event) {
        var file = $event.target.files[0];
        this.filedata.filename = file.name;
        this.filedata.size = file.size;
        this.filedata['content-type'] = file.type;
        this.filedata.encoding = 'base64';
        this.reader.readAsBinaryString(file);
    };
    FileWidget = __decorate([
        Component({
            selector: 'sf-file-widget',
            template: "<div class=\"widget form-group\">\n\t<label [attr.for]=\"id\" class=\"horizontal control-label\">\n\t\t{{ schema.title }}\n\t</label>\n    <span *ngIf=\"schema.description\" class=\"formHelp\">{{schema.description}}</span>\n  <input [name]=\"name\" class=\"text-widget file-widget\" [attr.id]=\"id\"\n    [formControl]=\"control\" type=\"file\" [attr.disabled]=\"schema.readOnly?true:null\"\n    (change)=\"onFileChange($event)\">\n\t<input *ngIf=\"schema.readOnly\" [attr.name]=\"name\" type=\"hidden\" [formControl]=\"control\">\n</div>"
        }),
        __metadata("design:paramtypes", [])
    ], FileWidget);
    return FileWidget;
}(ControlWidget));
export { FileWidget };
