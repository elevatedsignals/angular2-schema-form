/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { PropertyGroup } from './formproperty';
var ArrayProperty = /** @class */ (function (_super) {
    tslib_1.__extends(ArrayProperty, _super);
    function ArrayProperty(formPropertyFactory, schemaValidatorFactory, validatorRegistry, schema, parent, path) {
        var _this = _super.call(this, schemaValidatorFactory, validatorRegistry, schema, parent, path) || this;
        _this.formPropertyFactory = formPropertyFactory;
        return _this;
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    ArrayProperty.prototype.addItem = /**
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        if (value === void 0) { value = null; }
        /** @type {?} */
        var newProperty = this.addProperty();
        newProperty.reset(value, false);
        return newProperty;
    };
    /**
     * @return {?}
     */
    ArrayProperty.prototype.addProperty = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var newProperty = this.formPropertyFactory.createProperty(this.schema.items, this);
        ((/** @type {?} */ (this.properties))).push(newProperty);
        return newProperty;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ArrayProperty.prototype.removeItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.properties = ((/** @type {?} */ (this.properties))).filter(function (i) { return i !== item; });
        this.updateValueAndValidity(false, true);
    };
    /**
     * @param {?} value
     * @param {?} onlySelf
     * @return {?}
     */
    ArrayProperty.prototype.setValue = /**
     * @param {?} value
     * @param {?} onlySelf
     * @return {?}
     */
    function (value, onlySelf) {
        this.createProperties();
        this.resetProperties(value);
        this.updateValueAndValidity(onlySelf, true);
    };
    /**
     * @return {?}
     */
    ArrayProperty.prototype._hasValue = /**
     * @return {?}
     */
    function () {
        return true;
    };
    /**
     * @return {?}
     */
    ArrayProperty.prototype._updateValue = /**
     * @return {?}
     */
    function () {
        this.reduceValue();
    };
    /**
     * @return {?}
     */
    ArrayProperty.prototype.reduceValue = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var value = [];
        this.forEachChild(function (property, _) {
            if (property.visible && property._hasValue()) {
                value.push(property.value);
            }
        });
        this._value = value;
    };
    /**
     * @param {?} value
     * @param {?=} onlySelf
     * @return {?}
     */
    ArrayProperty.prototype.reset = /**
     * @param {?} value
     * @param {?=} onlySelf
     * @return {?}
     */
    function (value, onlySelf) {
        if (onlySelf === void 0) { onlySelf = true; }
        value = value || this.schema.default || [];
        this.properties = [];
        this.resetProperties(value);
        this.updateValueAndValidity(onlySelf, true);
    };
    /**
     * @return {?}
     */
    ArrayProperty.prototype.createProperties = /**
     * @return {?}
     */
    function () {
        this.properties = [];
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ArrayProperty.prototype.resetProperties = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        for (var idx in value) {
            if (value.hasOwnProperty(idx)) {
                /** @type {?} */
                var property = this.addProperty();
                property.reset(value[idx], true);
            }
        }
    };
    return ArrayProperty;
}(PropertyGroup));
export { ArrayProperty };
if (false) {
    /** @type {?} */
    ArrayProperty.prototype.formPropertyFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlwcm9wZXJ0eS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbC9hcnJheXByb3BlcnR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFlLGFBQWEsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBSzNEO0lBQW1DLHlDQUFhO0lBRTlDLHVCQUFvQixtQkFBd0MsRUFDaEQsc0JBQThDLEVBQzlDLGlCQUFvQyxFQUNwQyxNQUFXLEVBQ1gsTUFBcUIsRUFDckIsSUFBWTtRQUx4QixZQU1FLGtCQUFNLHNCQUFzQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQ3ZFO1FBUG1CLHlCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7O0lBTzVELENBQUM7Ozs7O0lBRUQsK0JBQU87Ozs7SUFBUCxVQUFRLEtBQWlCO1FBQWpCLHNCQUFBLEVBQUEsWUFBaUI7O1lBQ25CLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ3BDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7Ozs7SUFFTyxtQ0FBVzs7O0lBQW5COztZQUNNLFdBQVcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztRQUNsRixDQUFDLG1CQUFnQixJQUFJLENBQUMsVUFBVSxFQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEQsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFFRCxrQ0FBVTs7OztJQUFWLFVBQVcsSUFBa0I7UUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLG1CQUFnQixJQUFJLENBQUMsVUFBVSxFQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEtBQUssSUFBSSxFQUFWLENBQVUsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7O0lBRUQsZ0NBQVE7Ozs7O0lBQVIsVUFBUyxLQUFVLEVBQUUsUUFBaUI7UUFDcEMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7Ozs7SUFFTSxpQ0FBUzs7O0lBQWhCO1FBQ0UsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7O0lBRU0sb0NBQVk7OztJQUFuQjtRQUNFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7O0lBRU8sbUNBQVc7OztJQUFuQjs7WUFDUSxLQUFLLEdBQUcsRUFBRTtRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQUMsUUFBUSxFQUFFLENBQUM7WUFDNUIsSUFBSSxRQUFRLENBQUMsT0FBTyxJQUFJLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDNUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7Ozs7OztJQUVELDZCQUFLOzs7OztJQUFMLFVBQU0sS0FBVSxFQUFFLFFBQWU7UUFBZix5QkFBQSxFQUFBLGVBQWU7UUFDL0IsS0FBSyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7Ozs7SUFFTyx3Q0FBZ0I7OztJQUF4QjtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBR08sdUNBQWU7Ozs7SUFBdkIsVUFBd0IsS0FBVTtRQUNoQyxLQUFLLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRTtZQUNyQixJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7O29CQUN6QixRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDakMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDbEM7U0FDRjtJQUNILENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUF4RUQsQ0FBbUMsYUFBYSxHQXdFL0M7Ozs7SUF0RWEsNENBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtGb3JtUHJvcGVydHksIFByb3BlcnR5R3JvdXB9IGZyb20gJy4vZm9ybXByb3BlcnR5JztcbmltcG9ydCB7Rm9ybVByb3BlcnR5RmFjdG9yeX0gZnJvbSAnLi9mb3JtcHJvcGVydHlmYWN0b3J5JztcbmltcG9ydCB7U2NoZW1hVmFsaWRhdG9yRmFjdG9yeX0gZnJvbSAnLi4vc2NoZW1hdmFsaWRhdG9yZmFjdG9yeSc7XG5pbXBvcnQge1ZhbGlkYXRvclJlZ2lzdHJ5fSBmcm9tICcuL3ZhbGlkYXRvcnJlZ2lzdHJ5JztcblxuZXhwb3J0IGNsYXNzIEFycmF5UHJvcGVydHkgZXh0ZW5kcyBQcm9wZXJ0eUdyb3VwIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvcm1Qcm9wZXJ0eUZhY3Rvcnk6IEZvcm1Qcm9wZXJ0eUZhY3RvcnksXG4gICAgICAgICAgICAgIHNjaGVtYVZhbGlkYXRvckZhY3Rvcnk6IFNjaGVtYVZhbGlkYXRvckZhY3RvcnksXG4gICAgICAgICAgICAgIHZhbGlkYXRvclJlZ2lzdHJ5OiBWYWxpZGF0b3JSZWdpc3RyeSxcbiAgICAgICAgICAgICAgc2NoZW1hOiBhbnksXG4gICAgICAgICAgICAgIHBhcmVudDogUHJvcGVydHlHcm91cCxcbiAgICAgICAgICAgICAgcGF0aDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NoZW1hVmFsaWRhdG9yRmFjdG9yeSwgdmFsaWRhdG9yUmVnaXN0cnksIHNjaGVtYSwgcGFyZW50LCBwYXRoKTtcbiAgfVxuXG4gIGFkZEl0ZW0odmFsdWU6IGFueSA9IG51bGwpOiBGb3JtUHJvcGVydHkge1xuICAgIGxldCBuZXdQcm9wZXJ0eSA9IHRoaXMuYWRkUHJvcGVydHkoKTtcbiAgICBuZXdQcm9wZXJ0eS5yZXNldCh2YWx1ZSwgZmFsc2UpO1xuICAgIHJldHVybiBuZXdQcm9wZXJ0eTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkUHJvcGVydHkoKSB7XG4gICAgbGV0IG5ld1Byb3BlcnR5ID0gdGhpcy5mb3JtUHJvcGVydHlGYWN0b3J5LmNyZWF0ZVByb3BlcnR5KHRoaXMuc2NoZW1hLml0ZW1zLCB0aGlzKTtcbiAgICAoPEZvcm1Qcm9wZXJ0eVtdPnRoaXMucHJvcGVydGllcykucHVzaChuZXdQcm9wZXJ0eSk7XG4gICAgcmV0dXJuIG5ld1Byb3BlcnR5O1xuICB9XG5cbiAgcmVtb3ZlSXRlbShpdGVtOiBGb3JtUHJvcGVydHkpIHtcbiAgICB0aGlzLnByb3BlcnRpZXMgPSAoPEZvcm1Qcm9wZXJ0eVtdPnRoaXMucHJvcGVydGllcykuZmlsdGVyKGkgPT4gaSAhPT0gaXRlbSk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KGZhbHNlLCB0cnVlKTtcbiAgfVxuXG4gIHNldFZhbHVlKHZhbHVlOiBhbnksIG9ubHlTZWxmOiBib29sZWFuKSB7XG4gICAgdGhpcy5jcmVhdGVQcm9wZXJ0aWVzKCk7XG4gICAgdGhpcy5yZXNldFByb3BlcnRpZXModmFsdWUpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShvbmx5U2VsZiwgdHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgX2hhc1ZhbHVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIF91cGRhdGVWYWx1ZSgpIHtcbiAgICB0aGlzLnJlZHVjZVZhbHVlKCk7XG4gIH1cblxuICBwcml2YXRlIHJlZHVjZVZhbHVlKCk6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlID0gW107XG4gICAgdGhpcy5mb3JFYWNoQ2hpbGQoKHByb3BlcnR5LCBfKSA9PiB7XG4gICAgICBpZiAocHJvcGVydHkudmlzaWJsZSAmJiBwcm9wZXJ0eS5faGFzVmFsdWUoKSkge1xuICAgICAgICB2YWx1ZS5wdXNoKHByb3BlcnR5LnZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcmVzZXQodmFsdWU6IGFueSwgb25seVNlbGYgPSB0cnVlKSB7XG4gICAgdmFsdWUgPSB2YWx1ZSB8fCB0aGlzLnNjaGVtYS5kZWZhdWx0IHx8IFtdO1xuICAgIHRoaXMucHJvcGVydGllcyA9IFtdO1xuICAgIHRoaXMucmVzZXRQcm9wZXJ0aWVzKHZhbHVlKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkob25seVNlbGYsIHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVQcm9wZXJ0aWVzKCkge1xuICAgIHRoaXMucHJvcGVydGllcyA9IFtdO1xuICB9XG5cblxuICBwcml2YXRlIHJlc2V0UHJvcGVydGllcyh2YWx1ZTogYW55KSB7XG4gICAgZm9yIChsZXQgaWR4IGluIHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUuaGFzT3duUHJvcGVydHkoaWR4KSkge1xuICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLmFkZFByb3BlcnR5KCk7XG4gICAgICAgIHByb3BlcnR5LnJlc2V0KHZhbHVlW2lkeF0sIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19