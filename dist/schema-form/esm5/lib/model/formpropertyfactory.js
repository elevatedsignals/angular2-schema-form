import { PropertyGroup } from './formproperty';
import { PROPERTY_TYPE_MAPPING } from './typemapping';
var FormPropertyFactory = /** @class */ (function () {
    function FormPropertyFactory(schemaValidatorFactory, validatorRegistry, propertyBindingRegistry, expressionCompilerFactory) {
        this.schemaValidatorFactory = schemaValidatorFactory;
        this.validatorRegistry = validatorRegistry;
        this.propertyBindingRegistry = propertyBindingRegistry;
        this.expressionCompilerFactory = expressionCompilerFactory;
    }
    FormPropertyFactory.prototype.createProperty = function (schema, parent, propertyId) {
        if (parent === void 0) { parent = null; }
        var newProperty = null;
        var path = '';
        var _canonicalPath = '';
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
            var refSchema = this.schemaValidatorFactory.getSchema(parent.root.schema, schema.$ref);
            newProperty = this.createProperty(refSchema, parent, path);
        }
        else {
            if (PROPERTY_TYPE_MAPPING[schema.type]) {
                if (schema.type === 'object' || schema.type === 'array') {
                    newProperty = PROPERTY_TYPE_MAPPING[schema.type](this.schemaValidatorFactory, this.validatorRegistry, this.expressionCompilerFactory, schema, parent, path, this);
                }
                else {
                    newProperty = PROPERTY_TYPE_MAPPING[schema.type](this.schemaValidatorFactory, this.validatorRegistry, this.expressionCompilerFactory, schema, parent, path);
                }
            }
            else {
                throw new TypeError("Undefined type " + schema.type + " (existing: " + Object.keys(PROPERTY_TYPE_MAPPING) + ")");
            }
        }
        newProperty._propertyBindingRegistry = this.propertyBindingRegistry;
        newProperty._canonicalPath = _canonicalPath;
        if (newProperty instanceof PropertyGroup) {
            this.initializeRoot(newProperty);
        }
        return newProperty;
    };
    FormPropertyFactory.prototype.initializeRoot = function (rootProperty) {
        rootProperty.reset(null, true);
        rootProperty._bindVisibility();
    };
    return FormPropertyFactory;
}());
export { FormPropertyFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXByb3BlcnR5ZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbC9mb3JtcHJvcGVydHlmYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZSxhQUFhLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUszRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEQ7SUFFRSw2QkFBb0Isc0JBQThDLEVBQVUsaUJBQW9DLEVBQzVGLHVCQUFnRCxFQUNoRCx5QkFBb0Q7UUFGcEQsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDNUYsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUNoRCw4QkFBeUIsR0FBekIseUJBQXlCLENBQTJCO0lBQ3hFLENBQUM7SUFFRCw0Q0FBYyxHQUFkLFVBQWUsTUFBVyxFQUFFLE1BQTRCLEVBQUUsVUFBbUI7UUFBakQsdUJBQUEsRUFBQSxhQUE0QjtRQUN0RCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDcEIsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtnQkFDMUIsSUFBSSxJQUFJLEdBQUcsQ0FBQztnQkFDWixjQUFjLElBQUksR0FBRyxDQUFDO2FBQ3ZCO1lBQ0QsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDNUIsSUFBSSxJQUFJLFVBQVUsQ0FBQztnQkFDbkIsY0FBYyxJQUFJLFVBQVUsQ0FBQzthQUM5QjtpQkFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO2dCQUNsQyxJQUFJLElBQUksR0FBRyxDQUFDO2dCQUNaLGNBQWMsSUFBSSxHQUFHLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0wsTUFBTSwrREFBK0QsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ3JGO1lBQ0QsY0FBYyxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsY0FBYyxDQUFDO1NBQzFFO2FBQU07WUFDTCxJQUFJLEdBQUcsR0FBRyxDQUFDO1lBQ1gsY0FBYyxHQUFHLEdBQUcsQ0FBQztTQUN0QjtRQUVELElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtZQUNmLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pGLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDNUQ7YUFBTTtZQUNILElBQUkscUJBQXFCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNwQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO29CQUNyRCxXQUFXLEdBQUcscUJBQXFCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUM1QyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDeEg7cUJBQU07b0JBQ0gsV0FBVyxHQUFHLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FDNUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDbEg7YUFDSjtpQkFBTTtnQkFDSCxNQUFNLElBQUksU0FBUyxDQUFDLG9CQUFrQixNQUFNLENBQUMsSUFBSSxvQkFBZSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQUcsQ0FBQyxDQUFDO2FBQzFHO1NBQ0o7UUFFRCxXQUFXLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDO1FBQ3BFLFdBQVcsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBRTVDLElBQUksV0FBVyxZQUFZLGFBQWEsRUFBRTtZQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2xDO1FBRUQsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUVPLDRDQUFjLEdBQXRCLFVBQXVCLFlBQTJCO1FBQ2hELFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9CLFlBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBL0RELElBK0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtGb3JtUHJvcGVydHksIFByb3BlcnR5R3JvdXB9IGZyb20gJy4vZm9ybXByb3BlcnR5JztcbmltcG9ydCB7U2NoZW1hVmFsaWRhdG9yRmFjdG9yeX0gZnJvbSAnLi4vc2NoZW1hdmFsaWRhdG9yZmFjdG9yeSc7XG5pbXBvcnQge1ZhbGlkYXRvclJlZ2lzdHJ5fSBmcm9tICcuL3ZhbGlkYXRvcnJlZ2lzdHJ5JztcbmltcG9ydCB7UHJvcGVydHlCaW5kaW5nUmVnaXN0cnl9IGZyb20gJy4uL3Byb3BlcnR5LWJpbmRpbmctcmVnaXN0cnknO1xuaW1wb3J0IHsgRXhwcmVzc2lvbkNvbXBpbGVyRmFjdG9yeSB9IGZyb20gJy4uL2V4cHJlc3Npb24tY29tcGlsZXItZmFjdG9yeSc7XG5pbXBvcnQgeyBQUk9QRVJUWV9UWVBFX01BUFBJTkcgfSBmcm9tICcuL3R5cGVtYXBwaW5nJztcblxuZXhwb3J0IGNsYXNzIEZvcm1Qcm9wZXJ0eUZhY3Rvcnkge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2NoZW1hVmFsaWRhdG9yRmFjdG9yeTogU2NoZW1hVmFsaWRhdG9yRmFjdG9yeSwgcHJpdmF0ZSB2YWxpZGF0b3JSZWdpc3RyeTogVmFsaWRhdG9yUmVnaXN0cnksXG4gICAgICAgICAgICAgIHByaXZhdGUgcHJvcGVydHlCaW5kaW5nUmVnaXN0cnk6IFByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5LFxuICAgICAgICAgICAgICBwcml2YXRlIGV4cHJlc3Npb25Db21waWxlckZhY3Rvcnk6IEV4cHJlc3Npb25Db21waWxlckZhY3RvcnkpIHtcbiAgfVxuXG4gIGNyZWF0ZVByb3BlcnR5KHNjaGVtYTogYW55LCBwYXJlbnQ6IFByb3BlcnR5R3JvdXAgPSBudWxsLCBwcm9wZXJ0eUlkPzogc3RyaW5nKTogRm9ybVByb3BlcnR5IHtcbiAgICBsZXQgbmV3UHJvcGVydHkgPSBudWxsO1xuICAgIGxldCBwYXRoID0gJyc7XG4gICAgbGV0IF9jYW5vbmljYWxQYXRoID0gJyc7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgcGF0aCArPSBwYXJlbnQucGF0aDtcbiAgICAgIGlmIChwYXJlbnQucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHBhdGggKz0gJy8nO1xuICAgICAgICBfY2Fub25pY2FsUGF0aCArPSAnLyc7XG4gICAgICB9XG4gICAgICBpZiAocGFyZW50LnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHBhdGggKz0gcHJvcGVydHlJZDtcbiAgICAgICAgX2Nhbm9uaWNhbFBhdGggKz0gcHJvcGVydHlJZDtcbiAgICAgIH0gZWxzZSBpZiAocGFyZW50LnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgICAgcGF0aCArPSAnKic7XG4gICAgICAgIF9jYW5vbmljYWxQYXRoICs9ICcqJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93ICdJbnN0YW5jaWF0aW9uIG9mIGEgRm9ybVByb3BlcnR5IHdpdGggYW4gdW5rbm93biBwYXJlbnQgdHlwZTogJyArIHBhcmVudC50eXBlO1xuICAgICAgfVxuICAgICAgX2Nhbm9uaWNhbFBhdGggPSAocGFyZW50Ll9jYW5vbmljYWxQYXRoIHx8IHBhcmVudC5wYXRoKSArIF9jYW5vbmljYWxQYXRoO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXRoID0gJy8nO1xuICAgICAgX2Nhbm9uaWNhbFBhdGggPSAnLyc7XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYS4kcmVmKSB7XG4gICAgICBjb25zdCByZWZTY2hlbWEgPSB0aGlzLnNjaGVtYVZhbGlkYXRvckZhY3RvcnkuZ2V0U2NoZW1hKHBhcmVudC5yb290LnNjaGVtYSwgc2NoZW1hLiRyZWYpO1xuICAgICAgbmV3UHJvcGVydHkgPSB0aGlzLmNyZWF0ZVByb3BlcnR5KHJlZlNjaGVtYSwgcGFyZW50LCBwYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoUFJPUEVSVFlfVFlQRV9NQVBQSU5HW3NjaGVtYS50eXBlXSkge1xuICAgICAgICAgICAgaWYgKHNjaGVtYS50eXBlID09PSAnb2JqZWN0JyB8fCBzY2hlbWEudHlwZSA9PT0gJ2FycmF5Jykge1xuICAgICAgICAgICAgICAgIG5ld1Byb3BlcnR5ID0gUFJPUEVSVFlfVFlQRV9NQVBQSU5HW3NjaGVtYS50eXBlXShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LCB0aGlzLmV4cHJlc3Npb25Db21waWxlckZhY3RvcnksIHNjaGVtYSwgcGFyZW50LCBwYXRoLCB0aGlzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3UHJvcGVydHkgPSBQUk9QRVJUWV9UWVBFX01BUFBJTkdbc2NoZW1hLnR5cGVdKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHRoaXMudmFsaWRhdG9yUmVnaXN0cnksIHRoaXMuZXhwcmVzc2lvbkNvbXBpbGVyRmFjdG9yeSwgc2NoZW1hLCBwYXJlbnQsIHBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVW5kZWZpbmVkIHR5cGUgJHtzY2hlbWEudHlwZX0gKGV4aXN0aW5nOiAke09iamVjdC5rZXlzKFBST1BFUlRZX1RZUEVfTUFQUElORyl9KWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV3UHJvcGVydHkuX3Byb3BlcnR5QmluZGluZ1JlZ2lzdHJ5ID0gdGhpcy5wcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeTtcbiAgICBuZXdQcm9wZXJ0eS5fY2Fub25pY2FsUGF0aCA9IF9jYW5vbmljYWxQYXRoO1xuXG4gICAgaWYgKG5ld1Byb3BlcnR5IGluc3RhbmNlb2YgUHJvcGVydHlHcm91cCkge1xuICAgICAgdGhpcy5pbml0aWFsaXplUm9vdChuZXdQcm9wZXJ0eSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1Byb3BlcnR5O1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplUm9vdChyb290UHJvcGVydHk6IFByb3BlcnR5R3JvdXApIHtcbiAgICByb290UHJvcGVydHkucmVzZXQobnVsbCwgdHJ1ZSk7XG4gICAgcm9vdFByb3BlcnR5Ll9iaW5kVmlzaWJpbGl0eSgpO1xuICB9XG59XG4iXX0=