import { Component, ElementRef, inject, input } from '@angular/core';

type Size = 'xSmall' | 'small' | 'medium' | 'large';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
  host: {
    '[attr.data-size]': 'this.size()',
    '[class]': 'className()',
  },
})
export class GridComponent {
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly scrollController = new AbortController();

  readonly size = input<Size>('medium');
  readonly className = input<string>('');
  readonly loadMoreData = input<() => void>();

  private isLoaded = false;
  private childrenLength = 0;

  ngOnInit() {
    if (this.loadMoreData()) {
      document.addEventListener('scroll', this.getCurrentPosition.bind(this), {
        signal: this.scrollController.signal,
      });
    }
  }

  ngOnDestroy() {
    this.scrollController.abort();
  }

  ngAfterViewChecked() {
    const childrenLength = this.elementRef.nativeElement.children.length;

    if (this.childrenLength !== childrenLength) {
      this.childrenLength = childrenLength;
      this.isLoaded = false;
    }
  }

  getCurrentPosition() {
    const loadMoreFn = this.loadMoreData()!;
    const elemProperties = this.elementRef.nativeElement.getBoundingClientRect();
    const screenHeight = window.innerHeight;
    const bottomScrollPosition = screenHeight - elemProperties.bottom;
    const children = this.elementRef.nativeElement.children;
    const lastChild = children[children.length - 1];

    if (bottomScrollPosition * -1 < lastChild.clientHeight * 2 && !this.isLoaded) {
      this.isLoaded = true;
      loadMoreFn();
    }
  }
}
