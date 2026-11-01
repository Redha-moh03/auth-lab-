const isSignedIn = require("../middleware/is-signed-in")
const Entry = require('../models/Entry')
const User = require('../models/User')
const router = require("express").Router()

router.get('/new', isSignedIn, async (req, res) => {
    res.render('new-entry.ejs')
})
router.post('/new-entry', async (req, res) => {
    if (req.body.isPublic === 'on') {
        req.body.isPublic = true
    } else {
        req.body.isPublic = false
    }
    const newEntry = await Entry.create({
        title: req.body.title,
        entryBody: req.body.entryBody,
        isPublic: req.body.isPublic,
        owner: req.session.user._id
    })
    res.redirect('/entry/all-entries')
})
router.get('/all-entries', isSignedIn, async (req, res) => {
    const allEntries = await Entry.find({ isPublic: true })
    res.render('all-entries.ejs', { allEntries: allEntries })
})
router.get('/my-entries',isSignedIn, async (req, res) => {
    const myEntries = await Entry.find({owner:req.session.user._id})
   res.render('my-entries.ejs',{myEntries:myEntries})
})
module.exports = router;