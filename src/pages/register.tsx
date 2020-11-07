import React from 'react';
import { Box, Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrappper';
import { useRegisterMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';

interface registerProps { }

const Register: React.FC<registerProps> = ({ }) => {
	const router = useRouter();
	const [, register] = useRegisterMutation()
	return (
		<Wrapper variant='small'>
			<Formik
				initialValues={{ email: "", username: '', password: '' }}
				onSubmit={async (values, { setErrors }) => {
					const response = await register({ options: values});
					if (response.data?.register.errors) {
						setErrors(toErrorMap(response.data.register.errors));
					} else if (response.data?.register.user) {
						router.push("/");
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form>

						<InputField
							name='email'
							label='Email'
							placeholder='Email'
						/>
						<Box mt={4}>
							<InputField
								name='username'
								label='Username'
								placeholder="username"
							/>
						</Box>
						<Box mt={4}>
							<InputField
								name='password'
								label='Password'
								placeholder="*******"
								type='password'
							/>
						</Box>
						<Button
							type='submit'
							variantColor='blue'
							isLoading={isSubmitting}
							mt={4}
							_hover={{
								bg: [
								  "green.100",
								  "green.100",
								  "green.600",
								  "green.600",
								],
							  }}
						>
							Register
							</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default withUrqlClient(createUrqlClient)(Register);