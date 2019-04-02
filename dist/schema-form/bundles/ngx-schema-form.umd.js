(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('rxjs/operators'), require('z-schema'), require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-schema-form', ['exports', 'rxjs', 'rxjs/operators', 'z-schema', '@angular/core', '@angular/forms', '@angular/common'], factory) :
    (factory((global['ngx-schema-form'] = {}),global.rxjs,global.rxjs.operators,global.ZSchema,global.ng.core,global.ng.forms,global.ng.common));
}(this, (function (exports,rxjs,operators,ZSchema,core,forms,common) { 'use strict';

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

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ FormProperty = /** @class */ (function () {
        function FormProperty(schemaValidatorFactory, validatorRegistry, schema, parent, path) {
            this.validatorRegistry = validatorRegistry;
            this.schema = schema;
            this._value = null;
            this._errors = null;
            this._valueChanges = new rxjs.BehaviorSubject(null);
            this._errorsChanges = new rxjs.BehaviorSubject(null);
            this._visible = true;
            this._visibilityChanges = new rxjs.BehaviorSubject(true);
            this.schemaValidator = schemaValidatorFactory.createValidatorFn(this.schema);
            this._parent = parent;
            if (parent) {
                this._root = parent.root;
            }
            else if (this instanceof PropertyGroup) {
                this._root = ( /** @type {?} */(( /** @type {?} */(this))));
            }
            this._path = path;
        }
        Object.defineProperty(FormProperty.prototype, "valueChanges", {
            get: /**
             * @return {?}
             */ function () {
                return this._valueChanges;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormProperty.prototype, "errorsChanges", {
            get: /**
             * @return {?}
             */ function () {
                return this._errorsChanges;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormProperty.prototype, "type", {
            get: /**
             * @return {?}
             */ function () {
                return this.schema.type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormProperty.prototype, "parent", {
            get: /**
             * @return {?}
             */ function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormProperty.prototype, "root", {
            get: /**
             * @return {?}
             */ function () {
                return this._root || ( /** @type {?} */(( /** @type {?} */(this))));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormProperty.prototype, "path", {
            get: /**
             * @return {?}
             */ function () {
                return this._path;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormProperty.prototype, "value", {
            get: /**
             * @return {?}
             */ function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormProperty.prototype, "visible", {
            get: /**
             * @return {?}
             */ function () {
                return this._visible;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormProperty.prototype, "valid", {
            get: /**
             * @return {?}
             */ function () {
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
                if (onlySelf === void 0) {
                    onlySelf = false;
                }
                if (emitEvent === void 0) {
                    emitEvent = true;
                }
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
                return ( /** @type {?} */(property));
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
                                                        valueCheck = property.valueChanges.pipe(operators.map(function (value) {
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
                                                                    catch (e_4_1) {
                                                                        e_4 = { error: e_4_1 };
                                                                    }
                                                                    finally {
                                                                        try {
                                                                            if (_f && !_f.done && (_b = _e.return))
                                                                                _b.call(_e);
                                                                        }
                                                                        finally {
                                                                            if (e_4)
                                                                                throw e_4.error;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            catch (e_3_1) {
                                                                e_3 = { error: e_3_1 };
                                                            }
                                                            finally {
                                                                try {
                                                                    if (_d && !_d.done && (_a = _c.return))
                                                                        _a.call(_c);
                                                                }
                                                                finally {
                                                                    if (e_3)
                                                                        throw e_3.error;
                                                                }
                                                            }
                                                            return true;
                                                        };
                                                        valueCheck = property.valueChanges.pipe(operators.map(_chk));
                                                    }
                                                    /** @type {?} */
                                                    var visibilityCheck = property._visibilityChanges;
                                                    /** @type {?} */
                                                    var and = rxjs.combineLatest([valueCheck, visibilityCheck], function (v1, v2) { return v1 && v2; });
                                                    propertiesBinding.push(and);
                                                }
                                            }
                                        }
                                        catch (e_2_1) {
                                            e_2 = { error: e_2_1 };
                                        }
                                        finally {
                                            try {
                                                if (properties_1_1 && !properties_1_1.done && (_a = properties_1.return))
                                                    _a.call(properties_1);
                                            }
                                            finally {
                                                if (e_2)
                                                    throw e_2.error;
                                            }
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
                            rxjs.combineLatest(propertiesBinding, function () {
                                var values = [];
                                for (var _i = 0; _i < arguments.length; _i++) {
                                    values[_i] = arguments[_i];
                                }
                                return values.indexOf(true) !== -1;
                            }).pipe(operators.distinctUntilChanged()).subscribe(function (visible) {
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
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (visibleIfOf_1_1 && !visibleIfOf_1_1.done && (_a = visibleIfOf_1.return))
                                _a.call(visibleIfOf_1);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
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
                                            var valueCheck = property.valueChanges.pipe(operators.map(function (value) {
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
                                            var and = rxjs.combineLatest([valueCheck, visibilityCheck], function (v1, v2) { return v1 && v2; });
                                            propertiesBinding.push(and);
                                        }
                                    }
                                }
                                catch (e_5_1) {
                                    e_5 = { error: e_5_1 };
                                }
                                finally {
                                    try {
                                        if (properties_2_1 && !properties_2_1.done && (_a = properties_2.return))
                                            _a.call(properties_2);
                                    }
                                    finally {
                                        if (e_5)
                                            throw e_5.error;
                                    }
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
                    rxjs.combineLatest(propertiesBinding, function () {
                        var values = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            values[_i] = arguments[_i];
                        }
                        return values.indexOf(true) !== -1;
                    }).pipe(operators.distinctUntilChanged()).subscribe(function (visible) {
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
                catch (e_6_1) {
                    e_6 = { error: e_6_1 };
                }
                finally {
                    try {
                        if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return))
                            _a.call(paths_1);
                    }
                    finally {
                        if (e_6)
                            throw e_6.error;
                    }
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
                        var arrProp = ( /** @type {?} */(prop.properties));
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
     */ PropertyGroup = /** @class */ (function (_super) {
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
                 */ function (target, p, value, receiver) {
                    /**
                     * 1) Make sure a canonical path is set
                     * @type {?}
                     */
                    var assertCanonicalPath = function (propertyValue) {
                        var e_7, _a;
                        /** @type {?} */
                        var formProperty = ( /** @type {?} */(propertyValue));
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
                                formProperty._canonicalPath = getCanonicalPath(formProperty._canonicalPath, ( /** @type {?} */(p)));
                            }
                        }
                        /** @type {?} */
                        var propertyGroup = ( /** @type {?} */(formProperty));
                        /** @type {?} */
                        var propertyGroupChildren = ( /** @type {?} */((Array.isArray(propertyGroup.properties) ?
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
                            catch (e_7_1) {
                                e_7 = { error: e_7_1 };
                            }
                            finally {
                                try {
                                    if (propertyGroupChildren_1_1 && !propertyGroupChildren_1_1.done && (_a = propertyGroupChildren_1.return))
                                        _a.call(propertyGroupChildren_1);
                                }
                                finally {
                                    if (e_7)
                                        throw e_7.error;
                                }
                            }
                        }
                        return { property: formProperty, children: propertyGroupChildren };
                    };
                    var _a = assertCanonicalPath(value), property = _a.property, children = _a.children;
                    /**
                     * 2) Add the new property before rebinding, so it can be found by <code>_bindVisibility</code>
                     * @type {?}
                     */
                    var result = target[( /** @type {?} */(p))] = value;
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
                            catch (e_10_1) {
                                e_10 = { error: e_10_1 };
                            }
                            finally {
                                try {
                                    if (rebind_1_1 && !rebind_1_1.done && (_a = rebind_1.return))
                                        _a.call(rebind_1);
                                }
                                finally {
                                    if (e_10)
                                        throw e_10.error;
                                }
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
                                        catch (e_9_1) {
                                            e_9 = { error: e_9_1 };
                                        }
                                        finally {
                                            try {
                                                if (rebindPaths_1_1 && !rebindPaths_1_1.done && (_b = rebindPaths_1.return))
                                                    _b.call(rebindPaths_1);
                                            }
                                            finally {
                                                if (e_9)
                                                    throw e_9.error;
                                            }
                                        }
                                    }
                                    catch (e) {
                                        console.error('Rebinding visibility error at path:', _property.path, 'property:', _property, e);
                                    }
                                }
                            }
                        }
                        catch (e_8_1) {
                            e_8 = { error: e_8_1 };
                        }
                        finally {
                            try {
                                if (rebindAll_1_1 && !rebindAll_1_1.done && (_a = rebindAll_1.return))
                                    _a.call(rebindAll_1);
                            }
                            finally {
                                if (e_8)
                                    throw e_8.error;
                            }
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
                 */ function (target, p, receiver) {
                    return target[( /** @type {?} */(p))];
                },
                deleteProperty: /**
                 * @param {?} target
                 * @param {?} p
                 * @return {?}
                 */ function (target, p) {
                    return delete target[( /** @type {?} */(p))];
                }
            };
            return _this;
        }
        Object.defineProperty(PropertyGroup.prototype, "properties", {
            get: /**
             * @return {?}
             */ function () {
                return this._properties;
            },
            set: /**
             * @param {?} properties
             * @return {?}
             */ function (properties) {
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
                    property = (( /** @type {?} */(property))).getProperty(subPath);
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
                        (( /** @type {?} */(child))).forEachChildRecursive(fn);
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
     */ AtomicProperty = /** @class */ (function (_super) {
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
                if (onlySelf === void 0) {
                    onlySelf = false;
                }
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
                if (value === void 0) {
                    value = null;
                }
                if (onlySelf === void 0) {
                    onlySelf = true;
                }
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
                if (onlySelf === void 0) {
                    onlySelf = false;
                }
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
                if (onlySelf === void 0) {
                    onlySelf = true;
                }
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
                if (value === void 0) {
                    value = null;
                }
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
                (( /** @type {?} */(this.properties))).push(newProperty);
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
                this.properties = (( /** @type {?} */(this.properties))).filter(function (i) { return i !== item; });
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
                if (onlySelf === void 0) {
                    onlySelf = true;
                }
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
                if (parent === void 0) {
                    parent = null;
                }
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
                if (path === void 0) {
                    path = '/';
                }
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
                        catch (e_2_1) {
                            e_2 = { error: e_2_1 };
                        }
                        finally {
                            try {
                                if (_g && !_g.done && (_b = _f.return))
                                    _b.call(_f);
                            }
                            finally {
                                if (e_2)
                                    throw e_2.error;
                            }
                        }
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return))
                            _a.call(_d);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
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
                catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                }
                finally {
                    try {
                        if (fieldsId_1_1 && !fieldsId_1_1.done && (_c = fieldsId_1.return))
                            _c.call(fieldsId_1);
                    }
                    finally {
                        if (e_3)
                            throw e_3.error;
                    }
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
    var /**
     * @abstract
     */ SchemaValidatorFactory = /** @class */ (function () {
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        WidgetFactory.ctorParameters = function () {
            return [
                { type: WidgetRegistry },
                { type: core.ComponentFactoryResolver }
            ];
        };
        return WidgetFactory;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var TerminatorService = /** @class */ (function () {
        function TerminatorService() {
            this.onDestroy = new rxjs.Subject();
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
            { type: core.Injectable }
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
    var /**
     * General purpose propery binding registry
     */ PropertyBindingRegistry = /** @class */ (function () {
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
     */ PropertyBindings = /** @class */ (function () {
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
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
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
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
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
                catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                }
                finally {
                    try {
                        if (pathIndex_1_1 && !pathIndex_1_1.done && (_a = pathIndex_1.return))
                            _a.call(pathIndex_1);
                    }
                    finally {
                        if (e_3)
                            throw e_3.error;
                    }
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
                var _keys = (( /** @type {?} */((Array.isArray(segment) ? segment : [segment])))).concat(wild);
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
                catch (e_4_1) {
                    e_4 = { error: e_4_1 };
                }
                finally {
                    try {
                        if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return))
                            _a.call(keys_1);
                    }
                    finally {
                        if (e_4)
                            throw e_4.error;
                    }
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
            this.onChange = new core.EventEmitter();
            this.modelChange = new core.EventEmitter();
            this.isValid = new core.EventEmitter();
            this.onErrorChange = new core.EventEmitter();
            this.onErrorsChange = new core.EventEmitter();
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
            { type: core.Component, args: [{
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
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: FormComponent,
                                multi: true
                            }
                        ]
                    }] }
        ];
        /** @nocollapse */
        FormComponent.ctorParameters = function () {
            return [
                { type: FormPropertyFactory },
                { type: ActionRegistry },
                { type: ValidatorRegistry },
                { type: BindingRegistry },
                { type: core.ChangeDetectorRef },
                { type: TerminatorService }
            ];
        };
        FormComponent.propDecorators = {
            schema: [{ type: core.Input }],
            model: [{ type: core.Input }],
            actions: [{ type: core.Input }],
            validators: [{ type: core.Input }],
            bindings: [{ type: core.Input }],
            onChange: [{ type: core.Output }],
            modelChange: [{ type: core.Output }],
            isValid: [{ type: core.Output }],
            onErrorChange: [{ type: core.Output }],
            onErrorsChange: [{ type: core.Output }]
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
            this.control = new forms.FormControl('', function () { return null; });
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
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return))
                                _a.call(_b);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
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
            { type: core.Component, args: [{
                        selector: 'sf-form-element',
                        template: "\n    <div *ngIf=\"formProperty.visible\"\n         [class.has-error]=\"!control.valid\"\n         [class.has-success]=\"control.valid\">\n      <sf-widget-chooser\n        (widgetInstanciated)=\"onWidgetInstanciated($event)\"\n        [widgetInfo]=\"formProperty.schema.widget\">\n      </sf-widget-chooser>\n      <sf-form-element-action *ngFor=\"let button of buttons\" [button]=\"button\" [formProperty]=\"formProperty\"></sf-form-element-action>\n    </div>"
                    }] }
        ];
        /** @nocollapse */
        FormElementComponent.ctorParameters = function () {
            return [
                { type: ActionRegistry },
                { type: BindingRegistry },
                { type: core.Renderer2 },
                { type: core.ElementRef }
            ];
        };
        FormElementComponent.propDecorators = {
            formProperty: [{ type: core.Input }]
        };
        return FormElementComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var FormElementComponentAction = /** @class */ (function () {
        function FormElementComponentAction(widgetFactory, terminator) {
            if (widgetFactory === void 0) {
                widgetFactory = null;
            }
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
            { type: core.Component, args: [{
                        selector: 'sf-form-element-action',
                        template: '<ng-template #target></ng-template>'
                    }] }
        ];
        /** @nocollapse */
        FormElementComponentAction.ctorParameters = function () {
            return [
                { type: WidgetFactory },
                { type: TerminatorService }
            ];
        };
        FormElementComponentAction.propDecorators = {
            button: [{ type: core.Input }],
            formProperty: [{ type: core.Input }],
            container: [{ type: core.ViewChild, args: ['target', { read: core.ViewContainerRef },] }]
        };
        return FormElementComponentAction;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var WidgetChooserComponent = /** @class */ (function () {
        function WidgetChooserComponent(widgetFactory, cdr, terminator) {
            if (widgetFactory === void 0) {
                widgetFactory = null;
            }
            this.widgetFactory = widgetFactory;
            this.cdr = cdr;
            this.terminator = terminator;
            this.widgetInstanciated = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'sf-widget-chooser',
                        template: "<div #target></div>"
                    }] }
        ];
        /** @nocollapse */
        WidgetChooserComponent.ctorParameters = function () {
            return [
                { type: WidgetFactory },
                { type: core.ChangeDetectorRef },
                { type: TerminatorService }
            ];
        };
        WidgetChooserComponent.propDecorators = {
            widgetInfo: [{ type: core.Input }],
            widgetInstanciated: [{ type: core.Output }],
            container: [{ type: core.ViewChild, args: ['target', { read: core.ViewContainerRef },] }]
        };
        return WidgetChooserComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /**
     * @abstract
     * @template T
     */
    var /**
     * @abstract
     * @template T
     */ Widget = /** @class */ (function () {
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
            { type: core.Component, args: [{
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
            { type: core.Component, args: [{
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
            { type: core.Component, args: [{
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
            { type: core.Component, args: [{
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
                    _this.filedata.data = window.btoa((( /** @type {?} */(_this.reader.result))));
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
            { type: core.Component, args: [{
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
            { type: core.Component, args: [{
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
            { type: core.Component, args: [{
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
            { type: core.Component, args: [{
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
            { type: core.Component, args: [{
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
            { type: core.Component, args: [{
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
            { type: core.Component, args: [{
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
            { type: core.Component, args: [{
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
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, forms.FormsModule, forms.ReactiveFormsModule],
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
            this.changes = new core.EventEmitter();
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
                var node = ( /** @type {?} */(nodes.filter(function (el) {
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
            _this.click = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'sf-button',
                        template: "<ng-content></ng-content>\n",
                        providers: [
                            {
                                provide: TemplateSchemaElement,
                                useExisting: core.forwardRef(function () { return ButtonComponent; }),
                            }
                        ]
                    }] }
        ];
        /** @nocollapse */
        ButtonComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef }
            ];
        };
        ButtonComponent.propDecorators = {
            id: [{ type: core.Input }],
            label: [{ type: core.Input }],
            widget: [{ type: core.Input }],
            click: [{ type: core.Output }]
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
    var /**
     * @abstract
     */ FieldParent = /** @class */ (function (_super) {
        __extends(FieldParent, _super);
        function FieldParent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = '';
            return _this;
        }
        Object.defineProperty(FieldParent.prototype, "path", {
            get: /**
             * @return {?}
             */ function () {
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
                    var _button = ( /** @type {?} */({
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
            { type: core.Component, args: [{
                        selector: 'sf-item',
                        template: "<ng-content></ng-content>\n"
                    }] }
        ];
        /** @nocollapse */
        ItemComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef }
            ];
        };
        ItemComponent.propDecorators = {
            value: [{ type: core.Input }]
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
                var schema = ( /** @type {?} */({
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
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return))
                                _a.call(keys_1);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
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
                rxjs.merge(this.childFields.changes, this.childItems.changes, this.childButtons.changes)
                    .subscribe(function () { return _this.templateSchemaService.changed(); });
            };
        FieldComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'sf-field',
                        template: "<ng-content ></ng-content>\n"
                    }] }
        ];
        /** @nocollapse */
        FieldComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: TemplateSchemaService },
                { type: ActionRegistry }
            ];
        };
        FieldComponent.propDecorators = {
            childFields: [{ type: core.ContentChildren, args: [FieldComponent,] }],
            childItems: [{ type: core.ContentChildren, args: [ItemComponent,] }],
            childButtons: [{ type: core.ContentChildren, args: [ButtonComponent,] }],
            name: [{ type: core.Input }],
            type: [{ type: core.Input }],
            format: [{ type: core.Input }],
            required: [{ type: core.Input }],
            readOnly: [{ type: core.Input }],
            title: [{ type: core.Input }],
            description: [{ type: core.Input }],
            placeholder: [{ type: core.Input }],
            widget: [{ type: core.Input }],
            validator: [{ type: core.Input }],
            schema: [{ type: core.Input }]
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
                    schema: new core.SimpleChange(previousSchema, this.formComponent.schema, Boolean(previousSchema))
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
                rxjs.merge(this.childFields.changes, this.templateSchemaService.changes)
                    .subscribe(function () {
                    _this.terminatorService.destroy();
                    _this.setFormDocumentSchema(_this.childFields.toArray());
                });
            };
        TemplateSchemaDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'sf-form[templateSchema]',
                        providers: [
                            TemplateSchemaService
                        ]
                    },] }
        ];
        /** @nocollapse */
        TemplateSchemaDirective.ctorParameters = function () {
            return [
                { type: ActionRegistry },
                { type: ValidatorRegistry },
                { type: FormComponent },
                { type: TerminatorService },
                { type: TemplateSchemaService }
            ];
        };
        TemplateSchemaDirective.propDecorators = {
            childFields: [{ type: core.ContentChildren, args: [FieldComponent,] }],
            childButtons: [{ type: core.ContentChildren, args: [ButtonComponent,] }]
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
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

    exports.FormComponent = FormComponent;
    exports.FormElementComponent = FormElementComponent;
    exports.FormElementComponentAction = FormElementComponentAction;
    exports.WidgetChooserComponent = WidgetChooserComponent;
    exports.WidgetRegistry = WidgetRegistry;
    exports.FormProperty = FormProperty;
    exports.ArrayProperty = ArrayProperty;
    exports.FormPropertyFactory = FormPropertyFactory;
    exports.SchemaPreprocessor = SchemaPreprocessor;
    exports.ValidatorRegistry = ValidatorRegistry;
    exports.ActionRegistry = ActionRegistry;
    exports.BindingRegistry = BindingRegistry;
    exports.SchemaValidatorFactory = SchemaValidatorFactory;
    exports.ZSchemaValidatorFactory = ZSchemaValidatorFactory;
    exports.WidgetFactory = WidgetFactory;
    exports.TerminatorService = TerminatorService;
    exports.Widget = Widget;
    exports.ControlWidget = ControlWidget;
    exports.ArrayLayoutWidget = ArrayLayoutWidget;
    exports.ObjectLayoutWidget = ObjectLayoutWidget;
    exports.ArrayWidget = ArrayWidget;
    exports.ButtonWidget = ButtonWidget;
    exports.ObjectWidget = ObjectWidget;
    exports.CheckboxWidget = CheckboxWidget;
    exports.FileWidget = FileWidget;
    exports.IntegerWidget = IntegerWidget;
    exports.TextAreaWidget = TextAreaWidget;
    exports.RadioWidget = RadioWidget;
    exports.RangeWidget = RangeWidget;
    exports.SelectWidget = SelectWidget;
    exports.StringWidget = StringWidget;
    exports.DefaultWidgetRegistry = DefaultWidgetRegistry;
    exports.SchemaFormModule = SchemaFormModule;
    exports.TemplateSchemaModule = TemplateSchemaModule;
    exports.ɵh = DefaultWidget;
    exports.ɵa = useFactory;
    exports.ɵb = ActionRegistry;
    exports.ɵe = BindingRegistry;
    exports.ɵg = FormPropertyFactory;
    exports.ɵf = SchemaPreprocessor;
    exports.ɵc = ValidatorRegistry;
    exports.ɵd = PropertyBindingRegistry;
    exports.ɵo = ButtonComponent;
    exports.ɵj = FieldParent;
    exports.ɵm = FieldComponent;
    exports.ɵn = ItemComponent;
    exports.ɵk = TemplateSchemaElement;
    exports.ɵi = TemplateSchemaDirective;
    exports.ɵl = TemplateSchemaService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNjaGVtYS1mb3JtLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9tb2RlbC9hY3Rpb25yZWdpc3RyeS50cyIsIm5vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvbW9kZWwvZm9ybXByb3BlcnR5LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL21vZGVsL2F0b21pY3Byb3BlcnR5LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL21vZGVsL251bWJlcnByb3BlcnR5LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL21vZGVsL3N0cmluZ3Byb3BlcnR5LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL21vZGVsL2Jvb2xlYW5wcm9wZXJ0eS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9tb2RlbC9vYmplY3Rwcm9wZXJ0eS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9tb2RlbC9hcnJheXByb3BlcnR5LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL21vZGVsL2Zvcm1wcm9wZXJ0eWZhY3RvcnkudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvbW9kZWwvdXRpbHMudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvbW9kZWwvc2NoZW1hcHJlcHJvY2Vzc29yLnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL21vZGVsL3ZhbGlkYXRvcnJlZ2lzdHJ5LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL21vZGVsL2JpbmRpbmdyZWdpc3RyeS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9zY2hlbWF2YWxpZGF0b3JmYWN0b3J5LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL3dpZGdldHJlZ2lzdHJ5LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL3dpZGdldGZhY3RvcnkudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvdGVybWluYXRvci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL3Byb3BlcnR5LWJpbmRpbmctcmVnaXN0cnkudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvZm9ybS5jb21wb25lbnQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvZm9ybWVsZW1lbnQuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL2Zvcm1lbGVtZW50LmFjdGlvbi5jb21wb25lbnQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvd2lkZ2V0Y2hvb3Nlci5jb21wb25lbnQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvd2lkZ2V0LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL2RlZmF1bHR3aWRnZXRzL2FycmF5L2FycmF5LndpZGdldC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9kZWZhdWx0d2lkZ2V0cy9idXR0b24vYnV0dG9uLndpZGdldC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9kZWZhdWx0d2lkZ2V0cy9vYmplY3Qvb2JqZWN0LndpZGdldC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9kZWZhdWx0d2lkZ2V0cy9jaGVja2JveC9jaGVja2JveC53aWRnZXQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvZGVmYXVsdHdpZGdldHMvZmlsZS9maWxlLndpZGdldC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9kZWZhdWx0d2lkZ2V0cy9pbnRlZ2VyL2ludGVnZXIud2lkZ2V0LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL2RlZmF1bHR3aWRnZXRzL3RleHRhcmVhL3RleHRhcmVhLndpZGdldC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9kZWZhdWx0d2lkZ2V0cy9yYWRpby9yYWRpby53aWRnZXQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvZGVmYXVsdHdpZGdldHMvcmFuZ2UvcmFuZ2Uud2lkZ2V0LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL2RlZmF1bHR3aWRnZXRzL3NlbGVjdC9zZWxlY3Qud2lkZ2V0LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL2RlZmF1bHR3aWRnZXRzL3N0cmluZy9zdHJpbmcud2lkZ2V0LnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL2RlZmF1bHR3aWRnZXRzL2RlZmF1bHR3aWRnZXRyZWdpc3RyeS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9kZWZhdWx0LndpZGdldC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi9zY2hlbWEtZm9ybS5tb2R1bGUudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvdGVtcGxhdGUtc2NoZW1hL3RlbXBsYXRlLXNjaGVtYS5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL3RlbXBsYXRlLXNjaGVtYS90ZW1wbGF0ZS1zY2hlbWEtZWxlbWVudC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi90ZW1wbGF0ZS1zY2hlbWEvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvdGVtcGxhdGUtc2NoZW1hL2ZpZWxkL2ZpZWxkLnRzIiwibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vbGliL3RlbXBsYXRlLXNjaGVtYS9maWVsZC9maWVsZC1wYXJlbnQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvdGVtcGxhdGUtc2NoZW1hL2ZpZWxkL2l0ZW0vaXRlbS5jb21wb25lbnQudHMiLCJuZzovL25neC1zY2hlbWEtZm9ybS9saWIvdGVtcGxhdGUtc2NoZW1hL2ZpZWxkL2ZpZWxkLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi90ZW1wbGF0ZS1zY2hlbWEvdGVtcGxhdGUtc2NoZW1hLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LXNjaGVtYS1mb3JtL2xpYi90ZW1wbGF0ZS1zY2hlbWEvdGVtcGxhdGUtc2NoZW1hLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuL2FjdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25SZWdpc3RyeSB7XG4gIGFjdGlvbnM6IHtba2V5OiBzdHJpbmddOiBBY3Rpb259ID0ge307XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5hY3Rpb25zID0ge307XG4gIH1cblxuICByZWdpc3RlcihhY3Rpb25JZDogc3RyaW5nLCBhY3Rpb246IEFjdGlvbikge1xuICAgIHRoaXMuYWN0aW9uc1thY3Rpb25JZF0gPSBhY3Rpb247XG4gIH1cblxuICBnZXQoYWN0aW9uSWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmFjdGlvbnNbYWN0aW9uSWRdO1xuICB9XG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1NjaGVtYVZhbGlkYXRvckZhY3Rvcnl9IGZyb20gJy4uL3NjaGVtYXZhbGlkYXRvcmZhY3RvcnknO1xuaW1wb3J0IHtWYWxpZGF0b3JSZWdpc3RyeX0gZnJvbSAnLi92YWxpZGF0b3JyZWdpc3RyeSc7XG5pbXBvcnQge1Byb3BlcnR5QmluZGluZ1JlZ2lzdHJ5fSBmcm9tICcuLi9wcm9wZXJ0eS1iaW5kaW5nLXJlZ2lzdHJ5JztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZvcm1Qcm9wZXJ0eSB7XG4gIHB1YmxpYyBzY2hlbWFWYWxpZGF0b3I6IEZ1bmN0aW9uO1xuXG4gIF92YWx1ZTogYW55ID0gbnVsbDtcbiAgX2Vycm9yczogYW55ID0gbnVsbDtcbiAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KG51bGwpO1xuICBwcml2YXRlIF9lcnJvcnNDaGFuZ2VzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KG51bGwpO1xuICBwcml2YXRlIF92aXNpYmxlID0gdHJ1ZTtcbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eUNoYW5nZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICBwcml2YXRlIF9yb290OiBQcm9wZXJ0eUdyb3VwO1xuICBwcml2YXRlIF9wYXJlbnQ6IFByb3BlcnR5R3JvdXA7XG4gIHByaXZhdGUgX3BhdGg6IHN0cmluZztcbiAgX3Byb3BlcnR5QmluZGluZ1JlZ2lzdHJ5OiBQcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeTtcbiAgX2Nhbm9uaWNhbFBhdGg6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihzY2hlbWFWYWxpZGF0b3JGYWN0b3J5OiBTY2hlbWFWYWxpZGF0b3JGYWN0b3J5LFxuICAgICAgICAgICAgICBwcml2YXRlIHZhbGlkYXRvclJlZ2lzdHJ5OiBWYWxpZGF0b3JSZWdpc3RyeSxcbiAgICAgICAgICAgICAgcHVibGljIHNjaGVtYTogYW55LFxuICAgICAgICAgICAgICBwYXJlbnQ6IFByb3BlcnR5R3JvdXAsXG4gICAgICAgICAgICAgIHBhdGg6IHN0cmluZykge1xuICAgIHRoaXMuc2NoZW1hVmFsaWRhdG9yID0gc2NoZW1hVmFsaWRhdG9yRmFjdG9yeS5jcmVhdGVWYWxpZGF0b3JGbih0aGlzLnNjaGVtYSk7XG5cbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgdGhpcy5fcm9vdCA9IHBhcmVudC5yb290O1xuICAgIH0gZWxzZSBpZiAodGhpcyBpbnN0YW5jZW9mIFByb3BlcnR5R3JvdXApIHtcbiAgICAgIHRoaXMuX3Jvb3QgPSA8UHJvcGVydHlHcm91cD48YW55PnRoaXM7XG4gICAgfVxuICAgIHRoaXMuX3BhdGggPSBwYXRoO1xuICB9XG5cbiAgcHVibGljIGdldCB2YWx1ZUNoYW5nZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlQ2hhbmdlcztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZXJyb3JzQ2hhbmdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JzQ2hhbmdlcztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNjaGVtYS50eXBlO1xuICB9XG5cbiAgcHVibGljIGdldCBwYXJlbnQoKTogUHJvcGVydHlHcm91cCB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcm9vdCgpOiBQcm9wZXJ0eUdyb3VwIHtcbiAgICByZXR1cm4gdGhpcy5fcm9vdCB8fCA8UHJvcGVydHlHcm91cD48YW55PnRoaXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBhdGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fcGF0aDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCB2aXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICB9XG5cbiAgcHVibGljIGdldCB2YWxpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JzID09PSBudWxsO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IHNldFZhbHVlKHZhbHVlOiBhbnksIG9ubHlTZWxmOiBib29sZWFuKTtcblxuICBwdWJsaWMgYWJzdHJhY3QgcmVzZXQodmFsdWU6IGFueSwgb25seVNlbGY6IGJvb2xlYW4pO1xuXG4gIHB1YmxpYyB1cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KG9ubHlTZWxmID0gZmFsc2UsIGVtaXRFdmVudCA9IHRydWUpIHtcbiAgICB0aGlzLl91cGRhdGVWYWx1ZSgpO1xuXG4gICAgaWYgKGVtaXRFdmVudCkge1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZXMubmV4dCh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICB0aGlzLl9ydW5WYWxpZGF0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5wYXJlbnQgJiYgIW9ubHlTZWxmKSB7XG4gICAgICB0aGlzLnBhcmVudC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KG9ubHlTZWxmLCBlbWl0RXZlbnQpO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IF9oYXNWYWx1ZSgpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiAgQGludGVybmFsXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgX3VwZGF0ZVZhbHVlKCk7XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcHVibGljIF9ydW5WYWxpZGF0aW9uKCk6IGFueSB7XG4gICAgbGV0IGVycm9ycyA9IHRoaXMuc2NoZW1hVmFsaWRhdG9yKHRoaXMuX3ZhbHVlKSB8fCBbXTtcbiAgICBsZXQgY3VzdG9tVmFsaWRhdG9yID0gdGhpcy52YWxpZGF0b3JSZWdpc3RyeS5nZXQodGhpcy5wYXRoKTtcbiAgICBpZiAoY3VzdG9tVmFsaWRhdG9yKSB7XG4gICAgICBsZXQgY3VzdG9tRXJyb3JzID0gY3VzdG9tVmFsaWRhdG9yKHRoaXMudmFsdWUsIHRoaXMsIHRoaXMuZmluZFJvb3QoKSk7XG4gICAgICBlcnJvcnMgPSB0aGlzLm1lcmdlRXJyb3JzKGVycm9ycywgY3VzdG9tRXJyb3JzKTtcbiAgICB9XG4gICAgaWYgKGVycm9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgIGVycm9ycyA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5fZXJyb3JzID0gZXJyb3JzO1xuICAgIHRoaXMuc2V0RXJyb3JzKHRoaXMuX2Vycm9ycyk7XG4gIH1cblxuICBwcml2YXRlIG1lcmdlRXJyb3JzKGVycm9ycywgbmV3RXJyb3JzKSB7XG4gICAgaWYgKG5ld0Vycm9ycykge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobmV3RXJyb3JzKSkge1xuICAgICAgICBlcnJvcnMgPSBlcnJvcnMuY29uY2F0KC4uLm5ld0Vycm9ycyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlcnJvcnMucHVzaChuZXdFcnJvcnMpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZXJyb3JzO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRFcnJvcnMoZXJyb3JzKSB7XG4gICAgdGhpcy5fZXJyb3JzID0gZXJyb3JzO1xuICAgIHRoaXMuX2Vycm9yc0NoYW5nZXMubmV4dChlcnJvcnMpO1xuICB9XG5cbiAgcHVibGljIGV4dGVuZEVycm9ycyhlcnJvcnMpIHtcbiAgICBlcnJvcnMgPSB0aGlzLm1lcmdlRXJyb3JzKHRoaXMuX2Vycm9ycyB8fCBbXSwgZXJyb3JzKTtcbiAgICB0aGlzLnNldEVycm9ycyhlcnJvcnMpO1xuICB9XG5cbiAgc2VhcmNoUHJvcGVydHkocGF0aDogc3RyaW5nKTogRm9ybVByb3BlcnR5IHtcbiAgICBsZXQgcHJvcDogRm9ybVByb3BlcnR5ID0gdGhpcztcbiAgICBsZXQgYmFzZTogUHJvcGVydHlHcm91cCA9IG51bGw7XG5cbiAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICBpZiAocGF0aFswXSA9PT0gJy8nKSB7XG4gICAgICBiYXNlID0gdGhpcy5maW5kUm9vdCgpO1xuICAgICAgcmVzdWx0ID0gYmFzZS5nZXRQcm9wZXJ0eShwYXRoLnN1YnN0cigxKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdoaWxlIChyZXN1bHQgPT09IG51bGwgJiYgcHJvcC5wYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgcHJvcCA9IGJhc2UgPSBwcm9wLnBhcmVudDtcbiAgICAgICAgcmVzdWx0ID0gYmFzZS5nZXRQcm9wZXJ0eShwYXRoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyBmaW5kUm9vdCgpOiBQcm9wZXJ0eUdyb3VwIHtcbiAgICBsZXQgcHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSA9IHRoaXM7XG4gICAgd2hpbGUgKHByb3BlcnR5LnBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgcHJvcGVydHkgPSBwcm9wZXJ0eS5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiA8UHJvcGVydHlHcm91cD5wcm9wZXJ0eTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fdmlzaWJsZSA9IHZpc2libGU7XG4gICAgdGhpcy5fdmlzaWJpbGl0eUNoYW5nZXMubmV4dCh2aXNpYmxlKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgIHRoaXMucGFyZW50LnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoZmFsc2UsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX19iaW5kVmlzaWJpbGl0eSgpOiBib29sZWFuIHtcbiAgICAvKipcbiAgICAgKiA8cHJlPlxuICAgICAqICAgICBcIm9uZU9mXCI6W3tcbiAgICAgKiAgICAgICAgIFwicGF0aFwiOltcInZhbHVlXCIsXCJ2YWx1ZVwiXVxuICAgICAqICAgICB9LHtcbiAgICAgKiAgICAgICAgIFwicGF0aFwiOltcInZhbHVlXCIsXCJ2YWx1ZVwiXVxuICAgICAqICAgICB9XVxuICAgICAqICAgICA8L3ByZT5cbiAgICAgKiA8cHJlPlxuICAgICAqICAgICBcImFsbE9mXCI6W3tcbiAgICAgKiAgICAgICAgIFwicGF0aFwiOltcInZhbHVlXCIsXCJ2YWx1ZVwiXVxuICAgICAqICAgICB9LHtcbiAgICAgKiAgICAgICAgIFwicGF0aFwiOltcInZhbHVlXCIsXCJ2YWx1ZVwiXVxuICAgICAqICAgICB9XVxuICAgICAqICAgICA8L3ByZT5cbiAgICAgKi9cbiAgICBjb25zdCB2aXNpYmxlSWZQcm9wZXJ0eSA9IHRoaXMuc2NoZW1hLnZpc2libGVJZjtcbiAgICBjb25zdCB2aXNpYmxlSWZPZiA9ICh2aXNpYmxlSWZQcm9wZXJ0eSB8fCB7fSkub25lT2YgfHwgKHZpc2libGVJZlByb3BlcnR5IHx8IHt9KS5hbGxPZjtcbiAgICBpZiAodmlzaWJsZUlmT2YpIHtcbiAgICAgIGZvciAoY29uc3QgdmlzaWJsZUlmIG9mIHZpc2libGVJZk9mKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmlzaWJsZUlmID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyh2aXNpYmxlSWYpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodmlzaWJsZUlmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0aWVzQmluZGluZyA9IFtdO1xuICAgICAgICAgIGZvciAoY29uc3QgZGVwZW5kZW5jeVBhdGggaW4gdmlzaWJsZUlmKSB7XG4gICAgICAgICAgICBpZiAodmlzaWJsZUlmLmhhc093blByb3BlcnR5KGRlcGVuZGVuY3lQYXRoKSkge1xuICAgICAgICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5maW5kUHJvcGVydGllcyh0aGlzLCBkZXBlbmRlbmN5UGF0aCk7XG4gICAgICAgICAgICAgIGlmICgocHJvcGVydGllcyB8fCBbXSkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBvZiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlQ2hlY2s7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjaGVtYS52aXNpYmxlSWYub25lT2YpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZUNoZWNrID0gcHJvcGVydHkudmFsdWVDaGFuZ2VzLnBpcGUobWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmlzaWJsZUlmW2RlcGVuZGVuY3lQYXRoXS5pbmRleE9mKCckQU5ZJCcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2aXNpYmxlSWZbZGVwZW5kZW5jeVBhdGhdLmluZGV4T2YodmFsdWUpICE9PSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2NoZW1hLnZpc2libGVJZi5hbGxPZikge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF9jaGsgPSAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLnNjaGVtYS52aXNpYmxlSWYuYWxsT2YpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBkZXBQYXRoIG9mIE9iamVjdC5rZXlzKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvcCA9IHRoaXMuc2VhcmNoUHJvcGVydHkoZGVwUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvcFZhbCA9IHByb3AuX3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtW2RlcFBhdGhdLmluZGV4T2YoJyRBTlkkJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IHByb3BWYWwubGVuZ3RoID4gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBpdGVtW2RlcFBhdGhdLmluZGV4T2YocHJvcFZhbCkgIT09IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlQ2hlY2sgPSBwcm9wZXJ0eS52YWx1ZUNoYW5nZXMucGlwZShtYXAoX2NoaykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZpc2liaWxpdHlDaGVjayA9IHByb3BlcnR5Ll92aXNpYmlsaXR5Q2hhbmdlcztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5kID0gY29tYmluZUxhdGVzdChbdmFsdWVDaGVjaywgdmlzaWJpbGl0eUNoZWNrXSwgKHYxLCB2MikgPT4gdjEgJiYgdjIpO1xuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzQmluZGluZy5wdXNoKGFuZCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignQ2FuXFwndCBmaW5kIHByb3BlcnR5ICcgKyBkZXBlbmRlbmN5UGF0aCArICcgZm9yIHZpc2liaWxpdHkgY2hlY2sgb2YgJyArIHRoaXMucGF0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3Rlck1pc3NpbmdWaXNpYmlsaXR5QmluZGluZyhkZXBlbmRlbmN5UGF0aCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgLy8gbm90IHZpc2libGUgaWYgbm90IGV4aXN0ZW50XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbWJpbmVMYXRlc3QocHJvcGVydGllc0JpbmRpbmcsICguLi52YWx1ZXM6IGJvb2xlYW5bXSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlcy5pbmRleE9mKHRydWUpICE9PSAtMTtcbiAgICAgICAgICB9KS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpLnN1YnNjcmliZSgodmlzaWJsZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRWaXNpYmxlKHZpc2libGUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBBIGZpZWxkIGlzIHZpc2libGUgaWYgQVQgTEVBU1QgT05FIG9mIHRoZSBwcm9wZXJ0aWVzIGl0IGRlcGVuZHMgb24gaXMgdmlzaWJsZSBBTkQgaGFzIGEgdmFsdWUgaW4gdGhlIGxpc3RcbiAgcHVibGljIF9iaW5kVmlzaWJpbGl0eSgpIHtcbiAgICBpZiAodGhpcy5fX2JpbmRWaXNpYmlsaXR5KCkpXG4gICAgICByZXR1cm47XG4gICAgbGV0IHZpc2libGVJZiA9IHRoaXMuc2NoZW1hLnZpc2libGVJZjtcbiAgICBpZiAodHlwZW9mIHZpc2libGVJZiA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXModmlzaWJsZUlmKS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgfSBlbHNlIGlmICh2aXNpYmxlSWYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IHByb3BlcnRpZXNCaW5kaW5nID0gW107XG4gICAgICBmb3IgKGxldCBkZXBlbmRlbmN5UGF0aCBpbiB2aXNpYmxlSWYpIHtcbiAgICAgICAgaWYgKHZpc2libGVJZi5oYXNPd25Qcm9wZXJ0eShkZXBlbmRlbmN5UGF0aCkpIHtcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5maW5kUHJvcGVydGllcyh0aGlzLCBkZXBlbmRlbmN5UGF0aCk7XG4gICAgICAgICAgaWYgKChwcm9wZXJ0aWVzIHx8IFtdKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcGVydHkgb2YgcHJvcGVydGllcykge1xuICAgICAgICAgICAgICBpZiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZUNoZWNrID0gcHJvcGVydHkudmFsdWVDaGFuZ2VzLnBpcGUobWFwKFxuICAgICAgICAgICAgICAgICAgdmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmlzaWJsZUlmW2RlcGVuZGVuY3lQYXRoXS5pbmRleE9mKCckQU5ZJCcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPiAwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2aXNpYmxlSWZbZGVwZW5kZW5jeVBhdGhdLmluZGV4T2YodmFsdWUpICE9PSAtMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpc2liaWxpdHlDaGVjayA9IHByb3BlcnR5Ll92aXNpYmlsaXR5Q2hhbmdlcztcbiAgICAgICAgICAgICAgICBjb25zdCBhbmQgPSBjb21iaW5lTGF0ZXN0KFt2YWx1ZUNoZWNrLCB2aXNpYmlsaXR5Q2hlY2tdLCAodjEsIHYyKSA9PiB2MSAmJiB2Mik7XG4gICAgICAgICAgICAgICAgcHJvcGVydGllc0JpbmRpbmcucHVzaChhbmQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignQ2FuXFwndCBmaW5kIHByb3BlcnR5ICcgKyBkZXBlbmRlbmN5UGF0aCArICcgZm9yIHZpc2liaWxpdHkgY2hlY2sgb2YgJyArIHRoaXMucGF0aCk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyTWlzc2luZ1Zpc2liaWxpdHlCaW5kaW5nKGRlcGVuZGVuY3lQYXRoLCB0aGlzKTtcbiAgICAgICAgICAgIC8vIG5vdCB2aXNpYmxlIGlmIG5vdCBleGlzdGVudFxuICAgICAgICAgICAgdGhpcy5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29tYmluZUxhdGVzdChwcm9wZXJ0aWVzQmluZGluZywgKC4uLnZhbHVlczogYm9vbGVhbltdKSA9PiB7XG4gICAgICAgIHJldHVybiB2YWx1ZXMuaW5kZXhPZih0cnVlKSAhPT0gLTE7XG4gICAgICB9KS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpLnN1YnNjcmliZSgodmlzaWJsZSkgPT4ge1xuICAgICAgICB0aGlzLnNldFZpc2libGUodmlzaWJsZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlZ2lzdGVyTWlzc2luZ1Zpc2liaWxpdHlCaW5kaW5nKGRlcGVuZGVuY3lQYXRoOiBzdHJpbmcsIGZvcm1Qcm9wZXJ0eTogRm9ybVByb3BlcnR5KSB7XG4gICAgZm9ybVByb3BlcnR5Ll9wcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeS5nZXRQcm9wZXJ0eUJpbmRpbmdzVmlzaWJpbGl0eSgpLmFkZChkZXBlbmRlbmN5UGF0aCwgZm9ybVByb3BlcnR5LnBhdGgpO1xuICB9XG5cblxuICAvKipcbiAgICogRmluZHMgYWxsIDxjb2RlPmZvcm1Qcm9wZXJ0aWVzPC9jb2RlPiBmcm9tIGEgcGF0aCB3aXRoIHdpbGRjYXJkcy48YnIvPlxuICAgKiBlLmc6IDxjb2RlPi9nYXJhZ2UvY2Fycy8mIzQyOy90aXJlcy8mIzQyOy9uYW1lPC9jb2RlPjxici8+XG4gICAqIEBwYXJhbSB0YXJnZXRcbiAgICogQHBhcmFtIHByb3BlcnR5UGF0aFxuICAgKi9cbiAgZmluZFByb3BlcnRpZXModGFyZ2V0OiBGb3JtUHJvcGVydHksIHByb3BlcnR5UGF0aDogc3RyaW5nKTogRm9ybVByb3BlcnR5W10ge1xuICAgIGNvbnN0IHByb3BzOiBGb3JtUHJvcGVydHlbXSA9IFtdO1xuICAgIGNvbnN0IHBhdGhzID0gdGhpcy5maW5kUHJvcGVydHlQYXRocyh0YXJnZXQsIHByb3BlcnR5UGF0aCk7XG4gICAgZm9yIChjb25zdCBwYXRoIG9mIHBhdGhzKSB7XG4gICAgICBjb25zdCBwOiBGb3JtUHJvcGVydHkgPSB0YXJnZXQuc2VhcmNoUHJvcGVydHkocGF0aCk7XG4gICAgICBpZiAocCkge1xuICAgICAgICBwcm9wcy5wdXNoKHApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcHJvcHM7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBjYW5vbmljYWwgcGF0aHMgZnJvbSBhIHBhdGggd2l0aCB3aWxkY2FyZHMuXG4gICAqIGUuZzo8YnIvPlxuICAgKiBGcm9tOjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8mIzQyOy90aXJlcy8mIzQyOy9uYW1lPC9jb2RlPjxici8+XG4gICAqIGl0IGNyZWF0ZXM6PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLzAvdGlyZXMvMC9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8wL3RpcmVzLzEvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMC90aXJlcy8yL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLzAvdGlyZXMvMy9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8xL3RpcmVzLzAvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMi90aXJlcy8xL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLzMvdGlyZXMvMi9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8zL3RpcmVzLzMvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvJiM0MjsvdGlyZXMvJiM0MjsvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvJiM0MjsvdGlyZXMvMi9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8mIzQyOy90aXJlcy8zL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGJyLz5ldGMuLi5cbiAgICogQHBhcmFtIHRhcmdldFxuICAgKiBAcGFyYW0gcGF0aFxuICAgKiBAcGFyYW0gcGFyZW50UGF0aFxuICAgKi9cbiAgZmluZFByb3BlcnR5UGF0aHModGFyZ2V0OiBGb3JtUHJvcGVydHksIHBhdGg6IHN0cmluZywgcGFyZW50UGF0aD86IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBpeCA9IHBhdGguaW5kZXhPZignKicpO1xuICAgIGlmICgtMSAhPT0gaXgpIHtcbiAgICAgIGNvbnN0IHByZVBhdGggPSBpeCA+IC0xID8gcGF0aC5zdWJzdHJpbmcoMCwgaXggLSAxKSA6IHBhdGg7XG4gICAgICBjb25zdCBzdWJQYXRoID0gaXggPiAtMSA/IHBhdGguc3Vic3RyaW5nKGl4ICsgMSkgOiBwYXRoO1xuICAgICAgY29uc3QgcHJvcDogRm9ybVByb3BlcnR5ID0gdGFyZ2V0LnNlYXJjaFByb3BlcnR5KHByZVBhdGgpO1xuICAgICAgbGV0IHBhdGhGb3VuZCA9IFtdO1xuICAgICAgaWYgKHByb3AgaW5zdGFuY2VvZiBQcm9wZXJ0eUdyb3VwKSB7XG4gICAgICAgIGNvbnN0IGFyclByb3AgPSBwcm9wLnByb3BlcnRpZXMgYXMgRm9ybVByb3BlcnR5W107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyUHJvcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGN1cnJlSXRlbVBhdGggPSAocGFyZW50UGF0aCB8fCAnJykgKyBwcmVQYXRoICsgKHByZVBhdGguZW5kc1dpdGgoJy8nKSA/ICcnIDogJy8nKSArIGkgKyBzdWJQYXRoO1xuICAgICAgICAgIGNvbnN0IGN1cnJlSXRlbVByZVBhdGggPSAocGFyZW50UGF0aCB8fCAnJykgKyBwcmVQYXRoICsgaTtcbiAgICAgICAgICBpZiAoLTEgPT09IGN1cnJlSXRlbVBhdGguaW5kZXhPZignKicpKSB7XG4gICAgICAgICAgICBwYXRoRm91bmQucHVzaChjdXJyZUl0ZW1QYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgY2hpbGRyZW5QYXRoRm91bmQgPSB0aGlzLmZpbmRQcm9wZXJ0eVBhdGhzKGFyclByb3BbaV0sIHN1YlBhdGgsIGN1cnJlSXRlbVByZVBhdGgpO1xuICAgICAgICAgIHBhdGhGb3VuZCA9IHBhdGhGb3VuZC5jb25jYXQoY2hpbGRyZW5QYXRoRm91bmQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcGF0aEZvdW5kO1xuICAgIH1cbiAgICByZXR1cm4gW3BhdGhdO1xuICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQcm9wZXJ0eUdyb3VwIGV4dGVuZHMgRm9ybVByb3BlcnR5IHtcblxuICBfcHJvcGVydGllczogRm9ybVByb3BlcnR5W10gfCB7IFtrZXk6IHN0cmluZ106IEZvcm1Qcm9wZXJ0eSB9ID0gbnVsbDtcblxuICBnZXQgcHJvcGVydGllcygpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllcztcbiAgfVxuXG4gIHNldCBwcm9wZXJ0aWVzKHByb3BlcnRpZXM6IEZvcm1Qcm9wZXJ0eVtdIHwgeyBba2V5OiBzdHJpbmddOiBGb3JtUHJvcGVydHkgfSkge1xuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoZSBzZXR0ZXIgdG8gYWRkIGFuIG9ic2VydmVyIHRoYXQgbm90aWNlcyB3aGVuIGFuIGl0ZW0gaXMgYWRkZWQgb3IgcmVtb3ZlZC48YnIvPlxuICAgICAqL1xuICAgIHRoaXMuX3Byb3BlcnRpZXMgPSBuZXcgUHJveHkocHJvcGVydGllcywgdGhpcy5fcHJvcGVydHlQcm94eUhhbmRsZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcHJvcGVydHlQcm94eUhhbmRsZXI6IFByb3h5SGFuZGxlcjxGb3JtUHJvcGVydHlbXSB8IHsgW2tleTogc3RyaW5nXTogRm9ybVByb3BlcnR5IH0+ID0ge1xuICAgIC8qKlxuICAgICAqIFdoZW4gYSBuZXcgaXRlbSBpcyBhZGRlZCBpdCB3aWxsIGJlIGNoZWNrZWQgZm9yIHZpc2liaWxpdHkgdXBkYXRlcyB0byBwcm9jZWVkIDxici8+XG4gICAgICogaWYgYW55IG90aGVyIGZpZWxkIGhhcyBhIGJpbmRpbmcgcmVmZXJlbmNlIHRvIGl0Ljxici8+XG4gICAgICovXG4gICAgc2V0KHRhcmdldDogRm9ybVByb3BlcnR5W10gfCB7IFtwOiBzdHJpbmddOiBGb3JtUHJvcGVydHkgfSwgcDogUHJvcGVydHlLZXksIHZhbHVlOiBhbnksIHJlY2VpdmVyOiBhbnkpOiBib29sZWFuIHtcblxuICAgICAgLyoqXG4gICAgICAgKiAxKSBNYWtlIHN1cmUgYSBjYW5vbmljYWwgcGF0aCBpcyBzZXRcbiAgICAgICAqL1xuICAgICAgY29uc3QgYXNzZXJ0Q2Fub25pY2FsUGF0aCA9IChwcm9wZXJ0eVZhbHVlOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgZm9ybVByb3BlcnR5ID0gcHJvcGVydHlWYWx1ZSBhcyBGb3JtUHJvcGVydHk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgcHJvcGVydHlWYWx1ZSBpbnN0YW5jZW9mIEZvcm1Qcm9wZXJ0eSkge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIENyZWF0ZSBhIGNhbm9uaWNhbCBwYXRoIHJlcGxhY2luZyB0aGUgbGFzdCAnKicgd2l0aCB0aGUgZWxlbWVudHMgcG9zaXRpb24gaW4gYXJyYXlcbiAgICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlQYXRoXG4gICAgICAgICAgICogQHBhcmFtIGluZGV4T2ZDaGlsZFxuICAgICAgICAgICAqL1xuICAgICAgICAgIGNvbnN0IGdldENhbm9uaWNhbFBhdGggPSAocHJvcGVydHlQYXRoOiBzdHJpbmcsIGluZGV4T2ZDaGlsZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgcG9zO1xuICAgICAgICAgICAgaWYgKHByb3BlcnR5UGF0aCAmJiAtMSAhPT0gKHBvcyA9IHByb3BlcnR5UGF0aC5sYXN0SW5kZXhPZignKicpKSkge1xuICAgICAgICAgICAgICByZXR1cm4gcHJvcGVydHlQYXRoLnN1YnN0cmluZygwLCBwb3MpICsgaW5kZXhPZkNoaWxkLnRvU3RyaW5nKCkgKyBwcm9wZXJ0eVBhdGguc3Vic3RyaW5nKHBvcyArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKGZvcm1Qcm9wZXJ0eSkge1xuICAgICAgICAgICAgZm9ybVByb3BlcnR5Ll9jYW5vbmljYWxQYXRoID0gZ2V0Q2Fub25pY2FsUGF0aChmb3JtUHJvcGVydHkuX2Nhbm9uaWNhbFBhdGgsIHAgYXMgbnVtYmVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wZXJ0eUdyb3VwID0gZm9ybVByb3BlcnR5IGFzIFByb3BlcnR5R3JvdXA7XG4gICAgICAgIGNvbnN0IHByb3BlcnR5R3JvdXBDaGlsZHJlbiA9IChBcnJheS5pc0FycmF5KHByb3BlcnR5R3JvdXAucHJvcGVydGllcykgP1xuICAgICAgICAgIHByb3BlcnR5R3JvdXAucHJvcGVydGllcyA6XG4gICAgICAgICAgT2JqZWN0LnZhbHVlcyhwcm9wZXJ0eUdyb3VwLnByb3BlcnRpZXMgfHwge30pKSBhcyBGb3JtUHJvcGVydHlbXTtcbiAgICAgICAgaWYgKChmb3JtUHJvcGVydHkucGF0aCB8fCAnJykuZW5kc1dpdGgoJy8qJykpIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBJZiBpdCBpcyBhbiBhcnJheSwgdGhlbiBhbGwgY2hpbGRyZW4gY2Fub25pY2FsIHBhdGhzIG11c3QgYmUgY29tcHV0ZWQgbm93LlxuICAgICAgICAgICAqIFRoZSBjaGlsZHJlbiBkb24ndCBoYXZlIHRoZSBwYXJlbnQncyBwYXRoIHNlZ21lbnQgc2V0IHlldCxcbiAgICAgICAgICAgKiBiZWNhdXNlIHRoZXkgYXJlIGNyZWF0ZWQgYmVmb3JlIHRoZSBwYXJlbnQgZ2V0cyBhdHRhY2hlZCB0byBpdHMgcGFyZW50LlxuICAgICAgICAgICAqL1xuICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgcHJvcGVydHlHcm91cENoaWxkcmVuKSB7XG4gICAgICAgICAgICBjaGlsZC5fY2Fub25pY2FsUGF0aCA9IGZvcm1Qcm9wZXJ0eS5fY2Fub25pY2FsUGF0aCArIGNoaWxkLl9jYW5vbmljYWxQYXRoLnN1YnN0cmluZyhmb3JtUHJvcGVydHkucGF0aC5sZW5ndGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3Byb3BlcnR5OiBmb3JtUHJvcGVydHksIGNoaWxkcmVuOiBwcm9wZXJ0eUdyb3VwQ2hpbGRyZW59O1xuICAgICAgfTtcbiAgICAgIGNvbnN0IHtwcm9wZXJ0eSwgY2hpbGRyZW59ID0gYXNzZXJ0Q2Fub25pY2FsUGF0aCh2YWx1ZSk7XG5cbiAgICAgIC8qKlxuICAgICAgICogMikgQWRkIHRoZSBuZXcgcHJvcGVydHkgYmVmb3JlIHJlYmluZGluZywgc28gaXQgY2FuIGJlIGZvdW5kIGJ5IDxjb2RlPl9iaW5kVmlzaWJpbGl0eTwvY29kZT5cbiAgICAgICAqL1xuICAgICAgY29uc3QgcmVzdWx0ID0gdGFyZ2V0W3AgYXMgc3RyaW5nXSA9IHZhbHVlO1xuXG4gICAgICAvKipcbiAgICAgICAqIDMpIFJlLWJpbmQgdGhlIHZpc2liaWxpdHkgYmluZGluZ3MgcmVmZXJlbmNpbmcgdG8gdGhpcyBjYW5vbmljYWwgcGF0aHNcbiAgICAgICAqL1xuICAgICAgY29uc3QgcmViaW5kVmlzaWJpbGl0eSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcmViaW5kQWxsID0gW3Byb3BlcnR5XS5jb25jYXQoY2hpbGRyZW4pO1xuICAgICAgICBjb25zdCBmaW5kUHJvcGVydGllc1RvUmViaW5kID0gKGZvcm1Qcm9wZXJ0eTogRm9ybVByb3BlcnR5KSA9PiB7XG4gICAgICAgICAgY29uc3QgcHJvcGVydHlCaW5kaW5ncyA9IGZvcm1Qcm9wZXJ0eS5fcHJvcGVydHlCaW5kaW5nUmVnaXN0cnkuZ2V0UHJvcGVydHlCaW5kaW5nc1Zpc2liaWxpdHkoKTtcbiAgICAgICAgICBsZXQgcmViaW5kOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgIGlmIChmb3JtUHJvcGVydHkuX2Nhbm9uaWNhbFBhdGgpIHtcbiAgICAgICAgICAgIHJlYmluZCA9IHJlYmluZC5jb25jYXQocmViaW5kLmNvbmNhdChwcm9wZXJ0eUJpbmRpbmdzLmZpbmRCeURlcGVuZGVuY3lQYXRoKGZvcm1Qcm9wZXJ0eS5fY2Fub25pY2FsUGF0aCkgfHwgW10pKTtcbiAgICAgICAgICAgIGlmIChmb3JtUHJvcGVydHkuX2Nhbm9uaWNhbFBhdGguc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICAgIHJlYmluZCA9IHJlYmluZC5jb25jYXQocmViaW5kLmNvbmNhdChwcm9wZXJ0eUJpbmRpbmdzLmZpbmRCeURlcGVuZGVuY3lQYXRoKGZvcm1Qcm9wZXJ0eS5fY2Fub25pY2FsUGF0aC5zdWJzdHJpbmcoMSkpIHx8IFtdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlYmluZCA9IHJlYmluZC5jb25jYXQocHJvcGVydHlCaW5kaW5ncy5maW5kQnlEZXBlbmRlbmN5UGF0aChmb3JtUHJvcGVydHkucGF0aCkgfHwgW10pO1xuICAgICAgICAgIGlmIChmb3JtUHJvcGVydHkucGF0aC5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgIHJlYmluZCA9IHJlYmluZC5jb25jYXQocmViaW5kLmNvbmNhdChwcm9wZXJ0eUJpbmRpbmdzLmZpbmRCeURlcGVuZGVuY3lQYXRoKGZvcm1Qcm9wZXJ0eS5wYXRoLnN1YnN0cmluZygxKSkgfHwgW10pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdW5pcXVlVmFsdWVzID0ge307XG4gICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHJlYmluZCkge1xuICAgICAgICAgICAgdW5pcXVlVmFsdWVzW2l0ZW1dID0gaXRlbTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHVuaXF1ZVZhbHVlcyk7XG4gICAgICAgIH07XG4gICAgICAgIGZvciAoY29uc3QgX3Byb3BlcnR5IG9mIHJlYmluZEFsbCkge1xuICAgICAgICAgIGlmIChfcHJvcGVydHkgaW5zdGFuY2VvZiBGb3JtUHJvcGVydHkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlYmluZFBhdGhzID0gZmluZFByb3BlcnRpZXNUb1JlYmluZChfcHJvcGVydHkpO1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHJlYmluZFByb3BQYXRoIG9mIHJlYmluZFBhdGhzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmViaW5kUHJvcCA9IF9wcm9wZXJ0eS5zZWFyY2hQcm9wZXJ0eShyZWJpbmRQcm9wUGF0aCk7XG4gICAgICAgICAgICAgICAgcmViaW5kUHJvcC5fYmluZFZpc2liaWxpdHkoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdSZWJpbmRpbmcgdmlzaWJpbGl0eSBlcnJvciBhdCBwYXRoOicsIF9wcm9wZXJ0eS5wYXRoLCAncHJvcGVydHk6JywgX3Byb3BlcnR5LCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZWJpbmRWaXNpYmlsaXR5KCk7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICBnZXQodGFyZ2V0OiBGb3JtUHJvcGVydHlbXSB8IHsgW3A6IHN0cmluZ106IEZvcm1Qcm9wZXJ0eSB9LCBwOiBQcm9wZXJ0eUtleSwgcmVjZWl2ZXI6IGFueSk6IGFueSB7XG4gICAgICByZXR1cm4gdGFyZ2V0W3AgYXMgc3RyaW5nXTtcbiAgICB9LFxuICAgIGRlbGV0ZVByb3BlcnR5KHRhcmdldDogRm9ybVByb3BlcnR5W10gfCB7IFtwOiBzdHJpbmddOiBGb3JtUHJvcGVydHkgfSwgcDogUHJvcGVydHlLZXkpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBkZWxldGUgdGFyZ2V0W3AgYXMgc3RyaW5nXTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0UHJvcGVydHkocGF0aDogc3RyaW5nKSB7XG4gICAgbGV0IHN1YlBhdGhJZHggPSBwYXRoLmluZGV4T2YoJy8nKTtcbiAgICBsZXQgcHJvcGVydHlJZCA9IHN1YlBhdGhJZHggIT09IC0xID8gcGF0aC5zdWJzdHIoMCwgc3ViUGF0aElkeCkgOiBwYXRoO1xuXG4gICAgbGV0IHByb3BlcnR5ID0gdGhpcy5wcm9wZXJ0aWVzW3Byb3BlcnR5SWRdO1xuICAgIGlmIChwcm9wZXJ0eSAhPT0gbnVsbCAmJiBzdWJQYXRoSWR4ICE9PSAtMSAmJiBwcm9wZXJ0eSBpbnN0YW5jZW9mIFByb3BlcnR5R3JvdXApIHtcbiAgICAgIGxldCBzdWJQYXRoID0gcGF0aC5zdWJzdHIoc3ViUGF0aElkeCArIDEpO1xuICAgICAgcHJvcGVydHkgPSAoPFByb3BlcnR5R3JvdXA+cHJvcGVydHkpLmdldFByb3BlcnR5KHN1YlBhdGgpO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcGVydHk7XG4gIH1cblxuICBwdWJsaWMgZm9yRWFjaENoaWxkKGZuOiAoZm9ybVByb3BlcnR5OiBGb3JtUHJvcGVydHksIHN0cjogU3RyaW5nKSA9PiB2b2lkKSB7XG4gICAgZm9yIChsZXQgcHJvcGVydHlJZCBpbiB0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHlJZCkpIHtcbiAgICAgICAgbGV0IHByb3BlcnR5ID0gdGhpcy5wcm9wZXJ0aWVzW3Byb3BlcnR5SWRdO1xuICAgICAgICBmbihwcm9wZXJ0eSwgcHJvcGVydHlJZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGZvckVhY2hDaGlsZFJlY3Vyc2l2ZShmbjogKGZvcm1Qcm9wZXJ0eTogRm9ybVByb3BlcnR5KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5mb3JFYWNoQ2hpbGQoKGNoaWxkKSA9PiB7XG4gICAgICBmbihjaGlsZCk7XG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBQcm9wZXJ0eUdyb3VwKSB7XG4gICAgICAgICg8UHJvcGVydHlHcm91cD5jaGlsZCkuZm9yRWFjaENoaWxkUmVjdXJzaXZlKGZuKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBfYmluZFZpc2liaWxpdHkoKSB7XG4gICAgc3VwZXIuX2JpbmRWaXNpYmlsaXR5KCk7XG4gICAgdGhpcy5fYmluZFZpc2liaWxpdHlSZWN1cnNpdmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2JpbmRWaXNpYmlsaXR5UmVjdXJzaXZlKCkge1xuICAgIHRoaXMuZm9yRWFjaENoaWxkUmVjdXJzaXZlKChwcm9wZXJ0eSkgPT4ge1xuICAgICAgcHJvcGVydHkuX2JpbmRWaXNpYmlsaXR5KCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaXNSb290KCkge1xuICAgIHJldHVybiB0aGlzID09PSB0aGlzLnJvb3Q7XG4gIH1cbn1cblxuXG4iLCJpbXBvcnQge0Zvcm1Qcm9wZXJ0eX0gZnJvbSAnLi9mb3JtcHJvcGVydHknO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXRvbWljUHJvcGVydHkgZXh0ZW5kcyBGb3JtUHJvcGVydHkge1xuXG4gIHNldFZhbHVlKHZhbHVlLCBvbmx5U2VsZiA9IGZhbHNlKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkob25seVNlbGYsIHRydWUpO1xuICB9XG5cbiAgcmVzZXQodmFsdWU6IGFueSA9IG51bGwsIG9ubHlTZWxmID0gdHJ1ZSkge1xuICAgIHRoaXMucmVzZXRWYWx1ZSh2YWx1ZSk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KG9ubHlTZWxmLCB0cnVlKTtcbiAgfVxuXG4gIHJlc2V0VmFsdWUodmFsdWU6IGFueSk6IGFueSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICBpZiAodGhpcy5zY2hlbWEuZGVmYXVsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5zY2hlbWEuZGVmYXVsdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5mYWxsYmFja1ZhbHVlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgX2hhc1ZhbHVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmZhbGxiYWNrVmFsdWUoKSAhPT0gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIGFic3RyYWN0IGZhbGxiYWNrVmFsdWUoKTogYW55O1xuXG4gIHB1YmxpYyBfdXBkYXRlVmFsdWUoKSB7XG4gIH1cbn1cbiIsImltcG9ydCB7QXRvbWljUHJvcGVydHl9IGZyb20gJy4vYXRvbWljcHJvcGVydHknO1xuXG5leHBvcnQgY2xhc3MgTnVtYmVyUHJvcGVydHkgZXh0ZW5kcyBBdG9taWNQcm9wZXJ0eSB7XG5cbiAgZmFsbGJhY2tWYWx1ZSgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHNldFZhbHVlKHZhbHVlLCBvbmx5U2VsZiA9IGZhbHNlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICh2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5pbmRleE9mKCcuJykgPiAtMSA/IHBhcnNlRmxvYXQodmFsdWUpIDogcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkob25seVNlbGYsIHRydWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBBdG9taWNQcm9wZXJ0eSB9IGZyb20gJy4vYXRvbWljcHJvcGVydHknO1xuXG5leHBvcnQgY2xhc3MgU3RyaW5nUHJvcGVydHkgZXh0ZW5kcyBBdG9taWNQcm9wZXJ0eSB7XG5cbiAgZmFsbGJhY2tWYWx1ZSgpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQXRvbWljUHJvcGVydHkgfSBmcm9tICcuL2F0b21pY3Byb3BlcnR5JztcblxuZXhwb3J0IGNsYXNzIEJvb2xlYW5Qcm9wZXJ0eSBleHRlbmRzIEF0b21pY1Byb3BlcnR5IHtcblxuICBmYWxsYmFja1ZhbHVlKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQge1Byb3BlcnR5R3JvdXB9IGZyb20gJy4vZm9ybXByb3BlcnR5JztcbmltcG9ydCB7Rm9ybVByb3BlcnR5RmFjdG9yeX0gZnJvbSAnLi9mb3JtcHJvcGVydHlmYWN0b3J5JztcbmltcG9ydCB7U2NoZW1hVmFsaWRhdG9yRmFjdG9yeX0gZnJvbSAnLi4vc2NoZW1hdmFsaWRhdG9yZmFjdG9yeSc7XG5pbXBvcnQge1ZhbGlkYXRvclJlZ2lzdHJ5fSBmcm9tICcuL3ZhbGlkYXRvcnJlZ2lzdHJ5JztcblxuZXhwb3J0IGNsYXNzIE9iamVjdFByb3BlcnR5IGV4dGVuZHMgUHJvcGVydHlHcm91cCB7XG5cbiAgcHJpdmF0ZSBwcm9wZXJ0aWVzSWQ6IHN0cmluZ1tdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtUHJvcGVydHlGYWN0b3J5OiBGb3JtUHJvcGVydHlGYWN0b3J5LFxuICAgICAgICAgICAgICBzY2hlbWFWYWxpZGF0b3JGYWN0b3J5OiBTY2hlbWFWYWxpZGF0b3JGYWN0b3J5LFxuICAgICAgICAgICAgICB2YWxpZGF0b3JSZWdpc3RyeTogVmFsaWRhdG9yUmVnaXN0cnksXG4gICAgICAgICAgICAgIHNjaGVtYTogYW55LFxuICAgICAgICAgICAgICBwYXJlbnQ6IFByb3BlcnR5R3JvdXAsXG4gICAgICAgICAgICAgIHBhdGg6IHN0cmluZykge1xuICAgIHN1cGVyKHNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHZhbGlkYXRvclJlZ2lzdHJ5LCBzY2hlbWEsIHBhcmVudCwgcGF0aCk7XG4gICAgdGhpcy5jcmVhdGVQcm9wZXJ0aWVzKCk7XG4gIH1cblxuICBzZXRWYWx1ZSh2YWx1ZTogYW55LCBvbmx5U2VsZjogYm9vbGVhbikge1xuICAgIGZvciAoY29uc3QgcHJvcGVydHlJZCBpbiB2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KHByb3BlcnR5SWQpKSB7XG4gICAgICAgIHRoaXMucHJvcGVydGllc1twcm9wZXJ0eUlkXS5zZXRWYWx1ZSh2YWx1ZVtwcm9wZXJ0eUlkXSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShvbmx5U2VsZiwgdHJ1ZSk7XG4gIH1cblxuICByZXNldCh2YWx1ZTogYW55LCBvbmx5U2VsZiA9IHRydWUpIHtcbiAgICB2YWx1ZSA9IHZhbHVlIHx8IHRoaXMuc2NoZW1hLmRlZmF1bHQgfHwge307XG4gICAgdGhpcy5yZXNldFByb3BlcnRpZXModmFsdWUpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShvbmx5U2VsZiwgdHJ1ZSk7XG4gIH1cblxuICByZXNldFByb3BlcnRpZXModmFsdWU6IGFueSkge1xuICAgIGZvciAoY29uc3QgcHJvcGVydHlJZCBpbiB0aGlzLnNjaGVtYS5wcm9wZXJ0aWVzKSB7XG4gICAgICBpZiAodGhpcy5zY2hlbWEucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eUlkKSkge1xuICAgICAgICB0aGlzLnByb3BlcnRpZXNbcHJvcGVydHlJZF0ucmVzZXQodmFsdWVbcHJvcGVydHlJZF0sIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZVByb3BlcnRpZXMoKSB7XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0ge307XG4gICAgdGhpcy5wcm9wZXJ0aWVzSWQgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5SWQgaW4gdGhpcy5zY2hlbWEucHJvcGVydGllcykge1xuICAgICAgaWYgKHRoaXMuc2NoZW1hLnByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHlJZCkpIHtcbiAgICAgICAgY29uc3QgcHJvcGVydHlTY2hlbWEgPSB0aGlzLnNjaGVtYS5wcm9wZXJ0aWVzW3Byb3BlcnR5SWRdO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXNbcHJvcGVydHlJZF0gPSB0aGlzLmZvcm1Qcm9wZXJ0eUZhY3RvcnkuY3JlYXRlUHJvcGVydHkocHJvcGVydHlTY2hlbWEsIHRoaXMsIHByb3BlcnR5SWQpO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXNJZC5wdXNoKHByb3BlcnR5SWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBfaGFzVmFsdWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhT2JqZWN0LmtleXModGhpcy52YWx1ZSkubGVuZ3RoO1xuICB9XG5cbiAgcHVibGljIF91cGRhdGVWYWx1ZSgpIHtcbiAgICB0aGlzLnJlZHVjZVZhbHVlKCk7XG4gIH1cblxuICBwdWJsaWMgX3J1blZhbGlkYXRpb24oKSB7XG4gICAgc3VwZXIuX3J1blZhbGlkYXRpb24oKTtcblxuICAgIGlmICh0aGlzLl9lcnJvcnMpIHtcbiAgICAgIHRoaXMuX2Vycm9ycy5mb3JFYWNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc3QgcHJvcCA9IHRoaXMuc2VhcmNoUHJvcGVydHkoZXJyb3IucGF0aC5zbGljZSgxKSk7XG4gICAgICAgIGlmIChwcm9wKSB7XG4gICAgICAgICAgcHJvcC5leHRlbmRFcnJvcnMoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlZHVjZVZhbHVlKCk6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlID0ge307XG4gICAgdGhpcy5mb3JFYWNoQ2hpbGQoKHByb3BlcnR5LCBwcm9wZXJ0eUlkOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChwcm9wZXJ0eS52aXNpYmxlICYmIHByb3BlcnR5Ll9oYXNWYWx1ZSgpKSB7XG4gICAgICAgIHZhbHVlW3Byb3BlcnR5SWRdID0gcHJvcGVydHkudmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHtGb3JtUHJvcGVydHksIFByb3BlcnR5R3JvdXB9IGZyb20gJy4vZm9ybXByb3BlcnR5JztcbmltcG9ydCB7Rm9ybVByb3BlcnR5RmFjdG9yeX0gZnJvbSAnLi9mb3JtcHJvcGVydHlmYWN0b3J5JztcbmltcG9ydCB7U2NoZW1hVmFsaWRhdG9yRmFjdG9yeX0gZnJvbSAnLi4vc2NoZW1hdmFsaWRhdG9yZmFjdG9yeSc7XG5pbXBvcnQge1ZhbGlkYXRvclJlZ2lzdHJ5fSBmcm9tICcuL3ZhbGlkYXRvcnJlZ2lzdHJ5JztcblxuZXhwb3J0IGNsYXNzIEFycmF5UHJvcGVydHkgZXh0ZW5kcyBQcm9wZXJ0eUdyb3VwIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvcm1Qcm9wZXJ0eUZhY3Rvcnk6IEZvcm1Qcm9wZXJ0eUZhY3RvcnksXG4gICAgICAgICAgICAgIHNjaGVtYVZhbGlkYXRvckZhY3Rvcnk6IFNjaGVtYVZhbGlkYXRvckZhY3RvcnksXG4gICAgICAgICAgICAgIHZhbGlkYXRvclJlZ2lzdHJ5OiBWYWxpZGF0b3JSZWdpc3RyeSxcbiAgICAgICAgICAgICAgc2NoZW1hOiBhbnksXG4gICAgICAgICAgICAgIHBhcmVudDogUHJvcGVydHlHcm91cCxcbiAgICAgICAgICAgICAgcGF0aDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NoZW1hVmFsaWRhdG9yRmFjdG9yeSwgdmFsaWRhdG9yUmVnaXN0cnksIHNjaGVtYSwgcGFyZW50LCBwYXRoKTtcbiAgfVxuXG4gIGFkZEl0ZW0odmFsdWU6IGFueSA9IG51bGwpOiBGb3JtUHJvcGVydHkge1xuICAgIGxldCBuZXdQcm9wZXJ0eSA9IHRoaXMuYWRkUHJvcGVydHkoKTtcbiAgICBuZXdQcm9wZXJ0eS5yZXNldCh2YWx1ZSwgZmFsc2UpO1xuICAgIHJldHVybiBuZXdQcm9wZXJ0eTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkUHJvcGVydHkoKSB7XG4gICAgbGV0IG5ld1Byb3BlcnR5ID0gdGhpcy5mb3JtUHJvcGVydHlGYWN0b3J5LmNyZWF0ZVByb3BlcnR5KHRoaXMuc2NoZW1hLml0ZW1zLCB0aGlzKTtcbiAgICAoPEZvcm1Qcm9wZXJ0eVtdPnRoaXMucHJvcGVydGllcykucHVzaChuZXdQcm9wZXJ0eSk7XG4gICAgcmV0dXJuIG5ld1Byb3BlcnR5O1xuICB9XG5cbiAgcmVtb3ZlSXRlbShpdGVtOiBGb3JtUHJvcGVydHkpIHtcbiAgICB0aGlzLnByb3BlcnRpZXMgPSAoPEZvcm1Qcm9wZXJ0eVtdPnRoaXMucHJvcGVydGllcykuZmlsdGVyKGkgPT4gaSAhPT0gaXRlbSk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KGZhbHNlLCB0cnVlKTtcbiAgfVxuXG4gIHNldFZhbHVlKHZhbHVlOiBhbnksIG9ubHlTZWxmOiBib29sZWFuKSB7XG4gICAgdGhpcy5jcmVhdGVQcm9wZXJ0aWVzKCk7XG4gICAgdGhpcy5yZXNldFByb3BlcnRpZXModmFsdWUpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShvbmx5U2VsZiwgdHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgX2hhc1ZhbHVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIF91cGRhdGVWYWx1ZSgpIHtcbiAgICB0aGlzLnJlZHVjZVZhbHVlKCk7XG4gIH1cblxuICBwcml2YXRlIHJlZHVjZVZhbHVlKCk6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlID0gW107XG4gICAgdGhpcy5mb3JFYWNoQ2hpbGQoKHByb3BlcnR5LCBfKSA9PiB7XG4gICAgICBpZiAocHJvcGVydHkudmlzaWJsZSAmJiBwcm9wZXJ0eS5faGFzVmFsdWUoKSkge1xuICAgICAgICB2YWx1ZS5wdXNoKHByb3BlcnR5LnZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcmVzZXQodmFsdWU6IGFueSwgb25seVNlbGYgPSB0cnVlKSB7XG4gICAgdmFsdWUgPSB2YWx1ZSB8fCB0aGlzLnNjaGVtYS5kZWZhdWx0IHx8IFtdO1xuICAgIHRoaXMucHJvcGVydGllcyA9IFtdO1xuICAgIHRoaXMucmVzZXRQcm9wZXJ0aWVzKHZhbHVlKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkob25seVNlbGYsIHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVQcm9wZXJ0aWVzKCkge1xuICAgIHRoaXMucHJvcGVydGllcyA9IFtdO1xuICB9XG5cblxuICBwcml2YXRlIHJlc2V0UHJvcGVydGllcyh2YWx1ZTogYW55KSB7XG4gICAgZm9yIChsZXQgaWR4IGluIHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUuaGFzT3duUHJvcGVydHkoaWR4KSkge1xuICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLmFkZFByb3BlcnR5KCk7XG4gICAgICAgIHByb3BlcnR5LnJlc2V0KHZhbHVlW2lkeF0sIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtGb3JtUHJvcGVydHksIFByb3BlcnR5R3JvdXB9IGZyb20gJy4vZm9ybXByb3BlcnR5JztcbmltcG9ydCB7TnVtYmVyUHJvcGVydHl9IGZyb20gJy4vbnVtYmVycHJvcGVydHknO1xuaW1wb3J0IHtTdHJpbmdQcm9wZXJ0eX0gZnJvbSAnLi9zdHJpbmdwcm9wZXJ0eSc7XG5pbXBvcnQge0Jvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnLi9ib29sZWFucHJvcGVydHknO1xuaW1wb3J0IHtPYmplY3RQcm9wZXJ0eX0gZnJvbSAnLi9vYmplY3Rwcm9wZXJ0eSc7XG5pbXBvcnQge0FycmF5UHJvcGVydHl9IGZyb20gJy4vYXJyYXlwcm9wZXJ0eSc7XG5pbXBvcnQge1NjaGVtYVZhbGlkYXRvckZhY3Rvcnl9IGZyb20gJy4uL3NjaGVtYXZhbGlkYXRvcmZhY3RvcnknO1xuaW1wb3J0IHtWYWxpZGF0b3JSZWdpc3RyeX0gZnJvbSAnLi92YWxpZGF0b3JyZWdpc3RyeSc7XG5pbXBvcnQge1Byb3BlcnR5QmluZGluZ1JlZ2lzdHJ5fSBmcm9tICcuLi9wcm9wZXJ0eS1iaW5kaW5nLXJlZ2lzdHJ5JztcblxuZXhwb3J0IGNsYXNzIEZvcm1Qcm9wZXJ0eUZhY3Rvcnkge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2NoZW1hVmFsaWRhdG9yRmFjdG9yeTogU2NoZW1hVmFsaWRhdG9yRmFjdG9yeSwgcHJpdmF0ZSB2YWxpZGF0b3JSZWdpc3RyeTogVmFsaWRhdG9yUmVnaXN0cnksXG4gICAgICAgICAgICAgIHByaXZhdGUgcHJvcGVydHlCaW5kaW5nUmVnaXN0cnk6IFByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5KSB7XG4gIH1cblxuICBjcmVhdGVQcm9wZXJ0eShzY2hlbWE6IGFueSwgcGFyZW50OiBQcm9wZXJ0eUdyb3VwID0gbnVsbCwgcHJvcGVydHlJZD86IHN0cmluZyk6IEZvcm1Qcm9wZXJ0eSB7XG4gICAgbGV0IG5ld1Byb3BlcnR5ID0gbnVsbDtcbiAgICBsZXQgcGF0aCA9ICcnO1xuICAgIGxldCBfY2Fub25pY2FsUGF0aCA9ICcnO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhdGggKz0gcGFyZW50LnBhdGg7XG4gICAgICBpZiAocGFyZW50LnBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICBwYXRoICs9ICcvJztcbiAgICAgICAgX2Nhbm9uaWNhbFBhdGggKz0gJy8nO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmVudC50eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBwYXRoICs9IHByb3BlcnR5SWQ7XG4gICAgICAgIF9jYW5vbmljYWxQYXRoICs9IHByb3BlcnR5SWQ7XG4gICAgICB9IGVsc2UgaWYgKHBhcmVudC50eXBlID09PSAnYXJyYXknKSB7XG4gICAgICAgIHBhdGggKz0gJyonO1xuICAgICAgICBfY2Fub25pY2FsUGF0aCArPSAnKic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyAnSW5zdGFuY2lhdGlvbiBvZiBhIEZvcm1Qcm9wZXJ0eSB3aXRoIGFuIHVua25vd24gcGFyZW50IHR5cGU6ICcgKyBwYXJlbnQudHlwZTtcbiAgICAgIH1cbiAgICAgIF9jYW5vbmljYWxQYXRoID0gKHBhcmVudC5fY2Fub25pY2FsUGF0aCB8fCBwYXJlbnQucGF0aCkgKyBfY2Fub25pY2FsUGF0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgcGF0aCA9ICcvJztcbiAgICAgIF9jYW5vbmljYWxQYXRoID0gJy8nO1xuICAgIH1cblxuICAgIGlmIChzY2hlbWEuJHJlZikge1xuICAgICAgY29uc3QgcmVmU2NoZW1hID0gdGhpcy5zY2hlbWFWYWxpZGF0b3JGYWN0b3J5LmdldFNjaGVtYShwYXJlbnQucm9vdC5zY2hlbWEsIHNjaGVtYS4kcmVmKTtcbiAgICAgIG5ld1Byb3BlcnR5ID0gdGhpcy5jcmVhdGVQcm9wZXJ0eShyZWZTY2hlbWEsIHBhcmVudCwgcGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAoc2NoZW1hLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnaW50ZWdlcic6XG4gICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgbmV3UHJvcGVydHkgPSBuZXcgTnVtYmVyUHJvcGVydHkodGhpcy5zY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LCBzY2hlbWEsIHBhcmVudCwgcGF0aCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgbmV3UHJvcGVydHkgPSBuZXcgU3RyaW5nUHJvcGVydHkodGhpcy5zY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LCBzY2hlbWEsIHBhcmVudCwgcGF0aCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgIG5ld1Byb3BlcnR5ID0gbmV3IEJvb2xlYW5Qcm9wZXJ0eSh0aGlzLnNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHRoaXMudmFsaWRhdG9yUmVnaXN0cnksIHNjaGVtYSwgcGFyZW50LCBwYXRoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICBuZXdQcm9wZXJ0eSA9IG5ldyBPYmplY3RQcm9wZXJ0eSh0aGlzLCB0aGlzLnNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHRoaXMudmFsaWRhdG9yUmVnaXN0cnksIHNjaGVtYSwgcGFyZW50LCBwYXRoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICAgIG5ld1Byb3BlcnR5ID0gbmV3IEFycmF5UHJvcGVydHkodGhpcywgdGhpcy5zY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LCBzY2hlbWEsIHBhcmVudCwgcGF0aCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVW5kZWZpbmVkIHR5cGUgJHtzY2hlbWEudHlwZX1gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBuZXdQcm9wZXJ0eS5fcHJvcGVydHlCaW5kaW5nUmVnaXN0cnkgPSB0aGlzLnByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5O1xuICAgIG5ld1Byb3BlcnR5Ll9jYW5vbmljYWxQYXRoID0gX2Nhbm9uaWNhbFBhdGg7XG5cbiAgICBpZiAobmV3UHJvcGVydHkgaW5zdGFuY2VvZiBQcm9wZXJ0eUdyb3VwKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemVSb290KG5ld1Byb3BlcnR5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3UHJvcGVydHk7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemVSb290KHJvb3RQcm9wZXJ0eTogUHJvcGVydHlHcm91cCkge1xuICAgIHJvb3RQcm9wZXJ0eS5yZXNldChudWxsLCB0cnVlKTtcbiAgICByb290UHJvcGVydHkuX2JpbmRWaXNpYmlsaXR5KCk7XG4gIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBpc1ByZXNlbnQobykge1xuICByZXR1cm4gbyAhPT0gbnVsbCAmJiBvICE9PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JsYW5rKG8pIHtcbiAgcmV0dXJuIG8gPT09IG51bGwgfHwgbyA9PT0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHtpc0JsYW5rfSBmcm9tICcuL3V0aWxzJztcblxuZnVuY3Rpb24gZm9ybWF0TWVzc2FnZShtZXNzYWdlLCBwYXRoKSB7XG4gIHJldHVybiBgUGFyc2luZyBlcnJvciBvbiAke3BhdGh9OiAke21lc3NhZ2V9YDtcbn1cblxuZnVuY3Rpb24gc2NoZW1hRXJyb3IobWVzc2FnZSwgcGF0aCk6IHZvaWQge1xuICBsZXQgbWVzZyA9IGZvcm1hdE1lc3NhZ2UobWVzc2FnZSwgcGF0aCk7XG4gIHRocm93IG5ldyBFcnJvcihtZXNnKTtcbn1cblxuZnVuY3Rpb24gc2NoZW1hV2FybmluZyhtZXNzYWdlLCBwYXRoKTogdm9pZCB7XG4gIGxldCBtZXNnID0gZm9ybWF0TWVzc2FnZShtZXNzYWdlLCBwYXRoKTtcbiAgdGhyb3cgbmV3IEVycm9yKG1lc2cpO1xufVxuXG5leHBvcnQgY2xhc3MgU2NoZW1hUHJlcHJvY2Vzc29yIHtcblxuICBzdGF0aWMgcHJlcHJvY2Vzcyhqc29uU2NoZW1hOiBhbnksIHBhdGggPSAnLycpOiBhbnkge1xuICAgIGpzb25TY2hlbWEgPSBqc29uU2NoZW1hIHx8IHt9O1xuICAgIFNjaGVtYVByZXByb2Nlc3Nvci5ub3JtYWxpemVFeHRlbnNpb25zKGpzb25TY2hlbWEpO1xuICAgIGlmIChqc29uU2NoZW1hLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBTY2hlbWFQcmVwcm9jZXNzb3IuY2hlY2tQcm9wZXJ0aWVzKGpzb25TY2hlbWEsIHBhdGgpO1xuICAgICAgU2NoZW1hUHJlcHJvY2Vzc29yLmNoZWNrQW5kQ3JlYXRlRmllbGRzZXRzKGpzb25TY2hlbWEsIHBhdGgpO1xuICAgIH0gZWxzZSBpZiAoanNvblNjaGVtYS50eXBlID09PSAnYXJyYXknKSB7XG4gICAgICBTY2hlbWFQcmVwcm9jZXNzb3IuY2hlY2tJdGVtcyhqc29uU2NoZW1hLCBwYXRoKTtcbiAgICB9XG4gICAgU2NoZW1hUHJlcHJvY2Vzc29yLm5vcm1hbGl6ZVdpZGdldChqc29uU2NoZW1hKTtcbiAgICBTY2hlbWFQcmVwcm9jZXNzb3IucmVjdXJzaXZlQ2hlY2soanNvblNjaGVtYSwgcGF0aCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjaGVja1Byb3BlcnRpZXMoanNvblNjaGVtYSwgcGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKGlzQmxhbmsoanNvblNjaGVtYS5wcm9wZXJ0aWVzKSkge1xuICAgICAganNvblNjaGVtYS5wcm9wZXJ0aWVzID0ge307XG4gICAgICBzY2hlbWFXYXJuaW5nKCdQcm92aWRlZCBqc29uIHNjaGVtYSBkb2VzIG5vdCBjb250YWluIGEgXFwncHJvcGVydGllc1xcJyBlbnRyeS4gT3V0cHV0IHNjaGVtYSB3aWxsIGJlIGVtcHR5JywgcGF0aCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgY2hlY2tBbmRDcmVhdGVGaWVsZHNldHMoanNvblNjaGVtYTogYW55LCBwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoanNvblNjaGVtYS5maWVsZHNldHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGpzb25TY2hlbWEub3JkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucmVwbGFjZU9yZGVyQnlGaWVsZHNldHMoanNvblNjaGVtYSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IuY3JlYXRlRmllbGRzZXRzKGpzb25TY2hlbWEpO1xuICAgICAgfVxuICAgIH1cbiAgICBTY2hlbWFQcmVwcm9jZXNzb3IuY2hlY2tGaWVsZHNVc2FnZShqc29uU2NoZW1hLCBwYXRoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNoZWNrRmllbGRzVXNhZ2UoanNvblNjaGVtYSwgcGF0aDogc3RyaW5nKSB7XG4gICAgbGV0IGZpZWxkc0lkOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGpzb25TY2hlbWEucHJvcGVydGllcyk7XG4gICAgbGV0IHVzZWRGaWVsZHMgPSB7fTtcbiAgICBmb3IgKGxldCBmaWVsZHNldCBvZiBqc29uU2NoZW1hLmZpZWxkc2V0cykge1xuICAgICAgZm9yIChsZXQgZmllbGRJZCBvZiBmaWVsZHNldC5maWVsZHMpIHtcbiAgICAgICAgaWYgKHVzZWRGaWVsZHNbZmllbGRJZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHVzZWRGaWVsZHNbZmllbGRJZF0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB1c2VkRmllbGRzW2ZpZWxkSWRdLnB1c2goZmllbGRzZXQuaWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgZmllbGRJZCBvZiBmaWVsZHNJZCkge1xuICAgICAgY29uc3QgaXNSZXF1aXJlZCA9IGpzb25TY2hlbWEucmVxdWlyZWQgJiYganNvblNjaGVtYS5yZXF1aXJlZC5pbmRleE9mKGZpZWxkSWQpID4gLTE7XG4gICAgICBpZiAoaXNSZXF1aXJlZCAmJiBqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF0pIHtcbiAgICAgICAganNvblNjaGVtYS5wcm9wZXJ0aWVzW2ZpZWxkSWRdLmlzUmVxdWlyZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHVzZWRGaWVsZHMuaGFzT3duUHJvcGVydHkoZmllbGRJZCkpIHtcbiAgICAgICAgaWYgKHVzZWRGaWVsZHNbZmllbGRJZF0ubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHNjaGVtYUVycm9yKGAke2ZpZWxkSWR9IGlzIHJlZmVyZW5jZWQgYnkgbW9yZSB0aGFuIG9uZSBmaWVsZHNldDogJHt1c2VkRmllbGRzW2ZpZWxkSWRdfWAsIHBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSB1c2VkRmllbGRzW2ZpZWxkSWRdO1xuICAgICAgfSBlbHNlIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgIHNjaGVtYUVycm9yKGAke2ZpZWxkSWR9IGlzIGEgcmVxdWlyZWQgZmllbGQgYnV0IGl0IGlzIG5vdCByZWZlcmVuY2VkIGFzIHBhcnQgb2YgYSAnb3JkZXInIG9yIGEgJ2ZpZWxkc2V0JyBwcm9wZXJ0eWAsIHBhdGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIGpzb25TY2hlbWFbZmllbGRJZF07XG4gICAgICAgIHNjaGVtYVdhcm5pbmcoYFJlbW92aW5nIHVucmVmZXJlbmNlZCBmaWVsZCAke2ZpZWxkSWR9YCwgcGF0aCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgcmVtYWluaW5nZmllbGRzSWQgaW4gdXNlZEZpZWxkcykge1xuICAgICAgaWYgKHVzZWRGaWVsZHMuaGFzT3duUHJvcGVydHkocmVtYWluaW5nZmllbGRzSWQpKSB7XG4gICAgICAgIHNjaGVtYVdhcm5pbmcoYFJlZmVyZW5jaW5nIG5vbi1leGlzdGVudCBmaWVsZCAke3JlbWFpbmluZ2ZpZWxkc0lkfSBpbiBvbmUgb3IgbW9yZSBmaWVsZHNldHNgLCBwYXRoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjcmVhdGVGaWVsZHNldHMoanNvblNjaGVtYSkge1xuICAgIGpzb25TY2hlbWEub3JkZXIgPSBPYmplY3Qua2V5cyhqc29uU2NoZW1hLnByb3BlcnRpZXMpO1xuICAgIFNjaGVtYVByZXByb2Nlc3Nvci5yZXBsYWNlT3JkZXJCeUZpZWxkc2V0cyhqc29uU2NoZW1hKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHJlcGxhY2VPcmRlckJ5RmllbGRzZXRzKGpzb25TY2hlbWEpIHtcbiAgICBqc29uU2NoZW1hLmZpZWxkc2V0cyA9IFt7XG4gICAgICBpZDogJ2ZpZWxkc2V0LWRlZmF1bHQnLFxuICAgICAgdGl0bGU6IGpzb25TY2hlbWEudGl0bGUgfHwgJycsXG4gICAgICBkZXNjcmlwdGlvbjoganNvblNjaGVtYS5kZXNjcmlwdGlvbiB8fCAnJyxcbiAgICAgIG5hbWU6IGpzb25TY2hlbWEubmFtZSB8fCAnJyxcbiAgICAgIGZpZWxkczoganNvblNjaGVtYS5vcmRlclxuICAgIH1dO1xuICAgIGRlbGV0ZSBqc29uU2NoZW1hLm9yZGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgbm9ybWFsaXplV2lkZ2V0KGZpZWxkU2NoZW1hOiBhbnkpIHtcbiAgICBsZXQgd2lkZ2V0ID0gZmllbGRTY2hlbWEud2lkZ2V0O1xuICAgIGlmICh3aWRnZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgd2lkZ2V0ID0geydpZCc6IGZpZWxkU2NoZW1hLnR5cGV9O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHdpZGdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHdpZGdldCA9IHsnaWQnOiB3aWRnZXR9O1xuICAgIH1cbiAgICBmaWVsZFNjaGVtYS53aWRnZXQgPSB3aWRnZXQ7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjaGVja0l0ZW1zKGpzb25TY2hlbWEsIHBhdGgpIHtcbiAgICBpZiAoanNvblNjaGVtYS5pdGVtcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2hlbWFFcnJvcignTm8gXFwnaXRlbXNcXCcgcHJvcGVydHkgaW4gYXJyYXknLCBwYXRoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyByZWN1cnNpdmVDaGVjayhqc29uU2NoZW1hLCBwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoanNvblNjaGVtYS50eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgZm9yIChsZXQgZmllbGRJZCBpbiBqc29uU2NoZW1hLnByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKGpzb25TY2hlbWEucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShmaWVsZElkKSkge1xuICAgICAgICAgIGxldCBmaWVsZFNjaGVtYSA9IGpzb25TY2hlbWEucHJvcGVydGllc1tmaWVsZElkXTtcbiAgICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucHJlcHJvY2VzcyhmaWVsZFNjaGVtYSwgcGF0aCArIGZpZWxkSWQgKyAnLycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoanNvblNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnZGVmaW5pdGlvbnMnKSkge1xuICAgICAgICBmb3IgKGxldCBmaWVsZElkIGluIGpzb25TY2hlbWEuZGVmaW5pdGlvbnMpIHtcbiAgICAgICAgICBpZiAoanNvblNjaGVtYS5kZWZpbml0aW9ucy5oYXNPd25Qcm9wZXJ0eShmaWVsZElkKSkge1xuICAgICAgICAgICAgbGV0IGZpZWxkU2NoZW1hID0ganNvblNjaGVtYS5kZWZpbml0aW9uc1tmaWVsZElkXTtcbiAgICAgICAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5yZW1vdmVSZWN1cnNpdmVSZWZQcm9wZXJ0aWVzKGZpZWxkU2NoZW1hLCBgIy9kZWZpbml0aW9ucy8ke2ZpZWxkSWR9YCk7XG4gICAgICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucHJlcHJvY2VzcyhmaWVsZFNjaGVtYSwgcGF0aCArIGZpZWxkSWQgKyAnLycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoanNvblNjaGVtYS50eXBlID09PSAnYXJyYXknKSB7XG4gICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucHJlcHJvY2Vzcyhqc29uU2NoZW1hLml0ZW1zLCBwYXRoICsgJyovJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVtb3ZlUmVjdXJzaXZlUmVmUHJvcGVydGllcyhqc29uU2NoZW1hLCBkZWZpbml0aW9uUGF0aCkge1xuICAgIC8vIHRvIGF2b2lkIGluZmluaXRlIGxvb3BcbiAgICBpZiAoanNvblNjaGVtYS50eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgZm9yIChsZXQgZmllbGRJZCBpbiBqc29uU2NoZW1hLnByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKGpzb25TY2hlbWEucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShmaWVsZElkKSkge1xuICAgICAgICAgIGlmIChqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF0uJHJlZlxuICAgICAgICAgICAgJiYganNvblNjaGVtYS5wcm9wZXJ0aWVzW2ZpZWxkSWRdLiRyZWYgPT09IGRlZmluaXRpb25QYXRoKSB7XG4gICAgICAgICAgICBkZWxldGUganNvblNjaGVtYS5wcm9wZXJ0aWVzW2ZpZWxkSWRdO1xuICAgICAgICAgIH0gZWxzZSBpZiAoanNvblNjaGVtYS5wcm9wZXJ0aWVzW2ZpZWxkSWRdLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucmVtb3ZlUmVjdXJzaXZlUmVmUHJvcGVydGllcyhqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF0sIGRlZmluaXRpb25QYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBFbmFibGVzIGFsaWFzIG5hbWVzIGZvciBKU09OIHNjaGVtYSBleHRlbnNpb25zLlxuICAgKlxuICAgKiBDb3BpZXMgdGhlIHZhbHVlIG9mIGVhY2ggYWxpYXMgSlNPTiBzY2hlbWEgcHJvcGVydHlcbiAgICogdG8gdGhlIEpTT04gc2NoZW1hIHByb3BlcnR5IG9mIG5neC1zY2hlbWEtZm9ybS5cbiAgICpcbiAgICogQHBhcmFtIHNjaGVtYSBKU09OIHNjaGVtYSB0byBlbmFibGUgYWxpYXMgbmFtZXMuXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyBub3JtYWxpemVFeHRlbnNpb25zKHNjaGVtYTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgZXh0ZW5zaW9ucyA9IFtcbiAgICAgICAgeyBuYW1lOiBcImZpZWxkc2V0c1wiLCByZWdleDogL154LT9maWVsZC0/c2V0cyQvaSB9LFxuICAgICAgICB7IG5hbWU6IFwid2lkZ2V0XCIsICAgIHJlZ2V4OiAvXngtP3dpZGdldCQvaSB9LFxuICAgICAgICB7IG5hbWU6IFwidmlzaWJsZUlmXCIsIHJlZ2V4OiAvXngtP3Zpc2libGUtP2lmJC9pIH1cbiAgICBdO1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzY2hlbWEpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgbGV0IGsgPSBrZXlzW2ldO1xuICAgICAgbGV0IGUgPSBleHRlbnNpb25zLmZpbmQoZSA9PiAhIWsubWF0Y2goZS5yZWdleCkpO1xuICAgICAgaWYgKGUpIHtcbiAgICAgICAgbGV0IHYgPSBzY2hlbWFba107XG4gICAgICAgIGxldCBjb3B5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh2KSk7XG4gICAgICAgIHNjaGVtYVtlLm5hbWVdID0gY29weTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuIiwiaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnLi92YWxpZGF0b3InO1xuXG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yUmVnaXN0cnkge1xuICBwcml2YXRlIHZhbGlkYXRvcnM6IFZhbGlkYXRvcltdID0gW107XG5cbiAgcmVnaXN0ZXIocGF0aDogc3RyaW5nLCB2YWxpZGF0b3I6IFZhbGlkYXRvcikge1xuICAgIHRoaXMudmFsaWRhdG9yc1twYXRoXSA9IHZhbGlkYXRvcjtcbiAgfVxuXG4gIGdldChwYXRoOiBzdHJpbmcpOiBWYWxpZGF0b3Ige1xuICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcnNbcGF0aF07XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLnZhbGlkYXRvcnMgPSBbXTtcbiAgfVxufVxuIiwiaW1wb3J0IHtCaW5kaW5nfSBmcm9tICcuL2JpbmRpbmcnO1xuXG5leHBvcnQgY2xhc3MgQmluZGluZ1JlZ2lzdHJ5IHtcbiAgYmluZGluZ3M6IEJpbmRpbmdbXSA9IFtdO1xuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuYmluZGluZ3MgPSBbXTtcbiAgfVxuXG4gIHJlZ2lzdGVyKHBhdGg6IHN0cmluZywgYmluZGluZzogQmluZGluZyB8IEJpbmRpbmdbXSkge1xuICAgIHRoaXMuYmluZGluZ3NbcGF0aF0gPSBbXS5jb25jYXQoYmluZGluZyk7XG4gIH1cblxuICBnZXQocGF0aDogc3RyaW5nKTogQmluZGluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5iaW5kaW5nc1twYXRoXTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgWlNjaGVtYSBmcm9tICd6LXNjaGVtYSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTY2hlbWFWYWxpZGF0b3JGYWN0b3J5IHtcbiAgYWJzdHJhY3QgY3JlYXRlVmFsaWRhdG9yRm4oc2NoZW1hKTogKHZhbHVlOiBhbnkpID0+IGFueTtcblxuICBhYnN0cmFjdCBnZXRTY2hlbWEoc2NoZW1hLCByZWYpOiBhbnk7XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHJlc2V0IHRoZSBzY2hlbWEgdmFsaWRhdG9yIGluc3RhbmNlLjxici8+XG4gICAqIFRoaXMgbWF5IGJlIHJlcXVpcmVkIHNpbmNlIHNvbWUgc2NoZW1hIHZhbGlkYXRvcnMga2VlcCBhIGRlZXAgY29weTxici8+XG4gICAqIG9mIHlvdXIgc2NoZW1hcyBhbmQgY2hhbmdlcyBhdCBydW50aW1lIGFyZSBub3QgcmVjb2duaXplZCBieSB0aGUgc2NoZW1hIHZhbGlkYXRvci48YnIvPlxuICAgKiBJbiB0aGlzIG1ldGhvZCB5b3Ugc2hvdWxkIGVpdGhlciByZS1pbnN0YW50aWF0ZSB0aGUgc2NoZW1hIHZhbGlkYXRvciBvclxuICAgKiBjbGVhciBpdHMgY2FjaGUuPGJyLz5cbiAgICogRXhhbXBsZSBvZiByZS1pbnN0YW50aWF0aW5nIHNjaGVtYSB2YWxpZGF0b3JcbiAgICogPGNvZGU+XG4gICAqICAgICByZXNldCgpe1xuICAgKiAgICAgICAgIHRoaXMuenNjaGVtYSA9IG5ldyBaU2NoZW1hKHt9KVxuICAgKiAgICAgfVxuICAgKiA8L2NvZGU+XG4gICAqIDxici8+XG4gICAqIFNpbmNlIHRoaXMgbWV0aG9kIGl0IHNlbGYgZG9lcyBub3RoaW5nIHRoZXJlIGlzIDxici8+XG4gICAqIG5vIG5lZWQgdG8gY2FsbCB0aGUgPGNvZGU+c3VwZXIucmVzZXQoKTwvY29kZT5cbiAgICovXG4gIHJlc2V0KCkge1xuXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFpTY2hlbWFWYWxpZGF0b3JGYWN0b3J5IGV4dGVuZHMgU2NoZW1hVmFsaWRhdG9yRmFjdG9yeSB7XG5cbiAgcHJvdGVjdGVkIHpzY2hlbWE7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmNyZWF0ZVNjaGVtYVZhbGlkYXRvcigpXG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVNjaGVtYVZhbGlkYXRvcigpIHtcbiAgICB0aGlzLnpzY2hlbWEgPSAgbmV3IFpTY2hlbWEoe1xuICAgICAgYnJlYWtPbkZpcnN0RXJyb3I6IGZhbHNlXG4gICAgfSk7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLmNyZWF0ZVNjaGVtYVZhbGlkYXRvcigpXG4gIH1cblxuICBjcmVhdGVWYWxpZGF0b3JGbihzY2hlbWE6IGFueSkge1xuICAgIHJldHVybiAodmFsdWUpOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSA9PiB7XG5cbiAgICAgIGlmIChzY2hlbWEudHlwZSA9PT0gJ251bWJlcicgfHwgc2NoZW1hLnR5cGUgPT09ICdpbnRlZ2VyJykge1xuICAgICAgICB2YWx1ZSA9ICt2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy56c2NoZW1hLnZhbGlkYXRlKHZhbHVlLCBzY2hlbWEpO1xuICAgICAgbGV0IGVyciA9IHRoaXMuenNjaGVtYS5nZXRMYXN0RXJyb3JzKCk7XG5cbiAgICAgIHRoaXMuZGVub3JtYWxpemVSZXF1aXJlZFByb3BlcnR5UGF0aHMoZXJyKTtcblxuICAgICAgcmV0dXJuIGVyciB8fCBudWxsO1xuICAgIH07XG4gIH1cblxuICBnZXRTY2hlbWEoc2NoZW1hOiBhbnksIHJlZjogc3RyaW5nKSB7XG4gICAgLy8gY2hlY2sgZGVmaW5pdGlvbnMgYXJlIHZhbGlkXG4gICAgY29uc3QgaXNWYWxpZCA9IHRoaXMuenNjaGVtYS5jb21waWxlU2NoZW1hKHNjaGVtYSk7XG4gICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldERlZmluaXRpb24oc2NoZW1hLCByZWYpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyB0aGlzLnpzY2hlbWEuZ2V0TGFzdEVycm9yKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZW5vcm1hbGl6ZVJlcXVpcmVkUHJvcGVydHlQYXRocyhlcnI6IGFueVtdKSB7XG4gICAgaWYgKGVyciAmJiBlcnIubGVuZ3RoKSB7XG4gICAgICBlcnIgPSBlcnIubWFwKGVycm9yID0+IHtcbiAgICAgICAgaWYgKGVycm9yLnBhdGggPT09ICcjLycgJiYgZXJyb3IuY29kZSA9PT0gJ09CSkVDVF9NSVNTSU5HX1JFUVVJUkVEX1BST1BFUlRZJykge1xuICAgICAgICAgIGVycm9yLnBhdGggPSBgJHtlcnJvci5wYXRofSR7ZXJyb3IucGFyYW1zWzBdfWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXREZWZpbml0aW9uKHNjaGVtYTogYW55LCByZWY6IHN0cmluZykge1xuICAgIGxldCBmb3VuZFNjaGVtYSA9IHNjaGVtYTtcbiAgICByZWYuc3BsaXQoJy8nKS5zbGljZSgxKS5mb3JFYWNoKHB0ciA9PiB7XG4gICAgICBpZiAocHRyKSB7XG4gICAgICAgIGZvdW5kU2NoZW1hID0gZm91bmRTY2hlbWFbcHRyXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm91bmRTY2hlbWE7XG4gIH1cbn1cblxuIiwiZXhwb3J0IGNsYXNzIFdpZGdldFJlZ2lzdHJ5IHtcblxuICBwcml2YXRlIHdpZGdldHM6IHsgW3R5cGU6IHN0cmluZ106IGFueSB9ID0ge307XG5cbiAgcHJpdmF0ZSBkZWZhdWx0V2lkZ2V0OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBzZXREZWZhdWx0V2lkZ2V0KHdpZGdldDogYW55KSB7XG4gICAgdGhpcy5kZWZhdWx0V2lkZ2V0ID0gd2lkZ2V0O1xuICB9XG5cbiAgZ2V0RGVmYXVsdFdpZGdldCgpIHtcbiAgICByZXR1cm4gdGhpcy5kZWZhdWx0V2lkZ2V0O1xuICB9XG5cbiAgaGFzV2lkZ2V0KHR5cGU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLndpZGdldHMuaGFzT3duUHJvcGVydHkodHlwZSk7XG4gIH1cblxuICByZWdpc3Rlcih0eXBlOiBzdHJpbmcsIHdpZGdldDogYW55KSB7XG4gICAgdGhpcy53aWRnZXRzW3R5cGVdID0gd2lkZ2V0O1xuICB9XG5cbiAgZ2V0V2lkZ2V0VHlwZSh0eXBlOiBzdHJpbmcpOiBhbnkge1xuICAgIGlmICh0aGlzLmhhc1dpZGdldCh0eXBlKSkge1xuICAgICAgcmV0dXJuIHRoaXMud2lkZ2V0c1t0eXBlXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGVmYXVsdFdpZGdldDtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgQ29tcG9uZW50UmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIEluamVjdGFibGVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFdpZGdldFJlZ2lzdHJ5IH0gZnJvbSAnLi93aWRnZXRyZWdpc3RyeSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXaWRnZXRGYWN0b3J5IHtcblxuICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI7XG4gIHByaXZhdGUgcmVnaXN0cnk6IFdpZGdldFJlZ2lzdHJ5O1xuXG4gIGNvbnN0cnVjdG9yKHJlZ2lzdHJ5OiBXaWRnZXRSZWdpc3RyeSwgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge1xuICAgIHRoaXMucmVnaXN0cnkgPSByZWdpc3RyeTtcbiAgICB0aGlzLnJlc29sdmVyID0gcmVzb2x2ZXI7XG4gIH1cblxuICBjcmVhdGVXaWRnZXQoY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLCB0eXBlOiBzdHJpbmcpOiBDb21wb25lbnRSZWY8YW55PiB7XG4gICAgbGV0IGNvbXBvbmVudENsYXNzID0gdGhpcy5yZWdpc3RyeS5nZXRXaWRnZXRUeXBlKHR5cGUpO1xuXG4gICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudENsYXNzKTtcbiAgICByZXR1cm4gY29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGVybWluYXRvclNlcnZpY2Uge1xuICBwdWJsaWMgb25EZXN0cm95OiBTdWJqZWN0PGJvb2xlYW4+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMub25EZXN0cm95ID0gbmV3IFN1YmplY3QoKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5vbkRlc3Ryb3kubmV4dCh0cnVlKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBHZW5lcmFsIHB1cnBvc2UgcHJvcGVyeSBiaW5kaW5nIHJlZ2lzdHJ5XG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeSB7XG5cbiAgcHJpdmF0ZSBiaW5kaW5nczogeyBba2V5OiBzdHJpbmddOiBQcm9wZXJ0eUJpbmRpbmdzIH0gPSB7fTtcblxuICBnZXRQcm9wZXJ0eUJpbmRpbmdzKHR5cGU6IFByb3BlcnR5QmluZGluZ1R5cGVzKTogUHJvcGVydHlCaW5kaW5ncyB7XG4gICAgdGhpcy5iaW5kaW5nc1t0eXBlXSA9IHRoaXMuYmluZGluZ3NbdHlwZV0gfHwgbmV3IFByb3BlcnR5QmluZGluZ3MoKTtcbiAgICByZXR1cm4gdGhpcy5iaW5kaW5nc1t0eXBlXTtcbiAgfVxuXG4gIGdldFByb3BlcnR5QmluZGluZ3NWaXNpYmlsaXR5KCkge1xuICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5QmluZGluZ3MoUHJvcGVydHlCaW5kaW5nVHlwZXMudmlzaWJpbGl0eSk7XG4gIH1cbn1cblxuLyoqXG4gKiBEZWZpbmVzIHRoZSB0eXBlcyBvZiBzdXBwb3J0ZWQgcHJvcGVydHkgYmluZGluZ3MuPGJyLz5cbiAqIEZvciBub3cgb25seSA8Y29kZT52aXNpYmlsaXR5PC9jb2RlPiBpcyBzdXBwb3J0ZWQuPGJyLz5cbiAqL1xuZXhwb3J0IGVudW0gUHJvcGVydHlCaW5kaW5nVHlwZXMge1xuICB2aXNpYmlsaXR5XG59XG5cbi8qKlxuICogU3RvcmFnZSB0aGF0IGhvbGRzIGFsbCBiaW5kaW5ncyB0aGF0IGFyZSBwcm9wZXJ0eSBwYXRocyByZWxhdGVkLjxici8+XG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eUJpbmRpbmdzIHtcbiAgc291cmNlc0luZGV4OiBTaW1wbGVQcm9wZXJ0eUluZGV4ZXIgPSBuZXcgU2ltcGxlUHJvcGVydHlJbmRleGVyKCk7XG4gIGRlcGVuZGVuY2llc0luZGV4OiBTaW1wbGVQcm9wZXJ0eUluZGV4ZXIgPSBuZXcgU2ltcGxlUHJvcGVydHlJbmRleGVyKCk7XG5cbiAgYWRkKGRlcGVuZGVuY3lQYXRoOiBzdHJpbmcsIHNvdXJjZVByb3BlcnR5UGF0aDogc3RyaW5nKSB7XG4gICAgdGhpcy5zb3VyY2VzSW5kZXguc3RvcmUoc291cmNlUHJvcGVydHlQYXRoLCBkZXBlbmRlbmN5UGF0aCk7XG4gICAgdGhpcy5kZXBlbmRlbmNpZXNJbmRleC5zdG9yZShkZXBlbmRlbmN5UGF0aCwgc291cmNlUHJvcGVydHlQYXRoKTtcbiAgfVxuXG4gIGZpbmRCeURlcGVuZGVuY3lQYXRoKGRlcGVuZGVuY3lQYXRoOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kZXBlbmRlbmNpZXNJbmRleC5maW5kKGRlcGVuZGVuY3lQYXRoKTtcbiAgICByZXN1bHQucmVzdWx0cyA9IHJlc3VsdC5yZXN1bHRzIHx8IFtdO1xuICAgIGxldCB2YWx1ZXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHJlcyBvZiByZXN1bHQucmVzdWx0cykge1xuICAgICAgdmFsdWVzID0gdmFsdWVzLmNvbmNhdChPYmplY3Qua2V5cyhyZXMudmFsdWUpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdC5mb3VuZCA/IHZhbHVlcyA6IFtdO1xuICB9XG5cbiAgZ2V0QnlTb3VyY2VQcm9wZXJ0eVBhdGgoc291cmNlUHJvcGVydHlQYXRoOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5zb3VyY2VzSW5kZXguZmluZChzb3VyY2VQcm9wZXJ0eVBhdGgpO1xuICAgIHJlc3VsdC5yZXN1bHRzID0gcmVzdWx0LnJlc3VsdHMgfHwgW107XG4gICAgbGV0IHZhbHVlcyA9IFtdO1xuICAgIGZvciAoY29uc3QgcmVzIG9mIHJlc3VsdC5yZXN1bHRzKSB7XG4gICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KE9iamVjdC5rZXlzKHJlcy52YWx1ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0LmZvdW5kID8gdmFsdWVzIDogW107XG4gIH1cblxuICBjcmVhdGVQYXRoSW5kZXgocGF0aDogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBwYXRoLnNwbGl0KCcvJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBTaW1wbGUgaW5kZXhlciB0byBzdG9yZSBwcm9wZXJ0eSBwYXRoc1xuICovXG5leHBvcnQgY2xhc3MgU2ltcGxlUHJvcGVydHlJbmRleGVyIHtcblxuICBzdGF0aWMgTUFSS0VSID0gJyRfX19fdmFsdWUnO1xuICBpbmRleDogb2JqZWN0ID0ge307XG4gIGZpbmRPbmx5V2l0aFZhbHVlID0gdHJ1ZTtcblxuICBwcml2YXRlIF9jcmVhdGVQYXRoSW5kZXgocGF0aDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHBhdGhcbiAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoJy8vJywgJ2cnKSwgJy8nKVxuICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCgnXi8nLCAnZycpLCAnJylcbiAgICAgIC5zcGxpdCgnLycpLmZpbHRlcihpdGVtID0+IGl0ZW0pO1xuICB9XG5cbiAgc3RvcmUocHJvcGVydHlQYXRoOiBzdHJpbmcsIHZhbHVlPzogYW55KSB7XG4gICAgdGhpcy5fc3RvcmVJbmRleCh0aGlzLl9jcmVhdGVQYXRoSW5kZXgocHJvcGVydHlQYXRoKSwgdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3RvcmVJbmRleChwYXRoSW5kZXg6IHN0cmluZ1tdLCB2YWx1ZT86IHN0cmluZykge1xuICAgIGxldCBpbmRleFBvcyA9IHRoaXMuaW5kZXg7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgcGF0aEluZGV4KSB7XG4gICAgICBpbmRleFBvc1trZXldID0gaW5kZXhQb3Nba2V5XSB8fCB7fTtcbiAgICAgIGluZGV4UG9zID0gaW5kZXhQb3Nba2V5XTtcbiAgICB9XG4gICAgaWYgKGluZGV4UG9zICYmIHZhbHVlKSB7XG4gICAgICBpbmRleFBvc1tTaW1wbGVQcm9wZXJ0eUluZGV4ZXIuTUFSS0VSXSA9IGluZGV4UG9zW1NpbXBsZVByb3BlcnR5SW5kZXhlci5NQVJLRVJdIHx8IHt9O1xuICAgICAgaW5kZXhQb3NbU2ltcGxlUHJvcGVydHlJbmRleGVyLk1BUktFUl1bdmFsdWVdID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgcGF0aCBpbiBpbmRleC48YnIvPlxuICAgKiBXaWxsIGZpbmQgcGF0aCBsaWtlOjxici8+XG4gICAqIDx1bD5cbiAgICogICAgIDxsaT4vcHJvcGVydHkvMC9wcm9wPC9saT5cbiAgICogICAgIDxsaT4vcHJvcGVydHkvMC9wcm9wLzIvdGVzdDwvbGk+XG4gICAqICAgICA8bGk+L3Byb3BlcnR5LzAvcHJvcC8mIzQyOy90ZXN0PC9saT5cbiAgICogICAgIDxsaT4vcHJvcGVydHkvJiM0MjsvcHJvcC8xL3Rlc3Q8L2xpPlxuICAgKiAgICAgPGxpPi9wcm9wZXJ0eS8mIzQyOy9wcm9wLyYjNDI7L3Rlc3Q8L2xpPlxuICAgKiAgICAgPGxpPi9wcm9wZXJ0eS8xL3Byb3AvJiM0MjsvdGVzdDwvbGk+XG4gICAqICA8L3VsPlxuICAgKiBAcGFyYW0gcGF0aFxuICAgKi9cbiAgZmluZChwYXRoOiBzdHJpbmcpOiBJbmRleGVyUmVzdWx0IHtcbiAgICByZXR1cm4gdGhpcy5fZmluZEluSW5kZXgodGhpcy5fY3JlYXRlUGF0aEluZGV4KHBhdGgpKTtcbiAgfVxuXG4gIF9maW5kSW5JbmRleChwYXRoOiBzdHJpbmdbXSk6IEluZGV4ZXJSZXN1bHQge1xuICAgIGNvbnN0IGl4UmVzOiBJbmRleGVyUmVzdWx0ID0ge3RhcmdldDogcGF0aCwgZm91bmQ6IGZhbHNlLCByZXN1bHRzOiBbXX07XG4gICAgdGhpcy5fX2ZpbmRJbmRleChpeFJlcywgcGF0aCwgdGhpcy5pbmRleCwgW10pO1xuICAgIHJldHVybiBpeFJlcztcbiAgfVxuXG4gIF9fZmluZEluZGV4KGluZGV4ZXJSZXN1bHRzOiBJbmRleGVyUmVzdWx0LCBwYXRoOiBzdHJpbmdbXSwgaW5kZXg6IG9iamVjdCwgcGFyZW50Pzogc3RyaW5nW10pIHtcblxuICAgIGNvbnN0IHAgPSBwYXJlbnQgfHwgW107XG4gICAgY29uc3Qgc2VnbWVudCA9IHBhdGhbMF07XG4gICAgY29uc3Qgd2lsZCA9ICgnKicgPT09IHNlZ21lbnQpID8gT2JqZWN0LmtleXMoaW5kZXgpIDogW107XG4gICAgY29uc3QgX2tleXMgPSAoKEFycmF5LmlzQXJyYXkoc2VnbWVudCkgPyBzZWdtZW50IDogW3NlZ21lbnRdKSBhcyBzdHJpbmdbXSkuY29uY2F0KHdpbGQpO1xuICAgIGNvbnN0IGtleXMgPSBfa2V5cy5maWx0ZXIoKGl0ZW0sIHBvcykgPT4gJyonICE9PSBpdGVtICYmIF9rZXlzLmluZGV4T2YoaXRlbSkgPT09IHBvcyk7IC8vIHJlbW92ZSBkdXBsaWNhdGVzXG5cbiAgICBpZiAoaW5kZXhbJyonXSkge1xuICAgICAga2V5cy5wdXNoKCcqJyk7XG4gICAgfVxuXG4gICAgbGV0IHBhdGhzID0gW107XG4gICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgY29uc3QgcmVzdFBhdGggPSBwYXRoLnNsaWNlKDEpO1xuICAgICAgY29uc3QgcmVzdEluZGV4ID0gaW5kZXhba2V5XTtcbiAgICAgIGNvbnN0IHJlc3RQYXJlbnQgPSBwLmNvbmNhdChrZXkpO1xuXG4gICAgICBpZiAocGF0aC5sZW5ndGggPT09IDEpIHsvLyBjb2xsZWN0IG9ubHkgdGhlIGZ1bGwgcGF0aHNcbiAgICAgICAgaWYgKCF0aGlzLmZpbmRPbmx5V2l0aFZhbHVlIHx8IChyZXN0SW5kZXggJiYgcmVzdEluZGV4W1NpbXBsZVByb3BlcnR5SW5kZXhlci5NQVJLRVJdKSkge1xuICAgICAgICAgIGluZGV4ZXJSZXN1bHRzLnJlc3VsdHMgPSBpbmRleGVyUmVzdWx0cy5yZXN1bHRzIHx8IFtdO1xuICAgICAgICAgIGluZGV4ZXJSZXN1bHRzLnJlc3VsdHMucHVzaCh7XG4gICAgICAgICAgICBwYXRoOiByZXN0UGFyZW50LFxuICAgICAgICAgICAgdmFsdWU6IHJlc3RJbmRleFtTaW1wbGVQcm9wZXJ0eUluZGV4ZXIuTUFSS0VSXVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHBhdGhzLnB1c2gocmVzdFBhcmVudCk7XG4gICAgICAgICAgaW5kZXhlclJlc3VsdHMuZm91bmQgPSBpbmRleGVyUmVzdWx0cy5yZXN1bHRzLmxlbmd0aCA+IDA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFyZXN0UGF0aCB8fCAhcmVzdFBhdGgubGVuZ3RoIHx8ICFyZXN0SW5kZXgpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb25zdCByZXN0UGF0aHMgPSB0aGlzLl9fZmluZEluZGV4KGluZGV4ZXJSZXN1bHRzLCByZXN0UGF0aCwgcmVzdEluZGV4LCByZXN0UGFyZW50KTtcblxuICAgICAgcGF0aHMgPSBwYXRocy5jb25jYXQocmVzdFBhdGhzKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhdGhzO1xuICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbmRleGVyUmVzdWx0IHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIG9yaWdpbmFsbHkgc2VhcmNoZWQgZm9yXG4gICAqL1xuICB0YXJnZXQ6IHN0cmluZ1tdO1xuICAvKipcbiAgICogRmxhZyBmb3IgdGhlIHN0YXR1cyBvZiBmb3VuZCBvciBub3QgZm91bmQuPGJyLz5cbiAgICogVXN1YWxseSA8Y29kZT5yZXN1bHRzPC9jb2RlPiB3aWxsIGJlIGVtcHR5IGlmIG5vIG1hdGNoZXMgZm91bmQuXG4gICAqL1xuICBmb3VuZDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFRoZSByZXN1bHQgcGF0aCBhbmQgdmFsdWVzIGZyb20gdGhlIGluZGV4IHNlYXJjaC48YnIvPlxuICAgKiBVc3VhbGx5IDxjb2RlPnJlc3VsdHM8L2NvZGU+IHdpbGwgYmUgZW1wdHkgaWYgbm8gbWF0Y2hlcyBmb3VuZC5cbiAgICovXG4gIHJlc3VsdHM6IHtcbiAgICAvKipcbiAgICAgKiBUaGUgcGF0aCB0aGF0IG1hdGNoZWQgdGhlIDxjb2RlPnRhcmdldDwvY29kZT5cbiAgICAgKiBzZXBhcmF0ZWQgaW4gc2VnbWVudHNcbiAgICAgKi9cbiAgICBwYXRoOiBzdHJpbmdbXSxcbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgc3RvcmVkIGF0IHRoZSA8Y29kZT5wYXRoPC9jb2RlPlxuICAgICAqL1xuICAgIHZhbHVlOiBhbnlcbiAgfVtdO1xufVxuIiwiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgT25DaGFuZ2VzLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7QWN0aW9ufSBmcm9tICcuL21vZGVsL2FjdGlvbic7XG5pbXBvcnQge0FjdGlvblJlZ2lzdHJ5fSBmcm9tICcuL21vZGVsL2FjdGlvbnJlZ2lzdHJ5JztcbmltcG9ydCB7Rm9ybVByb3BlcnR5fSBmcm9tICcuL21vZGVsL2Zvcm1wcm9wZXJ0eSc7XG5pbXBvcnQge0Zvcm1Qcm9wZXJ0eUZhY3Rvcnl9IGZyb20gJy4vbW9kZWwvZm9ybXByb3BlcnR5ZmFjdG9yeSc7XG5pbXBvcnQge1NjaGVtYVByZXByb2Nlc3Nvcn0gZnJvbSAnLi9tb2RlbC9zY2hlbWFwcmVwcm9jZXNzb3InO1xuaW1wb3J0IHtWYWxpZGF0b3JSZWdpc3RyeX0gZnJvbSAnLi9tb2RlbC92YWxpZGF0b3JyZWdpc3RyeSc7XG5pbXBvcnQge1ZhbGlkYXRvcn0gZnJvbSAnLi9tb2RlbC92YWxpZGF0b3InO1xuaW1wb3J0IHtCaW5kaW5nfSBmcm9tICcuL21vZGVsL2JpbmRpbmcnO1xuaW1wb3J0IHtCaW5kaW5nUmVnaXN0cnl9IGZyb20gJy4vbW9kZWwvYmluZGluZ3JlZ2lzdHJ5JztcblxuaW1wb3J0IHtTY2hlbWFWYWxpZGF0b3JGYWN0b3J5fSBmcm9tICcuL3NjaGVtYXZhbGlkYXRvcmZhY3RvcnknO1xuaW1wb3J0IHtXaWRnZXRGYWN0b3J5fSBmcm9tICcuL3dpZGdldGZhY3RvcnknO1xuaW1wb3J0IHtUZXJtaW5hdG9yU2VydmljZX0gZnJvbSAnLi90ZXJtaW5hdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHtQcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeX0gZnJvbSAnLi9wcm9wZXJ0eS1iaW5kaW5nLXJlZ2lzdHJ5JztcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZhY3Rvcnkoc2NoZW1hVmFsaWRhdG9yRmFjdG9yeSwgdmFsaWRhdG9yUmVnaXN0cnksIHByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5KSB7XG4gIHJldHVybiBuZXcgRm9ybVByb3BlcnR5RmFjdG9yeShzY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCB2YWxpZGF0b3JSZWdpc3RyeSwgcHJvcGVydHlCaW5kaW5nUmVnaXN0cnkpO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1mb3JtJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8Zm9ybT5cbiAgICAgIDxzZi1mb3JtLWVsZW1lbnRcbiAgICAgICAgKm5nSWY9XCJyb290UHJvcGVydHlcIiBbZm9ybVByb3BlcnR5XT1cInJvb3RQcm9wZXJ0eVwiPjwvc2YtZm9ybS1lbGVtZW50PlxuICAgIDwvZm9ybT5gLFxuICBwcm92aWRlcnM6IFtcbiAgICBBY3Rpb25SZWdpc3RyeSxcbiAgICBWYWxpZGF0b3JSZWdpc3RyeSxcbiAgICBQcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeSxcbiAgICBCaW5kaW5nUmVnaXN0cnksXG4gICAgU2NoZW1hUHJlcHJvY2Vzc29yLFxuICAgIFdpZGdldEZhY3RvcnksXG4gICAge1xuICAgICAgcHJvdmlkZTogRm9ybVByb3BlcnR5RmFjdG9yeSxcbiAgICAgIHVzZUZhY3Rvcnk6IHVzZUZhY3RvcnksXG4gICAgICBkZXBzOiBbU2NoZW1hVmFsaWRhdG9yRmFjdG9yeSwgVmFsaWRhdG9yUmVnaXN0cnksIFByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5XVxuICAgIH0sXG4gICAgVGVybWluYXRvclNlcnZpY2UsXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogRm9ybUNvbXBvbmVudCxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBASW5wdXQoKSBzY2hlbWE6IGFueSA9IG51bGw7XG5cbiAgQElucHV0KCkgbW9kZWw6IGFueTtcblxuICBASW5wdXQoKSBhY3Rpb25zOiB7IFthY3Rpb25JZDogc3RyaW5nXTogQWN0aW9uIH0gPSB7fTtcblxuICBASW5wdXQoKSB2YWxpZGF0b3JzOiB7IFtwYXRoOiBzdHJpbmddOiBWYWxpZGF0b3IgfSA9IHt9O1xuXG4gIEBJbnB1dCgpIGJpbmRpbmdzOiB7IFtwYXRoOiBzdHJpbmddOiBCaW5kaW5nIH0gPSB7fTtcblxuICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHsgdmFsdWU6IGFueSB9PigpO1xuXG4gIEBPdXRwdXQoKSBtb2RlbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBpc1ZhbGlkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIEBPdXRwdXQoKSBvbkVycm9yQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7IHZhbHVlOiBhbnlbXSB9PigpO1xuXG4gIEBPdXRwdXQoKSBvbkVycm9yc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8e3ZhbHVlOiBhbnl9PigpO1xuXG4gIHJvb3RQcm9wZXJ0eTogRm9ybVByb3BlcnR5ID0gbnVsbDtcblxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZvcm1Qcm9wZXJ0eUZhY3Rvcnk6IEZvcm1Qcm9wZXJ0eUZhY3RvcnksXG4gICAgcHJpdmF0ZSBhY3Rpb25SZWdpc3RyeTogQWN0aW9uUmVnaXN0cnksXG4gICAgcHJpdmF0ZSB2YWxpZGF0b3JSZWdpc3RyeTogVmFsaWRhdG9yUmVnaXN0cnksXG4gICAgcHJpdmF0ZSBiaW5kaW5nUmVnaXN0cnk6IEJpbmRpbmdSZWdpc3RyeSxcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSB0ZXJtaW5hdG9yOiBUZXJtaW5hdG9yU2VydmljZVxuICApIHsgfVxuXG4gIHdyaXRlVmFsdWUob2JqOiBhbnkpIHtcbiAgICBpZiAodGhpcy5yb290UHJvcGVydHkpIHtcbiAgICAgIHRoaXMucm9vdFByb3BlcnR5LnJlc2V0KG9iaiwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICAgIGlmICh0aGlzLnJvb3RQcm9wZXJ0eSkge1xuICAgICAgdGhpcy5yb290UHJvcGVydHkudmFsdWVDaGFuZ2VzLnN1YnNjcmliZShcbiAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlcy5iaW5kKHRoaXMpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE8gaW1wbGVtZW50XG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgfVxuXG4gIC8vIFRPRE8gaW1wbGVtZW50XG4gIC8vIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik/OiB2b2lkXG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMuc2V0VmFsaWRhdG9ycygpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLmFjdGlvbnMpIHtcbiAgICAgIHRoaXMuc2V0QWN0aW9ucygpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLmJpbmRpbmdzKSB7XG4gICAgICB0aGlzLnNldEJpbmRpbmdzKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2NoZW1hICYmICF0aGlzLnNjaGVtYS50eXBlKSB7XG4gICAgICB0aGlzLnNjaGVtYS50eXBlID0gJ29iamVjdCc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2NoZW1hICYmIGNoYW5nZXMuc2NoZW1hKSB7XG4gICAgICBpZiAoIWNoYW5nZXMuc2NoZW1hLmZpcnN0Q2hhbmdlKSB7XG4gICAgICAgIHRoaXMudGVybWluYXRvci5kZXN0cm95KCk7XG4gICAgICB9XG5cbiAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5wcmVwcm9jZXNzKHRoaXMuc2NoZW1hKTtcbiAgICAgIHRoaXMucm9vdFByb3BlcnR5ID0gdGhpcy5mb3JtUHJvcGVydHlGYWN0b3J5LmNyZWF0ZVByb3BlcnR5KHRoaXMuc2NoZW1hKTtcbiAgICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICAgIC8vIHRoaXMucm9vdFByb3BlcnR5LnJlc2V0KHRoaXMubW9kZWwsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yb290UHJvcGVydHkudmFsdWVDaGFuZ2VzLnN1YnNjcmliZShcbiAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlcy5iaW5kKHRoaXMpXG4gICAgICApO1xuXG4gICAgICB0aGlzLnJvb3RQcm9wZXJ0eS5lcnJvcnNDaGFuZ2VzLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgIHRoaXMub25FcnJvckNoYW5nZS5lbWl0KHt2YWx1ZTogdmFsdWV9KTtcbiAgICAgICAgdGhpcy5pc1ZhbGlkLmVtaXQoISh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGgpKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2NoZW1hICYmIChjaGFuZ2VzLm1vZGVsIHx8IGNoYW5nZXMuc2NoZW1hICkpIHtcbiAgICAgIHRoaXMucm9vdFByb3BlcnR5LnJlc2V0KHRoaXMubW9kZWwsIGZhbHNlKTtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgc2V0VmFsaWRhdG9ycygpIHtcbiAgICB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LmNsZWFyKCk7XG4gICAgaWYgKHRoaXMudmFsaWRhdG9ycykge1xuICAgICAgZm9yIChjb25zdCB2YWxpZGF0b3JJZCBpbiB0aGlzLnZhbGlkYXRvcnMpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdG9ycy5oYXNPd25Qcm9wZXJ0eSh2YWxpZGF0b3JJZCkpIHtcbiAgICAgICAgICB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LnJlZ2lzdGVyKHZhbGlkYXRvcklkLCB0aGlzLnZhbGlkYXRvcnNbdmFsaWRhdG9ySWRdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0QWN0aW9ucygpIHtcbiAgICB0aGlzLmFjdGlvblJlZ2lzdHJ5LmNsZWFyKCk7XG4gICAgaWYgKHRoaXMuYWN0aW9ucykge1xuICAgICAgZm9yIChjb25zdCBhY3Rpb25JZCBpbiB0aGlzLmFjdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aW9ucy5oYXNPd25Qcm9wZXJ0eShhY3Rpb25JZCkpIHtcbiAgICAgICAgICB0aGlzLmFjdGlvblJlZ2lzdHJ5LnJlZ2lzdGVyKGFjdGlvbklkLCB0aGlzLmFjdGlvbnNbYWN0aW9uSWRdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0QmluZGluZ3MoKSB7XG4gICAgdGhpcy5iaW5kaW5nUmVnaXN0cnkuY2xlYXIoKTtcbiAgICBpZiAodGhpcy5iaW5kaW5ncykge1xuICAgICAgZm9yIChjb25zdCBiaW5kaW5nUGF0aCBpbiB0aGlzLmJpbmRpbmdzKSB7XG4gICAgICAgIGlmICh0aGlzLmJpbmRpbmdzLmhhc093blByb3BlcnR5KGJpbmRpbmdQYXRoKSkge1xuICAgICAgICAgIHRoaXMuYmluZGluZ1JlZ2lzdHJ5LnJlZ2lzdGVyKGJpbmRpbmdQYXRoLCB0aGlzLmJpbmRpbmdzW2JpbmRpbmdQYXRoXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgdGhpcy5yb290UHJvcGVydHkucmVzZXQobnVsbCwgdHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIHNldE1vZGVsKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm1vZGVsLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kZWwgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uVmFsdWVDaGFuZ2VzKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMub25DaGFuZ2VDYWxsYmFjaykge1xuICAgICAgdGhpcy5zZXRNb2RlbCh2YWx1ZSk7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICAgIH1cblxuICAgIC8vIHR3byB3YXkgYmluZGluZyBpcyB1c2VkXG4gICAgaWYgKHRoaXMubW9kZWxDaGFuZ2Uub2JzZXJ2ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICghdGhpcy5vbkNoYW5nZUNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuc2V0TW9kZWwodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe3ZhbHVlOiB2YWx1ZX0pO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsIEVsZW1lbnRSZWYsXG4gIElucHV0LCBPbkRlc3Ryb3ksXG4gIE9uSW5pdCwgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBGb3JtQ29udHJvbFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7V2lkZ2V0fSBmcm9tICcuL3dpZGdldCc7XG5cbmltcG9ydCB7QWN0aW9uUmVnaXN0cnl9IGZyb20gJy4vbW9kZWwvYWN0aW9ucmVnaXN0cnknO1xuaW1wb3J0IHtGb3JtUHJvcGVydHl9IGZyb20gJy4vbW9kZWwvZm9ybXByb3BlcnR5JztcbmltcG9ydCB7QmluZGluZ1JlZ2lzdHJ5fSBmcm9tICcuL21vZGVsL2JpbmRpbmdyZWdpc3RyeSc7XG5pbXBvcnQge0JpbmRpbmd9IGZyb20gJy4vbW9kZWwvYmluZGluZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWZvcm0tZWxlbWVudCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAqbmdJZj1cImZvcm1Qcm9wZXJ0eS52aXNpYmxlXCJcbiAgICAgICAgIFtjbGFzcy5oYXMtZXJyb3JdPVwiIWNvbnRyb2wudmFsaWRcIlxuICAgICAgICAgW2NsYXNzLmhhcy1zdWNjZXNzXT1cImNvbnRyb2wudmFsaWRcIj5cbiAgICAgIDxzZi13aWRnZXQtY2hvb3NlclxuICAgICAgICAod2lkZ2V0SW5zdGFuY2lhdGVkKT1cIm9uV2lkZ2V0SW5zdGFuY2lhdGVkKCRldmVudClcIlxuICAgICAgICBbd2lkZ2V0SW5mb109XCJmb3JtUHJvcGVydHkuc2NoZW1hLndpZGdldFwiPlxuICAgICAgPC9zZi13aWRnZXQtY2hvb3Nlcj5cbiAgICAgIDxzZi1mb3JtLWVsZW1lbnQtYWN0aW9uICpuZ0Zvcj1cImxldCBidXR0b24gb2YgYnV0dG9uc1wiIFtidXR0b25dPVwiYnV0dG9uXCIgW2Zvcm1Qcm9wZXJ0eV09XCJmb3JtUHJvcGVydHlcIj48L3NmLWZvcm0tZWxlbWVudC1hY3Rpb24+XG4gICAgPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtRWxlbWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBwcml2YXRlIHN0YXRpYyBjb3VudGVyID0gMDtcblxuICBASW5wdXQoKSBmb3JtUHJvcGVydHk6IEZvcm1Qcm9wZXJ0eTtcbiAgY29udHJvbDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycsICgpID0+IG51bGwpO1xuXG4gIHdpZGdldDogV2lkZ2V0PGFueT4gPSBudWxsO1xuXG4gIGJ1dHRvbnMgPSBbXTtcblxuICB1bmxpc3RlbiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYWN0aW9uUmVnaXN0cnk6IEFjdGlvblJlZ2lzdHJ5LFxuICAgICAgICAgICAgICBwcml2YXRlIGJpbmRpbmdSZWdpc3RyeTogQmluZGluZ1JlZ2lzdHJ5LFxuICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5wYXJzZUJ1dHRvbnMoKTtcbiAgICB0aGlzLnNldHVwQmluZGluZ3MoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBCaW5kaW5ncygpIHtcbiAgICBjb25zdCBiaW5kaW5nczogQmluZGluZ1tdID0gdGhpcy5iaW5kaW5nUmVnaXN0cnkuZ2V0KHRoaXMuZm9ybVByb3BlcnR5LnBhdGgpO1xuICAgIGlmICgoYmluZGluZ3MgfHwgW10pLmxlbmd0aCkge1xuICAgICAgYmluZGluZ3MuZm9yRWFjaCgoYmluZGluZykgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGV2ZW50SWQgaW4gYmluZGluZykge1xuICAgICAgICAgIHRoaXMuY3JlYXRlQmluZGluZyhldmVudElkLCBiaW5kaW5nW2V2ZW50SWRdKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVCaW5kaW5nKGV2ZW50SWQsIGxpc3RlbmVyKSB7XG4gICAgdGhpcy51bmxpc3Rlbi5wdXNoKHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgZXZlbnRJZCxcbiAgICAgIChldmVudCkgPT4ge1xuICAgICAgICBpZiAobGlzdGVuZXIgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgIGxpc3RlbmVyKGV2ZW50LCB0aGlzLmZvcm1Qcm9wZXJ0eSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdDYWxsaW5nIG5vbiBmdW5jdGlvbiBoYW5kbGVyIGZvciBldmVudElkICcgKyBldmVudElkICsgJyBmb3IgcGF0aCAnICsgdGhpcy5mb3JtUHJvcGVydHkucGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VCdXR0b25zKCkge1xuICAgIGlmICh0aGlzLmZvcm1Qcm9wZXJ0eS5zY2hlbWEuYnV0dG9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmJ1dHRvbnMgPSB0aGlzLmZvcm1Qcm9wZXJ0eS5zY2hlbWEuYnV0dG9ucztcblxuICAgICAgZm9yIChsZXQgYnV0dG9uIG9mIHRoaXMuYnV0dG9ucykge1xuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbkNhbGxiYWNrKGJ1dHRvbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVCdXR0b25DYWxsYmFjayhidXR0b24pIHtcbiAgICBidXR0b24uYWN0aW9uID0gKGUpID0+IHtcbiAgICAgIGxldCBhY3Rpb247XG4gICAgICBpZiAoYnV0dG9uLmlkICYmIChhY3Rpb24gPSB0aGlzLmFjdGlvblJlZ2lzdHJ5LmdldChidXR0b24uaWQpKSkge1xuICAgICAgICBpZiAoYWN0aW9uKSB7XG4gICAgICAgICAgYWN0aW9uKHRoaXMuZm9ybVByb3BlcnR5LCBidXR0b24ucGFyYW1ldGVycyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9O1xuICB9XG5cbiAgb25XaWRnZXRJbnN0YW5jaWF0ZWQod2lkZ2V0OiBXaWRnZXQ8YW55Pikge1xuICAgIHRoaXMud2lkZ2V0ID0gd2lkZ2V0O1xuICAgIGxldCBpZCA9ICdmaWVsZCcgKyAoRm9ybUVsZW1lbnRDb21wb25lbnQuY291bnRlcisrKTtcblxuICAgIHRoaXMud2lkZ2V0LmZvcm1Qcm9wZXJ0eSA9IHRoaXMuZm9ybVByb3BlcnR5O1xuICAgIHRoaXMud2lkZ2V0LnNjaGVtYSA9IHRoaXMuZm9ybVByb3BlcnR5LnNjaGVtYTtcbiAgICB0aGlzLndpZGdldC5uYW1lID0gaWQ7XG4gICAgdGhpcy53aWRnZXQuaWQgPSBpZDtcbiAgICB0aGlzLndpZGdldC5jb250cm9sID0gdGhpcy5jb250cm9sO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudW5saXN0ZW4pIHtcbiAgICAgIHRoaXMudW5saXN0ZW4uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3lcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7V2lkZ2V0RmFjdG9yeX0gZnJvbSBcIi4vd2lkZ2V0ZmFjdG9yeVwiO1xuaW1wb3J0IHtUZXJtaW5hdG9yU2VydmljZX0gZnJvbSBcIi4vdGVybWluYXRvci5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWZvcm0tZWxlbWVudC1hY3Rpb24nLFxuICB0ZW1wbGF0ZTogJzxuZy10ZW1wbGF0ZSAjdGFyZ2V0PjwvbmctdGVtcGxhdGU+J1xufSlcbmV4cG9ydCBjbGFzcyBGb3JtRWxlbWVudENvbXBvbmVudEFjdGlvbiBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpXG4gIGJ1dHRvbjogYW55O1xuXG4gIEBJbnB1dCgpXG4gIGZvcm1Qcm9wZXJ0eTogYW55O1xuXG4gIEBWaWV3Q2hpbGQoJ3RhcmdldCcsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIHByaXZhdGUgcmVmOiBDb21wb25lbnRSZWY8YW55PjtcbiAgcHJpdmF0ZSBzdWJzOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3aWRnZXRGYWN0b3J5OiBXaWRnZXRGYWN0b3J5ID0gbnVsbCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSB0ZXJtaW5hdG9yOiBUZXJtaW5hdG9yU2VydmljZSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJzID0gdGhpcy50ZXJtaW5hdG9yLm9uRGVzdHJveS5zdWJzY3JpYmUoZGVzdHJveSA9PiB7XG4gICAgICBpZiAoZGVzdHJveSkge1xuICAgICAgICB0aGlzLnJlZi5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLnJlZiA9IHRoaXMud2lkZ2V0RmFjdG9yeS5jcmVhdGVXaWRnZXQodGhpcy5jb250YWluZXIsIHRoaXMuYnV0dG9uLndpZGdldCB8fCAnYnV0dG9uJyk7XG4gICAgdGhpcy5yZWYuaW5zdGFuY2UuYnV0dG9uID0gdGhpcy5idXR0b247XG4gICAgdGhpcy5yZWYuaW5zdGFuY2UuZm9ybVByb3BlcnR5ID0gdGhpcy5mb3JtUHJvcGVydHk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnMudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRSZWYsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRlcm1pbmF0b3JTZXJ2aWNlIH0gZnJvbSAnLi90ZXJtaW5hdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2lkZ2V0RmFjdG9yeSB9IGZyb20gJy4vd2lkZ2V0ZmFjdG9yeSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi13aWRnZXQtY2hvb3NlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiAjdGFyZ2V0PjwvZGl2PmAsXG59KVxuZXhwb3J0IGNsYXNzIFdpZGdldENob29zZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSB3aWRnZXRJbmZvOiBhbnk7XG5cbiAgQE91dHB1dCgpIHdpZGdldEluc3RhbmNpYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBWaWV3Q2hpbGQoJ3RhcmdldCcsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIHByaXZhdGUgd2lkZ2V0SW5zdGFuY2U6IGFueTtcbiAgcHJpdmF0ZSByZWY6IENvbXBvbmVudFJlZjxhbnk+O1xuICBwcml2YXRlIHN1YnM6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHdpZGdldEZhY3Rvcnk6IFdpZGdldEZhY3RvcnkgPSBudWxsLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHRlcm1pbmF0b3I6IFRlcm1pbmF0b3JTZXJ2aWNlLFxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3VicyA9IHRoaXMudGVybWluYXRvci5vbkRlc3Ryb3kuc3Vic2NyaWJlKGRlc3Ryb3kgPT4ge1xuICAgICAgaWYgKGRlc3Ryb3kpIHtcbiAgICAgICAgdGhpcy5yZWYuZGVzdHJveSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5yZWYgPSB0aGlzLndpZGdldEZhY3RvcnkuY3JlYXRlV2lkZ2V0KHRoaXMuY29udGFpbmVyLCB0aGlzLndpZGdldEluZm8uaWQpO1xuICAgIHRoaXMud2lkZ2V0SW5zdGFuY2lhdGVkLmVtaXQodGhpcy5yZWYuaW5zdGFuY2UpO1xuICAgIHRoaXMud2lkZ2V0SW5zdGFuY2UgPSB0aGlzLnJlZi5pbnN0YW5jZTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnMudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtBZnRlclZpZXdJbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUNvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtBcnJheVByb3BlcnR5fSBmcm9tICcuL21vZGVsL2FycmF5cHJvcGVydHknO1xuaW1wb3J0IHtGb3JtUHJvcGVydHl9IGZyb20gJy4vbW9kZWwvZm9ybXByb3BlcnR5JztcbmltcG9ydCB7T2JqZWN0UHJvcGVydHl9IGZyb20gJy4vbW9kZWwvb2JqZWN0cHJvcGVydHknO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgV2lkZ2V0PFQgZXh0ZW5kcyBGb3JtUHJvcGVydHk+IHtcbiAgZm9ybVByb3BlcnR5OiBUO1xuICBjb250cm9sOiBGb3JtQ29udHJvbDtcbiAgZXJyb3JNZXNzYWdlczogc3RyaW5nW107XG5cbiAgaWQ6IHN0cmluZyA9ICcnO1xuICBuYW1lOiBzdHJpbmcgPSAnJztcbiAgc2NoZW1hOiBhbnkgPSB7fTtcbn1cblxuZXhwb3J0IGNsYXNzIENvbnRyb2xXaWRnZXQgZXh0ZW5kcyBXaWRnZXQ8Rm9ybVByb3BlcnR5PiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5jb250cm9sO1xuICAgIHRoaXMuZm9ybVByb3BlcnR5LnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XG4gICAgICBpZiAoY29udHJvbC52YWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgY29udHJvbC5zZXRWYWx1ZShuZXdWYWx1ZSwge2VtaXRFdmVudDogZmFsc2V9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmZvcm1Qcm9wZXJ0eS5lcnJvcnNDaGFuZ2VzLnN1YnNjcmliZSgoZXJyb3JzKSA9PiB7XG4gICAgICBjb250cm9sLnNldEVycm9ycyhlcnJvcnMsIHsgZW1pdEV2ZW50OiB0cnVlIH0pO1xuICAgICAgY29uc3QgbWVzc2FnZXMgPSAoZXJyb3JzIHx8IFtdKVxuICAgICAgICAuZmlsdGVyKGUgPT4ge1xuICAgICAgICAgIHJldHVybiBlLnBhdGggJiYgZS5wYXRoLnNsaWNlKDEpID09PSB0aGlzLmZvcm1Qcm9wZXJ0eS5wYXRoO1xuICAgICAgICB9KVxuICAgICAgICAubWFwKGUgPT4gZS5tZXNzYWdlKTtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IG1lc3NhZ2VzLmZpbHRlcigobSwgaSkgPT4gbWVzc2FnZXMuaW5kZXhPZihtKSA9PT0gaSk7XG4gICAgfSk7XG4gICAgY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xuICAgICAgdGhpcy5mb3JtUHJvcGVydHkuc2V0VmFsdWUobmV3VmFsdWUsIGZhbHNlKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBBcnJheUxheW91dFdpZGdldCBleHRlbmRzIFdpZGdldDxBcnJheVByb3BlcnR5PiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5jb250cm9sO1xuICAgIHRoaXMuZm9ybVByb3BlcnR5LmVycm9yc0NoYW5nZXMuc3Vic2NyaWJlKChlcnJvcnMpID0+IHtcbiAgICAgIGNvbnRyb2wuc2V0RXJyb3JzKGVycm9ycywge2VtaXRFdmVudDogdHJ1ZX0pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RMYXlvdXRXaWRnZXQgZXh0ZW5kcyBXaWRnZXQ8T2JqZWN0UHJvcGVydHk+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmNvbnRyb2w7XG4gICAgdGhpcy5mb3JtUHJvcGVydHkuZXJyb3JzQ2hhbmdlcy5zdWJzY3JpYmUoKGVycm9ycykgPT4ge1xuICAgICAgY29udHJvbC5zZXRFcnJvcnMoZXJyb3JzLCB7ZW1pdEV2ZW50OiB0cnVlfSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBcnJheUxheW91dFdpZGdldCB9IGZyb20gJy4uLy4uL3dpZGdldCc7XG5pbXBvcnQgeyBGb3JtUHJvcGVydHkgfSBmcm9tICcuLi8uLi9tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWFycmF5LXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIndpZGdldCBmb3JtLWdyb3VwXCI+XG5cdDxsYWJlbCBbYXR0ci5mb3JdPVwiaWRcIiBjbGFzcz1cImhvcml6b250YWwgY29udHJvbC1sYWJlbFwiPlxuXHRcdHt7IHNjaGVtYS50aXRsZSB9fVxuXHQ8L2xhYmVsPlxuXHQ8c3BhbiAqbmdJZj1cInNjaGVtYS5kZXNjcmlwdGlvblwiIGNsYXNzPVwiZm9ybUhlbHBcIj57e3NjaGVtYS5kZXNjcmlwdGlvbn19PC9zcGFuPlxuXHQ8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtUHJvcGVydHkgb2YgZm9ybVByb3BlcnR5LnByb3BlcnRpZXNcIj5cblx0XHQ8c2YtZm9ybS1lbGVtZW50IFtmb3JtUHJvcGVydHldPVwiaXRlbVByb3BlcnR5XCI+PC9zZi1mb3JtLWVsZW1lbnQ+XG5cdFx0PGJ1dHRvbiAoY2xpY2spPVwicmVtb3ZlSXRlbShpdGVtUHJvcGVydHkpXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYXJyYXktcmVtb3ZlLWJ1dHRvblwiPlxuXHRcdFx0PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLW1pbnVzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPiBSZW1vdmVcblx0XHQ8L2J1dHRvbj5cblx0PC9kaXY+XG5cdDxidXR0b24gKGNsaWNrKT1cImFkZEl0ZW0oKVwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGFycmF5LWFkZC1idXR0b25cIj5cblx0XHQ8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcGx1c1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4gQWRkXG5cdDwvYnV0dG9uPlxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBBcnJheVdpZGdldCBleHRlbmRzIEFycmF5TGF5b3V0V2lkZ2V0IHtcblxuICBhZGRJdGVtKCkge1xuICAgIHRoaXMuZm9ybVByb3BlcnR5LmFkZEl0ZW0oKTtcbiAgfVxuXG4gIHJlbW92ZUl0ZW0oaXRlbTogRm9ybVByb3BlcnR5KSB7XG4gICAgdGhpcy5mb3JtUHJvcGVydHkucmVtb3ZlSXRlbShpdGVtKTtcbiAgfVxuXG4gIHRyYWNrQnlJbmRleChpbmRleDogbnVtYmVyLCBpdGVtOiBhbnkpIHtcbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cbn1cbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1idXR0b24td2lkZ2V0JyxcbiAgdGVtcGxhdGU6ICc8YnV0dG9uIChjbGljayk9XCJidXR0b24uYWN0aW9uKCRldmVudClcIj57e2J1dHRvbi5sYWJlbH19PC9idXR0b24+J1xufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25XaWRnZXQge1xuICBwdWJsaWMgYnV0dG9uXG4gIHB1YmxpYyBmb3JtUHJvcGVydHlcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBPYmplY3RMYXlvdXRXaWRnZXQgfSBmcm9tICcuLi8uLi93aWRnZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1mb3JtLW9iamVjdCcsXG4gIHRlbXBsYXRlOiBgPGZpZWxkc2V0ICpuZ0Zvcj1cImxldCBmaWVsZHNldCBvZiBmb3JtUHJvcGVydHkuc2NoZW1hLmZpZWxkc2V0c1wiPlxuXHQ8bGVnZW5kICpuZ0lmPVwiZmllbGRzZXQudGl0bGVcIj57e2ZpZWxkc2V0LnRpdGxlfX08L2xlZ2VuZD5cblx0PGRpdiAqbmdJZj1cImZpZWxkc2V0LmRlc2NyaXB0aW9uXCI+e3tmaWVsZHNldC5kZXNjcmlwdGlvbn19PC9kaXY+XG5cdDxkaXYgKm5nRm9yPVwibGV0IGZpZWxkSWQgb2YgZmllbGRzZXQuZmllbGRzXCI+XG5cdFx0PHNmLWZvcm0tZWxlbWVudCBbZm9ybVByb3BlcnR5XT1cImZvcm1Qcm9wZXJ0eS5nZXRQcm9wZXJ0eShmaWVsZElkKVwiPjwvc2YtZm9ybS1lbGVtZW50PlxuXHQ8L2Rpdj5cbjwvZmllbGRzZXQ+YFxufSlcbmV4cG9ydCBjbGFzcyBPYmplY3RXaWRnZXQgZXh0ZW5kcyBPYmplY3RMYXlvdXRXaWRnZXQgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29udHJvbFdpZGdldCB9IGZyb20gJy4uLy4uL3dpZGdldCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWNoZWNrYm94LXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIndpZGdldCBmb3JtLWdyb3VwXCI+XG4gICAgPGxhYmVsIFthdHRyLmZvcl09XCJpZFwiIGNsYXNzPVwiaG9yaXpvbnRhbCBjb250cm9sLWxhYmVsXCI+XG4gICAgICAgIHt7IHNjaGVtYS50aXRsZSB9fVxuICAgIDwvbGFiZWw+XG5cdDxkaXYgKm5nSWY9XCJzY2hlbWEudHlwZSE9J2FycmF5J1wiIGNsYXNzPVwiY2hlY2tib3hcIj5cblx0XHQ8bGFiZWwgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cblx0XHRcdDxpbnB1dCBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiIFthdHRyLm5hbWVdPVwibmFtZVwiIFtpbmRldGVybWluYXRlXT1cImNvbnRyb2wudmFsdWUgIT09IGZhbHNlICYmIGNvbnRyb2wudmFsdWUgIT09IHRydWUgPyB0cnVlIDpudWxsXCIgdHlwZT1cImNoZWNrYm94XCIgW2Rpc2FibGVkXT1cInNjaGVtYS5yZWFkT25seVwiPlxuXHRcdFx0PGlucHV0ICpuZ0lmPVwic2NoZW1hLnJlYWRPbmx5XCIgW2F0dHIubmFtZV09XCJuYW1lXCIgdHlwZT1cImhpZGRlblwiIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCI+XG5cdFx0XHR7e3NjaGVtYS5kZXNjcmlwdGlvbn19XG5cdFx0PC9sYWJlbD5cblx0PC9kaXY+XG5cdDxuZy1jb250YWluZXIgKm5nSWY9XCJzY2hlbWEudHlwZT09PSdhcnJheSdcIj5cblx0XHQ8ZGl2ICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygc2NoZW1hLml0ZW1zLm9uZU9mXCIgY2xhc3M9XCJjaGVja2JveFwiPlxuXHRcdFx0PGxhYmVsIGNsYXNzPVwiaG9yaXpvbnRhbCBjb250cm9sLWxhYmVsXCI+XG5cdFx0XHRcdDxpbnB1dCBbYXR0ci5uYW1lXT1cIm5hbWVcIlxuXHRcdFx0XHRcdHZhbHVlPVwie3tvcHRpb24uZW51bVswXX19XCIgdHlwZT1cImNoZWNrYm94XCIgXG5cdFx0XHRcdFx0W2F0dHIuZGlzYWJsZWRdPVwic2NoZW1hLnJlYWRPbmx5XCJcblx0XHRcdFx0XHQoY2hhbmdlKT1cIm9uQ2hlY2soJGV2ZW50LnRhcmdldClcIlxuXHRcdFx0XHRcdFthdHRyLmNoZWNrZWRdPVwiY2hlY2tlZFtvcHRpb24uZW51bVswXV0gPyB0cnVlIDogbnVsbFwiPlxuXHRcdFx0XHR7e29wdGlvbi5kZXNjcmlwdGlvbn19XG5cdFx0XHQ8L2xhYmVsPlxuXHRcdDwvZGl2PlxuXHQ8L25nLWNvbnRhaW5lcj5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hXaWRnZXQgZXh0ZW5kcyBDb250cm9sV2lkZ2V0IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cblx0Y2hlY2tlZDogYW55ID0ge307XG5cblx0bmdBZnRlclZpZXdJbml0KCkge1xuXHRcdGNvbnN0IGNvbnRyb2wgPSB0aGlzLmNvbnRyb2w7XG5cdFx0dGhpcy5mb3JtUHJvcGVydHkudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcblx0XHRcdGlmIChjb250cm9sLnZhbHVlICE9PSBuZXdWYWx1ZSkge1xuXHRcdFx0XHRjb250cm9sLnNldFZhbHVlKG5ld1ZhbHVlLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG5cdFx0XHRcdGlmIChuZXdWYWx1ZSAmJiBBcnJheS5pc0FycmF5KG5ld1ZhbHVlKSkge1xuXHRcdFx0XHRcdG5ld1ZhbHVlLm1hcCh2ID0+IHRoaXMuY2hlY2tlZFt2XSA9IHRydWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5mb3JtUHJvcGVydHkuZXJyb3JzQ2hhbmdlcy5zdWJzY3JpYmUoKGVycm9ycykgPT4ge1xuXHRcdFx0Y29udHJvbC5zZXRFcnJvcnMoZXJyb3JzLCB7IGVtaXRFdmVudDogdHJ1ZSB9KTtcblx0XHR9KTtcblx0XHRjb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XG5cdFx0XHR0aGlzLmZvcm1Qcm9wZXJ0eS5zZXRWYWx1ZShuZXdWYWx1ZSwgZmFsc2UpO1xuXHRcdH0pO1xuXHR9XG5cblx0b25DaGVjayhlbCkge1xuXHRcdGlmIChlbC5jaGVja2VkKSB7XG5cdFx0XHR0aGlzLmNoZWNrZWRbZWwudmFsdWVdID0gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIHRoaXMuY2hlY2tlZFtlbC52YWx1ZV07XG5cdFx0fVxuXHRcdHRoaXMuZm9ybVByb3BlcnR5LnNldFZhbHVlKE9iamVjdC5rZXlzKHRoaXMuY2hlY2tlZCksIGZhbHNlKTtcblx0fVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbnRyb2xXaWRnZXQgfSBmcm9tICcuLi8uLi93aWRnZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1maWxlLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIndpZGdldCBmb3JtLWdyb3VwXCI+XG5cdDxsYWJlbCBbYXR0ci5mb3JdPVwiaWRcIiBjbGFzcz1cImhvcml6b250YWwgY29udHJvbC1sYWJlbFwiPlxuXHRcdHt7IHNjaGVtYS50aXRsZSB9fVxuXHQ8L2xhYmVsPlxuICAgIDxzcGFuICpuZ0lmPVwic2NoZW1hLmRlc2NyaXB0aW9uXCIgY2xhc3M9XCJmb3JtSGVscFwiPnt7c2NoZW1hLmRlc2NyaXB0aW9ufX08L3NwYW4+XG4gIDxpbnB1dCBbbmFtZV09XCJuYW1lXCIgY2xhc3M9XCJ0ZXh0LXdpZGdldCBmaWxlLXdpZGdldFwiIFthdHRyLmlkXT1cImlkXCJcbiAgICBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiIHR5cGU9XCJmaWxlXCIgW2F0dHIuZGlzYWJsZWRdPVwic2NoZW1hLnJlYWRPbmx5P3RydWU6bnVsbFwiXG4gICAgKGNoYW5nZSk9XCJvbkZpbGVDaGFuZ2UoJGV2ZW50KVwiPlxuXHQ8aW5wdXQgKm5nSWY9XCJzY2hlbWEucmVhZE9ubHlcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiB0eXBlPVwiaGlkZGVuXCIgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIj5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgRmlsZVdpZGdldCBleHRlbmRzIENvbnRyb2xXaWRnZXQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBwcm90ZWN0ZWQgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgcHJvdGVjdGVkIGZpbGVkYXRhOiBhbnkgPSB7fTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIE9WRVJSSURFIENvbnRyb2xXaWRnZXQgbmdBZnRlclZpZXdJbml0KCkgYXMgUmVhY3RpdmVGb3JtcyBkbyBub3QgaGFuZGxlXG4gICAgLy8gZmlsZSBpbnB1dHNcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5jb250cm9sO1xuICAgIHRoaXMuZm9ybVByb3BlcnR5LmVycm9yc0NoYW5nZXMuc3Vic2NyaWJlKChlcnJvcnMpID0+IHtcbiAgICAgIGNvbnRyb2wuc2V0RXJyb3JzKGVycm9ycywgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmZpbGVkYXRhLmRhdGEgPSB3aW5kb3cuYnRvYSgodGhpcy5yZWFkZXIucmVzdWx0IGFzIHN0cmluZykpO1xuICAgICAgdGhpcy5mb3JtUHJvcGVydHkuc2V0VmFsdWUodGhpcy5maWxlZGF0YSwgZmFsc2UpO1xuICAgIH07XG4gIH1cblxuICBvbkZpbGVDaGFuZ2UoJGV2ZW50KSB7XG4gICAgY29uc3QgZmlsZSA9ICRldmVudC50YXJnZXQuZmlsZXNbMF07XG4gICAgdGhpcy5maWxlZGF0YS5maWxlbmFtZSA9IGZpbGUubmFtZTtcbiAgICB0aGlzLmZpbGVkYXRhLnNpemUgPSBmaWxlLnNpemU7XG4gICAgdGhpcy5maWxlZGF0YVsnY29udGVudC10eXBlJ10gPSBmaWxlLnR5cGU7XG4gICAgdGhpcy5maWxlZGF0YS5lbmNvZGluZyA9ICdiYXNlNjQnO1xuICAgIHRoaXMucmVhZGVyLnJlYWRBc0JpbmFyeVN0cmluZyhmaWxlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29udHJvbFdpZGdldCB9IGZyb20gJy4uLy4uL3dpZGdldCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWludGVnZXItd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwid2lkZ2V0IGZvcm0tZ3JvdXBcIj5cblx0PGxhYmVsIFthdHRyLmZvcl09XCJpZFwiIGNsYXNzPVwiaG9yaXpvbnRhbCBjb250cm9sLWxhYmVsXCI+XG5cdFx0e3sgc2NoZW1hLnRpdGxlIH19XG5cdDwvbGFiZWw+XG4gIDxzcGFuICpuZ0lmPVwic2NoZW1hLmRlc2NyaXB0aW9uXCIgY2xhc3M9XCJmb3JtSGVscFwiPnt7c2NoZW1hLmRlc2NyaXB0aW9ufX08L3NwYW4+XG5cdDxpbnB1dCBbYXR0ci5yZWFkb25seV09XCJzY2hlbWEucmVhZE9ubHk/dHJ1ZTpudWxsXCIgW25hbWVdPVwibmFtZVwiXG5cdGNsYXNzPVwidGV4dC13aWRnZXQgaW50ZWdlci13aWRnZXQgZm9ybS1jb250cm9sXCIgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIlxuXHRbYXR0ci50eXBlXT1cIidudW1iZXInXCIgW2F0dHIubWluXT1cInNjaGVtYS5taW5pbXVtXCIgW2F0dHIubWF4XT1cInNjaGVtYS5tYXhpbXVtXCJcblx0W2F0dHIucGxhY2Vob2xkZXJdPVwic2NoZW1hLnBsYWNlaG9sZGVyXCJcblx0W2F0dHIubWF4TGVuZ3RoXT1cInNjaGVtYS5tYXhMZW5ndGggfHwgbnVsbFwiXG4gIFthdHRyLm1pbkxlbmd0aF09XCJzY2hlbWEubWluTGVuZ3RoIHx8IG51bGxcIj5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgSW50ZWdlcldpZGdldCBleHRlbmRzIENvbnRyb2xXaWRnZXQge31cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb250cm9sV2lkZ2V0IH0gZnJvbSAnLi4vLi4vd2lkZ2V0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtdGV4dGFyZWEtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwid2lkZ2V0IGZvcm0tZ3JvdXBcIj5cblx0PGxhYmVsIFthdHRyLmZvcl09XCJpZFwiIGNsYXNzPVwiaG9yaXpvbnRhbCBjb250cm9sLWxhYmVsXCI+XG5cdFx0e3sgc2NoZW1hLnRpdGxlIH19XG5cdDwvbGFiZWw+XG4gICAgPHNwYW4gKm5nSWY9XCJzY2hlbWEuZGVzY3JpcHRpb25cIiBjbGFzcz1cImZvcm1IZWxwXCI+e3tzY2hlbWEuZGVzY3JpcHRpb259fTwvc3Bhbj5cblx0PHRleHRhcmVhIFtyZWFkb25seV09XCJzY2hlbWEucmVhZE9ubHlcIiBbbmFtZV09XCJuYW1lXCJcblx0XHRjbGFzcz1cInRleHQtd2lkZ2V0IHRleHRhcmVhLXdpZGdldCBmb3JtLWNvbnRyb2xcIlxuXHRcdFthdHRyLnBsYWNlaG9sZGVyXT1cInNjaGVtYS5wbGFjZWhvbGRlclwiXG5cdFx0W2F0dHIubWF4TGVuZ3RoXT1cInNjaGVtYS5tYXhMZW5ndGggfHwgbnVsbFwiXG4gICAgW2F0dHIubWluTGVuZ3RoXT1cInNjaGVtYS5taW5MZW5ndGggfHwgbnVsbFwiXG5cdFx0W2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIj48L3RleHRhcmVhPlxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBUZXh0QXJlYVdpZGdldCBleHRlbmRzIENvbnRyb2xXaWRnZXQge31cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb250cm9sV2lkZ2V0IH0gZnJvbSAnLi4vLi4vd2lkZ2V0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtcmFkaW8td2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwid2lkZ2V0IGZvcm0tZ3JvdXBcIj5cblx0PGxhYmVsPnt7c2NoZW1hLnRpdGxlfX08L2xhYmVsPlxuICAgIDxzcGFuICpuZ0lmPVwic2NoZW1hLmRlc2NyaXB0aW9uXCIgY2xhc3M9XCJmb3JtSGVscFwiPnt7c2NoZW1hLmRlc2NyaXB0aW9ufX08L3NwYW4+XG5cdDxkaXYgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBzY2hlbWEub25lT2ZcIiBjbGFzcz1cInJhZGlvXCI+XG5cdFx0PGxhYmVsIGNsYXNzPVwiaG9yaXpvbnRhbCBjb250cm9sLWxhYmVsXCI+XG5cdFx0XHQ8aW5wdXQgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiB2YWx1ZT1cInt7b3B0aW9uLmVudW1bMF19fVwiIHR5cGU9XCJyYWRpb1wiICBbZGlzYWJsZWRdPVwic2NoZW1hLnJlYWRPbmx5XCI+XG5cdFx0XHR7e29wdGlvbi5kZXNjcmlwdGlvbn19XG5cdFx0PC9sYWJlbD5cblx0PC9kaXY+XG5cdDxpbnB1dCAqbmdJZj1cInNjaGVtYS5yZWFkT25seVwiIFthdHRyLm5hbWVdPVwibmFtZVwiIHR5cGU9XCJoaWRkZW5cIiBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiPlxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBSYWRpb1dpZGdldCBleHRlbmRzIENvbnRyb2xXaWRnZXQge31cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb250cm9sV2lkZ2V0IH0gZnJvbSAnLi4vLi4vd2lkZ2V0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtcmFuZ2Utd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwid2lkZ2V0IGZvcm0tZ3JvdXBcIj5cblx0PGxhYmVsIFthdHRyLmZvcl09XCJpZFwiIGNsYXNzPVwiaG9yaXpvbnRhbCBjb250cm9sLWxhYmVsXCI+XG5cdFx0e3sgc2NoZW1hLnRpdGxlIH19XG5cdDwvbGFiZWw+XG4gICAgPHNwYW4gKm5nSWY9XCJzY2hlbWEuZGVzY3JpcHRpb25cIiBjbGFzcz1cImZvcm1IZWxwXCI+e3tzY2hlbWEuZGVzY3JpcHRpb259fTwvc3Bhbj5cdFxuXHQ8aW5wdXQgW25hbWVdPVwibmFtZVwiIGNsYXNzPVwidGV4dC13aWRnZXQgcmFuZ2Utd2lkZ2V0XCIgW2F0dHIuaWRdPVwiaWRcIlxuXHRbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiIFthdHRyLnR5cGVdPVwiJ3JhbmdlJ1wiIFthdHRyLm1pbl09XCJzY2hlbWEubWluaW11bVwiIFthdHRyLm1heF09XCJzY2hlbWEubWF4aW11bVwiIFtkaXNhYmxlZF09XCJzY2hlbWEucmVhZE9ubHk/dHJ1ZTpudWxsXCIgPlxuXHQ8aW5wdXQgKm5nSWY9XCJzY2hlbWEucmVhZE9ubHlcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiB0eXBlPVwiaGlkZGVuXCI+XG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIFJhbmdlV2lkZ2V0IGV4dGVuZHMgQ29udHJvbFdpZGdldCB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbnRyb2xXaWRnZXQgfSBmcm9tICcuLi8uLi93aWRnZXQnO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdzZi1zZWxlY3Qtd2lkZ2V0Jyxcblx0dGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwid2lkZ2V0IGZvcm0tZ3JvdXBcIj5cblx0PGxhYmVsIFthdHRyLmZvcl09XCJpZFwiIGNsYXNzPVwiaG9yaXpvbnRhbCBjb250cm9sLWxhYmVsXCI+XG5cdFx0e3sgc2NoZW1hLnRpdGxlIH19XG5cdDwvbGFiZWw+XG5cblx0PHNwYW4gKm5nSWY9XCJzY2hlbWEuZGVzY3JpcHRpb25cIiBjbGFzcz1cImZvcm1IZWxwXCI+XG5cdFx0e3tzY2hlbWEuZGVzY3JpcHRpb259fVxuXHQ8L3NwYW4+XG5cblx0PHNlbGVjdCAqbmdJZj1cInNjaGVtYS50eXBlIT0nYXJyYXknXCIgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiBbZGlzYWJsZWRdPVwic2NoZW1hLnJlYWRPbmx5XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cblx0XHQ8b3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygc2NoZW1hLm9uZU9mXCIgW25nVmFsdWVdPVwib3B0aW9uLmVudW1bMF1cIiA+e3tvcHRpb24uZGVzY3JpcHRpb259fTwvb3B0aW9uPlxuXHQ8L3NlbGVjdD5cblxuXHQ8c2VsZWN0ICpuZ0lmPVwic2NoZW1hLnR5cGU9PT0nYXJyYXknXCIgbXVsdGlwbGUgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiBbZGlzYWJsZWRdPVwic2NoZW1hLnJlYWRPbmx5XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cblx0XHQ8b3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygc2NoZW1hLml0ZW1zLm9uZU9mXCIgW25nVmFsdWVdPVwib3B0aW9uLmVudW1bMF1cIiA+e3tvcHRpb24uZGVzY3JpcHRpb259fTwvb3B0aW9uPlxuXHQ8L3NlbGVjdD5cblxuXHQ8aW5wdXQgKm5nSWY9XCJzY2hlbWEucmVhZE9ubHlcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiB0eXBlPVwiaGlkZGVuXCIgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIj5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0V2lkZ2V0IGV4dGVuZHMgQ29udHJvbFdpZGdldCB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbnRyb2xXaWRnZXQgfSBmcm9tICcuLi8uLi93aWRnZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1zdHJpbmctd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGA8aW5wdXQgKm5nSWY9XCJ0aGlzLnNjaGVtYS53aWRnZXQuaWQgPT09J2hpZGRlbic7IGVsc2Ugbm90SGlkZGVuRmllbGRCbG9ja1wiXG4gIFthdHRyLm5hbWVdPVwibmFtZVwiIHR5cGU9XCJoaWRkZW5cIiBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiPlxuPG5nLXRlbXBsYXRlICNub3RIaWRkZW5GaWVsZEJsb2NrPlxuPGRpdiBjbGFzcz1cIndpZGdldCBmb3JtLWdyb3VwXCI+XG4gICAgPGxhYmVsIFthdHRyLmZvcl09XCJpZFwiIGNsYXNzPVwiaG9yaXpvbnRhbCBjb250cm9sLWxhYmVsXCI+XG4gICAgXHR7eyBzY2hlbWEudGl0bGUgfX1cbiAgICA8L2xhYmVsPlxuICAgIDxzcGFuICpuZ0lmPVwic2NoZW1hLmRlc2NyaXB0aW9uXCIgY2xhc3M9XCJmb3JtSGVscFwiPnt7c2NoZW1hLmRlc2NyaXB0aW9ufX08L3NwYW4+XG4gICAgPGlucHV0IFtuYW1lXT1cIm5hbWVcIiBbYXR0ci5yZWFkb25seV09XCIoc2NoZW1hLndpZGdldC5pZCE9PSdjb2xvcicpICYmIHNjaGVtYS5yZWFkT25seT90cnVlOm51bGxcIlxuICAgIGNsYXNzPVwidGV4dC13aWRnZXQuaWQgdGV4dGxpbmUtd2lkZ2V0IGZvcm0tY29udHJvbFwiXG4gICAgW2F0dHIudHlwZV09XCIhdGhpcy5zY2hlbWEud2lkZ2V0LmlkIHx8IHRoaXMuc2NoZW1hLndpZGdldC5pZCA9PT0gJ3N0cmluZycgPyAndGV4dCcgOiB0aGlzLnNjaGVtYS53aWRnZXQuaWRcIlxuICAgIFthdHRyLmlkXT1cImlkXCIgIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCIgW2F0dHIucGxhY2Vob2xkZXJdPVwic2NoZW1hLnBsYWNlaG9sZGVyXCJcbiAgICBbYXR0ci5tYXhMZW5ndGhdPVwic2NoZW1hLm1heExlbmd0aCB8fCBudWxsXCJcbiAgICBbYXR0ci5taW5MZW5ndGhdPVwic2NoZW1hLm1pbkxlbmd0aCB8fCBudWxsXCJcbiAgICBbYXR0ci5yZXF1aXJlZF09XCJzY2hlbWEuaXNSZXF1aXJlZCB8fCBudWxsXCJcbiAgICBbYXR0ci5kaXNhYmxlZF09XCIoc2NoZW1hLndpZGdldC5pZD09J2NvbG9yJyAmJiBzY2hlbWEucmVhZE9ubHkpP3RydWU6bnVsbFwiPlxuICAgIDxpbnB1dCAqbmdJZj1cIihzY2hlbWEud2lkZ2V0LmlkPT09J2NvbG9yJyAmJiBzY2hlbWEucmVhZE9ubHkpXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgdHlwZT1cImhpZGRlblwiIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCI+XG48L2Rpdj5cbjwvbmctdGVtcGxhdGU+YFxufSlcbmV4cG9ydCBjbGFzcyBTdHJpbmdXaWRnZXQgZXh0ZW5kcyBDb250cm9sV2lkZ2V0IHtcblxuICAgIGdldElucHV0VHlwZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNjaGVtYS53aWRnZXQuaWQgfHwgdGhpcy5zY2hlbWEud2lkZ2V0LmlkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuICd0ZXh0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNjaGVtYS53aWRnZXQuaWQ7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBBcnJheVdpZGdldCB9IGZyb20gJy4vYXJyYXkvYXJyYXkud2lkZ2V0JztcbmltcG9ydCB7IEJ1dHRvbldpZGdldCB9IGZyb20gJy4vYnV0dG9uL2J1dHRvbi53aWRnZXQnO1xuaW1wb3J0IHsgQ2hlY2tib3hXaWRnZXQgfSBmcm9tICcuL2NoZWNrYm94L2NoZWNrYm94LndpZGdldCc7XG5pbXBvcnQgeyBGaWxlV2lkZ2V0IH0gZnJvbSAnLi9maWxlL2ZpbGUud2lkZ2V0JztcbmltcG9ydCB7IEludGVnZXJXaWRnZXQgfSBmcm9tICcuL2ludGVnZXIvaW50ZWdlci53aWRnZXQnO1xuaW1wb3J0IHsgT2JqZWN0V2lkZ2V0IH0gZnJvbSAnLi9vYmplY3Qvb2JqZWN0LndpZGdldCc7XG5pbXBvcnQgeyBSYWRpb1dpZGdldCB9IGZyb20gJy4vcmFkaW8vcmFkaW8ud2lkZ2V0JztcbmltcG9ydCB7IFJhbmdlV2lkZ2V0IH0gZnJvbSAnLi9yYW5nZS9yYW5nZS53aWRnZXQnO1xuaW1wb3J0IHsgU2VsZWN0V2lkZ2V0IH0gZnJvbSAnLi9zZWxlY3Qvc2VsZWN0LndpZGdldCc7XG5pbXBvcnQgeyBTdHJpbmdXaWRnZXQgfSBmcm9tICcuL3N0cmluZy9zdHJpbmcud2lkZ2V0JztcbmltcG9ydCB7IFRleHRBcmVhV2lkZ2V0IH0gZnJvbSAnLi90ZXh0YXJlYS90ZXh0YXJlYS53aWRnZXQnO1xuXG5pbXBvcnQgeyBXaWRnZXRSZWdpc3RyeSB9IGZyb20gJy4uL3dpZGdldHJlZ2lzdHJ5JztcblxuZXhwb3J0IGNsYXNzIERlZmF1bHRXaWRnZXRSZWdpc3RyeSBleHRlbmRzIFdpZGdldFJlZ2lzdHJ5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucmVnaXN0ZXIoJ2FycmF5JywgIEFycmF5V2lkZ2V0KTtcbiAgICB0aGlzLnJlZ2lzdGVyKCdvYmplY3QnLCAgT2JqZWN0V2lkZ2V0KTtcblxuICAgIHRoaXMucmVnaXN0ZXIoJ3N0cmluZycsIFN0cmluZ1dpZGdldCk7XG4gICAgdGhpcy5yZWdpc3Rlcignc2VhcmNoJywgU3RyaW5nV2lkZ2V0KTtcbiAgICB0aGlzLnJlZ2lzdGVyKCd0ZWwnLCBTdHJpbmdXaWRnZXQpO1xuICAgIHRoaXMucmVnaXN0ZXIoJ3VybCcsIFN0cmluZ1dpZGdldCk7XG4gICAgdGhpcy5yZWdpc3RlcignZW1haWwnLCBTdHJpbmdXaWRnZXQpO1xuICAgIHRoaXMucmVnaXN0ZXIoJ3Bhc3N3b3JkJywgU3RyaW5nV2lkZ2V0KTtcbiAgICB0aGlzLnJlZ2lzdGVyKCdjb2xvcicsIFN0cmluZ1dpZGdldCk7XG4gICAgdGhpcy5yZWdpc3RlcignZGF0ZScsIFN0cmluZ1dpZGdldCk7XG4gICAgdGhpcy5yZWdpc3RlcignZGF0ZS10aW1lJywgU3RyaW5nV2lkZ2V0KTtcbiAgICB0aGlzLnJlZ2lzdGVyKCd0aW1lJywgU3RyaW5nV2lkZ2V0KTtcblxuICAgIHRoaXMucmVnaXN0ZXIoJ2ludGVnZXInLCBJbnRlZ2VyV2lkZ2V0KTtcbiAgICB0aGlzLnJlZ2lzdGVyKCdudW1iZXInLCBJbnRlZ2VyV2lkZ2V0KTtcbiAgICB0aGlzLnJlZ2lzdGVyKCdyYW5nZScsIFJhbmdlV2lkZ2V0KTtcblxuICAgIHRoaXMucmVnaXN0ZXIoJ3RleHRhcmVhJywgVGV4dEFyZWFXaWRnZXQpO1xuXG4gICAgdGhpcy5yZWdpc3RlcignZmlsZScsIEZpbGVXaWRnZXQpO1xuICAgIHRoaXMucmVnaXN0ZXIoJ3NlbGVjdCcsIFNlbGVjdFdpZGdldCk7XG4gICAgdGhpcy5yZWdpc3RlcigncmFkaW8nLCBSYWRpb1dpZGdldCk7XG4gICAgdGhpcy5yZWdpc3RlcignYm9vbGVhbicsIENoZWNrYm94V2lkZ2V0KTtcbiAgICB0aGlzLnJlZ2lzdGVyKCdjaGVja2JveCcsIENoZWNrYm94V2lkZ2V0KTtcblxuICAgIHRoaXMucmVnaXN0ZXIoJ2J1dHRvbicsIEJ1dHRvbldpZGdldCk7XG5cbiAgICB0aGlzLnNldERlZmF1bHRXaWRnZXQoU3RyaW5nV2lkZ2V0KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWRlZmF1bHQtZmllbGQnLFxuICB0ZW1wbGF0ZTogYDxwPlVua25vdyB0eXBlPC9wPmBcbn0pXG5leHBvcnQgY2xhc3MgRGVmYXVsdFdpZGdldCB7fVxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEZvcm1zTW9kdWxlLFxuICBSZWFjdGl2ZUZvcm1zTW9kdWxlXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtGb3JtRWxlbWVudENvbXBvbmVudH0gZnJvbSAnLi9mb3JtZWxlbWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtQ29tcG9uZW50fSBmcm9tICcuL2Zvcm0uY29tcG9uZW50JztcbmltcG9ydCB7V2lkZ2V0Q2hvb3NlckNvbXBvbmVudH0gZnJvbSAnLi93aWRnZXRjaG9vc2VyLmNvbXBvbmVudCc7XG5pbXBvcnQge0FycmF5V2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL2FycmF5L2FycmF5LndpZGdldCc7XG5pbXBvcnQge0J1dHRvbldpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9idXR0b24vYnV0dG9uLndpZGdldCc7XG5pbXBvcnQge09iamVjdFdpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9vYmplY3Qvb2JqZWN0LndpZGdldCc7XG5pbXBvcnQge0NoZWNrYm94V2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL2NoZWNrYm94L2NoZWNrYm94LndpZGdldCc7XG5pbXBvcnQge0ZpbGVXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvZmlsZS9maWxlLndpZGdldCc7XG5pbXBvcnQge0ludGVnZXJXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvaW50ZWdlci9pbnRlZ2VyLndpZGdldCc7XG5pbXBvcnQge1RleHRBcmVhV2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL3RleHRhcmVhL3RleHRhcmVhLndpZGdldCc7XG5pbXBvcnQge1JhZGlvV2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL3JhZGlvL3JhZGlvLndpZGdldCc7XG5pbXBvcnQge1JhbmdlV2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL3JhbmdlL3JhbmdlLndpZGdldCc7XG5pbXBvcnQge1NlbGVjdFdpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9zZWxlY3Qvc2VsZWN0LndpZGdldCc7XG5pbXBvcnQge1N0cmluZ1dpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9zdHJpbmcvc3RyaW5nLndpZGdldCc7XG5pbXBvcnQge0RlZmF1bHRXaWRnZXRSZWdpc3RyeX0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9kZWZhdWx0d2lkZ2V0cmVnaXN0cnknO1xuaW1wb3J0IHtcbiAgRGVmYXVsdFdpZGdldFxufSBmcm9tICcuL2RlZmF1bHQud2lkZ2V0JztcblxuaW1wb3J0IHtXaWRnZXRSZWdpc3RyeX0gZnJvbSAnLi93aWRnZXRyZWdpc3RyeSc7XG5pbXBvcnQge1NjaGVtYVZhbGlkYXRvckZhY3RvcnksIFpTY2hlbWFWYWxpZGF0b3JGYWN0b3J5fSBmcm9tICcuL3NjaGVtYXZhbGlkYXRvcmZhY3RvcnknO1xuaW1wb3J0IHtGb3JtRWxlbWVudENvbXBvbmVudEFjdGlvbn0gZnJvbSAnLi9mb3JtZWxlbWVudC5hY3Rpb24uY29tcG9uZW50JztcblxuY29uc3QgbW9kdWxlUHJvdmlkZXJzID0gW1xuICB7XG4gICAgcHJvdmlkZTogV2lkZ2V0UmVnaXN0cnksXG4gICAgdXNlQ2xhc3M6IERlZmF1bHRXaWRnZXRSZWdpc3RyeVxuICB9LFxuICB7XG4gICAgcHJvdmlkZTogU2NoZW1hVmFsaWRhdG9yRmFjdG9yeSxcbiAgICB1c2VDbGFzczogWlNjaGVtYVZhbGlkYXRvckZhY3RvcnlcbiAgfVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBGb3JtRWxlbWVudENvbXBvbmVudCxcbiAgICBGb3JtRWxlbWVudENvbXBvbmVudEFjdGlvbixcbiAgICBGb3JtQ29tcG9uZW50LFxuICAgIFdpZGdldENob29zZXJDb21wb25lbnQsXG4gICAgRGVmYXVsdFdpZGdldCxcbiAgICBBcnJheVdpZGdldCxcbiAgICBCdXR0b25XaWRnZXQsXG4gICAgT2JqZWN0V2lkZ2V0LFxuICAgIENoZWNrYm94V2lkZ2V0LFxuICAgIEZpbGVXaWRnZXQsXG4gICAgSW50ZWdlcldpZGdldCxcbiAgICBUZXh0QXJlYVdpZGdldCxcbiAgICBSYWRpb1dpZGdldCxcbiAgICBSYW5nZVdpZGdldCxcbiAgICBTZWxlY3RXaWRnZXQsXG4gICAgU3RyaW5nV2lkZ2V0LFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBGb3JtRWxlbWVudENvbXBvbmVudCxcbiAgICBGb3JtRWxlbWVudENvbXBvbmVudEFjdGlvbixcbiAgICBGb3JtQ29tcG9uZW50LFxuICAgIFdpZGdldENob29zZXJDb21wb25lbnQsXG4gICAgQXJyYXlXaWRnZXQsXG4gICAgQnV0dG9uV2lkZ2V0LFxuICAgIE9iamVjdFdpZGdldCxcbiAgICBDaGVja2JveFdpZGdldCxcbiAgICBGaWxlV2lkZ2V0LFxuICAgIEludGVnZXJXaWRnZXQsXG4gICAgVGV4dEFyZWFXaWRnZXQsXG4gICAgUmFkaW9XaWRnZXQsXG4gICAgUmFuZ2VXaWRnZXQsXG4gICAgU2VsZWN0V2lkZ2V0LFxuICAgIFN0cmluZ1dpZGdldCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEZvcm1Db21wb25lbnQsXG4gICAgRm9ybUVsZW1lbnRDb21wb25lbnQsXG4gICAgRm9ybUVsZW1lbnRDb21wb25lbnRBY3Rpb24sXG4gICAgV2lkZ2V0Q2hvb3NlckNvbXBvbmVudCxcbiAgICBBcnJheVdpZGdldCxcbiAgICBCdXR0b25XaWRnZXQsXG4gICAgT2JqZWN0V2lkZ2V0LFxuICAgIENoZWNrYm94V2lkZ2V0LFxuICAgIEZpbGVXaWRnZXQsXG4gICAgSW50ZWdlcldpZGdldCxcbiAgICBUZXh0QXJlYVdpZGdldCxcbiAgICBSYWRpb1dpZGdldCxcbiAgICBSYW5nZVdpZGdldCxcbiAgICBTZWxlY3RXaWRnZXQsXG4gICAgU3RyaW5nV2lkZ2V0XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU2NoZW1hRm9ybU1vZHVsZSB7XG5cbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTY2hlbWFGb3JtTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbLi4ubW9kdWxlUHJvdmlkZXJzXVxuICAgIH07XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZVNjaGVtYVNlcnZpY2Uge1xuXG4gIGNoYW5nZXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBjaGFuZ2VkKCkge1xuICAgIHRoaXMuY2hhbmdlcy5lbWl0KCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVTY2hlbWFFbGVtZW50IHtcblxuICBnZXRUZXh0Q29udGVudChlbGVtZW50UmVmOiBFbGVtZW50UmVmKTogc3RyaW5nIHtcbiAgICBjb25zdCBub2RlcyA9IEFycmF5LmZyb20oZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNoaWxkTm9kZXMpO1xuICAgIGNvbnN0IG5vZGUgPSA8SFRNTEVsZW1lbnQ+bm9kZXMuZmlsdGVyKChlbDogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgIHJldHVybiBlbC5ub2RlVHlwZSA9PT0gZWwuVEVYVF9OT0RFO1xuICAgIH0pLnBvcCgpO1xuXG4gICAgaWYgKCFub2RlIHx8ICFub2RlLm5vZGVWYWx1ZSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlLm5vZGVWYWx1ZS50cmltKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFRlbXBsYXRlU2NoZW1hRWxlbWVudCB9IGZyb20gJy4uL3RlbXBsYXRlLXNjaGVtYS1lbGVtZW50JztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1idXR0b24nLFxuICB0ZW1wbGF0ZVVybDogJy4vYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogVGVtcGxhdGVTY2hlbWFFbGVtZW50LFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQnV0dG9uQ29tcG9uZW50KSxcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uQ29tcG9uZW50IGV4dGVuZHMgVGVtcGxhdGVTY2hlbWFFbGVtZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG5cbiAgQElucHV0KClcbiAgaWQ6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBsYWJlbCA9ICcnO1xuXG4gIEBJbnB1dCgpXG4gIHdpZGdldDogc3RyaW5nIHwgb2JqZWN0O1xuXG4gIEBPdXRwdXQoKVxuICBjbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcml2YXRlIHNldExhYmVsRnJvbUNvbnRlbnQoKSB7XG4gICAgY29uc3QgdGV4dENvbnRlbnQgPSB0aGlzLmdldFRleHRDb250ZW50KHRoaXMuZWxlbWVudFJlZik7XG5cbiAgICAvLyBsYWJlbCBhcyBASW5wdXQgdGFrZXMgcHJpb3JpdHkgb3ZlciBjb250ZW50IHRleHRcbiAgICBpZiAodGV4dENvbnRlbnQgJiYgIXRoaXMubGFiZWwpIHtcbiAgICAgIHRoaXMubGFiZWwgPSB0ZXh0Q29udGVudDtcbiAgICB9XG5cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLnNldExhYmVsRnJvbUNvbnRlbnQoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi9tb2RlbC92YWxpZGF0b3InO1xuXG5leHBvcnQgZW51bSBGaWVsZFR5cGUge1xuICBTdHJpbmcgPSAnc3RyaW5nJyxcbiAgT2JqZWN0ID0gJ29iamVjdCcsXG4gIEFycmF5ID0gJ2FycmF5JyxcbiAgQm9vbGVhbiA9ICdib29sZWFuJyxcbiAgSW50ZWdlciA9ICAnaW50ZWdlcicsXG4gIE51bWJlciA9ICdudW1iZXInLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkIHtcbiAgbmFtZTogc3RyaW5nO1xuICByZXF1aXJlZDogYm9vbGVhbjtcbiAgZ2V0U2NoZW1hKCk6IGFueTtcbiAgZ2V0QnV0dG9ucygpOiBhbnk7XG4gIGdldFZhbGlkYXRvcnMoKTogeyBwYXRoOiBzdHJpbmcsIHZhbGlkYXRvcjogVmFsaWRhdG9yIH1bXTtcbn1cblxuXG4iLCJpbXBvcnQgeyBFbGVtZW50UmVmLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnLi4vLi4vbW9kZWwvdmFsaWRhdG9yJztcbmltcG9ydCB7IEFjdGlvblJlZ2lzdHJ5IH0gZnJvbSAnLi4vLi4vbW9kZWwvYWN0aW9ucmVnaXN0cnknO1xuaW1wb3J0IHsgQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi4vYnV0dG9uL2J1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGVtcGxhdGVTY2hlbWFFbGVtZW50IH0gZnJvbSAnLi4vdGVtcGxhdGUtc2NoZW1hLWVsZW1lbnQnO1xuXG5pbXBvcnQgeyBGaWVsZCwgRmllbGRUeXBlIH0gZnJvbSAnLi9maWVsZCc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGaWVsZFBhcmVudCBleHRlbmRzIFRlbXBsYXRlU2NoZW1hRWxlbWVudCB7XG5cbiAgbmFtZSA9ICcnO1xuICB0eXBlOiBGaWVsZFR5cGU7XG5cbiAgZ2V0IHBhdGgoKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMubmFtZSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHJldHVybiAnLycgKyB0aGlzLm5hbWU7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgYWN0aW9uUmVnaXN0cnk6IEFjdGlvblJlZ2lzdHJ5O1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgY2hpbGRCdXR0b25zOiBRdWVyeUxpc3Q8QnV0dG9uQ29tcG9uZW50PjtcblxuXG4gIGdldEJ1dHRvbnMoKTogeyBpZDogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCB3aWRnZXQ/OiBzdHJpbmcgfCBvYmplY3QgfVtdIHtcblxuICAgIHJldHVybiB0aGlzLmNoaWxkQnV0dG9ucy5tYXAoKGJ1dHRvbiwgaW5kZXgpID0+IHtcblxuICAgICAgaWYgKCFidXR0b24uaWQpIHtcbiAgICAgICAgY29uc3QgcmFuZG9tU3RyaW5nID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc3Vic3RyKDIsIDgpO1xuICAgICAgICAvLyBnZW5lcmF0ZSBpZCBmb3IgYnV0dG9uXG4gICAgICAgIGJ1dHRvbi5pZCA9IHRoaXMubmFtZSArIHJhbmRvbVN0cmluZyArICdfJyAgKyAoaW5kZXggKyAxKTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVnaXN0ZXIgYXMgYnV0dG9uIGFjdGlvbiB0aGUgRXZlbnRFbWl0dGVyIGNsaWNrXG4gICAgICB0aGlzLmFjdGlvblJlZ2lzdHJ5LnJlZ2lzdGVyKFxuICAgICAgICBidXR0b24uaWQsXG4gICAgICAgIGJ1dHRvbi5jbGljay5lbWl0LmJpbmQoYnV0dG9uLmNsaWNrKVxuICAgICAgKTtcblxuICAgICAgY29uc3QgX2J1dHRvbiA9IDxhbnk+e1xuICAgICAgICBpZDogYnV0dG9uLmlkLFxuICAgICAgICBsYWJlbDogYnV0dG9uLmxhYmVsLFxuICAgICAgfTtcblxuICAgICAgaWYgKGJ1dHRvbi53aWRnZXQpIHtcbiAgICAgICAgX2J1dHRvbi53aWRnZXQgPSBidXR0b24ud2lkZ2V0O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX2J1dHRvbjtcblxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEZpZWxkc1ZhbGlkYXRvcnMoXG4gICAgZmllbGRzOiBGaWVsZFtdXG4gICk6IHsgcGF0aDogc3RyaW5nLCB2YWxpZGF0b3I6IFZhbGlkYXRvciB9W10ge1xuXG4gICAgcmV0dXJuIGZpZWxkcy5yZWR1Y2UoKHZhbGlkYXRvcnMsIGZpZWxkKSA9PiB7XG4gICAgICByZXR1cm4gdmFsaWRhdG9ycy5jb25jYXQoZmllbGQuZ2V0VmFsaWRhdG9ycygpKTtcbiAgICB9LCBbXSk7XG5cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRGaWVsZHNTY2hlbWEoZmllbGRzOiBGaWVsZFtdKSB7XG4gICAgcmV0dXJuIGZpZWxkcy5yZWR1Y2UoKHNjaGVtYTogYW55LCBmaWVsZCkgPT4ge1xuXG4gICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICBjYXNlIEZpZWxkVHlwZS5BcnJheTpcbiAgICAgICAgICBzY2hlbWEuaXRlbXMgPSBmaWVsZC5nZXRTY2hlbWEoKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmICghc2NoZW1hLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIHNjaGVtYS5wcm9wZXJ0aWVzID0ge307XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2NoZW1hLnByb3BlcnRpZXNbZmllbGQubmFtZV0gPSBmaWVsZC5nZXRTY2hlbWEoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY29uc3QgYnV0dG9ucyA9IGZpZWxkLmdldEJ1dHRvbnMoKTtcbiAgICAgIGlmIChidXR0b25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2NoZW1hLmJ1dHRvbnMgPSBidXR0b25zO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWZpZWxkLnJlcXVpcmVkKSB7XG4gICAgICAgIHJldHVybiBzY2hlbWE7XG4gICAgICB9XG5cbiAgICAgIGlmICghc2NoZW1hLnJlcXVpcmVkKSB7XG4gICAgICAgIHNjaGVtYS5yZXF1aXJlZCA9IFtdO1xuICAgICAgfVxuICAgICAgc2NoZW1hLnJlcXVpcmVkLnB1c2goZmllbGQubmFtZSk7XG4gICAgICByZXR1cm4gc2NoZW1hO1xuICAgIH0sIHt9KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuIENvbXBvbmVudCxcbiBFbGVtZW50UmVmLFxuIElucHV0LFxuIE9uSW5pdCxcbiBmb3J3YXJkUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBUZW1wbGF0ZVNjaGVtYUVsZW1lbnQgfSBmcm9tICcuLi8uLi90ZW1wbGF0ZS1zY2hlbWEtZWxlbWVudCc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtaXRlbScsXG4gIHRlbXBsYXRlVXJsOiAnLi9pdGVtLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBJdGVtQ29tcG9uZW50IGV4dGVuZHMgVGVtcGxhdGVTY2hlbWFFbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKVxuICB2YWx1ZTogYW55O1xuXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0aGlzLmdldFRleHRDb250ZW50KHRoaXMuZWxlbWVudFJlZik7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBPbkluaXQsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgVmlld0NoaWxkLFxuICBRdWVyeUxpc3QsXG4gIEVsZW1lbnRSZWYsXG4gIGZvcndhcmRSZWYsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZSxcbiAgT25DaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi4vLi4vbW9kZWwvYWN0aW9uJztcbmltcG9ydCB7IEFjdGlvblJlZ2lzdHJ5IH0gZnJvbSAnLi4vLi4vbW9kZWwvYWN0aW9ucmVnaXN0cnknO1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnLi4vLi4vbW9kZWwvdmFsaWRhdG9yJztcblxuaW1wb3J0IHsgVGVtcGxhdGVTY2hlbWFFbGVtZW50IH0gZnJvbSAnLi4vdGVtcGxhdGUtc2NoZW1hLWVsZW1lbnQnO1xuaW1wb3J0IHsgVGVtcGxhdGVTY2hlbWFTZXJ2aWNlIH0gZnJvbSAnLi4vdGVtcGxhdGUtc2NoZW1hLnNlcnZpY2UnO1xuaW1wb3J0IHsgQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi4vYnV0dG9uL2J1dHRvbi5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBGaWVsZFBhcmVudCB9IGZyb20gJy4vZmllbGQtcGFyZW50JztcbmltcG9ydCB7IEZpZWxkVHlwZSwgRmllbGQgfSBmcm9tICcuL2ZpZWxkJztcbmltcG9ydCB7IEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2l0ZW0vaXRlbS5jb21wb25lbnQnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpZWxkLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBGaWVsZENvbXBvbmVudCBleHRlbmRzIEZpZWxkUGFyZW50IGltcGxlbWVudHNcbkZpZWxkLCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQge1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRmllbGRDb21wb25lbnQpXG4gIGNoaWxkRmllbGRzOiBRdWVyeUxpc3Q8RmllbGRDb21wb25lbnQ+O1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oSXRlbUNvbXBvbmVudClcbiAgY2hpbGRJdGVtczogUXVlcnlMaXN0PEl0ZW1Db21wb25lbnQ+O1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQnV0dG9uQ29tcG9uZW50KVxuICBjaGlsZEJ1dHRvbnM6IFF1ZXJ5TGlzdDxCdXR0b25Db21wb25lbnQ+O1xuXG4gIEBJbnB1dCgpXG4gIG5hbWU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICB0eXBlID0gRmllbGRUeXBlLlN0cmluZztcblxuICBASW5wdXQoKVxuICBmb3JtYXQ6IHN0cmluZztcblxuICBASW5wdXQoKVxuICByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICByZWFkT25seTogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICB0aXRsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICBASW5wdXQoKVxuICB3aWRnZXQ6IHN0cmluZyB8IG9iamVjdDtcblxuICBASW5wdXQoKVxuICB2YWxpZGF0b3I6IFZhbGlkYXRvcjtcblxuICBASW5wdXQoKVxuICBzY2hlbWE6IGFueSA9IHsgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSB0ZW1wbGF0ZVNjaGVtYVNlcnZpY2U6IFRlbXBsYXRlU2NoZW1hU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYWN0aW9uUmVnaXN0cnk6IEFjdGlvblJlZ2lzdHJ5XG4gICkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBnZXRTY2hlbWEoKTogYW55IHtcblxuICAgIGNvbnN0IHsgcHJvcGVydGllcywgaXRlbXMsIHJlcXVpcmVkIH0gPSB0aGlzLmdldEZpZWxkc1NjaGVtYShcbiAgICAgIHRoaXMuY2hpbGRGaWVsZHMuZmlsdGVyKGZpZWxkID0+IGZpZWxkICE9PSB0aGlzKVxuICAgICk7XG5cbiAgICBjb25zdCBvbmVPZiA9IHRoaXMuZ2V0T25lT2YoKTtcblxuICAgIGNvbnN0IHNjaGVtYSA9IDxhbnk+e1xuICAgICAgdHlwZTogdGhpcy50eXBlXG4gICAgfTtcblxuICAgIGlmICh0aGlzLnRpdGxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjaGVtYS50aXRsZSA9IHRoaXMudGl0bGU7XG4gICAgfVxuXG4gICAgaWYgKHByb3BlcnRpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xuICAgIH1cblxuICAgIGlmIChpdGVtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2hlbWEuaXRlbXMgPSBpdGVtcztcbiAgICB9XG5cbiAgICAvLyByZXF1cmllZCBjaGlsZCBmaWVsZHNcbiAgICBpZiAocmVxdWlyZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLnJlcXVpcmVkID0gcmVxdWlyZWQ7XG4gICAgfVxuXG4gICAgaWYgKG9uZU9mICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjaGVtYS5vbmVPZiA9IG9uZU9mO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjaGVtYS5kZXNjcmlwdGlvbiA9IHRoaXMuZGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGxhY2Vob2xkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLnBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mb3JtYXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLmZvcm1hdCA9IHRoaXMuZm9ybWF0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLndpZGdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2hlbWEud2lkZ2V0ID0gdGhpcy53aWRnZXQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVhZE9ubHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLnJlYWRPbmx5ID0gdGhpcy5yZWFkT25seTtcbiAgICB9XG5cbiAgICBjb25zdCBidXR0b25zID0gdGhpcy5nZXRCdXR0b25zKCk7XG4gICAgaWYgKGJ1dHRvbnMubGVuZ3RoID4gMCkge1xuICAgICAgc2NoZW1hLmJ1dHRvbnMgPSBidXR0b25zO1xuICAgIH1cblxuICAgIC8vIEBJbnB1dCBzY2hlbWEgdGFrZXMgcHJlY2VkZW5jZVxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHNjaGVtYSwgdGhpcy5zY2hlbWEpO1xuXG4gIH1cblxuICBnZXRWYWxpZGF0b3JzKCk6IHsgcGF0aDogc3RyaW5nLCB2YWxpZGF0b3I6IFZhbGlkYXRvciB9W10ge1xuXG4gICAgLy8gcmVnaXN0ZXJpbmcgdmFsaWRhdG9yIGhlcmUgaXMgbm90IHBvc3NpYmxlIHNpbmNlIHByb3AgZnVsbCBwYXRoIGlzIG5lZWRlZFxuICAgIGNvbnN0IGNoaWxkVmFsaWRhdG9ycyA9IHRoaXMuZ2V0RmllbGRzVmFsaWRhdG9ycyhcbiAgICAgIHRoaXMuY2hpbGRGaWVsZHMuZmlsdGVyKGZpZWxkID0+IGZpZWxkICE9PSB0aGlzKVxuICAgICk7XG4gICAgY29uc3QgdmFsaWRhdG9ycyA9IGNoaWxkVmFsaWRhdG9ycy5tYXAoKHsgcGF0aCwgdmFsaWRhdG9yIH0pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGg6IHRoaXMucGF0aCArIHBhdGgsXG4gICAgICAgIHZhbGlkYXRvclxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGlmICghdGhpcy52YWxpZGF0b3IpIHtcbiAgICAgIHJldHVybiB2YWxpZGF0b3JzO1xuICAgIH1cblxuICAgIHZhbGlkYXRvcnMucHVzaCh7IHBhdGg6IHRoaXMucGF0aCwgdmFsaWRhdG9yOiB0aGlzLnZhbGlkYXRvciB9KTtcbiAgICByZXR1cm4gdmFsaWRhdG9ycztcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcblxuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjaGFuZ2VzKTtcbiAgICBpZiAoa2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgIGlmICghY2hhbmdlc1trZXldLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgICAgIC8vIG9uIGFueSBpbnB1dCBjaGFuZ2UsIGZvcmNlIHNjaGVtYSBjaGFuZ2UgZ2VuZXJhdGlvblxuICAgICAgICAgIHRoaXMudGVtcGxhdGVTY2hlbWFTZXJ2aWNlLmNoYW5nZWQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICB9XG5cblxuICBwcml2YXRlIGdldE9uZU9mKCkge1xuXG4gICAgaWYgKHRoaXMuY2hpbGRJdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuY2hpbGRJdGVtcy5tYXAoKHsgdmFsdWUsIGRlc2NyaXB0aW9uIH0pID0+IHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHsgZW51bTogW3ZhbHVlXSwgZGVzY3JpcHRpb24gfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgZW51bTogdmFsdWUsIGRlc2NyaXB0aW9uIH07XG4gICAgfSk7XG5cbiAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW1zO1xuICB9XG5cblxuICBwcml2YXRlIHNldFRpdGxlRnJvbUNvbnRlbnQoKSB7XG4gICAgY29uc3QgdGV4dENvbnRlbnQgPSB0aGlzLmdldFRleHRDb250ZW50KHRoaXMuZWxlbWVudFJlZik7XG5cbiAgICAvLyAgdGl0bGUgYXMgQElucHV0IHRha2VzIHByaW9yaXR5IG92ZXIgY29udGVudCB0ZXh0XG4gICAgaWYgKHRleHRDb250ZW50ICYmICF0aGlzLnRpdGxlKSB7XG4gICAgICB0aGlzLnRpdGxlID0gdGV4dENvbnRlbnQ7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuXG4gICAgLy8gY2FjaGUgaXRcbiAgICB0aGlzLnNldFRpdGxlRnJvbUNvbnRlbnQoKTtcblxuICAgIG1lcmdlKFxuICAgICAgdGhpcy5jaGlsZEZpZWxkcy5jaGFuZ2VzLFxuICAgICAgdGhpcy5jaGlsZEl0ZW1zLmNoYW5nZXMsXG4gICAgICB0aGlzLmNoaWxkQnV0dG9ucy5jaGFuZ2VzXG4gICAgKVxuICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy50ZW1wbGF0ZVNjaGVtYVNlcnZpY2UuY2hhbmdlZCgpKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgUXVlcnlMaXN0LFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBIb3N0QmluZGluZyxcbiAgU2ltcGxlQ2hhbmdlLFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRm9ybUNvbXBvbmVudCB9IGZyb20gJy4uL2Zvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IEFjdGlvblJlZ2lzdHJ5IH0gZnJvbSAnLi4vbW9kZWwvYWN0aW9ucmVnaXN0cnknO1xuaW1wb3J0IHsgVmFsaWRhdG9yUmVnaXN0cnkgfSBmcm9tICcuLi9tb2RlbC92YWxpZGF0b3JyZWdpc3RyeSc7XG5pbXBvcnQgeyBUZXJtaW5hdG9yU2VydmljZSB9IGZyb20gJy4uL3Rlcm1pbmF0b3Iuc2VydmljZSc7XG5cbmltcG9ydCB7IFRlbXBsYXRlU2NoZW1hU2VydmljZSB9IGZyb20gJy4vdGVtcGxhdGUtc2NoZW1hLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmllbGRDb21wb25lbnQgfSBmcm9tICcuL2ZpZWxkL2ZpZWxkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWVsZFR5cGUsIEZpZWxkIH0gZnJvbSAnLi9maWVsZC9maWVsZCc7XG5pbXBvcnQgeyBCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2J1dHRvbi9idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IEZpZWxkUGFyZW50IH0gZnJvbSAnLi9maWVsZC9maWVsZC1wYXJlbnQnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3NmLWZvcm1bdGVtcGxhdGVTY2hlbWFdJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAgVGVtcGxhdGVTY2hlbWFTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVTY2hlbWFEaXJlY3RpdmUgZXh0ZW5kcyBGaWVsZFBhcmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRmllbGRDb21wb25lbnQpXG4gIGNoaWxkRmllbGRzOiBRdWVyeUxpc3Q8RmllbGRDb21wb25lbnQ+O1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQnV0dG9uQ29tcG9uZW50KVxuICBjaGlsZEJ1dHRvbnM6IFF1ZXJ5TGlzdDxCdXR0b25Db21wb25lbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhY3Rpb25SZWdpc3RyeTogQWN0aW9uUmVnaXN0cnksXG4gICAgcHJvdGVjdGVkIHZhbGlkYXRvclJlZ2lzdHJ5OiBWYWxpZGF0b3JSZWdpc3RyeSxcbiAgICBwcml2YXRlIGZvcm1Db21wb25lbnQ6IEZvcm1Db21wb25lbnQsXG4gICAgcHJpdmF0ZSB0ZXJtaW5hdG9yU2VydmljZTogVGVybWluYXRvclNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0ZW1wbGF0ZVNjaGVtYVNlcnZpY2U6IFRlbXBsYXRlU2NoZW1hU2VydmljZVxuICApIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgc2V0Rm9ybURvY3VtZW50U2NoZW1hKGZpZWxkczogRmllbGRDb21wb25lbnRbXSkge1xuICAgICAgdGhpcy5hY3Rpb25SZWdpc3RyeS5jbGVhcigpO1xuICAgICAgdGhpcy52YWxpZGF0b3JSZWdpc3RyeS5jbGVhcigpO1xuXG4gICAgICBjb25zdCBzY2hlbWEgPSB0aGlzLmdldEZpZWxkc1NjaGVtYShmaWVsZHMpO1xuXG4gICAgICBjb25zdCB2YWxpZGF0b3JzID0gdGhpcy5nZXRGaWVsZHNWYWxpZGF0b3JzKGZpZWxkcyk7XG4gICAgICB2YWxpZGF0b3JzLmZvckVhY2goKHsgcGF0aCwgdmFsaWRhdG9yIH0pID0+IHtcbiAgICAgICAgdGhpcy52YWxpZGF0b3JSZWdpc3RyeS5yZWdpc3RlcihwYXRoLCB2YWxpZGF0b3IpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHByZXZpb3VzU2NoZW1hID0gdGhpcy5mb3JtQ29tcG9uZW50LnNjaGVtYTtcbiAgICAgIHRoaXMuZm9ybUNvbXBvbmVudC5zY2hlbWEgPSB7XG4gICAgICAgIHR5cGU6IEZpZWxkVHlwZS5PYmplY3QsXG4gICAgICAgIHByb3BlcnRpZXM6IHNjaGVtYS5wcm9wZXJ0aWVzXG4gICAgICB9O1xuXG4gICAgICBpZiAoc2NoZW1hLnJlcXVpcmVkICYmIHNjaGVtYS5yZXF1aXJlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZm9ybUNvbXBvbmVudC5zY2hlbWEucmVxdXJlZCA9IHNjaGVtYS5yZXF1aXJlZDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYnV0dG9ucyA9IHRoaXMuZ2V0QnV0dG9ucygpO1xuICAgICAgaWYgKGJ1dHRvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmZvcm1Db21wb25lbnQuc2NoZW1hLmJ1dHRvbnMgPSBidXR0b25zO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZvcm1Db21wb25lbnQubmdPbkNoYW5nZXMoe1xuICAgICAgICBzY2hlbWE6IG5ldyBTaW1wbGVDaGFuZ2UoXG4gICAgICAgICAgcHJldmlvdXNTY2hlbWEsXG4gICAgICAgICAgdGhpcy5mb3JtQ29tcG9uZW50LnNjaGVtYSxcbiAgICAgICAgICBCb29sZWFuKHByZXZpb3VzU2NoZW1hKVxuICAgICAgICApXG4gICAgICB9KTtcblxuICB9XG5cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG5cbiAgICBpZiAodGhpcy5jaGlsZEZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnNldEZvcm1Eb2N1bWVudFNjaGVtYSh0aGlzLmNoaWxkRmllbGRzLnRvQXJyYXkoKSk7XG4gICAgfVxuXG4gICAgbWVyZ2UoXG4gICAgICB0aGlzLmNoaWxkRmllbGRzLmNoYW5nZXMsXG4gICAgICB0aGlzLnRlbXBsYXRlU2NoZW1hU2VydmljZS5jaGFuZ2VzXG4gICAgKVxuICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnRlcm1pbmF0b3JTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuc2V0Rm9ybURvY3VtZW50U2NoZW1hKHRoaXMuY2hpbGRGaWVsZHMudG9BcnJheSgpKTtcbiAgICB9KTtcblxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBGaWVsZENvbXBvbmVudCB9IGZyb20gJy4vZmllbGQvZmllbGQuY29tcG9uZW50JztcbmltcG9ydCB7IFRlbXBsYXRlU2NoZW1hRGlyZWN0aXZlIH0gZnJvbSAnLi90ZW1wbGF0ZS1zY2hlbWEuZGlyZWN0aXZlJztcbmltcG9ydCB7IEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vYnV0dG9uL2J1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vZmllbGQvaXRlbS9pdGVtLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgVGVtcGxhdGVTY2hlbWFEaXJlY3RpdmUsXG4gICAgRmllbGRDb21wb25lbnQsXG4gICAgQnV0dG9uQ29tcG9uZW50LFxuICAgIEl0ZW1Db21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFRlbXBsYXRlU2NoZW1hRGlyZWN0aXZlLFxuICAgIEZpZWxkQ29tcG9uZW50LFxuICAgIEJ1dHRvbkNvbXBvbmVudCxcbiAgICBJdGVtQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVTY2hlbWFNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiQmVoYXZpb3JTdWJqZWN0IiwidHNsaWJfMS5fX3ZhbHVlcyIsIm1hcCIsImNvbWJpbmVMYXRlc3QiLCJkaXN0aW5jdFVudGlsQ2hhbmdlZCIsInRzbGliXzEuX19leHRlbmRzIiwiSW5qZWN0YWJsZSIsIkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciIsIlN1YmplY3QiLCJFdmVudEVtaXR0ZXIiLCJDb21wb25lbnQiLCJOR19WQUxVRV9BQ0NFU1NPUiIsIkNoYW5nZURldGVjdG9yUmVmIiwiSW5wdXQiLCJPdXRwdXQiLCJGb3JtQ29udHJvbCIsIlJlbmRlcmVyMiIsIkVsZW1lbnRSZWYiLCJWaWV3Q2hpbGQiLCJWaWV3Q29udGFpbmVyUmVmIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiLCJmb3J3YXJkUmVmIiwibWVyZ2UiLCJDb250ZW50Q2hpbGRyZW4iLCJTaW1wbGVDaGFuZ2UiLCJEaXJlY3RpdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQTtRQUFBO1lBQ0UsWUFBTyxHQUE0QixFQUFFLENBQUM7U0FhdkM7Ozs7UUFYQyw4QkFBSzs7O1lBQUw7Z0JBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7YUFDbkI7Ozs7OztRQUVELGlDQUFROzs7OztZQUFSLFVBQVMsUUFBZ0IsRUFBRSxNQUFjO2dCQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQzthQUNqQzs7Ozs7UUFFRCw0QkFBRzs7OztZQUFILFVBQUksUUFBZ0I7Z0JBQ2xCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUMvQjtRQUNILHFCQUFDO0lBQUQsQ0FBQzs7SUNoQkQ7Ozs7Ozs7Ozs7Ozs7O0lBY0E7SUFFQSxJQUFJLGFBQWEsR0FBRyxVQUFTLENBQUMsRUFBRSxDQUFDO1FBQzdCLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYzthQUNoQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxDQUFDLGNB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