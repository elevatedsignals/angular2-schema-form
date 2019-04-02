var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { WidgetRegistry } from './widgetregistry';
var WidgetFactory = /** @class */ (function () {
    function WidgetFactory(registry, resolver) {
        this.registry = registry;
        this.resolver = resolver;
    }
    WidgetFactory.prototype.createWidget = function (container, type) {
        var componentClass = this.registry.getWidgetType(type);
        var componentFactory = this.resolver.resolveComponentFactory(componentClass);
        return container.createComponent(componentFactory);
    };
    WidgetFactory = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [WidgetRegistry, typeof (_a = typeof ComponentFactoryResolver !== "undefined" && ComponentFactoryResolver) === "function" && _a || Object])
    ], WidgetFactory);
    return WidgetFactory;
    var _a;
}());
export { WidgetFactory };
