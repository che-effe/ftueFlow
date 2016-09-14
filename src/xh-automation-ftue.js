(function() {
  var defualtPageWidth;
  Polymer({
    is: 'xh-automation-ftue',

    properties: {
      activePage: {
        type: Number,
        reflectToAttribute: true,
        value: 0,
        observer: '_pageChanged'
      },

      swipeComplete: {
        type: Boolean,
        value: true
      }
    },

    ready: function() {
      // debugger;
      // pageWidth = this.$.one.offsetWidth;
      // this.$.two.style.left = pageWidth + 'px';
    },

    _pageChanged: function() {
      this.swipeComplete = false;
      setTimeout(function(){
        this.swipeComplete = true;
      }.bind(this), 1);
      // Load page import on demand. Show 404 page if fails
      // var resolvedPageUrl = this.resolveUrl('my-' + page + '.html');
      // this.importHref(resolvedPageUrl, null, this._showPage404, true);
    },
    _checkActivePage: function(page) {
      return (page - 1) === this.activePage;
    }
  });
}());
