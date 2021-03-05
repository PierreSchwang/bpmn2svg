# bpmn2svg
![CI Status](https://img.shields.io/github/workflow/status/PierreSchwang/bpmn2svg/ci)
![Docker Image Size](https://img.shields.io/docker/image-size/pierreschwang/bpmn2svg)
![Latest Docker Tag](https://img.shields.io/docker/v/pierreschwang/bpmn2svg)

<br />
Simple tool to convert bpmn models to pretty svg graphics using bpmn-js.

## Installation

**Recommended:** Using Docker: https://hub.docker.com/r/pierreschwang/bpmn2svg

1. Use one of the listed docker images from https://hub.docker.com/r/pierreschwang/bpmn2svg
2. Expose the http port (default: 8080)

Example: ``docker run -d -p 8080:8080 pierreschwang/bpmn2svg:latest`` (Uses the default port and exposes it)
<br />
<br />
*Alternative:* Clone this repository, run ``npm install`` and ``npm build ; node dist/index.js``

### Environment Variables

- HTTP_PORT » The port on which the internal http server should bind
- HTTP_HOST » The host on which the internal http server should bind

### Endpoints

- ``GET /:base64`` » Pass the base64 encoded XML BPMN model via get request.
- ``POST /`` » Body must contain raw XML of BPMN model.
