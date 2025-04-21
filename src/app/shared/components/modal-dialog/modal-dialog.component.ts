import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-dialog',
  imports: [CommonModule],
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.css'
})

export class ModalDialogComponent {

  @Input() public isOpen: boolean = true;
  @Input() public pelicula: any;
  @Output() public closeModal = new EventEmitter<void>();

  public close() {
    this.isOpen = false;
    this.closeModal.emit();
  }

  ngOnInit(){
    console.log(this.isOpen);
  }

}