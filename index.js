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

    const versionRCPath = path.resolve(process.env.GITHUB_WORKSPACE, '.versionrc.js')
    if (fs.existsSync(versionRCPath)) {
      core.info(`Found version configuration file at ${versionRCPath}`)
      const versionOpts = require(versionRCPath)
      options = Object.assign(options, versionOpts)
    }

    await standardVersion(options)
    const version = require('./package.json').version
    core.setOutput('version', version)
  } catch (error) {
    core.setFailed(error.stack)
  }
}

run()
