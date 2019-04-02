import { BehaviorSubject, combineLatest, Subject, merge } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import * as ZSchema from 'z-schema';
import { ComponentFactoryResolver, Injectable, ChangeDetectorRef, Component, EventEmitter, Input, Output, ElementRef, Renderer2, ViewChild, ViewContainerRef, NgModule, forwardRef, ContentChildren, Directive, SimpleChange } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class ActionRegistry {
    constructor() {
        this.actions = {};
    }
    /**
     * @return {?}
     */
    clear() {
        this.actions = {};
    }
    /**
     * @param {?} actionId
     * @param {?} action
     * @return {?}
     */
    register(actionId, action) {
        this.actions[actionId] = action;
    }
    /**
     * @param {?} actionId
     * @return {?}
     */
    get(actionId) {
        return this.actions[actionId];
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class FormProperty {
    /**
     * @param {?} schemaValidatorFactory
     * @param {?} validatorRegistry
     * @param {?} schema
     * @param {?} parent
     * @param {?} path
     */
    constructor(schemaValidatorFactory, validatorRegistry, schema, parent, path) {
        this.validatorRegistry = validatorRegistry;
        this.schema = schema;
        this._value = null;
        this._errors = null;
        this._valueChanges = new BehaviorSubject(null);
        this._errorsChanges = new BehaviorSubject(null);
        this._visible = true;
        this._visibilityChanges = new BehaviorSubject(true);
        this.schemaValidator = schemaValidatorFactory.createValidatorFn(this.schema);
        this._parent = parent;
        if (parent) {
            this._root = parent.root;
        }
        else if (this instanceof PropertyGroup) {
            this._root = (/** @type {?} */ ((/** @type {?} */ (this))));
        }
        this._path = path;
    }
    /**
     * @return {?}
     */
    get valueChanges() {
        return this._valueChanges;
    }
    /**
     * @return {?}
     */
    get errorsChanges() {
        return this._errorsChanges;
    }
    /**
     * @return {?}
     */
    get type() {
        return this.schema.type;
    }
    /**
     * @return {?}
     */
    get parent() {
        return this._parent;
    }
    /**
     * @return {?}
     */
    get root() {
        return this._root || (/** @type {?} */ ((/** @type {?} */ (this))));
    }
    /**
     * @return {?}
     */
    get path() {
        return this._path;
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @return {?}
     */
    get visible() {
        return this._visible;
    }
    /**
     * @return {?}
     */
    get valid() {
        return this._errors === null;
    }
    /**
     * @param {?=} onlySelf
     * @param {?=} emitEvent
     * @return {?}
     */
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
     * \@internal
     * @return {?}
     */
    _runValidation() {
        /** @type {?} */
        let errors = this.schemaValidator(this._value) || [];
        /** @type {?} */
        let customValidator = this.validatorRegistry.get(this.path);
        if (customValidator) {
            /** @type {?} */
            let customErrors = customValidator(this.value, this, this.findRoot());
            errors = this.mergeErrors(errors, customErrors);
        }
        if (errors.length === 0) {
            errors = null;
        }
        this._errors = errors;
        this.setErrors(this._errors);
    }
    /**
     * @param {?} errors
     * @param {?} newErrors
     * @return {?}
     */
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
    /**
     * @param {?} errors
     * @return {?}
     */
    setErrors(errors) {
        this._errors = errors;
        this._errorsChanges.next(errors);
    }
    /**
     * @param {?} errors
     * @return {?}
     */
    extendErrors(errors) {
        errors = this.mergeErrors(this._errors || [], errors);
        this.setErrors(errors);
    }
    /**
     * @param {?} path
     * @return {?}
     */
    searchProperty(path) {
        /** @type {?} */
        let prop = this;
        /** @type {?} */
        let base = null;
        /** @type {?} */
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
    /**
     * @return {?}
     */
    findRoot() {
        /** @type {?} */
        let property = this;
        while (property.parent !== null) {
            property = property.parent;
        }
        return (/** @type {?} */ (property));
    }
    /**
     * @param {?} visible
     * @return {?}
     */
    setVisible(visible) {
        this._visible = visible;
        this._visibilityChanges.next(visible);
        this.updateValueAndValidity();
        if (this.parent) {
            this.parent.updateValueAndValidity(false, true);
        }
    }
    /**
     * @return {?}
     */
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
         * @type {?}
         */
        const visibleIfProperty = this.schema.visibleIf;
        /** @type {?} */
        const visibleIfOf = (visibleIfProperty || {}).oneOf || (visibleIfProperty || {}).allOf;
        if (visibleIfOf) {
            for (const visibleIf of visibleIfOf) {
                if (typeof visibleIf === 'object' && Object.keys(visibleIf).length === 0) {
                    this.setVisible(false);
                }
                else if (visibleIf !== undefined) {
                    /** @type {?} */
                    const propertiesBinding = [];
                    for (const dependencyPath in visibleIf) {
                        if (visibleIf.hasOwnProperty(dependencyPath)) {
                            /** @type {?} */
                            const properties = this.findProperties(this, dependencyPath);
                            if ((properties || []).length) {
                                for (const property of properties) {
                                    if (property) {
                                        /** @type {?} */
                                        let valueCheck;
                                        if (this.schema.visibleIf.oneOf) {
                                            valueCheck = property.valueChanges.pipe(map(value => {
                                                if (visibleIf[dependencyPath].indexOf('$ANY$') !== -1) {
                                                    return value.length > 0;
                                                }
                                                else {
                                                    return visibleIf[dependencyPath].indexOf(value) !== -1;
                                                }
                                            }));
                                        }
                                        else if (this.schema.visibleIf.allOf) {
                                            /** @type {?} */
                                            const _chk = (value) => {
                                                for (const item of this.schema.visibleIf.allOf) {
                                                    for (const depPath of Object.keys(item)) {
                                                        /** @type {?} */
                                                        const prop = this.searchProperty(depPath);
                                                        /** @type {?} */
                                                        const propVal = prop._value;
                                                        /** @type {?} */
                                                        let valid = false;
                                                        if (item[depPath].indexOf('$ANY$') !== -1) {
                                                            valid = propVal.length > 0;
                                                        }
                                                        else {
                                                            valid = item[depPath].indexOf(propVal) !== -1;
                                                        }
                                                        if (!valid) {
                                                            return false;
                                                        }
                                                    }
                                                }
                                                return true;
                                            };
                                            valueCheck = property.valueChanges.pipe(map(_chk));
                                        }
                                        /** @type {?} */
                                        const visibilityCheck = property._visibilityChanges;
                                        /** @type {?} */
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
    /**
     * @return {?}
     */
    _bindVisibility() {
        if (this.__bindVisibility())
            return;
        /** @type {?} */
        let visibleIf = this.schema.visibleIf;
        if (typeof visibleIf === 'object' && Object.keys(visibleIf).length === 0) {
            this.setVisible(false);
        }
        else if (visibleIf !== undefined) {
            /** @type {?} */
            let propertiesBinding = [];
            for (let dependencyPath in visibleIf) {
                if (visibleIf.hasOwnProperty(dependencyPath)) {
                    /** @type {?} */
                    const properties = this.findProperties(this, dependencyPath);
                    if ((properties || []).length) {
                        for (const property of properties) {
                            if (property) {
                                /** @type {?} */
                                const valueCheck = property.valueChanges.pipe(map(value => {
                                    if (visibleIf[dependencyPath].indexOf('$ANY$') !== -1) {
                                        return value.length > 0;
                                    }
                                    else {
                                        return visibleIf[dependencyPath].indexOf(value) !== -1;
                                    }
                                }));
                                /** @type {?} */
                                const visibilityCheck = property._visibilityChanges;
                                /** @type {?} */
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
    /**
     * @param {?} dependencyPath
     * @param {?} formProperty
     * @return {?}
     */
    registerMissingVisibilityBinding(dependencyPath, formProperty) {
        formProperty._propertyBindingRegistry.getPropertyBindingsVisibility().add(dependencyPath, formProperty.path);
    }
    /**
     * Finds all <code>formProperties</code> from a path with wildcards.<br/>
     * e.g: <code>/garage/cars/&#42;/tires/&#42;/name</code><br/>
     * @param {?} target
     * @param {?} propertyPath
     * @return {?}
     */
    findProperties(target, propertyPath) {
        /** @type {?} */
        const props = [];
        /** @type {?} */
        const paths = this.findPropertyPaths(target, propertyPath);
        for (const path of paths) {
            /** @type {?} */
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
     * @param {?} target
     * @param {?} path
     * @param {?=} parentPath
     * @return {?}
     */
    findPropertyPaths(target, path, parentPath) {
        /** @type {?} */
        const ix = path.indexOf('*');
        if (-1 !== ix) {
            /** @type {?} */
            const prePath = ix > -1 ? path.substring(0, ix - 1) : path;
            /** @type {?} */
            const subPath = ix > -1 ? path.substring(ix + 1) : path;
            /** @type {?} */
            const prop = target.searchProperty(prePath);
            /** @type {?} */
            let pathFound = [];
            if (prop instanceof PropertyGroup) {
                /** @type {?} */
                const arrProp = (/** @type {?} */ (prop.properties));
                for (let i = 0; i < arrProp.length; i++) {
                    /** @type {?} */
                    const curreItemPath = (parentPath || '') + prePath + (prePath.endsWith('/') ? '' : '/') + i + subPath;
                    /** @type {?} */
                    const curreItemPrePath = (parentPath || '') + prePath + i;
                    if (-1 === curreItemPath.indexOf('*')) {
                        pathFound.push(curreItemPath);
                    }
                    /** @type {?} */
                    const childrenPathFound = this.findPropertyPaths(arrProp[i], subPath, curreItemPrePath);
                    pathFound = pathFound.concat(childrenPathFound);
                }
            }
            return pathFound;
        }
        return [path];
    }
}
/**
 * @abstract
 */
class PropertyGroup extends FormProperty {
    constructor() {
        super(...arguments);
        this._properties = null;
        this._propertyProxyHandler = {
            /**
             * When a new item is added it will be checked for visibility updates to proceed <br/>
             * if any other field has a binding reference to it.<br/>
             * @param {?} target
             * @param {?} p
             * @param {?} value
             * @param {?} receiver
             * @return {?}
             */
            set(target, p, value, receiver) {
                /**
                 * 1) Make sure a canonical path is set
                 * @type {?}
                 */
                const assertCanonicalPath = (propertyValue) => {
                    /** @type {?} */
                    const formProperty = (/** @type {?} */ (propertyValue));
                    if (Array.isArray(target) && propertyValue instanceof FormProperty) {
                        /**
                         * Create a canonical path replacing the last '*' with the elements position in array
                         * \@param propertyPath
                         * \@param indexOfChild
                         * @type {?}
                         */
                        const getCanonicalPath = (propertyPath, indexOfChild) => {
                            /** @type {?} */
                            let pos;
                            if (propertyPath && -1 !== (pos = propertyPath.lastIndexOf('*'))) {
                                return propertyPath.substring(0, pos) + indexOfChild.toString() + propertyPath.substring(pos + 1);
                            }
                        };
                        if (formProperty) {
                            formProperty._canonicalPath = getCanonicalPath(formProperty._canonicalPath, (/** @type {?} */ (p)));
                        }
                    }
                    /** @type {?} */
                    const propertyGroup = (/** @type {?} */ (formProperty));
                    /** @type {?} */
                    const propertyGroupChildren = (/** @type {?} */ ((Array.isArray(propertyGroup.properties) ?
                        propertyGroup.properties :
                        Object.values(propertyGroup.properties || {}))));
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
                 * @type {?}
                 */
                const result = target[(/** @type {?} */ (p))] = value;
                /**
                 * 3) Re-bind the visibility bindings referencing to this canonical paths
                 * @type {?}
                 */
                const rebindVisibility = () => {
                    /** @type {?} */
                    const rebindAll = [property].concat(children);
                    /** @type {?} */
                    const findPropertiesToRebind = (formProperty) => {
                        /** @type {?} */
                        const propertyBindings = formProperty._propertyBindingRegistry.getPropertyBindingsVisibility();
                        /** @type {?} */
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
                        /** @type {?} */
                        const uniqueValues = {};
                        for (const item of rebind) {
                            uniqueValues[item] = item;
                        }
                        return Object.keys(uniqueValues);
                    };
                    for (const _property of rebindAll) {
                        if (_property instanceof FormProperty) {
                            try {
                                /** @type {?} */
                                const rebindPaths = findPropertiesToRebind(_property);
                                for (const rebindPropPath of rebindPaths) {
                                    /** @type {?} */
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
            /**
             * @param {?} target
             * @param {?} p
             * @param {?} receiver
             * @return {?}
             */
            get(target, p, receiver) {
                return target[(/** @type {?} */ (p))];
            },
            /**
             * @param {?} target
             * @param {?} p
             * @return {?}
             */
            deleteProperty(target, p) {
                return delete target[(/** @type {?} */ (p))];
            }
        };
    }
    /**
     * @return {?}
     */
    get properties() {
        return this._properties;
    }
    /**
     * @param {?} properties
     * @return {?}
     */
    set properties(properties) {
        /**
         * Override the setter to add an observer that notices when an item is added or removed.<br/>
         */
        this._properties = new Proxy(properties, this._propertyProxyHandler);
    }
    /**
     * @param {?} path
     * @return {?}
     */
    getProperty(path) {
        /** @type {?} */
        let subPathIdx = path.indexOf('/');
        /** @type {?} */
        let propertyId = subPathIdx !== -1 ? path.substr(0, subPathIdx) : path;
        /** @type {?} */
        let property = this.properties[propertyId];
        if (property !== null && subPathIdx !== -1 && property instanceof PropertyGroup) {
            /** @type {?} */
            let subPath = path.substr(subPathIdx + 1);
            property = ((/** @type {?} */ (property))).getProperty(subPath);
        }
        return property;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachChild(fn) {
        for (let propertyId in this.properties) {
            if (this.properties.hasOwnProperty(propertyId)) {
                /** @type {?} */
                let property = this.properties[propertyId];
                fn(property, propertyId);
            }
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachChildRecursive(fn) {
        this.forEachChild((child) => {
            fn(child);
            if (child instanceof PropertyGroup) {
                ((/** @type {?} */ (child))).forEachChildRecursive(fn);
            }
        });
    }
    /**
     * @return {?}
     */
    _bindVisibility() {
        super._bindVisibility();
        this._bindVisibilityRecursive();
    }
    /**
     * @return {?}
     */
    _bindVisibilityRecursive() {
        this.forEachChildRecursive((property) => {
            property._bindVisibility();
        });
    }
    /**
     * @return {?}
     */
    isRoot() {
        return this === this.root;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class AtomicProperty extends FormProperty {
    /**
     * @param {?} value
     * @param {?=} onlySelf
     * @return {?}
     */
    setValue(value, onlySelf = false) {
        this._value = value;
        this.updateValueAndValidity(onlySelf, true);
    }
    /**
     * @param {?=} value
     * @param {?=} onlySelf
     * @return {?}
     */
    reset(value = null, onlySelf = true) {
        this.resetValue(value);
        this.updateValueAndValidity(onlySelf, true);
    }
    /**
     * @param {?} value
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    _hasValue() {
        return this.fallbackValue() !== this.value;
    }
    /**
     * @return {?}
     */
    _updateValue() {
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NumberProperty extends AtomicProperty {
    /**
     * @return {?}
     */
    fallbackValue() {
        return null;
    }
    /**
     * @param {?} value
     * @param {?=} onlySelf
     * @return {?}
     */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class StringProperty extends AtomicProperty {
    /**
     * @return {?}
     */
    fallbackValue() {
        return '';
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class BooleanProperty extends AtomicProperty {
    /**
     * @return {?}
     */
    fallbackValue() {
        return null;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class ObjectProperty extends PropertyGroup {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class ArrayProperty extends PropertyGroup {
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
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    addItem(value = null) {
        /** @type {?} */
        let newProperty = this.addProperty();
        newProperty.reset(value, false);
        return newProperty;
    }
    /**
     * @return {?}
     */
    addProperty() {
        /** @type {?} */
        let newProperty = this.formPropertyFactory.createProperty(this.schema.items, this);
        ((/** @type {?} */ (this.properties))).push(newProperty);
        return newProperty;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    removeItem(item) {
        this.properties = ((/** @type {?} */ (this.properties))).filter(i => i !== item);
        this.updateValueAndValidity(false, true);
    }
    /**
     * @param {?} value
     * @param {?} onlySelf
     * @return {?}
     */
    setValue(value, onlySelf) {
        this.createProperties();
        this.resetProperties(value);
        this.updateValueAndValidity(onlySelf, true);
    }
    /**
     * @return {?}
     */
    _hasValue() {
        return true;
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
    reduceValue() {
        /** @type {?} */
        const value = [];
        this.forEachChild((property, _) => {
            if (property.visible && property._hasValue()) {
                value.push(property.value);
            }
        });
        this._value = value;
    }
    /**
     * @param {?} value
     * @param {?=} onlySelf
     * @return {?}
     */
    reset(value, onlySelf = true) {
        value = value || this.schema.default || [];
        this.properties = [];
        this.resetProperties(value);
        this.updateValueAndValidity(onlySelf, true);
    }
    /**
     * @return {?}
     */
    createProperties() {
        this.properties = [];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    resetProperties(value) {
        for (let idx in value) {
            if (value.hasOwnProperty(idx)) {
                /** @type {?} */
                let property = this.addProperty();
                property.reset(value[idx], true);
            }
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class FormPropertyFactory {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @param {?} o
 * @return {?}
 */
function isBlank(o) {
    return o === null || o === undefined;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
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
class SchemaPreprocessor {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class ValidatorRegistry {
    constructor() {
        this.validators = [];
    }
    /**
     * @param {?} path
     * @param {?} validator
     * @return {?}
     */
    register(path, validator) {
        this.validators[path] = validator;
    }
    /**
     * @param {?} path
     * @return {?}
     */
    get(path) {
        return this.validators[path];
    }
    /**
     * @return {?}
     */
    clear() {
        this.validators = [];
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class BindingRegistry {
    constructor() {
        this.bindings = [];
    }
    /**
     * @return {?}
     */
    clear() {
        this.bindings = [];
    }
    /**
     * @param {?} path
     * @param {?} binding
     * @return {?}
     */
    register(path, binding) {
        this.bindings[path] = [].concat(binding);
    }
    /**
     * @param {?} path
     * @return {?}
     */
    get(path) {
        return this.bindings[path];
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
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
     * @return {?}
     */
    reset() {
    }
}
class ZSchemaValidatorFactory extends SchemaValidatorFactory {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class WidgetRegistry {
    constructor() {
        this.widgets = {};
    }
    /**
     * @param {?} widget
     * @return {?}
     */
    setDefaultWidget(widget) {
        this.defaultWidget = widget;
    }
    /**
     * @return {?}
     */
    getDefaultWidget() {
        return this.defaultWidget;
    }
    /**
     * @param {?} type
     * @return {?}
     */
    hasWidget(type) {
        return this.widgets.hasOwnProperty(type);
    }
    /**
     * @param {?} type
     * @param {?} widget
     * @return {?}
     */
    register(type, widget) {
        this.widgets[type] = widget;
    }
    /**
     * @param {?} type
     * @return {?}
     */
    getWidgetType(type) {
        if (this.hasWidget(type)) {
            return this.widgets[type];
        }
        return this.defaultWidget;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class WidgetFactory {
    /**
     * @param {?} registry
     * @param {?} resolver
     */
    constructor(registry, resolver) {
        this.registry = registry;
        this.resolver = resolver;
    }
    /**
     * @param {?} container
     * @param {?} type
     * @return {?}
     */
    createWidget(container, type) {
        /** @type {?} */
        let componentClass = this.registry.getWidgetType(type);
        /** @type {?} */
        let componentFactory = this.resolver.resolveComponentFactory(componentClass);
        return container.createComponent(componentFactory);
    }
}
WidgetFactory.decorators = [
    { type: Injectable }
];
/** @nocollapse */
WidgetFactory.ctorParameters = () => [
    { type: WidgetRegistry },
    { type: ComponentFactoryResolver }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class TerminatorService {
    constructor() {
        this.onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    destroy() {
        this.onDestroy.next(true);
    }
}
TerminatorService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TerminatorService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * General purpose propery binding registry
 */
class PropertyBindingRegistry {
    constructor() {
        this.bindings = {};
    }
    /**
     * @param {?} type
     * @return {?}
     */
    getPropertyBindings(type) {
        this.bindings[type] = this.bindings[type] || new PropertyBindings();
        return this.bindings[type];
    }
    /**
     * @return {?}
     */
    getPropertyBindingsVisibility() {
        return this.getPropertyBindings(PropertyBindingTypes.visibility);
    }
}
/** @enum {number} */
const PropertyBindingTypes = {
    visibility: 0,
};
PropertyBindingTypes[PropertyBindingTypes.visibility] = 'visibility';
/**
 * Storage that holds all bindings that are property paths related.<br/>
 */
class PropertyBindings {
    constructor() {
        this.sourcesIndex = new SimplePropertyIndexer();
        this.dependenciesIndex = new SimplePropertyIndexer();
    }
    /**
     * @param {?} dependencyPath
     * @param {?} sourcePropertyPath
     * @return {?}
     */
    add(dependencyPath, sourcePropertyPath) {
        this.sourcesIndex.store(sourcePropertyPath, dependencyPath);
        this.dependenciesIndex.store(dependencyPath, sourcePropertyPath);
    }
    /**
     * @param {?} dependencyPath
     * @return {?}
     */
    findByDependencyPath(dependencyPath) {
        /** @type {?} */
        const result = this.dependenciesIndex.find(dependencyPath);
        result.results = result.results || [];
        /** @type {?} */
        let values = [];
        for (const res of result.results) {
            values = values.concat(Object.keys(res.value));
        }
        return result.found ? values : [];
    }
    /**
     * @param {?} sourcePropertyPath
     * @return {?}
     */
    getBySourcePropertyPath(sourcePropertyPath) {
        /** @type {?} */
        const result = this.sourcesIndex.find(sourcePropertyPath);
        result.results = result.results || [];
        /** @type {?} */
        let values = [];
        for (const res of result.results) {
            values = values.concat(Object.keys(res.value));
        }
        return result.found ? values : [];
    }
    /**
     * @param {?} path
     * @return {?}
     */
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
    /**
     * @param {?} path
     * @return {?}
     */
    _createPathIndex(path) {
        return path
            .replace(new RegExp('//', 'g'), '/')
            .replace(new RegExp('^/', 'g'), '')
            .split('/').filter(item => item);
    }
    /**
     * @param {?} propertyPath
     * @param {?=} value
     * @return {?}
     */
    store(propertyPath, value) {
        this._storeIndex(this._createPathIndex(propertyPath), value);
    }
    /**
     * @param {?} pathIndex
     * @param {?=} value
     * @return {?}
     */
    _storeIndex(pathIndex, value) {
        /** @type {?} */
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
     * @param {?} path
     * @return {?}
     */
    find(path) {
        return this._findInIndex(this._createPathIndex(path));
    }
    /**
     * @param {?} path
     * @return {?}
     */
    _findInIndex(path) {
        /** @type {?} */
        const ixRes = { target: path, found: false, results: [] };
        this.__findIndex(ixRes, path, this.index, []);
        return ixRes;
    }
    /**
     * @param {?} indexerResults
     * @param {?} path
     * @param {?} index
     * @param {?=} parent
     * @return {?}
     */
    __findIndex(indexerResults, path, index, parent) {
        /** @type {?} */
        const p = parent || [];
        /** @type {?} */
        const segment = path[0];
        /** @type {?} */
        const wild = ('*' === segment) ? Object.keys(index) : [];
        /** @type {?} */
        const _keys = ((/** @type {?} */ ((Array.isArray(segment) ? segment : [segment])))).concat(wild);
        /** @type {?} */
        const keys = _keys.filter((item, pos) => '*' !== item && _keys.indexOf(item) === pos);
        if (index['*']) {
            keys.push('*');
        }
        /** @type {?} */
        let paths = [];
        for (const key of keys) {
            /** @type {?} */
            const restPath = path.slice(1);
            /** @type {?} */
            const restIndex = index[key];
            /** @type {?} */
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
            /** @type {?} */
            const restPaths = this.__findIndex(indexerResults, restPath, restIndex, restParent);
            paths = paths.concat(restPaths);
        }
        return paths;
    }
}
SimplePropertyIndexer.MARKER = '$____value';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @param {?} schemaValidatorFactory
 * @param {?} validatorRegistry
 * @param {?} propertyBindingRegistry
 * @return {?}
 */
function useFactory(schemaValidatorFactory, validatorRegistry, propertyBindingRegistry) {
    return new FormPropertyFactory(schemaValidatorFactory, validatorRegistry, propertyBindingRegistry);
}
class FormComponent {
    /**
     * @param {?} formPropertyFactory
     * @param {?} actionRegistry
     * @param {?} validatorRegistry
     * @param {?} bindingRegistry
     * @param {?} cdr
     * @param {?} terminator
     */
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
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        if (this.rootProperty) {
            this.rootProperty.reset(obj, false);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
        if (this.rootProperty) {
            this.rootProperty.valueChanges.subscribe(this.onValueChanges.bind(this));
        }
    }
    // TODO implement
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
    }
    // TODO implement
    // setDisabledState(isDisabled: boolean)?: void
    /**
     * @param {?} changes
     * @return {?}
     */
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
            if (this.model) ;
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
    /**
     * @return {?}
     */
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
    /**
     * @return {?}
     */
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
    /**
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    reset() {
        this.rootProperty.reset(null, true);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setModel(value) {
        if (this.model) {
            Object.assign(this.model, value);
        }
        else {
            this.model = value;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
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
}
FormComponent.decorators = [
    { type: Component, args: [{
                selector: 'sf-form',
                template: `
    <form>
      <sf-form-element
        *ngIf="rootProperty" [formProperty]="rootProperty"></sf-form-element>
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
                        deps: [SchemaValidatorFactory, ValidatorRegistry, PropertyBindingRegistry]
                    },
                    TerminatorService,
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: FormComponent,
                        multi: true
                    }
                ]
            }] }
];
/** @nocollapse */
FormComponent.ctorParameters = () => [
    { type: FormPropertyFactory },
    { type: ActionRegistry },
    { type: ValidatorRegistry },
    { type: BindingRegistry },
    { type: ChangeDetectorRef },
    { type: TerminatorService }
];
FormComponent.propDecorators = {
    schema: [{ type: Input }],
    model: [{ type: Input }],
    actions: [{ type: Input }],
    validators: [{ type: Input }],
    bindings: [{ type: Input }],
    onChange: [{ type: Output }],
    modelChange: [{ type: Output }],
    isValid: [{ type: Output }],
    onErrorChange: [{ type: Output }],
    onErrorsChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class FormElementComponent {
    /**
     * @param {?} actionRegistry
     * @param {?} bindingRegistry
     * @param {?} renderer
     * @param {?} elementRef
     */
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
    /**
     * @return {?}
     */
    ngOnInit() {
        this.parseButtons();
        this.setupBindings();
    }
    /**
     * @return {?}
     */
    setupBindings() {
        /** @type {?} */
        const bindings = this.bindingRegistry.get(this.formProperty.path);
        if ((bindings || []).length) {
            bindings.forEach((binding) => {
                for (const eventId in binding) {
                    this.createBinding(eventId, binding[eventId]);
                }
            });
        }
    }
    /**
     * @param {?} eventId
     * @param {?} listener
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    parseButtons() {
        if (this.formProperty.schema.buttons !== undefined) {
            this.buttons = this.formProperty.schema.buttons;
            for (let button of this.buttons) {
                this.createButtonCallback(button);
            }
        }
    }
    /**
     * @param {?} button
     * @return {?}
     */
    createButtonCallback(button) {
        button.action = (e) => {
            /** @type {?} */
            let action;
            if (button.id && (action = this.actionRegistry.get(button.id))) {
                if (action) {
                    action(this.formProperty, button.parameters);
                }
            }
            e.preventDefault();
        };
    }
    /**
     * @param {?} widget
     * @return {?}
     */
    onWidgetInstanciated(widget) {
        this.widget = widget;
        /** @type {?} */
        let id = 'field' + (FormElementComponent.counter++);
        this.widget.formProperty = this.formProperty;
        this.widget.schema = this.formProperty.schema;
        this.widget.name = id;
        this.widget.id = id;
        this.widget.control = this.control;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.unlisten) {
            this.unlisten.forEach((item) => {
                item();
            });
        }
    }
}
FormElementComponent.counter = 0;
FormElementComponent.decorators = [
    { type: Component, args: [{
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
            }] }
];
/** @nocollapse */
FormElementComponent.ctorParameters = () => [
    { type: ActionRegistry },
    { type: BindingRegistry },
    { type: Renderer2 },
    { type: ElementRef }
];
FormElementComponent.propDecorators = {
    formProperty: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class FormElementComponentAction {
    /**
     * @param {?=} widgetFactory
     * @param {?=} terminator
     */
    constructor(widgetFactory = null, terminator) {
        this.widgetFactory = widgetFactory;
        this.terminator = terminator;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subs = this.terminator.onDestroy.subscribe(destroy => {
            if (destroy) {
                this.ref.destroy();
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.ref = this.widgetFactory.createWidget(this.container, this.button.widget || 'button');
        this.ref.instance.button = this.button;
        this.ref.instance.formProperty = this.formProperty;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
FormElementComponentAction.decorators = [
    { type: Component, args: [{
                selector: 'sf-form-element-action',
                template: '<ng-template #target></ng-template>'
            }] }
];
/** @nocollapse */
FormElementComponentAction.ctorParameters = () => [
    { type: WidgetFactory },
    { type: TerminatorService }
];
FormElementComponentAction.propDecorators = {
    button: [{ type: Input }],
    formProperty: [{ type: Input }],
    container: [{ type: ViewChild, args: ['target', { read: ViewContainerRef },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class WidgetChooserComponent {
    /**
     * @param {?=} widgetFactory
     * @param {?=} cdr
     * @param {?=} terminator
     */
    constructor(widgetFactory = null, cdr, terminator) {
        this.widgetFactory = widgetFactory;
        this.cdr = cdr;
        this.terminator = terminator;
        this.widgetInstanciated = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subs = this.terminator.onDestroy.subscribe(destroy => {
            if (destroy) {
                this.ref.destroy();
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.ref = this.widgetFactory.createWidget(this.container, this.widgetInfo.id);
        this.widgetInstanciated.emit(this.ref.instance);
        this.widgetInstance = this.ref.instance;
        this.cdr.detectChanges();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
WidgetChooserComponent.decorators = [
    { type: Component, args: [{
                selector: 'sf-widget-chooser',
                template: `<div #target></div>`
            }] }
];
/** @nocollapse */
WidgetChooserComponent.ctorParameters = () => [
    { type: WidgetFactory },
    { type: ChangeDetectorRef },
    { type: TerminatorService }
];
WidgetChooserComponent.propDecorators = {
    widgetInfo: [{ type: Input }],
    widgetInstanciated: [{ type: Output }],
    container: [{ type: ViewChild, args: ['target', { read: ViewContainerRef },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
class Widget {
    constructor() {
        this.id = '';
        this.name = '';
        this.schema = {};
    }
}
class ControlWidget extends Widget {
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const control = this.control;
        this.formProperty.valueChanges.subscribe((newValue) => {
            if (control.value !== newValue) {
                control.setValue(newValue, { emitEvent: false });
            }
        });
        this.formProperty.errorsChanges.subscribe((errors) => {
            control.setErrors(errors, { emitEvent: true });
            /** @type {?} */
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
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const control = this.control;
        this.formProperty.errorsChanges.subscribe((errors) => {
            control.setErrors(errors, { emitEvent: true });
        });
    }
}
class ObjectLayoutWidget extends Widget {
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const control = this.control;
        this.formProperty.errorsChanges.subscribe((errors) => {
            control.setErrors(errors, { emitEvent: true });
        });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class ArrayWidget extends ArrayLayoutWidget {
    /**
     * @return {?}
     */
    addItem() {
        this.formProperty.addItem();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    removeItem(item) {
        this.formProperty.removeItem(item);
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackByIndex(index, item) {
        return index;
    }
}
ArrayWidget.decorators = [
    { type: Component, args: [{
                selector: 'sf-array-widget',
                template: `<div class="widget form-group">
	<label [attr.for]="id" class="horizontal control-label">
		{{ schema.title }}
	</label>
	<span *ngIf="schema.description" class="formHelp">{{schema.description}}</span>
	<div *ngFor="let itemProperty of formProperty.properties">
		<sf-form-element [formProperty]="itemProperty"></sf-form-element>
		<button (click)="removeItem(itemProperty)" class="btn btn-default array-remove-button">
			<span class="glyphicon glyphicon-minus" aria-hidden="true"></span> Remove
		</button>
	</div>
	<button (click)="addItem()" class="btn btn-default array-add-button">
		<span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add
	</button>
</div>`
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class ButtonWidget {
}
ButtonWidget.decorators = [
    { type: Component, args: [{
                selector: 'sf-button-widget',
                template: '<button (click)="button.action($event)">{{button.label}}</button>'
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class ObjectWidget extends ObjectLayoutWidget {
}
ObjectWidget.decorators = [
    { type: Component, args: [{
                selector: 'sf-form-object',
                template: `<fieldset *ngFor="let fieldset of formProperty.schema.fieldsets">
	<legend *ngIf="fieldset.title">{{fieldset.title}}</legend>
	<div *ngIf="fieldset.description">{{fieldset.description}}</div>
	<div *ngFor="let fieldId of fieldset.fields">
		<sf-form-element [formProperty]="formProperty.getProperty(fieldId)"></sf-form-element>
	</div>
</fieldset>`
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class CheckboxWidget extends ControlWidget {
    constructor() {
        super(...arguments);
        this.checked = {};
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
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
    /**
     * @param {?} el
     * @return {?}
     */
    onCheck(el) {
        if (el.checked) {
            this.checked[el.value] = true;
        }
        else {
            delete this.checked[el.value];
        }
        this.formProperty.setValue(Object.keys(this.checked), false);
    }
}
CheckboxWidget.decorators = [
    { type: Component, args: [{
                selector: 'sf-checkbox-widget',
                template: `<div class="widget form-group">
    <label [attr.for]="id" class="horizontal control-label">
        {{ schema.title }}
    </label>
	<div *ngIf="schema.type!='array'" class="checkbox">
		<label class="horizontal control-label">
			<input [formControl]="control" [attr.name]="name" [indeterminate]="control.value !== false && control.value !== true ? true :null" type="checkbox" [disabled]="schema.readOnly">
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
					[attr.checked]="checked[option.enum[0]] ? true : null">
				{{option.description}}
			</label>
		</div>
	</ng-container>
</div>`
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class FileWidget extends ControlWidget {
    constructor() {
        super();
        this.reader = new FileReader();
        this.filedata = {};
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // OVERRIDE ControlWidget ngAfterViewInit() as ReactiveForms do not handle
        // file inputs
        /** @type {?} */
        const control = this.control;
        this.formProperty.errorsChanges.subscribe((errors) => {
            control.setErrors(errors, { emitEvent: true });
        });
        this.reader.onloadend = () => {
            this.filedata.data = window.btoa(((/** @type {?} */ (this.reader.result))));
            this.formProperty.setValue(this.filedata, false);
        };
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onFileChange($event) {
        /** @type {?} */
        const file = $event.target.files[0];
        this.filedata.filename = file.name;
        this.filedata.size = file.size;
        this.filedata['content-type'] = file.type;
        this.filedata.encoding = 'base64';
        this.reader.readAsBinaryString(file);
    }
}
FileWidget.decorators = [
    { type: Component, args: [{
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
            }] }
];
/** @nocollapse */
FileWidget.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class IntegerWidget extends ControlWidget {
}
IntegerWidget.decorators = [
    { type: Component, args: [{
                selector: 'sf-integer-widget',
                template: `<div class="widget form-group">
	<label [attr.for]="id" class="horizontal control-label">
		{{ schema.title }}
	</label>
  <span *ngIf="schema.description" class="formHelp">{{schema.description}}</span>
	<input [attr.readonly]="schema.readOnly?true:null" [name]="name"
	class="text-widget integer-widget form-control" [formControl]="control"
	[attr.type]="'number'" [attr.min]="schema.minimum" [attr.max]="schema.maximum"
	[attr.placeholder]="schema.placeholder"
	[attr.maxLength]="schema.maxLength || null"
  [attr.minLength]="schema.minLength || null">
</div>`
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class TextAreaWidget extends ControlWidget {
}
TextAreaWidget.decorators = [
    { type: Component, args: [{
                selector: 'sf-textarea-widget',
                template: `<div class="widget form-group">
	<label [attr.for]="id" class="horizontal control-label">
		{{ schema.title }}
	</label>
    <span *ngIf="schema.description" class="formHelp">{{schema.description}}</span>
	<textarea [readonly]="schema.readOnly" [name]="name"
		class="text-widget textarea-widget form-control"
		[attr.placeholder]="schema.placeholder"
		[attr.maxLength]="schema.maxLength || null"
    [attr.minLength]="schema.minLength || null"
		[formControl]="control"></textarea>
</div>`
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class RadioWidget extends ControlWidget {
}
RadioWidget.decorators = [
    { type: Component, args: [{
                selector: 'sf-radio-widget',
                template: `<div class="widget form-group">
	<label>{{schema.title}}</label>
    <span *ngIf="schema.description" class="formHelp">{{schema.description}}</span>
	<div *ngFor="let option of schema.oneOf" class="radio">
		<label class="horizontal control-label">
			<input [formControl]="control" [attr.name]="name" value="{{option.enum[0]}}" type="radio"  [disabled]="schema.readOnly">
			{{option.description}}
		</label>
	</div>
	<input *ngIf="schema.readOnly" [attr.name]="name" type="hidden" [formControl]="control">
</div>`
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class RangeWidget extends ControlWidget {
}
RangeWidget.decorators = [
    { type: Component, args: [{
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
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class SelectWidget extends ControlWidget {
}
SelectWidget.decorators = [
    { type: Component, args: [{
                selector: 'sf-select-widget',
                template: `<div class="widget form-group">
	<label [attr.for]="id" class="horizontal control-label">
		{{ schema.title }}
	</label>

	<span *ngIf="schema.description" class="formHelp">
		{{schema.description}}
	</span>

	<select *ngIf="schema.type!='array'" [formControl]="control" [attr.name]="name" [disabled]="schema.readOnly" class="form-control">
		<option *ngFor="let option of schema.oneOf" [ngValue]="option.enum[0]" >{{option.description}}</option>
	</select>

	<select *ngIf="schema.type==='array'" multiple [formControl]="control" [attr.name]="name" [disabled]="schema.readOnly" class="form-control">
		<option *ngFor="let option of schema.items.oneOf" [ngValue]="option.enum[0]" >{{option.description}}</option>
	</select>

	<input *ngIf="schema.readOnly" [attr.name]="name" type="hidden" [formControl]="control">
</div>`
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class StringWidget extends ControlWidget {
    /**
     * @return {?}
     */
    getInputType() {
        if (!this.schema.widget.id || this.schema.widget.id === 'string') {
            return 'text';
        }
        else {
            return this.schema.widget.id;
        }
    }
}
StringWidget.decorators = [
    { type: Component, args: [{
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
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class DefaultWidgetRegistry extends WidgetRegistry {
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
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class DefaultWidget {
}
DefaultWidget.decorators = [
    { type: Component, args: [{
                selector: 'sf-default-field',
                template: `<p>Unknow type</p>`
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
const moduleProviders = [
    {
        provide: WidgetRegistry,
        useClass: DefaultWidgetRegistry
    },
    {
        provide: SchemaValidatorFactory,
        useClass: ZSchemaValidatorFactory
    }
];
class SchemaFormModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: SchemaFormModule,
            providers: [...moduleProviders]
        };
    }
}
SchemaFormModule.decorators = [
    { type: NgModule, args: [{
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
                    StringWidget,
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
                    StringWidget
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class TemplateSchemaService {
    constructor() {
        this.changes = new EventEmitter();
    }
    /**
     * @return {?}
     */
    changed() {
        this.changes.emit();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class TemplateSchemaElement {
    /**
     * @param {?} elementRef
     * @return {?}
     */
    getTextContent(elementRef) {
        /** @type {?} */
        const nodes = Array.from(elementRef.nativeElement.childNodes);
        /** @type {?} */
        const node = (/** @type {?} */ (nodes.filter((el) => {
            return el.nodeType === el.TEXT_NODE;
        }).pop()));
        if (!node || !node.nodeValue) {
            return '';
        }
        return node.nodeValue.trim();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class ButtonComponent extends TemplateSchemaElement {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super();
        this.elementRef = elementRef;
        this.label = '';
        this.click = new EventEmitter();
    }
    /**
     * @return {?}
     */
    setLabelFromContent() {
        /** @type {?} */
        const textContent = this.getTextContent(this.elementRef);
        // label as @Input takes priority over content text
        if (textContent && !this.label) {
            this.label = textContent;
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.setLabelFromContent();
    }
}
ButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'sf-button',
                template: "<ng-content></ng-content>\n",
                providers: [
                    {
                        provide: TemplateSchemaElement,
                        useExisting: forwardRef(() => ButtonComponent),
                    }
                ]
            }] }
];
/** @nocollapse */
ButtonComponent.ctorParameters = () => [
    { type: ElementRef }
];
ButtonComponent.propDecorators = {
    id: [{ type: Input }],
    label: [{ type: Input }],
    widget: [{ type: Input }],
    click: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @enum {string} */
const FieldType = {
    String: 'string',
    Object: 'object',
    Array: 'array',
    Boolean: 'boolean',
    Integer: 'integer',
    Number: 'number',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class FieldParent extends TemplateSchemaElement {
    constructor() {
        super(...arguments);
        this.name = '';
    }
    /**
     * @return {?}
     */
    get path() {
        if (!this.name) {
            return '';
        }
        return '/' + this.name;
    }
    /**
     * @return {?}
     */
    getButtons() {
        return this.childButtons.map((button, index) => {
            if (!button.id) {
                /** @type {?} */
                const randomString = Math.random().toString(16).substr(2, 8);
                // generate id for button
                button.id = this.name + randomString + '_' + (index + 1);
            }
            // register as button action the EventEmitter click
            this.actionRegistry.register(button.id, button.click.emit.bind(button.click));
            /** @type {?} */
            const _button = (/** @type {?} */ ({
                id: button.id,
                label: button.label,
            }));
            if (button.widget) {
                _button.widget = button.widget;
            }
            return _button;
        });
    }
    /**
     * @param {?} fields
     * @return {?}
     */
    getFieldsValidators(fields) {
        return fields.reduce((validators, field) => {
            return validators.concat(field.getValidators());
        }, []);
    }
    /**
     * @param {?} fields
     * @return {?}
     */
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
            /** @type {?} */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class ItemComponent extends TemplateSchemaElement {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super();
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.description = this.getTextContent(this.elementRef);
    }
}
ItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'sf-item',
                template: "<ng-content></ng-content>\n"
            }] }
];
/** @nocollapse */
ItemComponent.ctorParameters = () => [
    { type: ElementRef }
];
ItemComponent.propDecorators = {
    value: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class FieldComponent extends FieldParent {
    /**
     * @param {?} elementRef
     * @param {?} templateSchemaService
     * @param {?} actionRegistry
     */
    constructor(elementRef, templateSchemaService, actionRegistry) {
        super();
        this.elementRef = elementRef;
        this.templateSchemaService = templateSchemaService;
        this.actionRegistry = actionRegistry;
        this.type = FieldType.String;
        this.schema = {};
    }
    /**
     * @return {?}
     */
    getSchema() {
        const { properties, items, required } = this.getFieldsSchema(this.childFields.filter(field => field !== this));
        /** @type {?} */
        const oneOf = this.getOneOf();
        /** @type {?} */
        const schema = (/** @type {?} */ ({
            type: this.type
        }));
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
        /** @type {?} */
        const buttons = this.getButtons();
        if (buttons.length > 0) {
            schema.buttons = buttons;
        }
        // @Input schema takes precedence
        return Object.assign(schema, this.schema);
    }
    /**
     * @return {?}
     */
    getValidators() {
        // registering validator here is not possible since prop full path is needed
        /** @type {?} */
        const childValidators = this.getFieldsValidators(this.childFields.filter(field => field !== this));
        /** @type {?} */
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
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
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
    /**
     * @return {?}
     */
    getOneOf() {
        if (this.childItems.length === 0) {
            return;
        }
        /** @type {?} */
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
    /**
     * @return {?}
     */
    setTitleFromContent() {
        /** @type {?} */
        const textContent = this.getTextContent(this.elementRef);
        //  title as @Input takes priority over content text
        if (textContent && !this.title) {
            this.title = textContent;
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // cache it
        this.setTitleFromContent();
        merge(this.childFields.changes, this.childItems.changes, this.childButtons.changes)
            .subscribe(() => this.templateSchemaService.changed());
    }
}
FieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'sf-field',
                template: "<ng-content ></ng-content>\n"
            }] }
];
/** @nocollapse */
FieldComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: TemplateSchemaService },
    { type: ActionRegistry }
];
FieldComponent.propDecorators = {
    childFields: [{ type: ContentChildren, args: [FieldComponent,] }],
    childItems: [{ type: ContentChildren, args: [ItemComponent,] }],
    childButtons: [{ type: ContentChildren, args: [ButtonComponent,] }],
    name: [{ type: Input }],
    type: [{ type: Input }],
    format: [{ type: Input }],
    required: [{ type: Input }],
    readOnly: [{ type: Input }],
    title: [{ type: Input }],
    description: [{ type: Input }],
    placeholder: [{ type: Input }],
    widget: [{ type: Input }],
    validator: [{ type: Input }],
    schema: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class TemplateSchemaDirective extends FieldParent {
    /**
     * @param {?} actionRegistry
     * @param {?} validatorRegistry
     * @param {?} formComponent
     * @param {?} terminatorService
     * @param {?} templateSchemaService
     */
    constructor(actionRegistry, validatorRegistry, formComponent, terminatorService, templateSchemaService) {
        super();
        this.actionRegistry = actionRegistry;
        this.validatorRegistry = validatorRegistry;
        this.formComponent = formComponent;
        this.terminatorService = terminatorService;
        this.templateSchemaService = templateSchemaService;
    }
    /**
     * @param {?} fields
     * @return {?}
     */
    setFormDocumentSchema(fields) {
        this.actionRegistry.clear();
        this.validatorRegistry.clear();
        /** @type {?} */
        const schema = this.getFieldsSchema(fields);
        /** @type {?} */
        const validators = this.getFieldsValidators(fields);
        validators.forEach(({ path, validator }) => {
            this.validatorRegistry.register(path, validator);
        });
        /** @type {?} */
        const previousSchema = this.formComponent.schema;
        this.formComponent.schema = {
            type: FieldType.Object,
            properties: schema.properties
        };
        if (schema.required && schema.required.length > 0) {
            this.formComponent.schema.requred = schema.required;
        }
        /** @type {?} */
        const buttons = this.getButtons();
        if (buttons.length > 0) {
            this.formComponent.schema.buttons = buttons;
        }
        this.formComponent.ngOnChanges({
            schema: new SimpleChange(previousSchema, this.formComponent.schema, Boolean(previousSchema))
        });
    }
    /**
     * @return {?}
     */
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
}
TemplateSchemaDirective.decorators = [
    { type: Directive, args: [{
                selector: 'sf-form[templateSchema]',
                providers: [
                    TemplateSchemaService
                ]
            },] }
];
/** @nocollapse */
TemplateSchemaDirective.ctorParameters = () => [
    { type: ActionRegistry },
    { type: ValidatorRegistry },
    { type: FormComponent },
    { type: TerminatorService },
    { type: TemplateSchemaService }
];
TemplateSchemaDirective.propDecorators = {
    childFields: [{ type: ContentChildren, args: [FieldComponent,] }],
    childButtons: [{ type: ContentChildren, args: [ButtonComponent,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class TemplateSchemaModule {
}
TemplateSchemaModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { FormComponent, FormElementComponent, FormElementComponentAction, WidgetChooserComponent, WidgetRegistry, FormProperty, ArrayProperty, FormPropertyFactory, SchemaPreprocessor, ValidatorRegistry, ActionRegistry, BindingRegistry, SchemaValidatorFactory, ZSchemaValidatorFactory, WidgetFactory, TerminatorService, Widget, ControlWidget, ArrayLayoutWidget, ObjectLayoutWidget, ArrayWidget, ButtonWidget, ObjectWidget, CheckboxWidget, FileWidget, IntegerWidget, TextAreaWidget, RadioWidget, RangeWidget, SelectWidget, StringWidget, DefaultWidgetRegistry, SchemaFormModule, TemplateSchemaModule, DefaultWidget as ɵh, useFactory as ɵa, ActionRegistry as ɵb, BindingRegistry as ɵe, FormPropertyFactory as ɵg, SchemaPreprocessor as ɵf, ValidatorRegistry as ɵc, PropertyBindingRegistry as ɵd, ButtonComponent as ɵo, FieldParent as ɵj, FieldComponent as ɵm, ItemComponent as ɵn, TemplateSchemaElement as ɵk, TemplateSchemaDirective as ɵi, TemplateSchemaService as ɵl };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNjaGVtYS1mb3JtLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL21vZGVsL2FjdGlvbnJlZ2lzdHJ5LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL21vZGVsL2Zvcm1wcm9wZXJ0eS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9tb2RlbC9hdG9taWNwcm9wZXJ0eS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9tb2RlbC9udW1iZXJwcm9wZXJ0eS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9tb2RlbC9zdHJpbmdwcm9wZXJ0eS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9tb2RlbC9ib29sZWFucHJvcGVydHkudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvbW9kZWwvb2JqZWN0cHJvcGVydHkudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvbW9kZWwvYXJyYXlwcm9wZXJ0eS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9tb2RlbC9mb3JtcHJvcGVydHlmYWN0b3J5LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL21vZGVsL3V0aWxzLnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL21vZGVsL3NjaGVtYXByZXByb2Nlc3Nvci50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9tb2RlbC92YWxpZGF0b3JyZWdpc3RyeS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9tb2RlbC9iaW5kaW5ncmVnaXN0cnkudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvc2NoZW1hdmFsaWRhdG9yZmFjdG9yeS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi93aWRnZXRyZWdpc3RyeS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi93aWRnZXRmYWN0b3J5LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL3Rlcm1pbmF0b3Iuc2VydmljZS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9wcm9wZXJ0eS1iaW5kaW5nLXJlZ2lzdHJ5LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL2Zvcm0uY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL2Zvcm1lbGVtZW50LmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9mb3JtZWxlbWVudC5hY3Rpb24uY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL3dpZGdldGNob29zZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL3dpZGdldC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9kZWZhdWx0d2lkZ2V0cy9hcnJheS9hcnJheS53aWRnZXQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvZGVmYXVsdHdpZGdldHMvYnV0dG9uL2J1dHRvbi53aWRnZXQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvZGVmYXVsdHdpZGdldHMvb2JqZWN0L29iamVjdC53aWRnZXQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvZGVmYXVsdHdpZGdldHMvY2hlY2tib3gvY2hlY2tib3gud2lkZ2V0LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL2RlZmF1bHR3aWRnZXRzL2ZpbGUvZmlsZS53aWRnZXQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvZGVmYXVsdHdpZGdldHMvaW50ZWdlci9pbnRlZ2VyLndpZGdldC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9kZWZhdWx0d2lkZ2V0cy90ZXh0YXJlYS90ZXh0YXJlYS53aWRnZXQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvZGVmYXVsdHdpZGdldHMvcmFkaW8vcmFkaW8ud2lkZ2V0LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL2RlZmF1bHR3aWRnZXRzL3JhbmdlL3JhbmdlLndpZGdldC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9kZWZhdWx0d2lkZ2V0cy9zZWxlY3Qvc2VsZWN0LndpZGdldC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9kZWZhdWx0d2lkZ2V0cy9zdHJpbmcvc3RyaW5nLndpZGdldC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9kZWZhdWx0d2lkZ2V0cy9kZWZhdWx0d2lkZ2V0cmVnaXN0cnkudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvZGVmYXVsdC53aWRnZXQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvc2NoZW1hLWZvcm0ubW9kdWxlLnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL3RlbXBsYXRlLXNjaGVtYS90ZW1wbGF0ZS1zY2hlbWEuc2VydmljZS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi90ZW1wbGF0ZS1zY2hlbWEvdGVtcGxhdGUtc2NoZW1hLWVsZW1lbnQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvdGVtcGxhdGUtc2NoZW1hL2J1dHRvbi9idXR0b24uY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL3RlbXBsYXRlLXNjaGVtYS9maWVsZC9maWVsZC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi90ZW1wbGF0ZS1zY2hlbWEvZmllbGQvZmllbGQtcGFyZW50LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL3RlbXBsYXRlLXNjaGVtYS9maWVsZC9pdGVtL2l0ZW0uY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL3RlbXBsYXRlLXNjaGVtYS9maWVsZC9maWVsZC5jb21wb25lbnQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvdGVtcGxhdGUtc2NoZW1hL3RlbXBsYXRlLXNjaGVtYS5kaXJlY3RpdmUudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvdGVtcGxhdGUtc2NoZW1hL3RlbXBsYXRlLXNjaGVtYS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi9hY3Rpb24nO1xuXG5leHBvcnQgY2xhc3MgQWN0aW9uUmVnaXN0cnkge1xuICBhY3Rpb25zOiB7W2tleTogc3RyaW5nXTogQWN0aW9ufSA9IHt9O1xuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuYWN0aW9ucyA9IHt9O1xuICB9XG5cbiAgcmVnaXN0ZXIoYWN0aW9uSWQ6IHN0cmluZywgYWN0aW9uOiBBY3Rpb24pIHtcbiAgICB0aGlzLmFjdGlvbnNbYWN0aW9uSWRdID0gYWN0aW9uO1xuICB9XG5cbiAgZ2V0KGFjdGlvbklkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zW2FjdGlvbklkXTtcbiAgfVxufVxuIiwiaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7U2NoZW1hVmFsaWRhdG9yRmFjdG9yeX0gZnJvbSAnLi4vc2NoZW1hdmFsaWRhdG9yZmFjdG9yeSc7XG5pbXBvcnQge1ZhbGlkYXRvclJlZ2lzdHJ5fSBmcm9tICcuL3ZhbGlkYXRvcnJlZ2lzdHJ5JztcbmltcG9ydCB7UHJvcGVydHlCaW5kaW5nUmVnaXN0cnl9IGZyb20gJy4uL3Byb3BlcnR5LWJpbmRpbmctcmVnaXN0cnknO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRm9ybVByb3BlcnR5IHtcbiAgcHVibGljIHNjaGVtYVZhbGlkYXRvcjogRnVuY3Rpb247XG5cbiAgX3ZhbHVlOiBhbnkgPSBudWxsO1xuICBfZXJyb3JzOiBhbnkgPSBudWxsO1xuICBwcml2YXRlIF92YWx1ZUNoYW5nZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XG4gIHByaXZhdGUgX2Vycm9yc0NoYW5nZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XG4gIHByaXZhdGUgX3Zpc2libGUgPSB0cnVlO1xuICBwcml2YXRlIF92aXNpYmlsaXR5Q2hhbmdlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHByaXZhdGUgX3Jvb3Q6IFByb3BlcnR5R3JvdXA7XG4gIHByaXZhdGUgX3BhcmVudDogUHJvcGVydHlHcm91cDtcbiAgcHJpdmF0ZSBfcGF0aDogc3RyaW5nO1xuICBfcHJvcGVydHlCaW5kaW5nUmVnaXN0cnk6IFByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5O1xuICBfY2Fub25pY2FsUGF0aDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHNjaGVtYVZhbGlkYXRvckZhY3Rvcnk6IFNjaGVtYVZhbGlkYXRvckZhY3RvcnksXG4gICAgICAgICAgICAgIHByaXZhdGUgdmFsaWRhdG9yUmVnaXN0cnk6IFZhbGlkYXRvclJlZ2lzdHJ5LFxuICAgICAgICAgICAgICBwdWJsaWMgc2NoZW1hOiBhbnksXG4gICAgICAgICAgICAgIHBhcmVudDogUHJvcGVydHlHcm91cCxcbiAgICAgICAgICAgICAgcGF0aDogc3RyaW5nKSB7XG4gICAgdGhpcy5zY2hlbWFWYWxpZGF0b3IgPSBzY2hlbWFWYWxpZGF0b3JGYWN0b3J5LmNyZWF0ZVZhbGlkYXRvckZuKHRoaXMuc2NoZW1hKTtcblxuICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICB0aGlzLl9yb290ID0gcGFyZW50LnJvb3Q7XG4gICAgfSBlbHNlIGlmICh0aGlzIGluc3RhbmNlb2YgUHJvcGVydHlHcm91cCkge1xuICAgICAgdGhpcy5fcm9vdCA9IDxQcm9wZXJ0eUdyb3VwPjxhbnk+dGhpcztcbiAgICB9XG4gICAgdGhpcy5fcGF0aCA9IHBhdGg7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZhbHVlQ2hhbmdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWVDaGFuZ2VzO1xuICB9XG5cbiAgcHVibGljIGdldCBlcnJvcnNDaGFuZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLl9lcnJvcnNDaGFuZ2VzO1xuICB9XG5cbiAgcHVibGljIGdldCB0eXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2NoZW1hLnR5cGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBhcmVudCgpOiBQcm9wZXJ0eUdyb3VwIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xuICB9XG5cbiAgcHVibGljIGdldCByb290KCk6IFByb3BlcnR5R3JvdXAge1xuICAgIHJldHVybiB0aGlzLl9yb290IHx8IDxQcm9wZXJ0eUdyb3VwPjxhbnk+dGhpcztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGF0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9wYXRoO1xuICB9XG5cbiAgcHVibGljIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZhbGlkKCkge1xuICAgIHJldHVybiB0aGlzLl9lcnJvcnMgPT09IG51bGw7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3Qgc2V0VmFsdWUodmFsdWU6IGFueSwgb25seVNlbGY6IGJvb2xlYW4pO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCByZXNldCh2YWx1ZTogYW55LCBvbmx5U2VsZjogYm9vbGVhbik7XG5cbiAgcHVibGljIHVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkob25seVNlbGYgPSBmYWxzZSwgZW1pdEV2ZW50ID0gdHJ1ZSkge1xuICAgIHRoaXMuX3VwZGF0ZVZhbHVlKCk7XG5cbiAgICBpZiAoZW1pdEV2ZW50KSB7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlcy5uZXh0KHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMuX3J1blZhbGlkYXRpb24oKTtcblxuICAgIGlmICh0aGlzLnBhcmVudCAmJiAhb25seVNlbGYpIHtcbiAgICAgIHRoaXMucGFyZW50LnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkob25seVNlbGYsIGVtaXRFdmVudCk7XG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgX2hhc1ZhbHVlKCk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqICBAaW50ZXJuYWxcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBfdXBkYXRlVmFsdWUoKTtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBwdWJsaWMgX3J1blZhbGlkYXRpb24oKTogYW55IHtcbiAgICBsZXQgZXJyb3JzID0gdGhpcy5zY2hlbWFWYWxpZGF0b3IodGhpcy5fdmFsdWUpIHx8IFtdO1xuICAgIGxldCBjdXN0b21WYWxpZGF0b3IgPSB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LmdldCh0aGlzLnBhdGgpO1xuICAgIGlmIChjdXN0b21WYWxpZGF0b3IpIHtcbiAgICAgIGxldCBjdXN0b21FcnJvcnMgPSBjdXN0b21WYWxpZGF0b3IodGhpcy52YWx1ZSwgdGhpcywgdGhpcy5maW5kUm9vdCgpKTtcbiAgICAgIGVycm9ycyA9IHRoaXMubWVyZ2VFcnJvcnMoZXJyb3JzLCBjdXN0b21FcnJvcnMpO1xuICAgIH1cbiAgICBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZXJyb3JzID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLl9lcnJvcnMgPSBlcnJvcnM7XG4gICAgdGhpcy5zZXRFcnJvcnModGhpcy5fZXJyb3JzKTtcbiAgfVxuXG4gIHByaXZhdGUgbWVyZ2VFcnJvcnMoZXJyb3JzLCBuZXdFcnJvcnMpIHtcbiAgICBpZiAobmV3RXJyb3JzKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShuZXdFcnJvcnMpKSB7XG4gICAgICAgIGVycm9ycyA9IGVycm9ycy5jb25jYXQoLi4ubmV3RXJyb3JzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9ycy5wdXNoKG5ld0Vycm9ycyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlcnJvcnM7XG4gIH1cblxuICBwcml2YXRlIHNldEVycm9ycyhlcnJvcnMpIHtcbiAgICB0aGlzLl9lcnJvcnMgPSBlcnJvcnM7XG4gICAgdGhpcy5fZXJyb3JzQ2hhbmdlcy5uZXh0KGVycm9ycyk7XG4gIH1cblxuICBwdWJsaWMgZXh0ZW5kRXJyb3JzKGVycm9ycykge1xuICAgIGVycm9ycyA9IHRoaXMubWVyZ2VFcnJvcnModGhpcy5fZXJyb3JzIHx8IFtdLCBlcnJvcnMpO1xuICAgIHRoaXMuc2V0RXJyb3JzKGVycm9ycyk7XG4gIH1cblxuICBzZWFyY2hQcm9wZXJ0eShwYXRoOiBzdHJpbmcpOiBGb3JtUHJvcGVydHkge1xuICAgIGxldCBwcm9wOiBGb3JtUHJvcGVydHkgPSB0aGlzO1xuICAgIGxldCBiYXNlOiBQcm9wZXJ0eUdyb3VwID0gbnVsbDtcblxuICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgIGlmIChwYXRoWzBdID09PSAnLycpIHtcbiAgICAgIGJhc2UgPSB0aGlzLmZpbmRSb290KCk7XG4gICAgICByZXN1bHQgPSBiYXNlLmdldFByb3BlcnR5KHBhdGguc3Vic3RyKDEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2hpbGUgKHJlc3VsdCA9PT0gbnVsbCAmJiBwcm9wLnBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICBwcm9wID0gYmFzZSA9IHByb3AucGFyZW50O1xuICAgICAgICByZXN1bHQgPSBiYXNlLmdldFByb3BlcnR5KHBhdGgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIGZpbmRSb290KCk6IFByb3BlcnR5R3JvdXAge1xuICAgIGxldCBwcm9wZXJ0eTogRm9ybVByb3BlcnR5ID0gdGhpcztcbiAgICB3aGlsZSAocHJvcGVydHkucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICBwcm9wZXJ0eSA9IHByb3BlcnR5LnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIDxQcm9wZXJ0eUdyb3VwPnByb3BlcnR5O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl92aXNpYmxlID0gdmlzaWJsZTtcbiAgICB0aGlzLl92aXNpYmlsaXR5Q2hhbmdlcy5uZXh0KHZpc2libGUpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy5wYXJlbnQudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfX2JpbmRWaXNpYmlsaXR5KCk6IGJvb2xlYW4ge1xuICAgIC8qKlxuICAgICAqIDxwcmU+XG4gICAgICogICAgIFwib25lT2ZcIjpbe1xuICAgICAqICAgICAgICAgXCJwYXRoXCI6W1widmFsdWVcIixcInZhbHVlXCJdXG4gICAgICogICAgIH0se1xuICAgICAqICAgICAgICAgXCJwYXRoXCI6W1widmFsdWVcIixcInZhbHVlXCJdXG4gICAgICogICAgIH1dXG4gICAgICogICAgIDwvcHJlPlxuICAgICAqIDxwcmU+XG4gICAgICogICAgIFwiYWxsT2ZcIjpbe1xuICAgICAqICAgICAgICAgXCJwYXRoXCI6W1widmFsdWVcIixcInZhbHVlXCJdXG4gICAgICogICAgIH0se1xuICAgICAqICAgICAgICAgXCJwYXRoXCI6W1widmFsdWVcIixcInZhbHVlXCJdXG4gICAgICogICAgIH1dXG4gICAgICogICAgIDwvcHJlPlxuICAgICAqL1xuICAgIGNvbnN0IHZpc2libGVJZlByb3BlcnR5ID0gdGhpcy5zY2hlbWEudmlzaWJsZUlmO1xuICAgIGNvbnN0IHZpc2libGVJZk9mID0gKHZpc2libGVJZlByb3BlcnR5IHx8IHt9KS5vbmVPZiB8fCAodmlzaWJsZUlmUHJvcGVydHkgfHwge30pLmFsbE9mO1xuICAgIGlmICh2aXNpYmxlSWZPZikge1xuICAgICAgZm9yIChjb25zdCB2aXNpYmxlSWYgb2YgdmlzaWJsZUlmT2YpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2aXNpYmxlSWYgPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKHZpc2libGVJZikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh2aXNpYmxlSWYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnN0IHByb3BlcnRpZXNCaW5kaW5nID0gW107XG4gICAgICAgICAgZm9yIChjb25zdCBkZXBlbmRlbmN5UGF0aCBpbiB2aXNpYmxlSWYpIHtcbiAgICAgICAgICAgIGlmICh2aXNpYmxlSWYuaGFzT3duUHJvcGVydHkoZGVwZW5kZW5jeVBhdGgpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLmZpbmRQcm9wZXJ0aWVzKHRoaXMsIGRlcGVuZGVuY3lQYXRoKTtcbiAgICAgICAgICAgICAgaWYgKChwcm9wZXJ0aWVzIHx8IFtdKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHByb3BlcnR5IG9mIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWVDaGVjaztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NoZW1hLnZpc2libGVJZi5vbmVPZikge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlQ2hlY2sgPSBwcm9wZXJ0eS52YWx1ZUNoYW5nZXMucGlwZShtYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aXNpYmxlSWZbZGVwZW5kZW5jeVBhdGhdLmluZGV4T2YoJyRBTlkkJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZpc2libGVJZltkZXBlbmRlbmN5UGF0aF0uaW5kZXhPZih2YWx1ZSkgIT09IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zY2hlbWEudmlzaWJsZUlmLmFsbE9mKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgX2NoayA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuc2NoZW1hLnZpc2libGVJZi5hbGxPZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGRlcFBhdGggb2YgT2JqZWN0LmtleXMoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9wID0gdGhpcy5zZWFyY2hQcm9wZXJ0eShkZXBQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9wVmFsID0gcHJvcC5fdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1bZGVwUGF0aF0uaW5kZXhPZignJEFOWSQnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkID0gcHJvcFZhbC5sZW5ndGggPiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IGl0ZW1bZGVwUGF0aF0uaW5kZXhPZihwcm9wVmFsKSAhPT0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWVDaGVjayA9IHByb3BlcnR5LnZhbHVlQ2hhbmdlcy5waXBlKG1hcChfY2hrKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlzaWJpbGl0eUNoZWNrID0gcHJvcGVydHkuX3Zpc2liaWxpdHlDaGFuZ2VzO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmQgPSBjb21iaW5lTGF0ZXN0KFt2YWx1ZUNoZWNrLCB2aXNpYmlsaXR5Q2hlY2tdLCAodjEsIHYyKSA9PiB2MSAmJiB2Mik7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNCaW5kaW5nLnB1c2goYW5kKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdDYW5cXCd0IGZpbmQgcHJvcGVydHkgJyArIGRlcGVuZGVuY3lQYXRoICsgJyBmb3IgdmlzaWJpbGl0eSBjaGVjayBvZiAnICsgdGhpcy5wYXRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyTWlzc2luZ1Zpc2liaWxpdHlCaW5kaW5nKGRlcGVuZGVuY3lQYXRoLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAvLyBub3QgdmlzaWJsZSBpZiBub3QgZXhpc3RlbnRcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZpc2libGUoZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29tYmluZUxhdGVzdChwcm9wZXJ0aWVzQmluZGluZywgKC4uLnZhbHVlczogYm9vbGVhbltdKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzLmluZGV4T2YodHJ1ZSkgIT09IC0xO1xuICAgICAgICAgIH0pLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSkuc3Vic2NyaWJlKCh2aXNpYmxlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFZpc2libGUodmlzaWJsZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIEEgZmllbGQgaXMgdmlzaWJsZSBpZiBBVCBMRUFTVCBPTkUgb2YgdGhlIHByb3BlcnRpZXMgaXQgZGVwZW5kcyBvbiBpcyB2aXNpYmxlIEFORCBoYXMgYSB2YWx1ZSBpbiB0aGUgbGlzdFxuICBwdWJsaWMgX2JpbmRWaXNpYmlsaXR5KCkge1xuICAgIGlmICh0aGlzLl9fYmluZFZpc2liaWxpdHkoKSlcbiAgICAgIHJldHVybjtcbiAgICBsZXQgdmlzaWJsZUlmID0gdGhpcy5zY2hlbWEudmlzaWJsZUlmO1xuICAgIGlmICh0eXBlb2YgdmlzaWJsZUlmID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyh2aXNpYmxlSWYpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICB9IGVsc2UgaWYgKHZpc2libGVJZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgcHJvcGVydGllc0JpbmRpbmcgPSBbXTtcbiAgICAgIGZvciAobGV0IGRlcGVuZGVuY3lQYXRoIGluIHZpc2libGVJZikge1xuICAgICAgICBpZiAodmlzaWJsZUlmLmhhc093blByb3BlcnR5KGRlcGVuZGVuY3lQYXRoKSkge1xuICAgICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLmZpbmRQcm9wZXJ0aWVzKHRoaXMsIGRlcGVuZGVuY3lQYXRoKTtcbiAgICAgICAgICBpZiAoKHByb3BlcnRpZXMgfHwgW10pLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBvZiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlQ2hlY2sgPSBwcm9wZXJ0eS52YWx1ZUNoYW5nZXMucGlwZShtYXAoXG4gICAgICAgICAgICAgICAgICB2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNpYmxlSWZbZGVwZW5kZW5jeVBhdGhdLmluZGV4T2YoJyRBTlkkJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZpc2libGVJZltkZXBlbmRlbmN5UGF0aF0uaW5kZXhPZih2YWx1ZSkgIT09IC0xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmlzaWJpbGl0eUNoZWNrID0gcHJvcGVydHkuX3Zpc2liaWxpdHlDaGFuZ2VzO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFuZCA9IGNvbWJpbmVMYXRlc3QoW3ZhbHVlQ2hlY2ssIHZpc2liaWxpdHlDaGVja10sICh2MSwgdjIpID0+IHYxICYmIHYyKTtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzQmluZGluZy5wdXNoKGFuZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdDYW5cXCd0IGZpbmQgcHJvcGVydHkgJyArIGRlcGVuZGVuY3lQYXRoICsgJyBmb3IgdmlzaWJpbGl0eSBjaGVjayBvZiAnICsgdGhpcy5wYXRoKTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJNaXNzaW5nVmlzaWJpbGl0eUJpbmRpbmcoZGVwZW5kZW5jeVBhdGgsIHRoaXMpO1xuICAgICAgICAgICAgLy8gbm90IHZpc2libGUgaWYgbm90IGV4aXN0ZW50XG4gICAgICAgICAgICB0aGlzLnNldFZpc2libGUoZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb21iaW5lTGF0ZXN0KHByb3BlcnRpZXNCaW5kaW5nLCAoLi4udmFsdWVzOiBib29sZWFuW10pID0+IHtcbiAgICAgICAgcmV0dXJuIHZhbHVlcy5pbmRleE9mKHRydWUpICE9PSAtMTtcbiAgICAgIH0pLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSkuc3Vic2NyaWJlKCh2aXNpYmxlKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0VmlzaWJsZSh2aXNpYmxlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVnaXN0ZXJNaXNzaW5nVmlzaWJpbGl0eUJpbmRpbmcoZGVwZW5kZW5jeVBhdGg6IHN0cmluZywgZm9ybVByb3BlcnR5OiBGb3JtUHJvcGVydHkpIHtcbiAgICBmb3JtUHJvcGVydHkuX3Byb3BlcnR5QmluZGluZ1JlZ2lzdHJ5LmdldFByb3BlcnR5QmluZGluZ3NWaXNpYmlsaXR5KCkuYWRkKGRlcGVuZGVuY3lQYXRoLCBmb3JtUHJvcGVydHkucGF0aCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBGaW5kcyBhbGwgPGNvZGU+Zm9ybVByb3BlcnRpZXM8L2NvZGU+IGZyb20gYSBwYXRoIHdpdGggd2lsZGNhcmRzLjxici8+XG4gICAqIGUuZzogPGNvZGU+L2dhcmFnZS9jYXJzLyYjNDI7L3RpcmVzLyYjNDI7L25hbWU8L2NvZGU+PGJyLz5cbiAgICogQHBhcmFtIHRhcmdldFxuICAgKiBAcGFyYW0gcHJvcGVydHlQYXRoXG4gICAqL1xuICBmaW5kUHJvcGVydGllcyh0YXJnZXQ6IEZvcm1Qcm9wZXJ0eSwgcHJvcGVydHlQYXRoOiBzdHJpbmcpOiBGb3JtUHJvcGVydHlbXSB7XG4gICAgY29uc3QgcHJvcHM6IEZvcm1Qcm9wZXJ0eVtdID0gW107XG4gICAgY29uc3QgcGF0aHMgPSB0aGlzLmZpbmRQcm9wZXJ0eVBhdGhzKHRhcmdldCwgcHJvcGVydHlQYXRoKTtcbiAgICBmb3IgKGNvbnN0IHBhdGggb2YgcGF0aHMpIHtcbiAgICAgIGNvbnN0IHA6IEZvcm1Qcm9wZXJ0eSA9IHRhcmdldC5zZWFyY2hQcm9wZXJ0eShwYXRoKTtcbiAgICAgIGlmIChwKSB7XG4gICAgICAgIHByb3BzLnB1c2gocCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGNhbm9uaWNhbCBwYXRocyBmcm9tIGEgcGF0aCB3aXRoIHdpbGRjYXJkcy5cbiAgICogZS5nOjxici8+XG4gICAqIEZyb206PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLyYjNDI7L3RpcmVzLyYjNDI7L25hbWU8L2NvZGU+PGJyLz5cbiAgICogaXQgY3JlYXRlczo8YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMC90aXJlcy8wL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLzAvdGlyZXMvMS9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8wL3RpcmVzLzIvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMC90aXJlcy8zL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLzEvdGlyZXMvMC9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8yL3RpcmVzLzEvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMy90aXJlcy8yL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLzMvdGlyZXMvMy9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8mIzQyOy90aXJlcy8mIzQyOy9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8mIzQyOy90aXJlcy8yL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLyYjNDI7L3RpcmVzLzMvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8YnIvPmV0Yy4uLlxuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqIEBwYXJhbSBwYXRoXG4gICAqIEBwYXJhbSBwYXJlbnRQYXRoXG4gICAqL1xuICBmaW5kUHJvcGVydHlQYXRocyh0YXJnZXQ6IEZvcm1Qcm9wZXJ0eSwgcGF0aDogc3RyaW5nLCBwYXJlbnRQYXRoPzogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IGl4ID0gcGF0aC5pbmRleE9mKCcqJyk7XG4gICAgaWYgKC0xICE9PSBpeCkge1xuICAgICAgY29uc3QgcHJlUGF0aCA9IGl4ID4gLTEgPyBwYXRoLnN1YnN0cmluZygwLCBpeCAtIDEpIDogcGF0aDtcbiAgICAgIGNvbnN0IHN1YlBhdGggPSBpeCA+IC0xID8gcGF0aC5zdWJzdHJpbmcoaXggKyAxKSA6IHBhdGg7XG4gICAgICBjb25zdCBwcm9wOiBGb3JtUHJvcGVydHkgPSB0YXJnZXQuc2VhcmNoUHJvcGVydHkocHJlUGF0aCk7XG4gICAgICBsZXQgcGF0aEZvdW5kID0gW107XG4gICAgICBpZiAocHJvcCBpbnN0YW5jZW9mIFByb3BlcnR5R3JvdXApIHtcbiAgICAgICAgY29uc3QgYXJyUHJvcCA9IHByb3AucHJvcGVydGllcyBhcyBGb3JtUHJvcGVydHlbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJQcm9wLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY3VycmVJdGVtUGF0aCA9IChwYXJlbnRQYXRoIHx8ICcnKSArIHByZVBhdGggKyAocHJlUGF0aC5lbmRzV2l0aCgnLycpID8gJycgOiAnLycpICsgaSArIHN1YlBhdGg7XG4gICAgICAgICAgY29uc3QgY3VycmVJdGVtUHJlUGF0aCA9IChwYXJlbnRQYXRoIHx8ICcnKSArIHByZVBhdGggKyBpO1xuICAgICAgICAgIGlmICgtMSA9PT0gY3VycmVJdGVtUGF0aC5pbmRleE9mKCcqJykpIHtcbiAgICAgICAgICAgIHBhdGhGb3VuZC5wdXNoKGN1cnJlSXRlbVBhdGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBjaGlsZHJlblBhdGhGb3VuZCA9IHRoaXMuZmluZFByb3BlcnR5UGF0aHMoYXJyUHJvcFtpXSwgc3ViUGF0aCwgY3VycmVJdGVtUHJlUGF0aCk7XG4gICAgICAgICAgcGF0aEZvdW5kID0gcGF0aEZvdW5kLmNvbmNhdChjaGlsZHJlblBhdGhGb3VuZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXRoRm91bmQ7XG4gICAgfVxuICAgIHJldHVybiBbcGF0aF07XG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByb3BlcnR5R3JvdXAgZXh0ZW5kcyBGb3JtUHJvcGVydHkge1xuXG4gIF9wcm9wZXJ0aWVzOiBGb3JtUHJvcGVydHlbXSB8IHsgW2tleTogc3RyaW5nXTogRm9ybVByb3BlcnR5IH0gPSBudWxsO1xuXG4gIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzO1xuICB9XG5cbiAgc2V0IHByb3BlcnRpZXMocHJvcGVydGllczogRm9ybVByb3BlcnR5W10gfCB7IFtrZXk6IHN0cmluZ106IEZvcm1Qcm9wZXJ0eSB9KSB7XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhlIHNldHRlciB0byBhZGQgYW4gb2JzZXJ2ZXIgdGhhdCBub3RpY2VzIHdoZW4gYW4gaXRlbSBpcyBhZGRlZCBvciByZW1vdmVkLjxici8+XG4gICAgICovXG4gICAgdGhpcy5fcHJvcGVydGllcyA9IG5ldyBQcm94eShwcm9wZXJ0aWVzLCB0aGlzLl9wcm9wZXJ0eVByb3h5SGFuZGxlcik7XG4gIH1cblxuICBwcml2YXRlIF9wcm9wZXJ0eVByb3h5SGFuZGxlcjogUHJveHlIYW5kbGVyPEZvcm1Qcm9wZXJ0eVtdIHwgeyBba2V5OiBzdHJpbmddOiBGb3JtUHJvcGVydHkgfT4gPSB7XG4gICAgLyoqXG4gICAgICogV2hlbiBhIG5ldyBpdGVtIGlzIGFkZGVkIGl0IHdpbGwgYmUgY2hlY2tlZCBmb3IgdmlzaWJpbGl0eSB1cGRhdGVzIHRvIHByb2NlZWQgPGJyLz5cbiAgICAgKiBpZiBhbnkgb3RoZXIgZmllbGQgaGFzIGEgYmluZGluZyByZWZlcmVuY2UgdG8gaXQuPGJyLz5cbiAgICAgKi9cbiAgICBzZXQodGFyZ2V0OiBGb3JtUHJvcGVydHlbXSB8IHsgW3A6IHN0cmluZ106IEZvcm1Qcm9wZXJ0eSB9LCBwOiBQcm9wZXJ0eUtleSwgdmFsdWU6IGFueSwgcmVjZWl2ZXI6IGFueSk6IGJvb2xlYW4ge1xuXG4gICAgICAvKipcbiAgICAgICAqIDEpIE1ha2Ugc3VyZSBhIGNhbm9uaWNhbCBwYXRoIGlzIHNldFxuICAgICAgICovXG4gICAgICBjb25zdCBhc3NlcnRDYW5vbmljYWxQYXRoID0gKHByb3BlcnR5VmFsdWU6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBmb3JtUHJvcGVydHkgPSBwcm9wZXJ0eVZhbHVlIGFzIEZvcm1Qcm9wZXJ0eTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSAmJiBwcm9wZXJ0eVZhbHVlIGluc3RhbmNlb2YgRm9ybVByb3BlcnR5KSB7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogQ3JlYXRlIGEgY2Fub25pY2FsIHBhdGggcmVwbGFjaW5nIHRoZSBsYXN0ICcqJyB3aXRoIHRoZSBlbGVtZW50cyBwb3NpdGlvbiBpbiBhcnJheVxuICAgICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eVBhdGhcbiAgICAgICAgICAgKiBAcGFyYW0gaW5kZXhPZkNoaWxkXG4gICAgICAgICAgICovXG4gICAgICAgICAgY29uc3QgZ2V0Q2Fub25pY2FsUGF0aCA9IChwcm9wZXJ0eVBhdGg6IHN0cmluZywgaW5kZXhPZkNoaWxkOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGxldCBwb3M7XG4gICAgICAgICAgICBpZiAocHJvcGVydHlQYXRoICYmIC0xICE9PSAocG9zID0gcHJvcGVydHlQYXRoLmxhc3RJbmRleE9mKCcqJykpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0eVBhdGguc3Vic3RyaW5nKDAsIHBvcykgKyBpbmRleE9mQ2hpbGQudG9TdHJpbmcoKSArIHByb3BlcnR5UGF0aC5zdWJzdHJpbmcocG9zICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAoZm9ybVByb3BlcnR5KSB7XG4gICAgICAgICAgICBmb3JtUHJvcGVydHkuX2Nhbm9uaWNhbFBhdGggPSBnZXRDYW5vbmljYWxQYXRoKGZvcm1Qcm9wZXJ0eS5fY2Fub25pY2FsUGF0aCwgcCBhcyBudW1iZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb3BlcnR5R3JvdXAgPSBmb3JtUHJvcGVydHkgYXMgUHJvcGVydHlHcm91cDtcbiAgICAgICAgY29uc3QgcHJvcGVydHlHcm91cENoaWxkcmVuID0gKEFycmF5LmlzQXJyYXkocHJvcGVydHlHcm91cC5wcm9wZXJ0aWVzKSA/XG4gICAgICAgICAgcHJvcGVydHlHcm91cC5wcm9wZXJ0aWVzIDpcbiAgICAgICAgICBPYmplY3QudmFsdWVzKHByb3BlcnR5R3JvdXAucHJvcGVydGllcyB8fCB7fSkpIGFzIEZvcm1Qcm9wZXJ0eVtdO1xuICAgICAgICBpZiAoKGZvcm1Qcm9wZXJ0eS5wYXRoIHx8ICcnKS5lbmRzV2l0aCgnLyonKSkge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIElmIGl0IGlzIGFuIGFycmF5LCB0aGVuIGFsbCBjaGlsZHJlbiBjYW5vbmljYWwgcGF0aHMgbXVzdCBiZSBjb21wdXRlZCBub3cuXG4gICAgICAgICAgICogVGhlIGNoaWxkcmVuIGRvbid0IGhhdmUgdGhlIHBhcmVudCdzIHBhdGggc2VnbWVudCBzZXQgeWV0LFxuICAgICAgICAgICAqIGJlY2F1c2UgdGhleSBhcmUgY3JlYXRlZCBiZWZvcmUgdGhlIHBhcmVudCBnZXRzIGF0dGFjaGVkIHRvIGl0cyBwYXJlbnQuXG4gICAgICAgICAgICovXG4gICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBwcm9wZXJ0eUdyb3VwQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNoaWxkLl9jYW5vbmljYWxQYXRoID0gZm9ybVByb3BlcnR5Ll9jYW5vbmljYWxQYXRoICsgY2hpbGQuX2Nhbm9uaWNhbFBhdGguc3Vic3RyaW5nKGZvcm1Qcm9wZXJ0eS5wYXRoLmxlbmd0aCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7cHJvcGVydHk6IGZvcm1Qcm9wZXJ0eSwgY2hpbGRyZW46IHByb3BlcnR5R3JvdXBDaGlsZHJlbn07XG4gICAgICB9O1xuICAgICAgY29uc3Qge3Byb3BlcnR5LCBjaGlsZHJlbn0gPSBhc3NlcnRDYW5vbmljYWxQYXRoKHZhbHVlKTtcblxuICAgICAgLyoqXG4gICAgICAgKiAyKSBBZGQgdGhlIG5ldyBwcm9wZXJ0eSBiZWZvcmUgcmViaW5kaW5nLCBzbyBpdCBjYW4gYmUgZm91bmQgYnkgPGNvZGU+X2JpbmRWaXNpYmlsaXR5PC9jb2RlPlxuICAgICAgICovXG4gICAgICBjb25zdCByZXN1bHQgPSB0YXJnZXRbcCBhcyBzdHJpbmddID0gdmFsdWU7XG5cbiAgICAgIC8qKlxuICAgICAgICogMykgUmUtYmluZCB0aGUgdmlzaWJpbGl0eSBiaW5kaW5ncyByZWZlcmVuY2luZyB0byB0aGlzIGNhbm9uaWNhbCBwYXRoc1xuICAgICAgICovXG4gICAgICBjb25zdCByZWJpbmRWaXNpYmlsaXR5ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCByZWJpbmRBbGwgPSBbcHJvcGVydHldLmNvbmNhdChjaGlsZHJlbik7XG4gICAgICAgIGNvbnN0IGZpbmRQcm9wZXJ0aWVzVG9SZWJpbmQgPSAoZm9ybVByb3BlcnR5OiBGb3JtUHJvcGVydHkpID0+IHtcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0eUJpbmRpbmdzID0gZm9ybVByb3BlcnR5Ll9wcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeS5nZXRQcm9wZXJ0eUJpbmRpbmdzVmlzaWJpbGl0eSgpO1xuICAgICAgICAgIGxldCByZWJpbmQ6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgaWYgKGZvcm1Qcm9wZXJ0eS5fY2Fub25pY2FsUGF0aCkge1xuICAgICAgICAgICAgcmViaW5kID0gcmViaW5kLmNvbmNhdChyZWJpbmQuY29uY2F0KHByb3BlcnR5QmluZGluZ3MuZmluZEJ5RGVwZW5kZW5jeVBhdGgoZm9ybVByb3BlcnR5Ll9jYW5vbmljYWxQYXRoKSB8fCBbXSkpO1xuICAgICAgICAgICAgaWYgKGZvcm1Qcm9wZXJ0eS5fY2Fub25pY2FsUGF0aC5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgICAgcmViaW5kID0gcmViaW5kLmNvbmNhdChyZWJpbmQuY29uY2F0KHByb3BlcnR5QmluZGluZ3MuZmluZEJ5RGVwZW5kZW5jeVBhdGgoZm9ybVByb3BlcnR5Ll9jYW5vbmljYWxQYXRoLnN1YnN0cmluZygxKSkgfHwgW10pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmViaW5kID0gcmViaW5kLmNvbmNhdChwcm9wZXJ0eUJpbmRpbmdzLmZpbmRCeURlcGVuZGVuY3lQYXRoKGZvcm1Qcm9wZXJ0eS5wYXRoKSB8fCBbXSk7XG4gICAgICAgICAgaWYgKGZvcm1Qcm9wZXJ0eS5wYXRoLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgcmViaW5kID0gcmViaW5kLmNvbmNhdChyZWJpbmQuY29uY2F0KHByb3BlcnR5QmluZGluZ3MuZmluZEJ5RGVwZW5kZW5jeVBhdGgoZm9ybVByb3BlcnR5LnBhdGguc3Vic3RyaW5nKDEpKSB8fCBbXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB1bmlxdWVWYWx1ZXMgPSB7fTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgcmViaW5kKSB7XG4gICAgICAgICAgICB1bmlxdWVWYWx1ZXNbaXRlbV0gPSBpdGVtO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModW5pcXVlVmFsdWVzKTtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yIChjb25zdCBfcHJvcGVydHkgb2YgcmViaW5kQWxsKSB7XG4gICAgICAgICAgaWYgKF9wcm9wZXJ0eSBpbnN0YW5jZW9mIEZvcm1Qcm9wZXJ0eSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgY29uc3QgcmViaW5kUGF0aHMgPSBmaW5kUHJvcGVydGllc1RvUmViaW5kKF9wcm9wZXJ0eSk7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgcmViaW5kUHJvcFBhdGggb2YgcmViaW5kUGF0aHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWJpbmRQcm9wID0gX3Byb3BlcnR5LnNlYXJjaFByb3BlcnR5KHJlYmluZFByb3BQYXRoKTtcbiAgICAgICAgICAgICAgICByZWJpbmRQcm9wLl9iaW5kVmlzaWJpbGl0eSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1JlYmluZGluZyB2aXNpYmlsaXR5IGVycm9yIGF0IHBhdGg6JywgX3Byb3BlcnR5LnBhdGgsICdwcm9wZXJ0eTonLCBfcHJvcGVydHksIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlYmluZFZpc2liaWxpdHkoKTtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuICAgIGdldCh0YXJnZXQ6IEZvcm1Qcm9wZXJ0eVtdIHwgeyBbcDogc3RyaW5nXTogRm9ybVByb3BlcnR5IH0sIHA6IFByb3BlcnR5S2V5LCByZWNlaXZlcjogYW55KTogYW55IHtcbiAgICAgIHJldHVybiB0YXJnZXRbcCBhcyBzdHJpbmddO1xuICAgIH0sXG4gICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0OiBGb3JtUHJvcGVydHlbXSB8IHsgW3A6IHN0cmluZ106IEZvcm1Qcm9wZXJ0eSB9LCBwOiBQcm9wZXJ0eUtleSk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIGRlbGV0ZSB0YXJnZXRbcCBhcyBzdHJpbmddO1xuICAgIH1cbiAgfTtcblxuICBnZXRQcm9wZXJ0eShwYXRoOiBzdHJpbmcpIHtcbiAgICBsZXQgc3ViUGF0aElkeCA9IHBhdGguaW5kZXhPZignLycpO1xuICAgIGxldCBwcm9wZXJ0eUlkID0gc3ViUGF0aElkeCAhPT0gLTEgPyBwYXRoLnN1YnN0cigwLCBzdWJQYXRoSWR4KSA6IHBhdGg7XG5cbiAgICBsZXQgcHJvcGVydHkgPSB0aGlzLnByb3BlcnRpZXNbcHJvcGVydHlJZF07XG4gICAgaWYgKHByb3BlcnR5ICE9PSBudWxsICYmIHN1YlBhdGhJZHggIT09IC0xICYmIHByb3BlcnR5IGluc3RhbmNlb2YgUHJvcGVydHlHcm91cCkge1xuICAgICAgbGV0IHN1YlBhdGggPSBwYXRoLnN1YnN0cihzdWJQYXRoSWR4ICsgMSk7XG4gICAgICBwcm9wZXJ0eSA9ICg8UHJvcGVydHlHcm91cD5wcm9wZXJ0eSkuZ2V0UHJvcGVydHkoc3ViUGF0aCk7XG4gICAgfVxuICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgfVxuXG4gIHB1YmxpYyBmb3JFYWNoQ2hpbGQoZm46IChmb3JtUHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSwgc3RyOiBTdHJpbmcpID0+IHZvaWQpIHtcbiAgICBmb3IgKGxldCBwcm9wZXJ0eUlkIGluIHRoaXMucHJvcGVydGllcykge1xuICAgICAgaWYgKHRoaXMucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eUlkKSkge1xuICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLnByb3BlcnRpZXNbcHJvcGVydHlJZF07XG4gICAgICAgIGZuKHByb3BlcnR5LCBwcm9wZXJ0eUlkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZm9yRWFjaENoaWxkUmVjdXJzaXZlKGZuOiAoZm9ybVByb3BlcnR5OiBGb3JtUHJvcGVydHkpID0+IHZvaWQpIHtcbiAgICB0aGlzLmZvckVhY2hDaGlsZCgoY2hpbGQpID0+IHtcbiAgICAgIGZuKGNoaWxkKTtcbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIFByb3BlcnR5R3JvdXApIHtcbiAgICAgICAgKDxQcm9wZXJ0eUdyb3VwPmNoaWxkKS5mb3JFYWNoQ2hpbGRSZWN1cnNpdmUoZm4pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIF9iaW5kVmlzaWJpbGl0eSgpIHtcbiAgICBzdXBlci5fYmluZFZpc2liaWxpdHkoKTtcbiAgICB0aGlzLl9iaW5kVmlzaWJpbGl0eVJlY3Vyc2l2ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYmluZFZpc2liaWxpdHlSZWN1cnNpdmUoKSB7XG4gICAgdGhpcy5mb3JFYWNoQ2hpbGRSZWN1cnNpdmUoKHByb3BlcnR5KSA9PiB7XG4gICAgICBwcm9wZXJ0eS5fYmluZFZpc2liaWxpdHkoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBpc1Jvb3QoKSB7XG4gICAgcmV0dXJuIHRoaXMgPT09IHRoaXMucm9vdDtcbiAgfVxufVxuXG5cbiIsImltcG9ydCB7Rm9ybVByb3BlcnR5fSBmcm9tICcuL2Zvcm1wcm9wZXJ0eSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBdG9taWNQcm9wZXJ0eSBleHRlbmRzIEZvcm1Qcm9wZXJ0eSB7XG5cbiAgc2V0VmFsdWUodmFsdWUsIG9ubHlTZWxmID0gZmFsc2UpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShvbmx5U2VsZiwgdHJ1ZSk7XG4gIH1cblxuICByZXNldCh2YWx1ZTogYW55ID0gbnVsbCwgb25seVNlbGYgPSB0cnVlKSB7XG4gICAgdGhpcy5yZXNldFZhbHVlKHZhbHVlKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkob25seVNlbGYsIHRydWUpO1xuICB9XG5cbiAgcmVzZXRWYWx1ZSh2YWx1ZTogYW55KTogYW55IHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLnNjaGVtYS5kZWZhdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLnNjaGVtYS5kZWZhdWx0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmZhbGxiYWNrVmFsdWUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBfaGFzVmFsdWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZmFsbGJhY2tWYWx1ZSgpICE9PSB0aGlzLnZhbHVlO1xuICB9XG5cbiAgYWJzdHJhY3QgZmFsbGJhY2tWYWx1ZSgpOiBhbnk7XG5cbiAgcHVibGljIF91cGRhdGVWYWx1ZSgpIHtcbiAgfVxufVxuIiwiaW1wb3J0IHtBdG9taWNQcm9wZXJ0eX0gZnJvbSAnLi9hdG9taWNwcm9wZXJ0eSc7XG5cbmV4cG9ydCBjbGFzcyBOdW1iZXJQcm9wZXJ0eSBleHRlbmRzIEF0b21pY1Byb3BlcnR5IHtcblxuICBmYWxsYmFja1ZhbHVlKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc2V0VmFsdWUodmFsdWUsIG9ubHlTZWxmID0gZmFsc2UpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKHZhbHVlLmxlbmd0aCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLmluZGV4T2YoJy4nKSA+IC0xID8gcGFyc2VGbG9hdCh2YWx1ZSkgOiBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShvbmx5U2VsZiwgdHJ1ZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEF0b21pY1Byb3BlcnR5IH0gZnJvbSAnLi9hdG9taWNwcm9wZXJ0eSc7XG5cbmV4cG9ydCBjbGFzcyBTdHJpbmdQcm9wZXJ0eSBleHRlbmRzIEF0b21pY1Byb3BlcnR5IHtcblxuICBmYWxsYmFja1ZhbHVlKCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBBdG9taWNQcm9wZXJ0eSB9IGZyb20gJy4vYXRvbWljcHJvcGVydHknO1xuXG5leHBvcnQgY2xhc3MgQm9vbGVhblByb3BlcnR5IGV4dGVuZHMgQXRvbWljUHJvcGVydHkge1xuXG4gIGZhbGxiYWNrVmFsdWUoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7UHJvcGVydHlHcm91cH0gZnJvbSAnLi9mb3JtcHJvcGVydHknO1xuaW1wb3J0IHtGb3JtUHJvcGVydHlGYWN0b3J5fSBmcm9tICcuL2Zvcm1wcm9wZXJ0eWZhY3RvcnknO1xuaW1wb3J0IHtTY2hlbWFWYWxpZGF0b3JGYWN0b3J5fSBmcm9tICcuLi9zY2hlbWF2YWxpZGF0b3JmYWN0b3J5JztcbmltcG9ydCB7VmFsaWRhdG9yUmVnaXN0cnl9IGZyb20gJy4vdmFsaWRhdG9ycmVnaXN0cnknO1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0UHJvcGVydHkgZXh0ZW5kcyBQcm9wZXJ0eUdyb3VwIHtcblxuICBwcml2YXRlIHByb3BlcnRpZXNJZDogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvcm1Qcm9wZXJ0eUZhY3Rvcnk6IEZvcm1Qcm9wZXJ0eUZhY3RvcnksXG4gICAgICAgICAgICAgIHNjaGVtYVZhbGlkYXRvckZhY3Rvcnk6IFNjaGVtYVZhbGlkYXRvckZhY3RvcnksXG4gICAgICAgICAgICAgIHZhbGlkYXRvclJlZ2lzdHJ5OiBWYWxpZGF0b3JSZWdpc3RyeSxcbiAgICAgICAgICAgICAgc2NoZW1hOiBhbnksXG4gICAgICAgICAgICAgIHBhcmVudDogUHJvcGVydHlHcm91cCxcbiAgICAgICAgICAgICAgcGF0aDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NoZW1hVmFsaWRhdG9yRmFjdG9yeSwgdmFsaWRhdG9yUmVnaXN0cnksIHNjaGVtYSwgcGFyZW50LCBwYXRoKTtcbiAgICB0aGlzLmNyZWF0ZVByb3BlcnRpZXMoKTtcbiAgfVxuXG4gIHNldFZhbHVlKHZhbHVlOiBhbnksIG9ubHlTZWxmOiBib29sZWFuKSB7XG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eUlkIGluIHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUuaGFzT3duUHJvcGVydHkocHJvcGVydHlJZCkpIHtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzW3Byb3BlcnR5SWRdLnNldFZhbHVlKHZhbHVlW3Byb3BlcnR5SWRdLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KG9ubHlTZWxmLCB0cnVlKTtcbiAgfVxuXG4gIHJlc2V0KHZhbHVlOiBhbnksIG9ubHlTZWxmID0gdHJ1ZSkge1xuICAgIHZhbHVlID0gdmFsdWUgfHwgdGhpcy5zY2hlbWEuZGVmYXVsdCB8fCB7fTtcbiAgICB0aGlzLnJlc2V0UHJvcGVydGllcyh2YWx1ZSk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KG9ubHlTZWxmLCB0cnVlKTtcbiAgfVxuXG4gIHJlc2V0UHJvcGVydGllcyh2YWx1ZTogYW55KSB7XG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eUlkIGluIHRoaXMuc2NoZW1hLnByb3BlcnRpZXMpIHtcbiAgICAgIGlmICh0aGlzLnNjaGVtYS5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5SWQpKSB7XG4gICAgICAgIHRoaXMucHJvcGVydGllc1twcm9wZXJ0eUlkXS5yZXNldCh2YWx1ZVtwcm9wZXJ0eUlkXSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlUHJvcGVydGllcygpIHtcbiAgICB0aGlzLnByb3BlcnRpZXMgPSB7fTtcbiAgICB0aGlzLnByb3BlcnRpZXNJZCA9IFtdO1xuICAgIGZvciAoY29uc3QgcHJvcGVydHlJZCBpbiB0aGlzLnNjaGVtYS5wcm9wZXJ0aWVzKSB7XG4gICAgICBpZiAodGhpcy5zY2hlbWEucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eUlkKSkge1xuICAgICAgICBjb25zdCBwcm9wZXJ0eVNjaGVtYSA9IHRoaXMuc2NoZW1hLnByb3BlcnRpZXNbcHJvcGVydHlJZF07XG4gICAgICAgIHRoaXMucHJvcGVydGllc1twcm9wZXJ0eUlkXSA9IHRoaXMuZm9ybVByb3BlcnR5RmFjdG9yeS5jcmVhdGVQcm9wZXJ0eShwcm9wZXJ0eVNjaGVtYSwgdGhpcywgcHJvcGVydHlJZCk7XG4gICAgICAgIHRoaXMucHJvcGVydGllc0lkLnB1c2gocHJvcGVydHlJZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIF9oYXNWYWx1ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISFPYmplY3Qua2V5cyh0aGlzLnZhbHVlKS5sZW5ndGg7XG4gIH1cblxuICBwdWJsaWMgX3VwZGF0ZVZhbHVlKCkge1xuICAgIHRoaXMucmVkdWNlVmFsdWUoKTtcbiAgfVxuXG4gIHB1YmxpYyBfcnVuVmFsaWRhdGlvbigpIHtcbiAgICBzdXBlci5fcnVuVmFsaWRhdGlvbigpO1xuXG4gICAgaWYgKHRoaXMuX2Vycm9ycykge1xuICAgICAgdGhpcy5fZXJyb3JzLmZvckVhY2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zdCBwcm9wID0gdGhpcy5zZWFyY2hQcm9wZXJ0eShlcnJvci5wYXRoLnNsaWNlKDEpKTtcbiAgICAgICAgaWYgKHByb3ApIHtcbiAgICAgICAgICBwcm9wLmV4dGVuZEVycm9ycyhlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVkdWNlVmFsdWUoKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWUgPSB7fTtcbiAgICB0aGlzLmZvckVhY2hDaGlsZCgocHJvcGVydHksIHByb3BlcnR5SWQ6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHByb3BlcnR5LnZpc2libGUgJiYgcHJvcGVydHkuX2hhc1ZhbHVlKCkpIHtcbiAgICAgICAgdmFsdWVbcHJvcGVydHlJZF0gPSBwcm9wZXJ0eS52YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICB9XG59XG4iLCJpbXBvcnQge0Zvcm1Qcm9wZXJ0eSwgUHJvcGVydHlHcm91cH0gZnJvbSAnLi9mb3JtcHJvcGVydHknO1xuaW1wb3J0IHtGb3JtUHJvcGVydHlGYWN0b3J5fSBmcm9tICcuL2Zvcm1wcm9wZXJ0eWZhY3RvcnknO1xuaW1wb3J0IHtTY2hlbWFWYWxpZGF0b3JGYWN0b3J5fSBmcm9tICcuLi9zY2hlbWF2YWxpZGF0b3JmYWN0b3J5JztcbmltcG9ydCB7VmFsaWRhdG9yUmVnaXN0cnl9IGZyb20gJy4vdmFsaWRhdG9ycmVnaXN0cnknO1xuXG5leHBvcnQgY2xhc3MgQXJyYXlQcm9wZXJ0eSBleHRlbmRzIFByb3BlcnR5R3JvdXAge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybVByb3BlcnR5RmFjdG9yeTogRm9ybVByb3BlcnR5RmFjdG9yeSxcbiAgICAgICAgICAgICAgc2NoZW1hVmFsaWRhdG9yRmFjdG9yeTogU2NoZW1hVmFsaWRhdG9yRmFjdG9yeSxcbiAgICAgICAgICAgICAgdmFsaWRhdG9yUmVnaXN0cnk6IFZhbGlkYXRvclJlZ2lzdHJ5LFxuICAgICAgICAgICAgICBzY2hlbWE6IGFueSxcbiAgICAgICAgICAgICAgcGFyZW50OiBQcm9wZXJ0eUdyb3VwLFxuICAgICAgICAgICAgICBwYXRoOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCB2YWxpZGF0b3JSZWdpc3RyeSwgc2NoZW1hLCBwYXJlbnQsIHBhdGgpO1xuICB9XG5cbiAgYWRkSXRlbSh2YWx1ZTogYW55ID0gbnVsbCk6IEZvcm1Qcm9wZXJ0eSB7XG4gICAgbGV0IG5ld1Byb3BlcnR5ID0gdGhpcy5hZGRQcm9wZXJ0eSgpO1xuICAgIG5ld1Byb3BlcnR5LnJlc2V0KHZhbHVlLCBmYWxzZSk7XG4gICAgcmV0dXJuIG5ld1Byb3BlcnR5O1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRQcm9wZXJ0eSgpIHtcbiAgICBsZXQgbmV3UHJvcGVydHkgPSB0aGlzLmZvcm1Qcm9wZXJ0eUZhY3RvcnkuY3JlYXRlUHJvcGVydHkodGhpcy5zY2hlbWEuaXRlbXMsIHRoaXMpO1xuICAgICg8Rm9ybVByb3BlcnR5W10+dGhpcy5wcm9wZXJ0aWVzKS5wdXNoKG5ld1Byb3BlcnR5KTtcbiAgICByZXR1cm4gbmV3UHJvcGVydHk7XG4gIH1cblxuICByZW1vdmVJdGVtKGl0ZW06IEZvcm1Qcm9wZXJ0eSkge1xuICAgIHRoaXMucHJvcGVydGllcyA9ICg8Rm9ybVByb3BlcnR5W10+dGhpcy5wcm9wZXJ0aWVzKS5maWx0ZXIoaSA9PiBpICE9PSBpdGVtKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoZmFsc2UsIHRydWUpO1xuICB9XG5cbiAgc2V0VmFsdWUodmFsdWU6IGFueSwgb25seVNlbGY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmNyZWF0ZVByb3BlcnRpZXMoKTtcbiAgICB0aGlzLnJlc2V0UHJvcGVydGllcyh2YWx1ZSk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KG9ubHlTZWxmLCB0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyBfaGFzVmFsdWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgX3VwZGF0ZVZhbHVlKCkge1xuICAgIHRoaXMucmVkdWNlVmFsdWUoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVkdWNlVmFsdWUoKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWUgPSBbXTtcbiAgICB0aGlzLmZvckVhY2hDaGlsZCgocHJvcGVydHksIF8pID0+IHtcbiAgICAgIGlmIChwcm9wZXJ0eS52aXNpYmxlICYmIHByb3BlcnR5Ll9oYXNWYWx1ZSgpKSB7XG4gICAgICAgIHZhbHVlLnB1c2gocHJvcGVydHkudmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gIH1cblxuICByZXNldCh2YWx1ZTogYW55LCBvbmx5U2VsZiA9IHRydWUpIHtcbiAgICB2YWx1ZSA9IHZhbHVlIHx8IHRoaXMuc2NoZW1hLmRlZmF1bHQgfHwgW107XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0gW107XG4gICAgdGhpcy5yZXNldFByb3BlcnRpZXModmFsdWUpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShvbmx5U2VsZiwgdHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVByb3BlcnRpZXMoKSB7XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0gW107XG4gIH1cblxuXG4gIHByaXZhdGUgcmVzZXRQcm9wZXJ0aWVzKHZhbHVlOiBhbnkpIHtcbiAgICBmb3IgKGxldCBpZHggaW4gdmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eShpZHgpKSB7XG4gICAgICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMuYWRkUHJvcGVydHkoKTtcbiAgICAgICAgcHJvcGVydHkucmVzZXQodmFsdWVbaWR4XSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge0Zvcm1Qcm9wZXJ0eSwgUHJvcGVydHlHcm91cH0gZnJvbSAnLi9mb3JtcHJvcGVydHknO1xuaW1wb3J0IHtOdW1iZXJQcm9wZXJ0eX0gZnJvbSAnLi9udW1iZXJwcm9wZXJ0eSc7XG5pbXBvcnQge1N0cmluZ1Byb3BlcnR5fSBmcm9tICcuL3N0cmluZ3Byb3BlcnR5JztcbmltcG9ydCB7Qm9vbGVhblByb3BlcnR5fSBmcm9tICcuL2Jvb2xlYW5wcm9wZXJ0eSc7XG5pbXBvcnQge09iamVjdFByb3BlcnR5fSBmcm9tICcuL29iamVjdHByb3BlcnR5JztcbmltcG9ydCB7QXJyYXlQcm9wZXJ0eX0gZnJvbSAnLi9hcnJheXByb3BlcnR5JztcbmltcG9ydCB7U2NoZW1hVmFsaWRhdG9yRmFjdG9yeX0gZnJvbSAnLi4vc2NoZW1hdmFsaWRhdG9yZmFjdG9yeSc7XG5pbXBvcnQge1ZhbGlkYXRvclJlZ2lzdHJ5fSBmcm9tICcuL3ZhbGlkYXRvcnJlZ2lzdHJ5JztcbmltcG9ydCB7UHJvcGVydHlCaW5kaW5nUmVnaXN0cnl9IGZyb20gJy4uL3Byb3BlcnR5LWJpbmRpbmctcmVnaXN0cnknO1xuXG5leHBvcnQgY2xhc3MgRm9ybVByb3BlcnR5RmFjdG9yeSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzY2hlbWFWYWxpZGF0b3JGYWN0b3J5OiBTY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCBwcml2YXRlIHZhbGlkYXRvclJlZ2lzdHJ5OiBWYWxpZGF0b3JSZWdpc3RyeSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeTogUHJvcGVydHlCaW5kaW5nUmVnaXN0cnkpIHtcbiAgfVxuXG4gIGNyZWF0ZVByb3BlcnR5KHNjaGVtYTogYW55LCBwYXJlbnQ6IFByb3BlcnR5R3JvdXAgPSBudWxsLCBwcm9wZXJ0eUlkPzogc3RyaW5nKTogRm9ybVByb3BlcnR5IHtcbiAgICBsZXQgbmV3UHJvcGVydHkgPSBudWxsO1xuICAgIGxldCBwYXRoID0gJyc7XG4gICAgbGV0IF9jYW5vbmljYWxQYXRoID0gJyc7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgcGF0aCArPSBwYXJlbnQucGF0aDtcbiAgICAgIGlmIChwYXJlbnQucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHBhdGggKz0gJy8nO1xuICAgICAgICBfY2Fub25pY2FsUGF0aCArPSAnLyc7XG4gICAgICB9XG4gICAgICBpZiAocGFyZW50LnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHBhdGggKz0gcHJvcGVydHlJZDtcbiAgICAgICAgX2Nhbm9uaWNhbFBhdGggKz0gcHJvcGVydHlJZDtcbiAgICAgIH0gZWxzZSBpZiAocGFyZW50LnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgICAgcGF0aCArPSAnKic7XG4gICAgICAgIF9jYW5vbmljYWxQYXRoICs9ICcqJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93ICdJbnN0YW5jaWF0aW9uIG9mIGEgRm9ybVByb3BlcnR5IHdpdGggYW4gdW5rbm93biBwYXJlbnQgdHlwZTogJyArIHBhcmVudC50eXBlO1xuICAgICAgfVxuICAgICAgX2Nhbm9uaWNhbFBhdGggPSAocGFyZW50Ll9jYW5vbmljYWxQYXRoIHx8IHBhcmVudC5wYXRoKSArIF9jYW5vbmljYWxQYXRoO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXRoID0gJy8nO1xuICAgICAgX2Nhbm9uaWNhbFBhdGggPSAnLyc7XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYS4kcmVmKSB7XG4gICAgICBjb25zdCByZWZTY2hlbWEgPSB0aGlzLnNjaGVtYVZhbGlkYXRvckZhY3RvcnkuZ2V0U2NoZW1hKHBhcmVudC5yb290LnNjaGVtYSwgc2NoZW1hLiRyZWYpO1xuICAgICAgbmV3UHJvcGVydHkgPSB0aGlzLmNyZWF0ZVByb3BlcnR5KHJlZlNjaGVtYSwgcGFyZW50LCBwYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpdGNoIChzY2hlbWEudHlwZSkge1xuICAgICAgICBjYXNlICdpbnRlZ2VyJzpcbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICBuZXdQcm9wZXJ0eSA9IG5ldyBOdW1iZXJQcm9wZXJ0eSh0aGlzLnNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHRoaXMudmFsaWRhdG9yUmVnaXN0cnksIHNjaGVtYSwgcGFyZW50LCBwYXRoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICBuZXdQcm9wZXJ0eSA9IG5ldyBTdHJpbmdQcm9wZXJ0eSh0aGlzLnNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHRoaXMudmFsaWRhdG9yUmVnaXN0cnksIHNjaGVtYSwgcGFyZW50LCBwYXRoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgbmV3UHJvcGVydHkgPSBuZXcgQm9vbGVhblByb3BlcnR5KHRoaXMuc2NoZW1hVmFsaWRhdG9yRmFjdG9yeSwgdGhpcy52YWxpZGF0b3JSZWdpc3RyeSwgc2NoZW1hLCBwYXJlbnQsIHBhdGgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgIG5ld1Byb3BlcnR5ID0gbmV3IE9iamVjdFByb3BlcnR5KHRoaXMsIHRoaXMuc2NoZW1hVmFsaWRhdG9yRmFjdG9yeSwgdGhpcy52YWxpZGF0b3JSZWdpc3RyeSwgc2NoZW1hLCBwYXJlbnQsIHBhdGgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgICAgbmV3UHJvcGVydHkgPSBuZXcgQXJyYXlQcm9wZXJ0eSh0aGlzLCB0aGlzLnNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHRoaXMudmFsaWRhdG9yUmVnaXN0cnksIHNjaGVtYSwgcGFyZW50LCBwYXRoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBVbmRlZmluZWQgdHlwZSAke3NjaGVtYS50eXBlfWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIG5ld1Byb3BlcnR5Ll9wcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeSA9IHRoaXMucHJvcGVydHlCaW5kaW5nUmVnaXN0cnk7XG4gICAgbmV3UHJvcGVydHkuX2Nhbm9uaWNhbFBhdGggPSBfY2Fub25pY2FsUGF0aDtcblxuICAgIGlmIChuZXdQcm9wZXJ0eSBpbnN0YW5jZW9mIFByb3BlcnR5R3JvdXApIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZVJvb3QobmV3UHJvcGVydHkpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdQcm9wZXJ0eTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVJvb3Qocm9vdFByb3BlcnR5OiBQcm9wZXJ0eUdyb3VwKSB7XG4gICAgcm9vdFByb3BlcnR5LnJlc2V0KG51bGwsIHRydWUpO1xuICAgIHJvb3RQcm9wZXJ0eS5fYmluZFZpc2liaWxpdHkoKTtcbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGlzUHJlc2VudChvKSB7XG4gIHJldHVybiBvICE9PSBudWxsICYmIG8gIT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmxhbmsobykge1xuICByZXR1cm4gbyA9PT0gbnVsbCB8fCBvID09PSB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQge2lzQmxhbmt9IGZyb20gJy4vdXRpbHMnO1xuXG5mdW5jdGlvbiBmb3JtYXRNZXNzYWdlKG1lc3NhZ2UsIHBhdGgpIHtcbiAgcmV0dXJuIGBQYXJzaW5nIGVycm9yIG9uICR7cGF0aH06ICR7bWVzc2FnZX1gO1xufVxuXG5mdW5jdGlvbiBzY2hlbWFFcnJvcihtZXNzYWdlLCBwYXRoKTogdm9pZCB7XG4gIGxldCBtZXNnID0gZm9ybWF0TWVzc2FnZShtZXNzYWdlLCBwYXRoKTtcbiAgdGhyb3cgbmV3IEVycm9yKG1lc2cpO1xufVxuXG5mdW5jdGlvbiBzY2hlbWFXYXJuaW5nKG1lc3NhZ2UsIHBhdGgpOiB2b2lkIHtcbiAgbGV0IG1lc2cgPSBmb3JtYXRNZXNzYWdlKG1lc3NhZ2UsIHBhdGgpO1xuICB0aHJvdyBuZXcgRXJyb3IobWVzZyk7XG59XG5cbmV4cG9ydCBjbGFzcyBTY2hlbWFQcmVwcm9jZXNzb3Ige1xuXG4gIHN0YXRpYyBwcmVwcm9jZXNzKGpzb25TY2hlbWE6IGFueSwgcGF0aCA9ICcvJyk6IGFueSB7XG4gICAganNvblNjaGVtYSA9IGpzb25TY2hlbWEgfHwge307XG4gICAgU2NoZW1hUHJlcHJvY2Vzc29yLm5vcm1hbGl6ZUV4dGVuc2lvbnMoanNvblNjaGVtYSk7XG4gICAgaWYgKGpzb25TY2hlbWEudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5jaGVja1Byb3BlcnRpZXMoanNvblNjaGVtYSwgcGF0aCk7XG4gICAgICBTY2hlbWFQcmVwcm9jZXNzb3IuY2hlY2tBbmRDcmVhdGVGaWVsZHNldHMoanNvblNjaGVtYSwgcGF0aCk7XG4gICAgfSBlbHNlIGlmIChqc29uU2NoZW1hLnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5jaGVja0l0ZW1zKGpzb25TY2hlbWEsIHBhdGgpO1xuICAgIH1cbiAgICBTY2hlbWFQcmVwcm9jZXNzb3Iubm9ybWFsaXplV2lkZ2V0KGpzb25TY2hlbWEpO1xuICAgIFNjaGVtYVByZXByb2Nlc3Nvci5yZWN1cnNpdmVDaGVjayhqc29uU2NoZW1hLCBwYXRoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNoZWNrUHJvcGVydGllcyhqc29uU2NoZW1hLCBwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoaXNCbGFuayhqc29uU2NoZW1hLnByb3BlcnRpZXMpKSB7XG4gICAgICBqc29uU2NoZW1hLnByb3BlcnRpZXMgPSB7fTtcbiAgICAgIHNjaGVtYVdhcm5pbmcoJ1Byb3ZpZGVkIGpzb24gc2NoZW1hIGRvZXMgbm90IGNvbnRhaW4gYSBcXCdwcm9wZXJ0aWVzXFwnIGVudHJ5LiBPdXRwdXQgc2NoZW1hIHdpbGwgYmUgZW1wdHknLCBwYXRoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjaGVja0FuZENyZWF0ZUZpZWxkc2V0cyhqc29uU2NoZW1hOiBhbnksIHBhdGg6IHN0cmluZykge1xuICAgIGlmIChqc29uU2NoZW1hLmZpZWxkc2V0cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoanNvblNjaGVtYS5vcmRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5yZXBsYWNlT3JkZXJCeUZpZWxkc2V0cyhqc29uU2NoZW1hKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5jcmVhdGVGaWVsZHNldHMoanNvblNjaGVtYSk7XG4gICAgICB9XG4gICAgfVxuICAgIFNjaGVtYVByZXByb2Nlc3Nvci5jaGVja0ZpZWxkc1VzYWdlKGpzb25TY2hlbWEsIHBhdGgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgY2hlY2tGaWVsZHNVc2FnZShqc29uU2NoZW1hLCBwYXRoOiBzdHJpbmcpIHtcbiAgICBsZXQgZmllbGRzSWQ6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoanNvblNjaGVtYS5wcm9wZXJ0aWVzKTtcbiAgICBsZXQgdXNlZEZpZWxkcyA9IHt9O1xuICAgIGZvciAobGV0IGZpZWxkc2V0IG9mIGpzb25TY2hlbWEuZmllbGRzZXRzKSB7XG4gICAgICBmb3IgKGxldCBmaWVsZElkIG9mIGZpZWxkc2V0LmZpZWxkcykge1xuICAgICAgICBpZiAodXNlZEZpZWxkc1tmaWVsZElkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdXNlZEZpZWxkc1tmaWVsZElkXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHVzZWRGaWVsZHNbZmllbGRJZF0ucHVzaChmaWVsZHNldC5pZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBmaWVsZElkIG9mIGZpZWxkc0lkKSB7XG4gICAgICBjb25zdCBpc1JlcXVpcmVkID0ganNvblNjaGVtYS5yZXF1aXJlZCAmJiBqc29uU2NoZW1hLnJlcXVpcmVkLmluZGV4T2YoZmllbGRJZCkgPiAtMTtcbiAgICAgIGlmIChpc1JlcXVpcmVkICYmIGpzb25TY2hlbWEucHJvcGVydGllc1tmaWVsZElkXSkge1xuICAgICAgICBqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF0uaXNSZXF1aXJlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAodXNlZEZpZWxkcy5oYXNPd25Qcm9wZXJ0eShmaWVsZElkKSkge1xuICAgICAgICBpZiAodXNlZEZpZWxkc1tmaWVsZElkXS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgc2NoZW1hRXJyb3IoYCR7ZmllbGRJZH0gaXMgcmVmZXJlbmNlZCBieSBtb3JlIHRoYW4gb25lIGZpZWxkc2V0OiAke3VzZWRGaWVsZHNbZmllbGRJZF19YCwgcGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHVzZWRGaWVsZHNbZmllbGRJZF07XG4gICAgICB9IGVsc2UgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgc2NoZW1hRXJyb3IoYCR7ZmllbGRJZH0gaXMgYSByZXF1aXJlZCBmaWVsZCBidXQgaXQgaXMgbm90IHJlZmVyZW5jZWQgYXMgcGFydCBvZiBhICdvcmRlcicgb3IgYSAnZmllbGRzZXQnIHByb3BlcnR5YCwgcGF0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUganNvblNjaGVtYVtmaWVsZElkXTtcbiAgICAgICAgc2NoZW1hV2FybmluZyhgUmVtb3ZpbmcgdW5yZWZlcmVuY2VkIGZpZWxkICR7ZmllbGRJZH1gLCBwYXRoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCByZW1haW5pbmdmaWVsZHNJZCBpbiB1c2VkRmllbGRzKSB7XG4gICAgICBpZiAodXNlZEZpZWxkcy5oYXNPd25Qcm9wZXJ0eShyZW1haW5pbmdmaWVsZHNJZCkpIHtcbiAgICAgICAgc2NoZW1hV2FybmluZyhgUmVmZXJlbmNpbmcgbm9uLWV4aXN0ZW50IGZpZWxkICR7cmVtYWluaW5nZmllbGRzSWR9IGluIG9uZSBvciBtb3JlIGZpZWxkc2V0c2AsIHBhdGgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNyZWF0ZUZpZWxkc2V0cyhqc29uU2NoZW1hKSB7XG4gICAganNvblNjaGVtYS5vcmRlciA9IE9iamVjdC5rZXlzKGpzb25TY2hlbWEucHJvcGVydGllcyk7XG4gICAgU2NoZW1hUHJlcHJvY2Vzc29yLnJlcGxhY2VPcmRlckJ5RmllbGRzZXRzKGpzb25TY2hlbWEpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVwbGFjZU9yZGVyQnlGaWVsZHNldHMoanNvblNjaGVtYSkge1xuICAgIGpzb25TY2hlbWEuZmllbGRzZXRzID0gW3tcbiAgICAgIGlkOiAnZmllbGRzZXQtZGVmYXVsdCcsXG4gICAgICB0aXRsZToganNvblNjaGVtYS50aXRsZSB8fCAnJyxcbiAgICAgIGRlc2NyaXB0aW9uOiBqc29uU2NoZW1hLmRlc2NyaXB0aW9uIHx8ICcnLFxuICAgICAgbmFtZToganNvblNjaGVtYS5uYW1lIHx8ICcnLFxuICAgICAgZmllbGRzOiBqc29uU2NoZW1hLm9yZGVyXG4gICAgfV07XG4gICAgZGVsZXRlIGpzb25TY2hlbWEub3JkZXI7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBub3JtYWxpemVXaWRnZXQoZmllbGRTY2hlbWE6IGFueSkge1xuICAgIGxldCB3aWRnZXQgPSBmaWVsZFNjaGVtYS53aWRnZXQ7XG4gICAgaWYgKHdpZGdldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB3aWRnZXQgPSB7J2lkJzogZmllbGRTY2hlbWEudHlwZX07XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygd2lkZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgd2lkZ2V0ID0geydpZCc6IHdpZGdldH07XG4gICAgfVxuICAgIGZpZWxkU2NoZW1hLndpZGdldCA9IHdpZGdldDtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNoZWNrSXRlbXMoanNvblNjaGVtYSwgcGF0aCkge1xuICAgIGlmIChqc29uU2NoZW1hLml0ZW1zID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjaGVtYUVycm9yKCdObyBcXCdpdGVtc1xcJyBwcm9wZXJ0eSBpbiBhcnJheScsIHBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHJlY3Vyc2l2ZUNoZWNrKGpzb25TY2hlbWEsIHBhdGg6IHN0cmluZykge1xuICAgIGlmIChqc29uU2NoZW1hLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBmb3IgKGxldCBmaWVsZElkIGluIGpzb25TY2hlbWEucHJvcGVydGllcykge1xuICAgICAgICBpZiAoanNvblNjaGVtYS5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGZpZWxkSWQpKSB7XG4gICAgICAgICAgbGV0IGZpZWxkU2NoZW1hID0ganNvblNjaGVtYS5wcm9wZXJ0aWVzW2ZpZWxkSWRdO1xuICAgICAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5wcmVwcm9jZXNzKGZpZWxkU2NoZW1hLCBwYXRoICsgZmllbGRJZCArICcvJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChqc29uU2NoZW1hLmhhc093blByb3BlcnR5KCdkZWZpbml0aW9ucycpKSB7XG4gICAgICAgIGZvciAobGV0IGZpZWxkSWQgaW4ganNvblNjaGVtYS5kZWZpbml0aW9ucykge1xuICAgICAgICAgIGlmIChqc29uU2NoZW1hLmRlZmluaXRpb25zLmhhc093blByb3BlcnR5KGZpZWxkSWQpKSB7XG4gICAgICAgICAgICBsZXQgZmllbGRTY2hlbWEgPSBqc29uU2NoZW1hLmRlZmluaXRpb25zW2ZpZWxkSWRdO1xuICAgICAgICAgICAgU2NoZW1hUHJlcHJvY2Vzc29yLnJlbW92ZVJlY3Vyc2l2ZVJlZlByb3BlcnRpZXMoZmllbGRTY2hlbWEsIGAjL2RlZmluaXRpb25zLyR7ZmllbGRJZH1gKTtcbiAgICAgICAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5wcmVwcm9jZXNzKGZpZWxkU2NoZW1hLCBwYXRoICsgZmllbGRJZCArICcvJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChqc29uU2NoZW1hLnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5wcmVwcm9jZXNzKGpzb25TY2hlbWEuaXRlbXMsIHBhdGggKyAnKi8nKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyByZW1vdmVSZWN1cnNpdmVSZWZQcm9wZXJ0aWVzKGpzb25TY2hlbWEsIGRlZmluaXRpb25QYXRoKSB7XG4gICAgLy8gdG8gYXZvaWQgaW5maW5pdGUgbG9vcFxuICAgIGlmIChqc29uU2NoZW1hLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBmb3IgKGxldCBmaWVsZElkIGluIGpzb25TY2hlbWEucHJvcGVydGllcykge1xuICAgICAgICBpZiAoanNvblNjaGVtYS5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGZpZWxkSWQpKSB7XG4gICAgICAgICAgaWYgKGpzb25TY2hlbWEucHJvcGVydGllc1tmaWVsZElkXS4kcmVmXG4gICAgICAgICAgICAmJiBqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF0uJHJlZiA9PT0gZGVmaW5pdGlvblBhdGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF07XG4gICAgICAgICAgfSBlbHNlIGlmIChqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF0udHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5yZW1vdmVSZWN1cnNpdmVSZWZQcm9wZXJ0aWVzKGpzb25TY2hlbWEucHJvcGVydGllc1tmaWVsZElkXSwgZGVmaW5pdGlvblBhdGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgLyoqXG4gICAqIEVuYWJsZXMgYWxpYXMgbmFtZXMgZm9yIEpTT04gc2NoZW1hIGV4dGVuc2lvbnMuXG4gICAqXG4gICAqIENvcGllcyB0aGUgdmFsdWUgb2YgZWFjaCBhbGlhcyBKU09OIHNjaGVtYSBwcm9wZXJ0eVxuICAgKiB0byB0aGUgSlNPTiBzY2hlbWEgcHJvcGVydHkgb2Ygbmd4LXNjaGVtYS1mb3JtLlxuICAgKlxuICAgKiBAcGFyYW0gc2NoZW1hIEpTT04gc2NoZW1hIHRvIGVuYWJsZSBhbGlhcyBuYW1lcy5cbiAgICovXG4gIHByaXZhdGUgc3RhdGljIG5vcm1hbGl6ZUV4dGVuc2lvbnMoc2NoZW1hOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBleHRlbnNpb25zID0gW1xuICAgICAgICB7IG5hbWU6IFwiZmllbGRzZXRzXCIsIHJlZ2V4OiAvXngtP2ZpZWxkLT9zZXRzJC9pIH0sXG4gICAgICAgIHsgbmFtZTogXCJ3aWRnZXRcIiwgICAgcmVnZXg6IC9eeC0/d2lkZ2V0JC9pIH0sXG4gICAgICAgIHsgbmFtZTogXCJ2aXNpYmxlSWZcIiwgcmVnZXg6IC9eeC0/dmlzaWJsZS0/aWYkL2kgfVxuICAgIF07XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNjaGVtYSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICBsZXQgayA9IGtleXNbaV07XG4gICAgICBsZXQgZSA9IGV4dGVuc2lvbnMuZmluZChlID0+ICEhay5tYXRjaChlLnJlZ2V4KSk7XG4gICAgICBpZiAoZSkge1xuICAgICAgICBsZXQgdiA9IHNjaGVtYVtrXTtcbiAgICAgICAgbGV0IGNvcHkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHYpKTtcbiAgICAgICAgc2NoZW1hW2UubmFtZV0gPSBjb3B5O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICcuL3ZhbGlkYXRvcic7XG5cbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3JSZWdpc3RyeSB7XG4gIHByaXZhdGUgdmFsaWRhdG9yczogVmFsaWRhdG9yW10gPSBbXTtcblxuICByZWdpc3RlcihwYXRoOiBzdHJpbmcsIHZhbGlkYXRvcjogVmFsaWRhdG9yKSB7XG4gICAgdGhpcy52YWxpZGF0b3JzW3BhdGhdID0gdmFsaWRhdG9yO1xuICB9XG5cbiAgZ2V0KHBhdGg6IHN0cmluZyk6IFZhbGlkYXRvciB7XG4gICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yc1twYXRoXTtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMudmFsaWRhdG9ycyA9IFtdO1xuICB9XG59XG4iLCJpbXBvcnQge0JpbmRpbmd9IGZyb20gJy4vYmluZGluZyc7XG5cbmV4cG9ydCBjbGFzcyBCaW5kaW5nUmVnaXN0cnkge1xuICBiaW5kaW5nczogQmluZGluZ1tdID0gW107XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5iaW5kaW5ncyA9IFtdO1xuICB9XG5cbiAgcmVnaXN0ZXIocGF0aDogc3RyaW5nLCBiaW5kaW5nOiBCaW5kaW5nIHwgQmluZGluZ1tdKSB7XG4gICAgdGhpcy5iaW5kaW5nc1twYXRoXSA9IFtdLmNvbmNhdChiaW5kaW5nKTtcbiAgfVxuXG4gIGdldChwYXRoOiBzdHJpbmcpOiBCaW5kaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmJpbmRpbmdzW3BhdGhdO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBaU2NoZW1hIGZyb20gJ3otc2NoZW1hJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNjaGVtYVZhbGlkYXRvckZhY3Rvcnkge1xuICBhYnN0cmFjdCBjcmVhdGVWYWxpZGF0b3JGbihzY2hlbWEpOiAodmFsdWU6IGFueSkgPT4gYW55O1xuXG4gIGFic3RyYWN0IGdldFNjaGVtYShzY2hlbWEsIHJlZik6IGFueTtcblxuICAvKipcbiAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcmVzZXQgdGhlIHNjaGVtYSB2YWxpZGF0b3IgaW5zdGFuY2UuPGJyLz5cbiAgICogVGhpcyBtYXkgYmUgcmVxdWlyZWQgc2luY2Ugc29tZSBzY2hlbWEgdmFsaWRhdG9ycyBrZWVwIGEgZGVlcCBjb3B5PGJyLz5cbiAgICogb2YgeW91ciBzY2hlbWFzIGFuZCBjaGFuZ2VzIGF0IHJ1bnRpbWUgYXJlIG5vdCByZWNvZ25pemVkIGJ5IHRoZSBzY2hlbWEgdmFsaWRhdG9yLjxici8+XG4gICAqIEluIHRoaXMgbWV0aG9kIHlvdSBzaG91bGQgZWl0aGVyIHJlLWluc3RhbnRpYXRlIHRoZSBzY2hlbWEgdmFsaWRhdG9yIG9yXG4gICAqIGNsZWFyIGl0cyBjYWNoZS48YnIvPlxuICAgKiBFeGFtcGxlIG9mIHJlLWluc3RhbnRpYXRpbmcgc2NoZW1hIHZhbGlkYXRvclxuICAgKiA8Y29kZT5cbiAgICogICAgIHJlc2V0KCl7XG4gICAqICAgICAgICAgdGhpcy56c2NoZW1hID0gbmV3IFpTY2hlbWEoe30pXG4gICAqICAgICB9XG4gICAqIDwvY29kZT5cbiAgICogPGJyLz5cbiAgICogU2luY2UgdGhpcyBtZXRob2QgaXQgc2VsZiBkb2VzIG5vdGhpbmcgdGhlcmUgaXMgPGJyLz5cbiAgICogbm8gbmVlZCB0byBjYWxsIHRoZSA8Y29kZT5zdXBlci5yZXNldCgpPC9jb2RlPlxuICAgKi9cbiAgcmVzZXQoKSB7XG5cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgWlNjaGVtYVZhbGlkYXRvckZhY3RvcnkgZXh0ZW5kcyBTY2hlbWFWYWxpZGF0b3JGYWN0b3J5IHtcblxuICBwcm90ZWN0ZWQgenNjaGVtYTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY3JlYXRlU2NoZW1hVmFsaWRhdG9yKClcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlU2NoZW1hVmFsaWRhdG9yKCkge1xuICAgIHRoaXMuenNjaGVtYSA9ICBuZXcgWlNjaGVtYSh7XG4gICAgICBicmVha09uRmlyc3RFcnJvcjogZmFsc2VcbiAgICB9KTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuY3JlYXRlU2NoZW1hVmFsaWRhdG9yKClcbiAgfVxuXG4gIGNyZWF0ZVZhbGlkYXRvckZuKHNjaGVtYTogYW55KSB7XG4gICAgcmV0dXJuICh2YWx1ZSk6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9ID0+IHtcblxuICAgICAgaWYgKHNjaGVtYS50eXBlID09PSAnbnVtYmVyJyB8fCBzY2hlbWEudHlwZSA9PT0gJ2ludGVnZXInKSB7XG4gICAgICAgIHZhbHVlID0gK3ZhbHVlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnpzY2hlbWEudmFsaWRhdGUodmFsdWUsIHNjaGVtYSk7XG4gICAgICBsZXQgZXJyID0gdGhpcy56c2NoZW1hLmdldExhc3RFcnJvcnMoKTtcblxuICAgICAgdGhpcy5kZW5vcm1hbGl6ZVJlcXVpcmVkUHJvcGVydHlQYXRocyhlcnIpO1xuXG4gICAgICByZXR1cm4gZXJyIHx8IG51bGw7XG4gICAgfTtcbiAgfVxuXG4gIGdldFNjaGVtYShzY2hlbWE6IGFueSwgcmVmOiBzdHJpbmcpIHtcbiAgICAvLyBjaGVjayBkZWZpbml0aW9ucyBhcmUgdmFsaWRcbiAgICBjb25zdCBpc1ZhbGlkID0gdGhpcy56c2NoZW1hLmNvbXBpbGVTY2hlbWEoc2NoZW1hKTtcbiAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0RGVmaW5pdGlvbihzY2hlbWEsIHJlZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IHRoaXMuenNjaGVtYS5nZXRMYXN0RXJyb3IoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlbm9ybWFsaXplUmVxdWlyZWRQcm9wZXJ0eVBhdGhzKGVycjogYW55W10pIHtcbiAgICBpZiAoZXJyICYmIGVyci5sZW5ndGgpIHtcbiAgICAgIGVyciA9IGVyci5tYXAoZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IucGF0aCA9PT0gJyMvJyAmJiBlcnJvci5jb2RlID09PSAnT0JKRUNUX01JU1NJTkdfUkVRVUlSRURfUFJPUEVSVFknKSB7XG4gICAgICAgICAgZXJyb3IucGF0aCA9IGAke2Vycm9yLnBhdGh9JHtlcnJvci5wYXJhbXNbMF19YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldERlZmluaXRpb24oc2NoZW1hOiBhbnksIHJlZjogc3RyaW5nKSB7XG4gICAgbGV0IGZvdW5kU2NoZW1hID0gc2NoZW1hO1xuICAgIHJlZi5zcGxpdCgnLycpLnNsaWNlKDEpLmZvckVhY2gocHRyID0+IHtcbiAgICAgIGlmIChwdHIpIHtcbiAgICAgICAgZm91bmRTY2hlbWEgPSBmb3VuZFNjaGVtYVtwdHJdO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmb3VuZFNjaGVtYTtcbiAgfVxufVxuXG4iLCJleHBvcnQgY2xhc3MgV2lkZ2V0UmVnaXN0cnkge1xuXG4gIHByaXZhdGUgd2lkZ2V0czogeyBbdHlwZTogc3RyaW5nXTogYW55IH0gPSB7fTtcblxuICBwcml2YXRlIGRlZmF1bHRXaWRnZXQ6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHNldERlZmF1bHRXaWRnZXQod2lkZ2V0OiBhbnkpIHtcbiAgICB0aGlzLmRlZmF1bHRXaWRnZXQgPSB3aWRnZXQ7XG4gIH1cblxuICBnZXREZWZhdWx0V2lkZ2V0KCkge1xuICAgIHJldHVybiB0aGlzLmRlZmF1bHRXaWRnZXQ7XG4gIH1cblxuICBoYXNXaWRnZXQodHlwZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMud2lkZ2V0cy5oYXNPd25Qcm9wZXJ0eSh0eXBlKTtcbiAgfVxuXG4gIHJlZ2lzdGVyKHR5cGU6IHN0cmluZywgd2lkZ2V0OiBhbnkpIHtcbiAgICB0aGlzLndpZGdldHNbdHlwZV0gPSB3aWRnZXQ7XG4gIH1cblxuICBnZXRXaWRnZXRUeXBlKHR5cGU6IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKHRoaXMuaGFzV2lkZ2V0KHR5cGUpKSB7XG4gICAgICByZXR1cm4gdGhpcy53aWRnZXRzW3R5cGVdO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kZWZhdWx0V2lkZ2V0O1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBWaWV3Q29udGFpbmVyUmVmLFxuICBDb21wb25lbnRSZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgSW5qZWN0YWJsZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgV2lkZ2V0UmVnaXN0cnkgfSBmcm9tICcuL3dpZGdldHJlZ2lzdHJ5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdpZGdldEZhY3Rvcnkge1xuXG4gIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjtcbiAgcHJpdmF0ZSByZWdpc3RyeTogV2lkZ2V0UmVnaXN0cnk7XG5cbiAgY29uc3RydWN0b3IocmVnaXN0cnk6IFdpZGdldFJlZ2lzdHJ5LCByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG4gICAgdGhpcy5yZWdpc3RyeSA9IHJlZ2lzdHJ5O1xuICAgIHRoaXMucmVzb2x2ZXIgPSByZXNvbHZlcjtcbiAgfVxuXG4gIGNyZWF0ZVdpZGdldChjb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsIHR5cGU6IHN0cmluZyk6IENvbXBvbmVudFJlZjxhbnk+IHtcbiAgICBsZXQgY29tcG9uZW50Q2xhc3MgPSB0aGlzLnJlZ2lzdHJ5LmdldFdpZGdldFR5cGUodHlwZSk7XG5cbiAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50Q2xhc3MpO1xuICAgIHJldHVybiBjb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUZXJtaW5hdG9yU2VydmljZSB7XG4gIHB1YmxpYyBvbkRlc3Ryb3k6IFN1YmplY3Q8Ym9vbGVhbj47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdCgpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLm9uRGVzdHJveS5uZXh0KHRydWUpO1xuICB9XG59XG4iLCIvKipcbiAqIEdlbmVyYWwgcHVycG9zZSBwcm9wZXJ5IGJpbmRpbmcgcmVnaXN0cnlcbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5IHtcblxuICBwcml2YXRlIGJpbmRpbmdzOiB7IFtrZXk6IHN0cmluZ106IFByb3BlcnR5QmluZGluZ3MgfSA9IHt9O1xuXG4gIGdldFByb3BlcnR5QmluZGluZ3ModHlwZTogUHJvcGVydHlCaW5kaW5nVHlwZXMpOiBQcm9wZXJ0eUJpbmRpbmdzIHtcbiAgICB0aGlzLmJpbmRpbmdzW3R5cGVdID0gdGhpcy5iaW5kaW5nc1t0eXBlXSB8fCBuZXcgUHJvcGVydHlCaW5kaW5ncygpO1xuICAgIHJldHVybiB0aGlzLmJpbmRpbmdzW3R5cGVdO1xuICB9XG5cbiAgZ2V0UHJvcGVydHlCaW5kaW5nc1Zpc2liaWxpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlCaW5kaW5ncyhQcm9wZXJ0eUJpbmRpbmdUeXBlcy52aXNpYmlsaXR5KTtcbiAgfVxufVxuXG4vKipcbiAqIERlZmluZXMgdGhlIHR5cGVzIG9mIHN1cHBvcnRlZCBwcm9wZXJ0eSBiaW5kaW5ncy48YnIvPlxuICogRm9yIG5vdyBvbmx5IDxjb2RlPnZpc2liaWxpdHk8L2NvZGU+IGlzIHN1cHBvcnRlZC48YnIvPlxuICovXG5leHBvcnQgZW51bSBQcm9wZXJ0eUJpbmRpbmdUeXBlcyB7XG4gIHZpc2liaWxpdHlcbn1cblxuLyoqXG4gKiBTdG9yYWdlIHRoYXQgaG9sZHMgYWxsIGJpbmRpbmdzIHRoYXQgYXJlIHByb3BlcnR5IHBhdGhzIHJlbGF0ZWQuPGJyLz5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5QmluZGluZ3Mge1xuICBzb3VyY2VzSW5kZXg6IFNpbXBsZVByb3BlcnR5SW5kZXhlciA9IG5ldyBTaW1wbGVQcm9wZXJ0eUluZGV4ZXIoKTtcbiAgZGVwZW5kZW5jaWVzSW5kZXg6IFNpbXBsZVByb3BlcnR5SW5kZXhlciA9IG5ldyBTaW1wbGVQcm9wZXJ0eUluZGV4ZXIoKTtcblxuICBhZGQoZGVwZW5kZW5jeVBhdGg6IHN0cmluZywgc291cmNlUHJvcGVydHlQYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNvdXJjZXNJbmRleC5zdG9yZShzb3VyY2VQcm9wZXJ0eVBhdGgsIGRlcGVuZGVuY3lQYXRoKTtcbiAgICB0aGlzLmRlcGVuZGVuY2llc0luZGV4LnN0b3JlKGRlcGVuZGVuY3lQYXRoLCBzb3VyY2VQcm9wZXJ0eVBhdGgpO1xuICB9XG5cbiAgZmluZEJ5RGVwZW5kZW5jeVBhdGgoZGVwZW5kZW5jeVBhdGg6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmRlcGVuZGVuY2llc0luZGV4LmZpbmQoZGVwZW5kZW5jeVBhdGgpO1xuICAgIHJlc3VsdC5yZXN1bHRzID0gcmVzdWx0LnJlc3VsdHMgfHwgW107XG4gICAgbGV0IHZhbHVlcyA9IFtdO1xuICAgIGZvciAoY29uc3QgcmVzIG9mIHJlc3VsdC5yZXN1bHRzKSB7XG4gICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KE9iamVjdC5rZXlzKHJlcy52YWx1ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0LmZvdW5kID8gdmFsdWVzIDogW107XG4gIH1cblxuICBnZXRCeVNvdXJjZVByb3BlcnR5UGF0aChzb3VyY2VQcm9wZXJ0eVBhdGg6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnNvdXJjZXNJbmRleC5maW5kKHNvdXJjZVByb3BlcnR5UGF0aCk7XG4gICAgcmVzdWx0LnJlc3VsdHMgPSByZXN1bHQucmVzdWx0cyB8fCBbXTtcbiAgICBsZXQgdmFsdWVzID0gW107XG4gICAgZm9yIChjb25zdCByZXMgb2YgcmVzdWx0LnJlc3VsdHMpIHtcbiAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQoT2JqZWN0LmtleXMocmVzLnZhbHVlKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQuZm91bmQgPyB2YWx1ZXMgOiBbXTtcbiAgfVxuXG4gIGNyZWF0ZVBhdGhJbmRleChwYXRoOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHBhdGguc3BsaXQoJy8nKTtcbiAgfVxufVxuXG4vKipcbiAqIFNpbXBsZSBpbmRleGVyIHRvIHN0b3JlIHByb3BlcnR5IHBhdGhzXG4gKi9cbmV4cG9ydCBjbGFzcyBTaW1wbGVQcm9wZXJ0eUluZGV4ZXIge1xuXG4gIHN0YXRpYyBNQVJLRVIgPSAnJF9fX192YWx1ZSc7XG4gIGluZGV4OiBvYmplY3QgPSB7fTtcbiAgZmluZE9ubHlXaXRoVmFsdWUgPSB0cnVlO1xuXG4gIHByaXZhdGUgX2NyZWF0ZVBhdGhJbmRleChwYXRoOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gcGF0aFxuICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCgnLy8nLCAnZycpLCAnLycpXG4gICAgICAucmVwbGFjZShuZXcgUmVnRXhwKCdeLycsICdnJyksICcnKVxuICAgICAgLnNwbGl0KCcvJykuZmlsdGVyKGl0ZW0gPT4gaXRlbSk7XG4gIH1cblxuICBzdG9yZShwcm9wZXJ0eVBhdGg6IHN0cmluZywgdmFsdWU/OiBhbnkpIHtcbiAgICB0aGlzLl9zdG9yZUluZGV4KHRoaXMuX2NyZWF0ZVBhdGhJbmRleChwcm9wZXJ0eVBhdGgpLCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9zdG9yZUluZGV4KHBhdGhJbmRleDogc3RyaW5nW10sIHZhbHVlPzogc3RyaW5nKSB7XG4gICAgbGV0IGluZGV4UG9zID0gdGhpcy5pbmRleDtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBwYXRoSW5kZXgpIHtcbiAgICAgIGluZGV4UG9zW2tleV0gPSBpbmRleFBvc1trZXldIHx8IHt9O1xuICAgICAgaW5kZXhQb3MgPSBpbmRleFBvc1trZXldO1xuICAgIH1cbiAgICBpZiAoaW5kZXhQb3MgJiYgdmFsdWUpIHtcbiAgICAgIGluZGV4UG9zW1NpbXBsZVByb3BlcnR5SW5kZXhlci5NQVJLRVJdID0gaW5kZXhQb3NbU2ltcGxlUHJvcGVydHlJbmRleGVyLk1BUktFUl0gfHwge307XG4gICAgICBpbmRleFBvc1tTaW1wbGVQcm9wZXJ0eUluZGV4ZXIuTUFSS0VSXVt2YWx1ZV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmluZCBwYXRoIGluIGluZGV4Ljxici8+XG4gICAqIFdpbGwgZmluZCBwYXRoIGxpa2U6PGJyLz5cbiAgICogPHVsPlxuICAgKiAgICAgPGxpPi9wcm9wZXJ0eS8wL3Byb3A8L2xpPlxuICAgKiAgICAgPGxpPi9wcm9wZXJ0eS8wL3Byb3AvMi90ZXN0PC9saT5cbiAgICogICAgIDxsaT4vcHJvcGVydHkvMC9wcm9wLyYjNDI7L3Rlc3Q8L2xpPlxuICAgKiAgICAgPGxpPi9wcm9wZXJ0eS8mIzQyOy9wcm9wLzEvdGVzdDwvbGk+XG4gICAqICAgICA8bGk+L3Byb3BlcnR5LyYjNDI7L3Byb3AvJiM0MjsvdGVzdDwvbGk+XG4gICAqICAgICA8bGk+L3Byb3BlcnR5LzEvcHJvcC8mIzQyOy90ZXN0PC9saT5cbiAgICogIDwvdWw+XG4gICAqIEBwYXJhbSBwYXRoXG4gICAqL1xuICBmaW5kKHBhdGg6IHN0cmluZyk6IEluZGV4ZXJSZXN1bHQge1xuICAgIHJldHVybiB0aGlzLl9maW5kSW5JbmRleCh0aGlzLl9jcmVhdGVQYXRoSW5kZXgocGF0aCkpO1xuICB9XG5cbiAgX2ZpbmRJbkluZGV4KHBhdGg6IHN0cmluZ1tdKTogSW5kZXhlclJlc3VsdCB7XG4gICAgY29uc3QgaXhSZXM6IEluZGV4ZXJSZXN1bHQgPSB7dGFyZ2V0OiBwYXRoLCBmb3VuZDogZmFsc2UsIHJlc3VsdHM6IFtdfTtcbiAgICB0aGlzLl9fZmluZEluZGV4KGl4UmVzLCBwYXRoLCB0aGlzLmluZGV4LCBbXSk7XG4gICAgcmV0dXJuIGl4UmVzO1xuICB9XG5cbiAgX19maW5kSW5kZXgoaW5kZXhlclJlc3VsdHM6IEluZGV4ZXJSZXN1bHQsIHBhdGg6IHN0cmluZ1tdLCBpbmRleDogb2JqZWN0LCBwYXJlbnQ/OiBzdHJpbmdbXSkge1xuXG4gICAgY29uc3QgcCA9IHBhcmVudCB8fCBbXTtcbiAgICBjb25zdCBzZWdtZW50ID0gcGF0aFswXTtcbiAgICBjb25zdCB3aWxkID0gKCcqJyA9PT0gc2VnbWVudCkgPyBPYmplY3Qua2V5cyhpbmRleCkgOiBbXTtcbiAgICBjb25zdCBfa2V5cyA9ICgoQXJyYXkuaXNBcnJheShzZWdtZW50KSA/IHNlZ21lbnQgOiBbc2VnbWVudF0pIGFzIHN0cmluZ1tdKS5jb25jYXQod2lsZCk7XG4gICAgY29uc3Qga2V5cyA9IF9rZXlzLmZpbHRlcigoaXRlbSwgcG9zKSA9PiAnKicgIT09IGl0ZW0gJiYgX2tleXMuaW5kZXhPZihpdGVtKSA9PT0gcG9zKTsgLy8gcmVtb3ZlIGR1cGxpY2F0ZXNcblxuICAgIGlmIChpbmRleFsnKiddKSB7XG4gICAgICBrZXlzLnB1c2goJyonKTtcbiAgICB9XG5cbiAgICBsZXQgcGF0aHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICBjb25zdCByZXN0UGF0aCA9IHBhdGguc2xpY2UoMSk7XG4gICAgICBjb25zdCByZXN0SW5kZXggPSBpbmRleFtrZXldO1xuICAgICAgY29uc3QgcmVzdFBhcmVudCA9IHAuY29uY2F0KGtleSk7XG5cbiAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkgey8vIGNvbGxlY3Qgb25seSB0aGUgZnVsbCBwYXRoc1xuICAgICAgICBpZiAoIXRoaXMuZmluZE9ubHlXaXRoVmFsdWUgfHwgKHJlc3RJbmRleCAmJiByZXN0SW5kZXhbU2ltcGxlUHJvcGVydHlJbmRleGVyLk1BUktFUl0pKSB7XG4gICAgICAgICAgaW5kZXhlclJlc3VsdHMucmVzdWx0cyA9IGluZGV4ZXJSZXN1bHRzLnJlc3VsdHMgfHwgW107XG4gICAgICAgICAgaW5kZXhlclJlc3VsdHMucmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICAgIHBhdGg6IHJlc3RQYXJlbnQsXG4gICAgICAgICAgICB2YWx1ZTogcmVzdEluZGV4W1NpbXBsZVByb3BlcnR5SW5kZXhlci5NQVJLRVJdXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcGF0aHMucHVzaChyZXN0UGFyZW50KTtcbiAgICAgICAgICBpbmRleGVyUmVzdWx0cy5mb3VuZCA9IGluZGV4ZXJSZXN1bHRzLnJlc3VsdHMubGVuZ3RoID4gMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXJlc3RQYXRoIHx8ICFyZXN0UGF0aC5sZW5ndGggfHwgIXJlc3RJbmRleCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlc3RQYXRocyA9IHRoaXMuX19maW5kSW5kZXgoaW5kZXhlclJlc3VsdHMsIHJlc3RQYXRoLCByZXN0SW5kZXgsIHJlc3RQYXJlbnQpO1xuXG4gICAgICBwYXRocyA9IHBhdGhzLmNvbmNhdChyZXN0UGF0aHMpO1xuICAgIH1cbiAgICByZXR1cm4gcGF0aHM7XG4gIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEluZGV4ZXJSZXN1bHQge1xuICAvKipcbiAgICogVGhlIHBhdGggb3JpZ2luYWxseSBzZWFyY2hlZCBmb3JcbiAgICovXG4gIHRhcmdldDogc3RyaW5nW107XG4gIC8qKlxuICAgKiBGbGFnIGZvciB0aGUgc3RhdHVzIG9mIGZvdW5kIG9yIG5vdCBmb3VuZC48YnIvPlxuICAgKiBVc3VhbGx5IDxjb2RlPnJlc3VsdHM8L2NvZGU+IHdpbGwgYmUgZW1wdHkgaWYgbm8gbWF0Y2hlcyBmb3VuZC5cbiAgICovXG4gIGZvdW5kOiBib29sZWFuO1xuICAvKipcbiAgICogVGhlIHJlc3VsdCBwYXRoIGFuZCB2YWx1ZXMgZnJvbSB0aGUgaW5kZXggc2VhcmNoLjxici8+XG4gICAqIFVzdWFsbHkgPGNvZGU+cmVzdWx0czwvY29kZT4gd2lsbCBiZSBlbXB0eSBpZiBubyBtYXRjaGVzIGZvdW5kLlxuICAgKi9cbiAgcmVzdWx0czoge1xuICAgIC8qKlxuICAgICAqIFRoZSBwYXRoIHRoYXQgbWF0Y2hlZCB0aGUgPGNvZGU+dGFyZ2V0PC9jb2RlPlxuICAgICAqIHNlcGFyYXRlZCBpbiBzZWdtZW50c1xuICAgICAqL1xuICAgIHBhdGg6IHN0cmluZ1tdLFxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBzdG9yZWQgYXQgdGhlIDxjb2RlPnBhdGg8L2NvZGU+XG4gICAgICovXG4gICAgdmFsdWU6IGFueVxuICB9W107XG59XG4iLCJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBPbkNoYW5nZXMsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtBY3Rpb259IGZyb20gJy4vbW9kZWwvYWN0aW9uJztcbmltcG9ydCB7QWN0aW9uUmVnaXN0cnl9IGZyb20gJy4vbW9kZWwvYWN0aW9ucmVnaXN0cnknO1xuaW1wb3J0IHtGb3JtUHJvcGVydHl9IGZyb20gJy4vbW9kZWwvZm9ybXByb3BlcnR5JztcbmltcG9ydCB7Rm9ybVByb3BlcnR5RmFjdG9yeX0gZnJvbSAnLi9tb2RlbC9mb3JtcHJvcGVydHlmYWN0b3J5JztcbmltcG9ydCB7U2NoZW1hUHJlcHJvY2Vzc29yfSBmcm9tICcuL21vZGVsL3NjaGVtYXByZXByb2Nlc3Nvcic7XG5pbXBvcnQge1ZhbGlkYXRvclJlZ2lzdHJ5fSBmcm9tICcuL21vZGVsL3ZhbGlkYXRvcnJlZ2lzdHJ5JztcbmltcG9ydCB7VmFsaWRhdG9yfSBmcm9tICcuL21vZGVsL3ZhbGlkYXRvcic7XG5pbXBvcnQge0JpbmRpbmd9IGZyb20gJy4vbW9kZWwvYmluZGluZyc7XG5pbXBvcnQge0JpbmRpbmdSZWdpc3RyeX0gZnJvbSAnLi9tb2RlbC9iaW5kaW5ncmVnaXN0cnknO1xuXG5pbXBvcnQge1NjaGVtYVZhbGlkYXRvckZhY3Rvcnl9IGZyb20gJy4vc2NoZW1hdmFsaWRhdG9yZmFjdG9yeSc7XG5pbXBvcnQge1dpZGdldEZhY3Rvcnl9IGZyb20gJy4vd2lkZ2V0ZmFjdG9yeSc7XG5pbXBvcnQge1Rlcm1pbmF0b3JTZXJ2aWNlfSBmcm9tICcuL3Rlcm1pbmF0b3Iuc2VydmljZSc7XG5pbXBvcnQge1Byb3BlcnR5QmluZGluZ1JlZ2lzdHJ5fSBmcm9tICcuL3Byb3BlcnR5LWJpbmRpbmctcmVnaXN0cnknO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlRmFjdG9yeShzY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCB2YWxpZGF0b3JSZWdpc3RyeSwgcHJvcGVydHlCaW5kaW5nUmVnaXN0cnkpIHtcbiAgcmV0dXJuIG5ldyBGb3JtUHJvcGVydHlGYWN0b3J5KHNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHZhbGlkYXRvclJlZ2lzdHJ5LCBwcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeSk7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWZvcm0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxmb3JtPlxuICAgICAgPHNmLWZvcm0tZWxlbWVudFxuICAgICAgICAqbmdJZj1cInJvb3RQcm9wZXJ0eVwiIFtmb3JtUHJvcGVydHldPVwicm9vdFByb3BlcnR5XCI+PC9zZi1mb3JtLWVsZW1lbnQ+XG4gICAgPC9mb3JtPmAsXG4gIHByb3ZpZGVyczogW1xuICAgIEFjdGlvblJlZ2lzdHJ5LFxuICAgIFZhbGlkYXRvclJlZ2lzdHJ5LFxuICAgIFByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5LFxuICAgIEJpbmRpbmdSZWdpc3RyeSxcbiAgICBTY2hlbWFQcmVwcm9jZXNzb3IsXG4gICAgV2lkZ2V0RmFjdG9yeSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBGb3JtUHJvcGVydHlGYWN0b3J5LFxuICAgICAgdXNlRmFjdG9yeTogdXNlRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtTY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCBWYWxpZGF0b3JSZWdpc3RyeSwgUHJvcGVydHlCaW5kaW5nUmVnaXN0cnldXG4gICAgfSxcbiAgICBUZXJtaW5hdG9yU2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBGb3JtQ29tcG9uZW50LFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIEBJbnB1dCgpIHNjaGVtYTogYW55ID0gbnVsbDtcblxuICBASW5wdXQoKSBtb2RlbDogYW55O1xuXG4gIEBJbnB1dCgpIGFjdGlvbnM6IHsgW2FjdGlvbklkOiBzdHJpbmddOiBBY3Rpb24gfSA9IHt9O1xuXG4gIEBJbnB1dCgpIHZhbGlkYXRvcnM6IHsgW3BhdGg6IHN0cmluZ106IFZhbGlkYXRvciB9ID0ge307XG5cbiAgQElucHV0KCkgYmluZGluZ3M6IHsgW3BhdGg6IHN0cmluZ106IEJpbmRpbmcgfSA9IHt9O1xuXG4gIEBPdXRwdXQoKSBvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8eyB2YWx1ZTogYW55IH0+KCk7XG5cbiAgQE91dHB1dCgpIG1vZGVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIGlzVmFsaWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgQE91dHB1dCgpIG9uRXJyb3JDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHsgdmFsdWU6IGFueVtdIH0+KCk7XG5cbiAgQE91dHB1dCgpIG9uRXJyb3JzQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7dmFsdWU6IGFueX0+KCk7XG5cbiAgcm9vdFByb3BlcnR5OiBGb3JtUHJvcGVydHkgPSBudWxsO1xuXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZm9ybVByb3BlcnR5RmFjdG9yeTogRm9ybVByb3BlcnR5RmFjdG9yeSxcbiAgICBwcml2YXRlIGFjdGlvblJlZ2lzdHJ5OiBBY3Rpb25SZWdpc3RyeSxcbiAgICBwcml2YXRlIHZhbGlkYXRvclJlZ2lzdHJ5OiBWYWxpZGF0b3JSZWdpc3RyeSxcbiAgICBwcml2YXRlIGJpbmRpbmdSZWdpc3RyeTogQmluZGluZ1JlZ2lzdHJ5LFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHRlcm1pbmF0b3I6IFRlcm1pbmF0b3JTZXJ2aWNlXG4gICkgeyB9XG5cbiAgd3JpdGVWYWx1ZShvYmo6IGFueSkge1xuICAgIGlmICh0aGlzLnJvb3RQcm9wZXJ0eSkge1xuICAgICAgdGhpcy5yb290UHJvcGVydHkucmVzZXQob2JqLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gICAgaWYgKHRoaXMucm9vdFByb3BlcnR5KSB7XG4gICAgICB0aGlzLnJvb3RQcm9wZXJ0eS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKFxuICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2VzLmJpbmQodGhpcylcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETyBpbXBsZW1lbnRcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICB9XG5cbiAgLy8gVE9ETyBpbXBsZW1lbnRcbiAgLy8gc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKT86IHZvaWRcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMudmFsaWRhdG9ycykge1xuICAgICAgdGhpcy5zZXRWYWxpZGF0b3JzKCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuYWN0aW9ucykge1xuICAgICAgdGhpcy5zZXRBY3Rpb25zKCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuYmluZGluZ3MpIHtcbiAgICAgIHRoaXMuc2V0QmluZGluZ3MoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zY2hlbWEgJiYgIXRoaXMuc2NoZW1hLnR5cGUpIHtcbiAgICAgIHRoaXMuc2NoZW1hLnR5cGUgPSAnb2JqZWN0JztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zY2hlbWEgJiYgY2hhbmdlcy5zY2hlbWEpIHtcbiAgICAgIGlmICghY2hhbmdlcy5zY2hlbWEuZmlyc3RDaGFuZ2UpIHtcbiAgICAgICAgdGhpcy50ZXJtaW5hdG9yLmRlc3Ryb3koKTtcbiAgICAgIH1cblxuICAgICAgU2NoZW1hUHJlcHJvY2Vzc29yLnByZXByb2Nlc3ModGhpcy5zY2hlbWEpO1xuICAgICAgdGhpcy5yb290UHJvcGVydHkgPSB0aGlzLmZvcm1Qcm9wZXJ0eUZhY3RvcnkuY3JlYXRlUHJvcGVydHkodGhpcy5zY2hlbWEpO1xuICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgLy8gdGhpcy5yb290UHJvcGVydHkucmVzZXQodGhpcy5tb2RlbCwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJvb3RQcm9wZXJ0eS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKFxuICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2VzLmJpbmQodGhpcylcbiAgICAgICk7XG5cbiAgICAgIHRoaXMucm9vdFByb3BlcnR5LmVycm9yc0NoYW5nZXMuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgdGhpcy5vbkVycm9yQ2hhbmdlLmVtaXQoe3ZhbHVlOiB2YWx1ZX0pO1xuICAgICAgICB0aGlzLmlzVmFsaWQuZW1pdCghKHZhbHVlICYmIHZhbHVlLmxlbmd0aCkpO1xuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBpZiAodGhpcy5zY2hlbWEgJiYgKGNoYW5nZXMubW9kZWwgfHwgY2hhbmdlcy5zY2hlbWEgKSkge1xuICAgICAgdGhpcy5yb290UHJvcGVydHkucmVzZXQodGhpcy5tb2RlbCwgZmFsc2UpO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBzZXRWYWxpZGF0b3JzKCkge1xuICAgIHRoaXMudmFsaWRhdG9yUmVnaXN0cnkuY2xlYXIoKTtcbiAgICBpZiAodGhpcy52YWxpZGF0b3JzKSB7XG4gICAgICBmb3IgKGNvbnN0IHZhbGlkYXRvcklkIGluIHRoaXMudmFsaWRhdG9ycykge1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0b3JzLmhhc093blByb3BlcnR5KHZhbGlkYXRvcklkKSkge1xuICAgICAgICAgIHRoaXMudmFsaWRhdG9yUmVnaXN0cnkucmVnaXN0ZXIodmFsaWRhdG9ySWQsIHRoaXMudmFsaWRhdG9yc1t2YWxpZGF0b3JJZF0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRBY3Rpb25zKCkge1xuICAgIHRoaXMuYWN0aW9uUmVnaXN0cnkuY2xlYXIoKTtcbiAgICBpZiAodGhpcy5hY3Rpb25zKSB7XG4gICAgICBmb3IgKGNvbnN0IGFjdGlvbklkIGluIHRoaXMuYWN0aW9ucykge1xuICAgICAgICBpZiAodGhpcy5hY3Rpb25zLmhhc093blByb3BlcnR5KGFjdGlvbklkKSkge1xuICAgICAgICAgIHRoaXMuYWN0aW9uUmVnaXN0cnkucmVnaXN0ZXIoYWN0aW9uSWQsIHRoaXMuYWN0aW9uc1thY3Rpb25JZF0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRCaW5kaW5ncygpIHtcbiAgICB0aGlzLmJpbmRpbmdSZWdpc3RyeS5jbGVhcigpO1xuICAgIGlmICh0aGlzLmJpbmRpbmdzKSB7XG4gICAgICBmb3IgKGNvbnN0IGJpbmRpbmdQYXRoIGluIHRoaXMuYmluZGluZ3MpIHtcbiAgICAgICAgaWYgKHRoaXMuYmluZGluZ3MuaGFzT3duUHJvcGVydHkoYmluZGluZ1BhdGgpKSB7XG4gICAgICAgICAgdGhpcy5iaW5kaW5nUmVnaXN0cnkucmVnaXN0ZXIoYmluZGluZ1BhdGgsIHRoaXMuYmluZGluZ3NbYmluZGluZ1BhdGhdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpIHtcbiAgICB0aGlzLnJvb3RQcm9wZXJ0eS5yZXNldChudWxsLCB0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0TW9kZWwodmFsdWU6IGFueSkge1xuICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMubW9kZWwsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb2RlbCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25WYWx1ZUNoYW5nZXModmFsdWUpIHtcbiAgICBpZiAodGhpcy5vbkNoYW5nZUNhbGxiYWNrKSB7XG4gICAgICB0aGlzLnNldE1vZGVsKHZhbHVlKTtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gdHdvIHdheSBiaW5kaW5nIGlzIHVzZWRcbiAgICBpZiAodGhpcy5tb2RlbENoYW5nZS5vYnNlcnZlcnMubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKCF0aGlzLm9uQ2hhbmdlQ2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5zZXRNb2RlbCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7dmFsdWU6IHZhbHVlfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCwgRWxlbWVudFJlZixcbiAgSW5wdXQsIE9uRGVzdHJveSxcbiAgT25Jbml0LCBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIEZvcm1Db250cm9sXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtXaWRnZXR9IGZyb20gJy4vd2lkZ2V0JztcblxuaW1wb3J0IHtBY3Rpb25SZWdpc3RyeX0gZnJvbSAnLi9tb2RlbC9hY3Rpb25yZWdpc3RyeSc7XG5pbXBvcnQge0Zvcm1Qcm9wZXJ0eX0gZnJvbSAnLi9tb2RlbC9mb3JtcHJvcGVydHknO1xuaW1wb3J0IHtCaW5kaW5nUmVnaXN0cnl9IGZyb20gJy4vbW9kZWwvYmluZGluZ3JlZ2lzdHJ5JztcbmltcG9ydCB7QmluZGluZ30gZnJvbSAnLi9tb2RlbC9iaW5kaW5nJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtZm9ybS1lbGVtZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0lmPVwiZm9ybVByb3BlcnR5LnZpc2libGVcIlxuICAgICAgICAgW2NsYXNzLmhhcy1lcnJvcl09XCIhY29udHJvbC52YWxpZFwiXG4gICAgICAgICBbY2xhc3MuaGFzLXN1Y2Nlc3NdPVwiY29udHJvbC52YWxpZFwiPlxuICAgICAgPHNmLXdpZGdldC1jaG9vc2VyXG4gICAgICAgICh3aWRnZXRJbnN0YW5jaWF0ZWQpPVwib25XaWRnZXRJbnN0YW5jaWF0ZWQoJGV2ZW50KVwiXG4gICAgICAgIFt3aWRnZXRJbmZvXT1cImZvcm1Qcm9wZXJ0eS5zY2hlbWEud2lkZ2V0XCI+XG4gICAgICA8L3NmLXdpZGdldC1jaG9vc2VyPlxuICAgICAgPHNmLWZvcm0tZWxlbWVudC1hY3Rpb24gKm5nRm9yPVwibGV0IGJ1dHRvbiBvZiBidXR0b25zXCIgW2J1dHRvbl09XCJidXR0b25cIiBbZm9ybVByb3BlcnR5XT1cImZvcm1Qcm9wZXJ0eVwiPjwvc2YtZm9ybS1lbGVtZW50LWFjdGlvbj5cbiAgICA8L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1FbGVtZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgc3RhdGljIGNvdW50ZXIgPSAwO1xuXG4gIEBJbnB1dCgpIGZvcm1Qcm9wZXJ0eTogRm9ybVByb3BlcnR5O1xuICBjb250cm9sOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgnJywgKCkgPT4gbnVsbCk7XG5cbiAgd2lkZ2V0OiBXaWRnZXQ8YW55PiA9IG51bGw7XG5cbiAgYnV0dG9ucyA9IFtdO1xuXG4gIHVubGlzdGVuID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhY3Rpb25SZWdpc3RyeTogQWN0aW9uUmVnaXN0cnksXG4gICAgICAgICAgICAgIHByaXZhdGUgYmluZGluZ1JlZ2lzdHJ5OiBCaW5kaW5nUmVnaXN0cnksXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBhcnNlQnV0dG9ucygpO1xuICAgIHRoaXMuc2V0dXBCaW5kaW5ncygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cEJpbmRpbmdzKCkge1xuICAgIGNvbnN0IGJpbmRpbmdzOiBCaW5kaW5nW10gPSB0aGlzLmJpbmRpbmdSZWdpc3RyeS5nZXQodGhpcy5mb3JtUHJvcGVydHkucGF0aCk7XG4gICAgaWYgKChiaW5kaW5ncyB8fCBbXSkubGVuZ3RoKSB7XG4gICAgICBiaW5kaW5ncy5mb3JFYWNoKChiaW5kaW5nKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgZXZlbnRJZCBpbiBiaW5kaW5nKSB7XG4gICAgICAgICAgdGhpcy5jcmVhdGVCaW5kaW5nKGV2ZW50SWQsIGJpbmRpbmdbZXZlbnRJZF0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUJpbmRpbmcoZXZlbnRJZCwgbGlzdGVuZXIpIHtcbiAgICB0aGlzLnVubGlzdGVuLnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICBldmVudElkLFxuICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChsaXN0ZW5lciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgbGlzdGVuZXIoZXZlbnQsIHRoaXMuZm9ybVByb3BlcnR5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ0NhbGxpbmcgbm9uIGZ1bmN0aW9uIGhhbmRsZXIgZm9yIGV2ZW50SWQgJyArIGV2ZW50SWQgKyAnIGZvciBwYXRoICcgKyB0aGlzLmZvcm1Qcm9wZXJ0eS5wYXRoKTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUJ1dHRvbnMoKSB7XG4gICAgaWYgKHRoaXMuZm9ybVByb3BlcnR5LnNjaGVtYS5idXR0b25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYnV0dG9ucyA9IHRoaXMuZm9ybVByb3BlcnR5LnNjaGVtYS5idXR0b25zO1xuXG4gICAgICBmb3IgKGxldCBidXR0b24gb2YgdGhpcy5idXR0b25zKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uQ2FsbGJhY2soYnV0dG9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUJ1dHRvbkNhbGxiYWNrKGJ1dHRvbikge1xuICAgIGJ1dHRvbi5hY3Rpb24gPSAoZSkgPT4ge1xuICAgICAgbGV0IGFjdGlvbjtcbiAgICAgIGlmIChidXR0b24uaWQgJiYgKGFjdGlvbiA9IHRoaXMuYWN0aW9uUmVnaXN0cnkuZ2V0KGJ1dHRvbi5pZCkpKSB7XG4gICAgICAgIGlmIChhY3Rpb24pIHtcbiAgICAgICAgICBhY3Rpb24odGhpcy5mb3JtUHJvcGVydHksIGJ1dHRvbi5wYXJhbWV0ZXJzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH07XG4gIH1cblxuICBvbldpZGdldEluc3RhbmNpYXRlZCh3aWRnZXQ6IFdpZGdldDxhbnk+KSB7XG4gICAgdGhpcy53aWRnZXQgPSB3aWRnZXQ7XG4gICAgbGV0IGlkID0gJ2ZpZWxkJyArIChGb3JtRWxlbWVudENvbXBvbmVudC5jb3VudGVyKyspO1xuXG4gICAgdGhpcy53aWRnZXQuZm9ybVByb3BlcnR5ID0gdGhpcy5mb3JtUHJvcGVydHk7XG4gICAgdGhpcy53aWRnZXQuc2NoZW1hID0gdGhpcy5mb3JtUHJvcGVydHkuc2NoZW1hO1xuICAgIHRoaXMud2lkZ2V0Lm5hbWUgPSBpZDtcbiAgICB0aGlzLndpZGdldC5pZCA9IGlkO1xuICAgIHRoaXMud2lkZ2V0LmNvbnRyb2wgPSB0aGlzLmNvbnRyb2w7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy51bmxpc3Rlbikge1xuICAgICAgdGhpcy51bmxpc3Rlbi5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbXBvbmVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveVxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtXaWRnZXRGYWN0b3J5fSBmcm9tIFwiLi93aWRnZXRmYWN0b3J5XCI7XG5pbXBvcnQge1Rlcm1pbmF0b3JTZXJ2aWNlfSBmcm9tIFwiLi90ZXJtaW5hdG9yLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtZm9ybS1lbGVtZW50LWFjdGlvbicsXG4gIHRlbXBsYXRlOiAnPG5nLXRlbXBsYXRlICN0YXJnZXQ+PC9uZy10ZW1wbGF0ZT4nXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1FbGVtZW50Q29tcG9uZW50QWN0aW9uIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KClcbiAgYnV0dG9uOiBhbnk7XG5cbiAgQElucHV0KClcbiAgZm9ybVByb3BlcnR5OiBhbnk7XG5cbiAgQFZpZXdDaGlsZCgndGFyZ2V0Jywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgcHJpdmF0ZSByZWY6IENvbXBvbmVudFJlZjxhbnk+O1xuICBwcml2YXRlIHN1YnM6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdpZGdldEZhY3Rvcnk6IFdpZGdldEZhY3RvcnkgPSBudWxsLFxuICAgICAgICAgICAgICBwcml2YXRlIHRlcm1pbmF0b3I6IFRlcm1pbmF0b3JTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnMgPSB0aGlzLnRlcm1pbmF0b3Iub25EZXN0cm95LnN1YnNjcmliZShkZXN0cm95ID0+IHtcbiAgICAgIGlmIChkZXN0cm95KSB7XG4gICAgICAgIHRoaXMucmVmLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMucmVmID0gdGhpcy53aWRnZXRGYWN0b3J5LmNyZWF0ZVdpZGdldCh0aGlzLmNvbnRhaW5lciwgdGhpcy5idXR0b24ud2lkZ2V0IHx8ICdidXR0b24nKTtcbiAgICB0aGlzLnJlZi5pbnN0YW5jZS5idXR0b24gPSB0aGlzLmJ1dHRvbjtcbiAgICB0aGlzLnJlZi5pbnN0YW5jZS5mb3JtUHJvcGVydHkgPSB0aGlzLmZvcm1Qcm9wZXJ0eTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vicy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbXBvbmVudFJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGVybWluYXRvclNlcnZpY2UgfSBmcm9tICcuL3Rlcm1pbmF0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBXaWRnZXRGYWN0b3J5IH0gZnJvbSAnLi93aWRnZXRmYWN0b3J5JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLXdpZGdldC1jaG9vc2VyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICN0YXJnZXQ+PC9kaXY+YCxcbn0pXG5leHBvcnQgY2xhc3MgV2lkZ2V0Q2hvb3NlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIHdpZGdldEluZm86IGFueTtcblxuICBAT3V0cHV0KCkgd2lkZ2V0SW5zdGFuY2lhdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQFZpZXdDaGlsZCgndGFyZ2V0Jywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgcHJpdmF0ZSB3aWRnZXRJbnN0YW5jZTogYW55O1xuICBwcml2YXRlIHJlZjogQ29tcG9uZW50UmVmPGFueT47XG4gIHByaXZhdGUgc3ViczogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgd2lkZ2V0RmFjdG9yeTogV2lkZ2V0RmFjdG9yeSA9IG51bGwsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgdGVybWluYXRvcjogVGVybWluYXRvclNlcnZpY2UsXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJzID0gdGhpcy50ZXJtaW5hdG9yLm9uRGVzdHJveS5zdWJzY3JpYmUoZGVzdHJveSA9PiB7XG4gICAgICBpZiAoZGVzdHJveSkge1xuICAgICAgICB0aGlzLnJlZi5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLnJlZiA9IHRoaXMud2lkZ2V0RmFjdG9yeS5jcmVhdGVXaWRnZXQodGhpcy5jb250YWluZXIsIHRoaXMud2lkZ2V0SW5mby5pZCk7XG4gICAgdGhpcy53aWRnZXRJbnN0YW5jaWF0ZWQuZW1pdCh0aGlzLnJlZi5pbnN0YW5jZSk7XG4gICAgdGhpcy53aWRnZXRJbnN0YW5jZSA9IHRoaXMucmVmLmluc3RhbmNlO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vicy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCJpbXBvcnQge0FmdGVyVmlld0luaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge0FycmF5UHJvcGVydHl9IGZyb20gJy4vbW9kZWwvYXJyYXlwcm9wZXJ0eSc7XG5pbXBvcnQge0Zvcm1Qcm9wZXJ0eX0gZnJvbSAnLi9tb2RlbC9mb3JtcHJvcGVydHknO1xuaW1wb3J0IHtPYmplY3RQcm9wZXJ0eX0gZnJvbSAnLi9tb2RlbC9vYmplY3Rwcm9wZXJ0eSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBXaWRnZXQ8VCBleHRlbmRzIEZvcm1Qcm9wZXJ0eT4ge1xuICBmb3JtUHJvcGVydHk6IFQ7XG4gIGNvbnRyb2w6IEZvcm1Db250cm9sO1xuICBlcnJvck1lc3NhZ2VzOiBzdHJpbmdbXTtcblxuICBpZDogc3RyaW5nID0gJyc7XG4gIG5hbWU6IHN0cmluZyA9ICcnO1xuICBzY2hlbWE6IGFueSA9IHt9O1xufVxuXG5leHBvcnQgY2xhc3MgQ29udHJvbFdpZGdldCBleHRlbmRzIFdpZGdldDxGb3JtUHJvcGVydHk+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmNvbnRyb2w7XG4gICAgdGhpcy5mb3JtUHJvcGVydHkudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcbiAgICAgIGlmIChjb250cm9sLnZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICBjb250cm9sLnNldFZhbHVlKG5ld1ZhbHVlLCB7ZW1pdEV2ZW50OiBmYWxzZX0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZm9ybVByb3BlcnR5LmVycm9yc0NoYW5nZXMuc3Vic2NyaWJlKChlcnJvcnMpID0+IHtcbiAgICAgIGNvbnRyb2wuc2V0RXJyb3JzKGVycm9ycywgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XG4gICAgICBjb25zdCBtZXNzYWdlcyA9IChlcnJvcnMgfHwgW10pXG4gICAgICAgIC5maWx0ZXIoZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGUucGF0aCAmJiBlLnBhdGguc2xpY2UoMSkgPT09IHRoaXMuZm9ybVByb3BlcnR5LnBhdGg7XG4gICAgICAgIH0pXG4gICAgICAgIC5tYXAoZSA9PiBlLm1lc3NhZ2UpO1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gbWVzc2FnZXMuZmlsdGVyKChtLCBpKSA9PiBtZXNzYWdlcy5pbmRleE9mKG0pID09PSBpKTtcbiAgICB9KTtcbiAgICBjb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XG4gICAgICB0aGlzLmZvcm1Qcm9wZXJ0eS5zZXRWYWx1ZShuZXdWYWx1ZSwgZmFsc2UpO1xuICAgIH0pO1xuICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIEFycmF5TGF5b3V0V2lkZ2V0IGV4dGVuZHMgV2lkZ2V0PEFycmF5UHJvcGVydHk+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmNvbnRyb2w7XG4gICAgdGhpcy5mb3JtUHJvcGVydHkuZXJyb3JzQ2hhbmdlcy5zdWJzY3JpYmUoKGVycm9ycykgPT4ge1xuICAgICAgY29udHJvbC5zZXRFcnJvcnMoZXJyb3JzLCB7ZW1pdEV2ZW50OiB0cnVlfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE9iamVjdExheW91dFdpZGdldCBleHRlbmRzIFdpZGdldDxPYmplY3RQcm9wZXJ0eT4gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuY29udHJvbDtcbiAgICB0aGlzLmZvcm1Qcm9wZXJ0eS5lcnJvcnNDaGFuZ2VzLnN1YnNjcmliZSgoZXJyb3JzKSA9PiB7XG4gICAgICBjb250cm9sLnNldEVycm9ycyhlcnJvcnMsIHtlbWl0RXZlbnQ6IHRydWV9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFycmF5TGF5b3V0V2lkZ2V0IH0gZnJvbSAnLi4vLi4vd2lkZ2V0JztcbmltcG9ydCB7IEZvcm1Qcm9wZXJ0eSB9IGZyb20gJy4uLy4uL21vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtYXJyYXktd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwid2lkZ2V0IGZvcm0tZ3JvdXBcIj5cblx0PGxhYmVsIFthdHRyLmZvcl09XCJpZFwiIGNsYXNzPVwiaG9yaXpvbnRhbCBjb250cm9sLWxhYmVsXCI+XG5cdFx0e3sgc2NoZW1hLnRpdGxlIH19XG5cdDwvbGFiZWw+XG5cdDxzcGFuICpuZ0lmPVwic2NoZW1hLmRlc2NyaXB0aW9uXCIgY2xhc3M9XCJmb3JtSGVscFwiPnt7c2NoZW1hLmRlc2NyaXB0aW9ufX08L3NwYW4+XG5cdDxkaXYgKm5nRm9yPVwibGV0IGl0ZW1Qcm9wZXJ0eSBvZiBmb3JtUHJvcGVydHkucHJvcGVydGllc1wiPlxuXHRcdDxzZi1mb3JtLWVsZW1lbnQgW2Zvcm1Qcm9wZXJ0eV09XCJpdGVtUHJvcGVydHlcIj48L3NmLWZvcm0tZWxlbWVudD5cblx0XHQ8YnV0dG9uIChjbGljayk9XCJyZW1vdmVJdGVtKGl0ZW1Qcm9wZXJ0eSlcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBhcnJheS1yZW1vdmUtYnV0dG9uXCI+XG5cdFx0XHQ8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tbWludXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+IFJlbW92ZVxuXHRcdDwvYnV0dG9uPlxuXHQ8L2Rpdj5cblx0PGJ1dHRvbiAoY2xpY2spPVwiYWRkSXRlbSgpXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYXJyYXktYWRkLWJ1dHRvblwiPlxuXHRcdDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPiBBZGRcblx0PC9idXR0b24+XG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIEFycmF5V2lkZ2V0IGV4dGVuZHMgQXJyYXlMYXlvdXRXaWRnZXQge1xuXG4gIGFkZEl0ZW0oKSB7XG4gICAgdGhpcy5mb3JtUHJvcGVydHkuYWRkSXRlbSgpO1xuICB9XG5cbiAgcmVtb3ZlSXRlbShpdGVtOiBGb3JtUHJvcGVydHkpIHtcbiAgICB0aGlzLmZvcm1Qcm9wZXJ0eS5yZW1vdmVJdGVtKGl0ZW0pO1xuICB9XG5cbiAgdHJhY2tCeUluZGV4KGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkge1xuICAgIHJldHVybiBpbmRleDtcbiAgfVxufVxuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWJ1dHRvbi13aWRnZXQnLFxuICB0ZW1wbGF0ZTogJzxidXR0b24gKGNsaWNrKT1cImJ1dHRvbi5hY3Rpb24oJGV2ZW50KVwiPnt7YnV0dG9uLmxhYmVsfX08L2J1dHRvbj4nXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbldpZGdldCB7XG4gIHB1YmxpYyBidXR0b25cbiAgcHVibGljIGZvcm1Qcm9wZXJ0eVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE9iamVjdExheW91dFdpZGdldCB9IGZyb20gJy4uLy4uL3dpZGdldCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWZvcm0tb2JqZWN0JyxcbiAgdGVtcGxhdGU6IGA8ZmllbGRzZXQgKm5nRm9yPVwibGV0IGZpZWxkc2V0IG9mIGZvcm1Qcm9wZXJ0eS5zY2hlbWEuZmllbGRzZXRzXCI+XG5cdDxsZWdlbmQgKm5nSWY9XCJmaWVsZHNldC50aXRsZVwiPnt7ZmllbGRzZXQudGl0bGV9fTwvbGVnZW5kPlxuXHQ8ZGl2ICpuZ0lmPVwiZmllbGRzZXQuZGVzY3JpcHRpb25cIj57e2ZpZWxkc2V0LmRlc2NyaXB0aW9ufX08L2Rpdj5cblx0PGRpdiAqbmdGb3I9XCJsZXQgZmllbGRJZCBvZiBmaWVsZHNldC5maWVsZHNcIj5cblx0XHQ8c2YtZm9ybS1lbGVtZW50IFtmb3JtUHJvcGVydHldPVwiZm9ybVByb3BlcnR5LmdldFByb3BlcnR5KGZpZWxkSWQpXCI+PC9zZi1mb3JtLWVsZW1lbnQ+XG5cdDwvZGl2PlxuPC9maWVsZHNldD5gXG59KVxuZXhwb3J0IGNsYXNzIE9iamVjdFdpZGdldCBleHRlbmRzIE9iamVjdExheW91dFdpZGdldCB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb250cm9sV2lkZ2V0IH0gZnJvbSAnLi4vLi4vd2lkZ2V0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtY2hlY2tib3gtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwid2lkZ2V0IGZvcm0tZ3JvdXBcIj5cbiAgICA8bGFiZWwgW2F0dHIuZm9yXT1cImlkXCIgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cbiAgICAgICAge3sgc2NoZW1hLnRpdGxlIH19XG4gICAgPC9sYWJlbD5cblx0PGRpdiAqbmdJZj1cInNjaGVtYS50eXBlIT0nYXJyYXknXCIgY2xhc3M9XCJjaGVja2JveFwiPlxuXHRcdDxsYWJlbCBjbGFzcz1cImhvcml6b250YWwgY29udHJvbC1sYWJlbFwiPlxuXHRcdFx0PGlucHV0IFtmb3JtQ29udHJvbF09XCJjb250cm9sXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW2luZGV0ZXJtaW5hdGVdPVwiY29udHJvbC52YWx1ZSAhPT0gZmFsc2UgJiYgY29udHJvbC52YWx1ZSAhPT0gdHJ1ZSA/IHRydWUgOm51bGxcIiB0eXBlPVwiY2hlY2tib3hcIiBbZGlzYWJsZWRdPVwic2NoZW1hLnJlYWRPbmx5XCI+XG5cdFx0XHQ8aW5wdXQgKm5nSWY9XCJzY2hlbWEucmVhZE9ubHlcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiB0eXBlPVwiaGlkZGVuXCIgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIj5cblx0XHRcdHt7c2NoZW1hLmRlc2NyaXB0aW9ufX1cblx0XHQ8L2xhYmVsPlxuXHQ8L2Rpdj5cblx0PG5nLWNvbnRhaW5lciAqbmdJZj1cInNjaGVtYS50eXBlPT09J2FycmF5J1wiPlxuXHRcdDxkaXYgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBzY2hlbWEuaXRlbXMub25lT2ZcIiBjbGFzcz1cImNoZWNrYm94XCI+XG5cdFx0XHQ8bGFiZWwgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cblx0XHRcdFx0PGlucHV0IFthdHRyLm5hbWVdPVwibmFtZVwiXG5cdFx0XHRcdFx0dmFsdWU9XCJ7e29wdGlvbi5lbnVtWzBdfX1cIiB0eXBlPVwiY2hlY2tib3hcIiBcblx0XHRcdFx0XHRbYXR0ci5kaXNhYmxlZF09XCJzY2hlbWEucmVhZE9ubHlcIlxuXHRcdFx0XHRcdChjaGFuZ2UpPVwib25DaGVjaygkZXZlbnQudGFyZ2V0KVwiXG5cdFx0XHRcdFx0W2F0dHIuY2hlY2tlZF09XCJjaGVja2VkW29wdGlvbi5lbnVtWzBdXSA/IHRydWUgOiBudWxsXCI+XG5cdFx0XHRcdHt7b3B0aW9uLmRlc2NyaXB0aW9ufX1cblx0XHRcdDwvbGFiZWw+XG5cdFx0PC9kaXY+XG5cdDwvbmctY29udGFpbmVyPlxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveFdpZGdldCBleHRlbmRzIENvbnRyb2xXaWRnZXQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuXHRjaGVja2VkOiBhbnkgPSB7fTtcblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0Y29uc3QgY29udHJvbCA9IHRoaXMuY29udHJvbDtcblx0XHR0aGlzLmZvcm1Qcm9wZXJ0eS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xuXHRcdFx0aWYgKGNvbnRyb2wudmFsdWUgIT09IG5ld1ZhbHVlKSB7XG5cdFx0XHRcdGNvbnRyb2wuc2V0VmFsdWUobmV3VmFsdWUsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcblx0XHRcdFx0aWYgKG5ld1ZhbHVlICYmIEFycmF5LmlzQXJyYXkobmV3VmFsdWUpKSB7XG5cdFx0XHRcdFx0bmV3VmFsdWUubWFwKHYgPT4gdGhpcy5jaGVja2VkW3ZdID0gdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLmZvcm1Qcm9wZXJ0eS5lcnJvcnNDaGFuZ2VzLnN1YnNjcmliZSgoZXJyb3JzKSA9PiB7XG5cdFx0XHRjb250cm9sLnNldEVycm9ycyhlcnJvcnMsIHsgZW1pdEV2ZW50OiB0cnVlIH0pO1xuXHRcdH0pO1xuXHRcdGNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcblx0XHRcdHRoaXMuZm9ybVByb3BlcnR5LnNldFZhbHVlKG5ld1ZhbHVlLCBmYWxzZSk7XG5cdFx0fSk7XG5cdH1cblxuXHRvbkNoZWNrKGVsKSB7XG5cdFx0aWYgKGVsLmNoZWNrZWQpIHtcblx0XHRcdHRoaXMuY2hlY2tlZFtlbC52YWx1ZV0gPSB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWxldGUgdGhpcy5jaGVja2VkW2VsLnZhbHVlXTtcblx0XHR9XG5cdFx0dGhpcy5mb3JtUHJvcGVydHkuc2V0VmFsdWUoT2JqZWN0LmtleXModGhpcy5jaGVja2VkKSwgZmFsc2UpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29udHJvbFdpZGdldCB9IGZyb20gJy4uLy4uL3dpZGdldCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWZpbGUtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwid2lkZ2V0IGZvcm0tZ3JvdXBcIj5cblx0PGxhYmVsIFthdHRyLmZvcl09XCJpZFwiIGNsYXNzPVwiaG9yaXpvbnRhbCBjb250cm9sLWxhYmVsXCI+XG5cdFx0e3sgc2NoZW1hLnRpdGxlIH19XG5cdDwvbGFiZWw+XG4gICAgPHNwYW4gKm5nSWY9XCJzY2hlbWEuZGVzY3JpcHRpb25cIiBjbGFzcz1cImZvcm1IZWxwXCI+e3tzY2hlbWEuZGVzY3JpcHRpb259fTwvc3Bhbj5cbiAgPGlucHV0IFtuYW1lXT1cIm5hbWVcIiBjbGFzcz1cInRleHQtd2lkZ2V0IGZpbGUtd2lkZ2V0XCIgW2F0dHIuaWRdPVwiaWRcIlxuICAgIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCIgdHlwZT1cImZpbGVcIiBbYXR0ci5kaXNhYmxlZF09XCJzY2hlbWEucmVhZE9ubHk/dHJ1ZTpudWxsXCJcbiAgICAoY2hhbmdlKT1cIm9uRmlsZUNoYW5nZSgkZXZlbnQpXCI+XG5cdDxpbnB1dCAqbmdJZj1cInNjaGVtYS5yZWFkT25seVwiIFthdHRyLm5hbWVdPVwibmFtZVwiIHR5cGU9XCJoaWRkZW5cIiBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiPlxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBGaWxlV2lkZ2V0IGV4dGVuZHMgQ29udHJvbFdpZGdldCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIHByb3RlY3RlZCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICBwcm90ZWN0ZWQgZmlsZWRhdGE6IGFueSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gT1ZFUlJJREUgQ29udHJvbFdpZGdldCBuZ0FmdGVyVmlld0luaXQoKSBhcyBSZWFjdGl2ZUZvcm1zIGRvIG5vdCBoYW5kbGVcbiAgICAvLyBmaWxlIGlucHV0c1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmNvbnRyb2w7XG4gICAgdGhpcy5mb3JtUHJvcGVydHkuZXJyb3JzQ2hhbmdlcy5zdWJzY3JpYmUoKGVycm9ycykgPT4ge1xuICAgICAgY29udHJvbC5zZXRFcnJvcnMoZXJyb3JzLCB7IGVtaXRFdmVudDogdHJ1ZSB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMucmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuZmlsZWRhdGEuZGF0YSA9IHdpbmRvdy5idG9hKCh0aGlzLnJlYWRlci5yZXN1bHQgYXMgc3RyaW5nKSk7XG4gICAgICB0aGlzLmZvcm1Qcm9wZXJ0eS5zZXRWYWx1ZSh0aGlzLmZpbGVkYXRhLCBmYWxzZSk7XG4gICAgfTtcbiAgfVxuXG4gIG9uRmlsZUNoYW5nZSgkZXZlbnQpIHtcbiAgICBjb25zdCBmaWxlID0gJGV2ZW50LnRhcmdldC5maWxlc1swXTtcbiAgICB0aGlzLmZpbGVkYXRhLmZpbGVuYW1lID0gZmlsZS5uYW1lO1xuICAgIHRoaXMuZmlsZWRhdGEuc2l6ZSA9IGZpbGUuc2l6ZTtcbiAgICB0aGlzLmZpbGVkYXRhWydjb250ZW50LXR5cGUnXSA9IGZpbGUudHlwZTtcbiAgICB0aGlzLmZpbGVkYXRhLmVuY29kaW5nID0gJ2Jhc2U2NCc7XG4gICAgdGhpcy5yZWFkZXIucmVhZEFzQmluYXJ5U3RyaW5nKGZpbGUpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb250cm9sV2lkZ2V0IH0gZnJvbSAnLi4vLi4vd2lkZ2V0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtaW50ZWdlci13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3aWRnZXQgZm9ybS1ncm91cFwiPlxuXHQ8bGFiZWwgW2F0dHIuZm9yXT1cImlkXCIgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cblx0XHR7eyBzY2hlbWEudGl0bGUgfX1cblx0PC9sYWJlbD5cbiAgPHNwYW4gKm5nSWY9XCJzY2hlbWEuZGVzY3JpcHRpb25cIiBjbGFzcz1cImZvcm1IZWxwXCI+e3tzY2hlbWEuZGVzY3JpcHRpb259fTwvc3Bhbj5cblx0PGlucHV0IFthdHRyLnJlYWRvbmx5XT1cInNjaGVtYS5yZWFkT25seT90cnVlOm51bGxcIiBbbmFtZV09XCJuYW1lXCJcblx0Y2xhc3M9XCJ0ZXh0LXdpZGdldCBpbnRlZ2VyLXdpZGdldCBmb3JtLWNvbnRyb2xcIiBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiXG5cdFthdHRyLnR5cGVdPVwiJ251bWJlcidcIiBbYXR0ci5taW5dPVwic2NoZW1hLm1pbmltdW1cIiBbYXR0ci5tYXhdPVwic2NoZW1hLm1heGltdW1cIlxuXHRbYXR0ci5wbGFjZWhvbGRlcl09XCJzY2hlbWEucGxhY2Vob2xkZXJcIlxuXHRbYXR0ci5tYXhMZW5ndGhdPVwic2NoZW1hLm1heExlbmd0aCB8fCBudWxsXCJcbiAgW2F0dHIubWluTGVuZ3RoXT1cInNjaGVtYS5taW5MZW5ndGggfHwgbnVsbFwiPlxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBJbnRlZ2VyV2lkZ2V0IGV4dGVuZHMgQ29udHJvbFdpZGdldCB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbnRyb2xXaWRnZXQgfSBmcm9tICcuLi8uLi93aWRnZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi10ZXh0YXJlYS13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3aWRnZXQgZm9ybS1ncm91cFwiPlxuXHQ8bGFiZWwgW2F0dHIuZm9yXT1cImlkXCIgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cblx0XHR7eyBzY2hlbWEudGl0bGUgfX1cblx0PC9sYWJlbD5cbiAgICA8c3BhbiAqbmdJZj1cInNjaGVtYS5kZXNjcmlwdGlvblwiIGNsYXNzPVwiZm9ybUhlbHBcIj57e3NjaGVtYS5kZXNjcmlwdGlvbn19PC9zcGFuPlxuXHQ8dGV4dGFyZWEgW3JlYWRvbmx5XT1cInNjaGVtYS5yZWFkT25seVwiIFtuYW1lXT1cIm5hbWVcIlxuXHRcdGNsYXNzPVwidGV4dC13aWRnZXQgdGV4dGFyZWEtd2lkZ2V0IGZvcm0tY29udHJvbFwiXG5cdFx0W2F0dHIucGxhY2Vob2xkZXJdPVwic2NoZW1hLnBsYWNlaG9sZGVyXCJcblx0XHRbYXR0ci5tYXhMZW5ndGhdPVwic2NoZW1hLm1heExlbmd0aCB8fCBudWxsXCJcbiAgICBbYXR0ci5taW5MZW5ndGhdPVwic2NoZW1hLm1pbkxlbmd0aCB8fCBudWxsXCJcblx0XHRbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiPjwvdGV4dGFyZWE+XG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIFRleHRBcmVhV2lkZ2V0IGV4dGVuZHMgQ29udHJvbFdpZGdldCB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbnRyb2xXaWRnZXQgfSBmcm9tICcuLi8uLi93aWRnZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1yYWRpby13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3aWRnZXQgZm9ybS1ncm91cFwiPlxuXHQ8bGFiZWw+e3tzY2hlbWEudGl0bGV9fTwvbGFiZWw+XG4gICAgPHNwYW4gKm5nSWY9XCJzY2hlbWEuZGVzY3JpcHRpb25cIiBjbGFzcz1cImZvcm1IZWxwXCI+e3tzY2hlbWEuZGVzY3JpcHRpb259fTwvc3Bhbj5cblx0PGRpdiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHNjaGVtYS5vbmVPZlwiIGNsYXNzPVwicmFkaW9cIj5cblx0XHQ8bGFiZWwgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cblx0XHRcdDxpbnB1dCBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiIFthdHRyLm5hbWVdPVwibmFtZVwiIHZhbHVlPVwie3tvcHRpb24uZW51bVswXX19XCIgdHlwZT1cInJhZGlvXCIgIFtkaXNhYmxlZF09XCJzY2hlbWEucmVhZE9ubHlcIj5cblx0XHRcdHt7b3B0aW9uLmRlc2NyaXB0aW9ufX1cblx0XHQ8L2xhYmVsPlxuXHQ8L2Rpdj5cblx0PGlucHV0ICpuZ0lmPVwic2NoZW1hLnJlYWRPbmx5XCIgW2F0dHIubmFtZV09XCJuYW1lXCIgdHlwZT1cImhpZGRlblwiIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCI+XG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIFJhZGlvV2lkZ2V0IGV4dGVuZHMgQ29udHJvbFdpZGdldCB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbnRyb2xXaWRnZXQgfSBmcm9tICcuLi8uLi93aWRnZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1yYW5nZS13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3aWRnZXQgZm9ybS1ncm91cFwiPlxuXHQ8bGFiZWwgW2F0dHIuZm9yXT1cImlkXCIgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cblx0XHR7eyBzY2hlbWEudGl0bGUgfX1cblx0PC9sYWJlbD5cbiAgICA8c3BhbiAqbmdJZj1cInNjaGVtYS5kZXNjcmlwdGlvblwiIGNsYXNzPVwiZm9ybUhlbHBcIj57e3NjaGVtYS5kZXNjcmlwdGlvbn19PC9zcGFuPlx0XG5cdDxpbnB1dCBbbmFtZV09XCJuYW1lXCIgY2xhc3M9XCJ0ZXh0LXdpZGdldCByYW5nZS13aWRnZXRcIiBbYXR0ci5pZF09XCJpZFwiXG5cdFtmb3JtQ29udHJvbF09XCJjb250cm9sXCIgW2F0dHIudHlwZV09XCIncmFuZ2UnXCIgW2F0dHIubWluXT1cInNjaGVtYS5taW5pbXVtXCIgW2F0dHIubWF4XT1cInNjaGVtYS5tYXhpbXVtXCIgW2Rpc2FibGVkXT1cInNjaGVtYS5yZWFkT25seT90cnVlOm51bGxcIiA+XG5cdDxpbnB1dCAqbmdJZj1cInNjaGVtYS5yZWFkT25seVwiIFthdHRyLm5hbWVdPVwibmFtZVwiIHR5cGU9XCJoaWRkZW5cIj5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgUmFuZ2VXaWRnZXQgZXh0ZW5kcyBDb250cm9sV2lkZ2V0IHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29udHJvbFdpZGdldCB9IGZyb20gJy4uLy4uL3dpZGdldCc7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ3NmLXNlbGVjdC13aWRnZXQnLFxuXHR0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3aWRnZXQgZm9ybS1ncm91cFwiPlxuXHQ8bGFiZWwgW2F0dHIuZm9yXT1cImlkXCIgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cblx0XHR7eyBzY2hlbWEudGl0bGUgfX1cblx0PC9sYWJlbD5cblxuXHQ8c3BhbiAqbmdJZj1cInNjaGVtYS5kZXNjcmlwdGlvblwiIGNsYXNzPVwiZm9ybUhlbHBcIj5cblx0XHR7e3NjaGVtYS5kZXNjcmlwdGlvbn19XG5cdDwvc3Bhbj5cblxuXHQ8c2VsZWN0ICpuZ0lmPVwic2NoZW1hLnR5cGUhPSdhcnJheSdcIiBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiIFthdHRyLm5hbWVdPVwibmFtZVwiIFtkaXNhYmxlZF09XCJzY2hlbWEucmVhZE9ubHlcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuXHRcdDxvcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBzY2hlbWEub25lT2ZcIiBbbmdWYWx1ZV09XCJvcHRpb24uZW51bVswXVwiID57e29wdGlvbi5kZXNjcmlwdGlvbn19PC9vcHRpb24+XG5cdDwvc2VsZWN0PlxuXG5cdDxzZWxlY3QgKm5nSWY9XCJzY2hlbWEudHlwZT09PSdhcnJheSdcIiBtdWx0aXBsZSBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiIFthdHRyLm5hbWVdPVwibmFtZVwiIFtkaXNhYmxlZF09XCJzY2hlbWEucmVhZE9ubHlcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuXHRcdDxvcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBzY2hlbWEuaXRlbXMub25lT2ZcIiBbbmdWYWx1ZV09XCJvcHRpb24uZW51bVswXVwiID57e29wdGlvbi5kZXNjcmlwdGlvbn19PC9vcHRpb24+XG5cdDwvc2VsZWN0PlxuXG5cdDxpbnB1dCAqbmdJZj1cInNjaGVtYS5yZWFkT25seVwiIFthdHRyLm5hbWVdPVwibmFtZVwiIHR5cGU9XCJoaWRkZW5cIiBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiPlxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RXaWRnZXQgZXh0ZW5kcyBDb250cm9sV2lkZ2V0IHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29udHJvbFdpZGdldCB9IGZyb20gJy4uLy4uL3dpZGdldCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLXN0cmluZy13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYDxpbnB1dCAqbmdJZj1cInRoaXMuc2NoZW1hLndpZGdldC5pZCA9PT0naGlkZGVuJzsgZWxzZSBub3RIaWRkZW5GaWVsZEJsb2NrXCJcbiAgW2F0dHIubmFtZV09XCJuYW1lXCIgdHlwZT1cImhpZGRlblwiIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCI+XG48bmctdGVtcGxhdGUgI25vdEhpZGRlbkZpZWxkQmxvY2s+XG48ZGl2IGNsYXNzPVwid2lkZ2V0IGZvcm0tZ3JvdXBcIj5cbiAgICA8bGFiZWwgW2F0dHIuZm9yXT1cImlkXCIgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cbiAgICBcdHt7IHNjaGVtYS50aXRsZSB9fVxuICAgIDwvbGFiZWw+XG4gICAgPHNwYW4gKm5nSWY9XCJzY2hlbWEuZGVzY3JpcHRpb25cIiBjbGFzcz1cImZvcm1IZWxwXCI+e3tzY2hlbWEuZGVzY3JpcHRpb259fTwvc3Bhbj5cbiAgICA8aW5wdXQgW25hbWVdPVwibmFtZVwiIFthdHRyLnJlYWRvbmx5XT1cIihzY2hlbWEud2lkZ2V0LmlkIT09J2NvbG9yJykgJiYgc2NoZW1hLnJlYWRPbmx5P3RydWU6bnVsbFwiXG4gICAgY2xhc3M9XCJ0ZXh0LXdpZGdldC5pZCB0ZXh0bGluZS13aWRnZXQgZm9ybS1jb250cm9sXCJcbiAgICBbYXR0ci50eXBlXT1cIiF0aGlzLnNjaGVtYS53aWRnZXQuaWQgfHwgdGhpcy5zY2hlbWEud2lkZ2V0LmlkID09PSAnc3RyaW5nJyA/ICd0ZXh0JyA6IHRoaXMuc2NoZW1hLndpZGdldC5pZFwiXG4gICAgW2F0dHIuaWRdPVwiaWRcIiAgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJzY2hlbWEucGxhY2Vob2xkZXJcIlxuICAgIFthdHRyLm1heExlbmd0aF09XCJzY2hlbWEubWF4TGVuZ3RoIHx8IG51bGxcIlxuICAgIFthdHRyLm1pbkxlbmd0aF09XCJzY2hlbWEubWluTGVuZ3RoIHx8IG51bGxcIlxuICAgIFthdHRyLnJlcXVpcmVkXT1cInNjaGVtYS5pc1JlcXVpcmVkIHx8IG51bGxcIlxuICAgIFthdHRyLmRpc2FibGVkXT1cIihzY2hlbWEud2lkZ2V0LmlkPT0nY29sb3InICYmIHNjaGVtYS5yZWFkT25seSk/dHJ1ZTpudWxsXCI+XG4gICAgPGlucHV0ICpuZ0lmPVwiKHNjaGVtYS53aWRnZXQuaWQ9PT0nY29sb3InICYmIHNjaGVtYS5yZWFkT25seSlcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiB0eXBlPVwiaGlkZGVuXCIgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIj5cbjwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5gXG59KVxuZXhwb3J0IGNsYXNzIFN0cmluZ1dpZGdldCBleHRlbmRzIENvbnRyb2xXaWRnZXQge1xuXG4gICAgZ2V0SW5wdXRUeXBlKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2NoZW1hLndpZGdldC5pZCB8fCB0aGlzLnNjaGVtYS53aWRnZXQuaWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3RleHQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NoZW1hLndpZGdldC5pZDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEFycmF5V2lkZ2V0IH0gZnJvbSAnLi9hcnJheS9hcnJheS53aWRnZXQnO1xuaW1wb3J0IHsgQnV0dG9uV2lkZ2V0IH0gZnJvbSAnLi9idXR0b24vYnV0dG9uLndpZGdldCc7XG5pbXBvcnQgeyBDaGVja2JveFdpZGdldCB9IGZyb20gJy4vY2hlY2tib3gvY2hlY2tib3gud2lkZ2V0JztcbmltcG9ydCB7IEZpbGVXaWRnZXQgfSBmcm9tICcuL2ZpbGUvZmlsZS53aWRnZXQnO1xuaW1wb3J0IHsgSW50ZWdlcldpZGdldCB9IGZyb20gJy4vaW50ZWdlci9pbnRlZ2VyLndpZGdldCc7XG5pbXBvcnQgeyBPYmplY3RXaWRnZXQgfSBmcm9tICcuL29iamVjdC9vYmplY3Qud2lkZ2V0JztcbmltcG9ydCB7IFJhZGlvV2lkZ2V0IH0gZnJvbSAnLi9yYWRpby9yYWRpby53aWRnZXQnO1xuaW1wb3J0IHsgUmFuZ2VXaWRnZXQgfSBmcm9tICcuL3JhbmdlL3JhbmdlLndpZGdldCc7XG5pbXBvcnQgeyBTZWxlY3RXaWRnZXQgfSBmcm9tICcuL3NlbGVjdC9zZWxlY3Qud2lkZ2V0JztcbmltcG9ydCB7IFN0cmluZ1dpZGdldCB9IGZyb20gJy4vc3RyaW5nL3N0cmluZy53aWRnZXQnO1xuaW1wb3J0IHsgVGV4dEFyZWFXaWRnZXQgfSBmcm9tICcuL3RleHRhcmVhL3RleHRhcmVhLndpZGdldCc7XG5cbmltcG9ydCB7IFdpZGdldFJlZ2lzdHJ5IH0gZnJvbSAnLi4vd2lkZ2V0cmVnaXN0cnknO1xuXG5leHBvcnQgY2xhc3MgRGVmYXVsdFdpZGdldFJlZ2lzdHJ5IGV4dGVuZHMgV2lkZ2V0UmVnaXN0cnkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5yZWdpc3RlcignYXJyYXknLCAgQXJyYXlXaWRnZXQpO1xuICAgIHRoaXMucmVnaXN0ZXIoJ29iamVjdCcsICBPYmplY3RXaWRnZXQpO1xuXG4gICAgdGhpcy5yZWdpc3Rlcignc3RyaW5nJywgU3RyaW5nV2lkZ2V0KTtcbiAgICB0aGlzLnJlZ2lzdGVyKCdzZWFyY2gnLCBTdHJpbmdXaWRnZXQpO1xuICAgIHRoaXMucmVnaXN0ZXIoJ3RlbCcsIFN0cmluZ1dpZGdldCk7XG4gICAgdGhpcy5yZWdpc3RlcigndXJsJywgU3RyaW5nV2lkZ2V0KTtcbiAgICB0aGlzLnJlZ2lzdGVyKCdlbWFpbCcsIFN0cmluZ1dpZGdldCk7XG4gICAgdGhpcy5yZWdpc3RlcigncGFzc3dvcmQnLCBTdHJpbmdXaWRnZXQpO1xuICAgIHRoaXMucmVnaXN0ZXIoJ2NvbG9yJywgU3RyaW5nV2lkZ2V0KTtcbiAgICB0aGlzLnJlZ2lzdGVyKCdkYXRlJywgU3RyaW5nV2lkZ2V0KTtcbiAgICB0aGlzLnJlZ2lzdGVyKCdkYXRlLXRpbWUnLCBTdHJpbmdXaWRnZXQpO1xuICAgIHRoaXMucmVnaXN0ZXIoJ3RpbWUnLCBTdHJpbmdXaWRnZXQpO1xuXG4gICAgdGhpcy5yZWdpc3RlcignaW50ZWdlcicsIEludGVnZXJXaWRnZXQpO1xuICAgIHRoaXMucmVnaXN0ZXIoJ251bWJlcicsIEludGVnZXJXaWRnZXQpO1xuICAgIHRoaXMucmVnaXN0ZXIoJ3JhbmdlJywgUmFuZ2VXaWRnZXQpO1xuXG4gICAgdGhpcy5yZWdpc3RlcigndGV4dGFyZWEnLCBUZXh0QXJlYVdpZGdldCk7XG5cbiAgICB0aGlzLnJlZ2lzdGVyKCdmaWxlJywgRmlsZVdpZGdldCk7XG4gICAgdGhpcy5yZWdpc3Rlcignc2VsZWN0JywgU2VsZWN0V2lkZ2V0KTtcbiAgICB0aGlzLnJlZ2lzdGVyKCdyYWRpbycsIFJhZGlvV2lkZ2V0KTtcbiAgICB0aGlzLnJlZ2lzdGVyKCdib29sZWFuJywgQ2hlY2tib3hXaWRnZXQpO1xuICAgIHRoaXMucmVnaXN0ZXIoJ2NoZWNrYm94JywgQ2hlY2tib3hXaWRnZXQpO1xuXG4gICAgdGhpcy5yZWdpc3RlcignYnV0dG9uJywgQnV0dG9uV2lkZ2V0KTtcblxuICAgIHRoaXMuc2V0RGVmYXVsdFdpZGdldChTdHJpbmdXaWRnZXQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtZGVmYXVsdC1maWVsZCcsXG4gIHRlbXBsYXRlOiBgPHA+VW5rbm93IHR5cGU8L3A+YFxufSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0V2lkZ2V0IHt9XG4iLCJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgRm9ybXNNb2R1bGUsXG4gIFJlYWN0aXZlRm9ybXNNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge0Zvcm1FbGVtZW50Q29tcG9uZW50fSBmcm9tICcuL2Zvcm1lbGVtZW50LmNvbXBvbmVudCc7XG5pbXBvcnQge0Zvcm1Db21wb25lbnR9IGZyb20gJy4vZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtXaWRnZXRDaG9vc2VyQ29tcG9uZW50fSBmcm9tICcuL3dpZGdldGNob29zZXIuY29tcG9uZW50JztcbmltcG9ydCB7QXJyYXlXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvYXJyYXkvYXJyYXkud2lkZ2V0JztcbmltcG9ydCB7QnV0dG9uV2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL2J1dHRvbi9idXR0b24ud2lkZ2V0JztcbmltcG9ydCB7T2JqZWN0V2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL29iamVjdC9vYmplY3Qud2lkZ2V0JztcbmltcG9ydCB7Q2hlY2tib3hXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvY2hlY2tib3gvY2hlY2tib3gud2lkZ2V0JztcbmltcG9ydCB7RmlsZVdpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9maWxlL2ZpbGUud2lkZ2V0JztcbmltcG9ydCB7SW50ZWdlcldpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9pbnRlZ2VyL2ludGVnZXIud2lkZ2V0JztcbmltcG9ydCB7VGV4dEFyZWFXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvdGV4dGFyZWEvdGV4dGFyZWEud2lkZ2V0JztcbmltcG9ydCB7UmFkaW9XaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvcmFkaW8vcmFkaW8ud2lkZ2V0JztcbmltcG9ydCB7UmFuZ2VXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvcmFuZ2UvcmFuZ2Uud2lkZ2V0JztcbmltcG9ydCB7U2VsZWN0V2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL3NlbGVjdC9zZWxlY3Qud2lkZ2V0JztcbmltcG9ydCB7U3RyaW5nV2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL3N0cmluZy9zdHJpbmcud2lkZ2V0JztcbmltcG9ydCB7RGVmYXVsdFdpZGdldFJlZ2lzdHJ5fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL2RlZmF1bHR3aWRnZXRyZWdpc3RyeSc7XG5pbXBvcnQge1xuICBEZWZhdWx0V2lkZ2V0XG59IGZyb20gJy4vZGVmYXVsdC53aWRnZXQnO1xuXG5pbXBvcnQge1dpZGdldFJlZ2lzdHJ5fSBmcm9tICcuL3dpZGdldHJlZ2lzdHJ5JztcbmltcG9ydCB7U2NoZW1hVmFsaWRhdG9yRmFjdG9yeSwgWlNjaGVtYVZhbGlkYXRvckZhY3Rvcnl9IGZyb20gJy4vc2NoZW1hdmFsaWRhdG9yZmFjdG9yeSc7XG5pbXBvcnQge0Zvcm1FbGVtZW50Q29tcG9uZW50QWN0aW9ufSBmcm9tICcuL2Zvcm1lbGVtZW50LmFjdGlvbi5jb21wb25lbnQnO1xuXG5jb25zdCBtb2R1bGVQcm92aWRlcnMgPSBbXG4gIHtcbiAgICBwcm92aWRlOiBXaWRnZXRSZWdpc3RyeSxcbiAgICB1c2VDbGFzczogRGVmYXVsdFdpZGdldFJlZ2lzdHJ5XG4gIH0sXG4gIHtcbiAgICBwcm92aWRlOiBTY2hlbWFWYWxpZGF0b3JGYWN0b3J5LFxuICAgIHVzZUNsYXNzOiBaU2NoZW1hVmFsaWRhdG9yRmFjdG9yeVxuICB9XG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEZvcm1FbGVtZW50Q29tcG9uZW50LFxuICAgIEZvcm1FbGVtZW50Q29tcG9uZW50QWN0aW9uLFxuICAgIEZvcm1Db21wb25lbnQsXG4gICAgV2lkZ2V0Q2hvb3NlckNvbXBvbmVudCxcbiAgICBEZWZhdWx0V2lkZ2V0LFxuICAgIEFycmF5V2lkZ2V0LFxuICAgIEJ1dHRvbldpZGdldCxcbiAgICBPYmplY3RXaWRnZXQsXG4gICAgQ2hlY2tib3hXaWRnZXQsXG4gICAgRmlsZVdpZGdldCxcbiAgICBJbnRlZ2VyV2lkZ2V0LFxuICAgIFRleHRBcmVhV2lkZ2V0LFxuICAgIFJhZGlvV2lkZ2V0LFxuICAgIFJhbmdlV2lkZ2V0LFxuICAgIFNlbGVjdFdpZGdldCxcbiAgICBTdHJpbmdXaWRnZXQsXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIEZvcm1FbGVtZW50Q29tcG9uZW50LFxuICAgIEZvcm1FbGVtZW50Q29tcG9uZW50QWN0aW9uLFxuICAgIEZvcm1Db21wb25lbnQsXG4gICAgV2lkZ2V0Q2hvb3NlckNvbXBvbmVudCxcbiAgICBBcnJheVdpZGdldCxcbiAgICBCdXR0b25XaWRnZXQsXG4gICAgT2JqZWN0V2lkZ2V0LFxuICAgIENoZWNrYm94V2lkZ2V0LFxuICAgIEZpbGVXaWRnZXQsXG4gICAgSW50ZWdlcldpZGdldCxcbiAgICBUZXh0QXJlYVdpZGdldCxcbiAgICBSYWRpb1dpZGdldCxcbiAgICBSYW5nZVdpZGdldCxcbiAgICBTZWxlY3RXaWRnZXQsXG4gICAgU3RyaW5nV2lkZ2V0LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRm9ybUNvbXBvbmVudCxcbiAgICBGb3JtRWxlbWVudENvbXBvbmVudCxcbiAgICBGb3JtRWxlbWVudENvbXBvbmVudEFjdGlvbixcbiAgICBXaWRnZXRDaG9vc2VyQ29tcG9uZW50LFxuICAgIEFycmF5V2lkZ2V0LFxuICAgIEJ1dHRvbldpZGdldCxcbiAgICBPYmplY3RXaWRnZXQsXG4gICAgQ2hlY2tib3hXaWRnZXQsXG4gICAgRmlsZVdpZGdldCxcbiAgICBJbnRlZ2VyV2lkZ2V0LFxuICAgIFRleHRBcmVhV2lkZ2V0LFxuICAgIFJhZGlvV2lkZ2V0LFxuICAgIFJhbmdlV2lkZ2V0LFxuICAgIFNlbGVjdFdpZGdldCxcbiAgICBTdHJpbmdXaWRnZXRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTY2hlbWFGb3JtTW9kdWxlIHtcblxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNjaGVtYUZvcm1Nb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFsuLi5tb2R1bGVQcm92aWRlcnNdXG4gICAgfTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlU2NoZW1hU2VydmljZSB7XG5cbiAgY2hhbmdlcyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGNoYW5nZWQoKSB7XG4gICAgdGhpcy5jaGFuZ2VzLmVtaXQoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZVNjaGVtYUVsZW1lbnQge1xuXG4gIGdldFRleHRDb250ZW50KGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpOiBzdHJpbmcge1xuICAgIGNvbnN0IG5vZGVzID0gQXJyYXkuZnJvbShlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGROb2Rlcyk7XG4gICAgY29uc3Qgbm9kZSA9IDxIVE1MRWxlbWVudD5ub2Rlcy5maWx0ZXIoKGVsOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgcmV0dXJuIGVsLm5vZGVUeXBlID09PSBlbC5URVhUX05PREU7XG4gICAgfSkucG9wKCk7XG5cbiAgICBpZiAoIW5vZGUgfHwgIW5vZGUubm9kZVZhbHVlKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGUubm9kZVZhbHVlLnRyaW0oKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgVGVtcGxhdGVTY2hlbWFFbGVtZW50IH0gZnJvbSAnLi4vdGVtcGxhdGUtc2NoZW1hLWVsZW1lbnQnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBUZW1wbGF0ZVNjaGVtYUVsZW1lbnQsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBCdXR0b25Db21wb25lbnQpLFxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25Db21wb25lbnQgZXh0ZW5kcyBUZW1wbGF0ZVNjaGVtYUVsZW1lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcblxuICBASW5wdXQoKVxuICBpZDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGxhYmVsID0gJyc7XG5cbiAgQElucHV0KClcbiAgd2lkZ2V0OiBzdHJpbmcgfCBvYmplY3Q7XG5cbiAgQE91dHB1dCgpXG4gIGNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0TGFiZWxGcm9tQ29udGVudCgpIHtcbiAgICBjb25zdCB0ZXh0Q29udGVudCA9IHRoaXMuZ2V0VGV4dENvbnRlbnQodGhpcy5lbGVtZW50UmVmKTtcblxuICAgIC8vIGxhYmVsIGFzIEBJbnB1dCB0YWtlcyBwcmlvcml0eSBvdmVyIGNvbnRlbnQgdGV4dFxuICAgIGlmICh0ZXh0Q29udGVudCAmJiAhdGhpcy5sYWJlbCkge1xuICAgICAgdGhpcy5sYWJlbCA9IHRleHRDb250ZW50O1xuICAgIH1cblxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuc2V0TGFiZWxGcm9tQ29udGVudCgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gJy4uLy4uL21vZGVsL3ZhbGlkYXRvcic7XG5cbmV4cG9ydCBlbnVtIEZpZWxkVHlwZSB7XG4gIFN0cmluZyA9ICdzdHJpbmcnLFxuICBPYmplY3QgPSAnb2JqZWN0JyxcbiAgQXJyYXkgPSAnYXJyYXknLFxuICBCb29sZWFuID0gJ2Jvb2xlYW4nLFxuICBJbnRlZ2VyID0gICdpbnRlZ2VyJyxcbiAgTnVtYmVyID0gJ251bWJlcicsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGQge1xuICBuYW1lOiBzdHJpbmc7XG4gIHJlcXVpcmVkOiBib29sZWFuO1xuICBnZXRTY2hlbWEoKTogYW55O1xuICBnZXRCdXR0b25zKCk6IGFueTtcbiAgZ2V0VmFsaWRhdG9ycygpOiB7IHBhdGg6IHN0cmluZywgdmFsaWRhdG9yOiBWYWxpZGF0b3IgfVtdO1xufVxuXG5cbiIsImltcG9ydCB7IEVsZW1lbnRSZWYsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi9tb2RlbC92YWxpZGF0b3InO1xuaW1wb3J0IHsgQWN0aW9uUmVnaXN0cnkgfSBmcm9tICcuLi8uLi9tb2RlbC9hY3Rpb25yZWdpc3RyeSc7XG5pbXBvcnQgeyBCdXR0b25Db21wb25lbnQgfSBmcm9tICcuLi9idXR0b24vYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUZW1wbGF0ZVNjaGVtYUVsZW1lbnQgfSBmcm9tICcuLi90ZW1wbGF0ZS1zY2hlbWEtZWxlbWVudCc7XG5cbmltcG9ydCB7IEZpZWxkLCBGaWVsZFR5cGUgfSBmcm9tICcuL2ZpZWxkJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZpZWxkUGFyZW50IGV4dGVuZHMgVGVtcGxhdGVTY2hlbWFFbGVtZW50IHtcblxuICBuYW1lID0gJyc7XG4gIHR5cGU6IEZpZWxkVHlwZTtcblxuICBnZXQgcGF0aCgpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5uYW1lKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuICcvJyArIHRoaXMubmFtZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhY3Rpb25SZWdpc3RyeTogQWN0aW9uUmVnaXN0cnk7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjaGlsZEJ1dHRvbnM6IFF1ZXJ5TGlzdDxCdXR0b25Db21wb25lbnQ+O1xuXG5cbiAgZ2V0QnV0dG9ucygpOiB7IGlkOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIHdpZGdldD86IHN0cmluZyB8IG9iamVjdCB9W10ge1xuXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRCdXR0b25zLm1hcCgoYnV0dG9uLCBpbmRleCkgPT4ge1xuXG4gICAgICBpZiAoIWJ1dHRvbi5pZCkge1xuICAgICAgICBjb25zdCByYW5kb21TdHJpbmcgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE2KS5zdWJzdHIoMiwgOCk7XG4gICAgICAgIC8vIGdlbmVyYXRlIGlkIGZvciBidXR0b25cbiAgICAgICAgYnV0dG9uLmlkID0gdGhpcy5uYW1lICsgcmFuZG9tU3RyaW5nICsgJ18nICArIChpbmRleCArIDEpO1xuICAgICAgfVxuXG4gICAgICAvLyByZWdpc3RlciBhcyBidXR0b24gYWN0aW9uIHRoZSBFdmVudEVtaXR0ZXIgY2xpY2tcbiAgICAgIHRoaXMuYWN0aW9uUmVnaXN0cnkucmVnaXN0ZXIoXG4gICAgICAgIGJ1dHRvbi5pZCxcbiAgICAgICAgYnV0dG9uLmNsaWNrLmVtaXQuYmluZChidXR0b24uY2xpY2spXG4gICAgICApO1xuXG4gICAgICBjb25zdCBfYnV0dG9uID0gPGFueT57XG4gICAgICAgIGlkOiBidXR0b24uaWQsXG4gICAgICAgIGxhYmVsOiBidXR0b24ubGFiZWwsXG4gICAgICB9O1xuXG4gICAgICBpZiAoYnV0dG9uLndpZGdldCkge1xuICAgICAgICBfYnV0dG9uLndpZGdldCA9IGJ1dHRvbi53aWRnZXQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfYnV0dG9uO1xuXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RmllbGRzVmFsaWRhdG9ycyhcbiAgICBmaWVsZHM6IEZpZWxkW11cbiAgKTogeyBwYXRoOiBzdHJpbmcsIHZhbGlkYXRvcjogVmFsaWRhdG9yIH1bXSB7XG5cbiAgICByZXR1cm4gZmllbGRzLnJlZHVjZSgodmFsaWRhdG9ycywgZmllbGQpID0+IHtcbiAgICAgIHJldHVybiB2YWxpZGF0b3JzLmNvbmNhdChmaWVsZC5nZXRWYWxpZGF0b3JzKCkpO1xuICAgIH0sIFtdKTtcblxuICB9XG5cbiAgcHJvdGVjdGVkIGdldEZpZWxkc1NjaGVtYShmaWVsZHM6IEZpZWxkW10pIHtcbiAgICByZXR1cm4gZmllbGRzLnJlZHVjZSgoc2NoZW1hOiBhbnksIGZpZWxkKSA9PiB7XG5cbiAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgIGNhc2UgRmllbGRUeXBlLkFycmF5OlxuICAgICAgICAgIHNjaGVtYS5pdGVtcyA9IGZpZWxkLmdldFNjaGVtYSgpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgaWYgKCFzY2hlbWEucHJvcGVydGllcykge1xuICAgICAgICAgICAgc2NoZW1hLnByb3BlcnRpZXMgPSB7fTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzY2hlbWEucHJvcGVydGllc1tmaWVsZC5uYW1lXSA9IGZpZWxkLmdldFNjaGVtYSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBidXR0b25zID0gZmllbGQuZ2V0QnV0dG9ucygpO1xuICAgICAgaWYgKGJ1dHRvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBzY2hlbWEuYnV0dG9ucyA9IGJ1dHRvbnM7XG4gICAgICB9XG5cbiAgICAgIGlmICghZmllbGQucmVxdWlyZWQpIHtcbiAgICAgICAgcmV0dXJuIHNjaGVtYTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzY2hlbWEucmVxdWlyZWQpIHtcbiAgICAgICAgc2NoZW1hLnJlcXVpcmVkID0gW107XG4gICAgICB9XG4gICAgICBzY2hlbWEucmVxdWlyZWQucHVzaChmaWVsZC5uYW1lKTtcbiAgICAgIHJldHVybiBzY2hlbWE7XG4gICAgfSwge30pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gQ29tcG9uZW50LFxuIEVsZW1lbnRSZWYsXG4gSW5wdXQsXG4gT25Jbml0LFxuIGZvcndhcmRSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFRlbXBsYXRlU2NoZW1hRWxlbWVudCB9IGZyb20gJy4uLy4uL3RlbXBsYXRlLXNjaGVtYS1lbGVtZW50JztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1pdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2l0ZW0uY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1Db21wb25lbnQgZXh0ZW5kcyBUZW1wbGF0ZVNjaGVtYUVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIHZhbHVlOiBhbnk7XG5cbiAgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMuZ2V0VGV4dENvbnRlbnQodGhpcy5lbGVtZW50UmVmKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIE9uSW5pdCxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBWaWV3Q2hpbGQsXG4gIFF1ZXJ5TGlzdCxcbiAgRWxlbWVudFJlZixcbiAgZm9yd2FyZFJlZixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlLFxuICBPbkNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuLi8uLi9tb2RlbC9hY3Rpb24nO1xuaW1wb3J0IHsgQWN0aW9uUmVnaXN0cnkgfSBmcm9tICcuLi8uLi9tb2RlbC9hY3Rpb25yZWdpc3RyeSc7XG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi9tb2RlbC92YWxpZGF0b3InO1xuXG5pbXBvcnQgeyBUZW1wbGF0ZVNjaGVtYUVsZW1lbnQgfSBmcm9tICcuLi90ZW1wbGF0ZS1zY2hlbWEtZWxlbWVudCc7XG5pbXBvcnQgeyBUZW1wbGF0ZVNjaGVtYVNlcnZpY2UgfSBmcm9tICcuLi90ZW1wbGF0ZS1zY2hlbWEuc2VydmljZSc7XG5pbXBvcnQgeyBCdXR0b25Db21wb25lbnQgfSBmcm9tICcuLi9idXR0b24vYnV0dG9uLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IEZpZWxkUGFyZW50IH0gZnJvbSAnLi9maWVsZC1wYXJlbnQnO1xuaW1wb3J0IHsgRmllbGRUeXBlLCBGaWVsZCB9IGZyb20gJy4vZmllbGQnO1xuaW1wb3J0IHsgSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vaXRlbS9pdGVtLmNvbXBvbmVudCc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZmllbGQuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEZpZWxkQ29tcG9uZW50IGV4dGVuZHMgRmllbGRQYXJlbnQgaW1wbGVtZW50c1xuRmllbGQsIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCB7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihGaWVsZENvbXBvbmVudClcbiAgY2hpbGRGaWVsZHM6IFF1ZXJ5TGlzdDxGaWVsZENvbXBvbmVudD47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihJdGVtQ29tcG9uZW50KVxuICBjaGlsZEl0ZW1zOiBRdWVyeUxpc3Q8SXRlbUNvbXBvbmVudD47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihCdXR0b25Db21wb25lbnQpXG4gIGNoaWxkQnV0dG9uczogUXVlcnlMaXN0PEJ1dHRvbkNvbXBvbmVudD47XG5cbiAgQElucHV0KClcbiAgbmFtZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHR5cGUgPSBGaWVsZFR5cGUuU3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGZvcm1hdDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHJlYWRPbmx5OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBASW5wdXQoKVxuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHdpZGdldDogc3RyaW5nIHwgb2JqZWN0O1xuXG4gIEBJbnB1dCgpXG4gIHZhbGlkYXRvcjogVmFsaWRhdG9yO1xuXG4gIEBJbnB1dCgpXG4gIHNjaGVtYTogYW55ID0geyB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHRlbXBsYXRlU2NoZW1hU2VydmljZTogVGVtcGxhdGVTY2hlbWFTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhY3Rpb25SZWdpc3RyeTogQWN0aW9uUmVnaXN0cnlcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGdldFNjaGVtYSgpOiBhbnkge1xuXG4gICAgY29uc3QgeyBwcm9wZXJ0aWVzLCBpdGVtcywgcmVxdWlyZWQgfSA9IHRoaXMuZ2V0RmllbGRzU2NoZW1hKFxuICAgICAgdGhpcy5jaGlsZEZpZWxkcy5maWx0ZXIoZmllbGQgPT4gZmllbGQgIT09IHRoaXMpXG4gICAgKTtcblxuICAgIGNvbnN0IG9uZU9mID0gdGhpcy5nZXRPbmVPZigpO1xuXG4gICAgY29uc3Qgc2NoZW1hID0gPGFueT57XG4gICAgICB0eXBlOiB0aGlzLnR5cGVcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMudGl0bGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLnRpdGxlID0gdGhpcy50aXRsZTtcbiAgICB9XG5cbiAgICBpZiAocHJvcGVydGllcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2hlbWEucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgaWYgKGl0ZW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjaGVtYS5pdGVtcyA9IGl0ZW1zO1xuICAgIH1cblxuICAgIC8vIHJlcXVyaWVkIGNoaWxkIGZpZWxkc1xuICAgIGlmIChyZXF1aXJlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2hlbWEucmVxdWlyZWQgPSByZXF1aXJlZDtcbiAgICB9XG5cbiAgICBpZiAob25lT2YgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLm9uZU9mID0gb25lT2Y7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLmRlc2NyaXB0aW9uID0gdGhpcy5kZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wbGFjZWhvbGRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2hlbWEucGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZvcm1hdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2hlbWEuZm9ybWF0ID0gdGhpcy5mb3JtYXQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMud2lkZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjaGVtYS53aWRnZXQgPSB0aGlzLndpZGdldDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yZWFkT25seSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2hlbWEucmVhZE9ubHkgPSB0aGlzLnJlYWRPbmx5O1xuICAgIH1cblxuICAgIGNvbnN0IGJ1dHRvbnMgPSB0aGlzLmdldEJ1dHRvbnMoKTtcbiAgICBpZiAoYnV0dG9ucy5sZW5ndGggPiAwKSB7XG4gICAgICBzY2hlbWEuYnV0dG9ucyA9IGJ1dHRvbnM7XG4gICAgfVxuXG4gICAgLy8gQElucHV0IHNjaGVtYSB0YWtlcyBwcmVjZWRlbmNlXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oc2NoZW1hLCB0aGlzLnNjaGVtYSk7XG5cbiAgfVxuXG4gIGdldFZhbGlkYXRvcnMoKTogeyBwYXRoOiBzdHJpbmcsIHZhbGlkYXRvcjogVmFsaWRhdG9yIH1bXSB7XG5cbiAgICAvLyByZWdpc3RlcmluZyB2YWxpZGF0b3IgaGVyZSBpcyBub3QgcG9zc2libGUgc2luY2UgcHJvcCBmdWxsIHBhdGggaXMgbmVlZGVkXG4gICAgY29uc3QgY2hpbGRWYWxpZGF0b3JzID0gdGhpcy5nZXRGaWVsZHNWYWxpZGF0b3JzKFxuICAgICAgdGhpcy5jaGlsZEZpZWxkcy5maWx0ZXIoZmllbGQgPT4gZmllbGQgIT09IHRoaXMpXG4gICAgKTtcbiAgICBjb25zdCB2YWxpZGF0b3JzID0gY2hpbGRWYWxpZGF0b3JzLm1hcCgoeyBwYXRoLCB2YWxpZGF0b3IgfSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aDogdGhpcy5wYXRoICsgcGF0aCxcbiAgICAgICAgdmFsaWRhdG9yXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgaWYgKCF0aGlzLnZhbGlkYXRvcikge1xuICAgICAgcmV0dXJuIHZhbGlkYXRvcnM7XG4gICAgfVxuXG4gICAgdmFsaWRhdG9ycy5wdXNoKHsgcGF0aDogdGhpcy5wYXRoLCB2YWxpZGF0b3I6IHRoaXMudmFsaWRhdG9yIH0pO1xuICAgIHJldHVybiB2YWxpZGF0b3JzO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuXG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGNoYW5nZXMpO1xuICAgIGlmIChrZXlzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgICAgaWYgKCFjaGFuZ2VzW2tleV0uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICAgICAgLy8gb24gYW55IGlucHV0IGNoYW5nZSwgZm9yY2Ugc2NoZW1hIGNoYW5nZSBnZW5lcmF0aW9uXG4gICAgICAgICAgdGhpcy50ZW1wbGF0ZVNjaGVtYVNlcnZpY2UuY2hhbmdlZCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuXG4gIHByaXZhdGUgZ2V0T25lT2YoKSB7XG5cbiAgICBpZiAodGhpcy5jaGlsZEl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5jaGlsZEl0ZW1zLm1hcCgoeyB2YWx1ZSwgZGVzY3JpcHRpb24gfSkgPT4ge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4geyBlbnVtOiBbdmFsdWVdLCBkZXNjcmlwdGlvbiB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4geyBlbnVtOiB2YWx1ZSwgZGVzY3JpcHRpb24gfTtcbiAgICB9KTtcblxuICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlbXM7XG4gIH1cblxuXG4gIHByaXZhdGUgc2V0VGl0bGVGcm9tQ29udGVudCgpIHtcbiAgICBjb25zdCB0ZXh0Q29udGVudCA9IHRoaXMuZ2V0VGV4dENvbnRlbnQodGhpcy5lbGVtZW50UmVmKTtcblxuICAgIC8vICB0aXRsZSBhcyBASW5wdXQgdGFrZXMgcHJpb3JpdHkgb3ZlciBjb250ZW50IHRleHRcbiAgICBpZiAodGV4dENvbnRlbnQgJiYgIXRoaXMudGl0bGUpIHtcbiAgICAgIHRoaXMudGl0bGUgPSB0ZXh0Q29udGVudDtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG5cbiAgICAvLyBjYWNoZSBpdFxuICAgIHRoaXMuc2V0VGl0bGVGcm9tQ29udGVudCgpO1xuXG4gICAgbWVyZ2UoXG4gICAgICB0aGlzLmNoaWxkRmllbGRzLmNoYW5nZXMsXG4gICAgICB0aGlzLmNoaWxkSXRlbXMuY2hhbmdlcyxcbiAgICAgIHRoaXMuY2hpbGRCdXR0b25zLmNoYW5nZXNcbiAgICApXG4gICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnRlbXBsYXRlU2NoZW1hU2VydmljZS5jaGFuZ2VkKCkpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgQ29udGVudENoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEhvc3RCaW5kaW5nLFxuICBTaW1wbGVDaGFuZ2UsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi4vZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWN0aW9uUmVnaXN0cnkgfSBmcm9tICcuLi9tb2RlbC9hY3Rpb25yZWdpc3RyeSc7XG5pbXBvcnQgeyBWYWxpZGF0b3JSZWdpc3RyeSB9IGZyb20gJy4uL21vZGVsL3ZhbGlkYXRvcnJlZ2lzdHJ5JztcbmltcG9ydCB7IFRlcm1pbmF0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vdGVybWluYXRvci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgVGVtcGxhdGVTY2hlbWFTZXJ2aWNlIH0gZnJvbSAnLi90ZW1wbGF0ZS1zY2hlbWEuc2VydmljZSc7XG5pbXBvcnQgeyBGaWVsZENvbXBvbmVudCB9IGZyb20gJy4vZmllbGQvZmllbGQuY29tcG9uZW50JztcbmltcG9ydCB7IEZpZWxkVHlwZSwgRmllbGQgfSBmcm9tICcuL2ZpZWxkL2ZpZWxkJztcbmltcG9ydCB7IEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vYnV0dG9uL2J1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmllbGRQYXJlbnQgfSBmcm9tICcuL2ZpZWxkL2ZpZWxkLXBhcmVudCc7XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnc2YtZm9ybVt0ZW1wbGF0ZVNjaGVtYV0nLFxuICBwcm92aWRlcnM6IFtcbiAgICBUZW1wbGF0ZVNjaGVtYVNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZVNjaGVtYURpcmVjdGl2ZSBleHRlbmRzIEZpZWxkUGFyZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihGaWVsZENvbXBvbmVudClcbiAgY2hpbGRGaWVsZHM6IFF1ZXJ5TGlzdDxGaWVsZENvbXBvbmVudD47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihCdXR0b25Db21wb25lbnQpXG4gIGNoaWxkQnV0dG9uczogUXVlcnlMaXN0PEJ1dHRvbkNvbXBvbmVudD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGFjdGlvblJlZ2lzdHJ5OiBBY3Rpb25SZWdpc3RyeSxcbiAgICBwcm90ZWN0ZWQgdmFsaWRhdG9yUmVnaXN0cnk6IFZhbGlkYXRvclJlZ2lzdHJ5LFxuICAgIHByaXZhdGUgZm9ybUNvbXBvbmVudDogRm9ybUNvbXBvbmVudCxcbiAgICBwcml2YXRlIHRlcm1pbmF0b3JTZXJ2aWNlOiBUZXJtaW5hdG9yU2VydmljZSxcbiAgICBwcml2YXRlIHRlbXBsYXRlU2NoZW1hU2VydmljZTogVGVtcGxhdGVTY2hlbWFTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBzZXRGb3JtRG9jdW1lbnRTY2hlbWEoZmllbGRzOiBGaWVsZENvbXBvbmVudFtdKSB7XG4gICAgICB0aGlzLmFjdGlvblJlZ2lzdHJ5LmNsZWFyKCk7XG4gICAgICB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LmNsZWFyKCk7XG5cbiAgICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMuZ2V0RmllbGRzU2NoZW1hKGZpZWxkcyk7XG5cbiAgICAgIGNvbnN0IHZhbGlkYXRvcnMgPSB0aGlzLmdldEZpZWxkc1ZhbGlkYXRvcnMoZmllbGRzKTtcbiAgICAgIHZhbGlkYXRvcnMuZm9yRWFjaCgoeyBwYXRoLCB2YWxpZGF0b3IgfSkgPT4ge1xuICAgICAgICB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LnJlZ2lzdGVyKHBhdGgsIHZhbGlkYXRvcik7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcHJldmlvdXNTY2hlbWEgPSB0aGlzLmZvcm1Db21wb25lbnQuc2NoZW1hO1xuICAgICAgdGhpcy5mb3JtQ29tcG9uZW50LnNjaGVtYSA9IHtcbiAgICAgICAgdHlwZTogRmllbGRUeXBlLk9iamVjdCxcbiAgICAgICAgcHJvcGVydGllczogc2NoZW1hLnByb3BlcnRpZXNcbiAgICAgIH07XG5cbiAgICAgIGlmIChzY2hlbWEucmVxdWlyZWQgJiYgc2NoZW1hLnJlcXVpcmVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5mb3JtQ29tcG9uZW50LnNjaGVtYS5yZXF1cmVkID0gc2NoZW1hLnJlcXVpcmVkO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBidXR0b25zID0gdGhpcy5nZXRCdXR0b25zKCk7XG4gICAgICBpZiAoYnV0dG9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZm9ybUNvbXBvbmVudC5zY2hlbWEuYnV0dG9ucyA9IGJ1dHRvbnM7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZm9ybUNvbXBvbmVudC5uZ09uQ2hhbmdlcyh7XG4gICAgICAgIHNjaGVtYTogbmV3IFNpbXBsZUNoYW5nZShcbiAgICAgICAgICBwcmV2aW91c1NjaGVtYSxcbiAgICAgICAgICB0aGlzLmZvcm1Db21wb25lbnQuc2NoZW1hLFxuICAgICAgICAgIEJvb2xlYW4ocHJldmlvdXNTY2hlbWEpXG4gICAgICAgIClcbiAgICAgIH0pO1xuXG4gIH1cblxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblxuICAgIGlmICh0aGlzLmNoaWxkRmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc2V0Rm9ybURvY3VtZW50U2NoZW1hKHRoaXMuY2hpbGRGaWVsZHMudG9BcnJheSgpKTtcbiAgICB9XG5cbiAgICBtZXJnZShcbiAgICAgIHRoaXMuY2hpbGRGaWVsZHMuY2hhbmdlcyxcbiAgICAgIHRoaXMudGVtcGxhdGVTY2hlbWFTZXJ2aWNlLmNoYW5nZXNcbiAgICApXG4gICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMudGVybWluYXRvclNlcnZpY2UuZGVzdHJveSgpO1xuICAgICAgdGhpcy5zZXRGb3JtRG9jdW1lbnRTY2hlbWEodGhpcy5jaGlsZEZpZWxkcy50b0FycmF5KCkpO1xuICAgIH0pO1xuXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IEZpZWxkQ29tcG9uZW50IH0gZnJvbSAnLi9maWVsZC9maWVsZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGVtcGxhdGVTY2hlbWFEaXJlY3RpdmUgfSBmcm9tICcuL3RlbXBsYXRlLXNjaGVtYS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9idXR0b24vYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9maWVsZC9pdGVtL2l0ZW0uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBUZW1wbGF0ZVNjaGVtYURpcmVjdGl2ZSxcbiAgICBGaWVsZENvbXBvbmVudCxcbiAgICBCdXR0b25Db21wb25lbnQsXG4gICAgSXRlbUNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgVGVtcGxhdGVTY2hlbWFEaXJlY3RpdmUsXG4gICAgRmllbGRDb21wb25lbnQsXG4gICAgQnV0dG9uQ29tcG9uZW50LFxuICAgIEl0ZW1Db21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZVNjaGVtYU1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE1BQWEsY0FBYztJQUEzQjtRQUNFLFlBQU8sR0FBNEIsRUFBRSxDQUFDO0tBYXZDOzs7O0lBWEMsS0FBSztRQUNILElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0tBQ25COzs7Ozs7SUFFRCxRQUFRLENBQUMsUUFBZ0IsRUFBRSxNQUFjO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDO0tBQ2pDOzs7OztJQUVELEdBQUcsQ0FBQyxRQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDL0I7Q0FDRjs7Ozs7O0FDaEJEOzs7QUFPQSxNQUFzQixZQUFZOzs7Ozs7OztJQWVoQyxZQUFZLHNCQUE4QyxFQUN0QyxpQkFBb0MsRUFDckMsTUFBVyxFQUNsQixNQUFxQixFQUNyQixJQUFZO1FBSEosc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNyQyxXQUFNLEdBQU4sTUFBTSxDQUFLO1FBZDlCLFdBQU0sR0FBUSxJQUFJLENBQUM7UUFDbkIsWUFBTyxHQUFRLElBQUksQ0FBQztRQUNaLGtCQUFhLEdBQUcsSUFBSSxlQUFlLENBQU0sSUFBSSxDQUFDLENBQUM7UUFDL0MsbUJBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBTSxJQUFJLENBQUMsQ0FBQztRQUNoRCxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLHVCQUFrQixHQUFHLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxDQUFDO1FB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