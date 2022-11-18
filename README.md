# StatsCollide

## Introduction

Welcome to [Stats Collide](https://statscollide.com/), a tool for recording and tracking your [Final Fantasy VI: Worlds Collide](https://ff6wc.com/) runs. Here you can monitor your speedrunning progress, analyze patterns with your playstyle, and identify trends that can help improve your Worlds Collide skills. We know how much you love data, so why not use it to kill that crazy clown even faster than before and save the world in record time?

## Architecture

Stats Collide is a fully serverless, full-stack application built with the React framework. It utilizes the following technologies:

- [React](https://reactjs.org/) - framework for the frontend application.
- [AWS Amplify](https://aws.amazon.com/amplify/) - Hosting platform for frontend and backend, making the deployment and infrastructure much simplier.
- [AWS Lambda](https://aws.amazon.com/lambda/) - Backend code for submitting runs and data validation.
- [Dynamodb](https://aws.amazon.com/dynamodb/) - Backend database for user and run data.
- [Graphql](https://aws.amazon.com/graphql/) - Query language API in front of the dynamodb database.
- [Terraform](https://www.terraform.io/) - Deployment code for non-amplify resources (NOTE: currently outdated).
- [Docker](https://www.docker.com/) - Local development containerization.
- [Discord Development Application](https://discord.com/developers/docs/intro) - For user authentication.

## Development

### Prerequisites














In order to run the application locally, the following technologies needs to be pre-installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) - The development environment runs in [Anvil](https://github.com/saic-oss/anvil), a DevSecOps tools container. This container has all development tools installed and configured for this application, reducing onboarding time for new developers.
- WINDOWS ONLY - [Linux on Windows](https://docs.microsoft.com/en-us/windows/wsl/install) - Needed to run the bash commands for setting up the container. Make sure you follow the configuration instructions for [getting Docker to work with WSL 2 distros](https://docs.docker.com/desktop/windows/wsl/).
- An AWS account and your AWS credentials [configured as Enviornment variables](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html). Note that while you do not need to actually deploy to the cloud to develop locally, Amplify is kind of dumb and requires it to be set to start up a local database.

> NOTE: Anvil is not opinionated on how you manage your AWS credentials but it is encouraged that you manage them in a safer way then the default `/.aws/credentials` file. One recommendation is [AWS Vault](https://github.com/99designs/aws-vault) but ultimately management is up to each developer.

### Running a local instance

Once the prerequisites are installed locally, follow these steps:

1. WINDOWS ONLY - Ensure that `anvilw`, `docker-compose.yml` and `entrypoint.sh` is set for Windows line endings. For instructions on how to do this with VSCode, refer to [here](https://ztirom.at/2016/01/resolving-binbashm-bad-interpreter-when-writing-a-shellscript-on-windows-with-vs-code-and-run-it-on-linux/).
1. `./anvilw task init` (NOTE: You only need to run this command once, when first configuring your development environment). Near the end you will be prompted for some input from the Amplify CLI.

1. To enter the container to run development commands, run `./anvilw bash`. Once inside the container, you can start the development server via `task serve`.

### Available development commands

In addition to regular `npm` commands, a handful of macros have been set up for common development commands. These commands can be run via `task <command>` when in the container via `./anvilw bash`. The following macros have been configured:

#### `task init`

Installs the required development software and configured [pre-commit](https://pre-commit.com/).

#### `task validate`

Runs the [pre-commit](https://pre-commit.com/) hooks. If you do not run your `git` cli inside the container, make sure you this command before making a commit.

#### `task serve`

Starts the local Graphql database and React frontend app. You can reach the local database via http://localhost:20002 and the frontvia via http://localhost:3000

#### `task mock-api`

Starts only the GraphQL backend database.

#### `task npm-start`

Starts only the front-end dev server with no backend database.

#### `task clean`

Deletes the local database.

#### `task npm-install <package>`

Installs the given NPM package locally.
