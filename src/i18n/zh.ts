import { zhUi } from "./zh-ui";
import { zhContent } from "./zh-content";
import { zhArchive } from "./zh-archive";

/** Source English stays authoritative; all translations are static, auditable,
 * reversible and run entirely in the user's browser. */
export const zhTranslations: Record<string, string> = {
  ...zhUi,
  ...zhContent,
  ...zhArchive,
};
