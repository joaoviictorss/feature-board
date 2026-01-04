import { IssueSchema } from "@/api/routes/get-issue";
import { clientEnv } from "@/client-env";

interface GetIssueProps {
  id: string;
}

export const getIssue = async ({ id }: GetIssueProps) => {
  try {
    const url = new URL(`/api/issues/${id}`, clientEnv.NEXT_PUBLIC_API_URL);

    const response = await fetch(url);

    const data = await response.json();

    return IssueSchema.parse(data);
  } catch (error) {
    console.error("Error getting issue by id:", error);
    throw error;
  }
};
