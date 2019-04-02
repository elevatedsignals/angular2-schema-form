/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, ElementRef, EventEmitter, forwardRef } from '@angular/core';
import { TemplateSchemaElement } from '../template-schema-element';
var ButtonComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonComponent, _super);
    function ButtonComponent(elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.label = '';
        _this.click = new EventEmitter();
        return _this;
    }
    /**
     * @return {?}
     */
    ButtonComponent.prototype.setLabelFromContent = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var textContent = this.getTextContent(this.elementRef);
        // label as @Input takes priority over content text
        if (textContent && !this.label) {
            this.label = textContent;
        }
    };
    /**
     * @return {?}
     */
    ButtonComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.setLabelFromContent();
    };
    ButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sf-button',
                    template: "<ng-content></ng-content>\n",
                    providers: [
                        {
                            provide: TemplateSchemaElement,
                            useExisting: forwardRef(function () { return ButtonComponent; }),
                        }
                    ]
                }] }
    ];
    /** @nocollapse */
    ButtonComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ButtonComponent.propDecorators = {
        id: [{ type: Input }],
        label: [{ type: Input }],
        widget: [{ type: Input }],
        click: [{ type: Output }]
    };
    return ButtonComponent;
}(TemplateSchemaElement));
export { ButtonComponent };
if (false) {
    /** @type {?} */
    ButtonComponent.prototype.id;
    /** @type {?} */
    ButtonComponent.prototype.label;
    /** @type {?} */
    ButtonComponent.prototype.widget;
    /** @type {?} */
    ButtonComponent.prototype.click;
    /** @type {?} */
    ButtonComponent.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi90ZW1wbGF0ZS1zY2hlbWEvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFDTCxNQUFNLEVBQ04sVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHbkU7SUFVcUMsMkNBQXFCO0lBY3hELHlCQUFvQixVQUFzQjtRQUExQyxZQUNFLGlCQUFPLFNBQ1I7UUFGbUIsZ0JBQVUsR0FBVixVQUFVLENBQVk7UUFSMUMsV0FBSyxHQUFHLEVBQUUsQ0FBQztRQU1YLFdBQUssR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDOztJQUloQyxDQUFDOzs7O0lBRU8sNkNBQW1COzs7SUFBM0I7O1lBQ1EsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUV4RCxtREFBbUQ7UUFDbkQsSUFBSSxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO1NBQzFCO0lBRUgsQ0FBQzs7OztJQUVELDRDQUFrQjs7O0lBQWxCO1FBQ0UsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDN0IsQ0FBQzs7Z0JBeENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsdUNBQXNDO29CQUN0QyxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLHFCQUFxQjs0QkFDOUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsZUFBZSxFQUFmLENBQWUsQ0FBQzt5QkFDL0M7cUJBQ0Y7aUJBQ0Y7Ozs7Z0JBbEJDLFVBQVU7OztxQkFxQlQsS0FBSzt3QkFHTCxLQUFLO3lCQUdMLEtBQUs7d0JBR0wsTUFBTTs7SUFxQlQsc0JBQUM7Q0FBQSxBQTFDRCxDQVVxQyxxQkFBcUIsR0FnQ3pEO1NBaENZLGVBQWU7OztJQUUxQiw2QkFDVzs7SUFFWCxnQ0FDVzs7SUFFWCxpQ0FDd0I7O0lBRXhCLGdDQUNnQzs7SUFFcEIscUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFRlbXBsYXRlU2NoZW1hRWxlbWVudCB9IGZyb20gJy4uL3RlbXBsYXRlLXNjaGVtYS1lbGVtZW50JztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1idXR0b24nLFxuICB0ZW1wbGF0ZVVybDogJy4vYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogVGVtcGxhdGVTY2hlbWFFbGVtZW50LFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQnV0dG9uQ29tcG9uZW50KSxcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uQ29tcG9uZW50IGV4dGVuZHMgVGVtcGxhdGVTY2hlbWFFbGVtZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG5cbiAgQElucHV0KClcbiAgaWQ6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBsYWJlbCA9ICcnO1xuXG4gIEBJbnB1dCgpXG4gIHdpZGdldDogc3RyaW5nIHwgb2JqZWN0O1xuXG4gIEBPdXRwdXQoKVxuICBjbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcml2YXRlIHNldExhYmVsRnJvbUNvbnRlbnQoKSB7XG4gICAgY29uc3QgdGV4dENvbnRlbnQgPSB0aGlzLmdldFRleHRDb250ZW50KHRoaXMuZWxlbWVudFJlZik7XG5cbiAgICAvLyBsYWJlbCBhcyBASW5wdXQgdGFrZXMgcHJpb3JpdHkgb3ZlciBjb250ZW50IHRleHRcbiAgICBpZiAodGV4dENvbnRlbnQgJiYgIXRoaXMubGFiZWwpIHtcbiAgICAgIHRoaXMubGFiZWwgPSB0ZXh0Q29udGVudDtcbiAgICB9XG5cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLnNldExhYmVsRnJvbUNvbnRlbnQoKTtcbiAgfVxuXG59XG4iXX0=