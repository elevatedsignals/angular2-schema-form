/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { PropertyGroup } from './formproperty';
import { NumberProperty } from './numberproperty';
import { StringProperty } from './stringproperty';
import { BooleanProperty } from './booleanproperty';
import { ObjectProperty } from './objectproperty';
import { ArrayProperty } from './arrayproperty';
export class FormPropertyFactory {
    /**
     * @param {?} schemaValidatorFactory
     * @param {?} validatorRegistry
     * @param {?} propertyBindingRegistry
     */
    constructor(schemaValidatorFactory, validatorRegistry, propertyBindingRegistry) {
        this.schemaValidatorFactory = schemaValidatorFactory;
        this.validatorRegistry = validatorRegistry;
        this.propertyBindingRegistry = propertyBindingRegistry;
    }
    /**
     * @param {?} schema
     * @param {?=} parent
     * @param {?=} propertyId
     * @return {?}
     */
    createProperty(schema, parent = null, propertyId) {
        /** @type {?} */
        let newProperty = null;
        /** @type {?} */
        let path = '';
        /** @type {?} */
        let _canonicalPath = '';
        if (parent) {
            path += parent.path;
            if (parent.parent !== null) {
                path += '/';
                _canonicalPath += '/';
            }
            if (parent.type === 'object') {
                path += propertyId;
                _canonicalPath += propertyId;
            }
            else if (parent.type === 'array') {
                path += '*';
                _canonicalPath += '*';
            }
            else {
                throw 'Instanciation of a FormProperty with an unknown parent type: ' + parent.type;
            }
            _canonicalPath = (parent._canonicalPath || parent.path) + _canonicalPath;
        }
        else {
            path = '/';
            _canonicalPath = '/';
        }
        if (schema.$ref) {
            /** @type {?} */
            const refSchema = this.schemaValidatorFactory.getSchema(parent.root.schema, schema.$ref);
            newProperty = this.createProperty(refSchema, parent, path);
        }
        else {
            switch (schema.type) {
                case 'integer':
                case 'number':
                    newProperty = new NumberProperty(this.schemaValidatorFactory, this.validatorRegistry, schema, parent, path);
                    break;
                case 'string':
                    newProperty = new StringProperty(this.schemaValidatorFactory, this.validatorRegistry, schema, parent, path);
                    break;
                case 'boolean':
                    newProperty = new BooleanProperty(this.schemaValidatorFactory, this.validatorRegistry, schema, parent, path);
                    break;
                case 'object':
                    newProperty = new ObjectProperty(this, this.schemaValidatorFactory, this.validatorRegistry, schema, parent, path);
                    break;
                case 'array':
                    newProperty = new ArrayProperty(this, this.schemaValidatorFactory, this.validatorRegistry, schema, parent, path);
                    break;
                default:
                    throw new TypeError(`Undefined type ${schema.type}`);
            }
        }
        newProperty._propertyBindingRegistry = this.propertyBindingRegistry;
        newProperty._canonicalPath = _canonicalPath;
        if (newProperty instanceof PropertyGroup) {
            this.initializeRoot(newProperty);
        }
        return newProperty;
    }
    /**
     * @param {?} rootProperty
     * @return {?}
     */
    initializeRoot(rootProperty) {
        rootProperty.reset(null, true);
        rootProperty._bindVisibility();
    }
}
if (false) {
    /** @type {?} */
    FormPropertyFactory.prototype.schemaValidatorFactory;
    /** @type {?} */
    FormPropertyFactory.prototype.validatorRegistry;
    /** @type {?} */
    FormPropertyFactory.prototype.propertyBindingRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXByb3BlcnR5ZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbC9mb3JtcHJvcGVydHlmYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWUsYUFBYSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUs5QyxNQUFNLE9BQU8sbUJBQW1COzs7Ozs7SUFFOUIsWUFBb0Isc0JBQThDLEVBQVUsaUJBQW9DLEVBQzVGLHVCQUFnRDtRQURoRCwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUM1Riw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO0lBQ3BFLENBQUM7Ozs7Ozs7SUFFRCxjQUFjLENBQUMsTUFBVyxFQUFFLFNBQXdCLElBQUksRUFBRSxVQUFtQjs7WUFDdkUsV0FBVyxHQUFHLElBQUk7O1lBQ2xCLElBQUksR0FBRyxFQUFFOztZQUNULGNBQWMsR0FBRyxFQUFFO1FBQ3ZCLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDcEIsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtnQkFDMUIsSUFBSSxJQUFJLEdBQUcsQ0FBQztnQkFDWixjQUFjLElBQUksR0FBRyxDQUFDO2FBQ3ZCO1lBQ0QsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEs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IHtGb3JtUHJvcGVydHksIFByb3BlcnR5R3JvdXB9IGZyb20gJy4vZm9ybXByb3BlcnR5JztcbmltcG9ydCB7TnVtYmVyUHJvcGVydHl9IGZyb20gJy4vbnVtYmVycHJvcGVydHknO1xuaW1wb3J0IHtTdHJpbmdQcm9wZXJ0eX0gZnJvbSAnLi9zdHJpbmdwcm9wZXJ0eSc7XG5pbXBvcnQge0Jvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnLi9ib29sZWFucHJvcGVydHknO1xuaW1wb3J0IHtPYmplY3RQcm9wZXJ0eX0gZnJvbSAnLi9vYmplY3Rwcm9wZXJ0eSc7XG5pbXBvcnQge0FycmF5UHJvcGVydHl9IGZyb20gJy4vYXJyYXlwcm9wZXJ0eSc7XG5pbXBvcnQge1NjaGVtYVZhbGlkYXRvckZhY3Rvcnl9IGZyb20gJy4uL3NjaGVtYXZhbGlkYXRvcmZhY3RvcnknO1xuaW1wb3J0IHtWYWxpZGF0b3JSZWdpc3RyeX0gZnJvbSAnLi92YWxpZGF0b3JyZWdpc3RyeSc7XG5pbXBvcnQge1Byb3BlcnR5QmluZGluZ1JlZ2lzdHJ5fSBmcm9tICcuLi9wcm9wZXJ0eS1iaW5kaW5nLXJlZ2lzdHJ5JztcblxuZXhwb3J0IGNsYXNzIEZvcm1Qcm9wZXJ0eUZhY3Rvcnkge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2NoZW1hVmFsaWRhdG9yRmFjdG9yeTogU2NoZW1hVmFsaWRhdG9yRmFjdG9yeSwgcHJpdmF0ZSB2YWxpZGF0b3JSZWdpc3RyeTogVmFsaWRhdG9yUmVnaXN0cnksXG4gICAgICAgICAgICAgIHByaXZhdGUgcHJvcGVydHlCaW5kaW5nUmVnaXN0cnk6IFByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5KSB7XG4gIH1cblxuICBjcmVhdGVQcm9wZXJ0eShzY2hlbWE6IGFueSwgcGFyZW50OiBQcm9wZXJ0eUdyb3VwID0gbnVsbCwgcHJvcGVydHlJZD86IHN0cmluZyk6IEZvcm1Qcm9wZXJ0eSB7XG4gICAgbGV0IG5ld1Byb3BlcnR5ID0gbnVsbDtcbiAgICBsZXQgcGF0aCA9ICcnO1xuICAgIGxldCBfY2Fub25pY2FsUGF0aCA9ICcnO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhdGggKz0gcGFyZW50LnBhdGg7XG4gICAgICBpZiAocGFyZW50LnBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICBwYXRoICs9ICcvJztcbiAgICAgICAgX2Nhbm9uaWNhbFBhdGggKz0gJy8nO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmVudC50eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBwYXRoICs9IHByb3BlcnR5SWQ7XG4gICAgICAgIF9jYW5vbmljYWxQYXRoICs9IHByb3BlcnR5SWQ7XG4gICAgICB9IGVsc2UgaWYgKHBhcmVudC50eXBlID09PSAnYXJyYXknKSB7XG4gICAgICAgIHBhdGggKz0gJyonO1xuICAgICAgICBfY2Fub25pY2FsUGF0aCArPSAnKic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyAnSW5zdGFuY2lhdGlvbiBvZiBhIEZvcm1Qcm9wZXJ0eSB3aXRoIGFuIHVua25vd24gcGFyZW50IHR5cGU6ICcgKyBwYXJlbnQudHlwZTtcbiAgICAgIH1cbiAgICAgIF9jYW5vbmljYWxQYXRoID0gKHBhcmVudC5fY2Fub25pY2FsUGF0aCB8fCBwYXJlbnQucGF0aCkgKyBfY2Fub25pY2FsUGF0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgcGF0aCA9ICcvJztcbiAgICAgIF9jYW5vbmljYWxQYXRoID0gJy8nO1xuICAgIH1cblxuICAgIGlmIChzY2hlbWEuJHJlZikge1xuICAgICAgY29uc3QgcmVmU2NoZW1hID0gdGhpcy5zY2hlbWFWYWxpZGF0b3JGYWN0b3J5LmdldFNjaGVtYShwYXJlbnQucm9vdC5zY2hlbWEsIHNjaGVtYS4kcmVmKTtcbiAgICAgIG5ld1Byb3BlcnR5ID0gdGhpcy5jcmVhdGVQcm9wZXJ0eShyZWZTY2hlbWEsIHBhcmVudCwgcGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAoc2NoZW1hLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnaW50ZWdlcic6XG4gICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgbmV3UHJvcGVydHkgPSBuZXcgTnVtYmVyUHJvcGVydHkodGhpcy5zY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LCBzY2hlbWEsIHBhcmVudCwgcGF0aCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgbmV3UHJvcGVydHkgPSBuZXcgU3RyaW5nUHJvcGVydHkodGhpcy5zY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LCBzY2hlbWEsIHBhcmVudCwgcGF0aCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgIG5ld1Byb3BlcnR5ID0gbmV3IEJvb2xlYW5Qcm9wZXJ0eSh0aGlzLnNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHRoaXMudmFsaWRhdG9yUmVnaXN0cnksIHNjaGVtYSwgcGFyZW50LCBwYXRoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICBuZXdQcm9wZXJ0eSA9IG5ldyBPYmplY3RQcm9wZXJ0eSh0aGlzLCB0aGlzLnNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHRoaXMudmFsaWRhdG9yUmVnaXN0cnksIHNjaGVtYSwgcGFyZW50LCBwYXRoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICAgIG5ld1Byb3BlcnR5ID0gbmV3IEFycmF5UHJvcGVydHkodGhpcywgdGhpcy5zY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LCBzY2hlbWEsIHBhcmVudCwgcGF0aCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVW5kZWZpbmVkIHR5cGUgJHtzY2hlbWEudHlwZX1gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBuZXdQcm9wZXJ0eS5fcHJvcGVydHlCaW5kaW5nUmVnaXN0cnkgPSB0aGlzLnByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5O1xuICAgIG5ld1Byb3BlcnR5Ll9jYW5vbmljYWxQYXRoID0gX2Nhbm9uaWNhbFBhdGg7XG5cbiAgICBpZiAobmV3UHJvcGVydHkgaW5zdGFuY2VvZiBQcm9wZXJ0eUdyb3VwKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemVSb290KG5ld1Byb3BlcnR5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3UHJvcGVydHk7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemVSb290KHJvb3RQcm9wZXJ0eTogUHJvcGVydHlHcm91cCkge1xuICAgIHJvb3RQcm9wZXJ0eS5yZXNldChudWxsLCB0cnVlKTtcbiAgICByb290UHJvcGVydHkuX2JpbmRWaXNpYmlsaXR5KCk7XG4gIH1cbn1cbiJdfQ==