import { __decorate, __metadata } from 'tslib';
import { Injectable, ComponentFactoryResolver, EventEmitter, ChangeDetectorRef, Input, Output, Component, Renderer2, ElementRef, ViewChild, ViewContainerRef, Directive, NgModule, forwardRef, ContentChildren, QueryList, SimpleChange } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, NgControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, Subject, merge } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import * as ZSchema from 'z-schema';
import { Jexl } from 'jexl';
import { CommonModule } from '@angular/common';

let ActionRegistry = class ActionRegistry {
    constructor() {
        this.actions = {};
    }
    clear() {
        this.actions = {};
    }
    register(actionId, action) {
        this.actions[actionId] = action;
    }
    get(actionId) {
        return this.actions[actionId];
    }
};
ActionRegistry = __decorate([
    Injectable()
], ActionRegistry);

class FormProperty {
    constructor(schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path) {
        this.validatorRegistry = validatorRegistry;
        this.schema = schema;
        this._value = null;
        this._errors = null;
        this._valueChanges = new BehaviorSubject(null);
        this._errorsChanges = new BehaviorSubject(null);
        this._visible = true;
        this._visibilityChanges = new BehaviorSubject(true);
        this.schemaValidator = schemaValidatorFactory.createValidatorFn(this.schema);
        this.expressionCompilerVisibiltyIf = expressionCompilerFactory.createExpressionCompilerVisibilityIf();
        this._parent = parent;
        if (parent) {
            this._root = parent.root;
        }
        else if (this instanceof PropertyGroup) {
            this._root = this;
            this._rootName = this.createRootName();
        }
        this._path = path;
    }
    /**
     * Provides the unique path of this form element.<br/>
     * E.g.:
     * <code>/garage/cars</code>,<br/>
     * <code>/shop/book/0/page/1/</code>
     */
    get _canonicalPath() { return this.__canonicalPath; }
    set _canonicalPath(canonicalPath) {
        this.__canonicalPath = canonicalPath;
        this.__canonicalPathNotation = (this.__canonicalPath || '')
            .replace(new RegExp('^/', 'ig'), '')
            .replace(new RegExp('/$', 'ig'), '')
            .replace(new RegExp('/', 'ig'), '.');
    }
    /**
     * Uses the unique path provided by the property <code>_canonicalPath</code><br/>
     * but converts it to a HTML Element Attribute ID compliant format.<br/>
     * E.g.:
     * <code>garage.cars</code>,<br/>
     * <code>shop.book.0.page.1.</code>
     */
    get canonicalPathNotation() { return this.__canonicalPathNotation; }
    /**
     * Provides the HTML Element Attribute ID/NAME compliant representation
     * of the root element.<br/>
     * Represents the HTML FORM NAME.<br/>
     * Only the root <code>FormProperty</code> will provide a value here.
     */
    get rootName() { return this._rootName; }
    /**
     * Creates the HTML ID and NAME attribute compliant string.
     */
    createRootName() {
        if (this.schema && this.schema['name']) {
            return this._rootName = this.schema['name'].replace(new RegExp('[\\s]+', 'ig'), '_');
        }
        return '';
    }
    get valueChanges() {
        return this._valueChanges;
    }
    get errorsChanges() {
        return this._errorsChanges;
    }
    get type() {
        return this.schema.type;
    }
    get parent() {
        return this._parent;
    }
    get root() {
        return this._root || this;
    }
    get path() {
        return this._path;
    }
    get value() {
        return this._value;
    }
    get visible() {
        return this._visible;
    }
    get valid() {
        return this._errors === null;
    }
    updateValueAndValidity(onlySelf = false, emitEvent = true) {
        this._updateValue();
        if (emitEvent) {
            this.valueChanges.next(this.value);
        }
        this._runValidation();
        if (this.parent && !onlySelf) {
            this.parent.updateValueAndValidity(onlySelf, emitEvent);
        }
    }
    /**
     * @internal
     */
    _runValidation() {
        let errors = this.schemaValidator(this._value) || [];
        let customValidator = this.validatorRegistry.get(this.path);
        if (customValidator) {
            let customErrors = customValidator(this.value, this, this.findRoot());
            errors = this.mergeErrors(errors, customErrors);
        }
        if (errors.length === 0) {
            errors = null;
        }
        this._errors = errors;
        this.setErrors(this._errors);
    }
    mergeErrors(errors, newErrors) {
        if (newErrors) {
            if (Array.isArray(newErrors)) {
                errors = errors.concat(...newErrors);
            }
            else {
                errors.push(newErrors);
            }
        }
        return errors;
    }
    setErrors(errors) {
        this._errors = errors;
        this._errorsChanges.next(errors);
    }
    extendErrors(errors) {
        errors = this.mergeErrors(this._errors || [], errors);
        this.setErrors(errors);
    }
    searchProperty(path) {
        let prop = this;
        let base = null;
        let result = null;
        if (path[0] === '/') {
            base = this.findRoot();
            result = base.getProperty(path.substr(1));
        }
        else {
            while (result === null && prop.parent !== null) {
                prop = base = prop.parent;
                result = base.getProperty(path);
            }
        }
        return result;
    }
    findRoot() {
        let property = this;
        while (property.parent !== null) {
            property = property.parent;
        }
        return property;
    }
    setVisible(visible) {
        this._visible = visible;
        this._visibilityChanges.next(visible);
        this.updateValueAndValidity();
        if (this.parent) {
            this.parent.updateValueAndValidity(false, true);
        }
    }
    /**
     * Making use of the expression compiler for the <code>visibleIf</code> condition
     */
    __evaluateVisibilityIf(sourceProperty, targetProperty, dependencyPath, value = '', expression = '') {
        try {
            let valid = false;
            if (isNaN(expression) && expression.indexOf('$ANY$') !== -1) {
                valid = value && value.length > 0;
            }
            else if ((expression || []).toString().indexOf('$EXP$') === 0) {
                // since visibleIf condition values are an array... we must do this
                const expArray = Array.isArray(expression) ? expression : (expression ? [expression] : []);
                for (const expString of expArray) {
                    const _expresssion = expString.substring('$EXP$'.length);
                    valid = true === this.expressionCompilerVisibiltyIf.evaluate(_expresssion, {
                        source: sourceProperty,
                        target: targetProperty
                    });
                    if (valid) {
                        break;
                    }
                }
            }
            else {
                valid = isNaN(value) ? value.indexOf(expression) !== -1 : value === expression;
            }
            return valid;
        }
        catch (error) {
            console.error('Error processing "VisibileIf" expression for path: ', dependencyPath, `source - ${sourceProperty._canonicalPath}: `, sourceProperty, `target - ${targetProperty._canonicalPath}: `, targetProperty, 'value:', value, 'expression: ', expression, 'error: ', error);
        }
    }
    __bindVisibility() {
        /**
         * <pre>
         *     "oneOf":[{
         *         "path":["value","value"]
         *     },{
         *         "path":["value","value"]
         *     }]
         *     </pre>
         * <pre>
         *     "allOf":[{
         *         "path":["value","value"]
         *     },{
         *         "path":["value","value"]
         *     }]
         *     </pre>
         */
        const visibleIfProperty = this.schema.visibleIf;
        const visibleIfOf = (visibleIfProperty || {}).oneOf || (visibleIfProperty || {}).allOf;
        if (visibleIfOf) {
            for (const visibleIf of visibleIfOf) {
                if (typeof visibleIf === 'object' && Object.keys(visibleIf).length === 0) {
                    this.setVisible(false);
                }
                else if (visibleIf !== undefined) {
                    const propertiesBinding = [];
                    for (const dependencyPath in visibleIf) {
                        if (visibleIf.hasOwnProperty(dependencyPath)) {
                            const properties = this.findProperties(this, dependencyPath);
                            if ((properties || []).length) {
                                for (const property of properties) {
                                    if (property) {
                                        let valueCheck;
                                        if (this.schema.visibleIf.oneOf) {
                                            valueCheck = property.valueChanges.pipe(map(value => this.__evaluateVisibilityIf(this, property, dependencyPath, value, visibleIf[dependencyPath])));
                                        }
                                        else if (this.schema.visibleIf.allOf) {
                                            const _chk = (value) => {
                                                for (const item of this.schema.visibleIf.allOf) {
                                                    for (const depPath of Object.keys(item)) {
                                                        const prop = this.searchProperty(depPath);
                                                        const propVal = prop.value;
                                                        if (!this.__evaluateVisibilityIf(this, prop, dependencyPath, propVal, item[depPath])) {
                                                            return false;
                                                        }
                                                    }
                                                }
                                                return true;
                                            };
                                            valueCheck = property.valueChanges.pipe(map(_chk));
                                        }
                                        const visibilityCheck = property._visibilityChanges;
                                        const and = combineLatest([valueCheck, visibilityCheck], (v1, v2) => v1 && v2);
                                        propertiesBinding.push(and);
                                    }
                                }
                            }
                            else {
                                console.warn('Can\'t find property ' + dependencyPath + ' for visibility check of ' + this.path);
                                this.registerMissingVisibilityBinding(dependencyPath, this);
                                // not visible if not existent
                                this.setVisible(false);
                            }
                        }
                    }
                    combineLatest(propertiesBinding, (...values) => {
                        return values.indexOf(true) !== -1;
                    }).pipe(distinctUntilChanged()).subscribe((visible) => {
                        this.setVisible(visible);
                    });
                }
            }
            return true;
        }
    }
    // A field is visible if AT LEAST ONE of the properties it depends on is visible AND has a value in the list
    _bindVisibility() {
        if (this.__bindVisibility())
            return;
        let visibleIf = this.schema.visibleIf;
        if (typeof visibleIf === 'object' && Object.keys(visibleIf).length === 0) {
            this.setVisible(false);
        }
        else if (visibleIf !== undefined) {
            let propertiesBinding = [];
            for (let dependencyPath in visibleIf) {
                if (visibleIf.hasOwnProperty(dependencyPath)) {
                    const properties = this.findProperties(this, dependencyPath);
                    if ((properties || []).length) {
                        for (const property of properties) {
                            if (property) {
                                const valueCheck = property.valueChanges.pipe(map(value => this.__evaluateVisibilityIf(this, property, dependencyPath, value, visibleIf[dependencyPath])));
                                const visibilityCheck = property._visibilityChanges;
                                const and = combineLatest([valueCheck, visibilityCheck], (v1, v2) => v1 && v2);
                                propertiesBinding.push(and);
                            }
                        }
                    }
                    else {
                        console.warn('Can\'t find property ' + dependencyPath + ' for visibility check of ' + this.path);
                        this.registerMissingVisibilityBinding(dependencyPath, this);
                        // not visible if not existent
                        this.setVisible(false);
                    }
                }
            }
            combineLatest(propertiesBinding, (...values) => {
                return values.indexOf(true) !== -1;
            }).pipe(distinctUntilChanged()).subscribe((visible) => {
                this.setVisible(visible);
            });
        }
    }
    registerMissingVisibilityBinding(dependencyPath, formProperty) {
        formProperty._propertyBindingRegistry.getPropertyBindingsVisibility().add(dependencyPath, formProperty.path);
    }
    /**
     * Finds all <code>formProperties</code> from a path with wildcards.<br/>
     * e.g: <code>/garage/cars/&#42;/tires/&#42;/name</code><br/>
     * @param target
     * @param propertyPath
     */
    findProperties(target, propertyPath) {
        const props = [];
        const paths = this.findPropertyPaths(target, propertyPath);
        for (const path of paths) {
            const p = target.searchProperty(path);
            if (p) {
                props.push(p);
            }
        }
        return props;
    }
    /**
     * Creates canonical paths from a path with wildcards.
     * e.g:<br/>
     * From:<br/>
     * <code>/garage/cars/&#42;/tires/&#42;/name</code><br/>
     * it creates:<br/>
     * <code>/garage/cars/0/tires/0/name</code><br/>
     * <code>/garage/cars/0/tires/1/name</code><br/>
     * <code>/garage/cars/0/tires/2/name</code><br/>
     * <code>/garage/cars/0/tires/3/name</code><br/>
     * <code>/garage/cars/1/tires/0/name</code><br/>
     * <code>/garage/cars/2/tires/1/name</code><br/>
     * <code>/garage/cars/3/tires/2/name</code><br/>
     * <code>/garage/cars/3/tires/3/name</code><br/>
     * <code>/garage/cars/&#42;/tires/&#42;/name</code><br/>
     * <code>/garage/cars/&#42;/tires/2/name</code><br/>
     * <code>/garage/cars/&#42;/tires/3/name</code><br/>
     * <br/>etc...
     * @param target
     * @param path
     * @param parentPath
     */
    findPropertyPaths(target, path, parentPath) {
        const ix = path.indexOf('*');
        if (-1 !== ix) {
            const prePath = ix > -1 ? path.substring(0, ix - 1) : path;
            const subPath = ix > -1 ? path.substring(ix + 1) : path;
            const prop = target.searchProperty(prePath);
            let pathFound = [];
            if (prop instanceof PropertyGroup) {
                const arrProp = prop.properties;
                for (let i = 0; i < arrProp.length; i++) {
                    const curreItemPath = (parentPath || '') + prePath + (prePath.endsWith('/') ? '' : '/') + i + subPath;
                    const curreItemPrePath = (parentPath || '') + prePath + i;
                    if (-1 === curreItemPath.indexOf('*')) {
                        pathFound.push(curreItemPath);
                    }
                    const childrenPathFound = this.findPropertyPaths(arrProp[i], subPath, curreItemPrePath);
                    pathFound = pathFound.concat(childrenPathFound);
                }
            }
            return pathFound;
        }
        return [path];
    }
}
class PropertyGroup extends FormProperty {
    constructor() {
        super(...arguments);
        this._properties = null;
        this._propertyProxyHandler = {
            /**
             * When a new item is added it will be checked for visibility updates to proceed <br/>
             * if any other field has a binding reference to it.<br/>
             */
            set(target, p, value, receiver) {
                /**
                 * 1) Make sure a canonical path is set
                 */
                const assertCanonicalPath = (propertyValue) => {
                    const formProperty = propertyValue;
                    if (Array.isArray(target) && propertyValue instanceof FormProperty) {
                        /**
                         * Create a canonical path replacing the last '*' with the elements position in array
                         * @param propertyPath
                         * @param indexOfChild
                         */
                        const getCanonicalPath = (propertyPath, indexOfChild) => {
                            let pos;
                            if (propertyPath && -1 !== (pos = propertyPath.lastIndexOf('*'))) {
                                return propertyPath.substring(0, pos) + indexOfChild.toString() + propertyPath.substring(pos + 1);
                            }
                        };
                        if (formProperty) {
                            formProperty._canonicalPath = getCanonicalPath(formProperty._canonicalPath, p);
                        }
                    }
                    const propertyGroup = formProperty;
                    const propertyGroupChildren = (Array.isArray(propertyGroup.properties) ?
                        propertyGroup.properties :
                        Object.values(propertyGroup.properties || {}));
                    if ((formProperty.path || '').endsWith('/*')) {
                        /**
                         * If it is an array, then all children canonical paths must be computed now.
                         * The children don't have the parent's path segment set yet,
                         * because they are created before the parent gets attached to its parent.
                         */
                        for (const child of propertyGroupChildren) {
                            child._canonicalPath = formProperty._canonicalPath + child._canonicalPath.substring(formProperty.path.length);
                        }
                    }
                    return { property: formProperty, children: propertyGroupChildren };
                };
                const { property, children } = assertCanonicalPath(value);
                /**
                 * 2) Add the new property before rebinding, so it can be found by <code>_bindVisibility</code>
                 */
                const result = target[p] = value;
                /**
                 * 3) Re-bind the visibility bindings referencing to this canonical paths
                 */
                const rebindVisibility = () => {
                    const rebindAll = [property].concat(children);
                    const findPropertiesToRebind = (formProperty) => {
                        const propertyBindings = formProperty._propertyBindingRegistry.getPropertyBindingsVisibility();
                        let rebind = [];
                        if (formProperty._canonicalPath) {
                            rebind = rebind.concat(rebind.concat(propertyBindings.findByDependencyPath(formProperty._canonicalPath) || []));
                            if (formProperty._canonicalPath.startsWith('/')) {
                                rebind = rebind.concat(rebind.concat(propertyBindings.findByDependencyPath(formProperty._canonicalPath.substring(1)) || []));
                            }
                        }
                        rebind = rebind.concat(propertyBindings.findByDependencyPath(formProperty.path) || []);
                        if (formProperty.path.startsWith('/')) {
                            rebind = rebind.concat(rebind.concat(propertyBindings.findByDependencyPath(formProperty.path.substring(1)) || []));
                        }
                        const uniqueValues = {};
                        for (const item of rebind) {
                            uniqueValues[item] = item;
                        }
                        return Object.keys(uniqueValues);
                    };
                    for (const _property of rebindAll) {
                        if (_property instanceof FormProperty) {
                            try {
                                const rebindPaths = findPropertiesToRebind(_property);
                                for (const rebindPropPath of rebindPaths) {
                                    const rebindProp = _property.searchProperty(rebindPropPath);
                                    rebindProp._bindVisibility();
                                }
                            }
                            catch (e) {
                                console.error('Rebinding visibility error at path:', _property.path, 'property:', _property, e);
                            }
                        }
                    }
                };
                rebindVisibility();
                return result;
            },
            get(target, p, receiver) {
                return target[p];
            },
            deleteProperty(target, p) {
                return delete target[p];
            }
        };
    }
    get properties() {
        return this._properties;
    }
    set properties(properties) {
        /**
         * Override the setter to add an observer that notices when an item is added or removed.<br/>
         */
        this._properties = new Proxy(properties, this._propertyProxyHandler);
    }
    getProperty(path) {
        let subPathIdx = path.indexOf('/');
        let propertyId = subPathIdx !== -1 ? path.substr(0, subPathIdx) : path;
        let property = this.properties[propertyId];
        if (property !== null && subPathIdx !== -1 && property instanceof PropertyGroup) {
            let subPath = path.substr(subPathIdx + 1);
            property = property.getProperty(subPath);
        }
        return property;
    }
    forEachChild(fn) {
        for (let propertyId in this.properties) {
            if (this.properties.hasOwnProperty(propertyId)) {
                let property = this.properties[propertyId];
                fn(property, propertyId);
            }
        }
    }
    forEachChildRecursive(fn) {
        this.forEachChild((child) => {
            fn(child);
            if (child instanceof PropertyGroup) {
                child.forEachChildRecursive(fn);
            }
        });
    }
    _bindVisibility() {
        super._bindVisibility();
        this._bindVisibilityRecursive();
    }
    _bindVisibilityRecursive() {
        this.forEachChildRecursive((property) => {
            property._bindVisibility();
        });
    }
    isRoot() {
        return this === this.root;
    }
}

