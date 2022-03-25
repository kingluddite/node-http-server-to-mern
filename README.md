# Generate Secret
* [allkeysgenrator.com](https://allkeysgenerator.com/)
## JWT encryption 256
![256 encryption](https://i.imgur.com/xKq9Ett.png)

## .env
* Set both in .env
  * duration (when JWT expires)
  * and jwt secret

`.env` (will look like this)

```
MONGO_URI=mongodb+srv://myadmin:GeZvZhnR3w0AvCsD@devconnector.a2gjt.mongodb.net/JOBS-API-DB?retryWrites=true&w=majority
JWT_SECRET=r4u7x!A%D*G-KaPdSgVkYp2s5v8y/B?E
JWT_LIFETIME=30d
```

## Update our code to use these environment variables
`models/User.js`

```
// MORE CODE

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
}

// MORE CODE
```

## TEST
* Test in PM to make sure it works as it did before


