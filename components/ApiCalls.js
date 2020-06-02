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
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  return fetch(
    BASE + '/items?product=' + item + '&at_risk_user_id=' + userId,
    requestOptions,
  );
  // .then((response) => response.text())
  // .then((result) => console.log(result))
  // .catch((error) => console.log('error', error));
};

export const postVolunteer = async (user) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify({
    name: user.name,
    phone_number: user.phone,
  });
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  fetch(BASE + '/volunteer/' + user.id, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
};

export const getLists = () => {
  return fetch(BASE + '/listshoppinglists/')
    .then((response) => response.json())
    .catch((error) => console.log('error', error));
};

export const getList = (id) => {
  return fetch(BASE + '/shoppinglist/' + id)
    .then((response) => response.json())
    .catch((error) => console.log('error', error));
};

export const getAtRiskUser = (id) => {
  return fetch(BASE + '/atriskuser/' + id)
    .then((response) => response.json())
    .catch((error) => console.log('error', error));
};

export const updateList = (list) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify({
    status: list.status,
    items: list.items,
  });
  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  return fetch(BASE + '/shoppinglist/' + list.id, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
};
