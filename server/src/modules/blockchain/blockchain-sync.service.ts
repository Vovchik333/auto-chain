import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ethers } from 'ethers';
import { Transaction, TransactionDocument } from 'src/schemas/transaction.schema';
import { Wallet, WalletDocument } from 'src/schemas/wallet.schema';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BlockchainSyncService {
  private readonly logger = new Logger(BlockchainSyncService.name);
  private provider: ethers.JsonRpcProvider;

  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel(Wallet.name) private readonly walletModel: Model<WalletDocument>,
  ) {
    this.provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);
  }

  // @Cron(CronExpression.EVERY_5_MINUTES)
  // async syncWallets() {
  //   try {
  //     const wallets = await this.walletModel.find().exec();
      
  //     for (const wallet of wallets) {
  //       if (!wallet.isSyncWithBlockchain) {
  //         await this.syncWalletTransactions(wallet);
  //       }
  //     }
  //   } catch (error) {
  //     this.logger.error('Failed to sync wallets:', error);
  //   }
  // }

  // private async syncWalletTransactions(wallet: WalletDocument) {
  //   try {
  //     // Get the latest block number
  //     const latestBlock = await this.provider.getBlockNumber();
      
  //     // Get the last synced block for this wallet
  //     const lastSyncedBlock = wallet.lastSyncedBlock || latestBlock - 10000; // Default to last 10000 blocks
      
  //     // Fetch blocks and filter transactions for the wallet address
  //     const blocks = await Promise.all(
  //       Array.from({ length: latestBlock - lastSyncedBlock + 1 }, (_, i) => 
  //         this.provider.getBlock(lastSyncedBlock + i, true)
  //       )
  //     );

  //     const history = blocks
  //       .filter(block => block !== null)
  //       .flatMap(block => block!.prefetchedTransactions)
  //       .filter(tx => 
  //         tx.from.toLowerCase() === wallet.address.toLowerCase() || 
  //         tx.to?.toLowerCase() === wallet.address.toLowerCase()
  //       );

  //     for (const tx of history) {
  //       // Check if transaction already exists
  //       const existingTx = await this.transactionModel.findOne({ hash: tx.hash }).exec();
  //       if (existingTx) continue;

  //       const receipt = await tx.wait();
  //       if (!receipt) continue;

  //       // Determine transaction type
  //       const type = tx.from.toLowerCase() === wallet.address.toLowerCase() ? 'withdraw' : 'deposit';

  //       // Create new transaction
  //       const newTransaction = new this.transactionModel({
  //         hash: tx.hash,
  //         from: tx.from,
  //         to: tx.to,
  //         value: ethers.formatEther(tx.value),
  //         date: new Date((await tx.getBlock()).timestamp * 1000),
  //         status: receipt.status === 1 ? 'Success' : 'Failed',
  //         txnFee: ethers.formatEther(receipt.gasUsed * receipt.gasPrice),
  //         category: 'transfer', // Default category
  //         walletId: wallet._id,
  //         type,
  //       });

  //       await newTransaction.save();
  //     }

  //     // Update last synced block
  //     wallet.lastSyncedBlock = latestBlock;
  //     await wallet.save();

  //     this.logger.log(`Synced wallet ${wallet.address} from block ${lastSyncedBlock} to ${latestBlock}`);
  //   } catch (error) {
  //     this.logger.error(`Failed to sync wallet ${wallet.address}:`, error);
  //   }
  // }

  // // Manual sync endpoint for immediate updates
  // async syncWalletById(walletId: string) {
  //   const wallet = await this.walletModel.findById(walletId).exec();
  //   if (!wallet) {
  //     throw new Error('Wallet not found');
  //   }
  //   await this.syncWalletTransactions(wallet);
  //   return { message: 'Wallet sync completed' };
  // }
} 