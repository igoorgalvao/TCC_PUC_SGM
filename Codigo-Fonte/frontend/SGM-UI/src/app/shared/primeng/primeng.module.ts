import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';


const PRIMENG_COMPONENTS = [
    ButtonModule,
    InputTextModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    PanelModule,
    DropdownModule,
    InputTextareaModule,
    RippleModule,
    TabViewModule,
    InputMaskModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    AvatarModule,
    AvatarGroupModule,
    CalendarModule,
    TableModule,
    TooltipModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        PRIMENG_COMPONENTS
    ],
    exports: [
        PRIMENG_COMPONENTS
    ]
})
export class PrimengModule {
}
