interface WordsTableProps {
  words: Array<string>;
  isLoading: boolean;
}

export default function WordsTable({ words, isLoading }: WordsTableProps) {
  return (
    <div>
      WordsTable Component
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {words.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
