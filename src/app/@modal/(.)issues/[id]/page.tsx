import { Modal } from "@/components/modal";
import { BackButton } from "../_components/back-button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { IssueDetails } from "@/app/issues/_components/issue-details";

interface IssueModalProps {
  params: Promise<{ id: string }>;
}

export default async function IssueModal({ params }: IssueModalProps) {
  const { id } = await params;

  return (
    <Modal>
      <div className="flex flex-col gap-4 p-6">
        <BackButton />

        <DialogTitle className="sr-only">Detalhes do problema</DialogTitle>

        <IssueDetails issueId={id} />
      </div>
    </Modal>
  );
}
