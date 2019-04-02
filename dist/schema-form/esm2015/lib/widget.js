/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
export class Widget {
    constructor() {
        this.id = '';
        this.name = '';
        this.schema = {};
    }
}
if (false) {
    /** @type {?} */
    Widget.prototype.formProperty;
    /** @type {?} */
    Widget.prototype.control;
    /** @type {?} */
    Widget.prototype.errorMessages;
    /** @type {?} */
    Widget.prototype.id;
    /** @type {?} */
    Widget.prototype.name;
    /** @type {?} */
    Widget.prototype.schema;
}
export class ControlWidget extends Widget {
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const control = this.control;
        this.formProperty.valueChanges.subscribe((newValue) => {
            if (control.value !== newValue) {
                control.setValue(newValue, { emitEvent: false });
            }
        });
        this.formProperty.errorsChanges.subscribe((errors) => {
            control.setErrors(errors, { emitEvent: true });
            /** @type {?} */
            const messages = (errors || [])
                .filter(e => {
                return e.path && e.path.slice(1) === this.formProperty.path;
            })
                .map(e => e.message);
            this.errorMessages = messages.filter((m, i) => messages.indexOf(m) === i);
        });
        control.valueChanges.subscribe((newValue) => {
            this.formProperty.setValue(newValue, false);
        });
    }
}
export class ArrayLayoutWidget extends Widget {
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const control = this.control;
        this.formProperty.errorsChanges.subscribe((errors) => {
            control.setErrors(errors, { emitEvent: true });
        });
    }
}
export class ObjectLayoutWidget extends Widget {
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const control = this.control;
        this.formProperty.errorsChanges.subscribe((errors) => {
            control.setErrors(errors, { emitEvent: true });
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3dpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQU9BLE1BQU0sT0FBZ0IsTUFBTTtJQUE1QjtRQUtFLE9BQUUsR0FBVyxFQUFFLENBQUM7UUFDaEIsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixXQUFNLEdBQVEsRUFBRSxDQUFDO0lBQ25CLENBQUM7Q0FBQTs7O0lBUEMsOEJBQWdCOztJQUNoQix5QkFBcUI7O0lBQ3JCLCtCQUF3Qjs7SUFFeEIsb0JBQWdCOztJQUNoQixzQkFBa0I7O0lBQ2xCLHdCQUFpQjs7QUFHbkIsTUFBTSxPQUFPLGFBQWMsU0FBUSxNQUFvQjs7OztJQUVyRCxlQUFlOztjQUNQLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTztRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNwRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUM5QixPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO2FBQ2hEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNuRCxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDOztrQkFDekMsUUFBUSxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztpQkFDNUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUM5RCxDQUFDLENBQUM7aUJBQ0QsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzVFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBRUY7QUFFRCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsTUFBcUI7Ozs7SUFFMUQsZUFBZTs7Y0FDUCxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU87UUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbkQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxNQUFzQjs7OztJQUU1RCxlQUFlOztjQUNQLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTztRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNuRCxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZnRlclZpZXdJbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUNvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtBcnJheVByb3BlcnR5fSBmcm9tICcuL21vZGVsL2FycmF5cHJvcGVydHknO1xuaW1wb3J0IHtGb3JtUHJvcGVydHl9IGZyb20gJy4vbW9kZWwvZm9ybXByb3BlcnR5JztcbmltcG9ydCB7T2JqZWN0UHJvcGVydHl9IGZyb20gJy4vbW9kZWwvb2JqZWN0cHJvcGVydHknO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgV2lkZ2V0PFQgZXh0ZW5kcyBGb3JtUHJvcGVydHk+IHtcbiAgZm9ybVByb3BlcnR5OiBUO1xuICBjb250cm9sOiBGb3JtQ29udHJvbDtcbiAgZXJyb3JNZXNzYWdlczogc3RyaW5nW107XG5cbiAgaWQ6IHN0cmluZyA9ICcnO1xuICBuYW1lOiBzdHJpbmcgPSAnJztcbiAgc2NoZW1hOiBhbnkgPSB7fTtcbn1cblxuZXhwb3J0IGNsYXNzIENvbnRyb2xXaWRnZXQgZXh0ZW5kcyBXaWRnZXQ8Rm9ybVByb3BlcnR5PiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5jb250cm9sO1xuICAgIHRoaXMuZm9ybVByb3BlcnR5LnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XG4gICAgICBpZiAoY29udHJvbC52YWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgY29udHJvbC5zZXRWYWx1ZShuZXdWYWx1ZSwge2VtaXRFdmVudDogZmFsc2V9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmZvcm1Qcm9wZXJ0eS5lcnJvcnNDaGFuZ2VzLnN1YnNjcmliZSgoZXJyb3JzKSA9PiB7XG4gICAgICBjb250cm9sLnNldEVycm9ycyhlcnJvcnMsIHsgZW1pdEV2ZW50OiB0cnVlIH0pO1xuICAgICAgY29uc3QgbWVzc2FnZXMgPSAoZXJyb3JzIHx8IFtdKVxuICAgICAgICAuZmlsdGVyKGUgPT4ge1xuICAgICAgICAgIHJldHVybiBlLnBhdGggJiYgZS5wYXRoLnNsaWNlKDEpID09PSB0aGlzLmZvcm1Qcm9wZXJ0eS5wYXRoO1xuICAgICAgICB9KVxuICAgICAgICAubWFwKGUgPT4gZS5tZXNzYWdlKTtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IG1lc3NhZ2VzLmZpbHRlcigobSwgaSkgPT4gbWVzc2FnZXMuaW5kZXhPZihtKSA9PT0gaSk7XG4gICAgfSk7XG4gICAgY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xuICAgICAgdGhpcy5mb3JtUHJvcGVydHkuc2V0VmFsdWUobmV3VmFsdWUsIGZhbHNlKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBBcnJheUxheW91dFdpZGdldCBleHRlbmRzIFdpZGdldDxBcnJheVByb3BlcnR5PiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5jb250cm9sO1xuICAgIHRoaXMuZm9ybVByb3BlcnR5LmVycm9yc0NoYW5nZXMuc3Vic2NyaWJlKChlcnJvcnMpID0+IHtcbiAgICAgIGNvbnRyb2wuc2V0RXJyb3JzKGVycm9ycywge2VtaXRFdmVudDogdHJ1ZX0pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RMYXlvdXRXaWRnZXQgZXh0ZW5kcyBXaWRnZXQ8T2JqZWN0UHJvcGVydHk+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmNvbnRyb2w7XG4gICAgdGhpcy5mb3JtUHJvcGVydHkuZXJyb3JzQ2hhbmdlcy5zdWJzY3JpYmUoKGVycm9ycykgPT4ge1xuICAgICAgY29udHJvbC5zZXRFcnJvcnMoZXJyb3JzLCB7ZW1pdEV2ZW50OiB0cnVlfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==