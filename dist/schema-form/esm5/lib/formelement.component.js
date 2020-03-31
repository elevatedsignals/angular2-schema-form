import { __decorate, __metadata, __values } from "tslib";
import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActionRegistry } from './model/actionregistry';
import { FormProperty } from './model/formproperty';
import { BindingRegistry } from './model/bindingregistry';
var FormElementComponent = /** @class */ (function () {
    function FormElementComponent(actionRegistry, bindingRegistry, renderer, elementRef) {
        this.actionRegistry = actionRegistry;
        this.bindingRegistry = bindingRegistry;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.control = new FormControl('', function () { return null; });
        this.widget = null;
        this.buttons = [];
        this.unlisten = [];
    }
    FormElementComponent_1 = FormElementComponent;
    FormElementComponent.prototype.ngOnInit = function () {
        this.parseButtons();
        this.setupBindings();
    };
    FormElementComponent.prototype.setupBindings = function () {
        var _this = this;
        var bindings = this.bindingRegistry.get(this.formProperty.path);
        if ((bindings || []).length) {
            bindings.forEach(function (binding) {
                for (var eventId in binding) {
                    _this.createBinding(eventId, binding[eventId]);
                }
            });
        }
    };
    FormElementComponent.prototype.createBinding = function (eventId, listener) {
        var _this = this;
        this.unlisten.push(this.renderer.listen(this.elementRef.nativeElement, eventId, function (event) {
            if (listener instanceof Function) {
                listener(event, _this.formProperty);
            }
            else {
                console.warn('Calling non function handler for eventId ' + eventId + ' for path ' + _this.formProperty.path);
            }
        }));
    };
    FormElementComponent.prototype.parseButtons = function () {
        var e_1, _a;
        if (this.formProperty.schema.buttons !== undefined) {
            this.buttons = this.formProperty.schema.buttons;
            try {
                for (var _b = __values(this.buttons), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var button = _c.value;
                    this.createButtonCallback(button);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    FormElementComponent.prototype.createButtonCallback = function (button) {
        var _this = this;
        button.action = function (e) {
            var action;
            if (button.id && (action = _this.actionRegistry.get(button.id))) {
                if (action) {
                    action(_this.formProperty, button.parameters);
                }
            }
            e.preventDefault();
        };
    };
    FormElementComponent.prototype.onWidgetInstanciated = function (widget) {
        this.widget = widget;
        var id = this.formProperty.canonicalPathNotation || 'field' + (FormElementComponent_1.counter++);
        if (this.formProperty.root.rootName) {
            id = this.formProperty.root.rootName + ":" + id;
        }
        this.widget.formProperty = this.formProperty;
        this.widget.schema = this.formProperty.schema;
        this.widget.name = id;
        this.widget.id = id;
        this.widget.control = this.control;
    };
    FormElementComponent.prototype.ngOnDestroy = function () {
        if (this.unlisten) {
            this.unlisten.forEach(function (item) {
                item();
            });
        }
    };
    var FormElementComponent_1;
    FormElementComponent.counter = 0;
    FormElementComponent.ctorParameters = function () { return [
        { type: ActionRegistry },
        { type: BindingRegistry },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", FormProperty)
    ], FormElementComponent.prototype, "formProperty", void 0);
    FormElementComponent = FormElementComponent_1 = __decorate([
        Component({
            selector: 'sf-form-element',
            template: "\n    <div *ngIf=\"formProperty.visible\"\n         [class.has-error]=\"!control.valid\"\n         [class.has-success]=\"control.valid\">\n      <sf-widget-chooser\n        (widgetInstanciated)=\"onWidgetInstanciated($event)\"\n        [widgetInfo]=\"formProperty.schema.widget\">\n      </sf-widget-chooser>\n      <sf-form-element-action *ngFor=\"let button of buttons\" [button]=\"button\" [formProperty]=\"formProperty\"></sf-form-element-action>\n    </div>"
        }),
        __metadata("design:paramtypes", [ActionRegistry,
            BindingRegistry,
            Renderer2,
            ElementRef])
    ], FormElementComponent);
    return FormElementComponent;
}());
export { FormElementComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWVsZW1lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2Zvcm1lbGVtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxVQUFVLEVBQ3JCLEtBQUssRUFBRSxTQUFTLEVBQ2hCLE1BQU0sRUFBRSxTQUFTLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDTCxXQUFXLEVBQ1osTUFBTSxnQkFBZ0IsQ0FBQztBQUl4QixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQWdCeEQ7SUFhRSw4QkFBb0IsY0FBOEIsRUFDOUIsZUFBZ0MsRUFDaEMsUUFBbUIsRUFDbkIsVUFBc0I7UUFIdEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFYMUMsWUFBTyxHQUFnQixJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsY0FBTSxPQUFBLElBQUksRUFBSixDQUFJLENBQUMsQ0FBQztRQUV2RCxXQUFNLEdBQWdCLElBQUksQ0FBQztRQUUzQixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWIsYUFBUSxHQUFHLEVBQUUsQ0FBQztJQU1kLENBQUM7NkJBakJVLG9CQUFvQjtJQW1CL0IsdUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVPLDRDQUFhLEdBQXJCO1FBQUEsaUJBU0M7UUFSQyxJQUFNLFFBQVEsR0FB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QUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDckMsQ0FBQztJQUVELDBDQUFXLEdBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO2dCQUN6QixJQUFJLEVBQUUsQ0FBQztZQUNULENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOztJQXZGYyw0QkFBTyxHQUFHLENBQUMsQ0FBQzs7Z0JBV1MsY0FBYztnQkFDYixlQUFlO2dCQUN0QixTQUFTO2dCQUNQLFVBQVU7O0lBWmpDO1FBQVIsS0FBSyxFQUFFO2tDQUFlLFlBQVk7OERBQUM7SUFKekIsb0JBQW9CO1FBYmhDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsUUFBUSxFQUFFLGdkQVNEO1NBQ1YsQ0FBQzt5Q0Fjb0MsY0FBYztZQUNiLGVBQWU7WUFDdEIsU0FBUztZQUNQLFVBQVU7T0FoQi9CLG9CQUFvQixDQTJGaEM7SUFBRCwyQkFBQztDQUFBLEFBM0ZELElBMkZDO1NBM0ZZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgRWxlbWVudFJlZixcbiAgSW5wdXQsIE9uRGVzdHJveSxcbiAgT25Jbml0LCBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIEZvcm1Db250cm9sXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtXaWRnZXR9IGZyb20gJy4vd2lkZ2V0JztcblxuaW1wb3J0IHtBY3Rpb25SZWdpc3RyeX0gZnJvbSAnLi9tb2RlbC9hY3Rpb25yZWdpc3RyeSc7XG5pbXBvcnQge0Zvcm1Qcm9wZXJ0eX0gZnJvbSAnLi9tb2RlbC9mb3JtcHJvcGVydHknO1xuaW1wb3J0IHtCaW5kaW5nUmVnaXN0cnl9IGZyb20gJy4vbW9kZWwvYmluZGluZ3JlZ2lzdHJ5JztcbmltcG9ydCB7QmluZGluZ30gZnJvbSAnLi9tb2RlbC9iaW5kaW5nJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtZm9ybS1lbGVtZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0lmPVwiZm9ybVByb3BlcnR5LnZpc2libGVcIlxuICAgICAgICAgW2NsYXNzLmhhcy1lcnJvcl09XCIhY29udHJvbC52YWxpZFwiXG4gICAgICAgICBbY2xhc3MuaGFzLXN1Y2Nlc3NdPVwiY29udHJvbC52YWxpZFwiPlxuICAgICAgPHNmLXdpZGdldC1jaG9vc2VyXG4gICAgICAgICh3aWRnZXRJbnN0YW5jaWF0ZWQpPVwib25XaWRnZXRJbnN0YW5jaWF0ZWQoJGV2ZW50KVwiXG4gICAgICAgIFt3aWRnZXRJbmZvXT1cImZvcm1Qcm9wZXJ0eS5zY2hlbWEud2lkZ2V0XCI+XG4gICAgICA8L3NmLXdpZGdldC1jaG9vc2VyPlxuICAgICAgPHNmLWZvcm0tZWxlbWVudC1hY3Rpb24gKm5nRm9yPVwibGV0IGJ1dHRvbiBvZiBidXR0b25zXCIgW2J1dHRvbl09XCJidXR0b25cIiBbZm9ybVByb3BlcnR5XT1cImZvcm1Qcm9wZXJ0eVwiPjwvc2YtZm9ybS1lbGVtZW50LWFjdGlvbj5cbiAgICA8L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1FbGVtZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgc3RhdGljIGNvdW50ZXIgPSAwO1xuXG4gIEBJbnB1dCgpIGZvcm1Qcm9wZXJ0eTogRm9ybVByb3BlcnR5O1xuICBjb250cm9sOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgnJywgKCkgPT4gbnVsbCk7XG5cbiAgd2lkZ2V0OiBXaWRnZXQ8YW55PiA9IG51bGw7XG5cbiAgYnV0dG9ucyA9IFtdO1xuXG4gIHVubGlzdGVuID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhY3Rpb25SZWdpc3RyeTogQWN0aW9uUmVnaXN0cnksXG4gICAgICAgICAgICAgIHByaXZhdGUgYmluZGluZ1JlZ2lzdHJ5OiBCaW5kaW5nUmVnaXN0cnksXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBhcnNlQnV0dG9ucygpO1xuICAgIHRoaXMuc2V0dXBCaW5kaW5ncygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cEJpbmRpbmdzKCkge1xuICAgIGNvbnN0IGJpbmRpbmdzOiBCaW5kaW5nW10gPSB0aGlzLmJpbmRpbmdSZWdpc3RyeS5nZXQodGhpcy5mb3JtUHJvcGVydHkucGF0aCk7XG4gICAgaWYgKChiaW5kaW5ncyB8fCBbXSkubGVuZ3RoKSB7XG4gICAgICBiaW5kaW5ncy5mb3JFYWNoKChiaW5kaW5nKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgZXZlbnRJZCBpbiBiaW5kaW5nKSB7XG4gICAgICAgICAgdGhpcy5jcmVhdGVCaW5kaW5nKGV2ZW50SWQsIGJpbmRpbmdbZXZlbnRJZF0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUJpbmRpbmcoZXZlbnRJZCwgbGlzdGVuZXIpIHtcbiAgICB0aGlzLnVubGlzdGVuLnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICBldmVudElkLFxuICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChsaXN0ZW5lciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgbGlzdGVuZXIoZXZlbnQsIHRoaXMuZm9ybVByb3BlcnR5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ0NhbGxpbmcgbm9uIGZ1bmN0aW9uIGhhbmRsZXIgZm9yIGV2ZW50SWQgJyArIGV2ZW50SWQgKyAnIGZvciBwYXRoICcgKyB0aGlzLmZvcm1Qcm9wZXJ0eS5wYXRoKTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUJ1dHRvbnMoKSB7XG4gICAgaWYgKHRoaXMuZm9ybVByb3BlcnR5LnNjaGVtYS5idXR0b25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYnV0dG9ucyA9IHRoaXMuZm9ybVByb3BlcnR5LnNjaGVtYS5idXR0b25zO1xuXG4gICAgICBmb3IgKGxldCBidXR0b24gb2YgdGhpcy5idXR0b25zKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uQ2FsbGJhY2soYnV0dG9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUJ1dHRvbkNhbGxiYWNrKGJ1dHRvbikge1xuICAgIGJ1dHRvbi5hY3Rpb24gPSAoZSkgPT4ge1xuICAgICAgbGV0IGFjdGlvbjtcbiAgICAgIGlmIChidXR0b24uaWQgJiYgKGFjdGlvbiA9IHRoaXMuYWN0aW9uUmVnaXN0cnkuZ2V0KGJ1dHRvbi5pZCkpKSB7XG4gICAgICAgIGlmIChhY3Rpb24pIHtcbiAgICAgICAgICBhY3Rpb24odGhpcy5mb3JtUHJvcGVydHksIGJ1dHRvbi5wYXJhbWV0ZXJzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH07XG4gIH1cblxuICBvbldpZGdldEluc3RhbmNpYXRlZCh3aWRnZXQ6IFdpZGdldDxhbnk+KSB7XG4gICAgdGhpcy53aWRnZXQgPSB3aWRnZXQ7XG4gICAgbGV0IGlkID0gdGhpcy5mb3JtUHJvcGVydHkuY2Fub25pY2FsUGF0aE5vdGF0aW9uIHx8wqAnZmllbGQnICsgKEZvcm1FbGVtZW50Q29tcG9uZW50LmNvdW50ZXIrKyk7XG4gICAgaWYgKHRoaXMuZm9ybVByb3BlcnR5LnJvb3Qucm9vdE5hbWUpIHtcbiAgICAgIGlkID0gYCR7dGhpcy5mb3JtUHJvcGVydHkucm9vdC5yb290TmFtZX06JHtpZH1gO1xuICAgIH1cblxuICAgIHRoaXMud2lkZ2V0LmZvcm1Qcm9wZXJ0eSA9IHRoaXMuZm9ybVByb3BlcnR5O1xuICAgIHRoaXMud2lkZ2V0LnNjaGVtYSA9IHRoaXMuZm9ybVByb3BlcnR5LnNjaGVtYTtcbiAgICB0aGlzLndpZGdldC5uYW1lID0gaWQ7XG4gICAgdGhpcy53aWRnZXQuaWQgPSBpZDtcbiAgICB0aGlzLndpZGdldC5jb250cm9sID0gdGhpcy5jb250cm9sO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudW5saXN0ZW4pIHtcbiAgICAgIHRoaXMudW5saXN0ZW4uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxufVxuIl19