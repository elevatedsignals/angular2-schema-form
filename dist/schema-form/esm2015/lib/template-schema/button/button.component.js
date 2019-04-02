/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, Output, ElementRef, EventEmitter, forwardRef } from '@angular/core';
import { TemplateSchemaElement } from '../template-schema-element';
export class ButtonComponent extends TemplateSchemaElement {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super();
        this.elementRef = elementRef;
        this.label = '';
        this.click = new EventEmitter();
    }
    /**
     * @return {?}
     */
    setLabelFromContent() {
        /** @type {?} */
        const textContent = this.getTextContent(this.elementRef);
        // label as @Input takes priority over content text
        if (textContent && !this.label) {
            this.label = textContent;
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.setLabelFromContent();
    }
}
ButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'sf-button',
                template: "<ng-content></ng-content>\n",
                providers: [
                    {
                        provide: TemplateSchemaElement,
                        useExisting: forwardRef(() => ButtonComponent),
                    }
                ]
            }] }
];
/** @nocollapse */
ButtonComponent.ctorParameters = () => [
    { type: ElementRef }
];
ButtonComponent.propDecorators = {
    id: [{ type: Input }],
    label: [{ type: Input }],
    widget: [{ type: Input }],
    click: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi90ZW1wbGF0ZS1zY2hlbWEvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDWCxNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQWFuRSxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxxQkFBcUI7Ozs7SUFjeEQsWUFBb0IsVUFBc0I7UUFDeEMsS0FBSyxFQUFFLENBQUM7UUFEVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBUjFDLFVBQUssR0FBRyxFQUFFLENBQUM7UUFNWCxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUloQyxDQUFDOzs7O0lBRU8sbUJBQW1COztjQUNuQixXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBRXhELG1EQUFtRDtRQUNuRCxJQUFJLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7U0FDMUI7SUFFSCxDQUFDOzs7O0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7OztZQXhDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLHVDQUFzQztnQkFDdEMsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSxxQkFBcUI7d0JBQzlCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDO3FCQUMvQztpQkFDRjthQUNGOzs7O1lBbEJDLFVBQVU7OztpQkFxQlQsS0FBSztvQkFHTCxLQUFLO3FCQUdMLEtBQUs7b0JBR0wsTUFBTTs7OztJQVRQLDZCQUNXOztJQUVYLGdDQUNXOztJQUVYLGlDQUN3Qjs7SUFFeEIsZ0NBQ2dDOztJQUVwQixxQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgVGVtcGxhdGVTY2hlbWFFbGVtZW50IH0gZnJvbSAnLi4vdGVtcGxhdGUtc2NoZW1hLWVsZW1lbnQnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBUZW1wbGF0ZVNjaGVtYUVsZW1lbnQsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBCdXR0b25Db21wb25lbnQpLFxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25Db21wb25lbnQgZXh0ZW5kcyBUZW1wbGF0ZVNjaGVtYUVsZW1lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcblxuICBASW5wdXQoKVxuICBpZDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGxhYmVsID0gJyc7XG5cbiAgQElucHV0KClcbiAgd2lkZ2V0OiBzdHJpbmcgfCBvYmplY3Q7XG5cbiAgQE91dHB1dCgpXG4gIGNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0TGFiZWxGcm9tQ29udGVudCgpIHtcbiAgICBjb25zdCB0ZXh0Q29udGVudCA9IHRoaXMuZ2V0VGV4dENvbnRlbnQodGhpcy5lbGVtZW50UmVmKTtcblxuICAgIC8vIGxhYmVsIGFzIEBJbnB1dCB0YWtlcyBwcmlvcml0eSBvdmVyIGNvbnRlbnQgdGV4dFxuICAgIGlmICh0ZXh0Q29udGVudCAmJiAhdGhpcy5sYWJlbCkge1xuICAgICAgdGhpcy5sYWJlbCA9IHRleHRDb250ZW50O1xuICAgIH1cblxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuc2V0TGFiZWxGcm9tQ29udGVudCgpO1xuICB9XG5cbn1cbiJdfQ==