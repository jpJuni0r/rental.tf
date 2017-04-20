# Rental.TF

Rental.TF is a service to rent TF2 servers on demand using [DigitalOcan](https://digitalocean.com) as a provider.


## Setup

1. Install Meteor

   ```$ curl https://install.meteor.com/ | sh```

1. Clone the repo
1. Adjust config

   `$ cp settings.json.exmaple settings.json`

   `STEAM_API_KEY` Get the Steam API key from https://steamcommunity.com/dev/apikey

   `DO_KEY` DigitalOcan API key https://cloud.digitalocean.com/settings/api/tokens

   `LOGS_KEY` logs.tf API key https://logs.tf/uploader

   `DEMOS_KEY` demos.tf API key https://demos.tf/upload

   `DISABLE_RENTING` (default false): It true it will not actually create a new DigitalOcan droplet (useful for testing)

1. `$ meteor npm install`
1. `$ npm start`


## License

See LICENSE.md
