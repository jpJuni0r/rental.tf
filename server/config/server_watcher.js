import {Server} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {createServer, getIp, waitForOnline, watchStatus} from './server_manager';

export default function () {
  const noRent = Meteor.settings.DISABLE_RENTING;
  Server.find().observe({
    added(server) {
      const {stage} = server;
      if (stage === 1) {

        createServer(server, {fake: noRent});
      } else if (stage === 3) {
        waitForOnline(server, {fake: noRent});
      } else if (stage === 4) {
        watchStatus(server, {fake: noRent});
      }
    }
  });

  Server.find().observeChanges({
    changed(_id, fields) {
      const {stage} = fields;

      if (!stage) {
        return;
      }

      if (stage === 2) {
        getIp({_id}, {fake: noRent});
      } else if (stage === 3) {
        waitForOnline({_id}, {fake: noRent});
      } else if (stage === 4) {
        watchStatus({_id}, {fake: noRent});
      }
    }
  });
}
