# Nodejs-mongodb

## Description de l'API

L'API gère des restaurants, les réservations et permet de suivre les ventes réalisées dans les restaurants. Elle offre un système d'authentification.

### Fonctionnalités

#### Plats

- Ajouter un plat : `POST /api/dishes`
- Mettre à jour un plat : `PUT /api/dishes/{id}`
- Lister les plats : `GET /api/dishes`
- Supprimer un plat : `DELETE /api/dishes/{id}`

#### Restaurants

- Ajouter un restaurant : `POST /api/restaurants`
- Mettre à jour un restaurant : `PUT /api/restaurants/{id}`
- Lister les restaurants : `GET /api/restaurants`
- Récupérer un restaurant : `GET /api/restaurants/{id}`
- Supprimer un restaurant : `DELETE /api/restaurants/{id}`

#### Réservations

- Ajouter une réservation : `POST /api/bookings/new-booking`
- Mettre à jour un réservation : `PUT /api/bookings/{id}`
- Lister les réservations : `GET /api/bookings`
- Récupérer une réservation : `GET /api/bookings/{id}`
- Supprimer une réservation : `DELETE /api/bookings/{id}`

#### Ventes

Les routes de ventes sont protégées.

- Ajouter une vente : `POST /api/sales`
- Mettre à jour une vente : `PUT /api/sales/{id}`
- Lister les ventes (toutes les ventes ou les ventes sur une période donnée) : `GET /api/sales?startDate={startDate}&endDate={endDate}`
- Récupérer une vente : `GET /api/sales/{id}`
- Supprimer une vente : `DELETE /api/sales/{id}`
- Récupérer la meilleure vente : `GET /api/sales/best-sale`
- Récupérer le montant total de toutes les ventes : `GET /api/sales/total-amount`

#### Utilisateurs

- Ajouter un utilisateur : `POST /api/users`
- Mettre à jour un utilisateur : `PUT /api/users/{id}`
- Lister les utilisateurs : `GET /api/users`
- Récupérer un utilisateur : `GET /api/users/{id}`
- Supprimer un utilisateur : `DELETE /api/users/{id}`

#### Authentification

- S'authentifier : `POST /api/auth/login`

#### Vérificatiion de formulaires

Pour vérifier notre formulaire de connexion , nous avons utilisé le package express-validator.

#### Gestion des erreurs

Pour la gestion des erreurs, nous avons créé un fichier 'logger.js', et nous avons utilisé le package 'winston'. On génère un fichier 'error.log' qui répertorie toutes les erreurs de notre projet.

## Technologies

- Nodejs - version : 18
- Express - version : 4
- Mongoose - version : 7

## Installation

### Variables d'environnement

Créer un fichier .env à la racine avec les informations suivantes :

    DB_PORT=<PORT>
    JWT_SECRET="<SECRET>"
    DB_URI="<DATABASE_URI>"

### Démarrage

Installer les dépendances :

     yarn install

Lancer l'application :

    yarn dev

### Les cinq grands principes REST

Les cinq grands principes de REST, également connus sous le nom de contraintes REST, sont des principes clés qui définissent l'architecture d'un système basé sur l'approche REST (Representational State Transfer). Ces principes, définis par Roy Fielding dans sa thèse de doctorat en 2000, sont utilisés pour concevoir des API Web de manière cohérente et performante. Voici les cinq grands principes REST :

1. **Interface uniforme** :
   L'interface uniforme est le principe fondamental de REST. Il définit un ensemble d'actions cohérentes que les clients peuvent utiliser pour interagir avec les ressources du serveur. Les quatre contraintes qui définissent l'interface uniforme sont :

   - **Identification des ressources** : Chaque ressource (donnée) doit être identifiée de manière unique à l'aide d'une URI (Uniform Resource Identifier).

   - **Manipulation des ressources par les représentations** : Les clients interagissent avec les ressources en utilisant les représentations (par exemple, JSON, XML) qui leur sont fournies par le serveur.

   - **Messages auto-descriptifs** : Chaque requête (GET, POST, PUT, DELETE, etc.) doit contenir suffisamment d'informations pour être comprise par le serveur, sans nécessiter de contexte supplémentaire.
   - exemple d'une requête GET de notre projet
     /\*\*

- Get all bookings in the db
- @param {\*} req
- @param {_} res
  _/
  export async function getBookings(req, res) {
  try {
  const booking = await Bookings.find();
  res.status(200).json(booking);
  } catch (error) {
  res.status(500).json({ error: error.toString() });
  }
  }

  - **Hyperliens** : Le serveur fournit des hyperliens dans les réponses pour permettre aux clients de découvrir les ressources liées.

2. **Sans état (Stateless)** :
   Chaque requête du client au serveur doit contenir toutes les informations nécessaires pour comprendre et traiter la requête. Le serveur ne conserve pas l'état de la session client entre les requêtes. Toutes les informations nécessaires pour comprendre la requête doivent être contenues dans la requête elle-même ou dans les données stockées côté serveur.

3. **Client-Serveur (Client-Server)** :
   REST suit le modèle client-serveur, où le client et le serveur sont complètement séparés. Le client est responsable de l'interface utilisateur et des interactions utilisateur, tandis que le serveur est responsable de la logique métier et du stockage des données. Cette séparation des responsabilités facilite l'évolutivité et la maintenance du système.

4. **Cache** :
   REST encourage l'utilisation du cache pour améliorer les performances. Les réponses des requêtes peuvent être mises en cache côté client ou côté serveur, ce qui permet de réduire la charge sur le serveur et d'améliorer la vitesse de réponse pour les requêtes ultérieures.

5. **Système à états représentationnels (Stateful Representation)** :
   Cela signifie que les représentations (par exemple, les réponses JSON ou XML) transmises par le serveur contiennent suffisamment d'informations pour que le client puisse comprendre l'état actuel de la ressource. Le client peut donc naviguer et interagir avec le serveur en utilisant uniquement les représentations qu'il reçoit.
