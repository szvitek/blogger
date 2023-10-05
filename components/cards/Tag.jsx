const Tag = ({ tag, isSelected, setSelectedTags }) => {
  if (isSelected) {
    return (
      <div
        className="bg-green-600 text-white font-semibold py-1 px-2 rounded-lg hover:shadow-lg transitiot duration-300 ease-in-out flex items-center justify-center"
        onClick={() =>
          setSelectedTags((prev) => prev.filter((item) => item !== tag))
        }
      >
        {tag}
      </div>
    );
  }

  return (
    <div
      className="bg-gray-200 text-gray-600 font-semibold py-1 px-2 rounded-lg hover:shadow-lg transitiot duration-300 ease-in-out flex items-center justify-center"
      onClick={() => setSelectedTags([tag])}
    >
      {tag}
    </div>
  );
};
export default Tag;
