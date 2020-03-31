import { __decorate, __values } from "tslib";
import { isBlank } from './utils';
import { Injectable } from "@angular/core";
function formatMessage(message, path) {
    return "Parsing error on " + path + ": " + message;
}
function schemaError(message, path) {
    var mesg = formatMessage(message, path);
    throw new Error(mesg);
}
function schemaWarning(message, path) {
    var mesg = formatMessage(message, path);
    throw new Error(mesg);
}
var SchemaPreprocessor = /** @class */ (function () {
    function SchemaPreprocessor() {
    }
    SchemaPreprocessor_1 = SchemaPreprocessor;
    SchemaPreprocessor.preprocess = function (jsonSchema, path) {
        if (path === void 0) { path = '/'; }
        jsonSchema = jsonSchema || {};
        SchemaPreprocessor_1.normalizeExtensions(jsonSchema);
        if (jsonSchema.type === 'object') {
            SchemaPreprocessor_1.checkProperties(jsonSchema, path);
            SchemaPreprocessor_1.checkAndCreateFieldsets(jsonSchema, path);
        }
        else if (jsonSchema.type === 'array') {
            SchemaPreprocessor_1.checkItems(jsonSchema, path);
        }
        SchemaPreprocessor_1.normalizeWidget(jsonSchema);
        SchemaPreprocessor_1.recursiveCheck(jsonSchema, path);
    };
    SchemaPreprocessor.checkProperties = function (jsonSchema, path) {
        if (isBlank(jsonSchema.properties)) {
            jsonSchema.properties = {};
            schemaWarning('Provided json schema does not contain a \'properties\' entry. Output schema will be empty', path);
        }
    };
    SchemaPreprocessor.checkAndCreateFieldsets = function (jsonSchema, path) {
        if (jsonSchema.fieldsets === undefined) {
            if (jsonSchema.order !== undefined) {
                SchemaPreprocessor_1.replaceOrderByFieldsets(jsonSchema);
            }
            else {
                SchemaPreprocessor_1.createFieldsets(jsonSchema);
            }
        }
        SchemaPreprocessor_1.checkFieldsUsage(jsonSchema, path);
    };
    SchemaPreprocessor.checkFieldsUsage = function (jsonSchema, path) {
        var e_1, _a, e_2, _b, e_3, _c;
        var fieldsId = Object.keys(jsonSchema.properties);
        var usedFields = {};
        try {
            for (var _d = __values(jsonSchema.fieldsets), _e = _d.next(); !_e.done; _e = _d.next()) {
                var fieldset = _e.value;
                try {
                    for (var _f = (e_2 = void 0, __values(fieldset.fields)), _g = _f.next(); !_g.done; _g = _f.next()) {
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
            for (var fieldsId_1 = __values(fieldsId), fieldsId_1_1 = fieldsId_1.next(); !fieldsId_1_1.done; fieldsId_1_1 = fieldsId_1.next()) {
                var fieldId = fieldsId_1_1.value;
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
    SchemaPreprocessor.createFieldsets = function (jsonSchema) {
        jsonSchema.order = Object.keys(jsonSchema.properties);
        SchemaPreprocessor_1.replaceOrderByFieldsets(jsonSchema);
    };
    SchemaPreprocessor.replaceOrderByFieldsets = function (jsonSchema) {
        jsonSchema.fieldsets = [{
                id: 'fieldset-default',
                title: jsonSchema.title || '',
                description: jsonSchema.description || '',
                name: jsonSchema.name || '',
                fields: jsonSchema.order
            }];
        delete jsonSchema.order;
    };
    SchemaPreprocessor.normalizeWidget = function (fieldSchema) {
        var widget = fieldSchema.widget;
        if (widget === undefined) {
            widget = { 'id': fieldSchema.type };
        }
        else if (typeof widget === 'string') {
            widget = { 'id': widget };
        }
        fieldSchema.widget = widget;
    };
    SchemaPreprocessor.checkItems = function (jsonSchema, path) {
        if (jsonSchema.items === undefined) {
            schemaError('No \'items\' property in array', path);
        }
    };
    SchemaPreprocessor.recursiveCheck = function (jsonSchema, path) {
        if (jsonSchema.type === 'object') {
            for (var fieldId in jsonSchema.properties) {
                if (jsonSchema.properties.hasOwnProperty(fieldId)) {
                    var fieldSchema = jsonSchema.properties[fieldId];
                    SchemaPreprocessor_1.preprocess(fieldSchema, path + fieldId + '/');
                }
            }
            if (jsonSchema.hasOwnProperty('definitions')) {
                for (var fieldId in jsonSchema.definitions) {
                    if (jsonSchema.definitions.hasOwnProperty(fieldId)) {
                        var fieldSchema = jsonSchema.definitions[fieldId];
                        SchemaPreprocessor_1.removeRecursiveRefProperties(fieldSchema, "#/definitions/" + fieldId);
                        SchemaPreprocessor_1.preprocess(fieldSchema, path + fieldId + '/');
                    }
                }
            }
        }
        else if (jsonSchema.type === 'array') {
            SchemaPreprocessor_1.preprocess(jsonSchema.items, path + '*/');
        }
    };
    SchemaPreprocessor.removeRecursiveRefProperties = function (jsonSchema, definitionPath) {
        // to avoid infinite loop
        if (jsonSchema.type === 'object') {
            for (var fieldId in jsonSchema.properties) {
                if (jsonSchema.properties.hasOwnProperty(fieldId)) {
                    if (jsonSchema.properties[fieldId].$ref
                        && jsonSchema.properties[fieldId].$ref === definitionPath) {
                        delete jsonSchema.properties[fieldId];
                    }
                    else if (jsonSchema.properties[fieldId].type === 'object') {
                        SchemaPreprocessor_1.removeRecursiveRefProperties(jsonSchema.properties[fieldId], definitionPath);
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
    SchemaPreprocessor.normalizeExtensions = function (schema) {
        var extensions = [
            { name: "fieldsets", regex: /^x-?field-?sets$/i },
            { name: "widget", regex: /^x-?widget$/i },
            { name: "visibleIf", regex: /^x-?visible-?if$/i }
        ];
        var keys = Object.keys(schema);
        var _loop_1 = function (i) {
            var k = keys[i];
            var e = extensions.find(function (e) { return !!k.match(e.regex); });
            if (e) {
                var v = schema[k];
                var copy = JSON.parse(JSON.stringify(v));
                schema[e.name] = copy;
            }
        };
        for (var i = 0; i < keys.length; ++i) {
            _loop_1(i);
        }
    };
    var SchemaPreprocessor_1;
    SchemaPreprocessor = SchemaPreprocessor_1 = __decorate([
        Injectable()
    ], SchemaPreprocessor);
    return SchemaPreprocessor;
}());
export { SchemaPreprocessor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hcHJlcHJvY2Vzc29yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL21vZGVsL3NjaGVtYXByZXByb2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLFNBQVMsYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJO0lBQ2xDLE9BQU8sc0JBQW9CLElBQUksVUFBSyxPQUFTLENBQUM7QUFDaEQsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJO0lBQ2hDLElBQUksSUFBSSxHQUFHLGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBRUQsU0FBUyxhQUFhLENBQUMsT0FBTyxFQUFFLElBQUk7SUFDbEMsSUFBSSxJQUFJLEdBQUcsYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4QyxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFHRDtJQUFBO0lBcUtBLENBQUM7MkJBcktZLGtCQUFrQjtJQUV0Qiw2QkFBVSxHQUFqQixVQUFrQixVQUFlLEVBQUUsSUFBVTtRQUFWLHFCQUFBLEVBQUEsVUFBVTtRQUMzQyxVQUFVLEdBQUcsVUFBVSxJQUFJLEVBQUUsQ0FBQztRQUM5QixvQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuRCxJQUFJLFVBQVUsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQ2hDLG9CQUFrQixDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckQsb0JBQWtCLENBQUMsdUJBQXVCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzlEO2FBQU0sSUFBSSxVQUFVLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUN0QyxvQkFBa0IsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2pEO1FBQ0Qsb0JBQWtCLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLG9CQUFrQixDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVjLGtDQUFlLEdBQTlCLFVBQStCLFVBQVUsRUFBRSxJQUFZO1FBQ3JELElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNsQyxVQUFVLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUMzQixhQUFhLENBQUMsMkZBQTJGLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDbEg7SUFDSCxDQUFDO0lBRWMsMENBQXVCLEdBQXRDLFVBQXVDLFVBQWUsRUFBRSxJQUFZO1FBQ2xFLElBQUksVUFBVSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDdEMsSUFBSSxVQUFVLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDbEMsb0JBQWtCLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDeEQ7aUJBQU07Z0JBQ0wsb0JBQWtCLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2hEO1NBQ0Y7UUFDRCxvQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVjLG1DQUFnQixHQUEvQixVQUFnQyxVQUFVLEVBQUUsSUFBWTs7UUFDdEQsSUFBSSxRQUFRLEdBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUQsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDOztZQUNwQixLQUFxQixJQUFBLEtBQUEsU0FBQSxVQUFVLENBQUMsU0FBUyxDQUFBLGdCQUFBLDRCQUFFO2dCQUF0QyxJQUFJLFFBQVEsV0FBQTs7b0JBQ2YsS0FBb0IsSUFBQSxvQkFBQSxTQUFBLFFBQVEsQ0FBQyxNQUFNLENBQUEsQ0FBQSxnQkFBQSw0QkFBRTt3QkFBaEMsSUFBSSxPQUFPLFdBQUE7d0JBQ2QsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssU0FBUyxFQUFFOzRCQUNyQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO3lCQUMxQjt3QkFDRCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDdkM7Ozs7Ozs7OzthQUNGOzs7Ozs7Ozs7O1lBRUQsS0FBc0IsSUFBQSxhQUFBLFNBQUEsUUFBUSxDQUFBLGtDQUFBLHdEQUFFO2dCQUEzQixJQUFNLE9BQU8scUJBQUE7Z0JBQ2hCLElBQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxRQUFRLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BGLElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ2hELFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztpQkFDbEQ7Z0JBQ0QsSUFBSSxVQUFVLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUN0QyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUNsQyxXQUFXLENBQUksT0FBTyxrREFBNkMsVUFBVSxDQUFDLE9BQU8sQ0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO3FCQUNqRztvQkFDRCxPQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDNUI7cUJBQU0sSUFBSSxVQUFVLEVBQUU7b0JBQ3JCLFdBQVcsQ0FBSSxPQUFPLGdHQUE2RixFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUM1SDtxQkFBTTtvQkFDTCxPQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDM0IsYUFBYSxDQUFDLGlDQUErQixPQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQy9EO2FBQ0Y7Ozs7Ozs7OztRQUVELEtBQUssSUFBSSxpQkFBaUIsSUFBSSxVQUFVLEVBQUU7WUFDeEMsSUFBSSxVQUFVLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7Z0JBQ2hELGFBQWEsQ0FBQyxvQ0FBa0MsaUJBQWlCLDhCQUEyQixFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3JHO1NBQ0Y7SUFDSCxDQUFDO0lBRWMsa0NBQWUsR0FBOUIsVUFBK0IsVUFBVTtRQUN2QyxVQUFVLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RELG9CQUFrQixDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFYywwQ0FBdUIsR0FBdEMsVUFBdUMsVUFBVTtRQUMvQyxVQUFVLENBQUMsU0FBUyxHQUFHLENBQUM7Z0JBQ3RCLEVBQUUsRUFBRSxrQkFBa0I7Z0JBQ3RCLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQzdCLFdBQVcsRUFBRSxVQUFVLENBQUMsV0FBVyxJQUFJLEVBQUU7Z0JBQ3pDLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0JBQzNCLE1BQU0sRUFBRSxVQUFVLENBQUMsS0FBSzthQUN6QixDQUFDLENBQUM7UUFDSCxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVjLGtDQUFlLEdBQTlCLFVBQStCLFdBQWdCO1FBQzdDLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDaEMsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ3hCLE1BQU0sR0FBRyxFQUFDLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSSxFQUFDLENBQUM7U0FDbkM7YUFBTSxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUNyQyxNQUFNLEdBQUcsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7U0FDekI7UUFDRCxXQUFXLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUM5QixDQUFDO0lBRWMsNkJBQVUsR0FBekIsVUFBMEIsVUFBVSxFQUFFLElBQUk7UUFDeEMsSUFBSSxVQUFVLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUNsQyxXQUFXLENBQUMsZ0NBQWdDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDckQ7SUFDSCxDQUFDO0lBRWMsaUNBQWMsR0FBN0IsVUFBOEIsVUFBVSxFQUFFLElBQVk7UUFDcEQsSUFBSSxVQUFVLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUNoQyxLQUFLLElBQUksT0FBTyxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3pDLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ2pELElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ2pELG9CQUFrQixDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxHQUFHLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQztpQkFDbEU7YUFDRjtZQUNELElBQUksVUFBVSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDNUMsS0FBSyxJQUFJLE9BQU8sSUFBSSxVQUFVLENBQUMsV0FBVyxFQUFFO29CQUMxQyxJQUFJLFVBQVUsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUNsRCxJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUNsRCxvQkFBa0IsQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLEVBQUUsbUJBQWlCLE9BQVMsQ0FBQyxDQUFDO3dCQUN6RixvQkFBa0IsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLElBQUksR0FBRyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUM7cUJBQ2xFO2lCQUNGO2FBQ0Y7U0FDRjthQUFNLElBQUksVUFBVSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDdEMsb0JBQWtCLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQzlEO0lBQ0gsQ0FBQztJQUVjLCtDQUE0QixHQUEzQyxVQUE0QyxVQUFVLEVBQUUsY0FBYztRQUNwRSx5QkFBeUI7UUFDekIsSUFBSSxVQUFVLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUNoQyxLQUFLLElBQUksT0FBTyxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3pDLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ2pELElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJOzJCQUNsQyxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSyxjQUFjLEVBQUU7d0JBQzNELE9BQU8sVUFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDdkM7eUJBQU0sSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7d0JBQzNELG9CQUFrQixDQUFDLDRCQUE0QixDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7cUJBQ2pHO2lCQUNGO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ1ksc0NBQW1CLEdBQWxDLFVBQW1DLE1BQVc7UUFDNUMsSUFBTSxVQUFVLEdBQUc7WUFDZixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLG1CQUFtQixFQUFFO1lBQ2pELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBSyxLQUFLLEVBQUUsY0FBYyxFQUFFO1lBQzVDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUU7U0FDcEQsQ0FBQztRQUNGLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQ3hCLENBQUM7WUFDUixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxFQUFFO2dCQUNMLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCOztRQVBILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztvQkFBM0IsQ0FBQztTQVFUO0lBQ0gsQ0FBQzs7SUFwS1Usa0JBQWtCO1FBRDlCLFVBQVUsRUFBRTtPQUNBLGtCQUFrQixDQXFLOUI7SUFBRCx5QkFBQztDQUFBLEFBcktELElBcUtDO1NBcktZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNCbGFua30gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuZnVuY3Rpb24gZm9ybWF0TWVzc2FnZShtZXNzYWdlLCBwYXRoKSB7XG4gIHJldHVybiBgUGFyc2luZyBlcnJvciBvbiAke3BhdGh9OiAke21lc3NhZ2V9YDtcbn1cblxuZnVuY3Rpb24gc2NoZW1hRXJyb3IobWVzc2FnZSwgcGF0aCk6IHZvaWQge1xuICBsZXQgbWVzZyA9IGZvcm1hdE1lc3NhZ2UobWVzc2FnZSwgcGF0aCk7XG4gIHRocm93IG5ldyBFcnJvcihtZXNnKTtcbn1cblxuZnVuY3Rpb24gc2NoZW1hV2FybmluZyhtZXNzYWdlLCBwYXRoKTogdm9pZCB7XG4gIGxldCBtZXNnID0gZm9ybWF0TWVzc2FnZShtZXNzYWdlLCBwYXRoKTtcbiAgdGhyb3cgbmV3IEVycm9yKG1lc2cpO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2NoZW1hUHJlcHJvY2Vzc29yIHtcblxuICBzdGF0aWMgcHJlcHJvY2Vzcyhqc29uU2NoZW1hOiBhbnksIHBhdGggPSAnLycpOiBhbnkge1xuICAgIGpzb25TY2hlbWEgPSBqc29uU2NoZW1hIHx8IHt9O1xuICAgIFNjaGVtYVByZXByb2Nlc3Nvci5ub3JtYWxpemVFeHRlbnNpb25zKGpzb25TY2hlbWEpO1xuICAgIGlmIChqc29uU2NoZW1hLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBTY2hlbWFQcmVwcm9jZXNzb3IuY2hlY2tQcm9wZXJ0aWVzKGpzb25TY2hlbWEsIHBhdGgpO1xuICAgICAgU2NoZW1hUHJlcHJvY2Vzc29yLmNoZWNrQW5kQ3JlYXRlRmllbGRzZXRzKGpzb25TY2hlbWEsIHBhdGgpO1xuICAgIH0gZWxzZSBpZiAoanNvblNjaGVtYS50eXBlID09PSAnYXJyYXknKSB7XG4gICAgICBTY2hlbWFQcmVwcm9jZXNzb3IuY2hlY2tJdGVtcyhqc29uU2NoZW1hLCBwYXRoKTtcbiAgICB9XG4gICAgU2NoZW1hUHJlcHJvY2Vzc29yLm5vcm1hbGl6ZVdpZGdldChqc29uU2NoZW1hKTtcbiAgICBTY2hlbWFQcmVwcm9jZXNzb3IucmVjdXJzaXZlQ2hlY2soanNvblNjaGVtYSwgcGF0aCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjaGVja1Byb3BlcnRpZXMoanNvblNjaGVtYSwgcGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKGlzQmxhbmsoanNvblNjaGVtYS5wcm9wZXJ0aWVzKSkge1xuICAgICAganNvblNjaGVtYS5wcm9wZXJ0aWVzID0ge307XG4gICAgICBzY2hlbWFXYXJuaW5nKCdQcm92aWRlZCBqc29uIHNjaGVtYSBkb2VzIG5vdCBjb250YWluIGEgXFwncHJvcGVydGllc1xcJyBlbnRyeS4gT3V0cHV0IHNjaGVtYSB3aWxsIGJlIGVtcHR5JywgcGF0aCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgY2hlY2tBbmRDcmVhdGVGaWVsZHNldHMoanNvblNjaGVtYTogYW55LCBwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoanNvblNjaGVtYS5maWVsZHNldHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGpzb25TY2hlbWEub3JkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucmVwbGFjZU9yZGVyQnlGaWVsZHNldHMoanNvblNjaGVtYSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IuY3JlYXRlRmllbGRzZXRzKGpzb25TY2hlbWEpO1xuICAgICAgfVxuICAgIH1cbiAgICBTY2hlbWFQcmVwcm9jZXNzb3IuY2hlY2tGaWVsZHNVc2FnZShqc29uU2NoZW1hLCBwYXRoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNoZWNrRmllbGRzVXNhZ2UoanNvblNjaGVtYSwgcGF0aDogc3RyaW5nKSB7XG4gICAgbGV0IGZpZWxkc0lkOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGpzb25TY2hlbWEucHJvcGVydGllcyk7XG4gICAgbGV0IHVzZWRGaWVsZHMgPSB7fTtcbiAgICBmb3IgKGxldCBmaWVsZHNldCBvZiBqc29uU2NoZW1hLmZpZWxkc2V0cykge1xuICAgICAgZm9yIChsZXQgZmllbGRJZCBvZiBmaWVsZHNldC5maWVsZHMpIHtcbiAgICAgICAgaWYgKHVzZWRGaWVsZHNbZmllbGRJZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHVzZWRGaWVsZHNbZmllbGRJZF0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB1c2VkRmllbGRzW2ZpZWxkSWRdLnB1c2goZmllbGRzZXQuaWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgZmllbGRJZCBvZiBmaWVsZHNJZCkge1xuICAgICAgY29uc3QgaXNSZXF1aXJlZCA9IGpzb25TY2hlbWEucmVxdWlyZWQgJiYganNvblNjaGVtYS5yZXF1aXJlZC5pbmRleE9mKGZpZWxkSWQpID4gLTE7XG4gICAgICBpZiAoaXNSZXF1aXJlZCAmJiBqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF0pIHtcbiAgICAgICAganNvblNjaGVtYS5wcm9wZXJ0aWVzW2ZpZWxkSWRdLmlzUmVxdWlyZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHVzZWRGaWVsZHMuaGFzT3duUHJvcGVydHkoZmllbGRJZCkpIHtcbiAgICAgICAgaWYgKHVzZWRGaWVsZHNbZmllbGRJZF0ubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHNjaGVtYUVycm9yKGAke2ZpZWxkSWR9IGlzIHJlZmVyZW5jZWQgYnkgbW9yZSB0aGFuIG9uZSBmaWVsZHNldDogJHt1c2VkRmllbGRzW2ZpZWxkSWRdfWAsIHBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSB1c2VkRmllbGRzW2ZpZWxkSWRdO1xuICAgICAgfSBlbHNlIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgIHNjaGVtYUVycm9yKGAke2ZpZWxkSWR9IGlzIGEgcmVxdWlyZWQgZmllbGQgYnV0IGl0IGlzIG5vdCByZWZlcmVuY2VkIGFzIHBhcnQgb2YgYSAnb3JkZXInIG9yIGEgJ2ZpZWxkc2V0JyBwcm9wZXJ0eWAsIHBhdGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIGpzb25TY2hlbWFbZmllbGRJZF07XG4gICAgICAgIHNjaGVtYVdhcm5pbmcoYFJlbW92aW5nIHVucmVmZXJlbmNlZCBmaWVsZCAke2ZpZWxkSWR9YCwgcGF0aCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgcmVtYWluaW5nZmllbGRzSWQgaW4gdXNlZEZpZWxkcykge1xuICAgICAgaWYgKHVzZWRGaWVsZHMuaGFzT3duUHJvcGVydHkocmVtYWluaW5nZmllbGRzSWQpKSB7XG4gICAgICAgIHNjaGVtYVdhcm5pbmcoYFJlZmVyZW5jaW5nIG5vbi1leGlzdGVudCBmaWVsZCAke3JlbWFpbmluZ2ZpZWxkc0lkfSBpbiBvbmUgb3IgbW9yZSBmaWVsZHNldHNgLCBwYXRoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjcmVhdGVGaWVsZHNldHMoanNvblNjaGVtYSkge1xuICAgIGpzb25TY2hlbWEub3JkZXIgPSBPYmplY3Qua2V5cyhqc29uU2NoZW1hLnByb3BlcnRpZXMpO1xuICAgIFNjaGVtYVByZXByb2Nlc3Nvci5yZXBsYWNlT3JkZXJCeUZpZWxkc2V0cyhqc29uU2NoZW1hKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHJlcGxhY2VPcmRlckJ5RmllbGRzZXRzKGpzb25TY2hlbWEpIHtcbiAgICBqc29uU2NoZW1hLmZpZWxkc2V0cyA9IFt7XG4gICAgICBpZDogJ2ZpZWxkc2V0LWRlZmF1bHQnLFxuICAgICAgdGl0bGU6IGpzb25TY2hlbWEudGl0bGUgfHwgJycsXG4gICAgICBkZXNjcmlwdGlvbjoganNvblNjaGVtYS5kZXNjcmlwdGlvbiB8fCAnJyxcbiAgICAgIG5hbWU6IGpzb25TY2hlbWEubmFtZSB8fCAnJyxcbiAgICAgIGZpZWxkczoganNvblNjaGVtYS5vcmRlclxuICAgIH1dO1xuICAgIGRlbGV0ZSBqc29uU2NoZW1hLm9yZGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgbm9ybWFsaXplV2lkZ2V0KGZpZWxkU2NoZW1hOiBhbnkpIHtcbiAgICBsZXQgd2lkZ2V0ID0gZmllbGRTY2hlbWEud2lkZ2V0O1xuICAgIGlmICh3aWRnZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgd2lkZ2V0ID0geydpZCc6IGZpZWxkU2NoZW1hLnR5cGV9O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHdpZGdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHdpZGdldCA9IHsnaWQnOiB3aWRnZXR9O1xuICAgIH1cbiAgICBmaWVsZFNjaGVtYS53aWRnZXQgPSB3aWRnZXQ7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjaGVja0l0ZW1zKGpzb25TY2hlbWEsIHBhdGgpIHtcbiAgICBpZiAoanNvblNjaGVtYS5pdGVtcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2hlbWFFcnJvcignTm8gXFwnaXRlbXNcXCcgcHJvcGVydHkgaW4gYXJyYXknLCBwYXRoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyByZWN1cnNpdmVDaGVjayhqc29uU2NoZW1hLCBwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoanNvblNjaGVtYS50eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgZm9yIChsZXQgZmllbGRJZCBpbiBqc29uU2NoZW1hLnByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKGpzb25TY2hlbWEucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShmaWVsZElkKSkge1xuICAgICAgICAgIGxldCBmaWVsZFNjaGVtYSA9IGpzb25TY2hlbWEucHJvcGVydGllc1tmaWVsZElkXTtcbiAgICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucHJlcHJvY2VzcyhmaWVsZFNjaGVtYSwgcGF0aCArIGZpZWxkSWQgKyAnLycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoanNvblNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnZGVmaW5pdGlvbnMnKSkge1xuICAgICAgICBmb3IgKGxldCBmaWVsZElkIGluIGpzb25TY2hlbWEuZGVmaW5pdGlvbnMpIHtcbiAgICAgICAgICBpZiAoanNvblNjaGVtYS5kZWZpbml0aW9ucy5oYXNPd25Qcm9wZXJ0eShmaWVsZElkKSkge1xuICAgICAgICAgICAgbGV0IGZpZWxkU2NoZW1hID0ganNvblNjaGVtYS5kZWZpbml0aW9uc1tmaWVsZElkXTtcbiAgICAgICAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5yZW1vdmVSZWN1cnNpdmVSZWZQcm9wZXJ0aWVzKGZpZWxkU2NoZW1hLCBgIy9kZWZpbml0aW9ucy8ke2ZpZWxkSWR9YCk7XG4gICAgICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucHJlcHJvY2VzcyhmaWVsZFNjaGVtYSwgcGF0aCArIGZpZWxkSWQgKyAnLycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoanNvblNjaGVtYS50eXBlID09PSAnYXJyYXknKSB7XG4gICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucHJlcHJvY2Vzcyhqc29uU2NoZW1hLml0ZW1zLCBwYXRoICsgJyovJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVtb3ZlUmVjdXJzaXZlUmVmUHJvcGVydGllcyhqc29uU2NoZW1hLCBkZWZpbml0aW9uUGF0aCkge1xuICAgIC8vIHRvIGF2b2lkIGluZmluaXRlIGxvb3BcbiAgICBpZiAoanNvblNjaGVtYS50eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgZm9yIChsZXQgZmllbGRJZCBpbiBqc29uU2NoZW1hLnByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKGpzb25TY2hlbWEucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShmaWVsZElkKSkge1xuICAgICAgICAgIGlmIChqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF0uJHJlZlxuICAgICAgICAgICAgJiYganNvblNjaGVtYS5wcm9wZXJ0aWVzW2ZpZWxkSWRdLiRyZWYgPT09IGRlZmluaXRpb25QYXRoKSB7XG4gICAgICAgICAgICBkZWxldGUganNvblNjaGVtYS5wcm9wZXJ0aWVzW2ZpZWxkSWRdO1xuICAgICAgICAgIH0gZWxzZSBpZiAoanNvblNjaGVtYS5wcm9wZXJ0aWVzW2ZpZWxkSWRdLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucmVtb3ZlUmVjdXJzaXZlUmVmUHJvcGVydGllcyhqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF0sIGRlZmluaXRpb25QYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBFbmFibGVzIGFsaWFzIG5hbWVzIGZvciBKU09OIHNjaGVtYSBleHRlbnNpb25zLlxuICAgKlxuICAgKiBDb3BpZXMgdGhlIHZhbHVlIG9mIGVhY2ggYWxpYXMgSlNPTiBzY2hlbWEgcHJvcGVydHlcbiAgICogdG8gdGhlIEpTT04gc2NoZW1hIHByb3BlcnR5IG9mIG5neC1zY2hlbWEtZm9ybS5cbiAgICpcbiAgICogQHBhcmFtIHNjaGVtYSBKU09OIHNjaGVtYSB0byBlbmFibGUgYWxpYXMgbmFtZXMuXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyBub3JtYWxpemVFeHRlbnNpb25zKHNjaGVtYTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgZXh0ZW5zaW9ucyA9IFtcbiAgICAgICAgeyBuYW1lOiBcImZpZWxkc2V0c1wiLCByZWdleDogL154LT9maWVsZC0/c2V0cyQvaSB9LFxuICAgICAgICB7IG5hbWU6IFwid2lkZ2V0XCIsICAgIHJlZ2V4OiAvXngtP3dpZGdldCQvaSB9LFxuICAgICAgICB7IG5hbWU6IFwidmlzaWJsZUlmXCIsIHJlZ2V4OiAvXngtP3Zpc2libGUtP2lmJC9pIH1cbiAgICBdO1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzY2hlbWEpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgbGV0IGsgPSBrZXlzW2ldO1xuICAgICAgbGV0IGUgPSBleHRlbnNpb25zLmZpbmQoZSA9PiAhIWsubWF0Y2goZS5yZWdleCkpO1xuICAgICAgaWYgKGUpIHtcbiAgICAgICAgbGV0IHYgPSBzY2hlbWFba107XG4gICAgICAgIGxldCBjb3B5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh2KSk7XG4gICAgICAgIHNjaGVtYVtlLm5hbWVdID0gY29weTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuIl19