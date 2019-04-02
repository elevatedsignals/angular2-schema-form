/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { TemplateSchemaElement } from '../template-schema-element';
import { FieldType } from './field';
/**
 * @abstract
 */
var /**
 * @abstract
 */
FieldParent = /** @class */ (function (_super) {
    tslib_1.__extends(FieldParent, _super);
    function FieldParent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = '';
        return _this;
    }
    Object.defineProperty(FieldParent.prototype, "path", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.name) {
                return '';
            }
            return '/' + this.name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FieldParent.prototype.getButtons = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.childButtons.map(function (button, index) {
            if (!button.id) {
                /** @type {?} */
                var randomString = Math.random().toString(16).substr(2, 8);
                // generate id for button
                button.id = _this.name + randomString + '_' + (index + 1);
            }
            // register as button action the EventEmitter click
            _this.actionRegistry.register(button.id, button.click.emit.bind(button.click));
            /** @type {?} */
            var _button = (/** @type {?} */ ({
                id: button.id,
                label: button.label,
            }));
            if (button.widget) {
                _button.widget = button.widget;
            }
            return _button;
        });
    };
    /**
     * @param {?} fields
     * @return {?}
     */
    FieldParent.prototype.getFieldsValidators = /**
     * @param {?} fields
     * @return {?}
     */
    function (fields) {
        return fields.reduce(function (validators, field) {
            return validators.concat(field.getValidators());
        }, []);
    };
    /**
     * @param {?} fields
     * @return {?}
     */
    FieldParent.prototype.getFieldsSchema = /**
     * @param {?} fields
     * @return {?}
     */
    function (fields) {
        var _this = this;
        return fields.reduce(function (schema, field) {
            switch (_this.type) {
                case FieldType.Array:
                    schema.items = field.getSchema();
                    break;
                default:
                    if (!schema.properties) {
                        schema.properties = {};
                    }
                    schema.properties[field.name] = field.getSchema();
                    break;
            }
            /** @type {?} */
            var buttons = field.getButtons();
            if (buttons.length > 0) {
                schema.buttons = buttons;
            }
            if (!field.required) {
                return schema;
            }
            if (!schema.required) {
                schema.required = [];
            }
            schema.required.push(field.name);
            return schema;
        }, {});
    };
    return FieldParent;
}(TemplateSchemaElement));
/**
 * @abstract
 */
