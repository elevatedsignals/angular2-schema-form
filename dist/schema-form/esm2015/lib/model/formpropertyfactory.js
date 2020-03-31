import { PropertyGroup } from './formproperty';
import { PROPERTY_TYPE_MAPPING } from './typemapping';
export class FormPropertyFactory {
    constructor(schemaValidatorFactory, validatorRegistry, propertyBindingRegistry, expressionCompilerFactory) {
        this.schemaValidatorFactory = schemaValidatorFactory;
        this.validatorRegistry = validatorRegistry;
        this.propertyBindingRegistry = propertyBindingRegistry;
        this.expressionCompilerFactory = expressionCompilerFactory;
    }
    createProperty(schema, parent = null, propertyId) {
        let newProperty = null;
        let path = '';
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
            const refSchema = this.schemaValidatorFactory.getSchema(parent.root.schema, schema.$ref);
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
                throw new TypeError(`Undefined type ${schema.type} (existing: ${Object.keys(PROPERTY_TYPE_MAPPING)})`);
            }
        }
        newProperty._propertyBindingRegistry = this.propertyBindingRegistry;
        newProperty._canonicalPath = _canonicalPath;
        if (newProperty instanceof PropertyGroup) {
            this.initializeRoot(newProperty);
        }
        return newProperty;
    }
    initializeRoot(rootProperty) {
        rootProperty.reset(null, true);
        rootProperty._bindVisibility();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXByb3BlcnR5ZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbC9mb3JtcHJvcGVydHlmYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZSxhQUFhLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUszRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEQsTUFBTSxPQUFPLG1CQUFtQjtJQUU5QixZQUFvQixzQkFBOEMsRUFBVSxpQkFBb0MsRUFDNUYsdUJBQWdELEVBQ2hELHlCQUFvRDtRQUZwRCwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUM1Riw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQ2hELDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7SUFDeEUsQ0FBQztJQUVELGNBQWMsQ0FBQyxNQUFXLEVBQUUsU0FBd0IsSUFBSSxFQUFFLFVBQW1CO1FBQzNFLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQztZQUNwQixJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO2dCQUMxQixJQUFJLElBQUksR0FBRyxDQUFDO2dCQUNaLGNBQWMsSUFBSSxHQUFHLENBQUM7YUFDdkI7WUFDRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUM1QixJQUFJLElBQUksVUFBVSxDQUFDO2dCQUNuQixjQUFjLElBQUksVUFBVSxDQUFDO2FBQzlCO2lCQUFNLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7Z0JBQ2xDLElBQUksSUFBSSxHQUFHLENBQUM7Z0JBQ1osY0FBYyxJQUFJLEdBQUcsQ0FBQzthQUN2QjtpQkFBTTtnQkFDTCxNQUFNLCtEQUErRCxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDckY7WUFDRCxjQUFjLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxjQUFjLENBQUM7U0FDMUU7YUFBTTtZQUNMLElBQUksR0FBRyxHQUFHLENBQUM7WUFDWCxjQUFjLEdBQUcsR0FBRyxDQUFDO1NBQ3RCO1FBRUQsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2YsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekYsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1RDthQUFNO1lBQ0gsSUFBSSxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3BDLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7b0JBQ3JELFdBQVcsR0FBRyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQzVDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUN4SDtxQkFBTTtvQkFDSCxXQUFXLEdBQUcscUJBQXFCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUM1QyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNsSDthQUNKO2lCQUFNO2dCQUNILE1BQU0sSUFBSSxTQUFTLENBQUMsa0JBQWtCLE1BQU0sQ0FBQyxJQUFJLGVBQWUsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMxRztTQUNKO1FBRUQsV0FBVyxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztRQUNwRSxXQUFXLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUU1QyxJQUFJLFdBQVcsWUFBWSxhQUFhLEVBQUU7WUFDeEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNsQztRQUVELE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFFTyxjQUFjLENBQUMsWUFBMkI7UUFDaEQsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0IsWUFBWSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ2pDLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Rm9ybVByb3BlcnR5LCBQcm9wZXJ0eUdyb3VwfSBmcm9tICcuL2Zvcm1wcm9wZXJ0eSc7XG5pbXBvcnQge1NjaGVtYVZhbGlkYXRvckZhY3Rvcnl9IGZyb20gJy4uL3NjaGVtYXZhbGlkYXRvcmZhY3RvcnknO1xuaW1wb3J0IHtWYWxpZGF0b3JSZWdpc3RyeX0gZnJvbSAnLi92YWxpZGF0b3JyZWdpc3RyeSc7XG5pbXBvcnQge1Byb3BlcnR5QmluZGluZ1JlZ2lzdHJ5fSBmcm9tICcuLi9wcm9wZXJ0eS1iaW5kaW5nLXJlZ2lzdHJ5JztcbmltcG9ydCB7IEV4cHJlc3Npb25Db21waWxlckZhY3RvcnkgfSBmcm9tICcuLi9leHByZXNzaW9uLWNvbXBpbGVyLWZhY3RvcnknO1xuaW1wb3J0IHsgUFJPUEVSVFlfVFlQRV9NQVBQSU5HIH0gZnJvbSAnLi90eXBlbWFwcGluZyc7XG5cbmV4cG9ydCBjbGFzcyBGb3JtUHJvcGVydHlGYWN0b3J5IHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNjaGVtYVZhbGlkYXRvckZhY3Rvcnk6IFNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHByaXZhdGUgdmFsaWRhdG9yUmVnaXN0cnk6IFZhbGlkYXRvclJlZ2lzdHJ5LFxuICAgICAgICAgICAgICBwcml2YXRlIHByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5OiBQcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBleHByZXNzaW9uQ29tcGlsZXJGYWN0b3J5OiBFeHByZXNzaW9uQ29tcGlsZXJGYWN0b3J5KSB7XG4gIH1cblxuICBjcmVhdGVQcm9wZXJ0eShzY2hlbWE6IGFueSwgcGFyZW50OiBQcm9wZXJ0eUdyb3VwID0gbnVsbCwgcHJvcGVydHlJZD86IHN0cmluZyk6IEZvcm1Qcm9wZXJ0eSB7XG4gICAgbGV0IG5ld1Byb3BlcnR5ID0gbnVsbDtcbiAgICBsZXQgcGF0aCA9ICcnO1xuICAgIGxldCBfY2Fub25pY2FsUGF0aCA9ICcnO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhdGggKz0gcGFyZW50LnBhdGg7XG4gICAgICBpZiAocGFyZW50LnBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICBwYXRoICs9ICcvJztcbiAgICAgICAgX2Nhbm9uaWNhbFBhdGggKz0gJy8nO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmVudC50eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBwYXRoICs9IHByb3BlcnR5SWQ7XG4gICAgICAgIF9jYW5vbmljYWxQYXRoICs9IHByb3BlcnR5SWQ7XG4gICAgICB9IGVsc2UgaWYgKHBhcmVudC50eXBlID09PSAnYXJyYXknKSB7XG4gICAgICAgIHBhdGggKz0gJyonO1xuICAgICAgICBfY2Fub25pY2FsUGF0aCArPSAnKic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyAnSW5zdGFuY2lhdGlvbiBvZiBhIEZvcm1Qcm9wZXJ0eSB3aXRoIGFuIHVua25vd24gcGFyZW50IHR5cGU6ICcgKyBwYXJlbnQudHlwZTtcbiAgICAgIH1cbiAgICAgIF9jYW5vbmljYWxQYXRoID0gKHBhcmVudC5fY2Fub25pY2FsUGF0aCB8fCBwYXJlbnQucGF0aCkgKyBfY2Fub25pY2FsUGF0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgcGF0aCA9ICcvJztcbiAgICAgIF9jYW5vbmljYWxQYXRoID0gJy8nO1xuICAgIH1cblxuICAgIGlmIChzY2hlbWEuJHJlZikge1xuICAgICAgY29uc3QgcmVmU2NoZW1hID0gdGhpcy5zY2hlbWFWYWxpZGF0b3JGYWN0b3J5LmdldFNjaGVtYShwYXJlbnQucm9vdC5zY2hlbWEsIHNjaGVtYS4kcmVmKTtcbiAgICAgIG5ld1Byb3BlcnR5ID0gdGhpcy5jcmVhdGVQcm9wZXJ0eShyZWZTY2hlbWEsIHBhcmVudCwgcGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKFBST1BFUlRZX1RZUEVfTUFQUElOR1tzY2hlbWEudHlwZV0pIHtcbiAgICAgICAgICAgIGlmIChzY2hlbWEudHlwZSA9PT0gJ29iamVjdCcgfHwgc2NoZW1hLnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgICAgICAgICAgICBuZXdQcm9wZXJ0eSA9IFBST1BFUlRZX1RZUEVfTUFQUElOR1tzY2hlbWEudHlwZV0oXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZW1hVmFsaWRhdG9yRmFjdG9yeSwgdGhpcy52YWxpZGF0b3JSZWdpc3RyeSwgdGhpcy5leHByZXNzaW9uQ29tcGlsZXJGYWN0b3J5LCBzY2hlbWEsIHBhcmVudCwgcGF0aCwgdGhpcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1Byb3BlcnR5ID0gUFJPUEVSVFlfVFlQRV9NQVBQSU5HW3NjaGVtYS50eXBlXShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LCB0aGlzLmV4cHJlc3Npb25Db21waWxlckZhY3RvcnksIHNjaGVtYSwgcGFyZW50LCBwYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFVuZGVmaW5lZCB0eXBlICR7c2NoZW1hLnR5cGV9IChleGlzdGluZzogJHtPYmplY3Qua2V5cyhQUk9QRVJUWV9UWVBFX01BUFBJTkcpfSlgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5ld1Byb3BlcnR5Ll9wcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeSA9IHRoaXMucHJvcGVydHlCaW5kaW5nUmVnaXN0cnk7XG4gICAgbmV3UHJvcGVydHkuX2Nhbm9uaWNhbFBhdGggPSBfY2Fub25pY2FsUGF0aDtcblxuICAgIGlmIChuZXdQcm9wZXJ0eSBpbnN0YW5jZW9mIFByb3BlcnR5R3JvdXApIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZVJvb3QobmV3UHJvcGVydHkpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdQcm9wZXJ0eTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVJvb3Qocm9vdFByb3BlcnR5OiBQcm9wZXJ0eUdyb3VwKSB7XG4gICAgcm9vdFByb3BlcnR5LnJlc2V0KG51bGwsIHRydWUpO1xuICAgIHJvb3RQcm9wZXJ0eS5fYmluZFZpc2liaWxpdHkoKTtcbiAgfVxufVxuIl19