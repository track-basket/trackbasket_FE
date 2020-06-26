const BASE = 'https://trackbasket.herokuapp.com';

export const atRiskProfileHandler = (user, methodType) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  let raw = JSON.stringify({
    name: user.name,
    address: user.address,
    phone_number: user.phone,
    zipcode: user.zip,
    city: user.city,
    state: user.state,
  });
  let requestOptions = {
    method: methodType,
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  return fetch(BASE + '/atriskuser/' + user.id, requestOptions).catch((error) =>
    console.log('error', error),
  );
};

export const volunteerProfileHandler = (user, methodType) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  let raw = JSON.stringify({
    name: user.name,
    phone_number: user.phone,
  });
  let requestOptions = {
    method: methodType,
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  return fetch(BASE + '/volunteer/' + user.id, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log('error', error));
};

export const fetchItems = (item, userId) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  return fetch(
    BASE + '/items?product=' + item + '&at_risk_user_id=' + userId,
    requestOptions,
  ).catch((error) => console.log('error', error));
};

export const postVolunteer = async (user) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  let raw = JSON.stringify({
    name: user.name,
    phone_number: user.phone,
  });
  let requestOptions = {
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
    .then((data) => ({ ...data, id }))
    .catch((error) => console.log('error', error));
};

export const getAtRiskUser = (id) => {
  return fetch(BASE + '/atriskuser/' + id)
    .then((response) => response.json())
    .catch((error) => console.log('error', error));
};

export const updateList = (list) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  let data = {
    status: list.status,
    volunteer_id: list.volunteerId,
    items: list.items.map((item) => ({
      aisle_number: item.aisle_number,
      description: item.description,
      image: item.image,
      quantity: item.quantity,
      unit_price: item.unit_price,
      upc: item.upc,
    })),
  };
  let raw = JSON.stringify(data);
  let requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  return fetch(BASE + '/shoppinglist/' + list.at_risk_user_id, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log('error', error));
};

export const postList = (list) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  let raw = JSON.stringify({
    status: list.status,
    items: list.items,
  });
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  return fetch(BASE + '/shoppinglist/' + list.id, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log('error', error));
};
