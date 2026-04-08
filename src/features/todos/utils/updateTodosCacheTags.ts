import { updateTag } from "next/cache";
import { TODOS_TAGS } from "@/shared/constants/tags";

export const updateTodosCacheTags = (
  userId: string,
  folderId: string,
  date?: string,
) => {
  if (date) {
    updateTag(
      `${TODOS_TAGS.BY_DATE}-${userId}-${date.slice(0, 10)}-${folderId}`,
    );
  }
  updateTag(`${TODOS_TAGS.ALL}-${userId}-${folderId}`);
};
