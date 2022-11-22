import { PermissionConstraint } from '@metamask/controllers';
import { Json } from '@metamask/utils';

import {
  cronjobCaveatSpecifications,
  cronjobEndowmentBuilder,
  getCronjobCaveatMapper,
} from './cronjob';
import { ethereumProviderEndowmentBuilder } from './ethereum-provider';
import {
  keyringEndowmentBuilder,
  keyringCaveatSpecifications,
  getKeyringCaveatMapper,
} from './keyring';
import { longRunningEndowmentBuilder } from './long-running';
import { networkAccessEndowmentBuilder } from './network-access';
import {
  getTransactionInsightCaveatMapper,
  transactionInsightCaveatSpecifications,
  transactionInsightEndowmentBuilder,
} from './transaction-insight';

export const endowmentPermissionBuilders = {
  [networkAccessEndowmentBuilder.targetKey]: networkAccessEndowmentBuilder,
  [longRunningEndowmentBuilder.targetKey]: longRunningEndowmentBuilder,
  [transactionInsightEndowmentBuilder.targetKey]:
    transactionInsightEndowmentBuilder,
  [keyringEndowmentBuilder.targetKey]: keyringEndowmentBuilder,
  [cronjobEndowmentBuilder.targetKey]: cronjobEndowmentBuilder,
  [ethereumProviderEndowmentBuilder.targetKey]:
    ethereumProviderEndowmentBuilder,
} as const;

export const endowmentCaveatSpecifications = {
  ...keyringCaveatSpecifications,
  ...cronjobCaveatSpecifications,
  ...transactionInsightCaveatSpecifications,
};

export const endowmentCaveatMappers: Record<
  string,
  (value: Json) => Pick<PermissionConstraint, 'caveats'>
> = {
  [keyringEndowmentBuilder.targetKey]: getKeyringCaveatMapper,
  [cronjobEndowmentBuilder.targetKey]: getCronjobCaveatMapper,
  [transactionInsightEndowmentBuilder.targetKey]:
    getTransactionInsightCaveatMapper,
};

export * from './enum';