import MountWidget from 'discourse/components/mount-widget';

export default MountWidget.extend({
  widget: 'header',
  docAt: null,
  dockedHeader: null,

  // classNameBindings: ['editingTopic'],

  examineDockHeader() {

    const $body = $('body');

    // Check the dock after the current run loop. While rendering,
    // it's much slower to calculate `outlet.offset()`
    Ember.run.next(() => {
      if (this.docAt === null) {
        const outlet = $('#main-outlet');
        if (!(outlet && outlet.length === 1)) return;
        this.docAt = outlet.offset().top;
      }

      const offset = window.pageYOffset || $('html').scrollTop();
      if (offset >= this.docAt) {
        if (!this.dockedHeader) {
          $body.addClass('docked');
          this.dockedHeader = true;
        }
      } else {
        if (this.dockedHeader) {
          $body.removeClass('docked');
          this.dockedHeader = false;
        }
      }
    });
  },

  didInsertElement() {
    this._super();
    $(window).bind('scroll.discourse-dock', () => this.examineDockHeader());
    $(document).bind('touchmove.discourse-dock', () => this.examineDockHeader());
    this.examineDockHeader();
  },

  willDestroyElement() {
    this._super();
    $(window).unbind('scroll.discourse-dock');
    $(document).unbind('touchmove.discourse-dock');
    $('body').off('keydown.header');
  }

});

export function headerHeight() {
  const $header = $('header.d-header');
  const headerOffset = $header.offset();
  const headerOffsetTop = (headerOffset) ? headerOffset.top : 0;
  return parseInt($header.outerHeight() + headerOffsetTop - $(window).scrollTop());
}
