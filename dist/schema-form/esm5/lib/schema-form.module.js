import { __decorate, __read, __spread } from "tslib";
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
import { DisableControlDirective } from './defaultwidgets/_directives/disableControl.directive';
import { DefaultWidget } from './default.widget';
import { WidgetRegistry } from './widgetregistry';
import { SchemaValidatorFactory, ZSchemaValidatorFactory } from './schemavalidatorfactory';
import { FormElementComponentAction } from './formelement.action.component';
import { ExpressionCompilerFactory, JEXLExpressionCompilerFactory } from './expression-compiler-factory';
var moduleProviders = [
    {
        provide: WidgetRegistry,
        useClass: DefaultWidgetRegistry
    },
    {
        provide: SchemaValidatorFactory,
        useClass: ZSchemaValidatorFactory
    },
    {
        provide: ExpressionCompilerFactory,
        useClass: JEXLExpressionCompilerFactory
    }
];
var SchemaFormModule = /** @class */ (function () {
    function SchemaFormModule() {
    }
    SchemaFormModule_1 = SchemaFormModule;
    SchemaFormModule.forRoot = function () {
        return {
            ngModule: SchemaFormModule_1,
            providers: __spread(moduleProviders)
        };
    };
    var SchemaFormModule_1;
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
                DisableControlDirective
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
                StringWidget
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
                StringWidget,
                DisableControlDirective
            ]
        })
    ], SchemaFormModule);
    return SchemaFormModule;
}());
export { SchemaFormModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLWZvcm0ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3NjaGVtYS1mb3JtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBc0IsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFDTCxXQUFXLEVBQ1gsbUJBQW1CLEVBQ3BCLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDN0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNoRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDbkUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ25FLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDN0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDaEUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUNuRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDbkUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDN0UsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sdURBQXVELENBQUM7QUFFOUYsT0FBTyxFQUNMLGFBQWEsRUFDZCxNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUUsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RixPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMxRSxPQUFPLEVBQUMseUJBQXlCLEVBQUUsNkJBQTZCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUV2RyxJQUFNLGVBQWUsR0FBRztJQUN0QjtRQUNFLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLFFBQVEsRUFBRSxxQkFBcUI7S0FDaEM7SUFDRDtRQUNFLE9BQU8sRUFBRSxzQkFBc0I7UUFDL0IsUUFBUSxFQUFFLHVCQUF1QjtLQUNsQztJQUNEO1FBQ0UsT0FBTyxFQUFFLHlCQUF5QjtRQUNsQyxRQUFRLEVBQUUsNkJBQTZCO0tBQ3hDO0NBQ0YsQ0FBQztBQTJERjtJQUFBO0lBU0EsQ0FBQzt5QkFUWSxnQkFBZ0I7SUFFcEIsd0JBQU8sR0FBZDtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUsa0JBQWdCO1lBQzFCLFNBQVMsV0FBTSxlQUFlLENBQUM7U0FDaEMsQ0FBQztJQUNKLENBQUM7O0lBUFUsZ0JBQWdCO1FBekQ1QixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixDQUFDO1lBQ3pELFlBQVksRUFBRTtnQkFDWixvQkFBb0I7Z0JBQ3BCLDBCQUEwQjtnQkFDMUIsYUFBYTtnQkFDYixzQkFBc0I7Z0JBQ3RCLGFBQWE7Z0JBQ2IsV0FBVztnQkFDWCxZQUFZO2dCQUNaLFlBQVk7Z0JBQ1osY0FBYztnQkFDZCxVQUFVO2dCQUNWLGFBQWE7Z0JBQ2IsY0FBYztnQkFDZCxXQUFXO2dCQUNYLFdBQVc7Z0JBQ1gsWUFBWTtnQkFDWixZQUFZO2dCQUNaLHVCQUF1QjthQUN4QjtZQUNELGVBQWUsRUFBRTtnQkFDZixvQkFBb0I7Z0JBQ3BCLDBCQUEwQjtnQkFDMUIsYUFBYTtnQkFDYixzQkFBc0I7Z0JBQ3RCLFdBQVc7Z0JBQ1gsWUFBWTtnQkFDWixZQUFZO2dCQUNaLGNBQWM7Z0JBQ2QsVUFBVTtnQkFDVixhQUFhO2dCQUNiLGNBQWM7Z0JBQ2QsV0FBVztnQkFDWCxXQUFXO2dCQUNYLFlBQVk7Z0JBQ1osWUFBWTthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLGFBQWE7Z0JBQ2Isb0JBQW9CO2dCQUNwQiwwQkFBMEI7Z0JBQzFCLHNCQUFzQjtnQkFDdEIsV0FBVztnQkFDWCxZQUFZO2dCQUNaLFlBQVk7Z0JBQ1osY0FBYztnQkFDZCxVQUFVO2dCQUNWLGFBQWE7Z0JBQ2IsY0FBYztnQkFDZCxXQUFXO2dCQUNYLFdBQVc7Z0JBQ1gsWUFBWTtnQkFDWixZQUFZO2dCQUNaLHVCQUF1QjthQUN4QjtTQUNGLENBQUM7T0FDVyxnQkFBZ0IsQ0FTNUI7SUFBRCx1QkFBQztDQUFBLEFBVEQsSUFTQztTQVRZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBGb3Jtc01vZHVsZSxcbiAgUmVhY3RpdmVGb3Jtc01vZHVsZVxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7Rm9ybUVsZW1lbnRDb21wb25lbnR9IGZyb20gJy4vZm9ybWVsZW1lbnQuY29tcG9uZW50JztcbmltcG9ydCB7Rm9ybUNvbXBvbmVudH0gZnJvbSAnLi9mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQge1dpZGdldENob29zZXJDb21wb25lbnR9IGZyb20gJy4vd2lkZ2V0Y2hvb3Nlci5jb21wb25lbnQnO1xuaW1wb3J0IHtBcnJheVdpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9hcnJheS9hcnJheS53aWRnZXQnO1xuaW1wb3J0IHtCdXR0b25XaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvYnV0dG9uL2J1dHRvbi53aWRnZXQnO1xuaW1wb3J0IHtPYmplY3RXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvb2JqZWN0L29iamVjdC53aWRnZXQnO1xuaW1wb3J0IHtDaGVja2JveFdpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9jaGVja2JveC9jaGVja2JveC53aWRnZXQnO1xuaW1wb3J0IHtGaWxlV2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL2ZpbGUvZmlsZS53aWRnZXQnO1xuaW1wb3J0IHtJbnRlZ2VyV2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL2ludGVnZXIvaW50ZWdlci53aWRnZXQnO1xuaW1wb3J0IHtUZXh0QXJlYVdpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy90ZXh0YXJlYS90ZXh0YXJlYS53aWRnZXQnO1xuaW1wb3J0IHtSYWRpb1dpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9yYWRpby9yYWRpby53aWRnZXQnO1xuaW1wb3J0IHtSYW5nZVdpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9yYW5nZS9yYW5nZS53aWRnZXQnO1xuaW1wb3J0IHtTZWxlY3RXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvc2VsZWN0L3NlbGVjdC53aWRnZXQnO1xuaW1wb3J0IHtTdHJpbmdXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvc3RyaW5nL3N0cmluZy53aWRnZXQnO1xuaW1wb3J0IHtEZWZhdWx0V2lkZ2V0UmVnaXN0cnl9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvZGVmYXVsdHdpZGdldHJlZ2lzdHJ5JztcbmltcG9ydCB7RGlzYWJsZUNvbnRyb2xEaXJlY3RpdmV9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvX2RpcmVjdGl2ZXMvZGlzYWJsZUNvbnRyb2wuZGlyZWN0aXZlJztcblxuaW1wb3J0IHtcbiAgRGVmYXVsdFdpZGdldFxufSBmcm9tICcuL2RlZmF1bHQud2lkZ2V0JztcblxuaW1wb3J0IHtXaWRnZXRSZWdpc3RyeX0gZnJvbSAnLi93aWRnZXRyZWdpc3RyeSc7XG5pbXBvcnQge1NjaGVtYVZhbGlkYXRvckZhY3RvcnksIFpTY2hlbWFWYWxpZGF0b3JGYWN0b3J5fSBmcm9tICcuL3NjaGVtYXZhbGlkYXRvcmZhY3RvcnknO1xuaW1wb3J0IHtGb3JtRWxlbWVudENvbXBvbmVudEFjdGlvbn0gZnJvbSAnLi9mb3JtZWxlbWVudC5hY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7RXhwcmVzc2lvbkNvbXBpbGVyRmFjdG9yeSwgSkVYTEV4cHJlc3Npb25Db21waWxlckZhY3Rvcnl9IGZyb20gJy4vZXhwcmVzc2lvbi1jb21waWxlci1mYWN0b3J5JztcblxuY29uc3QgbW9kdWxlUHJvdmlkZXJzID0gW1xuICB7XG4gICAgcHJvdmlkZTogV2lkZ2V0UmVnaXN0cnksXG4gICAgdXNlQ2xhc3M6IERlZmF1bHRXaWRnZXRSZWdpc3RyeVxuICB9LFxuICB7XG4gICAgcHJvdmlkZTogU2NoZW1hVmFsaWRhdG9yRmFjdG9yeSxcbiAgICB1c2VDbGFzczogWlNjaGVtYVZhbGlkYXRvckZhY3RvcnlcbiAgfSxcbiAge1xuICAgIHByb3ZpZGU6IEV4cHJlc3Npb25Db21waWxlckZhY3RvcnksXG4gICAgdXNlQ2xhc3M6IEpFWExFeHByZXNzaW9uQ29tcGlsZXJGYWN0b3J5XG4gIH1cbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRm9ybUVsZW1lbnRDb21wb25lbnQsXG4gICAgRm9ybUVsZW1lbnRDb21wb25lbnRBY3Rpb24sXG4gICAgRm9ybUNvbXBvbmVudCxcbiAgICBXaWRnZXRDaG9vc2VyQ29tcG9uZW50LFxuICAgIERlZmF1bHRXaWRnZXQsXG4gICAgQXJyYXlXaWRnZXQsXG4gICAgQnV0dG9uV2lkZ2V0LFxuICAgIE9iamVjdFdpZGdldCxcbiAgICBDaGVja2JveFdpZGdldCxcbiAgICBGaWxlV2lkZ2V0LFxuICAgIEludGVnZXJXaWRnZXQsXG4gICAgVGV4dEFyZWFXaWRnZXQsXG4gICAgUmFkaW9XaWRnZXQsXG4gICAgUmFuZ2VXaWRnZXQsXG4gICAgU2VsZWN0V2lkZ2V0LFxuICAgIFN0cmluZ1dpZGdldCxcbiAgICBEaXNhYmxlQ29udHJvbERpcmVjdGl2ZVxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBGb3JtRWxlbWVudENvbXBvbmVudCxcbiAgICBGb3JtRWxlbWVudENvbXBvbmVudEFjdGlvbixcbiAgICBGb3JtQ29tcG9uZW50LFxuICAgIFdpZGdldENob29zZXJDb21wb25lbnQsXG4gICAgQXJyYXlXaWRnZXQsXG4gICAgQnV0dG9uV2lkZ2V0LFxuICAgIE9iamVjdFdpZGdldCxcbiAgICBDaGVja2JveFdpZGdldCxcbiAgICBGaWxlV2lkZ2V0LFxuICAgIEludGVnZXJXaWRnZXQsXG4gICAgVGV4dEFyZWFXaWRnZXQsXG4gICAgUmFkaW9XaWRnZXQsXG4gICAgUmFuZ2VXaWRnZXQsXG4gICAgU2VsZWN0V2lkZ2V0LFxuICAgIFN0cmluZ1dpZGdldFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRm9ybUNvbXBvbmVudCxcbiAgICBGb3JtRWxlbWVudENvbXBvbmVudCxcbiAgICBGb3JtRWxlbWVudENvbXBvbmVudEFjdGlvbixcbiAgICBXaWRnZXRDaG9vc2VyQ29tcG9uZW50LFxuICAgIEFycmF5V2lkZ2V0LFxuICAgIEJ1dHRvbldpZGdldCxcbiAgICBPYmplY3RXaWRnZXQsXG4gICAgQ2hlY2tib3hXaWRnZXQsXG4gICAgRmlsZVdpZGdldCxcbiAgICBJbnRlZ2VyV2lkZ2V0LFxuICAgIFRleHRBcmVhV2lkZ2V0LFxuICAgIFJhZGlvV2lkZ2V0LFxuICAgIFJhbmdlV2lkZ2V0LFxuICAgIFNlbGVjdFdpZGdldCxcbiAgICBTdHJpbmdXaWRnZXQsXG4gICAgRGlzYWJsZUNvbnRyb2xEaXJlY3RpdmVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTY2hlbWFGb3JtTW9kdWxlIHtcblxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFNjaGVtYUZvcm1Nb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNjaGVtYUZvcm1Nb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFsuLi5tb2R1bGVQcm92aWRlcnNdXG4gICAgfTtcbiAgfVxuXG59XG4iXX0=