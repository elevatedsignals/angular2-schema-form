import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
let ActionRegistry = class ActionRegistry {
    constructor() {
        this.actions = {};
    }
    clear() {
        this.actions = {};
    }
    register(actionId, action) {
        this.actions[actionId] = action;
    }
    get(actionId) {
        return this.actions[actionId];
    }
};
ActionRegistry = __decorate([
    Injectable()
], ActionRegistry);
export { ActionRegistry };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucmVnaXN0cnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJsaWIvbW9kZWwvYWN0aW9ucmVnaXN0cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUEzQjtRQUNFLFlBQU8sR0FBNEIsRUFBRSxDQUFDO0lBYXhDLENBQUM7SUFYQyxLQUFLO1FBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELFFBQVEsQ0FBQyxRQUFnQixFQUFFLE1BQWM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUM7SUFDbEMsQ0FBQztJQUVELEdBQUcsQ0FBQyxRQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNGLENBQUE7QUFkWSxjQUFjO0lBRDFCLFVBQVUsRUFBRTtHQUNBLGNBQWMsQ0FjMUI7U0FkWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi9hY3Rpb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBY3Rpb25SZWdpc3RyeSB7XG4gIGFjdGlvbnM6IHtba2V5OiBzdHJpbmddOiBBY3Rpb259ID0ge307XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5hY3Rpb25zID0ge307XG4gIH1cblxuICByZWdpc3RlcihhY3Rpb25JZDogc3RyaW5nLCBhY3Rpb246IEFjdGlvbikge1xuICAgIHRoaXMuYWN0aW9uc1thY3Rpb25JZF0gPSBhY3Rpb247XG4gIH1cblxuICBnZXQoYWN0aW9uSWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmFjdGlvbnNbYWN0aW9uSWRdO1xuICB9XG59XG4iXX0=