const PROPERTY_TYPE_MAPPING = {};

class FormPropertyFactory {
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

function isPresent(o) {
    return o !== null && o !== undefined;
}
function isBlank(o) {
    return o === null || o === undefined;
}

var SchemaPreprocessor_1;
function formatMessage(message, path) {
    return `Parsing error on ${path}: ${message}`;
}
function schemaError(message, path) {
    let mesg = formatMessage(message, path);
    throw new Error(mesg);
}
function schemaWarning(message, path) {
    let mesg = formatMessage(message, path);
    throw new Error(mesg);
}
let SchemaPreprocessor = SchemaPreprocessor_1 = class SchemaPreprocessor {
    static preprocess(jsonSchema, path = '/') {
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
    }
    static checkProperties(jsonSchema, path) {
        if (isBlank(jsonSchema.properties)) {
            jsonSchema.properties = {};
            schemaWarning('Provided json schema does not contain a \'properties\' entry. Output schema will be empty', path);
        }
    }
    static checkAndCreateFieldsets(jsonSchema, path) {
        if (jsonSchema.fieldsets === undefined) {
            if (jsonSchema.order !== undefined) {
                SchemaPreprocessor_1.replaceOrderByFieldsets(jsonSchema);
            }
            else {
                SchemaPreprocessor_1.createFieldsets(jsonSchema);
            }
        }
        SchemaPreprocessor_1.checkFieldsUsage(jsonSchema, path);
    }
    static checkFieldsUsage(jsonSchema, path) {
        let fieldsId = Object.keys(jsonSchema.properties);
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
    static createFieldsets(jsonSchema) {
        jsonSchema.order = Object.keys(jsonSchema.properties);
        SchemaPreprocessor_1.replaceOrderByFieldsets(jsonSchema);
    }
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
    static normalizeWidget(fieldSchema) {
        let widget = fieldSchema.widget;
        if (widget === undefined) {
            widget = { 'id': fieldSchema.type };
        }
        else if (typeof widget === 'string') {
            widget = { 'id': widget };
        }
        fieldSchema.widget = widget;
    }
    static checkItems(jsonSchema, path) {
        if (jsonSchema.items === undefined) {
            schemaError('No \'items\' property in array', path);
        }
    }
    static recursiveCheck(jsonSchema, path) {
        if (jsonSchema.type === 'object') {
            for (let fieldId in jsonSchema.properties) {
                if (jsonSchema.properties.hasOwnProperty(fieldId)) {
                    let fieldSchema = jsonSchema.properties[fieldId];
                    SchemaPreprocessor_1.preprocess(fieldSchema, path + fieldId + '/');
                }
            }
            if (jsonSchema.hasOwnProperty('definitions')) {
                for (let fieldId in jsonSchema.definitions) {
                    if (jsonSchema.definitions.hasOwnProperty(fieldId)) {
                        let fieldSchema = jsonSchema.definitions[fieldId];
                        SchemaPreprocessor_1.removeRecursiveRefProperties(fieldSchema, `#/definitions/${fieldId}`);
                        SchemaPreprocessor_1.preprocess(fieldSchema, path + fieldId + '/');
                    }
                }
            }
        }
        else if (jsonSchema.type === 'array') {
            SchemaPreprocessor_1.preprocess(jsonSchema.items, path + '*/');
        }
    }
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
                        SchemaPreprocessor_1.removeRecursiveRefProperties(jsonSchema.properties[fieldId], definitionPath);
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
     * @param schema JSON schema to enable alias names.
     */
    static normalizeExtensions(schema) {
        const extensions = [
            { name: "fieldsets", regex: /^x-?field-?sets$/i },
            { name: "widget", regex: /^x-?widget$/i },
            { name: "visibleIf", regex: /^x-?visible-?if$/i }
        ];
        const keys = Object.keys(schema);
        for (let i = 0; i < keys.length; ++i) {
            let k = keys[i];
            let e = extensions.find(e => !!k.match(e.regex));
            if (e) {
                let v = schema[k];
                let copy = JSON.parse(JSON.stringify(v));
                schema[e.name] = copy;
            }
        }
    }
};
SchemaPreprocessor = SchemaPreprocessor_1 = __decorate([
    Injectable()
], SchemaPreprocessor);

let ValidatorRegistry = class ValidatorRegistry {
    constructor() {
        this.validators = [];
    }
    register(path, validator) {
        this.validators[path] = validator;
    }
    get(path) {
        return this.validators[path];
    }
    clear() {
        this.validators = [];
    }
};
ValidatorRegistry = __decorate([
    Injectable()
], ValidatorRegistry);

let BindingRegistry = class BindingRegistry {
    constructor() {
        this.bindings = [];
    }
    clear() {
        this.bindings = [];
    }
    register(path, binding) {
        this.bindings[path] = [].concat(binding);
    }
    get(path) {
        return this.bindings[path];
    }
};
BindingRegistry = __decorate([
    Injectable()
], BindingRegistry);

class SchemaValidatorFactory {
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
    reset() {
    }
}
let ZSchemaValidatorFactory = class ZSchemaValidatorFactory extends SchemaValidatorFactory {
    constructor() {
        super();
        this.createSchemaValidator();
    }
    createSchemaValidator() {
        this.zschema = new ZSchema({
            breakOnFirstError: false
        });
    }
    reset() {
        this.createSchemaValidator();
    }
    createValidatorFn(schema) {
        return (value) => {
            if (schema.type === 'number' || schema.type === 'integer') {
                value = +value;
            }
            this.zschema.validate(value, schema);
            let err = this.zschema.getLastErrors();
            this.denormalizeRequiredPropertyPaths(err);
            return err || null;
        };
    }
    getSchema(schema, ref) {
        // check definitions are valid
        const isValid = this.zschema.compileSchema(schema);
        if (isValid) {
            return this.getDefinition(schema, ref);
        }
        else {
            throw this.zschema.getLastError();
        }
    }
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
    getDefinition(schema, ref) {
        let foundSchema = schema;
        ref.split('/').slice(1).forEach(ptr => {
            if (ptr) {
                foundSchema = foundSchema[ptr];
            }
        });
        return foundSchema;
    }
};
ZSchemaValidatorFactory = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], ZSchemaValidatorFactory);

