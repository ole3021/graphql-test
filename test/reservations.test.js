'use strict';

const request = require('supertest');

const app = require('../server/server');

describe('Reservations REST API', () => {
  let reservationId = null;

  it('should create a reservation', async () => {
    const { body: reservation } = await request(app)
      .post('/api/reservations')
      .send({
        guestName: 'Oliver Wang',
        hotelName: 'Brand Hotel',
        arrivalAt: '2019-05-05T12:00:00.000Z',
        departureAt: '2019-05-07T13:00:00.000Z'
      })
      .expect(200);

    expect(reservation).toHaveProperty('id');
    expect(reservation.guestName).toEqual('Oliver Wang');
    expect(reservation.hotelName).toEqual('Brand Hotel');
    expect(reservation.arrivalAt).toEqual('2019-05-05T12:00:00.000Z');
    expect(reservation.departureAt).toEqual('2019-05-07T13:00:00.000Z');

    reservationId = reservation.id;
  });

  it('should can fetch a reservation by id', async () => {
    const { body: reservation } = await request(app)
      .get(`/api/reservations/${reservationId}`)
      .expect(200);

    expect(reservation).toHaveProperty('id');
    expect(reservation.guestName).toEqual('Oliver Wang');
    expect(reservation.hotelName).toEqual('Brand Hotel');
    expect(reservation.arrivalAt).toEqual('2019-05-05T12:00:00.000Z');
    expect(reservation.departureAt).toEqual('2019-05-07T13:00:00.000Z');
  });

  it('should can fetch all reservations', async () => {
    const { body: reservations } = await request(app)
      .get(`/api/reservations`)
      .expect(200);

    expect(reservations.length).toBeGreaterThan(0);
    expect(reservations[0]).toHaveProperty('guestName');
    expect(reservations[0]).toHaveProperty('hotelName');
    expect(reservations[0]).toHaveProperty('arrivalAt');
    expect(reservations[0]).toHaveProperty('departureAt');
  });
});

describe('Reservations GraphQL Endpoints', () => {
  let reservationId = null;

  it('should create a reservation', async () => {
    const createReservation = `
      mutation($data: ReservationInput!) {
        createReservation(data: $data) {
          id
          guestName
          hotelName
          arrivalAt
          departureAt
        }
      }
    `;

    const createVariable = {
      data: {
        guestName: 'Oliver Wang',
        hotelName: 'Brand Hotel',
        arrivalAt: '2019-05-05T12:00:00.000Z',
        departureAt: '2019-05-07T13:00:00.000Z'
      }
    };

    const { body } = await request(app)
      .post('/graphql')
      .send({
        query: createReservation,
        variables: createVariable
      })
      .expect(200);

    const { createReservation: reservation } = body.data;

    expect(reservation).toHaveProperty('id');
    expect(reservation.guestName).toEqual('Oliver Wang');
    expect(reservation.hotelName).toEqual('Brand Hotel');
    expect(reservation.arrivalAt).toEqual('2019-05-05T12:00:00.000Z');
    expect(reservation.departureAt).toEqual('2019-05-07T13:00:00.000Z');

    reservationId = reservation.id;
  });

  it('should can fetch a reservation by id', async () => {
    const fetchReservation = `
      query($id: ID!) {
        getReservation(id: $id) {
          id
          guestName
          hotelName
          arrivalAt
          departureAt
        }
      }
    `;

    const fetchVariable = {
      id: reservationId
    };

    const { body } = await request(app)
      .post('/graphql')
      .send({
        query: fetchReservation,
        variables: fetchVariable
      })
      .expect(200);

    const { getReservation: reservation } = body.data;

    expect(reservation).toHaveProperty('id');
    expect(reservation.guestName).toEqual('Oliver Wang');
    expect(reservation.hotelName).toEqual('Brand Hotel');
    expect(reservation.arrivalAt).toEqual('2019-05-05T12:00:00.000Z');
    expect(reservation.departureAt).toEqual('2019-05-07T13:00:00.000Z');
  });

  it('should can fetch all reservations', async () => {
    const fetchReservations = `
    query ($query: QueryInput){
      totalReservations
      reservations(query: $query){
        id
        guestName
        hotelName
        arrivalAt
        departureAt
      }
    }    
  `;

    const { body } = await request(app)
      .post('/graphql')
      .send({
        query: fetchReservations
      })
      .expect(200);

    const { totalReservations: total, reservations } = body.data;

    expect(total).toBeGreaterThan(0);
    expect(reservations[0]).toHaveProperty('guestName');
    expect(reservations[0]).toHaveProperty('hotelName');
    expect(reservations[0]).toHaveProperty('arrivalAt');
    expect(reservations[0]).toHaveProperty('departureAt');
  });
});
