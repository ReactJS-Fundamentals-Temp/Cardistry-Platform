const PracticeList = require('./PracticeList')
const Practice = require('./Practice')
const PracticeType = require('./PracticeType')

function index (req, res) {

}

function getPractice (req, res) {
  let practiceId = req.params.id

  console.log(practiceId, 'ID')

  Practice
    .findOne({_id: practiceId})
    .populate('_type')
    // .deepPopulate('_practice_list.flourishes')
    .populate({
      path: '_practice_list',
      model: 'PracticeList',
      populate: {
        path: 'flourishes',
        model: 'Flourish'
      }})
    .then(practice => {
      console.log(practice, 'PRACTICE')

      res.json({success: true, message: 'Practice fetched successfully', practice: practice})
    })
}

function createPractice (req, res) {
  let currentUser = req.user
  let newPracticeData = req.body

  console.log(newPracticeData, 'NEW PRACTICE DATA')

  let newPractice = new Practice()
  newPractice._creator = currentUser._id
  newPractice._type = newPracticeData.type
  newPractice._practice_list = newPracticeData.practiceList
  newPractice.required_consistency_repetitions = newPracticeData.requiredConsistencyRepetitions
  newPractice.save()

  res.json({success: true, message: 'Practice created successfully', practice: newPractice})
}

function completeStep (req, res) {
  const practiceId = req.params.id
  const successes = req.body.successes
  const fails = req.body.fails

  Practice
    .findOne({_id: practiceId})
    .populate('_type')
    // .deepPopulate('_practice_list.flourishes')
    .populate({
      path: '_practice_list',
      model: 'PracticeList',
      populate: {
        path: 'flourishes',
        model: 'Flourish'
      }})
    .then(practice => {
      console.log(practice, 'PRACTICE')

      practice.step += 1
      practice.total_successes += successes
      practice.total_fails += fails
      practice.save()

      res.json({success: true, message: 'Step completed successfully', practice: practice})
    })
}

function completePractice (req, res) {
  const practiceId = req.params.id
  const successes = req.body.successes
  const fails = req.body.fails

  Practice
    .findOne({_id: practiceId})
    .populate('_type')
    // .deepPopulate('_practice_list.flourishes')
    .populate({
      path: '_practice_list',
      model: 'PracticeList',
      populate: {
        path: 'flourishes',
        model: 'Flourish'
      }})
    .then(practice => {
      console.log(practice, 'PRACTICE')

      practice.completed = true
      practice.total_successes += successes
      practice.total_fails += fails
      practice.completedAt = Date.now()
      practice.save()

      res.json({success: true, message: 'Practice completed successfully', practice: practice})
    })
}

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
  index,
  createPractice,
  getCurrentUserPracticeList,
  createPracticeList,
  getPracticeTypes,
  getPractice,
  completeStep,
  completePractice
}