class WidgetRegistry {
    constructor() {
        this.widgets = {};
    }
    setDefaultWidget(widget) {
        this.defaultWidget = widget;
    }
    getDefaultWidget() {
        return this.defaultWidget;
    }
    hasWidget(type) {
        return this.widgets.hasOwnProperty(type);
    }
    register(type, widget) {
        this.widgets[type] = widget;
    }
    getWidgetType(type) {
        if (this.hasWidget(type)) {
            return this.widgets[type];
        }
        return this.defaultWidget;
    }
}

let WidgetFactory = class WidgetFactory {
    constructor(registry, resolver) {
        this.registry = registry;
        this.resolver = resolver;
    }
    createWidget(container, type) {
        let componentClass = this.registry.getWidgetType(type);
        let componentFactory = this.resolver.resolveComponentFactory(componentClass);
        return container.createComponent(componentFactory);
    }
};
WidgetFactory.ctorParameters = () => [
    { type: WidgetRegistry },
    { type: ComponentFactoryResolver }
];
WidgetFactory = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [WidgetRegistry, ComponentFactoryResolver])
], WidgetFactory);

let TerminatorService = class TerminatorService {
    constructor() {
        this.onDestroy = new Subject();
    }
    destroy() {
        this.onDestroy.next(true);
    }
};
TerminatorService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], TerminatorService);

/**
 * General purpose propery binding registry
 */
let PropertyBindingRegistry = class PropertyBindingRegistry {
    constructor() {
        this.bindings = {};
    }
    getPropertyBindings(type) {
        this.bindings[type] = this.bindings[type] || new PropertyBindings();
        return this.bindings[type];
    }
    getPropertyBindingsVisibility() {
        return this.getPropertyBindings(PropertyBindingTypes.visibility);
    }
};
PropertyBindingRegistry = __decorate([
    Injectable()
], PropertyBindingRegistry);
/**
 * Defines the types of supported property bindings.<br/>
 * For now only <code>visibility</code> is supported.<br/>
 */
var PropertyBindingTypes;
(function (PropertyBindingTypes) {
    PropertyBindingTypes[PropertyBindingTypes["visibility"] = 0] = "visibility";
})(PropertyBindingTypes || (PropertyBindingTypes = {}));
/**
 * Storage that holds all bindings that are property paths related.<br/>
 */
class PropertyBindings {
    constructor() {
        this.sourcesIndex = new SimplePropertyIndexer();
        this.dependenciesIndex = new SimplePropertyIndexer();
    }
    add(dependencyPath, sourcePropertyPath) {
        this.sourcesIndex.store(sourcePropertyPath, dependencyPath);
        this.dependenciesIndex.store(dependencyPath, sourcePropertyPath);
    }
    findByDependencyPath(dependencyPath) {
        const result = this.dependenciesIndex.find(dependencyPath);
        result.results = result.results || [];
        let values = [];
        for (const res of result.results) {
            values = values.concat(Object.keys(res.value));
        }
        return result.found ? values : [];
    }
    getBySourcePropertyPath(sourcePropertyPath) {
        const result = this.sourcesIndex.find(sourcePropertyPath);
        result.results = result.results || [];
        let values = [];
        for (const res of result.results) {
            values = values.concat(Object.keys(res.value));
        }
        return result.found ? values : [];
    }
    createPathIndex(path) {
        return path.split('/');
    }
}
/**
 * Simple indexer to store property paths
 */
class SimplePropertyIndexer {
    constructor() {
        this.index = {};
        this.findOnlyWithValue = true;
    }
    _createPathIndex(path) {
        return path
            .replace(new RegExp('//', 'g'), '/')
            .replace(new RegExp('^/', 'g'), '')
            .split('/').filter(item => item);
    }
    store(propertyPath, value) {
        this._storeIndex(this._createPathIndex(propertyPath), value);
    }
    _storeIndex(pathIndex, value) {
        let indexPos = this.index;
        for (const key of pathIndex) {
            indexPos[key] = indexPos[key] || {};
            indexPos = indexPos[key];
        }
        if (indexPos && value) {
            indexPos[SimplePropertyIndexer.MARKER] = indexPos[SimplePropertyIndexer.MARKER] || {};
            indexPos[SimplePropertyIndexer.MARKER][value] = value;
        }
    }
    /**
     * Find path in index.<br/>
     * Will find path like:<br/>
     * <ul>
     *     <li>/property/0/prop</li>
     *     <li>/property/0/prop/2/test</li>
     *     <li>/property/0/prop/&#42;/test</li>
     *     <li>/property/&#42;/prop/1/test</li>
     *     <li>/property/&#42;/prop/&#42;/test</li>
     *     <li>/property/1/prop/&#42;/test</li>
     *  </ul>
     * @param path
     */
    find(path) {
        return this._findInIndex(this._createPathIndex(path));
    }
    _findInIndex(path) {
        const ixRes = { target: path, found: false, results: [] };
        this.__findIndex(ixRes, path, this.index, []);
        return ixRes;
    }
    __findIndex(indexerResults, path, index, parent) {
        const p = parent || [];
        const segment = path[0];
        const wild = ('*' === segment) ? Object.keys(index) : [];
        const _keys = (Array.isArray(segment) ? segment : [segment]).concat(wild);
        const keys = _keys.filter((item, pos) => '*' !== item && _keys.indexOf(item) === pos); // remove duplicates
        if (index['*']) {
            keys.push('*');
        }
        let paths = [];
        for (const key of keys) {
            const restPath = path.slice(1);
            const restIndex = index[key];
            const restParent = p.concat(key);
            if (path.length === 1) { // collect only the full paths
                if (!this.findOnlyWithValue || (restIndex && restIndex[SimplePropertyIndexer.MARKER])) {
                    indexerResults.results = indexerResults.results || [];
                    indexerResults.results.push({
                        path: restParent,
                        value: restIndex[SimplePropertyIndexer.MARKER]
                    });
                    paths.push(restParent);
                    indexerResults.found = indexerResults.results.length > 0;
                }
            }
            if (!restPath || !restPath.length || !restIndex) {
                break;
            }
            const restPaths = this.__findIndex(indexerResults, restPath, restIndex, restParent);
            paths = paths.concat(restPaths);
        }
        return paths;
    }
}
SimplePropertyIndexer.MARKER = '$____value';

