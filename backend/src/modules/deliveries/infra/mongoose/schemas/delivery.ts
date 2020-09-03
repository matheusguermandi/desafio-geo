import mongoose from 'mongoose';

const DeliveriesShema = new mongoose.Schema({
  name: { type: String, default: '' },
  weight: { type: Number, min: 0 },
  address: {
    street: { type: String, default: '' },
    number: { type: String, default: '' },
    neighborhood: { type: String, default: '' },
    complement: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country: { type: String, default: '' },
    geolocation: {
      longitude: { type: Number, min: -180, max: 180 },
      latitude: { type: Number, min: -90, max: 90 },
    },
  },
});

const Delivery = mongoose.model('Deliveries', DeliveriesShema);

export default Delivery;
