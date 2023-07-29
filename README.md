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
