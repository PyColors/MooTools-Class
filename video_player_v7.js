//****************************************************************************/
// Class : VideoPlayer
// Element.implement :
// 		- (options) [on the container element]
//****************************************************************************/
(function() {

    var VideoPlayer = new Class({
        Implements: [Options, Events, Eurosport_v7._Objects.Log],

        elements: {
            container: null,
            bg_body: null,
            bg_body_2: null
        },

        properties: {
            height_container: null,
            height_bg_body: null,
            position_container_y: null,
            position_bg_body_y: null
        },

        options: {},

        initialize: function(container, options) {

            //Initialize container
            this.elements.container = container;
            if (!this.elements.container) {
                return false;
            }

            //Initialize options
            this.initialize_options(options);

            //Initialize elements
            this.initialize_elements();

            //Initialize elements
            this.initialize_properties();

            //Initialize background
            this.initialize_background();

            //Initialize initialize_background
            window.addEvent('load', function() {
                this.initialize_properties();
                this.initialize_background();
            }.bind(this));
        },

        toElement: function() {
            return this.elements.container;
        },

        initialize_options: function(options) {
            if (typeof options == 'undefined' || options == null) {
                options = {};
            }
            this.setOptions(options);
        },

        initialize_elements: function() {
            this.elements.bg_body = document.body.getElement('.fullwidth .bg-body');

            this.elements.bg_body_2 = new Element('div', {
                'class': 'bg-body-2',
                html: '&#160;'
            });
            this.elements.bg_body.grab(this.elements.bg_body_2, 'bottom');
        },

        initialize_properties: function() {
            this.properties.height_container = this.elements.container.getSize().y;
            this.properties.height_bg_body = this.elements.bg_body.getSize().y;
            this.properties.position_container_y = this.elements.container.getPosition().y;
            this.properties.position_bg_body_y = this.elements.bg_body.getPosition().y;
        },

        // background 100%
        initialize_background: function() {
            var that = this;

            this.elements.bg_body_2.setStyles({
                height: that.properties.height_container,
                top: that.properties.position_container_y - that.properties.position_bg_body_y
            });

            // this.elements.bg_body.setStyle('height', that.properties.height_bg_body - that.properties.height_container);
            // this.elements.bg_body.setStyle('height', that.properties.height_bg_body + that.properties.height_container);
            this.elements.bg_body.setStyle('height', that.properties.height_container);

            if (Browser.ie7) {
                this.elements.bg_body.setStyle('height', that.properties.height_bg_body + that.properties.height_container);
            }
        }

    });

    this.Eurosport_v7._Objects.VideoPlayer = VideoPlayer;

    Element.Properties.video_player = {
        set: function(params) {
            var video_player = new Eurosport_v7._Objects.VideoPlayer(this, params[0]);
            this.store('video_player', video_player);
        },
        get: function() {
            return this.retrieve('video_player');
        }
    };

    Element.implement({
        video_player: function(options) {
            this.set('video_player', [options]);
            return this;
        }
    });
})();
