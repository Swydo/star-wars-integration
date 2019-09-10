# star-wars-integration

A custom integration integrating SWAPI to @Swydo

[![CircleCI](https://img.shields.io/circleci/build/github/Swydo/star-wars-integration/master.svg?label=circleci&style=flat-square)](https://circleci.com/gh/Swydo/star-wars-integration) [![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg?style=flat-square)](https://istanbul.js.org/) [![conventionalCommits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org) [![GitHub](https://img.shields.io/github/license/Swydo/custom-integrations.svg?style=flat-square)](https://github.com/Swydo/custom-integrations/blob/master/LICENSE)

<img src="https://user-images.githubusercontent.com/2283434/52522860-25eee400-2c8b-11e9-8602-f8de0d158600.png">

---

A custom integration integrating SWAPI to @Swydo

---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Quick start](#quick-start)
  - [Test](#test)
  - [Run](#run)
- [Slow start](#slow-start)
  - [Clone and explore](#clone-and-explore)
    - [Preparations](#preparations)
    - [Structure](#structure)
      - [Adapter](#adapter)
      - [Endpoint](#endpoint)
      - [Field](#field)
    - [Connector](#connector)
  - [Running on your computer](#running-on-your-computer)
  - [Deploy the custom integration](#deploy-the-custom-integration)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---

## Quick start

The supported Node.js version is `10.x`.

```bash
npm install
```

### Test

```bash
npm run test
```

### Run

Run a local server to connect to your Swydo development environment.

```bash
npm start
```

Validate configuration and watch for changes

```bash
npm run validate -- --watch
```

## Slow start

### Clone and explore

#### Preparations

Let's start off by cloning this repository and looking at the file structure.

```sh
git clone https://github.com/Swydo/star-wars-integration.git
cd star-wars-integration
```

To view the project you can use any text editor, but you can make your life easier by using
[Visual Studio Code](https://code.visualstudio.com/) or some other IDE that knows JavaScript.

#### Structure

When we finally have a look at the folder structure we can boil it down to four files that make up the bulk of
the integration.

```
star-wars-integration/
    ├── package.json        // Project definition, contains dependencies among other things.
    └── src/
        ├── adapter.js      // This contains the adapter configuration.
        ├── connector.js    // Contains the function to call the external API, in our case SWAPI.
        └── index.js        // This takes the configuration from adapter.js and turns it into a custom integration.
```

The Star Wars custom integration is a Node.js project. In the root we find a `package.json` file.
This file describes the dependencies of the project, as well as the "main" file. This "main" file is where the custom
integration will be made available.

The "main" file for this project is `src/index.js`. This file contains the code that transforms configuration into
a proper custom integration. This file is mostly [boilerplate code](https://en.wikipedia.org/wiki/Boilerplate_code), but
at the top we can find a reference to `adapter.js`, which is where we'll head next.

The file `src/adapter.js` contains the configuration for the entire Star Wars integration. The config consists of a few
hierarchical components. At the top of the hierarchy we find `adapter`. Each `adapter` can have multiple `endpoints`.
Each endpoint can then have multiple `fields`. In addition to `fields` an endpoint has a `connector`, which is a
JavaScript function.

```
adapter
    ├── endpoint 1
    │   ├── connector 1
    │   └── fields
    │       ├── field 1A
    │       └── field 1B
    └── endpoint 2
        ├── connector 2
        └── fields
            ├── field 2A
            └── field 2B
```

##### Adapter

The configuration starts with an `adapter`. It defines how the user of your custom integration
should authenticate themselves (`authentication`), how many requests it can handle in a certain time period (`rateLimits`)
and, most importantly, what `endpoints` are available.

##### Endpoint

An `endpoint` is a logical section in your adapter. The Star Wars integration only has a single "starships"
endpoint, but it could have a "characters" endpoint in addition to that. Quite a few things can be configured
here, but most importantly it has a `connector`, which is a function responsible of making an actual API request, and 
`fields`, which defines all properties that can be requested and possibly selected in the Swydo interface.

##### Field

A `field` is the link between a property returned by the API and something users can select in Swydo. In the case of
Star Wars one of the fields returned by SWAPI is the name of a starship. The field configuration tells Swydo
this "name" property is of type "String" and can be filtered on. Similarly it defines a field "length", which is
of type "Number". A field can also be a composite of other fields. For instance, a field "crew per length" can take the
"length" field and another field "crew" and divide the value of "crew" by "length" and thus create a brand new field
the API doesn't offer by itself.

A field can be a dimension, a metric or both. A dimension defines how the data should be grouped, such as
"per star ship manufacturer", whereas the metrics are usually numbers that describe this dimension such as the average
cost of a star ship per manufacturer.

#### Connector

By composing endpoints out of fields and an adapter out of endpoint we've created a model of the Star Wars API. Now
let's look at the code that is responsible for handling a data request, the `connector.` When a user creates a widget
in Swydo they select a set of `dimensions` and `metrics` from the fields you defined.

Swydo expects your connector to be able to request these metrics and dimensions from the API and return the result
as `rows`. _How_ you request these is entirely up to you and if you're an experienced Node.js developer you probably
already have a preference. Swydo is happy long as you return `rows` from your `connector` given a request.

Generally your `connector` is going to do at least some of these steps:

- Take the first parameter of the function (the request options) and translate them into an API request.
- Call the API
- Transform the response of the API into something Swydo understands.

You can see a similar pattern in the Star Wars connector. We take the `connector` input and create request options. We
pass the request options into the popular `request-promise-native` module to make the API request. Finally we take the
response and translate it into Swydo's language.

### Running on your computer

Now that we have a basic idea of what a custom integration entails and how it is structured we can try running it
and creating a widget that shows Star Wars data in Swydo.

The Star Wars custom integration conveniently has a `start` script defined in the package.json, so let's run that.

```bash
npm start
```

This command will start a server on your computer and print out a unique URL. Copy it, as we're going to need it later.

With the server running we can head over to [Swydo](https://app.swydo.com) and set up our dev environment.
From any page click your profile icon in the upper-right of the screen and select "Custom integrations". From there
head over to the "development environment". Copy your unique URL from the terminal into the input field and activate
the environment. After a short while the page should update and you'll be greeted with, among other things, a green
dot and the word "Connected". Swydo is now linked directly to your copy of the Star Wars integration.

Now lets try it out. Head over to the reporting section by using the side menu and create a new report.

- Click create new widget.
- Click your development environment from the list of providers.
- Connect a new account.
- Run through the steps and save the data source.
- Select the star ships endpoint.
- Fill out the settings, select an combination of metrics and dimensions.
- Click save.

After a short while the widget will load with the data you selected. At this point you might want to dive into the
`connector` function. Try placing a `console.log("Hello World!")` somewhere in the body of the function and refresh the
page. You'll see the message printed on your command line.

### Deploy the custom integration

By using your development environment you can link Swydo directly to your computer for easy testing and debugging.
However, your users won't be happy when they find out the integration no longer works when you shut down your computer.
By deploying the custom integration it'll be made available from anywhere at any time through Swydo's
infrastructure. There is no need to host your own server.

Head back to the custom integrations page (profile picture -> custom integrations). This time click the 
"create an integration" button and fill out the form. For the "source" section take the clone URL from GitHub and enter
"master" as the branch. Save the form.

At the bottom of the page find the "deployment" section. The integration hasn't been deployed yet, so click the button.
Swydo will now start building the Node.js project and deploy it to an isolated environment. When the deployment is
complete you can head over the reporting section once more to create a widget with the newly deployed adapter.

By committing and pushing changes to the repository you get all the benefits of version control. Any time you want to
publish changes to Swydo simply click the deploy button.
