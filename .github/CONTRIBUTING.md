# Contributing to this Project

For pull requests to be merged, authors should:

* Write any applicable unit tests
* Add any relevant documentation
* Reference any relevant issues
* Obtain a review from a team member

## Workflow

git clone <repo>

### Every once in a while, or after a PR run

git pull

### Workflow to add new feature (for a bug-fix use b/bug-name)

git checkout -b f/feature-name
or git checkout -b b/bug-fix

### code away and then when ready to commit and push changes (after tests are passing)

git add -A
git commit -m "f/feature-name informative message"
git push -u origin f/feature-name
git checkout master
git branch -D f/feature-name

### Go to GitHub and click Create Pull Request and assign team members to review

### Once it is reviewed it will be merged into master, that feature branch can be deleted, then team should

git pull
