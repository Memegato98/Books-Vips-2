/**
 * Runtime environment config.
 *
 * Priority (highest → lowest):
 *  1. window.VIPS_ENV  — injected at runtime by the server / hosting platform
 *  2. firebaseConnection.js — the static module kept in source control
 *
 * Never put real API keys directly in this file or in index.html.
 * For Vercel: set environment variables in the Vercel dashboard and inject
 * them via a server-side edge function or via the Vercel CLI secrets, then
 * expose them as window.VIPS_ENV in a small inline <script> generated at
 * build time using `vercel env pull` + a build script.
 */

import { firebaseConfig, databaseSettings } from '../firebase/firebaseConnection.js';

const _win = (typeof window !== 'undefined' && window.VIPS_ENV) ? window.VIPS_ENV : null;

export const env = {
  firebase: (_win?.firebase && Object.keys(_win.firebase).length > 0)
    ? _win.firebase
    : firebaseConfig,

  demoMode: _win != null
    ? Boolean(_win.demoMode)
    : Boolean(databaseSettings.demoMode),

  forcePasswordChangeClaim: _win?.forcePasswordChangeClaim
    ?? databaseSettings.forcePasswordChangeClaim,

  collections: databaseSettings.collections,
};
