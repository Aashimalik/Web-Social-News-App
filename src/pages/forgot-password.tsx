import React, { useState } from 'react';
import { Button, Text, Box } from '@chakra-ui/core';
import { withUrqlClient } from 'next-urql';
import { Wrapper } from '../components/Wrappper';
import { Formik, Form } from 'formik';
import { InputField } from '../components/InputField';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useForgotPasswordMutation } from '../generated/graphql';

const ForgotPassword: React.FC<{}> = ({ }) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation()
  return (
    <Wrapper variant='small'>
      <Text as="h1" fontSize="3xl" mb={5} fontWeight="bolder" textAlign="center">
        Forgot Password
      </Text>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) => (
          complete ? (
            <Box>
              if account with that email exists, we sent you an email
            </Box>
          ) : (
              <Form>
                <InputField
                  name='email'
                  label='Email'
                  placeholder='Email'
                  type="email"
                />
                <Button
                  type='submit'
                  variantColor='blue'
                  isLoading={isSubmitting}
                  mt={4}
                >
                  forgot password
                </Button>
              </Form>
            )
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);