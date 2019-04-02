/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormElementComponent } from './formelement.component';
import { FormComponent } from './form.component';
import { WidgetChooserComponent } from './widgetchooser.component';
import { ArrayWidget } from './defaultwidgets/array/array.widget';
import { ButtonWidget } from './defaultwidgets/button/button.widget';
import { ObjectWidget } from './defaultwidgets/object/object.widget';
import { CheckboxWidget } from './defaultwidgets/checkbox/checkbox.widget';
import { FileWidget } from './defaultwidgets/file/file.widget';
import { IntegerWidget } from './defaultwidgets/integer/integer.widget';
import { TextAreaWidget } from './defaultwidgets/textarea/textarea.widget';
import { RadioWidget } from './defaultwidgets/radio/radio.widget';
import { RangeWidget } from './defaultwidgets/range/range.widget';
import { SelectWidget } from './defaultwidgets/select/select.widget';
import { StringWidget } from './defaultwidgets/string/string.widget';
import { DefaultWidgetRegistry } from './defaultwidgets/defaultwidgetregistry';
import { DefaultWidget } from './default.widget';
import { WidgetRegistry } from './widgetregistry';
import { SchemaValidatorFactory, ZSchemaValidatorFactory } from './schemavalidatorfactory';
import { FormElementComponentAction } from './formelement.action.component';
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
            providers: tslib_1.__spread(moduleProviders)
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
export { SchemaFormModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLWZvcm0ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3NjaGVtYS1mb3JtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQXNCLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQ0wsV0FBVyxFQUNYLG1CQUFtQixFQUNwQixNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzdELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDaEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ25FLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUNuRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDekUsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQzdELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDekUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNoRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDbkUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ25FLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQzdFLE9BQU8sRUFDTCxhQUFhLEVBQ2QsTUFBTSxrQkFBa0IsQ0FBQztBQUUxQixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFDLHNCQUFzQixFQUFFLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekYsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7O0lBRXBFLGVBQWUsR0FBRztJQUN0QjtRQUNFLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLFFBQVEsRUFBRSxxQkFBcUI7S0FDaEM7SUFDRDtRQUNFLE9BQU8sRUFBRSxzQkFBc0I7UUFDL0IsUUFBUSxFQUFFLHVCQUF1QjtLQUNsQztDQUNGO0FBRUQ7SUFBQTtJQWdFQSxDQUFDOzs7O0lBUFEsd0JBQU87OztJQUFkO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsU0FBUyxtQkFBTSxlQUFlLENBQUM7U0FDaEMsQ0FBQztJQUNKLENBQUM7O2dCQTlERixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsQ0FBQztvQkFDekQsWUFBWSxFQUFFO3dCQUNaLG9CQUFvQjt3QkFDcEIsMEJBQTBCO3dCQUMxQixhQUFhO3dCQUNiLHNCQUFzQjt3QkFDdEIsYUFBYTt3QkFDYixXQUFXO3dCQUNYLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixjQUFjO3dCQUNkLFVBQVU7d0JBQ1YsYUFBYTt3QkFDYixjQUFjO3dCQUNkLFdBQVc7d0JBQ1gsV0FBVzt3QkFDWCxZQUFZO3dCQUNaLFlBQVk7cUJBQ2I7b0JBQ0QsZUFBZSxFQUFFO3dCQUNmLG9CQUFvQjt3QkFDcEIsMEJBQTBCO3dCQUMxQixhQUFhO3dCQUNiLHNCQUFzQjt3QkFDdEIsV0FBVzt3QkFDWCxZQUFZO3dCQUNaLFlBQVk7d0JBQ1osY0FBYzt3QkFDZCxVQUFVO3dCQUNWLGFBQWE7d0JBQ2IsY0FBYzt3QkFDZCxXQUFXO3dCQUNYLFdBQVc7d0JBQ1gsWUFBWTt3QkFDWixZQUFZO3FCQUNiO29CQUNELE9BQU8sRUFBRTt3QkFDUCxhQUFhO3dCQUNiLG9CQUFvQjt3QkFDcEIsMEJBQTBCO3dCQUMxQixzQkFBc0I7d0JBQ3RCLFdBQVc7d0JBQ1gsWUFBWTt3QkFDWixZQUFZO3dCQUNaLGNBQWM7d0JBQ2QsVUFBVTt3QkFDVixhQUFhO3dCQUNiLGNBQWM7d0JBQ2QsV0FBVzt3QkFDWCxXQUFXO3dCQUNYLFlBQVk7d0JBQ1osWUFBWTtxQkFDYjtpQkFDRjs7SUFVRCx1QkFBQztDQUFBLEFBaEVELElBZ0VDO1NBVFksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEZvcm1zTW9kdWxlLFxuICBSZWFjdGl2ZUZvcm1zTW9kdWxlXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtGb3JtRWxlbWVudENvbXBvbmVudH0gZnJvbSAnLi9mb3JtZWxlbWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtQ29tcG9uZW50fSBmcm9tICcuL2Zvcm0uY29tcG9uZW50JztcbmltcG9ydCB7V2lkZ2V0Q2hvb3NlckNvbXBvbmVudH0gZnJvbSAnLi93aWRnZXRjaG9vc2VyLmNvbXBvbmVudCc7XG5pbXBvcnQge0FycmF5V2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL2FycmF5L2FycmF5LndpZGdldCc7XG5pbXBvcnQge0J1dHRvbldpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9idXR0b24vYnV0dG9uLndpZGdldCc7XG5pbXBvcnQge09iamVjdFdpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9vYmplY3Qvb2JqZWN0LndpZGdldCc7XG5pbXBvcnQge0NoZWNrYm94V2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL2NoZWNrYm94L2NoZWNrYm94LndpZGdldCc7XG5pbXBvcnQge0ZpbGVXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvZmlsZS9maWxlLndpZGdldCc7XG5pbXBvcnQge0ludGVnZXJXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvaW50ZWdlci9pbnRlZ2VyLndpZGdldCc7XG5pbXBvcnQge1RleHRBcmVhV2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL3RleHRhcmVhL3RleHRhcmVhLndpZGdldCc7XG5pbXBvcnQge1JhZGlvV2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL3JhZGlvL3JhZGlvLndpZGdldCc7XG5pbXBvcnQge1JhbmdlV2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL3JhbmdlL3JhbmdlLndpZGdldCc7XG5pbXBvcnQge1NlbGVjdFdpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9zZWxlY3Qvc2VsZWN0LndpZGdldCc7XG5pbXBvcnQge1N0cmluZ1dpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9zdHJpbmcvc3RyaW5nLndpZGdldCc7XG5pbXBvcnQge0RlZmF1bHRXaWRnZXRSZWdpc3RyeX0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9kZWZhdWx0d2lkZ2V0cmVnaXN0cnknO1xuaW1wb3J0IHtcbiAgRGVmYXVsdFdpZGdldFxufSBmcm9tICcuL2RlZmF1bHQud2lkZ2V0JztcblxuaW1wb3J0IHtXaWRnZXRSZWdpc3RyeX0gZnJvbSAnLi93aWRnZXRyZWdpc3RyeSc7XG5pbXBvcnQge1NjaGVtYVZhbGlkYXRvckZhY3RvcnksIFpTY2hlbWFWYWxpZGF0b3JGYWN0b3J5fSBmcm9tICcuL3NjaGVtYXZhbGlkYXRvcmZhY3RvcnknO1xuaW1wb3J0IHtGb3JtRWxlbWVudENvbXBvbmVudEFjdGlvbn0gZnJvbSAnLi9mb3JtZWxlbWVudC5hY3Rpb24uY29tcG9uZW50JztcblxuY29uc3QgbW9kdWxlUHJvdmlkZXJzID0gW1xuICB7XG4gICAgcHJvdmlkZTogV2lkZ2V0UmVnaXN0cnksXG4gICAgdXNlQ2xhc3M6IERlZmF1bHRXaWRnZXRSZWdpc3RyeVxuICB9LFxuICB7XG4gICAgcHJvdmlkZTogU2NoZW1hVmFsaWRhdG9yRmFjdG9yeSxcbiAgICB1c2VDbGFzczogWlNjaGVtYVZhbGlkYXRvckZhY3RvcnlcbiAgfVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBGb3JtRWxlbWVudENvbXBvbmVudCxcbiAgICBGb3JtRWxlbWVudENvbXBvbmVudEFjdGlvbixcbiAgICBGb3JtQ29tcG9uZW50LFxuICAgIFdpZGdldENob29zZXJDb21wb25lbnQsXG4gICAgRGVmYXVsdFdpZGdldCxcbiAgICBBcnJheVdpZGdldCxcbiAgICBCdXR0b25XaWRnZXQsXG4gICAgT2JqZWN0V2lkZ2V0LFxuICAgIENoZWNrYm94V2lkZ2V0LFxuICAgIEZpbGVXaWRnZXQsXG4gICAgSW50ZWdlcldpZGdldCxcbiAgICBUZXh0QXJlYVdpZGdldCxcbiAgICBSYWRpb1dpZGdldCxcbiAgICBSYW5nZVdpZGdldCxcbiAgICBTZWxlY3RXaWRnZXQsXG4gICAgU3RyaW5nV2lkZ2V0LFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBGb3JtRWxlbWVudENvbXBvbmVudCxcbiAgICBGb3JtRWxlbWVudENvbXBvbmVudEFjdGlvbixcbiAgICBGb3JtQ29tcG9uZW50LFxuICAgIFdpZGdldENob29zZXJDb21wb25lbnQsXG4gICAgQXJyYXlXaWRnZXQsXG4gICAgQnV0dG9uV2lkZ2V0LFxuICAgIE9iamVjdFdpZGdldCxcbiAgICBDaGVja2JveFdpZGdldCxcbiAgICBGaWxlV2lkZ2V0LFxuICAgIEludGVnZXJXaWRnZXQsXG4gICAgVGV4dEFyZWFXaWRnZXQsXG4gICAgUmFkaW9XaWRnZXQsXG4gICAgUmFuZ2VXaWRnZXQsXG4gICAgU2VsZWN0V2lkZ2V0LFxuICAgIFN0cmluZ1dpZGdldCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEZvcm1Db21wb25lbnQsXG4gICAgRm9ybUVsZW1lbnRDb21wb25lbnQsXG4gICAgRm9ybUVsZW1lbnRDb21wb25lbnRBY3Rpb24sXG4gICAgV2lkZ2V0Q2hvb3NlckNvbXBvbmVudCxcbiAgICBBcnJheVdpZGdldCxcbiAgICBCdXR0b25XaWRnZXQsXG4gICAgT2JqZWN0V2lkZ2V0LFxuICAgIENoZWNrYm94V2lkZ2V0LFxuICAgIEZpbGVXaWRnZXQsXG4gICAgSW50ZWdlcldpZGdldCxcbiAgICBUZXh0QXJlYVdpZGdldCxcbiAgICBSYWRpb1dpZGdldCxcbiAgICBSYW5nZVdpZGdldCxcbiAgICBTZWxlY3RXaWRnZXQsXG4gICAgU3RyaW5nV2lkZ2V0XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU2NoZW1hRm9ybU1vZHVsZSB7XG5cbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTY2hlbWFGb3JtTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbLi4ubW9kdWxlUHJvdmlkZXJzXVxuICAgIH07XG4gIH1cblxufVxuIl19