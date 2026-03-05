import { LitElement } from 'lit';
export declare class DatePicker extends LitElement {
    static styles: import("lit").CSSResult;
    label: string;
    value?: Date;
    placeholder: string;
    private _isOpen;
    private _calendarController?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleClickOutside;
    private _handleDateSelect;
    render(): import("lit").TemplateResult<1>;
}
