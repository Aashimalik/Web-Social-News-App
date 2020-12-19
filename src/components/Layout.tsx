import React from 'react';
import { Wrapper, WrapperVariant } from './Wrapper';
import { NavBar } from './NavBar';

interface LayoutProps {
  variant?: WrapperVariant;
  height?: Boolean;
}

export const Layout: React.FC<LayoutProps> = ({ variant, children, height }) => {
    return(
      <>
        <NavBar />
        <Wrapper variant={variant} height={height}>
          {children}
        </Wrapper>
      </>
    )
}