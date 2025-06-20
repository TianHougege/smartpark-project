import request from "@/utils/request";

// https://api-hmzs.itheima.net/v1/parking/card/list

/**
 *获取月卡列表
 * @param {*} params 参数
 * @returns
 */

export function getCardListAPI(params) {
  return request({
    url: "/parking/card/list",
    method: "get",
    params,
  });
}
