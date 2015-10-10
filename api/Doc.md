# POST	/api/v1/auth
Utilisé pour récupérer le token de l'utilisateur
#### Parameters

email
password

---

## POST	/api/v1/user
---
Utilisé pour créer un utilisateur

user[email]
user[password]
user[last_name]
user[first_name]

## GET	/api/v1/user/:id
Affiche les infos de l'user
#### Parameters
id (dans le GET)

---


# PATCH	/api/v1/user/:id
Permet d'éditer un utilisateur
#### Parameters
user[id] (dans le get)
user[email] (optionnel)
user[password] (idem)
user[name] (idem)
user[surname] (idem)
...

---

# PUT	/api/v1/user/:id
Pareil que patch

---
# DELETE	/api/v1/user/:id
Supprime un utilisateur (id dans l'adresse)

## POST	/api/v1/user/search
---
Utilisé pour chercher un utilisateur

email
