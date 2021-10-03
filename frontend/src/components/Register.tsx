import { SyntheticEvent } from 'react';
import {
  useUser_LoginMutation,
  useUser_SignupMutation,
} from '../generated/graphql';
import { ME } from '../graphql/queries';
import useForm from '../utils/useForm';

export function Register() {
  const {
    inputs,
    handleChange,
    resetForm,
  }: {
    inputs: { email: string; password: string };
    handleChange: any;
    resetForm: any;
  } = useForm({
    email: '',
    password: '',
  });

  // const [loginMutation, { data, error, loading }] = useLoginMutation({
  //   variables: { email: inputs.email, password: inputs.password },
  //   refetchQueries: [{ query: ME }],
  // });

  const [signupMutation, { data, error, loading }] = useUser_SignupMutation({
    variables: { email: inputs.email, password: inputs.password },
  });

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    console.log(inputs);
    const res = await signupMutation();
    console.log(res);
    resetForm();
  }

  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={inputs.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={inputs.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
