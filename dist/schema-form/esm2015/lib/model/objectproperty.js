/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { PropertyGroup } from './formproperty';
export class ObjectProperty extends PropertyGroup {
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
        this.propertiesId = [];
        this.createProperties();
    }
    /**
     * @param {?} value
     * @param {?} onlySelf
     * @return {?}
     */
    setValue(value, onlySelf) {
        for (const propertyId in value) {
            if (value.hasOwnProperty(propertyId)) {
                this.properties[propertyId].setValue(value[propertyId], true);
            }
        }
        this.updateValueAndValidity(onlySelf, true);
    }
    /**
     * @param {?} value
     * @param {?=} onlySelf
     * @return {?}
     */
    reset(value, onlySelf = true) {
        value = value || this.schema.default || {};
        this.resetProperties(value);
        this.updateValueAndValidity(onlySelf, true);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    resetProperties(value) {
        for (const propertyId in this.schema.properties) {
            if (this.schema.properties.hasOwnProperty(propertyId)) {
                this.properties[propertyId].reset(value[propertyId], true);
            }
        }
    }
    /**
     * @return {?}
     */
    createProperties() {
        this.properties = {};
        this.propertiesId = [];
        for (const propertyId in this.schema.properties) {
            if (this.schema.properties.hasOwnProperty(propertyId)) {
                /** @type {?} */
                const propertySchema = this.schema.properties[propertyId];
                this.properties[propertyId] = this.formPropertyFactory.createProperty(propertySchema, this, propertyId);
                this.propertiesId.push(propertyId);
            }
        }
    }
    /**
     * @return {?}
     */
    _hasValue() {
        return !!Object.keys(this.value).length;
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
    _runValidation() {
        super._runValidation();
        if (this._errors) {
            this._errors.forEach(error => {
                /** @type {?} */
                const prop = this.searchProperty(error.path.slice(1));
                if (prop) {
                    prop.extendErrors(error);
                }
            });
        }
    }
    /**
     * @return {?}
     */
    reduceValue() {
        /** @type {?} */
        const value = {};
        this.forEachChild((property, propertyId) => {
            if (property.visible && property._hasValue()) {
                value[propertyId] = property.value;
            }
        });
        this._value = value;
    }
}
if (false) {
    /** @type {?} */
    ObjectProperty.prototype.propertiesId;
    /** @type {?} */
    ObjectProperty.prototype.formPropertyFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0cHJvcGVydHkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJsaWIvbW9kZWwvb2JqZWN0cHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUs3QyxNQUFNLE9BQU8sY0FBZSxTQUFRLGFBQWE7Ozs7Ozs7OztJQUkvQyxZQUFvQixtQkFBd0MsRUFDaEQsc0JBQThDLEVBQzlDLGlCQUFvQyxFQUNwQyxNQUFXLEVBQ1gsTUFBcUIsRUFDckIsSUFBWTtRQUN0QixLQUFLLENBQUMsc0JBQXNCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQU5yRCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBRnBELGlCQUFZLEdBQWEsRUFBRSxDQUFDO1FBU2xDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7Ozs7OztJQUVELFFBQVEsQ0FBQyxLQUFVLEVBQUUsUUFBaUI7UUFDcEMsS0FBSyxNQUFNLFVBQVUsSUFBSSxLQUFLLEVBQUU7WUFDOUIsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDL0Q7U0FDRjtRQUNELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7Ozs7O0lBRUQsS0FBSyxDQUFDLEtBQVUsRUFBRSxRQUFRLEdBQUcsSUFBSTtRQUMvQixLQUFLLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7Ozs7SUFFRCxlQUFlLENBQUMsS0FBVTtRQUN4QixLQUFLLE1BQU0sVUFBVSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQy9DLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDNUQ7U0FDRjtJQUNILENBQUM7Ozs7SUFFRCxnQkFBZ0I7UUFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixLQUFLLE1BQU0sVUFBVSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQy9DLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFOztzQkFDL0MsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztnQkFDekQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ3hHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3BDO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRU0sU0FBUztRQUNkLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUMxQyxDQUFDOzs7O0lBRU0sWUFBWTtRQUNqQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7OztJQUVNLGNBQWM7UUFDbkIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXZCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTs7c0JBQ3JCLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxJQUFJLElBQUksRUFBRTtvQkFDUixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMxQjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7O0lBRU8sV0FBVzs7Y0FDWCxLQUFLLEdBQUcsRUFBRTtRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxFQUFFLFVBQWtCLEVBQUUsRUFBRTtZQUNqRCxJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUM1QyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQzthQUNwQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztDQUNGOzs7SUE3RUMsc0NBQW9DOztJQUV4Qiw2Q0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Byb3BlcnR5R3JvdXB9IGZyb20gJy4vZm9ybXByb3BlcnR5JztcbmltcG9ydCB7Rm9ybVByb3BlcnR5RmFjdG9yeX0gZnJvbSAnLi9mb3JtcHJvcGVydHlmYWN0b3J5JztcbmltcG9ydCB7U2NoZW1hVmFsaWRhdG9yRmFjdG9yeX0gZnJvbSAnLi4vc2NoZW1hdmFsaWRhdG9yZmFjdG9yeSc7XG5pbXBvcnQge1ZhbGlkYXRvclJlZ2lzdHJ5fSBmcm9tICcuL3ZhbGlkYXRvcnJlZ2lzdHJ5JztcblxuZXhwb3J0IGNsYXNzIE9iamVjdFByb3BlcnR5IGV4dGVuZHMgUHJvcGVydHlHcm91cCB7XG5cbiAgcHJpdmF0ZSBwcm9wZXJ0aWVzSWQ6IHN0cmluZ1tdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtUHJvcGVydHlGYWN0b3J5OiBGb3JtUHJvcGVydHlGYWN0b3J5LFxuICAgICAgICAgICAgICBzY2hlbWFWYWxpZGF0b3JGYWN0b3J5OiBTY2hlbWFWYWxpZGF0b3JGYWN0b3J5LFxuICAgICAgICAgICAgICB2YWxpZGF0b3JSZWdpc3RyeTogVmFsaWRhdG9yUmVnaXN0cnksXG4gICAgICAgICAgICAgIHNjaGVtYTogYW55LFxuICAgICAgICAgICAgICBwYXJlbnQ6IFByb3BlcnR5R3JvdXAsXG4gICAgICAgICAgICAgIHBhdGg6IHN0cmluZykge1xuICAgIHN1cGVyKHNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHZhbGlkYXRvclJlZ2lzdHJ5LCBzY2hlbWEsIHBhcmVudCwgcGF0aCk7XG4gICAgdGhpcy5jcmVhdGVQcm9wZXJ0aWVzKCk7XG4gIH1cblxuICBzZXRWYWx1ZSh2YWx1ZTogYW55LCBvbmx5U2VsZjogYm9vbGVhbikge1xuICAgIGZvciAoY29uc3QgcHJvcGVydHlJZCBpbiB2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KHByb3BlcnR5SWQpKSB7XG4gICAgICAgIHRoaXMucHJvcGVydGllc1twcm9wZXJ0eUlkXS5zZXRWYWx1ZSh2YWx1ZVtwcm9wZXJ0eUlkXSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShvbmx5U2VsZiwgdHJ1ZSk7XG4gIH1cblxuICByZXNldCh2YWx1ZTogYW55LCBvbmx5U2VsZiA9IHRydWUpIHtcbiAgICB2YWx1ZSA9IHZhbHVlIHx8IHRoaXMuc2NoZW1hLmRlZmF1bHQgfHwge307XG4gICAgdGhpcy5yZXNldFByb3BlcnRpZXModmFsdWUpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShvbmx5U2VsZiwgdHJ1ZSk7XG4gIH1cblxuICByZXNldFByb3BlcnRpZXModmFsdWU6IGFueSkge1xuICAgIGZvciAoY29uc3QgcHJvcGVydHlJZCBpbiB0aGlzLnNjaGVtYS5wcm9wZXJ0aWVzKSB7XG4gICAgICBpZiAodGhpcy5zY2hlbWEucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eUlkKSkge1xuICAgICAgICB0aGlzLnByb3BlcnRpZXNbcHJvcGVydHlJZF0ucmVzZXQodmFsdWVbcHJvcGVydHlJZF0sIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZVByb3BlcnRpZXMoKSB7XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0ge307XG4gICAgdGhpcy5wcm9wZXJ0aWVzSWQgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5SWQgaW4gdGhpcy5zY2hlbWEucHJvcGVydGllcykge1xuICAgICAgaWYgKHRoaXMuc2NoZW1hLnByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHlJZCkpIHtcbiAgICAgICAgY29uc3QgcHJvcGVydHlTY2hlbWEgPSB0aGlzLnNjaGVtYS5wcm9wZXJ0aWVzW3Byb3BlcnR5SWRdO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXNbcHJvcGVydHlJZF0gPSB0aGlzLmZvcm1Qcm9wZXJ0eUZhY3RvcnkuY3JlYXRlUHJvcGVydHkocHJvcGVydHlTY2hlbWEsIHRoaXMsIHByb3BlcnR5SWQpO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXNJZC5wdXNoKHByb3BlcnR5SWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBfaGFzVmFsdWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhT2JqZWN0LmtleXModGhpcy52YWx1ZSkubGVuZ3RoO1xuICB9XG5cbiAgcHVibGljIF91cGRhdGVWYWx1ZSgpIHtcbiAgICB0aGlzLnJlZHVjZVZhbHVlKCk7XG4gIH1cblxuICBwdWJsaWMgX3J1blZhbGlkYXRpb24oKSB7XG4gICAgc3VwZXIuX3J1blZhbGlkYXRpb24oKTtcblxuICAgIGlmICh0aGlzLl9lcnJvcnMpIHtcbiAgICAgIHRoaXMuX2Vycm9ycy5mb3JFYWNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc3QgcHJvcCA9IHRoaXMuc2VhcmNoUHJvcGVydHkoZXJyb3IucGF0aC5zbGljZSgxKSk7XG4gICAgICAgIGlmIChwcm9wKSB7XG4gICAgICAgICAgcHJvcC5leHRlbmRFcnJvcnMoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlZHVjZVZhbHVlKCk6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlID0ge307XG4gICAgdGhpcy5mb3JFYWNoQ2hpbGQoKHByb3BlcnR5LCBwcm9wZXJ0eUlkOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChwcm9wZXJ0eS52aXNpYmxlICYmIHByb3BlcnR5Ll9oYXNWYWx1ZSgpKSB7XG4gICAgICAgIHZhbHVlW3Byb3BlcnR5SWRdID0gcHJvcGVydHkudmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxufVxuIl19