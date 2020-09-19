const {
    getCompanyProfile,
    getCompanyProfileById,
    postCompanyProfile,
    patchCompanyProfile,
    deleteCompanyProfile
  } = require("../model/companyProfile")
  
  const helper = require("../helper/index")
  const { request, response } = require("express")
  const fs = require("fs");
  
  module.exports = {
    getCompanyProfile: async (request, response) => {
      try {
        const result = await getCompanyProfile()
        return helper.response(response, 200, "Success get Company Profile", result)
      } catch (error) {
        return helper.response(response, 400, "Bad Request", error)
      }
    },
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
        // console.log(error)
        return helper.response(response, 400, "Bad Request", error);
      }
    },
    patchCompanyProfile: async (request, response) => {
        try {
          const { id } = request.params;
          const { user_id,profile_name, profile_field, profile_city, profile_desc,profile_email,profile_instagram,profile_telp,profile_linkedin } = request.body
            
          if (request.body.user_id === "") {
            return helper.response(response, 404, ` Input id`)
          } else if (request.body.profile_field === "") {
            return helper.response(response, 404, ` Input field`)
          } else {
            const checkId = await getCompanyProfileById(id)
            if (checkId.length > 0) {
              const setData = {
                user_id,
                profile_name,
                profile_img :request.file === undefined ? checkId[0].profile_img : request.file.filename,
                profile_field,
                profile_city,
                profile_desc,
                profile_email,
                profile_instagram,
                profile_telp,
                profile_linkedin,
                profile_updated_at: new Date(),
              }
              if (setData.profile_img === checkId[0].profile_img) {
                const result = await patchCompanyProfile(setData, id);
                return helper.response(
                  response,
                  200,
                  "Patch Done",
                  result
                );
              } else {
                const img = checkId[0].profile_img;
                fs.unlink(`./uploads/${img}`, async (error) => {
                if (error) {
                  throw error
                } else {
                  const result = await patchCompanyProfile(setData, id)
                  return helper.response(response, 201, "Patch Done", result)
                }
              })
              }
            } else {
              return helper.response(response, 404, `Profile By Id: ${id} Not Found`)
            }
          }
        } catch (error) {
            // console.log(error)
          return helper.response(response, 400, "Bad Request", error)
        }
      },
      deleteCompanyProfile: async (request, response) => {
        try {
          const { id } = request.params;
          const checkId = await getCompanyProfileById(id);
          if (checkId.length > 0) {
            fs.unlink(`./uploads/${checkId[0].profile_img}`, async (error) => {
              if (error) {
                throw error;
              } else {
                const result = await deleteCompanyProfile(id);
                return helper.response(response, 201, "Company Profile Deleted", result);
              }
            });
          } else {
            return helper.response(response, 404, ` Not Found`);
          }
        } catch (error) {
          return helper.response(response, 400, "Bad Request", error);
        }
      },
  }