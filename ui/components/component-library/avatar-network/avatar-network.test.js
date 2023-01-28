/* eslint-disable jest/require-top-level-describe */
import { render, screen } from '@testing-library/react';
import React from 'react';

import { BACKGROUND_COLORS, BORDER_COLORS, TEXT_COLORS } from '../../../helpers/constants/design-system';

import { AvatarNetwork } from './avatar-network';

describe('AvatarNetwork', () => {
  const args = {
    name: 'ethereum',
    src: './images/eth_logo.svg',
    showHalo: false,
  };

  it('should render correctly', () => {
    const { getByTestId, container } = render(
      <AvatarNetwork data-testid="avatar-network" />,
    );
    expect(getByTestId('avatar-network')).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  it('should render image of Avatar Network', () => {
    render(<AvatarNetwork data-testid="avatar-network" {...args} />);
    const image = screen.getByRole('img');
    expect(image).toBeDefined();
    expect(image).toHaveAttribute('src', args.src);
  });

  it('should render the first letter of the name prop if no src is provided', () => {
    const { getByText } = render(
      <AvatarNetwork data-testid="avatar-network" {...args} src="" />,
    );
    expect(getByText('e')).toBeDefined();
  });

  it('should render halo effect if showHalo is true and image url is there', () => {
    render(<AvatarNetwork data-testid="avatar-network" {...args} showHalo />);
    const image = screen.getAllByRole('img', { hidden: true });
    expect(image[1]).toHaveClass(
      'mm-avatar-network__network-image--size-reduced',
    );
  });

  it('should render the first letter of the name prop when showHalo is true and no image url is provided', () => {
    const { getByText } = render(
      <AvatarNetwork {...args} src="" data-testid="avatar-network" showHalo />,
    );
    expect(getByText('e')).toBeDefined();
  });
  // className
  it('should render with custom className', () => {
    const { getByTestId } = render(
      <AvatarNetwork data-testid="avatar-network" className="test-class" />,
    );
    expect(getByTestId('avatar-network')).toHaveClass('test-class');
  });
  // color
  it('should render with different colors', () => {
    const { getByTestId } = render(
      <>
        <AvatarNetwork
          color={TEXT_COLORS.successDefault}
          data-testid={TEXT_COLORS.successDefault}
        />
        <AvatarNetwork
          color={TEXT_COLORS.errorDefault}
          data-testid={TEXT_COLORS.errorDefault}
        />
      </>,
    );
    expect(getByTestId(TEXT_COLORS.successDefault)).toHaveClass(
      `box--color-${TEXT_COLORS.successDefault}`,
    );
    expect(getByTestId(TEXT_COLORS.errorDefault)).toHaveClass(
      `box--color-${TEXT_COLORS.errorDefault}`,
    );
  });
  // background color
  it('should render with different background colors', () => {
    const { getByTestId } = render(
      <>
        <AvatarNetwork
          backgroundColor={BACKGROUND_COLORS.successDefault}
          data-testid={BACKGROUND_COLORS.successDefault}
        />
        <AvatarNetwork
          backgroundColor={BACKGROUND_COLORS.errorDefault}
          data-testid={BACKGROUND_COLORS.errorDefault}
        />
      </>,
    );
    expect(getByTestId(BACKGROUND_COLORS.successDefault)).toHaveClass(
      `box--background-color-${BACKGROUND_COLORS.successDefault}`,
    );
    expect(getByTestId(BACKGROUND_COLORS.errorDefault)).toHaveClass(
      `box--background-color-${BACKGROUND_COLORS.errorDefault}`,
    );
  });
  // border color
  it('should render with different border colors', () => {
    const { getByTestId } = render(
      <>
        <AvatarNetwork
          borderColor={BORDER_COLORS.successDefault}
          data-testid={BORDER_COLORS.successDefault}
        />
        <AvatarNetwork
          borderColor={BORDER_COLORS.errorDefault}
          data-testid={BORDER_COLORS.errorDefault}
        />
      </>,
    );
    expect(getByTestId(BORDER_COLORS.successDefault)).toHaveClass(
      `box--border-color-${BORDER_COLORS.successDefault}`,
    );
    expect(getByTestId(BORDER_COLORS.errorDefault)).toHaveClass(
      `box--border-color-${BORDER_COLORS.errorDefault}`,
    );
  });
});
