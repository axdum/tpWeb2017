# Conception
## modèle MVC
Ce modèle permet d'ajouter de nouvelles formes facilement.
### model.js
"Classes" modèles, on définit des formes et leurs attributs nécessaires à leur dessin. 
### view.js
Fait le lien entre le code html et le controlleur selon les choix de l'utilisateur.
### controller.js
Manipule nos objets "Model" selon les attributs saisis par l"utilisateurs récupérés dans view.js
### interaction.js
Gestion du Drag and Drop, de ses coordonnées.
### canvas.html
La vue, l'interface utilisateur.
## fonctionnalité Redraw à la place de undo/redo
Un undo correspond à une supression ou création de forme. Vu que la suppression est déja disponible sur l'interface,
on n'a donc un seul type de commande à rejouer et il est inutile de stacker des commandes typées.
C'est pour cela que j'ai fait le choix d'un seul bouton redraw qui permet juste de redessiner les formes supprimée qui sont archivées dans un tableau.
