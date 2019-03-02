'use strict'

const User = use('App/Models/User')

class AuthController {
    async login({ request, auth, response }) {
        const email = request.input("email");
        const password = request.input("password");
    
        try {
          let access_token = await auth.withRefreshToken().attempt(email, password);
          return response.status(200).json({
            access_token: access_token
          });
        } catch (err) {
          return response.status(403).json({
            message: err.message,
            status: "You need to register firts!"
          });
        }
      }
    
      async register({ auth, request, response }) {
		const { email, username, password } =  request.post()
			try {
				let user = new User()
				
				user.email = email
				user.username = username
				user.password = password
				
				await user.save()
				
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
            const refreshToken = request.input("refresh_token");
            return await auth.newRefreshToken().generateForRefreshToken(refreshToken);
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
}

module.exports = AuthController
