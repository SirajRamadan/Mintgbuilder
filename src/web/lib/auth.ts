// Static/demo mode — no backend required for GitHub Pages preview
export const authClient = {
  signIn: {
    email: async ({ email, password }: any) => {
      await new Promise(r => setTimeout(r, 800));
      return { error: null, data: { user: { name: "Demo User", email } } };
    },
  },
  signUp: {
    email: async ({ name, email, password }: any) => {
      await new Promise(r => setTimeout(r, 800));
      return { error: null, data: { user: { name, email } } };
    },
  },
  getSession: async () => null,
  signOut: async () => {},
};
