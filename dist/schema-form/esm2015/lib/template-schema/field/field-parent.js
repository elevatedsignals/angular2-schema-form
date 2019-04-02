/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { TemplateSchemaElement } from '../template-schema-element';
import { FieldType } from './field';
/**
 * @abstract
 */
export class FieldParent extends TemplateSchemaElement {
    constructor() {
        super(...arguments);
        this.name = '';
    }
    /**
     * @return {?}
     */
    get path() {
        if (!this.name) {
            return '';
        }
        return '/' + this.name;
    }
    /**
     * @return {?}
     */
    getButtons() {
        return this.childButtons.map((button, index) => {
            if (!button.id) {
                /** @type {?} */
                const randomString = Math.random().toString(16).substr(2, 8);
                // generate id for button
                button.id = this.name + randomString + '_' + (index + 1);
            }
            // register as button action the EventEmitter click
            this.actionRegistry.register(button.id, button.click.emit.bind(button.click));
            /** @type {?} */
            const _button = (/** @type {?} */ ({
                id: button.id,
                label: button.label,
            }));
            if (button.widget) {
                _button.widget = button.widget;
            }
            return _button;
        });
    }
    /**
     * @param {?} fields
     * @return {?}
     */
    getFieldsValidators(fields) {
        return fields.reduce((validators, field) => {
            return validators.concat(field.getValidators());
        }, []);
    }
    /**
     * @param {?} fields
     * @return {?}
     */
    getFieldsSchema(fields) {
        return fields.reduce((schema, field) => {
            switch (this.type) {
                case FieldType.Array:
                    schema.items = field.getSchema();
                    break;
                default:
                    if (!schema.properties) {
                        schema.properties = {};
                    }
                    schema.properties[field.name] = field.getSchema();
                    break;
            }
            /** @type {?} */
            const buttons = field.getButtons();
            if (buttons.length > 0) {
                schema.buttons = buttons;
            }
            if (!field.required) {
                return schema;
            }
            if (!schema.required) {
                schema.required = [];
            }
            schema.required.push(field.name);
            return schema;
        }, {});
    }
}
if (false) {
    /** @type {?} */
    FieldParent.prototype.name;
    /** @type {?} */
    FieldParent.prototype.type;
    /** @type {?} */
    FieldParent.prototype.actionRegistry;
    /** @type {?} */
    FieldParent.prototype.childButtons;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtcGFyZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3RlbXBsYXRlLXNjaGVtYS9maWVsZC9maWVsZC1wYXJlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUtBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRW5FLE9BQU8sRUFBUyxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7QUFFM0MsTUFBTSxPQUFnQixXQUFZLFNBQVEscUJBQXFCO0lBQS9EOztRQUVFLFNBQUksR0FBRyxFQUFFLENBQUM7SUF5RlosQ0FBQzs7OztJQXRGQyxJQUFJLElBQUk7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNkLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFNRCxVQUFVO1FBRVIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUU3QyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTs7c0JBQ1IsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzVELHlCQUF5QjtnQkFDekIsTUFBTSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksR0FBRyxHQUFHLEdBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDM0Q7WUFFRCxtREFBbUQ7WUFDbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQzFCLE1BQU0sQ0FBQyxFQUFFLEVBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FDckMsQ0FBQzs7a0JBRUksT0FBTyxHQUFHLG1CQUFLO2dCQUNuQixFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO2FBQ3BCLEVBQUE7WUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUNoQztZQUVELE9BQU8sT0FBTyxDQUFDO1FBRWpCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFUyxtQkFBbUIsQ0FDM0IsTUFBZTtRQUdmLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUN6QyxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRVQsQ0FBQzs7Ozs7SUFFUyxlQUFlLENBQUMsTUFBZTtRQUN2QyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFXLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFFMUMsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNqQixLQUFLLFNBQVMsQ0FBQyxLQUFLO29CQUNsQixNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDakMsTUFBTTtnQkFFUjtvQkFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTt3QkFDdEIsTUFBTSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7cUJBQ3hCO29CQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDbEQsTUFBTTthQUNUOztrQkFFSyxPQUFPLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRTtZQUNsQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN0QixNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzthQUMxQjtZQUVELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO2dCQUNuQixPQUFPLE1BQU0sQ0FBQzthQUNmO1lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQ3BCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO2FBQ3RCO1lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNULENBQUM7Q0FFRjs7O0lBekZDLDJCQUFVOztJQUNWLDJCQUFnQjs7SUFVaEIscUNBQWtEOztJQUNsRCxtQ0FBNEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnLi4vLi4vbW9kZWwvdmFsaWRhdG9yJztcbmltcG9ydCB7IEFjdGlvblJlZ2lzdHJ5IH0gZnJvbSAnLi4vLi4vbW9kZWwvYWN0aW9ucmVnaXN0cnknO1xuaW1wb3J0IHsgQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi4vYnV0dG9uL2J1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGVtcGxhdGVTY2hlbWFFbGVtZW50IH0gZnJvbSAnLi4vdGVtcGxhdGUtc2NoZW1hLWVsZW1lbnQnO1xuXG5pbXBvcnQgeyBGaWVsZCwgRmllbGRUeXBlIH0gZnJvbSAnLi9maWVsZCc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGaWVsZFBhcmVudCBleHRlbmRzIFRlbXBsYXRlU2NoZW1hRWxlbWVudCB7XG5cbiAgbmFtZSA9ICcnO1xuICB0eXBlOiBGaWVsZFR5cGU7XG5cbiAgZ2V0IHBhdGgoKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMubmFtZSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHJldHVybiAnLycgKyB0aGlzLm5hbWU7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgYWN0aW9uUmVnaXN0cnk6IEFjdGlvblJlZ2lzdHJ5O1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgY2hpbGRCdXR0b25zOiBRdWVyeUxpc3Q8QnV0dG9uQ29tcG9uZW50PjtcblxuXG4gIGdldEJ1dHRvbnMoKTogeyBpZDogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCB3aWRnZXQ/OiBzdHJpbmcgfCBvYmplY3QgfVtdIHtcblxuICAgIHJldHVybiB0aGlzLmNoaWxkQnV0dG9ucy5tYXAoKGJ1dHRvbiwgaW5kZXgpID0+IHtcblxuICAgICAgaWYgKCFidXR0b24uaWQpIHtcbiAgICAgICAgY29uc3QgcmFuZG9tU3RyaW5nID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc3Vic3RyKDIsIDgpO1xuICAgICAgICAvLyBnZW5lcmF0ZSBpZCBmb3IgYnV0dG9uXG4gICAgICAgIGJ1dHRvbi5pZCA9IHRoaXMubmFtZSArIHJhbmRvbVN0cmluZyArICdfJyAgKyAoaW5kZXggKyAxKTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVnaXN0ZXIgYXMgYnV0dG9uIGFjdGlvbiB0aGUgRXZlbnRFbWl0dGVyIGNsaWNrXG4gICAgICB0aGlzLmFjdGlvblJlZ2lzdHJ5LnJlZ2lzdGVyKFxuICAgICAgICBidXR0b24uaWQsXG4gICAgICAgIGJ1dHRvbi5jbGljay5lbWl0LmJpbmQoYnV0dG9uLmNsaWNrKVxuICAgICAgKTtcblxuICAgICAgY29uc3QgX2J1dHRvbiA9IDxhbnk+e1xuICAgICAgICBpZDogYnV0dG9uLmlkLFxuICAgICAgICBsYWJlbDogYnV0dG9uLmxhYmVsLFxuICAgICAgfTtcblxuICAgICAgaWYgKGJ1dHRvbi53aWRnZXQpIHtcbiAgICAgICAgX2J1dHRvbi53aWRnZXQgPSBidXR0b24ud2lkZ2V0O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX2J1dHRvbjtcblxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEZpZWxkc1ZhbGlkYXRvcnMoXG4gICAgZmllbGRzOiBGaWVsZFtdXG4gICk6IHsgcGF0aDogc3RyaW5nLCB2YWxpZGF0b3I6IFZhbGlkYXRvciB9W10ge1xuXG4gICAgcmV0dXJuIGZpZWxkcy5yZWR1Y2UoKHZhbGlkYXRvcnMsIGZpZWxkKSA9PiB7XG4gICAgICByZXR1cm4gdmFsaWRhdG9ycy5jb25jYXQoZmllbGQuZ2V0VmFsaWRhdG9ycygpKTtcbiAgICB9LCBbXSk7XG5cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRGaWVsZHNTY2hlbWEoZmllbGRzOiBGaWVsZFtdKSB7XG4gICAgcmV0dXJuIGZpZWxkcy5yZWR1Y2UoKHNjaGVtYTogYW55LCBmaWVsZCkgPT4ge1xuXG4gICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICBjYXNlIEZpZWxkVHlwZS5BcnJheTpcbiAgICAgICAgICBzY2hlbWEuaXRlbXMgPSBmaWVsZC5nZXRTY2hlbWEoKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmICghc2NoZW1hLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIHNjaGVtYS5wcm9wZXJ0aWVzID0ge307XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2NoZW1hLnByb3BlcnRpZXNbZmllbGQubmFtZV0gPSBmaWVsZC5nZXRTY2hlbWEoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY29uc3QgYnV0dG9ucyA9IGZpZWxkLmdldEJ1dHRvbnMoKTtcbiAgICAgIGlmIChidXR0b25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2NoZW1hLmJ1dHRvbnMgPSBidXR0b25zO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWZpZWxkLnJlcXVpcmVkKSB7XG4gICAgICAgIHJldHVybiBzY2hlbWE7XG4gICAgICB9XG5cbiAgICAgIGlmICghc2NoZW1hLnJlcXVpcmVkKSB7XG4gICAgICAgIHNjaGVtYS5yZXF1aXJlZCA9IFtdO1xuICAgICAgfVxuICAgICAgc2NoZW1hLnJlcXVpcmVkLnB1c2goZmllbGQubmFtZSk7XG4gICAgICByZXR1cm4gc2NoZW1hO1xuICAgIH0sIHt9KTtcbiAgfVxuXG59XG4iXX0=