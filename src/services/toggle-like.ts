import { LikeResponseSchema } from "@/api/routes/schemas/issue-likes";
import { clientEnv } from "@/client-env";

interface ToggleLikeProps {
  issueId: string;
}

export const toggleLike = async ({ issueId }: ToggleLikeProps) => {
  try {
    const url = new URL(
      `/api/issues/${issueId}/like`,
      clientEnv.NEXT_PUBLIC_API_URL
    );

    const response = await fetch(url, {
      method: "POST",
    });

    const data = await response.json();

    return LikeResponseSchema.parse(data);
  } catch (error) {
    console.error("Error getting issue by id:", error);
    throw error;
  }
};
