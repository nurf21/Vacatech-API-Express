const {
  getProfile,
  getProfileById,
  getProfileCompanyById,
  getProfileWorkerById,
  getProfileCount,
  patchProfile
} = require("../model/profile")
const { getUserById, patchUser } = require('../model/users')
const fs = require("fs");
const helper = require("../helper/index")
const qs = require("querystring")

const getPrevLink = (page, currentQuery) => {
  if (page > 1) {
    const generatePage = {
      page: page - 1,
    };
    const resultPrevLink = { ...currentQuery, ...generatePage }
    return qs.stringify(resultPrevLink)
  } else {
    return null
  }
}

const getNextLink = (page, totalPage, currentQuery) => {
  if (page < totalPage) {
    const generatePage = {
      page: page + 1,
    }
    const resultNextLink = { ...currentQuery, ...generatePage }
    return qs.stringify(resultNextLink);
  } else {
    return null;
  }
}

module.exports = {
  getAllProfile: async (request, response) => {
    let { page, limit, search, sort } = request.query
    if (search === undefined || search === "") {
      search = "%"
    } else {
      search = "%" + search + "%"
    }
    if (sort === undefined || sort === "") {
      sort = `profile_id`
    }
    if (page === undefined || page === "") {
      page = parseInt(1)
    } else {
      page = parseInt(page)
    }
    if (limit === undefined || limit === "") {
      limit = parseInt(9)
    } else {
      limit = parseInt(limit)
    }
    page = parseInt(page)
    limit = parseInt(limit)
    let totalData = await getProfileCount()
    let totalPage = Math.ceil(totalData / limit)
    let offset = page * limit - limit
    let prevLink = getPrevLink(page, request.query)
    let nextLink = getNextLink(page, totalPage, request.query)
    const pageInfo = {
      page,
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3001/profile? ${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3001/profile? ${nextLink}`,
    }
    try {
      const result = await getProfile(search, sort, limit, offset);
      if (result.length > 0) {
        const newResult = {
          data: result,
          page: pageInfo,
        }
        return helper.response(
          response,
          200,
          "Succes get Profile",
          result,
          pageInfo
        )
      } else {
        return helper.response(
          response,
          404,
          "Profile not found",
          result,
          pageInfo
        )
      }
    } catch (error) {
        console.log(error);
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  getProfileById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getProfileById(id)
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Succes get profile By Id",
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `Profile By Id : ${id} Not Found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getProfileCompanyById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getProfileCompanyById(id)
      if (result.length > 0) {
        return helper.response(response, 200, "Succes get profile By Id", result)
      } else {
        return helper.response(response, 404, `Profile By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getProfileWorkerById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getProfileWorkerById(id)
      if (result.length > 0) {
        return helper.response(response, 200, "Succes get profile By Id", result)
      } else {
        return helper.response(response, 404, `Profile By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  patchProfile: async (request, response) => {
    try {
      const { id } = request.params;
      const { user_id, user_name, profile_job, job_type, profile_address, job_address, profile_instagram, profile_git, profile_desc } = request.body
      const checkUser = await getUserById(user_id)
      const checkId = await getProfileById(id)
      if (checkId.length > 0 && checkUser.length > 0) {
        const setDataUser = {
          user_name
        }
        await patchUser(setDataUser, user_id)
        const setDataProfile = {
          profile_job,
          job_type,
          profile_address,
          job_address,
          profile_instagram,
          profile_git,
          profile_desc,
          profile_updated_at: new Date(),
        }
        const result = await patchProfile(setDataProfile, id);
        return helper.response(response, 200, "Patch Done", result)
      } else {
        return helper.response(response, 404, `Profile By Id: ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  patchImageProfile: async (request, response) => {
    const { id } = request.params
    try {
      const setData = {
        profile_img: request.file.filename
      }
      const checkId = await getProfileById(id)
      if (checkId.length > 0) {
        if (checkId[0].profile_img === 'blank-profile.jpg' || request.file == undefined) {
          const result = await patchProfile(setData, id)
          return helper.response(response, 201, 'Profile Updated', result)
        } else {
          fs.unlink(`./uploads/${checkId[0].profile_img}`, async (error) => {
            if (error) {
              throw error
            } else {
              const result = await patchProfile(setData, id)
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
};
