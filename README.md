<p align="center">
  <a href="https://ddoo.dev/"><img width="520" src="https://cdn.ddoo.dev/github/banner_waifoo.svg" alt=""></a>
</p>


<p align="center">
  <b>
    Discord bots. Simplified and boosted
    <span> · </span>
    <a href="https://ddoo.dev/">Docs & Guide</a>
    <span> · </span>
    <a href="https://github.com/Discordoo/discordoo/blob/develop/CONTRIBUTING.md">Contribute</a>
  </b>
</p>

<p align="center">
  <a href="https://github.com/Discordoo/discordoo/actions">
    <img src="https://github.com/Discordoo/discordoo/workflows/Tests/badge.svg" alt="Testing status" />
  </a>
  <a href="https://github.com/Discordoo/discordoo/actions">
    <img src="https://github.com/Discordoo/discordoo/workflows/Lint/badge.svg" alt="Linting status" />
  </a>
  <a href="https://github.com/Discordoo/discordoo/actions">
    <img src="https://github.com/Discordoo/discordoo/workflows/Build/badge.svg" alt="Build status" />
  </a>
  <a href="https://ddoo.dev/discord">
    <img 
      src="https://img.shields.io/discord/811663819721539674?color=7280DA&label=Discord&logo=discord&logoColor=white" 
      alt="Online"
    >
  </a>
</p>
<hr>

## About
Waifoo is an official framework for Discordoo. It gives you robust and easy way to write Discord bots at any scale.

It is fully compatible with Discordoo and updates to its newest versions first.

## Features
* **Scalable** - just like Discordoo, Waifoo is insanely scalable and allows you yo run your bot on multiple machines just in a few lines of code.
* **Fast** - Waifoo was built with performance in mind allowing you to save on hosting.
* *...and many [other features](https://github.com/Discordoo/discordoo#features)*

## Getting started
***Node x.y.z is required.***

We have some starter projects in `starters` directory as well as examples in `examples` directory.

We recommend to use Waifoo with TypeScript, however it is possible to use it with JS(see [Using Waifoo with JS]() for more info.)

Let's clone the recommended starter template!
```sh
npx degit Discordoo/waifoo/starters/ts-npm
```
You will end up seeing this structure
```
├───src
│   ├───modules
│   │   └───ping
│   │       ├───ping-command.ts
│   │       └───ping-module.ts
│   └───index.ts
├───package-lock.json
└───package.json
```
Wanna more? See [Getting started]() for detais.

## Acknowledgments
Waifoo was heavily inspired by some other awesome libraries and frameworks:
* [Necord](https://github.com/SocketSomeone/necord)
* [NestJS](https://nestjs.com)
