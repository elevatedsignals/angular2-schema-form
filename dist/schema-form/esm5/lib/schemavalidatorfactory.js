import { __decorate, __extends, __metadata } from "tslib";
import * as ZSchema from 'z-schema';
import { Injectable } from "@angular/core";
var SchemaValidatorFactory = /** @class */ (function () {
    function SchemaValidatorFactory() {
    }
    /**
     * Override this method to reset the schema validator instance.<br/>
     * This may be required since some schema validators keep a deep copy<br/>
     * of your schemas and changes at runtime are not recognized by the schema validator.<br/>
     * In this method you should either re-instantiate the schema validator or
     * clear its cache.<br/>
     * Example of re-instantiating schema validator
     * <code>
     *     reset(){
     *         this.zschema = new ZSchema({})
     *     }
     * </code>
     * <br/>
     * Since this method it self does nothing there is <br/>
     * no need to call the <code>super.reset()</code>
     */
    SchemaValidatorFactory.prototype.reset = function () {
    };
    return SchemaValidatorFactory;
}());
export { SchemaValidatorFactory };
var ZSchemaValidatorFactory = /** @class */ (function (_super) {
    __extends(ZSchemaValidatorFactory, _super);
    function ZSchemaValidatorFactory() {
        var _this = _super.call(this) || this;
        _this.createSchemaValidator();
        return _this;
    }
    ZSchemaValidatorFactory.prototype.createSchemaValidator = function () {
        this.zschema = new ZSchema({
            breakOnFirstError: false
        });
    };
    ZSchemaValidatorFactory.prototype.reset = function () {
        this.createSchemaValidator();
    };
    ZSchemaValidatorFactory.prototype.createValidatorFn = function (schema) {
        var _this = this;
        return function (value) {
            if (schema.type === 'number' || schema.type === 'integer') {
                value = +value;
            }
            _this.zschema.validate(value, schema);
            var err = _this.zschema.getLastErrors();
            _this.denormalizeRequiredPropertyPaths(err);
            return err || null;
        };
    };
    ZSchemaValidatorFactory.prototype.getSchema = function (schema, ref) {
        // check definitions are valid
        var isValid = this.zschema.compileSchema(schema);
        if (isValid) {
            return this.getDefinition(schema, ref);
        }
        else {
            throw this.zschema.getLastError();
        }
    };
    ZSchemaValidatorFactory.prototype.denormalizeRequiredPropertyPaths = function (err) {
        if (err && err.length) {
            err = err.map(function (error) {
                if (error.path === '#/' && error.code === 'OBJECT_MISSING_REQUIRED_PROPERTY') {
                    error.path = "" + error.path + error.params[0];
                }
                return error;
            });
        }
    };
    ZSchemaValidatorFactory.prototype.getDefinition = function (schema, ref) {
        var foundSchema = schema;
        ref.split('/').slice(1).forEach(function (ptr) {
            if (ptr) {
                foundSchema = foundSchema[ptr];
            }
        });
        return foundSchema;
    };
    ZSchemaValidatorFactory = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], ZSchemaValidatorFactory);
    return ZSchemaValidatorFactory;
}(SchemaValidatorFactory));
export { ZSchemaValidatorFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hdmFsaWRhdG9yZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9zY2hlbWF2YWxpZGF0b3JmYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUNwQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDO0lBQUE7SUF3QkEsQ0FBQztJQW5CQzs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxzQ0FBSyxHQUFMO0lBRUEsQ0FBQztJQUNILDZCQUFDO0FBQUQsQ0FBQyxBQXhCRCxJQXdCQzs7QUFHRDtJQUE2QywyQ0FBc0I7SUFJakU7UUFBQSxZQUNFLGlCQUFPLFNBRVI7UUFEQyxLQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQTs7SUFDOUIsQ0FBQztJQUVPLHVEQUFxQixHQUE3QjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUksSUFBSSxPQUFPLENBQUM7WUFDMUIsaUJBQWlCLEVBQUUsS0FBSztTQUN6QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsdUNBQUssR0FBTDtRQUNFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFBO0lBQzlCLENBQUM7SUFFRCxtREFBaUIsR0FBakIsVUFBa0IsTUFBVztRQUE3QixpQkFjQztRQWJDLE9BQU8sVUFBQyxLQUFLO1lBRVgsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDekQsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDO2FBQ2hCO1lBRUQsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLElBQUksR0FBRyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFdkMsS0FBSSxDQUFDLGdDQUFnQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTNDLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQztRQUNyQixDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsMkNBQVMsR0FBVCxVQUFVLE1BQVcsRUFBRSxHQUFXO1FBQ2hDLDhCQUE4QjtRQUM5QixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRCxJQUFJLE9BQU8sRUFBRTtZQUNYLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDeEM7YUFBTTtZQUNMLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNuQztJQUNILENBQUM7SUFFTyxrRUFBZ0MsR0FBeEMsVUFBeUMsR0FBVTtRQUNqRCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQ3JCLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSztnQkFDakIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGtDQUFrQyxFQUFFO29CQUM1RSxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBRyxDQUFDO2lCQUNoRDtnQkFDRCxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRU8sK0NBQWEsR0FBckIsVUFBc0IsTUFBVyxFQUFFLEdBQVc7UUFDNUMsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDakMsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsV0FBVyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNoQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQWhFVSx1QkFBdUI7UUFEbkMsVUFBVSxFQUFFOztPQUNBLHVCQUF1QixDQWlFbkM7SUFBRCw4QkFBQztDQUFBLEFBakVELENBQTZDLHNCQUFzQixHQWlFbEU7U0FqRVksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgWlNjaGVtYSBmcm9tICd6LXNjaGVtYSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNjaGVtYVZhbGlkYXRvckZhY3Rvcnkge1xuICBhYnN0cmFjdCBjcmVhdGVWYWxpZGF0b3JGbihzY2hlbWEpOiAodmFsdWU6IGFueSkgPT4gYW55O1xuXG4gIGFic3RyYWN0IGdldFNjaGVtYShzY2hlbWEsIHJlZik6IGFueTtcblxuICAvKipcbiAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcmVzZXQgdGhlIHNjaGVtYSB2YWxpZGF0b3IgaW5zdGFuY2UuPGJyLz5cbiAgICogVGhpcyBtYXkgYmUgcmVxdWlyZWQgc2luY2Ugc29tZSBzY2hlbWEgdmFsaWRhdG9ycyBrZWVwIGEgZGVlcCBjb3B5PGJyLz5cbiAgICogb2YgeW91ciBzY2hlbWFzIGFuZCBjaGFuZ2VzIGF0IHJ1bnRpbWUgYXJlIG5vdCByZWNvZ25pemVkIGJ5IHRoZSBzY2hlbWEgdmFsaWRhdG9yLjxici8+XG4gICAqIEluIHRoaXMgbWV0aG9kIHlvdSBzaG91bGQgZWl0aGVyIHJlLWluc3RhbnRpYXRlIHRoZSBzY2hlbWEgdmFsaWRhdG9yIG9yXG4gICAqIGNsZWFyIGl0cyBjYWNoZS48YnIvPlxuICAgKiBFeGFtcGxlIG9mIHJlLWluc3RhbnRpYXRpbmcgc2NoZW1hIHZhbGlkYXRvclxuICAgKiA8Y29kZT5cbiAgICogICAgIHJlc2V0KCl7XG4gICAqICAgICAgICAgdGhpcy56c2NoZW1hID0gbmV3IFpTY2hlbWEoe30pXG4gICAqICAgICB9XG4gICAqIDwvY29kZT5cbiAgICogPGJyLz5cbiAgICogU2luY2UgdGhpcyBtZXRob2QgaXQgc2VsZiBkb2VzIG5vdGhpbmcgdGhlcmUgaXMgPGJyLz5cbiAgICogbm8gbmVlZCB0byBjYWxsIHRoZSA8Y29kZT5zdXBlci5yZXNldCgpPC9jb2RlPlxuICAgKi9cbiAgcmVzZXQoKSB7XG5cbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgWlNjaGVtYVZhbGlkYXRvckZhY3RvcnkgZXh0ZW5kcyBTY2hlbWFWYWxpZGF0b3JGYWN0b3J5IHtcblxuICBwcm90ZWN0ZWQgenNjaGVtYTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY3JlYXRlU2NoZW1hVmFsaWRhdG9yKClcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlU2NoZW1hVmFsaWRhdG9yKCkge1xuICAgIHRoaXMuenNjaGVtYSA9ICBuZXcgWlNjaGVtYSh7XG4gICAgICBicmVha09uRmlyc3RFcnJvcjogZmFsc2VcbiAgICB9KTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuY3JlYXRlU2NoZW1hVmFsaWRhdG9yKClcbiAgfVxuXG4gIGNyZWF0ZVZhbGlkYXRvckZuKHNjaGVtYTogYW55KSB7XG4gICAgcmV0dXJuICh2YWx1ZSk6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9ID0+IHtcblxuICAgICAgaWYgKHNjaGVtYS50eXBlID09PSAnbnVtYmVyJyB8fCBzY2hlbWEudHlwZSA9PT0gJ2ludGVnZXInKSB7XG4gICAgICAgIHZhbHVlID0gK3ZhbHVlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnpzY2hlbWEudmFsaWRhdGUodmFsdWUsIHNjaGVtYSk7XG4gICAgICBsZXQgZXJyID0gdGhpcy56c2NoZW1hLmdldExhc3RFcnJvcnMoKTtcblxuICAgICAgdGhpcy5kZW5vcm1hbGl6ZVJlcXVpcmVkUHJvcGVydHlQYXRocyhlcnIpO1xuXG4gICAgICByZXR1cm4gZXJyIHx8IG51bGw7XG4gICAgfTtcbiAgfVxuXG4gIGdldFNjaGVtYShzY2hlbWE6IGFueSwgcmVmOiBzdHJpbmcpIHtcbiAgICAvLyBjaGVjayBkZWZpbml0aW9ucyBhcmUgdmFsaWRcbiAgICBjb25zdCBpc1ZhbGlkID0gdGhpcy56c2NoZW1hLmNvbXBpbGVTY2hlbWEoc2NoZW1hKTtcbiAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0RGVmaW5pdGlvbihzY2hlbWEsIHJlZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IHRoaXMuenNjaGVtYS5nZXRMYXN0RXJyb3IoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlbm9ybWFsaXplUmVxdWlyZWRQcm9wZXJ0eVBhdGhzKGVycjogYW55W10pIHtcbiAgICBpZiAoZXJyICYmIGVyci5sZW5ndGgpIHtcbiAgICAgIGVyciA9IGVyci5tYXAoZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IucGF0aCA9PT0gJyMvJyAmJiBlcnJvci5jb2RlID09PSAnT0JKRUNUX01JU1NJTkdfUkVRVUlSRURfUFJPUEVSVFknKSB7XG4gICAgICAgICAgZXJyb3IucGF0aCA9IGAke2Vycm9yLnBhdGh9JHtlcnJvci5wYXJhbXNbMF19YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldERlZmluaXRpb24oc2NoZW1hOiBhbnksIHJlZjogc3RyaW5nKSB7XG4gICAgbGV0IGZvdW5kU2NoZW1hID0gc2NoZW1hO1xuICAgIHJlZi5zcGxpdCgnLycpLnNsaWNlKDEpLmZvckVhY2gocHRyID0+IHtcbiAgICAgIGlmIChwdHIpIHtcbiAgICAgICAgZm91bmRTY2hlbWEgPSBmb3VuZFNjaGVtYVtwdHJdO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmb3VuZFNjaGVtYTtcbiAgfVxufVxuXG4iXX0=