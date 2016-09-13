(function() {
  var defualtPageWidth;
  Polymer({
    is: 'xh-automation-ftue',

    properties: {
      activePage: {
        type: Number,
        reflectToAttribute: true,
        value: 1,
        observer: '_pageChanged'
      }
    },

    observers: [
      '_routePageChanged(routeData.page)'
    ],

    _routePageChanged: function(page) {
      this.page = page || 'view1';
    },

    ready: function() {
      debugger;
      pageWidth = this.$.one.offsetWidth;
      this.$.two.style.left = pageWidth + 'px';
    },

    _pageChanged: function(page) {
      // Load page import on demand. Show 404 page if fails
      // var resolvedPageUrl = this.resolveUrl('my-' + page + '.html');
      // this.importHref(resolvedPageUrl, null, this._showPage404, true);
    }
  });
}());
