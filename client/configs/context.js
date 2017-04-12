import * as Collections from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Random} from 'meteor/random';
import {FlowRouter} from 'meteor/kadira:flow-router';
import t from 'tcomb-form';
import moment from 'moment';

export default function () {
  return {
    Collections,
    Meteor,
    check,
    Random,
    FlowRouter,
    t,
    moment
  };
}
