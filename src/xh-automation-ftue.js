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
      },

      icons: {
        type: Object,
        value: {
          'door': '../images/door-open.svg',
          'camera': '../images/camera.svg',
          'phone': '../images/phone.svg',
          'message': '../images/message.svg',
          'window': '../images/window.svg',
          'bulb': '../images/bulb.svg'
        }
      },
      iconSet: {
        type: Array,
        value: []
      },
      iconsReady: {
        type: Boolean,
        value: false
      },
      homesceneInView: {
        type: Boolean,
        value: true
      }
    },

    ready: function() {

    },

    _getIcon: function(index) {
      return this.iconSet[index];
    },

    _pageChanged: function() {
      this.swipeComplete = false;
      this.iconsReady = false;
      setTimeout(function(){
        this.swipeComplete = true;
        this.swapIcons(this.activePage);
      }.bind(this), 1);

    },

    _checkActivePage: function(page) {
      this.swapIcons(this.activePage);
      if (this.activePage === 0 ){
        setTimeout(function(){
          this.homesceneInView = true;
        }.bind(this), 3);
      } else {
        setTimeout(function(){
          this.homesceneInView = false;
        }.bind(this), 3);
      }


      return (page - 1) === this.activePage;
    },

    swapIcons: function(pageNum) {
      switch(pageNum){
        case 0:
        case 1:
          this.iconSet = [this.icons.door, this.icons.camera];
          break;
        case 2:
          this.iconSet = [this.icons.window, this.icons.phone, this.icons.message];
          break;
        case 3:
        case 4:
        case 5:
          this.iconSet = [this.icons.door, this.icons.bulb];
          break;

      }
      this.iconsReady = true;
    }
  });
}());
