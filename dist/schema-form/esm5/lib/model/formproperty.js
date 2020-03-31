import { __extends, __read, __spread, __values } from "tslib";
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
var FormProperty = /** @class */ (function () {
    function FormProperty(schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path) {
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
    Object.defineProperty(FormProperty.prototype, "_canonicalPath", {
        /**
         * Provides the unique path of this form element.<br/>
         * E.g.:
         * <code>/garage/cars</code>,<br/>
         * <code>/shop/book/0/page/1/</code>
         */
        get: function () { return this.__canonicalPath; },
        set: function (canonicalPath) {
            this.__canonicalPath = canonicalPath;
            this.__canonicalPathNotation = (this.__canonicalPath || '')
                .replace(new RegExp('^/', 'ig'), '')
                .replace(new RegExp('/$', 'ig'), '')
                .replace(new RegExp('/', 'ig'), '.');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormProperty.prototype, "canonicalPathNotation", {
        /**
         * Uses the unique path provided by the property <code>_canonicalPath</code><br/>
         * but converts it to a HTML Element Attribute ID compliant format.<br/>
         * E.g.:
         * <code>garage.cars</code>,<br/>
         * <code>shop.book.0.page.1.</code>
         */
        get: function () { return this.__canonicalPathNotation; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormProperty.prototype, "rootName", {
        /**
         * Provides the HTML Element Attribute ID/NAME compliant representation
         * of the root element.<br/>
         * Represents the HTML FORM NAME.<br/>
         * Only the root <code>FormProperty</code> will provide a value here.
         */
        get: function () { return this._rootName; },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates the HTML ID and NAME attribute compliant string.
     */
    FormProperty.prototype.createRootName = function () {
        if (this.schema && this.schema['name']) {
            return this._rootName = this.schema['name'].replace(new RegExp('[\\s]+', 'ig'), '_');
        }
        return '';
    };
    Object.defineProperty(FormProperty.prototype, "valueChanges", {
        get: function () {
            return this._valueChanges;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormProperty.prototype, "errorsChanges", {
        get: function () {
            return this._errorsChanges;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormProperty.prototype, "type", {
        get: function () {
            return this.schema.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormProperty.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormProperty.prototype, "root", {
        get: function () {
            return this._root || this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormProperty.prototype, "path", {
        get: function () {
            return this._path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormProperty.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormProperty.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormProperty.prototype, "valid", {
        get: function () {
            return this._errors === null;
        },
        enumerable: true,
        configurable: true
    });
    FormProperty.prototype.updateValueAndValidity = function (onlySelf, emitEvent) {
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
    FormProperty.prototype._runValidation = function () {
        var errors = this.schemaValidator(this._value) || [];
        var customValidator = this.validatorRegistry.get(this.path);
        if (customValidator) {
            var customErrors = customValidator(this.value, this, this.findRoot());
            errors = this.mergeErrors(errors, customErrors);
        }
        if (errors.length === 0) {
            errors = null;
        }
        this._errors = errors;
        this.setErrors(this._errors);
    };
    FormProperty.prototype.mergeErrors = function (errors, newErrors) {
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
    FormProperty.prototype.setErrors = function (errors) {
        this._errors = errors;
        this._errorsChanges.next(errors);
    };
    FormProperty.prototype.extendErrors = function (errors) {
        errors = this.mergeErrors(this._errors || [], errors);
        this.setErrors(errors);
    };
    FormProperty.prototype.searchProperty = function (path) {
        var prop = this;
        var base = null;
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
    FormProperty.prototype.findRoot = function () {
        var property = this;
        while (property.parent !== null) {
            property = property.parent;
        }
        return property;
    };
    FormProperty.prototype.setVisible = function (visible) {
        this._visible = visible;
        this._visibilityChanges.next(visible);
        this.updateValueAndValidity();
        if (this.parent) {
            this.parent.updateValueAndValidity(false, true);
        }
    };
    /**
     * Making use of the expression compiler for the <code>visibleIf</code> condition
     */
    FormProperty.prototype.__evaluateVisibilityIf = function (sourceProperty, targetProperty, dependencyPath, value, expression) {
        var e_1, _a;
        if (value === void 0) { value = ''; }
        if (expression === void 0) { expression = ''; }
        try {
            var valid = false;
            if (isNaN(expression) && expression.indexOf('$ANY$') !== -1) {
                valid = value && value.length > 0;
            }
            else if ((expression || []).toString().indexOf('$EXP$') === 0) {
                // since visibleIf condition values are an array... we must do this
                var expArray = Array.isArray(expression) ? expression : (expression ? [expression] : []);
                try {
                    for (var expArray_1 = __values(expArray), expArray_1_1 = expArray_1.next(); !expArray_1_1.done; expArray_1_1 = expArray_1.next()) {
                        var expString = expArray_1_1.value;
                        var _expresssion = expString.substring('$EXP$'.length);
                        valid = true === this.expressionCompilerVisibiltyIf.evaluate(_expresssion, {
                            source: sourceProperty,
                            target: targetProperty
                        });
                        if (valid) {
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (expArray_1_1 && !expArray_1_1.done && (_a = expArray_1.return)) _a.call(expArray_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else {
                valid = isNaN(value) ? value.indexOf(expression) !== -1 : value === expression;
            }
            return valid;
        }
        catch (error) {
            console.error('Error processing "VisibileIf" expression for path: ', dependencyPath, "source - " + sourceProperty._canonicalPath + ": ", sourceProperty, "target - " + targetProperty._canonicalPath + ": ", targetProperty, 'value:', value, 'expression: ', expression, 'error: ', error);
        }
    };
    FormProperty.prototype.__bindVisibility = function () {
        var e_2, _a;
        var _this = this;
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
        var visibleIfProperty = this.schema.visibleIf;
        var visibleIfOf = (visibleIfProperty || {}).oneOf || (visibleIfProperty || {}).allOf;
        if (visibleIfOf) {
            var _loop_1 = function (visibleIf) {
                if (typeof visibleIf === 'object' && Object.keys(visibleIf).length === 0) {
                    this_1.setVisible(false);
                }
                else if (visibleIf !== undefined) {
                    var propertiesBinding = [];
                    var _loop_2 = function (dependencyPath) {
                        var e_3, _a;
                        if (visibleIf.hasOwnProperty(dependencyPath)) {
                            var properties = this_1.findProperties(this_1, dependencyPath);
                            if ((properties || []).length) {
                                var _loop_3 = function (property) {
                                    if (property) {
                                        var valueCheck = void 0;
                                        if (this_1.schema.visibleIf.oneOf) {
                                            valueCheck = property.valueChanges.pipe(map(function (value) { return _this.__evaluateVisibilityIf(_this, property, dependencyPath, value, visibleIf[dependencyPath]); }));
                                        }
                                        else if (this_1.schema.visibleIf.allOf) {
                                            var _chk = function (value) {
                                                var e_4, _a, e_5, _b;
                                                try {
                                                    for (var _c = (e_4 = void 0, __values(_this.schema.visibleIf.allOf)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                                        var item = _d.value;
                                                        try {
                                                            for (var _e = (e_5 = void 0, __values(Object.keys(item))), _f = _e.next(); !_f.done; _f = _e.next()) {
                                                                var depPath = _f.value;
                                                                var prop = _this.searchProperty(depPath);
                                                                var propVal = prop.value;
                                                                if (!_this.__evaluateVisibilityIf(_this, prop, dependencyPath, propVal, item[depPath])) {
                                                                    return false;
                                                                }
                                                            }
                                                        }
                                                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                                        finally {
                                                            try {
                                                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                                                            }
                                                            finally { if (e_5) throw e_5.error; }
                                                        }
                                                    }
                                                }
                                                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                                finally {
                                                    try {
                                                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                                                    }
                                                    finally { if (e_4) throw e_4.error; }
                                                }
                                                return true;
                                            };
                                            valueCheck = property.valueChanges.pipe(map(_chk));
                                        }
                                        var visibilityCheck = property._visibilityChanges;
                                        var and = combineLatest([valueCheck, visibilityCheck], function (v1, v2) { return v1 && v2; });
                                        propertiesBinding.push(and);
                                    }
                                };
                                try {
                                    for (var properties_1 = (e_3 = void 0, __values(properties)), properties_1_1 = properties_1.next(); !properties_1_1.done; properties_1_1 = properties_1.next()) {
                                        var property = properties_1_1.value;
                                        _loop_3(property);
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (properties_1_1 && !properties_1_1.done && (_a = properties_1.return)) _a.call(properties_1);
                                    }
                                    finally { if (e_3) throw e_3.error; }
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
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (visibleIfOf_1_1 && !visibleIfOf_1_1.done && (_a = visibleIfOf_1.return)) _a.call(visibleIfOf_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return true;
        }
    };
    // A field is visible if AT LEAST ONE of the properties it depends on is visible AND has a value in the list
    FormProperty.prototype._bindVisibility = function () {
        var _this = this;
        if (this.__bindVisibility())
            return;
        var visibleIf = this.schema.visibleIf;
        if (typeof visibleIf === 'object' && Object.keys(visibleIf).length === 0) {
            this.setVisible(false);
        }
        else if (visibleIf !== undefined) {
            var propertiesBinding = [];
            var _loop_4 = function (dependencyPath) {
                var e_6, _a;
                if (visibleIf.hasOwnProperty(dependencyPath)) {
                    var properties = this_2.findProperties(this_2, dependencyPath);
                    if ((properties || []).length) {
                        var _loop_5 = function (property) {
                            if (property) {
                                var valueCheck = property.valueChanges.pipe(map(function (value) { return _this.__evaluateVisibilityIf(_this, property, dependencyPath, value, visibleIf[dependencyPath]); }));
                                var visibilityCheck = property._visibilityChanges;
                                var and = combineLatest([valueCheck, visibilityCheck], function (v1, v2) { return v1 && v2; });
                                propertiesBinding.push(and);
                            }
                        };
                        try {
                            for (var properties_2 = (e_6 = void 0, __values(properties)), properties_2_1 = properties_2.next(); !properties_2_1.done; properties_2_1 = properties_2.next()) {
                                var property = properties_2_1.value;
                                _loop_5(property);
                            }
                        }
                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                        finally {
                            try {
                                if (properties_2_1 && !properties_2_1.done && (_a = properties_2.return)) _a.call(properties_2);
                            }
                            finally { if (e_6) throw e_6.error; }
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
                _loop_4(dependencyPath);
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
    FormProperty.prototype.registerMissingVisibilityBinding = function (dependencyPath, formProperty) {
        formProperty._propertyBindingRegistry.getPropertyBindingsVisibility().add(dependencyPath, formProperty.path);
    };
    /**
     * Finds all <code>formProperties</code> from a path with wildcards.<br/>
     * e.g: <code>/garage/cars/&#42;/tires/&#42;/name</code><br/>
     * @param target
     * @param propertyPath
     */
    FormProperty.prototype.findProperties = function (target, propertyPath) {
        var e_7, _a;
        var props = [];
        var paths = this.findPropertyPaths(target, propertyPath);
        try {
            for (var paths_1 = __values(paths), paths_1_1 = paths_1.next(); !paths_1_1.done; paths_1_1 = paths_1.next()) {
                var path = paths_1_1.value;
                var p = target.searchProperty(path);
                if (p) {
                    props.push(p);
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return)) _a.call(paths_1);
            }
            finally { if (e_7) throw e_7.error; }
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
    FormProperty.prototype.findPropertyPaths = function (target, path, parentPath) {
        var ix = path.indexOf('*');
        if (-1 !== ix) {
            var prePath = ix > -1 ? path.substring(0, ix - 1) : path;
            var subPath = ix > -1 ? path.substring(ix + 1) : path;
            var prop = target.searchProperty(prePath);
            var pathFound = [];
            if (prop instanceof PropertyGroup) {
                var arrProp = prop.properties;
                for (var i = 0; i < arrProp.length; i++) {
                    var curreItemPath = (parentPath || '') + prePath + (prePath.endsWith('/') ? '' : '/') + i + subPath;
                    var curreItemPrePath = (parentPath || '') + prePath + i;
                    if (-1 === curreItemPath.indexOf('*')) {
                        pathFound.push(curreItemPath);
                    }
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
export { FormProperty };
var PropertyGroup = /** @class */ (function (_super) {
    __extends(PropertyGroup, _super);
    function PropertyGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._properties = null;
        _this._propertyProxyHandler = {
            /**
             * When a new item is added it will be checked for visibility updates to proceed <br/>
             * if any other field has a binding reference to it.<br/>
             */
            set: function (target, p, value, receiver) {
                /**
                 * 1) Make sure a canonical path is set
                 */
                var assertCanonicalPath = function (propertyValue) {
                    var e_8, _a;
                    var formProperty = propertyValue;
                    if (Array.isArray(target) && propertyValue instanceof FormProperty) {
                        /**
                         * Create a canonical path replacing the last '*' with the elements position in array
                         * @param propertyPath
                         * @param indexOfChild
                         */
                        var getCanonicalPath = function (propertyPath, indexOfChild) {
                            var pos;
                            if (propertyPath && -1 !== (pos = propertyPath.lastIndexOf('*'))) {
                                return propertyPath.substring(0, pos) + indexOfChild.toString() + propertyPath.substring(pos + 1);
                            }
                        };
                        if (formProperty) {
                            formProperty._canonicalPath = getCanonicalPath(formProperty._canonicalPath, p);
                        }
                    }
                    var propertyGroup = formProperty;
                    var propertyGroupChildren = (Array.isArray(propertyGroup.properties) ?
                        propertyGroup.properties :
                        Object.values(propertyGroup.properties || {}));
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
                        catch (e_8_1) { e_8 = { error: e_8_1 }; }
                        finally {
                            try {
                                if (propertyGroupChildren_1_1 && !propertyGroupChildren_1_1.done && (_a = propertyGroupChildren_1.return)) _a.call(propertyGroupChildren_1);
                            }
                            finally { if (e_8) throw e_8.error; }
                        }
                    }
                    return { property: formProperty, children: propertyGroupChildren };
                };
                var _a = assertCanonicalPath(value), property = _a.property, children = _a.children;
                /**
                 * 2) Add the new property before rebinding, so it can be found by <code>_bindVisibility</code>
                 */
                var result = target[p] = value;
                /**
                 * 3) Re-bind the visibility bindings referencing to this canonical paths
                 */
                var rebindVisibility = function () {
                    var e_9, _a, e_10, _b;
                    var rebindAll = [property].concat(children);
                    var findPropertiesToRebind = function (formProperty) {
                        var e_11, _a;
                        var propertyBindings = formProperty._propertyBindingRegistry.getPropertyBindingsVisibility();
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
                        var uniqueValues = {};
                        try {
                            for (var rebind_1 = __values(rebind), rebind_1_1 = rebind_1.next(); !rebind_1_1.done; rebind_1_1 = rebind_1.next()) {
                                var item = rebind_1_1.value;
                                uniqueValues[item] = item;
                            }
                        }
                        catch (e_11_1) { e_11 = { error: e_11_1 }; }
                        finally {
                            try {
                                if (rebind_1_1 && !rebind_1_1.done && (_a = rebind_1.return)) _a.call(rebind_1);
                            }
                            finally { if (e_11) throw e_11.error; }
                        }
                        return Object.keys(uniqueValues);
                    };
                    try {
                        for (var rebindAll_1 = __values(rebindAll), rebindAll_1_1 = rebindAll_1.next(); !rebindAll_1_1.done; rebindAll_1_1 = rebindAll_1.next()) {
                            var _property = rebindAll_1_1.value;
                            if (_property instanceof FormProperty) {
                                try {
                                    var rebindPaths = findPropertiesToRebind(_property);
                                    try {
                                        for (var rebindPaths_1 = (e_10 = void 0, __values(rebindPaths)), rebindPaths_1_1 = rebindPaths_1.next(); !rebindPaths_1_1.done; rebindPaths_1_1 = rebindPaths_1.next()) {
                                            var rebindPropPath = rebindPaths_1_1.value;
                                            var rebindProp = _property.searchProperty(rebindPropPath);
                                            rebindProp._bindVisibility();
                                        }
                                    }
                                    catch (e_10_1) { e_10 = { error: e_10_1 }; }
                                    finally {
                                        try {
                                            if (rebindPaths_1_1 && !rebindPaths_1_1.done && (_b = rebindPaths_1.return)) _b.call(rebindPaths_1);
                                        }
                                        finally { if (e_10) throw e_10.error; }
                                    }
                                }
                                catch (e) {
                                    console.error('Rebinding visibility error at path:', _property.path, 'property:', _property, e);
                                }
                            }
                        }
                    }
                    catch (e_9_1) { e_9 = { error: e_9_1 }; }
                    finally {
                        try {
                            if (rebindAll_1_1 && !rebindAll_1_1.done && (_a = rebindAll_1.return)) _a.call(rebindAll_1);
                        }
                        finally { if (e_9) throw e_9.error; }
                    }
                };
                rebindVisibility();
                return result;
            },
            get: function (target, p, receiver) {
                return target[p];
            },
            deleteProperty: function (target, p) {
                return delete target[p];
            }
        };
        return _this;
    }
    Object.defineProperty(PropertyGroup.prototype, "properties", {
        get: function () {
            return this._properties;
        },
        set: function (properties) {
            /**
             * Override the setter to add an observer that notices when an item is added or removed.<br/>
             */
            this._properties = new Proxy(properties, this._propertyProxyHandler);
        },
        enumerable: true,
        configurable: true
    });
    PropertyGroup.prototype.getProperty = function (path) {
        var subPathIdx = path.indexOf('/');
        var propertyId = subPathIdx !== -1 ? path.substr(0, subPathIdx) : path;
        var property = this.properties[propertyId];
        if (property !== null && subPathIdx !== -1 && property instanceof PropertyGroup) {
            var subPath = path.substr(subPathIdx + 1);
            property = property.getProperty(subPath);
        }
        return property;
    };
    PropertyGroup.prototype.forEachChild = function (fn) {
        for (var propertyId in this.properties) {
            if (this.properties.hasOwnProperty(propertyId)) {
                var property = this.properties[propertyId];
                fn(property, propertyId);
            }
        }
    };
    PropertyGroup.prototype.forEachChildRecursive = function (fn) {
        this.forEachChild(function (child) {
            fn(child);
            if (child instanceof PropertyGroup) {
                child.forEachChildRecursive(fn);
            }
        });
    };
    PropertyGroup.prototype._bindVisibility = function () {
        _super.prototype._bindVisibility.call(this);
        this._bindVisibilityRecursive();
    };
    PropertyGroup.prototype._bindVisibilityRecursive = function () {
        this.forEachChildRecursive(function (property) {
            property._bindVisibility();
        });
    };
    PropertyGroup.prototype.isRoot = function () {
        return this === this.root;
    };
    return PropertyGroup;
}(FormProperty));
export { PropertyGroup };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXByb3BlcnR5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL21vZGVsL2Zvcm1wcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDcEQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBT3pEO0lBaURFLHNCQUFZLHNCQUE4QyxFQUN0QyxpQkFBb0MsRUFDNUMseUJBQW9ELEVBQzdDLE1BQVcsRUFDbEIsTUFBcUIsRUFDckIsSUFBWTtRQUpKLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFFckMsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQWhEOUIsV0FBTSxHQUFRLElBQUksQ0FBQztRQUNuQixZQUFPLEdBQVEsSUFBSSxDQUFDO1FBQ1osa0JBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBTSxJQUFJLENBQUMsQ0FBQztRQUMvQyxtQkFBYyxHQUFHLElBQUksZUFBZSxDQUFNLElBQUksQ0FBQyxDQUFDO1FBQ2hELGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsdUJBQWtCLEdBQUcsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLENBQUM7UUE4QzlELElBQUksQ0FBQyxlQUFlLEdBQUcsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyw2QkFBNkIsR0FBRyx5QkFBeUIsQ0FBQyxvQ0FBb0MsRUFBRSxDQUFDO1FBRXRHLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQzFCO2FBQU0sSUFBSSxJQUFJLFlBQVksYUFBYSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxLQUFLLEdB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bWJpbmVMYXRlc3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7U2NoZW1hVmFsaWRhdG9yRmFjdG9yeX0gZnJvbSAnLi4vc2NoZW1hdmFsaWRhdG9yZmFjdG9yeSc7XG5pbXBvcnQge1ZhbGlkYXRvclJlZ2lzdHJ5fSBmcm9tICcuL3ZhbGlkYXRvcnJlZ2lzdHJ5JztcbmltcG9ydCB7UHJvcGVydHlCaW5kaW5nUmVnaXN0cnl9IGZyb20gJy4uL3Byb3BlcnR5LWJpbmRpbmctcmVnaXN0cnknO1xuaW1wb3J0IHsgRXhwcmVzc2lvbkNvbXBpbGVyRmFjdG9yeSwgRXhwcmVzc2lvbkNvbXBpbGVyVmlzaWJpbGl0eUlmIH0gZnJvbSAnLi4vZXhwcmVzc2lvbi1jb21waWxlci1mYWN0b3J5JztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZvcm1Qcm9wZXJ0eSB7XG4gIHB1YmxpYyBzY2hlbWFWYWxpZGF0b3I6IEZ1bmN0aW9uO1xuICBwdWJsaWMgZXhwcmVzc2lvbkNvbXBpbGVyVmlzaWJpbHR5SWY6IEV4cHJlc3Npb25Db21waWxlclZpc2liaWxpdHlJZjtcblxuICBfdmFsdWU6IGFueSA9IG51bGw7XG4gIF9lcnJvcnM6IGFueSA9IG51bGw7XG4gIHByaXZhdGUgX3ZhbHVlQ2hhbmdlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcbiAgcHJpdmF0ZSBfZXJyb3JzQ2hhbmdlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcbiAgcHJpdmF0ZSBfdmlzaWJsZSA9IHRydWU7XG4gIHByaXZhdGUgX3Zpc2liaWxpdHlDaGFuZ2VzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgcHJpdmF0ZSBfcm9vdDogUHJvcGVydHlHcm91cDtcbiAgcHJpdmF0ZSBfcGFyZW50OiBQcm9wZXJ0eUdyb3VwO1xuICBwcml2YXRlIF9wYXRoOiBzdHJpbmc7XG4gIF9wcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeTogUHJvcGVydHlCaW5kaW5nUmVnaXN0cnk7XG4gIF9fY2Fub25pY2FsUGF0aDogc3RyaW5nO1xuICBfX2Nhbm9uaWNhbFBhdGhOb3RhdGlvbjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBQcm92aWRlcyB0aGUgdW5pcXVlIHBhdGggb2YgdGhpcyBmb3JtIGVsZW1lbnQuPGJyLz5cbiAgICogRS5nLjpcbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzPC9jb2RlPiw8YnIvPlxuICAgKiA8Y29kZT4vc2hvcC9ib29rLzAvcGFnZS8xLzwvY29kZT5cbiAgICovXG4gIGdldCBfY2Fub25pY2FsUGF0aCgpIHsgcmV0dXJuIHRoaXMuX19jYW5vbmljYWxQYXRoOyB9XG4gIHNldCBfY2Fub25pY2FsUGF0aChjYW5vbmljYWxQYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9fY2Fub25pY2FsUGF0aCA9IGNhbm9uaWNhbFBhdGg7XG4gICAgdGhpcy5fX2Nhbm9uaWNhbFBhdGhOb3RhdGlvbiA9ICh0aGlzLl9fY2Fub25pY2FsUGF0aHx8JycpXG4gICAgICAucmVwbGFjZShuZXcgUmVnRXhwKCdeLycsICdpZycpLCAnJylcbiAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoJy8kJywgJ2lnJyksICcnKVxuICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCgnLycsICdpZycpLCAnLicpO1xuICB9XG4gIC8qKlxuICAgKiBVc2VzIHRoZSB1bmlxdWUgcGF0aCBwcm92aWRlZCBieSB0aGUgcHJvcGVydHkgPGNvZGU+X2Nhbm9uaWNhbFBhdGg8L2NvZGU+PGJyLz5cbiAgICogYnV0IGNvbnZlcnRzIGl0IHRvIGEgSFRNTCBFbGVtZW50IEF0dHJpYnV0ZSBJRCBjb21wbGlhbnQgZm9ybWF0Ljxici8+XG4gICAqIEUuZy46XG4gICAqIDxjb2RlPmdhcmFnZS5jYXJzPC9jb2RlPiw8YnIvPlxuICAgKiA8Y29kZT5zaG9wLmJvb2suMC5wYWdlLjEuPC9jb2RlPlxuICAgKi9cbiAgZ2V0IGNhbm9uaWNhbFBhdGhOb3RhdGlvbigpIHsgcmV0dXJuIHRoaXMuX19jYW5vbmljYWxQYXRoTm90YXRpb247IH1cblxuICBwcml2YXRlIF9yb290TmFtZTtcbiAgLyoqXG4gICAqIFByb3ZpZGVzIHRoZSBIVE1MIEVsZW1lbnQgQXR0cmlidXRlIElEL05BTUUgY29tcGxpYW50IHJlcHJlc2VudGF0aW9uXG4gICAqIG9mIHRoZSByb290IGVsZW1lbnQuPGJyLz5cbiAgICogUmVwcmVzZW50cyB0aGUgSFRNTCBGT1JNIE5BTUUuPGJyLz5cbiAgICogT25seSB0aGUgcm9vdCA8Y29kZT5Gb3JtUHJvcGVydHk8L2NvZGU+IHdpbGwgcHJvdmlkZSBhIHZhbHVlIGhlcmUuXG4gICAqL1xuICBnZXQgcm9vdE5hbWUoKSB7IHJldHVybiB0aGlzLl9yb290TmFtZTsgfVxuXG4gIGNvbnN0cnVjdG9yKHNjaGVtYVZhbGlkYXRvckZhY3Rvcnk6IFNjaGVtYVZhbGlkYXRvckZhY3RvcnksXG4gICAgICAgICAgICAgIHByaXZhdGUgdmFsaWRhdG9yUmVnaXN0cnk6IFZhbGlkYXRvclJlZ2lzdHJ5LFxuICAgICAgICAgICAgICBleHByZXNzaW9uQ29tcGlsZXJGYWN0b3J5OiBFeHByZXNzaW9uQ29tcGlsZXJGYWN0b3J5LFxuICAgICAgICAgICAgICBwdWJsaWMgc2NoZW1hOiBhbnksXG4gICAgICAgICAgICAgIHBhcmVudDogUHJvcGVydHlHcm91cCxcbiAgICAgICAgICAgICAgcGF0aDogc3RyaW5nKSB7XG4gICAgdGhpcy5zY2hlbWFWYWxpZGF0b3IgPSBzY2hlbWFWYWxpZGF0b3JGYWN0b3J5LmNyZWF0ZVZhbGlkYXRvckZuKHRoaXMuc2NoZW1hKTtcbiAgICB0aGlzLmV4cHJlc3Npb25Db21waWxlclZpc2liaWx0eUlmID0gZXhwcmVzc2lvbkNvbXBpbGVyRmFjdG9yeS5jcmVhdGVFeHByZXNzaW9uQ29tcGlsZXJWaXNpYmlsaXR5SWYoKTtcblxuICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICB0aGlzLl9yb290ID0gcGFyZW50LnJvb3Q7XG4gICAgfSBlbHNlIGlmICh0aGlzIGluc3RhbmNlb2YgUHJvcGVydHlHcm91cCkge1xuICAgICAgdGhpcy5fcm9vdCA9IDxQcm9wZXJ0eUdyb3VwPjxhbnk+dGhpcztcbiAgICAgIHRoaXMuX3Jvb3ROYW1lID0gdGhpcy5jcmVhdGVSb290TmFtZSgpO1xuICAgIH1cbiAgICB0aGlzLl9wYXRoID0gcGF0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBIVE1MIElEIGFuZCBOQU1FIGF0dHJpYnV0ZSBjb21wbGlhbnQgc3RyaW5nLlxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVSb290TmFtZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnNjaGVtYSAmJiB0aGlzLnNjaGVtYVsnbmFtZSddKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcm9vdE5hbWUgPSB0aGlzLnNjaGVtYVsnbmFtZSddLnJlcGxhY2UobmV3IFJlZ0V4cCgnW1xcXFxzXSsnLCAnaWcnKSwgJ18nKVxuICAgIH1cbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmFsdWVDaGFuZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZUNoYW5nZXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGVycm9yc0NoYW5nZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Vycm9yc0NoYW5nZXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zY2hlbWEudHlwZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGFyZW50KCk6IFByb3BlcnR5R3JvdXAge1xuICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHJvb3QoKTogUHJvcGVydHlHcm91cCB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvb3QgfHwgPFByb3BlcnR5R3JvdXA+PGFueT50aGlzO1xuICB9XG5cbiAgcHVibGljIGdldCBwYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3BhdGg7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmFsaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Vycm9ycyA9PT0gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBzZXRWYWx1ZSh2YWx1ZTogYW55LCBvbmx5U2VsZjogYm9vbGVhbik7XG5cbiAgcHVibGljIGFic3RyYWN0IHJlc2V0KHZhbHVlOiBhbnksIG9ubHlTZWxmOiBib29sZWFuKTtcblxuICBwdWJsaWMgdXBkYXRlVmFsdWVBbmRWYWxpZGl0eShvbmx5U2VsZiA9IGZhbHNlLCBlbWl0RXZlbnQgPSB0cnVlKSB7XG4gICAgdGhpcy5fdXBkYXRlVmFsdWUoKTtcblxuICAgIGlmIChlbWl0RXZlbnQpIHtcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2VzLm5leHQodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5fcnVuVmFsaWRhdGlvbigpO1xuXG4gICAgaWYgKHRoaXMucGFyZW50ICYmICFvbmx5U2VsZikge1xuICAgICAgdGhpcy5wYXJlbnQudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShvbmx5U2VsZiwgZW1pdEV2ZW50KTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBfaGFzVmFsdWUoKTogYm9vbGVhbjtcblxuICAvKipcbiAgICogIEBpbnRlcm5hbFxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IF91cGRhdGVWYWx1ZSgpO1xuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHB1YmxpYyBfcnVuVmFsaWRhdGlvbigpOiBhbnkge1xuICAgIGxldCBlcnJvcnMgPSB0aGlzLnNjaGVtYVZhbGlkYXRvcih0aGlzLl92YWx1ZSkgfHwgW107XG4gICAgbGV0IGN1c3RvbVZhbGlkYXRvciA9IHRoaXMudmFsaWRhdG9yUmVnaXN0cnkuZ2V0KHRoaXMucGF0aCk7XG4gICAgaWYgKGN1c3RvbVZhbGlkYXRvcikge1xuICAgICAgbGV0IGN1c3RvbUVycm9ycyA9IGN1c3RvbVZhbGlkYXRvcih0aGlzLnZhbHVlLCB0aGlzLCB0aGlzLmZpbmRSb290KCkpO1xuICAgICAgZXJyb3JzID0gdGhpcy5tZXJnZUVycm9ycyhlcnJvcnMsIGN1c3RvbUVycm9ycyk7XG4gICAgfVxuICAgIGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICBlcnJvcnMgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuX2Vycm9ycyA9IGVycm9ycztcbiAgICB0aGlzLnNldEVycm9ycyh0aGlzLl9lcnJvcnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBtZXJnZUVycm9ycyhlcnJvcnMsIG5ld0Vycm9ycykge1xuICAgIGlmIChuZXdFcnJvcnMpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG5ld0Vycm9ycykpIHtcbiAgICAgICAgZXJyb3JzID0gZXJyb3JzLmNvbmNhdCguLi5uZXdFcnJvcnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXJyb3JzLnB1c2gobmV3RXJyb3JzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVycm9ycztcbiAgfVxuXG4gIHByaXZhdGUgc2V0RXJyb3JzKGVycm9ycykge1xuICAgIHRoaXMuX2Vycm9ycyA9IGVycm9ycztcbiAgICB0aGlzLl9lcnJvcnNDaGFuZ2VzLm5leHQoZXJyb3JzKTtcbiAgfVxuXG4gIHB1YmxpYyBleHRlbmRFcnJvcnMoZXJyb3JzKSB7XG4gICAgZXJyb3JzID0gdGhpcy5tZXJnZUVycm9ycyh0aGlzLl9lcnJvcnMgfHwgW10sIGVycm9ycyk7XG4gICAgdGhpcy5zZXRFcnJvcnMoZXJyb3JzKTtcbiAgfVxuXG4gIHNlYXJjaFByb3BlcnR5KHBhdGg6IHN0cmluZyk6IEZvcm1Qcm9wZXJ0eSB7XG4gICAgbGV0IHByb3A6IEZvcm1Qcm9wZXJ0eSA9IHRoaXM7XG4gICAgbGV0IGJhc2U6IFByb3BlcnR5R3JvdXAgPSBudWxsO1xuXG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgaWYgKHBhdGhbMF0gPT09ICcvJykge1xuICAgICAgYmFzZSA9IHRoaXMuZmluZFJvb3QoKTtcbiAgICAgIHJlc3VsdCA9IGJhc2UuZ2V0UHJvcGVydHkocGF0aC5zdWJzdHIoMSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aGlsZSAocmVzdWx0ID09PSBudWxsICYmIHByb3AucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHByb3AgPSBiYXNlID0gcHJvcC5wYXJlbnQ7XG4gICAgICAgIHJlc3VsdCA9IGJhc2UuZ2V0UHJvcGVydHkocGF0aCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgZmluZFJvb3QoKTogUHJvcGVydHlHcm91cCB7XG4gICAgbGV0IHByb3BlcnR5OiBGb3JtUHJvcGVydHkgPSB0aGlzO1xuICAgIHdoaWxlIChwcm9wZXJ0eS5wYXJlbnQgIT09IG51bGwpIHtcbiAgICAgIHByb3BlcnR5ID0gcHJvcGVydHkucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gPFByb3BlcnR5R3JvdXA+cHJvcGVydHk7XG4gIH1cblxuICBwcml2YXRlIHNldFZpc2libGUodmlzaWJsZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Zpc2libGUgPSB2aXNpYmxlO1xuICAgIHRoaXMuX3Zpc2liaWxpdHlDaGFuZ2VzLm5leHQodmlzaWJsZSk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICB0aGlzLnBhcmVudC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KGZhbHNlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWFraW5nIHVzZSBvZiB0aGUgZXhwcmVzc2lvbiBjb21waWxlciBmb3IgdGhlIDxjb2RlPnZpc2libGVJZjwvY29kZT4gY29uZGl0aW9uXG4gICAqL1xuICBwcml2YXRlIF9fZXZhbHVhdGVWaXNpYmlsaXR5SWYoXG4gICAgc291cmNlUHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSxcbiAgICB0YXJnZXRQcm9wZXJ0eTogRm9ybVByb3BlcnR5LFxuICAgIGRlcGVuZGVuY3lQYXRoOiBzdHJpbmcsXG4gICAgdmFsdWU6IGFueSA9ICcnLFxuICAgIGV4cHJlc3Npb246IHN0cmluZ3xzdHJpbmdbXXxudW1iZXIgPSAnJyk6IGJvb2xlYW4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgdmFsaWQgPSBmYWxzZVxuICAgICAgaWYgKGlzTmFOKGV4cHJlc3Npb24gYXMgbnVtYmVyKSAmJiAoZXhwcmVzc2lvbiBhcyBzdHJpbmcpLmluZGV4T2YoJyRBTlkkJykgIT09IC0xKSB7XG4gICAgICAgIHZhbGlkID0gdmFsdWUgJiYgdmFsdWUubGVuZ3RoID4gMDtcbiAgICAgIH0gZWxzZSBpZiAoKGV4cHJlc3Npb258fFtdKS50b1N0cmluZygpLmluZGV4T2YoJyRFWFAkJykgPT09IDApIHtcbiAgICAgICAgLy8gc2luY2UgdmlzaWJsZUlmIGNvbmRpdGlvbiB2YWx1ZXMgYXJlIGFuIGFycmF5Li4uIHdlIG11c3QgZG8gdGhpc1xuICAgICAgICBjb25zdCBleHBBcnJheSA9IEFycmF5LmlzQXJyYXkoZXhwcmVzc2lvbikgPyBleHByZXNzaW9uIDogKGV4cHJlc3Npb24gPyBbZXhwcmVzc2lvbl0gOiBbXSlcbiAgICAgICAgZm9yIChjb25zdCBleHBTdHJpbmcgb2YgZXhwQXJyYXkpIHtcbiAgICAgICAgICBjb25zdCBfZXhwcmVzc3Npb24gPSAoZXhwU3RyaW5nIGFzIHN0cmluZykuc3Vic3RyaW5nKCckRVhQJCcubGVuZ3RoKTtcbiAgICAgICAgICB2YWxpZCA9IHRydWUgPT09IHRoaXMuZXhwcmVzc2lvbkNvbXBpbGVyVmlzaWJpbHR5SWYuZXZhbHVhdGUoX2V4cHJlc3NzaW9uLCB7XG4gICAgICAgICAgICBzb3VyY2U6IHNvdXJjZVByb3BlcnR5LFxuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRQcm9wZXJ0eVxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKHZhbGlkKSB7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsaWQgPSBpc05hTih2YWx1ZSkgPyB2YWx1ZS5pbmRleE9mKGV4cHJlc3Npb24pICE9PSAtMSA6IHZhbHVlID09PSBleHByZXNzaW9uO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbGlkXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHByb2Nlc3NpbmcgXCJWaXNpYmlsZUlmXCIgZXhwcmVzc2lvbiBmb3IgcGF0aDogJywgZGVwZW5kZW5jeVBhdGgsXG4gICAgICAgIGBzb3VyY2UgLSAke3NvdXJjZVByb3BlcnR5Ll9jYW5vbmljYWxQYXRofTogYCwgc291cmNlUHJvcGVydHksXG4gICAgICAgIGB0YXJnZXQgLSAke3RhcmdldFByb3BlcnR5Ll9jYW5vbmljYWxQYXRofTogYCwgdGFyZ2V0UHJvcGVydHksXG4gICAgICAgICd2YWx1ZTonLCB2YWx1ZSxcbiAgICAgICAgJ2V4cHJlc3Npb246ICcsIGV4cHJlc3Npb24sXG4gICAgICAgICdlcnJvcjogJywgZXJyb3IpXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfX2JpbmRWaXNpYmlsaXR5KCk6IGJvb2xlYW4ge1xuICAgIC8qKlxuICAgICAqIDxwcmU+XG4gICAgICogICAgIFwib25lT2ZcIjpbe1xuICAgICAqICAgICAgICAgXCJwYXRoXCI6W1widmFsdWVcIixcInZhbHVlXCJdXG4gICAgICogICAgIH0se1xuICAgICAqICAgICAgICAgXCJwYXRoXCI6W1widmFsdWVcIixcInZhbHVlXCJdXG4gICAgICogICAgIH1dXG4gICAgICogICAgIDwvcHJlPlxuICAgICAqIDxwcmU+XG4gICAgICogICAgIFwiYWxsT2ZcIjpbe1xuICAgICAqICAgICAgICAgXCJwYXRoXCI6W1widmFsdWVcIixcInZhbHVlXCJdXG4gICAgICogICAgIH0se1xuICAgICAqICAgICAgICAgXCJwYXRoXCI6W1widmFsdWVcIixcInZhbHVlXCJdXG4gICAgICogICAgIH1dXG4gICAgICogICAgIDwvcHJlPlxuICAgICAqL1xuICAgIGNvbnN0IHZpc2libGVJZlByb3BlcnR5ID0gdGhpcy5zY2hlbWEudmlzaWJsZUlmO1xuICAgIGNvbnN0IHZpc2libGVJZk9mID0gKHZpc2libGVJZlByb3BlcnR5IHx8IHt9KS5vbmVPZiB8fCAodmlzaWJsZUlmUHJvcGVydHkgfHwge30pLmFsbE9mO1xuICAgIGlmICh2aXNpYmxlSWZPZikge1xuICAgICAgZm9yIChjb25zdCB2aXNpYmxlSWYgb2YgdmlzaWJsZUlmT2YpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2aXNpYmxlSWYgPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKHZpc2libGVJZikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh2aXNpYmxlSWYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnN0IHByb3BlcnRpZXNCaW5kaW5nID0gW107XG4gICAgICAgICAgZm9yIChjb25zdCBkZXBlbmRlbmN5UGF0aCBpbiB2aXNpYmxlSWYpIHtcbiAgICAgICAgICAgIGlmICh2aXNpYmxlSWYuaGFzT3duUHJvcGVydHkoZGVwZW5kZW5jeVBhdGgpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLmZpbmRQcm9wZXJ0aWVzKHRoaXMsIGRlcGVuZGVuY3lQYXRoKTtcbiAgICAgICAgICAgICAgaWYgKChwcm9wZXJ0aWVzIHx8IFtdKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHByb3BlcnR5IG9mIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWVDaGVjaztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NoZW1hLnZpc2libGVJZi5vbmVPZikge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlQ2hlY2sgPSBwcm9wZXJ0eS52YWx1ZUNoYW5nZXMucGlwZShtYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9PiB0aGlzLl9fZXZhbHVhdGVWaXNpYmlsaXR5SWYodGhpcywgcHJvcGVydHksIGRlcGVuZGVuY3lQYXRoLCB2YWx1ZSwgdmlzaWJsZUlmW2RlcGVuZGVuY3lQYXRoXSlcbiAgICAgICAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNjaGVtYS52aXNpYmxlSWYuYWxsT2YpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBfY2hrID0gKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5zY2hlbWEudmlzaWJsZUlmLmFsbE9mKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZGVwUGF0aCBvZiBPYmplY3Qua2V5cyhpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3AgPSB0aGlzLnNlYXJjaFByb3BlcnR5KGRlcFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3BWYWwgPSBwcm9wLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fX2V2YWx1YXRlVmlzaWJpbGl0eUlmKHRoaXMsIHByb3AsIGRlcGVuZGVuY3lQYXRoLCBwcm9wVmFsLCBpdGVtW2RlcFBhdGhdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZUNoZWNrID0gcHJvcGVydHkudmFsdWVDaGFuZ2VzLnBpcGUobWFwKF9jaGspKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aXNpYmlsaXR5Q2hlY2sgPSBwcm9wZXJ0eS5fdmlzaWJpbGl0eUNoYW5nZXM7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFuZCA9IGNvbWJpbmVMYXRlc3QoW3ZhbHVlQ2hlY2ssIHZpc2liaWxpdHlDaGVja10sICh2MSwgdjIpID0+IHYxICYmIHYyKTtcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc0JpbmRpbmcucHVzaChhbmQpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NhblxcJ3QgZmluZCBwcm9wZXJ0eSAnICsgZGVwZW5kZW5jeVBhdGggKyAnIGZvciB2aXNpYmlsaXR5IGNoZWNrIG9mICcgKyB0aGlzLnBhdGgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJNaXNzaW5nVmlzaWJpbGl0eUJpbmRpbmcoZGVwZW5kZW5jeVBhdGgsIHRoaXMpO1xuICAgICAgICAgICAgICAgIC8vIG5vdCB2aXNpYmxlIGlmIG5vdCBleGlzdGVudFxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb21iaW5lTGF0ZXN0KHByb3BlcnRpZXNCaW5kaW5nLCAoLi4udmFsdWVzOiBib29sZWFuW10pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXMuaW5kZXhPZih0cnVlKSAhPT0gLTE7XG4gICAgICAgICAgfSkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKS5zdWJzY3JpYmUoKHZpc2libGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmlzaWJsZSh2aXNpYmxlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgLy8gQSBmaWVsZCBpcyB2aXNpYmxlIGlmIEFUIExFQVNUIE9ORSBvZiB0aGUgcHJvcGVydGllcyBpdCBkZXBlbmRzIG9uIGlzIHZpc2libGUgQU5EIGhhcyBhIHZhbHVlIGluIHRoZSBsaXN0XG4gIHB1YmxpYyBfYmluZFZpc2liaWxpdHkoKSB7XG4gICAgaWYgKHRoaXMuX19iaW5kVmlzaWJpbGl0eSgpKVxuICAgICAgcmV0dXJuO1xuICAgIGxldCB2aXNpYmxlSWYgPSB0aGlzLnNjaGVtYS52aXNpYmxlSWY7XG4gICAgaWYgKHR5cGVvZiB2aXNpYmxlSWYgPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKHZpc2libGVJZikubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnNldFZpc2libGUoZmFsc2UpO1xuICAgIH0gZWxzZSBpZiAodmlzaWJsZUlmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCBwcm9wZXJ0aWVzQmluZGluZyA9IFtdO1xuICAgICAgZm9yIChsZXQgZGVwZW5kZW5jeVBhdGggaW4gdmlzaWJsZUlmKSB7XG4gICAgICAgIGlmICh2aXNpYmxlSWYuaGFzT3duUHJvcGVydHkoZGVwZW5kZW5jeVBhdGgpKSB7XG4gICAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMuZmluZFByb3BlcnRpZXModGhpcywgZGVwZW5kZW5jeVBhdGgpO1xuICAgICAgICAgIGlmICgocHJvcGVydGllcyB8fCBbXSkubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHByb3BlcnR5IG9mIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgaWYgKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVDaGVjayA9IHByb3BlcnR5LnZhbHVlQ2hhbmdlcy5waXBlKG1hcChcbiAgICAgICAgICAgICAgICAgIHZhbHVlID0+IHRoaXMuX19ldmFsdWF0ZVZpc2liaWxpdHlJZih0aGlzLCBwcm9wZXJ0eSwgZGVwZW5kZW5jeVBhdGgsIHZhbHVlLCB2aXNpYmxlSWZbZGVwZW5kZW5jeVBhdGhdKVxuICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpc2liaWxpdHlDaGVjayA9IHByb3BlcnR5Ll92aXNpYmlsaXR5Q2hhbmdlcztcbiAgICAgICAgICAgICAgICBjb25zdCBhbmQgPSBjb21iaW5lTGF0ZXN0KFt2YWx1ZUNoZWNrLCB2aXNpYmlsaXR5Q2hlY2tdLCAodjEsIHYyKSA9PiB2MSAmJiB2Mik7XG4gICAgICAgICAgICAgICAgcHJvcGVydGllc0JpbmRpbmcucHVzaChhbmQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignQ2FuXFwndCBmaW5kIHByb3BlcnR5ICcgKyBkZXBlbmRlbmN5UGF0aCArICcgZm9yIHZpc2liaWxpdHkgY2hlY2sgb2YgJyArIHRoaXMucGF0aCk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyTWlzc2luZ1Zpc2liaWxpdHlCaW5kaW5nKGRlcGVuZGVuY3lQYXRoLCB0aGlzKTtcbiAgICAgICAgICAgIC8vIG5vdCB2aXNpYmxlIGlmIG5vdCBleGlzdGVudFxuICAgICAgICAgICAgdGhpcy5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29tYmluZUxhdGVzdChwcm9wZXJ0aWVzQmluZGluZywgKC4uLnZhbHVlczogYm9vbGVhbltdKSA9PiB7XG4gICAgICAgIHJldHVybiB2YWx1ZXMuaW5kZXhPZih0cnVlKSAhPT0gLTE7XG4gICAgICB9KS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpLnN1YnNjcmliZSgodmlzaWJsZSkgPT4ge1xuICAgICAgICB0aGlzLnNldFZpc2libGUodmlzaWJsZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlZ2lzdGVyTWlzc2luZ1Zpc2liaWxpdHlCaW5kaW5nKGRlcGVuZGVuY3lQYXRoOiBzdHJpbmcsIGZvcm1Qcm9wZXJ0eTogRm9ybVByb3BlcnR5KSB7XG4gICAgZm9ybVByb3BlcnR5Ll9wcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeS5nZXRQcm9wZXJ0eUJpbmRpbmdzVmlzaWJpbGl0eSgpLmFkZChkZXBlbmRlbmN5UGF0aCwgZm9ybVByb3BlcnR5LnBhdGgpO1xuICB9XG5cblxuICAvKipcbiAgICogRmluZHMgYWxsIDxjb2RlPmZvcm1Qcm9wZXJ0aWVzPC9jb2RlPiBmcm9tIGEgcGF0aCB3aXRoIHdpbGRjYXJkcy48YnIvPlxuICAgKiBlLmc6IDxjb2RlPi9nYXJhZ2UvY2Fycy8mIzQyOy90aXJlcy8mIzQyOy9uYW1lPC9jb2RlPjxici8+XG4gICAqIEBwYXJhbSB0YXJnZXRcbiAgICogQHBhcmFtIHByb3BlcnR5UGF0aFxuICAgKi9cbiAgZmluZFByb3BlcnRpZXModGFyZ2V0OiBGb3JtUHJvcGVydHksIHByb3BlcnR5UGF0aDogc3RyaW5nKTogRm9ybVByb3BlcnR5W10ge1xuICAgIGNvbnN0IHByb3BzOiBGb3JtUHJvcGVydHlbXSA9IFtdO1xuICAgIGNvbnN0IHBhdGhzID0gdGhpcy5maW5kUHJvcGVydHlQYXRocyh0YXJnZXQsIHByb3BlcnR5UGF0aCk7XG4gICAgZm9yIChjb25zdCBwYXRoIG9mIHBhdGhzKSB7XG4gICAgICBjb25zdCBwOiBGb3JtUHJvcGVydHkgPSB0YXJnZXQuc2VhcmNoUHJvcGVydHkocGF0aCk7XG4gICAgICBpZiAocCkge1xuICAgICAgICBwcm9wcy5wdXNoKHApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcHJvcHM7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBjYW5vbmljYWwgcGF0aHMgZnJvbSBhIHBhdGggd2l0aCB3aWxkY2FyZHMuXG4gICAqIGUuZzo8YnIvPlxuICAgKiBGcm9tOjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8mIzQyOy90aXJlcy8mIzQyOy9uYW1lPC9jb2RlPjxici8+XG4gICAqIGl0IGNyZWF0ZXM6PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLzAvdGlyZXMvMC9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8wL3RpcmVzLzEvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMC90aXJlcy8yL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLzAvdGlyZXMvMy9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8xL3RpcmVzLzAvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMi90aXJlcy8xL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLzMvdGlyZXMvMi9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8zL3RpcmVzLzMvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvJiM0MjsvdGlyZXMvJiM0MjsvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvJiM0MjsvdGlyZXMvMi9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8mIzQyOy90aXJlcy8zL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGJyLz5ldGMuLi5cbiAgICogQHBhcmFtIHRhcmdldFxuICAgKiBAcGFyYW0gcGF0aFxuICAgKiBAcGFyYW0gcGFyZW50UGF0aFxuICAgKi9cbiAgZmluZFByb3BlcnR5UGF0aHModGFyZ2V0OiBGb3JtUHJvcGVydHksIHBhdGg6IHN0cmluZywgcGFyZW50UGF0aD86IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBpeCA9IHBhdGguaW5kZXhPZignKicpO1xuICAgIGlmICgtMSAhPT0gaXgpIHtcbiAgICAgIGNvbnN0IHByZVBhdGggPSBpeCA+IC0xID8gcGF0aC5zdWJzdHJpbmcoMCwgaXggLSAxKSA6IHBhdGg7XG4gICAgICBjb25zdCBzdWJQYXRoID0gaXggPiAtMSA/IHBhdGguc3Vic3RyaW5nKGl4ICsgMSkgOiBwYXRoO1xuICAgICAgY29uc3QgcHJvcDogRm9ybVByb3BlcnR5ID0gdGFyZ2V0LnNlYXJjaFByb3BlcnR5KHByZVBhdGgpO1xuICAgICAgbGV0IHBhdGhGb3VuZCA9IFtdO1xuICAgICAgaWYgKHByb3AgaW5zdGFuY2VvZiBQcm9wZXJ0eUdyb3VwKSB7XG4gICAgICAgIGNvbnN0IGFyclByb3AgPSBwcm9wLnByb3BlcnRpZXMgYXMgRm9ybVByb3BlcnR5W107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyUHJvcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGN1cnJlSXRlbVBhdGggPSAocGFyZW50UGF0aCB8fCAnJykgKyBwcmVQYXRoICsgKHByZVBhdGguZW5kc1dpdGgoJy8nKSA/ICcnIDogJy8nKSArIGkgKyBzdWJQYXRoO1xuICAgICAgICAgIGNvbnN0IGN1cnJlSXRlbVByZVBhdGggPSAocGFyZW50UGF0aCB8fCAnJykgKyBwcmVQYXRoICsgaTtcbiAgICAgICAgICBpZiAoLTEgPT09IGN1cnJlSXRlbVBhdGguaW5kZXhPZignKicpKSB7XG4gICAgICAgICAgICBwYXRoRm91bmQucHVzaChjdXJyZUl0ZW1QYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgY2hpbGRyZW5QYXRoRm91bmQgPSB0aGlzLmZpbmRQcm9wZXJ0eVBhdGhzKGFyclByb3BbaV0sIHN1YlBhdGgsIGN1cnJlSXRlbVByZVBhdGgpO1xuICAgICAgICAgIHBhdGhGb3VuZCA9IHBhdGhGb3VuZC5jb25jYXQoY2hpbGRyZW5QYXRoRm91bmQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcGF0aEZvdW5kO1xuICAgIH1cbiAgICByZXR1cm4gW3BhdGhdO1xuICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQcm9wZXJ0eUdyb3VwIGV4dGVuZHMgRm9ybVByb3BlcnR5IHtcblxuICBfcHJvcGVydGllczogRm9ybVByb3BlcnR5W10gfCB7IFtrZXk6IHN0cmluZ106IEZvcm1Qcm9wZXJ0eSB9ID0gbnVsbDtcblxuICBnZXQgcHJvcGVydGllcygpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllcztcbiAgfVxuXG4gIHNldCBwcm9wZXJ0aWVzKHByb3BlcnRpZXM6IEZvcm1Qcm9wZXJ0eVtdIHwgeyBba2V5OiBzdHJpbmddOiBGb3JtUHJvcGVydHkgfSkge1xuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoZSBzZXR0ZXIgdG8gYWRkIGFuIG9ic2VydmVyIHRoYXQgbm90aWNlcyB3aGVuIGFuIGl0ZW0gaXMgYWRkZWQgb3IgcmVtb3ZlZC48YnIvPlxuICAgICAqL1xuICAgIHRoaXMuX3Byb3BlcnRpZXMgPSBuZXcgUHJveHkocHJvcGVydGllcywgdGhpcy5fcHJvcGVydHlQcm94eUhhbmRsZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcHJvcGVydHlQcm94eUhhbmRsZXI6IFByb3h5SGFuZGxlcjxGb3JtUHJvcGVydHlbXSB8IHsgW2tleTogc3RyaW5nXTogRm9ybVByb3BlcnR5IH0+ID0ge1xuICAgIC8qKlxuICAgICAqIFdoZW4gYSBuZXcgaXRlbSBpcyBhZGRlZCBpdCB3aWxsIGJlIGNoZWNrZWQgZm9yIHZpc2liaWxpdHkgdXBkYXRlcyB0byBwcm9jZWVkIDxici8+XG4gICAgICogaWYgYW55IG90aGVyIGZpZWxkIGhhcyBhIGJpbmRpbmcgcmVmZXJlbmNlIHRvIGl0Ljxici8+XG4gICAgICovXG4gICAgc2V0KHRhcmdldDogRm9ybVByb3BlcnR5W10gfCB7IFtwOiBzdHJpbmddOiBGb3JtUHJvcGVydHkgfSwgcDogUHJvcGVydHlLZXksIHZhbHVlOiBhbnksIHJlY2VpdmVyOiBhbnkpOiBib29sZWFuIHtcblxuICAgICAgLyoqXG4gICAgICAgKiAxKSBNYWtlIHN1cmUgYSBjYW5vbmljYWwgcGF0aCBpcyBzZXRcbiAgICAgICAqL1xuICAgICAgY29uc3QgYXNzZXJ0Q2Fub25pY2FsUGF0aCA9IChwcm9wZXJ0eVZhbHVlOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgZm9ybVByb3BlcnR5ID0gcHJvcGVydHlWYWx1ZSBhcyBGb3JtUHJvcGVydHk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgcHJvcGVydHlWYWx1ZSBpbnN0YW5jZW9mIEZvcm1Qcm9wZXJ0eSkge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIENyZWF0ZSBhIGNhbm9uaWNhbCBwYXRoIHJlcGxhY2luZyB0aGUgbGFzdCAnKicgd2l0aCB0aGUgZWxlbWVudHMgcG9zaXRpb24gaW4gYXJyYXlcbiAgICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlQYXRoXG4gICAgICAgICAgICogQHBhcmFtIGluZGV4T2ZDaGlsZFxuICAgICAgICAgICAqL1xuICAgICAgICAgIGNvbnN0IGdldENhbm9uaWNhbFBhdGggPSAocHJvcGVydHlQYXRoOiBzdHJpbmcsIGluZGV4T2ZDaGlsZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgcG9zO1xuICAgICAgICAgICAgaWYgKHByb3BlcnR5UGF0aCAmJiAtMSAhPT0gKHBvcyA9IHByb3BlcnR5UGF0aC5sYXN0SW5kZXhPZignKicpKSkge1xuICAgICAgICAgICAgICByZXR1cm4gcHJvcGVydHlQYXRoLnN1YnN0cmluZygwLCBwb3MpICsgaW5kZXhPZkNoaWxkLnRvU3RyaW5nKCkgKyBwcm9wZXJ0eVBhdGguc3Vic3RyaW5nKHBvcyArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKGZvcm1Qcm9wZXJ0eSkge1xuICAgICAgICAgICAgZm9ybVByb3BlcnR5Ll9jYW5vbmljYWxQYXRoID0gZ2V0Q2Fub25pY2FsUGF0aChmb3JtUHJvcGVydHkuX2Nhbm9uaWNhbFBhdGgsIHAgYXMgbnVtYmVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wZXJ0eUdyb3VwID0gZm9ybVByb3BlcnR5IGFzIFByb3BlcnR5R3JvdXA7XG4gICAgICAgIGNvbnN0IHByb3BlcnR5R3JvdXBDaGlsZHJlbiA9IChBcnJheS5pc0FycmF5KHByb3BlcnR5R3JvdXAucHJvcGVydGllcykgP1xuICAgICAgICAgIHByb3BlcnR5R3JvdXAucHJvcGVydGllcyA6XG4gICAgICAgICAgT2JqZWN0LnZhbHVlcyhwcm9wZXJ0eUdyb3VwLnByb3BlcnRpZXMgfHwge30pKSBhcyBGb3JtUHJvcGVydHlbXTtcbiAgICAgICAgaWYgKChmb3JtUHJvcGVydHkucGF0aCB8fCAnJykuZW5kc1dpdGgoJy8qJykpIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBJZiBpdCBpcyBhbiBhcnJheSwgdGhlbiBhbGwgY2hpbGRyZW4gY2Fub25pY2FsIHBhdGhzIG11c3QgYmUgY29tcHV0ZWQgbm93LlxuICAgICAgICAgICAqIFRoZSBjaGlsZHJlbiBkb24ndCBoYXZlIHRoZSBwYXJlbnQncyBwYXRoIHNlZ21lbnQgc2V0IHlldCxcbiAgICAgICAgICAgKiBiZWNhdXNlIHRoZXkgYXJlIGNyZWF0ZWQgYmVmb3JlIHRoZSBwYXJlbnQgZ2V0cyBhdHRhY2hlZCB0byBpdHMgcGFyZW50LlxuICAgICAgICAgICAqL1xuICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgcHJvcGVydHlHcm91cENoaWxkcmVuKSB7XG4gICAgICAgICAgICBjaGlsZC5fY2Fub25pY2FsUGF0aCA9IGZvcm1Qcm9wZXJ0eS5fY2Fub25pY2FsUGF0aCArIGNoaWxkLl9jYW5vbmljYWxQYXRoLnN1YnN0cmluZyhmb3JtUHJvcGVydHkucGF0aC5sZW5ndGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3Byb3BlcnR5OiBmb3JtUHJvcGVydHksIGNoaWxkcmVuOiBwcm9wZXJ0eUdyb3VwQ2hpbGRyZW59O1xuICAgICAgfTtcbiAgICAgIGNvbnN0IHtwcm9wZXJ0eSwgY2hpbGRyZW59ID0gYXNzZXJ0Q2Fub25pY2FsUGF0aCh2YWx1ZSk7XG5cbiAgICAgIC8qKlxuICAgICAgICogMikgQWRkIHRoZSBuZXcgcHJvcGVydHkgYmVmb3JlIHJlYmluZGluZywgc28gaXQgY2FuIGJlIGZvdW5kIGJ5IDxjb2RlPl9iaW5kVmlzaWJpbGl0eTwvY29kZT5cbiAgICAgICAqL1xuICAgICAgY29uc3QgcmVzdWx0ID0gdGFyZ2V0W3AgYXMgc3RyaW5nXSA9IHZhbHVlO1xuXG4gICAgICAvKipcbiAgICAgICAqIDMpIFJlLWJpbmQgdGhlIHZpc2liaWxpdHkgYmluZGluZ3MgcmVmZXJlbmNpbmcgdG8gdGhpcyBjYW5vbmljYWwgcGF0aHNcbiAgICAgICAqL1xuICAgICAgY29uc3QgcmViaW5kVmlzaWJpbGl0eSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcmViaW5kQWxsID0gW3Byb3BlcnR5XS5jb25jYXQoY2hpbGRyZW4pO1xuICAgICAgICBjb25zdCBmaW5kUHJvcGVydGllc1RvUmViaW5kID0gKGZvcm1Qcm9wZXJ0eTogRm9ybVByb3BlcnR5KSA9PiB7XG4gICAgICAgICAgY29uc3QgcHJvcGVydHlCaW5kaW5ncyA9IGZvcm1Qcm9wZXJ0eS5fcHJvcGVydHlCaW5kaW5nUmVnaXN0cnkuZ2V0UHJvcGVydHlCaW5kaW5nc1Zpc2liaWxpdHkoKTtcbiAgICAgICAgICBsZXQgcmViaW5kOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgIGlmIChmb3JtUHJvcGVydHkuX2Nhbm9uaWNhbFBhdGgpIHtcbiAgICAgICAgICAgIHJlYmluZCA9IHJlYmluZC5jb25jYXQocmViaW5kLmNvbmNhdChwcm9wZXJ0eUJpbmRpbmdzLmZpbmRCeURlcGVuZGVuY3lQYXRoKGZvcm1Qcm9wZXJ0eS5fY2Fub25pY2FsUGF0aCkgfHwgW10pKTtcbiAgICAgICAgICAgIGlmIChmb3JtUHJvcGVydHkuX2Nhbm9uaWNhbFBhdGguc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICAgIHJlYmluZCA9IHJlYmluZC5jb25jYXQocmViaW5kLmNvbmNhdChwcm9wZXJ0eUJpbmRpbmdzLmZpbmRCeURlcGVuZGVuY3lQYXRoKGZvcm1Qcm9wZXJ0eS5fY2Fub25pY2FsUGF0aC5zdWJzdHJpbmcoMSkpIHx8IFtdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlYmluZCA9IHJlYmluZC5jb25jYXQocHJvcGVydHlCaW5kaW5ncy5maW5kQnlEZXBlbmRlbmN5UGF0aChmb3JtUHJvcGVydHkucGF0aCkgfHwgW10pO1xuICAgICAgICAgIGlmIChmb3JtUHJvcGVydHkucGF0aC5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgIHJlYmluZCA9IHJlYmluZC5jb25jYXQocmViaW5kLmNvbmNhdChwcm9wZXJ0eUJpbmRpbmdzLmZpbmRCeURlcGVuZGVuY3lQYXRoKGZvcm1Qcm9wZXJ0eS5wYXRoLnN1YnN0cmluZygxKSkgfHwgW10pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdW5pcXVlVmFsdWVzID0ge307XG4gICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHJlYmluZCkge1xuICAgICAgICAgICAgdW5pcXVlVmFsdWVzW2l0ZW1dID0gaXRlbTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHVuaXF1ZVZhbHVlcyk7XG4gICAgICAgIH07XG4gICAgICAgIGZvciAoY29uc3QgX3Byb3BlcnR5IG9mIHJlYmluZEFsbCkge1xuICAgICAgICAgIGlmIChfcHJvcGVydHkgaW5zdGFuY2VvZiBGb3JtUHJvcGVydHkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlYmluZFBhdGhzID0gZmluZFByb3BlcnRpZXNUb1JlYmluZChfcHJvcGVydHkpO1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHJlYmluZFByb3BQYXRoIG9mIHJlYmluZFBhdGhzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmViaW5kUHJvcCA9IF9wcm9wZXJ0eS5zZWFyY2hQcm9wZXJ0eShyZWJpbmRQcm9wUGF0aCk7XG4gICAgICAgICAgICAgICAgcmViaW5kUHJvcC5fYmluZFZpc2liaWxpdHkoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdSZWJpbmRpbmcgdmlzaWJpbGl0eSBlcnJvciBhdCBwYXRoOicsIF9wcm9wZXJ0eS5wYXRoLCAncHJvcGVydHk6JywgX3Byb3BlcnR5LCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZWJpbmRWaXNpYmlsaXR5KCk7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICBnZXQodGFyZ2V0OiBGb3JtUHJvcGVydHlbXSB8IHsgW3A6IHN0cmluZ106IEZvcm1Qcm9wZXJ0eSB9LCBwOiBQcm9wZXJ0eUtleSwgcmVjZWl2ZXI6IGFueSk6IGFueSB7XG4gICAgICByZXR1cm4gdGFyZ2V0W3AgYXMgc3RyaW5nXTtcbiAgICB9LFxuICAgIGRlbGV0ZVByb3BlcnR5KHRhcmdldDogRm9ybVByb3BlcnR5W10gfCB7IFtwOiBzdHJpbmddOiBGb3JtUHJvcGVydHkgfSwgcDogUHJvcGVydHlLZXkpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBkZWxldGUgdGFyZ2V0W3AgYXMgc3RyaW5nXTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0UHJvcGVydHkocGF0aDogc3RyaW5nKSB7XG4gICAgbGV0IHN1YlBhdGhJZHggPSBwYXRoLmluZGV4T2YoJy8nKTtcbiAgICBsZXQgcHJvcGVydHlJZCA9IHN1YlBhdGhJZHggIT09IC0xID8gcGF0aC5zdWJzdHIoMCwgc3ViUGF0aElkeCkgOiBwYXRoO1xuXG4gICAgbGV0IHByb3BlcnR5ID0gdGhpcy5wcm9wZXJ0aWVzW3Byb3BlcnR5SWRdO1xuICAgIGlmIChwcm9wZXJ0eSAhPT0gbnVsbCAmJiBzdWJQYXRoSWR4ICE9PSAtMSAmJiBwcm9wZXJ0eSBpbnN0YW5jZW9mIFByb3BlcnR5R3JvdXApIHtcbiAgICAgIGxldCBzdWJQYXRoID0gcGF0aC5zdWJzdHIoc3ViUGF0aElkeCArIDEpO1xuICAgICAgcHJvcGVydHkgPSAoPFByb3BlcnR5R3JvdXA+cHJvcGVydHkpLmdldFByb3BlcnR5KHN1YlBhdGgpO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcGVydHk7XG4gIH1cblxuICBwdWJsaWMgZm9yRWFjaENoaWxkKGZuOiAoZm9ybVByb3BlcnR5OiBGb3JtUHJvcGVydHksIHN0cjogU3RyaW5nKSA9PiB2b2lkKSB7XG4gICAgZm9yIChsZXQgcHJvcGVydHlJZCBpbiB0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHlJZCkpIHtcbiAgICAgICAgbGV0IHByb3BlcnR5ID0gdGhpcy5wcm9wZXJ0aWVzW3Byb3BlcnR5SWRdO1xuICAgICAgICBmbihwcm9wZXJ0eSwgcHJvcGVydHlJZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGZvckVhY2hDaGlsZFJlY3Vyc2l2ZShmbjogKGZvcm1Qcm9wZXJ0eTogRm9ybVByb3BlcnR5KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5mb3JFYWNoQ2hpbGQoKGNoaWxkKSA9PiB7XG4gICAgICBmbihjaGlsZCk7XG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBQcm9wZXJ0eUdyb3VwKSB7XG4gICAgICAgICg8UHJvcGVydHlHcm91cD5jaGlsZCkuZm9yRWFjaENoaWxkUmVjdXJzaXZlKGZuKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBfYmluZFZpc2liaWxpdHkoKSB7XG4gICAgc3VwZXIuX2JpbmRWaXNpYmlsaXR5KCk7XG4gICAgdGhpcy5fYmluZFZpc2liaWxpdHlSZWN1cnNpdmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2JpbmRWaXNpYmlsaXR5UmVjdXJzaXZlKCkge1xuICAgIHRoaXMuZm9yRWFjaENoaWxkUmVjdXJzaXZlKChwcm9wZXJ0eSkgPT4ge1xuICAgICAgcHJvcGVydHkuX2JpbmRWaXNpYmlsaXR5KCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaXNSb290KCkge1xuICAgIHJldHVybiB0aGlzID09PSB0aGlzLnJvb3Q7XG4gIH1cbn1cblxuXG4iXX0=