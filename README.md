# Sanity Dashboard Widget: Netlify

> This is a **Sanity Studio v2** plugin.
> For the v3 version, please refer to the [v3-branch](https://github.com/sanity-io/sanity-plugin-dashboard-widget-netlify).

Sanity Studio Dashboard Widget for triggering Netlify builds.

## Installing

### Install the dashboard plugin
To get dashboard support in Sanity Studio in general:

```sh
yarn add @sanity/dashboard@studio-v2
```

Next, add `"@sanity/dashboard"` to `sanity.json` plugins array:
```json
"plugins": [
  "@sanity/dashboard"
]
```

### Install the Netlify widget plugin

```sh
yarn add sanity-plugin-dashboard-widget-netlify@studio-v2
```

Next, add `"dashboard-widget-netlify"` to `sanity.json` plugins array:
```json
"plugins": [
  "@sanity/dashboard",
  "dashboard-widget-netlify"
]
```

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
              title: 'Sanity Studio',
              apiId: 'xxxxx-yyyy-zzzz-xxxx-yyyyyyyy',
              buildHookId: 'xxxyyyxxxyyyyxxxyyy',
              name: 'sanity-gatsby-blog-20-studio',
            },
            {
              title: 'Website',
              apiId: 'yyyyy-xxxxx-zzzz-xxxx-yyyyyyyy',
              buildHookId: 'yyyyxxxxxyyyxxdxxx',
              name: 'sanity-gatsby-blog-20-web',
              url: 'https://my-sanity-deployment.com',
            }
          ]
        }
      }
    ]
  }
  ```
### Widget options
`title` - Override the widget default title

`sites[]` - Your Netlify sites to show deploys for
  - `apiId`- The Netfliy API ID of your site (see *Site Settings > General > Site Details >  Site Information -> API ID*).
  - `buildHookId` - The id of a build hook you have created for your site within the Netlify administration panel (see *Site Settings > Build & Deploy > Continuous Deployment -> Build Hooks*).
  - `name` - The Netlify site name
  - `title` - Override the site name with a custom title
  - `url` - Optionally override site deployment url. By default it is inferred to be `https://netlify-site-name.netlify.app`.
  - `branch` - Optionally pass the name of a branch to deploy

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

## Developing plugin kit

### Release new version

Run ["CI & Release" workflow](https://github.com/sanity-io/sanity-plugin-dashboard-widget-netlify/actions/workflows/main.yml).
Make sure to select the main (or v3) branch and check "Release new version".

Semantic release will only release on configured branches, so it is safe to run release on any branch.

