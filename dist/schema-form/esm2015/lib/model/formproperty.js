/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
/**
 * @abstract
 */
export class FormProperty {
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
export class PropertyGroup extends FormProperty {
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
if (false) {
    /** @type {?} */
    PropertyGroup.prototype._properties;
    /** @type {?} */
    PropertyGroup.prototype._propertyProxyHandler;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXByb3BlcnR5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL21vZGVsL2Zvcm1wcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDcEQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7O0FBTXpELE1BQU0sT0FBZ0IsWUFBWTs7Ozs7Ozs7SUFlaEMsWUFBWSxzQkFBOEMsRUFDdEMsaUJBQW9DLEVBQ3JDLE1BQVcsRUFDbEIsTUFBcUIsRUFDckIsSUFBWTtRQUhKLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDckMsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQWQ5QixXQUFNLEdBQVEsSUFBSSxDQUFDO1FBQ25CLFlBQU8sR0FBUSxJQUFJLENBQUM7UUFDWixrQkFBYSxHQUFHLElBQUksZUFBZSxDQUFNLElBQUksQ0FBQyxDQUFDO1FBQy9DLG1CQUFjLEdBQUcsSUFBSSxlQUFlLENBQU0sSUFBSSxDQUFDLENBQUM7UUFDaEQsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQix1QkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUMsQ0FBQztRQVk5RCxJQUFJLENBQUMsZUFBZSxHQUFHLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU3RSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztTQUMxQjthQUFNLElBQUksSUFBSSxZQUFZLGFBQWEsRUFBRTtZQUN4QyxJQUFJLENBQUMsS0FBSyxHQUFHLG1CQUFlLG1CQUFLLElBQUksRUFBQSxFQUFBLENBQUM7U0FDdkM7UUFD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O1NBQzNEO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7Ozs7SUFFTSxZQUFZLENBQUMsRUFBcUQ7UUFDdkUsS0FBSyxJQUFJLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3RDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUU7O29CQUMxQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7Z0JBQzFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDMUI7U0FDRjtJQUNILENBQUM7Ozs7O0lBRU0scUJBQXFCLENBQUMsRUFBd0M7UUFDbkUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzFCLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNWLElBQUksS0FBSyxZQUFZLGFBQWEsRUFBRTtnQkFDbEMsQ0FBQyxtQkFBZSxLQUFLLEVBQUEsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2xEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRU0sZUFBZTtRQUNwQixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVPLHdCQUF3QjtRQUM5QixJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN0QyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRU0sTUFBTTtRQUNYLE9BQU8sSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDNUIsQ0FBQztDQUNGOzs7SUEvSkMsb0NBQXFFOztJQWFyRSw4Q0FvR0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2Rpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtTY2hlbWFWYWxpZGF0b3JGYWN0b3J5fSBmcm9tICcuLi9zY2hlbWF2YWxpZGF0b3JmYWN0b3J5JztcbmltcG9ydCB7VmFsaWRhdG9yUmVnaXN0cnl9IGZyb20gJy4vdmFsaWRhdG9ycmVnaXN0cnknO1xuaW1wb3J0IHtQcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeX0gZnJvbSAnLi4vcHJvcGVydHktYmluZGluZy1yZWdpc3RyeSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGb3JtUHJvcGVydHkge1xuICBwdWJsaWMgc2NoZW1hVmFsaWRhdG9yOiBGdW5jdGlvbjtcblxuICBfdmFsdWU6IGFueSA9IG51bGw7XG4gIF9lcnJvcnM6IGFueSA9IG51bGw7XG4gIHByaXZhdGUgX3ZhbHVlQ2hhbmdlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcbiAgcHJpdmF0ZSBfZXJyb3JzQ2hhbmdlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcbiAgcHJpdmF0ZSBfdmlzaWJsZSA9IHRydWU7XG4gIHByaXZhdGUgX3Zpc2liaWxpdHlDaGFuZ2VzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgcHJpdmF0ZSBfcm9vdDogUHJvcGVydHlHcm91cDtcbiAgcHJpdmF0ZSBfcGFyZW50OiBQcm9wZXJ0eUdyb3VwO1xuICBwcml2YXRlIF9wYXRoOiBzdHJpbmc7XG4gIF9wcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeTogUHJvcGVydHlCaW5kaW5nUmVnaXN0cnk7XG4gIF9jYW5vbmljYWxQYXRoOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3Ioc2NoZW1hVmFsaWRhdG9yRmFjdG9yeTogU2NoZW1hVmFsaWRhdG9yRmFjdG9yeSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSB2YWxpZGF0b3JSZWdpc3RyeTogVmFsaWRhdG9yUmVnaXN0cnksXG4gICAgICAgICAgICAgIHB1YmxpYyBzY2hlbWE6IGFueSxcbiAgICAgICAgICAgICAgcGFyZW50OiBQcm9wZXJ0eUdyb3VwLFxuICAgICAgICAgICAgICBwYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNjaGVtYVZhbGlkYXRvciA9IHNjaGVtYVZhbGlkYXRvckZhY3RvcnkuY3JlYXRlVmFsaWRhdG9yRm4odGhpcy5zY2hlbWEpO1xuXG4gICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHRoaXMuX3Jvb3QgPSBwYXJlbnQucm9vdDtcbiAgICB9IGVsc2UgaWYgKHRoaXMgaW5zdGFuY2VvZiBQcm9wZXJ0eUdyb3VwKSB7XG4gICAgICB0aGlzLl9yb290ID0gPFByb3BlcnR5R3JvdXA+PGFueT50aGlzO1xuICAgIH1cbiAgICB0aGlzLl9wYXRoID0gcGF0aDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmFsdWVDaGFuZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZUNoYW5nZXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGVycm9yc0NoYW5nZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Vycm9yc0NoYW5nZXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zY2hlbWEudHlwZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGFyZW50KCk6IFByb3BlcnR5R3JvdXAge1xuICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHJvb3QoKTogUHJvcGVydHlHcm91cCB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvb3QgfHwgPFByb3BlcnR5R3JvdXA+PGFueT50aGlzO1xuICB9XG5cbiAgcHVibGljIGdldCBwYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3BhdGg7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmFsaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Vycm9ycyA9PT0gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBzZXRWYWx1ZSh2YWx1ZTogYW55LCBvbmx5U2VsZjogYm9vbGVhbik7XG5cbiAgcHVibGljIGFic3RyYWN0IHJlc2V0KHZhbHVlOiBhbnksIG9ubHlTZWxmOiBib29sZWFuKTtcblxuICBwdWJsaWMgdXBkYXRlVmFsdWVBbmRWYWxpZGl0eShvbmx5U2VsZiA9IGZhbHNlLCBlbWl0RXZlbnQgPSB0cnVlKSB7XG4gICAgdGhpcy5fdXBkYXRlVmFsdWUoKTtcblxuICAgIGlmIChlbWl0RXZlbnQpIHtcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2VzLm5leHQodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5fcnVuVmFsaWRhdGlvbigpO1xuXG4gICAgaWYgKHRoaXMucGFyZW50ICYmICFvbmx5U2VsZikge1xuICAgICAgdGhpcy5wYXJlbnQudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShvbmx5U2VsZiwgZW1pdEV2ZW50KTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBfaGFzVmFsdWUoKTogYm9vbGVhbjtcblxuICAvKipcbiAgICogIEBpbnRlcm5hbFxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IF91cGRhdGVWYWx1ZSgpO1xuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHB1YmxpYyBfcnVuVmFsaWRhdGlvbigpOiBhbnkge1xuICAgIGxldCBlcnJvcnMgPSB0aGlzLnNjaGVtYVZhbGlkYXRvcih0aGlzLl92YWx1ZSkgfHwgW107XG4gICAgbGV0IGN1c3RvbVZhbGlkYXRvciA9IHRoaXMudmFsaWRhdG9yUmVnaXN0cnkuZ2V0KHRoaXMucGF0aCk7XG4gICAgaWYgKGN1c3RvbVZhbGlkYXRvcikge1xuICAgICAgbGV0IGN1c3RvbUVycm9ycyA9IGN1c3RvbVZhbGlkYXRvcih0aGlzLnZhbHVlLCB0aGlzLCB0aGlzLmZpbmRSb290KCkpO1xuICAgICAgZXJyb3JzID0gdGhpcy5tZXJnZUVycm9ycyhlcnJvcnMsIGN1c3RvbUVycm9ycyk7XG4gICAgfVxuICAgIGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICBlcnJvcnMgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuX2Vycm9ycyA9IGVycm9ycztcbiAgICB0aGlzLnNldEVycm9ycyh0aGlzLl9lcnJvcnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBtZXJnZUVycm9ycyhlcnJvcnMsIG5ld0Vycm9ycykge1xuICAgIGlmIChuZXdFcnJvcnMpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG5ld0Vycm9ycykpIHtcbiAgICAgICAgZXJyb3JzID0gZXJyb3JzLmNvbmNhdCguLi5uZXdFcnJvcnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXJyb3JzLnB1c2gobmV3RXJyb3JzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVycm9ycztcbiAgfVxuXG4gIHByaXZhdGUgc2V0RXJyb3JzKGVycm9ycykge1xuICAgIHRoaXMuX2Vycm9ycyA9IGVycm9ycztcbiAgICB0aGlzLl9lcnJvcnNDaGFuZ2VzLm5leHQoZXJyb3JzKTtcbiAgfVxuXG4gIHB1YmxpYyBleHRlbmRFcnJvcnMoZXJyb3JzKSB7XG4gICAgZXJyb3JzID0gdGhpcy5tZXJnZUVycm9ycyh0aGlzLl9lcnJvcnMgfHwgW10sIGVycm9ycyk7XG4gICAgdGhpcy5zZXRFcnJvcnMoZXJyb3JzKTtcbiAgfVxuXG4gIHNlYXJjaFByb3BlcnR5KHBhdGg6IHN0cmluZyk6IEZvcm1Qcm9wZXJ0eSB7XG4gICAgbGV0IHByb3A6IEZvcm1Qcm9wZXJ0eSA9IHRoaXM7XG4gICAgbGV0IGJhc2U6IFByb3BlcnR5R3JvdXAgPSBudWxsO1xuXG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgaWYgKHBhdGhbMF0gPT09ICcvJykge1xuICAgICAgYmFzZSA9IHRoaXMuZmluZFJvb3QoKTtcbiAgICAgIHJlc3VsdCA9IGJhc2UuZ2V0UHJvcGVydHkocGF0aC5zdWJzdHIoMSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aGlsZSAocmVzdWx0ID09PSBudWxsICYmIHByb3AucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHByb3AgPSBiYXNlID0gcHJvcC5wYXJlbnQ7XG4gICAgICAgIHJlc3VsdCA9IGJhc2UuZ2V0UHJvcGVydHkocGF0aCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgZmluZFJvb3QoKTogUHJvcGVydHlHcm91cCB7XG4gICAgbGV0IHByb3BlcnR5OiBGb3JtUHJvcGVydHkgPSB0aGlzO1xuICAgIHdoaWxlIChwcm9wZXJ0eS5wYXJlbnQgIT09IG51bGwpIHtcbiAgICAgIHByb3BlcnR5ID0gcHJvcGVydHkucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gPFByb3BlcnR5R3JvdXA+cHJvcGVydHk7XG4gIH1cblxuICBwcml2YXRlIHNldFZpc2libGUodmlzaWJsZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Zpc2libGUgPSB2aXNpYmxlO1xuICAgIHRoaXMuX3Zpc2liaWxpdHlDaGFuZ2VzLm5leHQodmlzaWJsZSk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICB0aGlzLnBhcmVudC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KGZhbHNlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9fYmluZFZpc2liaWxpdHkoKTogYm9vbGVhbiB7XG4gICAgLyoqXG4gICAgICogPHByZT5cbiAgICAgKiAgICAgXCJvbmVPZlwiOlt7XG4gICAgICogICAgICAgICBcInBhdGhcIjpbXCJ2YWx1ZVwiLFwidmFsdWVcIl1cbiAgICAgKiAgICAgfSx7XG4gICAgICogICAgICAgICBcInBhdGhcIjpbXCJ2YWx1ZVwiLFwidmFsdWVcIl1cbiAgICAgKiAgICAgfV1cbiAgICAgKiAgICAgPC9wcmU+XG4gICAgICogPHByZT5cbiAgICAgKiAgICAgXCJhbGxPZlwiOlt7XG4gICAgICogICAgICAgICBcInBhdGhcIjpbXCJ2YWx1ZVwiLFwidmFsdWVcIl1cbiAgICAgKiAgICAgfSx7XG4gICAgICogICAgICAgICBcInBhdGhcIjpbXCJ2YWx1ZVwiLFwidmFsdWVcIl1cbiAgICAgKiAgICAgfV1cbiAgICAgKiAgICAgPC9wcmU+XG4gICAgICovXG4gICAgY29uc3QgdmlzaWJsZUlmUHJvcGVydHkgPSB0aGlzLnNjaGVtYS52aXNpYmxlSWY7XG4gICAgY29uc3QgdmlzaWJsZUlmT2YgPSAodmlzaWJsZUlmUHJvcGVydHkgfHwge30pLm9uZU9mIHx8ICh2aXNpYmxlSWZQcm9wZXJ0eSB8fCB7fSkuYWxsT2Y7XG4gICAgaWYgKHZpc2libGVJZk9mKSB7XG4gICAgICBmb3IgKGNvbnN0IHZpc2libGVJZiBvZiB2aXNpYmxlSWZPZikge1xuICAgICAgICBpZiAodHlwZW9mIHZpc2libGVJZiA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXModmlzaWJsZUlmKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLnNldFZpc2libGUoZmFsc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHZpc2libGVJZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3QgcHJvcGVydGllc0JpbmRpbmcgPSBbXTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGRlcGVuZGVuY3lQYXRoIGluIHZpc2libGVJZikge1xuICAgICAgICAgICAgaWYgKHZpc2libGVJZi5oYXNPd25Qcm9wZXJ0eShkZXBlbmRlbmN5UGF0aCkpIHtcbiAgICAgICAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMuZmluZFByb3BlcnRpZXModGhpcywgZGVwZW5kZW5jeVBhdGgpO1xuICAgICAgICAgICAgICBpZiAoKHByb3BlcnRpZXMgfHwgW10pLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcGVydHkgb2YgcHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZUNoZWNrO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2hlbWEudmlzaWJsZUlmLm9uZU9mKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWVDaGVjayA9IHByb3BlcnR5LnZhbHVlQ2hhbmdlcy5waXBlKG1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZpc2libGVJZltkZXBlbmRlbmN5UGF0aF0uaW5kZXhPZignJEFOWSQnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID4gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmlzaWJsZUlmW2RlcGVuZGVuY3lQYXRoXS5pbmRleE9mKHZhbHVlKSAhPT0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNjaGVtYS52aXNpYmxlSWYuYWxsT2YpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBfY2hrID0gKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5zY2hlbWEudmlzaWJsZUlmLmFsbE9mKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZGVwUGF0aCBvZiBPYmplY3Qua2V5cyhpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3AgPSB0aGlzLnNlYXJjaFByb3BlcnR5KGRlcFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3BWYWwgPSBwcm9wLl92YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbVtkZXBQYXRoXS5pbmRleE9mKCckQU5ZJCcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBwcm9wVmFsLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkID0gaXRlbVtkZXBQYXRoXS5pbmRleE9mKHByb3BWYWwpICE9PSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZUNoZWNrID0gcHJvcGVydHkudmFsdWVDaGFuZ2VzLnBpcGUobWFwKF9jaGspKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aXNpYmlsaXR5Q2hlY2sgPSBwcm9wZXJ0eS5fdmlzaWJpbGl0eUNoYW5nZXM7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFuZCA9IGNvbWJpbmVMYXRlc3QoW3ZhbHVlQ2hlY2ssIHZpc2liaWxpdHlDaGVja10sICh2MSwgdjIpID0+IHYxICYmIHYyKTtcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc0JpbmRpbmcucHVzaChhbmQpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NhblxcJ3QgZmluZCBwcm9wZXJ0eSAnICsgZGVwZW5kZW5jeVBhdGggKyAnIGZvciB2aXNpYmlsaXR5IGNoZWNrIG9mICcgKyB0aGlzLnBhdGgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJNaXNzaW5nVmlzaWJpbGl0eUJpbmRpbmcoZGVwZW5kZW5jeVBhdGgsIHRoaXMpO1xuICAgICAgICAgICAgICAgIC8vIG5vdCB2aXNpYmxlIGlmIG5vdCBleGlzdGVudFxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb21iaW5lTGF0ZXN0KHByb3BlcnRpZXNCaW5kaW5nLCAoLi4udmFsdWVzOiBib29sZWFuW10pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXMuaW5kZXhPZih0cnVlKSAhPT0gLTE7XG4gICAgICAgICAgfSkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKS5zdWJzY3JpYmUoKHZpc2libGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmlzaWJsZSh2aXNpYmxlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgLy8gQSBmaWVsZCBpcyB2aXNpYmxlIGlmIEFUIExFQVNUIE9ORSBvZiB0aGUgcHJvcGVydGllcyBpdCBkZXBlbmRzIG9uIGlzIHZpc2libGUgQU5EIGhhcyBhIHZhbHVlIGluIHRoZSBsaXN0XG4gIHB1YmxpYyBfYmluZFZpc2liaWxpdHkoKSB7XG4gICAgaWYgKHRoaXMuX19iaW5kVmlzaWJpbGl0eSgpKVxuICAgICAgcmV0dXJuO1xuICAgIGxldCB2aXNpYmxlSWYgPSB0aGlzLnNjaGVtYS52aXNpYmxlSWY7XG4gICAgaWYgKHR5cGVvZiB2aXNpYmxlSWYgPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKHZpc2libGVJZikubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnNldFZpc2libGUoZmFsc2UpO1xuICAgIH0gZWxzZSBpZiAodmlzaWJsZUlmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCBwcm9wZXJ0aWVzQmluZGluZyA9IFtdO1xuICAgICAgZm9yIChsZXQgZGVwZW5kZW5jeVBhdGggaW4gdmlzaWJsZUlmKSB7XG4gICAgICAgIGlmICh2aXNpYmxlSWYuaGFzT3duUHJvcGVydHkoZGVwZW5kZW5jeVBhdGgpKSB7XG4gICAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMuZmluZFByb3BlcnRpZXModGhpcywgZGVwZW5kZW5jeVBhdGgpO1xuICAgICAgICAgIGlmICgocHJvcGVydGllcyB8fCBbXSkubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHByb3BlcnR5IG9mIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgaWYgKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVDaGVjayA9IHByb3BlcnR5LnZhbHVlQ2hhbmdlcy5waXBlKG1hcChcbiAgICAgICAgICAgICAgICAgIHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpc2libGVJZltkZXBlbmRlbmN5UGF0aF0uaW5kZXhPZignJEFOWSQnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID4gMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmlzaWJsZUlmW2RlcGVuZGVuY3lQYXRoXS5pbmRleE9mKHZhbHVlKSAhPT0gLTE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2aXNpYmlsaXR5Q2hlY2sgPSBwcm9wZXJ0eS5fdmlzaWJpbGl0eUNoYW5nZXM7XG4gICAgICAgICAgICAgICAgY29uc3QgYW5kID0gY29tYmluZUxhdGVzdChbdmFsdWVDaGVjaywgdmlzaWJpbGl0eUNoZWNrXSwgKHYxLCB2MikgPT4gdjEgJiYgdjIpO1xuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNCaW5kaW5nLnB1c2goYW5kKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NhblxcJ3QgZmluZCBwcm9wZXJ0eSAnICsgZGVwZW5kZW5jeVBhdGggKyAnIGZvciB2aXNpYmlsaXR5IGNoZWNrIG9mICcgKyB0aGlzLnBhdGgpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3Rlck1pc3NpbmdWaXNpYmlsaXR5QmluZGluZyhkZXBlbmRlbmN5UGF0aCwgdGhpcyk7XG4gICAgICAgICAgICAvLyBub3QgdmlzaWJsZSBpZiBub3QgZXhpc3RlbnRcbiAgICAgICAgICAgIHRoaXMuc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbWJpbmVMYXRlc3QocHJvcGVydGllc0JpbmRpbmcsICguLi52YWx1ZXM6IGJvb2xlYW5bXSkgPT4ge1xuICAgICAgICByZXR1cm4gdmFsdWVzLmluZGV4T2YodHJ1ZSkgIT09IC0xO1xuICAgICAgfSkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKS5zdWJzY3JpYmUoKHZpc2libGUpID0+IHtcbiAgICAgICAgdGhpcy5zZXRWaXNpYmxlKHZpc2libGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWdpc3Rlck1pc3NpbmdWaXNpYmlsaXR5QmluZGluZyhkZXBlbmRlbmN5UGF0aDogc3RyaW5nLCBmb3JtUHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSkge1xuICAgIGZvcm1Qcm9wZXJ0eS5fcHJvcGVydHlCaW5kaW5nUmVnaXN0cnkuZ2V0UHJvcGVydHlCaW5kaW5nc1Zpc2liaWxpdHkoKS5hZGQoZGVwZW5kZW5jeVBhdGgsIGZvcm1Qcm9wZXJ0eS5wYXRoKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEZpbmRzIGFsbCA8Y29kZT5mb3JtUHJvcGVydGllczwvY29kZT4gZnJvbSBhIHBhdGggd2l0aCB3aWxkY2FyZHMuPGJyLz5cbiAgICogZS5nOiA8Y29kZT4vZ2FyYWdlL2NhcnMvJiM0MjsvdGlyZXMvJiM0MjsvbmFtZTwvY29kZT48YnIvPlxuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqIEBwYXJhbSBwcm9wZXJ0eVBhdGhcbiAgICovXG4gIGZpbmRQcm9wZXJ0aWVzKHRhcmdldDogRm9ybVByb3BlcnR5LCBwcm9wZXJ0eVBhdGg6IHN0cmluZyk6IEZvcm1Qcm9wZXJ0eVtdIHtcbiAgICBjb25zdCBwcm9wczogRm9ybVByb3BlcnR5W10gPSBbXTtcbiAgICBjb25zdCBwYXRocyA9IHRoaXMuZmluZFByb3BlcnR5UGF0aHModGFyZ2V0LCBwcm9wZXJ0eVBhdGgpO1xuICAgIGZvciAoY29uc3QgcGF0aCBvZiBwYXRocykge1xuICAgICAgY29uc3QgcDogRm9ybVByb3BlcnR5ID0gdGFyZ2V0LnNlYXJjaFByb3BlcnR5KHBhdGgpO1xuICAgICAgaWYgKHApIHtcbiAgICAgICAgcHJvcHMucHVzaChwKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgY2Fub25pY2FsIHBhdGhzIGZyb20gYSBwYXRoIHdpdGggd2lsZGNhcmRzLlxuICAgKiBlLmc6PGJyLz5cbiAgICogRnJvbTo8YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvJiM0MjsvdGlyZXMvJiM0MjsvbmFtZTwvY29kZT48YnIvPlxuICAgKiBpdCBjcmVhdGVzOjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8wL3RpcmVzLzAvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMC90aXJlcy8xL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLzAvdGlyZXMvMi9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8wL3RpcmVzLzMvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMS90aXJlcy8wL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLzIvdGlyZXMvMS9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8zL3RpcmVzLzIvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMy90aXJlcy8zL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLyYjNDI7L3RpcmVzLyYjNDI7L25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLyYjNDI7L3RpcmVzLzIvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvJiM0MjsvdGlyZXMvMy9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxici8+ZXRjLi4uXG4gICAqIEBwYXJhbSB0YXJnZXRcbiAgICogQHBhcmFtIHBhdGhcbiAgICogQHBhcmFtIHBhcmVudFBhdGhcbiAgICovXG4gIGZpbmRQcm9wZXJ0eVBhdGhzKHRhcmdldDogRm9ybVByb3BlcnR5LCBwYXRoOiBzdHJpbmcsIHBhcmVudFBhdGg/OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgaXggPSBwYXRoLmluZGV4T2YoJyonKTtcbiAgICBpZiAoLTEgIT09IGl4KSB7XG4gICAgICBjb25zdCBwcmVQYXRoID0gaXggPiAtMSA/IHBhdGguc3Vic3RyaW5nKDAsIGl4IC0gMSkgOiBwYXRoO1xuICAgICAgY29uc3Qgc3ViUGF0aCA9IGl4ID4gLTEgPyBwYXRoLnN1YnN0cmluZyhpeCArIDEpIDogcGF0aDtcbiAgICAgIGNvbnN0IHByb3A6IEZvcm1Qcm9wZXJ0eSA9IHRhcmdldC5zZWFyY2hQcm9wZXJ0eShwcmVQYXRoKTtcbiAgICAgIGxldCBwYXRoRm91bmQgPSBbXTtcbiAgICAgIGlmIChwcm9wIGluc3RhbmNlb2YgUHJvcGVydHlHcm91cCkge1xuICAgICAgICBjb25zdCBhcnJQcm9wID0gcHJvcC5wcm9wZXJ0aWVzIGFzIEZvcm1Qcm9wZXJ0eVtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyclByb3AubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjdXJyZUl0ZW1QYXRoID0gKHBhcmVudFBhdGggfHwgJycpICsgcHJlUGF0aCArIChwcmVQYXRoLmVuZHNXaXRoKCcvJykgPyAnJyA6ICcvJykgKyBpICsgc3ViUGF0aDtcbiAgICAgICAgICBjb25zdCBjdXJyZUl0ZW1QcmVQYXRoID0gKHBhcmVudFBhdGggfHwgJycpICsgcHJlUGF0aCArIGk7XG4gICAgICAgICAgaWYgKC0xID09PSBjdXJyZUl0ZW1QYXRoLmluZGV4T2YoJyonKSkge1xuICAgICAgICAgICAgcGF0aEZvdW5kLnB1c2goY3VycmVJdGVtUGF0aCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGNoaWxkcmVuUGF0aEZvdW5kID0gdGhpcy5maW5kUHJvcGVydHlQYXRocyhhcnJQcm9wW2ldLCBzdWJQYXRoLCBjdXJyZUl0ZW1QcmVQYXRoKTtcbiAgICAgICAgICBwYXRoRm91bmQgPSBwYXRoRm91bmQuY29uY2F0KGNoaWxkcmVuUGF0aEZvdW5kKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHBhdGhGb3VuZDtcbiAgICB9XG4gICAgcmV0dXJuIFtwYXRoXTtcbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJvcGVydHlHcm91cCBleHRlbmRzIEZvcm1Qcm9wZXJ0eSB7XG5cbiAgX3Byb3BlcnRpZXM6IEZvcm1Qcm9wZXJ0eVtdIHwgeyBba2V5OiBzdHJpbmddOiBGb3JtUHJvcGVydHkgfSA9IG51bGw7XG5cbiAgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXM7XG4gIH1cblxuICBzZXQgcHJvcGVydGllcyhwcm9wZXJ0aWVzOiBGb3JtUHJvcGVydHlbXSB8IHsgW2tleTogc3RyaW5nXTogRm9ybVByb3BlcnR5IH0pIHtcbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGUgc2V0dGVyIHRvIGFkZCBhbiBvYnNlcnZlciB0aGF0IG5vdGljZXMgd2hlbiBhbiBpdGVtIGlzIGFkZGVkIG9yIHJlbW92ZWQuPGJyLz5cbiAgICAgKi9cbiAgICB0aGlzLl9wcm9wZXJ0aWVzID0gbmV3IFByb3h5KHByb3BlcnRpZXMsIHRoaXMuX3Byb3BlcnR5UHJveHlIYW5kbGVyKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Byb3BlcnR5UHJveHlIYW5kbGVyOiBQcm94eUhhbmRsZXI8Rm9ybVByb3BlcnR5W10gfCB7IFtrZXk6IHN0cmluZ106IEZvcm1Qcm9wZXJ0eSB9PiA9IHtcbiAgICAvKipcbiAgICAgKiBXaGVuIGEgbmV3IGl0ZW0gaXMgYWRkZWQgaXQgd2lsbCBiZSBjaGVja2VkIGZvciB2aXNpYmlsaXR5IHVwZGF0ZXMgdG8gcHJvY2VlZCA8YnIvPlxuICAgICAqIGlmIGFueSBvdGhlciBmaWVsZCBoYXMgYSBiaW5kaW5nIHJlZmVyZW5jZSB0byBpdC48YnIvPlxuICAgICAqL1xuICAgIHNldCh0YXJnZXQ6IEZvcm1Qcm9wZXJ0eVtdIHwgeyBbcDogc3RyaW5nXTogRm9ybVByb3BlcnR5IH0sIHA6IFByb3BlcnR5S2V5LCB2YWx1ZTogYW55LCByZWNlaXZlcjogYW55KTogYm9vbGVhbiB7XG5cbiAgICAgIC8qKlxuICAgICAgICogMSkgTWFrZSBzdXJlIGEgY2Fub25pY2FsIHBhdGggaXMgc2V0XG4gICAgICAgKi9cbiAgICAgIGNvbnN0IGFzc2VydENhbm9uaWNhbFBhdGggPSAocHJvcGVydHlWYWx1ZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm1Qcm9wZXJ0eSA9IHByb3BlcnR5VmFsdWUgYXMgRm9ybVByb3BlcnR5O1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIHByb3BlcnR5VmFsdWUgaW5zdGFuY2VvZiBGb3JtUHJvcGVydHkpIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBDcmVhdGUgYSBjYW5vbmljYWwgcGF0aCByZXBsYWNpbmcgdGhlIGxhc3QgJyonIHdpdGggdGhlIGVsZW1lbnRzIHBvc2l0aW9uIGluIGFycmF5XG4gICAgICAgICAgICogQHBhcmFtIHByb3BlcnR5UGF0aFxuICAgICAgICAgICAqIEBwYXJhbSBpbmRleE9mQ2hpbGRcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBjb25zdCBnZXRDYW5vbmljYWxQYXRoID0gKHByb3BlcnR5UGF0aDogc3RyaW5nLCBpbmRleE9mQ2hpbGQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgbGV0IHBvcztcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eVBhdGggJiYgLTEgIT09IChwb3MgPSBwcm9wZXJ0eVBhdGgubGFzdEluZGV4T2YoJyonKSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5UGF0aC5zdWJzdHJpbmcoMCwgcG9zKSArIGluZGV4T2ZDaGlsZC50b1N0cmluZygpICsgcHJvcGVydHlQYXRoLnN1YnN0cmluZyhwb3MgKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmIChmb3JtUHJvcGVydHkpIHtcbiAgICAgICAgICAgIGZvcm1Qcm9wZXJ0eS5fY2Fub25pY2FsUGF0aCA9IGdldENhbm9uaWNhbFBhdGgoZm9ybVByb3BlcnR5Ll9jYW5vbmljYWxQYXRoLCBwIGFzIG51bWJlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvcGVydHlHcm91cCA9IGZvcm1Qcm9wZXJ0eSBhcyBQcm9wZXJ0eUdyb3VwO1xuICAgICAgICBjb25zdCBwcm9wZXJ0eUdyb3VwQ2hpbGRyZW4gPSAoQXJyYXkuaXNBcnJheShwcm9wZXJ0eUdyb3VwLnByb3BlcnRpZXMpID9cbiAgICAgICAgICBwcm9wZXJ0eUdyb3VwLnByb3BlcnRpZXMgOlxuICAgICAgICAgIE9iamVjdC52YWx1ZXMocHJvcGVydHlHcm91cC5wcm9wZXJ0aWVzIHx8IHt9KSkgYXMgRm9ybVByb3BlcnR5W107XG4gICAgICAgIGlmICgoZm9ybVByb3BlcnR5LnBhdGggfHwgJycpLmVuZHNXaXRoKCcvKicpKSB7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSWYgaXQgaXMgYW4gYXJyYXksIHRoZW4gYWxsIGNoaWxkcmVuIGNhbm9uaWNhbCBwYXRocyBtdXN0IGJlIGNvbXB1dGVkIG5vdy5cbiAgICAgICAgICAgKiBUaGUgY2hpbGRyZW4gZG9uJ3QgaGF2ZSB0aGUgcGFyZW50J3MgcGF0aCBzZWdtZW50IHNldCB5ZXQsXG4gICAgICAgICAgICogYmVjYXVzZSB0aGV5IGFyZSBjcmVhdGVkIGJlZm9yZSB0aGUgcGFyZW50IGdldHMgYXR0YWNoZWQgdG8gaXRzIHBhcmVudC5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHByb3BlcnR5R3JvdXBDaGlsZHJlbikge1xuICAgICAgICAgICAgY2hpbGQuX2Nhbm9uaWNhbFBhdGggPSBmb3JtUHJvcGVydHkuX2Nhbm9uaWNhbFBhdGggKyBjaGlsZC5fY2Fub25pY2FsUGF0aC5zdWJzdHJpbmcoZm9ybVByb3BlcnR5LnBhdGgubGVuZ3RoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtwcm9wZXJ0eTogZm9ybVByb3BlcnR5LCBjaGlsZHJlbjogcHJvcGVydHlHcm91cENoaWxkcmVufTtcbiAgICAgIH07XG4gICAgICBjb25zdCB7cHJvcGVydHksIGNoaWxkcmVufSA9IGFzc2VydENhbm9uaWNhbFBhdGgodmFsdWUpO1xuXG4gICAgICAvKipcbiAgICAgICAqIDIpIEFkZCB0aGUgbmV3IHByb3BlcnR5IGJlZm9yZSByZWJpbmRpbmcsIHNvIGl0IGNhbiBiZSBmb3VuZCBieSA8Y29kZT5fYmluZFZpc2liaWxpdHk8L2NvZGU+XG4gICAgICAgKi9cbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRhcmdldFtwIGFzIHN0cmluZ10gPSB2YWx1ZTtcblxuICAgICAgLyoqXG4gICAgICAgKiAzKSBSZS1iaW5kIHRoZSB2aXNpYmlsaXR5IGJpbmRpbmdzIHJlZmVyZW5jaW5nIHRvIHRoaXMgY2Fub25pY2FsIHBhdGhzXG4gICAgICAgKi9cbiAgICAgIGNvbnN0IHJlYmluZFZpc2liaWxpdHkgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlYmluZEFsbCA9IFtwcm9wZXJ0eV0uY29uY2F0KGNoaWxkcmVuKTtcbiAgICAgICAgY29uc3QgZmluZFByb3BlcnRpZXNUb1JlYmluZCA9IChmb3JtUHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHByb3BlcnR5QmluZGluZ3MgPSBmb3JtUHJvcGVydHkuX3Byb3BlcnR5QmluZGluZ1JlZ2lzdHJ5LmdldFByb3BlcnR5QmluZGluZ3NWaXNpYmlsaXR5KCk7XG4gICAgICAgICAgbGV0IHJlYmluZDogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICBpZiAoZm9ybVByb3BlcnR5Ll9jYW5vbmljYWxQYXRoKSB7XG4gICAgICAgICAgICByZWJpbmQgPSByZWJpbmQuY29uY2F0KHJlYmluZC5jb25jYXQocHJvcGVydHlCaW5kaW5ncy5maW5kQnlEZXBlbmRlbmN5UGF0aChmb3JtUHJvcGVydHkuX2Nhbm9uaWNhbFBhdGgpIHx8IFtdKSk7XG4gICAgICAgICAgICBpZiAoZm9ybVByb3BlcnR5Ll9jYW5vbmljYWxQYXRoLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgICByZWJpbmQgPSByZWJpbmQuY29uY2F0KHJlYmluZC5jb25jYXQocHJvcGVydHlCaW5kaW5ncy5maW5kQnlEZXBlbmRlbmN5UGF0aChmb3JtUHJvcGVydHkuX2Nhbm9uaWNhbFBhdGguc3Vic3RyaW5nKDEpKSB8fCBbXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZWJpbmQgPSByZWJpbmQuY29uY2F0KHByb3BlcnR5QmluZGluZ3MuZmluZEJ5RGVwZW5kZW5jeVBhdGgoZm9ybVByb3BlcnR5LnBhdGgpIHx8IFtdKTtcbiAgICAgICAgICBpZiAoZm9ybVByb3BlcnR5LnBhdGguc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICByZWJpbmQgPSByZWJpbmQuY29uY2F0KHJlYmluZC5jb25jYXQocHJvcGVydHlCaW5kaW5ncy5maW5kQnlEZXBlbmRlbmN5UGF0aChmb3JtUHJvcGVydHkucGF0aC5zdWJzdHJpbmcoMSkpIHx8IFtdKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHVuaXF1ZVZhbHVlcyA9IHt9O1xuICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiByZWJpbmQpIHtcbiAgICAgICAgICAgIHVuaXF1ZVZhbHVlc1tpdGVtXSA9IGl0ZW07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh1bmlxdWVWYWx1ZXMpO1xuICAgICAgICB9O1xuICAgICAgICBmb3IgKGNvbnN0IF9wcm9wZXJ0eSBvZiByZWJpbmRBbGwpIHtcbiAgICAgICAgICBpZiAoX3Byb3BlcnR5IGluc3RhbmNlb2YgRm9ybVByb3BlcnR5KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCByZWJpbmRQYXRocyA9IGZpbmRQcm9wZXJ0aWVzVG9SZWJpbmQoX3Byb3BlcnR5KTtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCByZWJpbmRQcm9wUGF0aCBvZiByZWJpbmRQYXRocykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlYmluZFByb3AgPSBfcHJvcGVydHkuc2VhcmNoUHJvcGVydHkocmViaW5kUHJvcFBhdGgpO1xuICAgICAgICAgICAgICAgIHJlYmluZFByb3AuX2JpbmRWaXNpYmlsaXR5KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignUmViaW5kaW5nIHZpc2liaWxpdHkgZXJyb3IgYXQgcGF0aDonLCBfcHJvcGVydHkucGF0aCwgJ3Byb3BlcnR5OicsIF9wcm9wZXJ0eSwgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmViaW5kVmlzaWJpbGl0eSgpO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgZ2V0KHRhcmdldDogRm9ybVByb3BlcnR5W10gfCB7IFtwOiBzdHJpbmddOiBGb3JtUHJvcGVydHkgfSwgcDogUHJvcGVydHlLZXksIHJlY2VpdmVyOiBhbnkpOiBhbnkge1xuICAgICAgcmV0dXJuIHRhcmdldFtwIGFzIHN0cmluZ107XG4gICAgfSxcbiAgICBkZWxldGVQcm9wZXJ0eSh0YXJnZXQ6IEZvcm1Qcm9wZXJ0eVtdIHwgeyBbcDogc3RyaW5nXTogRm9ybVByb3BlcnR5IH0sIHA6IFByb3BlcnR5S2V5KTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gZGVsZXRlIHRhcmdldFtwIGFzIHN0cmluZ107XG4gICAgfVxuICB9O1xuXG4gIGdldFByb3BlcnR5KHBhdGg6IHN0cmluZykge1xuICAgIGxldCBzdWJQYXRoSWR4ID0gcGF0aC5pbmRleE9mKCcvJyk7XG4gICAgbGV0IHByb3BlcnR5SWQgPSBzdWJQYXRoSWR4ICE9PSAtMSA/IHBhdGguc3Vic3RyKDAsIHN1YlBhdGhJZHgpIDogcGF0aDtcblxuICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMucHJvcGVydGllc1twcm9wZXJ0eUlkXTtcbiAgICBpZiAocHJvcGVydHkgIT09IG51bGwgJiYgc3ViUGF0aElkeCAhPT0gLTEgJiYgcHJvcGVydHkgaW5zdGFuY2VvZiBQcm9wZXJ0eUdyb3VwKSB7XG4gICAgICBsZXQgc3ViUGF0aCA9IHBhdGguc3Vic3RyKHN1YlBhdGhJZHggKyAxKTtcbiAgICAgIHByb3BlcnR5ID0gKDxQcm9wZXJ0eUdyb3VwPnByb3BlcnR5KS5nZXRQcm9wZXJ0eShzdWJQYXRoKTtcbiAgICB9XG4gICAgcmV0dXJuIHByb3BlcnR5O1xuICB9XG5cbiAgcHVibGljIGZvckVhY2hDaGlsZChmbjogKGZvcm1Qcm9wZXJ0eTogRm9ybVByb3BlcnR5LCBzdHI6IFN0cmluZykgPT4gdm9pZCkge1xuICAgIGZvciAobGV0IHByb3BlcnR5SWQgaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG4gICAgICBpZiAodGhpcy5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5SWQpKSB7XG4gICAgICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMucHJvcGVydGllc1twcm9wZXJ0eUlkXTtcbiAgICAgICAgZm4ocHJvcGVydHksIHByb3BlcnR5SWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBmb3JFYWNoQ2hpbGRSZWN1cnNpdmUoZm46IChmb3JtUHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSkgPT4gdm9pZCkge1xuICAgIHRoaXMuZm9yRWFjaENoaWxkKChjaGlsZCkgPT4ge1xuICAgICAgZm4oY2hpbGQpO1xuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgUHJvcGVydHlHcm91cCkge1xuICAgICAgICAoPFByb3BlcnR5R3JvdXA+Y2hpbGQpLmZvckVhY2hDaGlsZFJlY3Vyc2l2ZShmbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgX2JpbmRWaXNpYmlsaXR5KCkge1xuICAgIHN1cGVyLl9iaW5kVmlzaWJpbGl0eSgpO1xuICAgIHRoaXMuX2JpbmRWaXNpYmlsaXR5UmVjdXJzaXZlKCk7XG4gIH1cblxuICBwcml2YXRlIF9iaW5kVmlzaWJpbGl0eVJlY3Vyc2l2ZSgpIHtcbiAgICB0aGlzLmZvckVhY2hDaGlsZFJlY3Vyc2l2ZSgocHJvcGVydHkpID0+IHtcbiAgICAgIHByb3BlcnR5Ll9iaW5kVmlzaWJpbGl0eSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGlzUm9vdCgpIHtcbiAgICByZXR1cm4gdGhpcyA9PT0gdGhpcy5yb290O1xuICB9XG59XG5cblxuIl19