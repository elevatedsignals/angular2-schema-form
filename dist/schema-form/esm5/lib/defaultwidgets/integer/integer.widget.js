/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, } from '@angular/core';
import { ControlWidget } from '../../widget';
var IntegerWidget = /** @class */ (function (_super) {
    tslib_1.__extends(IntegerWidget, _super);
    function IntegerWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IntegerWidget.decorators = [
        { type: Component, args: [{
                    selector: 'sf-integer-widget',
                    template: "<div class=\"widget form-group\">\n\t<label [attr.for]=\"id\" class=\"horizontal control-label\">\n\t\t{{ schema.title }}\n\t</label>\n  <span *ngIf=\"schema.description\" class=\"formHelp\">{{schema.description}}</span>\n\t<input [attr.readonly]=\"schema.readOnly?true:null\" [name]=\"name\"\n\tclass=\"text-widget integer-widget form-control\" [formControl]=\"control\"\n\t[attr.type]=\"'number'\" [attr.min]=\"schema.minimum\" [attr.max]=\"schema.maximum\"\n\t[attr.placeholder]=\"schema.placeholder\"\n\t[attr.maxLength]=\"schema.maxLength || null\"\n  [attr.minLength]=\"schema.minLength || null\">\n</div>"
                }] }
    ];
    return IntegerWidget;
}(ControlWidget));
export { IntegerWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdlci53aWRnZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJsaWIvZGVmYXVsdHdpZGdldHMvaW50ZWdlci9pbnRlZ2VyLndpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUU3QztJQWVtQyx5Q0FBYTtJQWZoRDs7SUFla0QsQ0FBQzs7Z0JBZmxELFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUscW1CQVdMO2lCQUNOOztJQUNpRCxvQkFBQztDQUFBLEFBZm5ELENBZW1DLGFBQWEsR0FBRztTQUF0QyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29udHJvbFdpZGdldCB9IGZyb20gJy4uLy4uL3dpZGdldCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWludGVnZXItd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwid2lkZ2V0IGZvcm0tZ3JvdXBcIj5cblx0PGxhYmVsIFthdHRyLmZvcl09XCJpZFwiIGNsYXNzPVwiaG9yaXpvbnRhbCBjb250cm9sLWxhYmVsXCI+XG5cdFx0e3sgc2NoZW1hLnRpdGxlIH19XG5cdDwvbGFiZWw+XG4gIDxzcGFuICpuZ0lmPVwic2NoZW1hLmRlc2NyaXB0aW9uXCIgY2xhc3M9XCJmb3JtSGVscFwiPnt7c2NoZW1hLmRlc2NyaXB0aW9ufX08L3NwYW4+XG5cdDxpbnB1dCBbYXR0ci5yZWFkb25seV09XCJzY2hlbWEucmVhZE9ubHk/dHJ1ZTpudWxsXCIgW25hbWVdPVwibmFtZVwiXG5cdGNsYXNzPVwidGV4dC13aWRnZXQgaW50ZWdlci13aWRnZXQgZm9ybS1jb250cm9sXCIgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIlxuXHRbYXR0ci50eXBlXT1cIidudW1iZXInXCIgW2F0dHIubWluXT1cInNjaGVtYS5taW5pbXVtXCIgW2F0dHIubWF4XT1cInNjaGVtYS5tYXhpbXVtXCJcblx0W2F0dHIucGxhY2Vob2xkZXJdPVwic2NoZW1hLnBsYWNlaG9sZGVyXCJcblx0W2F0dHIubWF4TGVuZ3RoXT1cInNjaGVtYS5tYXhMZW5ndGggfHwgbnVsbFwiXG4gIFthdHRyLm1pbkxlbmd0aF09XCJzY2hlbWEubWluTGVuZ3RoIHx8IG51bGxcIj5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgSW50ZWdlcldpZGdldCBleHRlbmRzIENvbnRyb2xXaWRnZXQge31cbiJdfQ==