class ExpressionCompilerFactory {
}
class JEXLExpressionCompilerFactory extends ExpressionCompilerFactory {
    createExpressionCompiler() {
        return new JEXLExpressionCompiler();
    }
    createExpressionCompilerVisibilityIf() {
        return new JEXLExpressionCompilerVisibiltyIf();
    }
}
class JEXLExpressionCompiler {
    evaluate(expression, context = {}) {
        return new Jexl().evalSync(expression, context);
    }
}
class JEXLExpressionCompilerVisibiltyIf {
    evaluate(expression, context = { source: {}, target: {} }) {
        return new Jexl().evalSync(expression, context);
    }
}

var FormComponent_1;
function useFactory(schemaValidatorFactory, validatorRegistry, propertyBindingRegistry, expressionCompilerFactory) {
    return new FormPropertyFactory(schemaValidatorFactory, validatorRegistry, propertyBindingRegistry, expressionCompilerFactory);
}
let FormComponent = FormComponent_1 = class FormComponent {
    constructor(formPropertyFactory, actionRegistry, validatorRegistry, bindingRegistry, cdr, terminator) {
        this.formPropertyFactory = formPropertyFactory;
        this.actionRegistry = actionRegistry;
        this.validatorRegistry = validatorRegistry;
        this.bindingRegistry = bindingRegistry;
        this.cdr = cdr;
        this.terminator = terminator;
        this.schema = null;
        this.actions = {};
        this.validators = {};
        this.bindings = {};
        this.onChange = new EventEmitter();
        this.modelChange = new EventEmitter();
        this.isValid = new EventEmitter();
        this.onErrorChange = new EventEmitter();
        this.onErrorsChange = new EventEmitter();
        this.rootProperty = null;
    }
    writeValue(obj) {
        if (this.rootProperty) {
            this.rootProperty.reset(obj, false);
        }
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
        if (this.rootProperty) {
            this.rootProperty.valueChanges.subscribe(this.onValueChanges.bind(this));
        }
    }
    // TODO implement
    registerOnTouched(fn) {
    }
    // TODO implement
    // setDisabledState(isDisabled: boolean)?: void
    ngOnChanges(changes) {
        if (changes.validators) {
            this.setValidators();
        }
        if (changes.actions) {
            this.setActions();
        }
        if (changes.bindings) {
            this.setBindings();
        }
        if (this.schema && !this.schema.type) {
            this.schema.type = 'object';
        }
        if (this.schema && changes.schema) {
            if (!changes.schema.firstChange) {
                this.terminator.destroy();
            }
            SchemaPreprocessor.preprocess(this.schema);
            this.rootProperty = this.formPropertyFactory.createProperty(this.schema);
            if (this.model) {
                // this.rootProperty.reset(this.model, false);
            }
            this.rootProperty.valueChanges.subscribe(this.onValueChanges.bind(this));
            this.rootProperty.errorsChanges.subscribe(value => {
                this.onErrorChange.emit({ value: value });
                this.isValid.emit(!(value && value.length));
            });
        }
        if (this.schema && (changes.model || changes.schema)) {
            this.rootProperty.reset(this.model, false);
            this.cdr.detectChanges();
        }
    }
    setValidators() {
        this.validatorRegistry.clear();
        if (this.validators) {
            for (const validatorId in this.validators) {
                if (this.validators.hasOwnProperty(validatorId)) {
                    this.validatorRegistry.register(validatorId, this.validators[validatorId]);
                }
            }
        }
    }
    setActions() {
        this.actionRegistry.clear();
        if (this.actions) {
            for (const actionId in this.actions) {
                if (this.actions.hasOwnProperty(actionId)) {
                    this.actionRegistry.register(actionId, this.actions[actionId]);
                }
            }
        }
    }
    setBindings() {
        this.bindingRegistry.clear();
        if (this.bindings) {
            for (const bindingPath in this.bindings) {
                if (this.bindings.hasOwnProperty(bindingPath)) {
                    this.bindingRegistry.register(bindingPath, this.bindings[bindingPath]);
                }
            }
        }
    }
    reset() {
        this.rootProperty.reset(null, true);
    }
    setModel(value) {
        if (this.model) {
            Object.assign(this.model, value);
        }
        else {
            this.model = value;
        }
    }
    onValueChanges(value) {
        if (this.onChangeCallback) {
            this.setModel(value);
            this.onChangeCallback(value);
        }
        // two way binding is used
        if (this.modelChange.observers.length > 0) {
            if (!this.onChangeCallback) {
                this.setModel(value);
            }
        }
        this.onChange.emit({ value: value });
    }
};
FormComponent.ctorParameters = () => [
    { type: FormPropertyFactory },
    { type: ActionRegistry },
    { type: ValidatorRegistry },
    { type: BindingRegistry },
    { type: ChangeDetectorRef },
    { type: TerminatorService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], FormComponent.prototype, "schema", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FormComponent.prototype, "model", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FormComponent.prototype, "actions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FormComponent.prototype, "validators", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FormComponent.prototype, "bindings", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], FormComponent.prototype, "onChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], FormComponent.prototype, "modelChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], FormComponent.prototype, "isValid", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], FormComponent.prototype, "onErrorChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], FormComponent.prototype, "onErrorsChange", void 0);
FormComponent = FormComponent_1 = __decorate([
    Component({
        selector: 'sf-form',
        template: `
    <form *ngIf="rootProperty" [attr.name]="rootProperty.rootName" [attr.id]="rootProperty.rootName">
      <sf-form-element [formProperty]="rootProperty"></sf-form-element>
    </form>`,
        providers: [
            ActionRegistry,
            ValidatorRegistry,
            PropertyBindingRegistry,
            BindingRegistry,
            SchemaPreprocessor,
            WidgetFactory,
            {
                provide: FormPropertyFactory,
                useFactory: useFactory,
                deps: [SchemaValidatorFactory, ValidatorRegistry, PropertyBindingRegistry, ExpressionCompilerFactory]
            },
            TerminatorService,
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: FormComponent_1,
                multi: true
            }
        ]
    }),
    __metadata("design:paramtypes", [FormPropertyFactory,
        ActionRegistry,
        ValidatorRegistry,
        BindingRegistry,
        ChangeDetectorRef,
        TerminatorService])
], FormComponent);

var FormElementComponent_1;
let FormElementComponent = FormElementComponent_1 = class FormElementComponent {
    constructor(actionRegistry, bindingRegistry, renderer, elementRef) {
        this.actionRegistry = actionRegistry;
        this.bindingRegistry = bindingRegistry;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.control = new FormControl('', () => null);
        this.widget = null;
        this.buttons = [];
        this.unlisten = [];
    }
    ngOnInit() {
        this.parseButtons();
        this.setupBindings();
    }
    setupBindings() {
        const bindings = this.bindingRegistry.get(this.formProperty.path);
        if ((bindings || []).length) {
            bindings.forEach((binding) => {
                for (const eventId in binding) {
                    this.createBinding(eventId, binding[eventId]);
                }
            });
        }
    }
    createBinding(eventId, listener) {
        this.unlisten.push(this.renderer.listen(this.elementRef.nativeElement, eventId, (event) => {
            if (listener instanceof Function) {
                listener(event, this.formProperty);
            }
            else {
                console.warn('Calling non function handler for eventId ' + eventId + ' for path ' + this.formProperty.path);
            }
        }));
    }
    parseButtons() {
        if (this.formProperty.schema.buttons !== undefined) {
            this.buttons = this.formProperty.schema.buttons;
            for (let button of this.buttons) {
                this.createButtonCallback(button);
            }
        }
    }
    createButtonCallback(button) {
        button.action = (e) => {
            let action;
            if (button.id && (action = this.actionRegistry.get(button.id))) {
                if (action) {
                    action(this.formProperty, button.parameters);
                }
            }
            e.preventDefault();
        };
    }
    onWidgetInstanciated(widget) {
        this.widget = widget;
        let id = this.formProperty.canonicalPathNotation || 'field' + (FormElementComponent_1.counter++);
        if (this.formProperty.root.rootName) {
            id = `${this.formProperty.root.rootName}:${id}`;
        }
        this.widget.formProperty = this.formProperty;
        this.widget.schema = this.formProperty.schema;
        this.widget.name = id;
        this.widget.id = id;
        this.widget.control = this.control;
    }
    ngOnDestroy() {
        if (this.unlisten) {
            this.unlisten.forEach((item) => {
                item();
            });
        }
    }
};
FormElementComponent.counter = 0;
FormElementComponent.ctorParameters = () => [
    { type: ActionRegistry },
    { type: BindingRegistry },
    { type: Renderer2 },
    { type: ElementRef }
];
__decorate([
    Input(),
    __metadata("design:type", FormProperty)
], FormElementComponent.prototype, "formProperty", void 0);
FormElementComponent = FormElementComponent_1 = __decorate([
    Component({
        selector: 'sf-form-element',
        template: `
    <div *ngIf="formProperty.visible"
         [class.has-error]="!control.valid"
         [class.has-success]="control.valid">
      <sf-widget-chooser
        (widgetInstanciated)="onWidgetInstanciated($event)"
        [widgetInfo]="formProperty.schema.widget">
      </sf-widget-chooser>
      <sf-form-element-action *ngFor="let button of buttons" [button]="button" [formProperty]="formProperty"></sf-form-element-action>
    </div>`
    }),
    __metadata("design:paramtypes", [ActionRegistry,
        BindingRegistry,
        Renderer2,
        ElementRef])
], FormElementComponent);

