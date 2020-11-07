import { Box, Link, Flex, Button, Heading } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  // data is loading
  if (fetching) {
    body = null;
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href='/login'>
          <Link color='white' mr={2} fontSize="xl">Login</Link>
        </NextLink>
        <NextLink href='/register'>
          <Link color='white' fontSize="xl">Register</Link>
        </NextLink>
      </>
    );
    // user is logged in
  } else {
    body = (
      <Flex color="#FFF">
        <Box mr={2} fontSize="xl">{data.me.username}</Box>
        <Button onClick={() => logout()}
          isLoading={logoutFetching}
          variant="link"
          variantColor="#FFF"
        >
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex bg='blue.500' p={4}>
      <Flex align="center" mr={5} color="#FFFF">
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"} color="#FFFF">
          Social Web App
        </Heading>
      </Flex>
      <Box ml={'auto'}>
        {body}
      </Box>
    </Flex>
  );
}