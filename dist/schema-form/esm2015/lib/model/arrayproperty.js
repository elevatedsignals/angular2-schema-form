/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { PropertyGroup } from './formproperty';
export class ArrayProperty extends PropertyGroup {
    /**
     * @param {?} formPropertyFactory
     * @param {?} schemaValidatorFactory
     * @param {?} validatorRegistry
     * @param {?} schema
     * @param {?} parent
     * @param {?} path
     */
    constructor(formPropertyFactory, schemaValidatorFactory, validatorRegistry, schema, parent, path) {
        super(schemaValidatorFactory, validatorRegistry, schema, parent, path);
        this.formPropertyFactory = formPropertyFactory;
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    addItem(value = null) {
        /** @type {?} */
        let newProperty = this.addProperty();
        newProperty.reset(value, false);
        return newProperty;
    }
    /**
     * @return {?}
     */
    addProperty() {
        /** @type {?} */
        let newProperty = this.formPropertyFactory.createProperty(this.schema.items, this);
        ((/** @type {?} */ (this.properties))).push(newProperty);
        return newProperty;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    removeItem(item) {
        this.properties = ((/** @type {?} */ (this.properties))).filter(i => i !== item);
        this.updateValueAndValidity(false, true);
    }
    /**
     * @param {?} value
     * @param {?} onlySelf
     * @return {?}
     */
    setValue(value, onlySelf) {
        this.createProperties();
        this.resetProperties(value);
        this.updateValueAndValidity(onlySelf, true);
    }
    /**
     * @return {?}
     */
    _hasValue() {
        return true;
    }
    /**
     * @return {?}
     */
    _updateValue() {
        this.reduceValue();
    }
    /**
     * @return {?}
     */
    reduceValue() {
        /** @type {?} */
        const value = [];
        this.forEachChild((property, _) => {
            if (property.visible && property._hasValue()) {
                value.push(property.value);
            }
        });
        this._value = value;
    }
    /**
     * @param {?} value
     * @param {?=} onlySelf
     * @return {?}
     */
    reset(value, onlySelf = true) {
        value = value || this.schema.default || [];
        this.properties = [];
        this.resetProperties(value);
        this.updateValueAndValidity(onlySelf, true);
    }
    /**
     * @return {?}
     */
    createProperties() {
        this.properties = [];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    resetProperties(value) {
        for (let idx in value) {
            if (value.hasOwnProperty(idx)) {
                /** @type {?} */
                let property = this.addProperty();
                property.reset(value[idx], true);
            }
        }
    }
}
if (false) {
    /** @type {?} */
    ArrayProperty.prototype.formPropertyFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlwcm9wZXJ0eS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbC9hcnJheXByb3BlcnR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWUsYUFBYSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFLM0QsTUFBTSxPQUFPLGFBQWMsU0FBUSxhQUFhOzs7Ozs7Ozs7SUFFOUMsWUFBb0IsbUJBQXdDLEVBQ2hELHNCQUE4QyxFQUM5QyxpQkFBb0MsRUFDcEMsTUFBVyxFQUNYLE1BQXFCLEVBQ3JCLElBQVk7UUFDdEIsS0FBSyxDQUFDLHNCQUFzQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFOckQsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtJQU81RCxDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxRQUFhLElBQUk7O1lBQ25CLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ3BDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7Ozs7SUFFTyxXQUFXOztZQUNiLFdBQVcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztRQUNsRixDQUFDLG1CQUFnQixJQUFJLENBQUMsVUFBVSxFQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEQsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsSUFBa0I7UUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLG1CQUFnQixJQUFJLENBQUMsVUFBVSxFQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7Ozs7SUFFRCxRQUFRLENBQUMsS0FBVSxFQUFFLFFBQWlCO1FBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7O0lBRU0sU0FBUztRQUNkLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7OztJQUVNLFlBQVk7UUFDakIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7SUFFTyxXQUFXOztjQUNYLEtBQUssR0FBRyxFQUFFO1FBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEMsSUFBSSxRQUFRLENBQUMsT0FBTyxJQUFJLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDNUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7Ozs7OztJQUVELEtBQUssQ0FBQyxLQUFVLEVBQUUsUUFBUSxHQUFHLElBQUk7UUFDL0IsS0FBSyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7Ozs7SUFFTyxnQkFBZ0I7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFHTyxlQUFlLENBQUMsS0FBVTtRQUNoQyxLQUFLLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRTtZQUNyQixJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7O29CQUN6QixRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDakMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDbEM7U0FDRjtJQUNILENBQUM7Q0FDRjs7O0lBdEVhLDRDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Rm9ybVByb3BlcnR5LCBQcm9wZXJ0eUdyb3VwfSBmcm9tICcuL2Zvcm1wcm9wZXJ0eSc7XG5pbXBvcnQge0Zvcm1Qcm9wZXJ0eUZhY3Rvcnl9IGZyb20gJy4vZm9ybXByb3BlcnR5ZmFjdG9yeSc7XG5pbXBvcnQge1NjaGVtYVZhbGlkYXRvckZhY3Rvcnl9IGZyb20gJy4uL3NjaGVtYXZhbGlkYXRvcmZhY3RvcnknO1xuaW1wb3J0IHtWYWxpZGF0b3JSZWdpc3RyeX0gZnJvbSAnLi92YWxpZGF0b3JyZWdpc3RyeSc7XG5cbmV4cG9ydCBjbGFzcyBBcnJheVByb3BlcnR5IGV4dGVuZHMgUHJvcGVydHlHcm91cCB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtUHJvcGVydHlGYWN0b3J5OiBGb3JtUHJvcGVydHlGYWN0b3J5LFxuICAgICAgICAgICAgICBzY2hlbWFWYWxpZGF0b3JGYWN0b3J5OiBTY2hlbWFWYWxpZGF0b3JGYWN0b3J5LFxuICAgICAgICAgICAgICB2YWxpZGF0b3JSZWdpc3RyeTogVmFsaWRhdG9yUmVnaXN0cnksXG4gICAgICAgICAgICAgIHNjaGVtYTogYW55LFxuICAgICAgICAgICAgICBwYXJlbnQ6IFByb3BlcnR5R3JvdXAsXG4gICAgICAgICAgICAgIHBhdGg6IHN0cmluZykge1xuICAgIHN1cGVyKHNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHZhbGlkYXRvclJlZ2lzdHJ5LCBzY2hlbWEsIHBhcmVudCwgcGF0aCk7XG4gIH1cblxuICBhZGRJdGVtKHZhbHVlOiBhbnkgPSBudWxsKTogRm9ybVByb3BlcnR5IHtcbiAgICBsZXQgbmV3UHJvcGVydHkgPSB0aGlzLmFkZFByb3BlcnR5KCk7XG4gICAgbmV3UHJvcGVydHkucmVzZXQodmFsdWUsIGZhbHNlKTtcbiAgICByZXR1cm4gbmV3UHJvcGVydHk7XG4gIH1cblxuICBwcml2YXRlIGFkZFByb3BlcnR5KCkge1xuICAgIGxldCBuZXdQcm9wZXJ0eSA9IHRoaXMuZm9ybVByb3BlcnR5RmFjdG9yeS5jcmVhdGVQcm9wZXJ0eSh0aGlzLnNjaGVtYS5pdGVtcywgdGhpcyk7XG4gICAgKDxGb3JtUHJvcGVydHlbXT50aGlzLnByb3BlcnRpZXMpLnB1c2gobmV3UHJvcGVydHkpO1xuICAgIHJldHVybiBuZXdQcm9wZXJ0eTtcbiAgfVxuXG4gIHJlbW92ZUl0ZW0oaXRlbTogRm9ybVByb3BlcnR5KSB7XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0gKDxGb3JtUHJvcGVydHlbXT50aGlzLnByb3BlcnRpZXMpLmZpbHRlcihpID0+IGkgIT09IGl0ZW0pO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShmYWxzZSwgdHJ1ZSk7XG4gIH1cblxuICBzZXRWYWx1ZSh2YWx1ZTogYW55LCBvbmx5U2VsZjogYm9vbGVhbikge1xuICAgIHRoaXMuY3JlYXRlUHJvcGVydGllcygpO1xuICAgIHRoaXMucmVzZXRQcm9wZXJ0aWVzKHZhbHVlKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkob25seVNlbGYsIHRydWUpO1xuICB9XG5cbiAgcHVibGljIF9oYXNWYWx1ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBfdXBkYXRlVmFsdWUoKSB7XG4gICAgdGhpcy5yZWR1Y2VWYWx1ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZWR1Y2VWYWx1ZSgpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZSA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaENoaWxkKChwcm9wZXJ0eSwgXykgPT4ge1xuICAgICAgaWYgKHByb3BlcnR5LnZpc2libGUgJiYgcHJvcGVydHkuX2hhc1ZhbHVlKCkpIHtcbiAgICAgICAgdmFsdWUucHVzaChwcm9wZXJ0eS52YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHJlc2V0KHZhbHVlOiBhbnksIG9ubHlTZWxmID0gdHJ1ZSkge1xuICAgIHZhbHVlID0gdmFsdWUgfHwgdGhpcy5zY2hlbWEuZGVmYXVsdCB8fCBbXTtcbiAgICB0aGlzLnByb3BlcnRpZXMgPSBbXTtcbiAgICB0aGlzLnJlc2V0UHJvcGVydGllcyh2YWx1ZSk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KG9ubHlTZWxmLCB0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUHJvcGVydGllcygpIHtcbiAgICB0aGlzLnByb3BlcnRpZXMgPSBbXTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSByZXNldFByb3BlcnRpZXModmFsdWU6IGFueSkge1xuICAgIGZvciAobGV0IGlkeCBpbiB2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KGlkeCkpIHtcbiAgICAgICAgbGV0IHByb3BlcnR5ID0gdGhpcy5hZGRQcm9wZXJ0eSgpO1xuICAgICAgICBwcm9wZXJ0eS5yZXNldCh2YWx1ZVtpZHhdLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==