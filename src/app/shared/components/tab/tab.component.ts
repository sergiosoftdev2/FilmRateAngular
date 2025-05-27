
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'tab',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './tab.component.html',
})

export class tabComponent {
    
    @Input() title: string = '';
    @Input() active: boolean = false;
    @Output() tabClick = new EventEmitter<string>();
    
    onClick() {
        this.tabClick.emit(this.title);
    }
}