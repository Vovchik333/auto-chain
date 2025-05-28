import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mapTransactionFromEtherscan } from '../common/helpers/map-transaction.helper';
import { Transaction, TransactionDocument } from 'src/schemas/transaction.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet, WalletDocument } from 'src/schemas/wallet.schema';
import { mapWalletFromDb } from '../common/helpers/map-wallet.helper';
import { WalletFilterDto } from './dto/wallet-filter.dto';
import { WalletDto } from '../common/dto/wallet.dto';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { CreateWalletFromBlockchainDto } from './dto/create-wallet-from-blockchain.dto';
import { ethers } from 'ethers';
import { findDeltas, findTargetSum, findTotalSum, findTransfers, getBalance, getInternalTxsFromEtherscan, getNormalTxsFromEtherscan } from './wallet.helpers';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletService {
  private etherscanApiUrl: string;
  private etherscanApiKey: string;
  
  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel(Wallet.name) private readonly walletModel: Model<WalletDocument>,
    private readonly configService: ConfigService
  ) {
    this.etherscanApiUrl = this.configService.get<string>('ETHERSCAN_API_URL');
    this.etherscanApiKey = this.configService.get<string>('ETHERSCAN_API_KEY');
  }

  async create(payload: CreateWalletDto) {
    const wallet = await this.walletModel.create(payload);

    return mapWalletFromDb(wallet);
  }

  async findByFilter(query: WalletFilterDto) {
    const wallets = await this.walletModel
      .find(query)
      .exec();

    return wallets.map(mapWalletFromDb);
  }

  async importTransactionsFromEtherscan(
    payload: CreateWalletFromBlockchainDto
  ): Promise<WalletDto> {
    const { address } = payload; 
    const normalTxsList = await getNormalTxsFromEtherscan(address, this.etherscanApiUrl, this.etherscanApiKey);
    const internalTxsList = await getInternalTxsFromEtherscan(address, this.etherscanApiUrl, this.etherscanApiKey);
    
    const wallet = await this.walletModel.create(payload);
    const mappedNormalTxs = normalTxsList.map(tx => mapTransactionFromEtherscan(tx, {...payload, walletId: wallet._id}, address));
    const mappedInternalTxs = internalTxsList.map(tx => mapTransactionFromEtherscan(tx, {...payload, walletId: wallet._id}, address, true));
    await this.transactionModel.insertMany([...mappedNormalTxs, ...mappedInternalTxs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));

    return mapWalletFromDb(wallet);
  }

  async getSuggestionsForDiversification(walletIds: string[]) {;
    const wallets = await this.walletModel
      .find({ _id: { $in: walletIds } })
      .exec();
    
    const txs = await this.transactionModel
      .find({ 
        walletId: { $in: walletIds },
        status: 'Success' 
      })
      .exec();
    

    const walletsWithBalances = wallets.map(wallet => {
      const walletTxs = txs.filter(tx => tx.walletId === wallet._id.toString());
      const balance = getBalance(walletTxs, wallet.address);

      return {
        address: wallet.address,
        balance
      };
    })

    const total = findTotalSum(walletsWithBalances);
    const target = findTargetSum(total, BigInt(wallets.length));
    const deltas = findDeltas(walletsWithBalances, target);
    const transfers = findTransfers(deltas);

    return {
      total: ethers.formatUnits(total, "ether"),
      target: ethers.formatUnits(target, "ether"),
      transfers
    };
  }

  async updateById(id: string, payload: UpdateWalletDto) {
    const wallet = await this.walletModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
    
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    return mapWalletFromDb(wallet);
  }

  async deleteById(id: string) {
    const objectId = new Types.ObjectId(id);

    const wallet = await this.walletModel
      .findByIdAndDelete(objectId)
      .exec();

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    await this.transactionModel
      .deleteMany({ walletId: objectId })
      .exec();
  }
}
