import React from 'react';
import styled, { css } from 'styled-components';
import { string, node } from 'prop-types';

import Content from '../Card/Content';
import Text from '../../../Text';
import theme from '../../../Theme/helpers/themeReader';
import Subtitle from './Subtitle';

const Title = styled(Text.H4)`
  ${(props) => {
    const {
      components: { cardnative, card },
    } = theme(props);

    return css`
      color: ${card.plan.title.color};
      margin-top: ${cardnative.plan.title.margin.top}px;
      margin-bottom: ${cardnative.plan.title.margin.bottom}px;
    `;
  }}
`;

const Description = styled(Text.Small)`
  height: 40px;

  color: ${theme.components.card.plan.description.color};
`;

const Price = styled.View`
  flex-direction: row;

  ${(props) => {
    const {
      components: {
        cardnative: { plan },
      },
    } = theme(props);

    return css`
      margin-bottom: ${plan.price.margin.bottom}px;
    `;
  }}
`;

const EnhancePrice = styled.View`
  ${({ align }) => `
    align-self: ${align};
  `}
`;

const Currency = styled(EnhancePrice)`
  margin-right: ${theme.components.card.plan.price.currency.margin.right}px;
`;

const PlanCardContent = ({
  title,
  subtitle,
  description,
  currency,
  suffix,
  price,
  period,
  children,
  ...rest
}) => (
  <Content {...rest}>
    {subtitle && <Subtitle>{subtitle}</Subtitle>}
    {title && <Title>{title}</Title>}
    {description && <Description numberOfLines={2}>{description}</Description>}
    <Price>
      {currency && (
        <Currency align="flex-start">
          <Text.Small>{currency}</Text.Small>
        </Currency>
      )}
      {price && <Text.H4>{price}</Text.H4>}
      {period && (
        <EnhancePrice align="flex-end">
          <Text.Small>{`${suffix || ''}${period}`}</Text.Small>
        </EnhancePrice>
      )}
    </Price>
    {children}
  </Content>
);

PlanCardContent.propTypes = {
  /** plan name */
  title: string.isRequired,
  /** currency of the current country */
  currency: string,
  /** suffix currency of the current country */
  suffix: string,
  price: string.isRequired,
  /** period that this price will be charged  */
  period: string.isRequired,
  description: string,
  subtitle: string,
  children: node,
};

PlanCardContent.defaultProps = {
  children: null,
  description: null,
  subtitle: null,
  currency: null,
  suffix: null,
};

PlanCardContent.displayName = 'PlanCard.Content';

export default PlanCardContent;
