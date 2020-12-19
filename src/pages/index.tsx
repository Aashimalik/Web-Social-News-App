import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from '../generated/graphql';
import { Layout } from '../components/Layout';
import NextLink from 'next/link';
import { Link, Stack, Box, Heading, Text, Flex, Button } from '@chakra-ui/core';
import { useState } from 'react';

const Index = () => {
  const [variables, setVariables] = useState({ limit: 10, cursor: null as null | string });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return (
      <div>
        There are no posts available.
      </div>
    );
  }

  return (
    <Layout>
      <Flex>
        <Heading>Social Web App</Heading>
        <NextLink href='/create-post'>
          <Link ml="auto">create post</Link>
        </NextLink>
      </Flex>
      <br />
      { !data && fetching ? (
        <div>loading...</div>
      ): (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) => (
            <Box key={p.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
     {data && data.posts.hasMore ? <Flex>
        <Button onClick={()=>{
          setVariables({
            limit: variables.limit,
            cursor: data.posts.posts[data.posts.posts.length -1].createdAt,
          })
        }} m='auto' my={8} isLoading={fetching}>Load more</Button>
      </Flex>: null}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
