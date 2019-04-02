import { BehaviorSubject } from 'rxjs';
import { SchemaValidatorFactory } from '../schemavalidatorfactory';
import { ValidatorRegistry } from './validatorregistry';
import { PropertyBindingRegistry } from '../property-binding-registry';
export declare abstract class FormProperty {
    private validatorRegistry;
    schema: any;
    schemaValidator: Function;
    _value: any;
    _errors: any;
    private _valueChanges;
    private _errorsChanges;
    private _visible;
    private _visibilityChanges;
    private _root;
    private _parent;
    private _path;
    _propertyBindingRegistry: PropertyBindingRegistry;
    _canonicalPath: string;
    constructor(schemaValidatorFactory: SchemaValidatorFactory, validatorRegistry: ValidatorRegistry, schema: any, parent: PropertyGroup, path: string);
    readonly valueChanges: BehaviorSubject<any>;
    readonly errorsChanges: BehaviorSubject<any>;
    readonly type: string;
    readonly parent: PropertyGroup;
    readonly root: PropertyGroup;
    readonly path: string;
    readonly value: any;
    readonly visible: boolean;
    readonly valid: boolean;
    abstract setValue(value: any, onlySelf: boolean): any;
    abstract reset(value: any, onlySelf: boolean): any;
    updateValueAndValidity(onlySelf?: boolean, emitEvent?: boolean): void;
    /**
     * @internal
     */
    abstract _hasValue(): boolean;
    /**
     *  @internal
     */
    abstract _updateValue(): any;
    /**
     * @internal
     */
    _runValidation(): any;
    private mergeErrors;
    private setErrors;
    extendErrors(errors: any): void;
    searchProperty(path: string): FormProperty;
    findRoot(): PropertyGroup;
    private setVisible;
    private __bindVisibility;
    _bindVisibility(): void;
    private registerMissingVisibilityBinding;
    /**
     * Finds all <code>formProperties</code> from a path with wildcards.<br/>
     * e.g: <code>/garage/cars/&#42;/tires/&#42;/name</code><br/>
     * @param target
     * @param propertyPath
     */
    findProperties(target: FormProperty, propertyPath: string): FormProperty[];
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
    findPropertyPaths(target: FormProperty, path: string, parentPath?: string): string[];
}
export declare abstract class PropertyGroup extends FormProperty {
    _properties: FormProperty[] | {
        [key: string]: FormProperty;
    };
    properties: FormProperty[] | {
        [key: string]: FormProperty;
    };
    private _propertyProxyHandler;
    getProperty(path: string): any;
    forEachChild(fn: (formProperty: FormProperty, str: String) => void): void;
    forEachChildRecursive(fn: (formProperty: FormProperty) => void): void;
    _bindVisibility(): void;
    private _bindVisibilityRecursive;
    isRoot(): boolean;
}
