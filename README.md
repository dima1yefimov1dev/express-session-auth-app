## FEAUTURES: 
-implemented auth app
-passport jwt and github strategies
-ejs views
-mongoDB, mongoose, express
-Oauth
-sessions

## How to start: 
1. intalling dependencies:
```bash
  npm ci
```

2. Create .env file in root folder and make variables there:

```bash
DB_URL= 'link to connect with your database'
PORT=3001
JWT_ACCESS_SECRET_KEY='secret for your token'
BCRYPT_SALT='salt ofr hashing password'
GITHUB_CLIENT_ID='github clientID'
GITHUB_CLIENT_SECRET="github secret"
GITHUB_CALLBACK_URL="github callback"
SESSION_SECRET='secret key for your session'
ALLOWED_ORIGIN='origin for CORS-policy from which requests are allowed'
```

3. Choose mode and start:

```bash
npm build - build project
npm start - start in prod after building
npm run dev - dev mode
```


## Endpoints:

| Method | Route              | Description                                 |
|--------|--------------------|---------------------------------------------|
| POST   | /auth/signup       | Register a new user                         |
| POST   | /auth/signin       | User login                                  |
| GET    | /auth/login        | GitHub authentication                       |
| GET    | /auth/github       | GitHub authentication callback              |
| GET    | /auth/logout       | User logout                                 |
| GET    | /users/            | Get all users                               |
| GET    | /users/:id         | Get user by ID                              |
| DELETE | /users/:id         | Delete user by ID                           |
