var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef, EventEmitter, Input, Output, ViewChild, ViewContainerRef, } from '@angular/core';
import { TerminatorService } from './terminator.service';
import { WidgetFactory } from './widgetfactory';
var WidgetChooserComponent = /** @class */ (function () {
    function WidgetChooserComponent(widgetFactory, cdr, terminator) {
        if (widgetFactory === void 0) { widgetFactory = null; }
        this.widgetFactory = widgetFactory;
        this.cdr = cdr;
        this.terminator = terminator;
        this.widgetInstanciated = new EventEmitter();
    }
    WidgetChooserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.terminator.onDestroy.subscribe(function (destroy) {
            if (destroy) {
                _this.ref.destroy();
            }
        });
    };
    WidgetChooserComponent.prototype.ngOnChanges = function () {
        this.ref = this.widgetFactory.createWidget(this.container, this.widgetInfo.id);
        this.widgetInstanciated.emit(this.ref.instance);
        this.widgetInstance = this.ref.instance;
        this.cdr.detectChanges();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], WidgetChooserComponent.prototype, "widgetInfo", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], WidgetChooserComponent.prototype, "widgetInstanciated", void 0);
    __decorate([
        ViewChild('target', { read: ViewContainerRef }),
        __metadata("design:type", typeof (_a = typeof ViewContainerRef !== "undefined" && ViewContainerRef) === "function" && _a || Object)
    ], WidgetChooserComponent.prototype, "container", void 0);
    WidgetChooserComponent = __decorate([
        Component({
            selector: 'sf-widget-chooser',
            template: "<div #target></div>",
        }),
        __metadata("design:paramtypes", [WidgetFactory, typeof (_b = typeof ChangeDetectorRef !== "undefined" && ChangeDetectorRef) === "function" && _b || Object, TerminatorService])
    ], WidgetChooserComponent);
    return WidgetChooserComponent;
    var _a, _b;
}());
export { WidgetChooserComponent };
