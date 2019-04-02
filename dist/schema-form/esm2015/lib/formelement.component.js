/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActionRegistry } from './model/actionregistry';
import { FormProperty } from './model/formproperty';
import { BindingRegistry } from './model/bindingregistry';
export class FormElementComponent {
    /**
     * @param {?} actionRegistry
     * @param {?} bindingRegistry
     * @param {?} renderer
     * @param {?} elementRef
     */
    constructor(actionRegistry, bindingRegistry, renderer, elementRef) {
        this.actionRegistry = actionRegistry;
        this.bindingRegistry = bindingRegistry;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.control = new FormControl('', () => null);
        this.widget = null;
        this.buttons = [];
        this.unlisten = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.parseButtons();
        this.setupBindings();
    }
    /**
     * @return {?}
     */
    setupBindings() {
        /** @type {?} */
        const bindings = this.bindingRegistry.get(this.formProperty.path);
        if ((bindings || []).length) {
            bindings.forEach((binding) => {
                for (const eventId in binding) {
                    this.createBinding(eventId, binding[eventId]);
                }
            });
        }
    }
    /**
     * @param {?} eventId
     * @param {?} listener
     * @return {?}
     */
    createBinding(eventId, listener) {
        this.unlisten.push(this.renderer.listen(this.elementRef.nativeElement, eventId, (event) => {
            if (listener instanceof Function) {
                listener(event, this.formProperty);
            }
            else {
                console.warn('Calling non function handler for eventId ' + eventId + ' for path ' + this.formProperty.path);
            }
        }));
    }
    /**
     * @return {?}
     */
    parseButtons() {
        if (this.formProperty.schema.buttons !== undefined) {
            this.buttons = this.formProperty.schema.buttons;
            for (let button of this.buttons) {
                this.createButtonCallback(button);
            }
        }
    }
    /**
     * @param {?} button
     * @return {?}
     */
    createButtonCallback(button) {
        button.action = (e) => {
            /** @type {?} */
            let action;
            if (button.id && (action = this.actionRegistry.get(button.id))) {
                if (action) {
                    action(this.formProperty, button.parameters);
                }
            }
            e.preventDefault();
        };
    }
    /**
     * @param {?} widget
     * @return {?}
     */
    onWidgetInstanciated(widget) {
        this.widget = widget;
        /** @type {?} */
        let id = 'field' + (FormElementComponent.counter++);
        this.widget.formProperty = this.formProperty;
        this.widget.schema = this.formProperty.schema;
        this.widget.name = id;
        this.widget.id = id;
        this.widget.control = this.control;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.unlisten) {
            this.unlisten.forEach((item) => {
                item();
            });
        }
    }
}
FormElementComponent.counter = 0;
FormElementComponent.decorators = [
    { type: Component, args: [{
                selector: 'sf-form-element',
                template: `
    <div *ngIf="formProperty.visible"
         [class.has-error]="!control.valid"
         [class.has-success]="control.valid">
      <sf-widget-chooser
        (widgetInstanciated)="onWidgetInstanciated($event)"
        [widgetInfo]="formProperty.schema.widget">
      </sf-widget-chooser>
      <sf-form-element-action *ngFor="let button of buttons" [button]="button" [formProperty]="formProperty"></sf-form-element-action>
    </div>`
            }] }
];
/** @nocollapse */
FormElementComponent.ctorParameters = () => [
    { type: ActionRegistry },
    { type: BindingRegistry },
    { type: Renderer2 },
    { type: ElementRef }
];
FormElementComponent.propDecorators = {
    formProperty: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    FormElementComponent.counter;
    /** @type {?} */
    FormElementComponent.prototype.formProperty;
    /** @type {?} */
    FormElementComponent.prototype.control;
    /** @type {?} */
    FormElementComponent.prototype.widget;
    /** @type {?} */
    FormElementComponent.prototype.buttons;
    /** @type {?} */
    FormElementComponent.prototype.unlisten;
    /** @type {?} */
    FormElementComponent.prototype.actionRegistry;
    /** @type {?} */
    FormElementComponent.prototype.bindingRegistry;
    /** @type {?} */
    FormElementComponent.prototype.renderer;
    /** @type {?} */
    FormElementComponent.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWVsZW1lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2Zvcm1lbGVtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxVQUFVLEVBQ3JCLEtBQUssRUFDRyxTQUFTLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDTCxXQUFXLEVBQ1osTUFBTSxnQkFBZ0IsQ0FBQztBQUl4QixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQWdCeEQsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7OztJQWEvQixZQUFvQixjQUE4QixFQUM5QixlQUFnQyxFQUNoQyxRQUFtQixFQUNuQixVQUFzQjtRQUh0QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQVgxQyxZQUFPLEdBQWdCLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2RCxXQUFNLEdBQWdCLElBQUksQ0FBQztRQUUzQixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWIsYUFBUSxHQUFHLEVBQUUsQ0FBQztJQU1kLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7O0lBRU8sYUFBYTs7Y0FDYixRQUFRLEdBQWMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxD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Q0gsQ0FBQzs7QUFwRmMsNEJBQU8sR0FBRyxDQUFDLENBQUM7O1lBZjVCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUU7Ozs7Ozs7OztXQVNEO2FBQ1Y7Ozs7WUFqQk8sY0FBYztZQUVkLGVBQWU7WUFYYixTQUFTO1lBRk4sVUFBVTs7OzJCQWlDcEIsS0FBSzs7OztJQUZOLDZCQUEyQjs7SUFFM0IsNENBQW9DOztJQUNwQyx1Q0FBdUQ7O0lBRXZELHNDQUEyQjs7SUFFM0IsdUNBQWE7O0lBRWIsd0NBQWM7O0lBRUYsOENBQXNDOztJQUN0QywrQ0FBd0M7O0lBQ3hDLHdDQUEyQjs7SUFDM0IsMENBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBFbGVtZW50UmVmLFxuICBJbnB1dCwgT25EZXN0cm95LFxuICBPbkluaXQsIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgRm9ybUNvbnRyb2xcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge1dpZGdldH0gZnJvbSAnLi93aWRnZXQnO1xuXG5pbXBvcnQge0FjdGlvblJlZ2lzdHJ5fSBmcm9tICcuL21vZGVsL2FjdGlvbnJlZ2lzdHJ5JztcbmltcG9ydCB7Rm9ybVByb3BlcnR5fSBmcm9tICcuL21vZGVsL2Zvcm1wcm9wZXJ0eSc7XG5pbXBvcnQge0JpbmRpbmdSZWdpc3RyeX0gZnJvbSAnLi9tb2RlbC9iaW5kaW5ncmVnaXN0cnknO1xuaW1wb3J0IHtCaW5kaW5nfSBmcm9tICcuL21vZGVsL2JpbmRpbmcnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1mb3JtLWVsZW1lbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgKm5nSWY9XCJmb3JtUHJvcGVydHkudmlzaWJsZVwiXG4gICAgICAgICBbY2xhc3MuaGFzLWVycm9yXT1cIiFjb250cm9sLnZhbGlkXCJcbiAgICAgICAgIFtjbGFzcy5oYXMtc3VjY2Vzc109XCJjb250cm9sLnZhbGlkXCI+XG4gICAgICA8c2Ytd2lkZ2V0LWNob29zZXJcbiAgICAgICAgKHdpZGdldEluc3RhbmNpYXRlZCk9XCJvbldpZGdldEluc3RhbmNpYXRlZCgkZXZlbnQpXCJcbiAgICAgICAgW3dpZGdldEluZm9dPVwiZm9ybVByb3BlcnR5LnNjaGVtYS53aWRnZXRcIj5cbiAgICAgIDwvc2Ytd2lkZ2V0LWNob29zZXI+XG4gICAgICA8c2YtZm9ybS1lbGVtZW50LWFjdGlvbiAqbmdGb3I9XCJsZXQgYnV0dG9uIG9mIGJ1dHRvbnNcIiBbYnV0dG9uXT1cImJ1dHRvblwiIFtmb3JtUHJvcGVydHldPVwiZm9ybVByb3BlcnR5XCI+PC9zZi1mb3JtLWVsZW1lbnQtYWN0aW9uPlxuICAgIDwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgRm9ybUVsZW1lbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgY291bnRlciA9IDA7XG5cbiAgQElucHV0KCkgZm9ybVByb3BlcnR5OiBGb3JtUHJvcGVydHk7XG4gIGNvbnRyb2w6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnLCAoKSA9PiBudWxsKTtcblxuICB3aWRnZXQ6IFdpZGdldDxhbnk+ID0gbnVsbDtcblxuICBidXR0b25zID0gW107XG5cbiAgdW5saXN0ZW4gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjdGlvblJlZ2lzdHJ5OiBBY3Rpb25SZWdpc3RyeSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBiaW5kaW5nUmVnaXN0cnk6IEJpbmRpbmdSZWdpc3RyeSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGFyc2VCdXR0b25zKCk7XG4gICAgdGhpcy5zZXR1cEJpbmRpbmdzKCk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwQmluZGluZ3MoKSB7XG4gICAgY29uc3QgYmluZGluZ3M6IEJpbmRpbmdbXSA9IHRoaXMuYmluZGluZ1JlZ2lzdHJ5LmdldCh0aGlzLmZvcm1Qcm9wZXJ0eS5wYXRoKTtcbiAgICBpZiAoKGJpbmRpbmdzIHx8IFtdKS5sZW5ndGgpIHtcbiAgICAgIGJpbmRpbmdzLmZvckVhY2goKGJpbmRpbmcpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBldmVudElkIGluIGJpbmRpbmcpIHtcbiAgICAgICAgICB0aGlzLmNyZWF0ZUJpbmRpbmcoZXZlbnRJZCwgYmluZGluZ1tldmVudElkXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQmluZGluZyhldmVudElkLCBsaXN0ZW5lcikge1xuICAgIHRoaXMudW5saXN0ZW4ucHVzaCh0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgIGV2ZW50SWQsXG4gICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGxpc3RlbmVyIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICBsaXN0ZW5lcihldmVudCwgdGhpcy5mb3JtUHJvcGVydHkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUud2FybignQ2FsbGluZyBub24gZnVuY3Rpb24gaGFuZGxlciBmb3IgZXZlbnRJZCAnICsgZXZlbnRJZCArICcgZm9yIHBhdGggJyArIHRoaXMuZm9ybVByb3BlcnR5LnBhdGgpO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlQnV0dG9ucygpIHtcbiAgICBpZiAodGhpcy5mb3JtUHJvcGVydHkuc2NoZW1hLmJ1dHRvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5idXR0b25zID0gdGhpcy5mb3JtUHJvcGVydHkuc2NoZW1hLmJ1dHRvbnM7XG5cbiAgICAgIGZvciAobGV0IGJ1dHRvbiBvZiB0aGlzLmJ1dHRvbnMpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b25DYWxsYmFjayhidXR0b24pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQnV0dG9uQ2FsbGJhY2soYnV0dG9uKSB7XG4gICAgYnV0dG9uLmFjdGlvbiA9IChlKSA9PiB7XG4gICAgICBsZXQgYWN0aW9uO1xuICAgICAgaWYgKGJ1dHRvbi5pZCAmJiAoYWN0aW9uID0gdGhpcy5hY3Rpb25SZWdpc3RyeS5nZXQoYnV0dG9uLmlkKSkpIHtcbiAgICAgICAgaWYgKGFjdGlvbikge1xuICAgICAgICAgIGFjdGlvbih0aGlzLmZvcm1Qcm9wZXJ0eSwgYnV0dG9uLnBhcmFtZXRlcnMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfTtcbiAgfVxuXG4gIG9uV2lkZ2V0SW5zdGFuY2lhdGVkKHdpZGdldDogV2lkZ2V0PGFueT4pIHtcbiAgICB0aGlzLndpZGdldCA9IHdpZGdldDtcbiAgICBsZXQgaWQgPSAnZmllbGQnICsgKEZvcm1FbGVtZW50Q29tcG9uZW50LmNvdW50ZXIrKyk7XG5cbiAgICB0aGlzLndpZGdldC5mb3JtUHJvcGVydHkgPSB0aGlzLmZvcm1Qcm9wZXJ0eTtcbiAgICB0aGlzLndpZGdldC5zY2hlbWEgPSB0aGlzLmZvcm1Qcm9wZXJ0eS5zY2hlbWE7XG4gICAgdGhpcy53aWRnZXQubmFtZSA9IGlkO1xuICAgIHRoaXMud2lkZ2V0LmlkID0gaWQ7XG4gICAgdGhpcy53aWRnZXQuY29udHJvbCA9IHRoaXMuY29udHJvbDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnVubGlzdGVuKSB7XG4gICAgICB0aGlzLnVubGlzdGVuLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==