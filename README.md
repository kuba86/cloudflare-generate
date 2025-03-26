# Generate
A simple Cloudflare Worker application that generates random usernames and collects basic visitor information.
## Overview
This project implements a Cloudflare Worker that:
1. Serves a web interface with username generation functionality
2. Collects visitor information (IP, geolocation, etc.)
3. Sends notifications to an ntfy.sh channel when visitors access the site

## Features
- **Username Generation**: Provides a simple interface to generate random usernames
- **IP Information**: Uses ipinfo.io API to gather information about visitor IP addresses
- **Notification System**: Sends visitor data to a configured ntfy.sh channel
- **Bootstrap UI**: Implements a clean, responsive interface using Bootstrap 5

## Technologies Used
- **Cloudflare Workers**: Serverless JavaScript runtime
- **Wrangler CLI**: Development and deployment tool for Cloudflare Workers
- **Bootstrap 5**: Frontend framework for responsive design
- **GitHub Actions**: CI/CD for automatic deployment

## Development Setup
1. Clone the repository
2. Install dependencies:
``` bash
   npm install
```
1. Start local development server:
``` bash
wrangler dev
```
## Deployment
### Manual Deployment
To deploy the application manually:
``` bash
wrangler deploy
```
### Automated Deployment
The project uses GitHub Actions for continuous deployment. Any push to the `main` branch triggers automatic deployment to Cloudflare.
## Environment Variables
The following environment variables need to be configured in your Cloudflare Worker:
- `ipinfo_token`: API token for ipinfo.io service
- `ntfy_token`: Authentication token for ntfy.sh notifications

## Scripts
- `npm run start`: Run the application locally using Wrangler
- `npm run deploy`: Deploy the application to Cloudflare
- `npm run update`: Update dependencies to their latest versions

## License
This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).
Created and maintained by [kuba86](https://kuba86.com)
