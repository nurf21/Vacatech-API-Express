const {
  getProfile,
  getProfileById,
  getProfileCount,
  postProfile,
  patchProfile,
  deleteProfile,
} = require("../model/profile")
const helper = require("../helper/index")
const { request, response } = require("express")
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
      //   console.log(error);
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
  postProfile: async (request, response) => {
    try {
      const {
        profile_name,
        profile_job,
        profile_address,
        job_address,
        profile_desc,
      } = request.body;
      const setData = {
        profile_name,
        profile_job,
        profile_address,
        job_address,
        profile_desc,
        profile_created_at: new Date(),
      }
      if (setData.profile_name === "") {
        return helper.response(response, 404, ` Input name!`)
      } else if (setData.profile_job === "") {
        return helper.response(response, 404, ` Input your job desk`)
      } else if (setData.profile_address === "") {
        return helper.response(response, 404, ` Input your address`)
      } else if (setData.job_address === "") {
        return helper.response(response, 404, ` Input job address`)
      } else {
        const result = await postProfile(setData)
        return helper.response(response, 201, "Profile Created", result)
      }
    } catch (error) {
      //   console.log(error);
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  patchProfile: async (request, response) => {
    try {
      const { id } = request.params
      const {
        profile_name,
        profile_job,
        profile_address,
        job_address,
        profile_desc,
      } = request.body;
      const setData = {
        profile_name,
        profile_job,
        profile_address,
        job_address,
        profile_desc,
        profile_updated_at: new Date(),
      }
      if (setData.profile_name === "") {
        return helper.response(response, 404, ` Input your Name!`)
      } else if (setData.profile_job === "") {
        return helper.response(response, 404, ` Input your jobDesk!`)
      } else {
        const checkId = await getProfileById(id)
        if (checkId.length > 0) {
          const result = await patchProfile(setData, id)
          return helper.response(response, 200, "Patch Done", result)
        } else {
          return helper.response(response, 404, "Not found", result)
        }
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  deleteProfile: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await deleteProfile(id)
      return helper.response(response, 200, "Delete Done", result)
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
};
