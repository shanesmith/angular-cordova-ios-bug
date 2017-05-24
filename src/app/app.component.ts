import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html'
})
export class AppComponent {

  value: string = ""

  thing: any

  onInput(ev: any) {
    console.trace()

    // Wrapping this line in a setTimeout is one way of avoiding the issue
    // since in the event of onInput() being called on the same call stack as
    // setting the img's src this line will be run on its own call stack.
    // However this can't realistically be done for every event handler, including
    // those in third party components such as in Ionic.
    this.value = ev.target.value

    this.updateThing()
  }

  onButton() {
    console.trace()

    this.value += "Q"

    this.updateThing()
  }

  updateThing() {
    // An async operation here seems to be required to reproduce
    // (ex: promise, XHR...)
    setTimeout(() => {

      // Setting to random ensures he image is reloaded in order
      // to increase the chance of reproducing.
      this.thing = Math.random()

    })
  }

}
