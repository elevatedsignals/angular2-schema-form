import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
var ValidatorRegistry = /** @class */ (function () {
    function ValidatorRegistry() {
        this.validators = [];
    }
    ValidatorRegistry.prototype.register = function (path, validator) {
        this.validators[path] = validator;
    };
    ValidatorRegistry.prototype.get = function (path) {
        return this.validators[path];
    };
    ValidatorRegistry.prototype.clear = function () {
        this.validators = [];
    };
    ValidatorRegistry = __decorate([
        Injectable()
    ], ValidatorRegistry);
    return ValidatorRegistry;
}());
export { ValidatorRegistry };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9ycmVnaXN0cnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJsaWIvbW9kZWwvdmFsaWRhdG9ycmVnaXN0cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0M7SUFBQTtRQUNVLGVBQVUsR0FBZ0IsRUFBRSxDQUFDO0lBYXZDLENBQUM7SUFYQyxvQ0FBUSxHQUFSLFVBQVMsSUFBWSxFQUFFLFNBQW9CO1FBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQ3BDLENBQUM7SUFFRCwrQkFBRyxHQUFILFVBQUksSUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsaUNBQUssR0FBTDtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFiVSxpQkFBaUI7UUFEN0IsVUFBVSxFQUFFO09BQ0EsaUJBQWlCLENBYzdCO0lBQUQsd0JBQUM7Q0FBQSxBQWRELElBY0M7U0FkWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICcuL3ZhbGlkYXRvcic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFZhbGlkYXRvclJlZ2lzdHJ5IHtcbiAgcHJpdmF0ZSB2YWxpZGF0b3JzOiBWYWxpZGF0b3JbXSA9IFtdO1xuXG4gIHJlZ2lzdGVyKHBhdGg6IHN0cmluZywgdmFsaWRhdG9yOiBWYWxpZGF0b3IpIHtcbiAgICB0aGlzLnZhbGlkYXRvcnNbcGF0aF0gPSB2YWxpZGF0b3I7XG4gIH1cblxuICBnZXQocGF0aDogc3RyaW5nKTogVmFsaWRhdG9yIHtcbiAgICByZXR1cm4gdGhpcy52YWxpZGF0b3JzW3BhdGhdO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy52YWxpZGF0b3JzID0gW107XG4gIH1cbn1cbiJdfQ==