import { Directive, ElementRef, Input, OnChanges, SimpleChanges, OnInit, Renderer2 } from '@angular/core';
import { ButtonsConfig } from '../components/modal-gallery.component';

@Directive({
  selector: '[download-button]'
})
export class DownloadButtonDirective implements OnInit, OnChanges {

  @Input() configButtons: ButtonsConfig;
  @Input() imgExtUrl: string | void;

  private RIGHT: number = 63;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.applyStyle();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.applyStyle();
  }

  private applyStyle() {
    let right: number = 0;
    if (this.configButtons && this.configButtons.download) {
      right = this.getNumOfPrecedingButtons() * this.RIGHT;
    } else {
      right = 0;
    }
    // apply [style.right]="" to download url <a></a>
    this.renderer.setStyle(this.el.nativeElement, 'right', `${right}px`);


    // hide downloadButton if configButtons.download is false
    this.renderer.setProperty(this.el.nativeElement, 'hidden', !this.configButtons || (this.configButtons && !this.configButtons.download));
  }

  private getNumOfPrecedingButtons() {
    let num: number = 0;
    if (!this.configButtons) {
      return num;
    }

    if (this.configButtons.extUrl && this.imgExtUrl) {
      num++;
    }

    if (this.configButtons.close === undefined || this.configButtons.close === true) {
      num++;
    }

    return num;
  }
}
