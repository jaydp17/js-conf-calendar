export const handler = function(event: any, context: any, callback: any) {
  console.log('hello');
  callback(null, 'hello');
};
