export default function CastList({ cast }) {
  if (!cast || cast.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
        Pemeran
      </h3>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {cast.map((person) => (
          <div
            key={person.id}
            className="min-w-[90px] sm:min-w-[110px] text-center"
          >
            <div className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] rounded-full overflow-hidden bg-zinc-800 border border-zinc-700 mx-auto">
              <img
                src={person.profile}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-white text-xs sm:text-sm font-semibold mt-2 line-clamp-1">
              {person.name}
            </p>
            <p className="text-zinc-500 text-xs line-clamp-1">
              {person.character}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
