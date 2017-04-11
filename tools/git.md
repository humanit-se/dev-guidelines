# Git Guidelines

## Introduction
We have shamelessly stolen this from the great [Vincent Driessen blog](http://nvie.com/posts/a-successful-git-branching-model/).   
So read it if you want, bellow is the basics. But really, it's kind of basic stuff...

## The branches

At the core, the development model is greatly inspired by existing models out there.  
The central repo holds two main branches with an infinite lifetime:

- master
- develop

### Master-branch

We consider origin/master to be the main branch where the source code of HEAD always reflects a production-ready state.

### Develop-branch

We consider origin/dev to be the main branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release.

### Supporting branches

- Feature-branches
- Release-branches
- Hotfix-branches

Next to the main branches master and develop, our development model uses a variety of supporting branches to aid parallel development between team members, ease tracking of features, prepare for production releases and to assist in quickly fixing live production problems. Unlike the main branches, these branches always have a limited life time, since they will be removed eventually.

### Branching strategy

#### Feature-branches

**May branch off from:**   
master  

**Must merge back into:**   
dev master  

**Branch naming convention:**   
If we have a Jira or Trello project with issues, use issue ID as branch name.  
If not, just use a custom feature name.

*Example:*  

```SEMISC-628-<custom-feature-name>``` or just ```<custom-feature-name>```

##### Creating a feature branch
When starting work on a new feature, branch off from the develop branch.

```
$ git checkout -b SEMISC-628-navigation master
```

##### Incorporating a finished feature on develop

Finished features may be merged into the master branch to definitely add them to the upcoming release:

```
$ git checkout master
// Switched to branch 'master'
$ git merge --no-ff myfeature
// Updating ea1b82a..05e9557
// (Summary of changes)
$ git branch -d myfeature
// Deleted branch myfeature (was 05e9557).
$ git push origin master
```

The --no-ff flag causes the merge to always create a new commit object, even if the merge could be performed with a fast-forward.

#### Release-branches

**May branch off from:**  
master

**Must merge back into:**  
dev and master

**Branch naming convention:**  
release-*

##### Creating a release branch

Release branches are created from the master branch.  
So if our latest stable version is 1.1 and we plan on a new release that might be 1.2.

```
$ git checkout -b release-1.2 master
// Switched to a new branch "release-1.2"
```

##### Finishing a release branch

When the state of the release branch is ready to become a real release, some actions need to be carried out.  
First, the release branch is merged into master (since every commit on master is a new release by definition, remember). Next, that commit on master must be tagged for easy future reference to this historical version. Finally, the changes made on the release branch need to be merged back into master, so that future releases also contain these bug fixes.

The first two steps in Git:

```
$ git checkout master
// Switched to branch 'master'
$ git merge --no-ff release-1.2
// Merge made by recursive.
// (Summary of changes)
$ git tag -a 1.2
```
The release is now done, and tagged for future reference.

To keep the changes made in the release branch, we need to merge those back into master, though.  
In Git:

```
$ git checkout master
// Switched to branch 'master'
$ git merge --no-ff release-1.2
// Merge made by recursive.
// (Summary of changes)
```

This step may well lead to a merge conflict (probably even, since we have changed the version number).  
If so, fix it and commit.

Now we are really done and the release branch may be removed, since we don’t need it anymore:

```
$ git branch -d release-1.2
// Deleted branch release-1.2 (was ff452fe).
```
