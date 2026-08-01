import test from 'node:test';
import assert from 'node:assert/strict';
import { becomeSellerSchema } from '../src/validators/seller.validator.js';

test('becomeSellerSchema accepts a direct seller payload', () => {
  const payload = {
    shopName: 'Snitch Store',
    description: 'A reliable marketplace for local sellers',
    phone: '9876543210',
    address: '123 Main Street, Bengaluru',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    pincode: '560001',
    upiId: 'seller@upi',
  };

  const result = becomeSellerSchema.parse(payload);

  assert.equal(result.shopName, payload.shopName);
  assert.equal(result.city, payload.city);
});
