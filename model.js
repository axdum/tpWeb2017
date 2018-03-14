// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !

// Drawing
function Drawing() {
    this.shapes = []; // Contient les formes visibles
    this.oldshapes = []; // Contient les formes supprimées

    /**
     * Ajouter une forme au tableau.
     * @type {any}
     */
    this.addShape = function (shape) {
        this.shapes.push(shape);
    }.bind(this);

    /**
     * Retirer une forme du tableau à partir de l'index i.
     * @type {any}
     */
    this.removeShape = function (index) {
        var shape = this.shapes[index];
        this.shapes.splice(index, 1);
        this.oldshapes.push(shape);
        console.log(this.shapes);
        console.log(this.oldshapes);
    }.bind(this);

    /**
     * Retirer une forme du tableau à partir de l'index i.
     * @type {any}
     */
    this.removeOldShape = function (index) {
        this.oldshapes.splice(index, 1);
        console.log(this.shapes);
    }.bind(this);

    /**
     * Replacer la dernière forme supprimée dans le tableau des formes visibles.
     * @type {any}
     */
    this.redo = function () {
        this.shapes.push(this.oldshapes[this.oldshapes.length - 1]);
        this.oldshapes.splice(this.oldshapes.length - 1, 1)
        console.log(this.shapes);
        console.log(this.oldshapes);
    }.bind(this);
}

/**
 * Model Shape
 * @param thickness l'épaisseur
 * @param color la couleur
 * @constructor
 */
function Shape(thickness, color) {
    this.thickness = thickness;
    this.color = color;
}

/**
 * Model Rectangle (extends Shape)
 * @param x1 Coordonnée X du coin gauche
 * @param y1 Coordonnée Y du coin gauche
 * @param height Hauteur
 * @param width Largeur
 * @param thickness Epaisseur
 * @param color Couleur
 * @constructor
 */
function Rectangle(x1, y1, height, width, thickness, color) {
    Shape.call(this, thickness, color);
    this.x1 = x1;
    this.y1 = y1;
    this.height = height;
    this.width = width;
}

Rectangle.prototype = new Shape();

/**
 * Model Line (extends Shape)
 * @param x1 Coordonnée X du point de début
 * @param y1 Coordonnée Y du point de début
 * @param x2 Coordonnée X du point de fin
 * @param y2 Coordonnée Y du point de fin
 * @param thickness Epaisseur
 * @param color Couleur
 * @constructor
 */
function Line(x1, y1, x2, y2, thickness, color) {
    Shape.call(this, thickness, color);
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
}

/**
 * Model Circle
 * @param x1 Coordonée X du centre
 * @param y1 Coordonée Y du centre
 * @param radius Rayon
 * @param thickness Epaisseur
 * @param color Couleur
 * @constructor
 */
function Circle(x1, y1, radius, thickness, color) {
    Shape.call(this, thickness, color);
    this.x1 = x1;
    this.y1 = y1;
    this.rad = radius;
}

Line.prototype = new Shape();