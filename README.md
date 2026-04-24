# Demo1App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

##Branching Instructions
we will be using 4 branches and feature branches created with jira ticket number(for each ticket 1 branch).

develop - CI/CD not available (developers will be using this branch to branch out feature/bugs branches, it will be merged back to develop once developer has tested)

staging - CI/CD available (develop branch get merged to this branch once QA/cross testing is done for a release- we will be using this for UAT testing with the client)

master (staging branch will be merged to master once its production ready)

release - CI/CD available (only releases will be merged to this branch - 2 developers has to approve the merge)

//////////////////////////
firebase deploy --only hosting