let FormElementComponentAction = class FormElementComponentAction {
    constructor(widgetFactory = null, terminator) {
        this.widgetFactory = widgetFactory;
        this.terminator = terminator;
    }
    ngOnInit() {
        this.subs = this.terminator.onDestroy.subscribe(destroy => {
            if (destroy) {
                this.ref.destroy();
            }
        });
    }
    ngOnChanges() {
        this.ref = this.widgetFactory.createWidget(this.container, this.button.widget || 'button');
        this.ref.instance.button = this.button;
        this.ref.instance.formProperty = this.formProperty;
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
};
FormElementComponentAction.ctorParameters = () => [
    { type: WidgetFactory },
    { type: TerminatorService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], FormElementComponentAction.prototype, "button", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FormElementComponentAction.prototype, "formProperty", void 0);
__decorate([
    ViewChild('target', { read: ViewContainerRef, static: true }),
    __metadata("design:type", ViewContainerRef)
], FormElementComponentAction.prototype, "container", void 0);
FormElementComponentAction = __decorate([
    Component({
        selector: 'sf-form-element-action',
        template: '<ng-template #target></ng-template>'
    }),
    __metadata("design:paramtypes", [WidgetFactory,
        TerminatorService])
], FormElementComponentAction);

let WidgetChooserComponent = class WidgetChooserComponent {
    constructor(widgetFactory = null, cdr, terminator) {
        this.widgetFactory = widgetFactory;
        this.cdr = cdr;
        this.terminator = terminator;
        this.widgetInstanciated = new EventEmitter();
    }
    ngOnInit() {
        this.subs = this.terminator.onDestroy.subscribe(destroy => {
            if (destroy) {
                this.ref.destroy();
            }
        });
    }
    ngOnChanges() {
        this.ref = this.widgetFactory.createWidget(this.container, this.widgetInfo.id);
        this.widgetInstanciated.emit(this.ref.instance);
        this.widgetInstance = this.ref.instance;
        this.cdr.detectChanges();
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
};
WidgetChooserComponent.ctorParameters = () => [
    { type: WidgetFactory },
    { type: ChangeDetectorRef },
    { type: TerminatorService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], WidgetChooserComponent.prototype, "widgetInfo", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], WidgetChooserComponent.prototype, "widgetInstanciated", void 0);
__decorate([
    ViewChild('target', { read: ViewContainerRef, static: true }),
    __metadata("design:type", ViewContainerRef)
], WidgetChooserComponent.prototype, "container", void 0);
WidgetChooserComponent = __decorate([
    Component({
        selector: 'sf-widget-chooser',
        template: `<div #target></div>`
    }),
    __metadata("design:paramtypes", [WidgetFactory,
        ChangeDetectorRef,
        TerminatorService])
], WidgetChooserComponent);

class AtomicProperty extends FormProperty {
    setValue(value, onlySelf = false) {
        this._value = value;
        this.updateValueAndValidity(onlySelf, true);
    }
    reset(value = null, onlySelf = true) {
        this.resetValue(value);
        this.updateValueAndValidity(onlySelf, true);
    }
    resetValue(value) {
        if (value === null) {
            if (this.schema.default !== undefined) {
                value = this.schema.default;
            }
            else {
                value = this.fallbackValue();
            }
        }
        this._value = value;
    }
    _hasValue() {
        return this.fallbackValue() !== this.value;
    }
    _updateValue() {
    }
}

class ObjectProperty extends PropertyGroup {
    constructor(formPropertyFactory, schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path) {
        super(schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path);
        this.formPropertyFactory = formPropertyFactory;
        this.propertiesId = [];
        this.createProperties();
    }
    setValue(value, onlySelf) {
        for (const propertyId in value) {
            if (value.hasOwnProperty(propertyId)) {
                this.properties[propertyId].setValue(value[propertyId], true);
            }
        }
        this.updateValueAndValidity(onlySelf, true);
    }
    reset(value, onlySelf = true) {
        value = value || this.schema.default || {};
        this.resetProperties(value);
        this.updateValueAndValidity(onlySelf, true);
    }
    resetProperties(value) {
        for (const propertyId in this.schema.properties) {
            if (this.schema.properties.hasOwnProperty(propertyId)) {
                this.properties[propertyId].reset(value[propertyId], true);
            }
        }
    }
    createProperties() {
        this.properties = {};
        this.propertiesId = [];
        for (const propertyId in this.schema.properties) {
            if (this.schema.properties.hasOwnProperty(propertyId)) {
                const propertySchema = this.schema.properties[propertyId];
                this.properties[propertyId] = this.formPropertyFactory.createProperty(propertySchema, this, propertyId);
                this.propertiesId.push(propertyId);
            }
        }
    }
    _hasValue() {
        return !!Object.keys(this.value).length;
    }
    _updateValue() {
        this.reduceValue();
    }
    _runValidation() {
        super._runValidation();
        if (this._errors) {
            this._errors.forEach(error => {
                const prop = this.searchProperty(error.path.slice(1));
                if (prop) {
                    prop.extendErrors(error);
                }
            });
        }
    }
    reduceValue() {
        const value = {};
        this.forEachChild((property, propertyId) => {
            if (property.visible && property._hasValue()) {
                value[propertyId] = property.value;
            }
        });
        this._value = value;
    }
}
PROPERTY_TYPE_MAPPING.object = (schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path, formPropertyFactory) => {
    return new ObjectProperty(formPropertyFactory, schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path);
};

class ArrayProperty extends PropertyGroup {
    constructor(formPropertyFactory, schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path) {
        super(schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path);
        this.formPropertyFactory = formPropertyFactory;
    }
    addItem(value = null) {
        let newProperty = this.addProperty();
        newProperty.reset(value, false);
        return newProperty;
    }
    addProperty() {
        let newProperty = this.formPropertyFactory.createProperty(this.schema.items, this);
        this.properties.push(newProperty);
        return newProperty;
    }
    removeItem(item) {
        this.properties = this.properties.filter(i => i !== item);
        this.updateValueAndValidity(false, true);
    }
    setValue(value, onlySelf) {
        this.createProperties();
        this.resetProperties(value);
        this.updateValueAndValidity(onlySelf, true);
    }
    _hasValue() {
        return true;
    }
    _updateValue() {
        this.reduceValue();
    }
    reduceValue() {
        const value = [];
        this.forEachChild((property, _) => {
            if (property.visible && property._hasValue()) {
                value.push(property.value);
            }
        });
        this._value = value;
    }
    reset(value, onlySelf = true) {
        value = value || this.schema.default || [];
        this.properties = [];
        this.resetProperties(value);
        this.updateValueAndValidity(onlySelf, true);
    }
    createProperties() {
        this.properties = [];
    }
    resetProperties(value) {
        for (let idx in value) {
            if (value.hasOwnProperty(idx)) {
                let property = this.addProperty();
                property.reset(value[idx], true);
            }
        }
    }
}
PROPERTY_TYPE_MAPPING.array = (schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path, formPropertyFactory) => {
    return new ArrayProperty(formPropertyFactory, schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path);
};

class StringProperty extends AtomicProperty {
    fallbackValue() {
        return '';
    }
}
PROPERTY_TYPE_MAPPING.string = (schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path) => {
    return new StringProperty(schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path);
};

class BooleanProperty extends AtomicProperty {
    fallbackValue() {
        return null;
    }
}
PROPERTY_TYPE_MAPPING.boolean = (schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path) => {
    return new BooleanProperty(schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path);
};

class NumberProperty extends AtomicProperty {
    fallbackValue() {
        return null;
    }
    setValue(value, onlySelf = false) {
        if (typeof value === 'string') {
            if (value.length) {
                value = value.indexOf('.') > -1 ? parseFloat(value) : parseInt(value, 10);
            }
            else {
                value = null;
            }
        }
        this._value = value;
        this.updateValueAndValidity(onlySelf, true);
    }
}
PROPERTY_TYPE_MAPPING.integer = (schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path) => {
    return new NumberProperty(schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path);
};
PROPERTY_TYPE_MAPPING.number = (schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path) => {
    return new NumberProperty(schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path);
};

class Widget {
    constructor() {
        this.id = '';
        this.name = '';
        this.schema = {};
    }
}
class ControlWidget extends Widget {
    ngAfterViewInit() {
        const control = this.control;
        this.formProperty.valueChanges.subscribe((newValue) => {
            if (control.value !== newValue) {
                control.setValue(newValue, { emitEvent: false });
            }
        });
        this.formProperty.errorsChanges.subscribe((errors) => {
            control.setErrors(errors, { emitEvent: true });
            const messages = (errors || [])
                .filter(e => {
                return e.path && e.path.slice(1) === this.formProperty.path;
            })
                .map(e => e.message);
            this.errorMessages = messages.filter((m, i) => messages.indexOf(m) === i);
        });
        control.valueChanges.subscribe((newValue) => {
            this.formProperty.setValue(newValue, false);
        });
    }
}
class ArrayLayoutWidget extends Widget {
    ngAfterViewInit() {
        const control = this.control;
        this.formProperty.errorsChanges.subscribe((errors) => {
            control.setErrors(errors, { emitEvent: true });
        });
    }
}
class ObjectLayoutWidget extends Widget {
    ngAfterViewInit() {
        const control = this.control;
        this.formProperty.errorsChanges.subscribe((errors) => {
            control.setErrors(errors, { emitEvent: true });
        });
    }
}

let ArrayWidget = class ArrayWidget extends ArrayLayoutWidget {
    addItem() {
        this.formProperty.addItem();
        this.updateButtonDisabledState();
    }
    removeItem(item) {
        this.formProperty.removeItem(item);
        this.updateButtonDisabledState();
    }
    trackByIndex(index, item) {
        return index;
    }
    updateButtonDisabledState() {
        this.buttonDisabledAdd = this.isAddButtonDisabled();
        this.buttonDisabledRemove = this.isRemoveButtonDisabled();
    }
    isAddButtonDisabled() {
        if (this.schema.hasOwnProperty('maxItems') && Array.isArray(this.formProperty.properties)) {
            if (this.formProperty.properties.length >= this.schema.maxItems) {
                return true;
            }
        }
        return false;
    }
    isRemoveButtonDisabled() {
        if (this.schema.hasOwnProperty('minItems') && Array.isArray(this.formProperty.properties)) {
            if (this.formProperty.properties.length <= this.schema.minItems) {
                return true;
            }
        }
        return false;
    }
};
ArrayWidget = __decorate([
    Component({
        selector: 'sf-array-widget',
        template: `<div class="widget form-group">
	<label [attr.for]="id" class="horizontal control-label">
		{{ schema.title }}
	</label>
	<span *ngIf="schema.description" class="formHelp">{{schema.description}}</span>
	<div *ngFor="let itemProperty of formProperty.properties">
		<sf-form-element [formProperty]="itemProperty"></sf-form-element>
		<button (click)="removeItem(itemProperty)" class="btn btn-default array-remove-button"
			[disabled]="isRemoveButtonDisabled()" 
			*ngIf="!(schema.hasOwnProperty('minItems') && schema.hasOwnProperty('maxItems') && schema.minItems === schema.maxItems)"
			>
			<span class="glyphicon glyphicon-minus" aria-hidden="true"></span> Remove
		</button>
	</div>
	<button (click)="addItem()" class="btn btn-default array-add-button"
		[disabled]="isAddButtonDisabled()"
		*ngIf="!(schema.hasOwnProperty('minItems') && schema.hasOwnProperty('maxItems') && schema.minItems === schema.maxItems)"
	>
		<span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add
	</button>
</div>`
    })
], ArrayWidget);

let ButtonWidget = class ButtonWidget {
};
ButtonWidget = __decorate([
    Component({
        selector: 'sf-button-widget',
        template: '<button (click)="button.action($event)">{{button.label}}</button>'
    })
], ButtonWidget);

let ObjectWidget = class ObjectWidget extends ObjectLayoutWidget {
};
ObjectWidget = __decorate([
    Component({
        selector: 'sf-form-object',
        template: `<fieldset *ngFor="let fieldset of formProperty.schema.fieldsets">
	<legend *ngIf="fieldset.title">{{fieldset.title}}</legend>
	<div *ngIf="fieldset.description">{{fieldset.description}}</div>
	<div *ngFor="let fieldId of fieldset.fields">
		<sf-form-element [formProperty]="formProperty.getProperty(fieldId)"></sf-form-element>
	</div>
</fieldset>`
    })
], ObjectWidget);

let CheckboxWidget = class CheckboxWidget extends ControlWidget {
    constructor() {
        super(...arguments);
        this.checked = {};
    }
    ngAfterViewInit() {
        const control = this.control;
        this.formProperty.valueChanges.subscribe((newValue) => {
            if (control.value !== newValue) {
                control.setValue(newValue, { emitEvent: false });
                if (newValue && Array.isArray(newValue)) {
                    newValue.map(v => this.checked[v] = true);
                }
            }
        });
        this.formProperty.errorsChanges.subscribe((errors) => {
            control.setErrors(errors, { emitEvent: true });
        });
        control.valueChanges.subscribe((newValue) => {
            this.formProperty.setValue(newValue, false);
        });
    }
    onCheck(el) {
        if (el.checked) {
            this.checked[el.value] = true;
        }
        else {
            delete this.checked[el.value];
        }
        this.formProperty.setValue(Object.keys(this.checked), false);
    }
};
CheckboxWidget = __decorate([
    Component({
        selector: 'sf-checkbox-widget',
        template: `<div class="widget form-group">
    <label [attr.for]="id" class="horizontal control-label">
        {{ schema.title }}
    </label>
	<div *ngIf="schema.type!='array'" class="checkbox">
		<label class="horizontal control-label">
			<input [formControl]="control" [attr.name]="name" [attr.id]="id" [indeterminate]="control.value !== false && control.value !== true ? true :null" type="checkbox" [disabled]="schema.readOnly">
			<input *ngIf="schema.readOnly" [attr.name]="name" type="hidden" [formControl]="control">
			{{schema.description}}
		</label>
	</div>
	<ng-container *ngIf="schema.type==='array'">
		<div *ngFor="let option of schema.items.oneOf" class="checkbox">
			<label class="horizontal control-label">
				<input [attr.name]="name"
					value="{{option.enum[0]}}" type="checkbox" 
					[attr.disabled]="schema.readOnly"
					(change)="onCheck($event.target)"
					[attr.checked]="checked[option.enum[0]] ? true : null"
					[attr.id]="id + '.' + option.enum[0]"
					>
				{{option.description}}
			</label>
		</div>
	</ng-container>
</div>`
    })
], CheckboxWidget);

let FileWidget = class FileWidget extends ControlWidget {
    constructor() {
        super();
        this.reader = new FileReader();
        this.filedata = {};
    }
    ngAfterViewInit() {
        // OVERRIDE ControlWidget ngAfterViewInit() as ReactiveForms do not handle
        // file inputs
        const control = this.control;
        this.formProperty.errorsChanges.subscribe((errors) => {
            control.setErrors(errors, { emitEvent: true });
        });
        this.reader.onloadend = () => {
            this.filedata.data = window.btoa(this.reader.result);
            this.formProperty.setValue(this.filedata, false);
        };
    }
    onFileChange($event) {
        const file = $event.target.files[0];
        this.filedata.filename = file.name;
        this.filedata.size = file.size;
        this.filedata['content-type'] = file.type;
        this.filedata.encoding = 'base64';
        this.reader.readAsBinaryString(file);
    }
};
FileWidget = __decorate([
    Component({
        selector: 'sf-file-widget',
        template: `<div class="widget form-group">
	<label [attr.for]="id" class="horizontal control-label">
		{{ schema.title }}
	</label>
    <span *ngIf="schema.description" class="formHelp">{{schema.description}}</span>
  <input [name]="name" class="text-widget file-widget" [attr.id]="id"
    [formControl]="control" type="file" [attr.disabled]="schema.readOnly?true:null"
    (change)="onFileChange($event)">
	<input *ngIf="schema.readOnly" [attr.name]="name" type="hidden" [formControl]="control">
</div>`
    }),
    __metadata("design:paramtypes", [])
], FileWidget);

let IntegerWidget = class IntegerWidget extends ControlWidget {
};
IntegerWidget = __decorate([
    Component({
        selector: 'sf-integer-widget',
        template: `<div class="widget form-group">
	<label [attr.for]="id" class="horizontal control-label">
		{{ schema.title }}
	</label>
  <span *ngIf="schema.description" class="formHelp">{{schema.description}}</span>
	<input [attr.readonly]="schema.readOnly?true:null" [attr.name]="name"
	[attr.id]="id"
	class="text-widget integer-widget form-control" [formControl]="control"
	[attr.type]="'number'" [attr.min]="schema.minimum" [attr.max]="schema.maximum"
	[attr.placeholder]="schema.placeholder"
	[attr.maxLength]="schema.maxLength || null"
  [attr.minLength]="schema.minLength || null">
</div>`
    })
], IntegerWidget);

let TextAreaWidget = class TextAreaWidget extends ControlWidget {
};
TextAreaWidget = __decorate([
    Component({
        selector: 'sf-textarea-widget',
        template: `<div class="widget form-group">
	<label [attr.for]="id" class="horizontal control-label">
		{{ schema.title }}
	</label>
    <span *ngIf="schema.description" class="formHelp">{{schema.description}}</span>
	<textarea [readonly]="schema.readOnly" [name]="name"
		[attr.id]="id"
		class="text-widget textarea-widget form-control"
		[attr.placeholder]="schema.placeholder"
		[attr.maxLength]="schema.maxLength || null"
    [attr.minLength]="schema.minLength || null"
		[formControl]="control"></textarea>
</div>`
    })
], TextAreaWidget);

let RadioWidget = class RadioWidget extends ControlWidget {
};
RadioWidget = __decorate([
    Component({
        selector: 'sf-radio-widget',
        template: `<div class="widget form-group">
	<label>{{schema.title}}</label>
    <span *ngIf="schema.description" class="formHelp">{{schema.description}}</span>
	<div *ngFor="let option of schema.oneOf" class="radio">
		<label class="horizontal control-label">
			<input [formControl]="control" [attr.name]="name" [attr.id]="id + '.' + option.enum[0]" value="{{option.enum[0]}}" type="radio"  [disabled]="schema.readOnly||option.readOnly">
			{{option.description}}
		</label>
	</div>
	<input *ngIf="schema.readOnly" [attr.name]="name" type="hidden" [formControl]="control">
</div>`
    })
], RadioWidget);

let RangeWidget = class RangeWidget extends ControlWidget {
};
RangeWidget = __decorate([
    Component({
        selector: 'sf-range-widget',
        template: `<div class="widget form-group">
	<label [attr.for]="id" class="horizontal control-label">
		{{ schema.title }}
	</label>
    <span *ngIf="schema.description" class="formHelp">{{schema.description}}</span>	
	<input [name]="name" class="text-widget range-widget" [attr.id]="id"
	[formControl]="control" [attr.type]="'range'" [attr.min]="schema.minimum" [attr.max]="schema.maximum" [disabled]="schema.readOnly?true:null" >
	<input *ngIf="schema.readOnly" [attr.name]="name" type="hidden">
</div>`
    })
], RangeWidget);

let SelectWidget = class SelectWidget extends ControlWidget {
};
SelectWidget = __decorate([
    Component({
        selector: 'sf-select-widget',
        template: `<div class="widget form-group">
	<label [attr.for]="id" class="horizontal control-label">
		{{ schema.title }}
	</label>

	<span *ngIf="schema.description" class="formHelp">
		{{schema.description}}
	</span>

	<select *ngIf="schema.type!='array'" [formControl]="control" [attr.name]="name" [attr.id]="id" [disabled]="schema.readOnly" [disableControl]="schema.readOnly" class="form-control">
		<ng-container *ngIf="schema.oneOf; else use_enum">
			<option *ngFor="let option of schema.oneOf" [ngValue]="option.enum[0]" >{{option.description}}</option>
		</ng-container>
		<ng-template #use_enum>
			<option *ngFor="let option of schema.enum" [ngValue]="option" >{{option}}</option>
		</ng-template>
	</select>

	<select *ngIf="schema.type==='array'" multiple [formControl]="control" [attr.name]="name" [attr.id]="id" [disabled]="schema.readOnly" [disableControl]="schema.readOnly" class="form-control">
    <option *ngFor="let option of schema.items.oneOf" [ngValue]="option.enum[0]" [disabled]="option.readOnly">{{option.description}}</option>
	</select>

	<input *ngIf="schema.readOnly" [attr.name]="name" type="hidden" [formControl]="control">
</div>`
    })
], SelectWidget);

let StringWidget = class StringWidget extends ControlWidget {
    getInputType() {
        if (!this.schema.widget.id || this.schema.widget.id === 'string') {
            return 'text';
        }
        else {
            return this.schema.widget.id;
        }
    }
};
StringWidget = __decorate([
    Component({
        selector: 'sf-string-widget',
        template: `<input *ngIf="this.schema.widget.id ==='hidden'; else notHiddenFieldBlock"
  [attr.name]="name" type="hidden" [formControl]="control">
<ng-template #notHiddenFieldBlock>
<div class="widget form-group">
    <label [attr.for]="id" class="horizontal control-label">
    	{{ schema.title }}
    </label>
    <span *ngIf="schema.description" class="formHelp">{{schema.description}}</span>
    <input [name]="name" [attr.readonly]="(schema.widget.id!=='color') && schema.readOnly?true:null"
    class="text-widget.id textline-widget form-control"
    [attr.type]="!this.schema.widget.id || this.schema.widget.id === 'string' ? 'text' : this.schema.widget.id"
    [attr.id]="id"  [formControl]="control" [attr.placeholder]="schema.placeholder"
    [attr.maxLength]="schema.maxLength || null"
    [attr.minLength]="schema.minLength || null"
    [attr.required]="schema.isRequired || null"
    [attr.disabled]="(schema.widget.id=='color' && schema.readOnly)?true:null">
    <input *ngIf="(schema.widget.id==='color' && schema.readOnly)" [attr.name]="name" type="hidden" [formControl]="control">
</div>
</ng-template>`
    })
], StringWidget);

let DefaultWidgetRegistry = class DefaultWidgetRegistry extends WidgetRegistry {
    constructor() {
        super();
        this.register('array', ArrayWidget);
        this.register('object', ObjectWidget);
        this.register('string', StringWidget);
        this.register('search', StringWidget);
        this.register('tel', StringWidget);
        this.register('url', StringWidget);
        this.register('email', StringWidget);
        this.register('password', StringWidget);
        this.register('color', StringWidget);
        this.register('date', StringWidget);
        this.register('date-time', StringWidget);
        this.register('time', StringWidget);
        this.register('integer', IntegerWidget);
        this.register('number', IntegerWidget);
        this.register('range', RangeWidget);
        this.register('textarea', TextAreaWidget);
        this.register('file', FileWidget);
        this.register('select', SelectWidget);
        this.register('radio', RadioWidget);
        this.register('boolean', CheckboxWidget);
        this.register('checkbox', CheckboxWidget);
        this.register('button', ButtonWidget);
        this.setDefaultWidget(StringWidget);
    }
};
DefaultWidgetRegistry = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], DefaultWidgetRegistry);

