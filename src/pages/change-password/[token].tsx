import React, { useState } from 'react';
import { Button, Box, Link, Flex, Text } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrappper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import NextLink from 'next/link';

interface ChangePasswordProps {
  token: string;
}

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");

  return (
    <Wrapper variant='small'>
      <Text as="h1" fontSize="3xl" mb={5} fontWeight="bolder" textAlign="center">
        Change Password
      </Text>
      <Formik
        initialValues={{ newPassword: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            token,
            newPassword: values.newPassword,
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ('token' in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(toErrorMap(response.data.changePassword.errors));
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='newPassword'
              label='New Password'
              placeholder="new Password"
              type='password'
            />
            {tokenError ? (
              <Flex>
                <Box mr={2} color='red'>{tokenError}</Box>
                <NextLink href="/forgot-password">
                  <Link> Click here to get a new one</Link>
                </NextLink>
              </Flex>
            ) : null}
            <Button
              type='submit'
              variantColor='blue'
              isLoading={isSubmitting}
              mt={4}
            >
              change password
						</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  }
}

export default withUrqlClient(createUrqlClient)(ChangePassword);