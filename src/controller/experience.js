const {
  getAllExp,
  getExpById,
  postExp,
  patchExp,
} = require("../model/experience")

const helper = require("../helper/index")
const { request, response } = require("express")

module.exports = {
  getAllExp: async (request, response) => {
    try {
      const result = await getAllExp()
      return helper.response(response, 200, "Success get Experience", result)
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
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
      const { exp_position, exp_company, exp_date, exp_desc } = request.body
      const setData = {
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
        return helper.response(response, 201, "Experience Created", result);
      }
    } catch (error) {
      console.log(error)
      //   return helper.response(response, 400, "Bad Request", error);
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
        return helper.response(response, 404, ` Input your Position`)
      } else if (setData.exp_company === "") {
        return helper.response(response, 404, ` Input your Company`)
      } else {
        const checkId = await getExpById(id)
        if (checkId.length > 0) {
          const result = await patchExp(setData, id)
          return helper.response(response, 200, "Patch Done", result)
        } else {
          return helper.response(response, 404, "Not found", result)
        }
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
}
