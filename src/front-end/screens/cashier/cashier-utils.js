// @flow

import moment from 'moment';

import { CASHIER_OPERATIONS } from './components/current-cashier/components/cashier-open/components/top-buttons-values/dialog-config';

export const getNewCashierOperationData = (value: string, reason: string, type: string): Object => ({
  valueText: `R$ ${parseFloat(value).toFixed(2)}`,
  value: parseFloat(value),
  timestampText: moment().calendar(),
  salesman: 'swmyself',
  id: Math.random(),
  customerName: '-',
  discountText: '-',
  valuePaid: '-',
  totalText: '-',
  pending: '-',
  reason,
  type,
});

const getTotalPaymentValue = (paymentInfo: Object): number => {
  const valuePaid = Object.keys(paymentInfo).reduce((current, item) => current + Number(paymentInfo[item]), 0);

  return valuePaid;
};

const getDiscountText = ({ type, value }) => {
  let discountText = '-';

  if (type === 'percentage') {
    discountText = `${value}%`;
  }

  if (type === 'money') {
    discountText = `R$ ${Number(value).toFixed(2)}`;
  }

  return discountText;
};

export const parseSaleTableItem = (sale: Object): Object => {
  const {
    createdFromBudget,
    paymentInfo,
    customer,
    discount,
    subtotal,
    total,
  } = sale;

  const discountText = getDiscountText(discount);

  const valuePaid = getTotalPaymentValue(paymentInfo);
  const pending = valuePaid - total;

  return {
    ...sale,
    valueText: `R$ ${Number(subtotal).toFixed(2)}`,
    customerName: (customer ? customer.name : '-'),
    pending: `R$ ${Math.abs(pending).toFixed(2)}`,
    totalText: `R$ ${Number(total).toFixed(2)}`,
    valuePaid: `R$ ${valuePaid.toFixed(2)}`,
    timestampText: moment().calendar(),
    type: (createdFromBudget ? CASHIER_OPERATIONS.CONSOLIDATE_BUDGET_PAYMENT : CASHIER_OPERATIONS.SALE),
    discountText,
  };
};

export const calculateTotalProfit = (sales: Array<Object>): number => {
  let totalProfit = 0;

  const salesProducts = sales.map(sale => sale.products);

  salesProducts.forEach((saleProducts) => {
    totalProfit += saleProducts.reduce((current, product) => current + ((product.salePrice - product.costPrice) * product.quantity), 0);
  });

  return totalProfit;
};