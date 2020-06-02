import React from 'react';

const BASE = 'https://trackbasket.herokuapp.com';

export const postAtRiskUser = async (user) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify({
    name: user.name,
    address: user.address,
    city: user.city,
    zipcode: user.zip,
    phone_number: user.phone,
  });
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  fetch(BASE + '/atriskuser/' + user.id, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
};

export const patchAtRiskUser = async (user) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify({
    name: user.name,
    address: user.address,
    city: user.city,
    state: 'Colorado',
    zipcode: user.zip,
    phone_number: user.phone,
  });
  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  fetch(BASE + '/atriskuser/' + user.id, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
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
