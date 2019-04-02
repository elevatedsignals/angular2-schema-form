/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ArrayLayoutWidget } from '../../widget';
var ArrayWidget = /** @class */ (function (_super) {
    tslib_1.__extends(ArrayWidget, _super);
    function ArrayWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    ArrayWidget.prototype.addItem = /**
     * @return {?}
     */
    function () {
        this.formProperty.addItem();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ArrayWidget.prototype.removeItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.formProperty.removeItem(item);
    };
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    ArrayWidget.prototype.trackByIndex = /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    function (index, item) {
        return index;
    };
    ArrayWidget.decorators = [
        { type: Component, args: [{
                    selector: 'sf-array-widget',
                    template: "<div class=\"widget form-group\">\n\t<label [attr.for]=\"id\" class=\"horizontal control-label\">\n\t\t{{ schema.title }}\n\t</label>\n\t<span *ngIf=\"schema.description\" class=\"formHelp\">{{schema.description}}</span>\n\t<div *ngFor=\"let itemProperty of formProperty.properties\">\n\t\t<sf-form-element [formProperty]=\"itemProperty\"></sf-form-element>\n\t\t<button (click)=\"removeItem(itemProperty)\" class=\"btn btn-default array-remove-button\">\n\t\t\t<span class=\"glyphicon glyphicon-minus\" aria-hidden=\"true\"></span> Remove\n\t\t</button>\n\t</div>\n\t<button (click)=\"addItem()\" class=\"btn btn-default array-add-button\">\n\t\t<span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span> Add\n\t</button>\n</div>"
                }] }
    ];
    return ArrayWidget;
}(ArrayLayoutWidget));
export { ArrayWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkud2lkZ2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2RlZmF1bHR3aWRnZXRzL2FycmF5L2FycmF5LndpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBR2pEO0lBa0JpQyx1Q0FBaUI7SUFsQmxEOztJQStCQSxDQUFDOzs7O0lBWEMsNkJBQU87OztJQUFQO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7OztJQUVELGdDQUFVOzs7O0lBQVYsVUFBVyxJQUFrQjtRQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7Ozs7SUFFRCxrQ0FBWTs7Ozs7SUFBWixVQUFhLEtBQWEsRUFBRSxJQUFTO1FBQ25DLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Z0JBOUJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsdXVCQWNMO2lCQUNOOztJQWNELGtCQUFDO0NBQUEsQUEvQkQsQ0FrQmlDLGlCQUFpQixHQWFqRDtTQWJZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQXJyYXlMYXlvdXRXaWRnZXQgfSBmcm9tICcuLi8uLi93aWRnZXQnO1xuaW1wb3J0IHsgRm9ybVByb3BlcnR5IH0gZnJvbSAnLi4vLi4vbW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1hcnJheS13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3aWRnZXQgZm9ybS1ncm91cFwiPlxuXHQ8bGFiZWwgW2F0dHIuZm9yXT1cImlkXCIgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cblx0XHR7eyBzY2hlbWEudGl0bGUgfX1cblx0PC9sYWJlbD5cblx0PHNwYW4gKm5nSWY9XCJzY2hlbWEuZGVzY3JpcHRpb25cIiBjbGFzcz1cImZvcm1IZWxwXCI+e3tzY2hlbWEuZGVzY3JpcHRpb259fTwvc3Bhbj5cblx0PGRpdiAqbmdGb3I9XCJsZXQgaXRlbVByb3BlcnR5IG9mIGZvcm1Qcm9wZXJ0eS5wcm9wZXJ0aWVzXCI+XG5cdFx0PHNmLWZvcm0tZWxlbWVudCBbZm9ybVByb3BlcnR5XT1cIml0ZW1Qcm9wZXJ0eVwiPjwvc2YtZm9ybS1lbGVtZW50PlxuXHRcdDxidXR0b24gKGNsaWNrKT1cInJlbW92ZUl0ZW0oaXRlbVByb3BlcnR5KVwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGFycmF5LXJlbW92ZS1idXR0b25cIj5cblx0XHRcdDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1taW51c1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4gUmVtb3ZlXG5cdFx0PC9idXR0b24+XG5cdDwvZGl2PlxuXHQ8YnV0dG9uIChjbGljayk9XCJhZGRJdGVtKClcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBhcnJheS1hZGQtYnV0dG9uXCI+XG5cdFx0PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+IEFkZFxuXHQ8L2J1dHRvbj5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgQXJyYXlXaWRnZXQgZXh0ZW5kcyBBcnJheUxheW91dFdpZGdldCB7XG5cbiAgYWRkSXRlbSgpIHtcbiAgICB0aGlzLmZvcm1Qcm9wZXJ0eS5hZGRJdGVtKCk7XG4gIH1cblxuICByZW1vdmVJdGVtKGl0ZW06IEZvcm1Qcm9wZXJ0eSkge1xuICAgIHRoaXMuZm9ybVByb3BlcnR5LnJlbW92ZUl0ZW0oaXRlbSk7XG4gIH1cblxuICB0cmFja0J5SW5kZXgoaW5kZXg6IG51bWJlciwgaXRlbTogYW55KSB7XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG59XG4iXX0=