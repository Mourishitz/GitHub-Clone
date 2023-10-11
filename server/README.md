# GitHub-Clone (Server Side)

## Architecture Overview

We are running a "proxy" like backend, which means that everything must be really escalable and mutable since we are dealing with external API's and integrations. With that in mind, I decided to use express as the main web-server provider due to it's realiability and light weight operations.

Every other aspect of this backend project is a "changeable" resource, and by that we mean that it is built using SOLID principles so every piece can be easily extended such as the HTTP client of our choice.

Inside src/services/http we can find an interface that relies on the most important methods for an HTTP client to work with, and since we are using axios as client we then implement the interface to satisfy our needs. Notice that any other HTTP client could implement this interface and then we could easily substitute Axios from specific parts of the application based on needs.

Also, the services classes are exported as a new instance using the Singleton pattern.

## Why doing this?

All of this architecture was made so it does not relly on a single source of truth, in other words, if in any given day the GitHub API (main integrator) run into some breaking changes on its routes or we want to change the integrator for GitLab (example) it should be easier to do so due to the way the application is written. This is possible because of the Single Responsability Principle and Open Closed Principle applied on classes and/or methods to ensure that we will not have problems when making changes on the source code itself.

In general, our server side is highly adaptable and modifiable so it can scale on every aspect.