import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
var BindingRegistry = /** @class */ (function () {
    function BindingRegistry() {
        this.bindings = [];
    }
    BindingRegistry.prototype.clear = function () {
        this.bindings = [];
    };
    BindingRegistry.prototype.register = function (path, binding) {
        this.bindings[path] = [].concat(binding);
    };
    BindingRegistry.prototype.get = function (path) {
        return this.bindings[path];
    };
    BindingRegistry = __decorate([
        Injectable()
    ], BindingRegistry);
    return BindingRegistry;
}());
export { BindingRegistry };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGluZ3JlZ2lzdHJ5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL21vZGVsL2JpbmRpbmdyZWdpc3RyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQztJQUFBO1FBQ0UsYUFBUSxHQUFjLEVBQUUsQ0FBQztJQWEzQixDQUFDO0lBWEMsK0JBQUssR0FBTDtRQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxrQ0FBUSxHQUFSLFVBQVMsSUFBWSxFQUFFLE9BQTRCO1FBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsNkJBQUcsR0FBSCxVQUFJLElBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQWJVLGVBQWU7UUFEM0IsVUFBVSxFQUFFO09BQ0EsZUFBZSxDQWMzQjtJQUFELHNCQUFDO0NBQUEsQUFkRCxJQWNDO1NBZFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmluZGluZ30gZnJvbSAnLi9iaW5kaW5nJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmluZGluZ1JlZ2lzdHJ5IHtcbiAgYmluZGluZ3M6IEJpbmRpbmdbXSA9IFtdO1xuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuYmluZGluZ3MgPSBbXTtcbiAgfVxuXG4gIHJlZ2lzdGVyKHBhdGg6IHN0cmluZywgYmluZGluZzogQmluZGluZyB8IEJpbmRpbmdbXSkge1xuICAgIHRoaXMuYmluZGluZ3NbcGF0aF0gPSBbXS5jb25jYXQoYmluZGluZyk7XG4gIH1cblxuICBnZXQocGF0aDogc3RyaW5nKTogQmluZGluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5iaW5kaW5nc1twYXRoXTtcbiAgfVxufVxuIl19