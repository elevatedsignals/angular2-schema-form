/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { isBlank } from './utils';
/**
 * @param {?} message
 * @param {?} path
 * @return {?}
 */
function formatMessage(message, path) {
    return "Parsing error on " + path + ": " + message;
}
/**
 * @param {?} message
 * @param {?} path
 * @return {?}
 */
function schemaError(message, path) {
    /** @type {?} */
    var mesg = formatMessage(message, path);
    throw new Error(mesg);
}
/**
 * @param {?} message
 * @param {?} path
 * @return {?}
 */
function schemaWarning(message, path) {
    /** @type {?} */
    var mesg = formatMessage(message, path);
    throw new Error(mesg);
}
var SchemaPreprocessor = /** @class */ (function () {
    function SchemaPreprocessor() {
    }
    /**
     * @param {?} jsonSchema
     * @param {?=} path
     * @return {?}
     */
    SchemaPreprocessor.preprocess = /**
     * @param {?} jsonSchema
     * @param {?=} path
     * @return {?}
     */
    function (jsonSchema, path) {
        if (path === void 0) { path = '/'; }
        jsonSchema = jsonSchema || {};
        SchemaPreprocessor.normalizeExtensions(jsonSchema);
        if (jsonSchema.type === 'object') {
            SchemaPreprocessor.checkProperties(jsonSchema, path);
            SchemaPreprocessor.checkAndCreateFieldsets(jsonSchema, path);
        }
        else if (jsonSchema.type === 'array') {
            SchemaPreprocessor.checkItems(jsonSchema, path);
        }
        SchemaPreprocessor.normalizeWidget(jsonSchema);
        SchemaPreprocessor.recursiveCheck(jsonSchema, path);
    };
    /**
     * @param {?} jsonSchema
     * @param {?} path
     * @return {?}
     */
    SchemaPreprocessor.checkProperties = /**
     * @param {?} jsonSchema
     * @param {?} path
     * @return {?}
     */
    function (jsonSchema, path) {
        if (isBlank(jsonSchema.properties)) {
            jsonSchema.properties = {};
            schemaWarning('Provided json schema does not contain a \'properties\' entry. Output schema will be empty', path);
        }
    };
    /**
     * @param {?} jsonSchema
     * @param {?} path
     * @return {?}
     */
    SchemaPreprocessor.checkAndCreateFieldsets = /**
     * @param {?} jsonSchema
     * @param {?} path
     * @return {?}
     */
    function (jsonSchema, path) {
        if (jsonSchema.fieldsets === undefined) {
            if (jsonSchema.order !== undefined) {
                SchemaPreprocessor.replaceOrderByFieldsets(jsonSchema);
            }
            else {
                SchemaPreprocessor.createFieldsets(jsonSchema);
            }
        }
        SchemaPreprocessor.checkFieldsUsage(jsonSchema, path);
    };
    /**
     * @param {?} jsonSchema
     * @param {?} path
     * @return {?}
     */
    SchemaPreprocessor.checkFieldsUsage = /**
     * @param {?} jsonSchema
     * @param {?} path
     * @return {?}
     */
    function (jsonSchema, path) {
        var e_1, _a, e_2, _b, e_3, _c;
        /** @type {?} */
        var fieldsId = Object.keys(jsonSchema.properties);
        /** @type {?} */
        var usedFields = {};
        try {
            for (var _d = tslib_1.__values(jsonSchema.fieldsets), _e = _d.next(); !_e.done; _e = _d.next()) {
                var fieldset = _e.value;
                try {
                    for (var _f = tslib_1.__values(fieldset.fields), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var fieldId = _g.value;
                        if (usedFields[fieldId] === undefined) {
                            usedFields[fieldId] = [];
                        }
                        usedFields[fieldId].push(fieldset.id);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var fieldsId_1 = tslib_1.__values(fieldsId), fieldsId_1_1 = fieldsId_1.next(); !fieldsId_1_1.done; fieldsId_1_1 = fieldsId_1.next()) {
                var fieldId = fieldsId_1_1.value;
                /** @type {?} */
                var isRequired = jsonSchema.required && jsonSchema.required.indexOf(fieldId) > -1;
                if (isRequired && jsonSchema.properties[fieldId]) {
                    jsonSchema.properties[fieldId].isRequired = true;
                }
                if (usedFields.hasOwnProperty(fieldId)) {
                    if (usedFields[fieldId].length > 1) {
                        schemaError(fieldId + " is referenced by more than one fieldset: " + usedFields[fieldId], path);
                    }
                    delete usedFields[fieldId];
                }
                else if (isRequired) {
                    schemaError(fieldId + " is a required field but it is not referenced as part of a 'order' or a 'fieldset' property", path);
                }
                else {
                    delete jsonSchema[fieldId];
                    schemaWarning("Removing unreferenced field " + fieldId, path);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (fieldsId_1_1 && !fieldsId_1_1.done && (_c = fieldsId_1.return)) _c.call(fieldsId_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        for (var remainingfieldsId in usedFields) {
            if (usedFields.hasOwnProperty(remainingfieldsId)) {
                schemaWarning("Referencing non-existent field " + remainingfieldsId + " in one or more fieldsets", path);
            }
        }
    };
    /**
     * @param {?} jsonSchema
     * @return {?}
     */
    SchemaPreprocessor.createFieldsets = /**
     * @param {?} jsonSchema
     * @return {?}
     */
    function (jsonSchema) {
        jsonSchema.order = Object.keys(jsonSchema.properties);
        SchemaPreprocessor.replaceOrderByFieldsets(jsonSchema);
    };
    /**
     * @param {?} jsonSchema
     * @return {?}
     */
    SchemaPreprocessor.replaceOrderByFieldsets = /**
     * @param {?} jsonSchema
     * @return {?}
     */
    function (jsonSchema) {
        jsonSchema.fieldsets = [{
                id: 'fieldset-default',
                title: jsonSchema.title || '',
                description: jsonSchema.description || '',
                name: jsonSchema.name || '',
                fields: jsonSchema.order
            }];
        delete jsonSchema.order;
    };
    /**
     * @param {?} fieldSchema
     * @return {?}
     */
    SchemaPreprocessor.normalizeWidget = /**
     * @param {?} fieldSchema
     * @return {?}
     */
    function (fieldSchema) {
        /** @type {?} */
        var widget = fieldSchema.widget;
        if (widget === undefined) {
            widget = { 'id': fieldSchema.type };
        }
        else if (typeof widget === 'string') {
            widget = { 'id': widget };
        }
        fieldSchema.widget = widget;
    };
    /**
     * @param {?} jsonSchema
     * @param {?} path
     * @return {?}
     */
    SchemaPreprocessor.checkItems = /**
     * @param {?} jsonSchema
     * @param {?} path
     * @return {?}
     */
    function (jsonSchema, path) {
        if (jsonSchema.items === undefined) {
            schemaError('No \'items\' property in array', path);
        }
    };
    /**
     * @param {?} jsonSchema
     * @param {?} path
     * @return {?}
     */
    SchemaPreprocessor.recursiveCheck = /**
     * @param {?} jsonSchema
     * @param {?} path
     * @return {?}
     */
    function (jsonSchema, path) {
        if (jsonSchema.type === 'object') {
            for (var fieldId in jsonSchema.properties) {
                if (jsonSchema.properties.hasOwnProperty(fieldId)) {
                    /** @type {?} */
                    var fieldSchema = jsonSchema.properties[fieldId];
                    SchemaPreprocessor.preprocess(fieldSchema, path + fieldId + '/');
                }
            }
            if (jsonSchema.hasOwnProperty('definitions')) {
                for (var fieldId in jsonSchema.definitions) {
                    if (jsonSchema.definitions.hasOwnProperty(fieldId)) {
                        /** @type {?} */
                        var fieldSchema = jsonSchema.definitions[fieldId];
                        SchemaPreprocessor.removeRecursiveRefProperties(fieldSchema, "#/definitions/" + fieldId);
                        SchemaPreprocessor.preprocess(fieldSchema, path + fieldId + '/');
                    }
                }
            }
        }
        else if (jsonSchema.type === 'array') {
            SchemaPreprocessor.preprocess(jsonSchema.items, path + '*/');
        }
    };
    /**
     * @param {?} jsonSchema
     * @param {?} definitionPath
     * @return {?}
     */
    SchemaPreprocessor.removeRecursiveRefProperties = /**
     * @param {?} jsonSchema
     * @param {?} definitionPath
     * @return {?}
     */
    function (jsonSchema, definitionPath) {
        // to avoid infinite loop
        if (jsonSchema.type === 'object') {
            for (var fieldId in jsonSchema.properties) {
                if (jsonSchema.properties.hasOwnProperty(fieldId)) {
                    if (jsonSchema.properties[fieldId].$ref
                        && jsonSchema.properties[fieldId].$ref === definitionPath) {
                        delete jsonSchema.properties[fieldId];
                    }
                    else if (jsonSchema.properties[fieldId].type === 'object') {
                        SchemaPreprocessor.removeRecursiveRefProperties(jsonSchema.properties[fieldId], definitionPath);
                    }
                }
            }
        }
    };
    /**
     * Enables alias names for JSON schema extensions.
     *
     * Copies the value of each alias JSON schema property
     * to the JSON schema property of ngx-schema-form.
     *
     * @param schema JSON schema to enable alias names.
     */
    /**
     * Enables alias names for JSON schema extensions.
     *
     * Copies the value of each alias JSON schema property
     * to the JSON schema property of ngx-schema-form.
     *
     * @param {?} schema JSON schema to enable alias names.
     * @return {?}
     */
    SchemaPreprocessor.normalizeExtensions = /**
     * Enables alias names for JSON schema extensions.
     *
     * Copies the value of each alias JSON schema property
     * to the JSON schema property of ngx-schema-form.
     *
     * @param {?} schema JSON schema to enable alias names.
     * @return {?}
     */
    function (schema) {
        /** @type {?} */
        var extensions = [
            { name: "fieldsets", regex: /^x-?field-?sets$/i },
            { name: "widget", regex: /^x-?widget$/i },
            { name: "visibleIf", regex: /^x-?visible-?if$/i }
        ];
        /** @type {?} */
        var keys = Object.keys(schema);
        var _loop_1 = function (i) {
            /** @type {?} */
            var k = keys[i];
            /** @type {?} */
            var e = extensions.find(function (e) { return !!k.match(e.regex); });
            if (e) {
                /** @type {?} */
                var v = schema[k];
                /** @type {?} */
                var copy = JSON.parse(JSON.stringify(v));
                schema[e.name] = copy;
            }
        };
        for (var i = 0; i < keys.length; ++i) {
            _loop_1(i);
        }
    };
    return SchemaPreprocessor;
}());
export { SchemaPreprocessor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hcHJlcHJvY2Vzc29yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL21vZGVsL3NjaGVtYXByZXByb2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxTQUFTLENBQUM7Ozs7OztBQUVoQyxTQUFTLGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSTtJQUNsQyxPQUFPLHNCQUFvQixJQUFJLFVBQUssT0FBUyxDQUFDO0FBQ2hELENBQUM7Ozs7OztBQUVELFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJOztRQUM1QixJQUFJLEdBQUcsYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7SUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QixDQUFDOzs7Ozs7QUFFRCxTQUFTLGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSTs7UUFDOUIsSUFBSSxHQUFHLGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDO0lBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsQ0FBQztBQUVEO0lBQUE7SUFxS0EsQ0FBQzs7Ozs7O0lBbktRLDZCQUFVOzs7OztJQUFqQixVQUFrQixVQUFlLEVBQUUsSUFBVTtRQUFWLHFCQUFBLEVBQUEsVUFBVTtRQUMzQyxVQUFVLEdBQUcsVUFBVSxJQUFJLEVBQUUsQ0FBQztRQUM5QixrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuRCxJQUFJLFVBQVUsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQ2hDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckQsa0JBQWtCLENBQUMsdUJBQXVCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzlEO2FBQU0sSUFBSSxV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QUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUU7U0FDcEQ7O1lBQ0ssSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dDQUN2QixDQUFDOztnQkFDSixDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQzs7Z0JBQ1gsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQWxCLENBQWtCLENBQUM7WUFDaEQsSUFBSSxDQUFDLEVBQUU7O29CQUNELENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDOztvQkFDYixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQzthQUN2QjtRQUNILENBQUM7UUFSRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7b0JBQTNCLENBQUM7U0FRVDtJQUNILENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFyS0QsSUFxS0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzQmxhbmt9IGZyb20gJy4vdXRpbHMnO1xuXG5mdW5jdGlvbiBmb3JtYXRNZXNzYWdlKG1lc3NhZ2UsIHBhdGgpIHtcbiAgcmV0dXJuIGBQYXJzaW5nIGVycm9yIG9uICR7cGF0aH06ICR7bWVzc2FnZX1gO1xufVxuXG5mdW5jdGlvbiBzY2hlbWFFcnJvcihtZXNzYWdlLCBwYXRoKTogdm9pZCB7XG4gIGxldCBtZXNnID0gZm9ybWF0TWVzc2FnZShtZXNzYWdlLCBwYXRoKTtcbiAgdGhyb3cgbmV3IEVycm9yKG1lc2cpO1xufVxuXG5mdW5jdGlvbiBzY2hlbWFXYXJuaW5nKG1lc3NhZ2UsIHBhdGgpOiB2b2lkIHtcbiAgbGV0IG1lc2cgPSBmb3JtYXRNZXNzYWdlKG1lc3NhZ2UsIHBhdGgpO1xuICB0aHJvdyBuZXcgRXJyb3IobWVzZyk7XG59XG5cbmV4cG9ydCBjbGFzcyBTY2hlbWFQcmVwcm9jZXNzb3Ige1xuXG4gIHN0YXRpYyBwcmVwcm9jZXNzKGpzb25TY2hlbWE6IGFueSwgcGF0aCA9ICcvJyk6IGFueSB7XG4gICAganNvblNjaGVtYSA9IGpzb25TY2hlbWEgfHwge307XG4gICAgU2NoZW1hUHJlcHJvY2Vzc29yLm5vcm1hbGl6ZUV4dGVuc2lvbnMoanNvblNjaGVtYSk7XG4gICAgaWYgKGpzb25TY2hlbWEudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5jaGVja1Byb3BlcnRpZXMoanNvblNjaGVtYSwgcGF0aCk7XG4gICAgICBTY2hlbWFQcmVwcm9jZXNzb3IuY2hlY2tBbmRDcmVhdGVGaWVsZHNldHMoanNvblNjaGVtYSwgcGF0aCk7XG4gICAgfSBlbHNlIGlmIChqc29uU2NoZW1hLnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5jaGVja0l0ZW1zKGpzb25TY2hlbWEsIHBhdGgpO1xuICAgIH1cbiAgICBTY2hlbWFQcmVwcm9jZXNzb3Iubm9ybWFsaXplV2lkZ2V0KGpzb25TY2hlbWEpO1xuICAgIFNjaGVtYVByZXByb2Nlc3Nvci5yZWN1cnNpdmVDaGVjayhqc29uU2NoZW1hLCBwYXRoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNoZWNrUHJvcGVydGllcyhqc29uU2NoZW1hLCBwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoaXNCbGFuayhqc29uU2NoZW1hLnByb3BlcnRpZXMpKSB7XG4gICAgICBqc29uU2NoZW1hLnByb3BlcnRpZXMgPSB7fTtcbiAgICAgIHNjaGVtYVdhcm5pbmcoJ1Byb3ZpZGVkIGpzb24gc2NoZW1hIGRvZXMgbm90IGNvbnRhaW4gYSBcXCdwcm9wZXJ0aWVzXFwnIGVudHJ5LiBPdXRwdXQgc2NoZW1hIHdpbGwgYmUgZW1wdHknLCBwYXRoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjaGVja0FuZENyZWF0ZUZpZWxkc2V0cyhqc29uU2NoZW1hOiBhbnksIHBhdGg6IHN0cmluZykge1xuICAgIGlmIChqc29uU2NoZW1hLmZpZWxkc2V0cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoanNvblNjaGVtYS5vcmRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5yZXBsYWNlT3JkZXJCeUZpZWxkc2V0cyhqc29uU2NoZW1hKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5jcmVhdGVGaWVsZHNldHMoanNvblNjaGVtYSk7XG4gICAgICB9XG4gICAgfVxuICAgIFNjaGVtYVByZXByb2Nlc3Nvci5jaGVja0ZpZWxkc1VzYWdlKGpzb25TY2hlbWEsIHBhdGgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgY2hlY2tGaWVsZHNVc2FnZShqc29uU2NoZW1hLCBwYXRoOiBzdHJpbmcpIHtcbiAgICBsZXQgZmllbGRzSWQ6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoanNvblNjaGVtYS5wcm9wZXJ0aWVzKTtcbiAgICBsZXQgdXNlZEZpZWxkcyA9IHt9O1xuICAgIGZvciAobGV0IGZpZWxkc2V0IG9mIGpzb25TY2hlbWEuZmllbGRzZXRzKSB7XG4gICAgICBmb3IgKGxldCBmaWVsZElkIG9mIGZpZWxkc2V0LmZpZWxkcykge1xuICAgICAgICBpZiAodXNlZEZpZWxkc1tmaWVsZElkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdXNlZEZpZWxkc1tmaWVsZElkXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHVzZWRGaWVsZHNbZmllbGRJZF0ucHVzaChmaWVsZHNldC5pZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBmaWVsZElkIG9mIGZpZWxkc0lkKSB7XG4gICAgICBjb25zdCBpc1JlcXVpcmVkID0ganNvblNjaGVtYS5yZXF1aXJlZCAmJiBqc29uU2NoZW1hLnJlcXVpcmVkLmluZGV4T2YoZmllbGRJZCkgPiAtMTtcbiAgICAgIGlmIChpc1JlcXVpcmVkICYmIGpzb25TY2hlbWEucHJvcGVydGllc1tmaWVsZElkXSkge1xuICAgICAgICBqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF0uaXNSZXF1aXJlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAodXNlZEZpZWxkcy5oYXNPd25Qcm9wZXJ0eShmaWVsZElkKSkge1xuICAgICAgICBpZiAodXNlZEZpZWxkc1tmaWVsZElkXS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgc2NoZW1hRXJyb3IoYCR7ZmllbGRJZH0gaXMgcmVmZXJlbmNlZCBieSBtb3JlIHRoYW4gb25lIGZpZWxkc2V0OiAke3VzZWRGaWVsZHNbZmllbGRJZF19YCwgcGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHVzZWRGaWVsZHNbZmllbGRJZF07XG4gICAgICB9IGVsc2UgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgc2NoZW1hRXJyb3IoYCR7ZmllbGRJZH0gaXMgYSByZXF1aXJlZCBmaWVsZCBidXQgaXQgaXMgbm90IHJlZmVyZW5jZWQgYXMgcGFydCBvZiBhICdvcmRlcicgb3IgYSAnZmllbGRzZXQnIHByb3BlcnR5YCwgcGF0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUganNvblNjaGVtYVtmaWVsZElkXTtcbiAgICAgICAgc2NoZW1hV2FybmluZyhgUmVtb3ZpbmcgdW5yZWZlcmVuY2VkIGZpZWxkICR7ZmllbGRJZH1gLCBwYXRoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCByZW1haW5pbmdmaWVsZHNJZCBpbiB1c2VkRmllbGRzKSB7XG4gICAgICBpZiAodXNlZEZpZWxkcy5oYXNPd25Qcm9wZXJ0eShyZW1haW5pbmdmaWVsZHNJZCkpIHtcbiAgICAgICAgc2NoZW1hV2FybmluZyhgUmVmZXJlbmNpbmcgbm9uLWV4aXN0ZW50IGZpZWxkICR7cmVtYWluaW5nZmllbGRzSWR9IGluIG9uZSBvciBtb3JlIGZpZWxkc2V0c2AsIHBhdGgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNyZWF0ZUZpZWxkc2V0cyhqc29uU2NoZW1hKSB7XG4gICAganNvblNjaGVtYS5vcmRlciA9IE9iamVjdC5rZXlzKGpzb25TY2hlbWEucHJvcGVydGllcyk7XG4gICAgU2NoZW1hUHJlcHJvY2Vzc29yLnJlcGxhY2VPcmRlckJ5RmllbGRzZXRzKGpzb25TY2hlbWEpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVwbGFjZU9yZGVyQnlGaWVsZHNldHMoanNvblNjaGVtYSkge1xuICAgIGpzb25TY2hlbWEuZmllbGRzZXRzID0gW3tcbiAgICAgIGlkOiAnZmllbGRzZXQtZGVmYXVsdCcsXG4gICAgICB0aXRsZToganNvblNjaGVtYS50aXRsZSB8fCAnJyxcbiAgICAgIGRlc2NyaXB0aW9uOiBqc29uU2NoZW1hLmRlc2NyaXB0aW9uIHx8ICcnLFxuICAgICAgbmFtZToganNvblNjaGVtYS5uYW1lIHx8ICcnLFxuICAgICAgZmllbGRzOiBqc29uU2NoZW1hLm9yZGVyXG4gICAgfV07XG4gICAgZGVsZXRlIGpzb25TY2hlbWEub3JkZXI7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBub3JtYWxpemVXaWRnZXQoZmllbGRTY2hlbWE6IGFueSkge1xuICAgIGxldCB3aWRnZXQgPSBmaWVsZFNjaGVtYS53aWRnZXQ7XG4gICAgaWYgKHdpZGdldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB3aWRnZXQgPSB7J2lkJzogZmllbGRTY2hlbWEudHlwZX07XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygd2lkZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgd2lkZ2V0ID0geydpZCc6IHdpZGdldH07XG4gICAgfVxuICAgIGZpZWxkU2NoZW1hLndpZGdldCA9IHdpZGdldDtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNoZWNrSXRlbXMoanNvblNjaGVtYSwgcGF0aCkge1xuICAgIGlmIChqc29uU2NoZW1hLml0ZW1zID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjaGVtYUVycm9yKCdObyBcXCdpdGVtc1xcJyBwcm9wZXJ0eSBpbiBhcnJheScsIHBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHJlY3Vyc2l2ZUNoZWNrKGpzb25TY2hlbWEsIHBhdGg6IHN0cmluZykge1xuICAgIGlmIChqc29uU2NoZW1hLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBmb3IgKGxldCBmaWVsZElkIGluIGpzb25TY2hlbWEucHJvcGVydGllcykge1xuICAgICAgICBpZiAoanNvblNjaGVtYS5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGZpZWxkSWQpKSB7XG4gICAgICAgICAgbGV0IGZpZWxkU2NoZW1hID0ganNvblNjaGVtYS5wcm9wZXJ0aWVzW2ZpZWxkSWRdO1xuICAgICAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5wcmVwcm9jZXNzKGZpZWxkU2NoZW1hLCBwYXRoICsgZmllbGRJZCArICcvJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChqc29uU2NoZW1hLmhhc093blByb3BlcnR5KCdkZWZpbml0aW9ucycpKSB7XG4gICAgICAgIGZvciAobGV0IGZpZWxkSWQgaW4ganNvblNjaGVtYS5kZWZpbml0aW9ucykge1xuICAgICAgICAgIGlmIChqc29uU2NoZW1hLmRlZmluaXRpb25zLmhhc093blByb3BlcnR5KGZpZWxkSWQpKSB7XG4gICAgICAgICAgICBsZXQgZmllbGRTY2hlbWEgPSBqc29uU2NoZW1hLmRlZmluaXRpb25zW2ZpZWxkSWRdO1xuICAgICAgICAgICAgU2NoZW1hUHJlcHJvY2Vzc29yLnJlbW92ZVJlY3Vyc2l2ZVJlZlByb3BlcnRpZXMoZmllbGRTY2hlbWEsIGAjL2RlZmluaXRpb25zLyR7ZmllbGRJZH1gKTtcbiAgICAgICAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5wcmVwcm9jZXNzKGZpZWxkU2NoZW1hLCBwYXRoICsgZmllbGRJZCArICcvJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChqc29uU2NoZW1hLnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5wcmVwcm9jZXNzKGpzb25TY2hlbWEuaXRlbXMsIHBhdGggKyAnKi8nKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyByZW1vdmVSZWN1cnNpdmVSZWZQcm9wZXJ0aWVzKGpzb25TY2hlbWEsIGRlZmluaXRpb25QYXRoKSB7XG4gICAgLy8gdG8gYXZvaWQgaW5maW5pdGUgbG9vcFxuICAgIGlmIChqc29uU2NoZW1hLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBmb3IgKGxldCBmaWVsZElkIGluIGpzb25TY2hlbWEucHJvcGVydGllcykge1xuICAgICAgICBpZiAoanNvblNjaGVtYS5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGZpZWxkSWQpKSB7XG4gICAgICAgICAgaWYgKGpzb25TY2hlbWEucHJvcGVydGllc1tmaWVsZElkXS4kcmVmXG4gICAgICAgICAgICAmJiBqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF0uJHJlZiA9PT0gZGVmaW5pdGlvblBhdGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF07XG4gICAgICAgICAgfSBlbHNlIGlmIChqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF0udHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5yZW1vdmVSZWN1cnNpdmVSZWZQcm9wZXJ0aWVzKGpzb25TY2hlbWEucHJvcGVydGllc1tmaWVsZElkXSwgZGVmaW5pdGlvblBhdGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgLyoqXG4gICAqIEVuYWJsZXMgYWxpYXMgbmFtZXMgZm9yIEpTT04gc2NoZW1hIGV4dGVuc2lvbnMuXG4gICAqXG4gICAqIENvcGllcyB0aGUgdmFsdWUgb2YgZWFjaCBhbGlhcyBKU09OIHNjaGVtYSBwcm9wZXJ0eVxuICAgKiB0byB0aGUgSlNPTiBzY2hlbWEgcHJvcGVydHkgb2Ygbmd4LXNjaGVtYS1mb3JtLlxuICAgKlxuICAgKiBAcGFyYW0gc2NoZW1hIEpTT04gc2NoZW1hIHRvIGVuYWJsZSBhbGlhcyBuYW1lcy5cbiAgICovXG4gIHByaXZhdGUgc3RhdGljIG5vcm1hbGl6ZUV4dGVuc2lvbnMoc2NoZW1hOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBleHRlbnNpb25zID0gW1xuICAgICAgICB7IG5hbWU6IFwiZmllbGRzZXRzXCIsIHJlZ2V4OiAvXngtP2ZpZWxkLT9zZXRzJC9pIH0sXG4gICAgICAgIHsgbmFtZTogXCJ3aWRnZXRcIiwgICAgcmVnZXg6IC9eeC0/d2lkZ2V0JC9pIH0sXG4gICAgICAgIHsgbmFtZTogXCJ2aXNpYmxlSWZcIiwgcmVnZXg6IC9eeC0/dmlzaWJsZS0/aWYkL2kgfVxuICAgIF07XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNjaGVtYSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICBsZXQgayA9IGtleXNbaV07XG4gICAgICBsZXQgZSA9IGV4dGVuc2lvbnMuZmluZChlID0+ICEhay5tYXRjaChlLnJlZ2V4KSk7XG4gICAgICBpZiAoZSkge1xuICAgICAgICBsZXQgdiA9IHNjaGVtYVtrXTtcbiAgICAgICAgbGV0IGNvcHkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHYpKTtcbiAgICAgICAgc2NoZW1hW2UubmFtZV0gPSBjb3B5O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4iXX0=