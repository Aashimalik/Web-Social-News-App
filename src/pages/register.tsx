import React from 'react';
import { Formik, Form } from 'formik';
import { Wrapper } from '../components/Wrappper';
import { InputField } from '../components/InputField';
import { Box, Button } from '@chakra-ui/core';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
	const router = useRouter();
	const [, register] = useRegisterMutation()
	return (
		<Wrapper variant='small'>
			<Formik
				initialValues={{ username: '', password: '' }}
				onSubmit={async (values, { setErrors }) => {
					const response = await register(values);
					if(response.data?.register.errors) {
						setErrors(toErrorMap(response.data.register.errors));
					} else if (response.data?.register.user) {
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
								Register
							</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default Register;