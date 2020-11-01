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
            bgImage="linear-gradient(to bottom, #5ee7df 0%, #b490ca 100%)">
            {children}
        </Box>
    );
}