
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.

Drawing.prototype.paint = function(ctx) {
    console.log(this.shapes);
    ctx.fillStyle = '#F0F0F0'; // set canvas' background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.shapes.forEach(function(eltDuTableau) {
    // now fill the canvas
        eltDuTableau.paint(ctx);
    });
};

Shape.prototype.paint = function(ctx) {
    ctx.beginPath();
    ctx.lineWidth = this.thickness;
    ctx.strokeStyle = this.color;
};


Rectangle.prototype.paint = function(ctx) {
    Shape.prototype.paint.call(this,ctx);
    ctx.beginPath();
    ctx.rect(this.x1, this.y1, this.width, this.height);
    ctx.stroke();
};

Line.prototype.paint = function(ctx) {
    Shape.prototype.paint.call(this,ctx);
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
};