export { FieldParent };
if (false) {
    /** @type {?} */
    FieldParent.prototype.name;
    /** @type {?} */
    FieldParent.prototype.type;
    /** @type {?} */
    FieldParent.prototype.actionRegistry;
    /** @type {?} */
    FieldParent.prototype.childButtons;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtcGFyZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3RlbXBsYXRlLXNjaGVtYS9maWVsZC9maWVsZC1wYXJlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFLQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVuRSxPQUFPLEVBQVMsU0FBUyxFQUFFLE1BQU0sU0FBUyxDQUFDOzs7O0FBRTNDOzs7O0lBQTBDLHVDQUFxQjtJQUEvRDtRQUFBLHFFQTJGQztRQXpGQyxVQUFJLEdBQUcsRUFBRSxDQUFDOztJQXlGWixDQUFDO0lBdEZDLHNCQUFJLDZCQUFJOzs7O1FBQVI7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNYO1lBRUQsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN6QixDQUFDOzs7T0FBQTs7OztJQU1ELGdDQUFVOzs7SUFBVjtRQUFBLGlCQTRCQztRQTFCQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBTSxFQUFFLEtBQUs7WUFFekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7O29CQUNSLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM1RCx5QkFBeUI7Z0JBQ3pCLE1BQU0sQ0FBQyxFQUFFLEdBQUcsS0FBSSxDQUFDLElBQUksR0FBRyxZQUFZLEdBQUcsR0FBRyxHQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzNEO1lBRUQsbURBQW1EO1lBQ25ELEtBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUMxQixNQUFNLENBQUMsRUFBRSxFQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQ3JDLENBQUM7O2dCQUVJLE9BQU8sR0FBRyxtQkFBSztnQkFDbkIsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUNiLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSzthQUNwQixFQUFBO1lBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNqQixPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7YUFDaEM7WUFFRCxPQUFPLE9BQU8sQ0FBQztRQUVqQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRVMseUNBQW1COzs7O0lBQTdCLFVBQ0UsTUFBZTtRQUdmLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLFVBQVUsRUFBRSxLQUFLO1lBQ3JDLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUNsRCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFVCxDQUFDOzs7OztJQUVTLHFDQUFlOzs7O0lBQXpCLFVBQTBCLE1BQWU7UUFBekMsaUJBZ0NDO1FBL0JDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLE1BQVcsRUFBRSxLQUFLO1lBRXRDLFFBQVEsS0FBSSxDQUFDLElBQUksRUFBRTtnQkFDakIsS0FBSyxTQUFTLENBQUMsS0FBSztvQkFDbEIsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ2pDLE1BQU07Z0JBRVI7b0JBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7d0JBQ3RCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO3FCQUN4QjtvQkFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ2xELE1BQU07YUFDVDs7Z0JBRUssT0FBTyxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUU7WUFDbEMsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDdEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7YUFDMUI7WUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDbkIsT0FBTyxNQUFNLENBQUM7YUFDZjtZQUVELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUNwQixNQUFNLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQzthQUN0QjtZQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDO0lBRUgsa0JBQUM7QUFBRCxDQUFDLEFBM0ZELENBQTBDLHFCQUFxQixHQTJGOUQ7Ozs7Ozs7SUF6RkMsMkJBQVU7O0lBQ1YsMkJBQWdCOztJQVVoQixxQ0FBa0Q7O0lBQ2xELG1DQUE0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi9tb2RlbC92YWxpZGF0b3InO1xuaW1wb3J0IHsgQWN0aW9uUmVnaXN0cnkgfSBmcm9tICcuLi8uLi9tb2RlbC9hY3Rpb25yZWdpc3RyeSc7XG5pbXBvcnQgeyBCdXR0b25Db21wb25lbnQgfSBmcm9tICcuLi9idXR0b24vYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUZW1wbGF0ZVNjaGVtYUVsZW1lbnQgfSBmcm9tICcuLi90ZW1wbGF0ZS1zY2hlbWEtZWxlbWVudCc7XG5cbmltcG9ydCB7IEZpZWxkLCBGaWVsZFR5cGUgfSBmcm9tICcuL2ZpZWxkJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZpZWxkUGFyZW50IGV4dGVuZHMgVGVtcGxhdGVTY2hlbWFFbGVtZW50IHtcblxuICBuYW1lID0gJyc7XG4gIHR5cGU6IEZpZWxkVHlwZTtcblxuICBnZXQgcGF0aCgpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5uYW1lKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuICcvJyArIHRoaXMubmFtZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhY3Rpb25SZWdpc3RyeTogQWN0aW9uUmVnaXN0cnk7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjaGlsZEJ1dHRvbnM6IFF1ZXJ5TGlzdDxCdXR0b25Db21wb25lbnQ+O1xuXG5cbiAgZ2V0QnV0dG9ucygpOiB7IGlkOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIHdpZGdldD86IHN0cmluZyB8IG9iamVjdCB9W10ge1xuXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRCdXR0b25zLm1hcCgoYnV0dG9uLCBpbmRleCkgPT4ge1xuXG4gICAgICBpZiAoIWJ1dHRvbi5pZCkge1xuICAgICAgICBjb25zdCByYW5kb21TdHJpbmcgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE2KS5zdWJzdHIoMiwgOCk7XG4gICAgICAgIC8vIGdlbmVyYXRlIGlkIGZvciBidXR0b25cbiAgICAgICAgYnV0dG9uLmlkID0gdGhpcy5uYW1lICsgcmFuZG9tU3RyaW5nICsgJ18nICArIChpbmRleCArIDEpO1xuICAgICAgfVxuXG4gICAgICAvLyByZWdpc3RlciBhcyBidXR0b24gYWN0aW9uIHRoZSBFdmVudEVtaXR0ZXIgY2xpY2tcbiAgICAgIHRoaXMuYWN0aW9uUmVnaXN0cnkucmVnaXN0ZXIoXG4gICAgICAgIGJ1dHRvbi5pZCxcbiAgICAgICAgYnV0dG9uLmNsaWNrLmVtaXQuYmluZChidXR0b24uY2xpY2spXG4gICAgICApO1xuXG4gICAgICBjb25zdCBfYnV0dG9uID0gPGFueT57XG4gICAgICAgIGlkOiBidXR0b24uaWQsXG4gICAgICAgIGxhYmVsOiBidXR0b24ubGFiZWwsXG4gICAgICB9O1xuXG4gICAgICBpZiAoYnV0dG9uLndpZGdldCkge1xuICAgICAgICBfYnV0dG9uLndpZGdldCA9IGJ1dHRvbi53aWRnZXQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfYnV0dG9uO1xuXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RmllbGRzVmFsaWRhdG9ycyhcbiAgICBmaWVsZHM6IEZpZWxkW11cbiAgKTogeyBwYXRoOiBzdHJpbmcsIHZhbGlkYXRvcjogVmFsaWRhdG9yIH1bXSB7XG5cbiAgICByZXR1cm4gZmllbGRzLnJlZHVjZSgodmFsaWRhdG9ycywgZmllbGQpID0+IHtcbiAgICAgIHJldHVybiB2YWxpZGF0b3JzLmNvbmNhdChmaWVsZC5nZXRWYWxpZGF0b3JzKCkpO1xuICAgIH0sIFtdKTtcblxuICB9XG5cbiAgcHJvdGVjdGVkIGdldEZpZWxkc1NjaGVtYShmaWVsZHM6IEZpZWxkW10pIHtcbiAgICByZXR1cm4gZmllbGRzLnJlZHVjZSgoc2NoZW1hOiBhbnksIGZpZWxkKSA9PiB7XG5cbiAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgIGNhc2UgRmllbGRUeXBlLkFycmF5OlxuICAgICAgICAgIHNjaGVtYS5pdGVtcyA9IGZpZWxkLmdldFNjaGVtYSgpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgaWYgKCFzY2hlbWEucHJvcGVydGllcykge1xuICAgICAgICAgICAgc2NoZW1hLnByb3BlcnRpZXMgPSB7fTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzY2hlbWEucHJvcGVydGllc1tmaWVsZC5uYW1lXSA9IGZpZWxkLmdldFNjaGVtYSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBidXR0b25zID0gZmllbGQuZ2V0QnV0dG9ucygpO1xuICAgICAgaWYgKGJ1dHRvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBzY2hlbWEuYnV0dG9ucyA9IGJ1dHRvbnM7XG4gICAgICB9XG5cbiAgICAgIGlmICghZmllbGQucmVxdWlyZWQpIHtcbiAgICAgICAgcmV0dXJuIHNjaGVtYTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzY2hlbWEucmVxdWlyZWQpIHtcbiAgICAgICAgc2NoZW1hLnJlcXVpcmVkID0gW107XG4gICAgICB9XG4gICAgICBzY2hlbWEucmVxdWlyZWQucHVzaChmaWVsZC5uYW1lKTtcbiAgICAgIHJldHVybiBzY2hlbWE7XG4gICAgfSwge30pO1xuICB9XG5cbn1cbiJdfQ==