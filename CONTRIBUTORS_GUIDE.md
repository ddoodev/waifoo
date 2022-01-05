# Waifoo Contributors Guide
This guide is going to be short - here we will introduce some aspects of build system and some other conventions.
You should also see [main repo's contributing.md for other details](https://github.com/Discordoo/discordoo/blob/develop/CONTRIBUTING.md).

## Build system
We use [Turborepo](https://github.com/vercel/turborepo) for monorepo things.

### Getting started
First, you should run `npm run setup`. This will bootstrap lerna packages.

Then you run `npm run build` to build Waifoo. You can also run `npm run dev` to recompile source code on change.

## Examples
**Always** write examples for your feature(if needed) and add new starter project(if applicable). Examples also serve as e2e testing you run on your side.

## Tests
We use Jest for our unit testing. We highly encourage you to use it for parts which **do not** require Discord API. If that's the case, write examples.