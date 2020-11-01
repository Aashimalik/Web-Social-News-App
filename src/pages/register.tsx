import React from 'react';
import { Formik, Form } from 'formik';
import { Wrapper } from '../components/wrappper';
import { InputField } from '../components/InputField';
import { Box, Button } from '@chakra-ui/core';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
	return (
		<Wrapper variant='small'>
			<Formik
				initialValues={{ username: '', password: '' }}
				onSubmit={(values) => {
					console.log(values);
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