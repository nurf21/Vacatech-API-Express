const {
  getAllPortfolio,
  getPortfolioById,
  postPortfolio,
  patchPortfolio,
} = require("../model/portfolio")

const fs = require("fs");
const helper = require("../helper/index")
const { request, response } = require("express")

module.exports = {
  getAllPortfolio: async (request, response) => {
    try {
      const result = await getAllPortfolio()
      return helper.response(response, 200, "Success get Portfolio", result)
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  getPortfolioById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getPortfolioById(id)

      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Succes get portfolio By Id",
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `Portfolio By Id : ${id} Not Found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  postPortfolio: async (request, response) => {
    try {
      const { user_id, portfolio_name, portfolio_link, portfolio_type } = request.body
      console.log(request.body)
      const setData = {
        user_id,
        portfolio_name,
        portfolio_link,
        portfolio_type,
        portfolio_img: request.file === undefined ? "" : request.file.filename,
        portfolio_created_at: new Date(),
      }
      if (setData.portfolio_name === "") {
        return helper.response(response, 404, ` Input portfolio name`)
      } else if (setData.portfolio_link === "") {
        return helper.response(response, 404, ` Input link`)
      } else if (setData.portfolio_type === "") {
        return helper.response(response, 404, ` Input portofolio type`)
      } else {
        const result = await postPortfolio(setData)
        return helper.response(response, 201, "Portfolio Created", result)
      }
    } catch (error) {
        return helper.response(response, 400, "Bad Request", error);
    }
  },
  patchPortfolio: async (request, response) => {
    try {
      const { id } = request.params;
      const { user_id, portfolio_name, portfolio_link, portfolio_type } = request.body
      if (
        request.body.user_id === undefined ||
        request.body.user_id === null ||
        request.body.user_id === ""
      ) {
        return helper.response(response, 404, "user id must be filled");
      } else if (
        request.body.portfolio_name === undefined ||
        request.body.portfolio_name === null ||
        request.body.portfolio_name === ""
      ) {
        return helper.response(response, 404, "portfolio name must be filled");
      } else if (
        request.body.portfolio_link === undefined ||
        request.body.portfolio_link === null ||
        request.body.portfolio_link === ""
      ) {
        return helper.response(response, 404, "portfolio link must be filled");
      } else if (
        request.body.portfolio_type === undefined ||
        request.body.portfolio_type === null ||
        request.body.portfolio_type === ""
      ) {
        return helper.response(response, 404, "portfolio type must be filled");
      } else {
        const checkId = await getPortfolioById(id)
        if (checkId.length > 0) {
          const setData = {
            user_id,
            portfolio_name,
            portfolio_link,
            portfolio_type,
            portfolio_img: request.file === undefined ? checkId[0].portfolio_img : request.file.filename,
            portfolio_updated_at: new Date(),
          }
          if (setData.portfolio_img === checkId[0].portfolio_img) {
            const result = await patchPortfolio(setData, id);
            return helper.response(
              response,
              200,
              "Patch Done",
              result
            );
          } else {
            const img = checkId[0].portfolio_img;
            const path = `./uploads/${img}`
            fs.unlink(path, (error) => {
              if (error) {
                return
              }
            })
            const result = await patchPortfolio(setData, id)
            return helper.response(response, 201, "Patch Done", result)
          }
        } else {
          return helper.response(response, 404, `Portfolio By Id: ${id} Not Found`)
        }
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
}
