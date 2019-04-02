/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as ZSchema from 'z-schema';
/**
 * @abstract
 */
export class SchemaValidatorFactory {
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
     * @return {?}
     */
    reset() {
    }
}
if (false) {
    /**
     * @abstract
     * @param {?} schema
     * @return {?}
     */
    SchemaValidatorFactory.prototype.createValidatorFn = function (schema) { };
    /**
     * @abstract
     * @param {?} schema
     * @param {?} ref
     * @return {?}
     */
    SchemaValidatorFactory.prototype.getSchema = function (schema, ref) { };
}
export class ZSchemaValidatorFactory extends SchemaValidatorFactory {
    constructor() {
        super();
        this.createSchemaValidator();
    }
    /**
     * @return {?}
     */
    createSchemaValidator() {
        this.zschema = new ZSchema({
            breakOnFirstError: false
        });
    }
    /**
     * @return {?}
     */
    reset() {
        this.createSchemaValidator();
    }
    /**
     * @param {?} schema
     * @return {?}
     */
    createValidatorFn(schema) {
        return (value) => {
            if (schema.type === 'number' || schema.type === 'integer') {
                value = +value;
            }
            this.zschema.validate(value, schema);
            /** @type {?} */
            let err = this.zschema.getLastErrors();
            this.denormalizeRequiredPropertyPaths(err);
            return err || null;
        };
    }
    /**
     * @param {?} schema
     * @param {?} ref
     * @return {?}
     */
    getSchema(schema, ref) {
        // check definitions are valid
        /** @type {?} */
        const isValid = this.zschema.compileSchema(schema);
        if (isValid) {
            return this.getDefinition(schema, ref);
        }
        else {
            throw this.zschema.getLastError();
        }
    }
    /**
     * @param {?} err
     * @return {?}
     */
    denormalizeRequiredPropertyPaths(err) {
        if (err && err.length) {
            err = err.map(error => {
                if (error.path === '#/' && error.code === 'OBJECT_MISSING_REQUIRED_PROPERTY') {
                    error.path = `${error.path}${error.params[0]}`;
                }
                return error;
            });
        }
    }
    /**
     * @param {?} schema
     * @param {?} ref
     * @return {?}
     */
    getDefinition(schema, ref) {
        /** @type {?} */
        let foundSchema = schema;
        ref.split('/').slice(1).forEach(ptr => {
            if (ptr) {
                foundSchema = foundSchema[ptr];
            }
        });
        return foundSchema;
    }
}
if (false) {
    /** @type {?} */
    ZSchemaValidatorFactory.prototype.zschema;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hdmFsaWRhdG9yZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9zY2hlbWF2YWxpZGF0b3JmYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQzs7OztBQUVwQyxNQUFNLE9BQWdCLHNCQUFzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcUIxQyxLQUFLO0lBRUwsQ0FBQztDQUNGOzs7Ozs7O0lBdkJDLDJFQUF3RDs7Ozs7OztJQUV4RCx3RUFBcUM7O0FBdUJ2QyxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsc0JBQXNCO0lBSWpFO1FBQ0UsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQTtJQUM5QixDQUFDOzs7O0lBRU8scUJBQXFCO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUksSUFBSSxPQUFPLENBQUM7WUFDMUIsaUJBQWlCLEVBQUUsS0FBSztTQUN6QixDQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFBO0lBQzlCLENBQUM7Ozs7O0lBRUQsaUJBQWlCLENBQUMsTUFBVztRQUMzQixPQUFPLENBQUMsS0FBSyxFQUE4QixFQUFFO1lBRTNDLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7Z0JBQ3pELEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQzthQUNoQjtZQUVELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQzs7Z0JBQ2pDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTtZQUV0QyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFM0MsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDO1FBQ3JCLENBQUMsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVELFNBQVMsQ0FBQyxNQUFXLEVBQUUsR0FBVzs7O2NBRTFCLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDbEQsSUFBSSxPQUFPLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3hDO2FBQU07WUFDTCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDbkM7SUFDSCxDQUFDOzs7OztJQUVPLGdDQUFnQyxDQUFDLEdBQVU7UUFDakQsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUNyQixHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDcEIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGtDQUFrQyxFQUFFO29CQUM1RSxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7aUJBQ2hEO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7OztJQUVPLGFBQWEsQ0FBQyxNQUFXLEVBQUUsR0FBVzs7WUFDeEMsV0FBVyxHQUFHLE1BQU07UUFDeEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3BDLElBQUksR0FBRyxFQUFFO2dCQUNQLFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDaEM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7Q0FDRjs7O0lBL0RDLDBDQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFpTY2hlbWEgZnJvbSAnei1zY2hlbWEnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU2NoZW1hVmFsaWRhdG9yRmFjdG9yeSB7XG4gIGFic3RyYWN0IGNyZWF0ZVZhbGlkYXRvckZuKHNjaGVtYSk6ICh2YWx1ZTogYW55KSA9PiBhbnk7XG5cbiAgYWJzdHJhY3QgZ2V0U2NoZW1hKHNjaGVtYSwgcmVmKTogYW55O1xuXG4gIC8qKlxuICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCB0byByZXNldCB0aGUgc2NoZW1hIHZhbGlkYXRvciBpbnN0YW5jZS48YnIvPlxuICAgKiBUaGlzIG1heSBiZSByZXF1aXJlZCBzaW5jZSBzb21lIHNjaGVtYSB2YWxpZGF0b3JzIGtlZXAgYSBkZWVwIGNvcHk8YnIvPlxuICAgKiBvZiB5b3VyIHNjaGVtYXMgYW5kIGNoYW5nZXMgYXQgcnVudGltZSBhcmUgbm90IHJlY29nbml6ZWQgYnkgdGhlIHNjaGVtYSB2YWxpZGF0b3IuPGJyLz5cbiAgICogSW4gdGhpcyBtZXRob2QgeW91IHNob3VsZCBlaXRoZXIgcmUtaW5zdGFudGlhdGUgdGhlIHNjaGVtYSB2YWxpZGF0b3Igb3JcbiAgICogY2xlYXIgaXRzIGNhY2hlLjxici8+XG4gICAqIEV4YW1wbGUgb2YgcmUtaW5zdGFudGlhdGluZyBzY2hlbWEgdmFsaWRhdG9yXG4gICAqIDxjb2RlPlxuICAgKiAgICAgcmVzZXQoKXtcbiAgICogICAgICAgICB0aGlzLnpzY2hlbWEgPSBuZXcgWlNjaGVtYSh7fSlcbiAgICogICAgIH1cbiAgICogPC9jb2RlPlxuICAgKiA8YnIvPlxuICAgKiBTaW5jZSB0aGlzIG1ldGhvZCBpdCBzZWxmIGRvZXMgbm90aGluZyB0aGVyZSBpcyA8YnIvPlxuICAgKiBubyBuZWVkIHRvIGNhbGwgdGhlIDxjb2RlPnN1cGVyLnJlc2V0KCk8L2NvZGU+XG4gICAqL1xuICByZXNldCgpIHtcblxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBaU2NoZW1hVmFsaWRhdG9yRmFjdG9yeSBleHRlbmRzIFNjaGVtYVZhbGlkYXRvckZhY3Rvcnkge1xuXG4gIHByb3RlY3RlZCB6c2NoZW1hO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jcmVhdGVTY2hlbWFWYWxpZGF0b3IoKVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVTY2hlbWFWYWxpZGF0b3IoKSB7XG4gICAgdGhpcy56c2NoZW1hID0gIG5ldyBaU2NoZW1hKHtcbiAgICAgIGJyZWFrT25GaXJzdEVycm9yOiBmYWxzZVxuICAgIH0pO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5jcmVhdGVTY2hlbWFWYWxpZGF0b3IoKVxuICB9XG5cbiAgY3JlYXRlVmFsaWRhdG9yRm4oc2NoZW1hOiBhbnkpIHtcbiAgICByZXR1cm4gKHZhbHVlKTogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPT4ge1xuXG4gICAgICBpZiAoc2NoZW1hLnR5cGUgPT09ICdudW1iZXInIHx8IHNjaGVtYS50eXBlID09PSAnaW50ZWdlcicpIHtcbiAgICAgICAgdmFsdWUgPSArdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuenNjaGVtYS52YWxpZGF0ZSh2YWx1ZSwgc2NoZW1hKTtcbiAgICAgIGxldCBlcnIgPSB0aGlzLnpzY2hlbWEuZ2V0TGFzdEVycm9ycygpO1xuXG4gICAgICB0aGlzLmRlbm9ybWFsaXplUmVxdWlyZWRQcm9wZXJ0eVBhdGhzKGVycik7XG5cbiAgICAgIHJldHVybiBlcnIgfHwgbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgZ2V0U2NoZW1hKHNjaGVtYTogYW55LCByZWY6IHN0cmluZykge1xuICAgIC8vIGNoZWNrIGRlZmluaXRpb25zIGFyZSB2YWxpZFxuICAgIGNvbnN0IGlzVmFsaWQgPSB0aGlzLnpzY2hlbWEuY29tcGlsZVNjaGVtYShzY2hlbWEpO1xuICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXREZWZpbml0aW9uKHNjaGVtYSwgcmVmKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgdGhpcy56c2NoZW1hLmdldExhc3RFcnJvcigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGVub3JtYWxpemVSZXF1aXJlZFByb3BlcnR5UGF0aHMoZXJyOiBhbnlbXSkge1xuICAgIGlmIChlcnIgJiYgZXJyLmxlbmd0aCkge1xuICAgICAgZXJyID0gZXJyLm1hcChlcnJvciA9PiB7XG4gICAgICAgIGlmIChlcnJvci5wYXRoID09PSAnIy8nICYmIGVycm9yLmNvZGUgPT09ICdPQkpFQ1RfTUlTU0lOR19SRVFVSVJFRF9QUk9QRVJUWScpIHtcbiAgICAgICAgICBlcnJvci5wYXRoID0gYCR7ZXJyb3IucGF0aH0ke2Vycm9yLnBhcmFtc1swXX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGVmaW5pdGlvbihzY2hlbWE6IGFueSwgcmVmOiBzdHJpbmcpIHtcbiAgICBsZXQgZm91bmRTY2hlbWEgPSBzY2hlbWE7XG4gICAgcmVmLnNwbGl0KCcvJykuc2xpY2UoMSkuZm9yRWFjaChwdHIgPT4ge1xuICAgICAgaWYgKHB0cikge1xuICAgICAgICBmb3VuZFNjaGVtYSA9IGZvdW5kU2NoZW1hW3B0cl07XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvdW5kU2NoZW1hO1xuICB9XG59XG5cbiJdfQ==