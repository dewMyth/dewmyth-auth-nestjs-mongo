# How to use

1. Install the package

```bash
npm install dewmyth-auth-nestjs-mongo
```

2. Go to the NestJS module where you want to use the package and import the module and import the `AuthModule` from the library

```typescript
import { AuthModule } from 'dewmyth-auth-nestjs-mongo';
```

3. Add the `AuthModule` to the imports array of the module with the `mongoUri` property set to the uri of the mongo database you want to connect to

```typescript
  imports: [
    AuthModule.forRoot({
      mongoUri:
        'your-mongo-uri', // The uri to connect to the mongo database
    }),
  ],
```

4. Now you can use the `AuthService` in your module

5. Import the `AuthService` from the library to whatever the sevice or controller you want to use it in

```typescript
import { AuthService } from 'dewmyth-auth-nestjs-mongo';
```

6. Then inject the `AuthService` into the constructor of the service or controller

```typescript
  constructor(
    private readonly authService: AuthService,
  ) {}
```

7. Now you can use the `AuthService` to create a user and login a user

##### Create a User

A basic function that will accept the user's email, password, and username and return the created user. The created user will be saved on the mongodb database under the `users` collection. The password will be hashed using `bcrypt` before saving it to the database.

```typescript
  async createUser() {
    const newUser = await this.authService.createUser({
      email: 'sampleEmail@email.com'
      password: 'samplePassword',
      username: 'sampleUsername',
    });
  }
```

##### Login a User

A basic function that will accept the user's email and password and return the logged user. The function will check if the user exists in the database and if the password matches the hashed password in the database. If the user exists and the password matches, the user will be logged in and a token will be returned.

```typescript
  async loginUser() {
    const loggedUser = await this.authService.loginUser({
      email: 'sampleEmail@email.com'
      password: 'samplePassword',
    });
  }
```

Optionally you can pass the JWT secret and the JWT expiration time in the options object. The default JWT secret

```typescript
  async loginUser() {
    const loggedUser = await this.authService.loginUser({
      email: 'sampleEmail@email.com'
      password: 'samplePassword',
    },
  'sampleSecret', // The JWT secret
  '1h', // The JWT expiration time, Please refere JWT documentation for more information
    );
  }
```
