# Standard Version Action

This [Github Action][] calculates the new version based on [Conventional Commits][], updates CHANGELOG, and creates the new git tag. It's powered by [Standard Version][].

## Inputs

If you want to change a configuration, create a `.versionrc.js` file. More detail: [versionrc file][]

## Example usage

```yaml
- uses: actions/checkout@v2
- name: Configure committer
  run: |
    git config user.name "GitHub Actions Bot"
    git config user.email "<>"
- name: Bump version
  id: release
  uses: ltv/standard-version-action@v2
  with:
    releaseAs: 'minor'
- run: |
    echo "Released version: $VERSION"
  env:
    VERSION: ${{ steps.release.output.version }}
```

Inputs:

```yaml
inputs:
  releaseAs:
    description: 'Release as major|minor|patch'
    required: false
    default: 'minor'
  prerelease:
    description: 'Pre-release version alpha|beta|...'
    required: false
```

[github action]: https://docs.github.com/en/actions
[conventional commits]: https://www.conventionalcommits.org/en/v1.0.0/
[standard version]: https://github.com/conventional-changelog/standard-version
[versionrc file]: https://github.com/conventional-changelog/standard-version#configuration
