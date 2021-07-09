const core = require('@actions/core')
const fs = require('fs')
const path = require('path')
const standardVersion = require('standard-version')

async function run() {
  try {
    const releaseAs = core.getInput('releaseAs')
    core.info(`Release as: ${releaseAs}`)

    let options = { releaseAs }

    const prerelease = core.getInput('prerelease')
    if (prerelease) {
      core.info(`Pre release: ${prerelease}`)
      options.prerelease = prerelease
    }

    if (fs.existsSync('.versionrc.js')) {
      const versionOpts = require(path.resolve(__dirname, '..', '.versionrc.js'))
      options = Object.assign(options, versionOpts)
    }

    await standardVersion(options)
  } catch (error) {
    core.setFailed(error.stack)
  }
}

run()
