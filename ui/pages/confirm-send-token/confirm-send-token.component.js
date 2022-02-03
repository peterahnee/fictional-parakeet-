import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import ConfirmTokenTransactionBaseContainer from '../confirm-token-transaction-base';
import ConfirmTokenTransactionBase from '../confirm-token-transaction-base/confirm-token-transaction-base.component';
import { SEND_ROUTE } from '../../helpers/constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import { ASSET_TYPES, editTransaction } from '../../ducks/send';
import { useHistory, useParams } from 'react-router';
import {
  contractExchangeRateSelector,
  currentNetworkTxListSelector,
  getCurrentCurrency,
} from '../../selectors';
import {
  getConversionRate,
  getNativeCurrency,
} from '../../ducks/metamask/metamask';
import { ERC20, ERC721 } from '../../helpers/constants/common';
import { getMaximumGasTotalInHexWei } from '../../../shared/modules/gas.utils';

export default function ConfirmSendToken(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handlEditTransaction = ({
    txData,
    tokenData,
    tokenProps: assetDetails,
  }) => {
    const { id } = txData;
    dispatch(
      editTransaction(
        ASSET_TYPES.TOKEN,
        id.toString(),
        tokenData,
        assetDetails,
      ),
    );
  };

  const handleEdit = (confirmTransactionData) => {
    handlEditTransaction(confirmTransactionData);
    history.push(SEND_ROUTE);
  };
  const params = useParams();
  const currentNetworkTxList = useSelector(currentNetworkTxListSelector);
  const conversionRate = useSelector(getConversionRate);
  const nativeCurrency = useSelector(getNativeCurrency);
  const currentCurrency = useSelector(getCurrentCurrency);
  const contractExchangeRate = useSelector(contractExchangeRateSelector);
  const { id: paramsTransactionId } = params;

  // const {
  //   txData: {
  //     id: transactionId,
  //     txParams: { to: tokenAddress, data } = {},
  //   } = {},
  // } = confirmTransaction;

  const hexMaximumTransactionFee = getMaximumGasTotalInHexWei({
    gasLimit: props.transaction.gas ?? '0x0',
    gasPrice: props.transaction.gasPrice ?? '0x0',
  });
  // const { hexMaximumTransactionFee } = transactionFeeSelector(
  //   state,
  //   transaction,
  // );

  // const ethTransactionTotalMaxAmount = Number(
  //   hexWEIToDecETH(hexMaximumTransactionFee),
  // ).toFixed(6);

  let title, subtitle;

  if (props.assetStandard === ERC721) {
    title = props.assetName;
    subtitle = `#${props.tokenId}`;
  } else if (props.assetStandard === ERC20) {
    title = `${props.tokenAmount} ${props.tokenSymbol}`;
  }

  return (
    <ConfirmTokenTransactionBase
      onEdit={handleEdit}
      conversionRate={conversionRate}
      currentCurrency={currentCurrency}
      nativeCurrency={nativeCurrency}
      // hexMaximumTransactionFee={hexMaximumTransactionFee}
      contractExchangeRate={contractExchangeRate}
      title={title}
      subtitle={subtitle}
      {...props}
    />
  );
}

ConfirmSendToken.propTypes = {
  tokenAmount: PropTypes.string,
};
