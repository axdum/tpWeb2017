// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
    // Définir ici les attributs de la 'classe'
    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;
    var pressed = false;

    // Developper les 3 fonctions gérant les événements
    // Pression
    this.down = function (evt) {
        pressed = true;
        var coord = getMousePosition(canvas, evt);
        this.startX = coord.x;
        this.startY = coord.y;
        console.log("Mouse down, initial position : [" + this.startX + "," + this.startY + "]");
        interactor.onInteractionStart(this);
    }.bind(this);

    // Mouvement
    this.move = function (evt) {
        if (pressed) {
            var coord = getMousePosition(canvas, evt);
            this.endX = coord.x;
            this.endY = coord.y;
            console.log("Moving mouse, position : [" + this.endX + "," + this.endY + "]");
            interactor.onInteractionUpdate(this);
        }
    }.bind(this);

    // Relâchement
    this.up = function (evt) {
        if (pressed) {
            var coord = getMousePosition(canvas, evt);
            this.endX = coord.x;
            this.endY = coord.y;
            interactor.onInteractionEnd(this);
            pressed = false;
            console.log("Mouse up, end position : [" + this.endX + "," + this.endY + "]");
        }
    }.bind(this);

    // Associer les fonctions précédentes aux évènements du canvas.
    canvas.addEventListener('mousedown', this.down, false);
    canvas.addEventListener('mousemove', this.move, false);
    canvas.addEventListener('mouseup', this.up, false);
};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
};



