# Sanity Dashboard Widget: Netlify


### Developing

To simulate using your development version as a real module inside a studio, you can do the following:

* Run `npm install && npm link` from the root of this repository.
* Run `npm run watch` to start developing and build the module when changes are made.

#### Displaying your development version inside a studio

**With the mono-repo's `test-studio`:**

  * Bootstrap the monorepo: `npm run bootstrap`
  * Add `sanity-plugin-dashboard-widget-netlify` with the current version number to `package.json` in the `test-studio` root folder (but don't run `npm install` afterwards)
  * Run `npm link sanity-plugin-dashboard-widget-netlify` inside the mono-repo's root.
  * Restart the `test-studio`

**With a regular Sanity Studio:**
  * Run `npm install`
  * Add `sanity-plugin-dashboard-widget-netlify` with the current version number to `package.json`.
  * Run `npm link sanity-plugin-dashboard-widget-netlify`
  * Start the studio

When you are done and have published your new version, you can run `npm unlink` inside this repo, and `npm unlink sanity-plugin-dashboard-widget-netlify` inside the mono-repo or studio to get back to the normal state. Then run `npm run bootstrap` for the mono-repo or `npm install` inside the regular studio to use the published version.
