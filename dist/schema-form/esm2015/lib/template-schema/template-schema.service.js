import { __decorate, __metadata } from "tslib";
import { Injectable, EventEmitter } from '@angular/core';
let TemplateSchemaService = class TemplateSchemaService {
    constructor() {
        this.changes = new EventEmitter();
    }
    changed() {
        this.changes.emit();
    }
};
TemplateSchemaService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], TemplateSchemaService);
export { TemplateSchemaService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtc2NoZW1hLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJsaWIvdGVtcGxhdGUtc2NoZW1hL3RlbXBsYXRlLXNjaGVtYS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd6RCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQUloQztRQUZBLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBRWIsQ0FBQztJQUVqQixPQUFPO1FBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0QixDQUFDO0NBRUYsQ0FBQTtBQVZZLHFCQUFxQjtJQURqQyxVQUFVLEVBQUU7O0dBQ0EscUJBQXFCLENBVWpDO1NBVlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZVNjaGVtYVNlcnZpY2Uge1xuXG4gIGNoYW5nZXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBjaGFuZ2VkKCkge1xuICAgIHRoaXMuY2hhbmdlcy5lbWl0KCk7XG4gIH1cblxufVxuIl19