let DisableControlDirective = class DisableControlDirective {
    constructor(ngControl) {
        this.ngControl = ngControl;
    }
    set disableControl(condition) {
        const action = condition ? 'disable' : 'enable';
        this.ngControl.control[action]();
    }
};
DisableControlDirective.ctorParameters = () => [
    { type: NgControl }
];
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], DisableControlDirective.prototype, "disableControl", null);
DisableControlDirective = __decorate([
    Directive({
        selector: '[disableControl]'
    }),
    __metadata("design:paramtypes", [NgControl])
], DisableControlDirective);

let DefaultWidget = class DefaultWidget {
};
DefaultWidget = __decorate([
    Component({
        selector: 'sf-default-field',
        template: `<p>Unknow type</p>`
    })
], DefaultWidget);

var SchemaFormModule_1;
const moduleProviders = [
    {
        provide: WidgetRegistry,
        useClass: DefaultWidgetRegistry
    },
    {
        provide: SchemaValidatorFactory,
        useClass: ZSchemaValidatorFactory
    },
    {
        provide: ExpressionCompilerFactory,
        useClass: JEXLExpressionCompilerFactory
    }
];
let SchemaFormModule = SchemaFormModule_1 = class SchemaFormModule {
    static forRoot() {
        return {
            ngModule: SchemaFormModule_1,
            providers: [...moduleProviders]
        };
    }
};
SchemaFormModule = SchemaFormModule_1 = __decorate([
    NgModule({
        imports: [CommonModule, FormsModule, ReactiveFormsModule],
        declarations: [
            FormElementComponent,
            FormElementComponentAction,
            FormComponent,
            WidgetChooserComponent,
            DefaultWidget,
            ArrayWidget,
            ButtonWidget,
            ObjectWidget,
            CheckboxWidget,
            FileWidget,
            IntegerWidget,
            TextAreaWidget,
            RadioWidget,
            RangeWidget,
            SelectWidget,
            StringWidget,
            DisableControlDirective
        ],
        entryComponents: [
            FormElementComponent,
            FormElementComponentAction,
            FormComponent,
            WidgetChooserComponent,
            ArrayWidget,
            ButtonWidget,
            ObjectWidget,
            CheckboxWidget,
            FileWidget,
            IntegerWidget,
            TextAreaWidget,
            RadioWidget,
            RangeWidget,
            SelectWidget,
            StringWidget
        ],
        exports: [
            FormComponent,
            FormElementComponent,
            FormElementComponentAction,
            WidgetChooserComponent,
            ArrayWidget,
            ButtonWidget,
            ObjectWidget,
            CheckboxWidget,
            FileWidget,
            IntegerWidget,
            TextAreaWidget,
            RadioWidget,
            RangeWidget,
            SelectWidget,
            StringWidget,
            DisableControlDirective
        ]
    })
], SchemaFormModule);

