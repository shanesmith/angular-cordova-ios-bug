import { Component, Input } from '@angular/core'

@Component({
  selector: "child",

  // Binding [src] is not significant to the issue,
  // this is only done so that the image is reloaded in order
  // to increase the chances of reproducing, the issue has been
  // observed with a simple `src="pic.jpg"`. Also note
  // that the src does not need to be a valid image.
  template: "<img [src]='thing' />"
})
export class ChildComponent {

  @Input() thing: any

}

