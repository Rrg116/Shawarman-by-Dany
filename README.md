# Shawarman by Dany

Site vitrine + précommande de shawarmas, compatible avec GitHub Pages.

## Fonctionnement

- Shawarman classique : 1 000 FCFA
- Retrait sur place
- Précommande obligatoire au moins 4 heures à l'avance
- La commande est transformée en message WhatsApp

## Configurer le numéro WhatsApp

1. Ouvre `script.js`.
2. Cherche :

```js
const WHATSAPP_NUMBER = "237XXXXXXXXX";
```

3. Remplace `237XXXXXXXXX` par le numéro WhatsApp qui doit recevoir les commandes.
4. Utilise le format international sans `+`, sans espaces et sans tirets.

Exemple :

```js
const WHATSAPP_NUMBER = "2376XXXXXXXX";
```

## Publier sur GitHub Pages

1. Crée un nouveau repository GitHub.
2. Envoie `index.html`, `style.css` et `script.js`.
3. Dans le repository : **Settings → Pages**.
4. Choisis **Deploy from a branch**.
5. Sélectionne la branche `main` et le dossier `/root`.
6. Enregistre.
7. GitHub fournira l'adresse publique du site.

## Important

Le bouton WhatsApp ouvre WhatsApp avec la commande déjà remplie. Le client doit appuyer sur **Envoyer** dans WhatsApp.

Le site ne nécessite aucune base de données ni hébergement serveur pour cette première version.
