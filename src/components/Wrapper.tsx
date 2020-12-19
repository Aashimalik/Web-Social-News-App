import React from 'react';
import { Box } from '@chakra-ui/core';

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
    variant?: WrapperVariant,
    height?: Boolean,
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant, height }) => {
    return (
        <Box
            height={height ? "100vh": "100%"}
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