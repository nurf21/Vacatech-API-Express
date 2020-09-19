const {
  getAllPortfolio,
  getPortfolioById,
  postPortfolio,
  patchPortfolio,
  deletePortfolio,
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
      const setData = {
        user_id,
        portfolio_name,
        portfolio_link,
        portfolio_type,
        portfolio_img: request.file === undefined ? "" : request.file.filename,
        portfolio_created_at: new Date(),
      }
      console.log(setData)
      if (setData.portfolio_name === "") {
        return helper.response(response, 404, ` Input portfolio name`)
      } else if (setData.portfolio_link === "") {
        return helper.response(response, 404, ` Input link`)
      } else {
        const result = await postPortfolio(setData)
        return helper.response(response, 201, "Portfolio Created", result)
      }
    } catch (error) {
    //   console.log(error)
        return helper.response(response, 400, "Bad Request", error);
    }
  },
  patchPortfolio: async (request, response) => {
    try {
      const { id } = request.params;
      const { user_id, portfolio_name, portfolio_link, portfolio_type } = request.body
      const setData = {
        user_id,
        portfolio_name,
        portfolio_link,
        portfolio_type,
        portfolio_img: request.file === undefined ? "" : request.file.filename,
        portfolio_created_at: new Date(),
      }
      if (setData.user_id === "") {
        return helper.response(response, 404, ` Input id`)
      } else if (setData.portfolio_name === "") {
        return helper.response(response, 404, ` Input link`)
      } else {
        const checkId = await getPortfolioById(id)
        const img = checkId[0].portfolio_img;
        if (checkId.length > 0) {
          fs.unlink(`./uploads/${img}`, async (error) => {
            if (error) {
              throw error
            } else {
              const result = await patchPortfolio(setData, id)
              return helper.response(response, 201, "Patch Done", result)
            }
          })
        } else {
          return helper.response(response, 404, ` Not Found`)
        }
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  deletePortfolio: async (request, response) => {
    try {
      const { id } = request.params;
      const checkId = await getPortfolioById(id);
      if (checkId.length > 0) {
        fs.unlink(`./uploads/${checkId[0].portfolio_img}`, async (error) => {
          if (error) {
            throw error;
          } else {
            const result = await deletePortfolio(id);
            return helper.response(response, 201, "Portfolio Deleted", result);
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
