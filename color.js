function Color() {
    this.components = [0, 0, 0].map(function () {
        return Math.floor(Math.random() * 255);
    });
}

Color.prototype.toRGBString = function () {
    return 'rgb(' + this.components.join(', ') + ')';
};

Color.prototype.rgbDarken = function () {
    // find which is the primary component and darken it
    this.components = this.components.map(function (component) {
        if (component !== 0) {
            component -= 10;
            component = component < 0 ? 0 : component;
        }
    })
};