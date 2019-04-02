import { __extends, __values, __spread } from 'tslib';
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
var ActionRegistry = /** @class */ (function () {
    function ActionRegistry() {
        this.actions = {};
    }
    /**
     * @return {?}
     */
    ActionRegistry.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.actions = {};
    };
    /**
     * @param {?} actionId
     * @param {?} action
     * @return {?}
     */
    ActionRegistry.prototype.register = /**
     * @param {?} actionId
     * @param {?} action
     * @return {?}
     */
    function (actionId, action) {
        this.actions[actionId] = action;
    };
    /**
     * @param {?} actionId
     * @return {?}
     */
    ActionRegistry.prototype.get = /**
     * @param {?} actionId
     * @return {?}
     */
    function (actionId) {
        return this.actions[actionId];
    };
    return ActionRegistry;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
FormProperty = /** @class */ (function () {
    function FormProperty(schemaValidatorFactory, validatorRegistry, schema, parent, path) {
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
    Object.defineProperty(FormProperty.prototype, "valueChanges", {
        get: /**
         * @return {?}
         */
        function () {
            return this._valueChanges;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormProperty.prototype, "errorsChanges", {
        get: /**
         * @return {?}
         */
        function () {
            return this._errorsChanges;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormProperty.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () {
            return this.schema.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormProperty.prototype, "parent", {
        get: /**
         * @return {?}
         */
        function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormProperty.prototype, "root", {
        get: /**
         * @return {?}
         */
        function () {
            return this._root || (/** @type {?} */ ((/** @type {?} */ (this))));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormProperty.prototype, "path", {
        get: /**
         * @return {?}
         */
        function () {
            return this._path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormProperty.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormProperty.prototype, "visible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._visible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormProperty.prototype, "valid", {
        get: /**
         * @return {?}
         */
        function () {
            return this._errors === null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?=} onlySelf
     * @param {?=} emitEvent
     * @return {?}
     */
    FormProperty.prototype.updateValueAndValidity = /**
     * @param {?=} onlySelf
     * @param {?=} emitEvent
     * @return {?}
     */
    function (onlySelf, emitEvent) {
        if (onlySelf === void 0) { onlySelf = false; }
        if (emitEvent === void 0) { emitEvent = true; }
        this._updateValue();
        if (emitEvent) {
            this.valueChanges.next(this.value);
        }
        this._runValidation();
        if (this.parent && !onlySelf) {
            this.parent.updateValueAndValidity(onlySelf, emitEvent);
        }
    };
    /**
     * @internal
     */
    /**
     * \@internal
     * @return {?}
     */
    FormProperty.prototype._runValidation = /**
     * \@internal
     * @return {?}
     */
    function () {
        /** @type {?} */
        var errors = this.schemaValidator(this._value) || [];
        /** @type {?} */
        var customValidator = this.validatorRegistry.get(this.path);
        if (customValidator) {
            /** @type {?} */
            var customErrors = customValidator(this.value, this, this.findRoot());
            errors = this.mergeErrors(errors, customErrors);
        }
        if (errors.length === 0) {
            errors = null;
        }
        this._errors = errors;
        this.setErrors(this._errors);
    };
    /**
     * @param {?} errors
     * @param {?} newErrors
     * @return {?}
     */
    FormProperty.prototype.mergeErrors = /**
     * @param {?} errors
     * @param {?} newErrors
     * @return {?}
     */
    function (errors, newErrors) {
        if (newErrors) {
            if (Array.isArray(newErrors)) {
                errors = errors.concat.apply(errors, __spread(newErrors));
            }
            else {
                errors.push(newErrors);
            }
        }
        return errors;
    };
    /**
     * @param {?} errors
     * @return {?}
     */
    FormProperty.prototype.setErrors = /**
     * @param {?} errors
     * @return {?}
     */
    function (errors) {
        this._errors = errors;
        this._errorsChanges.next(errors);
    };
    /**
     * @param {?} errors
     * @return {?}
     */
    FormProperty.prototype.extendErrors = /**
     * @param {?} errors
     * @return {?}
     */
    function (errors) {
        errors = this.mergeErrors(this._errors || [], errors);
        this.setErrors(errors);
    };
    /**
     * @param {?} path
     * @return {?}
     */
    FormProperty.prototype.searchProperty = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        /** @type {?} */
        var prop = this;
        /** @type {?} */
        var base = null;
        /** @type {?} */
        var result = null;
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
    };
    /**
     * @return {?}
     */
    FormProperty.prototype.findRoot = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var property = this;
        while (property.parent !== null) {
            property = property.parent;
        }
        return (/** @type {?} */ (property));
    };
    /**
     * @param {?} visible
     * @return {?}
     */
    FormProperty.prototype.setVisible = /**
     * @param {?} visible
     * @return {?}
     */
    function (visible) {
        this._visible = visible;
        this._visibilityChanges.next(visible);
        this.updateValueAndValidity();
        if (this.parent) {
            this.parent.updateValueAndValidity(false, true);
        }
    };
    /**
     * @return {?}
     */
    FormProperty.prototype.__bindVisibility = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var e_1, _a;
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
        var visibleIfProperty = this.schema.visibleIf;
        /** @type {?} */
        var visibleIfOf = (visibleIfProperty || {}).oneOf || (visibleIfProperty || {}).allOf;
        if (visibleIfOf) {
            var _loop_1 = function (visibleIf) {
                if (typeof visibleIf === 'object' && Object.keys(visibleIf).length === 0) {
                    this_1.setVisible(false);
                }
                else if (visibleIf !== undefined) {
                    /** @type {?} */
                    var propertiesBinding = [];
                    var _loop_2 = function (dependencyPath) {
                        var e_2, _a;
                        if (visibleIf.hasOwnProperty(dependencyPath)) {
                            /** @type {?} */
                            var properties = this_1.findProperties(this_1, dependencyPath);
                            if ((properties || []).length) {
                                try {
                                    for (var properties_1 = __values(properties), properties_1_1 = properties_1.next(); !properties_1_1.done; properties_1_1 = properties_1.next()) {
                                        var property = properties_1_1.value;
                                        if (property) {
                                            /** @type {?} */
                                            var valueCheck = void 0;
                                            if (this_1.schema.visibleIf.oneOf) {
                                                valueCheck = property.valueChanges.pipe(map(function (value) {
                                                    if (visibleIf[dependencyPath].indexOf('$ANY$') !== -1) {
                                                        return value.length > 0;
                                                    }
                                                    else {
                                                        return visibleIf[dependencyPath].indexOf(value) !== -1;
                                                    }
                                                }));
                                            }
                                            else if (this_1.schema.visibleIf.allOf) {
                                                /** @type {?} */
                                                var _chk = function (value) {
                                                    var e_3, _a, e_4, _b;
                                                    try {
                                                        for (var _c = __values(_this.schema.visibleIf.allOf), _d = _c.next(); !_d.done; _d = _c.next()) {
                                                            var item = _d.value;
                                                            try {
                                                                for (var _e = __values(Object.keys(item)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                                                    var depPath = _f.value;
                                                                    /** @type {?} */
                                                                    var prop = _this.searchProperty(depPath);
                                                                    /** @type {?} */
                                                                    var propVal = prop._value;
                                                                    /** @type {?} */
                                                                    var valid = false;
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
                                                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                                            finally {
                                                                try {
                                                                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                                                                }
                                                                finally { if (e_4) throw e_4.error; }
                                                            }
                                                        }
                                                    }
                                                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                                    finally {
                                                        try {
                                                            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                                                        }
                                                        finally { if (e_3) throw e_3.error; }
                                                    }
                                                    return true;
                                                };
                                                valueCheck = property.valueChanges.pipe(map(_chk));
                                            }
                                            /** @type {?} */
                                            var visibilityCheck = property._visibilityChanges;
                                            /** @type {?} */
                                            var and = combineLatest([valueCheck, visibilityCheck], function (v1, v2) { return v1 && v2; });
                                            propertiesBinding.push(and);
                                        }
                                    }
                                }
                                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                finally {
                                    try {
                                        if (properties_1_1 && !properties_1_1.done && (_a = properties_1.return)) _a.call(properties_1);
                                    }
                                    finally { if (e_2) throw e_2.error; }
                                }
                            }
                            else {
                                console.warn('Can\'t find property ' + dependencyPath + ' for visibility check of ' + this_1.path);
                                this_1.registerMissingVisibilityBinding(dependencyPath, this_1);
                                // not visible if not existent
                                this_1.setVisible(false);
                            }
                        }
                    };
                    for (var dependencyPath in visibleIf) {
                        _loop_2(dependencyPath);
                    }
                    combineLatest(propertiesBinding, function () {
                        var values = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            values[_i] = arguments[_i];
                        }
                        return values.indexOf(true) !== -1;
                    }).pipe(distinctUntilChanged()).subscribe(function (visible) {
                        _this.setVisible(visible);
                    });
                }
            };
            var this_1 = this;
            try {
                for (var visibleIfOf_1 = __values(visibleIfOf), visibleIfOf_1_1 = visibleIfOf_1.next(); !visibleIfOf_1_1.done; visibleIfOf_1_1 = visibleIfOf_1.next()) {
                    var visibleIf = visibleIfOf_1_1.value;
                    _loop_1(visibleIf);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (visibleIfOf_1_1 && !visibleIfOf_1_1.done && (_a = visibleIfOf_1.return)) _a.call(visibleIfOf_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return true;
        }
    };
    // A field is visible if AT LEAST ONE of the properties it depends on is visible AND has a value in the list
    // A field is visible if AT LEAST ONE of the properties it depends on is visible AND has a value in the list
    /**
     * @return {?}
     */
    FormProperty.prototype._bindVisibility = 
    // A field is visible if AT LEAST ONE of the properties it depends on is visible AND has a value in the list
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.__bindVisibility())
            return;
        /** @type {?} */
        var visibleIf = this.schema.visibleIf;
        if (typeof visibleIf === 'object' && Object.keys(visibleIf).length === 0) {
            this.setVisible(false);
        }
        else if (visibleIf !== undefined) {
            /** @type {?} */
            var propertiesBinding = [];
            var _loop_3 = function (dependencyPath) {
                var e_5, _a;
                if (visibleIf.hasOwnProperty(dependencyPath)) {
                    /** @type {?} */
                    var properties = this_2.findProperties(this_2, dependencyPath);
                    if ((properties || []).length) {
                        try {
                            for (var properties_2 = __values(properties), properties_2_1 = properties_2.next(); !properties_2_1.done; properties_2_1 = properties_2.next()) {
                                var property = properties_2_1.value;
                                if (property) {
                                    /** @type {?} */
                                    var valueCheck = property.valueChanges.pipe(map(function (value) {
                                        if (visibleIf[dependencyPath].indexOf('$ANY$') !== -1) {
                                            return value.length > 0;
                                        }
                                        else {
                                            return visibleIf[dependencyPath].indexOf(value) !== -1;
                                        }
                                    }));
                                    /** @type {?} */
                                    var visibilityCheck = property._visibilityChanges;
                                    /** @type {?} */
                                    var and = combineLatest([valueCheck, visibilityCheck], function (v1, v2) { return v1 && v2; });
                                    propertiesBinding.push(and);
                                }
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (properties_2_1 && !properties_2_1.done && (_a = properties_2.return)) _a.call(properties_2);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                    }
                    else {
                        console.warn('Can\'t find property ' + dependencyPath + ' for visibility check of ' + this_2.path);
                        this_2.registerMissingVisibilityBinding(dependencyPath, this_2);
                        // not visible if not existent
                        this_2.setVisible(false);
                    }
                }
            };
            var this_2 = this;
            for (var dependencyPath in visibleIf) {
                _loop_3(dependencyPath);
            }
            combineLatest(propertiesBinding, function () {
                var values = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    values[_i] = arguments[_i];
                }
                return values.indexOf(true) !== -1;
            }).pipe(distinctUntilChanged()).subscribe(function (visible) {
                _this.setVisible(visible);
            });
        }
    };
    /**
     * @param {?} dependencyPath
     * @param {?} formProperty
     * @return {?}
     */
    FormProperty.prototype.registerMissingVisibilityBinding = /**
     * @param {?} dependencyPath
     * @param {?} formProperty
     * @return {?}
     */
    function (dependencyPath, formProperty) {
        formProperty._propertyBindingRegistry.getPropertyBindingsVisibility().add(dependencyPath, formProperty.path);
    };
    /**
     * Finds all <code>formProperties</code> from a path with wildcards.<br/>
     * e.g: <code>/garage/cars/&#42;/tires/&#42;/name</code><br/>
     * @param target
     * @param propertyPath
     */
    /**
     * Finds all <code>formProperties</code> from a path with wildcards.<br/>
     * e.g: <code>/garage/cars/&#42;/tires/&#42;/name</code><br/>
     * @param {?} target
     * @param {?} propertyPath
     * @return {?}
     */
    FormProperty.prototype.findProperties = /**
     * Finds all <code>formProperties</code> from a path with wildcards.<br/>
     * e.g: <code>/garage/cars/&#42;/tires/&#42;/name</code><br/>
     * @param {?} target
     * @param {?} propertyPath
     * @return {?}
     */
    function (target, propertyPath) {
        var e_6, _a;
        /** @type {?} */
        var props = [];
        /** @type {?} */
        var paths = this.findPropertyPaths(target, propertyPath);
        try {
            for (var paths_1 = __values(paths), paths_1_1 = paths_1.next(); !paths_1_1.done; paths_1_1 = paths_1.next()) {
                var path = paths_1_1.value;
                /** @type {?} */
                var p = target.searchProperty(path);
                if (p) {
                    props.push(p);
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return)) _a.call(paths_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return props;
    };
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
    FormProperty.prototype.findPropertyPaths = /**
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
    function (target, path, parentPath) {
        /** @type {?} */
        var ix = path.indexOf('*');
        if (-1 !== ix) {
            /** @type {?} */
            var prePath = ix > -1 ? path.substring(0, ix - 1) : path;
            /** @type {?} */
            var subPath = ix > -1 ? path.substring(ix + 1) : path;
            /** @type {?} */
            var prop = target.searchProperty(prePath);
            /** @type {?} */
            var pathFound = [];
            if (prop instanceof PropertyGroup) {
                /** @type {?} */
                var arrProp = (/** @type {?} */ (prop.properties));
                for (var i = 0; i < arrProp.length; i++) {
                    /** @type {?} */
                    var curreItemPath = (parentPath || '') + prePath + (prePath.endsWith('/') ? '' : '/') + i + subPath;
                    /** @type {?} */
                    var curreItemPrePath = (parentPath || '') + prePath + i;
                    if (-1 === curreItemPath.indexOf('*')) {
                        pathFound.push(curreItemPath);
                    }
                    /** @type {?} */
                    var childrenPathFound = this.findPropertyPaths(arrProp[i], subPath, curreItemPrePath);
                    pathFound = pathFound.concat(childrenPathFound);
                }
            }
            return pathFound;
        }
        return [path];
    };
    return FormProperty;
}());
/**
 * @abstract
 */
var /**
 * @abstract
 */
PropertyGroup = /** @class */ (function (_super) {
    __extends(PropertyGroup, _super);
    function PropertyGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._properties = null;
        _this._propertyProxyHandler = {
            /**
             * When a new item is added it will be checked for visibility updates to proceed <br/>
             * if any other field has a binding reference to it.<br/>
             */
            set: /**
             * When a new item is added it will be checked for visibility updates to proceed <br/>
             * if any other field has a binding reference to it.<br/>
             * @param {?} target
             * @param {?} p
             * @param {?} value
             * @param {?} receiver
             * @return {?}
             */
            function (target, p, value, receiver) {
                /**
                 * 1) Make sure a canonical path is set
                 * @type {?}
                 */
                var assertCanonicalPath = function (propertyValue) {
                    var e_7, _a;
                    /** @type {?} */
                    var formProperty = (/** @type {?} */ (propertyValue));
                    if (Array.isArray(target) && propertyValue instanceof FormProperty) {
                        /**
                         * Create a canonical path replacing the last '*' with the elements position in array
                         * \@param propertyPath
                         * \@param indexOfChild
                         * @type {?}
                         */
                        var getCanonicalPath = function (propertyPath, indexOfChild) {
                            /** @type {?} */
                            var pos;
                            if (propertyPath && -1 !== (pos = propertyPath.lastIndexOf('*'))) {
                                return propertyPath.substring(0, pos) + indexOfChild.toString() + propertyPath.substring(pos + 1);
                            }
                        };
                        if (formProperty) {
                            formProperty._canonicalPath = getCanonicalPath(formProperty._canonicalPath, (/** @type {?} */ (p)));
                        }
                    }
                    /** @type {?} */
                    var propertyGroup = (/** @type {?} */ (formProperty));
                    /** @type {?} */
                    var propertyGroupChildren = (/** @type {?} */ ((Array.isArray(propertyGroup.properties) ?
                        propertyGroup.properties :
                        Object.values(propertyGroup.properties || {}))));
                    if ((formProperty.path || '').endsWith('/*')) {
                        try {
                            /**
                             * If it is an array, then all children canonical paths must be computed now.
                             * The children don't have the parent's path segment set yet,
                             * because they are created before the parent gets attached to its parent.
                             */
                            for (var propertyGroupChildren_1 = __values(propertyGroupChildren), propertyGroupChildren_1_1 = propertyGroupChildren_1.next(); !propertyGroupChildren_1_1.done; propertyGroupChildren_1_1 = propertyGroupChildren_1.next()) {
                                var child = propertyGroupChildren_1_1.value;
                                child._canonicalPath = formProperty._canonicalPath + child._canonicalPath.substring(formProperty.path.length);
                            }
                        }
                        catch (e_7_1) { e_7 = { error: e_7_1 }; }
                        finally {
                            try {
                                if (propertyGroupChildren_1_1 && !propertyGroupChildren_1_1.done && (_a = propertyGroupChildren_1.return)) _a.call(propertyGroupChildren_1);
                            }
                            finally { if (e_7) throw e_7.error; }
                        }
                    }
                    return { property: formProperty, children: propertyGroupChildren };
                };
                var _a = assertCanonicalPath(value), property = _a.property, children = _a.children;
                /**
                 * 2) Add the new property before rebinding, so it can be found by <code>_bindVisibility</code>
                 * @type {?}
                 */
                var result = target[(/** @type {?} */ (p))] = value;
                /**
                 * 3) Re-bind the visibility bindings referencing to this canonical paths
                 * @type {?}
                 */
                var rebindVisibility = function () {
                    var e_8, _a, e_9, _b;
                    /** @type {?} */
                    var rebindAll = [property].concat(children);
                    /** @type {?} */
                    var findPropertiesToRebind = function (formProperty) {
                        var e_10, _a;
                        /** @type {?} */
                        var propertyBindings = formProperty._propertyBindingRegistry.getPropertyBindingsVisibility();
                        /** @type {?} */
                        var rebind = [];
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
                        var uniqueValues = {};
                        try {
                            for (var rebind_1 = __values(rebind), rebind_1_1 = rebind_1.next(); !rebind_1_1.done; rebind_1_1 = rebind_1.next()) {
                                var item = rebind_1_1.value;
                                uniqueValues[item] = item;
                            }
                        }
                        catch (e_10_1) { e_10 = { error: e_10_1 }; }
                        finally {
                            try {
                                if (rebind_1_1 && !rebind_1_1.done && (_a = rebind_1.return)) _a.call(rebind_1);
                            }
                            finally { if (e_10) throw e_10.error; }
                        }
                        return Object.keys(uniqueValues);
                    };
                    try {
                        for (var rebindAll_1 = __values(rebindAll), rebindAll_1_1 = rebindAll_1.next(); !rebindAll_1_1.done; rebindAll_1_1 = rebindAll_1.next()) {
                            var _property = rebindAll_1_1.value;
                            if (_property instanceof FormProperty) {
                                try {
                                    /** @type {?} */
                                    var rebindPaths = findPropertiesToRebind(_property);
                                    try {
                                        for (var rebindPaths_1 = __values(rebindPaths), rebindPaths_1_1 = rebindPaths_1.next(); !rebindPaths_1_1.done; rebindPaths_1_1 = rebindPaths_1.next()) {
                                            var rebindPropPath = rebindPaths_1_1.value;
                                            /** @type {?} */
                                            var rebindProp = _property.searchProperty(rebindPropPath);
                                            rebindProp._bindVisibility();
                                        }
                                    }
                                    catch (e_9_1) { e_9 = { error: e_9_1 }; }
                                    finally {
                                        try {
                                            if (rebindPaths_1_1 && !rebindPaths_1_1.done && (_b = rebindPaths_1.return)) _b.call(rebindPaths_1);
                                        }
                                        finally { if (e_9) throw e_9.error; }
                                    }
                                }
                                catch (e) {
                                    console.error('Rebinding visibility error at path:', _property.path, 'property:', _property, e);
                                }
                            }
                        }
                    }
                    catch (e_8_1) { e_8 = { error: e_8_1 }; }
                    finally {
                        try {
                            if (rebindAll_1_1 && !rebindAll_1_1.done && (_a = rebindAll_1.return)) _a.call(rebindAll_1);
                        }
                        finally { if (e_8) throw e_8.error; }
                    }
                };
                rebindVisibility();
                return result;
            },
            get: /**
             * @param {?} target
             * @param {?} p
             * @param {?} receiver
             * @return {?}
             */
            function (target, p, receiver) {
                return target[(/** @type {?} */ (p))];
            },
            deleteProperty: /**
             * @param {?} target
             * @param {?} p
             * @return {?}
             */
            function (target, p) {
                return delete target[(/** @type {?} */ (p))];
            }
        };
        return _this;
    }
    Object.defineProperty(PropertyGroup.prototype, "properties", {
        get: /**
         * @return {?}
         */
        function () {
            return this._properties;
        },
        set: /**
         * @param {?} properties
         * @return {?}
         */
        function (properties) {
            /**
             * Override the setter to add an observer that notices when an item is added or removed.<br/>
             */
            this._properties = new Proxy(properties, this._propertyProxyHandler);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} path
     * @return {?}
     */
    PropertyGroup.prototype.getProperty = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        /** @type {?} */
        var subPathIdx = path.indexOf('/');
        /** @type {?} */
        var propertyId = subPathIdx !== -1 ? path.substr(0, subPathIdx) : path;
        /** @type {?} */
        var property = this.properties[propertyId];
        if (property !== null && subPathIdx !== -1 && property instanceof PropertyGroup) {
            /** @type {?} */
            var subPath = path.substr(subPathIdx + 1);
            property = ((/** @type {?} */ (property))).getProperty(subPath);
        }
        return property;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    PropertyGroup.prototype.forEachChild = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        for (var propertyId in this.properties) {
            if (this.properties.hasOwnProperty(propertyId)) {
                /** @type {?} */
                var property = this.properties[propertyId];
                fn(property, propertyId);
            }
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    PropertyGroup.prototype.forEachChildRecursive = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.forEachChild(function (child) {
            fn(child);
            if (child instanceof PropertyGroup) {
                ((/** @type {?} */ (child))).forEachChildRecursive(fn);
            }
        });
    };
    /**
     * @return {?}
     */
    PropertyGroup.prototype._bindVisibility = /**
     * @return {?}
     */
    function () {
        _super.prototype._bindVisibility.call(this);
        this._bindVisibilityRecursive();
    };
    /**
     * @return {?}
     */
    PropertyGroup.prototype._bindVisibilityRecursive = /**
     * @return {?}
     */
    function () {
        this.forEachChildRecursive(function (property) {
            property._bindVisibility();
        });
    };
    /**
     * @return {?}
     */
    PropertyGroup.prototype.isRoot = /**
     * @return {?}
     */
    function () {
        return this === this.root;
    };
    return PropertyGroup;
}(FormProperty));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var /**
 * @abstract
 */
AtomicProperty = /** @class */ (function (_super) {
    __extends(AtomicProperty, _super);
    function AtomicProperty() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} value
     * @param {?=} onlySelf
     * @return {?}
     */
    AtomicProperty.prototype.setValue = /**
     * @param {?} value
     * @param {?=} onlySelf
     * @return {?}
     */
    function (value, onlySelf) {
        if (onlySelf === void 0) { onlySelf = false; }
        this._value = value;
        this.updateValueAndValidity(onlySelf, true);
    };
    /**
     * @param {?=} value
     * @param {?=} onlySelf
     * @return {?}
     */
    AtomicProperty.prototype.reset = /**
     * @param {?=} value
     * @param {?=} onlySelf
     * @return {?}
     */
    function (value, onlySelf) {
        if (value === void 0) { value = null; }
        if (onlySelf === void 0) { onlySelf = true; }
        this.resetValue(value);
        this.updateValueAndValidity(onlySelf, true);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AtomicProperty.prototype.resetValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value === null) {
            if (this.schema.default !== undefined) {
                value = this.schema.default;
            }
            else {
                value = this.fallbackValue();
            }
        }
        this._value = value;
    };
    /**
     * @return {?}
     */
    AtomicProperty.prototype._hasValue = /**
     * @return {?}
     */
    function () {
        return this.fallbackValue() !== this.value;
    };
    /**
     * @return {?}
     */
    AtomicProperty.prototype._updateValue = /**
     * @return {?}
     */
    function () {
    };
    return AtomicProperty;
}(FormProperty));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NumberProperty = /** @class */ (function (_super) {
    __extends(NumberProperty, _super);
    function NumberProperty() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    NumberProperty.prototype.fallbackValue = /**
     * @return {?}
     */
    function () {
        return null;
    };
    /**
     * @param {?} value
     * @param {?=} onlySelf
     * @return {?}
     */
    NumberProperty.prototype.setValue = /**
     * @param {?} value
     * @param {?=} onlySelf
     * @return {?}
     */
    function (value, onlySelf) {
        if (onlySelf === void 0) { onlySelf = false; }
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
    };
    return NumberProperty;
}(AtomicProperty));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var StringProperty = /** @class */ (function (_super) {
    __extends(StringProperty, _super);
    function StringProperty() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    StringProperty.prototype.fallbackValue = /**
     * @return {?}
     */
    function () {
        return '';
    };
    return StringProperty;
}(AtomicProperty));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var BooleanProperty = /** @class */ (function (_super) {
    __extends(BooleanProperty, _super);
    function BooleanProperty() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    BooleanProperty.prototype.fallbackValue = /**
     * @return {?}
     */
    function () {
        return null;
    };
    return BooleanProperty;
}(AtomicProperty));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var ObjectProperty = /** @class */ (function (_super) {
    __extends(ObjectProperty, _super);
    function ObjectProperty(formPropertyFactory, schemaValidatorFactory, validatorRegistry, schema, parent, path) {
        var _this = _super.call(this, schemaValidatorFactory, validatorRegistry, schema, parent, path) || this;
        _this.formPropertyFactory = formPropertyFactory;
        _this.propertiesId = [];
        _this.createProperties();
        return _this;
    }
    /**
     * @param {?} value
     * @param {?} onlySelf
     * @return {?}
     */
    ObjectProperty.prototype.setValue = /**
     * @param {?} value
     * @param {?} onlySelf
     * @return {?}
     */
    function (value, onlySelf) {
        for (var propertyId in value) {
            if (value.hasOwnProperty(propertyId)) {
                this.properties[propertyId].setValue(value[propertyId], true);
            }
        }
        this.updateValueAndValidity(onlySelf, true);
    };
    /**
     * @param {?} value
     * @param {?=} onlySelf
     * @return {?}
     */
    ObjectProperty.prototype.reset = /**
     * @param {?} value
     * @param {?=} onlySelf
     * @return {?}
     */
    function (value, onlySelf) {
        if (onlySelf === void 0) { onlySelf = true; }
        value = value || this.schema.default || {};
        this.resetProperties(value);
        this.updateValueAndValidity(onlySelf, true);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ObjectProperty.prototype.resetProperties = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        for (var propertyId in this.schema.properties) {
            if (this.schema.properties.hasOwnProperty(propertyId)) {
                this.properties[propertyId].reset(value[propertyId], true);
            }
        }
    };
    /**
     * @return {?}
     */
    ObjectProperty.prototype.createProperties = /**
     * @return {?}
     */
    function () {
        this.properties = {};
        this.propertiesId = [];
        for (var propertyId in this.schema.properties) {
            if (this.schema.properties.hasOwnProperty(propertyId)) {
                /** @type {?} */
                var propertySchema = this.schema.properties[propertyId];
                this.properties[propertyId] = this.formPropertyFactory.createProperty(propertySchema, this, propertyId);
                this.propertiesId.push(propertyId);
            }
        }
    };
    /**
     * @return {?}
     */
    ObjectProperty.prototype._hasValue = /**
     * @return {?}
     */
    function () {
        return !!Object.keys(this.value).length;
    };
    /**
     * @return {?}
     */
    ObjectProperty.prototype._updateValue = /**
     * @return {?}
     */
    function () {
        this.reduceValue();
    };
    /**
     * @return {?}
     */
    ObjectProperty.prototype._runValidation = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype._runValidation.call(this);
        if (this._errors) {
            this._errors.forEach(function (error) {
                /** @type {?} */
                var prop = _this.searchProperty(error.path.slice(1));
                if (prop) {
                    prop.extendErrors(error);
                }
            });
        }
    };
    /**
     * @return {?}
     */
    ObjectProperty.prototype.reduceValue = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var value = {};
        this.forEachChild(function (property, propertyId) {
            if (property.visible && property._hasValue()) {
                value[propertyId] = property.value;
            }
        });
        this._value = value;
    };
    return ObjectProperty;
}(PropertyGroup));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var ArrayProperty = /** @class */ (function (_super) {
    __extends(ArrayProperty, _super);
    function ArrayProperty(formPropertyFactory, schemaValidatorFactory, validatorRegistry, schema, parent, path) {
        var _this = _super.call(this, schemaValidatorFactory, validatorRegistry, schema, parent, path) || this;
        _this.formPropertyFactory = formPropertyFactory;
        return _this;
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    ArrayProperty.prototype.addItem = /**
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        if (value === void 0) { value = null; }
        /** @type {?} */
        var newProperty = this.addProperty();
        newProperty.reset(value, false);
        return newProperty;
    };
    /**
     * @return {?}
     */
    ArrayProperty.prototype.addProperty = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var newProperty = this.formPropertyFactory.createProperty(this.schema.items, this);
        ((/** @type {?} */ (this.properties))).push(newProperty);
        return newProperty;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ArrayProperty.prototype.removeItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.properties = ((/** @type {?} */ (this.properties))).filter(function (i) { return i !== item; });
        this.updateValueAndValidity(false, true);
    };
    /**
     * @param {?} value
     * @param {?} onlySelf
     * @return {?}
     */
    ArrayProperty.prototype.setValue = /**
     * @param {?} value
     * @param {?} onlySelf
     * @return {?}
     */
    function (value, onlySelf) {
        this.createProperties();
        this.resetProperties(value);
        this.updateValueAndValidity(onlySelf, true);
    };
    /**
     * @return {?}
     */
    ArrayProperty.prototype._hasValue = /**
     * @return {?}
     */
    function () {
        return true;
    };
    /**
     * @return {?}
     */
    ArrayProperty.prototype._updateValue = /**
     * @return {?}
     */
    function () {
        this.reduceValue();
    };
    /**
     * @return {?}
     */
    ArrayProperty.prototype.reduceValue = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var value = [];
        this.forEachChild(function (property, _) {
            if (property.visible && property._hasValue()) {
                value.push(property.value);
            }
        });
        this._value = value;
    };
    /**
     * @param {?} value
     * @param {?=} onlySelf
     * @return {?}
     */
    ArrayProperty.prototype.reset = /**
     * @param {?} value
     * @param {?=} onlySelf
     * @return {?}
     */
    function (value, onlySelf) {
        if (onlySelf === void 0) { onlySelf = true; }
        value = value || this.schema.default || [];
        this.properties = [];
        this.resetProperties(value);
        this.updateValueAndValidity(onlySelf, true);
    };
    /**
     * @return {?}
     */
    ArrayProperty.prototype.createProperties = /**
     * @return {?}
     */
    function () {
        this.properties = [];
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ArrayProperty.prototype.resetProperties = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        for (var idx in value) {
            if (value.hasOwnProperty(idx)) {
                /** @type {?} */
                var property = this.addProperty();
                property.reset(value[idx], true);
            }
        }
    };
    return ArrayProperty;
}(PropertyGroup));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var FormPropertyFactory = /** @class */ (function () {
    function FormPropertyFactory(schemaValidatorFactory, validatorRegistry, propertyBindingRegistry) {
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
    FormPropertyFactory.prototype.createProperty = /**
     * @param {?} schema
     * @param {?=} parent
     * @param {?=} propertyId
     * @return {?}
     */
    function (schema, parent, propertyId) {
        if (parent === void 0) { parent = null; }
        /** @type {?} */
        var newProperty = null;
        /** @type {?} */
        var path = '';
        /** @type {?} */
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
            /** @type {?} */
            var refSchema = this.schemaValidatorFactory.getSchema(parent.root.schema, schema.$ref);
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
                    throw new TypeError("Undefined type " + schema.type);
            }
        }
        newProperty._propertyBindingRegistry = this.propertyBindingRegistry;
        newProperty._canonicalPath = _canonicalPath;
        if (newProperty instanceof PropertyGroup) {
            this.initializeRoot(newProperty);
        }
        return newProperty;
    };
    /**
     * @param {?} rootProperty
     * @return {?}
     */
    FormPropertyFactory.prototype.initializeRoot = /**
     * @param {?} rootProperty
     * @return {?}
     */
    function (rootProperty) {
        rootProperty.reset(null, true);
        rootProperty._bindVisibility();
    };
    return FormPropertyFactory;
}());

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
            for (var _d = __values(jsonSchema.fieldsets), _e = _d.next(); !_e.done; _e = _d.next()) {
                var fieldset = _e.value;
                try {
                    for (var _f = __values(fieldset.fields), _g = _f.next(); !_g.done; _g = _f.next()) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var ValidatorRegistry = /** @class */ (function () {
    function ValidatorRegistry() {
        this.validators = [];
    }
    /**
     * @param {?} path
     * @param {?} validator
     * @return {?}
     */
    ValidatorRegistry.prototype.register = /**
     * @param {?} path
     * @param {?} validator
     * @return {?}
     */
    function (path, validator) {
        this.validators[path] = validator;
    };
    /**
     * @param {?} path
     * @return {?}
     */
    ValidatorRegistry.prototype.get = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        return this.validators[path];
    };
    /**
     * @return {?}
     */
    ValidatorRegistry.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.validators = [];
    };
    return ValidatorRegistry;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var BindingRegistry = /** @class */ (function () {
    function BindingRegistry() {
        this.bindings = [];
    }
    /**
     * @return {?}
     */
    BindingRegistry.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.bindings = [];
    };
    /**
     * @param {?} path
     * @param {?} binding
     * @return {?}
     */
    BindingRegistry.prototype.register = /**
     * @param {?} path
     * @param {?} binding
     * @return {?}
     */
    function (path, binding) {
        this.bindings[path] = [].concat(binding);
    };
    /**
     * @param {?} path
     * @return {?}
     */
    BindingRegistry.prototype.get = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        return this.bindings[path];
    };
    return BindingRegistry;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
SchemaValidatorFactory = /** @class */ (function () {
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
    SchemaValidatorFactory.prototype.reset = /**
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
    function () {
    };
    return SchemaValidatorFactory;
}());
var ZSchemaValidatorFactory = /** @class */ (function (_super) {
    __extends(ZSchemaValidatorFactory, _super);
    function ZSchemaValidatorFactory() {
        var _this = _super.call(this) || this;
        _this.createSchemaValidator();
        return _this;
    }
    /**
     * @return {?}
     */
    ZSchemaValidatorFactory.prototype.createSchemaValidator = /**
     * @return {?}
     */
    function () {
        this.zschema = new ZSchema({
            breakOnFirstError: false
        });
    };
    /**
     * @return {?}
     */
    ZSchemaValidatorFactory.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.createSchemaValidator();
    };
    /**
     * @param {?} schema
     * @return {?}
     */
    ZSchemaValidatorFactory.prototype.createValidatorFn = /**
     * @param {?} schema
     * @return {?}
     */
    function (schema) {
        var _this = this;
        return function (value) {
            if (schema.type === 'number' || schema.type === 'integer') {
                value = +value;
            }
            _this.zschema.validate(value, schema);
            /** @type {?} */
            var err = _this.zschema.getLastErrors();
            _this.denormalizeRequiredPropertyPaths(err);
            return err || null;
        };
    };
    /**
     * @param {?} schema
     * @param {?} ref
     * @return {?}
     */
    ZSchemaValidatorFactory.prototype.getSchema = /**
     * @param {?} schema
     * @param {?} ref
     * @return {?}
     */
    function (schema, ref) {
        // check definitions are valid
        /** @type {?} */
        var isValid = this.zschema.compileSchema(schema);
        if (isValid) {
            return this.getDefinition(schema, ref);
        }
        else {
            throw this.zschema.getLastError();
        }
    };
    /**
     * @param {?} err
     * @return {?}
     */
    ZSchemaValidatorFactory.prototype.denormalizeRequiredPropertyPaths = /**
     * @param {?} err
     * @return {?}
     */
    function (err) {
        if (err && err.length) {
            err = err.map(function (error) {
                if (error.path === '#/' && error.code === 'OBJECT_MISSING_REQUIRED_PROPERTY') {
                    error.path = "" + error.path + error.params[0];
                }
                return error;
            });
        }
    };
    /**
     * @param {?} schema
     * @param {?} ref
     * @return {?}
     */
    ZSchemaValidatorFactory.prototype.getDefinition = /**
     * @param {?} schema
     * @param {?} ref
     * @return {?}
     */
    function (schema, ref) {
        /** @type {?} */
        var foundSchema = schema;
        ref.split('/').slice(1).forEach(function (ptr) {
            if (ptr) {
                foundSchema = foundSchema[ptr];
            }
        });
        return foundSchema;
    };
    return ZSchemaValidatorFactory;
}(SchemaValidatorFactory));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var WidgetRegistry = /** @class */ (function () {
    function WidgetRegistry() {
        this.widgets = {};
    }
    /**
     * @param {?} widget
     * @return {?}
     */
    WidgetRegistry.prototype.setDefaultWidget = /**
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        this.defaultWidget = widget;
    };
    /**
     * @return {?}
     */
    WidgetRegistry.prototype.getDefaultWidget = /**
     * @return {?}
     */
    function () {
        return this.defaultWidget;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    WidgetRegistry.prototype.hasWidget = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return this.widgets.hasOwnProperty(type);
    };
    /**
     * @param {?} type
     * @param {?} widget
     * @return {?}
     */
    WidgetRegistry.prototype.register = /**
     * @param {?} type
     * @param {?} widget
     * @return {?}
     */
    function (type, widget) {
        this.widgets[type] = widget;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    WidgetRegistry.prototype.getWidgetType = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        if (this.hasWidget(type)) {
            return this.widgets[type];
        }
        return this.defaultWidget;
    };
    return WidgetRegistry;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var WidgetFactory = /** @class */ (function () {
    function WidgetFactory(registry, resolver) {
        this.registry = registry;
        this.resolver = resolver;
    }
    /**
     * @param {?} container
     * @param {?} type
     * @return {?}
     */
    WidgetFactory.prototype.createWidget = /**
     * @param {?} container
     * @param {?} type
     * @return {?}
     */
    function (container, type) {
        /** @type {?} */
        var componentClass = this.registry.getWidgetType(type);
        /** @type {?} */
        var componentFactory = this.resolver.resolveComponentFactory(componentClass);
        return container.createComponent(componentFactory);
    };
    WidgetFactory.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    WidgetFactory.ctorParameters = function () { return [
        { type: WidgetRegistry },
        { type: ComponentFactoryResolver }
    ]; };
    return WidgetFactory;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var TerminatorService = /** @class */ (function () {
    function TerminatorService() {
        this.onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    TerminatorService.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.onDestroy.next(true);
    };
    TerminatorService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    TerminatorService.ctorParameters = function () { return []; };
    return TerminatorService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * General purpose propery binding registry
 */
var  /**
 * General purpose propery binding registry
 */
PropertyBindingRegistry = /** @class */ (function () {
    function PropertyBindingRegistry() {
        this.bindings = {};
    }
    /**
     * @param {?} type
     * @return {?}
     */
    PropertyBindingRegistry.prototype.getPropertyBindings = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        this.bindings[type] = this.bindings[type] || new PropertyBindings();
        return this.bindings[type];
    };
    /**
     * @return {?}
     */
    PropertyBindingRegistry.prototype.getPropertyBindingsVisibility = /**
     * @return {?}
     */
    function () {
        return this.getPropertyBindings(PropertyBindingTypes.visibility);
    };
    return PropertyBindingRegistry;
}());
/** @enum {number} */
var PropertyBindingTypes = {
    visibility: 0,
};
PropertyBindingTypes[PropertyBindingTypes.visibility] = 'visibility';
/**
 * Storage that holds all bindings that are property paths related.<br/>
 */
var /**
 * Storage that holds all bindings that are property paths related.<br/>
 */
PropertyBindings = /** @class */ (function () {
    function PropertyBindings() {
        this.sourcesIndex = new SimplePropertyIndexer();
        this.dependenciesIndex = new SimplePropertyIndexer();
    }
    /**
     * @param {?} dependencyPath
     * @param {?} sourcePropertyPath
     * @return {?}
     */
    PropertyBindings.prototype.add = /**
     * @param {?} dependencyPath
     * @param {?} sourcePropertyPath
     * @return {?}
     */
    function (dependencyPath, sourcePropertyPath) {
        this.sourcesIndex.store(sourcePropertyPath, dependencyPath);
        this.dependenciesIndex.store(dependencyPath, sourcePropertyPath);
    };
    /**
     * @param {?} dependencyPath
     * @return {?}
     */
    PropertyBindings.prototype.findByDependencyPath = /**
     * @param {?} dependencyPath
     * @return {?}
     */
    function (dependencyPath) {
        var e_1, _a;
        /** @type {?} */
        var result = this.dependenciesIndex.find(dependencyPath);
        result.results = result.results || [];
        /** @type {?} */
        var values = [];
        try {
            for (var _b = __values(result.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                var res = _c.value;
                values = values.concat(Object.keys(res.value));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result.found ? values : [];
    };
    /**
     * @param {?} sourcePropertyPath
     * @return {?}
     */
    PropertyBindings.prototype.getBySourcePropertyPath = /**
     * @param {?} sourcePropertyPath
     * @return {?}
     */
    function (sourcePropertyPath) {
        var e_2, _a;
        /** @type {?} */
        var result = this.sourcesIndex.find(sourcePropertyPath);
        result.results = result.results || [];
        /** @type {?} */
        var values = [];
        try {
            for (var _b = __values(result.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                var res = _c.value;
                values = values.concat(Object.keys(res.value));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result.found ? values : [];
    };
    /**
     * @param {?} path
     * @return {?}
     */
    PropertyBindings.prototype.createPathIndex = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        return path.split('/');
    };
    return PropertyBindings;
}());
/**
 * Simple indexer to store property paths
 */
var SimplePropertyIndexer = /** @class */ (function () {
    function SimplePropertyIndexer() {
        this.index = {};
        this.findOnlyWithValue = true;
    }
    /**
     * @param {?} path
     * @return {?}
     */
    SimplePropertyIndexer.prototype._createPathIndex = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        return path
            .replace(new RegExp('//', 'g'), '/')
            .replace(new RegExp('^/', 'g'), '')
            .split('/').filter(function (item) { return item; });
    };
    /**
     * @param {?} propertyPath
     * @param {?=} value
     * @return {?}
     */
    SimplePropertyIndexer.prototype.store = /**
     * @param {?} propertyPath
     * @param {?=} value
     * @return {?}
     */
    function (propertyPath, value) {
        this._storeIndex(this._createPathIndex(propertyPath), value);
    };
    /**
     * @param {?} pathIndex
     * @param {?=} value
     * @return {?}
     */
    SimplePropertyIndexer.prototype._storeIndex = /**
     * @param {?} pathIndex
     * @param {?=} value
     * @return {?}
     */
    function (pathIndex, value) {
        var e_3, _a;
        /** @type {?} */
        var indexPos = this.index;
        try {
            for (var pathIndex_1 = __values(pathIndex), pathIndex_1_1 = pathIndex_1.next(); !pathIndex_1_1.done; pathIndex_1_1 = pathIndex_1.next()) {
                var key = pathIndex_1_1.value;
                indexPos[key] = indexPos[key] || {};
                indexPos = indexPos[key];
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (pathIndex_1_1 && !pathIndex_1_1.done && (_a = pathIndex_1.return)) _a.call(pathIndex_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (indexPos && value) {
            indexPos[SimplePropertyIndexer.MARKER] = indexPos[SimplePropertyIndexer.MARKER] || {};
            indexPos[SimplePropertyIndexer.MARKER][value] = value;
        }
    };
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
    SimplePropertyIndexer.prototype.find = /**
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
    function (path) {
        return this._findInIndex(this._createPathIndex(path));
    };
    /**
     * @param {?} path
     * @return {?}
     */
    SimplePropertyIndexer.prototype._findInIndex = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        /** @type {?} */
        var ixRes = { target: path, found: false, results: [] };
        this.__findIndex(ixRes, path, this.index, []);
        return ixRes;
    };
    /**
     * @param {?} indexerResults
     * @param {?} path
     * @param {?} index
     * @param {?=} parent
     * @return {?}
     */
    SimplePropertyIndexer.prototype.__findIndex = /**
     * @param {?} indexerResults
     * @param {?} path
     * @param {?} index
     * @param {?=} parent
     * @return {?}
     */
    function (indexerResults, path, index, parent) {
        var e_4, _a;
        /** @type {?} */
        var p = parent || [];
        /** @type {?} */
        var segment = path[0];
        /** @type {?} */
        var wild = ('*' === segment) ? Object.keys(index) : [];
        /** @type {?} */
        var _keys = ((/** @type {?} */ ((Array.isArray(segment) ? segment : [segment])))).concat(wild);
        /** @type {?} */
        var keys = _keys.filter(function (item, pos) { return '*' !== item && _keys.indexOf(item) === pos; });
        if (index['*']) {
            keys.push('*');
        }
        /** @type {?} */
        var paths = [];
        try {
            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                /** @type {?} */
                var restPath = path.slice(1);
                /** @type {?} */
                var restIndex = index[key];
                /** @type {?} */
                var restParent = p.concat(key);
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
                var restPaths = this.__findIndex(indexerResults, restPath, restIndex, restParent);
                paths = paths.concat(restPaths);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return paths;
    };
    SimplePropertyIndexer.MARKER = '$____value';
    return SimplePropertyIndexer;
}());

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
var FormComponent = /** @class */ (function () {
    function FormComponent(formPropertyFactory, actionRegistry, validatorRegistry, bindingRegistry, cdr, terminator) {
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
    FormComponent.prototype.writeValue = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        if (this.rootProperty) {
            this.rootProperty.reset(obj, false);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    FormComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
        if (this.rootProperty) {
            this.rootProperty.valueChanges.subscribe(this.onValueChanges.bind(this));
        }
    };
    // TODO implement
    // TODO implement
    /**
     * @param {?} fn
     * @return {?}
     */
    FormComponent.prototype.registerOnTouched = 
    // TODO implement
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
    };
    // TODO implement
    // setDisabledState(isDisabled: boolean)?: void
    // TODO implement
    // setDisabledState(isDisabled: boolean)?: void
    /**
     * @param {?} changes
     * @return {?}
     */
    FormComponent.prototype.ngOnChanges = 
    // TODO implement
    // setDisabledState(isDisabled: boolean)?: void
    /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
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
            this.rootProperty.errorsChanges.subscribe(function (value) {
                _this.onErrorChange.emit({ value: value });
                _this.isValid.emit(!(value && value.length));
            });
        }
        if (this.schema && (changes.model || changes.schema)) {
            this.rootProperty.reset(this.model, false);
            this.cdr.detectChanges();
        }
    };
    /**
     * @return {?}
     */
    FormComponent.prototype.setValidators = /**
     * @return {?}
     */
    function () {
        this.validatorRegistry.clear();
        if (this.validators) {
            for (var validatorId in this.validators) {
                if (this.validators.hasOwnProperty(validatorId)) {
                    this.validatorRegistry.register(validatorId, this.validators[validatorId]);
                }
            }
        }
    };
    /**
     * @return {?}
     */
    FormComponent.prototype.setActions = /**
     * @return {?}
     */
    function () {
        this.actionRegistry.clear();
        if (this.actions) {
            for (var actionId in this.actions) {
                if (this.actions.hasOwnProperty(actionId)) {
                    this.actionRegistry.register(actionId, this.actions[actionId]);
                }
            }
        }
    };
    /**
     * @return {?}
     */
    FormComponent.prototype.setBindings = /**
     * @return {?}
     */
    function () {
        this.bindingRegistry.clear();
        if (this.bindings) {
            for (var bindingPath in this.bindings) {
                if (this.bindings.hasOwnProperty(bindingPath)) {
                    this.bindingRegistry.register(bindingPath, this.bindings[bindingPath]);
                }
            }
        }
    };
    /**
     * @return {?}
     */
    FormComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.rootProperty.reset(null, true);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FormComponent.prototype.setModel = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.model) {
            Object.assign(this.model, value);
        }
        else {
            this.model = value;
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FormComponent.prototype.onValueChanges = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
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
    };
    FormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sf-form',
                    template: "\n    <form>\n      <sf-form-element\n        *ngIf=\"rootProperty\" [formProperty]=\"rootProperty\"></sf-form-element>\n    </form>",
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
    FormComponent.ctorParameters = function () { return [
        { type: FormPropertyFactory },
        { type: ActionRegistry },
        { type: ValidatorRegistry },
        { type: BindingRegistry },
        { type: ChangeDetectorRef },
        { type: TerminatorService }
    ]; };
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
    return FormComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var FormElementComponent = /** @class */ (function () {
    function FormElementComponent(actionRegistry, bindingRegistry, renderer, elementRef) {
        this.actionRegistry = actionRegistry;
        this.bindingRegistry = bindingRegistry;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.control = new FormControl('', function () { return null; });
        this.widget = null;
        this.buttons = [];
        this.unlisten = [];
    }
    /**
     * @return {?}
     */
    FormElementComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.parseButtons();
        this.setupBindings();
    };
    /**
     * @return {?}
     */
    FormElementComponent.prototype.setupBindings = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var bindings = this.bindingRegistry.get(this.formProperty.path);
        if ((bindings || []).length) {
            bindings.forEach(function (binding) {
                for (var eventId in binding) {
                    _this.createBinding(eventId, binding[eventId]);
                }
            });
        }
    };
    /**
     * @param {?} eventId
     * @param {?} listener
     * @return {?}
     */
    FormElementComponent.prototype.createBinding = /**
     * @param {?} eventId
     * @param {?} listener
     * @return {?}
     */
    function (eventId, listener) {
        var _this = this;
        this.unlisten.push(this.renderer.listen(this.elementRef.nativeElement, eventId, function (event) {
            if (listener instanceof Function) {
                listener(event, _this.formProperty);
            }
            else {
                console.warn('Calling non function handler for eventId ' + eventId + ' for path ' + _this.formProperty.path);
            }
        }));
    };
    /**
     * @return {?}
     */
    FormElementComponent.prototype.parseButtons = /**
     * @return {?}
     */
    function () {
        var e_1, _a;
        if (this.formProperty.schema.buttons !== undefined) {
            this.buttons = this.formProperty.schema.buttons;
            try {
                for (var _b = __values(this.buttons), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var button = _c.value;
                    this.createButtonCallback(button);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    /**
     * @param {?} button
     * @return {?}
     */
    FormElementComponent.prototype.createButtonCallback = /**
     * @param {?} button
     * @return {?}
     */
    function (button) {
        var _this = this;
        button.action = function (e) {
            /** @type {?} */
            var action;
            if (button.id && (action = _this.actionRegistry.get(button.id))) {
                if (action) {
                    action(_this.formProperty, button.parameters);
                }
            }
            e.preventDefault();
        };
    };
    /**
     * @param {?} widget
     * @return {?}
     */
    FormElementComponent.prototype.onWidgetInstanciated = /**
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        this.widget = widget;
        /** @type {?} */
        var id = 'field' + (FormElementComponent.counter++);
        this.widget.formProperty = this.formProperty;
        this.widget.schema = this.formProperty.schema;
        this.widget.name = id;
        this.widget.id = id;
        this.widget.control = this.control;
    };
    /**
     * @return {?}
     */
    FormElementComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.unlisten) {
            this.unlisten.forEach(function (item) {
                item();
            });
        }
    };
    FormElementComponent.counter = 0;
    FormElementComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sf-form-element',
                    template: "\n    <div *ngIf=\"formProperty.visible\"\n         [class.has-error]=\"!control.valid\"\n         [class.has-success]=\"control.valid\">\n      <sf-widget-chooser\n        (widgetInstanciated)=\"onWidgetInstanciated($event)\"\n        [widgetInfo]=\"formProperty.schema.widget\">\n      </sf-widget-chooser>\n      <sf-form-element-action *ngFor=\"let button of buttons\" [button]=\"button\" [formProperty]=\"formProperty\"></sf-form-element-action>\n    </div>"
                }] }
    ];
    /** @nocollapse */
    FormElementComponent.ctorParameters = function () { return [
        { type: ActionRegistry },
        { type: BindingRegistry },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    FormElementComponent.propDecorators = {
        formProperty: [{ type: Input }]
    };
    return FormElementComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var FormElementComponentAction = /** @class */ (function () {
    function FormElementComponentAction(widgetFactory, terminator) {
        if (widgetFactory === void 0) { widgetFactory = null; }
        this.widgetFactory = widgetFactory;
        this.terminator = terminator;
    }
    /**
     * @return {?}
     */
    FormElementComponentAction.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subs = this.terminator.onDestroy.subscribe(function (destroy) {
            if (destroy) {
                _this.ref.destroy();
            }
        });
    };
    /**
     * @return {?}
     */
    FormElementComponentAction.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.ref = this.widgetFactory.createWidget(this.container, this.button.widget || 'button');
        this.ref.instance.button = this.button;
        this.ref.instance.formProperty = this.formProperty;
    };
    /**
     * @return {?}
     */
    FormElementComponentAction.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subs.unsubscribe();
    };
    FormElementComponentAction.decorators = [
        { type: Component, args: [{
                    selector: 'sf-form-element-action',
                    template: '<ng-template #target></ng-template>'
                }] }
    ];
    /** @nocollapse */
    FormElementComponentAction.ctorParameters = function () { return [
        { type: WidgetFactory },
        { type: TerminatorService }
    ]; };
    FormElementComponentAction.propDecorators = {
        button: [{ type: Input }],
        formProperty: [{ type: Input }],
        container: [{ type: ViewChild, args: ['target', { read: ViewContainerRef },] }]
    };
    return FormElementComponentAction;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var WidgetChooserComponent = /** @class */ (function () {
    function WidgetChooserComponent(widgetFactory, cdr, terminator) {
        if (widgetFactory === void 0) { widgetFactory = null; }
        this.widgetFactory = widgetFactory;
        this.cdr = cdr;
        this.terminator = terminator;
        this.widgetInstanciated = new EventEmitter();
    }
    /**
     * @return {?}
     */
    WidgetChooserComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subs = this.terminator.onDestroy.subscribe(function (destroy) {
            if (destroy) {
                _this.ref.destroy();
            }
        });
    };
    /**
     * @return {?}
     */
    WidgetChooserComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.ref = this.widgetFactory.createWidget(this.container, this.widgetInfo.id);
        this.widgetInstanciated.emit(this.ref.instance);
        this.widgetInstance = this.ref.instance;
        this.cdr.detectChanges();
    };
    /**
     * @return {?}
     */
    WidgetChooserComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subs.unsubscribe();
    };
    WidgetChooserComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sf-widget-chooser',
                    template: "<div #target></div>"
                }] }
    ];
    /** @nocollapse */
    WidgetChooserComponent.ctorParameters = function () { return [
        { type: WidgetFactory },
        { type: ChangeDetectorRef },
        { type: TerminatorService }
    ]; };
    WidgetChooserComponent.propDecorators = {
        widgetInfo: [{ type: Input }],
        widgetInstanciated: [{ type: Output }],
        container: [{ type: ViewChild, args: ['target', { read: ViewContainerRef },] }]
    };
    return WidgetChooserComponent;
}());

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
var  /**
 * @abstract
 * @template T
 */
Widget = /** @class */ (function () {
    function Widget() {
        this.id = '';
        this.name = '';
        this.schema = {};
    }
    return Widget;
}());
var ControlWidget = /** @class */ (function (_super) {
    __extends(ControlWidget, _super);
    function ControlWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    ControlWidget.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var control = this.control;
        this.formProperty.valueChanges.subscribe(function (newValue) {
            if (control.value !== newValue) {
                control.setValue(newValue, { emitEvent: false });
            }
        });
        this.formProperty.errorsChanges.subscribe(function (errors) {
            control.setErrors(errors, { emitEvent: true });
            /** @type {?} */
            var messages = (errors || [])
                .filter(function (e) {
                return e.path && e.path.slice(1) === _this.formProperty.path;
            })
                .map(function (e) { return e.message; });
            _this.errorMessages = messages.filter(function (m, i) { return messages.indexOf(m) === i; });
        });
        control.valueChanges.subscribe(function (newValue) {
            _this.formProperty.setValue(newValue, false);
        });
    };
    return ControlWidget;
}(Widget));
var ArrayLayoutWidget = /** @class */ (function (_super) {
    __extends(ArrayLayoutWidget, _super);
    function ArrayLayoutWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    ArrayLayoutWidget.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var control = this.control;
        this.formProperty.errorsChanges.subscribe(function (errors) {
            control.setErrors(errors, { emitEvent: true });
        });
    };
    return ArrayLayoutWidget;
}(Widget));
var ObjectLayoutWidget = /** @class */ (function (_super) {
    __extends(ObjectLayoutWidget, _super);
    function ObjectLayoutWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    ObjectLayoutWidget.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var control = this.control;
        this.formProperty.errorsChanges.subscribe(function (errors) {
            control.setErrors(errors, { emitEvent: true });
        });
    };
    return ObjectLayoutWidget;
}(Widget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var ArrayWidget = /** @class */ (function (_super) {
    __extends(ArrayWidget, _super);
    function ArrayWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    ArrayWidget.prototype.addItem = /**
     * @return {?}
     */
    function () {
        this.formProperty.addItem();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ArrayWidget.prototype.removeItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.formProperty.removeItem(item);
    };
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    ArrayWidget.prototype.trackByIndex = /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    function (index, item) {
        return index;
    };
    ArrayWidget.decorators = [
        { type: Component, args: [{
                    selector: 'sf-array-widget',
                    template: "<div class=\"widget form-group\">\n\t<label [attr.for]=\"id\" class=\"horizontal control-label\">\n\t\t{{ schema.title }}\n\t</label>\n\t<span *ngIf=\"schema.description\" class=\"formHelp\">{{schema.description}}</span>\n\t<div *ngFor=\"let itemProperty of formProperty.properties\">\n\t\t<sf-form-element [formProperty]=\"itemProperty\"></sf-form-element>\n\t\t<button (click)=\"removeItem(itemProperty)\" class=\"btn btn-default array-remove-button\">\n\t\t\t<span class=\"glyphicon glyphicon-minus\" aria-hidden=\"true\"></span> Remove\n\t\t</button>\n\t</div>\n\t<button (click)=\"addItem()\" class=\"btn btn-default array-add-button\">\n\t\t<span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span> Add\n\t</button>\n</div>"
                }] }
    ];
    return ArrayWidget;
}(ArrayLayoutWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var ButtonWidget = /** @class */ (function () {
    function ButtonWidget() {
    }
    ButtonWidget.decorators = [
        { type: Component, args: [{
                    selector: 'sf-button-widget',
                    template: '<button (click)="button.action($event)">{{button.label}}</button>'
                }] }
    ];
    return ButtonWidget;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var ObjectWidget = /** @class */ (function (_super) {
    __extends(ObjectWidget, _super);
    function ObjectWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObjectWidget.decorators = [
        { type: Component, args: [{
                    selector: 'sf-form-object',
                    template: "<fieldset *ngFor=\"let fieldset of formProperty.schema.fieldsets\">\n\t<legend *ngIf=\"fieldset.title\">{{fieldset.title}}</legend>\n\t<div *ngIf=\"fieldset.description\">{{fieldset.description}}</div>\n\t<div *ngFor=\"let fieldId of fieldset.fields\">\n\t\t<sf-form-element [formProperty]=\"formProperty.getProperty(fieldId)\"></sf-form-element>\n\t</div>\n</fieldset>"
                }] }
    ];
    return ObjectWidget;
}(ObjectLayoutWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var CheckboxWidget = /** @class */ (function (_super) {
    __extends(CheckboxWidget, _super);
    function CheckboxWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.checked = {};
        return _this;
    }
    /**
     * @return {?}
     */
    CheckboxWidget.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var control = this.control;
        this.formProperty.valueChanges.subscribe(function (newValue) {
            if (control.value !== newValue) {
                control.setValue(newValue, { emitEvent: false });
                if (newValue && Array.isArray(newValue)) {
                    newValue.map(function (v) { return _this.checked[v] = true; });
                }
            }
        });
        this.formProperty.errorsChanges.subscribe(function (errors) {
            control.setErrors(errors, { emitEvent: true });
        });
        control.valueChanges.subscribe(function (newValue) {
            _this.formProperty.setValue(newValue, false);
        });
    };
    /**
     * @param {?} el
     * @return {?}
     */
    CheckboxWidget.prototype.onCheck = /**
     * @param {?} el
     * @return {?}
     */
    function (el) {
        if (el.checked) {
            this.checked[el.value] = true;
        }
        else {
            delete this.checked[el.value];
        }
        this.formProperty.setValue(Object.keys(this.checked), false);
    };
    CheckboxWidget.decorators = [
        { type: Component, args: [{
                    selector: 'sf-checkbox-widget',
                    template: "<div class=\"widget form-group\">\n    <label [attr.for]=\"id\" class=\"horizontal control-label\">\n        {{ schema.title }}\n    </label>\n\t<div *ngIf=\"schema.type!='array'\" class=\"checkbox\">\n\t\t<label class=\"horizontal control-label\">\n\t\t\t<input [formControl]=\"control\" [attr.name]=\"name\" [indeterminate]=\"control.value !== false && control.value !== true ? true :null\" type=\"checkbox\" [disabled]=\"schema.readOnly\">\n\t\t\t<input *ngIf=\"schema.readOnly\" [attr.name]=\"name\" type=\"hidden\" [formControl]=\"control\">\n\t\t\t{{schema.description}}\n\t\t</label>\n\t</div>\n\t<ng-container *ngIf=\"schema.type==='array'\">\n\t\t<div *ngFor=\"let option of schema.items.oneOf\" class=\"checkbox\">\n\t\t\t<label class=\"horizontal control-label\">\n\t\t\t\t<input [attr.name]=\"name\"\n\t\t\t\t\tvalue=\"{{option.enum[0]}}\" type=\"checkbox\" \n\t\t\t\t\t[attr.disabled]=\"schema.readOnly\"\n\t\t\t\t\t(change)=\"onCheck($event.target)\"\n\t\t\t\t\t[attr.checked]=\"checked[option.enum[0]] ? true : null\">\n\t\t\t\t{{option.description}}\n\t\t\t</label>\n\t\t</div>\n\t</ng-container>\n</div>"
                }] }
    ];
    return CheckboxWidget;
}(ControlWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var FileWidget = /** @class */ (function (_super) {
    __extends(FileWidget, _super);
    function FileWidget() {
        var _this = _super.call(this) || this;
        _this.reader = new FileReader();
        _this.filedata = {};
        return _this;
    }
    /**
     * @return {?}
     */
    FileWidget.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // OVERRIDE ControlWidget ngAfterViewInit() as ReactiveForms do not handle
        // file inputs
        /** @type {?} */
        var control = this.control;
        this.formProperty.errorsChanges.subscribe(function (errors) {
            control.setErrors(errors, { emitEvent: true });
        });
        this.reader.onloadend = function () {
            _this.filedata.data = window.btoa(((/** @type {?} */ (_this.reader.result))));
            _this.formProperty.setValue(_this.filedata, false);
        };
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    FileWidget.prototype.onFileChange = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var file = $event.target.files[0];
        this.filedata.filename = file.name;
        this.filedata.size = file.size;
        this.filedata['content-type'] = file.type;
        this.filedata.encoding = 'base64';
        this.reader.readAsBinaryString(file);
    };
    FileWidget.decorators = [
        { type: Component, args: [{
                    selector: 'sf-file-widget',
                    template: "<div class=\"widget form-group\">\n\t<label [attr.for]=\"id\" class=\"horizontal control-label\">\n\t\t{{ schema.title }}\n\t</label>\n    <span *ngIf=\"schema.description\" class=\"formHelp\">{{schema.description}}</span>\n  <input [name]=\"name\" class=\"text-widget file-widget\" [attr.id]=\"id\"\n    [formControl]=\"control\" type=\"file\" [attr.disabled]=\"schema.readOnly?true:null\"\n    (change)=\"onFileChange($event)\">\n\t<input *ngIf=\"schema.readOnly\" [attr.name]=\"name\" type=\"hidden\" [formControl]=\"control\">\n</div>"
                }] }
    ];
    /** @nocollapse */
    FileWidget.ctorParameters = function () { return []; };
    return FileWidget;
}(ControlWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var IntegerWidget = /** @class */ (function (_super) {
    __extends(IntegerWidget, _super);
    function IntegerWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IntegerWidget.decorators = [
        { type: Component, args: [{
                    selector: 'sf-integer-widget',
                    template: "<div class=\"widget form-group\">\n\t<label [attr.for]=\"id\" class=\"horizontal control-label\">\n\t\t{{ schema.title }}\n\t</label>\n  <span *ngIf=\"schema.description\" class=\"formHelp\">{{schema.description}}</span>\n\t<input [attr.readonly]=\"schema.readOnly?true:null\" [name]=\"name\"\n\tclass=\"text-widget integer-widget form-control\" [formControl]=\"control\"\n\t[attr.type]=\"'number'\" [attr.min]=\"schema.minimum\" [attr.max]=\"schema.maximum\"\n\t[attr.placeholder]=\"schema.placeholder\"\n\t[attr.maxLength]=\"schema.maxLength || null\"\n  [attr.minLength]=\"schema.minLength || null\">\n</div>"
                }] }
    ];
    return IntegerWidget;
}(ControlWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var TextAreaWidget = /** @class */ (function (_super) {
    __extends(TextAreaWidget, _super);
    function TextAreaWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextAreaWidget.decorators = [
        { type: Component, args: [{
                    selector: 'sf-textarea-widget',
                    template: "<div class=\"widget form-group\">\n\t<label [attr.for]=\"id\" class=\"horizontal control-label\">\n\t\t{{ schema.title }}\n\t</label>\n    <span *ngIf=\"schema.description\" class=\"formHelp\">{{schema.description}}</span>\n\t<textarea [readonly]=\"schema.readOnly\" [name]=\"name\"\n\t\tclass=\"text-widget textarea-widget form-control\"\n\t\t[attr.placeholder]=\"schema.placeholder\"\n\t\t[attr.maxLength]=\"schema.maxLength || null\"\n    [attr.minLength]=\"schema.minLength || null\"\n\t\t[formControl]=\"control\"></textarea>\n</div>"
                }] }
    ];
    return TextAreaWidget;
}(ControlWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var RadioWidget = /** @class */ (function (_super) {
    __extends(RadioWidget, _super);
    function RadioWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadioWidget.decorators = [
        { type: Component, args: [{
                    selector: 'sf-radio-widget',
                    template: "<div class=\"widget form-group\">\n\t<label>{{schema.title}}</label>\n    <span *ngIf=\"schema.description\" class=\"formHelp\">{{schema.description}}</span>\n\t<div *ngFor=\"let option of schema.oneOf\" class=\"radio\">\n\t\t<label class=\"horizontal control-label\">\n\t\t\t<input [formControl]=\"control\" [attr.name]=\"name\" value=\"{{option.enum[0]}}\" type=\"radio\"  [disabled]=\"schema.readOnly\">\n\t\t\t{{option.description}}\n\t\t</label>\n\t</div>\n\t<input *ngIf=\"schema.readOnly\" [attr.name]=\"name\" type=\"hidden\" [formControl]=\"control\">\n</div>"
                }] }
    ];
    return RadioWidget;
}(ControlWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var RangeWidget = /** @class */ (function (_super) {
    __extends(RangeWidget, _super);
    function RangeWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeWidget.decorators = [
        { type: Component, args: [{
                    selector: 'sf-range-widget',
                    template: "<div class=\"widget form-group\">\n\t<label [attr.for]=\"id\" class=\"horizontal control-label\">\n\t\t{{ schema.title }}\n\t</label>\n    <span *ngIf=\"schema.description\" class=\"formHelp\">{{schema.description}}</span>\t\n\t<input [name]=\"name\" class=\"text-widget range-widget\" [attr.id]=\"id\"\n\t[formControl]=\"control\" [attr.type]=\"'range'\" [attr.min]=\"schema.minimum\" [attr.max]=\"schema.maximum\" [disabled]=\"schema.readOnly?true:null\" >\n\t<input *ngIf=\"schema.readOnly\" [attr.name]=\"name\" type=\"hidden\">\n</div>"
                }] }
    ];
    return RangeWidget;
}(ControlWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var SelectWidget = /** @class */ (function (_super) {
    __extends(SelectWidget, _super);
    function SelectWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectWidget.decorators = [
        { type: Component, args: [{
                    selector: 'sf-select-widget',
                    template: "<div class=\"widget form-group\">\n\t<label [attr.for]=\"id\" class=\"horizontal control-label\">\n\t\t{{ schema.title }}\n\t</label>\n\n\t<span *ngIf=\"schema.description\" class=\"formHelp\">\n\t\t{{schema.description}}\n\t</span>\n\n\t<select *ngIf=\"schema.type!='array'\" [formControl]=\"control\" [attr.name]=\"name\" [disabled]=\"schema.readOnly\" class=\"form-control\">\n\t\t<option *ngFor=\"let option of schema.oneOf\" [ngValue]=\"option.enum[0]\" >{{option.description}}</option>\n\t</select>\n\n\t<select *ngIf=\"schema.type==='array'\" multiple [formControl]=\"control\" [attr.name]=\"name\" [disabled]=\"schema.readOnly\" class=\"form-control\">\n\t\t<option *ngFor=\"let option of schema.items.oneOf\" [ngValue]=\"option.enum[0]\" >{{option.description}}</option>\n\t</select>\n\n\t<input *ngIf=\"schema.readOnly\" [attr.name]=\"name\" type=\"hidden\" [formControl]=\"control\">\n</div>"
                }] }
    ];
    return SelectWidget;
}(ControlWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var StringWidget = /** @class */ (function (_super) {
    __extends(StringWidget, _super);
    function StringWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    StringWidget.prototype.getInputType = /**
     * @return {?}
     */
    function () {
        if (!this.schema.widget.id || this.schema.widget.id === 'string') {
            return 'text';
        }
        else {
            return this.schema.widget.id;
        }
    };
    StringWidget.decorators = [
        { type: Component, args: [{
                    selector: 'sf-string-widget',
                    template: "<input *ngIf=\"this.schema.widget.id ==='hidden'; else notHiddenFieldBlock\"\n  [attr.name]=\"name\" type=\"hidden\" [formControl]=\"control\">\n<ng-template #notHiddenFieldBlock>\n<div class=\"widget form-group\">\n    <label [attr.for]=\"id\" class=\"horizontal control-label\">\n    \t{{ schema.title }}\n    </label>\n    <span *ngIf=\"schema.description\" class=\"formHelp\">{{schema.description}}</span>\n    <input [name]=\"name\" [attr.readonly]=\"(schema.widget.id!=='color') && schema.readOnly?true:null\"\n    class=\"text-widget.id textline-widget form-control\"\n    [attr.type]=\"!this.schema.widget.id || this.schema.widget.id === 'string' ? 'text' : this.schema.widget.id\"\n    [attr.id]=\"id\"  [formControl]=\"control\" [attr.placeholder]=\"schema.placeholder\"\n    [attr.maxLength]=\"schema.maxLength || null\"\n    [attr.minLength]=\"schema.minLength || null\"\n    [attr.required]=\"schema.isRequired || null\"\n    [attr.disabled]=\"(schema.widget.id=='color' && schema.readOnly)?true:null\">\n    <input *ngIf=\"(schema.widget.id==='color' && schema.readOnly)\" [attr.name]=\"name\" type=\"hidden\" [formControl]=\"control\">\n</div>\n</ng-template>"
                }] }
    ];
    return StringWidget;
}(ControlWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var DefaultWidgetRegistry = /** @class */ (function (_super) {
    __extends(DefaultWidgetRegistry, _super);
    function DefaultWidgetRegistry() {
        var _this = _super.call(this) || this;
        _this.register('array', ArrayWidget);
        _this.register('object', ObjectWidget);
        _this.register('string', StringWidget);
        _this.register('search', StringWidget);
        _this.register('tel', StringWidget);
        _this.register('url', StringWidget);
        _this.register('email', StringWidget);
        _this.register('password', StringWidget);
        _this.register('color', StringWidget);
        _this.register('date', StringWidget);
        _this.register('date-time', StringWidget);
        _this.register('time', StringWidget);
        _this.register('integer', IntegerWidget);
        _this.register('number', IntegerWidget);
        _this.register('range', RangeWidget);
        _this.register('textarea', TextAreaWidget);
        _this.register('file', FileWidget);
        _this.register('select', SelectWidget);
        _this.register('radio', RadioWidget);
        _this.register('boolean', CheckboxWidget);
        _this.register('checkbox', CheckboxWidget);
        _this.register('button', ButtonWidget);
        _this.setDefaultWidget(StringWidget);
        return _this;
    }
    return DefaultWidgetRegistry;
}(WidgetRegistry));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var DefaultWidget = /** @class */ (function () {
    function DefaultWidget() {
    }
    DefaultWidget.decorators = [
        { type: Component, args: [{
                    selector: 'sf-default-field',
                    template: "<p>Unknow type</p>"
                }] }
    ];
    return DefaultWidget;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
var moduleProviders = [
    {
        provide: WidgetRegistry,
        useClass: DefaultWidgetRegistry
    },
    {
        provide: SchemaValidatorFactory,
        useClass: ZSchemaValidatorFactory
    }
];
var SchemaFormModule = /** @class */ (function () {
    function SchemaFormModule() {
    }
    /**
     * @return {?}
     */
    SchemaFormModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: SchemaFormModule,
            providers: __spread(moduleProviders)
        };
    };
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
    return SchemaFormModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var TemplateSchemaService = /** @class */ (function () {
    function TemplateSchemaService() {
        this.changes = new EventEmitter();
    }
    /**
     * @return {?}
     */
    TemplateSchemaService.prototype.changed = /**
     * @return {?}
     */
    function () {
        this.changes.emit();
    };
    return TemplateSchemaService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var TemplateSchemaElement = /** @class */ (function () {
    function TemplateSchemaElement() {
    }
    /**
     * @param {?} elementRef
     * @return {?}
     */
    TemplateSchemaElement.prototype.getTextContent = /**
     * @param {?} elementRef
     * @return {?}
     */
    function (elementRef) {
        /** @type {?} */
        var nodes = Array.from(elementRef.nativeElement.childNodes);
        /** @type {?} */
        var node = (/** @type {?} */ (nodes.filter(function (el) {
            return el.nodeType === el.TEXT_NODE;
        }).pop()));
        if (!node || !node.nodeValue) {
            return '';
        }
        return node.nodeValue.trim();
    };
    return TemplateSchemaElement;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var ButtonComponent = /** @class */ (function (_super) {
    __extends(ButtonComponent, _super);
    function ButtonComponent(elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.label = '';
        _this.click = new EventEmitter();
        return _this;
    }
    /**
     * @return {?}
     */
    ButtonComponent.prototype.setLabelFromContent = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var textContent = this.getTextContent(this.elementRef);
        // label as @Input takes priority over content text
        if (textContent && !this.label) {
            this.label = textContent;
        }
    };
    /**
     * @return {?}
     */
    ButtonComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.setLabelFromContent();
    };
    ButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sf-button',
                    template: "<ng-content></ng-content>\n",
                    providers: [
                        {
                            provide: TemplateSchemaElement,
                            useExisting: forwardRef(function () { return ButtonComponent; }),
                        }
                    ]
                }] }
    ];
    /** @nocollapse */
    ButtonComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ButtonComponent.propDecorators = {
        id: [{ type: Input }],
        label: [{ type: Input }],
        widget: [{ type: Input }],
        click: [{ type: Output }]
    };
    return ButtonComponent;
}(TemplateSchemaElement));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @enum {string} */
var FieldType = {
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
var  /**
 * @abstract
 */
FieldParent = /** @class */ (function (_super) {
    __extends(FieldParent, _super);
    function FieldParent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = '';
        return _this;
    }
    Object.defineProperty(FieldParent.prototype, "path", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.name) {
                return '';
            }
            return '/' + this.name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FieldParent.prototype.getButtons = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.childButtons.map(function (button, index) {
            if (!button.id) {
                /** @type {?} */
                var randomString = Math.random().toString(16).substr(2, 8);
                // generate id for button
                button.id = _this.name + randomString + '_' + (index + 1);
            }
            // register as button action the EventEmitter click
            _this.actionRegistry.register(button.id, button.click.emit.bind(button.click));
            /** @type {?} */
            var _button = (/** @type {?} */ ({
                id: button.id,
                label: button.label,
            }));
            if (button.widget) {
                _button.widget = button.widget;
            }
            return _button;
        });
    };
    /**
     * @param {?} fields
     * @return {?}
     */
    FieldParent.prototype.getFieldsValidators = /**
     * @param {?} fields
     * @return {?}
     */
    function (fields) {
        return fields.reduce(function (validators, field) {
            return validators.concat(field.getValidators());
        }, []);
    };
    /**
     * @param {?} fields
     * @return {?}
     */
    FieldParent.prototype.getFieldsSchema = /**
     * @param {?} fields
     * @return {?}
     */
    function (fields) {
        var _this = this;
        return fields.reduce(function (schema, field) {
            switch (_this.type) {
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
            var buttons = field.getButtons();
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
    };
    return FieldParent;
}(TemplateSchemaElement));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var ItemComponent = /** @class */ (function (_super) {
    __extends(ItemComponent, _super);
    function ItemComponent(elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /**
     * @return {?}
     */
    ItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.description = this.getTextContent(this.elementRef);
    };
    ItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sf-item',
                    template: "<ng-content></ng-content>\n"
                }] }
    ];
    /** @nocollapse */
    ItemComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ItemComponent.propDecorators = {
        value: [{ type: Input }]
    };
    return ItemComponent;
}(TemplateSchemaElement));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var FieldComponent = /** @class */ (function (_super) {
    __extends(FieldComponent, _super);
    function FieldComponent(elementRef, templateSchemaService, actionRegistry) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.templateSchemaService = templateSchemaService;
        _this.actionRegistry = actionRegistry;
        _this.type = FieldType.String;
        _this.schema = {};
        return _this;
    }
    /**
     * @return {?}
     */
    FieldComponent.prototype.getSchema = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var _a = this.getFieldsSchema(this.childFields.filter(function (field) { return field !== _this; })), properties = _a.properties, items = _a.items, required = _a.required;
        /** @type {?} */
        var oneOf = this.getOneOf();
        /** @type {?} */
        var schema = (/** @type {?} */ ({
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
        var buttons = this.getButtons();
        if (buttons.length > 0) {
            schema.buttons = buttons;
        }
        // @Input schema takes precedence
        return Object.assign(schema, this.schema);
    };
    /**
     * @return {?}
     */
    FieldComponent.prototype.getValidators = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // registering validator here is not possible since prop full path is needed
        /** @type {?} */
        var childValidators = this.getFieldsValidators(this.childFields.filter(function (field) { return field !== _this; }));
        /** @type {?} */
        var validators = childValidators.map(function (_a) {
            var path = _a.path, validator = _a.validator;
            return {
                path: _this.path + path,
                validator: validator
            };
        });
        if (!this.validator) {
            return validators;
        }
        validators.push({ path: this.path, validator: this.validator });
        return validators;
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    FieldComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var e_1, _a;
        /** @type {?} */
        var keys = Object.keys(changes);
        if (keys.length > 0) {
            try {
                for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                    var key = keys_1_1.value;
                    if (!changes[key].isFirstChange()) {
                        // on any input change, force schema change generation
                        this.templateSchemaService.changed();
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    /**
     * @return {?}
     */
    FieldComponent.prototype.getOneOf = /**
     * @return {?}
     */
    function () {
        if (this.childItems.length === 0) {
            return;
        }
        /** @type {?} */
        var items = this.childItems.map(function (_a) {
            var value = _a.value, description = _a.description;
            if (!Array.isArray(value)) {
                return { enum: [value], description: description };
            }
            return { enum: value, description: description };
        });
        if (items.length === 0) {
            return;
        }
        return items;
    };
    /**
     * @return {?}
     */
    FieldComponent.prototype.setTitleFromContent = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var textContent = this.getTextContent(this.elementRef);
        //  title as @Input takes priority over content text
        if (textContent && !this.title) {
            this.title = textContent;
        }
    };
    /**
     * @return {?}
     */
    FieldComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // cache it
        this.setTitleFromContent();
        merge(this.childFields.changes, this.childItems.changes, this.childButtons.changes)
            .subscribe(function () { return _this.templateSchemaService.changed(); });
    };
    FieldComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sf-field',
                    template: "<ng-content ></ng-content>\n"
                }] }
    ];
    /** @nocollapse */
    FieldComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: TemplateSchemaService },
        { type: ActionRegistry }
    ]; };
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
    return FieldComponent;
}(FieldParent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var TemplateSchemaDirective = /** @class */ (function (_super) {
    __extends(TemplateSchemaDirective, _super);
    function TemplateSchemaDirective(actionRegistry, validatorRegistry, formComponent, terminatorService, templateSchemaService) {
        var _this = _super.call(this) || this;
        _this.actionRegistry = actionRegistry;
        _this.validatorRegistry = validatorRegistry;
        _this.formComponent = formComponent;
        _this.terminatorService = terminatorService;
        _this.templateSchemaService = templateSchemaService;
        return _this;
    }
    /**
     * @param {?} fields
     * @return {?}
     */
    TemplateSchemaDirective.prototype.setFormDocumentSchema = /**
     * @param {?} fields
     * @return {?}
     */
    function (fields) {
        var _this = this;
        this.actionRegistry.clear();
        this.validatorRegistry.clear();
        /** @type {?} */
        var schema = this.getFieldsSchema(fields);
        /** @type {?} */
        var validators = this.getFieldsValidators(fields);
        validators.forEach(function (_a) {
            var path = _a.path, validator = _a.validator;
            _this.validatorRegistry.register(path, validator);
        });
        /** @type {?} */
        var previousSchema = this.formComponent.schema;
        this.formComponent.schema = {
            type: FieldType.Object,
            properties: schema.properties
        };
        if (schema.required && schema.required.length > 0) {
            this.formComponent.schema.requred = schema.required;
        }
        /** @type {?} */
        var buttons = this.getButtons();
        if (buttons.length > 0) {
            this.formComponent.schema.buttons = buttons;
        }
        this.formComponent.ngOnChanges({
            schema: new SimpleChange(previousSchema, this.formComponent.schema, Boolean(previousSchema))
        });
    };
    /**
     * @return {?}
     */
    TemplateSchemaDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.childFields.length > 0) {
            this.setFormDocumentSchema(this.childFields.toArray());
        }
        merge(this.childFields.changes, this.templateSchemaService.changes)
            .subscribe(function () {
            _this.terminatorService.destroy();
            _this.setFormDocumentSchema(_this.childFields.toArray());
        });
    };
    TemplateSchemaDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'sf-form[templateSchema]',
                    providers: [
                        TemplateSchemaService
                    ]
                },] }
    ];
    /** @nocollapse */
    TemplateSchemaDirective.ctorParameters = function () { return [
        { type: ActionRegistry },
        { type: ValidatorRegistry },
        { type: FormComponent },
        { type: TerminatorService },
        { type: TemplateSchemaService }
    ]; };
    TemplateSchemaDirective.propDecorators = {
        childFields: [{ type: ContentChildren, args: [FieldComponent,] }],
        childButtons: [{ type: ContentChildren, args: [ButtonComponent,] }]
    };
    return TemplateSchemaDirective;
}(FieldParent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var TemplateSchemaModule = /** @class */ (function () {
    function TemplateSchemaModule() {
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
    return TemplateSchemaModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { FormComponent, FormElementComponent, FormElementComponentAction, WidgetChooserComponent, WidgetRegistry, FormProperty, ArrayProperty, FormPropertyFactory, SchemaPreprocessor, ValidatorRegistry, ActionRegistry, BindingRegistry, SchemaValidatorFactory, ZSchemaValidatorFactory, WidgetFactory, TerminatorService, Widget, ControlWidget, ArrayLayoutWidget, ObjectLayoutWidget, ArrayWidget, ButtonWidget, ObjectWidget, CheckboxWidget, FileWidget, IntegerWidget, TextAreaWidget, RadioWidget, RangeWidget, SelectWidget, StringWidget, DefaultWidgetRegistry, SchemaFormModule, TemplateSchemaModule, DefaultWidget as ɵh, useFactory as ɵa, ActionRegistry as ɵb, BindingRegistry as ɵe, FormPropertyFactory as ɵg, SchemaPreprocessor as ɵf, ValidatorRegistry as ɵc, PropertyBindingRegistry as ɵd, ButtonComponent as ɵo, FieldParent as ɵj, FieldComponent as ɵm, ItemComponent as ɵn, TemplateSchemaElement as ɵk, TemplateSchemaDirective as ɵi, TemplateSchemaService as ɵl };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNjaGVtYS1mb3JtLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL21vZGVsL2FjdGlvbnJlZ2lzdHJ5LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL21vZGVsL2Zvcm1wcm9wZXJ0eS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9tb2RlbC9hdG9taWNwcm9wZXJ0eS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9tb2RlbC9udW1iZXJwcm9wZXJ0eS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9tb2RlbC9zdHJpbmdwcm9wZXJ0eS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9tb2RlbC9ib29sZWFucHJvcGVydHkudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvbW9kZWwvb2JqZWN0cHJvcGVydHkudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvbW9kZWwvYXJyYXlwcm9wZXJ0eS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9tb2RlbC9mb3JtcHJvcGVydHlmYWN0b3J5LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL21vZGVsL3V0aWxzLnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL21vZGVsL3NjaGVtYXByZXByb2Nlc3Nvci50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9tb2RlbC92YWxpZGF0b3JyZWdpc3RyeS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9tb2RlbC9iaW5kaW5ncmVnaXN0cnkudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvc2NoZW1hdmFsaWRhdG9yZmFjdG9yeS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi93aWRnZXRyZWdpc3RyeS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi93aWRnZXRmYWN0b3J5LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL3Rlcm1pbmF0b3Iuc2VydmljZS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9wcm9wZXJ0eS1iaW5kaW5nLXJlZ2lzdHJ5LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL2Zvcm0uY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL2Zvcm1lbGVtZW50LmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9mb3JtZWxlbWVudC5hY3Rpb24uY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL3dpZGdldGNob29zZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL3dpZGdldC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9kZWZhdWx0d2lkZ2V0cy9hcnJheS9hcnJheS53aWRnZXQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvZGVmYXVsdHdpZGdldHMvYnV0dG9uL2J1dHRvbi53aWRnZXQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvZGVmYXVsdHdpZGdldHMvb2JqZWN0L29iamVjdC53aWRnZXQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvZGVmYXVsdHdpZGdldHMvY2hlY2tib3gvY2hlY2tib3gud2lkZ2V0LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL2RlZmF1bHR3aWRnZXRzL2ZpbGUvZmlsZS53aWRnZXQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvZGVmYXVsdHdpZGdldHMvaW50ZWdlci9pbnRlZ2VyLndpZGdldC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9kZWZhdWx0d2lkZ2V0cy90ZXh0YXJlYS90ZXh0YXJlYS53aWRnZXQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvZGVmYXVsdHdpZGdldHMvcmFkaW8vcmFkaW8ud2lkZ2V0LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL2RlZmF1bHR3aWRnZXRzL3JhbmdlL3JhbmdlLndpZGdldC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9kZWZhdWx0d2lkZ2V0cy9zZWxlY3Qvc2VsZWN0LndpZGdldC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9kZWZhdWx0d2lkZ2V0cy9zdHJpbmcvc3RyaW5nLndpZGdldC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9kZWZhdWx0d2lkZ2V0cy9kZWZhdWx0d2lkZ2V0cmVnaXN0cnkudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvZGVmYXVsdC53aWRnZXQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvc2NoZW1hLWZvcm0ubW9kdWxlLnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL3RlbXBsYXRlLXNjaGVtYS90ZW1wbGF0ZS1zY2hlbWEuc2VydmljZS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi90ZW1wbGF0ZS1zY2hlbWEvdGVtcGxhdGUtc2NoZW1hLWVsZW1lbnQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvdGVtcGxhdGUtc2NoZW1hL2J1dHRvbi9idXR0b24uY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL3RlbXBsYXRlLXNjaGVtYS9maWVsZC9maWVsZC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi90ZW1wbGF0ZS1zY2hlbWEvZmllbGQvZmllbGQtcGFyZW50LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL3RlbXBsYXRlLXNjaGVtYS9maWVsZC9pdGVtL2l0ZW0uY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL3RlbXBsYXRlLXNjaGVtYS9maWVsZC9maWVsZC5jb21wb25lbnQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvdGVtcGxhdGUtc2NoZW1hL3RlbXBsYXRlLXNjaGVtYS5kaXJlY3RpdmUudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvdGVtcGxhdGUtc2NoZW1hL3RlbXBsYXRlLXNjaGVtYS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi9hY3Rpb24nO1xuXG5leHBvcnQgY2xhc3MgQWN0aW9uUmVnaXN0cnkge1xuICBhY3Rpb25zOiB7W2tleTogc3RyaW5nXTogQWN0aW9ufSA9IHt9O1xuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuYWN0aW9ucyA9IHt9O1xuICB9XG5cbiAgcmVnaXN0ZXIoYWN0aW9uSWQ6IHN0cmluZywgYWN0aW9uOiBBY3Rpb24pIHtcbiAgICB0aGlzLmFjdGlvbnNbYWN0aW9uSWRdID0gYWN0aW9uO1xuICB9XG5cbiAgZ2V0KGFjdGlvbklkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zW2FjdGlvbklkXTtcbiAgfVxufVxuIiwiaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7U2NoZW1hVmFsaWRhdG9yRmFjdG9yeX0gZnJvbSAnLi4vc2NoZW1hdmFsaWRhdG9yZmFjdG9yeSc7XG5pbXBvcnQge1ZhbGlkYXRvclJlZ2lzdHJ5fSBmcm9tICcuL3ZhbGlkYXRvcnJlZ2lzdHJ5JztcbmltcG9ydCB7UHJvcGVydHlCaW5kaW5nUmVnaXN0cnl9IGZyb20gJy4uL3Byb3BlcnR5LWJpbmRpbmctcmVnaXN0cnknO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRm9ybVByb3BlcnR5IHtcbiAgcHVibGljIHNjaGVtYVZhbGlkYXRvcjogRnVuY3Rpb247XG5cbiAgX3ZhbHVlOiBhbnkgPSBudWxsO1xuICBfZXJyb3JzOiBhbnkgPSBudWxsO1xuICBwcml2YXRlIF92YWx1ZUNoYW5nZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XG4gIHByaXZhdGUgX2Vycm9yc0NoYW5nZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XG4gIHByaXZhdGUgX3Zpc2libGUgPSB0cnVlO1xuICBwcml2YXRlIF92aXNpYmlsaXR5Q2hhbmdlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHByaXZhdGUgX3Jvb3Q6IFByb3BlcnR5R3JvdXA7XG4gIHByaXZhdGUgX3BhcmVudDogUHJvcGVydHlHcm91cDtcbiAgcHJpdmF0ZSBfcGF0aDogc3RyaW5nO1xuICBfcHJvcGVydHlCaW5kaW5nUmVnaXN0cnk6IFByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5O1xuICBfY2Fub25pY2FsUGF0aDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHNjaGVtYVZhbGlkYXRvckZhY3Rvcnk6IFNjaGVtYVZhbGlkYXRvckZhY3RvcnksXG4gICAgICAgICAgICAgIHByaXZhdGUgdmFsaWRhdG9yUmVnaXN0cnk6IFZhbGlkYXRvclJlZ2lzdHJ5LFxuICAgICAgICAgICAgICBwdWJsaWMgc2NoZW1hOiBhbnksXG4gICAgICAgICAgICAgIHBhcmVudDogUHJvcGVydHlHcm91cCxcbiAgICAgICAgICAgICAgcGF0aDogc3RyaW5nKSB7XG4gICAgdGhpcy5zY2hlbWFWYWxpZGF0b3IgPSBzY2hlbWFWYWxpZGF0b3JGYWN0b3J5LmNyZWF0ZVZhbGlkYXRvckZuKHRoaXMuc2NoZW1hKTtcblxuICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICB0aGlzLl9yb290ID0gcGFyZW50LnJvb3Q7XG4gICAgfSBlbHNlIGlmICh0aGlzIGluc3RhbmNlb2YgUHJvcGVydHlHcm91cCkge1xuICAgICAgdGhpcy5fcm9vdCA9IDxQcm9wZXJ0eUdyb3VwPjxhbnk+dGhpcztcbiAgICB9XG4gICAgdGhpcy5fcGF0aCA9IHBhdGg7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZhbHVlQ2hhbmdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWVDaGFuZ2VzO1xuICB9XG5cbiAgcHVibGljIGdldCBlcnJvcnNDaGFuZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLl9lcnJvcnNDaGFuZ2VzO1xuICB9XG5cbiAgcHVibGljIGdldCB0eXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2NoZW1hLnR5cGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBhcmVudCgpOiBQcm9wZXJ0eUdyb3VwIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xuICB9XG5cbiAgcHVibGljIGdldCByb290KCk6IFByb3BlcnR5R3JvdXAge1xuICAgIHJldHVybiB0aGlzLl9yb290IHx8IDxQcm9wZXJ0eUdyb3VwPjxhbnk+dGhpcztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGF0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9wYXRoO1xuICB9XG5cbiAgcHVibGljIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZhbGlkKCkge1xuICAgIHJldHVybiB0aGlzLl9lcnJvcnMgPT09IG51bGw7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3Qgc2V0VmFsdWUodmFsdWU6IGFueSwgb25seVNlbGY6IGJvb2xlYW4pO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCByZXNldCh2YWx1ZTogYW55LCBvbmx5U2VsZjogYm9vbGVhbik7XG5cbiAgcHVibGljIHVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkob25seVNlbGYgPSBmYWxzZSwgZW1pdEV2ZW50ID0gdHJ1ZSkge1xuICAgIHRoaXMuX3VwZGF0ZVZhbHVlKCk7XG5cbiAgICBpZiAoZW1pdEV2ZW50KSB7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlcy5uZXh0KHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMuX3J1blZhbGlkYXRpb24oKTtcblxuICAgIGlmICh0aGlzLnBhcmVudCAmJiAhb25seVNlbGYpIHtcbiAgICAgIHRoaXMucGFyZW50LnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkob25seVNlbGYsIGVtaXRFdmVudCk7XG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgX2hhc1ZhbHVlKCk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqICBAaW50ZXJuYWxcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBfdXBkYXRlVmFsdWUoKTtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBwdWJsaWMgX3J1blZhbGlkYXRpb24oKTogYW55IHtcbiAgICBsZXQgZXJyb3JzID0gdGhpcy5zY2hlbWFWYWxpZGF0b3IodGhpcy5fdmFsdWUpIHx8IFtdO1xuICAgIGxldCBjdXN0b21WYWxpZGF0b3IgPSB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LmdldCh0aGlzLnBhdGgpO1xuICAgIGlmIChjdXN0b21WYWxpZGF0b3IpIHtcbiAgICAgIGxldCBjdXN0b21FcnJvcnMgPSBjdXN0b21WYWxpZGF0b3IodGhpcy52YWx1ZSwgdGhpcywgdGhpcy5maW5kUm9vdCgpKTtcbiAgICAgIGVycm9ycyA9IHRoaXMubWVyZ2VFcnJvcnMoZXJyb3JzLCBjdXN0b21FcnJvcnMpO1xuICAgIH1cbiAgICBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZXJyb3JzID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLl9lcnJvcnMgPSBlcnJvcnM7XG4gICAgdGhpcy5zZXRFcnJvcnModGhpcy5fZXJyb3JzKTtcbiAgfVxuXG4gIHByaXZhdGUgbWVyZ2VFcnJvcnMoZXJyb3JzLCBuZXdFcnJvcnMpIHtcbiAgICBpZiAobmV3RXJyb3JzKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShuZXdFcnJvcnMpKSB7XG4gICAgICAgIGVycm9ycyA9IGVycm9ycy5jb25jYXQoLi4ubmV3RXJyb3JzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9ycy5wdXNoKG5ld0Vycm9ycyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlcnJvcnM7XG4gIH1cblxuICBwcml2YXRlIHNldEVycm9ycyhlcnJvcnMpIHtcbiAgICB0aGlzLl9lcnJvcnMgPSBlcnJvcnM7XG4gICAgdGhpcy5fZXJyb3JzQ2hhbmdlcy5uZXh0KGVycm9ycyk7XG4gIH1cblxuICBwdWJsaWMgZXh0ZW5kRXJyb3JzKGVycm9ycykge1xuICAgIGVycm9ycyA9IHRoaXMubWVyZ2VFcnJvcnModGhpcy5fZXJyb3JzIHx8IFtdLCBlcnJvcnMpO1xuICAgIHRoaXMuc2V0RXJyb3JzKGVycm9ycyk7XG4gIH1cblxuICBzZWFyY2hQcm9wZXJ0eShwYXRoOiBzdHJpbmcpOiBGb3JtUHJvcGVydHkge1xuICAgIGxldCBwcm9wOiBGb3JtUHJvcGVydHkgPSB0aGlzO1xuICAgIGxldCBiYXNlOiBQcm9wZXJ0eUdyb3VwID0gbnVsbDtcblxuICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgIGlmIChwYXRoWzBdID09PSAnLycpIHtcbiAgICAgIGJhc2UgPSB0aGlzLmZpbmRSb290KCk7XG4gICAgICByZXN1bHQgPSBiYXNlLmdldFByb3BlcnR5KHBhdGguc3Vic3RyKDEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2hpbGUgKHJlc3VsdCA9PT0gbnVsbCAmJiBwcm9wLnBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICBwcm9wID0gYmFzZSA9IHByb3AucGFyZW50O1xuICAgICAgICByZXN1bHQgPSBiYXNlLmdldFByb3BlcnR5KHBhdGgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIGZpbmRSb290KCk6IFByb3BlcnR5R3JvdXAge1xuICAgIGxldCBwcm9wZXJ0eTogRm9ybVByb3BlcnR5ID0gdGhpcztcbiAgICB3aGlsZSAocHJvcGVydHkucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICBwcm9wZXJ0eSA9IHByb3BlcnR5LnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIDxQcm9wZXJ0eUdyb3VwPnByb3BlcnR5O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl92aXNpYmxlID0gdmlzaWJsZTtcbiAgICB0aGlzLl92aXNpYmlsaXR5Q2hhbmdlcy5uZXh0KHZpc2libGUpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy5wYXJlbnQudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfX2JpbmRWaXNpYmlsaXR5KCk6IGJvb2xlYW4ge1xuICAgIC8qKlxuICAgICAqIDxwcmU+XG4gICAgICogICAgIFwib25lT2ZcIjpbe1xuICAgICAqICAgICAgICAgXCJwYXRoXCI6W1widmFsdWVcIixcInZhbHVlXCJdXG4gICAgICogICAgIH0se1xuICAgICAqICAgICAgICAgXCJwYXRoXCI6W1widmFsdWVcIixcInZhbHVlXCJdXG4gICAgICogICAgIH1dXG4gICAgICogICAgIDwvcHJlPlxuICAgICAqIDxwcmU+XG4gICAgICogICAgIFwiYWxsT2ZcIjpbe1xuICAgICAqICAgICAgICAgXCJwYXRoXCI6W1widmFsdWVcIixcInZhbHVlXCJdXG4gICAgICogICAgIH0se1xuICAgICAqICAgICAgICAgXCJwYXRoXCI6W1widmFsdWVcIixcInZhbHVlXCJdXG4gICAgICogICAgIH1dXG4gICAgICogICAgIDwvcHJlPlxuICAgICAqL1xuICAgIGNvbnN0IHZpc2libGVJZlByb3BlcnR5ID0gdGhpcy5zY2hlbWEudmlzaWJsZUlmO1xuICAgIGNvbnN0IHZpc2libGVJZk9mID0gKHZpc2libGVJZlByb3BlcnR5IHx8IHt9KS5vbmVPZiB8fCAodmlzaWJsZUlmUHJvcGVydHkgfHwge30pLmFsbE9mO1xuICAgIGlmICh2aXNpYmxlSWZPZikge1xuICAgICAgZm9yIChjb25zdCB2aXNpYmxlSWYgb2YgdmlzaWJsZUlmT2YpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2aXNpYmxlSWYgPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKHZpc2libGVJZikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh2aXNpYmxlSWYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnN0IHByb3BlcnRpZXNCaW5kaW5nID0gW107XG4gICAgICAgICAgZm9yIChjb25zdCBkZXBlbmRlbmN5UGF0aCBpbiB2aXNpYmxlSWYpIHtcbiAgICAgICAgICAgIGlmICh2aXNpYmxlSWYuaGFzT3duUHJvcGVydHkoZGVwZW5kZW5jeVBhdGgpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLmZpbmRQcm9wZXJ0aWVzKHRoaXMsIGRlcGVuZGVuY3lQYXRoKTtcbiAgICAgICAgICAgICAgaWYgKChwcm9wZXJ0aWVzIHx8IFtdKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHByb3BlcnR5IG9mIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWVDaGVjaztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NoZW1hLnZpc2libGVJZi5vbmVPZikge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlQ2hlY2sgPSBwcm9wZXJ0eS52YWx1ZUNoYW5nZXMucGlwZShtYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aXNpYmxlSWZbZGVwZW5kZW5jeVBhdGhdLmluZGV4T2YoJyRBTlkkJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZpc2libGVJZltkZXBlbmRlbmN5UGF0aF0uaW5kZXhPZih2YWx1ZSkgIT09IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zY2hlbWEudmlzaWJsZUlmLmFsbE9mKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgX2NoayA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuc2NoZW1hLnZpc2libGVJZi5hbGxPZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGRlcFBhdGggb2YgT2JqZWN0LmtleXMoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9wID0gdGhpcy5zZWFyY2hQcm9wZXJ0eShkZXBQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9wVmFsID0gcHJvcC5fdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1bZGVwUGF0aF0uaW5kZXhPZignJEFOWSQnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkID0gcHJvcFZhbC5sZW5ndGggPiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IGl0ZW1bZGVwUGF0aF0uaW5kZXhPZihwcm9wVmFsKSAhPT0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWVDaGVjayA9IHByb3BlcnR5LnZhbHVlQ2hhbmdlcy5waXBlKG1hcChfY2hrKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlzaWJpbGl0eUNoZWNrID0gcHJvcGVydHkuX3Zpc2liaWxpdHlDaGFuZ2VzO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmQgPSBjb21iaW5lTGF0ZXN0KFt2YWx1ZUNoZWNrLCB2aXNpYmlsaXR5Q2hlY2tdLCAodjEsIHYyKSA9PiB2MSAmJiB2Mik7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNCaW5kaW5nLnB1c2goYW5kKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdDYW5cXCd0IGZpbmQgcHJvcGVydHkgJyArIGRlcGVuZGVuY3lQYXRoICsgJyBmb3IgdmlzaWJpbGl0eSBjaGVjayBvZiAnICsgdGhpcy5wYXRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyTWlzc2luZ1Zpc2liaWxpdHlCaW5kaW5nKGRlcGVuZGVuY3lQYXRoLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAvLyBub3QgdmlzaWJsZSBpZiBub3QgZXhpc3RlbnRcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZpc2libGUoZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29tYmluZUxhdGVzdChwcm9wZXJ0aWVzQmluZGluZywgKC4uLnZhbHVlczogYm9vbGVhbltdKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzLmluZGV4T2YodHJ1ZSkgIT09IC0xO1xuICAgICAgICAgIH0pLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSkuc3Vic2NyaWJlKCh2aXNpYmxlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFZpc2libGUodmlzaWJsZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIEEgZmllbGQgaXMgdmlzaWJsZSBpZiBBVCBMRUFTVCBPTkUgb2YgdGhlIHByb3BlcnRpZXMgaXQgZGVwZW5kcyBvbiBpcyB2aXNpYmxlIEFORCBoYXMgYSB2YWx1ZSBpbiB0aGUgbGlzdFxuICBwdWJsaWMgX2JpbmRWaXNpYmlsaXR5KCkge1xuICAgIGlmICh0aGlzLl9fYmluZFZpc2liaWxpdHkoKSlcbiAgICAgIHJldHVybjtcbiAgICBsZXQgdmlzaWJsZUlmID0gdGhpcy5zY2hlbWEudmlzaWJsZUlmO1xuICAgIGlmICh0eXBlb2YgdmlzaWJsZUlmID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyh2aXNpYmxlSWYpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICB9IGVsc2UgaWYgKHZpc2libGVJZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgcHJvcGVydGllc0JpbmRpbmcgPSBbXTtcbiAgICAgIGZvciAobGV0IGRlcGVuZGVuY3lQYXRoIGluIHZpc2libGVJZikge1xuICAgICAgICBpZiAodmlzaWJsZUlmLmhhc093blByb3BlcnR5KGRlcGVuZGVuY3lQYXRoKSkge1xuICAgICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLmZpbmRQcm9wZXJ0aWVzKHRoaXMsIGRlcGVuZGVuY3lQYXRoKTtcbiAgICAgICAgICBpZiAoKHByb3BlcnRpZXMgfHwgW10pLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBvZiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlQ2hlY2sgPSBwcm9wZXJ0eS52YWx1ZUNoYW5nZXMucGlwZShtYXAoXG4gICAgICAgICAgICAgICAgICB2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNpYmxlSWZbZGVwZW5kZW5jeVBhdGhdLmluZGV4T2YoJyRBTlkkJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZpc2libGVJZltkZXBlbmRlbmN5UGF0aF0uaW5kZXhPZih2YWx1ZSkgIT09IC0xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmlzaWJpbGl0eUNoZWNrID0gcHJvcGVydHkuX3Zpc2liaWxpdHlDaGFuZ2VzO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFuZCA9IGNvbWJpbmVMYXRlc3QoW3ZhbHVlQ2hlY2ssIHZpc2liaWxpdHlDaGVja10sICh2MSwgdjIpID0+IHYxICYmIHYyKTtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzQmluZGluZy5wdXNoKGFuZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdDYW5cXCd0IGZpbmQgcHJvcGVydHkgJyArIGRlcGVuZGVuY3lQYXRoICsgJyBmb3IgdmlzaWJpbGl0eSBjaGVjayBvZiAnICsgdGhpcy5wYXRoKTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJNaXNzaW5nVmlzaWJpbGl0eUJpbmRpbmcoZGVwZW5kZW5jeVBhdGgsIHRoaXMpO1xuICAgICAgICAgICAgLy8gbm90IHZpc2libGUgaWYgbm90IGV4aXN0ZW50XG4gICAgICAgICAgICB0aGlzLnNldFZpc2libGUoZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb21iaW5lTGF0ZXN0KHByb3BlcnRpZXNCaW5kaW5nLCAoLi4udmFsdWVzOiBib29sZWFuW10pID0+IHtcbiAgICAgICAgcmV0dXJuIHZhbHVlcy5pbmRleE9mKHRydWUpICE9PSAtMTtcbiAgICAgIH0pLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSkuc3Vic2NyaWJlKCh2aXNpYmxlKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0VmlzaWJsZSh2aXNpYmxlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVnaXN0ZXJNaXNzaW5nVmlzaWJpbGl0eUJpbmRpbmcoZGVwZW5kZW5jeVBhdGg6IHN0cmluZywgZm9ybVByb3BlcnR5OiBGb3JtUHJvcGVydHkpIHtcbiAgICBmb3JtUHJvcGVydHkuX3Byb3BlcnR5QmluZGluZ1JlZ2lzdHJ5LmdldFByb3BlcnR5QmluZGluZ3NWaXNpYmlsaXR5KCkuYWRkKGRlcGVuZGVuY3lQYXRoLCBmb3JtUHJvcGVydHkucGF0aCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBGaW5kcyBhbGwgPGNvZGU+Zm9ybVByb3BlcnRpZXM8L2NvZGU+IGZyb20gYSBwYXRoIHdpdGggd2lsZGNhcmRzLjxici8+XG4gICAqIGUuZzogPGNvZGU+L2dhcmFnZS9jYXJzLyYjNDI7L3RpcmVzLyYjNDI7L25hbWU8L2NvZGU+PGJyLz5cbiAgICogQHBhcmFtIHRhcmdldFxuICAgKiBAcGFyYW0gcHJvcGVydHlQYXRoXG4gICAqL1xuICBmaW5kUHJvcGVydGllcyh0YXJnZXQ6IEZvcm1Qcm9wZXJ0eSwgcHJvcGVydHlQYXRoOiBzdHJpbmcpOiBGb3JtUHJvcGVydHlbXSB7XG4gICAgY29uc3QgcHJvcHM6IEZvcm1Qcm9wZXJ0eVtdID0gW107XG4gICAgY29uc3QgcGF0aHMgPSB0aGlzLmZpbmRQcm9wZXJ0eVBhdGhzKHRhcmdldCwgcHJvcGVydHlQYXRoKTtcbiAgICBmb3IgKGNvbnN0IHBhdGggb2YgcGF0aHMpIHtcbiAgICAgIGNvbnN0IHA6IEZvcm1Qcm9wZXJ0eSA9IHRhcmdldC5zZWFyY2hQcm9wZXJ0eShwYXRoKTtcbiAgICAgIGlmIChwKSB7XG4gICAgICAgIHByb3BzLnB1c2gocCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGNhbm9uaWNhbCBwYXRocyBmcm9tIGEgcGF0aCB3aXRoIHdpbGRjYXJkcy5cbiAgICogZS5nOjxici8+XG4gICAqIEZyb206PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLyYjNDI7L3RpcmVzLyYjNDI7L25hbWU8L2NvZGU+PGJyLz5cbiAgICogaXQgY3JlYXRlczo8YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMC90aXJlcy8wL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLzAvdGlyZXMvMS9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8wL3RpcmVzLzIvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMC90aXJlcy8zL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLzEvdGlyZXMvMC9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8yL3RpcmVzLzEvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMy90aXJlcy8yL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLzMvdGlyZXMvMy9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8mIzQyOy90aXJlcy8mIzQyOy9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8mIzQyOy90aXJlcy8yL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLyYjNDI7L3RpcmVzLzMvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8YnIvPmV0Yy4uLlxuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqIEBwYXJhbSBwYXRoXG4gICAqIEBwYXJhbSBwYXJlbnRQYXRoXG4gICAqL1xuICBmaW5kUHJvcGVydHlQYXRocyh0YXJnZXQ6IEZvcm1Qcm9wZXJ0eSwgcGF0aDogc3RyaW5nLCBwYXJlbnRQYXRoPzogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IGl4ID0gcGF0aC5pbmRleE9mKCcqJyk7XG4gICAgaWYgKC0xICE9PSBpeCkge1xuICAgICAgY29uc3QgcHJlUGF0aCA9IGl4ID4gLTEgPyBwYXRoLnN1YnN0cmluZygwLCBpeCAtIDEpIDogcGF0aDtcbiAgICAgIGNvbnN0IHN1YlBhdGggPSBpeCA+IC0xID8gcGF0aC5zdWJzdHJpbmcoaXggKyAxKSA6IHBhdGg7XG4gICAgICBjb25zdCBwcm9wOiBGb3JtUHJvcGVydHkgPSB0YXJnZXQuc2VhcmNoUHJvcGVydHkocHJlUGF0aCk7XG4gICAgICBsZXQgcGF0aEZvdW5kID0gW107XG4gICAgICBpZiAocHJvcCBpbnN0YW5jZW9mIFByb3BlcnR5R3JvdXApIHtcbiAgICAgICAgY29uc3QgYXJyUHJvcCA9IHByb3AucHJvcGVydGllcyBhcyBGb3JtUHJvcGVydHlbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJQcm9wLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY3VycmVJdGVtUGF0aCA9IChwYXJlbnRQYXRoIHx8ICcnKSArIHByZVBhdGggKyAocHJlUGF0aC5lbmRzV2l0aCgnLycpID8gJycgOiAnLycpICsgaSArIHN1YlBhdGg7XG4gICAgICAgICAgY29uc3QgY3VycmVJdGVtUHJlUGF0aCA9IChwYXJlbnRQYXRoIHx8ICcnKSArIHByZVBhdGggKyBpO1xuICAgICAgICAgIGlmICgtMSA9PT0gY3VycmVJdGVtUGF0aC5pbmRleE9mKCcqJykpIHtcbiAgICAgICAgICAgIHBhdGhGb3VuZC5wdXNoKGN1cnJlSXRlbVBhdGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBjaGlsZHJlblBhdGhGb3VuZCA9IHRoaXMuZmluZFByb3BlcnR5UGF0aHMoYXJyUHJvcFtpXSwgc3ViUGF0aCwgY3VycmVJdGVtUHJlUGF0aCk7XG4gICAgICAgICAgcGF0aEZvdW5kID0gcGF0aEZvdW5kLmNvbmNhdChjaGlsZHJlblBhdGhGb3VuZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXRoRm91bmQ7XG4gICAgfVxuICAgIHJldHVybiBbcGF0aF07XG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByb3BlcnR5R3JvdXAgZXh0ZW5kcyBGb3JtUHJvcGVydHkge1xuXG4gIF9wcm9wZXJ0aWVzOiBGb3JtUHJvcGVydHlbXSB8IHsgW2tleTogc3RyaW5nXTogRm9ybVByb3BlcnR5IH0gPSBudWxsO1xuXG4gIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzO1xuICB9XG5cbiAgc2V0IHByb3BlcnRpZXMocHJvcGVydGllczogRm9ybVByb3BlcnR5W10gfCB7IFtrZXk6IHN0cmluZ106IEZvcm1Qcm9wZXJ0eSB9KSB7XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhlIHNldHRlciB0byBhZGQgYW4gb2JzZXJ2ZXIgdGhhdCBub3RpY2VzIHdoZW4gYW4gaXRlbSBpcyBhZGRlZCBvciByZW1vdmVkLjxici8+XG4gICAgICovXG4gICAgdGhpcy5fcHJvcGVydGllcyA9IG5ldyBQcm94eShwcm9wZXJ0aWVzLCB0aGlzLl9wcm9wZXJ0eVByb3h5SGFuZGxlcik7XG4gIH1cblxuICBwcml2YXRlIF9wcm9wZXJ0eVByb3h5SGFuZGxlcjogUHJveHlIYW5kbGVyPEZvcm1Qcm9wZXJ0eVtdIHwgeyBba2V5OiBzdHJpbmddOiBGb3JtUHJvcGVydHkgfT4gPSB7XG4gICAgLyoqXG4gICAgICogV2hlbiBhIG5ldyBpdGVtIGlzIGFkZGVkIGl0IHdpbGwgYmUgY2hlY2tlZCBmb3IgdmlzaWJpbGl0eSB1cGRhdGVzIHRvIHByb2NlZWQgPGJyLz5cbiAgICAgKiBpZiBhbnkgb3RoZXIgZmllbGQgaGFzIGEgYmluZGluZyByZWZlcmVuY2UgdG8gaXQuPGJyLz5cbiAgICAgKi9cbiAgICBzZXQodGFyZ2V0OiBGb3JtUHJvcGVydHlbXSB8IHsgW3A6IHN0cmluZ106IEZvcm1Qcm9wZXJ0eSB9LCBwOiBQcm9wZXJ0eUtleSwgdmFsdWU6IGFueSwgcmVjZWl2ZXI6IGFueSk6IGJvb2xlYW4ge1xuXG4gICAgICAvKipcbiAgICAgICAqIDEpIE1ha2Ugc3VyZSBhIGNhbm9uaWNhbCBwYXRoIGlzIHNldFxuICAgICAgICovXG4gICAgICBjb25zdCBhc3NlcnRDYW5vbmljYWxQYXRoID0gKHByb3BlcnR5VmFsdWU6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBmb3JtUHJvcGVydHkgPSBwcm9wZXJ0eVZhbHVlIGFzIEZvcm1Qcm9wZXJ0eTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSAmJiBwcm9wZXJ0eVZhbHVlIGluc3RhbmNlb2YgRm9ybVByb3BlcnR5KSB7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogQ3JlYXRlIGEgY2Fub25pY2FsIHBhdGggcmVwbGFjaW5nIHRoZSBsYXN0ICcqJyB3aXRoIHRoZSBlbGVtZW50cyBwb3NpdGlvbiBpbiBhcnJheVxuICAgICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eVBhdGhcbiAgICAgICAgICAgKiBAcGFyYW0gaW5kZXhPZkNoaWxkXG4gICAgICAgICAgICovXG4gICAgICAgICAgY29uc3QgZ2V0Q2Fub25pY2FsUGF0aCA9IChwcm9wZXJ0eVBhdGg6IHN0cmluZywgaW5kZXhPZkNoaWxkOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGxldCBwb3M7XG4gICAgICAgICAgICBpZiAocHJvcGVydHlQYXRoICYmIC0xICE9PSAocG9zID0gcHJvcGVydHlQYXRoLmxhc3RJbmRleE9mKCcqJykpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0eVBhdGguc3Vic3RyaW5nKDAsIHBvcykgKyBpbmRleE9mQ2hpbGQudG9TdHJpbmcoKSArIHByb3BlcnR5UGF0aC5zdWJzdHJpbmcocG9zICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAoZm9ybVByb3BlcnR5KSB7XG4gICAgICAgICAgICBmb3JtUHJvcGVydHkuX2Nhbm9uaWNhbFBhdGggPSBnZXRDYW5vbmljYWxQYXRoKGZvcm1Qcm9wZXJ0eS5fY2Fub25pY2FsUGF0aCwgcCBhcyBudW1iZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb3BlcnR5R3JvdXAgPSBmb3JtUHJvcGVydHkgYXMgUHJvcGVydHlHcm91cDtcbiAgICAgICAgY29uc3QgcHJvcGVydHlHcm91cENoaWxkcmVuID0gKEFycmF5LmlzQXJyYXkocHJvcGVydHlHcm91cC5wcm9wZXJ0aWVzKSA/XG4gICAgICAgICAgcHJvcGVydHlHcm91cC5wcm9wZXJ0aWVzIDpcbiAgICAgICAgICBPYmplY3QudmFsdWVzKHByb3BlcnR5R3JvdXAucHJvcGVydGllcyB8fCB7fSkpIGFzIEZvcm1Qcm9wZXJ0eVtdO1xuICAgICAgICBpZiAoKGZvcm1Qcm9wZXJ0eS5wYXRoIHx8ICcnKS5lbmRzV2l0aCgnLyonKSkge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIElmIGl0IGlzIGFuIGFycmF5LCB0aGVuIGFsbCBjaGlsZHJlbiBjYW5vbmljYWwgcGF0aHMgbXVzdCBiZSBjb21wdXRlZCBub3cuXG4gICAgICAgICAgICogVGhlIGNoaWxkcmVuIGRvbid0IGhhdmUgdGhlIHBhcmVudCdzIHBhdGggc2VnbWVudCBzZXQgeWV0LFxuICAgICAgICAgICAqIGJlY2F1c2UgdGhleSBhcmUgY3JlYXRlZCBiZWZvcmUgdGhlIHBhcmVudCBnZXRzIGF0dGFjaGVkIHRvIGl0cyBwYXJlbnQuXG4gICAgICAgICAgICovXG4gICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBwcm9wZXJ0eUdyb3VwQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNoaWxkLl9jYW5vbmljYWxQYXRoID0gZm9ybVByb3BlcnR5Ll9jYW5vbmljYWxQYXRoICsgY2hpbGQuX2Nhbm9uaWNhbFBhdGguc3Vic3RyaW5nKGZvcm1Qcm9wZXJ0eS5wYXRoLmxlbmd0aCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7cHJvcGVydHk6IGZvcm1Qcm9wZXJ0eSwgY2hpbGRyZW46IHByb3BlcnR5R3JvdXBDaGlsZHJlbn07XG4gICAgICB9O1xuICAgICAgY29uc3Qge3Byb3BlcnR5LCBjaGlsZHJlbn0gPSBhc3NlcnRDYW5vbmljYWxQYXRoKHZhbHVlKTtcblxuICAgICAgLyoqXG4gICAgICAgKiAyKSBBZGQgdGhlIG5ldyBwcm9wZXJ0eSBiZWZvcmUgcmViaW5kaW5nLCBzbyBpdCBjYW4gYmUgZm91bmQgYnkgPGNvZGU+X2JpbmRWaXNpYmlsaXR5PC9jb2RlPlxuICAgICAgICovXG4gICAgICBjb25zdCByZXN1bHQgPSB0YXJnZXRbcCBhcyBzdHJpbmddID0gdmFsdWU7XG5cbiAgICAgIC8qKlxuICAgICAgICogMykgUmUtYmluZCB0aGUgdmlzaWJpbGl0eSBiaW5kaW5ncyByZWZlcmVuY2luZyB0byB0aGlzIGNhbm9uaWNhbCBwYXRoc1xuICAgICAgICovXG4gICAgICBjb25zdCByZWJpbmRWaXNpYmlsaXR5ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCByZWJpbmRBbGwgPSBbcHJvcGVydHldLmNvbmNhdChjaGlsZHJlbik7XG4gICAgICAgIGNvbnN0IGZpbmRQcm9wZXJ0aWVzVG9SZWJpbmQgPSAoZm9ybVByb3BlcnR5OiBGb3JtUHJvcGVydHkpID0+IHtcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0eUJpbmRpbmdzID0gZm9ybVByb3BlcnR5Ll9wcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeS5nZXRQcm9wZXJ0eUJpbmRpbmdzVmlzaWJpbGl0eSgpO1xuICAgICAgICAgIGxldCByZWJpbmQ6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgaWYgKGZvcm1Qcm9wZXJ0eS5fY2Fub25pY2FsUGF0aCkge1xuICAgICAgICAgICAgcmViaW5kID0gcmViaW5kLmNvbmNhdChyZWJpbmQuY29uY2F0KHByb3BlcnR5QmluZGluZ3MuZmluZEJ5RGVwZW5kZW5jeVBhdGgoZm9ybVByb3BlcnR5Ll9jYW5vbmljYWxQYXRoKSB8fCBbXSkpO1xuICAgICAgICAgICAgaWYgKGZvcm1Qcm9wZXJ0eS5fY2Fub25pY2FsUGF0aC5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgICAgcmViaW5kID0gcmViaW5kLmNvbmNhdChyZWJpbmQuY29uY2F0KHByb3BlcnR5QmluZGluZ3MuZmluZEJ5RGVwZW5kZW5jeVBhdGgoZm9ybVByb3BlcnR5Ll9jYW5vbmljYWxQYXRoLnN1YnN0cmluZygxKSkgfHwgW10pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmViaW5kID0gcmViaW5kLmNvbmNhdChwcm9wZXJ0eUJpbmRpbmdzLmZpbmRCeURlcGVuZGVuY3lQYXRoKGZvcm1Qcm9wZXJ0eS5wYXRoKSB8fCBbXSk7XG4gICAgICAgICAgaWYgKGZvcm1Qcm9wZXJ0eS5wYXRoLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgcmViaW5kID0gcmViaW5kLmNvbmNhdChyZWJpbmQuY29uY2F0KHByb3BlcnR5QmluZGluZ3MuZmluZEJ5RGVwZW5kZW5jeVBhdGgoZm9ybVByb3BlcnR5LnBhdGguc3Vic3RyaW5nKDEpKSB8fCBbXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB1bmlxdWVWYWx1ZXMgPSB7fTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgcmViaW5kKSB7XG4gICAgICAgICAgICB1bmlxdWVWYWx1ZXNbaXRlbV0gPSBpdGVtO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModW5pcXVlVmFsdWVzKTtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yIChjb25zdCBfcHJvcGVydHkgb2YgcmViaW5kQWxsKSB7XG4gICAgICAgICAgaWYgKF9wcm9wZXJ0eSBpbnN0YW5jZW9mIEZvcm1Qcm9wZXJ0eSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgY29uc3QgcmViaW5kUGF0aHMgPSBmaW5kUHJvcGVydGllc1RvUmViaW5kKF9wcm9wZXJ0eSk7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgcmViaW5kUHJvcFBhdGggb2YgcmViaW5kUGF0aHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWJpbmRQcm9wID0gX3Byb3BlcnR5LnNlYXJjaFByb3BlcnR5KHJlYmluZFByb3BQYXRoKTtcbiAgICAgICAgICAgICAgICByZWJpbmRQcm9wLl9iaW5kVmlzaWJpbGl0eSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1JlYmluZGluZyB2aXNpYmlsaXR5IGVycm9yIGF0IHBhdGg6JywgX3Byb3BlcnR5LnBhdGgsICdwcm9wZXJ0eTonLCBfcHJvcGVydHksIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlYmluZFZpc2liaWxpdHkoKTtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuICAgIGdldCh0YXJnZXQ6IEZvcm1Qcm9wZXJ0eVtdIHwgeyBbcDogc3RyaW5nXTogRm9ybVByb3BlcnR5IH0sIHA6IFByb3BlcnR5S2V5LCByZWNlaXZlcjogYW55KTogYW55IHtcbiAgICAgIHJldHVybiB0YXJnZXRbcCBhcyBzdHJpbmddO1xuICAgIH0sXG4gICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0OiBGb3JtUHJvcGVydHlbXSB8IHsgW3A6IHN0cmluZ106IEZvcm1Qcm9wZXJ0eSB9LCBwOiBQcm9wZXJ0eUtleSk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIGRlbGV0ZSB0YXJnZXRbcCBhcyBzdHJpbmddO1xuICAgIH1cbiAgfTtcblxuICBnZXRQcm9wZXJ0eShwYXRoOiBzdHJpbmcpIHtcbiAgICBsZXQgc3ViUGF0aElkeCA9IHBhdGguaW5kZXhPZignLycpO1xuICAgIGxldCBwcm9wZXJ0eUlkID0gc3ViUGF0aElkeCAhPT0gLTEgPyBwYXRoLnN1YnN0cigwLCBzdWJQYXRoSWR4KSA6IHBhdGg7XG5cbiAgICBsZXQgcHJvcGVydHkgPSB0aGlzLnByb3BlcnRpZXNbcHJvcGVydHlJZF07XG4gICAgaWYgKHByb3BlcnR5ICE9PSBudWxsICYmIHN1YlBhdGhJZHggIT09IC0xICYmIHByb3BlcnR5IGluc3RhbmNlb2YgUHJvcGVydHlHcm91cCkge1xuICAgICAgbGV0IHN1YlBhdGggPSBwYXRoLnN1YnN0cihzdWJQYXRoSWR4ICsgMSk7XG4gICAgICBwcm9wZXJ0eSA9ICg8UHJvcGVydHlHcm91cD5wcm9wZXJ0eSkuZ2V0UHJvcGVydHkoc3ViUGF0aCk7XG4gICAgfVxuICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgfVxuXG4gIHB1YmxpYyBmb3JFYWNoQ2hpbGQoZm46IChmb3JtUHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSwgc3RyOiBTdHJpbmcpID0+IHZvaWQpIHtcbiAgICBmb3IgKGxldCBwcm9wZXJ0eUlkIGluIHRoaXMucHJvcGVydGllcykge1xuICAgICAgaWYgKHRoaXMucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eUlkKSkge1xuICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLnByb3BlcnRpZXNbcHJvcGVydHlJZF07XG4gICAgICAgIGZuKHByb3BlcnR5LCBwcm9wZXJ0eUlkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZm9yRWFjaENoaWxkUmVjdXJzaXZlKGZuOiAoZm9ybVByb3BlcnR5OiBGb3JtUHJvcGVydHkpID0+IHZvaWQpIHtcbiAgICB0aGlzLmZvckVhY2hDaGlsZCgoY2hpbGQpID0+IHtcbiAgICAgIGZuKGNoaWxkKTtcbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIFByb3BlcnR5R3JvdXApIHtcbiAgICAgICAgKDxQcm9wZXJ0eUdyb3VwPmNoaWxkKS5mb3JFYWNoQ2hpbGRSZWN1cnNpdmUoZm4pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIF9iaW5kVmlzaWJpbGl0eSgpIHtcbiAgICBzdXBlci5fYmluZFZpc2liaWxpdHkoKTtcbiAgICB0aGlzLl9iaW5kVmlzaWJpbGl0eVJlY3Vyc2l2ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYmluZFZpc2liaWxpdHlSZWN1cnNpdmUoKSB7XG4gICAgdGhpcy5mb3JFYWNoQ2hpbGRSZWN1cnNpdmUoKHByb3BlcnR5KSA9PiB7XG4gICAgICBwcm9wZXJ0eS5fYmluZFZpc2liaWxpdHkoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBpc1Jvb3QoKSB7XG4gICAgcmV0dXJuIHRoaXMgPT09IHRoaXMucm9vdDtcbiAgfVxufVxuXG5cbiIsImltcG9ydCB7Rm9ybVByb3BlcnR5fSBmcm9tICcuL2Zvcm1wcm9wZXJ0eSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBdG9taWNQcm9wZXJ0eSBleHRlbmRzIEZvcm1Qcm9wZXJ0eSB7XG5cbiAgc2V0VmFsdWUodmFsdWUsIG9ubHlTZWxmID0gZmFsc2UpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShvbmx5U2VsZiwgdHJ1ZSk7XG4gIH1cblxuICByZXNldCh2YWx1ZTogYW55ID0gbnVsbCwgb25seVNlbGYgPSB0cnVlKSB7XG4gICAgdGhpcy5yZXNldFZhbHVlKHZhbHVlKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkob25seVNlbGYsIHRydWUpO1xuICB9XG5cbiAgcmVzZXRWYWx1ZSh2YWx1ZTogYW55KTogYW55IHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLnNjaGVtYS5kZWZhdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLnNjaGVtYS5kZWZhdWx0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmZhbGxiYWNrVmFsdWUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBfaGFzVmFsdWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZmFsbGJhY2tWYWx1ZSgpICE9PSB0aGlzLnZhbHVlO1xuICB9XG5cbiAgYWJzdHJhY3QgZmFsbGJhY2tWYWx1ZSgpOiBhbnk7XG5cbiAgcHVibGljIF91cGRhdGVWYWx1ZSgpIHtcbiAgfVxufVxuIiwiaW1wb3J0IHtBdG9taWNQcm9wZXJ0eX0gZnJvbSAnLi9hdG9taWNwcm9wZXJ0eSc7XG5cbmV4cG9ydCBjbGFzcyBOdW1iZXJQcm9wZXJ0eSBleHRlbmRzIEF0b21pY1Byb3BlcnR5IHtcblxuICBmYWxsYmFja1ZhbHVlKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc2V0VmFsdWUodmFsdWUsIG9ubHlTZWxmID0gZmFsc2UpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKHZhbHVlLmxlbmd0aCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLmluZGV4T2YoJy4nKSA+IC0xID8gcGFyc2VGbG9hdCh2YWx1ZSkgOiBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShvbmx5U2VsZiwgdHJ1ZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEF0b21pY1Byb3BlcnR5IH0gZnJvbSAnLi9hdG9taWNwcm9wZXJ0eSc7XG5cbmV4cG9ydCBjbGFzcyBTdHJpbmdQcm9wZXJ0eSBleHRlbmRzIEF0b21pY1Byb3BlcnR5IHtcblxuICBmYWxsYmFja1ZhbHVlKCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBBdG9taWNQcm9wZXJ0eSB9IGZyb20gJy4vYXRvbWljcHJvcGVydHknO1xuXG5leHBvcnQgY2xhc3MgQm9vbGVhblByb3BlcnR5IGV4dGVuZHMgQXRvbWljUHJvcGVydHkge1xuXG4gIGZhbGxiYWNrVmFsdWUoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7UHJvcGVydHlHcm91cH0gZnJvbSAnLi9mb3JtcHJvcGVydHknO1xuaW1wb3J0IHtGb3JtUHJvcGVydHlGYWN0b3J5fSBmcm9tICcuL2Zvcm1wcm9wZXJ0eWZhY3RvcnknO1xuaW1wb3J0IHtTY2hlbWFWYWxpZGF0b3JGYWN0b3J5fSBmcm9tICcuLi9zY2hlbWF2YWxpZGF0b3JmYWN0b3J5JztcbmltcG9ydCB7VmFsaWRhdG9yUmVnaXN0cnl9IGZyb20gJy4vdmFsaWRhdG9ycmVnaXN0cnknO1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0UHJvcGVydHkgZXh0ZW5kcyBQcm9wZXJ0eUdyb3VwIHtcblxuICBwcml2YXRlIHByb3BlcnRpZXNJZDogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvcm1Qcm9wZXJ0eUZhY3Rvcnk6IEZvcm1Qcm9wZXJ0eUZhY3RvcnksXG4gICAgICAgICAgICAgIHNjaGVtYVZhbGlkYXRvckZhY3Rvcnk6IFNjaGVtYVZhbGlkYXRvckZhY3RvcnksXG4gICAgICAgICAgICAgIHZhbGlkYXRvclJlZ2lzdHJ5OiBWYWxpZGF0b3JSZWdpc3RyeSxcbiAgICAgICAgICAgICAgc2NoZW1hOiBhbnksXG4gICAgICAgICAgICAgIHBhcmVudDogUHJvcGVydHlHcm91cCxcbiAgICAgICAgICAgICAgcGF0aDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NoZW1hVmFsaWRhdG9yRmFjdG9yeSwgdmFsaWRhdG9yUmVnaXN0cnksIHNjaGVtYSwgcGFyZW50LCBwYXRoKTtcbiAgICB0aGlzLmNyZWF0ZVByb3BlcnRpZXMoKTtcbiAgfVxuXG4gIHNldFZhbHVlKHZhbHVlOiBhbnksIG9ubHlTZWxmOiBib29sZWFuKSB7XG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eUlkIGluIHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUuaGFzT3duUHJvcGVydHkocHJvcGVydHlJZCkpIHtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzW3Byb3BlcnR5SWRdLnNldFZhbHVlKHZhbHVlW3Byb3BlcnR5SWRdLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KG9ubHlTZWxmLCB0cnVlKTtcbiAgfVxuXG4gIHJlc2V0KHZhbHVlOiBhbnksIG9ubHlTZWxmID0gdHJ1ZSkge1xuICAgIHZhbHVlID0gdmFsdWUgfHwgdGhpcy5zY2hlbWEuZGVmYXVsdCB8fCB7fTtcbiAgICB0aGlzLnJlc2V0UHJvcGVydGllcyh2YWx1ZSk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KG9ubHlTZWxmLCB0cnVlKTtcbiAgfVxuXG4gIHJlc2V0UHJvcGVydGllcyh2YWx1ZTogYW55KSB7XG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eUlkIGluIHRoaXMuc2NoZW1hLnByb3BlcnRpZXMpIHtcbiAgICAgIGlmICh0aGlzLnNjaGVtYS5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5SWQpKSB7XG4gICAgICAgIHRoaXMucHJvcGVydGllc1twcm9wZXJ0eUlkXS5yZXNldCh2YWx1ZVtwcm9wZXJ0eUlkXSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlUHJvcGVydGllcygpIHtcbiAgICB0aGlzLnByb3BlcnRpZXMgPSB7fTtcbiAgICB0aGlzLnByb3BlcnRpZXNJZCA9IFtdO1xuICAgIGZvciAoY29uc3QgcHJvcGVydHlJZCBpbiB0aGlzLnNjaGVtYS5wcm9wZXJ0aWVzKSB7XG4gICAgICBpZiAodGhpcy5zY2hlbWEucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eUlkKSkge1xuICAgICAgICBjb25zdCBwcm9wZXJ0eVNjaGVtYSA9IHRoaXMuc2NoZW1hLnByb3BlcnRpZXNbcHJvcGVydHlJZF07XG4gICAgICAgIHRoaXMucHJvcGVydGllc1twcm9wZXJ0eUlkXSA9IHRoaXMuZm9ybVByb3BlcnR5RmFjdG9yeS5jcmVhdGVQcm9wZXJ0eShwcm9wZXJ0eVNjaGVtYSwgdGhpcywgcHJvcGVydHlJZCk7XG4gICAgICAgIHRoaXMucHJvcGVydGllc0lkLnB1c2gocHJvcGVydHlJZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIF9oYXNWYWx1ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISFPYmplY3Qua2V5cyh0aGlzLnZhbHVlKS5sZW5ndGg7XG4gIH1cblxuICBwdWJsaWMgX3VwZGF0ZVZhbHVlKCkge1xuICAgIHRoaXMucmVkdWNlVmFsdWUoKTtcbiAgfVxuXG4gIHB1YmxpYyBfcnVuVmFsaWRhdGlvbigpIHtcbiAgICBzdXBlci5fcnVuVmFsaWRhdGlvbigpO1xuXG4gICAgaWYgKHRoaXMuX2Vycm9ycykge1xuICAgICAgdGhpcy5fZXJyb3JzLmZvckVhY2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zdCBwcm9wID0gdGhpcy5zZWFyY2hQcm9wZXJ0eShlcnJvci5wYXRoLnNsaWNlKDEpKTtcbiAgICAgICAgaWYgKHByb3ApIHtcbiAgICAgICAgICBwcm9wLmV4dGVuZEVycm9ycyhlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVkdWNlVmFsdWUoKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWUgPSB7fTtcbiAgICB0aGlzLmZvckVhY2hDaGlsZCgocHJvcGVydHksIHByb3BlcnR5SWQ6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHByb3BlcnR5LnZpc2libGUgJiYgcHJvcGVydHkuX2hhc1ZhbHVlKCkpIHtcbiAgICAgICAgdmFsdWVbcHJvcGVydHlJZF0gPSBwcm9wZXJ0eS52YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICB9XG59XG4iLCJpbXBvcnQge0Zvcm1Qcm9wZXJ0eSwgUHJvcGVydHlHcm91cH0gZnJvbSAnLi9mb3JtcHJvcGVydHknO1xuaW1wb3J0IHtGb3JtUHJvcGVydHlGYWN0b3J5fSBmcm9tICcuL2Zvcm1wcm9wZXJ0eWZhY3RvcnknO1xuaW1wb3J0IHtTY2hlbWFWYWxpZGF0b3JGYWN0b3J5fSBmcm9tICcuLi9zY2hlbWF2YWxpZGF0b3JmYWN0b3J5JztcbmltcG9ydCB7VmFsaWRhdG9yUmVnaXN0cnl9IGZyb20gJy4vdmFsaWRhdG9ycmVnaXN0cnknO1xuXG5leHBvcnQgY2xhc3MgQXJyYXlQcm9wZXJ0eSBleHRlbmRzIFByb3BlcnR5R3JvdXAge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybVByb3BlcnR5RmFjdG9yeTogRm9ybVByb3BlcnR5RmFjdG9yeSxcbiAgICAgICAgICAgICAgc2NoZW1hVmFsaWRhdG9yRmFjdG9yeTogU2NoZW1hVmFsaWRhdG9yRmFjdG9yeSxcbiAgICAgICAgICAgICAgdmFsaWRhdG9yUmVnaXN0cnk6IFZhbGlkYXRvclJlZ2lzdHJ5LFxuICAgICAgICAgICAgICBzY2hlbWE6IGFueSxcbiAgICAgICAgICAgICAgcGFyZW50OiBQcm9wZXJ0eUdyb3VwLFxuICAgICAgICAgICAgICBwYXRoOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCB2YWxpZGF0b3JSZWdpc3RyeSwgc2NoZW1hLCBwYXJlbnQsIHBhdGgpO1xuICB9XG5cbiAgYWRkSXRlbSh2YWx1ZTogYW55ID0gbnVsbCk6IEZvcm1Qcm9wZXJ0eSB7XG4gICAgbGV0IG5ld1Byb3BlcnR5ID0gdGhpcy5hZGRQcm9wZXJ0eSgpO1xuICAgIG5ld1Byb3BlcnR5LnJlc2V0KHZhbHVlLCBmYWxzZSk7XG4gICAgcmV0dXJuIG5ld1Byb3BlcnR5O1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRQcm9wZXJ0eSgpIHtcbiAgICBsZXQgbmV3UHJvcGVydHkgPSB0aGlzLmZvcm1Qcm9wZXJ0eUZhY3RvcnkuY3JlYXRlUHJvcGVydHkodGhpcy5zY2hlbWEuaXRlbXMsIHRoaXMpO1xuICAgICg8Rm9ybVByb3BlcnR5W10+dGhpcy5wcm9wZXJ0aWVzKS5wdXNoKG5ld1Byb3BlcnR5KTtcbiAgICByZXR1cm4gbmV3UHJvcGVydHk7XG4gIH1cblxuICByZW1vdmVJdGVtKGl0ZW06IEZvcm1Qcm9wZXJ0eSkge1xuICAgIHRoaXMucHJvcGVydGllcyA9ICg8Rm9ybVByb3BlcnR5W10+dGhpcy5wcm9wZXJ0aWVzKS5maWx0ZXIoaSA9PiBpICE9PSBpdGVtKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoZmFsc2UsIHRydWUpO1xuICB9XG5cbiAgc2V0VmFsdWUodmFsdWU6IGFueSwgb25seVNlbGY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmNyZWF0ZVByb3BlcnRpZXMoKTtcbiAgICB0aGlzLnJlc2V0UHJvcGVydGllcyh2YWx1ZSk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KG9ubHlTZWxmLCB0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyBfaGFzVmFsdWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgX3VwZGF0ZVZhbHVlKCkge1xuICAgIHRoaXMucmVkdWNlVmFsdWUoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVkdWNlVmFsdWUoKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWUgPSBbXTtcbiAgICB0aGlzLmZvckVhY2hDaGlsZCgocHJvcGVydHksIF8pID0+IHtcbiAgICAgIGlmIChwcm9wZXJ0eS52aXNpYmxlICYmIHByb3BlcnR5Ll9oYXNWYWx1ZSgpKSB7XG4gICAgICAgIHZhbHVlLnB1c2gocHJvcGVydHkudmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gIH1cblxuICByZXNldCh2YWx1ZTogYW55LCBvbmx5U2VsZiA9IHRydWUpIHtcbiAgICB2YWx1ZSA9IHZhbHVlIHx8IHRoaXMuc2NoZW1hLmRlZmF1bHQgfHwgW107XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0gW107XG4gICAgdGhpcy5yZXNldFByb3BlcnRpZXModmFsdWUpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShvbmx5U2VsZiwgdHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVByb3BlcnRpZXMoKSB7XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0gW107XG4gIH1cblxuXG4gIHByaXZhdGUgcmVzZXRQcm9wZXJ0aWVzKHZhbHVlOiBhbnkpIHtcbiAgICBmb3IgKGxldCBpZHggaW4gdmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eShpZHgpKSB7XG4gICAgICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMuYWRkUHJvcGVydHkoKTtcbiAgICAgICAgcHJvcGVydHkucmVzZXQodmFsdWVbaWR4XSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge0Zvcm1Qcm9wZXJ0eSwgUHJvcGVydHlHcm91cH0gZnJvbSAnLi9mb3JtcHJvcGVydHknO1xuaW1wb3J0IHtOdW1iZXJQcm9wZXJ0eX0gZnJvbSAnLi9udW1iZXJwcm9wZXJ0eSc7XG5pbXBvcnQge1N0cmluZ1Byb3BlcnR5fSBmcm9tICcuL3N0cmluZ3Byb3BlcnR5JztcbmltcG9ydCB7Qm9vbGVhblByb3BlcnR5fSBmcm9tICcuL2Jvb2xlYW5wcm9wZXJ0eSc7XG5pbXBvcnQge09iamVjdFByb3BlcnR5fSBmcm9tICcuL29iamVjdHByb3BlcnR5JztcbmltcG9ydCB7QXJyYXlQcm9wZXJ0eX0gZnJvbSAnLi9hcnJheXByb3BlcnR5JztcbmltcG9ydCB7U2NoZW1hVmFsaWRhdG9yRmFjdG9yeX0gZnJvbSAnLi4vc2NoZW1hdmFsaWRhdG9yZmFjdG9yeSc7XG5pbXBvcnQge1ZhbGlkYXRvclJlZ2lzdHJ5fSBmcm9tICcuL3ZhbGlkYXRvcnJlZ2lzdHJ5JztcbmltcG9ydCB7UHJvcGVydHlCaW5kaW5nUmVnaXN0cnl9IGZyb20gJy4uL3Byb3BlcnR5LWJpbmRpbmctcmVnaXN0cnknO1xuXG5leHBvcnQgY2xhc3MgRm9ybVByb3BlcnR5RmFjdG9yeSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzY2hlbWFWYWxpZGF0b3JGYWN0b3J5OiBTY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCBwcml2YXRlIHZhbGlkYXRvclJlZ2lzdHJ5OiBWYWxpZGF0b3JSZWdpc3RyeSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeTogUHJvcGVydHlCaW5kaW5nUmVnaXN0cnkpIHtcbiAgfVxuXG4gIGNyZWF0ZVByb3BlcnR5KHNjaGVtYTogYW55LCBwYXJlbnQ6IFByb3BlcnR5R3JvdXAgPSBudWxsLCBwcm9wZXJ0eUlkPzogc3RyaW5nKTogRm9ybVByb3BlcnR5IHtcbiAgICBsZXQgbmV3UHJvcGVydHkgPSBudWxsO1xuICAgIGxldCBwYXRoID0gJyc7XG4gICAgbGV0IF9jYW5vbmljYWxQYXRoID0gJyc7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgcGF0aCArPSBwYXJlbnQucGF0aDtcbiAgICAgIGlmIChwYXJlbnQucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHBhdGggKz0gJy8nO1xuICAgICAgICBfY2Fub25pY2FsUGF0aCArPSAnLyc7XG4gICAgICB9XG4gICAgICBpZiAocGFyZW50LnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHBhdGggKz0gcHJvcGVydHlJZDtcbiAgICAgICAgX2Nhbm9uaWNhbFBhdGggKz0gcHJvcGVydHlJZDtcbiAgICAgIH0gZWxzZSBpZiAocGFyZW50LnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgICAgcGF0aCArPSAnKic7XG4gICAgICAgIF9jYW5vbmljYWxQYXRoICs9ICcqJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93ICdJbnN0YW5jaWF0aW9uIG9mIGEgRm9ybVByb3BlcnR5IHdpdGggYW4gdW5rbm93biBwYXJlbnQgdHlwZTogJyArIHBhcmVudC50eXBlO1xuICAgICAgfVxuICAgICAgX2Nhbm9uaWNhbFBhdGggPSAocGFyZW50Ll9jYW5vbmljYWxQYXRoIHx8IHBhcmVudC5wYXRoKSArIF9jYW5vbmljYWxQYXRoO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXRoID0gJy8nO1xuICAgICAgX2Nhbm9uaWNhbFBhdGggPSAnLyc7XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYS4kcmVmKSB7XG4gICAgICBjb25zdCByZWZTY2hlbWEgPSB0aGlzLnNjaGVtYVZhbGlkYXRvckZhY3RvcnkuZ2V0U2NoZW1hKHBhcmVudC5yb290LnNjaGVtYSwgc2NoZW1hLiRyZWYpO1xuICAgICAgbmV3UHJvcGVydHkgPSB0aGlzLmNyZWF0ZVByb3BlcnR5KHJlZlNjaGVtYSwgcGFyZW50LCBwYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpdGNoIChzY2hlbWEudHlwZSkge1xuICAgICAgICBjYXNlICdpbnRlZ2VyJzpcbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICBuZXdQcm9wZXJ0eSA9IG5ldyBOdW1iZXJQcm9wZXJ0eSh0aGlzLnNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHRoaXMudmFsaWRhdG9yUmVnaXN0cnksIHNjaGVtYSwgcGFyZW50LCBwYXRoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICBuZXdQcm9wZXJ0eSA9IG5ldyBTdHJpbmdQcm9wZXJ0eSh0aGlzLnNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHRoaXMudmFsaWRhdG9yUmVnaXN0cnksIHNjaGVtYSwgcGFyZW50LCBwYXRoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgbmV3UHJvcGVydHkgPSBuZXcgQm9vbGVhblByb3BlcnR5KHRoaXMuc2NoZW1hVmFsaWRhdG9yRmFjdG9yeSwgdGhpcy52YWxpZGF0b3JSZWdpc3RyeSwgc2NoZW1hLCBwYXJlbnQsIHBhdGgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgIG5ld1Byb3BlcnR5ID0gbmV3IE9iamVjdFByb3BlcnR5KHRoaXMsIHRoaXMuc2NoZW1hVmFsaWRhdG9yRmFjdG9yeSwgdGhpcy52YWxpZGF0b3JSZWdpc3RyeSwgc2NoZW1hLCBwYXJlbnQsIHBhdGgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgICAgbmV3UHJvcGVydHkgPSBuZXcgQXJyYXlQcm9wZXJ0eSh0aGlzLCB0aGlzLnNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHRoaXMudmFsaWRhdG9yUmVnaXN0cnksIHNjaGVtYSwgcGFyZW50LCBwYXRoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBVbmRlZmluZWQgdHlwZSAke3NjaGVtYS50eXBlfWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIG5ld1Byb3BlcnR5Ll9wcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeSA9IHRoaXMucHJvcGVydHlCaW5kaW5nUmVnaXN0cnk7XG4gICAgbmV3UHJvcGVydHkuX2Nhbm9uaWNhbFBhdGggPSBfY2Fub25pY2FsUGF0aDtcblxuICAgIGlmIChuZXdQcm9wZXJ0eSBpbnN0YW5jZW9mIFByb3BlcnR5R3JvdXApIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZVJvb3QobmV3UHJvcGVydHkpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdQcm9wZXJ0eTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVJvb3Qocm9vdFByb3BlcnR5OiBQcm9wZXJ0eUdyb3VwKSB7XG4gICAgcm9vdFByb3BlcnR5LnJlc2V0KG51bGwsIHRydWUpO1xuICAgIHJvb3RQcm9wZXJ0eS5fYmluZFZpc2liaWxpdHkoKTtcbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGlzUHJlc2VudChvKSB7XG4gIHJldHVybiBvICE9PSBudWxsICYmIG8gIT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmxhbmsobykge1xuICByZXR1cm4gbyA9PT0gbnVsbCB8fCBvID09PSB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQge2lzQmxhbmt9IGZyb20gJy4vdXRpbHMnO1xuXG5mdW5jdGlvbiBmb3JtYXRNZXNzYWdlKG1lc3NhZ2UsIHBhdGgpIHtcbiAgcmV0dXJuIGBQYXJzaW5nIGVycm9yIG9uICR7cGF0aH06ICR7bWVzc2FnZX1gO1xufVxuXG5mdW5jdGlvbiBzY2hlbWFFcnJvcihtZXNzYWdlLCBwYXRoKTogdm9pZCB7XG4gIGxldCBtZXNnID0gZm9ybWF0TWVzc2FnZShtZXNzYWdlLCBwYXRoKTtcbiAgdGhyb3cgbmV3IEVycm9yKG1lc2cpO1xufVxuXG5mdW5jdGlvbiBzY2hlbWFXYXJuaW5nKG1lc3NhZ2UsIHBhdGgpOiB2b2lkIHtcbiAgbGV0IG1lc2cgPSBmb3JtYXRNZXNzYWdlKG1lc3NhZ2UsIHBhdGgpO1xuICB0aHJvdyBuZXcgRXJyb3IobWVzZyk7XG59XG5cbmV4cG9ydCBjbGFzcyBTY2hlbWFQcmVwcm9jZXNzb3Ige1xuXG4gIHN0YXRpYyBwcmVwcm9jZXNzKGpzb25TY2hlbWE6IGFueSwgcGF0aCA9ICcvJyk6IGFueSB7XG4gICAganNvblNjaGVtYSA9IGpzb25TY2hlbWEgfHwge307XG4gICAgU2NoZW1hUHJlcHJvY2Vzc29yLm5vcm1hbGl6ZUV4dGVuc2lvbnMoanNvblNjaGVtYSk7XG4gICAgaWYgKGpzb25TY2hlbWEudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5jaGVja1Byb3BlcnRpZXMoanNvblNjaGVtYSwgcGF0aCk7XG4gICAgICBTY2hlbWFQcmVwcm9jZXNzb3IuY2hlY2tBbmRDcmVhdGVGaWVsZHNldHMoanNvblNjaGVtYSwgcGF0aCk7XG4gICAgfSBlbHNlIGlmIChqc29uU2NoZW1hLnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5jaGVja0l0ZW1zKGpzb25TY2hlbWEsIHBhdGgpO1xuICAgIH1cbiAgICBTY2hlbWFQcmVwcm9jZXNzb3Iubm9ybWFsaXplV2lkZ2V0KGpzb25TY2hlbWEpO1xuICAgIFNjaGVtYVByZXByb2Nlc3Nvci5yZWN1cnNpdmVDaGVjayhqc29uU2NoZW1hLCBwYXRoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNoZWNrUHJvcGVydGllcyhqc29uU2NoZW1hLCBwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoaXNCbGFuayhqc29uU2NoZW1hLnByb3BlcnRpZXMpKSB7XG4gICAgICBqc29uU2NoZW1hLnByb3BlcnRpZXMgPSB7fTtcbiAgICAgIHNjaGVtYVdhcm5pbmcoJ1Byb3ZpZGVkIGpzb24gc2NoZW1hIGRvZXMgbm90IGNvbnRhaW4gYSBcXCdwcm9wZXJ0aWVzXFwnIGVudHJ5LiBPdXRwdXQgc2NoZW1hIHdpbGwgYmUgZW1wdHknLCBwYXRoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjaGVja0FuZENyZWF0ZUZpZWxkc2V0cyhqc29uU2NoZW1hOiBhbnksIHBhdGg6IHN0cmluZykge1xuICAgIGlmIChqc29uU2NoZW1hLmZpZWxkc2V0cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoanNvblNjaGVtYS5vcmRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5yZXBsYWNlT3JkZXJCeUZpZWxkc2V0cyhqc29uU2NoZW1hKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5jcmVhdGVGaWVsZHNldHMoanNvblNjaGVtYSk7XG4gICAgICB9XG4gICAgfVxuICAgIFNjaGVtYVByZXByb2Nlc3Nvci5jaGVja0ZpZWxkc1VzYWdlKGpzb25TY2hlbWEsIHBhdGgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgY2hlY2tGaWVsZHNVc2FnZShqc29uU2NoZW1hLCBwYXRoOiBzdHJpbmcpIHtcbiAgICBsZXQgZmllbGRzSWQ6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoanNvblNjaGVtYS5wcm9wZXJ0aWVzKTtcbiAgICBsZXQgdXNlZEZpZWxkcyA9IHt9O1xuICAgIGZvciAobGV0IGZpZWxkc2V0IG9mIGpzb25TY2hlbWEuZmllbGRzZXRzKSB7XG4gICAgICBmb3IgKGxldCBmaWVsZElkIG9mIGZpZWxkc2V0LmZpZWxkcykge1xuICAgICAgICBpZiAodXNlZEZpZWxkc1tmaWVsZElkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdXNlZEZpZWxkc1tmaWVsZElkXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHVzZWRGaWVsZHNbZmllbGRJZF0ucHVzaChmaWVsZHNldC5pZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBmaWVsZElkIG9mIGZpZWxkc0lkKSB7XG4gICAgICBjb25zdCBpc1JlcXVpcmVkID0ganNvblNjaGVtYS5yZXF1aXJlZCAmJiBqc29uU2NoZW1hLnJlcXVpcmVkLmluZGV4T2YoZmllbGRJZCkgPiAtMTtcbiAgICAgIGlmIChpc1JlcXVpcmVkICYmIGpzb25TY2hlbWEucHJvcGVydGllc1tmaWVsZElkXSkge1xuICAgICAgICBqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF0uaXNSZXF1aXJlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAodXNlZEZpZWxkcy5oYXNPd25Qcm9wZXJ0eShmaWVsZElkKSkge1xuICAgICAgICBpZiAodXNlZEZpZWxkc1tmaWVsZElkXS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgc2NoZW1hRXJyb3IoYCR7ZmllbGRJZH0gaXMgcmVmZXJlbmNlZCBieSBtb3JlIHRoYW4gb25lIGZpZWxkc2V0OiAke3VzZWRGaWVsZHNbZmllbGRJZF19YCwgcGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHVzZWRGaWVsZHNbZmllbGRJZF07XG4gICAgICB9IGVsc2UgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgc2NoZW1hRXJyb3IoYCR7ZmllbGRJZH0gaXMgYSByZXF1aXJlZCBmaWVsZCBidXQgaXQgaXMgbm90IHJlZmVyZW5jZWQgYXMgcGFydCBvZiBhICdvcmRlcicgb3IgYSAnZmllbGRzZXQnIHByb3BlcnR5YCwgcGF0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUganNvblNjaGVtYVtmaWVsZElkXTtcbiAgICAgICAgc2NoZW1hV2FybmluZyhgUmVtb3ZpbmcgdW5yZWZlcmVuY2VkIGZpZWxkICR7ZmllbGRJZH1gLCBwYXRoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCByZW1haW5pbmdmaWVsZHNJZCBpbiB1c2VkRmllbGRzKSB7XG4gICAgICBpZiAodXNlZEZpZWxkcy5oYXNPd25Qcm9wZXJ0eShyZW1haW5pbmdmaWVsZHNJZCkpIHtcbiAgICAgICAgc2NoZW1hV2FybmluZyhgUmVmZXJlbmNpbmcgbm9uLWV4aXN0ZW50IGZpZWxkICR7cmVtYWluaW5nZmllbGRzSWR9IGluIG9uZSBvciBtb3JlIGZpZWxkc2V0c2AsIHBhdGgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNyZWF0ZUZpZWxkc2V0cyhqc29uU2NoZW1hKSB7XG4gICAganNvblNjaGVtYS5vcmRlciA9IE9iamVjdC5rZXlzKGpzb25TY2hlbWEucHJvcGVydGllcyk7XG4gICAgU2NoZW1hUHJlcHJvY2Vzc29yLnJlcGxhY2VPcmRlckJ5RmllbGRzZXRzKGpzb25TY2hlbWEpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVwbGFjZU9yZGVyQnlGaWVsZHNldHMoanNvblNjaGVtYSkge1xuICAgIGpzb25TY2hlbWEuZmllbGRzZXRzID0gW3tcbiAgICAgIGlkOiAnZmllbGRzZXQtZGVmYXVsdCcsXG4gICAgICB0aXRsZToganNvblNjaGVtYS50aXRsZSB8fCAnJyxcbiAgICAgIGRlc2NyaXB0aW9uOiBqc29uU2NoZW1hLmRlc2NyaXB0aW9uIHx8ICcnLFxuICAgICAgbmFtZToganNvblNjaGVtYS5uYW1lIHx8ICcnLFxuICAgICAgZmllbGRzOiBqc29uU2NoZW1hLm9yZGVyXG4gICAgfV07XG4gICAgZGVsZXRlIGpzb25TY2hlbWEub3JkZXI7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBub3JtYWxpemVXaWRnZXQoZmllbGRTY2hlbWE6IGFueSkge1xuICAgIGxldCB3aWRnZXQgPSBmaWVsZFNjaGVtYS53aWRnZXQ7XG4gICAgaWYgKHdpZGdldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB3aWRnZXQgPSB7J2lkJzogZmllbGRTY2hlbWEudHlwZX07XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygd2lkZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgd2lkZ2V0ID0geydpZCc6IHdpZGdldH07XG4gICAgfVxuICAgIGZpZWxkU2NoZW1hLndpZGdldCA9IHdpZGdldDtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNoZWNrSXRlbXMoanNvblNjaGVtYSwgcGF0aCkge1xuICAgIGlmIChqc29uU2NoZW1hLml0ZW1zID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjaGVtYUVycm9yKCdObyBcXCdpdGVtc1xcJyBwcm9wZXJ0eSBpbiBhcnJheScsIHBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHJlY3Vyc2l2ZUNoZWNrKGpzb25TY2hlbWEsIHBhdGg6IHN0cmluZykge1xuICAgIGlmIChqc29uU2NoZW1hLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBmb3IgKGxldCBmaWVsZElkIGluIGpzb25TY2hlbWEucHJvcGVydGllcykge1xuICAgICAgICBpZiAoanNvblNjaGVtYS5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGZpZWxkSWQpKSB7XG4gICAgICAgICAgbGV0IGZpZWxkU2NoZW1hID0ganNvblNjaGVtYS5wcm9wZXJ0aWVzW2ZpZWxkSWRdO1xuICAgICAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5wcmVwcm9jZXNzKGZpZWxkU2NoZW1hLCBwYXRoICsgZmllbGRJZCArICcvJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChqc29uU2NoZW1hLmhhc093blByb3BlcnR5KCdkZWZpbml0aW9ucycpKSB7XG4gICAgICAgIGZvciAobGV0IGZpZWxkSWQgaW4ganNvblNjaGVtYS5kZWZpbml0aW9ucykge1xuICAgICAgICAgIGlmIChqc29uU2NoZW1hLmRlZmluaXRpb25zLmhhc093blByb3BlcnR5KGZpZWxkSWQpKSB7XG4gICAgICAgICAgICBsZXQgZmllbGRTY2hlbWEgPSBqc29uU2NoZW1hLmRlZmluaXRpb25zW2ZpZWxkSWRdO1xuICAgICAgICAgICAgU2NoZW1hUHJlcHJvY2Vzc29yLnJlbW92ZVJlY3Vyc2l2ZVJlZlByb3BlcnRpZXMoZmllbGRTY2hlbWEsIGAjL2RlZmluaXRpb25zLyR7ZmllbGRJZH1gKTtcbiAgICAgICAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5wcmVwcm9jZXNzKGZpZWxkU2NoZW1hLCBwYXRoICsgZmllbGRJZCArICcvJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChqc29uU2NoZW1hLnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5wcmVwcm9jZXNzKGpzb25TY2hlbWEuaXRlbXMsIHBhdGggKyAnKi8nKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyByZW1vdmVSZWN1cnNpdmVSZWZQcm9wZXJ0aWVzKGpzb25TY2hlbWEsIGRlZmluaXRpb25QYXRoKSB7XG4gICAgLy8gdG8gYXZvaWQgaW5maW5pdGUgbG9vcFxuICAgIGlmIChqc29uU2NoZW1hLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBmb3IgKGxldCBmaWVsZElkIGluIGpzb25TY2hlbWEucHJvcGVydGllcykge1xuICAgICAgICBpZiAoanNvblNjaGVtYS5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGZpZWxkSWQpKSB7XG4gICAgICAgICAgaWYgKGpzb25TY2hlbWEucHJvcGVydGllc1tmaWVsZElkXS4kcmVmXG4gICAgICAgICAgICAmJiBqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF0uJHJlZiA9PT0gZGVmaW5pdGlvblBhdGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF07XG4gICAgICAgICAgfSBlbHNlIGlmIChqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF0udHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5yZW1vdmVSZWN1cnNpdmVSZWZQcm9wZXJ0aWVzKGpzb25TY2hlbWEucHJvcGVydGllc1tmaWVsZElkXSwgZGVmaW5pdGlvblBhdGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgLyoqXG4gICAqIEVuYWJsZXMgYWxpYXMgbmFtZXMgZm9yIEpTT04gc2NoZW1hIGV4dGVuc2lvbnMuXG4gICAqXG4gICAqIENvcGllcyB0aGUgdmFsdWUgb2YgZWFjaCBhbGlhcyBKU09OIHNjaGVtYSBwcm9wZXJ0eVxuICAgKiB0byB0aGUgSlNPTiBzY2hlbWEgcHJvcGVydHkgb2Ygbmd4LXNjaGVtYS1mb3JtLlxuICAgKlxuICAgKiBAcGFyYW0gc2NoZW1hIEpTT04gc2NoZW1hIHRvIGVuYWJsZSBhbGlhcyBuYW1lcy5cbiAgICovXG4gIHByaXZhdGUgc3RhdGljIG5vcm1hbGl6ZUV4dGVuc2lvbnMoc2NoZW1hOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBleHRlbnNpb25zID0gW1xuICAgICAgICB7IG5hbWU6IFwiZmllbGRzZXRzXCIsIHJlZ2V4OiAvXngtP2ZpZWxkLT9zZXRzJC9pIH0sXG4gICAgICAgIHsgbmFtZTogXCJ3aWRnZXRcIiwgICAgcmVnZXg6IC9eeC0/d2lkZ2V0JC9pIH0sXG4gICAgICAgIHsgbmFtZTogXCJ2aXNpYmxlSWZcIiwgcmVnZXg6IC9eeC0/dmlzaWJsZS0/aWYkL2kgfVxuICAgIF07XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNjaGVtYSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICBsZXQgayA9IGtleXNbaV07XG4gICAgICBsZXQgZSA9IGV4dGVuc2lvbnMuZmluZChlID0+ICEhay5tYXRjaChlLnJlZ2V4KSk7XG4gICAgICBpZiAoZSkge1xuICAgICAgICBsZXQgdiA9IHNjaGVtYVtrXTtcbiAgICAgICAgbGV0IGNvcHkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHYpKTtcbiAgICAgICAgc2NoZW1hW2UubmFtZV0gPSBjb3B5O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICcuL3ZhbGlkYXRvcic7XG5cbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3JSZWdpc3RyeSB7XG4gIHByaXZhdGUgdmFsaWRhdG9yczogVmFsaWRhdG9yW10gPSBbXTtcblxuICByZWdpc3RlcihwYXRoOiBzdHJpbmcsIHZhbGlkYXRvcjogVmFsaWRhdG9yKSB7XG4gICAgdGhpcy52YWxpZGF0b3JzW3BhdGhdID0gdmFsaWRhdG9yO1xuICB9XG5cbiAgZ2V0KHBhdGg6IHN0cmluZyk6IFZhbGlkYXRvciB7XG4gICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yc1twYXRoXTtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMudmFsaWRhdG9ycyA9IFtdO1xuICB9XG59XG4iLCJpbXBvcnQge0JpbmRpbmd9IGZyb20gJy4vYmluZGluZyc7XG5cbmV4cG9ydCBjbGFzcyBCaW5kaW5nUmVnaXN0cnkge1xuICBiaW5kaW5nczogQmluZGluZ1tdID0gW107XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5iaW5kaW5ncyA9IFtdO1xuICB9XG5cbiAgcmVnaXN0ZXIocGF0aDogc3RyaW5nLCBiaW5kaW5nOiBCaW5kaW5nIHwgQmluZGluZ1tdKSB7XG4gICAgdGhpcy5iaW5kaW5nc1twYXRoXSA9IFtdLmNvbmNhdChiaW5kaW5nKTtcbiAgfVxuXG4gIGdldChwYXRoOiBzdHJpbmcpOiBCaW5kaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmJpbmRpbmdzW3BhdGhdO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBaU2NoZW1hIGZyb20gJ3otc2NoZW1hJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNjaGVtYVZhbGlkYXRvckZhY3Rvcnkge1xuICBhYnN0cmFjdCBjcmVhdGVWYWxpZGF0b3JGbihzY2hlbWEpOiAodmFsdWU6IGFueSkgPT4gYW55O1xuXG4gIGFic3RyYWN0IGdldFNjaGVtYShzY2hlbWEsIHJlZik6IGFueTtcblxuICAvKipcbiAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcmVzZXQgdGhlIHNjaGVtYSB2YWxpZGF0b3IgaW5zdGFuY2UuPGJyLz5cbiAgICogVGhpcyBtYXkgYmUgcmVxdWlyZWQgc2luY2Ugc29tZSBzY2hlbWEgdmFsaWRhdG9ycyBrZWVwIGEgZGVlcCBjb3B5PGJyLz5cbiAgICogb2YgeW91ciBzY2hlbWFzIGFuZCBjaGFuZ2VzIGF0IHJ1bnRpbWUgYXJlIG5vdCByZWNvZ25pemVkIGJ5IHRoZSBzY2hlbWEgdmFsaWRhdG9yLjxici8+XG4gICAqIEluIHRoaXMgbWV0aG9kIHlvdSBzaG91bGQgZWl0aGVyIHJlLWluc3RhbnRpYXRlIHRoZSBzY2hlbWEgdmFsaWRhdG9yIG9yXG4gICAqIGNsZWFyIGl0cyBjYWNoZS48YnIvPlxuICAgKiBFeGFtcGxlIG9mIHJlLWluc3RhbnRpYXRpbmcgc2NoZW1hIHZhbGlkYXRvclxuICAgKiA8Y29kZT5cbiAgICogICAgIHJlc2V0KCl7XG4gICAqICAgICAgICAgdGhpcy56c2NoZW1hID0gbmV3IFpTY2hlbWEoe30pXG4gICAqICAgICB9XG4gICAqIDwvY29kZT5cbiAgICogPGJyLz5cbiAgICogU2luY2UgdGhpcyBtZXRob2QgaXQgc2VsZiBkb2VzIG5vdGhpbmcgdGhlcmUgaXMgPGJyLz5cbiAgICogbm8gbmVlZCB0byBjYWxsIHRoZSA8Y29kZT5zdXBlci5yZXNldCgpPC9jb2RlPlxuICAgKi9cbiAgcmVzZXQoKSB7XG5cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgWlNjaGVtYVZhbGlkYXRvckZhY3RvcnkgZXh0ZW5kcyBTY2hlbWFWYWxpZGF0b3JGYWN0b3J5IHtcblxuICBwcm90ZWN0ZWQgenNjaGVtYTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY3JlYXRlU2NoZW1hVmFsaWRhdG9yKClcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlU2NoZW1hVmFsaWRhdG9yKCkge1xuICAgIHRoaXMuenNjaGVtYSA9ICBuZXcgWlNjaGVtYSh7XG4gICAgICBicmVha09uRmlyc3RFcnJvcjogZmFsc2VcbiAgICB9KTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuY3JlYXRlU2NoZW1hVmFsaWRhdG9yKClcbiAgfVxuXG4gIGNyZWF0ZVZhbGlkYXRvckZuKHNjaGVtYTogYW55KSB7XG4gICAgcmV0dXJuICh2YWx1ZSk6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9ID0+IHtcblxuICAgICAgaWYgKHNjaGVtYS50eXBlID09PSAnbnVtYmVyJyB8fCBzY2hlbWEudHlwZSA9PT0gJ2ludGVnZXInKSB7XG4gICAgICAgIHZhbHVlID0gK3ZhbHVlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnpzY2hlbWEudmFsaWRhdGUodmFsdWUsIHNjaGVtYSk7XG4gICAgICBsZXQgZXJyID0gdGhpcy56c2NoZW1hLmdldExhc3RFcnJvcnMoKTtcblxuICAgICAgdGhpcy5kZW5vcm1hbGl6ZVJlcXVpcmVkUHJvcGVydHlQYXRocyhlcnIpO1xuXG4gICAgICByZXR1cm4gZXJyIHx8IG51bGw7XG4gICAgfTtcbiAgfVxuXG4gIGdldFNjaGVtYShzY2hlbWE6IGFueSwgcmVmOiBzdHJpbmcpIHtcbiAgICAvLyBjaGVjayBkZWZpbml0aW9ucyBhcmUgdmFsaWRcbiAgICBjb25zdCBpc1ZhbGlkID0gdGhpcy56c2NoZW1hLmNvbXBpbGVTY2hlbWEoc2NoZW1hKTtcbiAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0RGVmaW5pdGlvbihzY2hlbWEsIHJlZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IHRoaXMuenNjaGVtYS5nZXRMYXN0RXJyb3IoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlbm9ybWFsaXplUmVxdWlyZWRQcm9wZXJ0eVBhdGhzKGVycjogYW55W10pIHtcbiAgICBpZiAoZXJyICYmIGVyci5sZW5ndGgpIHtcbiAgICAgIGVyciA9IGVyci5tYXAoZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IucGF0aCA9PT0gJyMvJyAmJiBlcnJvci5jb2RlID09PSAnT0JKRUNUX01JU1NJTkdfUkVRVUlSRURfUFJPUEVSVFknKSB7XG4gICAgICAgICAgZXJyb3IucGF0aCA9IGAke2Vycm9yLnBhdGh9JHtlcnJvci5wYXJhbXNbMF19YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldERlZmluaXRpb24oc2NoZW1hOiBhbnksIHJlZjogc3RyaW5nKSB7XG4gICAgbGV0IGZvdW5kU2NoZW1hID0gc2NoZW1hO1xuICAgIHJlZi5zcGxpdCgnLycpLnNsaWNlKDEpLmZvckVhY2gocHRyID0+IHtcbiAgICAgIGlmIChwdHIpIHtcbiAgICAgICAgZm91bmRTY2hlbWEgPSBmb3VuZFNjaGVtYVtwdHJdO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmb3VuZFNjaGVtYTtcbiAgfVxufVxuXG4iLCJleHBvcnQgY2xhc3MgV2lkZ2V0UmVnaXN0cnkge1xuXG4gIHByaXZhdGUgd2lkZ2V0czogeyBbdHlwZTogc3RyaW5nXTogYW55IH0gPSB7fTtcblxuICBwcml2YXRlIGRlZmF1bHRXaWRnZXQ6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHNldERlZmF1bHRXaWRnZXQod2lkZ2V0OiBhbnkpIHtcbiAgICB0aGlzLmRlZmF1bHRXaWRnZXQgPSB3aWRnZXQ7XG4gIH1cblxuICBnZXREZWZhdWx0V2lkZ2V0KCkge1xuICAgIHJldHVybiB0aGlzLmRlZmF1bHRXaWRnZXQ7XG4gIH1cblxuICBoYXNXaWRnZXQodHlwZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMud2lkZ2V0cy5oYXNPd25Qcm9wZXJ0eSh0eXBlKTtcbiAgfVxuXG4gIHJlZ2lzdGVyKHR5cGU6IHN0cmluZywgd2lkZ2V0OiBhbnkpIHtcbiAgICB0aGlzLndpZGdldHNbdHlwZV0gPSB3aWRnZXQ7XG4gIH1cblxuICBnZXRXaWRnZXRUeXBlKHR5cGU6IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKHRoaXMuaGFzV2lkZ2V0KHR5cGUpKSB7XG4gICAgICByZXR1cm4gdGhpcy53aWRnZXRzW3R5cGVdO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kZWZhdWx0V2lkZ2V0O1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBWaWV3Q29udGFpbmVyUmVmLFxuICBDb21wb25lbnRSZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgSW5qZWN0YWJsZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgV2lkZ2V0UmVnaXN0cnkgfSBmcm9tICcuL3dpZGdldHJlZ2lzdHJ5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdpZGdldEZhY3Rvcnkge1xuXG4gIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjtcbiAgcHJpdmF0ZSByZWdpc3RyeTogV2lkZ2V0UmVnaXN0cnk7XG5cbiAgY29uc3RydWN0b3IocmVnaXN0cnk6IFdpZGdldFJlZ2lzdHJ5LCByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG4gICAgdGhpcy5yZWdpc3RyeSA9IHJlZ2lzdHJ5O1xuICAgIHRoaXMucmVzb2x2ZXIgPSByZXNvbHZlcjtcbiAgfVxuXG4gIGNyZWF0ZVdpZGdldChjb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsIHR5cGU6IHN0cmluZyk6IENvbXBvbmVudFJlZjxhbnk+IHtcbiAgICBsZXQgY29tcG9uZW50Q2xhc3MgPSB0aGlzLnJlZ2lzdHJ5LmdldFdpZGdldFR5cGUodHlwZSk7XG5cbiAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50Q2xhc3MpO1xuICAgIHJldHVybiBjb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUZXJtaW5hdG9yU2VydmljZSB7XG4gIHB1YmxpYyBvbkRlc3Ryb3k6IFN1YmplY3Q8Ym9vbGVhbj47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdCgpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLm9uRGVzdHJveS5uZXh0KHRydWUpO1xuICB9XG59XG4iLCIvKipcbiAqIEdlbmVyYWwgcHVycG9zZSBwcm9wZXJ5IGJpbmRpbmcgcmVnaXN0cnlcbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5IHtcblxuICBwcml2YXRlIGJpbmRpbmdzOiB7IFtrZXk6IHN0cmluZ106IFByb3BlcnR5QmluZGluZ3MgfSA9IHt9O1xuXG4gIGdldFByb3BlcnR5QmluZGluZ3ModHlwZTogUHJvcGVydHlCaW5kaW5nVHlwZXMpOiBQcm9wZXJ0eUJpbmRpbmdzIHtcbiAgICB0aGlzLmJpbmRpbmdzW3R5cGVdID0gdGhpcy5iaW5kaW5nc1t0eXBlXSB8fCBuZXcgUHJvcGVydHlCaW5kaW5ncygpO1xuICAgIHJldHVybiB0aGlzLmJpbmRpbmdzW3R5cGVdO1xuICB9XG5cbiAgZ2V0UHJvcGVydHlCaW5kaW5nc1Zpc2liaWxpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlCaW5kaW5ncyhQcm9wZXJ0eUJpbmRpbmdUeXBlcy52aXNpYmlsaXR5KTtcbiAgfVxufVxuXG4vKipcbiAqIERlZmluZXMgdGhlIHR5cGVzIG9mIHN1cHBvcnRlZCBwcm9wZXJ0eSBiaW5kaW5ncy48YnIvPlxuICogRm9yIG5vdyBvbmx5IDxjb2RlPnZpc2liaWxpdHk8L2NvZGU+IGlzIHN1cHBvcnRlZC48YnIvPlxuICovXG5leHBvcnQgZW51bSBQcm9wZXJ0eUJpbmRpbmdUeXBlcyB7XG4gIHZpc2liaWxpdHlcbn1cblxuLyoqXG4gKiBTdG9yYWdlIHRoYXQgaG9sZHMgYWxsIGJpbmRpbmdzIHRoYXQgYXJlIHByb3BlcnR5IHBhdGhzIHJlbGF0ZWQuPGJyLz5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5QmluZGluZ3Mge1xuICBzb3VyY2VzSW5kZXg6IFNpbXBsZVByb3BlcnR5SW5kZXhlciA9IG5ldyBTaW1wbGVQcm9wZXJ0eUluZGV4ZXIoKTtcbiAgZGVwZW5kZW5jaWVzSW5kZXg6IFNpbXBsZVByb3BlcnR5SW5kZXhlciA9IG5ldyBTaW1wbGVQcm9wZXJ0eUluZGV4ZXIoKTtcblxuICBhZGQoZGVwZW5kZW5jeVBhdGg6IHN0cmluZywgc291cmNlUHJvcGVydHlQYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNvdXJjZXNJbmRleC5zdG9yZShzb3VyY2VQcm9wZXJ0eVBhdGgsIGRlcGVuZGVuY3lQYXRoKTtcbiAgICB0aGlzLmRlcGVuZGVuY2llc0luZGV4LnN0b3JlKGRlcGVuZGVuY3lQYXRoLCBzb3VyY2VQcm9wZXJ0eVBhdGgpO1xuICB9XG5cbiAgZmluZEJ5RGVwZW5kZW5jeVBhdGgoZGVwZW5kZW5jeVBhdGg6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmRlcGVuZGVuY2llc0luZGV4LmZpbmQoZGVwZW5kZW5jeVBhdGgpO1xuICAgIHJlc3VsdC5yZXN1bHRzID0gcmVzdWx0LnJlc3VsdHMgfHwgW107XG4gICAgbGV0IHZhbHVlcyA9IFtdO1xuICAgIGZvciAoY29uc3QgcmVzIG9mIHJlc3VsdC5yZXN1bHRzKSB7XG4gICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KE9iamVjdC5rZXlzKHJlcy52YWx1ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0LmZvdW5kID8gdmFsdWVzIDogW107XG4gIH1cblxuICBnZXRCeVNvdXJjZVByb3BlcnR5UGF0aChzb3VyY2VQcm9wZXJ0eVBhdGg6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnNvdXJjZXNJbmRleC5maW5kKHNvdXJjZVByb3BlcnR5UGF0aCk7XG4gICAgcmVzdWx0LnJlc3VsdHMgPSByZXN1bHQucmVzdWx0cyB8fCBbXTtcbiAgICBsZXQgdmFsdWVzID0gW107XG4gICAgZm9yIChjb25zdCByZXMgb2YgcmVzdWx0LnJlc3VsdHMpIHtcbiAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQoT2JqZWN0LmtleXMocmVzLnZhbHVlKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQuZm91bmQgPyB2YWx1ZXMgOiBbXTtcbiAgfVxuXG4gIGNyZWF0ZVBhdGhJbmRleChwYXRoOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHBhdGguc3BsaXQoJy8nKTtcbiAgfVxufVxuXG4vKipcbiAqIFNpbXBsZSBpbmRleGVyIHRvIHN0b3JlIHByb3BlcnR5IHBhdGhzXG4gKi9cbmV4cG9ydCBjbGFzcyBTaW1wbGVQcm9wZXJ0eUluZGV4ZXIge1xuXG4gIHN0YXRpYyBNQVJLRVIgPSAnJF9fX192YWx1ZSc7XG4gIGluZGV4OiBvYmplY3QgPSB7fTtcbiAgZmluZE9ubHlXaXRoVmFsdWUgPSB0cnVlO1xuXG4gIHByaXZhdGUgX2NyZWF0ZVBhdGhJbmRleChwYXRoOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gcGF0aFxuICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCgnLy8nLCAnZycpLCAnLycpXG4gICAgICAucmVwbGFjZShuZXcgUmVnRXhwKCdeLycsICdnJyksICcnKVxuICAgICAgLnNwbGl0KCcvJykuZmlsdGVyKGl0ZW0gPT4gaXRlbSk7XG4gIH1cblxuICBzdG9yZShwcm9wZXJ0eVBhdGg6IHN0cmluZywgdmFsdWU/OiBhbnkpIHtcbiAgICB0aGlzLl9zdG9yZUluZGV4KHRoaXMuX2NyZWF0ZVBhdGhJbmRleChwcm9wZXJ0eVBhdGgpLCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9zdG9yZUluZGV4KHBhdGhJbmRleDogc3RyaW5nW10sIHZhbHVlPzogc3RyaW5nKSB7XG4gICAgbGV0IGluZGV4UG9zID0gdGhpcy5pbmRleDtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBwYXRoSW5kZXgpIHtcbiAgICAgIGluZGV4UG9zW2tleV0gPSBpbmRleFBvc1trZXldIHx8IHt9O1xuICAgICAgaW5kZXhQb3MgPSBpbmRleFBvc1trZXldO1xuICAgIH1cbiAgICBpZiAoaW5kZXhQb3MgJiYgdmFsdWUpIHtcbiAgICAgIGluZGV4UG9zW1NpbXBsZVByb3BlcnR5SW5kZXhlci5NQVJLRVJdID0gaW5kZXhQb3NbU2ltcGxlUHJvcGVydHlJbmRleGVyLk1BUktFUl0gfHwge307XG4gICAgICBpbmRleFBvc1tTaW1wbGVQcm9wZXJ0eUluZGV4ZXIuTUFSS0VSXVt2YWx1ZV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmluZCBwYXRoIGluIGluZGV4Ljxici8+XG4gICAqIFdpbGwgZmluZCBwYXRoIGxpa2U6PGJyLz5cbiAgICogPHVsPlxuICAgKiAgICAgPGxpPi9wcm9wZXJ0eS8wL3Byb3A8L2xpPlxuICAgKiAgICAgPGxpPi9wcm9wZXJ0eS8wL3Byb3AvMi90ZXN0PC9saT5cbiAgICogICAgIDxsaT4vcHJvcGVydHkvMC9wcm9wLyYjNDI7L3Rlc3Q8L2xpPlxuICAgKiAgICAgPGxpPi9wcm9wZXJ0eS8mIzQyOy9wcm9wLzEvdGVzdDwvbGk+XG4gICAqICAgICA8bGk+L3Byb3BlcnR5LyYjNDI7L3Byb3AvJiM0MjsvdGVzdDwvbGk+XG4gICAqICAgICA8bGk+L3Byb3BlcnR5LzEvcHJvcC8mIzQyOy90ZXN0PC9saT5cbiAgICogIDwvdWw+XG4gICAqIEBwYXJhbSBwYXRoXG4gICAqL1xuICBmaW5kKHBhdGg6IHN0cmluZyk6IEluZGV4ZXJSZXN1bHQge1xuICAgIHJldHVybiB0aGlzLl9maW5kSW5JbmRleCh0aGlzLl9jcmVhdGVQYXRoSW5kZXgocGF0aCkpO1xuICB9XG5cbiAgX2ZpbmRJbkluZGV4KHBhdGg6IHN0cmluZ1tdKTogSW5kZXhlclJlc3VsdCB7XG4gICAgY29uc3QgaXhSZXM6IEluZGV4ZXJSZXN1bHQgPSB7dGFyZ2V0OiBwYXRoLCBmb3VuZDogZmFsc2UsIHJlc3VsdHM6IFtdfTtcbiAgICB0aGlzLl9fZmluZEluZGV4KGl4UmVzLCBwYXRoLCB0aGlzLmluZGV4LCBbXSk7XG4gICAgcmV0dXJuIGl4UmVzO1xuICB9XG5cbiAgX19maW5kSW5kZXgoaW5kZXhlclJlc3VsdHM6IEluZGV4ZXJSZXN1bHQsIHBhdGg6IHN0cmluZ1tdLCBpbmRleDogb2JqZWN0LCBwYXJlbnQ/OiBzdHJpbmdbXSkge1xuXG4gICAgY29uc3QgcCA9IHBhcmVudCB8fCBbXTtcbiAgICBjb25zdCBzZWdtZW50ID0gcGF0aFswXTtcbiAgICBjb25zdCB3aWxkID0gKCcqJyA9PT0gc2VnbWVudCkgPyBPYmplY3Qua2V5cyhpbmRleCkgOiBbXTtcbiAgICBjb25zdCBfa2V5cyA9ICgoQXJyYXkuaXNBcnJheShzZWdtZW50KSA/IHNlZ21lbnQgOiBbc2VnbWVudF0pIGFzIHN0cmluZ1tdKS5jb25jYXQod2lsZCk7XG4gICAgY29uc3Qga2V5cyA9IF9rZXlzLmZpbHRlcigoaXRlbSwgcG9zKSA9PiAnKicgIT09IGl0ZW0gJiYgX2tleXMuaW5kZXhPZihpdGVtKSA9PT0gcG9zKTsgLy8gcmVtb3ZlIGR1cGxpY2F0ZXNcblxuICAgIGlmIChpbmRleFsnKiddKSB7XG4gICAgICBrZXlzLnB1c2goJyonKTtcbiAgICB9XG5cbiAgICBsZXQgcGF0aHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICBjb25zdCByZXN0UGF0aCA9IHBhdGguc2xpY2UoMSk7XG4gICAgICBjb25zdCByZXN0SW5kZXggPSBpbmRleFtrZXldO1xuICAgICAgY29uc3QgcmVzdFBhcmVudCA9IHAuY29uY2F0KGtleSk7XG5cbiAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkgey8vIGNvbGxlY3Qgb25seSB0aGUgZnVsbCBwYXRoc1xuICAgICAgICBpZiAoIXRoaXMuZmluZE9ubHlXaXRoVmFsdWUgfHwgKHJlc3RJbmRleCAmJiByZXN0SW5kZXhbU2ltcGxlUHJvcGVydHlJbmRleGVyLk1BUktFUl0pKSB7XG4gICAgICAgICAgaW5kZXhlclJlc3VsdHMucmVzdWx0cyA9IGluZGV4ZXJSZXN1bHRzLnJlc3VsdHMgfHwgW107XG4gICAgICAgICAgaW5kZXhlclJlc3VsdHMucmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICAgIHBhdGg6IHJlc3RQYXJlbnQsXG4gICAgICAgICAgICB2YWx1ZTogcmVzdEluZGV4W1NpbXBsZVByb3BlcnR5SW5kZXhlci5NQVJLRVJdXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcGF0aHMucHVzaChyZXN0UGFyZW50KTtcbiAgICAgICAgICBpbmRleGVyUmVzdWx0cy5mb3VuZCA9IGluZGV4ZXJSZXN1bHRzLnJlc3VsdHMubGVuZ3RoID4gMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXJlc3RQYXRoIHx8ICFyZXN0UGF0aC5sZW5ndGggfHwgIXJlc3RJbmRleCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlc3RQYXRocyA9IHRoaXMuX19maW5kSW5kZXgoaW5kZXhlclJlc3VsdHMsIHJlc3RQYXRoLCByZXN0SW5kZXgsIHJlc3RQYXJlbnQpO1xuXG4gICAgICBwYXRocyA9IHBhdGhzLmNvbmNhdChyZXN0UGF0aHMpO1xuICAgIH1cbiAgICByZXR1cm4gcGF0aHM7XG4gIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEluZGV4ZXJSZXN1bHQge1xuICAvKipcbiAgICogVGhlIHBhdGggb3JpZ2luYWxseSBzZWFyY2hlZCBmb3JcbiAgICovXG4gIHRhcmdldDogc3RyaW5nW107XG4gIC8qKlxuICAgKiBGbGFnIGZvciB0aGUgc3RhdHVzIG9mIGZvdW5kIG9yIG5vdCBmb3VuZC48YnIvPlxuICAgKiBVc3VhbGx5IDxjb2RlPnJlc3VsdHM8L2NvZGU+IHdpbGwgYmUgZW1wdHkgaWYgbm8gbWF0Y2hlcyBmb3VuZC5cbiAgICovXG4gIGZvdW5kOiBib29sZWFuO1xuICAvKipcbiAgICogVGhlIHJlc3VsdCBwYXRoIGFuZCB2YWx1ZXMgZnJvbSB0aGUgaW5kZXggc2VhcmNoLjxici8+XG4gICAqIFVzdWFsbHkgPGNvZGU+cmVzdWx0czwvY29kZT4gd2lsbCBiZSBlbXB0eSBpZiBubyBtYXRjaGVzIGZvdW5kLlxuICAgKi9cbiAgcmVzdWx0czoge1xuICAgIC8qKlxuICAgICAqIFRoZSBwYXRoIHRoYXQgbWF0Y2hlZCB0aGUgPGNvZGU+dGFyZ2V0PC9jb2RlPlxuICAgICAqIHNlcGFyYXRlZCBpbiBzZWdtZW50c1xuICAgICAqL1xuICAgIHBhdGg6IHN0cmluZ1tdLFxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBzdG9yZWQgYXQgdGhlIDxjb2RlPnBhdGg8L2NvZGU+XG4gICAgICovXG4gICAgdmFsdWU6IGFueVxuICB9W107XG59XG4iLCJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBPbkNoYW5nZXMsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtBY3Rpb259IGZyb20gJy4vbW9kZWwvYWN0aW9uJztcbmltcG9ydCB7QWN0aW9uUmVnaXN0cnl9IGZyb20gJy4vbW9kZWwvYWN0aW9ucmVnaXN0cnknO1xuaW1wb3J0IHtGb3JtUHJvcGVydHl9IGZyb20gJy4vbW9kZWwvZm9ybXByb3BlcnR5JztcbmltcG9ydCB7Rm9ybVByb3BlcnR5RmFjdG9yeX0gZnJvbSAnLi9tb2RlbC9mb3JtcHJvcGVydHlmYWN0b3J5JztcbmltcG9ydCB7U2NoZW1hUHJlcHJvY2Vzc29yfSBmcm9tICcuL21vZGVsL3NjaGVtYXByZXByb2Nlc3Nvcic7XG5pbXBvcnQge1ZhbGlkYXRvclJlZ2lzdHJ5fSBmcm9tICcuL21vZGVsL3ZhbGlkYXRvcnJlZ2lzdHJ5JztcbmltcG9ydCB7VmFsaWRhdG9yfSBmcm9tICcuL21vZGVsL3ZhbGlkYXRvcic7XG5pbXBvcnQge0JpbmRpbmd9IGZyb20gJy4vbW9kZWwvYmluZGluZyc7XG5pbXBvcnQge0JpbmRpbmdSZWdpc3RyeX0gZnJvbSAnLi9tb2RlbC9iaW5kaW5ncmVnaXN0cnknO1xuXG5pbXBvcnQge1NjaGVtYVZhbGlkYXRvckZhY3Rvcnl9IGZyb20gJy4vc2NoZW1hdmFsaWRhdG9yZmFjdG9yeSc7XG5pbXBvcnQge1dpZGdldEZhY3Rvcnl9IGZyb20gJy4vd2lkZ2V0ZmFjdG9yeSc7XG5pbXBvcnQge1Rlcm1pbmF0b3JTZXJ2aWNlfSBmcm9tICcuL3Rlcm1pbmF0b3Iuc2VydmljZSc7XG5pbXBvcnQge1Byb3BlcnR5QmluZGluZ1JlZ2lzdHJ5fSBmcm9tICcuL3Byb3BlcnR5LWJpbmRpbmctcmVnaXN0cnknO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlRmFjdG9yeShzY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCB2YWxpZGF0b3JSZWdpc3RyeSwgcHJvcGVydHlCaW5kaW5nUmVnaXN0cnkpIHtcbiAgcmV0dXJuIG5ldyBGb3JtUHJvcGVydHlGYWN0b3J5KHNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHZhbGlkYXRvclJlZ2lzdHJ5LCBwcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeSk7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWZvcm0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxmb3JtPlxuICAgICAgPHNmLWZvcm0tZWxlbWVudFxuICAgICAgICAqbmdJZj1cInJvb3RQcm9wZXJ0eVwiIFtmb3JtUHJvcGVydHldPVwicm9vdFByb3BlcnR5XCI+PC9zZi1mb3JtLWVsZW1lbnQ+XG4gICAgPC9mb3JtPmAsXG4gIHByb3ZpZGVyczogW1xuICAgIEFjdGlvblJlZ2lzdHJ5LFxuICAgIFZhbGlkYXRvclJlZ2lzdHJ5LFxuICAgIFByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5LFxuICAgIEJpbmRpbmdSZWdpc3RyeSxcbiAgICBTY2hlbWFQcmVwcm9jZXNzb3IsXG4gICAgV2lkZ2V0RmFjdG9yeSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBGb3JtUHJvcGVydHlGYWN0b3J5LFxuICAgICAgdXNlRmFjdG9yeTogdXNlRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtTY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCBWYWxpZGF0b3JSZWdpc3RyeSwgUHJvcGVydHlCaW5kaW5nUmVnaXN0cnldXG4gICAgfSxcbiAgICBUZXJtaW5hdG9yU2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBGb3JtQ29tcG9uZW50LFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIEBJbnB1dCgpIHNjaGVtYTogYW55ID0gbnVsbDtcblxuICBASW5wdXQoKSBtb2RlbDogYW55O1xuXG4gIEBJbnB1dCgpIGFjdGlvbnM6IHsgW2FjdGlvbklkOiBzdHJpbmddOiBBY3Rpb24gfSA9IHt9O1xuXG4gIEBJbnB1dCgpIHZhbGlkYXRvcnM6IHsgW3BhdGg6IHN0cmluZ106IFZhbGlkYXRvciB9ID0ge307XG5cbiAgQElucHV0KCkgYmluZGluZ3M6IHsgW3BhdGg6IHN0cmluZ106IEJpbmRpbmcgfSA9IHt9O1xuXG4gIEBPdXRwdXQoKSBvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8eyB2YWx1ZTogYW55IH0+KCk7XG5cbiAgQE91dHB1dCgpIG1vZGVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIGlzVmFsaWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgQE91dHB1dCgpIG9uRXJyb3JDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHsgdmFsdWU6IGFueVtdIH0+KCk7XG5cbiAgQE91dHB1dCgpIG9uRXJyb3JzQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7dmFsdWU6IGFueX0+KCk7XG5cbiAgcm9vdFByb3BlcnR5OiBGb3JtUHJvcGVydHkgPSBudWxsO1xuXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZm9ybVByb3BlcnR5RmFjdG9yeTogRm9ybVByb3BlcnR5RmFjdG9yeSxcbiAgICBwcml2YXRlIGFjdGlvblJlZ2lzdHJ5OiBBY3Rpb25SZWdpc3RyeSxcbiAgICBwcml2YXRlIHZhbGlkYXRvclJlZ2lzdHJ5OiBWYWxpZGF0b3JSZWdpc3RyeSxcbiAgICBwcml2YXRlIGJpbmRpbmdSZWdpc3RyeTogQmluZGluZ1JlZ2lzdHJ5LFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHRlcm1pbmF0b3I6IFRlcm1pbmF0b3JTZXJ2aWNlXG4gICkgeyB9XG5cbiAgd3JpdGVWYWx1ZShvYmo6IGFueSkge1xuICAgIGlmICh0aGlzLnJvb3RQcm9wZXJ0eSkge1xuICAgICAgdGhpcy5yb290UHJvcGVydHkucmVzZXQob2JqLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gICAgaWYgKHRoaXMucm9vdFByb3BlcnR5KSB7XG4gICAgICB0aGlzLnJvb3RQcm9wZXJ0eS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKFxuICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2VzLmJpbmQodGhpcylcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETyBpbXBsZW1lbnRcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICB9XG5cbiAgLy8gVE9ETyBpbXBsZW1lbnRcbiAgLy8gc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKT86IHZvaWRcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMudmFsaWRhdG9ycykge1xuICAgICAgdGhpcy5zZXRWYWxpZGF0b3JzKCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuYWN0aW9ucykge1xuICAgICAgdGhpcy5zZXRBY3Rpb25zKCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuYmluZGluZ3MpIHtcbiAgICAgIHRoaXMuc2V0QmluZGluZ3MoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zY2hlbWEgJiYgIXRoaXMuc2NoZW1hLnR5cGUpIHtcbiAgICAgIHRoaXMuc2NoZW1hLnR5cGUgPSAnb2JqZWN0JztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zY2hlbWEgJiYgY2hhbmdlcy5zY2hlbWEpIHtcbiAgICAgIGlmICghY2hhbmdlcy5zY2hlbWEuZmlyc3RDaGFuZ2UpIHtcbiAgICAgICAgdGhpcy50ZXJtaW5hdG9yLmRlc3Ryb3koKTtcbiAgICAgIH1cblxuICAgICAgU2NoZW1hUHJlcHJvY2Vzc29yLnByZXByb2Nlc3ModGhpcy5zY2hlbWEpO1xuICAgICAgdGhpcy5yb290UHJvcGVydHkgPSB0aGlzLmZvcm1Qcm9wZXJ0eUZhY3RvcnkuY3JlYXRlUHJvcGVydHkodGhpcy5zY2hlbWEpO1xuICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgLy8gdGhpcy5yb290UHJvcGVydHkucmVzZXQodGhpcy5tb2RlbCwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJvb3RQcm9wZXJ0eS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKFxuICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2VzLmJpbmQodGhpcylcbiAgICAgICk7XG5cbiAgICAgIHRoaXMucm9vdFByb3BlcnR5LmVycm9yc0NoYW5nZXMuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgdGhpcy5vbkVycm9yQ2hhbmdlLmVtaXQoe3ZhbHVlOiB2YWx1ZX0pO1xuICAgICAgICB0aGlzLmlzVmFsaWQuZW1pdCghKHZhbHVlICYmIHZhbHVlLmxlbmd0aCkpO1xuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBpZiAodGhpcy5zY2hlbWEgJiYgKGNoYW5nZXMubW9kZWwgfHwgY2hhbmdlcy5zY2hlbWEgKSkge1xuICAgICAgdGhpcy5yb290UHJvcGVydHkucmVzZXQodGhpcy5tb2RlbCwgZmFsc2UpO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBzZXRWYWxpZGF0b3JzKCkge1xuICAgIHRoaXMudmFsaWRhdG9yUmVnaXN0cnkuY2xlYXIoKTtcbiAgICBpZiAodGhpcy52YWxpZGF0b3JzKSB7XG4gICAgICBmb3IgKGNvbnN0IHZhbGlkYXRvcklkIGluIHRoaXMudmFsaWRhdG9ycykge1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0b3JzLmhhc093blByb3BlcnR5KHZhbGlkYXRvcklkKSkge1xuICAgICAgICAgIHRoaXMudmFsaWRhdG9yUmVnaXN0cnkucmVnaXN0ZXIodmFsaWRhdG9ySWQsIHRoaXMudmFsaWRhdG9yc1t2YWxpZGF0b3JJZF0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRBY3Rpb25zKCkge1xuICAgIHRoaXMuYWN0aW9uUmVnaXN0cnkuY2xlYXIoKTtcbiAgICBpZiAodGhpcy5hY3Rpb25zKSB7XG4gICAgICBmb3IgKGNvbnN0IGFjdGlvbklkIGluIHRoaXMuYWN0aW9ucykge1xuICAgICAgICBpZiAodGhpcy5hY3Rpb25zLmhhc093blByb3BlcnR5KGFjdGlvbklkKSkge1xuICAgICAgICAgIHRoaXMuYWN0aW9uUmVnaXN0cnkucmVnaXN0ZXIoYWN0aW9uSWQsIHRoaXMuYWN0aW9uc1thY3Rpb25JZF0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRCaW5kaW5ncygpIHtcbiAgICB0aGlzLmJpbmRpbmdSZWdpc3RyeS5jbGVhcigpO1xuICAgIGlmICh0aGlzLmJpbmRpbmdzKSB7XG4gICAgICBmb3IgKGNvbnN0IGJpbmRpbmdQYXRoIGluIHRoaXMuYmluZGluZ3MpIHtcbiAgICAgICAgaWYgKHRoaXMuYmluZGluZ3MuaGFzT3duUHJvcGVydHkoYmluZGluZ1BhdGgpKSB7XG4gICAgICAgICAgdGhpcy5iaW5kaW5nUmVnaXN0cnkucmVnaXN0ZXIoYmluZGluZ1BhdGgsIHRoaXMuYmluZGluZ3NbYmluZGluZ1BhdGhdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpIHtcbiAgICB0aGlzLnJvb3RQcm9wZXJ0eS5yZXNldChudWxsLCB0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0TW9kZWwodmFsdWU6IGFueSkge1xuICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMubW9kZWwsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb2RlbCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25WYWx1ZUNoYW5nZXModmFsdWUpIHtcbiAgICBpZiAodGhpcy5vbkNoYW5nZUNhbGxiYWNrKSB7XG4gICAgICB0aGlzLnNldE1vZGVsKHZhbHVlKTtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gdHdvIHdheSBiaW5kaW5nIGlzIHVzZWRcbiAgICBpZiAodGhpcy5tb2RlbENoYW5nZS5vYnNlcnZlcnMubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKCF0aGlzLm9uQ2hhbmdlQ2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5zZXRNb2RlbCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7dmFsdWU6IHZhbHVlfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCwgRWxlbWVudFJlZixcbiAgSW5wdXQsIE9uRGVzdHJveSxcbiAgT25Jbml0LCBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIEZvcm1Db250cm9sXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtXaWRnZXR9IGZyb20gJy4vd2lkZ2V0JztcblxuaW1wb3J0IHtBY3Rpb25SZWdpc3RyeX0gZnJvbSAnLi9tb2RlbC9hY3Rpb25yZWdpc3RyeSc7XG5pbXBvcnQge0Zvcm1Qcm9wZXJ0eX0gZnJvbSAnLi9tb2RlbC9mb3JtcHJvcGVydHknO1xuaW1wb3J0IHtCaW5kaW5nUmVnaXN0cnl9IGZyb20gJy4vbW9kZWwvYmluZGluZ3JlZ2lzdHJ5JztcbmltcG9ydCB7QmluZGluZ30gZnJvbSAnLi9tb2RlbC9iaW5kaW5nJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtZm9ybS1lbGVtZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0lmPVwiZm9ybVByb3BlcnR5LnZpc2libGVcIlxuICAgICAgICAgW2NsYXNzLmhhcy1lcnJvcl09XCIhY29udHJvbC52YWxpZFwiXG4gICAgICAgICBbY2xhc3MuaGFzLXN1Y2Nlc3NdPVwiY29udHJvbC52YWxpZFwiPlxuICAgICAgPHNmLXdpZGdldC1jaG9vc2VyXG4gICAgICAgICh3aWRnZXRJbnN0YW5jaWF0ZWQpPVwib25XaWRnZXRJbnN0YW5jaWF0ZWQoJGV2ZW50KVwiXG4gICAgICAgIFt3aWRnZXRJbmZvXT1cImZvcm1Qcm9wZXJ0eS5zY2hlbWEud2lkZ2V0XCI+XG4gICAgICA8L3NmLXdpZGdldC1jaG9vc2VyPlxuICAgICAgPHNmLWZvcm0tZWxlbWVudC1hY3Rpb24gKm5nRm9yPVwibGV0IGJ1dHRvbiBvZiBidXR0b25zXCIgW2J1dHRvbl09XCJidXR0b25cIiBbZm9ybVByb3BlcnR5XT1cImZvcm1Qcm9wZXJ0eVwiPjwvc2YtZm9ybS1lbGVtZW50LWFjdGlvbj5cbiAgICA8L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1FbGVtZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgc3RhdGljIGNvdW50ZXIgPSAwO1xuXG4gIEBJbnB1dCgpIGZvcm1Qcm9wZXJ0eTogRm9ybVByb3BlcnR5O1xuICBjb250cm9sOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgnJywgKCkgPT4gbnVsbCk7XG5cbiAgd2lkZ2V0OiBXaWRnZXQ8YW55PiA9IG51bGw7XG5cbiAgYnV0dG9ucyA9IFtdO1xuXG4gIHVubGlzdGVuID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhY3Rpb25SZWdpc3RyeTogQWN0aW9uUmVnaXN0cnksXG4gICAgICAgICAgICAgIHByaXZhdGUgYmluZGluZ1JlZ2lzdHJ5OiBCaW5kaW5nUmVnaXN0cnksXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBhcnNlQnV0dG9ucygpO1xuICAgIHRoaXMuc2V0dXBCaW5kaW5ncygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cEJpbmRpbmdzKCkge1xuICAgIGNvbnN0IGJpbmRpbmdzOiBCaW5kaW5nW10gPSB0aGlzLmJpbmRpbmdSZWdpc3RyeS5nZXQodGhpcy5mb3JtUHJvcGVydHkucGF0aCk7XG4gICAgaWYgKChiaW5kaW5ncyB8fCBbXSkubGVuZ3RoKSB7XG4gICAgICBiaW5kaW5ncy5mb3JFYWNoKChiaW5kaW5nKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgZXZlbnRJZCBpbiBiaW5kaW5nKSB7XG4gICAgICAgICAgdGhpcy5jcmVhdGVCaW5kaW5nKGV2ZW50SWQsIGJpbmRpbmdbZXZlbnRJZF0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUJpbmRpbmcoZXZlbnRJZCwgbGlzdGVuZXIpIHtcbiAgICB0aGlzLnVubGlzdGVuLnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICBldmVudElkLFxuICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChsaXN0ZW5lciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgbGlzdGVuZXIoZXZlbnQsIHRoaXMuZm9ybVByb3BlcnR5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ0NhbGxpbmcgbm9uIGZ1bmN0aW9uIGhhbmRsZXIgZm9yIGV2ZW50SWQgJyArIGV2ZW50SWQgKyAnIGZvciBwYXRoICcgKyB0aGlzLmZvcm1Qcm9wZXJ0eS5wYXRoKTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUJ1dHRvbnMoKSB7XG4gICAgaWYgKHRoaXMuZm9ybVByb3BlcnR5LnNjaGVtYS5idXR0b25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYnV0dG9ucyA9IHRoaXMuZm9ybVByb3BlcnR5LnNjaGVtYS5idXR0b25zO1xuXG4gICAgICBmb3IgKGxldCBidXR0b24gb2YgdGhpcy5idXR0b25zKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uQ2FsbGJhY2soYnV0dG9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUJ1dHRvbkNhbGxiYWNrKGJ1dHRvbikge1xuICAgIGJ1dHRvbi5hY3Rpb24gPSAoZSkgPT4ge1xuICAgICAgbGV0IGFjdGlvbjtcbiAgICAgIGlmIChidXR0b24uaWQgJiYgKGFjdGlvbiA9IHRoaXMuYWN0aW9uUmVnaXN0cnkuZ2V0KGJ1dHRvbi5pZCkpKSB7XG4gICAgICAgIGlmIChhY3Rpb24pIHtcbiAgICAgICAgICBhY3Rpb24odGhpcy5mb3JtUHJvcGVydHksIGJ1dHRvbi5wYXJhbWV0ZXJzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH07XG4gIH1cblxuICBvbldpZGdldEluc3RhbmNpYXRlZCh3aWRnZXQ6IFdpZGdldDxhbnk+KSB7XG4gICAgdGhpcy53aWRnZXQgPSB3aWRnZXQ7XG4gICAgbGV0IGlkID0gJ2ZpZWxkJyArIChGb3JtRWxlbWVudENvbXBvbmVudC5jb3VudGVyKyspO1xuXG4gICAgdGhpcy53aWRnZXQuZm9ybVByb3BlcnR5ID0gdGhpcy5mb3JtUHJvcGVydHk7XG4gICAgdGhpcy53aWRnZXQuc2NoZW1hID0gdGhpcy5mb3JtUHJvcGVydHkuc2NoZW1hO1xuICAgIHRoaXMud2lkZ2V0Lm5hbWUgPSBpZDtcbiAgICB0aGlzLndpZGdldC5pZCA9IGlkO1xuICAgIHRoaXMud2lkZ2V0LmNvbnRyb2wgPSB0aGlzLmNvbnRyb2w7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy51bmxpc3Rlbikge1xuICAgICAgdGhpcy51bmxpc3Rlbi5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbXBvbmVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveVxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtXaWRnZXRGYWN0b3J5fSBmcm9tIFwiLi93aWRnZXRmYWN0b3J5XCI7XG5pbXBvcnQge1Rlcm1pbmF0b3JTZXJ2aWNlfSBmcm9tIFwiLi90ZXJtaW5hdG9yLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtZm9ybS1lbGVtZW50LWFjdGlvbicsXG4gIHRlbXBsYXRlOiAnPG5nLXRlbXBsYXRlICN0YXJnZXQ+PC9uZy10ZW1wbGF0ZT4nXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1FbGVtZW50Q29tcG9uZW50QWN0aW9uIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KClcbiAgYnV0dG9uOiBhbnk7XG5cbiAgQElucHV0KClcbiAgZm9ybVByb3BlcnR5OiBhbnk7XG5cbiAgQFZpZXdDaGlsZCgndGFyZ2V0Jywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgcHJpdmF0ZSByZWY6IENvbXBvbmVudFJlZjxhbnk+O1xuICBwcml2YXRlIHN1YnM6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdpZGdldEZhY3Rvcnk6IFdpZGdldEZhY3RvcnkgPSBudWxsLFxuICAgICAgICAgICAgICBwcml2YXRlIHRlcm1pbmF0b3I6IFRlcm1pbmF0b3JTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnMgPSB0aGlzLnRlcm1pbmF0b3Iub25EZXN0cm95LnN1YnNjcmliZShkZXN0cm95ID0+IHtcbiAgICAgIGlmIChkZXN0cm95KSB7XG4gICAgICAgIHRoaXMucmVmLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMucmVmID0gdGhpcy53aWRnZXRGYWN0b3J5LmNyZWF0ZVdpZGdldCh0aGlzLmNvbnRhaW5lciwgdGhpcy5idXR0b24ud2lkZ2V0IHx8ICdidXR0b24nKTtcbiAgICB0aGlzLnJlZi5pbnN0YW5jZS5idXR0b24gPSB0aGlzLmJ1dHRvbjtcbiAgICB0aGlzLnJlZi5pbnN0YW5jZS5mb3JtUHJvcGVydHkgPSB0aGlzLmZvcm1Qcm9wZXJ0eTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vicy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbXBvbmVudFJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGVybWluYXRvclNlcnZpY2UgfSBmcm9tICcuL3Rlcm1pbmF0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBXaWRnZXRGYWN0b3J5IH0gZnJvbSAnLi93aWRnZXRmYWN0b3J5JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLXdpZGdldC1jaG9vc2VyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICN0YXJnZXQ+PC9kaXY+YCxcbn0pXG5leHBvcnQgY2xhc3MgV2lkZ2V0Q2hvb3NlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIHdpZGdldEluZm86IGFueTtcblxuICBAT3V0cHV0KCkgd2lkZ2V0SW5zdGFuY2lhdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQFZpZXdDaGlsZCgndGFyZ2V0Jywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgcHJpdmF0ZSB3aWRnZXRJbnN0YW5jZTogYW55O1xuICBwcml2YXRlIHJlZjogQ29tcG9uZW50UmVmPGFueT47XG4gIHByaXZhdGUgc3ViczogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgd2lkZ2V0RmFjdG9yeTogV2lkZ2V0RmFjdG9yeSA9IG51bGwsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgdGVybWluYXRvcjogVGVybWluYXRvclNlcnZpY2UsXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJzID0gdGhpcy50ZXJtaW5hdG9yLm9uRGVzdHJveS5zdWJzY3JpYmUoZGVzdHJveSA9PiB7XG4gICAgICBpZiAoZGVzdHJveSkge1xuICAgICAgICB0aGlzLnJlZi5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLnJlZiA9IHRoaXMud2lkZ2V0RmFjdG9yeS5jcmVhdGVXaWRnZXQodGhpcy5jb250YWluZXIsIHRoaXMud2lkZ2V0SW5mby5pZCk7XG4gICAgdGhpcy53aWRnZXRJbnN0YW5jaWF0ZWQuZW1pdCh0aGlzLnJlZi5pbnN0YW5jZSk7XG4gICAgdGhpcy53aWRnZXRJbnN0YW5jZSA9IHRoaXMucmVmLmluc3RhbmNlO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vicy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCJpbXBvcnQge0FmdGVyVmlld0luaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge0FycmF5UHJvcGVydHl9IGZyb20gJy4vbW9kZWwvYXJyYXlwcm9wZXJ0eSc7XG5pbXBvcnQge0Zvcm1Qcm9wZXJ0eX0gZnJvbSAnLi9tb2RlbC9mb3JtcHJvcGVydHknO1xuaW1wb3J0IHtPYmplY3RQcm9wZXJ0eX0gZnJvbSAnLi9tb2RlbC9vYmplY3Rwcm9wZXJ0eSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBXaWRnZXQ8VCBleHRlbmRzIEZvcm1Qcm9wZXJ0eT4ge1xuICBmb3JtUHJvcGVydHk6IFQ7XG4gIGNvbnRyb2w6IEZvcm1Db250cm9sO1xuICBlcnJvck1lc3NhZ2VzOiBzdHJpbmdbXTtcblxuICBpZDogc3RyaW5nID0gJyc7XG4gIG5hbWU6IHN0cmluZyA9ICcnO1xuICBzY2hlbWE6IGFueSA9IHt9O1xufVxuXG5leHBvcnQgY2xhc3MgQ29udHJvbFdpZGdldCBleHRlbmRzIFdpZGdldDxGb3JtUHJvcGVydHk+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmNvbnRyb2w7XG4gICAgdGhpcy5mb3JtUHJvcGVydHkudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcbiAgICAgIGlmIChjb250cm9sLnZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICBjb250cm9sLnNldFZhbHVlKG5ld1ZhbHVlLCB7ZW1pdEV2ZW50OiBmYWxzZX0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZm9ybVByb3BlcnR5LmVycm9yc0NoYW5nZXMuc3Vic2NyaWJlKChlcnJvcnMpID0+IHtcbiAgICAgIGNvbnRyb2wuc2V0RXJyb3JzKGVycm9ycywgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XG4gICAgICBjb25zdCBtZXNzYWdlcyA9IChlcnJvcnMgfHwgW10pXG4gICAgICAgIC5maWx0ZXIoZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGUucGF0aCAmJiBlLnBhdGguc2xpY2UoMSkgPT09IHRoaXMuZm9ybVByb3BlcnR5LnBhdGg7XG4gICAgICAgIH0pXG4gICAgICAgIC5tYXAoZSA9PiBlLm1lc3NhZ2UpO1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzID0gbWVzc2FnZXMuZmlsdGVyKChtLCBpKSA9PiBtZXNzYWdlcy5pbmRleE9mKG0pID09PSBpKTtcbiAgICB9KTtcbiAgICBjb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XG4gICAgICB0aGlzLmZvcm1Qcm9wZXJ0eS5zZXRWYWx1ZShuZXdWYWx1ZSwgZmFsc2UpO1xuICAgIH0pO1xuICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIEFycmF5TGF5b3V0V2lkZ2V0IGV4dGVuZHMgV2lkZ2V0PEFycmF5UHJvcGVydHk+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmNvbnRyb2w7XG4gICAgdGhpcy5mb3JtUHJvcGVydHkuZXJyb3JzQ2hhbmdlcy5zdWJzY3JpYmUoKGVycm9ycykgPT4ge1xuICAgICAgY29udHJvbC5zZXRFcnJvcnMoZXJyb3JzLCB7ZW1pdEV2ZW50OiB0cnVlfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE9iamVjdExheW91dFdpZGdldCBleHRlbmRzIFdpZGdldDxPYmplY3RQcm9wZXJ0eT4gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuY29udHJvbDtcbiAgICB0aGlzLmZvcm1Qcm9wZXJ0eS5lcnJvcnNDaGFuZ2VzLnN1YnNjcmliZSgoZXJyb3JzKSA9PiB7XG4gICAgICBjb250cm9sLnNldEVycm9ycyhlcnJvcnMsIHtlbWl0RXZlbnQ6IHRydWV9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFycmF5TGF5b3V0V2lkZ2V0IH0gZnJvbSAnLi4vLi4vd2lkZ2V0JztcbmltcG9ydCB7IEZvcm1Qcm9wZXJ0eSB9IGZyb20gJy4uLy4uL21vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtYXJyYXktd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwid2lkZ2V0IGZvcm0tZ3JvdXBcIj5cblx0PGxhYmVsIFthdHRyLmZvcl09XCJpZFwiIGNsYXNzPVwiaG9yaXpvbnRhbCBjb250cm9sLWxhYmVsXCI+XG5cdFx0e3sgc2NoZW1hLnRpdGxlIH19XG5cdDwvbGFiZWw+XG5cdDxzcGFuICpuZ0lmPVwic2NoZW1hLmRlc2NyaXB0aW9uXCIgY2xhc3M9XCJmb3JtSGVscFwiPnt7c2NoZW1hLmRlc2NyaXB0aW9ufX08L3NwYW4+XG5cdDxkaXYgKm5nRm9yPVwibGV0IGl0ZW1Qcm9wZXJ0eSBvZiBmb3JtUHJvcGVydHkucHJvcGVydGllc1wiPlxuXHRcdDxzZi1mb3JtLWVsZW1lbnQgW2Zvcm1Qcm9wZXJ0eV09XCJpdGVtUHJvcGVydHlcIj48L3NmLWZvcm0tZWxlbWVudD5cblx0XHQ8YnV0dG9uIChjbGljayk9XCJyZW1vdmVJdGVtKGl0ZW1Qcm9wZXJ0eSlcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBhcnJheS1yZW1vdmUtYnV0dG9uXCI+XG5cdFx0XHQ8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tbWludXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+IFJlbW92ZVxuXHRcdDwvYnV0dG9uPlxuXHQ8L2Rpdj5cblx0PGJ1dHRvbiAoY2xpY2spPVwiYWRkSXRlbSgpXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYXJyYXktYWRkLWJ1dHRvblwiPlxuXHRcdDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPiBBZGRcblx0PC9idXR0b24+XG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIEFycmF5V2lkZ2V0IGV4dGVuZHMgQXJyYXlMYXlvdXRXaWRnZXQge1xuXG4gIGFkZEl0ZW0oKSB7XG4gICAgdGhpcy5mb3JtUHJvcGVydHkuYWRkSXRlbSgpO1xuICB9XG5cbiAgcmVtb3ZlSXRlbShpdGVtOiBGb3JtUHJvcGVydHkpIHtcbiAgICB0aGlzLmZvcm1Qcm9wZXJ0eS5yZW1vdmVJdGVtKGl0ZW0pO1xuICB9XG5cbiAgdHJhY2tCeUluZGV4KGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkge1xuICAgIHJldHVybiBpbmRleDtcbiAgfVxufVxuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWJ1dHRvbi13aWRnZXQnLFxuICB0ZW1wbGF0ZTogJzxidXR0b24gKGNsaWNrKT1cImJ1dHRvbi5hY3Rpb24oJGV2ZW50KVwiPnt7YnV0dG9uLmxhYmVsfX08L2J1dHRvbj4nXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbldpZGdldCB7XG4gIHB1YmxpYyBidXR0b25cbiAgcHVibGljIGZvcm1Qcm9wZXJ0eVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE9iamVjdExheW91dFdpZGdldCB9IGZyb20gJy4uLy4uL3dpZGdldCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWZvcm0tb2JqZWN0JyxcbiAgdGVtcGxhdGU6IGA8ZmllbGRzZXQgKm5nRm9yPVwibGV0IGZpZWxkc2V0IG9mIGZvcm1Qcm9wZXJ0eS5zY2hlbWEuZmllbGRzZXRzXCI+XG5cdDxsZWdlbmQgKm5nSWY9XCJmaWVsZHNldC50aXRsZVwiPnt7ZmllbGRzZXQudGl0bGV9fTwvbGVnZW5kPlxuXHQ8ZGl2ICpuZ0lmPVwiZmllbGRzZXQuZGVzY3JpcHRpb25cIj57e2ZpZWxkc2V0LmRlc2NyaXB0aW9ufX08L2Rpdj5cblx0PGRpdiAqbmdGb3I9XCJsZXQgZmllbGRJZCBvZiBmaWVsZHNldC5maWVsZHNcIj5cblx0XHQ8c2YtZm9ybS1lbGVtZW50IFtmb3JtUHJvcGVydHldPVwiZm9ybVByb3BlcnR5LmdldFByb3BlcnR5KGZpZWxkSWQpXCI+PC9zZi1mb3JtLWVsZW1lbnQ+XG5cdDwvZGl2PlxuPC9maWVsZHNldD5gXG59KVxuZXhwb3J0IGNsYXNzIE9iamVjdFdpZGdldCBleHRlbmRzIE9iamVjdExheW91dFdpZGdldCB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb250cm9sV2lkZ2V0IH0gZnJvbSAnLi4vLi4vd2lkZ2V0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtY2hlY2tib3gtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwid2lkZ2V0IGZvcm0tZ3JvdXBcIj5cbiAgICA8bGFiZWwgW2F0dHIuZm9yXT1cImlkXCIgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cbiAgICAgICAge3sgc2NoZW1hLnRpdGxlIH19XG4gICAgPC9sYWJlbD5cblx0PGRpdiAqbmdJZj1cInNjaGVtYS50eXBlIT0nYXJyYXknXCIgY2xhc3M9XCJjaGVja2JveFwiPlxuXHRcdDxsYWJlbCBjbGFzcz1cImhvcml6b250YWwgY29udHJvbC1sYWJlbFwiPlxuXHRcdFx0PGlucHV0IFtmb3JtQ29udHJvbF09XCJjb250cm9sXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW2luZGV0ZXJtaW5hdGVdPVwiY29udHJvbC52YWx1ZSAhPT0gZmFsc2UgJiYgY29udHJvbC52YWx1ZSAhPT0gdHJ1ZSA/IHRydWUgOm51bGxcIiB0eXBlPVwiY2hlY2tib3hcIiBbZGlzYWJsZWRdPVwic2NoZW1hLnJlYWRPbmx5XCI+XG5cdFx0XHQ8aW5wdXQgKm5nSWY9XCJzY2hlbWEucmVhZE9ubHlcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiB0eXBlPVwiaGlkZGVuXCIgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIj5cblx0XHRcdHt7c2NoZW1hLmRlc2NyaXB0aW9ufX1cblx0XHQ8L2xhYmVsPlxuXHQ8L2Rpdj5cblx0PG5nLWNvbnRhaW5lciAqbmdJZj1cInNjaGVtYS50eXBlPT09J2FycmF5J1wiPlxuXHRcdDxkaXYgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBzY2hlbWEuaXRlbXMub25lT2ZcIiBjbGFzcz1cImNoZWNrYm94XCI+XG5cdFx0XHQ8bGFiZWwgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cblx0XHRcdFx0PGlucHV0IFthdHRyLm5hbWVdPVwibmFtZVwiXG5cdFx0XHRcdFx0dmFsdWU9XCJ7e29wdGlvbi5lbnVtWzBdfX1cIiB0eXBlPVwiY2hlY2tib3hcIiBcblx0XHRcdFx0XHRbYXR0ci5kaXNhYmxlZF09XCJzY2hlbWEucmVhZE9ubHlcIlxuXHRcdFx0XHRcdChjaGFuZ2UpPVwib25DaGVjaygkZXZlbnQudGFyZ2V0KVwiXG5cdFx0XHRcdFx0W2F0dHIuY2hlY2tlZF09XCJjaGVja2VkW29wdGlvbi5lbnVtWzBdXSA/IHRydWUgOiBudWxsXCI+XG5cdFx0XHRcdHt7b3B0aW9uLmRlc2NyaXB0aW9ufX1cblx0XHRcdDwvbGFiZWw+XG5cdFx0PC9kaXY+XG5cdDwvbmctY29udGFpbmVyPlxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveFdpZGdldCBleHRlbmRzIENvbnRyb2xXaWRnZXQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuXHRjaGVja2VkOiBhbnkgPSB7fTtcblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0Y29uc3QgY29udHJvbCA9IHRoaXMuY29udHJvbDtcblx0XHR0aGlzLmZvcm1Qcm9wZXJ0eS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xuXHRcdFx0aWYgKGNvbnRyb2wudmFsdWUgIT09IG5ld1ZhbHVlKSB7XG5cdFx0XHRcdGNvbnRyb2wuc2V0VmFsdWUobmV3VmFsdWUsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcblx0XHRcdFx0aWYgKG5ld1ZhbHVlICYmIEFycmF5LmlzQXJyYXkobmV3VmFsdWUpKSB7XG5cdFx0XHRcdFx0bmV3VmFsdWUubWFwKHYgPT4gdGhpcy5jaGVja2VkW3ZdID0gdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLmZvcm1Qcm9wZXJ0eS5lcnJvcnNDaGFuZ2VzLnN1YnNjcmliZSgoZXJyb3JzKSA9PiB7XG5cdFx0XHRjb250cm9sLnNldEVycm9ycyhlcnJvcnMsIHsgZW1pdEV2ZW50OiB0cnVlIH0pO1xuXHRcdH0pO1xuXHRcdGNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcblx0XHRcdHRoaXMuZm9ybVByb3BlcnR5LnNldFZhbHVlKG5ld1ZhbHVlLCBmYWxzZSk7XG5cdFx0fSk7XG5cdH1cblxuXHRvbkNoZWNrKGVsKSB7XG5cdFx0aWYgKGVsLmNoZWNrZWQpIHtcblx0XHRcdHRoaXMuY2hlY2tlZFtlbC52YWx1ZV0gPSB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWxldGUgdGhpcy5jaGVja2VkW2VsLnZhbHVlXTtcblx0XHR9XG5cdFx0dGhpcy5mb3JtUHJvcGVydHkuc2V0VmFsdWUoT2JqZWN0LmtleXModGhpcy5jaGVja2VkKSwgZmFsc2UpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29udHJvbFdpZGdldCB9IGZyb20gJy4uLy4uL3dpZGdldCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWZpbGUtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwid2lkZ2V0IGZvcm0tZ3JvdXBcIj5cblx0PGxhYmVsIFthdHRyLmZvcl09XCJpZFwiIGNsYXNzPVwiaG9yaXpvbnRhbCBjb250cm9sLWxhYmVsXCI+XG5cdFx0e3sgc2NoZW1hLnRpdGxlIH19XG5cdDwvbGFiZWw+XG4gICAgPHNwYW4gKm5nSWY9XCJzY2hlbWEuZGVzY3JpcHRpb25cIiBjbGFzcz1cImZvcm1IZWxwXCI+e3tzY2hlbWEuZGVzY3JpcHRpb259fTwvc3Bhbj5cbiAgPGlucHV0IFtuYW1lXT1cIm5hbWVcIiBjbGFzcz1cInRleHQtd2lkZ2V0IGZpbGUtd2lkZ2V0XCIgW2F0dHIuaWRdPVwiaWRcIlxuICAgIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCIgdHlwZT1cImZpbGVcIiBbYXR0ci5kaXNhYmxlZF09XCJzY2hlbWEucmVhZE9ubHk/dHJ1ZTpudWxsXCJcbiAgICAoY2hhbmdlKT1cIm9uRmlsZUNoYW5nZSgkZXZlbnQpXCI+XG5cdDxpbnB1dCAqbmdJZj1cInNjaGVtYS5yZWFkT25seVwiIFthdHRyLm5hbWVdPVwibmFtZVwiIHR5cGU9XCJoaWRkZW5cIiBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiPlxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBGaWxlV2lkZ2V0IGV4dGVuZHMgQ29udHJvbFdpZGdldCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIHByb3RlY3RlZCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICBwcm90ZWN0ZWQgZmlsZWRhdGE6IGFueSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gT1ZFUlJJREUgQ29udHJvbFdpZGdldCBuZ0FmdGVyVmlld0luaXQoKSBhcyBSZWFjdGl2ZUZvcm1zIGRvIG5vdCBoYW5kbGVcbiAgICAvLyBmaWxlIGlucHV0c1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmNvbnRyb2w7XG4gICAgdGhpcy5mb3JtUHJvcGVydHkuZXJyb3JzQ2hhbmdlcy5zdWJzY3JpYmUoKGVycm9ycykgPT4ge1xuICAgICAgY29udHJvbC5zZXRFcnJvcnMoZXJyb3JzLCB7IGVtaXRFdmVudDogdHJ1ZSB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMucmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuZmlsZWRhdGEuZGF0YSA9IHdpbmRvdy5idG9hKCh0aGlzLnJlYWRlci5yZXN1bHQgYXMgc3RyaW5nKSk7XG4gICAgICB0aGlzLmZvcm1Qcm9wZXJ0eS5zZXRWYWx1ZSh0aGlzLmZpbGVkYXRhLCBmYWxzZSk7XG4gICAgfTtcbiAgfVxuXG4gIG9uRmlsZUNoYW5nZSgkZXZlbnQpIHtcbiAgICBjb25zdCBmaWxlID0gJGV2ZW50LnRhcmdldC5maWxlc1swXTtcbiAgICB0aGlzLmZpbGVkYXRhLmZpbGVuYW1lID0gZmlsZS5uYW1lO1xuICAgIHRoaXMuZmlsZWRhdGEuc2l6ZSA9IGZpbGUuc2l6ZTtcbiAgICB0aGlzLmZpbGVkYXRhWydjb250ZW50LXR5cGUnXSA9IGZpbGUudHlwZTtcbiAgICB0aGlzLmZpbGVkYXRhLmVuY29kaW5nID0gJ2Jhc2U2NCc7XG4gICAgdGhpcy5yZWFkZXIucmVhZEFzQmluYXJ5U3RyaW5nKGZpbGUpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb250cm9sV2lkZ2V0IH0gZnJvbSAnLi4vLi4vd2lkZ2V0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtaW50ZWdlci13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3aWRnZXQgZm9ybS1ncm91cFwiPlxuXHQ8bGFiZWwgW2F0dHIuZm9yXT1cImlkXCIgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cblx0XHR7eyBzY2hlbWEudGl0bGUgfX1cblx0PC9sYWJlbD5cbiAgPHNwYW4gKm5nSWY9XCJzY2hlbWEuZGVzY3JpcHRpb25cIiBjbGFzcz1cImZvcm1IZWxwXCI+e3tzY2hlbWEuZGVzY3JpcHRpb259fTwvc3Bhbj5cblx0PGlucHV0IFthdHRyLnJlYWRvbmx5XT1cInNjaGVtYS5yZWFkT25seT90cnVlOm51bGxcIiBbbmFtZV09XCJuYW1lXCJcblx0Y2xhc3M9XCJ0ZXh0LXdpZGdldCBpbnRlZ2VyLXdpZGdldCBmb3JtLWNvbnRyb2xcIiBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiXG5cdFthdHRyLnR5cGVdPVwiJ251bWJlcidcIiBbYXR0ci5taW5dPVwic2NoZW1hLm1pbmltdW1cIiBbYXR0ci5tYXhdPVwic2NoZW1hLm1heGltdW1cIlxuXHRbYXR0ci5wbGFjZWhvbGRlcl09XCJzY2hlbWEucGxhY2Vob2xkZXJcIlxuXHRbYXR0ci5tYXhMZW5ndGhdPVwic2NoZW1hLm1heExlbmd0aCB8fCBudWxsXCJcbiAgW2F0dHIubWluTGVuZ3RoXT1cInNjaGVtYS5taW5MZW5ndGggfHwgbnVsbFwiPlxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBJbnRlZ2VyV2lkZ2V0IGV4dGVuZHMgQ29udHJvbFdpZGdldCB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbnRyb2xXaWRnZXQgfSBmcm9tICcuLi8uLi93aWRnZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi10ZXh0YXJlYS13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3aWRnZXQgZm9ybS1ncm91cFwiPlxuXHQ8bGFiZWwgW2F0dHIuZm9yXT1cImlkXCIgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cblx0XHR7eyBzY2hlbWEudGl0bGUgfX1cblx0PC9sYWJlbD5cbiAgICA8c3BhbiAqbmdJZj1cInNjaGVtYS5kZXNjcmlwdGlvblwiIGNsYXNzPVwiZm9ybUhlbHBcIj57e3NjaGVtYS5kZXNjcmlwdGlvbn19PC9zcGFuPlxuXHQ8dGV4dGFyZWEgW3JlYWRvbmx5XT1cInNjaGVtYS5yZWFkT25seVwiIFtuYW1lXT1cIm5hbWVcIlxuXHRcdGNsYXNzPVwidGV4dC13aWRnZXQgdGV4dGFyZWEtd2lkZ2V0IGZvcm0tY29udHJvbFwiXG5cdFx0W2F0dHIucGxhY2Vob2xkZXJdPVwic2NoZW1hLnBsYWNlaG9sZGVyXCJcblx0XHRbYXR0ci5tYXhMZW5ndGhdPVwic2NoZW1hLm1heExlbmd0aCB8fCBudWxsXCJcbiAgICBbYXR0ci5taW5MZW5ndGhdPVwic2NoZW1hLm1pbkxlbmd0aCB8fCBudWxsXCJcblx0XHRbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiPjwvdGV4dGFyZWE+XG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIFRleHRBcmVhV2lkZ2V0IGV4dGVuZHMgQ29udHJvbFdpZGdldCB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbnRyb2xXaWRnZXQgfSBmcm9tICcuLi8uLi93aWRnZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1yYWRpby13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3aWRnZXQgZm9ybS1ncm91cFwiPlxuXHQ8bGFiZWw+e3tzY2hlbWEudGl0bGV9fTwvbGFiZWw+XG4gICAgPHNwYW4gKm5nSWY9XCJzY2hlbWEuZGVzY3JpcHRpb25cIiBjbGFzcz1cImZvcm1IZWxwXCI+e3tzY2hlbWEuZGVzY3JpcHRpb259fTwvc3Bhbj5cblx0PGRpdiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHNjaGVtYS5vbmVPZlwiIGNsYXNzPVwicmFkaW9cIj5cblx0XHQ8bGFiZWwgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cblx0XHRcdDxpbnB1dCBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiIFthdHRyLm5hbWVdPVwibmFtZVwiIHZhbHVlPVwie3tvcHRpb24uZW51bVswXX19XCIgdHlwZT1cInJhZGlvXCIgIFtkaXNhYmxlZF09XCJzY2hlbWEucmVhZE9ubHlcIj5cblx0XHRcdHt7b3B0aW9uLmRlc2NyaXB0aW9ufX1cblx0XHQ8L2xhYmVsPlxuXHQ8L2Rpdj5cblx0PGlucHV0ICpuZ0lmPVwic2NoZW1hLnJlYWRPbmx5XCIgW2F0dHIubmFtZV09XCJuYW1lXCIgdHlwZT1cImhpZGRlblwiIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCI+XG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIFJhZGlvV2lkZ2V0IGV4dGVuZHMgQ29udHJvbFdpZGdldCB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbnRyb2xXaWRnZXQgfSBmcm9tICcuLi8uLi93aWRnZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1yYW5nZS13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3aWRnZXQgZm9ybS1ncm91cFwiPlxuXHQ8bGFiZWwgW2F0dHIuZm9yXT1cImlkXCIgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cblx0XHR7eyBzY2hlbWEudGl0bGUgfX1cblx0PC9sYWJlbD5cbiAgICA8c3BhbiAqbmdJZj1cInNjaGVtYS5kZXNjcmlwdGlvblwiIGNsYXNzPVwiZm9ybUhlbHBcIj57e3NjaGVtYS5kZXNjcmlwdGlvbn19PC9zcGFuPlx0XG5cdDxpbnB1dCBbbmFtZV09XCJuYW1lXCIgY2xhc3M9XCJ0ZXh0LXdpZGdldCByYW5nZS13aWRnZXRcIiBbYXR0ci5pZF09XCJpZFwiXG5cdFtmb3JtQ29udHJvbF09XCJjb250cm9sXCIgW2F0dHIudHlwZV09XCIncmFuZ2UnXCIgW2F0dHIubWluXT1cInNjaGVtYS5taW5pbXVtXCIgW2F0dHIubWF4XT1cInNjaGVtYS5tYXhpbXVtXCIgW2Rpc2FibGVkXT1cInNjaGVtYS5yZWFkT25seT90cnVlOm51bGxcIiA+XG5cdDxpbnB1dCAqbmdJZj1cInNjaGVtYS5yZWFkT25seVwiIFthdHRyLm5hbWVdPVwibmFtZVwiIHR5cGU9XCJoaWRkZW5cIj5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgUmFuZ2VXaWRnZXQgZXh0ZW5kcyBDb250cm9sV2lkZ2V0IHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29udHJvbFdpZGdldCB9IGZyb20gJy4uLy4uL3dpZGdldCc7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ3NmLXNlbGVjdC13aWRnZXQnLFxuXHR0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3aWRnZXQgZm9ybS1ncm91cFwiPlxuXHQ8bGFiZWwgW2F0dHIuZm9yXT1cImlkXCIgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cblx0XHR7eyBzY2hlbWEudGl0bGUgfX1cblx0PC9sYWJlbD5cblxuXHQ8c3BhbiAqbmdJZj1cInNjaGVtYS5kZXNjcmlwdGlvblwiIGNsYXNzPVwiZm9ybUhlbHBcIj5cblx0XHR7e3NjaGVtYS5kZXNjcmlwdGlvbn19XG5cdDwvc3Bhbj5cblxuXHQ8c2VsZWN0ICpuZ0lmPVwic2NoZW1hLnR5cGUhPSdhcnJheSdcIiBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiIFthdHRyLm5hbWVdPVwibmFtZVwiIFtkaXNhYmxlZF09XCJzY2hlbWEucmVhZE9ubHlcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuXHRcdDxvcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBzY2hlbWEub25lT2ZcIiBbbmdWYWx1ZV09XCJvcHRpb24uZW51bVswXVwiID57e29wdGlvbi5kZXNjcmlwdGlvbn19PC9vcHRpb24+XG5cdDwvc2VsZWN0PlxuXG5cdDxzZWxlY3QgKm5nSWY9XCJzY2hlbWEudHlwZT09PSdhcnJheSdcIiBtdWx0aXBsZSBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiIFthdHRyLm5hbWVdPVwibmFtZVwiIFtkaXNhYmxlZF09XCJzY2hlbWEucmVhZE9ubHlcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuXHRcdDxvcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBzY2hlbWEuaXRlbXMub25lT2ZcIiBbbmdWYWx1ZV09XCJvcHRpb24uZW51bVswXVwiID57e29wdGlvbi5kZXNjcmlwdGlvbn19PC9vcHRpb24+XG5cdDwvc2VsZWN0PlxuXG5cdDxpbnB1dCAqbmdJZj1cInNjaGVtYS5yZWFkT25seVwiIFthdHRyLm5hbWVdPVwibmFtZVwiIHR5cGU9XCJoaWRkZW5cIiBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiPlxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RXaWRnZXQgZXh0ZW5kcyBDb250cm9sV2lkZ2V0IHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29udHJvbFdpZGdldCB9IGZyb20gJy4uLy4uL3dpZGdldCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLXN0cmluZy13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYDxpbnB1dCAqbmdJZj1cInRoaXMuc2NoZW1hLndpZGdldC5pZCA9PT0naGlkZGVuJzsgZWxzZSBub3RIaWRkZW5GaWVsZEJsb2NrXCJcbiAgW2F0dHIubmFtZV09XCJuYW1lXCIgdHlwZT1cImhpZGRlblwiIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCI+XG48bmctdGVtcGxhdGUgI25vdEhpZGRlbkZpZWxkQmxvY2s+XG48ZGl2IGNsYXNzPVwid2lkZ2V0IGZvcm0tZ3JvdXBcIj5cbiAgICA8bGFiZWwgW2F0dHIuZm9yXT1cImlkXCIgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cbiAgICBcdHt7IHNjaGVtYS50aXRsZSB9fVxuICAgIDwvbGFiZWw+XG4gICAgPHNwYW4gKm5nSWY9XCJzY2hlbWEuZGVzY3JpcHRpb25cIiBjbGFzcz1cImZvcm1IZWxwXCI+e3tzY2hlbWEuZGVzY3JpcHRpb259fTwvc3Bhbj5cbiAgICA8aW5wdXQgW25hbWVdPVwibmFtZVwiIFthdHRyLnJlYWRvbmx5XT1cIihzY2hlbWEud2lkZ2V0LmlkIT09J2NvbG9yJykgJiYgc2NoZW1hLnJlYWRPbmx5P3RydWU6bnVsbFwiXG4gICAgY2xhc3M9XCJ0ZXh0LXdpZGdldC5pZCB0ZXh0bGluZS13aWRnZXQgZm9ybS1jb250cm9sXCJcbiAgICBbYXR0ci50eXBlXT1cIiF0aGlzLnNjaGVtYS53aWRnZXQuaWQgfHwgdGhpcy5zY2hlbWEud2lkZ2V0LmlkID09PSAnc3RyaW5nJyA/ICd0ZXh0JyA6IHRoaXMuc2NoZW1hLndpZGdldC5pZFwiXG4gICAgW2F0dHIuaWRdPVwiaWRcIiAgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJzY2hlbWEucGxhY2Vob2xkZXJcIlxuICAgIFthdHRyLm1heExlbmd0aF09XCJzY2hlbWEubWF4TGVuZ3RoIHx8IG51bGxcIlxuICAgIFthdHRyLm1pbkxlbmd0aF09XCJzY2hlbWEubWluTGVuZ3RoIHx8IG51bGxcIlxuICAgIFthdHRyLnJlcXVpcmVkXT1cInNjaGVtYS5pc1JlcXVpcmVkIHx8IG51bGxcIlxuICAgIFthdHRyLmRpc2FibGVkXT1cIihzY2hlbWEud2lkZ2V0LmlkPT0nY29sb3InICYmIHNjaGVtYS5yZWFkT25seSk/dHJ1ZTpudWxsXCI+XG4gICAgPGlucHV0ICpuZ0lmPVwiKHNjaGVtYS53aWRnZXQuaWQ9PT0nY29sb3InICYmIHNjaGVtYS5yZWFkT25seSlcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiB0eXBlPVwiaGlkZGVuXCIgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIj5cbjwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5gXG59KVxuZXhwb3J0IGNsYXNzIFN0cmluZ1dpZGdldCBleHRlbmRzIENvbnRyb2xXaWRnZXQge1xuXG4gICAgZ2V0SW5wdXRUeXBlKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2NoZW1hLndpZGdldC5pZCB8fCB0aGlzLnNjaGVtYS53aWRnZXQuaWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3RleHQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NoZW1hLndpZGdldC5pZDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEFycmF5V2lkZ2V0IH0gZnJvbSAnLi9hcnJheS9hcnJheS53aWRnZXQnO1xuaW1wb3J0IHsgQnV0dG9uV2lkZ2V0IH0gZnJvbSAnLi9idXR0b24vYnV0dG9uLndpZGdldCc7XG5pbXBvcnQgeyBDaGVja2JveFdpZGdldCB9IGZyb20gJy4vY2hlY2tib3gvY2hlY2tib3gud2lkZ2V0JztcbmltcG9ydCB7IEZpbGVXaWRnZXQgfSBmcm9tICcuL2ZpbGUvZmlsZS53aWRnZXQnO1xuaW1wb3J0IHsgSW50ZWdlcldpZGdldCB9IGZyb20gJy4vaW50ZWdlci9pbnRlZ2VyLndpZGdldCc7XG5pbXBvcnQgeyBPYmplY3RXaWRnZXQgfSBmcm9tICcuL29iamVjdC9vYmplY3Qud2lkZ2V0JztcbmltcG9ydCB7IFJhZGlvV2lkZ2V0IH0gZnJvbSAnLi9yYWRpby9yYWRpby53aWRnZXQnO1xuaW1wb3J0IHsgUmFuZ2VXaWRnZXQgfSBmcm9tICcuL3JhbmdlL3JhbmdlLndpZGdldCc7XG5pbXBvcnQgeyBTZWxlY3RXaWRnZXQgfSBmcm9tICcuL3NlbGVjdC9zZWxlY3Qud2lkZ2V0JztcbmltcG9ydCB7IFN0cmluZ1dpZGdldCB9IGZyb20gJy4vc3RyaW5nL3N0cmluZy53aWRnZXQnO1xuaW1wb3J0IHsgVGV4dEFyZWFXaWRnZXQgfSBmcm9tICcuL3RleHRhcmVhL3RleHRhcmVhLndpZGdldCc7XG5cbmltcG9ydCB7IFdpZGdldFJlZ2lzdHJ5IH0gZnJvbSAnLi4vd2lkZ2V0cmVnaXN0cnknO1xuXG5leHBvcnQgY2xhc3MgRGVmYXVsdFdpZGdldFJlZ2lzdHJ5IGV4dGVuZHMgV2lkZ2V0UmVnaXN0cnkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5yZWdpc3RlcignYXJyYXknLCAgQXJyYXlXaWRnZXQpO1xuICAgIHRoaXMucmVnaXN0ZXIoJ29iamVjdCcsICBPYmplY3RXaWRnZXQpO1xuXG4gICAgdGhpcy5yZWdpc3Rlcignc3RyaW5nJywgU3RyaW5nV2lkZ2V0KTtcbiAgICB0aGlzLnJlZ2lzdGVyKCdzZWFyY2gnLCBTdHJpbmdXaWRnZXQpO1xuICAgIHRoaXMucmVnaXN0ZXIoJ3RlbCcsIFN0cmluZ1dpZGdldCk7XG4gICAgdGhpcy5yZWdpc3RlcigndXJsJywgU3RyaW5nV2lkZ2V0KTtcbiAgICB0aGlzLnJlZ2lzdGVyKCdlbWFpbCcsIFN0cmluZ1dpZGdldCk7XG4gICAgdGhpcy5yZWdpc3RlcigncGFzc3dvcmQnLCBTdHJpbmdXaWRnZXQpO1xuICAgIHRoaXMucmVnaXN0ZXIoJ2NvbG9yJywgU3RyaW5nV2lkZ2V0KTtcbiAgICB0aGlzLnJlZ2lzdGVyKCdkYXRlJywgU3RyaW5nV2lkZ2V0KTtcbiAgICB0aGlzLnJlZ2lzdGVyKCdkYXRlLXRpbWUnLCBTdHJpbmdXaWRnZXQpO1xuICAgIHRoaXMucmVnaXN0ZXIoJ3RpbWUnLCBTdHJpbmdXaWRnZXQpO1xuXG4gICAgdGhpcy5yZWdpc3RlcignaW50ZWdlcicsIEludGVnZXJXaWRnZXQpO1xuICAgIHRoaXMucmVnaXN0ZXIoJ251bWJlcicsIEludGVnZXJXaWRnZXQpO1xuICAgIHRoaXMucmVnaXN0ZXIoJ3JhbmdlJywgUmFuZ2VXaWRnZXQpO1xuXG4gICAgdGhpcy5yZWdpc3RlcigndGV4dGFyZWEnLCBUZXh0QXJlYVdpZGdldCk7XG5cbiAgICB0aGlzLnJlZ2lzdGVyKCdmaWxlJywgRmlsZVdpZGdldCk7XG4gICAgdGhpcy5yZWdpc3Rlcignc2VsZWN0JywgU2VsZWN0V2lkZ2V0KTtcbiAgICB0aGlzLnJlZ2lzdGVyKCdyYWRpbycsIFJhZGlvV2lkZ2V0KTtcbiAgICB0aGlzLnJlZ2lzdGVyKCdib29sZWFuJywgQ2hlY2tib3hXaWRnZXQpO1xuICAgIHRoaXMucmVnaXN0ZXIoJ2NoZWNrYm94JywgQ2hlY2tib3hXaWRnZXQpO1xuXG4gICAgdGhpcy5yZWdpc3RlcignYnV0dG9uJywgQnV0dG9uV2lkZ2V0KTtcblxuICAgIHRoaXMuc2V0RGVmYXVsdFdpZGdldChTdHJpbmdXaWRnZXQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtZGVmYXVsdC1maWVsZCcsXG4gIHRlbXBsYXRlOiBgPHA+VW5rbm93IHR5cGU8L3A+YFxufSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0V2lkZ2V0IHt9XG4iLCJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgRm9ybXNNb2R1bGUsXG4gIFJlYWN0aXZlRm9ybXNNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge0Zvcm1FbGVtZW50Q29tcG9uZW50fSBmcm9tICcuL2Zvcm1lbGVtZW50LmNvbXBvbmVudCc7XG5pbXBvcnQge0Zvcm1Db21wb25lbnR9IGZyb20gJy4vZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtXaWRnZXRDaG9vc2VyQ29tcG9uZW50fSBmcm9tICcuL3dpZGdldGNob29zZXIuY29tcG9uZW50JztcbmltcG9ydCB7QXJyYXlXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvYXJyYXkvYXJyYXkud2lkZ2V0JztcbmltcG9ydCB7QnV0dG9uV2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL2J1dHRvbi9idXR0b24ud2lkZ2V0JztcbmltcG9ydCB7T2JqZWN0V2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL29iamVjdC9vYmplY3Qud2lkZ2V0JztcbmltcG9ydCB7Q2hlY2tib3hXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvY2hlY2tib3gvY2hlY2tib3gud2lkZ2V0JztcbmltcG9ydCB7RmlsZVdpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9maWxlL2ZpbGUud2lkZ2V0JztcbmltcG9ydCB7SW50ZWdlcldpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9pbnRlZ2VyL2ludGVnZXIud2lkZ2V0JztcbmltcG9ydCB7VGV4dEFyZWFXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvdGV4dGFyZWEvdGV4dGFyZWEud2lkZ2V0JztcbmltcG9ydCB7UmFkaW9XaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvcmFkaW8vcmFkaW8ud2lkZ2V0JztcbmltcG9ydCB7UmFuZ2VXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvcmFuZ2UvcmFuZ2Uud2lkZ2V0JztcbmltcG9ydCB7U2VsZWN0V2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL3NlbGVjdC9zZWxlY3Qud2lkZ2V0JztcbmltcG9ydCB7U3RyaW5nV2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL3N0cmluZy9zdHJpbmcud2lkZ2V0JztcbmltcG9ydCB7RGVmYXVsdFdpZGdldFJlZ2lzdHJ5fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL2RlZmF1bHR3aWRnZXRyZWdpc3RyeSc7XG5pbXBvcnQge1xuICBEZWZhdWx0V2lkZ2V0XG59IGZyb20gJy4vZGVmYXVsdC53aWRnZXQnO1xuXG5pbXBvcnQge1dpZGdldFJlZ2lzdHJ5fSBmcm9tICcuL3dpZGdldHJlZ2lzdHJ5JztcbmltcG9ydCB7U2NoZW1hVmFsaWRhdG9yRmFjdG9yeSwgWlNjaGVtYVZhbGlkYXRvckZhY3Rvcnl9IGZyb20gJy4vc2NoZW1hdmFsaWRhdG9yZmFjdG9yeSc7XG5pbXBvcnQge0Zvcm1FbGVtZW50Q29tcG9uZW50QWN0aW9ufSBmcm9tICcuL2Zvcm1lbGVtZW50LmFjdGlvbi5jb21wb25lbnQnO1xuXG5jb25zdCBtb2R1bGVQcm92aWRlcnMgPSBbXG4gIHtcbiAgICBwcm92aWRlOiBXaWRnZXRSZWdpc3RyeSxcbiAgICB1c2VDbGFzczogRGVmYXVsdFdpZGdldFJlZ2lzdHJ5XG4gIH0sXG4gIHtcbiAgICBwcm92aWRlOiBTY2hlbWFWYWxpZGF0b3JGYWN0b3J5LFxuICAgIHVzZUNsYXNzOiBaU2NoZW1hVmFsaWRhdG9yRmFjdG9yeVxuICB9XG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEZvcm1FbGVtZW50Q29tcG9uZW50LFxuICAgIEZvcm1FbGVtZW50Q29tcG9uZW50QWN0aW9uLFxuICAgIEZvcm1Db21wb25lbnQsXG4gICAgV2lkZ2V0Q2hvb3NlckNvbXBvbmVudCxcbiAgICBEZWZhdWx0V2lkZ2V0LFxuICAgIEFycmF5V2lkZ2V0LFxuICAgIEJ1dHRvbldpZGdldCxcbiAgICBPYmplY3RXaWRnZXQsXG4gICAgQ2hlY2tib3hXaWRnZXQsXG4gICAgRmlsZVdpZGdldCxcbiAgICBJbnRlZ2VyV2lkZ2V0LFxuICAgIFRleHRBcmVhV2lkZ2V0LFxuICAgIFJhZGlvV2lkZ2V0LFxuICAgIFJhbmdlV2lkZ2V0LFxuICAgIFNlbGVjdFdpZGdldCxcbiAgICBTdHJpbmdXaWRnZXQsXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIEZvcm1FbGVtZW50Q29tcG9uZW50LFxuICAgIEZvcm1FbGVtZW50Q29tcG9uZW50QWN0aW9uLFxuICAgIEZvcm1Db21wb25lbnQsXG4gICAgV2lkZ2V0Q2hvb3NlckNvbXBvbmVudCxcbiAgICBBcnJheVdpZGdldCxcbiAgICBCdXR0b25XaWRnZXQsXG4gICAgT2JqZWN0V2lkZ2V0LFxuICAgIENoZWNrYm94V2lkZ2V0LFxuICAgIEZpbGVXaWRnZXQsXG4gICAgSW50ZWdlcldpZGdldCxcbiAgICBUZXh0QXJlYVdpZGdldCxcbiAgICBSYWRpb1dpZGdldCxcbiAgICBSYW5nZVdpZGdldCxcbiAgICBTZWxlY3RXaWRnZXQsXG4gICAgU3RyaW5nV2lkZ2V0LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRm9ybUNvbXBvbmVudCxcbiAgICBGb3JtRWxlbWVudENvbXBvbmVudCxcbiAgICBGb3JtRWxlbWVudENvbXBvbmVudEFjdGlvbixcbiAgICBXaWRnZXRDaG9vc2VyQ29tcG9uZW50LFxuICAgIEFycmF5V2lkZ2V0LFxuICAgIEJ1dHRvbldpZGdldCxcbiAgICBPYmplY3RXaWRnZXQsXG4gICAgQ2hlY2tib3hXaWRnZXQsXG4gICAgRmlsZVdpZGdldCxcbiAgICBJbnRlZ2VyV2lkZ2V0LFxuICAgIFRleHRBcmVhV2lkZ2V0LFxuICAgIFJhZGlvV2lkZ2V0LFxuICAgIFJhbmdlV2lkZ2V0LFxuICAgIFNlbGVjdFdpZGdldCxcbiAgICBTdHJpbmdXaWRnZXRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTY2hlbWFGb3JtTW9kdWxlIHtcblxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNjaGVtYUZvcm1Nb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFsuLi5tb2R1bGVQcm92aWRlcnNdXG4gICAgfTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlU2NoZW1hU2VydmljZSB7XG5cbiAgY2hhbmdlcyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGNoYW5nZWQoKSB7XG4gICAgdGhpcy5jaGFuZ2VzLmVtaXQoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZVNjaGVtYUVsZW1lbnQge1xuXG4gIGdldFRleHRDb250ZW50KGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpOiBzdHJpbmcge1xuICAgIGNvbnN0IG5vZGVzID0gQXJyYXkuZnJvbShlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGROb2Rlcyk7XG4gICAgY29uc3Qgbm9kZSA9IDxIVE1MRWxlbWVudD5ub2Rlcy5maWx0ZXIoKGVsOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgcmV0dXJuIGVsLm5vZGVUeXBlID09PSBlbC5URVhUX05PREU7XG4gICAgfSkucG9wKCk7XG5cbiAgICBpZiAoIW5vZGUgfHwgIW5vZGUubm9kZVZhbHVlKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGUubm9kZVZhbHVlLnRyaW0oKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgVGVtcGxhdGVTY2hlbWFFbGVtZW50IH0gZnJvbSAnLi4vdGVtcGxhdGUtc2NoZW1hLWVsZW1lbnQnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBUZW1wbGF0ZVNjaGVtYUVsZW1lbnQsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBCdXR0b25Db21wb25lbnQpLFxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25Db21wb25lbnQgZXh0ZW5kcyBUZW1wbGF0ZVNjaGVtYUVsZW1lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcblxuICBASW5wdXQoKVxuICBpZDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGxhYmVsID0gJyc7XG5cbiAgQElucHV0KClcbiAgd2lkZ2V0OiBzdHJpbmcgfCBvYmplY3Q7XG5cbiAgQE91dHB1dCgpXG4gIGNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0TGFiZWxGcm9tQ29udGVudCgpIHtcbiAgICBjb25zdCB0ZXh0Q29udGVudCA9IHRoaXMuZ2V0VGV4dENvbnRlbnQodGhpcy5lbGVtZW50UmVmKTtcblxuICAgIC8vIGxhYmVsIGFzIEBJbnB1dCB0YWtlcyBwcmlvcml0eSBvdmVyIGNvbnRlbnQgdGV4dFxuICAgIGlmICh0ZXh0Q29udGVudCAmJiAhdGhpcy5sYWJlbCkge1xuICAgICAgdGhpcy5sYWJlbCA9IHRleHRDb250ZW50O1xuICAgIH1cblxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuc2V0TGFiZWxGcm9tQ29udGVudCgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gJy4uLy4uL21vZGVsL3ZhbGlkYXRvcic7XG5cbmV4cG9ydCBlbnVtIEZpZWxkVHlwZSB7XG4gIFN0cmluZyA9ICdzdHJpbmcnLFxuICBPYmplY3QgPSAnb2JqZWN0JyxcbiAgQXJyYXkgPSAnYXJyYXknLFxuICBCb29sZWFuID0gJ2Jvb2xlYW4nLFxuICBJbnRlZ2VyID0gICdpbnRlZ2VyJyxcbiAgTnVtYmVyID0gJ251bWJlcicsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGQge1xuICBuYW1lOiBzdHJpbmc7XG4gIHJlcXVpcmVkOiBib29sZWFuO1xuICBnZXRTY2hlbWEoKTogYW55O1xuICBnZXRCdXR0b25zKCk6IGFueTtcbiAgZ2V0VmFsaWRhdG9ycygpOiB7IHBhdGg6IHN0cmluZywgdmFsaWRhdG9yOiBWYWxpZGF0b3IgfVtdO1xufVxuXG5cbiIsImltcG9ydCB7IEVsZW1lbnRSZWYsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi9tb2RlbC92YWxpZGF0b3InO1xuaW1wb3J0IHsgQWN0aW9uUmVnaXN0cnkgfSBmcm9tICcuLi8uLi9tb2RlbC9hY3Rpb25yZWdpc3RyeSc7XG5pbXBvcnQgeyBCdXR0b25Db21wb25lbnQgfSBmcm9tICcuLi9idXR0b24vYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUZW1wbGF0ZVNjaGVtYUVsZW1lbnQgfSBmcm9tICcuLi90ZW1wbGF0ZS1zY2hlbWEtZWxlbWVudCc7XG5cbmltcG9ydCB7IEZpZWxkLCBGaWVsZFR5cGUgfSBmcm9tICcuL2ZpZWxkJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZpZWxkUGFyZW50IGV4dGVuZHMgVGVtcGxhdGVTY2hlbWFFbGVtZW50IHtcblxuICBuYW1lID0gJyc7XG4gIHR5cGU6IEZpZWxkVHlwZTtcblxuICBnZXQgcGF0aCgpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5uYW1lKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuICcvJyArIHRoaXMubmFtZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhY3Rpb25SZWdpc3RyeTogQWN0aW9uUmVnaXN0cnk7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjaGlsZEJ1dHRvbnM6IFF1ZXJ5TGlzdDxCdXR0b25Db21wb25lbnQ+O1xuXG5cbiAgZ2V0QnV0dG9ucygpOiB7IGlkOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIHdpZGdldD86IHN0cmluZyB8IG9iamVjdCB9W10ge1xuXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRCdXR0b25zLm1hcCgoYnV0dG9uLCBpbmRleCkgPT4ge1xuXG4gICAgICBpZiAoIWJ1dHRvbi5pZCkge1xuICAgICAgICBjb25zdCByYW5kb21TdHJpbmcgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE2KS5zdWJzdHIoMiwgOCk7XG4gICAgICAgIC8vIGdlbmVyYXRlIGlkIGZvciBidXR0b25cbiAgICAgICAgYnV0dG9uLmlkID0gdGhpcy5uYW1lICsgcmFuZG9tU3RyaW5nICsgJ18nICArIChpbmRleCArIDEpO1xuICAgICAgfVxuXG4gICAgICAvLyByZWdpc3RlciBhcyBidXR0b24gYWN0aW9uIHRoZSBFdmVudEVtaXR0ZXIgY2xpY2tcbiAgICAgIHRoaXMuYWN0aW9uUmVnaXN0cnkucmVnaXN0ZXIoXG4gICAgICAgIGJ1dHRvbi5pZCxcbiAgICAgICAgYnV0dG9uLmNsaWNrLmVtaXQuYmluZChidXR0b24uY2xpY2spXG4gICAgICApO1xuXG4gICAgICBjb25zdCBfYnV0dG9uID0gPGFueT57XG4gICAgICAgIGlkOiBidXR0b24uaWQsXG4gICAgICAgIGxhYmVsOiBidXR0b24ubGFiZWwsXG4gICAgICB9O1xuXG4gICAgICBpZiAoYnV0dG9uLndpZGdldCkge1xuICAgICAgICBfYnV0dG9uLndpZGdldCA9IGJ1dHRvbi53aWRnZXQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfYnV0dG9uO1xuXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RmllbGRzVmFsaWRhdG9ycyhcbiAgICBmaWVsZHM6IEZpZWxkW11cbiAgKTogeyBwYXRoOiBzdHJpbmcsIHZhbGlkYXRvcjogVmFsaWRhdG9yIH1bXSB7XG5cbiAgICByZXR1cm4gZmllbGRzLnJlZHVjZSgodmFsaWRhdG9ycywgZmllbGQpID0+IHtcbiAgICAgIHJldHVybiB2YWxpZGF0b3JzLmNvbmNhdChmaWVsZC5nZXRWYWxpZGF0b3JzKCkpO1xuICAgIH0sIFtdKTtcblxuICB9XG5cbiAgcHJvdGVjdGVkIGdldEZpZWxkc1NjaGVtYShmaWVsZHM6IEZpZWxkW10pIHtcbiAgICByZXR1cm4gZmllbGRzLnJlZHVjZSgoc2NoZW1hOiBhbnksIGZpZWxkKSA9PiB7XG5cbiAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgIGNhc2UgRmllbGRUeXBlLkFycmF5OlxuICAgICAgICAgIHNjaGVtYS5pdGVtcyA9IGZpZWxkLmdldFNjaGVtYSgpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgaWYgKCFzY2hlbWEucHJvcGVydGllcykge1xuICAgICAgICAgICAgc2NoZW1hLnByb3BlcnRpZXMgPSB7fTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzY2hlbWEucHJvcGVydGllc1tmaWVsZC5uYW1lXSA9IGZpZWxkLmdldFNjaGVtYSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBidXR0b25zID0gZmllbGQuZ2V0QnV0dG9ucygpO1xuICAgICAgaWYgKGJ1dHRvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBzY2hlbWEuYnV0dG9ucyA9IGJ1dHRvbnM7XG4gICAgICB9XG5cbiAgICAgIGlmICghZmllbGQucmVxdWlyZWQpIHtcbiAgICAgICAgcmV0dXJuIHNjaGVtYTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzY2hlbWEucmVxdWlyZWQpIHtcbiAgICAgICAgc2NoZW1hLnJlcXVpcmVkID0gW107XG4gICAgICB9XG4gICAgICBzY2hlbWEucmVxdWlyZWQucHVzaChmaWVsZC5uYW1lKTtcbiAgICAgIHJldHVybiBzY2hlbWE7XG4gICAgfSwge30pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gQ29tcG9uZW50LFxuIEVsZW1lbnRSZWYsXG4gSW5wdXQsXG4gT25Jbml0LFxuIGZvcndhcmRSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFRlbXBsYXRlU2NoZW1hRWxlbWVudCB9IGZyb20gJy4uLy4uL3RlbXBsYXRlLXNjaGVtYS1lbGVtZW50JztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1pdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2l0ZW0uY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1Db21wb25lbnQgZXh0ZW5kcyBUZW1wbGF0ZVNjaGVtYUVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIHZhbHVlOiBhbnk7XG5cbiAgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMuZ2V0VGV4dENvbnRlbnQodGhpcy5lbGVtZW50UmVmKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIE9uSW5pdCxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBWaWV3Q2hpbGQsXG4gIFF1ZXJ5TGlzdCxcbiAgRWxlbWVudFJlZixcbiAgZm9yd2FyZFJlZixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlLFxuICBPbkNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuLi8uLi9tb2RlbC9hY3Rpb24nO1xuaW1wb3J0IHsgQWN0aW9uUmVnaXN0cnkgfSBmcm9tICcuLi8uLi9tb2RlbC9hY3Rpb25yZWdpc3RyeSc7XG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi9tb2RlbC92YWxpZGF0b3InO1xuXG5pbXBvcnQgeyBUZW1wbGF0ZVNjaGVtYUVsZW1lbnQgfSBmcm9tICcuLi90ZW1wbGF0ZS1zY2hlbWEtZWxlbWVudCc7XG5pbXBvcnQgeyBUZW1wbGF0ZVNjaGVtYVNlcnZpY2UgfSBmcm9tICcuLi90ZW1wbGF0ZS1zY2hlbWEuc2VydmljZSc7XG5pbXBvcnQgeyBCdXR0b25Db21wb25lbnQgfSBmcm9tICcuLi9idXR0b24vYnV0dG9uLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IEZpZWxkUGFyZW50IH0gZnJvbSAnLi9maWVsZC1wYXJlbnQnO1xuaW1wb3J0IHsgRmllbGRUeXBlLCBGaWVsZCB9IGZyb20gJy4vZmllbGQnO1xuaW1wb3J0IHsgSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vaXRlbS9pdGVtLmNvbXBvbmVudCc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZmllbGQuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEZpZWxkQ29tcG9uZW50IGV4dGVuZHMgRmllbGRQYXJlbnQgaW1wbGVtZW50c1xuRmllbGQsIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCB7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihGaWVsZENvbXBvbmVudClcbiAgY2hpbGRGaWVsZHM6IFF1ZXJ5TGlzdDxGaWVsZENvbXBvbmVudD47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihJdGVtQ29tcG9uZW50KVxuICBjaGlsZEl0ZW1zOiBRdWVyeUxpc3Q8SXRlbUNvbXBvbmVudD47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihCdXR0b25Db21wb25lbnQpXG4gIGNoaWxkQnV0dG9uczogUXVlcnlMaXN0PEJ1dHRvbkNvbXBvbmVudD47XG5cbiAgQElucHV0KClcbiAgbmFtZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHR5cGUgPSBGaWVsZFR5cGUuU3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGZvcm1hdDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHJlYWRPbmx5OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBASW5wdXQoKVxuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHdpZGdldDogc3RyaW5nIHwgb2JqZWN0O1xuXG4gIEBJbnB1dCgpXG4gIHZhbGlkYXRvcjogVmFsaWRhdG9yO1xuXG4gIEBJbnB1dCgpXG4gIHNjaGVtYTogYW55ID0geyB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHRlbXBsYXRlU2NoZW1hU2VydmljZTogVGVtcGxhdGVTY2hlbWFTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhY3Rpb25SZWdpc3RyeTogQWN0aW9uUmVnaXN0cnlcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGdldFNjaGVtYSgpOiBhbnkge1xuXG4gICAgY29uc3QgeyBwcm9wZXJ0aWVzLCBpdGVtcywgcmVxdWlyZWQgfSA9IHRoaXMuZ2V0RmllbGRzU2NoZW1hKFxuICAgICAgdGhpcy5jaGlsZEZpZWxkcy5maWx0ZXIoZmllbGQgPT4gZmllbGQgIT09IHRoaXMpXG4gICAgKTtcblxuICAgIGNvbnN0IG9uZU9mID0gdGhpcy5nZXRPbmVPZigpO1xuXG4gICAgY29uc3Qgc2NoZW1hID0gPGFueT57XG4gICAgICB0eXBlOiB0aGlzLnR5cGVcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMudGl0bGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLnRpdGxlID0gdGhpcy50aXRsZTtcbiAgICB9XG5cbiAgICBpZiAocHJvcGVydGllcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2hlbWEucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgaWYgKGl0ZW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjaGVtYS5pdGVtcyA9IGl0ZW1zO1xuICAgIH1cblxuICAgIC8vIHJlcXVyaWVkIGNoaWxkIGZpZWxkc1xuICAgIGlmIChyZXF1aXJlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2hlbWEucmVxdWlyZWQgPSByZXF1aXJlZDtcbiAgICB9XG5cbiAgICBpZiAob25lT2YgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLm9uZU9mID0gb25lT2Y7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLmRlc2NyaXB0aW9uID0gdGhpcy5kZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wbGFjZWhvbGRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2hlbWEucGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZvcm1hdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2hlbWEuZm9ybWF0ID0gdGhpcy5mb3JtYXQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMud2lkZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjaGVtYS53aWRnZXQgPSB0aGlzLndpZGdldDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yZWFkT25seSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2hlbWEucmVhZE9ubHkgPSB0aGlzLnJlYWRPbmx5O1xuICAgIH1cblxuICAgIGNvbnN0IGJ1dHRvbnMgPSB0aGlzLmdldEJ1dHRvbnMoKTtcbiAgICBpZiAoYnV0dG9ucy5sZW5ndGggPiAwKSB7XG4gICAgICBzY2hlbWEuYnV0dG9ucyA9IGJ1dHRvbnM7XG4gICAgfVxuXG4gICAgLy8gQElucHV0IHNjaGVtYSB0YWtlcyBwcmVjZWRlbmNlXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oc2NoZW1hLCB0aGlzLnNjaGVtYSk7XG5cbiAgfVxuXG4gIGdldFZhbGlkYXRvcnMoKTogeyBwYXRoOiBzdHJpbmcsIHZhbGlkYXRvcjogVmFsaWRhdG9yIH1bXSB7XG5cbiAgICAvLyByZWdpc3RlcmluZyB2YWxpZGF0b3IgaGVyZSBpcyBub3QgcG9zc2libGUgc2luY2UgcHJvcCBmdWxsIHBhdGggaXMgbmVlZGVkXG4gICAgY29uc3QgY2hpbGRWYWxpZGF0b3JzID0gdGhpcy5nZXRGaWVsZHNWYWxpZGF0b3JzKFxuICAgICAgdGhpcy5jaGlsZEZpZWxkcy5maWx0ZXIoZmllbGQgPT4gZmllbGQgIT09IHRoaXMpXG4gICAgKTtcbiAgICBjb25zdCB2YWxpZGF0b3JzID0gY2hpbGRWYWxpZGF0b3JzLm1hcCgoeyBwYXRoLCB2YWxpZGF0b3IgfSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aDogdGhpcy5wYXRoICsgcGF0aCxcbiAgICAgICAgdmFsaWRhdG9yXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgaWYgKCF0aGlzLnZhbGlkYXRvcikge1xuICAgICAgcmV0dXJuIHZhbGlkYXRvcnM7XG4gICAgfVxuXG4gICAgdmFsaWRhdG9ycy5wdXNoKHsgcGF0aDogdGhpcy5wYXRoLCB2YWxpZGF0b3I6IHRoaXMudmFsaWRhdG9yIH0pO1xuICAgIHJldHVybiB2YWxpZGF0b3JzO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuXG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGNoYW5nZXMpO1xuICAgIGlmIChrZXlzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgICAgaWYgKCFjaGFuZ2VzW2tleV0uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICAgICAgLy8gb24gYW55IGlucHV0IGNoYW5nZSwgZm9yY2Ugc2NoZW1hIGNoYW5nZSBnZW5lcmF0aW9uXG4gICAgICAgICAgdGhpcy50ZW1wbGF0ZVNjaGVtYVNlcnZpY2UuY2hhbmdlZCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuXG4gIHByaXZhdGUgZ2V0T25lT2YoKSB7XG5cbiAgICBpZiAodGhpcy5jaGlsZEl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5jaGlsZEl0ZW1zLm1hcCgoeyB2YWx1ZSwgZGVzY3JpcHRpb24gfSkgPT4ge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4geyBlbnVtOiBbdmFsdWVdLCBkZXNjcmlwdGlvbiB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4geyBlbnVtOiB2YWx1ZSwgZGVzY3JpcHRpb24gfTtcbiAgICB9KTtcblxuICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlbXM7XG4gIH1cblxuXG4gIHByaXZhdGUgc2V0VGl0bGVGcm9tQ29udGVudCgpIHtcbiAgICBjb25zdCB0ZXh0Q29udGVudCA9IHRoaXMuZ2V0VGV4dENvbnRlbnQodGhpcy5lbGVtZW50UmVmKTtcblxuICAgIC8vICB0aXRsZSBhcyBASW5wdXQgdGFrZXMgcHJpb3JpdHkgb3ZlciBjb250ZW50IHRleHRcbiAgICBpZiAodGV4dENvbnRlbnQgJiYgIXRoaXMudGl0bGUpIHtcbiAgICAgIHRoaXMudGl0bGUgPSB0ZXh0Q29udGVudDtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG5cbiAgICAvLyBjYWNoZSBpdFxuICAgIHRoaXMuc2V0VGl0bGVGcm9tQ29udGVudCgpO1xuXG4gICAgbWVyZ2UoXG4gICAgICB0aGlzLmNoaWxkRmllbGRzLmNoYW5nZXMsXG4gICAgICB0aGlzLmNoaWxkSXRlbXMuY2hhbmdlcyxcbiAgICAgIHRoaXMuY2hpbGRCdXR0b25zLmNoYW5nZXNcbiAgICApXG4gICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnRlbXBsYXRlU2NoZW1hU2VydmljZS5jaGFuZ2VkKCkpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgQ29udGVudENoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEhvc3RCaW5kaW5nLFxuICBTaW1wbGVDaGFuZ2UsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi4vZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWN0aW9uUmVnaXN0cnkgfSBmcm9tICcuLi9tb2RlbC9hY3Rpb25yZWdpc3RyeSc7XG5pbXBvcnQgeyBWYWxpZGF0b3JSZWdpc3RyeSB9IGZyb20gJy4uL21vZGVsL3ZhbGlkYXRvcnJlZ2lzdHJ5JztcbmltcG9ydCB7IFRlcm1pbmF0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vdGVybWluYXRvci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgVGVtcGxhdGVTY2hlbWFTZXJ2aWNlIH0gZnJvbSAnLi90ZW1wbGF0ZS1zY2hlbWEuc2VydmljZSc7XG5pbXBvcnQgeyBGaWVsZENvbXBvbmVudCB9IGZyb20gJy4vZmllbGQvZmllbGQuY29tcG9uZW50JztcbmltcG9ydCB7IEZpZWxkVHlwZSwgRmllbGQgfSBmcm9tICcuL2ZpZWxkL2ZpZWxkJztcbmltcG9ydCB7IEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vYnV0dG9uL2J1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmllbGRQYXJlbnQgfSBmcm9tICcuL2ZpZWxkL2ZpZWxkLXBhcmVudCc7XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnc2YtZm9ybVt0ZW1wbGF0ZVNjaGVtYV0nLFxuICBwcm92aWRlcnM6IFtcbiAgICBUZW1wbGF0ZVNjaGVtYVNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZVNjaGVtYURpcmVjdGl2ZSBleHRlbmRzIEZpZWxkUGFyZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihGaWVsZENvbXBvbmVudClcbiAgY2hpbGRGaWVsZHM6IFF1ZXJ5TGlzdDxGaWVsZENvbXBvbmVudD47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihCdXR0b25Db21wb25lbnQpXG4gIGNoaWxkQnV0dG9uczogUXVlcnlMaXN0PEJ1dHRvbkNvbXBvbmVudD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGFjdGlvblJlZ2lzdHJ5OiBBY3Rpb25SZWdpc3RyeSxcbiAgICBwcm90ZWN0ZWQgdmFsaWRhdG9yUmVnaXN0cnk6IFZhbGlkYXRvclJlZ2lzdHJ5LFxuICAgIHByaXZhdGUgZm9ybUNvbXBvbmVudDogRm9ybUNvbXBvbmVudCxcbiAgICBwcml2YXRlIHRlcm1pbmF0b3JTZXJ2aWNlOiBUZXJtaW5hdG9yU2VydmljZSxcbiAgICBwcml2YXRlIHRlbXBsYXRlU2NoZW1hU2VydmljZTogVGVtcGxhdGVTY2hlbWFTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBzZXRGb3JtRG9jdW1lbnRTY2hlbWEoZmllbGRzOiBGaWVsZENvbXBvbmVudFtdKSB7XG4gICAgICB0aGlzLmFjdGlvblJlZ2lzdHJ5LmNsZWFyKCk7XG4gICAgICB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LmNsZWFyKCk7XG5cbiAgICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMuZ2V0RmllbGRzU2NoZW1hKGZpZWxkcyk7XG5cbiAgICAgIGNvbnN0IHZhbGlkYXRvcnMgPSB0aGlzLmdldEZpZWxkc1ZhbGlkYXRvcnMoZmllbGRzKTtcbiAgICAgIHZhbGlkYXRvcnMuZm9yRWFjaCgoeyBwYXRoLCB2YWxpZGF0b3IgfSkgPT4ge1xuICAgICAgICB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LnJlZ2lzdGVyKHBhdGgsIHZhbGlkYXRvcik7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcHJldmlvdXNTY2hlbWEgPSB0aGlzLmZvcm1Db21wb25lbnQuc2NoZW1hO1xuICAgICAgdGhpcy5mb3JtQ29tcG9uZW50LnNjaGVtYSA9IHtcbiAgICAgICAgdHlwZTogRmllbGRUeXBlLk9iamVjdCxcbiAgICAgICAgcHJvcGVydGllczogc2NoZW1hLnByb3BlcnRpZXNcbiAgICAgIH07XG5cbiAgICAgIGlmIChzY2hlbWEucmVxdWlyZWQgJiYgc2NoZW1hLnJlcXVpcmVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5mb3JtQ29tcG9uZW50LnNjaGVtYS5yZXF1cmVkID0gc2NoZW1hLnJlcXVpcmVkO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBidXR0b25zID0gdGhpcy5nZXRCdXR0b25zKCk7XG4gICAgICBpZiAoYnV0dG9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZm9ybUNvbXBvbmVudC5zY2hlbWEuYnV0dG9ucyA9IGJ1dHRvbnM7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZm9ybUNvbXBvbmVudC5uZ09uQ2hhbmdlcyh7XG4gICAgICAgIHNjaGVtYTogbmV3IFNpbXBsZUNoYW5nZShcbiAgICAgICAgICBwcmV2aW91c1NjaGVtYSxcbiAgICAgICAgICB0aGlzLmZvcm1Db21wb25lbnQuc2NoZW1hLFxuICAgICAgICAgIEJvb2xlYW4ocHJldmlvdXNTY2hlbWEpXG4gICAgICAgIClcbiAgICAgIH0pO1xuXG4gIH1cblxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblxuICAgIGlmICh0aGlzLmNoaWxkRmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc2V0Rm9ybURvY3VtZW50U2NoZW1hKHRoaXMuY2hpbGRGaWVsZHMudG9BcnJheSgpKTtcbiAgICB9XG5cbiAgICBtZXJnZShcbiAgICAgIHRoaXMuY2hpbGRGaWVsZHMuY2hhbmdlcyxcbiAgICAgIHRoaXMudGVtcGxhdGVTY2hlbWFTZXJ2aWNlLmNoYW5nZXNcbiAgICApXG4gICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMudGVybWluYXRvclNlcnZpY2UuZGVzdHJveSgpO1xuICAgICAgdGhpcy5zZXRGb3JtRG9jdW1lbnRTY2hlbWEodGhpcy5jaGlsZEZpZWxkcy50b0FycmF5KCkpO1xuICAgIH0pO1xuXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IEZpZWxkQ29tcG9uZW50IH0gZnJvbSAnLi9maWVsZC9maWVsZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGVtcGxhdGVTY2hlbWFEaXJlY3RpdmUgfSBmcm9tICcuL3RlbXBsYXRlLXNjaGVtYS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9idXR0b24vYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9maWVsZC9pdGVtL2l0ZW0uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBUZW1wbGF0ZVNjaGVtYURpcmVjdGl2ZSxcbiAgICBGaWVsZENvbXBvbmVudCxcbiAgICBCdXR0b25Db21wb25lbnQsXG4gICAgSXRlbUNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgVGVtcGxhdGVTY2hlbWFEaXJlY3RpdmUsXG4gICAgRmllbGRDb21wb25lbnQsXG4gICAgQnV0dG9uQ29tcG9uZW50LFxuICAgIEl0ZW1Db21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZVNjaGVtYU1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fdmFsdWVzIiwidHNsaWJfMS5fX2V4dGVuZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBO0lBQUE7UUFDRSxZQUFPLEdBQTRCLEVBQUUsQ0FBQztLQWF2Qzs7OztJQVhDLDhCQUFLOzs7SUFBTDtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0tBQ25COzs7Ozs7SUFFRCxpQ0FBUTs7Ozs7SUFBUixVQUFTLFFBQWdCLEVBQUUsTUFBYztRQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQztLQUNqQzs7Ozs7SUFFRCw0QkFBRzs7OztJQUFILFVBQUksUUFBZ0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQy9CO0lBQ0gscUJBQUM7Q0FBQTs7Ozs7Ozs7O0FDVEQ7Ozs7SUFlRSxzQkFBWSxzQkFBOEMsRUFDdEMsaUJBQW9DLEVBQ3JDLE1BQVcsRUFDbEIsTUFBcUIsRUFDckIsSUFBWTtRQUhKLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDckMsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQWQ5QixXQUFNLEdBQVEsSUFBSSxDQUFDO1FBQ25CLFlBQU8sR0FBUSxJQUFJLENBQUM7UUFDWixrQkFBYSxHQUFHLElBQUksZUFBZSxDQUFNLElBQUksQ0FBQyxDQUFDO1FBQy9DLG1CQUFjLEdBQUcsSUFBSSxlQUFlLENBQU0sSUFBSSxDQUFDLENBQUM7UUFDaEQsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNo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