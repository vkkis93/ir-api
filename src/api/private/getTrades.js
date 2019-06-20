const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { defaultParams } = require('../../defaults')
const validate = require('../../validation')
const isPositiveNumber = require('../../validation/isPositiveNumber')

const { post } = getTransport()

const validation = {
  pageIndex: ['isPositiveNumber'],
  pageSize: [isPositiveNumber(50)]
}

const getTrades = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({
    pageIndex = defaultParams.pageIndex,
    pageSize = defaultParams.pageSize
  }) => {
    const payload = { pageIndex, pageSize }
    validate(payload, validation)
    const path = 'Private/GetTrades'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = getTrades
