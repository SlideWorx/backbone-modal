Backbone Modal
================

This is an extendable Backbone View with some built-in features. It automatically appends to DOM and handles most common operations.

## Built-in DOM events
Below are listed built-in modal events. Any extra events can be freely added, as the modal will extend existing methods into the base ones.


```javascript
{
  'click.modal .js-m-cancel:not(.is-disabled)': 'modalCancel',
  'click.modal .js-m-close:not(.is-disabled)': 'modalCancel',
  'click.modal .js-m-ok:not(.is-disabled)': 'modalOk',
  'mousedown.modal .js-m-draggable': 'modalDragStart',
  'mousedown.modal .js-m-resize-handle': 'modalResizeStart'
}
```

## Settings
### modalHasBackground = true
If set to true, modal creates background, which prevents clicking on anything else than modal or background. Clicking on background cancels modal.

### modalCloseOnOk = true
If set to true, clicking on "OK" button will serialize modal, trigger `modal-close` with serialized data and close the modal. With this setting, anything can `listenToOnce` or `once` to this event, saving trouble off unbinding the event.

### modalIsResizeable = false
If set to true, 8 resize handlers will be added to modal, which will allow to resize modal in any direction.

## Event hooks
Modal component allows extra actions in certain situations.

### modalOnShow
After rendering and appending to DOM, method `modalOnShow` (which is identity by default) is fired. This method can be overwritten to script any required actions.

### modalOnHide
After hiding, but before removing, method `modalOnHide` is fired. It can be used to remove any subviews, nullify caches or anything else.

### modalOnResize
During resizing modal, method `modalOnResize` is fired. This allows extending modal to adjust its visuals to changed size (for example update scroll).

### modalOnDrag
Fired when modal is being dragged.

## Methods
All modal methods are prefixed with `modal`, so that extending modal can easily define own methods with similar names. Extending modal requires passing `render` method, as it forces user to fill in the modal.

**Note** Modal component already implements methods `initialize`, `render` and `remove` for internal use, but they're wrapped in extend, so that any extending view can define their own `initialize`, `render` and `remove`.

List of usable methods (that can be overwritten per case):
- remove (this should be wrapped in extend),
- modalRemove,
- modalDragStart(ev),
- modalDragMove(ev),
- modalDragStop(ev),
- modalKeyboard(ev),
- modalCheckPosition,
- modalCenter,
- modalSetPosition(x, y, options),
- modalResizeRenderHandles,
- modalResizeStart(ev),
- modalResizeMove(ev),
- modalResizeStop(ev),
- modalLock(lockOk),
- modalUnlock(unlockOK),
- modalLockToggle(lockContent, lockOk),
- modalIsValid,
- modalValidate (this should be wrapped in extend)

## Contributing
One can build package by using `npm run build` command.

## Release History

### 1.0.0 (16.06.2016)
Initial release.

## TODO
1. Merge webpack configurations.
2. Move tests from main application.
3. Cleanup example/demo sources and names.
4. Remove defines.
