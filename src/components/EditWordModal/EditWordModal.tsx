interface EditWordModalProps {
  wordId: string | number | undefined;
  onClose: () => void;
}

export default function EditWordModal({ wordId, onClose }: EditWordModalProps) {
  console.log("wordId", wordId);
  return (
    <div onClick={onClose}>
      <p>Modal for edit</p>
    </div>
  );
}
