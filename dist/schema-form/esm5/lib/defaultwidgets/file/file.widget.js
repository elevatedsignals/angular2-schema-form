/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';
var FileWidget = /** @class */ (function (_super) {
    tslib_1.__extends(FileWidget, _super);
    function FileWidget() {
        var _this = _super.call(this) || this;
        _this.reader = new FileReader();
        _this.filedata = {};
        return _this;
    }
    /**
     * @return {?}
     */
    FileWidget.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // OVERRIDE ControlWidget ngAfterViewInit() as ReactiveForms do not handle
        // file inputs
        /** @type {?} */
        var control = this.control;
        this.formProperty.errorsChanges.subscribe(function (errors) {
            control.setErrors(errors, { emitEvent: true });
        });
        this.reader.onloadend = function () {
            _this.filedata.data = window.btoa(((/** @type {?} */ (_this.reader.result))));
            _this.formProperty.setValue(_this.filedata, false);
        };
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    FileWidget.prototype.onFileChange = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var file = $event.target.files[0];
        this.filedata.filename = file.name;
        this.filedata.size = file.size;
        this.filedata['content-type'] = file.type;
        this.filedata.encoding = 'base64';
        this.reader.readAsBinaryString(file);
    };
    FileWidget.decorators = [
        { type: Component, args: [{
                    selector: 'sf-file-widget',
                    template: "<div class=\"widget form-group\">\n\t<label [attr.for]=\"id\" class=\"horizontal control-label\">\n\t\t{{ schema.title }}\n\t</label>\n    <span *ngIf=\"schema.description\" class=\"formHelp\">{{schema.description}}</span>\n  <input [name]=\"name\" class=\"text-widget file-widget\" [attr.id]=\"id\"\n    [formControl]=\"control\" type=\"file\" [attr.disabled]=\"schema.readOnly?true:null\"\n    (change)=\"onFileChange($event)\">\n\t<input *ngIf=\"schema.readOnly\" [attr.name]=\"name\" type=\"hidden\" [formControl]=\"control\">\n</div>"
                }] }
    ];
    /** @nocollapse */
    FileWidget.ctorParameters = function () { return []; };
    return FileWidget;
}(ControlWidget));
export { FileWidget };
if (false) {
    /** @type {?} */
    FileWidget.prototype.reader;
    /** @type {?} */
    FileWidget.prototype.filedata;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS53aWRnZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJsaWIvZGVmYXVsdHdpZGdldHMvZmlsZS9maWxlLndpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFN0M7SUFhZ0Msc0NBQWE7SUFLM0M7UUFBQSxZQUNFLGlCQUFPLFNBQ1I7UUFMUyxZQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUMxQixjQUFRLEdBQVEsRUFBRSxDQUFDOztJQUk3QixDQUFDOzs7O0lBRUQsb0NBQWU7OztJQUFmO1FBQUEsaUJBWUM7Ozs7WUFUTyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU87UUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUMvQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUc7WUFDdEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLG1CQUFBLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLEtBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFRCxpQ0FBWTs7OztJQUFaLFVBQWEsTUFBTTs7WUFDWCxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Z0JBM0NGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsNGhCQVNMO2lCQUNOOzs7O0lBZ0NELGlCQUFDO0NBQUEsQUE1Q0QsQ0FhZ0MsYUFBYSxHQStCNUM7U0EvQlksVUFBVTs7O0lBRXJCLDRCQUFvQzs7SUFDcEMsOEJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbnRyb2xXaWRnZXQgfSBmcm9tICcuLi8uLi93aWRnZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1maWxlLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIndpZGdldCBmb3JtLWdyb3VwXCI+XG5cdDxsYWJlbCBbYXR0ci5mb3JdPVwiaWRcIiBjbGFzcz1cImhvcml6b250YWwgY29udHJvbC1sYWJlbFwiPlxuXHRcdHt7IHNjaGVtYS50aXRsZSB9fVxuXHQ8L2xhYmVsPlxuICAgIDxzcGFuICpuZ0lmPVwic2NoZW1hLmRlc2NyaXB0aW9uXCIgY2xhc3M9XCJmb3JtSGVscFwiPnt7c2NoZW1hLmRlc2NyaXB0aW9ufX08L3NwYW4+XG4gIDxpbnB1dCBbbmFtZV09XCJuYW1lXCIgY2xhc3M9XCJ0ZXh0LXdpZGdldCBmaWxlLXdpZGdldFwiIFthdHRyLmlkXT1cImlkXCJcbiAgICBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiIHR5cGU9XCJmaWxlXCIgW2F0dHIuZGlzYWJsZWRdPVwic2NoZW1hLnJlYWRPbmx5P3RydWU6bnVsbFwiXG4gICAgKGNoYW5nZSk9XCJvbkZpbGVDaGFuZ2UoJGV2ZW50KVwiPlxuXHQ8aW5wdXQgKm5nSWY9XCJzY2hlbWEucmVhZE9ubHlcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiB0eXBlPVwiaGlkZGVuXCIgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIj5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgRmlsZVdpZGdldCBleHRlbmRzIENvbnRyb2xXaWRnZXQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBwcm90ZWN0ZWQgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgcHJvdGVjdGVkIGZpbGVkYXRhOiBhbnkgPSB7fTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIE9WRVJSSURFIENvbnRyb2xXaWRnZXQgbmdBZnRlclZpZXdJbml0KCkgYXMgUmVhY3RpdmVGb3JtcyBkbyBub3QgaGFuZGxlXG4gICAgLy8gZmlsZSBpbnB1dHNcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5jb250cm9sO1xuICAgIHRoaXMuZm9ybVByb3BlcnR5LmVycm9yc0NoYW5nZXMuc3Vic2NyaWJlKChlcnJvcnMpID0+IHtcbiAgICAgIGNvbnRyb2wuc2V0RXJyb3JzKGVycm9ycywgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmZpbGVkYXRhLmRhdGEgPSB3aW5kb3cuYnRvYSgodGhpcy5yZWFkZXIucmVzdWx0IGFzIHN0cmluZykpO1xuICAgICAgdGhpcy5mb3JtUHJvcGVydHkuc2V0VmFsdWUodGhpcy5maWxlZGF0YSwgZmFsc2UpO1xuICAgIH07XG4gIH1cblxuICBvbkZpbGVDaGFuZ2UoJGV2ZW50KSB7XG4gICAgY29uc3QgZmlsZSA9ICRldmVudC50YXJnZXQuZmlsZXNbMF07XG4gICAgdGhpcy5maWxlZGF0YS5maWxlbmFtZSA9IGZpbGUubmFtZTtcbiAgICB0aGlzLmZpbGVkYXRhLnNpemUgPSBmaWxlLnNpemU7XG4gICAgdGhpcy5maWxlZGF0YVsnY29udGVudC10eXBlJ10gPSBmaWxlLnR5cGU7XG4gICAgdGhpcy5maWxlZGF0YS5lbmNvZGluZyA9ICdiYXNlNjQnO1xuICAgIHRoaXMucmVhZGVyLnJlYWRBc0JpbmFyeVN0cmluZyhmaWxlKTtcbiAgfVxufVxuIl19