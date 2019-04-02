/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { PropertyGroup } from './formproperty';
var ObjectProperty = /** @class */ (function (_super) {
    tslib_1.__extends(ObjectProperty, _super);
    function ObjectProperty(formPropertyFactory, schemaValidatorFactory, validatorRegistry, schema, parent, path) {
        var _this = _super.call(this, schemaValidatorFactory, validatorRegistry, schema, parent, path) || this;
        _this.formPropertyFactory = formPropertyFactory;
        _this.propertiesId = [];
        _this.createProperties();
        return _this;
    }
    /**
     * @param {?} value
     * @param {?} onlySelf
     * @return {?}
     */
    ObjectProperty.prototype.setValue = /**
     * @param {?} value
     * @param {?} onlySelf
     * @return {?}
     */
    function (value, onlySelf) {
        for (var propertyId in value) {
            if (value.hasOwnProperty(propertyId)) {
                this.properties[propertyId].setValue(value[propertyId], true);
            }
        }
        this.updateValueAndValidity(onlySelf, true);
    };
    /**
     * @param {?} value
     * @param {?=} onlySelf
     * @return {?}
     */
    ObjectProperty.prototype.reset = /**
     * @param {?} value
     * @param {?=} onlySelf
     * @return {?}
     */
    function (value, onlySelf) {
        if (onlySelf === void 0) { onlySelf = true; }
        value = value || this.schema.default || {};
        this.resetProperties(value);
        this.updateValueAndValidity(onlySelf, true);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ObjectProperty.prototype.resetProperties = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        for (var propertyId in this.schema.properties) {
            if (this.schema.properties.hasOwnProperty(propertyId)) {
                this.properties[propertyId].reset(value[propertyId], true);
            }
        }
    };
    /**
     * @return {?}
     */
    ObjectProperty.prototype.createProperties = /**
     * @return {?}
     */
    function () {
        this.properties = {};
        this.propertiesId = [];
        for (var propertyId in this.schema.properties) {
            if (this.schema.properties.hasOwnProperty(propertyId)) {
                /** @type {?} */
                var propertySchema = this.schema.properties[propertyId];
                this.properties[propertyId] = this.formPropertyFactory.createProperty(propertySchema, this, propertyId);
                this.propertiesId.push(propertyId);
            }
        }
    };
    /**
     * @return {?}
     */
    ObjectProperty.prototype._hasValue = /**
     * @return {?}
     */
    function () {
        return !!Object.keys(this.value).length;
    };
    /**
     * @return {?}
     */
    ObjectProperty.prototype._updateValue = /**
     * @return {?}
     */
    function () {
        this.reduceValue();
    };
    /**
     * @return {?}
     */
    ObjectProperty.prototype._runValidation = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype._runValidation.call(this);
        if (this._errors) {
            this._errors.forEach(function (error) {
                /** @type {?} */
                var prop = _this.searchProperty(error.path.slice(1));
                if (prop) {
                    prop.extendErrors(error);
                }
            });
        }
    };
    /**
     * @return {?}
     */
    ObjectProperty.prototype.reduceValue = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var value = {};
        this.forEachChild(function (property, propertyId) {
            if (property.visible && property._hasValue()) {
                value[propertyId] = property.value;
            }
        });
        this._value = value;
    };
    return ObjectProperty;
}(PropertyGroup));
export { ObjectProperty };
if (false) {
    /** @type {?} */
    ObjectProperty.prototype.propertiesId;
    /** @type {?} */
    ObjectProperty.prototype.formPropertyFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0cHJvcGVydHkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJsaWIvbW9kZWwvb2JqZWN0cHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFLN0M7SUFBb0MsMENBQWE7SUFJL0Msd0JBQW9CLG1CQUF3QyxFQUNoRCxzQkFBOEMsRUFDOUMsaUJBQW9DLEVBQ3BDLE1BQVcsRUFDWCxNQUFxQixFQUNyQixJQUFZO1FBTHhCLFlBTUUsa0JBQU0sc0JBQXNCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FFdkU7UUFSbUIseUJBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUZwRCxrQkFBWSxHQUFhLEVBQUUsQ0FBQztRQVNsQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzs7SUFDMUIsQ0FBQzs7Ozs7O0lBRUQsaUNBQVE7Ozs7O0lBQVIsVUFBUyxLQUFVLEVBQUUsUUFBaUI7UUFDcEMsS0FBSyxJQUFNLFVBQVUsSUFBSSxLQUFLLEVBQUU7WUFDOUIsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDL0Q7U0FDRjtRQUNELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7Ozs7O0lBRUQsOEJBQUs7Ozs7O0lBQUwsVUFBTSxLQUFVLEVBQUUsUUFBZTtRQUFmLHlCQUFBLEVBQUEsZUFBZTtRQUMvQixLQUFLLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7Ozs7SUFFRCx3Q0FBZTs7OztJQUFmLFVBQWdCLEtBQVU7UUFDeEIsS0FBSyxJQUFNLFVBQVUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUMvQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzVEO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRUQseUNBQWdCOzs7SUFBaEI7UUFDRSxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixLQUFLLElBQU0sVUFBVSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQy9DLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFOztvQkFDL0MsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztnQkFDekQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ3hHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3BDO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRU0sa0NBQVM7OztJQUFoQjtRQUNFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUMxQyxDQUFDOzs7O0lBRU0scUNBQVk7OztJQUFuQjtRQUNFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7O0lBRU0sdUNBQWM7OztJQUFyQjtRQUFBLGlCQVdDO1FBVkMsaUJBQU0sY0FBYyxXQUFFLENBQUM7UUFFdkIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSzs7b0JBQ2xCLElBQUksR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxJQUFJLElBQUksRUFBRTtvQkFDUixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMxQjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7O0lBRU8sb0NBQVc7OztJQUFuQjs7WUFDUSxLQUFLLEdBQUcsRUFBRTtRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQUMsUUFBUSxFQUFFLFVBQWtCO1lBQzdDLElBQUksUUFBUSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQzVDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO2FBQ3BDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBL0VELENBQW9DLGFBQWEsR0ErRWhEOzs7O0lBN0VDLHNDQUFvQzs7SUFFeEIsNkNBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQcm9wZXJ0eUdyb3VwfSBmcm9tICcuL2Zvcm1wcm9wZXJ0eSc7XG5pbXBvcnQge0Zvcm1Qcm9wZXJ0eUZhY3Rvcnl9IGZyb20gJy4vZm9ybXByb3BlcnR5ZmFjdG9yeSc7XG5pbXBvcnQge1NjaGVtYVZhbGlkYXRvckZhY3Rvcnl9IGZyb20gJy4uL3NjaGVtYXZhbGlkYXRvcmZhY3RvcnknO1xuaW1wb3J0IHtWYWxpZGF0b3JSZWdpc3RyeX0gZnJvbSAnLi92YWxpZGF0b3JyZWdpc3RyeSc7XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RQcm9wZXJ0eSBleHRlbmRzIFByb3BlcnR5R3JvdXAge1xuXG4gIHByaXZhdGUgcHJvcGVydGllc0lkOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybVByb3BlcnR5RmFjdG9yeTogRm9ybVByb3BlcnR5RmFjdG9yeSxcbiAgICAgICAgICAgICAgc2NoZW1hVmFsaWRhdG9yRmFjdG9yeTogU2NoZW1hVmFsaWRhdG9yRmFjdG9yeSxcbiAgICAgICAgICAgICAgdmFsaWRhdG9yUmVnaXN0cnk6IFZhbGlkYXRvclJlZ2lzdHJ5LFxuICAgICAgICAgICAgICBzY2hlbWE6IGFueSxcbiAgICAgICAgICAgICAgcGFyZW50OiBQcm9wZXJ0eUdyb3VwLFxuICAgICAgICAgICAgICBwYXRoOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCB2YWxpZGF0b3JSZWdpc3RyeSwgc2NoZW1hLCBwYXJlbnQsIHBhdGgpO1xuICAgIHRoaXMuY3JlYXRlUHJvcGVydGllcygpO1xuICB9XG5cbiAgc2V0VmFsdWUodmFsdWU6IGFueSwgb25seVNlbGY6IGJvb2xlYW4pIHtcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5SWQgaW4gdmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eUlkKSkge1xuICAgICAgICB0aGlzLnByb3BlcnRpZXNbcHJvcGVydHlJZF0uc2V0VmFsdWUodmFsdWVbcHJvcGVydHlJZF0sIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkob25seVNlbGYsIHRydWUpO1xuICB9XG5cbiAgcmVzZXQodmFsdWU6IGFueSwgb25seVNlbGYgPSB0cnVlKSB7XG4gICAgdmFsdWUgPSB2YWx1ZSB8fCB0aGlzLnNjaGVtYS5kZWZhdWx0IHx8IHt9O1xuICAgIHRoaXMucmVzZXRQcm9wZXJ0aWVzKHZhbHVlKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkob25seVNlbGYsIHRydWUpO1xuICB9XG5cbiAgcmVzZXRQcm9wZXJ0aWVzKHZhbHVlOiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5SWQgaW4gdGhpcy5zY2hlbWEucHJvcGVydGllcykge1xuICAgICAgaWYgKHRoaXMuc2NoZW1hLnByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHlJZCkpIHtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzW3Byb3BlcnR5SWRdLnJlc2V0KHZhbHVlW3Byb3BlcnR5SWRdLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjcmVhdGVQcm9wZXJ0aWVzKCkge1xuICAgIHRoaXMucHJvcGVydGllcyA9IHt9O1xuICAgIHRoaXMucHJvcGVydGllc0lkID0gW107XG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eUlkIGluIHRoaXMuc2NoZW1hLnByb3BlcnRpZXMpIHtcbiAgICAgIGlmICh0aGlzLnNjaGVtYS5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5SWQpKSB7XG4gICAgICAgIGNvbnN0IHByb3BlcnR5U2NoZW1hID0gdGhpcy5zY2hlbWEucHJvcGVydGllc1twcm9wZXJ0eUlkXTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzW3Byb3BlcnR5SWRdID0gdGhpcy5mb3JtUHJvcGVydHlGYWN0b3J5LmNyZWF0ZVByb3BlcnR5KHByb3BlcnR5U2NoZW1hLCB0aGlzLCBwcm9wZXJ0eUlkKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzSWQucHVzaChwcm9wZXJ0eUlkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgX2hhc1ZhbHVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIU9iamVjdC5rZXlzKHRoaXMudmFsdWUpLmxlbmd0aDtcbiAgfVxuXG4gIHB1YmxpYyBfdXBkYXRlVmFsdWUoKSB7XG4gICAgdGhpcy5yZWR1Y2VWYWx1ZSgpO1xuICB9XG5cbiAgcHVibGljIF9ydW5WYWxpZGF0aW9uKCkge1xuICAgIHN1cGVyLl9ydW5WYWxpZGF0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5fZXJyb3JzKSB7XG4gICAgICB0aGlzLl9lcnJvcnMuZm9yRWFjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnN0IHByb3AgPSB0aGlzLnNlYXJjaFByb3BlcnR5KGVycm9yLnBhdGguc2xpY2UoMSkpO1xuICAgICAgICBpZiAocHJvcCkge1xuICAgICAgICAgIHByb3AuZXh0ZW5kRXJyb3JzKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWR1Y2VWYWx1ZSgpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZSA9IHt9O1xuICAgIHRoaXMuZm9yRWFjaENoaWxkKChwcm9wZXJ0eSwgcHJvcGVydHlJZDogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAocHJvcGVydHkudmlzaWJsZSAmJiBwcm9wZXJ0eS5faGFzVmFsdWUoKSkge1xuICAgICAgICB2YWx1ZVtwcm9wZXJ0eUlkXSA9IHByb3BlcnR5LnZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gIH1cbn1cbiJdfQ==