import * as Alexa from 'alexa-sdk';
import handlers from './handlers';

export const handler = function(event: any, context: any) {
  const alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};
