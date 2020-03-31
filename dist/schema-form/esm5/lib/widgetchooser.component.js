import { __decorate, __metadata } from "tslib";
import { Component, ComponentRef, ChangeDetectorRef, EventEmitter, Input, OnChanges, Output, ViewChild, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { TerminatorService } from './terminator.service';
import { WidgetFactory } from './widgetfactory';
var WidgetChooserComponent = /** @class */ (function () {
    function WidgetChooserComponent(widgetFactory, cdr, terminator) {
        if (widgetFactory === void 0) { widgetFactory = null; }
        this.widgetFactory = widgetFactory;
        this.cdr = cdr;
        this.terminator = terminator;
        this.widgetInstanciated = new EventEmitter();
    }
    WidgetChooserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subs = this.terminator.onDestroy.subscribe(function (destroy) {
            if (destroy) {
                _this.ref.destroy();
            }
        });
    };
    WidgetChooserComponent.prototype.ngOnChanges = function () {
        this.ref = this.widgetFactory.createWidget(this.container, this.widgetInfo.id);
        this.widgetInstanciated.emit(this.ref.instance);
        this.widgetInstance = this.ref.instance;
        this.cdr.detectChanges();
    };
    WidgetChooserComponent.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
    };
    WidgetChooserComponent.ctorParameters = function () { return [
        { type: WidgetFactory },
        { type: ChangeDetectorRef },
        { type: TerminatorService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], WidgetChooserComponent.prototype, "widgetInfo", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], WidgetChooserComponent.prototype, "widgetInstanciated", void 0);
    __decorate([
        ViewChild('target', { read: ViewContainerRef, static: true }),
        __metadata("design:type", ViewContainerRef)
    ], WidgetChooserComponent.prototype, "container", void 0);
    WidgetChooserComponent = __decorate([
        Component({
            selector: 'sf-widget-chooser',
            template: "<div #target></div>"
        }),
        __metadata("design:paramtypes", [WidgetFactory,
            ChangeDetectorRef,
            TerminatorService])
    ], WidgetChooserComponent);
    return WidgetChooserComponent;
}());
export { WidgetChooserComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0Y2hvb3Nlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJsaWIvd2lkZ2V0Y2hvb3Nlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osS0FBSyxFQUNMLFNBQVMsRUFDVCxNQUFNLEVBQ04sU0FBUyxFQUNULGdCQUFnQixFQUNoQixNQUFNLEVBQ04sU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVFoRDtJQVlFLGdDQUNVLGFBQW1DLEVBQ25DLEdBQXNCLEVBQ3RCLFVBQTZCO1FBRjdCLDhCQUFBLEVBQUEsb0JBQW1DO1FBQW5DLGtCQUFhLEdBQWIsYUFBYSxDQUFzQjtRQUNuQyxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQVg3Qix1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO0lBWW5ELENBQUM7SUFFTCx5Q0FBUSxHQUFSO1FBQUEsaUJBTUM7UUFMQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87WUFDckQsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsS0FBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNwQjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDRDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCw0Q0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQixDQUFDOztnQkF0QndCLGFBQWE7Z0JBQ3ZCLGlCQUFpQjtnQkFDVixpQkFBaUI7O0lBYjlCO1FBQVIsS0FBSyxFQUFFOzs4REFBaUI7SUFFZjtRQUFULE1BQU0sRUFBRTs7c0VBQThDO0lBRVE7UUFBOUQsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7a0NBQVksZ0JBQWdCOzZEQUFDO0lBTmhGLHNCQUFzQjtRQUpsQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFFBQVEsRUFBRSxxQkFBcUI7U0FDaEMsQ0FBQzt5Q0FjeUIsYUFBYTtZQUN2QixpQkFBaUI7WUFDVixpQkFBaUI7T0FmNUIsc0JBQXNCLENBb0NsQztJQUFELDZCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7U0FwQ1ksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRSZWYsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRlcm1pbmF0b3JTZXJ2aWNlIH0gZnJvbSAnLi90ZXJtaW5hdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2lkZ2V0RmFjdG9yeSB9IGZyb20gJy4vd2lkZ2V0ZmFjdG9yeSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi13aWRnZXQtY2hvb3NlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiAjdGFyZ2V0PjwvZGl2PmAsXG59KVxuZXhwb3J0IGNsYXNzIFdpZGdldENob29zZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSB3aWRnZXRJbmZvOiBhbnk7XG5cbiAgQE91dHB1dCgpIHdpZGdldEluc3RhbmNpYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBWaWV3Q2hpbGQoJ3RhcmdldCcsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICBwcml2YXRlIHdpZGdldEluc3RhbmNlOiBhbnk7XG4gIHByaXZhdGUgcmVmOiBDb21wb25lbnRSZWY8YW55PjtcbiAgcHJpdmF0ZSBzdWJzOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB3aWRnZXRGYWN0b3J5OiBXaWRnZXRGYWN0b3J5ID0gbnVsbCxcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSB0ZXJtaW5hdG9yOiBUZXJtaW5hdG9yU2VydmljZSxcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnMgPSB0aGlzLnRlcm1pbmF0b3Iub25EZXN0cm95LnN1YnNjcmliZShkZXN0cm95ID0+IHtcbiAgICAgIGlmIChkZXN0cm95KSB7XG4gICAgICAgIHRoaXMucmVmLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMucmVmID0gdGhpcy53aWRnZXRGYWN0b3J5LmNyZWF0ZVdpZGdldCh0aGlzLmNvbnRhaW5lciwgdGhpcy53aWRnZXRJbmZvLmlkKTtcbiAgICB0aGlzLndpZGdldEluc3RhbmNpYXRlZC5lbWl0KHRoaXMucmVmLmluc3RhbmNlKTtcbiAgICB0aGlzLndpZGdldEluc3RhbmNlID0gdGhpcy5yZWYuaW5zdGFuY2U7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==