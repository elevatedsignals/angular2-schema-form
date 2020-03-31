var SchemaFormModule_1;
import { __decorate } from "tslib";
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
const moduleProviders = [
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
let SchemaFormModule = SchemaFormModule_1 = class SchemaFormModule {
    static forRoot() {
        return {
            ngModule: SchemaFormModule_1,
            providers: [...moduleProviders]
        };
    }
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
export { SchemaFormModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLWZvcm0ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3NjaGVtYS1mb3JtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQXNCLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQ0wsV0FBVyxFQUNYLG1CQUFtQixFQUNwQixNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzdELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDaEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ25FLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUNuRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDekUsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQzdELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDekUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNoRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDbkUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ25FLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQzdFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHVEQUF1RCxDQUFDO0FBRTlGLE9BQU8sRUFDTCxhQUFhLEVBQ2QsTUFBTSxrQkFBa0IsQ0FBQztBQUUxQixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFDLHNCQUFzQixFQUFFLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekYsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDMUUsT0FBTyxFQUFDLHlCQUF5QixFQUFFLDZCQUE2QixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFFdkcsTUFBTSxlQUFlLEdBQUc7SUFDdEI7UUFDRSxPQUFPLEVBQUUsY0FBYztRQUN2QixRQUFRLEVBQUUscUJBQXFCO0tBQ2hDO0lBQ0Q7UUFDRSxPQUFPLEVBQUUsc0JBQXNCO1FBQy9CLFFBQVEsRUFBRSx1QkFBdUI7S0FDbEM7SUFDRDtRQUNFLE9BQU8sRUFBRSx5QkFBeUI7UUFDbEMsUUFBUSxFQUFFLDZCQUE2QjtLQUN4QztDQUNGLENBQUM7QUEyREYsSUFBYSxnQkFBZ0Isd0JBQTdCLE1BQWEsZ0JBQWdCO0lBRTNCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxrQkFBZ0I7WUFDMUIsU0FBUyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUM7U0FDaEMsQ0FBQztJQUNKLENBQUM7Q0FFRixDQUFBO0FBVFksZ0JBQWdCO0lBekQ1QixRQUFRLENBQUM7UUFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixDQUFDO1FBQ3pELFlBQVksRUFBRTtZQUNaLG9CQUFvQjtZQUNwQiwwQkFBMEI7WUFDMUIsYUFBYTtZQUNiLHNCQUFzQjtZQUN0QixhQUFhO1lBQ2IsV0FBVztZQUNYLFlBQVk7WUFDWixZQUFZO1lBQ1osY0FBYztZQUNkLFVBQVU7WUFDVixhQUFhO1lBQ2IsY0FBYztZQUNkLFdBQVc7WUFDWCxXQUFXO1lBQ1gsWUFBWTtZQUNaLFlBQVk7WUFDWix1QkFBdUI7U0FDeEI7UUFDRCxlQUFlLEVBQUU7WUFDZixvQkFBb0I7WUFDcEIsMEJBQTBCO1lBQzFCLGFBQWE7WUFDYixzQkFBc0I7WUFDdEIsV0FBVztZQUNYLFlBQVk7WUFDWixZQUFZO1lBQ1osY0FBYztZQUNkLFVBQVU7WUFDVixhQUFhO1lBQ2IsY0FBYztZQUNkLFdBQVc7WUFDWCxXQUFXO1lBQ1gsWUFBWTtZQUNaLFlBQVk7U0FDYjtRQUNELE9BQU8sRUFBRTtZQUNQLGFBQWE7WUFDYixvQkFBb0I7WUFDcEIsMEJBQTBCO1lBQzFCLHNCQUFzQjtZQUN0QixXQUFXO1lBQ1gsWUFBWTtZQUNaLFlBQVk7WUFDWixjQUFjO1lBQ2QsVUFBVTtZQUNWLGFBQWE7WUFDYixjQUFjO1lBQ2QsV0FBVztZQUNYLFdBQVc7WUFDWCxZQUFZO1lBQ1osWUFBWTtZQUNaLHVCQUF1QjtTQUN4QjtLQUNGLENBQUM7R0FDVyxnQkFBZ0IsQ0FTNUI7U0FUWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgRm9ybXNNb2R1bGUsXG4gIFJlYWN0aXZlRm9ybXNNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge0Zvcm1FbGVtZW50Q29tcG9uZW50fSBmcm9tICcuL2Zvcm1lbGVtZW50LmNvbXBvbmVudCc7XG5pbXBvcnQge0Zvcm1Db21wb25lbnR9IGZyb20gJy4vZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtXaWRnZXRDaG9vc2VyQ29tcG9uZW50fSBmcm9tICcuL3dpZGdldGNob29zZXIuY29tcG9uZW50JztcbmltcG9ydCB7QXJyYXlXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvYXJyYXkvYXJyYXkud2lkZ2V0JztcbmltcG9ydCB7QnV0dG9uV2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL2J1dHRvbi9idXR0b24ud2lkZ2V0JztcbmltcG9ydCB7T2JqZWN0V2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL29iamVjdC9vYmplY3Qud2lkZ2V0JztcbmltcG9ydCB7Q2hlY2tib3hXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvY2hlY2tib3gvY2hlY2tib3gud2lkZ2V0JztcbmltcG9ydCB7RmlsZVdpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9maWxlL2ZpbGUud2lkZ2V0JztcbmltcG9ydCB7SW50ZWdlcldpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9pbnRlZ2VyL2ludGVnZXIud2lkZ2V0JztcbmltcG9ydCB7VGV4dEFyZWFXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvdGV4dGFyZWEvdGV4dGFyZWEud2lkZ2V0JztcbmltcG9ydCB7UmFkaW9XaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvcmFkaW8vcmFkaW8ud2lkZ2V0JztcbmltcG9ydCB7UmFuZ2VXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvcmFuZ2UvcmFuZ2Uud2lkZ2V0JztcbmltcG9ydCB7U2VsZWN0V2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL3NlbGVjdC9zZWxlY3Qud2lkZ2V0JztcbmltcG9ydCB7U3RyaW5nV2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL3N0cmluZy9zdHJpbmcud2lkZ2V0JztcbmltcG9ydCB7RGVmYXVsdFdpZGdldFJlZ2lzdHJ5fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL2RlZmF1bHR3aWRnZXRyZWdpc3RyeSc7XG5pbXBvcnQge0Rpc2FibGVDb250cm9sRGlyZWN0aXZlfSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL19kaXJlY3RpdmVzL2Rpc2FibGVDb250cm9sLmRpcmVjdGl2ZSc7XG5cbmltcG9ydCB7XG4gIERlZmF1bHRXaWRnZXRcbn0gZnJvbSAnLi9kZWZhdWx0LndpZGdldCc7XG5cbmltcG9ydCB7V2lkZ2V0UmVnaXN0cnl9IGZyb20gJy4vd2lkZ2V0cmVnaXN0cnknO1xuaW1wb3J0IHtTY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCBaU2NoZW1hVmFsaWRhdG9yRmFjdG9yeX0gZnJvbSAnLi9zY2hlbWF2YWxpZGF0b3JmYWN0b3J5JztcbmltcG9ydCB7Rm9ybUVsZW1lbnRDb21wb25lbnRBY3Rpb259IGZyb20gJy4vZm9ybWVsZW1lbnQuYWN0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQge0V4cHJlc3Npb25Db21waWxlckZhY3RvcnksIEpFWExFeHByZXNzaW9uQ29tcGlsZXJGYWN0b3J5fSBmcm9tICcuL2V4cHJlc3Npb24tY29tcGlsZXItZmFjdG9yeSc7XG5cbmNvbnN0IG1vZHVsZVByb3ZpZGVycyA9IFtcbiAge1xuICAgIHByb3ZpZGU6IFdpZGdldFJlZ2lzdHJ5LFxuICAgIHVzZUNsYXNzOiBEZWZhdWx0V2lkZ2V0UmVnaXN0cnlcbiAgfSxcbiAge1xuICAgIHByb3ZpZGU6IFNjaGVtYVZhbGlkYXRvckZhY3RvcnksXG4gICAgdXNlQ2xhc3M6IFpTY2hlbWFWYWxpZGF0b3JGYWN0b3J5XG4gIH0sXG4gIHtcbiAgICBwcm92aWRlOiBFeHByZXNzaW9uQ29tcGlsZXJGYWN0b3J5LFxuICAgIHVzZUNsYXNzOiBKRVhMRXhwcmVzc2lvbkNvbXBpbGVyRmFjdG9yeVxuICB9XG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEZvcm1FbGVtZW50Q29tcG9uZW50LFxuICAgIEZvcm1FbGVtZW50Q29tcG9uZW50QWN0aW9uLFxuICAgIEZvcm1Db21wb25lbnQsXG4gICAgV2lkZ2V0Q2hvb3NlckNvbXBvbmVudCxcbiAgICBEZWZhdWx0V2lkZ2V0LFxuICAgIEFycmF5V2lkZ2V0LFxuICAgIEJ1dHRvbldpZGdldCxcbiAgICBPYmplY3RXaWRnZXQsXG4gICAgQ2hlY2tib3hXaWRnZXQsXG4gICAgRmlsZVdpZGdldCxcbiAgICBJbnRlZ2VyV2lkZ2V0LFxuICAgIFRleHRBcmVhV2lkZ2V0LFxuICAgIFJhZGlvV2lkZ2V0LFxuICAgIFJhbmdlV2lkZ2V0LFxuICAgIFNlbGVjdFdpZGdldCxcbiAgICBTdHJpbmdXaWRnZXQsXG4gICAgRGlzYWJsZUNvbnRyb2xEaXJlY3RpdmVcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgRm9ybUVsZW1lbnRDb21wb25lbnQsXG4gICAgRm9ybUVsZW1lbnRDb21wb25lbnRBY3Rpb24sXG4gICAgRm9ybUNvbXBvbmVudCxcbiAgICBXaWRnZXRDaG9vc2VyQ29tcG9uZW50LFxuICAgIEFycmF5V2lkZ2V0LFxuICAgIEJ1dHRvbldpZGdldCxcbiAgICBPYmplY3RXaWRnZXQsXG4gICAgQ2hlY2tib3hXaWRnZXQsXG4gICAgRmlsZVdpZGdldCxcbiAgICBJbnRlZ2VyV2lkZ2V0LFxuICAgIFRleHRBcmVhV2lkZ2V0LFxuICAgIFJhZGlvV2lkZ2V0LFxuICAgIFJhbmdlV2lkZ2V0LFxuICAgIFNlbGVjdFdpZGdldCxcbiAgICBTdHJpbmdXaWRnZXRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEZvcm1Db21wb25lbnQsXG4gICAgRm9ybUVsZW1lbnRDb21wb25lbnQsXG4gICAgRm9ybUVsZW1lbnRDb21wb25lbnRBY3Rpb24sXG4gICAgV2lkZ2V0Q2hvb3NlckNvbXBvbmVudCxcbiAgICBBcnJheVdpZGdldCxcbiAgICBCdXR0b25XaWRnZXQsXG4gICAgT2JqZWN0V2lkZ2V0LFxuICAgIENoZWNrYm94V2lkZ2V0LFxuICAgIEZpbGVXaWRnZXQsXG4gICAgSW50ZWdlcldpZGdldCxcbiAgICBUZXh0QXJlYVdpZGdldCxcbiAgICBSYWRpb1dpZGdldCxcbiAgICBSYW5nZVdpZGdldCxcbiAgICBTZWxlY3RXaWRnZXQsXG4gICAgU3RyaW5nV2lkZ2V0LFxuICAgIERpc2FibGVDb250cm9sRGlyZWN0aXZlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU2NoZW1hRm9ybU1vZHVsZSB7XG5cbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTY2hlbWFGb3JtTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTY2hlbWFGb3JtTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbLi4ubW9kdWxlUHJvdmlkZXJzXVxuICAgIH07XG4gIH1cblxufVxuIl19