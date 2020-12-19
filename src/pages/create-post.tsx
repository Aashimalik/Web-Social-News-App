import React from 'react';
import { Formik, Form } from 'formik';
import { InputField } from '../components/InputField';
import { Box, Button } from '@chakra-ui/core';
import { useCreatePostMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import { Layout } from '../components/Layout';
import { useIsAuth } from '../utils/useIsAuth';

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, createPost] = useCreatePostMutation();
  useIsAuth();
  return(
      <Layout variant="small" height>
        <Formik
          initialValues={{ title: '', text: '' }}
          onSubmit={async (values) => {
            const { error } = await createPost({input: values});
            if(!error) router.push("/");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name='title'
                label='Title'
                placeholder='title'
              />
              <Box mt={4}>
                <InputField
                  name='text'
                  label='Body'
                  placeholder="text..."
                  textarea
                />
              </Box>
              <Button
                type='submit'
                variantColor='blue'
                isLoading={isSubmitting}
                mt={4}
              >
                create post
              </Button>
            </Form>
          )}
        </Formik>
      </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(CreatePost);