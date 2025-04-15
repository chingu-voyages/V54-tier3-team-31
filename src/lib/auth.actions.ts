'use server'

import { signIn, signOut } from '@/lib/auth'

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' }) // Redirect back to account page after sign in
}

export async function signOutAction() {
  await signOut({ redirectTo: '/account' }) // Redirect back to account page after sign out
}
