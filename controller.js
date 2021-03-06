var editingMode = {rect: 0, line: 1, circle: 3};

function Pencil(ctx, drawing, canvas) {
    this.currEditingMode = editingMode.line;
    this.currLineWidth = 5;
    this.currColour = '#000000';
    this.currentShape = 0;
    this.dnd = new DnD(canvas, this);

    // Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.

    /**
     * Récupère les attributs saisis par l'user.
     */
    this.setDrawingAttr = function () {
        if (document.getElementById('butRect').checked) {
            this.currEditingMode = editingMode.rect;
        } else if (document.getElementById('butLine').checked) {
            this.currEditingMode = editingMode.line;
        } else if (document.getElementById('butCircle').checked) {
            this.currEditingMode = editingMode.circle;
        }
        this.currLineWidth = document.getElementById('spinnerWidth').value;
        this.currColour = document.getElementById('colour').value;
    }

    // Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd

    /**
     * Instancier une forme lors d'un clic dans la zone de dessin.
     * @type {any}
     */
    this.onInteractionStart = function () {
        this.setDrawingAttr();
        switch (this.currEditingMode) {
            case editingMode.rect:
                this.currentShape = new Rectangle(this.dnd.startX, this.dnd.startY, 0, 0, this.currLineWidth, this.currColour);
                break;
            case editingMode.line:
                this.currentShape = new Line(this.dnd.startX, this.dnd.startY, this.dnd.startX, this.dnd.startY, this.currLineWidth, this.currColour);
                break;
            case editingMode.circle:
                this.currentShape = new Circle(this.dnd.startX, this.dnd.startY, 0, 0, this.currLineWidth, this.currColour)
                break;
        }
    }.bind(this);

    /**
     * Mettre à jour la forme lors d'un Drag.
     * @type {any}
     */
    this.onInteractionUpdate = function () {
        this.createShape();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawing.paint(ctx, canvas);
        this.currentShape.paint(ctx, canvas);
    }.bind(this);

    /**
     * Mettre à jour la forme lorsque l'on relache le clic.
     * @type {any}
     */
    this.onInteractionEnd = function () {
        this.createShape();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawing.addShape(this.currentShape);
        drawing.paint(ctx, canvas);
        this.currentShape = 0;
        drawing.updateShapeList();
    }.bind(this);

    /**
     * Créer la forme correspondante au mode d'édition.
     */
    this.createShape = function () {
        switch (this.currEditingMode) {
            case editingMode.rect:
                var height = this.dnd.endY - this.dnd.startY;
                var width = this.dnd.endX - this.dnd.startX;
                this.currentShape = new Rectangle(this.dnd.startX, this.dnd.startY, height, width, this.currLineWidth, this.currColour);
                break;
            case editingMode.line:
                this.currentShape = new Line(this.dnd.startX, this.dnd.startY, this.dnd.endX, this.dnd.endY, this.currLineWidth, this.currColour);
                break;
            case editingMode.circle:
                var x = this.dnd.endX - this.dnd.startX;
                var y = this.dnd.endY - this.dnd.startY;
                var radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
                this.currentShape = new Circle(this.dnd.startX, this.dnd.startY, radius, this.currLineWidth, this.currColour)
                break;
        }
    }
};


