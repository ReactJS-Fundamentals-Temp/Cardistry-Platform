const PracticeList = require('./PracticeList')
const PracticeType = require('./PracticeType')

function getCurrentUserPracticeList (req, res) {
  let currentUser = req.user

  PracticeList
    .find({_creator: currentUser._id})
    .populate('flourishes')
    .sort({'createdAt': -1})
    .then(practiceLists => {
      res.json({ success: true, message: 'Fetched Practice Lists Successfully', practiceLists })
    })
}

function createPracticeList (req, res) {
  let currentUser = req.user
  let newPracticeListData = req.body

  let newPracticeList = new PracticeList()
  newPracticeList._creator = currentUser._id
  newPracticeList.flourishes = newPracticeListData.flourishes
  newPracticeList.title = newPracticeListData.title
  newPracticeList.save()

  res.json({success: true, message: 'Practice List created successfully'})
}

function getPracticeTypes (req, res) {
  PracticeType
    .find({})
    .then(practiceTypes => {
      res.json({success: true, message: 'Practice Types fetched successfully', practiceTypes})
    })
}

module.exports = {
  getCurrentUserPracticeList,
  createPracticeList,
  getPracticeTypes
}
