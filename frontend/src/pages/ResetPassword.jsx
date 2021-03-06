import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { errorHandler, successHandler } from '../utilities';
import { resetPassword } from '../Api';

const ResetPasswordSchema = Yup.object().shape({
	password: Yup.string().min(6, 'Password is too short').required('Password is Required'),
	confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match'),
});

const ResetPassword = () => {
	const { resetId } = useParams();
	let navigate = useNavigate();

	const handleResetPassword = async ({ password }, { setSubmitting }) => {
		setSubmitting(true);
		try {
			const response = await resetPassword(resetId, { password: password });
			if (response.status === 200) {
				setSubmitting(false);
				successHandler('Password reset Successfully, login with new password to continue');
				navigate('/login');
			}
		} catch (err) {
			errorHandler(
				err.message ||
					err.response.message ||
					err.response.data.message
			);
		}
	};

	return (
		<Layout>
			<div className="h-full flex items-center justify-center bg-gray-100 py-12 px-4 xl:px-12 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8 px-12 bg-white py-8 shadow-lg rounded-xl">
					<div>
						<h2 className="mt-6 text-center text-xl sm:text-3xl font-extrabold text-gray-900">
							Reset Password
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							Put in a new password that you will remember
						</p>
					</div>
					<Formik
						initialValues={{
							confirmPassword: '',
							password: '',
						}}
						validationSchema={ResetPasswordSchema}
						onSubmit={handleResetPassword}
					>
						{({ isSubmitting, errors, touched }) => (
							<Form>
								<div className="my-2">
									<label htmlFor="password" className="text-gray-500 font-normal">
										Password
									</label>
									<Field
										id="password"
										name="password"
										type="password"
										className={`relative block w-full px-3 py-3 border ${
											errors.password && touched.password
												? 'border-red-300 placeholder-red-500 focus:ring-red-500 focus:border-red-500'
												: 'border-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
										} text-gray-900 rounded-lg focus:outline-none  focus:z-10 sm:text-sm shadow-sm`}
										placeholder="Password"
									/>
									<ErrorMessage className="text-red-500" component="div" name="password" />
								</div>
								<div className="my-2">
									<label htmlFor="confirmPassword" className="text-gray-500 font-normal">
										Confirm Password
									</label>
									<Field
										id="confirmPassword"
										name="confirmPassword"
										type="password"
										className={`relative block w-full px-3 py-3 border ${
											errors.confirmPassword && touched.confirmPassword
												? 'border-red-300 placeholder-red-500 focus:ring-red-500 focus:border-red-500'
												: 'border-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
										} text-gray-900 rounded-lg focus:outline-none  focus:z-10 sm:text-sm shadow-sm`}
										placeholder="Confirm Password"
									/>
									<ErrorMessage className="text-red-500" component="div" name="password" />
								</div>
								<button
									type="submit"
									className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<svg
											style={{ borderTopColor: 'transparent' }}
											className="animate-spin h-5 w-5 mr-3 rounded-full border-2 border-white border-solid"
											viewBox="0 0 24 24"
										>
											{' '}
										</svg>
									) : null}
									{isSubmitting ? 'Resetting...' : 'Reset Password'}
								</button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</Layout>
	);
};

export default ResetPassword;
