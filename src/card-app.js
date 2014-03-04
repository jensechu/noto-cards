/** @jsx React.DOM */
console.log('hi');

React.renderComponent(
  React.DOM.h1(null, 'Hello, world!'),
  document.getElementById('example')
);
