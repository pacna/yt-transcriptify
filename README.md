# YT Transcriptify

<img alt="Test CI passing" src="https://github.com/pacna/yt-transcriptify/workflows/Test%20CI/badge.svg" />

YT Transcriptify is a web application designed to display a visual transcription of any YouTube video. It provides users with a visual format of the video's transcript, making it easier to read and follow along.

![yt-transcriptify](./docs/yt-transcriptify.png)

You can try it out [here](https://pacna.github.io/yt-transcriptify/) (**_note_**: you may need to install an [extension](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf/related?hl=en) to bypass any CORS related issues)

## Ubuntu Prerequisites

Before running YT Transcriptify, make sure you have the following dependencies installed on your system:

1. [Node.js](https://nodejs.org/en/)
2. [Make](https://www.gnu.org/software/make/) (optional)

## Installation

To install the required dependencies, run:

```bash
# install node modules
$ npm ci
# or using make
$ make install
```

## Usage

To run the app locally, use:

```bash
# run
$ npm start
# or using make
$ make develop
```

To run the app in production mode, use:

```bash
# build
$ npm run build:ssr

# run
$ npm run serve:ssr

# or using make
$ make prod
```

## Running Tests

To run the tests, use:

```bash
# run
$ npm run test

# or using make
$ make test
```
