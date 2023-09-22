import React from 'react';
import { Text } from '@gympass/yoga';

import * as Styles from './SubItem.styles';

export type SubItemProps = {
  wrapper: React.FunctionComponent<any>;
  label: string;
};

const SubItem = ({ wrapper: Wrapper, label }: SubItemProps) => {
  return (
    <Styles.SubItem>
      <Wrapper>
        <Styles.Content>
          <Text.Small flex={1} numberOfLines={1} color="deep">
            {label}
          </Text.Small>
        </Styles.Content>
      </Wrapper>
    </Styles.SubItem>
  );
};

export default SubItem;
