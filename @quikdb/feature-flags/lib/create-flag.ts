import { type FlagOverridesType, decrypt } from '@vercel/flags';
import { unstable_flag as flag } from '@vercel/flags/next';

export const createFlag = (key: string) => {
  return flag({
    key,
    async decide(params) {
      const overrideCookie = params.cookies.get('vercel-flag-overrides')?.value;
      const overrides = overrideCookie
        ? await decrypt<FlagOverridesType>(overrideCookie)
        : {};

      if (overrides && key in overrides) {
        return overrides[key];
      }

      try {
        return false;
      } catch (_error) {
        return false;
      }
    },
  });
};
