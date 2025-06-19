import { ethers } from "ethers";
import { TransferDto } from "./dto/transfer.dto";
import { EtherscanNormalTransactionDto } from "../common/dto/etherscan-normal-transaction.dto";
import { EtherscanResponseDto } from "../common/dto/etherscan-response.dto";
import { BadRequestException } from "@nestjs/common";
import { mapObjectToQuery } from "src/utils/query/query.utils";
import { Transaction } from "src/schemas/transaction.schema";

type AddressAndBalance = {
  address: string;
  balance: bigint;
};

export const findTotalSum = (wallets: AddressAndBalance[]) => {
  return wallets.reduce((sum, wallet) => sum + wallet.balance, 0n);
};

export const findTargetSum = (total: bigint, numberItems: bigint) => {
  return total / numberItems;
};

export const findDeltas = (wallets: AddressAndBalance[], target: bigint) => {
  return wallets.map(wallet => {
    return {
      address: wallet.address,
      balance: wallet.balance - target
    };
  });
}

export const findTransfers = (deltas: AddressAndBalance[], ) => {
  const transfers: TransferDto[] = [];

  for (let i = 0; i < deltas.length; i++) {
    if (deltas[i].balance <= 0n) continue;

    for (let j = 0; j < deltas.length; j++) {
      if (deltas[i].balance === 0n) break;

      if (deltas[j].balance < 0n) {
        const amount = deltas[i].balance < -deltas[j].balance ? deltas[i].balance : -deltas[j].balance;

        transfers.push({
          from: deltas[i].address,
          to: deltas[j].address,
          amount: ethers.formatUnits(amount, "ether")
        });

        deltas[i].balance -= amount;
        deltas[j].balance += amount;
      }
    }
  }

  return transfers;
}

export const getBalance = (transactions: Transaction[], ownerAddress: string) => {
  const balance = transactions.reduce((acc, tx) => {
    const value = ethers.parseUnits(tx.value.toString(), "ether");
    const fee = ethers.parseUnits(tx.txnFee.toString(), "ether");
    
    if (tx.to.toLowerCase() === ownerAddress.toLowerCase()) {
      return acc + value;
    } else if (tx.from.toLowerCase() === ownerAddress.toLowerCase()) {
      return acc - value - fee;
    }
    return acc;
  }, ethers.getBigInt(0));

  return balance;
}

export const getNormalTxsFromEtherscan = async (
  address: string,
  url: string,
  apikey: string
) => {
  const query = mapObjectToQuery({
    chainId: 1,
    module: 'account',
    action: 'txlist',
    address,
    startblock: 0,
    endblock: 99999999,
    page: 1,
    offset: 10000,
    sort: 'desc',
    apikey
  });

  const response = await fetch(
    `${url}?${query}`,
  );

  const data = await response.json() as EtherscanResponseDto;

  if (data.status === '0' && !Array.isArray(data.result)) {
    throw new BadRequestException(data.result);
  }

  return data.result as EtherscanNormalTransactionDto[];
}

export const getInternalTxsFromEtherscan = async (
  address: string,
  url: string,
  apikey: string
) => {
  const query = mapObjectToQuery({
    chainId: 1,
    module: 'account',
    action: 'txlistinternal',
    address,
    startblock: 0,
    endblock: 99999999,
    page: 1,
    offset: 10000,
    sort: 'desc',
    apikey
  });

  const response = await fetch(
    `${url}?${query}`,
  );

  const data = await response.json() as EtherscanResponseDto;

  if (data.status === '0' && !Array.isArray(data.result)) {
    throw new BadRequestException(data.result);
  }

  return data.result as EtherscanNormalTransactionDto[];
}