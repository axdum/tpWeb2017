var editingMode = {rect: 0, line: 1};

function Pencil(ctx, drawing, canvas) {
    this.currEditingMode = editingMode.line;
    this.currLineWidth = 5;
    this.currColour = '#000000';
    this.currentShape = 0;
    this.dnd = new DnD(canvas, this);

    // Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
    // Récupère les attributs saisis par l'user.
    this.setDrawingAttr = function () {
        if (document.getElementById('butRect').checked) {
            this.currEditingMode = editingMode.rect;
        } else if (document.getElementById('butLine').checked) {
            this.currEditingMode = editingMode.line;
        }
        this.currLineWidth = document.getElementById('spinnerWidth').value;
        this.currColour = document.getElementById('colour').value;
    }

    // Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
    this.onInteractionStart = function () {
        this.setDrawingAttr();
        if (this.currEditingMode == editingMode.rect) {
            this.currentShape = new Rectangle(this.dnd.startX, this.dnd.startY, 0, 0, this.currLineWidth, this.currColour);
        } else if (this.currEditingMode == editingMode.line) {
            this.currentShape = new Line(this.dnd.startX, this.dnd.startY, this.dnd.startX, this.dnd.startY, this.currLineWidth, this.currColour);
        }
    }.bind(this);

    this.onInteractionUpdate = function () {
        this.createShape();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawing.paint(ctx, canvas);
        this.currentShape.paint(ctx, canvas);
    }.bind(this);

    this.onInteractionEnd = function () {
        this.createShape();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawing.addShape(this.currentShape);
        drawing.paint(ctx, canvas);
        this.currentShape = 0;
    }.bind(this);

    this.createShape = function () {
        if (this.currEditingMode == editingMode.rect) {
            var height = this.dnd.endY - this.dnd.startY;
            var width = this.dnd.endX - this.dnd.startX;
            this.currentShape = new Rectangle(this.dnd.startX, this.dnd.startY, height, width, this.currLineWidth, this.currColour);
        } else if (this.currEditingMode == editingMode.line) {
            this.currentShape = new Line(this.dnd.startX, this.dnd.startY, this.dnd.endX, this.dnd.endY, this.currLineWidth, this.currColour);
        }
    }
};


