// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
    // Définir ici les attributs de la 'classe'
    this.initX = 0;
    this.initY = 0;
    this.endX = 0;
    this.endY = 0;
    this.pressed = false;

    // Developper les 3 fonctions gérant les événements
    // Pression
    this.down = function (evt) {
        this.pressed = true;
        this.initX = getMousePosition(canvas, evt).x;
        this.initY = getMousePosition(canvas, evt).y;
        console.log("Mouse down, initial position : [" + this.initX + "," + this.initY + "]");
    }.bind(this);

    // Mouvement
    this.move = function (evt) {
        if (this.pressed) {
            this.endX = getMousePosition(canvas, evt).x;
            this.endY = getMousePosition(canvas, evt).y;
            console.log("Moving mouse, position : [" + this.endX + "," + this.endY + "]");
        }
    }.bind(this);

    // Relâchement
    this.up = function (evt) {
        if (this.pressed) {
            this.endX = getMousePosition(canvas, evt).x;
            this.endY = getMousePosition(canvas, evt).y;
            this.pressed = false;
            console.log("Mouse up, end position : [" + this.endX + "," + this.endY + "]");
        }
    }.bind(this);

    // Associer les fonctions précédentes aux évènements du canvas.
    canvas.addEventListener('down', this.up);
    canvas.addEventListener('move', this.move);
    canvas.addEventListener('up', this.up);
};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
};



