const {
  getAllExp,
  getExpById,
  getExpByExpId,
  postExp,
  patchExp,
  deleteExp
} = require("../model/experience")

const helper = require("../helper/index")
const { request, response } = require("express")

module.exports = {
  getExpById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getExpById(id)

      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Succes get experience By Id",
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `Experience By Id : ${id} Not Found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  postExp: async (request, response) => {
    try {
      const { user_id, exp_position, exp_company, exp_date, exp_desc } = request.body
      const setData = {
        user_id,
        exp_position,
        exp_company,
        exp_date,
        exp_desc,
        exp_created_at: new Date(),
      }
      if (setData.exp_position === "") {
        return helper.response(response, 404, ` Input position`)
      } else if (setData.exp_company === "") {
        return helper.response(response, 404, ` Input company`)
      } else {
        const result = await postExp(setData)
        return helper.response(response, 200, "Experience Added", result);
      }
    } catch (error) {
        console.log(error)
        return helper.response(response, 400, "Bad Request", error);
    }
  },
  patchExp: async (request, response) => {
    try {
      const { id } = request.params
      const { exp_position, exp_company, exp_date, exp_desc } = request.body
      const setData = {
        exp_position,
        exp_company,
        exp_date,
        exp_desc,
        exp_updated_at: new Date(),
      }
      if (setData.exp_position === "") {
        return helper.response(response, 400, ` Input your Position`)
      } else if (setData.exp_company === "") {
        return helper.response(response, 400, ` Input your Company`)
      } else {
        const checkId = await getExpByExpId(id)
        if (checkId.length > 0) {
          const result = await patchExp(setData, id)
          return helper.response(response, 200, "Experience updated", result)
        } else {
          return helper.response(response, 404, "Not found")
        }
      }
    } catch (error) {
      console.log(error);
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  deleteExp: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await deleteExp(id);
      return helper.response(response, 200, "Experience deleted", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
}
