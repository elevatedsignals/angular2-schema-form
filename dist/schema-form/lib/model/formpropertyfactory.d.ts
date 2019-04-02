import { FormProperty, PropertyGroup } from './formproperty';
import { SchemaValidatorFactory } from '../schemavalidatorfactory';
import { ValidatorRegistry } from './validatorregistry';
import { PropertyBindingRegistry } from '../property-binding-registry';
export declare class FormPropertyFactory {
    private schemaValidatorFactory;
    private validatorRegistry;
    private propertyBindingRegistry;
    constructor(schemaValidatorFactory: SchemaValidatorFactory, validatorRegistry: ValidatorRegistry, propertyBindingRegistry: PropertyBindingRegistry);
    createProperty(schema: any, parent?: PropertyGroup, propertyId?: string): FormProperty;
    private initializeRoot;
}
