import React from 'react';
import { Box } from '@chakra-ui/core';

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
    variant?: WrapperVariant,
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant }) => {
    return (
        <Box
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
        >
        <Box
            maxW={variant === 'small'? '500px' : '800px'}
            w="100%"
            p="8"
            bg="#FFFFFF"
            boxShadow="0px 0px 8px rgba(53, 83, 108, 0.16)"
            borderRadius="4px"
            mb={150}
        >
            {children}
        </Box>
        </Box>
    );
}