import { ArrayLayoutWidget } from '../../widget';
import { FormProperty } from '../../model';
export declare class ArrayWidget extends ArrayLayoutWidget {
    addItem(): void;
    removeItem(item: FormProperty): void;
    trackByIndex(index: number, item: any): number;
}
