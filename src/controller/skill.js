const {
  getAllSkill,
  getSkillById,
  postSkill,
  patchSkill,
  deleteSkill
} = require("../model/skill")

const helper = require("../helper/index")
const { request, response } = require("express")

module.exports = {
  getAllSkill: async (request, response) => {
    try {
      const result = await getAllSkill()
      return helper.response(response, 200, "Success get Skill", result)
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  getSkillById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getSkillById(id)

      if (result.length > 0) {
        return helper.response(response, 200, "Succes get skill By Id", result)
      } else {
        return helper.response(response, 404, `Skill By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  postSkill: async (request, response) => {
    try {
      const { user_id, skill_name } = request.body
      const setData = {
        user_id,
        skill_name,
        skill_created_at: new Date(),
      }
      if (setData.user_id === "") {
        return helper.response(response, 404, ` Input id`)
      } else if (setData.skill_name === "") {
        return helper.response(response, 404, ` Input skill`)
      } else {
        const result = await postSkill(setData);
        return helper.response(response, 201, "Skill Created", result);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  patchSkill: async (request, response) => {
    try {
      const { id } = request.params
      const { user_id, skill_name } = request.body;
      const setData = {
        user_id,
        skill_name,
        skill_created_at: new Date(),
      }
      if (setData.user_id === "") {
        return helper.response(response, 404, ` Input id`)
      } else if (setData.skill_name === "") {
        return helper.response(response, 404, ` Input skill`)
      } else {
        const checkId = await getSkillById(id)
        if (checkId.length > 0) {
          const result = await patchSkill(setData, id)
          return helper.response(response, 200, "Patch Done", result)
        } else {
          return helper.response(response, 404, "Not found", result)
        }
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  deleteSkill: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await deleteSkill(id);
      return helper.response(response, 200, "Delete Done", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
}
