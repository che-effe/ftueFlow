(function() {
  var defualtPageWidth;
  Polymer({
    is: 'xh-automation-ftue',

    properties: {
      /**
       * an index number to notify the ourside world of the currently active view.
       * @type Number
       */
      activePage: {
        type: Number,
        reflectToAttribute: true,
        value: 0,
        observer: '_pageChanged'
      },
      /**
       * Boolean to disable then restamp the navigation dots template
       * keeping them up to date
       * @type Boolean
       */
      swipeComplete: {
        type: Boolean,
        value: true
      },

      /**
       * A collection of icon paths. This can be sued to dynamically change the
       * icons in the icons container if needed.
       * @type Object
       */
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

      /**
       * Collection of class names to be assigned to the main background container
       * of the ftue view to dictate backgrounsd-image from css.
       * @type Object
       */
      backgrounds: {
        type: Object,
        value: {
          'texture': 'texture',
          'kidsdoor': 'kidsdoor',
          'window': 'window',
          'night': 'night'
        }
      },

      /**
       * This Boolean is used mostly to conditionally style and position the
       * icons in the first view of the ftue.
       * @type Boolean
       */
      homesceneInView: {
        type: Boolean,
        value: true
      }
    },
    /**
     * Enables gifs to replay each time they're parent view is selected by
     * appending a datestamp as query string to the img src.
     */
    _refreshGifs: function() {
      var gifs = Polymer.dom(this.root).querySelectorAll('img.gif');
      gifs.forEach(function(gif){
        gif.src = gif.src + "?D=" + Date.now();
      });
    },

    /**
     * The page has changed, refresh gifs setu up booleans for forcing restamp
     * of some items in our markup.
     */
    _pageChanged: function() {
      this._refreshGifs();
      this.swipeComplete = false;
      this.iconsReady = false;
      setTimeout(function(){
        this.swipeComplete = true;
        this.swapBackground(this.activePage);
      }.bind(this), 1);

    },

    /**
     * This will enable us to use finger swipe position to
     * add a new level of control to animations
     * NOTE (CF) currenlty not in use, but may be useful moving forward.
     */
    handleTrack: function(e) {
      // switch(e.detail.state) {
      //   case 'start':
      //     this.message = 'Tracking started!';
      //     break;
      //   case 'track':
      //   this.$.leftIcon.style.left = e.detail.x;
      //     this.message = 'Tracking in progress... ' +
      //       e.detail.x + ', ' + e.detail.y;
      //     break;
      //   case 'end':
      //     this.message = 'Tracking ended!';
      //     break;
      // }
      // console.log(this.message);
    },

    /**
     * Whipe all class names from man BG element or host
     * this enabled smooth transition of bg images attached to each view.
     */
    _clearClasses: function(scope){
      if (scope == 'bg'){
        this.$.mainBg.classList.remove('texture');
        this.$.mainBg.classList.remove('kidsdoor');
        this.$.mainBg.classList.remove('window');
        this.$.mainBg.classList.remove('night');
      } else if (scope == 'host') {
        this.classList.remove('texture');
        this.classList.remove('kidsdoor');
        this.classList.remove('window');
        this.classList.remove('night');
      }
    },

    /**
     * Return the new active page view index
     * and set homesceneInView boolean accordingly.
     */
    _checkActivePage: function(page) {
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

    /**
     * Temporarily hide the bg markup element with transition set in css
     * set the new background image based on page/view number.
     */
    swapBackground: function(pageNum) {
      var mainBg = this.$.mainBg;
      var bgImage;
      if(!mainBg) {
        return;
      }
      this.$.mainBg.classList.add('hide');

      switch(pageNum){
        case 0:
          bgImage = this.backgrounds.texture;
          break;
        case 1:
          bgImage = this.backgrounds.kidsdoor;
          break;
        case 2:
          bgImage = this.backgrounds.window;
          break;
        case 3:
          bgImage = this.backgrounds.night;
          break;
        case 4:
          bgImage = this.backgrounds.texture;
          break;
        case 5:
          bgImage = this.backgrounds.texture;
          break;
        default:
          bgImage = this.backgrounds.texture;

      }
      setTimeout(function() {
        this._clearClasses('bg');
        this.$.mainBg.classList.add(bgImage);
        this.$.mainBg.classList.remove('hide');
      }.bind(this), 200);
      setTimeout( function() {
        this._clearClasses('host');
        this.classList.add(bgImage);
      }.bind(this), 800);
      this.iconsReady = true;

    }
  });
}());
