// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
    // Définir ici les attributs de la 'classe'

    this.startX = 0; // Coordonnée X lors du clic.
    this.startY = 0; // Coordonnée Y lors du clic.
    this.endX = 0; // Coordonnée X lors du relachement.
    this.endY = 0; // Coordonnée Y lors du relachement.
    var pressed = false; // Le clic gauche est pressé ou non.

    // Developper les 3 fonctions gérant les événements
    // Pression

    /**
     * Met à jour les coordonnées lors du clic.
     * @type {any}
     */
    this.down = function (evt) {
        pressed = true;
        var coord = getMousePosition(canvas, evt);
        this.startX = coord.x;
        this.startY = coord.y;
        console.log("Mouse down, initial position : [" + this.startX + "," + this.startY + "]");
        interactor.onInteractionStart(this);
    }.bind(this);

    // Mouvement

    /**
     * Met à jour les coordonnées lors du drag.
     * @type {any}
     */
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

    /**
     * Met à jour les coordonnées lors du relachement du clic.
     * @type {any}
     */
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


/**
 * Place le point de l'événement evt relativement à la position du canvas.
 * @param canvas le canvas
 * @param evt l'évènement
 * @returns {{x: number, y: number}} les coordonnées de la position de la souris
 */
function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
};