let TemplateSchemaService = class TemplateSchemaService {
    constructor() {
        this.changes = new EventEmitter();
    }
    changed() {
        this.changes.emit();
    }
};
TemplateSchemaService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], TemplateSchemaService);

class TemplateSchemaElement {
    getTextContent(elementRef) {
        const nodes = Array.from(elementRef.nativeElement.childNodes);
        const node = nodes.filter((el) => {
            return el.nodeType === el.TEXT_NODE;
        }).pop();
        if (!node || !node.nodeValue) {
            return '';
        }
        return node.nodeValue.trim();
    }
}

var ButtonComponent_1;
let ButtonComponent = ButtonComponent_1 = class ButtonComponent extends TemplateSchemaElement {
    constructor(elementRef) {
        super();
        this.elementRef = elementRef;
        this.label = '';
        this.click = new EventEmitter();
    }
    setLabelFromContent() {
        const textContent = this.getTextContent(this.elementRef);
        // label as @Input takes priority over content text
        if (textContent && !this.label) {
            this.label = textContent;
        }
    }
    ngAfterContentInit() {
        this.setLabelFromContent();
    }
};
ButtonComponent.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input(),
    __metadata("design:type", String)
], ButtonComponent.prototype, "id", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "label", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "widget", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "click", void 0);
ButtonComponent = ButtonComponent_1 = __decorate([
    Component({
        selector: 'sf-button',
        template: "<ng-content></ng-content>\n",
        providers: [
            {
                provide: TemplateSchemaElement,
                useExisting: forwardRef(() => ButtonComponent_1),
            }
        ]
    }),
    __metadata("design:paramtypes", [ElementRef])
], ButtonComponent);

var FieldType;
(function (FieldType) {
    FieldType["String"] = "string";
    FieldType["Object"] = "object";
    FieldType["Array"] = "array";
    FieldType["Boolean"] = "boolean";
    FieldType["Integer"] = "integer";
    FieldType["Number"] = "number";
})(FieldType || (FieldType = {}));

class FieldParent extends TemplateSchemaElement {
    constructor() {
        super(...arguments);
        this.name = '';
    }
    get path() {
        if (!this.name) {
            return '';
        }
        return '/' + this.name;
    }
    getButtons() {
        return this.childButtons.map((button, index) => {
            if (!button.id) {
                const randomString = Math.random().toString(16).substr(2, 8);
                // generate id for button
                button.id = this.name + randomString + '_' + (index + 1);
            }
            // register as button action the EventEmitter click
            this.actionRegistry.register(button.id, button.click.emit.bind(button.click));
            const _button = {
                id: button.id,
                label: button.label,
            };
            if (button.widget) {
                _button.widget = button.widget;
            }
            return _button;
        });
    }
    getFieldsValidators(fields) {
        return fields.reduce((validators, field) => {
            return validators.concat(field.getValidators());
        }, []);
    }
    getFieldsSchema(fields) {
        return fields.reduce((schema, field) => {
            switch (this.type) {
                case FieldType.Array:
                    schema.items = field.getSchema();
                    break;
                default:
                    if (!schema.properties) {
                        schema.properties = {};
                    }
                    schema.properties[field.name] = field.getSchema();
                    break;
            }
            const buttons = field.getButtons();
            if (buttons.length > 0) {
                schema.buttons = buttons;
            }
            if (!field.required) {
                return schema;
            }
            if (!schema.required) {
                schema.required = [];
            }
            schema.required.push(field.name);
            return schema;
        }, {});
    }
}

