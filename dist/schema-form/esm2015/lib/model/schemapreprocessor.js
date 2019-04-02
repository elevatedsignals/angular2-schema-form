/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { isBlank } from './utils';
/**
 * @param {?} message
 * @param {?} path
 * @return {?}
 */
function formatMessage(message, path) {
    return `Parsing error on ${path}: ${message}`;
}
/**
 * @param {?} message
 * @param {?} path
 * @return {?}
 */
function schemaError(message, path) {
    /** @type {?} */
    let mesg = formatMessage(message, path);
    throw new Error(mesg);
}
/**
 * @param {?} message
 * @param {?} path
 * @return {?}
 */
function schemaWarning(message, path) {
    /** @type {?} */
    let mesg = formatMessage(message, path);
    throw new Error(mesg);
}
export class SchemaPreprocessor {
    /**
     * @param {?} jsonSchema
     * @param {?=} path
     * @return {?}
     */
    static preprocess(jsonSchema, path = '/') {
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
    }
    /**
     * @param {?} jsonSchema
     * @param {?} path
     * @return {?}
     */
    static checkProperties(jsonSchema, path) {
        if (isBlank(jsonSchema.properties)) {
            jsonSchema.properties = {};
            schemaWarning('Provided json schema does not contain a \'properties\' entry. Output schema will be empty', path);
        }
    }
    /**
     * @param {?} jsonSchema
     * @param {?} path
     * @return {?}
     */
    static checkAndCreateFieldsets(jsonSchema, path) {
        if (jsonSchema.fieldsets === undefined) {
            if (jsonSchema.order !== undefined) {
                SchemaPreprocessor.replaceOrderByFieldsets(jsonSchema);
            }
            else {
                SchemaPreprocessor.createFieldsets(jsonSchema);
            }
        }
        SchemaPreprocessor.checkFieldsUsage(jsonSchema, path);
    }
    /**
     * @param {?} jsonSchema
     * @param {?} path
     * @return {?}
     */
    static checkFieldsUsage(jsonSchema, path) {
        /** @type {?} */
        let fieldsId = Object.keys(jsonSchema.properties);
        /** @type {?} */
        let usedFields = {};
        for (let fieldset of jsonSchema.fieldsets) {
            for (let fieldId of fieldset.fields) {
                if (usedFields[fieldId] === undefined) {
                    usedFields[fieldId] = [];
                }
                usedFields[fieldId].push(fieldset.id);
            }
        }
        for (const fieldId of fieldsId) {
            /** @type {?} */
            const isRequired = jsonSchema.required && jsonSchema.required.indexOf(fieldId) > -1;
            if (isRequired && jsonSchema.properties[fieldId]) {
                jsonSchema.properties[fieldId].isRequired = true;
            }
            if (usedFields.hasOwnProperty(fieldId)) {
                if (usedFields[fieldId].length > 1) {
                    schemaError(`${fieldId} is referenced by more than one fieldset: ${usedFields[fieldId]}`, path);
                }
                delete usedFields[fieldId];
            }
            else if (isRequired) {
                schemaError(`${fieldId} is a required field but it is not referenced as part of a 'order' or a 'fieldset' property`, path);
            }
            else {
                delete jsonSchema[fieldId];
                schemaWarning(`Removing unreferenced field ${fieldId}`, path);
            }
        }
        for (let remainingfieldsId in usedFields) {
            if (usedFields.hasOwnProperty(remainingfieldsId)) {
                schemaWarning(`Referencing non-existent field ${remainingfieldsId} in one or more fieldsets`, path);
            }
        }
    }
    /**
     * @param {?} jsonSchema
     * @return {?}
     */
    static createFieldsets(jsonSchema) {
        jsonSchema.order = Object.keys(jsonSchema.properties);
        SchemaPreprocessor.replaceOrderByFieldsets(jsonSchema);
    }
    /**
     * @param {?} jsonSchema
     * @return {?}
     */
    static replaceOrderByFieldsets(jsonSchema) {
        jsonSchema.fieldsets = [{
                id: 'fieldset-default',
                title: jsonSchema.title || '',
                description: jsonSchema.description || '',
                name: jsonSchema.name || '',
                fields: jsonSchema.order
            }];
        delete jsonSchema.order;
    }
    /**
     * @param {?} fieldSchema
     * @return {?}
     */
    static normalizeWidget(fieldSchema) {
        /** @type {?} */
        let widget = fieldSchema.widget;
        if (widget === undefined) {
            widget = { 'id': fieldSchema.type };
        }
        else if (typeof widget === 'string') {
            widget = { 'id': widget };
        }
        fieldSchema.widget = widget;
    }
    /**
     * @param {?} jsonSchema
     * @param {?} path
     * @return {?}
     */
    static checkItems(jsonSchema, path) {
        if (jsonSchema.items === undefined) {
            schemaError('No \'items\' property in array', path);
        }
    }
    /**
     * @param {?} jsonSchema
     * @param {?} path
     * @return {?}
     */
    static recursiveCheck(jsonSchema, path) {
        if (jsonSchema.type === 'object') {
            for (let fieldId in jsonSchema.properties) {
                if (jsonSchema.properties.hasOwnProperty(fieldId)) {
                    /** @type {?} */
                    let fieldSchema = jsonSchema.properties[fieldId];
                    SchemaPreprocessor.preprocess(fieldSchema, path + fieldId + '/');
                }
            }
            if (jsonSchema.hasOwnProperty('definitions')) {
                for (let fieldId in jsonSchema.definitions) {
                    if (jsonSchema.definitions.hasOwnProperty(fieldId)) {
                        /** @type {?} */
                        let fieldSchema = jsonSchema.definitions[fieldId];
                        SchemaPreprocessor.removeRecursiveRefProperties(fieldSchema, `#/definitions/${fieldId}`);
                        SchemaPreprocessor.preprocess(fieldSchema, path + fieldId + '/');
                    }
                }
            }
        }
        else if (jsonSchema.type === 'array') {
            SchemaPreprocessor.preprocess(jsonSchema.items, path + '*/');
        }
    }
    /**
     * @param {?} jsonSchema
     * @param {?} definitionPath
     * @return {?}
     */
    static removeRecursiveRefProperties(jsonSchema, definitionPath) {
        // to avoid infinite loop
        if (jsonSchema.type === 'object') {
            for (let fieldId in jsonSchema.properties) {
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
    }
    /**
     * Enables alias names for JSON schema extensions.
     *
     * Copies the value of each alias JSON schema property
     * to the JSON schema property of ngx-schema-form.
     *
     * @param {?} schema JSON schema to enable alias names.
     * @return {?}
     */
    static normalizeExtensions(schema) {
        /** @type {?} */
        const extensions = [
            { name: "fieldsets", regex: /^x-?field-?sets$/i },
            { name: "widget", regex: /^x-?widget$/i },
            { name: "visibleIf", regex: /^x-?visible-?if$/i }
        ];
        /** @type {?} */
        const keys = Object.keys(schema);
        for (let i = 0; i < keys.length; ++i) {
            /** @type {?} */
            let k = keys[i];
            /** @type {?} */
            let e = extensions.find(e => !!k.match(e.regex));
            if (e) {
                /** @type {?} */
                let v = schema[k];
                /** @type {?} */
                let copy = JSON.parse(JSON.stringify(v));
                schema[e.name] = copy;
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hcHJlcHJvY2Vzc29yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL21vZGVsL3NjaGVtYXByZXByb2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFNBQVMsQ0FBQzs7Ozs7O0FBRWhDLFNBQVMsYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJO0lBQ2xDLE9BQU8sb0JBQW9CLElBQUksS0FBSyxPQUFPLEVBQUUsQ0FBQztBQUNoRCxDQUFDOzs7Ozs7QUFFRCxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSTs7UUFDNUIsSUFBSSxHQUFHLGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDO0lBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsQ0FBQzs7Ozs7O0FBRUQsU0FBUyxhQUFhLENBQUMsT0FBTyxFQUFFLElBQUk7O1FBQzlCLElBQUksR0FBRyxhQUFhLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQztJQUN2QyxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFFRCxNQUFNLE9BQU8sa0JBQWtCOzs7Ozs7SUFFN0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFlLEVBQUUsSUFBSSxHQUFHLEdBQUc7UUFDM0MsVUFBVSxHQUFHLFVBQVUsSUFBSSxFQUFFLENBQUM7UUFDOUIsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkQsSUFBSSxVQUFVLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUNoQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JELGtCQUFrQixDQUFDLHVCQUF1QixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM5RDthQUFNLElBQUksVUFBVSxDQUFD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LEVBQUUsRUFBRSxDQUFDLEVBQUU7O2dCQUNoQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQzs7Z0JBQ1gsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLEVBQUU7O29CQUNELENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDOztvQkFDYixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQzthQUN2QjtTQUNGO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc0JsYW5rfSBmcm9tICcuL3V0aWxzJztcblxuZnVuY3Rpb24gZm9ybWF0TWVzc2FnZShtZXNzYWdlLCBwYXRoKSB7XG4gIHJldHVybiBgUGFyc2luZyBlcnJvciBvbiAke3BhdGh9OiAke21lc3NhZ2V9YDtcbn1cblxuZnVuY3Rpb24gc2NoZW1hRXJyb3IobWVzc2FnZSwgcGF0aCk6IHZvaWQge1xuICBsZXQgbWVzZyA9IGZvcm1hdE1lc3NhZ2UobWVzc2FnZSwgcGF0aCk7XG4gIHRocm93IG5ldyBFcnJvcihtZXNnKTtcbn1cblxuZnVuY3Rpb24gc2NoZW1hV2FybmluZyhtZXNzYWdlLCBwYXRoKTogdm9pZCB7XG4gIGxldCBtZXNnID0gZm9ybWF0TWVzc2FnZShtZXNzYWdlLCBwYXRoKTtcbiAgdGhyb3cgbmV3IEVycm9yKG1lc2cpO1xufVxuXG5leHBvcnQgY2xhc3MgU2NoZW1hUHJlcHJvY2Vzc29yIHtcblxuICBzdGF0aWMgcHJlcHJvY2Vzcyhqc29uU2NoZW1hOiBhbnksIHBhdGggPSAnLycpOiBhbnkge1xuICAgIGpzb25TY2hlbWEgPSBqc29uU2NoZW1hIHx8IHt9O1xuICAgIFNjaGVtYVByZXByb2Nlc3Nvci5ub3JtYWxpemVFeHRlbnNpb25zKGpzb25TY2hlbWEpO1xuICAgIGlmIChqc29uU2NoZW1hLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBTY2hlbWFQcmVwcm9jZXNzb3IuY2hlY2tQcm9wZXJ0aWVzKGpzb25TY2hlbWEsIHBhdGgpO1xuICAgICAgU2NoZW1hUHJlcHJvY2Vzc29yLmNoZWNrQW5kQ3JlYXRlRmllbGRzZXRzKGpzb25TY2hlbWEsIHBhdGgpO1xuICAgIH0gZWxzZSBpZiAoanNvblNjaGVtYS50eXBlID09PSAnYXJyYXknKSB7XG4gICAgICBTY2hlbWFQcmVwcm9jZXNzb3IuY2hlY2tJdGVtcyhqc29uU2NoZW1hLCBwYXRoKTtcbiAgICB9XG4gICAgU2NoZW1hUHJlcHJvY2Vzc29yLm5vcm1hbGl6ZVdpZGdldChqc29uU2NoZW1hKTtcbiAgICBTY2hlbWFQcmVwcm9jZXNzb3IucmVjdXJzaXZlQ2hlY2soanNvblNjaGVtYSwgcGF0aCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjaGVja1Byb3BlcnRpZXMoanNvblNjaGVtYSwgcGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKGlzQmxhbmsoanNvblNjaGVtYS5wcm9wZXJ0aWVzKSkge1xuICAgICAganNvblNjaGVtYS5wcm9wZXJ0aWVzID0ge307XG4gICAgICBzY2hlbWFXYXJuaW5nKCdQcm92aWRlZCBqc29uIHNjaGVtYSBkb2VzIG5vdCBjb250YWluIGEgXFwncHJvcGVydGllc1xcJyBlbnRyeS4gT3V0cHV0IHNjaGVtYSB3aWxsIGJlIGVtcHR5JywgcGF0aCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgY2hlY2tBbmRDcmVhdGVGaWVsZHNldHMoanNvblNjaGVtYTogYW55LCBwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoanNvblNjaGVtYS5maWVsZHNldHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGpzb25TY2hlbWEub3JkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucmVwbGFjZU9yZGVyQnlGaWVsZHNldHMoanNvblNjaGVtYSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IuY3JlYXRlRmllbGRzZXRzKGpzb25TY2hlbWEpO1xuICAgICAgfVxuICAgIH1cbiAgICBTY2hlbWFQcmVwcm9jZXNzb3IuY2hlY2tGaWVsZHNVc2FnZShqc29uU2NoZW1hLCBwYXRoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNoZWNrRmllbGRzVXNhZ2UoanNvblNjaGVtYSwgcGF0aDogc3RyaW5nKSB7XG4gICAgbGV0IGZpZWxkc0lkOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGpzb25TY2hlbWEucHJvcGVydGllcyk7XG4gICAgbGV0IHVzZWRGaWVsZHMgPSB7fTtcbiAgICBmb3IgKGxldCBmaWVsZHNldCBvZiBqc29uU2NoZW1hLmZpZWxkc2V0cykge1xuICAgICAgZm9yIChsZXQgZmllbGRJZCBvZiBmaWVsZHNldC5maWVsZHMpIHtcbiAgICAgICAgaWYgKHVzZWRGaWVsZHNbZmllbGRJZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHVzZWRGaWVsZHNbZmllbGRJZF0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB1c2VkRmllbGRzW2ZpZWxkSWRdLnB1c2goZmllbGRzZXQuaWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgZmllbGRJZCBvZiBmaWVsZHNJZCkge1xuICAgICAgY29uc3QgaXNSZXF1aXJlZCA9IGpzb25TY2hlbWEucmVxdWlyZWQgJiYganNvblNjaGVtYS5yZXF1aXJlZC5pbmRleE9mKGZpZWxkSWQpID4gLTE7XG4gICAgICBpZiAoaXNSZXF1aXJlZCAmJiBqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF0pIHtcbiAgICAgICAganNvblNjaGVtYS5wcm9wZXJ0aWVzW2ZpZWxkSWRdLmlzUmVxdWlyZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHVzZWRGaWVsZHMuaGFzT3duUHJvcGVydHkoZmllbGRJZCkpIHtcbiAgICAgICAgaWYgKHVzZWRGaWVsZHNbZmllbGRJZF0ubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHNjaGVtYUVycm9yKGAke2ZpZWxkSWR9IGlzIHJlZmVyZW5jZWQgYnkgbW9yZSB0aGFuIG9uZSBmaWVsZHNldDogJHt1c2VkRmllbGRzW2ZpZWxkSWRdfWAsIHBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSB1c2VkRmllbGRzW2ZpZWxkSWRdO1xuICAgICAgfSBlbHNlIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgIHNjaGVtYUVycm9yKGAke2ZpZWxkSWR9IGlzIGEgcmVxdWlyZWQgZmllbGQgYnV0IGl0IGlzIG5vdCByZWZlcmVuY2VkIGFzIHBhcnQgb2YgYSAnb3JkZXInIG9yIGEgJ2ZpZWxkc2V0JyBwcm9wZXJ0eWAsIHBhdGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIGpzb25TY2hlbWFbZmllbGRJZF07XG4gICAgICAgIHNjaGVtYVdhcm5pbmcoYFJlbW92aW5nIHVucmVmZXJlbmNlZCBmaWVsZCAke2ZpZWxkSWR9YCwgcGF0aCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgcmVtYWluaW5nZmllbGRzSWQgaW4gdXNlZEZpZWxkcykge1xuICAgICAgaWYgKHVzZWRGaWVsZHMuaGFzT3duUHJvcGVydHkocmVtYWluaW5nZmllbGRzSWQpKSB7XG4gICAgICAgIHNjaGVtYVdhcm5pbmcoYFJlZmVyZW5jaW5nIG5vbi1leGlzdGVudCBmaWVsZCAke3JlbWFpbmluZ2ZpZWxkc0lkfSBpbiBvbmUgb3IgbW9yZSBmaWVsZHNldHNgLCBwYXRoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjcmVhdGVGaWVsZHNldHMoanNvblNjaGVtYSkge1xuICAgIGpzb25TY2hlbWEub3JkZXIgPSBPYmplY3Qua2V5cyhqc29uU2NoZW1hLnByb3BlcnRpZXMpO1xuICAgIFNjaGVtYVByZXByb2Nlc3Nvci5yZXBsYWNlT3JkZXJCeUZpZWxkc2V0cyhqc29uU2NoZW1hKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHJlcGxhY2VPcmRlckJ5RmllbGRzZXRzKGpzb25TY2hlbWEpIHtcbiAgICBqc29uU2NoZW1hLmZpZWxkc2V0cyA9IFt7XG4gICAgICBpZDogJ2ZpZWxkc2V0LWRlZmF1bHQnLFxuICAgICAgdGl0bGU6IGpzb25TY2hlbWEudGl0bGUgfHwgJycsXG4gICAgICBkZXNjcmlwdGlvbjoganNvblNjaGVtYS5kZXNjcmlwdGlvbiB8fCAnJyxcbiAgICAgIG5hbWU6IGpzb25TY2hlbWEubmFtZSB8fCAnJyxcbiAgICAgIGZpZWxkczoganNvblNjaGVtYS5vcmRlclxuICAgIH1dO1xuICAgIGRlbGV0ZSBqc29uU2NoZW1hLm9yZGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgbm9ybWFsaXplV2lkZ2V0KGZpZWxkU2NoZW1hOiBhbnkpIHtcbiAgICBsZXQgd2lkZ2V0ID0gZmllbGRTY2hlbWEud2lkZ2V0O1xuICAgIGlmICh3aWRnZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgd2lkZ2V0ID0geydpZCc6IGZpZWxkU2NoZW1hLnR5cGV9O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHdpZGdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHdpZGdldCA9IHsnaWQnOiB3aWRnZXR9O1xuICAgIH1cbiAgICBmaWVsZFNjaGVtYS53aWRnZXQgPSB3aWRnZXQ7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjaGVja0l0ZW1zKGpzb25TY2hlbWEsIHBhdGgpIHtcbiAgICBpZiAoanNvblNjaGVtYS5pdGVtcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2hlbWFFcnJvcignTm8gXFwnaXRlbXNcXCcgcHJvcGVydHkgaW4gYXJyYXknLCBwYXRoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyByZWN1cnNpdmVDaGVjayhqc29uU2NoZW1hLCBwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoanNvblNjaGVtYS50eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgZm9yIChsZXQgZmllbGRJZCBpbiBqc29uU2NoZW1hLnByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKGpzb25TY2hlbWEucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShmaWVsZElkKSkge1xuICAgICAgICAgIGxldCBmaWVsZFNjaGVtYSA9IGpzb25TY2hlbWEucHJvcGVydGllc1tmaWVsZElkXTtcbiAgICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucHJlcHJvY2VzcyhmaWVsZFNjaGVtYSwgcGF0aCArIGZpZWxkSWQgKyAnLycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoanNvblNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnZGVmaW5pdGlvbnMnKSkge1xuICAgICAgICBmb3IgKGxldCBmaWVsZElkIGluIGpzb25TY2hlbWEuZGVmaW5pdGlvbnMpIHtcbiAgICAgICAgICBpZiAoanNvblNjaGVtYS5kZWZpbml0aW9ucy5oYXNPd25Qcm9wZXJ0eShmaWVsZElkKSkge1xuICAgICAgICAgICAgbGV0IGZpZWxkU2NoZW1hID0ganNvblNjaGVtYS5kZWZpbml0aW9uc1tmaWVsZElkXTtcbiAgICAgICAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5yZW1vdmVSZWN1cnNpdmVSZWZQcm9wZXJ0aWVzKGZpZWxkU2NoZW1hLCBgIy9kZWZpbml0aW9ucy8ke2ZpZWxkSWR9YCk7XG4gICAgICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucHJlcHJvY2VzcyhmaWVsZFNjaGVtYSwgcGF0aCArIGZpZWxkSWQgKyAnLycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoanNvblNjaGVtYS50eXBlID09PSAnYXJyYXknKSB7XG4gICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucHJlcHJvY2Vzcyhqc29uU2NoZW1hLml0ZW1zLCBwYXRoICsgJyovJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVtb3ZlUmVjdXJzaXZlUmVmUHJvcGVydGllcyhqc29uU2NoZW1hLCBkZWZpbml0aW9uUGF0aCkge1xuICAgIC8vIHRvIGF2b2lkIGluZmluaXRlIGxvb3BcbiAgICBpZiAoanNvblNjaGVtYS50eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgZm9yIChsZXQgZmllbGRJZCBpbiBqc29uU2NoZW1hLnByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKGpzb25TY2hlbWEucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShmaWVsZElkKSkge1xuICAgICAgICAgIGlmIChqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF0uJHJlZlxuICAgICAgICAgICAgJiYganNvblNjaGVtYS5wcm9wZXJ0aWVzW2ZpZWxkSWRdLiRyZWYgPT09IGRlZmluaXRpb25QYXRoKSB7XG4gICAgICAgICAgICBkZWxldGUganNvblNjaGVtYS5wcm9wZXJ0aWVzW2ZpZWxkSWRdO1xuICAgICAgICAgIH0gZWxzZSBpZiAoanNvblNjaGVtYS5wcm9wZXJ0aWVzW2ZpZWxkSWRdLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucmVtb3ZlUmVjdXJzaXZlUmVmUHJvcGVydGllcyhqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF0sIGRlZmluaXRpb25QYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBFbmFibGVzIGFsaWFzIG5hbWVzIGZvciBKU09OIHNjaGVtYSBleHRlbnNpb25zLlxuICAgKlxuICAgKiBDb3BpZXMgdGhlIHZhbHVlIG9mIGVhY2ggYWxpYXMgSlNPTiBzY2hlbWEgcHJvcGVydHlcbiAgICogdG8gdGhlIEpTT04gc2NoZW1hIHByb3BlcnR5IG9mIG5neC1zY2hlbWEtZm9ybS5cbiAgICpcbiAgICogQHBhcmFtIHNjaGVtYSBKU09OIHNjaGVtYSB0byBlbmFibGUgYWxpYXMgbmFtZXMuXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyBub3JtYWxpemVFeHRlbnNpb25zKHNjaGVtYTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgZXh0ZW5zaW9ucyA9IFtcbiAgICAgICAgeyBuYW1lOiBcImZpZWxkc2V0c1wiLCByZWdleDogL154LT9maWVsZC0/c2V0cyQvaSB9LFxuICAgICAgICB7IG5hbWU6IFwid2lkZ2V0XCIsICAgIHJlZ2V4OiAvXngtP3dpZGdldCQvaSB9LFxuICAgICAgICB7IG5hbWU6IFwidmlzaWJsZUlmXCIsIHJlZ2V4OiAvXngtP3Zpc2libGUtP2lmJC9pIH1cbiAgICBdO1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzY2hlbWEpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgbGV0IGsgPSBrZXlzW2ldO1xuICAgICAgbGV0IGUgPSBleHRlbnNpb25zLmZpbmQoZSA9PiAhIWsubWF0Y2goZS5yZWdleCkpO1xuICAgICAgaWYgKGUpIHtcbiAgICAgICAgbGV0IHYgPSBzY2hlbWFba107XG4gICAgICAgIGxldCBjb3B5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh2KSk7XG4gICAgICAgIHNjaGVtYVtlLm5hbWVdID0gY29weTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuIl19