/* eslint-disable jest/require-top-level-describe */
import { render, screen } from '@testing-library/react';
import React from 'react';

import {
  BACKGROUND_COLORS,
  BORDER_COLORS,
  TEXT_COLORS,
} from '../../../helpers/constants/design-system';

import { AvatarToken } from './avatar-token';

describe('AvatarToken', () => {
  const args = {
    name: 'ast',
    src: './AST.png',
    showHalo: false,
  };

  it('should render correctly', () => {
    const { getByTestId, container } = render(
      <AvatarToken {...args} data-testid="avatar-token" />,
    );
    expect(getByTestId('avatar-token')).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  it('should render image Avatar', () => {
    render(<AvatarToken {...args} data-testid="avatar-token" />);
    const image = screen.getByRole('img');
    expect(image).toBeDefined();
    expect(image).toHaveAttribute('src', args.src);
  });

  it('should render the first letter of the name prop if no src is provided', () => {
    const { getByText } = render(
      <AvatarToken {...args} data-testid="avatar-token" src="" />,
    );
    expect(getByText('a')).toBeDefined();
  });

  it('should render halo effect if showHalo is true and image url is there', () => {
    render(<AvatarToken {...args} data-testid="avatar-token" showHalo />);
    const image = screen.getAllByRole('img', { hidden: true });
    expect(image[1]).toHaveClass('mm-avatar-token__token-image--size-reduced');
  });

  it('should render the first letter of the name prop when showHalo is true and no image url is provided', () => {
    const { getByText } = render(
      <AvatarToken {...args} src="" data-testid="avatar-token" showHalo />,
    );
    expect(getByText('a')).toBeDefined();
  });
  // className
  it('should render with custom className', () => {
    const { getByTestId } = render(
      <AvatarToken data-testid="avatar-token" className="test-class" />,
    );
    expect(getByTestId('avatar-token')).toHaveClass('test-class');
  });
  // color
  it('should render with different colors', () => {
    const { getByTestId } = render(
      <>
        <AvatarToken
          color={TEXT_COLORS.successDefault}
          data-testid={TEXT_COLORS.successDefault}
        />
        <AvatarToken
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
        <AvatarToken
          backgroundColor={BACKGROUND_COLORS.successDefault}
          data-testid={BACKGROUND_COLORS.successDefault}
        />
        <AvatarToken
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
  it('should render with different border BORDER_COLORS', () => {
    const { getByTestId } = render(
      <>
        <AvatarToken
          borderColor={BORDER_COLORS.successDefault}
          data-testid={BORDER_COLORS.successDefault}
        />
        <AvatarToken
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
