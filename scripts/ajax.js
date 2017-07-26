function doAjax(options) {
    //On définit les paramètres par défaut de notre requête
    let defaults = {
        url: '',
        method: 'GEt',
        async: true,
        args: '',
        callback: function() {},
        callbackError: function() {}

    }

    //On assigne les arguments d'options à défaults
    assignArgs(options, defaults);



    //On crée une nouvelle instance d'objet AJAX
    let ajax = new XMLHttpRequest();
    //AJAX étant une service asynchrone, il va falloir 
    //lui dire via des évènements comment se comporter
    //au moment où il aura terminé sa requête et que
    //sa reponse sera disponible
    ajax.onreadystatechange = function() {
        /*
         */
        if (ajax.readyState === 4) {
            //on ne voudra manipuler la réponse seulement si 
            //la requête s'est couronnée de succès
            if (ajax.status === 200 || ajax.status === 304) {
                //la réponse de la requête en lui fournissant ...
                //l'objet ajax dans sa proprieté response
                defaults.callback();
            } else {
                defaults.callbackError();
            }

        }

    };
    //On ouvre le requête en lui fournissant le type de
    //requête HTTP, l'url à requêter et si c'est synchrone ou non
    ajax.open(defaults.method, defaults.url, defaults.async);
    //On envoie la requête
    ajax.send(defaults.args);

    /*
    Fonction qui itère sur les propriétés d'un objet source,
    vérifie si l'objet target possède une propriété correspondante
    et si oui, assigne comme valeur de cette propriété target la valeur 
    de la propriété source.
    */
    function assignArgs(source, target) {
        for (let clef in source) {
            if (target.hasOwnProperty(clef)) {
                target[clef] = source[clef];
            }
        }
    }
}