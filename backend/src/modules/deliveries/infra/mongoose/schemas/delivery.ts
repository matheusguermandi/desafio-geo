import mongoose from 'mongoose';

const DeliveriesShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  num: {
    type: Number,
  },
  neighborhood: {
    type: String,
  },
  complement: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

const Delivery = mongoose.model('Deliveries', DeliveriesShema);

export default Delivery;
