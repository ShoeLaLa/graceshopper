const passport = require('passport')
const router = require('express').Router()
const GithubStrategy = require('passport-github').Strategy
const {User} = require('../db/models')
module.exports = router

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  console.log('github client ID / secret not found. Skipping github OAuth.')
} else {
  const githubConfig = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
  }

  const strategy = new GithubStrategy(
    githubConfig,
    (token, refreshToken, profile, done) => {
      const githubId = profile.id
      const name = profile.displayName
      const username = profile.username

      User.findOrCreate({
        where: {githubId},
        defaults: {name, username}
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get(
    '/',
    passport.authenticate('github', {
      scope: 'username',
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )
}
