import React from 'react';
import { Formik, Form } from 'formik';
import { Wrapper } from '../components/Wrappper';
import { InputField } from '../components/InputField';
import { Box, Button } from '@chakra-ui/core';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
	const router = useRouter();
	const [, login] = useLoginMutation()
	return (
		<Wrapper variant='small'>
			<Formik
				initialValues={{ username: '', password: '' }}
				onSubmit={async (values, { setErrors }) => {
					const response = await login({ options: values });
					if(response.data?.login.errors) {
						setErrors(toErrorMap(response.data.login.errors));
					} else if (response.data?.login.user) {
						router.push("/");
					}
				}}
			>
				{({isSubmitting}) => (
					<Form>
						<InputField
							name='username'
							label='Username'
							placeholder='username'
						/>
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
						>
								Login
							</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default Login;