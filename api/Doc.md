## POST	/api/v1/auth
Utilisé pour récupérer le token de l'utilisateur
#### Parameters

email
password

---

## POST	/api/v1/user
Utilisé pour créer un utilisateur
#### Parameters

user[email]  
user[password]  
user[last_name]  
user[first_name]  

## GET	/api/v1/user/:id
Affiche les infos de l'user
#### Parameters

id (dans le GET)

---


## PATCH	/api/v1/user/:id
Permet d'éditer un utilisateur
#### Parameters
user\[email\]  
user\[password\]  
user\[name\]  
user\[surname\]   

---

## PUT	/api/v1/user/:id
Pareil que patch

---
## DELETE	/api/v1/user/:id
Supprime un utilisateur (id dans l'adresse)

## POST	/api/v1/user/search
---
Utilisé pour chercher un utilisateur
#### Parameters

email

## POST	/api/v1/user_position
---
Utilisé pour créer une position
#### Parameters

position\[longitude\]  
position\[latitude\]  

## GET /api/v1/friends
---
Récupère la liste de ses amis
#### Parameters

##GET  /api/v1/invites/:invite_id/accept
---
Accepte l'invitation d'amitié invite_id

##GET  /api/v1/invites/:invite_id/deny
---
Refuse l'invitation d'amitié invite_id

##GET /api/v1/invites
---
Récupère la liste des invitations envoyées

##GET /api/v1/requests
---
Récupère la liste des invitations reçues

