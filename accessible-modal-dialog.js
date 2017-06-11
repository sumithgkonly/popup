(function (global) {
  'use strict';

  

 
  function $$ (selector, context) {
    return Array.prototype.slice.call((context || document).querySelectorAll(selector) || []);
  }



  var focusedElementBeforeModal;

 
  var Modal = function (node, main) {
    var that = this;
    main = main || document.querySelector('#main');
    this.shown = false;

    $$('[data-modal-show="' + node.id + '"]').forEach(function (opener) {
      opener.addEventListener('click', show);
    });

    $$('[data-modal-hide]', node).concat($$('[data-modal-hide="' + node.id + '"]')).forEach(function (closer) {
      closer.addEventListener('click', hide);
    });

    document.addEventListener('keydown', function (event) {
      if (that.shown && event.which === 27) {
        event.preventDefault();
        hide();
      }

      if (that.shown && event.which === 9) {
        trapTabKey(node, event);
      }
    });

    document.body.addEventListener('focus', function (event) {
      if (that.shown && !node.contains(event.target)) {
        setFocusToFirstItem(node);
      }
    }, true);

    this.show = show;
    this.hide = hide;

    function show () {
      that.shown = true;
      node.setAttribute('aria-hidden', 'false');
      main.setAttribute('aria-hidden', 'true');
      focusedElementBeforeModal = document.activeElement;
      setFocusToFirstItem(node);
    }

    function hide () {
      that.shown = false;
      node.setAttribute('aria-hidden', 'true');
      main.setAttribute('aria-hidden', 'false');
      focusedElementBeforeModal.focus();
    }
  };

  global.Modal = Modal;
}(window));