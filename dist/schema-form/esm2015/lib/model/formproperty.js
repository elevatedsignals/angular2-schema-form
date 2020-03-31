import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
export class FormProperty {
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
export class PropertyGroup extends FormProperty {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXByb3BlcnR5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL21vZGVsL2Zvcm1wcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsZUFBZSxFQUFFLGFBQWEsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFPekQsTUFBTSxPQUFnQixZQUFZO0lBaURoQyxZQUFZLHNCQUE4QyxFQUN0QyxpQkFBb0MsRUFDNUMseUJBQW9ELEVBQzdDLE1BQVcsRUFDbEIsTUFBcUIsRUFDckIsSUFBWTtRQUpKLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFFckMsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQWhEOUIsV0FBTSxHQUFRLElBQUksQ0FBQztRQUNuQixZQUFPLEdBQVEsSUFBSSxDQUFDO1FBQ1osa0JBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBTSxJQUFJLENBQUMsQ0FBQztRQUMvQyxtQkFBYyxHQUFHLElBQUksZUFBZSxDQUFNLElBQUksQ0FBQyxDQUFDO1FBQ2hELGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsdUJBQWtCLEdBQUcsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLENBQUM7UUE4QzlELElBQUksQ0FBQyxlQUFlLEdBQUcsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyw2QkFBNkIsR0FBRyx5QkFBeUIsQ0FBQyxvQ0FBb0MsRUFBRSxDQUFDO1FBRXRHLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQzFCO2FBQU0sSUFBSSxJQUFJLFlBQVksYUFBYSxFQUFFO1lBQ3hDLElB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Q0FBQztJQUVNLFlBQVksQ0FBQyxFQUFxRDtRQUN2RSxLQUFLLElBQUksVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDdEMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDOUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDM0MsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUMxQjtTQUNGO0lBQ0gsQ0FBQztJQUVNLHFCQUFxQixDQUFDLEVBQXdDO1FBQ25FLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUMxQixFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDVixJQUFJLEtBQUssWUFBWSxhQUFhLEVBQUU7Z0JBQ2xCLEtBQU0sQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNsRDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLGVBQWU7UUFDcEIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFTyx3QkFBd0I7UUFDOUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDdEMsUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzVCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1NjaGVtYVZhbGlkYXRvckZhY3Rvcnl9IGZyb20gJy4uL3NjaGVtYXZhbGlkYXRvcmZhY3RvcnknO1xuaW1wb3J0IHtWYWxpZGF0b3JSZWdpc3RyeX0gZnJvbSAnLi92YWxpZGF0b3JyZWdpc3RyeSc7XG5pbXBvcnQge1Byb3BlcnR5QmluZGluZ1JlZ2lzdHJ5fSBmcm9tICcuLi9wcm9wZXJ0eS1iaW5kaW5nLXJlZ2lzdHJ5JztcbmltcG9ydCB7IEV4cHJlc3Npb25Db21waWxlckZhY3RvcnksIEV4cHJlc3Npb25Db21waWxlclZpc2liaWxpdHlJZiB9IGZyb20gJy4uL2V4cHJlc3Npb24tY29tcGlsZXItZmFjdG9yeSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGb3JtUHJvcGVydHkge1xuICBwdWJsaWMgc2NoZW1hVmFsaWRhdG9yOiBGdW5jdGlvbjtcbiAgcHVibGljIGV4cHJlc3Npb25Db21waWxlclZpc2liaWx0eUlmOiBFeHByZXNzaW9uQ29tcGlsZXJWaXNpYmlsaXR5SWY7XG5cbiAgX3ZhbHVlOiBhbnkgPSBudWxsO1xuICBfZXJyb3JzOiBhbnkgPSBudWxsO1xuICBwcml2YXRlIF92YWx1ZUNoYW5nZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XG4gIHByaXZhdGUgX2Vycm9yc0NoYW5nZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XG4gIHByaXZhdGUgX3Zpc2libGUgPSB0cnVlO1xuICBwcml2YXRlIF92aXNpYmlsaXR5Q2hhbmdlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHByaXZhdGUgX3Jvb3Q6IFByb3BlcnR5R3JvdXA7XG4gIHByaXZhdGUgX3BhcmVudDogUHJvcGVydHlHcm91cDtcbiAgcHJpdmF0ZSBfcGF0aDogc3RyaW5nO1xuICBfcHJvcGVydHlCaW5kaW5nUmVnaXN0cnk6IFByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5O1xuICBfX2Nhbm9uaWNhbFBhdGg6IHN0cmluZztcbiAgX19jYW5vbmljYWxQYXRoTm90YXRpb246IHN0cmluZztcblxuICAvKipcbiAgICogUHJvdmlkZXMgdGhlIHVuaXF1ZSBwYXRoIG9mIHRoaXMgZm9ybSBlbGVtZW50Ljxici8+XG4gICAqIEUuZy46XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2FyczwvY29kZT4sPGJyLz5cbiAgICogPGNvZGU+L3Nob3AvYm9vay8wL3BhZ2UvMS88L2NvZGU+XG4gICAqL1xuICBnZXQgX2Nhbm9uaWNhbFBhdGgoKSB7IHJldHVybiB0aGlzLl9fY2Fub25pY2FsUGF0aDsgfVxuICBzZXQgX2Nhbm9uaWNhbFBhdGgoY2Fub25pY2FsUGF0aDogc3RyaW5nKSB7XG4gICAgdGhpcy5fX2Nhbm9uaWNhbFBhdGggPSBjYW5vbmljYWxQYXRoO1xuICAgIHRoaXMuX19jYW5vbmljYWxQYXRoTm90YXRpb24gPSAodGhpcy5fX2Nhbm9uaWNhbFBhdGh8fCcnKVxuICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCgnXi8nLCAnaWcnKSwgJycpXG4gICAgICAucmVwbGFjZShuZXcgUmVnRXhwKCcvJCcsICdpZycpLCAnJylcbiAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoJy8nLCAnaWcnKSwgJy4nKTtcbiAgfVxuICAvKipcbiAgICogVXNlcyB0aGUgdW5pcXVlIHBhdGggcHJvdmlkZWQgYnkgdGhlIHByb3BlcnR5IDxjb2RlPl9jYW5vbmljYWxQYXRoPC9jb2RlPjxici8+XG4gICAqIGJ1dCBjb252ZXJ0cyBpdCB0byBhIEhUTUwgRWxlbWVudCBBdHRyaWJ1dGUgSUQgY29tcGxpYW50IGZvcm1hdC48YnIvPlxuICAgKiBFLmcuOlxuICAgKiA8Y29kZT5nYXJhZ2UuY2FyczwvY29kZT4sPGJyLz5cbiAgICogPGNvZGU+c2hvcC5ib29rLjAucGFnZS4xLjwvY29kZT5cbiAgICovXG4gIGdldCBjYW5vbmljYWxQYXRoTm90YXRpb24oKSB7IHJldHVybiB0aGlzLl9fY2Fub25pY2FsUGF0aE5vdGF0aW9uOyB9XG5cbiAgcHJpdmF0ZSBfcm9vdE5hbWU7XG4gIC8qKlxuICAgKiBQcm92aWRlcyB0aGUgSFRNTCBFbGVtZW50IEF0dHJpYnV0ZSBJRC9OQU1FIGNvbXBsaWFudCByZXByZXNlbnRhdGlvblxuICAgKiBvZiB0aGUgcm9vdCBlbGVtZW50Ljxici8+XG4gICAqIFJlcHJlc2VudHMgdGhlIEhUTUwgRk9STSBOQU1FLjxici8+XG4gICAqIE9ubHkgdGhlIHJvb3QgPGNvZGU+Rm9ybVByb3BlcnR5PC9jb2RlPiB3aWxsIHByb3ZpZGUgYSB2YWx1ZSBoZXJlLlxuICAgKi9cbiAgZ2V0IHJvb3ROYW1lKCkgeyByZXR1cm4gdGhpcy5fcm9vdE5hbWU7IH1cblxuICBjb25zdHJ1Y3RvcihzY2hlbWFWYWxpZGF0b3JGYWN0b3J5OiBTY2hlbWFWYWxpZGF0b3JGYWN0b3J5LFxuICAgICAgICAgICAgICBwcml2YXRlIHZhbGlkYXRvclJlZ2lzdHJ5OiBWYWxpZGF0b3JSZWdpc3RyeSxcbiAgICAgICAgICAgICAgZXhwcmVzc2lvbkNvbXBpbGVyRmFjdG9yeTogRXhwcmVzc2lvbkNvbXBpbGVyRmFjdG9yeSxcbiAgICAgICAgICAgICAgcHVibGljIHNjaGVtYTogYW55LFxuICAgICAgICAgICAgICBwYXJlbnQ6IFByb3BlcnR5R3JvdXAsXG4gICAgICAgICAgICAgIHBhdGg6IHN0cmluZykge1xuICAgIHRoaXMuc2NoZW1hVmFsaWRhdG9yID0gc2NoZW1hVmFsaWRhdG9yRmFjdG9yeS5jcmVhdGVWYWxpZGF0b3JGbih0aGlzLnNjaGVtYSk7XG4gICAgdGhpcy5leHByZXNzaW9uQ29tcGlsZXJWaXNpYmlsdHlJZiA9IGV4cHJlc3Npb25Db21waWxlckZhY3RvcnkuY3JlYXRlRXhwcmVzc2lvbkNvbXBpbGVyVmlzaWJpbGl0eUlmKCk7XG5cbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgdGhpcy5fcm9vdCA9IHBhcmVudC5yb290O1xuICAgIH0gZWxzZSBpZiAodGhpcyBpbnN0YW5jZW9mIFByb3BlcnR5R3JvdXApIHtcbiAgICAgIHRoaXMuX3Jvb3QgPSA8UHJvcGVydHlHcm91cD48YW55PnRoaXM7XG4gICAgICB0aGlzLl9yb290TmFtZSA9IHRoaXMuY3JlYXRlUm9vdE5hbWUoKTtcbiAgICB9XG4gICAgdGhpcy5fcGF0aCA9IHBhdGg7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgSFRNTCBJRCBhbmQgTkFNRSBhdHRyaWJ1dGUgY29tcGxpYW50IHN0cmluZy5cbiAgICovXG4gIHByaXZhdGUgY3JlYXRlUm9vdE5hbWUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5zY2hlbWEgJiYgdGhpcy5zY2hlbWFbJ25hbWUnXSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3Jvb3ROYW1lID0gdGhpcy5zY2hlbWFbJ25hbWUnXS5yZXBsYWNlKG5ldyBSZWdFeHAoJ1tcXFxcc10rJywgJ2lnJyksICdfJylcbiAgICB9XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBwdWJsaWMgZ2V0IHZhbHVlQ2hhbmdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWVDaGFuZ2VzO1xuICB9XG5cbiAgcHVibGljIGdldCBlcnJvcnNDaGFuZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLl9lcnJvcnNDaGFuZ2VzO1xuICB9XG5cbiAgcHVibGljIGdldCB0eXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2NoZW1hLnR5cGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBhcmVudCgpOiBQcm9wZXJ0eUdyb3VwIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xuICB9XG5cbiAgcHVibGljIGdldCByb290KCk6IFByb3BlcnR5R3JvdXAge1xuICAgIHJldHVybiB0aGlzLl9yb290IHx8IDxQcm9wZXJ0eUdyb3VwPjxhbnk+dGhpcztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGF0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9wYXRoO1xuICB9XG5cbiAgcHVibGljIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZhbGlkKCkge1xuICAgIHJldHVybiB0aGlzLl9lcnJvcnMgPT09IG51bGw7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3Qgc2V0VmFsdWUodmFsdWU6IGFueSwgb25seVNlbGY6IGJvb2xlYW4pO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCByZXNldCh2YWx1ZTogYW55LCBvbmx5U2VsZjogYm9vbGVhbik7XG5cbiAgcHVibGljIHVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkob25seVNlbGYgPSBmYWxzZSwgZW1pdEV2ZW50ID0gdHJ1ZSkge1xuICAgIHRoaXMuX3VwZGF0ZVZhbHVlKCk7XG5cbiAgICBpZiAoZW1pdEV2ZW50KSB7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlcy5uZXh0KHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMuX3J1blZhbGlkYXRpb24oKTtcblxuICAgIGlmICh0aGlzLnBhcmVudCAmJiAhb25seVNlbGYpIHtcbiAgICAgIHRoaXMucGFyZW50LnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkob25seVNlbGYsIGVtaXRFdmVudCk7XG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgX2hhc1ZhbHVlKCk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqICBAaW50ZXJuYWxcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBfdXBkYXRlVmFsdWUoKTtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBwdWJsaWMgX3J1blZhbGlkYXRpb24oKTogYW55IHtcbiAgICBsZXQgZXJyb3JzID0gdGhpcy5zY2hlbWFWYWxpZGF0b3IodGhpcy5fdmFsdWUpIHx8IFtdO1xuICAgIGxldCBjdXN0b21WYWxpZGF0b3IgPSB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LmdldCh0aGlzLnBhdGgpO1xuICAgIGlmIChjdXN0b21WYWxpZGF0b3IpIHtcbiAgICAgIGxldCBjdXN0b21FcnJvcnMgPSBjdXN0b21WYWxpZGF0b3IodGhpcy52YWx1ZSwgdGhpcywgdGhpcy5maW5kUm9vdCgpKTtcbiAgICAgIGVycm9ycyA9IHRoaXMubWVyZ2VFcnJvcnMoZXJyb3JzLCBjdXN0b21FcnJvcnMpO1xuICAgIH1cbiAgICBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZXJyb3JzID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLl9lcnJvcnMgPSBlcnJvcnM7XG4gICAgdGhpcy5zZXRFcnJvcnModGhpcy5fZXJyb3JzKTtcbiAgfVxuXG4gIHByaXZhdGUgbWVyZ2VFcnJvcnMoZXJyb3JzLCBuZXdFcnJvcnMpIHtcbiAgICBpZiAobmV3RXJyb3JzKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShuZXdFcnJvcnMpKSB7XG4gICAgICAgIGVycm9ycyA9IGVycm9ycy5jb25jYXQoLi4ubmV3RXJyb3JzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9ycy5wdXNoKG5ld0Vycm9ycyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlcnJvcnM7XG4gIH1cblxuICBwcml2YXRlIHNldEVycm9ycyhlcnJvcnMpIHtcbiAgICB0aGlzLl9lcnJvcnMgPSBlcnJvcnM7XG4gICAgdGhpcy5fZXJyb3JzQ2hhbmdlcy5uZXh0KGVycm9ycyk7XG4gIH1cblxuICBwdWJsaWMgZXh0ZW5kRXJyb3JzKGVycm9ycykge1xuICAgIGVycm9ycyA9IHRoaXMubWVyZ2VFcnJvcnModGhpcy5fZXJyb3JzIHx8IFtdLCBlcnJvcnMpO1xuICAgIHRoaXMuc2V0RXJyb3JzKGVycm9ycyk7XG4gIH1cblxuICBzZWFyY2hQcm9wZXJ0eShwYXRoOiBzdHJpbmcpOiBGb3JtUHJvcGVydHkge1xuICAgIGxldCBwcm9wOiBGb3JtUHJvcGVydHkgPSB0aGlzO1xuICAgIGxldCBiYXNlOiBQcm9wZXJ0eUdyb3VwID0gbnVsbDtcblxuICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgIGlmIChwYXRoWzBdID09PSAnLycpIHtcbiAgICAgIGJhc2UgPSB0aGlzLmZpbmRSb290KCk7XG4gICAgICByZXN1bHQgPSBiYXNlLmdldFByb3BlcnR5KHBhdGguc3Vic3RyKDEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2hpbGUgKHJlc3VsdCA9PT0gbnVsbCAmJiBwcm9wLnBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICBwcm9wID0gYmFzZSA9IHByb3AucGFyZW50O1xuICAgICAgICByZXN1bHQgPSBiYXNlLmdldFByb3BlcnR5KHBhdGgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIGZpbmRSb290KCk6IFByb3BlcnR5R3JvdXAge1xuICAgIGxldCBwcm9wZXJ0eTogRm9ybVByb3BlcnR5ID0gdGhpcztcbiAgICB3aGlsZSAocHJvcGVydHkucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICBwcm9wZXJ0eSA9IHByb3BlcnR5LnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIDxQcm9wZXJ0eUdyb3VwPnByb3BlcnR5O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl92aXNpYmxlID0gdmlzaWJsZTtcbiAgICB0aGlzLl92aXNpYmlsaXR5Q2hhbmdlcy5uZXh0KHZpc2libGUpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy5wYXJlbnQudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ha2luZyB1c2Ugb2YgdGhlIGV4cHJlc3Npb24gY29tcGlsZXIgZm9yIHRoZSA8Y29kZT52aXNpYmxlSWY8L2NvZGU+IGNvbmRpdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBfX2V2YWx1YXRlVmlzaWJpbGl0eUlmKFxuICAgIHNvdXJjZVByb3BlcnR5OiBGb3JtUHJvcGVydHksXG4gICAgdGFyZ2V0UHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSxcbiAgICBkZXBlbmRlbmN5UGF0aDogc3RyaW5nLFxuICAgIHZhbHVlOiBhbnkgPSAnJyxcbiAgICBleHByZXNzaW9uOiBzdHJpbmd8c3RyaW5nW118bnVtYmVyID0gJycpOiBib29sZWFuIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHZhbGlkID0gZmFsc2VcbiAgICAgIGlmIChpc05hTihleHByZXNzaW9uIGFzIG51bWJlcikgJiYgKGV4cHJlc3Npb24gYXMgc3RyaW5nKS5pbmRleE9mKCckQU5ZJCcpICE9PSAtMSkge1xuICAgICAgICB2YWxpZCA9IHZhbHVlICYmIHZhbHVlLmxlbmd0aCA+IDA7XG4gICAgICB9IGVsc2UgaWYgKChleHByZXNzaW9ufHxbXSkudG9TdHJpbmcoKS5pbmRleE9mKCckRVhQJCcpID09PSAwKSB7XG4gICAgICAgIC8vIHNpbmNlIHZpc2libGVJZiBjb25kaXRpb24gdmFsdWVzIGFyZSBhbiBhcnJheS4uLiB3ZSBtdXN0IGRvIHRoaXNcbiAgICAgICAgY29uc3QgZXhwQXJyYXkgPSBBcnJheS5pc0FycmF5KGV4cHJlc3Npb24pID8gZXhwcmVzc2lvbiA6IChleHByZXNzaW9uID8gW2V4cHJlc3Npb25dIDogW10pXG4gICAgICAgIGZvciAoY29uc3QgZXhwU3RyaW5nIG9mIGV4cEFycmF5KSB7XG4gICAgICAgICAgY29uc3QgX2V4cHJlc3NzaW9uID0gKGV4cFN0cmluZyBhcyBzdHJpbmcpLnN1YnN0cmluZygnJEVYUCQnLmxlbmd0aCk7XG4gICAgICAgICAgdmFsaWQgPSB0cnVlID09PSB0aGlzLmV4cHJlc3Npb25Db21waWxlclZpc2liaWx0eUlmLmV2YWx1YXRlKF9leHByZXNzc2lvbiwge1xuICAgICAgICAgICAgc291cmNlOiBzb3VyY2VQcm9wZXJ0eSxcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0UHJvcGVydHlcbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmICh2YWxpZCkge1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbGlkID0gaXNOYU4odmFsdWUpID8gdmFsdWUuaW5kZXhPZihleHByZXNzaW9uKSAhPT0gLTEgOiB2YWx1ZSA9PT0gZXhwcmVzc2lvbjtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWxpZFxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBwcm9jZXNzaW5nIFwiVmlzaWJpbGVJZlwiIGV4cHJlc3Npb24gZm9yIHBhdGg6ICcsIGRlcGVuZGVuY3lQYXRoLFxuICAgICAgICBgc291cmNlIC0gJHtzb3VyY2VQcm9wZXJ0eS5fY2Fub25pY2FsUGF0aH06IGAsIHNvdXJjZVByb3BlcnR5LFxuICAgICAgICBgdGFyZ2V0IC0gJHt0YXJnZXRQcm9wZXJ0eS5fY2Fub25pY2FsUGF0aH06IGAsIHRhcmdldFByb3BlcnR5LFxuICAgICAgICAndmFsdWU6JywgdmFsdWUsXG4gICAgICAgICdleHByZXNzaW9uOiAnLCBleHByZXNzaW9uLFxuICAgICAgICAnZXJyb3I6ICcsIGVycm9yKVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX19iaW5kVmlzaWJpbGl0eSgpOiBib29sZWFuIHtcbiAgICAvKipcbiAgICAgKiA8cHJlPlxuICAgICAqICAgICBcIm9uZU9mXCI6W3tcbiAgICAgKiAgICAgICAgIFwicGF0aFwiOltcInZhbHVlXCIsXCJ2YWx1ZVwiXVxuICAgICAqICAgICB9LHtcbiAgICAgKiAgICAgICAgIFwicGF0aFwiOltcInZhbHVlXCIsXCJ2YWx1ZVwiXVxuICAgICAqICAgICB9XVxuICAgICAqICAgICA8L3ByZT5cbiAgICAgKiA8cHJlPlxuICAgICAqICAgICBcImFsbE9mXCI6W3tcbiAgICAgKiAgICAgICAgIFwicGF0aFwiOltcInZhbHVlXCIsXCJ2YWx1ZVwiXVxuICAgICAqICAgICB9LHtcbiAgICAgKiAgICAgICAgIFwicGF0aFwiOltcInZhbHVlXCIsXCJ2YWx1ZVwiXVxuICAgICAqICAgICB9XVxuICAgICAqICAgICA8L3ByZT5cbiAgICAgKi9cbiAgICBjb25zdCB2aXNpYmxlSWZQcm9wZXJ0eSA9IHRoaXMuc2NoZW1hLnZpc2libGVJZjtcbiAgICBjb25zdCB2aXNpYmxlSWZPZiA9ICh2aXNpYmxlSWZQcm9wZXJ0eSB8fCB7fSkub25lT2YgfHwgKHZpc2libGVJZlByb3BlcnR5IHx8IHt9KS5hbGxPZjtcbiAgICBpZiAodmlzaWJsZUlmT2YpIHtcbiAgICAgIGZvciAoY29uc3QgdmlzaWJsZUlmIG9mIHZpc2libGVJZk9mKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmlzaWJsZUlmID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyh2aXNpYmxlSWYpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodmlzaWJsZUlmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0aWVzQmluZGluZyA9IFtdO1xuICAgICAgICAgIGZvciAoY29uc3QgZGVwZW5kZW5jeVBhdGggaW4gdmlzaWJsZUlmKSB7XG4gICAgICAgICAgICBpZiAodmlzaWJsZUlmLmhhc093blByb3BlcnR5KGRlcGVuZGVuY3lQYXRoKSkge1xuICAgICAgICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5maW5kUHJvcGVydGllcyh0aGlzLCBkZXBlbmRlbmN5UGF0aCk7XG4gICAgICAgICAgICAgIGlmICgocHJvcGVydGllcyB8fCBbXSkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBvZiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlQ2hlY2s7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjaGVtYS52aXNpYmxlSWYub25lT2YpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZUNoZWNrID0gcHJvcGVydHkudmFsdWVDaGFuZ2VzLnBpcGUobWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPT4gdGhpcy5fX2V2YWx1YXRlVmlzaWJpbGl0eUlmKHRoaXMsIHByb3BlcnR5LCBkZXBlbmRlbmN5UGF0aCwgdmFsdWUsIHZpc2libGVJZltkZXBlbmRlbmN5UGF0aF0pXG4gICAgICAgICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zY2hlbWEudmlzaWJsZUlmLmFsbE9mKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgX2NoayA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuc2NoZW1hLnZpc2libGVJZi5hbGxPZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGRlcFBhdGggb2YgT2JqZWN0LmtleXMoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9wID0gdGhpcy5zZWFyY2hQcm9wZXJ0eShkZXBQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9wVmFsID0gcHJvcC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX19ldmFsdWF0ZVZpc2liaWxpdHlJZih0aGlzLCBwcm9wLCBkZXBlbmRlbmN5UGF0aCwgcHJvcFZhbCwgaXRlbVtkZXBQYXRoXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWVDaGVjayA9IHByb3BlcnR5LnZhbHVlQ2hhbmdlcy5waXBlKG1hcChfY2hrKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlzaWJpbGl0eUNoZWNrID0gcHJvcGVydHkuX3Zpc2liaWxpdHlDaGFuZ2VzO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmQgPSBjb21iaW5lTGF0ZXN0KFt2YWx1ZUNoZWNrLCB2aXNpYmlsaXR5Q2hlY2tdLCAodjEsIHYyKSA9PiB2MSAmJiB2Mik7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNCaW5kaW5nLnB1c2goYW5kKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdDYW5cXCd0IGZpbmQgcHJvcGVydHkgJyArIGRlcGVuZGVuY3lQYXRoICsgJyBmb3IgdmlzaWJpbGl0eSBjaGVjayBvZiAnICsgdGhpcy5wYXRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyTWlzc2luZ1Zpc2liaWxpdHlCaW5kaW5nKGRlcGVuZGVuY3lQYXRoLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAvLyBub3QgdmlzaWJsZSBpZiBub3QgZXhpc3RlbnRcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZpc2libGUoZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29tYmluZUxhdGVzdChwcm9wZXJ0aWVzQmluZGluZywgKC4uLnZhbHVlczogYm9vbGVhbltdKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzLmluZGV4T2YodHJ1ZSkgIT09IC0xO1xuICAgICAgICAgIH0pLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSkuc3Vic2NyaWJlKCh2aXNpYmxlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFZpc2libGUodmlzaWJsZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIEEgZmllbGQgaXMgdmlzaWJsZSBpZiBBVCBMRUFTVCBPTkUgb2YgdGhlIHByb3BlcnRpZXMgaXQgZGVwZW5kcyBvbiBpcyB2aXNpYmxlIEFORCBoYXMgYSB2YWx1ZSBpbiB0aGUgbGlzdFxuICBwdWJsaWMgX2JpbmRWaXNpYmlsaXR5KCkge1xuICAgIGlmICh0aGlzLl9fYmluZFZpc2liaWxpdHkoKSlcbiAgICAgIHJldHVybjtcbiAgICBsZXQgdmlzaWJsZUlmID0gdGhpcy5zY2hlbWEudmlzaWJsZUlmO1xuICAgIGlmICh0eXBlb2YgdmlzaWJsZUlmID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyh2aXNpYmxlSWYpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICB9IGVsc2UgaWYgKHZpc2libGVJZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgcHJvcGVydGllc0JpbmRpbmcgPSBbXTtcbiAgICAgIGZvciAobGV0IGRlcGVuZGVuY3lQYXRoIGluIHZpc2libGVJZikge1xuICAgICAgICBpZiAodmlzaWJsZUlmLmhhc093blByb3BlcnR5KGRlcGVuZGVuY3lQYXRoKSkge1xuICAgICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLmZpbmRQcm9wZXJ0aWVzKHRoaXMsIGRlcGVuZGVuY3lQYXRoKTtcbiAgICAgICAgICBpZiAoKHByb3BlcnRpZXMgfHwgW10pLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBvZiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlQ2hlY2sgPSBwcm9wZXJ0eS52YWx1ZUNoYW5nZXMucGlwZShtYXAoXG4gICAgICAgICAgICAgICAgICB2YWx1ZSA9PiB0aGlzLl9fZXZhbHVhdGVWaXNpYmlsaXR5SWYodGhpcywgcHJvcGVydHksIGRlcGVuZGVuY3lQYXRoLCB2YWx1ZSwgdmlzaWJsZUlmW2RlcGVuZGVuY3lQYXRoXSlcbiAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2aXNpYmlsaXR5Q2hlY2sgPSBwcm9wZXJ0eS5fdmlzaWJpbGl0eUNoYW5nZXM7XG4gICAgICAgICAgICAgICAgY29uc3QgYW5kID0gY29tYmluZUxhdGVzdChbdmFsdWVDaGVjaywgdmlzaWJpbGl0eUNoZWNrXSwgKHYxLCB2MikgPT4gdjEgJiYgdjIpO1xuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNCaW5kaW5nLnB1c2goYW5kKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NhblxcJ3QgZmluZCBwcm9wZXJ0eSAnICsgZGVwZW5kZW5jeVBhdGggKyAnIGZvciB2aXNpYmlsaXR5IGNoZWNrIG9mICcgKyB0aGlzLnBhdGgpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3Rlck1pc3NpbmdWaXNpYmlsaXR5QmluZGluZyhkZXBlbmRlbmN5UGF0aCwgdGhpcyk7XG4gICAgICAgICAgICAvLyBub3QgdmlzaWJsZSBpZiBub3QgZXhpc3RlbnRcbiAgICAgICAgICAgIHRoaXMuc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbWJpbmVMYXRlc3QocHJvcGVydGllc0JpbmRpbmcsICguLi52YWx1ZXM6IGJvb2xlYW5bXSkgPT4ge1xuICAgICAgICByZXR1cm4gdmFsdWVzLmluZGV4T2YodHJ1ZSkgIT09IC0xO1xuICAgICAgfSkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKS5zdWJzY3JpYmUoKHZpc2libGUpID0+IHtcbiAgICAgICAgdGhpcy5zZXRWaXNpYmxlKHZpc2libGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWdpc3Rlck1pc3NpbmdWaXNpYmlsaXR5QmluZGluZyhkZXBlbmRlbmN5UGF0aDogc3RyaW5nLCBmb3JtUHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSkge1xuICAgIGZvcm1Qcm9wZXJ0eS5fcHJvcGVydHlCaW5kaW5nUmVnaXN0cnkuZ2V0UHJvcGVydHlCaW5kaW5nc1Zpc2liaWxpdHkoKS5hZGQoZGVwZW5kZW5jeVBhdGgsIGZvcm1Qcm9wZXJ0eS5wYXRoKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEZpbmRzIGFsbCA8Y29kZT5mb3JtUHJvcGVydGllczwvY29kZT4gZnJvbSBhIHBhdGggd2l0aCB3aWxkY2FyZHMuPGJyLz5cbiAgICogZS5nOiA8Y29kZT4vZ2FyYWdlL2NhcnMvJiM0MjsvdGlyZXMvJiM0MjsvbmFtZTwvY29kZT48YnIvPlxuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqIEBwYXJhbSBwcm9wZXJ0eVBhdGhcbiAgICovXG4gIGZpbmRQcm9wZXJ0aWVzKHRhcmdldDogRm9ybVByb3BlcnR5LCBwcm9wZXJ0eVBhdGg6IHN0cmluZyk6IEZvcm1Qcm9wZXJ0eVtdIHtcbiAgICBjb25zdCBwcm9wczogRm9ybVByb3BlcnR5W10gPSBbXTtcbiAgICBjb25zdCBwYXRocyA9IHRoaXMuZmluZFByb3BlcnR5UGF0aHModGFyZ2V0LCBwcm9wZXJ0eVBhdGgpO1xuICAgIGZvciAoY29uc3QgcGF0aCBvZiBwYXRocykge1xuICAgICAgY29uc3QgcDogRm9ybVByb3BlcnR5ID0gdGFyZ2V0LnNlYXJjaFByb3BlcnR5KHBhdGgpO1xuICAgICAgaWYgKHApIHtcbiAgICAgICAgcHJvcHMucHVzaChwKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgY2Fub25pY2FsIHBhdGhzIGZyb20gYSBwYXRoIHdpdGggd2lsZGNhcmRzLlxuICAgKiBlLmc6PGJyLz5cbiAgICogRnJvbTo8YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvJiM0MjsvdGlyZXMvJiM0MjsvbmFtZTwvY29kZT48YnIvPlxuICAgKiBpdCBjcmVhdGVzOjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8wL3RpcmVzLzAvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMC90aXJlcy8xL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLzAvdGlyZXMvMi9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8wL3RpcmVzLzMvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMS90aXJlcy8wL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLzIvdGlyZXMvMS9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8zL3RpcmVzLzIvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMy90aXJlcy8zL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLyYjNDI7L3RpcmVzLyYjNDI7L25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLyYjNDI7L3RpcmVzLzIvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvJiM0MjsvdGlyZXMvMy9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxici8+ZXRjLi4uXG4gICAqIEBwYXJhbSB0YXJnZXRcbiAgICogQHBhcmFtIHBhdGhcbiAgICogQHBhcmFtIHBhcmVudFBhdGhcbiAgICovXG4gIGZpbmRQcm9wZXJ0eVBhdGhzKHRhcmdldDogRm9ybVByb3BlcnR5LCBwYXRoOiBzdHJpbmcsIHBhcmVudFBhdGg/OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgaXggPSBwYXRoLmluZGV4T2YoJyonKTtcbiAgICBpZiAoLTEgIT09IGl4KSB7XG4gICAgICBjb25zdCBwcmVQYXRoID0gaXggPiAtMSA/IHBhdGguc3Vic3RyaW5nKDAsIGl4IC0gMSkgOiBwYXRoO1xuICAgICAgY29uc3Qgc3ViUGF0aCA9IGl4ID4gLTEgPyBwYXRoLnN1YnN0cmluZyhpeCArIDEpIDogcGF0aDtcbiAgICAgIGNvbnN0IHByb3A6IEZvcm1Qcm9wZXJ0eSA9IHRhcmdldC5zZWFyY2hQcm9wZXJ0eShwcmVQYXRoKTtcbiAgICAgIGxldCBwYXRoRm91bmQgPSBbXTtcbiAgICAgIGlmIChwcm9wIGluc3RhbmNlb2YgUHJvcGVydHlHcm91cCkge1xuICAgICAgICBjb25zdCBhcnJQcm9wID0gcHJvcC5wcm9wZXJ0aWVzIGFzIEZvcm1Qcm9wZXJ0eVtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyclByb3AubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjdXJyZUl0ZW1QYXRoID0gKHBhcmVudFBhdGggfHwgJycpICsgcHJlUGF0aCArIChwcmVQYXRoLmVuZHNXaXRoKCcvJykgPyAnJyA6ICcvJykgKyBpICsgc3ViUGF0aDtcbiAgICAgICAgICBjb25zdCBjdXJyZUl0ZW1QcmVQYXRoID0gKHBhcmVudFBhdGggfHwgJycpICsgcHJlUGF0aCArIGk7XG4gICAgICAgICAgaWYgKC0xID09PSBjdXJyZUl0ZW1QYXRoLmluZGV4T2YoJyonKSkge1xuICAgICAgICAgICAgcGF0aEZvdW5kLnB1c2goY3VycmVJdGVtUGF0aCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGNoaWxkcmVuUGF0aEZvdW5kID0gdGhpcy5maW5kUHJvcGVydHlQYXRocyhhcnJQcm9wW2ldLCBzdWJQYXRoLCBjdXJyZUl0ZW1QcmVQYXRoKTtcbiAgICAgICAgICBwYXRoRm91bmQgPSBwYXRoRm91bmQuY29uY2F0KGNoaWxkcmVuUGF0aEZvdW5kKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHBhdGhGb3VuZDtcbiAgICB9XG4gICAgcmV0dXJuIFtwYXRoXTtcbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJvcGVydHlHcm91cCBleHRlbmRzIEZvcm1Qcm9wZXJ0eSB7XG5cbiAgX3Byb3BlcnRpZXM6IEZvcm1Qcm9wZXJ0eVtdIHwgeyBba2V5OiBzdHJpbmddOiBGb3JtUHJvcGVydHkgfSA9IG51bGw7XG5cbiAgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXM7XG4gIH1cblxuICBzZXQgcHJvcGVydGllcyhwcm9wZXJ0aWVzOiBGb3JtUHJvcGVydHlbXSB8IHsgW2tleTogc3RyaW5nXTogRm9ybVByb3BlcnR5IH0pIHtcbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGUgc2V0dGVyIHRvIGFkZCBhbiBvYnNlcnZlciB0aGF0IG5vdGljZXMgd2hlbiBhbiBpdGVtIGlzIGFkZGVkIG9yIHJlbW92ZWQuPGJyLz5cbiAgICAgKi9cbiAgICB0aGlzLl9wcm9wZXJ0aWVzID0gbmV3IFByb3h5KHByb3BlcnRpZXMsIHRoaXMuX3Byb3BlcnR5UHJveHlIYW5kbGVyKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Byb3BlcnR5UHJveHlIYW5kbGVyOiBQcm94eUhhbmRsZXI8Rm9ybVByb3BlcnR5W10gfCB7IFtrZXk6IHN0cmluZ106IEZvcm1Qcm9wZXJ0eSB9PiA9IHtcbiAgICAvKipcbiAgICAgKiBXaGVuIGEgbmV3IGl0ZW0gaXMgYWRkZWQgaXQgd2lsbCBiZSBjaGVja2VkIGZvciB2aXNpYmlsaXR5IHVwZGF0ZXMgdG8gcHJvY2VlZCA8YnIvPlxuICAgICAqIGlmIGFueSBvdGhlciBmaWVsZCBoYXMgYSBiaW5kaW5nIHJlZmVyZW5jZSB0byBpdC48YnIvPlxuICAgICAqL1xuICAgIHNldCh0YXJnZXQ6IEZvcm1Qcm9wZXJ0eVtdIHwgeyBbcDogc3RyaW5nXTogRm9ybVByb3BlcnR5IH0sIHA6IFByb3BlcnR5S2V5LCB2YWx1ZTogYW55LCByZWNlaXZlcjogYW55KTogYm9vbGVhbiB7XG5cbiAgICAgIC8qKlxuICAgICAgICogMSkgTWFrZSBzdXJlIGEgY2Fub25pY2FsIHBhdGggaXMgc2V0XG4gICAgICAgKi9cbiAgICAgIGNvbnN0IGFzc2VydENhbm9uaWNhbFBhdGggPSAocHJvcGVydHlWYWx1ZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm1Qcm9wZXJ0eSA9IHByb3BlcnR5VmFsdWUgYXMgRm9ybVByb3BlcnR5O1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIHByb3BlcnR5VmFsdWUgaW5zdGFuY2VvZiBGb3JtUHJvcGVydHkpIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBDcmVhdGUgYSBjYW5vbmljYWwgcGF0aCByZXBsYWNpbmcgdGhlIGxhc3QgJyonIHdpdGggdGhlIGVsZW1lbnRzIHBvc2l0aW9uIGluIGFycmF5XG4gICAgICAgICAgICogQHBhcmFtIHByb3BlcnR5UGF0aFxuICAgICAgICAgICAqIEBwYXJhbSBpbmRleE9mQ2hpbGRcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBjb25zdCBnZXRDYW5vbmljYWxQYXRoID0gKHByb3BlcnR5UGF0aDogc3RyaW5nLCBpbmRleE9mQ2hpbGQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgbGV0IHBvcztcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eVBhdGggJiYgLTEgIT09IChwb3MgPSBwcm9wZXJ0eVBhdGgubGFzdEluZGV4T2YoJyonKSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5UGF0aC5zdWJzdHJpbmcoMCwgcG9zKSArIGluZGV4T2ZDaGlsZC50b1N0cmluZygpICsgcHJvcGVydHlQYXRoLnN1YnN0cmluZyhwb3MgKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmIChmb3JtUHJvcGVydHkpIHtcbiAgICAgICAgICAgIGZvcm1Qcm9wZXJ0eS5fY2Fub25pY2FsUGF0aCA9IGdldENhbm9uaWNhbFBhdGgoZm9ybVByb3BlcnR5Ll9jYW5vbmljYWxQYXRoLCBwIGFzIG51bWJlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvcGVydHlHcm91cCA9IGZvcm1Qcm9wZXJ0eSBhcyBQcm9wZXJ0eUdyb3VwO1xuICAgICAgICBjb25zdCBwcm9wZXJ0eUdyb3VwQ2hpbGRyZW4gPSAoQXJyYXkuaXNBcnJheShwcm9wZXJ0eUdyb3VwLnByb3BlcnRpZXMpID9cbiAgICAgICAgICBwcm9wZXJ0eUdyb3VwLnByb3BlcnRpZXMgOlxuICAgICAgICAgIE9iamVjdC52YWx1ZXMocHJvcGVydHlHcm91cC5wcm9wZXJ0aWVzIHx8IHt9KSkgYXMgRm9ybVByb3BlcnR5W107XG4gICAgICAgIGlmICgoZm9ybVByb3BlcnR5LnBhdGggfHwgJycpLmVuZHNXaXRoKCcvKicpKSB7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSWYgaXQgaXMgYW4gYXJyYXksIHRoZW4gYWxsIGNoaWxkcmVuIGNhbm9uaWNhbCBwYXRocyBtdXN0IGJlIGNvbXB1dGVkIG5vdy5cbiAgICAgICAgICAgKiBUaGUgY2hpbGRyZW4gZG9uJ3QgaGF2ZSB0aGUgcGFyZW50J3MgcGF0aCBzZWdtZW50IHNldCB5ZXQsXG4gICAgICAgICAgICogYmVjYXVzZSB0aGV5IGFyZSBjcmVhdGVkIGJlZm9yZSB0aGUgcGFyZW50IGdldHMgYXR0YWNoZWQgdG8gaXRzIHBhcmVudC5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHByb3BlcnR5R3JvdXBDaGlsZHJlbikge1xuICAgICAgICAgICAgY2hpbGQuX2Nhbm9uaWNhbFBhdGggPSBmb3JtUHJvcGVydHkuX2Nhbm9uaWNhbFBhdGggKyBjaGlsZC5fY2Fub25pY2FsUGF0aC5zdWJzdHJpbmcoZm9ybVByb3BlcnR5LnBhdGgubGVuZ3RoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtwcm9wZXJ0eTogZm9ybVByb3BlcnR5LCBjaGlsZHJlbjogcHJvcGVydHlHcm91cENoaWxkcmVufTtcbiAgICAgIH07XG4gICAgICBjb25zdCB7cHJvcGVydHksIGNoaWxkcmVufSA9IGFzc2VydENhbm9uaWNhbFBhdGgodmFsdWUpO1xuXG4gICAgICAvKipcbiAgICAgICAqIDIpIEFkZCB0aGUgbmV3IHByb3BlcnR5IGJlZm9yZSByZWJpbmRpbmcsIHNvIGl0IGNhbiBiZSBmb3VuZCBieSA8Y29kZT5fYmluZFZpc2liaWxpdHk8L2NvZGU+XG4gICAgICAgKi9cbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRhcmdldFtwIGFzIHN0cmluZ10gPSB2YWx1ZTtcblxuICAgICAgLyoqXG4gICAgICAgKiAzKSBSZS1iaW5kIHRoZSB2aXNpYmlsaXR5IGJpbmRpbmdzIHJlZmVyZW5jaW5nIHRvIHRoaXMgY2Fub25pY2FsIHBhdGhzXG4gICAgICAgKi9cbiAgICAgIGNvbnN0IHJlYmluZFZpc2liaWxpdHkgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlYmluZEFsbCA9IFtwcm9wZXJ0eV0uY29uY2F0KGNoaWxkcmVuKTtcbiAgICAgICAgY29uc3QgZmluZFByb3BlcnRpZXNUb1JlYmluZCA9IChmb3JtUHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHByb3BlcnR5QmluZGluZ3MgPSBmb3JtUHJvcGVydHkuX3Byb3BlcnR5QmluZGluZ1JlZ2lzdHJ5LmdldFByb3BlcnR5QmluZGluZ3NWaXNpYmlsaXR5KCk7XG4gICAgICAgICAgbGV0IHJlYmluZDogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICBpZiAoZm9ybVByb3BlcnR5Ll9jYW5vbmljYWxQYXRoKSB7XG4gICAgICAgICAgICByZWJpbmQgPSByZWJpbmQuY29uY2F0KHJlYmluZC5jb25jYXQocHJvcGVydHlCaW5kaW5ncy5maW5kQnlEZXBlbmRlbmN5UGF0aChmb3JtUHJvcGVydHkuX2Nhbm9uaWNhbFBhdGgpIHx8IFtdKSk7XG4gICAgICAgICAgICBpZiAoZm9ybVByb3BlcnR5Ll9jYW5vbmljYWxQYXRoLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgICByZWJpbmQgPSByZWJpbmQuY29uY2F0KHJlYmluZC5jb25jYXQocHJvcGVydHlCaW5kaW5ncy5maW5kQnlEZXBlbmRlbmN5UGF0aChmb3JtUHJvcGVydHkuX2Nhbm9uaWNhbFBhdGguc3Vic3RyaW5nKDEpKSB8fCBbXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZWJpbmQgPSByZWJpbmQuY29uY2F0KHByb3BlcnR5QmluZGluZ3MuZmluZEJ5RGVwZW5kZW5jeVBhdGgoZm9ybVByb3BlcnR5LnBhdGgpIHx8IFtdKTtcbiAgICAgICAgICBpZiAoZm9ybVByb3BlcnR5LnBhdGguc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICByZWJpbmQgPSByZWJpbmQuY29uY2F0KHJlYmluZC5jb25jYXQocHJvcGVydHlCaW5kaW5ncy5maW5kQnlEZXBlbmRlbmN5UGF0aChmb3JtUHJvcGVydHkucGF0aC5zdWJzdHJpbmcoMSkpIHx8IFtdKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHVuaXF1ZVZhbHVlcyA9IHt9O1xuICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiByZWJpbmQpIHtcbiAgICAgICAgICAgIHVuaXF1ZVZhbHVlc1tpdGVtXSA9IGl0ZW07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh1bmlxdWVWYWx1ZXMpO1xuICAgICAgICB9O1xuICAgICAgICBmb3IgKGNvbnN0IF9wcm9wZXJ0eSBvZiByZWJpbmRBbGwpIHtcbiAgICAgICAgICBpZiAoX3Byb3BlcnR5IGluc3RhbmNlb2YgRm9ybVByb3BlcnR5KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCByZWJpbmRQYXRocyA9IGZpbmRQcm9wZXJ0aWVzVG9SZWJpbmQoX3Byb3BlcnR5KTtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCByZWJpbmRQcm9wUGF0aCBvZiByZWJpbmRQYXRocykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlYmluZFByb3AgPSBfcHJvcGVydHkuc2VhcmNoUHJvcGVydHkocmViaW5kUHJvcFBhdGgpO1xuICAgICAgICAgICAgICAgIHJlYmluZFByb3AuX2JpbmRWaXNpYmlsaXR5KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignUmViaW5kaW5nIHZpc2liaWxpdHkgZXJyb3IgYXQgcGF0aDonLCBfcHJvcGVydHkucGF0aCwgJ3Byb3BlcnR5OicsIF9wcm9wZXJ0eSwgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmViaW5kVmlzaWJpbGl0eSgpO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgZ2V0KHRhcmdldDogRm9ybVByb3BlcnR5W10gfCB7IFtwOiBzdHJpbmddOiBGb3JtUHJvcGVydHkgfSwgcDogUHJvcGVydHlLZXksIHJlY2VpdmVyOiBhbnkpOiBhbnkge1xuICAgICAgcmV0dXJuIHRhcmdldFtwIGFzIHN0cmluZ107XG4gICAgfSxcbiAgICBkZWxldGVQcm9wZXJ0eSh0YXJnZXQ6IEZvcm1Qcm9wZXJ0eVtdIHwgeyBbcDogc3RyaW5nXTogRm9ybVByb3BlcnR5IH0sIHA6IFByb3BlcnR5S2V5KTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gZGVsZXRlIHRhcmdldFtwIGFzIHN0cmluZ107XG4gICAgfVxuICB9O1xuXG4gIGdldFByb3BlcnR5KHBhdGg6IHN0cmluZykge1xuICAgIGxldCBzdWJQYXRoSWR4ID0gcGF0aC5pbmRleE9mKCcvJyk7XG4gICAgbGV0IHByb3BlcnR5SWQgPSBzdWJQYXRoSWR4ICE9PSAtMSA/IHBhdGguc3Vic3RyKDAsIHN1YlBhdGhJZHgpIDogcGF0aDtcblxuICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMucHJvcGVydGllc1twcm9wZXJ0eUlkXTtcbiAgICBpZiAocHJvcGVydHkgIT09IG51bGwgJiYgc3ViUGF0aElkeCAhPT0gLTEgJiYgcHJvcGVydHkgaW5zdGFuY2VvZiBQcm9wZXJ0eUdyb3VwKSB7XG4gICAgICBsZXQgc3ViUGF0aCA9IHBhdGguc3Vic3RyKHN1YlBhdGhJZHggKyAxKTtcbiAgICAgIHByb3BlcnR5ID0gKDxQcm9wZXJ0eUdyb3VwPnByb3BlcnR5KS5nZXRQcm9wZXJ0eShzdWJQYXRoKTtcbiAgICB9XG4gICAgcmV0dXJuIHByb3BlcnR5O1xuICB9XG5cbiAgcHVibGljIGZvckVhY2hDaGlsZChmbjogKGZvcm1Qcm9wZXJ0eTogRm9ybVByb3BlcnR5LCBzdHI6IFN0cmluZykgPT4gdm9pZCkge1xuICAgIGZvciAobGV0IHByb3BlcnR5SWQgaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG4gICAgICBpZiAodGhpcy5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5SWQpKSB7XG4gICAgICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMucHJvcGVydGllc1twcm9wZXJ0eUlkXTtcbiAgICAgICAgZm4ocHJvcGVydHksIHByb3BlcnR5SWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBmb3JFYWNoQ2hpbGRSZWN1cnNpdmUoZm46IChmb3JtUHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSkgPT4gdm9pZCkge1xuICAgIHRoaXMuZm9yRWFjaENoaWxkKChjaGlsZCkgPT4ge1xuICAgICAgZm4oY2hpbGQpO1xuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgUHJvcGVydHlHcm91cCkge1xuICAgICAgICAoPFByb3BlcnR5R3JvdXA+Y2hpbGQpLmZvckVhY2hDaGlsZFJlY3Vyc2l2ZShmbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgX2JpbmRWaXNpYmlsaXR5KCkge1xuICAgIHN1cGVyLl9iaW5kVmlzaWJpbGl0eSgpO1xuICAgIHRoaXMuX2JpbmRWaXNpYmlsaXR5UmVjdXJzaXZlKCk7XG4gIH1cblxuICBwcml2YXRlIF9iaW5kVmlzaWJpbGl0eVJlY3Vyc2l2ZSgpIHtcbiAgICB0aGlzLmZvckVhY2hDaGlsZFJlY3Vyc2l2ZSgocHJvcGVydHkpID0+IHtcbiAgICAgIHByb3BlcnR5Ll9iaW5kVmlzaWJpbGl0eSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGlzUm9vdCgpIHtcbiAgICByZXR1cm4gdGhpcyA9PT0gdGhpcy5yb290O1xuICB9XG59XG5cblxuIl19