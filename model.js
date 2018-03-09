// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !

// Drawing
function Drawing() {
    this.shapes = [];

    // Ajouter une forme au tableau
    this.addShape = function (shape) {
        this.shapes.push(shape);
    }.bind(this);

    // Retirer une forme du tableau à partir de l'index i
    this.removeShape = function (index) {
        this.shapes.splice(index, 1);
        console.log(this.shapes);
    }.bind(this);
}

// Shape
function Shape(thickness, color) {
    this.thickness = thickness;
    this.color = color;
}

// Rect extends Forme
function Rectangle(x1, y1, height, width, thickness, color) {
    Shape.call(this, thickness, color);
    this.x1 = x1;
    this.y1 = y1;
    this.height = height;
    this.width = width;
}

Rectangle.prototype = new Shape();

// Line extends Shape
function Line(x1, y1, x2, y2, thickness, color) {
    Shape.call(this, thickness, color);
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
}

// Circle extends Shape
function Circle(x1, y1, radius, thickness, color) {
    Shape.call(this, thickness, color);
    this.x1 = x1;
    this.y1 = y1;
    this.rad = radius;
}

Line.prototype = new Shape();