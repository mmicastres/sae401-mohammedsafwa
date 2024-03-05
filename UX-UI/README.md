# Dossier UX

## Membres du groupe :
- Alshanqiti Mohammed
- Djelabi Safwa

## Description générale de l'application :

Application web et mobile permettant d'explorer la biodiversité des insectes et d'en apprendre davantage sur leur rôle crucial dans l'écosystème. 
Le but est de photographier et de collectionner des insectes trouvés dans l'environnement autour de l'utilisateur, et de compléter petit à petit le catalogue et les catégories d'insectes proposés sur l'application. Un utilisateur au catalogue complet d'insectes référencé sur notre application ainsi qu'à son profil avec tous les insectes collectionnés et ses informations personnelles. Il pourra également utiliser un bouton "photo" dans le menu pour continuer sa collection.


## Design système retenu : 


Nos choix se portaient sur les design system suivants : Base et Fluent 2.
Le secteur d’activité d’Uber étant directement lié au services aux clients, leur design system transmet une atmosphère plus familière que notre second choix “Fluent 2” de Microsoft. Celui-ci étant bien plus rigide notamment dans l’absence de rondeur. 
Ainsi, nous avons choisi le design system “Base” de Uber que nous considérons plus correspondant à la thématique de notre application.

## Fonctionnalités / Écrans :

1. **Écran d’accueil :**
   - Page minimaliste mettant en avant le titre de l'application et des éléments décoratifs illustrant le thème.
   - Bouton d'activation pour démarrer l'utilisation ou visualiser la collection une fois connecté.
   - Écran simple, mise en avant de la thématique de l’application grâce aux vecteurs d’insectes sur la page et au bouton minimaliste. Nous cherchons à mettre en avant le style graphique et l’application elle-même.
Pas d’animations en version desktop car cette page est le point d’entrée de l’application. Nous intégrerons cependant une animation sur la version mobile afin de dynamiser la première impression de l’utilisateur lors de l’ouverture de l’application. 

2. **Écran du catalogue :**
   - Utilise des cartes pour afficher les insectes avec des options de tri par type et taille.
   - Barre de recherche pour faciliter la recherche parmi les insectes.
   - Design aéré intégrant un logo d’insecte et contenant des icônes sur chaque insecte. Le design est basé sur des composants prenant une place importante sur la page afin de renforcer l'idée et les points forts du design de base et son aspect familier. Il est aussi important de se rappeler que l’application a pour but premier une fonction éducative, il est donc important que l’information sur l’insecte soit au cœur du design. 
En termes d’animations, il n’y en aura pas sur PC mais sur mobile il y aura un loading au ‘tap’ sur les recherches.

3. **Écran des détails d’un insecte :**
   - Affiche les informations détaillées de l'insecte dans un dropdown.
   - Intègre une section avec la photo de l'insecte en question.
   - Encore une fois un design simple et aéré avec un minimum d’informations donnés à l'utilisateur afin de ne pas le surcharger. Cet écran reprend les mêmes codes que les écrans précédents, il en va de même pour la question des animations .

4. **Écran de la collection de l’utilisateur :**
   - Présente la collection d'insectes sous forme de galerie avec une barre de progression (excepté sur mobile).
   - Permet à l'utilisateur de suivre sa progression dans la collection.
   - Très similaire à l’écran précédent dans son layout, cet écran intègre le minimum d’information de manière simple et limpide respectant le design system et l’image “simple” et “friendly” de base.

5. **Écran de l’espace utilisateur :**
   - Autorise la modification du pseudo, de l'email, du mot de passe, de la langue de l’application et offre la possibilité de supprimer son compte.
   - Aucun changement significatif sur mobile, à l'exception de la navigation.
   - L’écran intègre du texte et des inputs afin de modifier les informations citées ci-dessus. Les seules animations seront celles des modales en overlay avec un pop pour confirmer chaque action de l’utilisateur.

6. **Écran de prise de photo :**
   - Exclusivement sur mobile pour exploiter la fonctionnalité de l'appareil photo du téléphone.
   - Cet écran sera celui de l'appareil photo natif du téléphone, il héritera donc des animations propre au system de l’appareil et renverra les photos prises vers l’API.

7. **Écran de chargement de la photo :**
   - Uniquement sur mobile, rassure l'utilisateur en attente des résultats de la prise de photo.
  - L'écran de “post-capture” contenant seulement du texte et une icône  rassurant et indiquant à l'utilisateur que nous avons reconnu la capture d’un insecte. 
Il y aura une animation du loading en plus plus la vibration du téléphone comme feedback.

## Navigation :

Le menu est visible, offrant une expérience intuitive avec peu d'éléments à afficher. Sur mobile, une icône pour prendre des photos est ajoutée, soulignant l'importance de cette fonctionnalité.

### Autres moyens de navigation :
- Une flèche en haut à droite sur la version mobile permet de revenir en arrière facilement, évitant de repasser par le menu principal.

## Maquettes finales :

Les maquettes finales ont été élaborées en utilisant les design systems de Base et Fluent 2. Finalement, le choix s'est porté sur le design système de Base. Les maquettes peuvent être consultées ci-dessous : 

- base (choisi) (safwa) : [InsectiDex_base](https://www.figma.com/file/NfudSTFo1nVCHj6POoCjZA/InsectiDex_base?type=design&node-id=81%3A95774&mode=design&t=eVJ8XIbOk5PQHMzj-1)
- fluent (mohammed)  : [InsectiDex_fluent](https://www.figma.com/file/KxrfHTcQ61DZqhiUxeWRxP/InsectiDex_fluent?type=design&node-id=0%3A1&mode=design&t=iQWoLjAVvLuuLdBN-1)