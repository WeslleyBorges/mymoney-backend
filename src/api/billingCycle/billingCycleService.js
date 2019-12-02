const billingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')

billingCycle.methods(['get', 'post', 'put', 'delete'])
billingCycle.updateOptions({ new: true, runValidators: true })
billingCycle.after('post', errorHandler).after('put', errorHandler)

billingCycle.route('count', (req, res, next) => {
  billingCycle.countDocuments((error, value) => {
    if (error) {
      res.status(500).json({ errors: [error]})
    }
    else {
      res.json({ value })
    }
  })})

billingCycle.route('summary', (req, res, next) => {
  billingCycle.aggregate([{
    "$project": { 
      "credits": { 
        "$sum": "$credits.value" 
      }, 
      "debts": { 
        "$sum": "$debts.value" 
      }
    }
  }, {
    "$group": {
      "_id": null,
      "credit": {
        "$sum": "$credits"
      },
      "debt": {
        "$sum": "$debts"
      }
    }
  }], (error, result) => {
    if (error)
      res.status(500).json({ error: [error] })
    else
      res.json(result[0] || { credit: 0, debt: 0 })
  })
})

module.exports = billingCycle