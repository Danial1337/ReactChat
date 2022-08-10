This is a minimal React project using Parcel that you should be able to get up and running.

To use:

1. `npm install`
2. `npm run dev`
3. Go to http://localhost:1234

If you get a problem, you can try running it in Docker instead. You need to have Docker
installed on your computer and then execute

## Running in Docker on Windows

1. Make sure you delete `node_modules`, `.parcel-cache`, `dist`
2. `docker run --interactive --tty --volume %cd%:/app --workdir /app node:16-alpine npm install` (shorthand `docker run -it -v %cd%:/app -w /app node:16-alpine npm install`)
3. `docker run --interactive --tty --volume %cd%:/app --workdir /app -p 1234:1234 node:16-alpine npm run dev` (shorthand `docker run -it -v %cd%:/app -w /app -p 1234:1234 node:16-alpine npm run dev`)

## Running in Docker on Linux/Mac

1. Make sure you delete `node_modules`, `.parcel-cache`, `dist`
2. `docker run --interactive --tty --volume $(pwd):/app --workdir /app node:16-alpine npm install` (shorthand `docker run -it -v  $(pwd):/app -w /app node:16-alpine npm install`)
3. `docker run --interactive --tty --volume $(pwd):/app --workdir /app -p 1234:1234 node:16-alpine npm run dev` (shorthand `docker run -it -v  $(pwd):/app -w /app -p 1234:1234 node:16-alpine npm run dev`)
