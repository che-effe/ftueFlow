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
          'texture': '../images/bg-texture.jpg',
          'kidsdoor': '../images/bg-kidsdoor.jpg',
          'window': '../images/bg-window.jpg',
          'night': '../images/bg-night.jpg'
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
      var mainBg = this.$.mainBg;
      if(!mainBg) {
        return;
      }
      this.$.mainBg.classList.add('hide');

      setTimeout(function() {
        switch(pageNum){
          case 0:
            this.$.mainBg.style = 'background-image: url(\'' + this.backgrounds.texture + '\');'
            this.iconSet = [this.icons.door, this.icons.camera];

            break;
          case 1:
            this.$.mainBg.style = 'background-image: url(\'' + this.backgrounds.kidsdoor + '\');'
            this.iconSet = [this.icons.door, this.icons.camera];
            Polymer.dom(this).style = 'background-image: url(\'' + this.backgrounds.kidsdoor + '\');'
            break;
          case 2:
            this.$.mainBg.style = 'background-image: url(\'' + this.backgrounds.window + '\');'

            this.iconSet = [this.icons.window, this.icons.phone, this.icons.message];
            Polymer.dom(this).style = 'background-image: url(\'' + this.backgrounds.window + '\');'
            break;
          case 3:
            this.$.mainBg.style = 'background-image: url(\'' + this.backgrounds.night + '\');'
            Polymer.dom(this).style = 'background-image: url(\'' + this.backgrounds.night + '\');'

            break;
          case 4:
            this.$.mainBg.style = 'background-image: url(\'' + this.backgrounds.texture + '\');'
            this.iconSet = [this.icons.door, this.icons.bulb];

            break;
          case 5:
            this.iconSet = [this.icons.door, this.icons.bulb];
            break;
          default:
          this.$.mainBg.style = 'background-image: url(\'' + this.backgrounds.texture + '\');'
        }

      }.bind(this), 200);
      this.iconsReady = true;
      setTimeout(function() {
        this.$.mainBg.classList.remove('hide');
      }.bind(this), 200);
    }
  });
}());
