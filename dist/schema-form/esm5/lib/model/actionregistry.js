import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
var ActionRegistry = /** @class */ (function () {
    function ActionRegistry() {
        this.actions = {};
    }
    ActionRegistry.prototype.clear = function () {
        this.actions = {};
    };
    ActionRegistry.prototype.register = function (actionId, action) {
        this.actions[actionId] = action;
    };
    ActionRegistry.prototype.get = function (actionId) {
        return this.actions[actionId];
    };
    ActionRegistry = __decorate([
        Injectable()
    ], ActionRegistry);
    return ActionRegistry;
}());
export { ActionRegistry };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucmVnaXN0cnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJsaWIvbW9kZWwvYWN0aW9ucmVnaXN0cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0M7SUFBQTtRQUNFLFlBQU8sR0FBNEIsRUFBRSxDQUFDO0lBYXhDLENBQUM7SUFYQyw4QkFBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELGlDQUFRLEdBQVIsVUFBUyxRQUFnQixFQUFFLE1BQWM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUM7SUFDbEMsQ0FBQztJQUVELDRCQUFHLEdBQUgsVUFBSSxRQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQWJVLGNBQWM7UUFEMUIsVUFBVSxFQUFFO09BQ0EsY0FBYyxDQWMxQjtJQUFELHFCQUFDO0NBQUEsQUFkRCxJQWNDO1NBZFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4vYWN0aW9uJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWN0aW9uUmVnaXN0cnkge1xuICBhY3Rpb25zOiB7W2tleTogc3RyaW5nXTogQWN0aW9ufSA9IHt9O1xuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuYWN0aW9ucyA9IHt9O1xuICB9XG5cbiAgcmVnaXN0ZXIoYWN0aW9uSWQ6IHN0cmluZywgYWN0aW9uOiBBY3Rpb24pIHtcbiAgICB0aGlzLmFjdGlvbnNbYWN0aW9uSWRdID0gYWN0aW9uO1xuICB9XG5cbiAgZ2V0KGFjdGlvbklkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zW2FjdGlvbklkXTtcbiAgfVxufVxuIl19