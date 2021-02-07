// Input Toggle
class Toggle {
    constructor(config) {
        let self = this;

        self.config = {
            type: 'toggle',
            value: false,
            id: false,
            active: 'rgba(52, 203, 121, 1)',
            inactive: 'rgba(17, 17, 17, 1)',
            ball: 'rgba(255, 255, 255, 1)'
        }

        // Overrides the default class configuration
        if (config) {
            this.config = Object.assign(true, this.config, config);
        }

        // Construction of the Elements
        self.container = document.createElement('div');
        self.input = document.createElement('input');
        self.label = document.createElement('label');
        self.ball = document.createElement('div');

        // Configuration of the elements
        self.container.style.marginLeft = '20px';
        self.input.classList.add('checkbox');
        self.label.classList.add('label');
        self.ball.classList.add('ball');

        self.input.setAttribute('type', 'checkbox');
        self.input.setAttribute('id', 'checkbox');
        self.input.setAttribute('name', 'theme');
        self.label.setAttribute('for', 'checkbox');

        // Set a data-id if necessary
        if(this.config.id) {
            self.container.setAttribute('data-id', self.config.id);
        }

        if(this.config.ball) {
            self.ball.style.backgroundColor = self.config.ball;
        }

        if(this.config.value) {
            self.label.style.backgroundColor = self.config.active;
        } else {
            self.label.style.backgroundColor = self.config.inactive;
        }

        // Overwrite row click
        this.container.click(function(e) {
            e.stopPropagation();
        });

        if(self.config.value) {
            self.input.setAttribute('checked', self.config.value)
        }

        self.input.addEventListener('change', function({target}) {
            // e.stopPropagation();
            self.config.value = target.checked ? true : false;

            if(self.onUpdateChange) {
                self.onUpdateChange.call(this, self.config.value);
            }

            // Chnage Colors
            if(self.config.value) {
                self.label.style.backgroundColor = self.config.active
            } else {
                self.label.style.backgroundColor = self.config.inactive
            }
        });

        // Layout Construction
        self.label.appendChild(self.ball);
        self.container.appendChild(self.input);
        self.container.appendChild(self.label);
    }

    // Callback Event
    setOnUpdateValue(onUpdateChange) {
        this.onUpdateChange = onUpdateChange;
    }

    /**
     * @returns view
     */
    getView() {
        return this.container;
    }
}

