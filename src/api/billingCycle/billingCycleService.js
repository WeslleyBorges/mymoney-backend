const billingCycle = require('./billingCycle')

billingCycle.methods(['get', 'post', 'put', 'delete'])
billingCycle.updateOptions({ new: true, runValidators: true })

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
    $project: {credit: { $sum: '$credit.value'}, debt: { $sum: '$debt.value' } }
  }, {
    $group: { __id: null, credit: { $sum: '$credit' }, debt: { $sum: '$debt' } }
  }, {
    $project: { __id: 0, credit: 1, debt: 1 }
  }], (error, result) => {
    if (error)
      res.status(500).json({ error: [error] })
    else
      res.json(result[0] || { credit: 0, debt: 0 })

    console.log(result)
  })
})

module.exports = billingCycle