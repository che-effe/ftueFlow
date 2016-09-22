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

      backgrounds: {
        type: Object,
        value: {
          'texture': 'texture',
          'kidsdoor': 'kidsdoor',
          'window': 'window',
          'night': 'night'
        }
      },

      iconSet: {
        type: Array,
        value: ['../images/door-open.svg', '../images/camera.svg']
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
    _clearClasses: function(){
      this.$.mainBg.classList.remove('texture');
      this.$.mainBg.classList.remove('kidsdoor');
      this.$.mainBg.classList.remove('window');
      this.$.mainBg.classList.remove('night');
    },

    _checkActivePage: function(page) {
      // this.swapIcons(this.activePage);
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
      var mainBg = this.$.mainBg;
      var bgImage;
      if(!mainBg) {
        return;
      }
      this.$.mainBg.classList.add('hide');

      switch(pageNum){
        case 0:
          bgImage = this.backgrounds.texture;
          this.iconSet = [this.icons.door, this.icons.camera];
          break;
        case 1:
          bgImage = this.backgrounds.kidsdoor;
          this.iconSet = [this.icons.door, this.icons.camera];
          break;
        case 2:
          bgImage = this.backgrounds.window;
          this.iconSet = [this.icons.window, this.icons.phone, this.icons.message];
          break;
        case 3:
          bgImage = this.backgrounds.night;
          this.iconSet = [this.icons.door, this.icons.bulb];
          break;
        case 4:
          bgImage = this.backgrounds.texture;
          this.iconSet = [this.icons.door, this.icons.bulb];
          break;
        case 5:
          this.iconSet = [this.icons.door, this.icons.bulb];
          break;
        default:
        bgImage = this.backgrounds.texture;

      }
      this._clearClasses();
      setTimeout(function() {
        this.$.mainBg.classList.add(bgImage);
        this.$.mainBg.classList.remove('hide');
      }.bind(this), 200);
      setTimeout( function() {
        this.classList.add(bgImage);
      }.bind(this), 500);
      this.iconsReady = true;

    }
  });
}());
