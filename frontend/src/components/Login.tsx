import { useSession, signIn, signOut } from 'next-auth/react';

export function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        onClick={() =>
          signIn(undefined, { callbackUrl: 'http://localhost:3000/settings' })
        }
      >
        Sign in
      </button>
    </>
  );
}
