'use strict'

const User = use('App/Models/User')
const Profile = use('App/Models/Profile')
const Hash = use("Hash");

class AuthController {
    async login({ request, auth, response }) {
        const email = request.input("email");
        const password = request.input("password");

        let user;
        let customPayload;
        user = await User.findBy("email", email);
        if (!user) {
          return response.status(403).json({
            msg: "You are not registered!"
          });
        }

        const isSame = await Hash.verify(password, user.password);

        if (isSame) {
          customPayload = {
            email: user.email,
          };
        } else {
          return response.status(403).json({
            msg: "Your password is wrong!"
          });
        }

        try {
          let access_token = await auth
            .withRefreshToken()
            .generate(user, customPayload);
          return response.status(200).json({
            user: user,
            access_token: access_token
          });
        } catch (error) {
          return response.status(403).json({
            msg: "You need to register firts!"
          });
        }
    }

    
    async register({ auth, request, response }) {
      const { email, username, password } =  request.post()
        try {
          let user = new User()
          let profile = new Profile()

          user.email = email
          user.username = username
          user.password = password
          
          await user.save()
          profile.user_id = user.id
          profile.name = user.username

          await profile.save()
          
          let accessToken = await auth.withRefreshToken().generate(user);
          return {
            user,
            access_token: accessToken
          }
        } catch(e) {
          switch(e.code) {
            case 'ER_DUP_ENTRY':
              return response.status(500).send({
                status: 'failed',
                message: 'Username or Email already taken!'
              })
            break
            default:
              return response.status(400).send({
                status: 'failed',
                message: e.code
              })
            break
          }
			  }
    }
    
  
    async refreshToken({ request, auth }) {
      const email = request.input("email");
      const refreshToken = request.input("refresh_token");
  
      let user = await User.findBy("email", email);
  
      let customPayload = {
        email: user.email,
       
      };
  
      return await auth
        .newRefreshToken()
        .generateForRefreshToken(refreshToken, customPayload);
    }
  

    async logout({ auth, response }) {
          const apiToken = auth.getAuthHeader();
          await auth
                  .authenticator('jwt')
                  .revokeTokens([apiToken])
          return response.send({ message: 'Logout successfully '})
    }

    async profile({ request, auth, response }) {
        try {
            let profile = await auth.getUser();
            response.status(200).json(profile);
        } catch (error) {
            response.send("Missing or invalid jwt token");
        }
    }

    async accountCheck({request, auth, response}){
      try {
        let user = await auth.getUser();
        response.status(200).json(user);
      } catch (error) {
        response.send({message: "You Must Login First!"})
      }
    }
}

module.exports = AuthController
