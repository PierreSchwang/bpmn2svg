<h1 align="center">bpmn2svg</h1>
<p align="center">⚡ blazing fast xml to svg bpmn converter ⚡</p>
<div align="center">
    <img src="https://img.shields.io/github/workflow/status/PierreSchwang/bpmn2svg/ci">
    <a href="https://hub.docker.com/r/pierreschwang/bpmn2svg">
        <img src="https://img.shields.io/docker/image-size/pierreschwang/bpmn2svg">
    </a>
    <a href="https://hub.docker.com/r/pierreschwang/bpmn2svg">
        <img src="https://img.shields.io/docker/v/pierreschwang/bpmn2svg">
    </a>
</div>

## Installation

**Recommended:** Using Docker: https://hub.docker.com/r/pierreschwang/bpmn2svg

1. Use one of the listed docker images from https://hub.docker.com/r/pierreschwang/bpmn2svg
2. Expose the http port (default: 8080)

Example: ``docker run -d -p 8080:8080 pierreschwang/bpmn2svg:development`` (Uses the default port and exposes it)
<br />
<br />
*Alternative:* Clone this repository, run ``npm install`` and ``npm build ; node dist/index.js``

### Environment Variables

- HTTP_PORT » The port on which the internal http server should bind. Default: ``8080``
- HTTP_HOST » The host on which the internal http server should bind. Default: ``0.0.0.0``
- LOG_LEVEL » Defines, on which level the logger should print to the console. Default: ``info``

### Endpoints

- ``GET /:base64`` » Pass the base64 encoded XML BPMN model via get request.
- ``POST /``
  - Body must contain raw XML of BPMN model. **or**
  - Pass file via form-data field.
