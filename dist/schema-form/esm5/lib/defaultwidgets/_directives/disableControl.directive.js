import { __decorate, __metadata } from "tslib";
import { Input, Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
var DisableControlDirective = /** @class */ (function () {
    function DisableControlDirective(ngControl) {
        this.ngControl = ngControl;
    }
    Object.defineProperty(DisableControlDirective.prototype, "disableControl", {
        set: function (condition) {
            var action = condition ? 'disable' : 'enable';
            this.ngControl.control[action]();
        },
        enumerable: true,
        configurable: true
    });
    DisableControlDirective.ctorParameters = function () { return [
        { type: NgControl }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], DisableControlDirective.prototype, "disableControl", null);
    DisableControlDirective = __decorate([
        Directive({
            selector: '[disableControl]'
        }),
        __metadata("design:paramtypes", [NgControl])
    ], DisableControlDirective);
    return DisableControlDirective;
}());
export { DisableControlDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZUNvbnRyb2wuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2RlZmF1bHR3aWRnZXRzL19kaXJlY3RpdmVzL2Rpc2FibGVDb250cm9sLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDaEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSzNDO0lBT0ksaUNBQW9CLFNBQW9CO1FBQXBCLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFDeEMsQ0FBQztJQU5RLHNCQUFJLG1EQUFjO2FBQWxCLFVBQW1CLFNBQWtCO1lBQzFDLElBQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTs7Z0JBRThCLFNBQVM7O0lBTC9CO1FBQVIsS0FBSyxFQUFFOzs7aUVBR1A7SUFMUSx1QkFBdUI7UUFIbkMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGtCQUFrQjtTQUMvQixDQUFDO3lDQVFpQyxTQUFTO09BUC9CLHVCQUF1QixDQVVuQztJQUFELDhCQUFDO0NBQUEsQUFWRCxJQVVDO1NBVlksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5wdXQsIERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2Rpc2FibGVDb250cm9sXSdcbn0pXG5leHBvcnQgY2xhc3MgRGlzYWJsZUNvbnRyb2xEaXJlY3RpdmUge1xuXG4gICAgQElucHV0KCkgc2V0IGRpc2FibGVDb250cm9sKGNvbmRpdGlvbjogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBjb25kaXRpb24gPyAnZGlzYWJsZScgOiAnZW5hYmxlJztcbiAgICAgICAgdGhpcy5uZ0NvbnRyb2wuY29udHJvbFthY3Rpb25dKCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0NvbnRyb2w6IE5nQ29udHJvbCkge1xuICAgIH1cblxufSJdfQ==