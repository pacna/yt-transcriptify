# YT Transcriptify

<img alt="Test CI passing" src="https://github.com/pacna/yt-transcriptify/workflows/Test%20CI/badge.svg" />

YT Transcriptify is a web application designed to display a visual transcription of any YouTube video. It provides users with a visual format of the video's transcript, making it easier to read and follow along.

![yt-transcriptify](./docs/yt-transcriptify.png)

You can try it out [here](https://pacna.github.io/yt-transcriptify/) (**_note_**: you may need to install an extension to bypass any CORS related issues)

## Prerequisites

Before running YT Transcriptify, make sure you have the following dependencies installed on your system:

1. [Node.js](https://nodejs.org/en/)
2. [Make](https://www.gnu.org/software/make/)

## Installation

To install the required dependencies, run:

```bash
$ make install
```

## Running locally

To run YT Transcriptify on your local machine, execute the following command:

```bash
$ make local
```

After running the command, open your web browser and navigate to http://localhost:4200 to explore YT Transcriptify locally.

## Running Tests

To run the tests, execute the following command:

```bash
$ make test
```
