> **NOTE**
>
> This is the **Sanity Studio v3 version** of sanity-plugin-dashboard-widget-netlify.
>
> For the v2 version, please refer to the [v2 version](https://github.com/sanity-io/sanity-plugin-dashboard-widget-netlify/tree/main).


# Sanity Dashboard Widget: Netlify

Sanity Studio Dashboard Widget for triggering Netlify builds.

## Install

```
npm install --save sanity-plugin-dashboard-widget-netlify@studio-v3
```

or

```
yarn add sanity-plugin-dashboard-widget-netlify@studio-v3
```

Ensure that you have followed install and usage instructions for [@sanity/dashboard](https://github.com/sanity-io/dashboard).

## Usage

Add it as a widget to @sanity/dashboard plugin in sanity.config.ts (or .js):

```js
import { dashboardTool } from "@sanity/dashboard";
import { netlifyWidget } from "sanity-plugin-dashboard-widget-netlify";

export default defineConfig({
  // ...
  plugins: [
    dashboardTool({
      widgets: [
        netlifyWidget({
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
        })
      ]
    })
  ]
})
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

## License

MIT-licensed. See LICENSE.

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.

### Release new version

Run ["CI & Release" workflow](https://github.com/sanity-io/sanity-plugin-dashboard-widget-netlify/actions/workflows/main.yml).
Make sure to select the main branch and check "Release new version".

Semantic release will only release on configured branches, so it is safe to run release on any branch.
