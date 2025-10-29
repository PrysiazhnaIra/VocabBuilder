export default function ActionsBtn({ wordId }: { wordId: string | undefined }) {
  console.log("wordId", wordId);
  return (
    <div>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}
