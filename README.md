# Lectern Form Generator

> Prototype project candidate for [overture.bio](https://overture.bio)

## What is Lectern?

[Lectern](https://github.com/overture-stack/lectern) is a schema library service used to store and serve schemas that define structured data - especially TSV files.

## What is This?

Creating TSV files that match a complicated schema can be difficult. It is easy to miss a rule or ruin the formatting with typos. For most users, having a form to enter the data and validate values for every field would be preferable. This application will generate that form, based on a schema from Lectern.

Data submitted into the form will be validated as it is entered, collected and stored to your browser, and then can be output as a well formatted TSV or JSON file.

### Static Site

As an initial prototype, this will provide a static site generator that will generate a single form built from a schema, including validation, and transform functionality.

A site generation script in this repo will read a schema from a local file or from a URL (Lectern server!) and generate a hostable version of the site.

## Quick Start to Build a Site

> !! Do not use `npm` at all or the `rush` commands will fail. If you do, use `rush purge` and it should clean things up

1. Install all dependencies and link projects:
    ```sh
    rush update
    ```

1. Configure site for build.
    Create a file at `./apps/static-site/.env` and copy the contents of `./apps/static-site/.env.template` to it. You can update the values of any of these properties to configure your site.

    > TODO: description of configurable properties

1. Run the site locally to test your config:
    ```sh
    cd ./apps/static-site
    rushx start
    ```

    This should start the webpack dev server hosting the demo site at [http://localhost:3000](http://localhost:3000).

## Developer Guide

### RushJS Monorepo

This repository is built and maintained using [RushJS](https://rushjs.io/) monorepo manager from Microsoft.

Check out the Rush instructions for [Getting Started](https://rushjs.io/pages/developer/new_developer/) as a developer.

You will first need to install Rush from npm as a global resource:

```sh
npm install -g @microsoft/rush
```

Then you will want to update all packages to install dependencies and link them together:

```sh
rush update
```
