const {
  getCompanyProfileById,
  postCompanyProfile,
  patchCompanyProfile,
  deleteCompanyProfile
} = require("../model/companyProfile")
const helper = require("../helper/index")
const fs = require("fs");
const { getUserById, patchUser } = require("../model/users");
module.exports = {
  getCompanyProfileById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getCompanyProfileById(id)

      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Succes get Company Profile By Id",
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `Company Profile By Id : ${id} Not Found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  postCompanyProfile: async (request, response) => {
    try {
      const { user_id,profile_name, profile_field, profile_city, profile_desc,profile_email,profile_instagram,profile_telp,profile_linkedin } = request.body
      const setData = {
        user_id,
        profile_name,
        profile_img :request.file === undefined ? "" : request.file.filename,
        profile_field,
        profile_city,
        profile_desc,
        profile_email,
        profile_instagram,
        profile_telp,
        profile_linkedin,
        profile_created_at: new Date(),
      }
      if (setData.user_id === "") {
          return helper.response(response, 404, ` Input user id`)
        } else if (setData.profile_name === "") {
          return helper.response(response, 404, ` Input name`)
        } else if (setData.profile_field === "") {
          return helper.response(response, 404, ` Input field`)
        } else if (setData.profile_city === "") {
          return helper.response(response, 404, ` Input your city`)
        } else if (setData.profile_desc === "") {
          return helper.response(response, 404, ` Input description`)
        } else if (setData.profile_email === "") {
          return helper.response(response, 404, ` Input your email`)
        } else if (!setData.profile_email.match('@')) {
          return helper.response(response, 404, ` Missing character '@'`)
        } else if (setData.profile_instagram === "") {
          return helper.response(response, 404, ` Input yout instagram`)
        } else if (setData.profile_telp === "") {
          return helper.response(response, 404, ` Input your telephone`)
        } else if (setData.profile_linkedin === "") {
          return helper.response(response, 404, ` Input your linkedin`)
        } else {
        const result = await postCompanyProfile(setData)
        return helper.response(response, 201, "Company Profile Created", result);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  patchCompanyProfile: async (request, response) => {
    try {
      const { id } = request.params;
      const { user_id, company_name, profile_field, profile_city, profile_desc, profile_email, profile_instagram, user_phone, profile_linkedin } = request.body
      const checkUser = await getUserById(user_id)
      const checkId = await getCompanyProfileById(id)
      if (checkId.length > 0  && checkUser.length > 0 ) {
        const setDataUser = {
          company_name,
          user_phone
        }
        await patchUser(setDataUser, user_id)
        const setDataProfile = {
          profile_field,
          profile_city,
          profile_desc,
          profile_email,
          profile_instagram,
          profile_linkedin,
          profile_updated_at: new Date(),
        }
        const result = await patchCompanyProfile(setDataProfile, id);
        return helper.response(response, 201, 'Profile Updated', result)
      } else {
        return helper.response(response, 404, `Profile By Id: ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  patchImageCompanyProfile: async (request, response) => {
    const { id } = request.params
    try {
      const setData = {
        profile_img: request.file.filename
      }
      const checkId = await getCompanyProfileById(id)
      if (checkId.length > 0) {
        if (checkId[0].profile_img === 'blank-profile.jpg' || request.file == undefined) {
          const result = await patchCompanyProfile(setData, id)
          return helper.response(response, 201, 'Profile Updated', result)
        } else {
          fs.unlink(`./uploads/${checkId[0].profile_img}`, async (error) => {
            if (error) {
              throw error
            } else {
              const result = await patchCompanyProfile(setData, id)
              return helper.response(response, 201, 'Profile Updated', result)
            }
          })
        }
      }
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, "Bad Request", error)
    }
  }
}