/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
/**
 * @abstract
 */
var /**
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
                errors = errors.concat.apply(errors, tslib_1.__spread(newErrors));
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
                                    for (var properties_1 = tslib_1.__values(properties), properties_1_1 = properties_1.next(); !properties_1_1.done; properties_1_1 = properties_1.next()) {
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
                                                        for (var _c = tslib_1.__values(_this.schema.visibleIf.allOf), _d = _c.next(); !_d.done; _d = _c.next()) {
                                                            var item = _d.value;
                                                            try {
                                                                for (var _e = tslib_1.__values(Object.keys(item)), _f = _e.next(); !_f.done; _f = _e.next()) {
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
                for (var visibleIfOf_1 = tslib_1.__values(visibleIfOf), visibleIfOf_1_1 = visibleIfOf_1.next(); !visibleIfOf_1_1.done; visibleIfOf_1_1 = visibleIfOf_1.next()) {
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
                            for (var properties_2 = tslib_1.__values(properties), properties_2_1 = properties_2.next(); !properties_2_1.done; properties_2_1 = properties_2.next()) {
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
            for (var paths_1 = tslib_1.__values(paths), paths_1_1 = paths_1.next(); !paths_1_1.done; paths_1_1 = paths_1.next()) {
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
export { FormProperty };
if (false) {
    /** @type {?} */
    FormProperty.prototype.schemaValidator;
    /** @type {?} */
    FormProperty.prototype._value;
    /** @type {?} */
    FormProperty.prototype._errors;
    /** @type {?} */
    FormProperty.prototype._valueChanges;
    /** @type {?} */
    FormProperty.prototype._errorsChanges;
    /** @type {?} */
    FormProperty.prototype._visible;
    /** @type {?} */
    FormProperty.prototype._visibilityChanges;
    /** @type {?} */
    FormProperty.prototype._root;
    /** @type {?} */
    FormProperty.prototype._parent;
    /** @type {?} */
    FormProperty.prototype._path;
    /** @type {?} */
    FormProperty.prototype._propertyBindingRegistry;
    /** @type {?} */
    FormProperty.prototype._canonicalPath;
    /** @type {?} */
    FormProperty.prototype.validatorRegistry;
    /** @type {?} */
    FormProperty.prototype.schema;
    /**
     * @abstract
     * @param {?} value
     * @param {?} onlySelf
     * @return {?}
     */
    FormProperty.prototype.setValue = function (value, onlySelf) { };
    /**
     * @abstract
     * @param {?} value
     * @param {?} onlySelf
     * @return {?}
     */
    FormProperty.prototype.reset = function (value, onlySelf) { };
    /**
     * \@internal
     * @abstract
     * @return {?}
     */
    FormProperty.prototype._hasValue = function () { };
    /**
     * \@internal
     * @abstract
     * @return {?}
     */
    FormProperty.prototype._updateValue = function () { };
}
/**
 * @abstract
 */
var /**
 * @abstract
 */
