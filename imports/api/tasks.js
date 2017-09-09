import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Markers = new Mongo.Collection('markers');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('markers', function markersPublication() {
    return Markers.find();
  });
}

Meteor.methods({
  'markers.insert'(marker) {
    check(marker, Object);

    Markers.insert({
      ...marker,
    });
  },
  'markers.remove'(markerId) {
    check(markerId, String);

    Markers.remove(markerId);
  },
  'markers.newDescription'(markerId, description) {
    check(markerId, String);
    check(description, String);

    Markers.update(markerId, { $set: { description } });
  }
});
