# GitHub-Clone (Client Side)

## Architecture Overview

We aimed for a simple ad reliable frontend build for our application purposes using React + Vite. We are including packages like Tailwind CSS and DaisyUI in order to help us on boilerplating and more simple yet very beautiful components.

As the client and server side are "attached" we were able to reuse some resources or classes like the HTTP client configuration and response types, but we should be able to implement this frontend on other services easily due to it's highly adaptable way of being built.

Our project architecture is a simple and functional approach for raw React applications. Our React Virtual DOM is created on main.tsx and the application itself runs on App.tsx where it calls our Router (inside src/routes) so we can route multiple pages while still using a Single Page Application. It is running react-router-dom library.

Inside Router component we can easily configure function-based pages for our application by passing its JSX fragment inside the element key and the respective path for it.

The pages can be found inside the src/pages directory where each subdirectory contains an index.tsx for exporting the representation of that page as an JSX component.

Speaking of components, we provide generic components inside src/components directory so they can be reused on more than one place and still work just as fine.