PropertyGroup = /** @class */ (function (_super) {
    tslib_1.__extends(PropertyGroup, _super);
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
                            for (var propertyGroupChildren_1 = tslib_1.__values(propertyGroupChildren), propertyGroupChildren_1_1 = propertyGroupChildren_1.next(); !propertyGroupChildren_1_1.done; propertyGroupChildren_1_1 = propertyGroupChildren_1.next()) {
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
                            for (var rebind_1 = tslib_1.__values(rebind), rebind_1_1 = rebind_1.next(); !rebind_1_1.done; rebind_1_1 = rebind_1.next()) {
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
                        for (var rebindAll_1 = tslib_1.__values(rebindAll), rebindAll_1_1 = rebindAll_1.next(); !rebindAll_1_1.done; rebindAll_1_1 = rebindAll_1.next()) {
                            var _property = rebindAll_1_1.value;
                            if (_property instanceof FormProperty) {
                                try {
                                    /** @type {?} */
                                    var rebindPaths = findPropertiesToRebind(_property);
                                    try {
                                        for (var rebindPaths_1 = tslib_1.__values(rebindPaths), rebindPaths_1_1 = rebindPaths_1.next(); !rebindPaths_1_1.done; rebindPaths_1_1 = rebindPaths_1.next()) {
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
 * @abstract
 */
export { PropertyGroup };
if (false) {
    /** @type {?} */
    PropertyGroup.prototype._properties;
    /** @type {?} */
    PropertyGroup.prototype._propertyProxyHandler;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXByb3BlcnR5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL21vZGVsL2Zvcm1wcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxlQUFlLEVBQUUsYUFBYSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3BELE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQU16RDs7OztJQWVFLHNCQUFZLHNCQUE4QyxFQUN0QyxpQkFBb0MsRUFDckMsTUFBVyxFQUNsQixNQUFxQixFQUNyQixJQUFZO1FBSEosc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNyQyxXQUFNLEdBQU4sTUFBTSxDQUFLO1FBZDlCLFdBQU0sR0FBUSxJQUFJLENBQUM7UUFDbkIsWUFBTyxHQUFRLElBQUksQ0FBQztRQUNaLGtCQUFhLEdBQUcsSUFBSSxlQUFlLENBQU0sSUFBSSxDQUFDLENBQUM7UUFDL0MsbUJBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBTSxJQUFJLENBQUMsQ0FBQztRQUNoRCxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLHVCQUFrQixHQUFHLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxDQUFDO1FBWTlELElBQUksQ0FBQyxlQUFlLEdBQUcsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTdFLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQzFCO2FBQU0sSUFBSSxJQUFJLFlBQVksYUFBYSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsbUJBQWUsbUJBQUssSUFBSSxFQUFBLEVBQUEsQ0FBQztTQUN2QztRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxzQkFBVyxzQ0FBWTs7OztRQUF2QjtZQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHVDQUFhOzs7O1FBQXhCO1lBQ0UsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsOEJBQUk7Ozs7UUFBZjtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxnQ0FBTTs7OztRQUFqQjtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDhCQUFJOzs7O1FBQWY7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLElBQUksbUJBQWUsbUJBQUssSUFBSSxFQUFBLEVBQUEsQ0FBQztRQUNoRCxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDhCQUFJOzs7O1FBQWY7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywrQkFBSzs7OztRQUFoQjtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGlDQUFPOzs7O1FBQWxCO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsK0JBQUs7Ozs7UUFBaEI7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDO1FBQy9CLENBQUM7OztPQUFBOzs7Ozs7SUFNTSw2Q0FBc0I7Ozs7O0lBQTdCLFVBQThCLFFBQWdCLEVBQUUsU0FBZ0I7UUFBbEMseUJBQUEsRUFBQSxnQkFBZ0I7UUFBRSwwQkFBQSxFQUFBLGdCQUFnQjtRQUM5RCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsSUFBSSxTQUFTLEVBQUU7WUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEM7UUFFRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdEIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3pEO0lBRUgsQ0FBQztJQVlEOztPQUVHOzs7OztJQUNJLHFDQUFjOzs7O0lBQXJCOztZQUNNLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFOztZQUNoRCxlQUFlLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzNELElBQUksZUFBZSxFQUFFOztnQkFDZixZQUFZLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNyRSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7U0FDakQ7UUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDZjtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7OztJQUVPLGtDQUFXOzs7OztJQUFuQixVQUFvQixNQUFNLEVBQUUsU0FBUztRQUNuQyxJQUFJLFNBQVMsRUFBRTtZQUNiLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDNUIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLE9BQWIsTUFBTSxtQkFBVyxTQUFTLEVBQUMsQ0FBQzthQUN0QztpQkFBTTtnQkFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3hCO1NBQ0Y7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7OztJQUVPLGdDQUFTOzs7O0lBQWpCLFVBQWtCLE1BQU07UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFTSxtQ0FBWTs7OztJQUFuQixVQUFvQixNQUFNO1FBQ3hCLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFFRCxxQ0FBYzs7OztJQUFkLFVBQWUsSUFBWTs7WUFDckIsSUFBSSxHQUFpQixJQUFJOztZQUN6QixJQUFJLEdBQWtCLElBQUk7O1lBRTFCLE1BQU0sR0FBRyxJQUFJO1FBQ2pCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtZQUNuQixJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzQzthQUFNO1lBQ0wsT0FBTyxNQUFNLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO2dCQUM5QyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQzFCLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pDO1NBQ0Y7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7O0lBRU0sK0JBQVE7OztJQUFmOztZQUNNLFFBQVEsR0FBaUIsSUFBSTtRQUNqQyxPQUFPLFFBQVEsQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQy9CLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1NBQzVCO1FBQ0QsT0FBTyxtQkFBZSxRQUFRLEVBQUEsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVPLGlDQUFVOzs7O0lBQWxCLFVBQW1CLE9BQWdCO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDakQ7SUFDSCxDQUFDOzs7O0lBRU8sdUNBQWdCOzs7SUFBeEI7UUFBQSxpQkFzRkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFyRU8saUJBQWlCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTOztZQUN6QyxXQUFXLEdBQUcsQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLO1FBQ3RGLElBQUksV0FBVyxFQUFFO29DQUNKLFNBQVM7Z0JBQ2xCLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDeEUsT0FBSyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3hCO3FCQUFNLElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRTs7d0JBQzVCLGlCQUFpQixHQUFHLEVBQUU7NENBQ2pCLGNBQWM7O3dCQUN2QixJQUFJLFNBQVMsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEVBQUU7O2dDQUN0QyxVQUFVLEdBQUcsT0FBSyxjQUFjLFNBQU8sY0FBYyxDQUFDOzRCQUM1RCxJQUFJLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRTs7b0NBQzdCLEtBQXVCLElBQUEsZUFBQSxpQkFBQSxVQUFVLENBQUEsc0NBQUEsOERBQUU7d0NBQTlCLElBQU0sUUFBUSx1QkFBQTt3Q0FDakIsSUFBSSxRQUFRLEVBQUU7O2dEQUNSLFVBQVUsU0FBQTs0Q0FDZCxJQUFJLE9BQUssTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUU7Z0RBQy9CLFVBQVUsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ3pDLFVBQUEsS0FBSztvREFDSCxJQUFJLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7d0RBQ3JELE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7cURBQ3pCO3lEQUFNO3dEQUNMLE9BQU8sU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztxREFDeEQ7Z0RBQ0gsQ0FBQyxDQUNGLENBQUMsQ0FBQzs2Q0FDSjtpREFBTSxJQUFJLE9BQUssTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUU7O29EQUNoQyxJQUFJLEdBQUcsVUFBQyxLQUFLOzs7d0RBQ2pCLEtBQW1CLElBQUEsS0FBQSxpQkFBQSxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUEsZ0JBQUEsNEJBQUU7NERBQTNDLElBQU0sSUFBSSxXQUFBOztnRUFDYixLQUFzQixJQUFBLEtBQUEsaUJBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtvRUFBcEMsSUFBTSxPQUFPLFdBQUE7O3dFQUNWLElBQUksR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQzs7d0VBQ25DLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTTs7d0VBQ3ZCLEtBQUssR0FBRyxLQUFLO29FQUNqQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7d0VBQ3pDLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztxRUFDNUI7eUVBQU07d0VBQ0wsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7cUVBQy9DO29FQUNELElBQUksQ0FBQyxLQUFLLEVBQUU7d0VBQ1YsT0FBTyxLQUFLLENBQUM7cUVBQ2Q7aUVBQ0Y7Ozs7Ozs7Ozt5REFDRjs7Ozs7Ozs7O29EQUNELE9BQU8sSUFBSSxDQUFDO2dEQUNkLENBQUM7Z0RBQ0QsVUFBVSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzZDQUNwRDs7Z0RBQ0ssZUFBZSxHQUFHLFFBQVEsQ0FBQyxrQkFBa0I7O2dEQUM3QyxHQUFHLEdBQUcsYUFBYSxDQUFDLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxFQUFFLFVBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSyxPQUFBLEVBQUUsSUFBSSxFQUFFLEVBQVIsQ0FBUSxDQUFDOzRDQUM5RSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7eUNBQzdCO3FDQUNGOzs7Ozs7Ozs7NkJBQ0Y7aUNBQU07Z0NBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxjQUFjLEdBQUcsMkJBQTJCLEdBQUcsT0FBSyxJQUFJLENBQUMsQ0FBQztnQ0FDakcsT0FBSyxnQ0FBZ0MsQ0FBQyxjQUFjLFNBQU8sQ0FBQztnQ0FDNUQsOEJBQThCO2dDQUM5QixPQUFLLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs2QkFDeEI7eUJBQ0Y7O29CQWpESCxLQUFLLElBQU0sY0FBYyxJQUFJLFNBQVM7Z0NBQTNCLGNBQWM7cUJBa0R4QjtvQkFFRCxhQUFhLENBQUMsaUJBQWlCLEVBQUU7d0JBQUMsZ0JBQW9COzZCQUFwQixVQUFvQixFQUFwQixxQkFBb0IsRUFBcEIsSUFBb0I7NEJBQXBCLDJCQUFvQjs7d0JBQ3BELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDckMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxPQUFPO3dCQUNoRCxLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMzQixDQUFDLENBQUMsQ0FBQztpQkFDSjtZQUNILENBQUM7OztnQkEvREQsS0FBd0IsSUFBQSxnQkFBQSxpQkFBQSxXQUFXLENBQUEsd0NBQUE7b0JBQTlCLElBQU0sU0FBUyx3QkFBQTs0QkFBVCxTQUFTO2lCQStEbkI7Ozs7Ozs7OztZQUNELE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRUQsNEdBQTRHOzs7OztJQUNyRyxzQ0FBZTs7Ozs7SUFBdEI7UUFBQSxpQkEyQ0M7UUExQ0MsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsT0FBTzs7WUFDTCxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTO1FBQ3JDLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN4RSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hCO2FBQU0sSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFOztnQkFDOUIsaUJBQWlCLEdBQUcsRUFBRTtvQ0FDakIsY0FBYzs7Z0JBQ3JCLElBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRTs7d0JBQ3RDLFVBQVUsR0FBRyxPQUFLLGNBQWMsU0FBTyxjQUFjLENBQUM7b0JBQzVELElBQUksQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFOzs0QkFDN0IsS0FBdUIsSUFBQSxlQUFBLGlCQUFBLFVBQVUsQ0FBQSxzQ0FBQSw4REFBRTtnQ0FBOUIsSUFBTSxRQUFRLHVCQUFBO2dDQUNqQixJQUFJLFFBQVEsRUFBRTs7d0NBQ04sVUFBVSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FDL0MsVUFBQSxLQUFLO3dDQUNILElBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTs0Q0FDckQsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzt5Q0FDekI7NkNBQU07NENBQ0wsT0FBTyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3lDQUN4RDtvQ0FDSCxDQUFDLENBQ0YsQ0FBQzs7d0NBQ0ksZUFBZSxHQUFHLFFBQVEsQ0FBQyxrQkFBa0I7O3dDQUM3QyxHQUFHLEdBQUcsYUFBYSxDQUFDLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxFQUFFLFVBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSyxPQUFBLEVBQUUsSUFBSSxFQUFFLEVBQVIsQ0FBUSxDQUFDO29DQUM5RSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUNBQzdCOzZCQUNGOzs7Ozs7Ozs7cUJBQ0Y7eUJBQU07d0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxjQUFjLEdBQUcsMkJBQTJCLEdBQUcsT0FBSyxJQUFJLENBQUMsQ0FBQzt3QkFDakcsT0FBSyxnQ0FBZ0MsQ0FBQyxjQUFjLFNBQU8sQ0FBQzt3QkFDNUQsOEJBQThCO3dCQUM5QixPQUFLLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDeEI7aUJBQ0Y7OztZQTFCSCxLQUFLLElBQUksY0FBYyxJQUFJLFNBQVM7d0JBQTNCLGNBQWM7YUEyQnRCO1lBRUQsYUFBYSxDQUFDLGlCQUFpQixFQUFFO2dCQUFDLGdCQUFvQjtxQkFBcEIsVUFBb0IsRUFBcEIscUJBQW9CLEVBQXBCLElBQW9CO29CQUFwQiwyQkFBb0I7O2dCQUNwRCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxPQUFPO2dCQUNoRCxLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7Ozs7SUFFTyx1REFBZ0M7Ozs7O0lBQXhDLFVBQXlDLGNBQXNCLEVBQUUsWUFBMEI7UUFDekYsWUFBWSxDQUFDLHdCQUF3QixDQUFDLDZCQUE2QixFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0csQ0FBQztJQUdEOzs7OztPQUtHOzs7Ozs7OztJQUNILHFDQUFjOzs7Ozs7O0lBQWQsVUFBZSxNQUFvQixFQUFFLFlBQW9COzs7WUFDakQsS0FBSyxHQUFtQixFQUFFOztZQUMxQixLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUM7O1lBQzFELEtBQW1CLElBQUEsVUFBQSxpQkFBQSxLQUFLLENBQUEsNEJBQUEsK0NBQUU7Z0JBQXJCLElBQU0sSUFBSSxrQkFBQTs7b0JBQ1AsQ0FBQyxHQUFpQixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztnQkFDbkQsSUFBSSxDQUFDLEVBQUU7b0JBQ0wsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDZjthQUNGOzs7Ozs7Ozs7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFDSCx3Q0FBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQWpCLFVBQWtCLE1BQW9CLEVBQUUsSUFBWSxFQUFFLFVBQW1COztZQUNqRSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDNUIsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7O2dCQUNQLE9BQU8sR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTs7Z0JBQ3BELE9BQU8sR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJOztnQkFDakQsSUFBSSxHQUFpQixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQzs7Z0JBQ3JELFNBQVMsR0FBRyxFQUFFO1lBQ2xCLElBQUksSUFBSSxZQUFZLGFBQWEsRUFBRTs7b0JBQzNCLE9BQU8sR0FBRyxtQkFBQSxJQUFJLENBQUMsVUFBVSxFQUFrQjtnQkFDakQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O3dCQUNqQyxhQUFhLEdBQUcsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLEdBQUcsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTzs7d0JBQy9GLGdCQUFnQixHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxHQUFHLE9BQU8sR0FBRyxDQUFDO29CQUN6RCxJQUFJLENBQUMsQ0FBQyxLQUFLLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ3JDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7cUJBQy9COzt3QkFDSyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQztvQkFDdkYsU0FBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztpQkFDakQ7YUFDRjtZQUNELE9BQU8sU0FBUyxDQUFDO1NBQ2xCO1FBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFuWEQsSUFtWEM7Ozs7Ozs7SUFsWEMsdUNBQWlDOztJQUVqQyw4QkFBbUI7O0lBQ25CLCtCQUFvQjs7SUFDcEIscUNBQXVEOztJQUN2RCxzQ0FBd0Q7O0lBQ3hELGdDQUF3Qjs7SUFDeEIsMENBQWdFOztJQUNoRSw2QkFBNkI7O0lBQzdCLCtCQUErQjs7SUFDL0IsNkJBQXNCOztJQUN0QixnREFBa0Q7O0lBQ2xELHNDQUF1Qjs7SUFHWCx5Q0FBNEM7O0lBQzVDLDhCQUFrQjs7Ozs7OztJQWtEOUIsaUVBQXdEOzs7Ozs7O0lBRXhELDhEQUFxRDs7Ozs7O0lBb0JyRCxtREFBcUM7Ozs7OztJQUtyQyxzREFBK0I7Ozs7O0FBdVJqQzs7OztJQUE0Qyx5Q0FBWTtJQUF4RDtRQUFBLHFFQWlLQztRQS9KQyxpQkFBVyxHQUFxRCxJQUFJLENBQUM7UUFhN0QsMkJBQXFCLEdBQW1FO1lBQzlGOzs7ZUFHRztZQUNILEdBQUc7Ozs7Ozs7OztZQUFILFVBQUksTUFBc0QsRUFBRSxDQUFjLEVBQUUsS0FBVSxFQUFFLFFBQWE7Ozs7O29CQUs3RixtQkFBbUIsR0FBRyxVQUFDLGFBQWtCOzs7d0JBQ3ZDLFlBQVksR0FBRyxtQkFBQSxhQUFhLEVBQWdCO29CQUNsRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksYUFBYSxZQUFZLFlBQVksRUFBRTs7Ozs7Ozs0QkFNNUQsZ0JBQWdCLEdBQUcsVUFBQyxZQUFvQixFQUFFLFlBQW9COztnQ0FDOUQsR0FBRzs0QkFDUCxJQUFJLFlBQVksSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0NBQ2hFLE9BQU8sWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDLFFBQVEsRUFBRSxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDOzZCQUNuRzt3QkFDSCxDQUFDO3dCQUNELElBQUksWUFBWSxFQUFFOzRCQUNoQixZQUFZLENBQUMsY0FBYyxHQUFHLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsbUJBQUEsQ0FBQyxFQUFVLENBQUMsQ0FBQzt5QkFDMUY7cUJBQ0Y7O3dCQUVLLGFBQWEsR0FBRyxtQkFBQSxZQUFZLEVBQWlCOzt3QkFDN0MscUJBQXFCLEdBQUcsbUJBQUEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUN0RSxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQzFCLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFrQjtvQkFDbEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFOzs0QkFDNUM7Ozs7K0JBSUc7NEJBQ0gsS0FBb0IsSUFBQSwwQkFBQSxpQkFBQSxxQkFBcUIsQ0FBQSw0REFBQSwrRkFBRTtnQ0FBdEMsSUFBTSxLQUFLLGtDQUFBO2dDQUNkLEtBQUssQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzZCQUMvRzs7Ozs7Ozs7O3FCQUNGO29CQUNELE9BQU8sRUFBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxxQkFBcUIsRUFBQyxDQUFDO2dCQUNuRSxDQUFDO2dCQUNLLElBQUEsK0JBQWlELEVBQWhELHNCQUFRLEVBQUUsc0JBQXNDOzs7OztvQkFLakQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxtQkFBQSxDQUFDLEVBQVUsQ0FBQyxHQUFHLEtBQUs7Ozs7O29CQUtwQyxnQkFBZ0IsR0FBRzs7O3dCQUNqQixTQUFTLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDOzt3QkFDdkMsc0JBQXNCLEdBQUcsVUFBQyxZQUEwQjs7OzRCQUNsRCxnQkFBZ0IsR0FBRyxZQUFZLENBQUMsd0JBQXdCLENBQUMsNkJBQTZCLEVBQUU7OzRCQUMxRixNQUFNLEdBQWEsRUFBRTt3QkFDekIsSUFBSSxZQUFZLENBQUMsY0FBYyxFQUFFOzRCQUMvQixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNoSCxJQUFJLFlBQVksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dDQUMvQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzs2QkFDOUg7eUJBQ0Y7d0JBQ0QsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO3dCQUN2RixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFOzRCQUNyQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDcEg7OzRCQUNLLFlBQVksR0FBRyxFQUFFOzs0QkFDdkIsS0FBbUIsSUFBQSxXQUFBLGlCQUFBLE1BQU0sQ0FBQSw4QkFBQSxrREFBRTtnQ0FBdEIsSUFBTSxJQUFJLG1CQUFBO2dDQUNiLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7NkJBQzNCOzs7Ozs7Ozs7d0JBQ0QsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNuQyxDQUFDOzt3QkFDRCxLQUF3QixJQUFBLGNBQUEsaUJBQUEsU0FBUyxDQUFBLG9DQUFBLDJEQUFFOzRCQUE5QixJQUFNLFNBQVMsc0JBQUE7NEJBQ2xCLElBQUksU0FBUyxZQUFZLFlBQVksRUFBRTtnQ0FDckMsSUFBSTs7d0NBQ0ksV0FBVyxHQUFHLHNCQUFzQixDQUFDLFNBQVMsQ0FBQzs7d0NBQ3JELEtBQTZCLElBQUEsZ0JBQUEsaUJBQUEsV0FBVyxDQUFBLHdDQUFBLGlFQUFFOzRDQUFyQyxJQUFNLGNBQWMsd0JBQUE7O2dEQUNqQixVQUFVLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7NENBQzNELFVBQVUsQ0FBQyxlQUFlLEVBQUUsQ0FBQzt5Q0FDOUI7Ozs7Ozs7OztpQ0FDRjtnQ0FBQyxPQUFPLENBQUMsRUFBRTtvQ0FDVixPQUFPLENBQUMsS0FBSyxDQUFDLHFDQUFxQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQ0FDakc7NkJBQ0Y7eUJBQ0Y7Ozs7Ozs7OztnQkFDSCxDQUFDO2dCQUNELGdCQUFnQixFQUFFLENBQUM7Z0JBRW5CLE9BQU8sTUFBTSxDQUFDO1lBQ2hCLENBQUM7WUFDRCxHQUFHOzs7Ozs7WUFBSCxVQUFJLE1BQXNELEVBQUUsQ0FBYyxFQUFFLFFBQWE7Z0JBQ3ZGLE9BQU8sTUFBTSxDQUFDLG1CQUFBLENBQUMsRUFBVSxDQUFDLENBQUM7WUFDN0IsQ0FBQztZQUNELGNBQWM7Ozs7O1lBQWQsVUFBZSxNQUFzRCxFQUFFLENBQWM7Z0JBQ25GLE9BQU8sT0FBTyxNQUFNLENBQUMsbUJBQUEsQ0FBQyxFQUFVLENBQUMsQ0FBQztZQUNwQyxDQUFDO1NBQ0YsQ0FBQzs7SUE4Q0osQ0FBQztJQTdKQyxzQkFBSSxxQ0FBVTs7OztRQUFkO1lBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzFCLENBQUM7Ozs7O1FBRUQsVUFBZSxVQUE0RDtZQUN6RTs7ZUFFRztZQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7OztPQVBBOzs7OztJQStHRCxtQ0FBVzs7OztJQUFYLFVBQVksSUFBWTs7WUFDbEIsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDOztZQUM5QixVQUFVLEdBQUcsVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTs7WUFFbEUsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1FBQzFDLElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxVQUFVLEtBQUssQ0FBQyxDQUFDLElBQUksUUFBUSxZQUFZLGFBQWEsRUFBRTs7Z0JBQzNFLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDekMsUUFBUSxHQUFHLENBQUMsbUJBQWUsUUFBUSxFQUFBLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDM0Q7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDOzs7OztJQUVNLG9DQUFZOzs7O0lBQW5CLFVBQW9CLEVBQXFEO1FBQ3ZFLEtBQUssSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN0QyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFOztvQkFDMUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO2dCQUMxQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQzFCO1NBQ0Y7SUFDSCxDQUFDOzs7OztJQUVNLDZDQUFxQjs7OztJQUE1QixVQUE2QixFQUF3QztRQUNuRSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQUMsS0FBSztZQUN0QixFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDVixJQUFJLEtBQUssWUFBWSxhQUFhLEVBQUU7Z0JBQ2xDLENBQUMsbUJBQWUsS0FBSyxFQUFBLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNsRDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVNLHVDQUFlOzs7SUFBdEI7UUFDRSxpQkFBTSxlQUFlLFdBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7O0lBRU8sZ0RBQXdCOzs7SUFBaEM7UUFDRSxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBQyxRQUFRO1lBQ2xDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFTSw4QkFBTTs7O0lBQWI7UUFDRSxPQUFPLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUFqS0QsQ0FBNEMsWUFBWSxHQWlLdkQ7Ozs7Ozs7SUEvSkMsb0NBQXFFOztJQWFyRSw4Q0FvR0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2Rpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtTY2hlbWFWYWxpZGF0b3JGYWN0b3J5fSBmcm9tICcuLi9zY2hlbWF2YWxpZGF0b3JmYWN0b3J5JztcbmltcG9ydCB7VmFsaWRhdG9yUmVnaXN0cnl9IGZyb20gJy4vdmFsaWRhdG9ycmVnaXN0cnknO1xuaW1wb3J0IHtQcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeX0gZnJvbSAnLi4vcHJvcGVydHktYmluZGluZy1yZWdpc3RyeSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGb3JtUHJvcGVydHkge1xuICBwdWJsaWMgc2NoZW1hVmFsaWRhdG9yOiBGdW5jdGlvbjtcblxuICBfdmFsdWU6IGFueSA9IG51bGw7XG4gIF9lcnJvcnM6IGFueSA9IG51bGw7XG4gIHByaXZhdGUgX3ZhbHVlQ2hhbmdlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcbiAgcHJpdmF0ZSBfZXJyb3JzQ2hhbmdlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcbiAgcHJpdmF0ZSBfdmlzaWJsZSA9IHRydWU7XG4gIHByaXZhdGUgX3Zpc2liaWxpdHlDaGFuZ2VzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgcHJpdmF0ZSBfcm9vdDogUHJvcGVydHlHcm91cDtcbiAgcHJpdmF0ZSBfcGFyZW50OiBQcm9wZXJ0eUdyb3VwO1xuICBwcml2YXRlIF9wYXRoOiBzdHJpbmc7XG4gIF9wcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeTogUHJvcGVydHlCaW5kaW5nUmVnaXN0cnk7XG4gIF9jYW5vbmljYWxQYXRoOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3Ioc2NoZW1hVmFsaWRhdG9yRmFjdG9yeTogU2NoZW1hVmFsaWRhdG9yRmFjdG9yeSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSB2YWxpZGF0b3JSZWdpc3RyeTogVmFsaWRhdG9yUmVnaXN0cnksXG4gICAgICAgICAgICAgIHB1YmxpYyBzY2hlbWE6IGFueSxcbiAgICAgICAgICAgICAgcGFyZW50OiBQcm9wZXJ0eUdyb3VwLFxuICAgICAgICAgICAgICBwYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNjaGVtYVZhbGlkYXRvciA9IHNjaGVtYVZhbGlkYXRvckZhY3RvcnkuY3JlYXRlVmFsaWRhdG9yRm4odGhpcy5zY2hlbWEpO1xuXG4gICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHRoaXMuX3Jvb3QgPSBwYXJlbnQucm9vdDtcbiAgICB9IGVsc2UgaWYgKHRoaXMgaW5zdGFuY2VvZiBQcm9wZXJ0eUdyb3VwKSB7XG4gICAgICB0aGlzLl9yb290ID0gPFByb3BlcnR5R3JvdXA+PGFueT50aGlzO1xuICAgIH1cbiAgICB0aGlzLl9wYXRoID0gcGF0aDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmFsdWVDaGFuZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZUNoYW5nZXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGVycm9yc0NoYW5nZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Vycm9yc0NoYW5nZXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zY2hlbWEudHlwZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGFyZW50KCk6IFByb3BlcnR5R3JvdXAge1xuICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHJvb3QoKTogUHJvcGVydHlHcm91cCB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvb3QgfHwgPFByb3BlcnR5R3JvdXA+PGFueT50aGlzO1xuICB9XG5cbiAgcHVibGljIGdldCBwYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3BhdGg7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmFsaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Vycm9ycyA9PT0gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBzZXRWYWx1ZSh2YWx1ZTogYW55LCBvbmx5U2VsZjogYm9vbGVhbik7XG5cbiAgcHVibGljIGFic3RyYWN0IHJlc2V0KHZhbHVlOiBhbnksIG9ubHlTZWxmOiBib29sZWFuKTtcblxuICBwdWJsaWMgdXBkYXRlVmFsdWVBbmRWYWxpZGl0eShvbmx5U2VsZiA9IGZhbHNlLCBlbWl0RXZlbnQgPSB0cnVlKSB7XG4gICAgdGhpcy5fdXBkYXRlVmFsdWUoKTtcblxuICAgIGlmIChlbWl0RXZlbnQpIHtcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2VzLm5leHQodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5fcnVuVmFsaWRhdGlvbigpO1xuXG4gICAgaWYgKHRoaXMucGFyZW50ICYmICFvbmx5U2VsZikge1xuICAgICAgdGhpcy5wYXJlbnQudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShvbmx5U2VsZiwgZW1pdEV2ZW50KTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBfaGFzVmFsdWUoKTogYm9vbGVhbjtcblxuICAvKipcbiAgICogIEBpbnRlcm5hbFxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IF91cGRhdGVWYWx1ZSgpO1xuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHB1YmxpYyBfcnVuVmFsaWRhdGlvbigpOiBhbnkge1xuICAgIGxldCBlcnJvcnMgPSB0aGlzLnNjaGVtYVZhbGlkYXRvcih0aGlzLl92YWx1ZSkgfHwgW107XG4gICAgbGV0IGN1c3RvbVZhbGlkYXRvciA9IHRoaXMudmFsaWRhdG9yUmVnaXN0cnkuZ2V0KHRoaXMucGF0aCk7XG4gICAgaWYgKGN1c3RvbVZhbGlkYXRvcikge1xuICAgICAgbGV0IGN1c3RvbUVycm9ycyA9IGN1c3RvbVZhbGlkYXRvcih0aGlzLnZhbHVlLCB0aGlzLCB0aGlzLmZpbmRSb290KCkpO1xuICAgICAgZXJyb3JzID0gdGhpcy5tZXJnZUVycm9ycyhlcnJvcnMsIGN1c3RvbUVycm9ycyk7XG4gICAgfVxuICAgIGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICBlcnJvcnMgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuX2Vycm9ycyA9IGVycm9ycztcbiAgICB0aGlzLnNldEVycm9ycyh0aGlzLl9lcnJvcnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBtZXJnZUVycm9ycyhlcnJvcnMsIG5ld0Vycm9ycykge1xuICAgIGlmIChuZXdFcnJvcnMpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG5ld0Vycm9ycykpIHtcbiAgICAgICAgZXJyb3JzID0gZXJyb3JzLmNvbmNhdCguLi5uZXdFcnJvcnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXJyb3JzLnB1c2gobmV3RXJyb3JzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVycm9ycztcbiAgfVxuXG4gIHByaXZhdGUgc2V0RXJyb3JzKGVycm9ycykge1xuICAgIHRoaXMuX2Vycm9ycyA9IGVycm9ycztcbiAgICB0aGlzLl9lcnJvcnNDaGFuZ2VzLm5leHQoZXJyb3JzKTtcbiAgfVxuXG4gIHB1YmxpYyBleHRlbmRFcnJvcnMoZXJyb3JzKSB7XG4gICAgZXJyb3JzID0gdGhpcy5tZXJnZUVycm9ycyh0aGlzLl9lcnJvcnMgfHwgW10sIGVycm9ycyk7XG4gICAgdGhpcy5zZXRFcnJvcnMoZXJyb3JzKTtcbiAgfVxuXG4gIHNlYXJjaFByb3BlcnR5KHBhdGg6IHN0cmluZyk6IEZvcm1Qcm9wZXJ0eSB7XG4gICAgbGV0IHByb3A6IEZvcm1Qcm9wZXJ0eSA9IHRoaXM7XG4gICAgbGV0IGJhc2U6IFByb3BlcnR5R3JvdXAgPSBudWxsO1xuXG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgaWYgKHBhdGhbMF0gPT09ICcvJykge1xuICAgICAgYmFzZSA9IHRoaXMuZmluZFJvb3QoKTtcbiAgICAgIHJlc3VsdCA9IGJhc2UuZ2V0UHJvcGVydHkocGF0aC5zdWJzdHIoMSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aGlsZSAocmVzdWx0ID09PSBudWxsICYmIHByb3AucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHByb3AgPSBiYXNlID0gcHJvcC5wYXJlbnQ7XG4gICAgICAgIHJlc3VsdCA9IGJhc2UuZ2V0UHJvcGVydHkocGF0aCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgZmluZFJvb3QoKTogUHJvcGVydHlHcm91cCB7XG4gICAgbGV0IHByb3BlcnR5OiBGb3JtUHJvcGVydHkgPSB0aGlzO1xuICAgIHdoaWxlIChwcm9wZXJ0eS5wYXJlbnQgIT09IG51bGwpIHtcbiAgICAgIHByb3BlcnR5ID0gcHJvcGVydHkucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gPFByb3BlcnR5R3JvdXA+cHJvcGVydHk7XG4gIH1cblxuICBwcml2YXRlIHNldFZpc2libGUodmlzaWJsZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Zpc2libGUgPSB2aXNpYmxlO1xuICAgIHRoaXMuX3Zpc2liaWxpdHlDaGFuZ2VzLm5leHQodmlzaWJsZSk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICB0aGlzLnBhcmVudC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KGZhbHNlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9fYmluZFZpc2liaWxpdHkoKTogYm9vbGVhbiB7XG4gICAgLyoqXG4gICAgICogPHByZT5cbiAgICAgKiAgICAgXCJvbmVPZlwiOlt7XG4gICAgICogICAgICAgICBcInBhdGhcIjpbXCJ2YWx1ZVwiLFwidmFsdWVcIl1cbiAgICAgKiAgICAgfSx7XG4gICAgICogICAgICAgICBcInBhdGhcIjpbXCJ2YWx1ZVwiLFwidmFsdWVcIl1cbiAgICAgKiAgICAgfV1cbiAgICAgKiAgICAgPC9wcmU+XG4gICAgICogPHByZT5cbiAgICAgKiAgICAgXCJhbGxPZlwiOlt7XG4gICAgICogICAgICAgICBcInBhdGhcIjpbXCJ2YWx1ZVwiLFwidmFsdWVcIl1cbiAgICAgKiAgICAgfSx7XG4gICAgICogICAgICAgICBcInBhdGhcIjpbXCJ2YWx1ZVwiLFwidmFsdWVcIl1cbiAgICAgKiAgICAgfV1cbiAgICAgKiAgICAgPC9wcmU+XG4gICAgICovXG4gICAgY29uc3QgdmlzaWJsZUlmUHJvcGVydHkgPSB0aGlzLnNjaGVtYS52aXNpYmxlSWY7XG4gICAgY29uc3QgdmlzaWJsZUlmT2YgPSAodmlzaWJsZUlmUHJvcGVydHkgfHwge30pLm9uZU9mIHx8ICh2aXNpYmxlSWZQcm9wZXJ0eSB8fCB7fSkuYWxsT2Y7XG4gICAgaWYgKHZpc2libGVJZk9mKSB7XG4gICAgICBmb3IgKGNvbnN0IHZpc2libGVJZiBvZiB2aXNpYmxlSWZPZikge1xuICAgICAgICBpZiAodHlwZW9mIHZpc2libGVJZiA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXModmlzaWJsZUlmKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLnNldFZpc2libGUoZmFsc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHZpc2libGVJZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3QgcHJvcGVydGllc0JpbmRpbmcgPSBbXTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGRlcGVuZGVuY3lQYXRoIGluIHZpc2libGVJZikge1xuICAgICAgICAgICAgaWYgKHZpc2libGVJZi5oYXNPd25Qcm9wZXJ0eShkZXBlbmRlbmN5UGF0aCkpIHtcbiAgICAgICAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMuZmluZFByb3BlcnRpZXModGhpcywgZGVwZW5kZW5jeVBhdGgpO1xuICAgICAgICAgICAgICBpZiAoKHByb3BlcnRpZXMgfHwgW10pLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcGVydHkgb2YgcHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZUNoZWNrO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2hlbWEudmlzaWJsZUlmLm9uZU9mKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWVDaGVjayA9IHByb3BlcnR5LnZhbHVlQ2hhbmdlcy5waXBlKG1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZpc2libGVJZltkZXBlbmRlbmN5UGF0aF0uaW5kZXhPZignJEFOWSQnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID4gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmlzaWJsZUlmW2RlcGVuZGVuY3lQYXRoXS5pbmRleE9mKHZhbHVlKSAhPT0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNjaGVtYS52aXNpYmxlSWYuYWxsT2YpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBfY2hrID0gKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5zY2hlbWEudmlzaWJsZUlmLmFsbE9mKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZGVwUGF0aCBvZiBPYmplY3Qua2V5cyhpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3AgPSB0aGlzLnNlYXJjaFByb3BlcnR5KGRlcFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3BWYWwgPSBwcm9wLl92YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbVtkZXBQYXRoXS5pbmRleE9mKCckQU5ZJCcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBwcm9wVmFsLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkID0gaXRlbVtkZXBQYXRoXS5pbmRleE9mKHByb3BWYWwpICE9PSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZUNoZWNrID0gcHJvcGVydHkudmFsdWVDaGFuZ2VzLnBpcGUobWFwKF9jaGspKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aXNpYmlsaXR5Q2hlY2sgPSBwcm9wZXJ0eS5fdmlzaWJpbGl0eUNoYW5nZXM7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFuZCA9IGNvbWJpbmVMYXRlc3QoW3ZhbHVlQ2hlY2ssIHZpc2liaWxpdHlDaGVja10sICh2MSwgdjIpID0+IHYxICYmIHYyKTtcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc0JpbmRpbmcucHVzaChhbmQpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NhblxcJ3QgZmluZCBwcm9wZXJ0eSAnICsgZGVwZW5kZW5jeVBhdGggKyAnIGZvciB2aXNpYmlsaXR5IGNoZWNrIG9mICcgKyB0aGlzLnBhdGgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJNaXNzaW5nVmlzaWJpbGl0eUJpbmRpbmcoZGVwZW5kZW5jeVBhdGgsIHRoaXMpO1xuICAgICAgICAgICAgICAgIC8vIG5vdCB2aXNpYmxlIGlmIG5vdCBleGlzdGVudFxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb21iaW5lTGF0ZXN0KHByb3BlcnRpZXNCaW5kaW5nLCAoLi4udmFsdWVzOiBib29sZWFuW10pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXMuaW5kZXhPZih0cnVlKSAhPT0gLTE7XG4gICAgICAgICAgfSkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKS5zdWJzY3JpYmUoKHZpc2libGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmlzaWJsZSh2aXNpYmxlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgLy8gQSBmaWVsZCBpcyB2aXNpYmxlIGlmIEFUIExFQVNUIE9ORSBvZiB0aGUgcHJvcGVydGllcyBpdCBkZXBlbmRzIG9uIGlzIHZpc2libGUgQU5EIGhhcyBhIHZhbHVlIGluIHRoZSBsaXN0XG4gIHB1YmxpYyBfYmluZFZpc2liaWxpdHkoKSB7XG4gICAgaWYgKHRoaXMuX19iaW5kVmlzaWJpbGl0eSgpKVxuICAgICAgcmV0dXJuO1xuICAgIGxldCB2aXNpYmxlSWYgPSB0aGlzLnNjaGVtYS52aXNpYmxlSWY7XG4gICAgaWYgKHR5cGVvZiB2aXNpYmxlSWYgPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKHZpc2libGVJZikubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnNldFZpc2libGUoZmFsc2UpO1xuICAgIH0gZWxzZSBpZiAodmlzaWJsZUlmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCBwcm9wZXJ0aWVzQmluZGluZyA9IFtdO1xuICAgICAgZm9yIChsZXQgZGVwZW5kZW5jeVBhdGggaW4gdmlzaWJsZUlmKSB7XG4gICAgICAgIGlmICh2aXNpYmxlSWYuaGFzT3duUHJvcGVydHkoZGVwZW5kZW5jeVBhdGgpKSB7XG4gICAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMuZmluZFByb3BlcnRpZXModGhpcywgZGVwZW5kZW5jeVBhdGgpO1xuICAgICAgICAgIGlmICgocHJvcGVydGllcyB8fCBbXSkubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHByb3BlcnR5IG9mIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgaWYgKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVDaGVjayA9IHByb3BlcnR5LnZhbHVlQ2hhbmdlcy5waXBlKG1hcChcbiAgICAgICAgICAgICAgICAgIHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpc2libGVJZltkZXBlbmRlbmN5UGF0aF0uaW5kZXhPZignJEFOWSQnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID4gMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmlzaWJsZUlmW2RlcGVuZGVuY3lQYXRoXS5pbmRleE9mKHZhbHVlKSAhPT0gLTE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2aXNpYmlsaXR5Q2hlY2sgPSBwcm9wZXJ0eS5fdmlzaWJpbGl0eUNoYW5nZXM7XG4gICAgICAgICAgICAgICAgY29uc3QgYW5kID0gY29tYmluZUxhdGVzdChbdmFsdWVDaGVjaywgdmlzaWJpbGl0eUNoZWNrXSwgKHYxLCB2MikgPT4gdjEgJiYgdjIpO1xuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNCaW5kaW5nLnB1c2goYW5kKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NhblxcJ3QgZmluZCBwcm9wZXJ0eSAnICsgZGVwZW5kZW5jeVBhdGggKyAnIGZvciB2aXNpYmlsaXR5IGNoZWNrIG9mICcgKyB0aGlzLnBhdGgpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3Rlck1pc3NpbmdWaXNpYmlsaXR5QmluZGluZyhkZXBlbmRlbmN5UGF0aCwgdGhpcyk7XG4gICAgICAgICAgICAvLyBub3QgdmlzaWJsZSBpZiBub3QgZXhpc3RlbnRcbiAgICAgICAgICAgIHRoaXMuc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbWJpbmVMYXRlc3QocHJvcGVydGllc0JpbmRpbmcsICguLi52YWx1ZXM6IGJvb2xlYW5bXSkgPT4ge1xuICAgICAgICByZXR1cm4gdmFsdWVzLmluZGV4T2YodHJ1ZSkgIT09IC0xO1xuICAgICAgfSkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKS5zdWJzY3JpYmUoKHZpc2libGUpID0+IHtcbiAgICAgICAgdGhpcy5zZXRWaXNpYmxlKHZpc2libGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWdpc3Rlck1pc3NpbmdWaXNpYmlsaXR5QmluZGluZyhkZXBlbmRlbmN5UGF0aDogc3RyaW5nLCBmb3JtUHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSkge1xuICAgIGZvcm1Qcm9wZXJ0eS5fcHJvcGVydHlCaW5kaW5nUmVnaXN0cnkuZ2V0UHJvcGVydHlCaW5kaW5nc1Zpc2liaWxpdHkoKS5hZGQoZGVwZW5kZW5jeVBhdGgsIGZvcm1Qcm9wZXJ0eS5wYXRoKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEZpbmRzIGFsbCA8Y29kZT5mb3JtUHJvcGVydGllczwvY29kZT4gZnJvbSBhIHBhdGggd2l0aCB3aWxkY2FyZHMuPGJyLz5cbiAgICogZS5nOiA8Y29kZT4vZ2FyYWdlL2NhcnMvJiM0MjsvdGlyZXMvJiM0MjsvbmFtZTwvY29kZT48YnIvPlxuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqIEBwYXJhbSBwcm9wZXJ0eVBhdGhcbiAgICovXG4gIGZpbmRQcm9wZXJ0aWVzKHRhcmdldDogRm9ybVByb3BlcnR5LCBwcm9wZXJ0eVBhdGg6IHN0cmluZyk6IEZvcm1Qcm9wZXJ0eVtdIHtcbiAgICBjb25zdCBwcm9wczogRm9ybVByb3BlcnR5W10gPSBbXTtcbiAgICBjb25zdCBwYXRocyA9IHRoaXMuZmluZFByb3BlcnR5UGF0aHModGFyZ2V0LCBwcm9wZXJ0eVBhdGgpO1xuICAgIGZvciAoY29uc3QgcGF0aCBvZiBwYXRocykge1xuICAgICAgY29uc3QgcDogRm9ybVByb3BlcnR5ID0gdGFyZ2V0LnNlYXJjaFByb3BlcnR5KHBhdGgpO1xuICAgICAgaWYgKHApIHtcbiAgICAgICAgcHJvcHMucHVzaChwKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgY2Fub25pY2FsIHBhdGhzIGZyb20gYSBwYXRoIHdpdGggd2lsZGNhcmRzLlxuICAgKiBlLmc6PGJyLz5cbiAgICogRnJvbTo8YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvJiM0MjsvdGlyZXMvJiM0MjsvbmFtZTwvY29kZT48YnIvPlxuICAgKiBpdCBjcmVhdGVzOjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8wL3RpcmVzLzAvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMC90aXJlcy8xL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLzAvdGlyZXMvMi9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8wL3RpcmVzLzMvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMS90aXJlcy8wL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLzIvdGlyZXMvMS9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8zL3RpcmVzLzIvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMy90aXJlcy8zL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLyYjNDI7L3RpcmVzLyYjNDI7L25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLyYjNDI7L3RpcmVzLzIvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvJiM0MjsvdGlyZXMvMy9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxici8+ZXRjLi4uXG4gICAqIEBwYXJhbSB0YXJnZXRcbiAgICogQHBhcmFtIHBhdGhcbiAgICogQHBhcmFtIHBhcmVudFBhdGhcbiAgICovXG4gIGZpbmRQcm9wZXJ0eVBhdGhzKHRhcmdldDogRm9ybVByb3BlcnR5LCBwYXRoOiBzdHJpbmcsIHBhcmVudFBhdGg/OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgaXggPSBwYXRoLmluZGV4T2YoJyonKTtcbiAgICBpZiAoLTEgIT09IGl4KSB7XG4gICAgICBjb25zdCBwcmVQYXRoID0gaXggPiAtMSA/IHBhdGguc3Vic3RyaW5nKDAsIGl4IC0gMSkgOiBwYXRoO1xuICAgICAgY29uc3Qgc3ViUGF0aCA9IGl4ID4gLTEgPyBwYXRoLnN1YnN0cmluZyhpeCArIDEpIDogcGF0aDtcbiAgICAgIGNvbnN0IHByb3A6IEZvcm1Qcm9wZXJ0eSA9IHRhcmdldC5zZWFyY2hQcm9wZXJ0eShwcmVQYXRoKTtcbiAgICAgIGxldCBwYXRoRm91bmQgPSBbXTtcbiAgICAgIGlmIChwcm9wIGluc3RhbmNlb2YgUHJvcGVydHlHcm91cCkge1xuICAgICAgICBjb25zdCBhcnJQcm9wID0gcHJvcC5wcm9wZXJ0aWVzIGFzIEZvcm1Qcm9wZXJ0eVtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyclByb3AubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjdXJyZUl0ZW1QYXRoID0gKHBhcmVudFBhdGggfHwgJycpICsgcHJlUGF0aCArIChwcmVQYXRoLmVuZHNXaXRoKCcvJykgPyAnJyA6ICcvJykgKyBpICsgc3ViUGF0aDtcbiAgICAgICAgICBjb25zdCBjdXJyZUl0ZW1QcmVQYXRoID0gKHBhcmVudFBhdGggfHwgJycpICsgcHJlUGF0aCArIGk7XG4gICAgICAgICAgaWYgKC0xID09PSBjdXJyZUl0ZW1QYXRoLmluZGV4T2YoJyonKSkge1xuICAgICAgICAgICAgcGF0aEZvdW5kLnB1c2goY3VycmVJdGVtUGF0aCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGNoaWxkcmVuUGF0aEZvdW5kID0gdGhpcy5maW5kUHJvcGVydHlQYXRocyhhcnJQcm9wW2ldLCBzdWJQYXRoLCBjdXJyZUl0ZW1QcmVQYXRoKTtcbiAgICAgICAgICBwYXRoRm91bmQgPSBwYXRoRm91bmQuY29uY2F0KGNoaWxkcmVuUGF0aEZvdW5kKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHBhdGhGb3VuZDtcbiAgICB9XG4gICAgcmV0dXJuIFtwYXRoXTtcbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJvcGVydHlHcm91cCBleHRlbmRzIEZvcm1Qcm9wZXJ0eSB7XG5cbiAgX3Byb3BlcnRpZXM6IEZvcm1Qcm9wZXJ0eVtdIHwgeyBba2V5OiBzdHJpbmddOiBGb3JtUHJvcGVydHkgfSA9IG51bGw7XG5cbiAgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXM7XG4gIH1cblxuICBzZXQgcHJvcGVydGllcyhwcm9wZXJ0aWVzOiBGb3JtUHJvcGVydHlbXSB8IHsgW2tleTogc3RyaW5nXTogRm9ybVByb3BlcnR5IH0pIHtcbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGUgc2V0dGVyIHRvIGFkZCBhbiBvYnNlcnZlciB0aGF0IG5vdGljZXMgd2hlbiBhbiBpdGVtIGlzIGFkZGVkIG9yIHJlbW92ZWQuPGJyLz5cbiAgICAgKi9cbiAgICB0aGlzLl9wcm9wZXJ0aWVzID0gbmV3IFByb3h5KHByb3BlcnRpZXMsIHRoaXMuX3Byb3BlcnR5UHJveHlIYW5kbGVyKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Byb3BlcnR5UHJveHlIYW5kbGVyOiBQcm94eUhhbmRsZXI8Rm9ybVByb3BlcnR5W10gfCB7IFtrZXk6IHN0cmluZ106IEZvcm1Qcm9wZXJ0eSB9PiA9IHtcbiAgICAvKipcbiAgICAgKiBXaGVuIGEgbmV3IGl0ZW0gaXMgYWRkZWQgaXQgd2lsbCBiZSBjaGVja2VkIGZvciB2aXNpYmlsaXR5IHVwZGF0ZXMgdG8gcHJvY2VlZCA8YnIvPlxuICAgICAqIGlmIGFueSBvdGhlciBmaWVsZCBoYXMgYSBiaW5kaW5nIHJlZmVyZW5jZSB0byBpdC48YnIvPlxuICAgICAqL1xuICAgIHNldCh0YXJnZXQ6IEZvcm1Qcm9wZXJ0eVtdIHwgeyBbcDogc3RyaW5nXTogRm9ybVByb3BlcnR5IH0sIHA6IFByb3BlcnR5S2V5LCB2YWx1ZTogYW55LCByZWNlaXZlcjogYW55KTogYm9vbGVhbiB7XG5cbiAgICAgIC8qKlxuICAgICAgICogMSkgTWFrZSBzdXJlIGEgY2Fub25pY2FsIHBhdGggaXMgc2V0XG4gICAgICAgKi9cbiAgICAgIGNvbnN0IGFzc2VydENhbm9uaWNhbFBhdGggPSAocHJvcGVydHlWYWx1ZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm1Qcm9wZXJ0eSA9IHByb3BlcnR5VmFsdWUgYXMgRm9ybVByb3BlcnR5O1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIHByb3BlcnR5VmFsdWUgaW5zdGFuY2VvZiBGb3JtUHJvcGVydHkpIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBDcmVhdGUgYSBjYW5vbmljYWwgcGF0aCByZXBsYWNpbmcgdGhlIGxhc3QgJyonIHdpdGggdGhlIGVsZW1lbnRzIHBvc2l0aW9uIGluIGFycmF5XG4gICAgICAgICAgICogQHBhcmFtIHByb3BlcnR5UGF0aFxuICAgICAgICAgICAqIEBwYXJhbSBpbmRleE9mQ2hpbGRcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBjb25zdCBnZXRDYW5vbmljYWxQYXRoID0gKHByb3BlcnR5UGF0aDogc3RyaW5nLCBpbmRleE9mQ2hpbGQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgbGV0IHBvcztcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eVBhdGggJiYgLTEgIT09IChwb3MgPSBwcm9wZXJ0eVBhdGgubGFzdEluZGV4T2YoJyonKSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5UGF0aC5zdWJzdHJpbmcoMCwgcG9zKSArIGluZGV4T2ZDaGlsZC50b1N0cmluZygpICsgcHJvcGVydHlQYXRoLnN1YnN0cmluZyhwb3MgKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmIChmb3JtUHJvcGVydHkpIHtcbiAgICAgICAgICAgIGZvcm1Qcm9wZXJ0eS5fY2Fub25pY2FsUGF0aCA9IGdldENhbm9uaWNhbFBhdGgoZm9ybVByb3BlcnR5Ll9jYW5vbmljYWxQYXRoLCBwIGFzIG51bWJlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvcGVydHlHcm91cCA9IGZvcm1Qcm9wZXJ0eSBhcyBQcm9wZXJ0eUdyb3VwO1xuICAgICAgICBjb25zdCBwcm9wZXJ0eUdyb3VwQ2hpbGRyZW4gPSAoQXJyYXkuaXNBcnJheShwcm9wZXJ0eUdyb3VwLnByb3BlcnRpZXMpID9cbiAgICAgICAgICBwcm9wZXJ0eUdyb3VwLnByb3BlcnRpZXMgOlxuICAgICAgICAgIE9iamVjdC52YWx1ZXMocHJvcGVydHlHcm91cC5wcm9wZXJ0aWVzIHx8IHt9KSkgYXMgRm9ybVByb3BlcnR5W107XG4gICAgICAgIGlmICgoZm9ybVByb3BlcnR5LnBhdGggfHwgJycpLmVuZHNXaXRoKCcvKicpKSB7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSWYgaXQgaXMgYW4gYXJyYXksIHRoZW4gYWxsIGNoaWxkcmVuIGNhbm9uaWNhbCBwYXRocyBtdXN0IGJlIGNvbXB1dGVkIG5vdy5cbiAgICAgICAgICAgKiBUaGUgY2hpbGRyZW4gZG9uJ3QgaGF2ZSB0aGUgcGFyZW50J3MgcGF0aCBzZWdtZW50IHNldCB5ZXQsXG4gICAgICAgICAgICogYmVjYXVzZSB0aGV5IGFyZSBjcmVhdGVkIGJlZm9yZSB0aGUgcGFyZW50IGdldHMgYXR0YWNoZWQgdG8gaXRzIHBhcmVudC5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHByb3BlcnR5R3JvdXBDaGlsZHJlbikge1xuICAgICAgICAgICAgY2hpbGQuX2Nhbm9uaWNhbFBhdGggPSBmb3JtUHJvcGVydHkuX2Nhbm9uaWNhbFBhdGggKyBjaGlsZC5fY2Fub25pY2FsUGF0aC5zdWJzdHJpbmcoZm9ybVByb3BlcnR5LnBhdGgubGVuZ3RoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtwcm9wZXJ0eTogZm9ybVByb3BlcnR5LCBjaGlsZHJlbjogcHJvcGVydHlHcm91cENoaWxkcmVufTtcbiAgICAgIH07XG4gICAgICBjb25zdCB7cHJvcGVydHksIGNoaWxkcmVufSA9IGFzc2VydENhbm9uaWNhbFBhdGgodmFsdWUpO1xuXG4gICAgICAvKipcbiAgICAgICAqIDIpIEFkZCB0aGUgbmV3IHByb3BlcnR5IGJlZm9yZSByZWJpbmRpbmcsIHNvIGl0IGNhbiBiZSBmb3VuZCBieSA8Y29kZT5fYmluZFZpc2liaWxpdHk8L2NvZGU+XG4gICAgICAgKi9cbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRhcmdldFtwIGFzIHN0cmluZ10gPSB2YWx1ZTtcblxuICAgICAgLyoqXG4gICAgICAgKiAzKSBSZS1iaW5kIHRoZSB2aXNpYmlsaXR5IGJpbmRpbmdzIHJlZmVyZW5jaW5nIHRvIHRoaXMgY2Fub25pY2FsIHBhdGhzXG4gICAgICAgKi9cbiAgICAgIGNvbnN0IHJlYmluZFZpc2liaWxpdHkgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlYmluZEFsbCA9IFtwcm9wZXJ0eV0uY29uY2F0KGNoaWxkcmVuKTtcbiAgICAgICAgY29uc3QgZmluZFByb3BlcnRpZXNUb1JlYmluZCA9IChmb3JtUHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHByb3BlcnR5QmluZGluZ3MgPSBmb3JtUHJvcGVydHkuX3Byb3BlcnR5QmluZGluZ1JlZ2lzdHJ5LmdldFByb3BlcnR5QmluZGluZ3NWaXNpYmlsaXR5KCk7XG4gICAgICAgICAgbGV0IHJlYmluZDogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICBpZiAoZm9ybVByb3BlcnR5Ll9jYW5vbmljYWxQYXRoKSB7XG4gICAgICAgICAgICByZWJpbmQgPSByZWJpbmQuY29uY2F0KHJlYmluZC5jb25jYXQocHJvcGVydHlCaW5kaW5ncy5maW5kQnlEZXBlbmRlbmN5UGF0aChmb3JtUHJvcGVydHkuX2Nhbm9uaWNhbFBhdGgpIHx8IFtdKSk7XG4gICAgICAgICAgICBpZiAoZm9ybVByb3BlcnR5Ll9jYW5vbmljYWxQYXRoLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgICByZWJpbmQgPSByZWJpbmQuY29uY2F0KHJlYmluZC5jb25jYXQocHJvcGVydHlCaW5kaW5ncy5maW5kQnlEZXBlbmRlbmN5UGF0aChmb3JtUHJvcGVydHkuX2Nhbm9uaWNhbFBhdGguc3Vic3RyaW5nKDEpKSB8fCBbXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZWJpbmQgPSByZWJpbmQuY29uY2F0KHByb3BlcnR5QmluZGluZ3MuZmluZEJ5RGVwZW5kZW5jeVBhdGgoZm9ybVByb3BlcnR5LnBhdGgpIHx8IFtdKTtcbiAgICAgICAgICBpZiAoZm9ybVByb3BlcnR5LnBhdGguc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICByZWJpbmQgPSByZWJpbmQuY29uY2F0KHJlYmluZC5jb25jYXQocHJvcGVydHlCaW5kaW5ncy5maW5kQnlEZXBlbmRlbmN5UGF0aChmb3JtUHJvcGVydHkucGF0aC5zdWJzdHJpbmcoMSkpIHx8IFtdKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHVuaXF1ZVZhbHVlcyA9IHt9O1xuICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiByZWJpbmQpIHtcbiAgICAgICAgICAgIHVuaXF1ZVZhbHVlc1tpdGVtXSA9IGl0ZW07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh1bmlxdWVWYWx1ZXMpO1xuICAgICAgICB9O1xuICAgICAgICBmb3IgKGNvbnN0IF9wcm9wZXJ0eSBvZiByZWJpbmRBbGwpIHtcbiAgICAgICAgICBpZiAoX3Byb3BlcnR5IGluc3RhbmNlb2YgRm9ybVByb3BlcnR5KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCByZWJpbmRQYXRocyA9IGZpbmRQcm9wZXJ0aWVzVG9SZWJpbmQoX3Byb3BlcnR5KTtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCByZWJpbmRQcm9wUGF0aCBvZiByZWJpbmRQYXRocykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlYmluZFByb3AgPSBfcHJvcGVydHkuc2VhcmNoUHJvcGVydHkocmViaW5kUHJvcFBhdGgpO1xuICAgICAgICAgICAgICAgIHJlYmluZFByb3AuX2JpbmRWaXNpYmlsaXR5KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignUmViaW5kaW5nIHZpc2liaWxpdHkgZXJyb3IgYXQgcGF0aDonLCBfcHJvcGVydHkucGF0aCwgJ3Byb3BlcnR5OicsIF9wcm9wZXJ0eSwgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmViaW5kVmlzaWJpbGl0eSgpO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgZ2V0KHRhcmdldDogRm9ybVByb3BlcnR5W10gfCB7IFtwOiBzdHJpbmddOiBGb3JtUHJvcGVydHkgfSwgcDogUHJvcGVydHlLZXksIHJlY2VpdmVyOiBhbnkpOiBhbnkge1xuICAgICAgcmV0dXJuIHRhcmdldFtwIGFzIHN0cmluZ107XG4gICAgfSxcbiAgICBkZWxldGVQcm9wZXJ0eSh0YXJnZXQ6IEZvcm1Qcm9wZXJ0eVtdIHwgeyBbcDogc3RyaW5nXTogRm9ybVByb3BlcnR5IH0sIHA6IFByb3BlcnR5S2V5KTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gZGVsZXRlIHRhcmdldFtwIGFzIHN0cmluZ107XG4gICAgfVxuICB9O1xuXG4gIGdldFByb3BlcnR5KHBhdGg6IHN0cmluZykge1xuICAgIGxldCBzdWJQYXRoSWR4ID0gcGF0aC5pbmRleE9mKCcvJyk7XG4gICAgbGV0IHByb3BlcnR5SWQgPSBzdWJQYXRoSWR4ICE9PSAtMSA/IHBhdGguc3Vic3RyKDAsIHN1YlBhdGhJZHgpIDogcGF0aDtcblxuICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMucHJvcGVydGllc1twcm9wZXJ0eUlkXTtcbiAgICBpZiAocHJvcGVydHkgIT09IG51bGwgJiYgc3ViUGF0aElkeCAhPT0gLTEgJiYgcHJvcGVydHkgaW5zdGFuY2VvZiBQcm9wZXJ0eUdyb3VwKSB7XG4gICAgICBsZXQgc3ViUGF0aCA9IHBhdGguc3Vic3RyKHN1YlBhdGhJZHggKyAxKTtcbiAgICAgIHByb3BlcnR5ID0gKDxQcm9wZXJ0eUdyb3VwPnByb3BlcnR5KS5nZXRQcm9wZXJ0eShzdWJQYXRoKTtcbiAgICB9XG4gICAgcmV0dXJuIHByb3BlcnR5O1xuICB9XG5cbiAgcHVibGljIGZvckVhY2hDaGlsZChmbjogKGZvcm1Qcm9wZXJ0eTogRm9ybVByb3BlcnR5LCBzdHI6IFN0cmluZykgPT4gdm9pZCkge1xuICAgIGZvciAobGV0IHByb3BlcnR5SWQgaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG4gICAgICBpZiAodGhpcy5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5SWQpKSB7XG4gICAgICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMucHJvcGVydGllc1twcm9wZXJ0eUlkXTtcbiAgICAgICAgZm4ocHJvcGVydHksIHByb3BlcnR5SWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBmb3JFYWNoQ2hpbGRSZWN1cnNpdmUoZm46IChmb3JtUHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSkgPT4gdm9pZCkge1xuICAgIHRoaXMuZm9yRWFjaENoaWxkKChjaGlsZCkgPT4ge1xuICAgICAgZm4oY2hpbGQpO1xuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgUHJvcGVydHlHcm91cCkge1xuICAgICAgICAoPFByb3BlcnR5R3JvdXA+Y2hpbGQpLmZvckVhY2hDaGlsZFJlY3Vyc2l2ZShmbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgX2JpbmRWaXNpYmlsaXR5KCkge1xuICAgIHN1cGVyLl9iaW5kVmlzaWJpbGl0eSgpO1xuICAgIHRoaXMuX2JpbmRWaXNpYmlsaXR5UmVjdXJzaXZlKCk7XG4gIH1cblxuICBwcml2YXRlIF9iaW5kVmlzaWJpbGl0eVJlY3Vyc2l2ZSgpIHtcbiAgICB0aGlzLmZvckVhY2hDaGlsZFJlY3Vyc2l2ZSgocHJvcGVydHkpID0+IHtcbiAgICAgIHByb3BlcnR5Ll9iaW5kVmlzaWJpbGl0eSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGlzUm9vdCgpIHtcbiAgICByZXR1cm4gdGhpcyA9PT0gdGhpcy5yb290O1xuICB9XG59XG5cblxuIl19