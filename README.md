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

```typescript
  async loginUser() {
    const loggedUser = await this.authService.loginUser({
      email: 'sampleEmail@email.com'
      password: 'samplePassword',
    });
  }
```
