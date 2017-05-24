# Angular Cordova iOS Bug

## The Issue

Under certain common conditions, the UI freezes after a UI event (ex:
typing, clicking). To be specific, while UI elements can still be interacted
with, Angular bindings seem to stop working and the UI does not get updated.

The issue is reproducible only in an iOS Cordova app. It's worth noting that
the issue is not found when enabling WKWebView.

## The Error

In the developer console we can see the following error being thrown when the
issue is reproduced:

> ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.

In Angular, change detection is done in a single pass from the root down
through each child component. It's invalid for a parent component's bound
property to be updated while the change detection is being run on a child
component.

In development mode Angular attempts to catch these invalid scenarios after each
change detection run through the app and it's then that the error is thrown.

Any uncaught error that's thrown in an Angular app will freeze the app as
described above. A solution therefore might be to enable Angular's production
mode since the invalid scenario detection would not be run and the error never
thrown, however this is unsatisfactory since even though the app would not
freeze it would still end up in an invalid state with unknown consequences.

## The Cause

It's been found that after setting the `src` property of an `<img>` element a
UI event can have its handler called _in the same call stack_. Therefore if an
event handler updates a component's bound property and if there exists a child
component with an `<img>` that is loaded at the same time as the event then the
issue can be reproduced. To be clear, the issue is a race condition between
these events.

## Reproducing

- Install dependencies with the command `npm install`

- Run the app on an iOS device or emulator with the command `npm run [device|emulate] ios`

- Connect Safari's javascript dev console to the app if you want to debug

- Quickly type into the app's text box by mashing on the keyboard

- When the "Value" text below the text box stops being updated as you type then
  the issue has been reproduced. This typically happens in a dozen or two typed
  characters.

- Taking a look as the console scroll to find `ExpressionChangedAfterItHasBeenCheckedError`

- Immediately above the error you'll find a stack trace that is longer than
  others found in the console, this shows the behaviour mentioned previously:
  at the top of the stack there is `onInput()` as expected, but about 8 calls
  down the stack you'll notice `setProperty()`, which effectively sets the
  `src` property of the `<img>`, and you see that the event handler is being
  invoked in the same call stack as setting the src.
