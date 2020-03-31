var FormElementComponent_1;
import { __decorate, __metadata } from "tslib";
import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActionRegistry } from './model/actionregistry';
import { FormProperty } from './model/formproperty';
import { BindingRegistry } from './model/bindingregistry';
let FormElementComponent = FormElementComponent_1 = class FormElementComponent {
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
    ngOnInit() {
        this.parseButtons();
        this.setupBindings();
    }
    setupBindings() {
        const bindings = this.bindingRegistry.get(this.formProperty.path);
        if ((bindings || []).length) {
            bindings.forEach((binding) => {
                for (const eventId in binding) {
                    this.createBinding(eventId, binding[eventId]);
                }
            });
        }
    }
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
    parseButtons() {
        if (this.formProperty.schema.buttons !== undefined) {
            this.buttons = this.formProperty.schema.buttons;
            for (let button of this.buttons) {
                this.createButtonCallback(button);
            }
        }
    }
    createButtonCallback(button) {
        button.action = (e) => {
            let action;
            if (button.id && (action = this.actionRegistry.get(button.id))) {
                if (action) {
                    action(this.formProperty, button.parameters);
                }
            }
            e.preventDefault();
        };
    }
    onWidgetInstanciated(widget) {
        this.widget = widget;
        let id = this.formProperty.canonicalPathNotation || 'field' + (FormElementComponent_1.counter++);
        if (this.formProperty.root.rootName) {
            id = `${this.formProperty.root.rootName}:${id}`;
        }
        this.widget.formProperty = this.formProperty;
        this.widget.schema = this.formProperty.schema;
        this.widget.name = id;
        this.widget.id = id;
        this.widget.control = this.control;
    }
    ngOnDestroy() {
        if (this.unlisten) {
            this.unlisten.forEach((item) => {
                item();
            });
        }
    }
};
FormElementComponent.counter = 0;
FormElementComponent.ctorParameters = () => [
    { type: ActionRegistry },
    { type: BindingRegistry },
    { type: Renderer2 },
    { type: ElementRef }
];
__decorate([
    Input(),
    __metadata("design:type", FormProperty)
], FormElementComponent.prototype, "formProperty", void 0);
FormElementComponent = FormElementComponent_1 = __decorate([
    Component({
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
    }),
    __metadata("design:paramtypes", [ActionRegistry,
        BindingRegistry,
        Renderer2,
        ElementRef])
], FormElementComponent);
export { FormElementComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWVsZW1lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2Zvcm1lbGVtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsVUFBVSxFQUNyQixLQUFLLEVBQUUsU0FBUyxFQUNoQixNQUFNLEVBQUUsU0FBUyxFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0wsV0FBVyxFQUNaLE1BQU0sZ0JBQWdCLENBQUM7QUFJeEIsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFnQnhELElBQWEsb0JBQW9CLDRCQUFqQyxNQUFhLG9CQUFvQjtJQWEvQixZQUFvQixjQUE4QixFQUM5QixlQUFnQyxFQUNoQyxRQUFtQixFQUNuQixVQUFzQjtRQUh0QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQVgxQyxZQUFPLEdBQWdCLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2RCxXQUFNLEdBQWdCLElBQUksQ0FBQztRQUUzQixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWIsYUFBUSxHQUFHLEVBQUUsQ0FBQztJQU1kLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU8sYUFBYTtRQUNuQixNQUFNLFFBQVEsR0FBYyxJQUFJLENBQUMs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TSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzdCLElBQUksRUFBRSxDQUFDO1lBQ1QsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Q0FFRixDQUFBO0FBekZnQiw0QkFBTyxHQUFHLENBQUMsQ0FBQzs7WUFXUyxjQUFjO1lBQ2IsZUFBZTtZQUN0QixTQUFTO1lBQ1AsVUFBVTs7QUFaakM7SUFBUixLQUFLLEVBQUU7OEJBQWUsWUFBWTswREFBQztBQUp6QixvQkFBb0I7SUFiaEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixRQUFRLEVBQUU7Ozs7Ozs7OztXQVNEO0tBQ1YsQ0FBQztxQ0Fjb0MsY0FBYztRQUNiLGVBQWU7UUFDdEIsU0FBUztRQUNQLFVBQVU7R0FoQi9CLG9CQUFvQixDQTJGaEM7U0EzRlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBFbGVtZW50UmVmLFxuICBJbnB1dCwgT25EZXN0cm95LFxuICBPbkluaXQsIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgRm9ybUNvbnRyb2xcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge1dpZGdldH0gZnJvbSAnLi93aWRnZXQnO1xuXG5pbXBvcnQge0FjdGlvblJlZ2lzdHJ5fSBmcm9tICcuL21vZGVsL2FjdGlvbnJlZ2lzdHJ5JztcbmltcG9ydCB7Rm9ybVByb3BlcnR5fSBmcm9tICcuL21vZGVsL2Zvcm1wcm9wZXJ0eSc7XG5pbXBvcnQge0JpbmRpbmdSZWdpc3RyeX0gZnJvbSAnLi9tb2RlbC9iaW5kaW5ncmVnaXN0cnknO1xuaW1wb3J0IHtCaW5kaW5nfSBmcm9tICcuL21vZGVsL2JpbmRpbmcnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1mb3JtLWVsZW1lbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgKm5nSWY9XCJmb3JtUHJvcGVydHkudmlzaWJsZVwiXG4gICAgICAgICBbY2xhc3MuaGFzLWVycm9yXT1cIiFjb250cm9sLnZhbGlkXCJcbiAgICAgICAgIFtjbGFzcy5oYXMtc3VjY2Vzc109XCJjb250cm9sLnZhbGlkXCI+XG4gICAgICA8c2Ytd2lkZ2V0LWNob29zZXJcbiAgICAgICAgKHdpZGdldEluc3RhbmNpYXRlZCk9XCJvbldpZGdldEluc3RhbmNpYXRlZCgkZXZlbnQpXCJcbiAgICAgICAgW3dpZGdldEluZm9dPVwiZm9ybVByb3BlcnR5LnNjaGVtYS53aWRnZXRcIj5cbiAgICAgIDwvc2Ytd2lkZ2V0LWNob29zZXI+XG4gICAgICA8c2YtZm9ybS1lbGVtZW50LWFjdGlvbiAqbmdGb3I9XCJsZXQgYnV0dG9uIG9mIGJ1dHRvbnNcIiBbYnV0dG9uXT1cImJ1dHRvblwiIFtmb3JtUHJvcGVydHldPVwiZm9ybVByb3BlcnR5XCI+PC9zZi1mb3JtLWVsZW1lbnQtYWN0aW9uPlxuICAgIDwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgRm9ybUVsZW1lbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgY291bnRlciA9IDA7XG5cbiAgQElucHV0KCkgZm9ybVByb3BlcnR5OiBGb3JtUHJvcGVydHk7XG4gIGNvbnRyb2w6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnLCAoKSA9PiBudWxsKTtcblxuICB3aWRnZXQ6IFdpZGdldDxhbnk+ID0gbnVsbDtcblxuICBidXR0b25zID0gW107XG5cbiAgdW5saXN0ZW4gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjdGlvblJlZ2lzdHJ5OiBBY3Rpb25SZWdpc3RyeSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBiaW5kaW5nUmVnaXN0cnk6IEJpbmRpbmdSZWdpc3RyeSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGFyc2VCdXR0b25zKCk7XG4gICAgdGhpcy5zZXR1cEJpbmRpbmdzKCk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwQmluZGluZ3MoKSB7XG4gICAgY29uc3QgYmluZGluZ3M6IEJpbmRpbmdbXSA9IHRoaXMuYmluZGluZ1JlZ2lzdHJ5LmdldCh0aGlzLmZvcm1Qcm9wZXJ0eS5wYXRoKTtcbiAgICBpZiAoKGJpbmRpbmdzIHx8IFtdKS5sZW5ndGgpIHtcbiAgICAgIGJpbmRpbmdzLmZvckVhY2goKGJpbmRpbmcpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBldmVudElkIGluIGJpbmRpbmcpIHtcbiAgICAgICAgICB0aGlzLmNyZWF0ZUJpbmRpbmcoZXZlbnRJZCwgYmluZGluZ1tldmVudElkXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQmluZGluZyhldmVudElkLCBsaXN0ZW5lcikge1xuICAgIHRoaXMudW5saXN0ZW4ucHVzaCh0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgIGV2ZW50SWQsXG4gICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGxpc3RlbmVyIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICBsaXN0ZW5lcihldmVudCwgdGhpcy5mb3JtUHJvcGVydHkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUud2FybignQ2FsbGluZyBub24gZnVuY3Rpb24gaGFuZGxlciBmb3IgZXZlbnRJZCAnICsgZXZlbnRJZCArICcgZm9yIHBhdGggJyArIHRoaXMuZm9ybVByb3BlcnR5LnBhdGgpO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlQnV0dG9ucygpIHtcbiAgICBpZiAodGhpcy5mb3JtUHJvcGVydHkuc2NoZW1hLmJ1dHRvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5idXR0b25zID0gdGhpcy5mb3JtUHJvcGVydHkuc2NoZW1hLmJ1dHRvbnM7XG5cbiAgICAgIGZvciAobGV0IGJ1dHRvbiBvZiB0aGlzLmJ1dHRvbnMpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b25DYWxsYmFjayhidXR0b24pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQnV0dG9uQ2FsbGJhY2soYnV0dG9uKSB7XG4gICAgYnV0dG9uLmFjdGlvbiA9IChlKSA9PiB7XG4gICAgICBsZXQgYWN0aW9uO1xuICAgICAgaWYgKGJ1dHRvbi5pZCAmJiAoYWN0aW9uID0gdGhpcy5hY3Rpb25SZWdpc3RyeS5nZXQoYnV0dG9uLmlkKSkpIHtcbiAgICAgICAgaWYgKGFjdGlvbikge1xuICAgICAgICAgIGFjdGlvbih0aGlzLmZvcm1Qcm9wZXJ0eSwgYnV0dG9uLnBhcmFtZXRlcnMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfTtcbiAgfVxuXG4gIG9uV2lkZ2V0SW5zdGFuY2lhdGVkKHdpZGdldDogV2lkZ2V0PGFueT4pIHtcbiAgICB0aGlzLndpZGdldCA9IHdpZGdldDtcbiAgICBsZXQgaWQgPSB0aGlzLmZvcm1Qcm9wZXJ0eS5jYW5vbmljYWxQYXRoTm90YXRpb24gfHzCoCdmaWVsZCcgKyAoRm9ybUVsZW1lbnRDb21wb25lbnQuY291bnRlcisrKTtcbiAgICBpZiAodGhpcy5mb3JtUHJvcGVydHkucm9vdC5yb290TmFtZSkge1xuICAgICAgaWQgPSBgJHt0aGlzLmZvcm1Qcm9wZXJ0eS5yb290LnJvb3ROYW1lfToke2lkfWA7XG4gICAgfVxuXG4gICAgdGhpcy53aWRnZXQuZm9ybVByb3BlcnR5ID0gdGhpcy5mb3JtUHJvcGVydHk7XG4gICAgdGhpcy53aWRnZXQuc2NoZW1hID0gdGhpcy5mb3JtUHJvcGVydHkuc2NoZW1hO1xuICAgIHRoaXMud2lkZ2V0Lm5hbWUgPSBpZDtcbiAgICB0aGlzLndpZGdldC5pZCA9IGlkO1xuICAgIHRoaXMud2lkZ2V0LmNvbnRyb2wgPSB0aGlzLmNvbnRyb2w7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy51bmxpc3Rlbikge1xuICAgICAgdGhpcy51bmxpc3Rlbi5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=