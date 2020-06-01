import React from 'react';

const BASE = 'https://trackbasket.herokuapp.com';

export const atRiskProfileHandler = (user, methodType) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify({
    name: user.name,
    address: user.address,
    phone_number: user.phone,
    zipcode: user.zip,
    city: user.city,
    state: user.state,
  });
  var requestOptions = {
    method: methodType,
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  fetch(BASE + '/atriskuser/' + user.id, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
};

export const volunteerProfileHandler = (user, methodType) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify({
    name: user.name,
    phone_number: user.phone,
  });
  var requestOptions = {
    method: methodType,
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  fetch(BASE + '/volunteer/' + user.installationId, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
};

export const fetchItems = (item, userId) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify({
    at_risk_user_id: userId,
  });
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    body: raw,
  };
  fetch(BASE + '/items/' + item.name, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
};
