var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormElementComponent } from './formelement.component';
import { FormComponent } from './form.component';
import { WidgetChooserComponent } from './widgetchooser.component';
import { ArrayWidget, ButtonWidget, ObjectWidget, CheckboxWidget, FileWidget, IntegerWidget, TextAreaWidget, RadioWidget, RangeWidget, SelectWidget, StringWidget } from './defaultwidgets';
import { DefaultWidget } from './default.widget';
import { WidgetRegistry } from './widgetregistry';
import { DefaultWidgetRegistry } from './defaultwidgets';
import { SchemaValidatorFactory, ZSchemaValidatorFactory } from './schemavalidatorfactory';
import { FormElementComponentAction } from "./formelement.action.component";
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
    SchemaFormModule_1 = SchemaFormModule;
    SchemaFormModule.forRoot = function () {
        return {
            ngModule: SchemaFormModule_1,
            providers: moduleProviders.slice()
        };
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
        })
    ], SchemaFormModule);
    return SchemaFormModule;
    var SchemaFormModule_1;
}());
export { SchemaFormModule };
