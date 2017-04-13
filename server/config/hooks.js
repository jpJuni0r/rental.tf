import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {HTTP} from 'meteor/http';

export default function () {
  Accounts.onCreateUser((options, user) => {
    user.profile = {
      name: '?',
      id: '?'
    };

    const {STEAM_API_KEY} = Meteor.settings;
    HTTP.get('http:\/\/api.steampowered.com/ISteamUser/GetPlayerSummaries/' +
              `v0002/?key=${STEAM_API_KEY}&steamids=${options.profile.id}`,
    (err, res) => {
      if (res.statusCode === 200) {
        const player = res.data.response.players[0];
        const name = player.personaname;

        Meteor.users.update({_id: user._id}, {$set: {
          'profile.name': name, 'profile.id': options.profile.id, 'profile.activeServer': false
        }});
      }
    });

    return user;
  });
}
