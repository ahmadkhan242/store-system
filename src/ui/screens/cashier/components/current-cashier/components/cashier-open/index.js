// @flow

import React, { Component, Fragment } from 'react';

import styled from 'styled-components';

import EntityComponent from '../../../../../../components/common/entity-component';

import TopActionButtons from './components/top-buttons-values';
import BottomValues from './components/bottom-valeus';

import config from './config';

const data = [{
  timestamp: 'Às 15:30',
  transactionType: 'Venda',
  customer: 'Stenio Wagner Pereira de freitas',
  username: 'swmyself',
  value: 'R$ 120,50',
  discount: 'R$ 10,00',
  total: 'R$ 500,00',
  valuePaid: 'R$ 500,00',
  isPending: 'Não',
}, {
  timestamp: 'Às 15:30',
  transactionType: 'Inserção',
  customer: 'Stenio Wagner Pereira de freitas',
  username: 'swmyself',
  value: 'R$ 120,50',
  discount: 'R$ 10,00',
  total: 'R$ 500,00',
  valuePaid: 'R$ 500,00',
  isPending: 'Não',
}, {
  timestamp: 'Às 15:30',
  transactionType: 'Retirada',
  customer: 'Stenio Wagner Pereira de freitas',
  username: 'swmyself',
  value: 'R$ 120,50',
  discount: 'R$ 10,00',
  total: 'R$ 500,00',
  valuePaid: 'R$ 500,00',
  isPending: 'Não',
}];

const Wrapper = styled.div`
  width: 100%;
  dispaly: flex;
  justify-content: space-between;
`;

type Props = {
  initialMoneyInCashier: string,
};

type State = {
  totalInputCashier: string,
  totalOutputCashier: string,
  totalProfit: string,
};

class CashierOpen extends Component<Props, State> {
  state = {
    takeAwayNoneyOperations: [],
    addMoneyOperations: [],
    totalOutputCashier: '0',
    totalProfit: '',
  };

  onAddMoneyCashier = (amount: string, reason: string): void => {
    const { addMoneyOperations } = this.state;

    const addMoneyCashierOperation = {
      value: Number(amount),
      reason,
    };

    this.setState({
      addMoneyOperations: [addMoneyCashierOperation, ...addMoneyOperations],
    });
  };

  onTakeAwaytMoneyCashier = (amount: string): void => {
    const { totalOutputCashier } = this.state;

    this.setState({
      totalOutputCashier: Number(totalOutputCashier) - Number(amount),
    });
  };

  calculateTotalInputCashier = (): number => {
    const { addMoneyOperations } = this.state;

    const total = addMoneyOperations.reduce((current, addOperation) => current + addOperation.value, 0);

    return total;
  };

  renderTopActioButtons = (): Object => (
    <TopActionButtons
      onAddMoneyCashier={this.onAddMoneyCashier}
    />
  );

  renderBottomValues = (): Object => {
    const { totalOutputCashier } = this.state;
    const { initialMoneyInCashier } = this.props;

    const totalInputCashier = this.calculateTotalInputCashier();

    return (
      <BottomValues
        initialMoneyInCashier={initialMoneyInCashier}
        totalOutputCashier={totalOutputCashier}
        totalInputCashier={totalInputCashier}
      />
    );
  };

  render() {
    return (
      <Fragment>
        <Wrapper>
          {this.renderTopActioButtons()}
          <EntityComponent
            tabConfig={config.tabConfig}
            onRemoveItem={() => {}}
            onCreateItem={() => {}}
            onEditItem={() => {}}
            singularEntityName=""
            pluralEntityName=""
            filterConfig={{}}
            dataset={data}
          />
          {this.renderBottomValues()}
        </Wrapper>
      </Fragment>
    );
  }
}

export default CashierOpen;