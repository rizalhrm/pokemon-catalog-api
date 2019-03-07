'use strict'

const Profile = use("App/Models/Profile");

class ProfileController {
    async getProfile({ request, params, response }) {
        let user_id = params.uid;
        try {
          let profile = await Profile.findBy("user_id", user_id);
          return response.status(200).json(profile);
        } catch (error) {
          return response.json(error);
        }
      }
    
      async updateProfile({ request, response }) {
        let user_id = request.input("user_id");
        let name = request.input("name");
        let birth_date = request.input("birth_date");
        let gender = request.input("gender");
    
        let checkProf = await Profile.findBy("user_id", user_id);
    
        if (checkProf) {
          try {
            checkProf.name = name;
            checkProf.birth_date = birth_date;
            checkProf.gender = gender;
    
            checkProf.save();
            return response.status(200).json(checkProf);
          } catch (error) {
            return response.json(error);
          }
        } else {
          try {
            let profile = new Profile();
            profile.user_id = user_id;
            profile.name = name;
            profile.birth_date = birth_date;
            profile.gender = gender;
    
            profile.save();
            return response.status(200).json(profile);
          } catch (error) {
            return response.json(error);
          }
        }
      } 
}

module.exports = ProfileController
