const core = require('@actions/core')
const standardVersion = require('standard-version')

async function run() {
  try {
    const releaseAs = core.getInput('releaseAs')
    core.info(`Release as: ${releaseAs}`)

    const options = { releaseAs }

    const prerelease = core.getInput('prerelease')
    if (prerelease) {
      core.info(`Pre release: ${prerelease}`)
      options.prerelease = prerelease
    }

    await standardVersion(options)
  } catch (error) {
    core.setFailed(error.stack)
  }
}

run()
