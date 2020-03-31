import { __decorate, __metadata } from "tslib";
import { Input, Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
let DisableControlDirective = class DisableControlDirective {
    constructor(ngControl) {
        this.ngControl = ngControl;
    }
    set disableControl(condition) {
        const action = condition ? 'disable' : 'enable';
        this.ngControl.control[action]();
    }
};
DisableControlDirective.ctorParameters = () => [
    { type: NgControl }
];
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
export { DisableControlDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZUNvbnRyb2wuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2RlZmF1bHR3aWRnZXRzL19kaXJlY3RpdmVzL2Rpc2FibGVDb250cm9sLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDaEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSzNDLElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBT2hDLFlBQW9CLFNBQW9CO1FBQXBCLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFDeEMsQ0FBQztJQU5RLElBQUksY0FBYyxDQUFDLFNBQWtCO1FBQzFDLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0NBS0osQ0FBQTs7WUFIa0MsU0FBUzs7QUFML0I7SUFBUixLQUFLLEVBQUU7Ozs2REFHUDtBQUxRLHVCQUF1QjtJQUhuQyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsa0JBQWtCO0tBQy9CLENBQUM7cUNBUWlDLFNBQVM7R0FQL0IsdUJBQXVCLENBVW5DO1NBVlksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5wdXQsIERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2Rpc2FibGVDb250cm9sXSdcbn0pXG5leHBvcnQgY2xhc3MgRGlzYWJsZUNvbnRyb2xEaXJlY3RpdmUge1xuXG4gICAgQElucHV0KCkgc2V0IGRpc2FibGVDb250cm9sKGNvbmRpdGlvbjogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBjb25kaXRpb24gPyAnZGlzYWJsZScgOiAnZW5hYmxlJztcbiAgICAgICAgdGhpcy5uZ0NvbnRyb2wuY29udHJvbFthY3Rpb25dKCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0NvbnRyb2w6IE5nQ29udHJvbCkge1xuICAgIH1cblxufSJdfQ==