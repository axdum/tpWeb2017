// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.

/**
 * Dessiner les formes contenues dans le tableau des formes visibles.
 * @param ctx le contexte.
 */
Drawing.prototype.paint = function (ctx) {
    console.log(this.shapes);
    ctx.fillStyle = '#F0F0F0'; // set canvas' background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.shapes.forEach(function (eltDuTableau) {
        // now fill the canvas
        eltDuTableau.paint(ctx);
    });
};

/**
 * Mettre à jour la liste des formes.
 */
Drawing.prototype.updateShapeList = function () {
    // DOM elems
    var shapeList = document.getElementById('shapeList');
    var li = document.createElement('li');
    var btn = document.createElement('button');
    var span = document.createElement('span');

    // Style
    li.className = 'list-group-item';
    btn.className = 'btn btn-default';
    span.className = 'glyphicon glyphicon-remove-sign';

    // Ids
    var nbShapes = this.shapes.length - 1;
    li.id = 'shape' + nbShapes;
    btn.id = "btnRemove" + nbShapes;

    // onClick
    btn.setAttribute('onClick', 'drawing.deleteShape(' + nbShapes + ')');

    // Construction de la liste
    btn.appendChild(span);
    li.appendChild(btn);

    var shape = this.shapes[nbShapes];
    if (shape instanceof Rectangle) {
        li.appendChild(document.createTextNode(' Rectangle ( [' + (shape.x1 | 0) + ';' + (shape.y1 | 0) + '], w: ' + shape.width + ', h: ' + shape.height + ' )'));
    } else if (shape instanceof Line) {
        li.appendChild(document.createTextNode(' Line ( [' + (shape.x1 | 0) + ';' + (shape.y1 | 0) + '] to [' + (shape.y2 | 0) + ';' + (shape.y2 | 0) + '] )'));
    } else if (shape instanceof Circle) {
        li.appendChild(document.createTextNode(' Circle ( center:  [' + shape.x1 + ';' + shape.y1 + '], radius: ' + shape.rad + ' )'));
    }
    shapeList.appendChild(li);
};

/**
 * Supprimer une forme.
 * @param nbShape index des la forme à supprimer.
 */
Drawing.prototype.deleteShape = function (nbShape) {
    var li = document.getElementById('shape' + nbShape);
    var i = $(li).index();
    li.remove();
    this.removeShape(i);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.paint(ctx, canvas);
};

/**
 * Redessiner la dernière forme supprimée
 */
Drawing.prototype.redoShape = function () {
    if (this.oldshapes.length > 0) {
        this.redo();
        this.updateShapeList();
        this.paint(ctx, canvas);
    }
};

/**
 * Dessiner une forme.
 * @param ctx le contexte
 */
Shape.prototype.paint = function (ctx) {
    ctx.beginPath();
    ctx.lineWidth = this.thickness;
    ctx.strokeStyle = this.color;
};

/**
 * Dessiner un rectangle.
 * @param ctx le contexte
 */
Rectangle.prototype.paint = function (ctx) {
    Shape.prototype.paint.call(this, ctx);
    //ctx.beginPath();
    ctx.rect(this.x1, this.y1, this.width, this.height);
    ctx.stroke();
};

/**
 * Dessiner une ligne.
 * @param ctx le contexte
 */
Line.prototype.paint = function (ctx) {
    Shape.prototype.paint.call(this, ctx);
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
};

/**
 * Dessiner un cercle.
 * @param ctx le contexte
 */
Circle.prototype.paint = function (ctx) {
    Shape.prototype.paint.call(this, ctx);
    ctx.beginPath();
    ctx.arc(this.x1, this.y1, this.rad, 0, 2 * Math.PI);
    ctx.stroke();
};


