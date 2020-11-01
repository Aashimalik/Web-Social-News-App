import React from 'react';
import { Box } from '@chakra-ui/core';
import { theme as chakraTheme } from '@chakra-ui/core'

interface WrapperProps {
    variant?: 'small' | 'regular',
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant }) => {
    return (
        <Box
            mt={8}
            mx='auto'
            maxW={variant === 'small'? '400px' : '800px'}
            w="100%"
            p="8"
            bgImage="linear-gradient(to bottom, #b1e4e1 0%, #dec0f1 100%)">
            {children}
        </Box>
    );
}