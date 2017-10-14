import { format } from 'date-fns';

import { get as getData } from './data';
import { getImmediateNext } from './utility';
import { nextConf as sayNextConf } from './speak';

export default {
  LaunchRequest: function() {
    this.emit('NextConf');
  },
  NextConf: async function() {
    const confList = await getData();
    const nextConfs = getImmediateNext(confList);
    this.response.speak(sayNextConf(nextConfs));
    this.emit(':responseReady');
  },
  SessionEndedRequest: function() {
    console.log('Session ended with reason: ' + this.event.request.reason);
  },
  'AMAZON.StopIntent': function() {
    this.response.speak('Bye');
    this.emit(':responseReady');
  },
  'AMAZON.HelpIntent': function() {
    this.response.speak("You can try: 'alexa, hello world' or 'alexa, ask hello world my" + " name is awesome Aaron'");
    this.emit(':responseReady');
  },
  'AMAZON.CancelIntent': function() {
    this.response.speak('Bye');
    this.emit(':responseReady');
  },
  Unhandled: function() {
    this.response.speak(
      "Sorry, I didn't get that. You can try: 'alexa, hello world'" +
        " or 'alexa, ask hello world my name is awesome Aaron'",
    );
  },
};
