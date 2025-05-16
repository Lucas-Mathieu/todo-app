# 📱 TodoApp – Guide de démarrage

## 1. Cloner le projet

```sh
git clone https://github.com/Lucas-Mathieu/todo-app.git
cd TodoApp
```


---

## 2. Configuration de l’API (backend)

### a) Modifier l’adresse du serveur dans le frontend

Dans `TodoApp/services/TaskApiService.ts`, modifie :

```js
const API_URL = 'http://VOTRE-IP:3001/tasks';
```

Remplace `VOTRE-IP` par l’IP locale de ton ordinateur (la même indiqué quand le projet est lancé avec expo "Metro waiting on exp://xxx.xxx.xxx.xxx:8081").

### b) Installer les dépendances backend

```sh
cd todo-api
npm install
```

### c) Lancer le serveur API

```sh
npx ts-node server.ts
```

Le serveur écoute sur `http://localhost:3001`.

---

## 3. Lancer l’application mobile

### a) Installer les dépendances

```sh
cd ../TodoApp
npm install
```


### b) Démarrer en mode développement natif (recommandé pour les notifications)

```sh
npx expo run:android
```

ou

```sh
npx expo run:ios
```


### c) Pour des tests rapides (sans notifications natives)

```sh
npm start
```

et scanne le QR code avec Expo Go.

---

## 4. Utilisation

- **Ajoute, édite, complète, supprime des tâches**
- **Les tâches sont synchronisées avec le backend**
- **La date d’échéance (dueDate) est gérée et affichée dans l'écran de détail**

---


## 5. Dépannage

- **Erreur de connexion API** : vérifie l’IP dans `TaskApiService.ts` et que le serveur est bien lancé.
- **Notifications** : privilégie le build natif (`expo run:android`), Expo Go ne supporte pas toutes les fonctionnalités natives.
- **Problème de dépendances** : supprime `node_modules` et relance `npm install`.

---

## 6. Structure du projet

```
TodoApp/
  app/
  components/
  context/
  hooks/
  services/
  ...
todo-api/
  prisma/
    schema.prisma
    dev.db
  server.ts
  ...
```