let ItemComponent = class ItemComponent extends TemplateSchemaElement {
    constructor(elementRef) {
        super();
        this.elementRef = elementRef;
    }
    ngOnInit() {
        this.description = this.getTextContent(this.elementRef);
    }
};
ItemComponent.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], ItemComponent.prototype, "value", void 0);
ItemComponent = __decorate([
    Component({
        selector: 'sf-item',
        template: "<ng-content></ng-content>\n"
    }),
    __metadata("design:paramtypes", [ElementRef])
], ItemComponent);

var FieldComponent_1;
let FieldComponent = FieldComponent_1 = class FieldComponent extends FieldParent {
    constructor(elementRef, templateSchemaService, actionRegistry) {
        super();
        this.elementRef = elementRef;
        this.templateSchemaService = templateSchemaService;
        this.actionRegistry = actionRegistry;
        this.type = FieldType.String;
        this.schema = {};
    }
    getSchema() {
        const { properties, items, required } = this.getFieldsSchema(this.childFields.filter(field => field !== this));
        const oneOf = this.getOneOf();
        const schema = {
            type: this.type
        };
        if (this.title !== undefined) {
            schema.title = this.title;
        }
        if (properties !== undefined) {
            schema.properties = properties;
        }
        if (items !== undefined) {
            schema.items = items;
        }
        // requried child fields
        if (required !== undefined) {
            schema.required = required;
        }
        if (oneOf !== undefined) {
            schema.oneOf = oneOf;
        }
        if (this.description !== undefined) {
            schema.description = this.description;
        }
        if (this.placeholder !== undefined) {
            schema.placeholder = this.placeholder;
        }
        if (this.format !== undefined) {
            schema.format = this.format;
        }
        if (this.widget !== undefined) {
            schema.widget = this.widget;
        }
        if (this.readOnly !== undefined) {
            schema.readOnly = this.readOnly;
        }
        const buttons = this.getButtons();
        if (buttons.length > 0) {
            schema.buttons = buttons;
        }
        // @Input schema takes precedence
        return Object.assign(schema, this.schema);
    }
    getValidators() {
        // registering validator here is not possible since prop full path is needed
        const childValidators = this.getFieldsValidators(this.childFields.filter(field => field !== this));
        const validators = childValidators.map(({ path, validator }) => {
            return {
                path: this.path + path,
                validator
            };
        });
        if (!this.validator) {
            return validators;
        }
        validators.push({ path: this.path, validator: this.validator });
        return validators;
    }
    ngOnChanges(changes) {
        const keys = Object.keys(changes);
        if (keys.length > 0) {
            for (const key of keys) {
                if (!changes[key].isFirstChange()) {
                    // on any input change, force schema change generation
                    this.templateSchemaService.changed();
                    break;
                }
            }
        }
    }
    getOneOf() {
        if (this.childItems.length === 0) {
            return;
        }
        const items = this.childItems.map(({ value, description }) => {
            if (!Array.isArray(value)) {
                return { enum: [value], description };
            }
            return { enum: value, description };
        });
        if (items.length === 0) {
            return;
        }
        return items;
    }
    setTitleFromContent() {
        const textContent = this.getTextContent(this.elementRef);
        //  title as @Input takes priority over content text
        if (textContent && !this.title) {
            this.title = textContent;
        }
    }
    ngAfterContentInit() {
        // cache it
        this.setTitleFromContent();
        merge(this.childFields.changes, this.childItems.changes, this.childButtons.changes)
            .subscribe(() => this.templateSchemaService.changed());
    }
};
FieldComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: TemplateSchemaService },
    { type: ActionRegistry }
];
__decorate([
    ContentChildren(FieldComponent_1),
    __metadata("design:type", QueryList)
], FieldComponent.prototype, "childFields", void 0);
__decorate([
    ContentChildren(ItemComponent),
    __metadata("design:type", QueryList)
], FieldComponent.prototype, "childItems", void 0);
__decorate([
    ContentChildren(ButtonComponent),
    __metadata("design:type", QueryList)
], FieldComponent.prototype, "childButtons", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], FieldComponent.prototype, "name", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FieldComponent.prototype, "type", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], FieldComponent.prototype, "format", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], FieldComponent.prototype, "required", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], FieldComponent.prototype, "readOnly", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], FieldComponent.prototype, "title", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], FieldComponent.prototype, "description", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], FieldComponent.prototype, "placeholder", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FieldComponent.prototype, "widget", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], FieldComponent.prototype, "validator", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FieldComponent.prototype, "schema", void 0);
FieldComponent = FieldComponent_1 = __decorate([
    Component({
        selector: 'sf-field',
        template: "<ng-content ></ng-content>\n"
    }),
    __metadata("design:paramtypes", [ElementRef,
        TemplateSchemaService,
        ActionRegistry])
], FieldComponent);

let TemplateSchemaDirective = class TemplateSchemaDirective extends FieldParent {
    constructor(actionRegistry, validatorRegistry, formComponent, terminatorService, templateSchemaService) {
        super();
        this.actionRegistry = actionRegistry;
        this.validatorRegistry = validatorRegistry;
        this.formComponent = formComponent;
        this.terminatorService = terminatorService;
        this.templateSchemaService = templateSchemaService;
    }
    setFormDocumentSchema(fields) {
        this.actionRegistry.clear();
        this.validatorRegistry.clear();
        const schema = this.getFieldsSchema(fields);
        const validators = this.getFieldsValidators(fields);
        validators.forEach(({ path, validator }) => {
            this.validatorRegistry.register(path, validator);
        });
        const previousSchema = this.formComponent.schema;
        this.formComponent.schema = {
            type: FieldType.Object,
            properties: schema.properties
        };
        if (schema.required && schema.required.length > 0) {
            this.formComponent.schema.requred = schema.required;
        }
        const buttons = this.getButtons();
        if (buttons.length > 0) {
            this.formComponent.schema.buttons = buttons;
        }
        this.formComponent.ngOnChanges({
            schema: new SimpleChange(previousSchema, this.formComponent.schema, Boolean(previousSchema))
        });
    }
    ngAfterContentInit() {
        if (this.childFields.length > 0) {
            this.setFormDocumentSchema(this.childFields.toArray());
        }
        merge(this.childFields.changes, this.templateSchemaService.changes)
            .subscribe(() => {
            this.terminatorService.destroy();
            this.setFormDocumentSchema(this.childFields.toArray());
        });
    }
};
TemplateSchemaDirective.ctorParameters = () => [
    { type: ActionRegistry },
    { type: ValidatorRegistry },
    { type: FormComponent },
    { type: TerminatorService },
    { type: TemplateSchemaService }
];
__decorate([
    ContentChildren(FieldComponent),
    __metadata("design:type", QueryList)
], TemplateSchemaDirective.prototype, "childFields", void 0);
__decorate([
    ContentChildren(ButtonComponent),
    __metadata("design:type", QueryList)
], TemplateSchemaDirective.prototype, "childButtons", void 0);
TemplateSchemaDirective = __decorate([
    Directive({
        selector: 'sf-form[templateSchema]',
        providers: [
            TemplateSchemaService
        ]
    }),
    __metadata("design:paramtypes", [ActionRegistry,
        ValidatorRegistry,
        FormComponent,
        TerminatorService,
        TemplateSchemaService])
], TemplateSchemaDirective);

let TemplateSchemaModule = class TemplateSchemaModule {
};
TemplateSchemaModule = __decorate([
    NgModule({
        imports: [
            CommonModule
        ],
        declarations: [
            TemplateSchemaDirective,
            FieldComponent,
            ButtonComponent,
            ItemComponent
        ],
        exports: [
            TemplateSchemaDirective,
            FieldComponent,
            ButtonComponent,
            ItemComponent
        ]
    })
], TemplateSchemaModule);

/*
 * Public API Surface of schema-form
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ActionRegistry, ArrayLayoutWidget, ArrayProperty, ArrayWidget, AtomicProperty, BindingRegistry, BooleanProperty, ButtonWidget, CheckboxWidget, ControlWidget, DefaultWidgetRegistry, DisableControlDirective, FileWidget, FormComponent, FormElementComponent, FormElementComponentAction, FormProperty, FormPropertyFactory, IntegerWidget, NumberProperty, ObjectLayoutWidget, ObjectProperty, ObjectWidget, RadioWidget, RangeWidget, SchemaFormModule, SchemaPreprocessor, SchemaValidatorFactory, SelectWidget, StringProperty, StringWidget, TemplateSchemaModule, TerminatorService, TextAreaWidget, ValidatorRegistry, Widget, WidgetChooserComponent, WidgetFactory, WidgetRegistry, ZSchemaValidatorFactory, useFactory as ɵa, ActionRegistry as ɵb, ValidatorRegistry as ɵc, PropertyBindingRegistry as ɵd, BindingRegistry as ɵe, SchemaPreprocessor as ɵf, FormPropertyFactory as ɵg, ExpressionCompilerFactory as ɵh, JEXLExpressionCompilerFactory as ɵi, DefaultWidget as ɵj, TemplateSchemaDirective as ɵk, FieldParent as ɵl, TemplateSchemaElement as ɵm, TemplateSchemaService as ɵn, FieldComponent as ɵo, ItemComponent as ɵp, ButtonComponent as ɵq };
//# sourceMappingURL=ngx-schema-form.js.map
