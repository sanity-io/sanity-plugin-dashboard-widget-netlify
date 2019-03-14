# Sanity Dashboard Widget: Netlify

## Installing

### Install the dashboard plugin
To get dashboard support in Sanity Studio in general:

`sanity install @sanity/dashboard`

### Install the Netlify widget plugin

`sanity install dashboard-widget-netlify`

## Configuring

1. Implement your own dashboardConfig. In your `sanity.json` file, append the following line to the `parts` array:

  ```json
  {
    "implements": "part:@sanity/dashboard/config",
    "path": "src/dashboardConfig.js"
  }
  ```

2. Create the file `src/dashboardConfig.js` and inlcude the `netlify` widget config like this:

  ```js
  export default {
    widgets: [
        {
        name: 'netlify',
        options: {
          title: 'My Netlify deploys',
          sites: [
            {
              name: 'Sanity Studio',
              siteId: 'xxxxx-yyyy-zzzz-xxxx-yyyyyyyy',
              deployHookId: 'xxxyyyxxxyyyyxxxyyy',
            },
            {
              name: 'Website',
              siteId: 'yyyyy-xxxxx-zzzz-xxxx-yyyyyyyy',
              deployHookId: 'yyyyxxxxxyyyxxdxxx',
            }
          ]
        }
      }
    ]
  }
  ```
### Widget options
`title` - Override the widget default title

`sites[]` - Your Netlify sites
  - `siteId`- The Netfliy API id of your site
  - `deployHookId` - The id of some deploy hook you have created for you site within the Netlify administration panel.
  - `name` - Override the site name from Netlify API
  
## Developing on this module

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
